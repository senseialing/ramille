'use client';

import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, Tag, Check, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';

interface CartDrawerProps {
  onProceedToCheckout: () => void;
}

export function CartDrawer({ onProceedToCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    getSubtotal,
    getDiscountAmount,
    getShippingFee,
    getTotalAmount,
  } = useCartStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotalAmount();

  const freeShippingThreshold = 500000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyCoupon(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#E3DBD0] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-serif text-[#8A6B4F]">✻</span>
              <h2 className="text-xl font-serif text-[#1E1A17]">Keranjang Belanja</h2>
              <span className="text-xs bg-[#EDE7DE] px-2 py-0.5 rounded-full text-[#70655B] font-semibold">
                {items.length}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-2 rounded-full hover:bg-[#EDE7DE] text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#EDE7DE]/70 px-6 py-3 border-b border-[#E3DBD0]">
            <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
              <span className="text-[#1E1A17]">
                {progressPercent >= 100
                  ? 'Selamat! Anda berhak Bebas Ongkir'
                  : 'Tambah Rp ' + remainingForFreeShipping.toLocaleString('id-ID') + ' lagi untuk Bebas Ongkir'}
              </span>
              <span className="text-[#8A6B4F] font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8A6B4F] transition-all duration-500 rounded-full"
                style={{ width: progressPercent + '%' }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#EDE7DE] flex items-center justify-center text-[#70655B]">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg font-serif text-[#1E1A17]">Keranjang Anda Kosong</h3>
                <p className="text-xs text-[#70655B] max-w-xs">
                  Temukan busana linen premium dan produk curated living kesukaan Anda.
                </p>
                <button
                  onClick={closeCart}
                  className="px-6 py-2.5 rounded-full bg-[#1E1A17] text-white text-xs font-medium hover:bg-[#332D28] transition-colors cursor-pointer"
                >
                  Jelajahi Produk
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex space-x-4 p-3 bg-white rounded-xl border border-[#E3DBD0] shadow-2xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-lg bg-[#EDE7DE] shrink-0"
                  />

                  {/* Info & Adjustments */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-[#1E1A17] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-[#A89C8F] hover:text-rose-600 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-[#70655B] mt-0.5">{item.product.category}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs font-semibold text-[#1E1A17]">
                        {'Rp ' + (item.product.price * item.quantity).toLocaleString('id-ID')}
                      </span>

                      {/* Qty controls */}
                      <div className="flex items-center border border-[#E3DBD0] rounded-full bg-[#FAF7F2]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:text-[#8A6B4F] transition-colors cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-medium text-[#1E1A17]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:text-[#8A6B4F] transition-colors cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E3DBD0] space-y-4">
              
              {/* Promo Coupon Form */}
              <div>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF7F2] border border-[#8A6B4F]/40 text-xs">
                    <div className="flex items-center space-x-2 text-[#8A6B4F] font-semibold">
                      <Tag className="w-4 h-4" />
                      <span>{appliedCoupon.code}</span>
                      <span className="text-[#70655B] font-normal">
                        ({appliedCoupon.discountType === 'percentage' ? appliedCoupon.value + '%' : 'Rp ' + appliedCoupon.value.toLocaleString('id-ID')})
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-[#70655B] hover:text-rose-600 font-medium text-[11px] cursor-pointer"
                    >
                      Hapus
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Kode Kupon (Coba: RAMILLE20)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border border-[#E3DBD0] text-xs uppercase text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#EDE7DE] hover:bg-[#E6DFD4] text-[#1E1A17] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                    >
                      Gunakan
                    </button>
                  </form>
                )}
                {couponError && <p className="text-[11px] text-rose-600 mt-1">{couponError}</p>}
                {couponSuccess && !couponError && (
                  <p className="text-[11px] text-emerald-600 mt-1 flex items-center space-x-1">
                    <Check className="w-3 h-3" /> <span>{couponSuccess}</span>
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-[#70655B] pt-2 border-t border-[#E3DBD0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#1E1A17]">{'Rp ' + subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Diskon Kupon</span>
                    <span>{'- Rp ' + discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Ongkos Kirim</span>
                  <span className="font-medium text-[#1E1A17]">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-semibold">GRATIS</span>
                    ) : (
                      'Rp ' + shipping.toLocaleString('id-ID')
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-semibold text-[#1E1A17] pt-2 border-t border-[#E3DBD0]">
                  <span>Total Tagihan</span>
                  <span className="text-base text-[#8A6B4F]">{'Rp ' + total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Checkout CTA Button */}
              <button
                onClick={() => {
                  closeCart();
                  onProceedToCheckout();
                }}
                className="w-full py-3.5 px-4 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-sm font-medium tracking-wide flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer group"
              >
                <span>Lanjut ke Pembayaran</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, QrCode, CreditCard, Building2, ExternalLink } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useOrdersStore } from '@/stores/orders-store';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getSubtotal, getDiscountAmount, getShippingFee, getTotalAmount, clearCart } = useCartStore();

  const [formData, setFormData] = useState({
    name: 'Ahmad Fauzi',
    phone: '081298765432',
    address: 'Jl. Senopati No. 45, Kebayoran Baru',
    city: 'Jakarta Selatan',
    postalCode: '12190',
  });

  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'simulated_snap' | 'success'>('form');
  const [selectedMethod, setSelectedMethod] = useState<'qris' | 'bca_va' | 'credit_card'>('qris');
  const [simulatedOrderId, setSimulatedOrderId] = useState<string>('');

  if (!isOpen) return null;

  const subtotal = getSubtotal();
  const discount = getDiscountAmount();
  const shipping = getShippingFee();
  const total = getTotalAmount();

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');
    const orderId = 'RAM-' + Math.floor(100000 + Math.random() * 900000);
    setSimulatedOrderId(orderId);

    try {
      // Call Next.js API route that interacts with Midtrans SDK
      const res = await fetch('/api/payments/midtrans/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          grossAmount: total,
          customerDetails: {
            first_name: formData.name,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            postal_code: formData.postalCode,
          },
        }),
      });

      const data = await res.json();

      // If window.snap is available and valid token exists
      if (typeof window !== 'undefined' && (window as any).snap && data.token && !data.simulated) {
        (window as any).snap.pay(data.token, {
          onSuccess: () => {
            setPaymentStep('success');
            clearCart();
          },
          onPending: () => {
            setPaymentStep('success');
            clearCart();
          },
          onError: () => {
            alert('Pembayaran gagal atau dibatalkan.');
            setPaymentStep('form');
          },
          onClose: () => {
            setPaymentStep('form');
          },
        });
      } else {
        // Show seamless interactive simulator
        setTimeout(() => {
          setPaymentStep('simulated_snap');
        }, 600);
      }
    } catch (err) {
      setTimeout(() => {
        setPaymentStep('simulated_snap');
      }, 600);
    }
  };

  const { addOrder } = useOrdersStore();

  const handleSimulateSuccess = () => {
    const finalMethod = selectedMethod === 'qris' 
      ? 'QRIS (GoPay)' 
      : selectedMethod === 'bca_va' 
      ? 'BCA Virtual Account' 
      : 'Kartu Kredit (Visa/Mastercard)';

    addOrder({
      id: simulatedOrderId,
      customerName: formData.name,
      customerEmail: 'customer@ramille.com',
      customerPhone: formData.phone,
      items: items.map(it => ({
        id: it.product.id,
        name: it.product.name,
        category: it.product.category,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.images[0] || 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
      })),
      shippingAddress: {
        recipientName: formData.name,
        phone: formData.phone,
        addressLine: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      },
      subtotal,
      discount,
      shippingFee: shipping,
      total,
      paymentStatus: 'settlement',
      paymentMethod: finalMethod as any,
      paymentDetails: selectedMethod === 'bca_va' ? 'VA: 80777 ' + formData.phone : 'Midtrans Verified',
      paymentDate: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      orderStatus: 'processing',
      courier: 'JNE Express (Reguler)',
      trackingNumber: 'JNE-' + simulatedOrderId + 'ID',
      currentLocation: 'Pesanan sedang disiapkan & dikemas dengan aman di Atelier Ramille',
      estimatedArrival: '1-2 hari kerja',
      createdAt: 'Hari ini, ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      trackingHistory: [
        {
          title: 'Pesanan Berhasil Dibuat',
          description: 'Pesanan telah masuk ke sistem Ramille Store.',
          location: 'Sistem Ramille Store',
          timestamp: 'Baru saja',
          completed: true,
        },
        {
          title: 'Pembayaran Lunas Diverifikasi',
          description: 'Pembayaran diverifikasi otomatis via Midtrans Sandbox (' + finalMethod + ').',
          location: 'Midtrans Payment Gateway',
          timestamp: 'Baru saja',
          completed: true,
          current: true,
        },
        {
          title: 'Sedang Dikemas di Atelier',
          description: 'Tim kami sedang mengemas produk dengan Ramille Luxury Eco-Box.',
          location: 'Atelier Warehouse Ramille',
          timestamp: 'Estimasi: Beberapa saat lagi',
          completed: false,
        },
      ],
    });

    setPaymentStep('success');
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      {/* Backdrop */}
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden my-8">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#E3DBD0] flex items-center justify-between bg-white/70">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-serif text-[#8A6B4F]">✻</span>
            <h3 className="text-xl font-serif text-[#1E1A17]">
              {paymentStep === 'success' ? 'Pesanan Berhasil!' : 'Checkout & Pembayaran'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EDE7DE] text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: FORM PENGIRIMAN & RINGKASAN */}
          {paymentStep === 'form' && (
            <form onSubmit={handlePay} className="space-y-6">
              
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E1A17] mb-3">
                  1. Informasi Pengiriman
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-xs text-[#70655B] font-medium block mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#70655B] font-medium block mb-1">Nomor WhatsApp / HP</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="text-xs text-[#70655B] font-medium block mb-1">Alamat Lengkap</label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#70655B] font-medium block mb-1">Kota / Kabupaten</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-[#70655B] font-medium block mb-1">Kode Pos</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                    />
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#1E1A17] mb-3">
                  2. Ringkasan Pesanan ({items.length} item)
                </h4>
                <div className="bg-white rounded-xl border border-[#E3DBD0] p-4 divide-y divide-[#E3DBD0]/60 max-h-40 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-2 first:pt-0 last:pb-0 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-medium text-[#1E1A17]">{item.product.name}</span>
                        <span className="text-[#70655B] ml-2">x{item.quantity}</span>
                      </div>
                      <span className="font-semibold text-[#1E1A17]">
                        {'Rp ' + (item.product.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="bg-[#EDE7DE] rounded-xl p-4 space-y-1.5 text-xs">
                <div className="flex justify-between text-[#70655B]">
                  <span>Subtotal</span>
                  <span>{'Rp ' + subtotal.toLocaleString('id-ID')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Diskon Promo</span>
                    <span>{'- Rp ' + discount.toLocaleString('id-ID')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#70655B]">
                  <span>Biaya Pengiriman</span>
                  <span>{shipping === 0 ? 'GRATIS' : 'Rp ' + shipping.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1E1A17] pt-2 border-t border-[#D8CFC3]">
                  <span>Total Tagihan</span>
                  <span className="text-[#8A6B4F]">{'Rp ' + total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-[11px] text-[#70655B]">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Pembayaran aman diproses oleh Midtrans Sandbox Simulator.</span>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Bayar Sekarang ({ 'Rp ' + total.toLocaleString('id-ID') })</span>
              </button>

            </form>
          )}

          {/* STEP 2: PROCESSING */}
          {paymentStep === 'processing' && (
            <div className="py-16 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-12 h-12 border-3 border-[#8A6B4F] border-t-transparent rounded-full animate-spin" />
              <h4 className="text-lg font-serif text-[#1E1A17]">Menghubungkan ke Midtrans...</h4>
              <p className="text-xs text-[#70655B]">Sedang memvalidasi rincian pesanan Anda secara aman.</p>
            </div>
          )}

          {/* STEP 3: INTERACTIVE MIDTRANS SANDBOX SIMULATOR */}
          {paymentStep === 'simulated_snap' && (
            <div className="space-y-6">
              
              <div className="bg-[#1E1A17] text-white p-5 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#C4A480]">
                    MIDTRANS SNAP SIMULATOR (SANDBOX)
                  </span>
                  <h4 className="text-xl font-serif mt-0.5">Order ID: {simulatedOrderId}</h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-white/70 block">Total Tagihan</span>
                  <span className="text-lg font-bold text-[#C4A480]">
                    {'Rp ' + total.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#70655B] mb-2.5">
                  Pilih Metode Pembayaran Uji Coba:
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod('qris')}
                    className={
                      'p-4 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ' +
                      (selectedMethod === 'qris'
                        ? 'border-[#8A6B4F] bg-[#EDE7DE] text-[#1E1A17] font-semibold'
                        : 'border-[#E3DBD0] bg-white text-[#70655B]')
                    }
                  >
                    <QrCode className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-xs">QRIS</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('bca_va')}
                    className={
                      'p-4 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ' +
                      (selectedMethod === 'bca_va'
                        ? 'border-[#8A6B4F] bg-[#EDE7DE] text-[#1E1A17] font-semibold'
                        : 'border-[#E3DBD0] bg-white text-[#70655B]')
                    }
                  >
                    <Building2 className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-xs">BCA VA</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod('credit_card')}
                    className={
                      'p-4 rounded-xl border flex flex-col items-center justify-center space-y-1.5 transition-all cursor-pointer ' +
                      (selectedMethod === 'credit_card'
                        ? 'border-[#8A6B4F] bg-[#EDE7DE] text-[#1E1A17] font-semibold'
                        : 'border-[#E3DBD0] bg-white text-[#70655B]')
                    }
                  >
                    <CreditCard className="w-6 h-6 stroke-[1.5]" />
                    <span className="text-xs">Kartu Kredit</span>
                  </button>
                </div>
              </div>

              {/* Simulator Action Panel */}
              <div className="bg-white rounded-2xl border border-[#E3DBD0] p-6 text-center space-y-4">
                {selectedMethod === 'qris' && (
                  <div className="space-y-3">
                    <div className="w-32 h-32 mx-auto bg-[#FAF7F2] p-2 border border-[#E3DBD0] rounded-xl flex items-center justify-center">
                      <QrCode className="w-24 h-24 text-[#1E1A17]" />
                    </div>
                    <p className="text-xs text-[#70655B]">
                      Simulasi scan kode QRIS menggunakan GoPay / BCA / ShopeePay Sandbox.
                    </p>
                  </div>
                )}

                {selectedMethod === 'bca_va' && (
                  <div className="space-y-2">
                    <p className="text-xs text-[#70655B]">Nomor Rekening Virtual Account (Simulasi):</p>
                    <div className="px-4 py-2 bg-[#FAF7F2] rounded-lg font-mono text-base font-bold text-[#1E1A17] tracking-wider inline-block">
                      80777 081298765432
                    </div>
                    <p className="text-[11px] text-[#8A6B4F]">
                      Masukkan nomor VA ini ke portal simulator Midtrans.
                    </p>
                  </div>
                )}

                {selectedMethod === 'credit_card' && (
                  <div className="space-y-2 text-xs text-[#70655B]">
                    <p>Nomor Kartu Tes: <span className="font-mono font-bold text-[#1E1A17]">4811 1111 1111 1114</span></p>
                    <p>Masa Berlaku: <span className="font-mono font-bold text-[#1E1A17]">12/28</span> • CVV: <span className="font-mono font-bold text-[#1E1A17]">123</span> • OTP: <span className="font-mono font-bold text-[#1E1A17]">112233</span></p>
                  </div>
                )}

                {/* Simulate Success Button */}
                <button
                  onClick={handleSimulateSuccess}
                  className="w-full py-3.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Simulasikan Pembayaran Berhasil (Settlement)</span>
                </button>
              </div>

            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {paymentStep === 'success' && (
            <div className="py-8 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8A6B4F]">
                  TRANSAKSI TERVERIFIKASI
                </span>
                <h3 className="text-2xl font-serif text-[#1E1A17] mt-1">
                  Terima Kasih Atas Pesanan Anda!
                </h3>
                <p className="text-xs text-[#70655B] max-w-md mx-auto mt-2">
                  Nomor pesanan Anda adalah <span className="font-bold text-[#1E1A17]">{simulatedOrderId}</span>. Konfirmasi pembayaran dan faktur digital telah disinkronkan ke sistem.
                </p>
              </div>

              <div className="bg-[#EDE7DE] rounded-2xl p-5 text-left max-w-md mx-auto space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#70655B]">Status Pembayaran:</span>
                  <span className="font-bold text-emerald-700">Settlement (Lunas)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#70655B]">Penerima:</span>
                  <span className="font-semibold text-[#1E1A17]">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#70655B]">Tujuan:</span>
                  <span className="font-semibold text-[#1E1A17]">{formData.city}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#D8CFC3]">
                  <span className="text-[#70655B]">Total Terbayar:</span>
                  <span className="font-bold text-base text-[#8A6B4F]">{'Rp ' + total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="/account"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide transition-all shadow-md text-center flex items-center justify-center space-x-2"
                >
                  <span>Buka Halaman Akun & Lacak Pesanan →</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full border border-[#D8CFC3] hover:bg-white text-[#1E1A17] text-xs font-semibold tracking-wide transition-all cursor-pointer"
                >
                  Lanjut Belanja
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

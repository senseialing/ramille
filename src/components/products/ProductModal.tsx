'use client';

import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, CheckCircle2 } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  if (!product) return null;

  const isWish = isInWishlist(product.id);
  const formattedPrice = 'Rp ' + product.price.toLocaleString('id-ID');
  const formattedOriginal = product.originalPrice ? 'Rp ' + product.originalPrice.toLocaleString('id-ID') : null;

  const handleAddToCart = () => {
    addItem(product, qty);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />

      <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Images Gallery */}
          <div className="p-6 bg-[#EDE7DE] flex flex-col justify-between">
            <div className="aspect-4/5 w-full rounded-2xl overflow-hidden bg-white shadow-xs">
              <img
                src={product.images[selectedImg] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail row if more than 1 image */}
            {product.images.length > 1 && (
              <div className="flex space-x-2 mt-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={
                      'w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ' +
                      (selectedImg === idx ? 'border-[#8A6B4F]' : 'border-transparent opacity-70')
                    }
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8A6B4F]">
                {product.category}
              </span>

              <h3 className="text-2xl sm:text-3xl font-serif text-[#1E1A17] leading-snug">
                {product.name}
              </h3>

              {product.subtitle && (
                <p className="text-xs font-medium text-[#70655B] italic">
                  {product.subtitle}
                </p>
              )}

              {/* Price & Rating */}
              <div className="flex items-center space-x-4 pt-1">
                <span className="text-xl font-bold text-[#1E1A17]">
                  {formattedPrice}
                </span>
                {formattedOriginal && (
                  <span className="text-sm text-[#70655B] line-through">
                    {formattedOriginal}
                  </span>
                )}
                <div className="flex items-center space-x-1 text-xs text-[#70655B] pl-2 border-l border-[#E3DBD0]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-[#1E1A17]">{product.rating}</span>
                  <span>({product.reviewCount} ulasan)</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#70655B] leading-relaxed pt-2">
                {product.description}
              </p>

              {/* Key Specs */}
              {product.details && product.details.length > 0 && (
                <ul className="space-y-1.5 pt-2 border-t border-[#E3DBD0] text-xs text-[#1E1A17]">
                  {product.details.map((d, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6B4F] shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions: Quantity & Add to Cart */}
            <div className="space-y-3 pt-4 border-t border-[#E3DBD0]">
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-[#E3DBD0] rounded-full bg-white px-3 py-1.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="text-sm px-2 text-[#70655B] hover:text-[#1E1A17]"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#1E1A17]">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="text-sm px-2 text-[#70655B] hover:text-[#1E1A17]"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-[#70655B]">
                  Tersedia {product.stock} buah
                </span>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide flex items-center justify-center space-x-2 transition-all shadow-md cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Tambah ke Keranjang</span>
                </button>
                <button
                  onClick={() => toggleWishlist(product)}
                  className={
                    'p-3.5 rounded-full border transition-all cursor-pointer ' +
                    (isWish ? 'border-[#8A6B4F] bg-[#8A6B4F] text-white' : 'border-[#E3DBD0] bg-white text-[#1E1A17] hover:bg-[#EDE7DE]')
                  }
                >
                  <Heart className={'w-4 h-4 ' + (isWish ? 'fill-current' : '')} />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

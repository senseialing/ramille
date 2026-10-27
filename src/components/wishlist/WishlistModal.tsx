'use client';

import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useCartStore } from '@/stores/cart-store';
import { Product } from '@/types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export function WishlistModal({ isOpen, onClose, onSelectProduct }: WishlistModalProps) {
  const { items, toggleWishlist, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />

      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden p-6 sm:p-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E3DBD0]">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-[#8A6B4F] fill-current" />
            <h3 className="text-xl font-serif text-[#1E1A17]">Daftar Favorit Saya ({items.length})</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EDE7DE] text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-sm text-[#1E1A17] font-medium">Belum ada produk favorit.</p>
              <p className="text-xs text-[#70655B]">Klik ikon hati pada produk untuk menyimpannya di sini.</p>
            </div>
          ) : (
            items.map((prod) => (
              <div
                key={prod.id}
                className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#E3DBD0]"
              >
                <div
                  onClick={() => {
                    onSelectProduct(prod);
                    onClose();
                  }}
                  className="flex items-center space-x-3 cursor-pointer flex-1"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-14 h-16 object-cover rounded-lg bg-[#EDE7DE] shrink-0"
                  />
                  <div>
                    <h5 className="text-xs sm:text-sm font-medium text-[#1E1A17]">{prod.name}</h5>
                    <p className="text-xs font-semibold text-[#8A6B4F]">
                      {'Rp ' + prod.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      addItem(prod, 1);
                      toggleWishlist(prod);
                    }}
                    className="px-3 py-1.5 rounded-full bg-[#1E1A17] text-white text-[11px] font-semibold hover:bg-[#332D28] flex items-center space-x-1 cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Beli</span>
                  </button>
                  <button
                    onClick={() => toggleWishlist(prod)}
                    className="p-1.5 text-[#A89C8F] hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="pt-4 border-t border-[#E3DBD0] flex justify-end">
            <button
              onClick={clearWishlist}
              className="text-xs text-[#70655B] hover:text-rose-600 font-medium cursor-pointer"
            >
              Kosongkan Wishlist
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

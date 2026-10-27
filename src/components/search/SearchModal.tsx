'use client';

import React, { useState } from 'react';
import { X, Search, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (p: Product) => void;
}

export function SearchModal({ isOpen, onClose, onSelectProduct }: SearchModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = query.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />

      <div className="relative w-full max-w-xl bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#E3DBD0] flex items-center space-x-3 bg-white">
          <Search className="w-5 h-5 text-[#8A6B4F] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari busana, skincare, tas kulit, aromaterapi..."
            className="w-full text-sm sm:text-base bg-transparent text-[#1E1A17] outline-hidden placeholder:text-[#A89C8F]"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#70655B] hover:text-[#1E1A17] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-4 sm:p-6 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="text-center py-6 text-xs text-[#70655B]">
              Ketik nama produk atau kategori untuk mulai mencari.
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-xs text-[#70655B]">
              Tidak ada produk yang cocok dengan pencarian "{query}".
            </div>
          ) : (
            <div className="space-y-3">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center space-x-3 p-2.5 rounded-xl hover:bg-[#EDE7DE] transition-colors cursor-pointer group"
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-12 h-12 object-cover rounded-lg bg-white shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h5 className="text-xs sm:text-sm font-medium text-[#1E1A17] truncate">
                      {product.name}
                    </h5>
                    <p className="text-[11px] text-[#8A6B4F]">
                      {'Rp ' + product.price.toLocaleString('id-ID')} • {product.category}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#70655B] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

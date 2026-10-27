'use client';

import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

interface FeaturedProductsProps {
  selectedCategory: string | null;
  onClearCategory: () => void;
  onQuickView: (product: Product) => void;
}

export function FeaturedProducts({ selectedCategory, onClearCategory, onQuickView }: FeaturedProductsProps) {
  const [activeTab, setActiveTab] = useState<string>('All');
  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const tabs = ['All', 'Apparel & Linen', 'Skincare & Botanicals', 'Leather Goods', 'Home Sanctuary'];

  const filtered = PRODUCTS.filter((p) => {
    if (selectedCategory) {
      return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    }
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  return (
    <section id="products" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Title & Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6B4F]">
            CURATED COLLECTION
          </p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1A17] mt-1">
            {selectedCategory ? 'Kategori: ' + selectedCategory : 'Handpicked Essentials'}
          </h2>
        </div>

        {selectedCategory ? (
          <button
            onClick={onClearCategory}
            className="text-xs font-semibold text-[#8A6B4F] hover:underline self-start cursor-pointer"
          >
            ← Lihat Semua Kategori
          </button>
        ) : (
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={
                  'px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 cursor-pointer whitespace-nowrap ' +
                  (activeTab === tab
                    ? 'bg-[#1E1A17] text-white shadow-xs'
                    : 'bg-[#EDE7DE] text-[#70655B] hover:bg-[#E6DFD4] hover:text-[#1E1A17]')
                }
              >
                {tab}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {filtered.map((product) => {
          const isWish = isInWishlist(product.id);
          const formattedPrice = 'Rp ' + product.price.toLocaleString('id-ID');
          const formattedOriginal = product.originalPrice ? 'Rp ' + product.originalPrice.toLocaleString('id-ID') : null;

          return (
            <div
              key={product.id}
              className="group flex flex-col bg-[#FAF7F2] rounded-2xl border border-[#E3DBD0] p-3 hover:shadow-md transition-all duration-300"
            >
              {/* Product Thumbnail Frame */}
              <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-[#EDE7DE]">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Badge (e.g. Best Seller) */}
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase text-[#1E1A17]">
                    {product.badge}
                  </div>
                )}

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(product)}
                  aria-label="Wishlist"
                  className={
                    'absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer ' +
                    (isWish ? 'bg-[#8A6B4F] text-white' : 'bg-white/80 hover:bg-white text-[#1E1A17]')
                  }
                >
                  <Heart className={'w-4 h-4 ' + (isWish ? 'fill-current' : 'stroke-[1.5]')} />
                </button>

                {/* Hover Quick Actions */}
                <div className="absolute inset-x-3 bottom-3 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => onQuickView(product)}
                    className="flex-1 py-2.5 px-3 rounded-full bg-white/95 text-[#1E1A17] text-xs font-semibold hover:bg-white shadow-xs flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Quick View</span>
                  </button>
                  <button
                    onClick={() => addItem(product, 1)}
                    className="p-2.5 rounded-full bg-[#1E1A17] text-white hover:bg-[#332D28] shadow-xs cursor-pointer"
                    aria-label="Tambah ke Keranjang"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="pt-3 pb-1 flex flex-col flex-1">
                <span className="text-[11px] font-semibold text-[#8A6B4F] uppercase tracking-wider">
                  {product.category}
                </span>

                <h3 
                  onClick={() => onQuickView(product)}
                  className="text-base font-serif font-medium text-[#1E1A17] hover:text-[#8A6B4F] transition-colors mt-0.5 cursor-pointer line-clamp-1"
                >
                  {product.name}
                </h3>

                {/* Rating */}
                <div className="flex items-center space-x-1 mt-1 text-xs text-[#70655B]">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-[#1E1A17]">{product.rating}</span>
                  <span>({product.reviewCount})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mt-2 pt-2 border-t border-[#E3DBD0]/60">
                  <span className="text-sm sm:text-base font-semibold text-[#1E1A17]">
                    {formattedPrice}
                  </span>
                  {formattedOriginal && (
                    <span className="text-xs text-[#70655B] line-through">
                      {formattedOriginal}
                    </span>
                  )}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}

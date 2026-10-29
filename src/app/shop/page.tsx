'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { ProductModal } from '@/components/products/ProductModal';
import { SearchModal } from '@/components/search/SearchModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { WishlistModal } from '@/components/wishlist/WishlistModal';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { ShoppingBag, Heart, Star, SlidersHorizontal, Grid3X3, LayoutList, ChevronDown } from 'lucide-react';

const CATEGORIES = ['All', 'Apparel & Linen', 'Skincare & Botanicals', 'Leather Goods', 'Home Sanctuary', 'Jewelry & Accents'];
const SORT_OPTIONS = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Harga: Rendah ke Tinggi', value: 'price-asc' },
  { label: 'Harga: Tinggi ke Rendah', value: 'price-desc' },
  { label: 'Rating Tertinggi', value: 'rating' },
  { label: 'Terpopuler', value: 'popular' },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000000]);
  const [showFilters, setShowFilters] = useState(false);

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const { addItem } = useCartStore();
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }

    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [activeCategory, sortBy, priceRange]);

  const fmt = (n: number) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} onOpenWishlist={() => setIsWishlistOpen(true)} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1E1A17] via-[#2A2420] to-[#1E1A17] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(138,107,79,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(138,107,79,0.2) 0%, transparent 50%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-4">Koleksi Lengkap</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] mb-4">
            Shop <span className="italic text-[#C4A882]">All Products</span>
          </h1>
          <p className="text-[#A09688] max-w-xl text-base sm:text-lg leading-relaxed">
            Jelajahi seluruh koleksi kurasi Ramille — dari linen premium, botanical skincare, hingga leatherware artisan dan dekorasi rumah.
          </p>
          <div className="flex items-center gap-2 mt-6 text-sm text-[#A09688]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Shop</span>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 border border-[#D5CDC3] rounded-full text-sm text-[#1E1A17] hover:bg-[#EDE7DE] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <span className="text-sm text-[#70655B]">{filteredProducts.length} produk</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none px-4 py-2.5 pr-10 border border-[#D5CDC3] rounded-full text-sm text-[#1E1A17] bg-transparent hover:bg-[#EDE7DE] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#8A6B4F]/30"
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#70655B] pointer-events-none" />
            </div>
            <div className="hidden sm:flex items-center border border-[#D5CDC3] rounded-full overflow-hidden">
              <button onClick={() => setViewMode('grid')} className={`p-2.5 transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-[#1E1A17] text-white' : 'text-[#70655B] hover:bg-[#EDE7DE]'}`}>
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2.5 transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-[#1E1A17] text-white' : 'text-[#70655B] hover:bg-[#EDE7DE]'}`}>
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-white/60 backdrop-blur-sm rounded-2xl border border-[#EDE7DE] animate-in slide-in-from-top-2">
            <h3 className="text-sm font-semibold text-[#1E1A17] mb-4 tracking-wide uppercase">Kategori</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm transition-all cursor-pointer ${activeCategory === cat ? 'bg-[#1E1A17] text-white' : 'bg-[#EDE7DE] text-[#70655B] hover:bg-[#D5CDC3]'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <h3 className="text-sm font-semibold text-[#1E1A17] mb-3 tracking-wide uppercase">Rentang Harga</h3>
            <div className="flex items-center gap-3">
              <span className="text-sm text-[#70655B]">{fmt(priceRange[0])}</span>
              <input
                type="range"
                min={0}
                max={5000000}
                step={100000}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1 accent-[#8A6B4F]"
              />
              <span className="text-sm text-[#70655B]">{fmt(priceRange[1])}</span>
            </div>
          </div>
        )}

        {/* Product Grid / List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto text-[#D5CDC3] mb-4" />
            <p className="text-[#70655B] text-lg">Tidak ada produk yang cocok dengan filter Anda.</p>
            <button onClick={() => { setActiveCategory('All'); setPriceRange([0, 5000000]); }} className="mt-4 px-6 py-2.5 bg-[#1E1A17] text-white rounded-full text-sm hover:bg-[#2A2420] transition-colors cursor-pointer">
              Reset Filter
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-[#EDE7DE] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="relative aspect-[3/4] overflow-hidden cursor-pointer" onClick={() => setActiveProduct(product)}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  {product.badge && (
                    <span className="absolute top-3 left-3 px-3 py-1 bg-[#1E1A17]/80 backdrop-blur-sm text-white text-[10px] tracking-wider uppercase rounded-full">{product.badge}</span>
                  )}
                  {product.originalPrice && (
                    <span className="absolute top-3 right-3 px-2.5 py-1 bg-[#A0522D] text-white text-[10px] tracking-wider uppercase rounded-full">Sale</span>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
                    className={`absolute bottom-3 right-3 p-2.5 rounded-full backdrop-blur-sm transition-all cursor-pointer ${isInWishlist(product.id) ? 'bg-[#8A6B4F] text-white' : 'bg-white/80 text-[#70655B] hover:bg-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-[10px] text-[#8A6B4F] tracking-widest uppercase mb-1">{product.category}</p>
                  <h3 className="text-sm font-medium text-[#1E1A17] leading-snug mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-3 h-3 fill-[#8A6B4F] text-[#8A6B4F]" />
                    <span className="text-xs text-[#70655B]">{product.rating} ({product.reviewCount})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-sm font-semibold text-[#1E1A17]">{fmt(product.price)}</span>
                      {product.originalPrice && <span className="text-xs text-[#A09688] line-through ml-1.5">{fmt(product.originalPrice)}</span>}
                    </div>
                    <button
                      onClick={() => addItem(product)}
                      className="p-2 bg-[#1E1A17] text-white rounded-full hover:bg-[#8A6B4F] transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="flex gap-5 bg-white rounded-2xl overflow-hidden border border-[#EDE7DE] hover:shadow-lg transition-all duration-300 p-4">
                <div className="w-32 h-40 sm:w-44 sm:h-52 flex-shrink-0 rounded-xl overflow-hidden cursor-pointer" onClick={() => setActiveProduct(product)}>
                  <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <p className="text-[10px] text-[#8A6B4F] tracking-widest uppercase mb-1">{product.category}</p>
                    <h3 className="text-base font-medium text-[#1E1A17] mb-1">{product.name}</h3>
                    {product.subtitle && <p className="text-xs text-[#A09688] mb-2">{product.subtitle}</p>}
                    <p className="text-sm text-[#70655B] line-clamp-2 leading-relaxed">{product.description}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="w-3.5 h-3.5 fill-[#8A6B4F] text-[#8A6B4F]" />
                      <span className="text-xs text-[#70655B]">{product.rating} ({product.reviewCount} ulasan)</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-semibold text-[#1E1A17]">{fmt(product.price)}</span>
                      {product.originalPrice && <span className="text-sm text-[#A09688] line-through">{fmt(product.originalPrice)}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleWishlist(product)}
                        className={`p-2.5 rounded-full border transition-all cursor-pointer ${isInWishlist(product.id) ? 'border-[#8A6B4F] bg-[#8A6B4F] text-white' : 'border-[#D5CDC3] text-[#70655B] hover:bg-[#EDE7DE]'}`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => addItem(product)}
                        className="flex items-center gap-2 px-4 py-2.5 bg-[#1E1A17] text-white rounded-full text-sm hover:bg-[#8A6B4F] transition-colors cursor-pointer"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Tambah
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} onOpenAuth={() => setIsAuthOpen(true)} />
      <ProductModal product={activeProduct} onClose={() => setActiveProduct(null)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectProduct={(p) => setActiveProduct(p)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} onSelectProduct={(p) => setActiveProduct(p)} />
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { SearchModal } from '@/components/search/SearchModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { WishlistModal } from '@/components/wishlist/WishlistModal';
import { PRODUCTS } from '@/data/products';
import { ArrowRight } from 'lucide-react';

const CATEGORIES_DATA = [
  {
    name: 'Apparel & Linen',
    slug: 'apparel-linen',
    description: 'Koleksi busana linen premium dengan material organik yang lembut dan breathable. Dirancang untuk kenyamanan sehari-hari dengan sentuhan kemewahan yang tenang.',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=900&q=80',
    accent: '#C4A882',
  },
  {
    name: 'Skincare & Botanicals',
    slug: 'skincare-botanicals',
    description: 'Perawatan kulit berbasis botanical murni — cold-pressed, wildcrafted, dan 100% cruelty-free. Formulasi alami untuk kulit yang sehat dan bercahaya.',
    image: 'https://images.unsplash.com/photo-1608248597359-2ff43e3c5ec7?auto=format&fit=crop&w=900&q=80',
    accent: '#7B9E6B',
  },
  {
    name: 'Leather Goods',
    slug: 'leather-goods',
    description: 'Tas, dompet, dan aksesori dari kulit vegetable-tanned Italia berkualitas tinggi. Semakin indah seiring waktu dengan patina alami yang unik.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=80',
    accent: '#8A6B4F',
  },
  {
    name: 'Home Sanctuary',
    slug: 'home-sanctuary',
    description: 'Dekorasi rumah artisan — keramik hand-thrown, lilin aromaterapi soy wax, dan tekstil tenun tangan yang mengubah ruang menjadi tempat peristirahatan.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=80',
    accent: '#A08B78',
  },
  {
    name: 'Jewelry & Accents',
    slug: 'jewelry-accents',
    description: 'Perhiasan artisanal dari baroque pearl asli dan vermeil gold 18K. Setiap karya unik karena menghormati bentuk organik alami.',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80',
    accent: '#B8976A',
  },
  {
    name: 'Curated Living',
    slug: 'curated-living',
    description: 'Pilihan kurasi spesial lintas kategori — set hadiah eksklusif, koleksi musiman terbatas, dan essentials untuk gaya hidup yang penuh perhatian.',
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=900&q=80',
    accent: '#9B8B7E',
  },
];

export default function CategoriesPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} onOpenWishlist={() => setIsWishlistOpen(true)} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1E1A17] via-[#2A2420] to-[#1E1A17] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(138,107,79,0.4) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(196,168,130,0.2) 0%, transparent 50%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-4">Eksplorasi Dunia Kami</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] mb-4">
            Shop by <span className="italic text-[#C4A882]">Category</span>
          </h1>
          <p className="text-[#A09688] max-w-xl text-base sm:text-lg leading-relaxed">
            Setiap kategori dikurasi dengan cermat untuk menghadirkan produk berkualitas tinggi yang mencerminkan keindahan kesederhanaan.
          </p>
          <div className="flex items-center gap-2 mt-6 text-sm text-[#A09688]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Categories</span>
          </div>
        </div>
      </section>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CATEGORIES_DATA.map((cat, idx) => {
            const productCount = PRODUCTS.filter((p) => p.categorySlug === cat.slug).length;
            return (
              <Link
                href={`/shop?category=${encodeURIComponent(cat.name)}`}
                key={cat.slug}
                className={`group relative rounded-2xl overflow-hidden border border-[#EDE7DE] hover:shadow-2xl transition-all duration-500 ${idx === 0 ? 'md:col-span-2 aspect-[21/9]' : 'aspect-[16/10]'}`}
              >
                <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1A17] via-[#1E1A17]/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-8 h-[2px] rounded-full" style={{ backgroundColor: cat.accent }} />
                    <span className="text-[10px] tracking-[0.3em] uppercase font-medium" style={{ color: cat.accent }}>{productCount} Produk</span>
                  </div>
                  <h2 className="font-serif text-2xl sm:text-3xl text-white mb-2 group-hover:translate-x-1 transition-transform duration-300">{cat.name}</h2>
                  <p className="text-[#A09688] text-sm leading-relaxed max-w-lg mb-4 line-clamp-2">{cat.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-white group-hover:gap-3 transition-all duration-300">
                    <span>Lihat Koleksi</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <Footer />
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectProduct={() => {}} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} onSelectProduct={() => {}} />
    </div>
  );
}

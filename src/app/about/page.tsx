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
import { Leaf, Heart, Shield, Sparkles, Users, Globe } from 'lucide-react';

const VALUES = [
  {
    icon: 'Leaf',
    title: 'Sustainable Materials',
    desc: 'Setiap bahan dipilih dengan cermat — linen organik Eropa, kulit vegetable-tanned Italia, soy wax alami, dan botanical wildcrafted tanpa bahan sintetis berbahaya.',
  },
  {
    icon: 'Heart',
    title: 'Artisan Craftsmanship',
    desc: 'Bekerja sama dengan pengrajin lokal dan internasional yang menjunjung tinggi teknik tradisional: tenun tangan, wheel-throwing keramik, dan pewarnaan alami.',
  },
  {
    icon: 'Shield',
    title: 'Transparent & Ethical',
    desc: 'Rantai pasok yang terbuka dan adil. Kami menjamin seluruh mitra produksi mendapatkan upah layak dan bekerja dalam kondisi yang manusiawi.',
  },
  {
    icon: 'Sparkles',
    title: 'Quiet Luxury',
    desc: 'Kemewahan tidak harus berteriak. Kami percaya keindahan ada dalam kesederhanaan — desain tenang, material berkualitas, dan detail yang berbicara sendiri.',
  },
  {
    icon: 'Users',
    title: 'Community First',
    desc: 'Membangun komunitas pecinta gaya hidup mindful yang menghargai kualitas di atas kuantitas, dan keberlanjutan di atas tren sesaat.',
  },
  {
    icon: 'Globe',
    title: 'Mindful Living',
    desc: 'Setiap produk dirancang untuk bertahan lama — melawan budaya fast fashion dan konsumsi berlebihan demi planet yang lebih baik.',
  },
];

const MILESTONES = [
  { year: '2024', event: 'Ramille didirikan dengan visi menghadirkan quiet luxury yang accessible bagi semua.' },
  { year: '2025', event: 'Peluncuran koleksi perdana: Apparel & Linen, Botanical Skincare, dan Leather Goods.' },
  { year: '2025', event: 'Bermitra dengan 12+ pengrajin artisan dari Indonesia, Italia, dan Madagaskar.' },
  { year: '2026', event: 'Ekspansi ke kategori Home Sanctuary, Jewelry, dan Curated Living. Platform e-commerce resmi diluncurkan.' },
];

const iconMap: Record<string, React.ElementType> = { Leaf, Heart, Shield, Sparkles, Users, Globe };

export default function AboutPage() {
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
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(138,107,79,0.4) 0%, transparent 60%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative z-10 text-center">
          <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-4">Tentang Kami</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] mb-6">
            Cerita di Balik <span className="italic text-[#C4A882]">Ramille</span>
          </h1>
          <p className="text-[#A09688] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Kami percaya bahwa kemewahan sejati bukan tentang harga — melainkan tentang perhatian terhadap detail, kualitas material, dan keindahan yang bertahan melampaui musim.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-[#A09688]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">About</span>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Story Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-12 h-[2px] bg-[#8A6B4F] rounded-full" />
                <span className="text-[10px] tracking-[0.35em] uppercase text-[#8A6B4F] font-medium">Our Story</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1A17] mb-6 leading-snug">
                Didirikan dari Cinta terhadap <span className="italic text-[#8A6B4F]">Kualitas & Kesederhanaan</span>
              </h2>
              <div className="space-y-4 text-[#70655B] leading-relaxed">
                <p>
                  Ramille lahir dari keyakinan sederhana: produk yang dibuat dengan baik, dari bahan yang jujur, oleh tangan yang terampil, tidak memerlukan label yang berteriak untuk dikenali nilainya.
                </p>
                <p>
                  Di tengah hiruk-pikuk fast fashion dan konsumsi berlebihan, kami memilih jalan yang berbeda — mengkurasi koleksi yang merayakan keindahan material alami, teknik artisan tradisional, dan desain yang bersahaja namun memikat.
                </p>
                <p>
                  Dari linen Eropa yang breathable di musim panas hingga lilin aromaterapi soy wax yang menenangkan di malam hari, setiap produk Ramille dirancang untuk menemani momen-momen tenang dalam keseharian Anda.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=900&q=80"
                  alt="Ramille Atelier"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-32 bg-[#1E1A17] rounded-xl flex flex-col items-center justify-center text-white p-4 shadow-2xl">
                <span className="text-3xl font-serif font-light">2024</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#A09688] mt-1">Established</span>
              </div>
            </div>
          </div>
        </section>

        {/* Values Grid */}
        <section className="bg-[#1E1A17] text-white py-16 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-4">Nilai-Nilai Kami</p>
              <h2 className="font-serif text-3xl sm:text-4xl font-light">
                Prinsip yang <span className="italic text-[#C4A882]">Memandu</span> Kami
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {VALUES.map((v) => {
                const IconComp = iconMap[v.icon];
                return (
                  <div key={v.title} className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-[#8A6B4F]/20 flex items-center justify-center mb-4 group-hover:bg-[#8A6B4F]/30 transition-colors">
                      <IconComp className="w-6 h-6 text-[#C4A882]" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">{v.title}</h3>
                    <p className="text-sm text-[#A09688] leading-relaxed">{v.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-12">
            <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-4">Perjalanan Kami</p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1A17] font-light">
              Jejak <span className="italic text-[#8A6B4F]">Langkah</span> Ramille
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {MILESTONES.map((m, idx) => (
              <div key={idx} className="flex gap-6 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1E1A17] text-white flex items-center justify-center text-sm font-semibold flex-shrink-0">{m.year}</div>
                  {idx < MILESTONES.length - 1 && <div className="w-[2px] flex-1 bg-[#EDE7DE] mt-2" />}
                </div>
                <div className="pt-2.5 pb-6">
                  <p className="text-[#1E1A17] leading-relaxed">{m.event}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#EDE7DE] py-16 sm:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1A17] mb-4 font-light">
              Siap Menemukan Koleksi <span className="italic text-[#8A6B4F]">Anda?</span>
            </h2>
            <p className="text-[#70655B] max-w-lg mx-auto mb-8 leading-relaxed">
              Jelajahi produk-produk pilihan yang dikurasi khusus untuk Anda — dibuat dengan cinta, material terbaik, dan perhatian terhadap setiap detail.
            </p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E1A17] text-white rounded-full text-sm font-medium hover:bg-[#2A2420] transition-colors">
              Jelajahi Shop
              <Sparkles className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} onOpenAuth={() => setIsAuthOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onSelectProduct={() => {}} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} onSelectProduct={() => {}} />
    </div>
  );
}

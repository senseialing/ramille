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
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, CheckCircle } from 'lucide-react';

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'hello@ramille.com', href: 'mailto:hello@ramille.com' },
  { icon: Phone, label: 'WhatsApp', value: '+62 812-3456-7890', href: 'https://wa.me/6281234567890' },
  { icon: MapPin, label: 'Atelier & Studio', value: 'Jl. Kemang Raya No. 45, Jakarta Selatan 12730' },
  { icon: Clock, label: 'Jam Operasional', value: 'Senin – Sabtu, 09:00 – 18:00 WIB' },
];

const FAQ = [
  { q: 'Berapa lama estimasi pengiriman?', a: 'Untuk wilayah Jabodetabek 1-2 hari kerja, luar Jabodetabek 3-5 hari kerja. Kami menggunakan JNE Express dan SiCepat.' },
  { q: 'Apakah bisa return atau tukar barang?', a: 'Ya! Kami menerima pengembalian dalam 7 hari setelah barang diterima selama produk dalam kondisi asli dengan tag utuh.' },
  { q: 'Metode pembayaran apa saja yang tersedia?', a: 'Kami menerima QRIS, Transfer Bank (BCA, Mandiri, BRI), Kartu Kredit/Debit, dan GoPay melalui Midtrans.' },
  { q: 'Apakah produk skincare aman untuk kulit sensitif?', a: 'Seluruh produk botanical kami diformulasikan tanpa paraben, alkohol, dan fragrance sintetis. Namun, kami sarankan melakukan patch test terlebih dahulu.' },
];

export default function ContactPage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} onOpenAuth={() => setIsAuthOpen(true)} onOpenWishlist={() => setIsWishlistOpen(true)} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-br from-[#1E1A17] via-[#2A2420] to-[#1E1A17] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 60% 40%, rgba(138,107,79,0.4) 0%, transparent 50%)' }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10">
          <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-4">Hubungi Kami</p>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.15] mb-4">
            Get in <span className="italic text-[#C4A882]">Touch</span>
          </h1>
          <p className="text-[#A09688] max-w-xl text-base sm:text-lg leading-relaxed">
            Ada pertanyaan, saran, atau sekadar ingin menyapa? Tim kami siap membantu Anda dengan senang hati.
          </p>
          <div className="flex items-center gap-2 mt-6 text-sm text-[#A09688]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
        </div>
      </section>

      <main className="flex-1">
        {/* Contact Info Cards + Form */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {CONTACT_INFO.map((item) => (
              <div key={item.label} className="p-6 bg-white rounded-2xl border border-[#EDE7DE] hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 rounded-xl bg-[#EDE7DE] flex items-center justify-center mb-4 group-hover:bg-[#1E1A17] transition-colors">
                  <item.icon className="w-5 h-5 text-[#8A6B4F] group-hover:text-white transition-colors" />
                </div>
                <p className="text-[10px] tracking-[0.3em] uppercase text-[#8A6B4F] font-medium mb-1">{item.label}</p>
                {item.href ? (
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-sm text-[#1E1A17] font-medium hover:text-[#8A6B4F] transition-colors">
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-[#1E1A17] font-medium">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Form + Social */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-[#EDE7DE] p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageCircle className="w-5 h-5 text-[#8A6B4F]" />
                <h2 className="font-serif text-2xl text-[#1E1A17]">Kirim Pesan</h2>
              </div>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-serif text-[#1E1A17] mb-2">Pesan Terkirim!</h3>
                  <p className="text-sm text-[#70655B]">Terima kasih sudah menghubungi kami. Tim kami akan merespons dalam 1x24 jam.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="text-xs font-medium text-[#70655B] uppercase tracking-wider mb-1.5 block">Nama Lengkap</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Masukkan nama Anda"
                        className="w-full px-4 py-3 border border-[#D5CDC3] rounded-xl text-sm text-[#1E1A17] focus:outline-none focus:ring-2 focus:ring-[#8A6B4F]/30 focus:border-[#8A6B4F] transition-all bg-transparent placeholder:text-[#C5BDB3]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-[#70655B] uppercase tracking-wider mb-1.5 block">Email</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="email@contoh.com"
                        className="w-full px-4 py-3 border border-[#D5CDC3] rounded-xl text-sm text-[#1E1A17] focus:outline-none focus:ring-2 focus:ring-[#8A6B4F]/30 focus:border-[#8A6B4F] transition-all bg-transparent placeholder:text-[#C5BDB3]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#70655B] uppercase tracking-wider mb-1.5 block">Subjek</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Tentang apa pesan Anda?"
                      className="w-full px-4 py-3 border border-[#D5CDC3] rounded-xl text-sm text-[#1E1A17] focus:outline-none focus:ring-2 focus:ring-[#8A6B4F]/30 focus:border-[#8A6B4F] transition-all bg-transparent placeholder:text-[#C5BDB3]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#70655B] uppercase tracking-wider mb-1.5 block">Pesan</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tulis pesan Anda di sini..."
                      className="w-full px-4 py-3 border border-[#D5CDC3] rounded-xl text-sm text-[#1E1A17] focus:outline-none focus:ring-2 focus:ring-[#8A6B4F]/30 focus:border-[#8A6B4F] transition-all bg-transparent placeholder:text-[#C5BDB3] resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3.5 bg-[#1E1A17] text-white rounded-full text-sm font-medium hover:bg-[#8A6B4F] transition-colors cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Pesan
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Social */}
              <div className="bg-[#1E1A17] rounded-2xl p-6 sm:p-8 text-white">
                <h3 className="font-serif text-xl mb-4">Ikuti Kami</h3>
                <p className="text-sm text-[#A09688] mb-6 leading-relaxed">Temukan inspirasi gaya hidup, behind-the-scenes koleksi baru, dan penawaran eksklusif di media sosial kami.</p>
                <div className="space-y-3">
                  <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <svg className="w-5 h-5 text-[#C4A882]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                    <div>
                      <span className="text-sm font-medium block">@ramille.official</span>
                      <span className="text-[10px] text-[#A09688]">Instagram</span>
                    </div>
                  </a>
                  <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <Phone className="w-5 h-5 text-[#C4A882]" />
                    <div>
                      <span className="text-sm font-medium block">WhatsApp Chat</span>
                      <span className="text-[10px] text-[#A09688]">Respon cepat 1x24 jam</span>
                    </div>
                  </a>
                  <a href="mailto:hello@ramille.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group">
                    <Mail className="w-5 h-5 text-[#C4A882]" />
                    <div>
                      <span className="text-sm font-medium block">hello@ramille.com</span>
                      <span className="text-[10px] text-[#A09688]">Email Support</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Store Hours */}
              <div className="bg-white rounded-2xl border border-[#EDE7DE] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-[#8A6B4F]" />
                  <h3 className="font-serif text-lg text-[#1E1A17]">Jam Layanan</h3>
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#70655B]">Senin – Jumat</span>
                    <span className="text-[#1E1A17] font-medium">09:00 – 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#70655B]">Sabtu</span>
                    <span className="text-[#1E1A17] font-medium">10:00 – 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#70655B]">Minggu</span>
                    <span className="text-[#A09688]">Libur</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-[#EDE7DE] py-12 sm:py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <p className="text-[#8A6B4F] text-xs tracking-[0.35em] uppercase font-medium mb-3">FAQ</p>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1A17] font-light">
                Pertanyaan <span className="italic text-[#8A6B4F]">Umum</span>
              </h2>
            </div>
            <div className="space-y-3">
              {FAQ.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-[#EDE7DE] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left cursor-pointer"
                  >
                    <span className="text-sm font-medium text-[#1E1A17] pr-4">{item.q}</span>
                    <span className={`text-[#8A6B4F] text-xl transition-transform duration-300 flex-shrink-0 ${openFaq === idx ? 'rotate-45' : ''}`}>+</span>
                  </button>
                  {openFaq === idx && (
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-sm text-[#70655B] leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
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

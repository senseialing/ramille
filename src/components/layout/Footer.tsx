import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#161311] text-[#E3DBD0] pt-16 pb-12 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#2A2420]">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-serif text-[#C4A480]">✻</span>
              <span className="text-2xl font-serif text-white tracking-wide">Ramille</span>
            </div>
            
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4A480]">
              STYLE • BEAUTY • LIFESTYLE
            </p>
            
            <p className="text-xs sm:text-sm text-[#A89C8F] leading-relaxed max-w-sm">
              Carefully curated wardrobe pieces, skincare rituals, and refined daily essentials designed for effortless, everyday quiet luxury.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              QUICK LINKS
            </h5>
            <ul className="space-y-2 text-xs text-[#A89C8F]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="#products" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="#about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="md:col-span-3 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              CUSTOMER CARE
            </h5>
            <ul className="space-y-2 text-xs text-[#A89C8F]">
              <li><Link href="#" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Track Order</Link></li>
              <li><Link href="/admin" className="text-[#C4A480] hover:text-white font-semibold transition-colors flex items-center space-x-1"><span>Admin Portal</span> <span>→</span></Link></li>
            </ul>
          </div>

          {/* Follow Us */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-white">
              FOLLOW US
            </h5>
            <div className="flex items-center space-x-3 text-sm">
              <span className="w-8 h-8 rounded-full bg-[#26211D] hover:bg-[#332D28] flex items-center justify-center cursor-pointer text-xs">IG</span>
              <span className="w-8 h-8 rounded-full bg-[#26211D] hover:bg-[#332D28] flex items-center justify-center cursor-pointer text-xs">TT</span>
              <span className="w-8 h-8 rounded-full bg-[#26211D] hover:bg-[#332D28] flex items-center justify-center cursor-pointer text-xs">FB</span>
              <span className="w-8 h-8 rounded-full bg-[#26211D] hover:bg-[#332D28] flex items-center justify-center cursor-pointer text-xs">PIN</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70655B]">
          <p>© 2026 Ramille. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-[11px] font-semibold text-[#A89C8F]">
            <span className="px-2 py-1 bg-[#26211D] rounded-sm">MIDTRANS</span>
            <span className="px-2 py-1 bg-[#26211D] rounded-sm">BCA VA</span>
            <span className="px-2 py-1 bg-[#26211D] rounded-sm">QRIS</span>
            <span className="px-2 py-1 bg-[#26211D] rounded-sm">MANDIRI</span>
            <span className="px-2 py-1 bg-[#26211D] rounded-sm">VISA/MC</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

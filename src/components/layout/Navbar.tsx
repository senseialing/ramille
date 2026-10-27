'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Heart, User, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenWishlist: () => void;
}

export function Navbar({ onOpenSearch, onOpenAuth, onOpenWishlist }: NavbarProps) {
  const { openCart, getItemCount } = useCartStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const itemCount = getItemCount();

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center space-x-2 text-[#1E1A17]">
            <span className="text-xl font-serif tracking-tight text-[#8A6B4F] group-hover:rotate-45 transition-transform duration-500">
              ✻
            </span>
            <span className="text-2xl sm:text-3xl font-serif tracking-wide font-normal">
              Ramille
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#70655B]">
            <Link 
              href="/" 
              className="text-[#1E1A17] border-b border-[#1E1A17] pb-1 transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="hover:text-[#1E1A17] transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/categories" 
              className="hover:text-[#1E1A17] transition-colors"
            >
              Categories
            </Link>
            <Link 
              href="/about" 
              className="hover:text-[#1E1A17] transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="hover:text-[#1E1A17] transition-colors"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-[#1E1A17]">
            {/* Search */}
            <button
              onClick={onOpenSearch}
              aria-label="Pencarian"
              className="p-2 hover:bg-[#EDE7DE] rounded-full transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>

            {/* Wishlist */}
            <button
              onClick={onOpenWishlist}
              aria-label="Favorit / Wishlist"
              className="p-2 hover:bg-[#EDE7DE] rounded-full transition-colors relative cursor-pointer"
            >
              <Heart className="w-5 h-5 stroke-[1.5]" />
              {wishlistItems.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8A6B4F] text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* User Account / Profile Link */}
            <Link
              href="/account"
              aria-label="Akun & Pesanan Saya"
              className="p-2 hover:bg-[#EDE7DE] rounded-full transition-colors cursor-pointer text-[#1E1A17]"
              title="Akun & Status Pesanan Saya"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </Link>

            {/* Cart Trigger with Badge */}
            <button
              onClick={openCart}
              aria-label="Keranjang Belanja"
              className="p-2 hover:bg-[#EDE7DE] rounded-full transition-colors relative cursor-pointer"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
              {itemCount > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#1E1A17] text-white text-[10px] font-semibold flex items-center justify-center rounded-full animate-in zoom-in-75">
                  {itemCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}

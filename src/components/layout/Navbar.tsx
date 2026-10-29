'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, Heart, User, ShoppingBag, LogOut } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';
import { useAuthStore } from '@/stores/auth-store';
import { useMounted } from '@/hooks/use-mounted';

interface NavbarProps {
  onOpenSearch: () => void;
  onOpenAuth: () => void;
  onOpenWishlist: () => void;
}

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/categories', label: 'Categories' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar({ onOpenSearch, onOpenAuth, onOpenWishlist }: NavbarProps) {
  const { openCart, getItemCount } = useCartStore();
  const wishlistItems = useWishlistStore((s) => s.items);
  const { user, isLoggedIn, logout } = useAuthStore();
  const isMounted = useMounted();
  const itemCount = isMounted ? getItemCount() : 0;
  const wishlistCount = isMounted ? wishlistItems.length : 0;
  const loggedIn = isMounted ? isLoggedIn : false;
  const pathname = usePathname();

  const handleLogout = () => {
    if (confirm('Apakah Anda yakin ingin keluar dari akun Ramille?')) {
      logout();
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center space-x-2 text-[#1E1A17]">
            <span className="text-xl font-serif tracking-tight text-[#8A6B4F] group-hover:rotate-45 transition-transform duration-500">
              ✦
            </span>
            <span className="text-2xl sm:text-3xl font-serif tracking-wide font-normal">
              Ramille
            </span>
          </Link>

          {/* Center Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#70655B]">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`pb-1 transition-all duration-300 ${
                    isActive
                      ? 'text-[#1E1A17] border-b border-[#1E1A17]'
                      : 'hover:text-[#1E1A17] border-b border-transparent'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 text-[#1E1A17]">
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
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#8A6B4F] text-white text-[10px] font-semibold flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* User Account / Profile / Logout */}
            {loggedIn ? (
              <div className="flex items-center space-x-1 sm:space-x-1.5 bg-[#EDE7DE]/60 p-1 pl-1.5 pr-1.5 rounded-full border border-[#E3DBD0]/80">
                <Link
                  href="/account"
                  aria-label="Akun & Pesanan Saya"
                  className="flex items-center space-x-1.5 hover:opacity-80 transition-opacity cursor-pointer text-[#1E1A17]"
                  title={`Akun: ${user?.name || user?.email}`}
                >
                  <div className="w-6 h-6 rounded-full bg-[#8A6B4F] text-white flex items-center justify-center text-[11px] font-semibold">
                    {(user?.name || user?.email || 'U')[0].toUpperCase()}
                  </div>
                  <span className="hidden sm:inline text-xs font-medium max-w-[90px] truncate text-[#1E1A17]">
                    {user?.name || user?.email?.split('@')[0]}
                  </span>
                </Link>
                <div className="w-[1px] h-3.5 bg-[#D5CBBE]" />
                <button
                  onClick={handleLogout}
                  aria-label="Tombol Keluar / Log Out"
                  title="Keluar dari akun"
                  className="p-1 text-[#70655B] hover:text-rose-600 rounded-full transition-colors cursor-pointer flex items-center"
                >
                  <LogOut className="w-4 h-4 stroke-[1.75]" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                aria-label="Masuk ke Akun"
                className="p-2 hover:bg-[#EDE7DE] rounded-full transition-colors cursor-pointer text-[#1E1A17]"
                title="Masuk / Daftar Akun"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>
            )}

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
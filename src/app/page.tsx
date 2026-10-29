'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/home/Hero';
import { CategorySlider } from '@/components/home/CategorySlider';
import { TrustFeatures } from '@/components/home/TrustFeatures';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CustomerReviews } from '@/components/home/CustomerReviews';
import { Newsletter } from '@/components/home/Newsletter';
import { Footer } from '@/components/layout/Footer';

import { CartDrawer } from '@/components/cart/CartDrawer';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';
import { ProductModal } from '@/components/products/ProductModal';
import { SearchModal } from '@/components/search/SearchModal';
import { AuthModal } from '@/components/auth/AuthModal';
import { WishlistModal } from '@/components/wishlist/WishlistModal';
import { Product } from '@/types';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FAF7F2]">
      {/* Top Navigation */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 1. Hero Showcase (Screenshot 1 Match) */}
        <Hero />

        {/* 2. Shop by Category (Screenshot 1 Bottom Match) */}
        <CategorySlider
          onSelectCategory={(catName) => {
            setSelectedCategory(catName);
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Curated Products Grid */}
        <FeaturedProducts
          selectedCategory={selectedCategory}
          onClearCategory={() => setSelectedCategory(null)}
          onQuickView={(prod) => setActiveProduct(prod)}
        />

        {/* 4. Trust Badges / Value Props (Screenshot 2 Top Match) */}
        <TrustFeatures />

        {/* 5. Customer Reviews (Screenshot 2 Middle Match) */}
        <CustomerReviews />

        {/* 6. Newsletter Subscription (Screenshot 2 Bottom Match) */}
        <Newsletter />
      </main>

      {/* Luxury Dark Footer (Screenshot 2 Bottom Match) */}
      <Footer />

      {/* Interactive Cart Slide-over Drawer (Zustand) */}
      <CartDrawer
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Checkout & Midtrans Sandbox Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Product Quick View Modal */}
      <ProductModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setActiveProduct(p)}
      />

      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        onSelectProduct={(p) => setActiveProduct(p)}
      />
    </div>
  );
}

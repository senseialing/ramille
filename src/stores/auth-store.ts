'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useCartStore } from '@/stores/cart-store';
import { useWishlistStore } from '@/stores/wishlist-store';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

interface AuthState {
  user: UserProfile | null;
  isLoggedIn: boolean;
  login: (userData: { email: string; name?: string; phone?: string; address?: string; city?: string; postalCode?: string }) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoggedIn: false,
      login: ({ email, name, phone, address, city, postalCode }) => {
        const cleanEmail = email.trim().toLowerCase();
        const derivedName = name && name.trim() ? name.trim() : email.split('@')[0];
        
        // 1. Set Auth state
        set({
          isLoggedIn: true,
          user: {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            name: derivedName,
            email: cleanEmail,
            phone: phone || '081298765432',
            address: address || 'Jl. Senopati No. 45, Kebayoran Baru',
            city: city || 'Jakarta Selatan',
            postalCode: postalCode || '12190',
          },
        });

        // 2. Restore this specific user's cart & wishlist from per-user storage (Shopee style)
        if (typeof window !== 'undefined') {
          try {
            const savedCart = localStorage.getItem('ramille-cart-user-' + cleanEmail);
            if (savedCart) {
              const parsed = JSON.parse(savedCart);
              useCartStore.setState({ items: Array.isArray(parsed) ? parsed : [] });
            } else {
              useCartStore.setState({ items: [] });
            }

            const savedWishlist = localStorage.getItem('ramille-wishlist-user-' + cleanEmail);
            if (savedWishlist) {
              const parsedWishlist = JSON.parse(savedWishlist);
              useWishlistStore.setState({ items: Array.isArray(parsedWishlist) ? parsedWishlist : [] });
            } else {
              useWishlistStore.setState({ items: [] });
            }
          } catch (e) {
            console.error('Error restoring user storage:', e);
          }
        }
      },
      logout: () => {
        const currentUser = get().user;
        if (typeof window !== 'undefined' && currentUser?.email) {
          try {
            const userEmail = currentUser.email.trim().toLowerCase();
            // Save current cart and wishlist into this user's isolated storage
            const cartItems = useCartStore.getState().items;
            localStorage.setItem('ramille-cart-user-' + userEmail, JSON.stringify(cartItems));

            const wishlistItems = useWishlistStore.getState().items;
            localStorage.setItem('ramille-wishlist-user-' + userEmail, JSON.stringify(wishlistItems));

            // Clean active shared storage
            localStorage.removeItem('ramille-cart-v2');
            localStorage.removeItem('ramille-wishlist-v2');
          } catch (e) {
            console.error('Error saving user data on logout:', e);
          }
        }

        // Instantly empty active cart & wishlist in memory (Shopee style)
        useCartStore.getState().clearCart();
        useWishlistStore.getState().clearWishlist();

        set({
          isLoggedIn: false,
          user: null,
        });
      },
      updateProfile: (data) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...data } : null,
        }));
      },
    }),
    {
      name: 'ramille-auth-storage',
    }
  )
);
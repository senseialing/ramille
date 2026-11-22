if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('ramille-wishlist-storage');
  } catch (e) {}
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => boolean;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
}

const syncUserWishlist = (items: Product[]) => {
  if (typeof window !== 'undefined') {
    try {
      const authRaw = localStorage.getItem('ramille-auth-storage');
      if (authRaw) {
        const parsed = JSON.parse(authRaw);
        const email = parsed?.state?.user?.email;
        if (email) {
          localStorage.setItem('ramille-wishlist-user-' + email.trim().toLowerCase(), JSON.stringify(items));
        }
      }
    } catch (e) {}
  }
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggleWishlist: (product: Product) => {
        const exists = get().items.some((item) => item.id === product.id);
        let updated: Product[];
        if (exists) {
          updated = get().items.filter((item) => item.id !== product.id);
          syncUserWishlist(updated);
          set({ items: updated });
          return false;
        } else {
          updated = [...get().items, product];
          syncUserWishlist(updated);
          set({ items: updated });
          return true;
        }
      },
      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.id === productId);
      },
      clearWishlist: () => {
        syncUserWishlist([]);
        set({ items: [] });
      },
    }),
    {
      name: 'ramille-wishlist-v2',
    }
  )
);

if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('ramille-cart-storage');
    localStorage.removeItem('ramille-wishlist-storage');
  } catch (e) {}
}

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, Coupon } from '@/types';
import { AVAILABLE_COUPONS } from '@/data/products';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  addItem: (product: Product, quantity?: number, selectedVariant?: string) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  
  getItemCount: () => number;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingFee: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      appliedCoupon: null,
      couponError: null,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product: Product, quantity = 1, selectedVariant) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) => item.product.id === product.id && item.selectedVariant === selectedVariant
          );

          if (existingIndex > -1) {
            const updated = [...state.items];
            const currentQty = updated[existingIndex].quantity;
            const newQty = Math.min(currentQty + quantity, product.stock);
            updated[existingIndex] = { ...updated[existingIndex], quantity: newQty };
            return { items: updated, isOpen: true };
          } else {
            return {
              items: [...state.items, { product, quantity: Math.min(quantity, product.stock), selectedVariant }],
              isOpen: true,
            };
          }
        });
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        }));
      },

      updateQuantity: (productId: string, quantity: number) => {
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.product.id !== productId) };
          }
          return {
            items: state.items.map((item) => {
              if (item.product.id === productId) {
                const maxStock = item.product.stock;
                return { ...item, quantity: Math.min(quantity, maxStock) };
              }
              return item;
            }),
          };
        });
      },

      clearCart: () => set({ items: [], appliedCoupon: null, couponError: null }),

      applyCoupon: (code: string) => {
        const trimmed = code.trim().toUpperCase();
        const found = AVAILABLE_COUPONS.find((c) => c.code === trimmed);

        if (!found) {
          const msg = 'Kode promo tidak valid atau telah kedaluwarsa.';
          set({ couponError: msg });
          return { success: false, message: msg };
        }

        const subtotal = get().getSubtotal();
        if (subtotal < found.minPurchase) {
          const diff = found.minPurchase - subtotal;
          const msg = 'Minimum belanja Rp ' + found.minPurchase.toLocaleString('id-ID') + ' untuk kupon ini (kurang Rp ' + diff.toLocaleString('id-ID') + ').';
          set({ couponError: msg });
          return { success: false, message: msg };
        }

        set({ appliedCoupon: found, couponError: null });
        return { success: true, message: 'Kupon ' + found.code + ' berhasil digunakan!' };
      },

      removeCoupon: () => set({ appliedCoupon: null, couponError: null }),

      getItemCount: () => {
        return get().items.reduce((acc, item) => acc + item.quantity, 0);
      },

      getSubtotal: () => {
        return get().items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
      },

      getDiscountAmount: () => {
        const { appliedCoupon } = get();
        if (!appliedCoupon) return 0;
        const subtotal = get().getSubtotal();
        if (appliedCoupon.discountType === 'percentage') {
          return Math.round((subtotal * appliedCoupon.value) / 100);
        }
        return Math.min(appliedCoupon.value, subtotal);
      },

      getShippingFee: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        return subtotal >= 500000 ? 0 : 35000;
      },

      getTotalAmount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0) return 0;
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingFee();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: 'ramille-cart-v2',
      partialize: (state) => ({ items: state.items, appliedCoupon: state.appliedCoupon }),
    }
  )
);

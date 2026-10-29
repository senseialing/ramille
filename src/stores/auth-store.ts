'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
    (set) => ({
      user: null,
      isLoggedIn: false,
      login: ({ email, name, phone, address, city, postalCode }) => {
        const derivedName = name && name.trim() ? name.trim() : email.split('@')[0];
        set({
          isLoggedIn: true,
          user: {
            id: 'usr_' + Math.random().toString(36).substring(2, 9),
            name: derivedName,
            email: email.trim(),
            phone: phone || '081298765432',
            address: address || 'Jl. Senopati No. 45, Kebayoran Baru',
            city: city || 'Jakarta Selatan',
            postalCode: postalCode || '12190',
          },
        });
      },
      logout: () => {
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
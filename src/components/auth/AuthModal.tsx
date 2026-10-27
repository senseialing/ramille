'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User, CheckCircle2 } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(
      isRegister
        ? 'Pendaftaran akun berhasil! Mengalihkan ke Halaman Akun & Pesanan Anda...'
        : 'Berhasil masuk! Mengalihkan ke Halaman Akun & Pesanan Anda...'
    );
    setTimeout(() => {
      onClose();
      setMessage(null);
      window.location.href = '/account';
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/40 backdrop-blur-xs" />

      <div className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E3DBD0] overflow-hidden p-6 sm:p-8">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-serif text-[#8A6B4F]">✻</span>
            <h3 className="text-2xl font-serif text-[#1E1A17]">
              {isRegister ? 'Buat Akun Ramille' : 'Masuk ke Akun'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#EDE7DE] text-[#70655B] hover:text-[#1E1A17] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {message ? (
          <div className="py-8 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="text-xs sm:text-sm text-[#1E1A17] font-medium leading-relaxed">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {isRegister && (
              <div>
                <label className="text-xs text-[#70655B] font-medium block mb-1">Nama Lengkap</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#A89C8F] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Nama Anda"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs text-[#70655B] font-medium block mb-1">Alamat Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#A89C8F] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@anda.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-[#70655B] font-medium block mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#A89C8F] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E3DBD0] bg-white text-xs sm:text-sm text-[#1E1A17] outline-hidden focus:border-[#8A6B4F]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer mt-2"
            >
              {isRegister ? 'Daftar Sekarang' : 'Masuk'}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-xs text-[#8A6B4F] hover:underline cursor-pointer"
              >
                {isRegister ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Buat akun baru'}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import { RefreshCw, AlertTriangle, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('App Error Caught:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 border border-[#E3DBD0] shadow-xl text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif text-[#1E1A17]">Terjadi Kendala Memuat Data</h2>
          <p className="text-xs text-[#70655B] leading-relaxed">
            Halaman mengalami sedikit kendala sinkronisasi data keranjang. Anda dapat memuat ulang halaman untuk memperbarui data dengan lancar.
          </p>
        </div>
        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => {
              try {
                localStorage.removeItem('ramille-cart-v2');
                localStorage.removeItem('ramille-cart-storage');
              } catch (e) {}
              reset();
              window.location.reload();
            }}
            className="px-6 py-3 rounded-full bg-[#1E1A17] hover:bg-[#332D28] text-white text-xs font-semibold tracking-wide transition-all shadow-md cursor-pointer flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Muat Ulang Halaman</span>
          </button>
          <a
            href="/"
            className="px-6 py-3 rounded-full border border-[#E3DBD0] text-[#70655B] hover:text-[#1E1A17] hover:bg-[#EDE7DE] text-xs font-medium transition-all flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Kembali ke Beranda</span>
          </a>
        </div>
      </div>
    </div>
  );
}

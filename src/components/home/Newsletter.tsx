'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-[#EDE7DE] rounded-2xl p-6 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Icon & Copy */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center text-[#8A6B4F] shrink-0">
            <Mail className="w-6 h-6 stroke-[1.5]" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-serif text-[#1E1A17]">
              Join Our Newsletter
            </h3>
            <p className="text-xs sm:text-sm text-[#70655B] mt-0.5">
              Be the first to know about new arrivals, special offers and more.
            </p>
          </div>
        </div>

        {/* Right Side: Pill Input */}
        <div className="w-full md:w-auto md:min-w-[420px]">
          {subscribed ? (
            <div className="flex items-center space-x-2 text-sm text-[#1E1A17] font-medium bg-white/70 px-6 py-3.5 rounded-full">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Terima kasih! Anda telah terdaftar dalam buletin Ramille.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center bg-white rounded-full p-1.5 shadow-xs border border-[#E3DBD0]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full px-4 text-xs sm:text-sm text-[#1E1A17] bg-transparent outline-hidden placeholder:text-[#70655B]"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-full bg-[#1E1A17] text-white text-xs font-semibold hover:bg-[#332D28] transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}

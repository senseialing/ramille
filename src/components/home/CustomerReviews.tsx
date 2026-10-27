'use client';

import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { REVIEWS } from '@/data/products';

export function CustomerReviews() {
  const [activeDot, setActiveDot] = useState(0);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
      {/* Title */}
      <div className="text-center space-y-2 mb-10">
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1A17]">
          What Our Customers Say
        </h2>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6B4F]">
          REAL PEOPLE. REAL EXPERIENCES.
        </p>
      </div>

      {/* Review Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E3DBD0] shadow-xs flex flex-col justify-between"
          >
            <div>
              {/* Customer Avatar & Stars */}
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-12 h-12 rounded-full object-cover border border-[#E3DBD0]"
                />
                <div>
                  <h4 className="text-sm font-bold text-[#1E1A17]">{rev.name}</h4>
                  <div className="flex items-center space-x-0.5 text-amber-500 mt-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Italic Testimonial Quote */}
              <p className="text-sm text-[#1E1A17] italic leading-relaxed font-serif">
                "{rev.quote}"
              </p>
            </div>

            {/* Location */}
            <p className="text-xs text-[#70655B] mt-6 font-medium">
              {rev.location}
            </p>
          </div>
        ))}
      </div>

      {/* Carousel Dots */}
      <div className="flex justify-center items-center space-x-2 mt-8">
        <span className="w-6 h-1.5 bg-[#1E1A17] rounded-full" />
        <span className="w-1.5 h-1.5 bg-[#CFC5B8] rounded-full" />
      </div>

    </section>
  );
}

'use client';

import React from 'react';
import { CATEGORIES } from '@/data/products';

interface CategorySliderProps {
  onSelectCategory: (categoryName: string) => void;
}

export function CategorySlider({ onSelectCategory }: CategorySliderProps) {
  return (
    <section id="categories" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header Titles */}
      <div className="text-center space-y-2 mb-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8A6B4F]">
          SHOP BY CATEGORY
        </p>
        <h2 className="text-3xl sm:text-4xl font-serif text-[#1E1A17]">
          Find What You Love
        </h2>
      </div>

      {/* Arched Circular Categories Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.name)}
            className="group flex flex-col items-center text-center cursor-pointer focus:outline-hidden"
          >
            {/* Arched / Circular Container */}
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-t-full rounded-b-2xl overflow-hidden bg-[#EDE7DE] p-1 shadow-xs group-hover:shadow-md transition-all duration-500">
              <div className="w-full h-full rounded-t-full rounded-b-xl overflow-hidden relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Category Label */}
            <span className="mt-3 text-sm font-medium text-[#1E1A17] group-hover:text-[#8A6B4F] transition-colors">
              {cat.name}
            </span>
            <span className="text-[11px] text-[#70655B]">
              {cat.itemCount} items
            </span>
          </button>
        ))}
      </div>

    </section>
  );
}

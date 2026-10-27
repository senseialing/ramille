'use client';

import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80',
    title: 'Autumn & Neutral Collection \'26',
    topTag: 'Good Things Ahead • QUIET ELEGANCE',
  },
  {
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80',
    title: 'Artisan Flax & Pure Silk Editions',
    topTag: 'Sustainable Living • HANDMADE',
  },
  {
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1200&q=80',
    title: 'Tuscan Leatherware & Accents',
    topTag: 'Vegetable Tanned • TIMELESS',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-14">
      {/* Outer Card with Warm Sandstone Background */}
      <div className="bg-[#EDE7DE] rounded-3xl p-6 sm:p-10 lg:p-14 shadow-xs relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Editorial Headline & Story */}
          <div className="lg:col-span-5 flex flex-col items-start space-y-6">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-xs text-[11px] font-semibold tracking-wider text-[#70655B] uppercase">
              STYLE MEETS COMFORT
            </div>

            {/* Serif Headline with Italic Accent */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif leading-[1.12] tracking-tight text-[#1E1A17]">
              Your Everyday Style,{' '}
              <span className="italic font-normal font-serif text-[#8A6B4F]">
                Upgraded
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-[#70655B] text-base sm:text-lg leading-relaxed font-sans max-w-md">
              Discover trendy fashion, beauty essentials and curated lifestyle picks — all in one quiet luxury sanctuary.
            </p>

            {/* CTA Pill Button */}
            <a
              href="#products"
              className="inline-flex items-center space-x-3 px-8 py-4 rounded-full bg-[#1E1A17] text-white hover:bg-[#332D28] transition-all duration-300 shadow-md group cursor-pointer"
            >
              <span className="text-sm font-medium tracking-wide">Shop Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>

          </div>

          {/* Right Column: Interactive Showcase Frame */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[16/11] sm:aspect-[16/10] bg-[#FAF7F2] shadow-sm">
              
              {/* Carousel Image */}
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].title}
                className="w-full h-full object-cover transition-opacity duration-700 ease-in-out"
              />

              {/* Top Floating Badge */}
              <div className="absolute top-4 right-4 bg-white/85 backdrop-blur-md px-3.5 py-1.5 rounded-lg shadow-xs hidden sm:block">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#70655B]">
                  {HERO_SLIDES[currentSlide].topTag}
                </span>
              </div>

              {/* Bottom Floating Pill Badge */}
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xs flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-[#8A6B4F] animate-pulse" />
                <span className="text-xs font-medium text-[#1E1A17]">
                  {HERO_SLIDES[currentSlide].title}
                </span>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Slide sebelumnya"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1E1A17] flex items-center justify-center transition-all shadow-xs cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Slide berikutnya"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#1E1A17] flex items-center justify-center transition-all shadow-xs cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

            </div>

            {/* Slider Indicator Dots */}
            <div className="flex justify-center items-center space-x-2 mt-4">
              {HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={'h-1.5 rounded-full transition-all duration-300 ' + (idx === currentSlide ? 'w-6 bg-[#1E1A17]' : 'w-1.5 bg-[#CFC5B8]')}
                  aria-label={'Slide ' + (idx + 1)}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

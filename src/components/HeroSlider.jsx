'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, ShieldCheck, Star, Users, CheckCircle } from 'lucide-react';
import { sliders, siteConfig } from '../data/poojasData';

export default function HeroSlider({ onSelectCategory, onExploreServices, onSelectServiceById }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % sliders.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % sliders.length);
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + sliders.length) % sliders.length);

  return (
    <div 
      className="relative w-full overflow-hidden bg-slate-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Carousel */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[580px] lg:h-[620px] w-full">
        {sliders.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image with Dark & Sacred Gold Vignette Overlay */}
            <div className="absolute inset-0">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30" />
            </div>

            {/* Content Container */}
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
              <div className="max-w-2xl text-white space-y-4 sm:space-y-6">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vermilion-600/90 backdrop-blur-md text-amber-100 text-xs sm:text-sm font-semibold tracking-wide border border-amber-400/30 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  <span>{slide.tag}</span>
                  <span className="w-1 h-1 rounded-full bg-amber-300"></span>
                  <span className="text-amber-200">{slide.subtitle}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight tracking-tight text-white drop-shadow-md">
                  {slide.title}
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base md:text-lg text-slate-200/90 leading-relaxed font-normal max-w-xl">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    onClick={() => onSelectCategory(slide.categoryId)}
                    className="flex items-center gap-2.5 bg-gradient-to-r from-vermilion-600 to-sacred-600 hover:from-vermilion-700 hover:to-sacred-700 text-white font-semibold px-6 py-3 rounded-full shadow-sacred hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Book Ritual Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={onExploreServices}
                    className="flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    <span>View All 52 Poojas</span>
                  </button>
                </div>

                {/* Trust Metrics Pill */}
                <div className="pt-3 flex items-center gap-4 text-xs sm:text-sm text-amber-200/90 font-medium">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span>Verified Veda Purohits</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Complete Samagri Provided</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button 
        onClick={nextSlide}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-sm border border-white/10 transition-all hover:scale-110"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {sliders.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide 
                ? 'w-8 h-2.5 bg-gradient-to-r from-vermilion-500 to-sacred-400 shadow-md' 
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Ribbon Bar */}
      <div className="relative z-20 bg-gradient-to-r from-sacred-900 via-vermilion-950 to-sacred-900 border-t border-sacred-600/30 py-3.5 px-4 text-amber-100">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-around gap-4 text-xs sm:text-sm">
          <div className="flex items-center gap-2 font-medium">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span><strong className="text-white">5.0 Star Rating</strong> from 500+ Devotee Reviews</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <Users className="w-4 h-4 text-amber-400" />
            <span><strong className="text-white">5,068+ Ceremonies</strong> Successfully Completed</span>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span><strong className="text-white">99.9%</strong> Devotee Satisfaction</span>
          </div>
        </div>
      </div>
    </div>
  );
}

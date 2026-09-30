'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { categories } from '../data/poojasData';

export default function CategoriesSection({ onSelectCategory, activeCategory }) {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-sacred-950/70 text-sacred-700 dark:text-sacred-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sacred-600" />
          <span>SACRED TRADITIONS & RITUALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
          Our Popular Categories
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
          Discover a complete spectrum of authentic Vedic ceremonies, homams, and poojas performed with divine precision by experienced Purohits.
        </p>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative cursor-pointer rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                isSelected 
                  ? 'bg-amber-50/90 dark:bg-slate-800 border-vermilion-600 ring-2 ring-vermilion-500 shadow-sacred' 
                  : 'bg-white dark:bg-slate-800/80 border-amber-100 dark:border-slate-700/60 hover:border-sacred-400 hover:shadow-sacred hover:-translate-y-1'
              }`}
            >
              {/* Category Icon Container */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-amber-50 dark:bg-slate-700/80 flex items-center justify-center p-2.5 transition-transform group-hover:scale-110 shadow-sm border border-amber-200/50 dark:border-slate-600">
                  <img 
                    src={cat.image} 
                    alt={cat.name} 
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                  {cat.servicesCount} Poojas
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-vermilion-600 dark:group-hover:text-sacred-400 transition-colors line-clamp-1">
                {cat.name}
              </h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                {cat.description || 'Authentic Vedic rituals and homams conducted according to sacred Shastras.'}
              </p>

              {/* Action Link */}
              <div className="mt-4 flex items-center gap-1 text-xs font-bold text-vermilion-600 dark:text-sacred-400 group-hover:translate-x-1 transition-transform">
                <span>Explore Poojas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

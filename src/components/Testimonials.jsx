'use client';

import React from 'react';
import { Star, Quote, Sparkles, CheckCircle2 } from 'lucide-react';
import { testimonials } from '../data/poojasData';

export default function Testimonials() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-slate-800 text-sacred-700 dark:text-sacred-400 text-xs font-semibold mb-3">
          <Sparkles className="w-3.5 h-3.5 text-sacred-600" />
          <span>DEVOTEE EXPERIENCES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
          What Our Devotees Say
        </h2>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">
          Experience perfection: 99.9% satisfied clients, 500+ verified reviews, and 5,068+ sacred ceremonies completed with supreme devotion.
        </p>
      </div>

      {/* Grid of Testimonials */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex flex-col justify-between bg-white dark:bg-slate-800/90 rounded-2xl p-6 border border-amber-100 dark:border-slate-700 shadow-sm hover:shadow-sacred transition-all duration-300"
          >
            <div>
              {/* Rating stars */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-amber-200 dark:text-slate-700" />
              </div>

              {/* Service Tag */}
              <div className="text-xs font-bold text-vermilion-600 dark:text-sacred-400 mb-2">
                {item.service}
              </div>

              {/* Comment text */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{item.comment}"
              </p>
            </div>

            {/* Author */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                    {item.name}
                  </h4>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-[11px] text-slate-400">
                  {item.location} • {item.date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

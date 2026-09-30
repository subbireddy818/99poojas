'use client';

import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, Heart, Award } from 'lucide-react';
import { siteConfig } from '../data/poojasData';

export default function AboutSection({ onExploreServices, onOpenSupport }) {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Image & Stats Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
            <img
              src="https://99poojas.in/storage/115/01.jpg"
              alt="99Poojas Sacred Traditions"
              className="w-full h-[420px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">Preserving Vedic Heritage</span>
              <h3 className="text-xl font-bold font-serif">5,068+ Ceremonies Successfully Conducted</h3>
            </div>
          </div>

          {/* Floating Trust Card */}
          <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sacred border border-amber-200 dark:border-slate-700 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-vermilion-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold text-slate-900 dark:text-white block font-serif">100% Authentic</span>
              <span className="text-xs text-slate-500">Pure Shastric Recitation</span>
            </div>
          </div>
        </div>

        {/* Right Narrative */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vermilion-50 dark:bg-slate-800 text-vermilion-700 dark:text-vermilion-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-vermilion-600" />
            <span>ABOUT 99POOJAS</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            Welcome to the Sacred Realm of Hindu Traditions with '99 Poojas'
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Welcome to the sacred realm of Hindu traditions with <strong>99 Poojas</strong>, your insightful and devotee-friendly platform designed to immerse you in the richness of traditional rituals and ceremonies. We bridge centuries of Vedic heritage with modern convenience, bringing verified Purohits directly to your doorstep across Hyderabad.
          </p>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Whether performing sacred Homams for health and prosperity, blissful Kalyanams, powerful Abhishekams, or solemn last rites, our certified Purohits ensure each ritual is conducted with uncompromised devotion, accurate Vedic mantras, and complete samagri.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {[
              'Personalized Home Pooja Services',
              'Experienced Purohits from Veda Paathashalas',
              'Transparent 30% Advance Booking',
              'Coverage across all Hyderabad Zones',
              'Vedic Astrological Muhurtham Support',
              'Strict Quality & Samagri Purity Guarantee'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <button
              onClick={onExploreServices}
              className="bg-gradient-to-r from-vermilion-600 to-sacred-600 hover:from-vermilion-700 hover:to-sacred-700 text-white font-bold px-7 py-3 rounded-full text-sm shadow-sacred hover:shadow-lg transition-all"
            >
              Browse All 52 Rituals
            </button>

            <button
              onClick={onOpenSupport}
              className="border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-semibold px-6 py-3 rounded-full text-sm transition-all"
            >
              Contact Support
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

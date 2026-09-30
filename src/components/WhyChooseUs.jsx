'use client';

import React from 'react';
import { ShieldCheck, Award, Clock, Sparkles, HeartHandshake, PhoneCall } from 'lucide-react';
import { siteConfig } from '../data/poojasData';

export default function WhyChooseUs({ onOpenSupport }) {
  const features = [
    {
      icon: <Award className="w-7 h-7 text-sacred-600" />,
      title: "Vedic Certified Scholars",
      desc: "Experienced Purohits trained in traditional Veda Paathashalas adhering strictly to Shastra vidhi."
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-sacred-600" />,
      title: "Complete Pure Samagri",
      desc: "We bring high-grade sacred ingredients, homam woods, and pooja items so you never face last-minute rush."
    },
    {
      icon: <Clock className="w-7 h-7 text-sacred-600" />,
      title: "Punctual & Doorstep Service",
      desc: "Guaranteed on-time arrival across all Hyderabad regions with personalized Muhurtham synchronization."
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-sacred-600" />,
      title: "Transparent Advance Dakshina",
      desc: "Clear upfront 30% advance pricing with no hidden charges and flexible cancellation policies."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-amber-50/50 to-white dark:from-slate-900 dark:to-slate-950 border-y border-amber-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vermilion-50 dark:bg-slate-800 text-vermilion-700 dark:text-vermilion-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-vermilion-600" />
            <span>DEVOTION & AUTHENTICITY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
            Why Choose 99Poojas As Your Trusted Spiritual Partner
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            With 99Poojas, every ritual is a seamless, soulful experience. Connect with authentic tradition and ensure your ceremonies are conducted with devotion, sanctity, and precision.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 border border-amber-100/80 dark:border-slate-700/60 shadow-sm hover:shadow-sacred hover:border-sacred-400 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center mb-5 border border-amber-200/50 dark:border-slate-600">
                {f.icon}
              </div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-2 font-serif">
                {f.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Live Helpline Callout Banner */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-vermilion-700 via-vermilion-600 to-sacred-700 text-white p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sacred">
          <div className="flex items-center gap-4 text-left">
            <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0">
              <PhoneCall className="w-7 h-7 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-bold font-serif">Need Guidance on Muhurtham or Ritual Selection?</h4>
              <p className="text-xs sm:text-sm text-amber-100/90 mt-0.5">
                Our senior Vedic astrologers and purohit coordinators are available for personalized assistance.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="bg-white text-vermilion-700 hover:bg-amber-100 font-bold px-6 py-3 rounded-full text-sm shadow-md transition-all whitespace-nowrap"
            >
              Call {siteConfig.phoneFormatted}
            </a>
            <button
              onClick={onOpenSupport}
              className="bg-black/20 hover:bg-black/30 text-white border border-white/30 font-semibold px-5 py-3 rounded-full text-sm transition-all whitespace-nowrap"
            >
              Inquire Online
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

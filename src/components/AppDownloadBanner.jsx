'use client';

import React from 'react';
import { Smartphone, CheckCircle, Sparkles, Star } from 'lucide-react';
import { siteConfig } from '../data/poojasData';

export default function AppDownloadBanner() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="relative rounded-3xl bg-gradient-to-br from-sacred-900 via-vermilion-950 to-slate-950 text-white p-8 sm:p-12 lg:p-16 border border-sacred-600/30 shadow-sacred-lg">
        
        {/* Background glow motifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sacred-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-vermilion-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-vermilion-600/80 backdrop-blur-md text-amber-100 text-xs font-semibold">
              <Smartphone className="w-3.5 h-3.5 text-amber-300" />
              <span>99POOJAS MOBILE APP</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight">
              Experience Sacred Traditions Right in Your Pocket
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
              With our easy-to-use mobile app, booking certified Purohits for any auspicious occasion has never been simpler. Track your booking, consult for Muhurtham, and manage all your family rituals effortlessly.
            </p>

            <div className="space-y-3 pt-2">
              {[
                'Instant Purohit booking in under 2 minutes',
                'Live Muhurtham calendar & Panchangam guidance',
                'Pre-arranged sacred Pooja Samagri kits delivered to doorstep',
                'Secure online advance payments & instant digital receipts'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-amber-100">
                  <CheckCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* App Store Download Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a 
                href="#download" 
                onClick={(e) => { e.preventDefault(); alert('Downloading 99Poojas Android App from Google Play Store...'); }}
                className="transform hover:scale-105 transition-transform"
              >
                <img 
                  src={siteConfig.appLinks.googlePlay} 
                  alt="Get it on Google Play" 
                  className="h-12 w-auto object-contain rounded-xl shadow-md border border-white/20"
                />
              </a>
              <a 
                href="#download" 
                onClick={(e) => { e.preventDefault(); alert('Downloading 99Poojas iOS App from Apple App Store...'); }}
                className="transform hover:scale-105 transition-transform"
              >
                <img 
                  src={siteConfig.appLinks.appStore} 
                  alt="Download on the App Store" 
                  className="h-12 w-auto object-contain rounded-xl shadow-md border border-white/20"
                />
              </a>
            </div>

            <div className="flex items-center gap-3 pt-2 text-xs text-amber-200/80">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
              </div>
              <span>Rated 4.9/5 by 2,000+ devotees across Telangana & AP</span>
            </div>
          </div>

          {/* Right Phone Mockup */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-64 sm:w-72 lg:w-80 filter drop-shadow-2xl transform hover:-rotate-1 transition-transform duration-500">
              <img 
                src={siteConfig.appLinks.phoneMockup} 
                alt="99Poojas App Mockup" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

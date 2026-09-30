'use client';

import React from 'react';
import { 
  X, 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  User, 
  CalendarCheck, 
  Heart, 
  Share2, 
  Sparkles,
  CheckCircle2,
  Phone
} from 'lucide-react';
import { siteConfig } from '../data/poojasData';

export default function ServiceDetailModal({ 
  service, 
  onClose, 
  onBookService,
  isWishlisted,
  onToggleWishlist,
  onShare
}) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200/50 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Left Media & Image Column */}
          <div className="md:col-span-5 relative bg-amber-50 dark:bg-slate-950 p-6 flex flex-col justify-between">
            <div>
              <div className="rounded-2xl overflow-hidden shadow-md relative h-64 sm:h-72 w-full bg-slate-900">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-vermilion-600 text-white shadow">
                  {service.categoryName}
                </span>
              </div>

              {/* Provider Information Box */}
              <div className="mt-6 p-4 rounded-2xl bg-white dark:bg-slate-800/80 border border-amber-100 dark:border-slate-700">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sacred-600 dark:text-sacred-400">
                  Certified Purohit
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-amber-100 border-2 border-sacred-400 p-0.5">
                    <img 
                      src={service.provider.image} 
                      alt={service.provider.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {service.provider.name}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {service.provider.experience}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    5.0 (Vedic Verified)
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    ✓ Verified Pandits
                  </span>
                </div>
              </div>
            </div>

            {/* Helpline quick dial */}
            <div className="mt-6 pt-4 border-t border-amber-200/40 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2">
              <Phone className="w-4 h-4 text-vermilion-600" />
              <span>Have questions? Call <a href={`tel:${siteConfig.phone}`} className="font-bold text-vermilion-600 hover:underline">{siteConfig.phoneFormatted}</a></span>
            </div>
          </div>

          {/* Right Details Column */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              {/* Rating & Actions */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-500">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-slate-800 dark:text-slate-200 font-bold text-sm">5.0</span>
                  <span className="text-slate-400">({service.reviewsCount} Devotee Reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleWishlist(service.id)}
                    className={`p-2 rounded-full border transition-colors ${
                      isWishlisted 
                        ? 'bg-vermilion-50 dark:bg-vermilion-950/40 border-vermilion-400 text-vermilion-600' 
                        : 'border-slate-200 dark:border-slate-700 text-slate-600 hover:text-vermilion-600'
                    }`}
                    title="Save to Wishlist"
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  <button
                    onClick={onShare}
                    className="p-2 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-sacred-600 transition-colors"
                    title="Share this Ritual"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-3">
                {service.name}
              </h2>

              {/* Price & Duration Strip */}
              <div className="mt-4 p-4 rounded-2xl bg-amber-50/70 dark:bg-slate-800/60 border border-amber-200/60 dark:border-slate-700 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Pooja Dakshina</span>
                  <div className="text-2xl font-bold text-vermilion-600 dark:text-sacred-400">
                    {service.priceFormatted}
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Advance to Confirm</span>
                  <div className="text-sm font-bold text-slate-800 dark:text-slate-200">
                    30% (₹{(service.price * 0.3).toLocaleString('en-IN')})
                  </div>
                </div>
              </div>

              {/* Full Description */}
              <div className="mt-6 space-y-3">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sacred-600" />
                  <span>About this Sacred Ceremony</span>
                </h4>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Ritual Highlights */}
              <div className="mt-6 space-y-2.5">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">What is Included:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Experienced Vedic Scholar Pandit</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Complete Authentic Samagri</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Traditional Shastra Vidhi Recitation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>Muhurtham & Gothra Sankalpam</span>
                  </div>
                </div>
              </div>

              {/* Available Locations */}
              <div className="mt-6">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-sacred-600" />
                  <span>Available Across Hyderabad</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {service.availableLocations.slice(0, 5).map((loc, i) => (
                    <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {loc}
                    </span>
                  ))}
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-amber-100 dark:bg-sacred-950 text-sacred-700 dark:text-sacred-300">
                    + All Hyderabad areas
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <button
                onClick={onClose}
                className="w-1/3 py-3 rounded-2xl text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onBookService(service);
                }}
                className="w-2/3 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-sm font-bold bg-gradient-to-r from-vermilion-600 to-sacred-600 hover:from-vermilion-700 hover:to-sacred-700 text-white shadow-sacred hover:shadow-gold-glow transition-all"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book This Pooja Now</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

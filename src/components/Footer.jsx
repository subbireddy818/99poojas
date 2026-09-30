'use client';

import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Instagram, 
  Youtube, 
  Sparkles, 
  ShieldCheck, 
  Heart 
} from 'lucide-react';
import { siteConfig, categories, services } from '../data/poojasData';

export default function Footer({ 
  onSelectCategory, 
  onSelectService, 
  onOpenLegal, 
  onOpenSupport,
  onNavigateHome
}) {
  const popularServices = services.slice(0, 5);

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-sacred-600/30 relative overflow-hidden">
      
      {/* Decorative top gold gradient border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-vermilion-600 via-sacred-500 to-vermilion-600" />

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          
          {/* Col 1: Brand & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <button onClick={onNavigateHome} className="focus:outline-none block py-1">
              <img 
                src={siteConfig.logoDark} 
                alt={siteConfig.brandName} 
                className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-md transition-transform hover:scale-105 duration-300"
              />
            </button>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              99Poojas is Hyderabad's premier spiritual platform connecting devotees with trusted, certified Vedic pandits for authentic poojas, homams, and sacred rituals through transparent booking and doorstep service.
            </p>

            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-sacred-400 flex-shrink-0" />
                <a href={`tel:${siteConfig.phone}`} className="hover:text-amber-300 transition-colors font-medium">
                  {siteConfig.phoneFormatted} / {siteConfig.alternatePhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-sacred-400 flex-shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-300 transition-colors">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-sacred-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 leading-tight">
                  {siteConfig.address}
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-3 flex items-center gap-3">
              <a
                href={siteConfig.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-vermilion-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-vermilion-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={siteConfig.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-vermilion-600 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Categories (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold font-serif text-white tracking-wider uppercase border-b border-slate-800 pb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-sacred-400" />
              <span>Purohit Categories</span>
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="hover:text-amber-300 transition-colors flex items-center gap-2 group text-left"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-sacred-500 group-hover:scale-125 transition-transform" />
                    <span>{cat.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Popular Services (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-bold font-serif text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Popular Poojas & Homams
            </h4>
            <ul className="space-y-3">
              {popularServices.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onSelectService(service)}
                    className="flex items-center gap-3 text-left group hover:text-amber-300 transition-colors"
                  >
                    <img 
                      src={service.image} 
                      alt={service.name} 
                      className="w-10 h-10 rounded-lg object-cover bg-slate-900 flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-semibold block truncate group-hover:text-amber-300 text-slate-200">
                        {service.name}
                      </span>
                      <span className="text-[11px] text-sacred-400 font-bold">
                        {service.priceFormatted}
                      </span>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Trust (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-sm font-bold font-serif text-white tracking-wider uppercase border-b border-slate-800 pb-2">
              Spiritual Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={onNavigateHome} className="hover:text-amber-300 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={onOpenSupport} className="hover:text-amber-300 transition-colors">Help & Support</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('terms')} className="hover:text-amber-300 transition-colors">Terms & Conditions</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('privacy')} className="hover:text-amber-300 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('refund')} className="hover:text-amber-300 transition-colors">Refund Policy</button>
              </li>
              <li>
                <button onClick={() => onOpenLegal('deletion')} className="hover:text-amber-300 transition-colors">Data Deletion</button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="mt-14 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 All Rights Reserved by <strong className="text-slate-300">99Poojas</strong>.</p>
          <div className="flex items-center gap-4">
            <span>Crafted with Devotion for Sacred Traditions</span>
            <span className="text-amber-400">🕉️ Om Namah Shivaya</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

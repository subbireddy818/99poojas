'use client';

import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Heart, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';
import { siteConfig, hyderabadLocations } from '../data/poojasData';

export default function Navbar({ 
  darkMode, 
  setDarkMode, 
  wishlistCount, 
  onOpenWishlist, 
  onOpenSearch, 
  onSelectCategory,
  activeTab,
  setActiveTab,
  onOpenSupport,
  selectedLocation,
  setSelectedLocation,
  onOpenLogin
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationDropdownOpen, setLocationDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Notification & Contact Bar */}
      <div className="bg-gradient-to-r from-vermilion-700 via-vermilion-600 to-sacred-700 text-white text-xs sm:text-sm py-1.5 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Contact Details */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a 
              href={`tel:${siteConfig.phone}`} 
              className="flex items-center gap-1.5 hover:text-amber-200 transition-colors font-medium tracking-wide"
            >
              <Phone className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>{siteConfig.phoneFormatted}</span>
            </a>
            <a 
              href={`mailto:${siteConfig.email}`} 
              className="hidden md:flex items-center gap-1.5 hover:text-amber-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>{siteConfig.email}</span>
            </a>
          </div>

          {/* Center Notice */}
          <div className="hidden lg:flex items-center gap-1.5 text-amber-100 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Guiding Your Spiritual Journey with Authentic Vedic Purohits</span>
          </div>

          {/* Right: Location Selector */}
          <div className="relative">
            <button 
              onClick={() => setLocationDropdownOpen(!locationDropdownOpen)}
              className="flex items-center gap-1.5 bg-black/20 hover:bg-black/30 px-2.5 py-0.5 rounded-full text-xs font-medium transition-all text-amber-100"
            >
              <MapPin className="w-3 h-3 text-amber-300" />
              <span className="truncate max-w-[130px] sm:max-w-[170px]">{selectedLocation.split('(')[0]}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {locationDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-72 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-sacred-200 dark:border-slate-800 p-2 z-50 text-slate-800 dark:text-slate-100 text-xs animate-in fade-in slide-in-from-top-2"
                onMouseLeave={() => setLocationDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 font-semibold text-sacred-700 dark:text-sacred-400 border-b border-slate-100 dark:border-slate-800">
                  Select Hyderabad Zone
                </div>
                <div className="py-1 max-h-60 overflow-y-auto">
                  {hyderabadLocations.map((loc, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedLocation(loc);
                        setLocationDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-between ${
                        selectedLocation === loc ? 'text-vermilion-600 dark:text-vermilion-400 font-semibold bg-amber-50/70 dark:bg-slate-800/60' : ''
                      }`}
                    >
                      <span>{loc}</span>
                      {selectedLocation === loc && <span className="w-1.5 h-1.5 rounded-full bg-vermilion-600"></span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md py-1 sm:py-1.5' 
          : 'bg-white dark:bg-slate-900 py-1.5 sm:py-2 shadow-sm border-b border-amber-100 dark:border-slate-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          
          {/* Brand Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 group focus:outline-none py-0"
          >
            <img 
              src={darkMode ? siteConfig.logoDark : siteConfig.logo} 
              alt={siteConfig.brandName} 
              className="h-10 sm:h-12 w-auto max-h-[50px] object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-sm"
            />
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            {[
              { id: 'home', label: 'Home' },
              { id: 'categories', label: 'Categories' },
              { id: 'services', label: 'Services' },
              { id: 'about', label: 'About Us' },
              { id: 'support', label: 'Help & Support' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'support') {
                    onOpenSupport();
                  } else {
                    setActiveTab(tab.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'text-vermilion-600 dark:text-sacred-400 bg-amber-50 dark:bg-slate-800'
                    : 'text-slate-600 dark:text-slate-300 hover:text-vermilion-600 dark:hover:text-sacred-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-vermilion-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
              title="Search poojas, homams & rituals"
            >
              <Search className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            </button>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-vermilion-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
              title="Saved Wishlist"
            >
              <Heart className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-vermilion-600 text-white text-[10px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-900 animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-sacred-600 hover:bg-amber-50 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-amber-400" /> : <Moon className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-slate-600" />}
            </button>

            {/* Login / Devotee Portal */}
            <button
              onClick={onOpenLogin}
              className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-vermilion-600 to-sacred-600 hover:from-vermilion-700 hover:to-sacred-700 text-white px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all"
            >
              <User className="w-3.5 h-3.5" />
              <span>Login / Account</span>
            </button>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'categories', label: 'Categories' },
                { id: 'services', label: 'All Services (52)' },
                { id: 'about', label: 'About Us' },
                { id: 'support', label: 'Help & Support' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => {
                    if (tab.id === 'support') {
                      onOpenSupport();
                    } else {
                      setActiveTab(tab.id);
                    }
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold ${
                    activeTab === tab.id
                      ? 'text-vermilion-600 dark:text-sacred-400 bg-amber-50 dark:bg-slate-800'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-2">
                <button
                  onClick={() => {
                    onOpenLogin();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-vermilion-600 text-white py-2.5 rounded-xl text-sm font-semibold"
                >
                  <User className="w-4 h-4" />
                  <span>Devotee Login</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

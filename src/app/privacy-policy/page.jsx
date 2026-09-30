'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WishlistDrawer from '../../components/WishlistDrawer';
import HelpSupportModal from '../../components/HelpSupportModal';
import LegalModal from '../../components/LegalModal';
import { hyderabadLocations } from '../../data/poojasData';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  const [wishlist, setWishlist] = useState([1, 2]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [legalType, setLegalType] = useState(null);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') setDarkMode(true);
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {}
  }, []);

  return (
    <div className="min-h-screen flex flex-col sacred-pattern">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => router.push('/service-list')}
        onSelectCategory={(catId) => router.push(`/category-details/${catId}`)}
        activeTab=""
        setActiveTab={(tab) => {
          if (tab === 'home') router.push('/');
          else if (tab === 'categories') router.push('/category-list');
          else if (tab === 'services') router.push('/service-list');
          else if (tab === 'about') router.push('/about-us');
        }}
        onOpenSupport={() => setSupportOpen(true)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onOpenLogin={() => router.push('/login-page')}
      />

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-vermilion-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-semibold">Privacy Policy</span>
        </nav>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-amber-100 dark:border-slate-700 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">Privacy Policy</h1>
              <span className="text-xs text-slate-400">Your privacy is sacred to 99Poojas</span>
            </div>
          </div>

          <p>
            At 99Poojas, accessible from <strong>https://99poojas.in</strong>, one of our main priorities is the privacy of our devotees and users.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">1. Information We Collect</h3>
          <p className="text-xs sm:text-sm">
            We collect personal details including full name, mobile number, email address, ceremony address, Gothram, and Nakshatram solely for the purpose of assigning verified Purohits and sending booking confirmation receipts.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">2. How We Use Your Information</h3>
          <p className="text-xs sm:text-sm">
            Your details are used strictly for service delivery, WhatsApp ceremony updates, customer support, and payment verification. We do not sell, rent, or trade your data to third parties.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">3. Payment & Data Security</h3>
          <p className="text-xs sm:text-sm">
            All online advance payments are handled securely using 256-bit SSL encrypted payment gateways. No card or sensitive financial information is stored on our servers.
          </p>
        </div>
      </main>

      <Footer
        onSelectCategory={(catId) => router.push(`/category-details/${catId}`)}
        onSelectService={(s) => router.push(`/service-detail/${s.id}`)}
        onOpenLegal={(type) => setLegalType(type)}
        onOpenSupport={() => setSupportOpen(true)}
        onNavigateHome={() => router.push('/')}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(i => i !== id))}
        onBookService={(s) => router.push(`/service-detail/${s.id}`)}
        onSelectService={(s) => router.push(`/service-detail/${s.id}`)}
      />

      {supportOpen && <HelpSupportModal onClose={() => setSupportOpen(false)} />}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </div>
  );
}

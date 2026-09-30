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
import { RefreshCw, ChevronRight } from 'lucide-react';

export default function RefundPolicyPage() {
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
          <span className="text-slate-900 dark:text-white font-semibold">Refund & Cancellation Policy</span>
        </nav>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-amber-100 dark:border-slate-700 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">Refund & Cancellation Policy</h1>
              <span className="text-xs text-slate-400">Transparent & Devotee-Friendly Terms</span>
            </div>
          </div>

          <p>
            We understand that family schedules and Muhurtham timings may change. 99Poojas offers a transparent cancellation and refund framework.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">1. Cancellation Window</h3>
          <p className="text-xs sm:text-sm">
            Cancellations made more than <strong>12 hours</strong> prior to the scheduled ceremony start time are eligible for full refund of the advance deposit minus nominal payment processing charges.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">2. Free Rescheduling</h3>
          <p className="text-xs sm:text-sm">
            You can reschedule your ceremony to another date or auspicious time slot up to <strong>6 hours</strong> before the scheduled time with zero rescheduling fee.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">3. Refund Processing</h3>
          <p className="text-xs sm:text-sm">
            Approved refunds are credited back to the original payment method (Bank Account, UPI, or Credit/Debit Card) within 3 to 5 business days.
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

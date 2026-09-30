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
import { FileText, ChevronRight, ShieldCheck } from 'lucide-react';

export default function TermsConditionsPage() {
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
          <span className="text-slate-900 dark:text-white font-semibold">Terms & Conditions</span>
        </nav>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 border border-amber-100 dark:border-slate-700 shadow-sm space-y-6 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
          <div className="flex items-center gap-3 pb-6 border-b border-slate-100 dark:border-slate-700">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">Terms & Conditions</h1>
              <span className="text-xs text-slate-400">Last updated: January 2026 • 99Poojas</span>
            </div>
          </div>

          <p>
            Welcome to 99Poojas (<strong>https://99poojas.in</strong>). By accessing and booking rituals on our platform, you agree to comply with and be bound by the following terms and conditions.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">1. Purohit Service Booking & Scheduling</h3>
          <p className="text-xs sm:text-sm">
            99Poojas operates as a verified platform connecting devotees with certified Purohits. Devotees agree to provide accurate details, Gothram, Nakshatram, auspicious timings, and full address in Hyderabad for conducting ceremonies.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">2. Advance Payment & Dakshina Policy</h3>
          <p className="text-xs sm:text-sm">
            A mandatory 30% online advance deposit is required at the time of booking to confirm the pandit allocation and samagri preparation. The remaining 70% dakshina is payable to the Purohit upon completion of the ceremony via cash, UPI, or online transfer.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">3. Devotee Code of Conduct & Purity</h3>
          <p className="text-xs sm:text-sm">
            Devotees and Purohits are expected to maintain traditional sanctity, cleanliness, and reverence during the entire duration of the sacred ceremony.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif pt-2">4. Limitation of Liability</h3>
          <p className="text-xs sm:text-sm">
            99Poojas strives to ensure punctual and authentic ritual execution. However, unforeseen events such as natural delays or force majeure will be managed with immediate rescheduling or full refund according to our refund policy.
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

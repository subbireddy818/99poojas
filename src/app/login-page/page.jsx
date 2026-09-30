'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WishlistDrawer from '../../components/WishlistDrawer';
import HelpSupportModal from '../../components/HelpSupportModal';
import LegalModal from '../../components/LegalModal';
import { siteConfig, hyderabadLocations } from '../../data/poojasData';
import { User, Phone, Lock, Sparkles, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  const [wishlist, setWishlist] = useState([1, 2]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [legalType, setLegalType] = useState(null);

  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [userType, setUserType] = useState('devotee'); // 'devotee' or 'purohit'

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') setDarkMode(true);
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {}
  }, []);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    alert('Logged in successfully! Welcome to 99Poojas.');
    router.push('/');
  };

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
        onOpenLogin={() => {}}
      />

      <main className="flex-grow max-w-md mx-auto px-4 py-12 sm:py-16 w-full flex flex-col justify-center">
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-amber-100 dark:border-slate-700 shadow-sacred space-y-6">
          
          {/* Top Logo */}
          <div className="text-center space-y-3">
            <img src={siteConfig.logo} alt={siteConfig.brandName} className="h-16 sm:h-20 mx-auto object-contain filter drop-shadow-sm" />
            <h1 className="text-xl font-bold font-serif text-slate-900 dark:text-white pt-2">
              Welcome to 99Poojas
            </h1>
            <p className="text-xs text-slate-500">
              {userType === 'devotee' ? 'Devotee Login for Ritual Management' : 'Purohit & Provider Portal'}
            </p>
          </div>

          {/* User Type Switcher */}
          <div className="grid grid-cols-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-2xl text-xs font-bold">
            <button
              onClick={() => setUserType('devotee')}
              className={`py-2 rounded-xl transition-all ${userType === 'devotee' ? 'bg-white dark:bg-slate-800 text-vermilion-600 shadow-sm' : 'text-slate-500'}`}
            >
              Devotee / User
            </button>
            <button
              onClick={() => setUserType('purohit')}
              className={`py-2 rounded-xl transition-all ${userType === 'purohit' ? 'bg-white dark:bg-slate-800 text-vermilion-600 shadow-sm' : 'text-slate-500'}`}
            >
              Purohit / Pandit
            </button>
          </div>

          {!otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter 10-digit number"
                    className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white font-bold py-3 rounded-2xl shadow-sacred hover:shadow-lg transition-all text-sm"
              >
                <span>Get OTP on WhatsApp / SMS</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Enter 4-Digit OTP sent to +91 {phone}
                </label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="• • • •"
                  className="w-full text-center tracking-widest text-lg font-bold py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-2xl shadow transition-all text-sm"
              >
                Verify & Continue
              </button>

              <button
                type="button"
                onClick={() => setOtpSent(false)}
                className="w-full text-center text-xs text-slate-500 hover:underline"
              >
                Change mobile number
              </button>
            </form>
          )}

          <div className="pt-2 text-center text-[11px] text-slate-400">
            By continuing, you agree to 99Poojas{' '}
            <Link href="/term-conditions" className="text-vermilion-600 hover:underline">Terms</Link> &{' '}
            <Link href="/privacy-policy" className="text-vermilion-600 hover:underline">Privacy Policy</Link>.
          </div>

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

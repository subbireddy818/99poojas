'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import WishlistDrawer from '../../components/WishlistDrawer';
import HelpSupportModal from '../../components/HelpSupportModal';
import LegalModal from '../../components/LegalModal';
import { siteConfig, hyderabadLocations, faqs } from '../../data/poojasData';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  Sparkles, 
  ChevronRight, 
  MessageSquare,
  Clock
} from 'lucide-react';

export default function HelpSupportPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  const [wishlist, setWishlist] = useState([1, 2]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [legalType, setLegalType] = useState(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') setDarkMode(true);
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch (e) {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
        activeTab="support"
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-vermilion-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-semibold">Help & Support</span>
        </nav>

        {/* Hero */}
        <div className="rounded-3xl bg-gradient-to-r from-vermilion-700 via-vermilion-600 to-sacred-700 text-white p-8 sm:p-12 mb-12 shadow-sacred relative overflow-hidden">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Devotee Assistance Desk</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif">Help & Support</h1>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              We are here to assist you with ritual planning, Muhurtham guidance, custom pooja inquiries, and booking coordination.
            </p>
          </div>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <Phone className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">Helpline Number</h3>
            <p className="text-xs text-slate-500">Call us for immediate ritual booking</p>
            <a href={`tel:${siteConfig.phone}`} className="font-bold text-vermilion-600 text-base hover:underline">
              {siteConfig.phoneFormatted}
            </a>
            <span className="text-[11px] text-slate-400">Available 7:00 AM - 9:00 PM IST</span>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <Mail className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">Inquiry Email</h3>
            <p className="text-xs text-slate-500">Email our support and pandit coordination desk</p>
            <a href={`mailto:${siteConfig.email}`} className="font-bold text-vermilion-600 text-base hover:underline">
              {siteConfig.email}
            </a>
            <span className="text-[11px] text-slate-400">Response within 2 hours</span>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center text-vermilion-600">
              <MapPin className="w-7 h-7" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white font-serif">Service Location</h3>
            <p className="text-xs text-slate-500">Doorstep Purohit service across</p>
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              All Hyderabad & Secunderabad
            </span>
            <span className="text-[11px] text-slate-400">Over 5,068+ Ceremonies Conducted</span>
          </div>
        </div>

        {/* Message Form & FAQs (2 Cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Message Form (6 Cols) */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-800 rounded-3xl p-6 sm:p-8 border border-amber-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-2">
              Send Us a Message
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Fill out the form below and our Senior Purohit Coordinator will contact you directly.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Nagaraju"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nagaraju@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Ritual Inquiry / Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about the pooja you wish to perform, your preferred date, or any specific sampradayam questions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white font-bold py-3.5 rounded-2xl shadow-sacred hover:shadow-lg transition-all text-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 p-6">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold font-serif text-slate-900 dark:text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Thank you, <strong>{name}</strong>. Our team will contact you on <strong>{phone}</strong> shortly.
                </p>
              </div>
            )}
          </div>

          {/* Right: FAQs (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white mb-2">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-2">{faq.q}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
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

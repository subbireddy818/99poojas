'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ServicesCatalog from '../../../components/ServicesCatalog';
import ServiceDetailModal from '../../../components/ServiceDetailModal';
import BookingModal from '../../../components/BookingModal';
import WishlistDrawer from '../../../components/WishlistDrawer';
import HelpSupportModal from '../../../components/HelpSupportModal';
import LegalModal from '../../../components/LegalModal';
import { categories, services, siteConfig, hyderabadLocations } from '../../../data/poojasData';
import { ChevronRight, Sparkles } from 'lucide-react';

export default function CategoryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;

  const [category, setCategory] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [detailService, setDetailService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
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

  useEffect(() => {
    if (id) {
      const cat = categories.find(c => String(c.id) === String(id));
      setCategory(cat || categories[0]);
    }
  }, [id]);

  if (!category) return null;

  return (
    <div className="min-h-screen flex flex-col sacred-pattern">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => {}}
        onSelectCategory={(catId) => router.push(`/category-details/${catId}`)}
        activeTab="categories"
        setActiveTab={(tab) => {
          if (tab === 'home') router.push('/');
          else if (tab === 'categories') router.push('/#categories-section');
          else if (tab === 'services') router.push('/#services-section');
          else if (tab === 'about') router.push('/#about-section');
        }}
        onOpenSupport={() => setSupportOpen(true)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onOpenLogin={() => alert('Welcome to 99Poojas Portal.')}
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-vermilion-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-semibold">{category.name}</span>
        </nav>

        {/* Category Banner */}
        <div className="rounded-3xl bg-gradient-to-r from-vermilion-700 via-vermilion-600 to-sacred-700 text-white p-8 sm:p-12 mb-10 shadow-sacred relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred Category</span>
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif">{category.name}</h1>
            <p className="text-xs sm:text-sm text-amber-100 leading-relaxed">
              {category.description || 'Explore authentic Vedic ceremonies and homams conducted according to sacred Shastras.'}
            </p>
          </div>
          <div className="w-24 h-24 rounded-2xl bg-white/20 p-3 backdrop-blur-md flex-shrink-0">
            <img src={category.image} alt={category.name} className="w-full h-full object-contain filter drop-shadow" />
          </div>
        </div>

        {/* Services in this category */}
        <ServicesCatalog
          activeCategory={category.id}
          setActiveCategory={(catId) => {
            if (catId === 'all') router.push('/#services-section');
            else router.push(`/category-details/${catId}`);
          }}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectService={(service) => router.push(`/service-detail/${service.id}`)}
          onBookService={(service) => setBookingService(service)}
          wishlist={wishlist}
          onToggleWishlist={(sId) => {
            setWishlist(prev => prev.includes(sId) ? prev.filter(i => i !== sId) : [...prev, sId]);
          }}
        />
      </main>

      <Footer
        onSelectCategory={(catId) => router.push(`/category-details/${catId}`)}
        onSelectService={(s) => router.push(`/service-detail/${s.id}`)}
        onOpenLegal={(type) => setLegalType(type)}
        onOpenSupport={() => setSupportOpen(true)}
        onNavigateHome={() => router.push('/')}
      />

      {bookingService && (
        <BookingModal
          service={bookingService}
          onClose={() => setBookingService(null)}
          defaultLocation={selectedLocation}
        />
      )}

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => setWishlist(prev => prev.filter(i => i !== id))}
        onBookService={(s) => setBookingService(s)}
        onSelectService={(s) => router.push(`/service-detail/${s.id}`)}
      />

      {supportOpen && <HelpSupportModal onClose={() => setSupportOpen(false)} />}
      <LegalModal type={legalType} onClose={() => setLegalType(null)} />
    </div>
  );
}

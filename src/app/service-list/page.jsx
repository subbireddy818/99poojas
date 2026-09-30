'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ServicesCatalog from '../../components/ServicesCatalog';
import ServiceDetailModal from '../../components/ServiceDetailModal';
import BookingModal from '../../components/BookingModal';
import WishlistDrawer from '../../components/WishlistDrawer';
import HelpSupportModal from '../../components/HelpSupportModal';
import LegalModal from '../../components/LegalModal';
import { hyderabadLocations } from '../../data/poojasData';
import { ChevronRight } from 'lucide-react';

export default function ServiceListPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  const [activeCategory, setActiveCategory] = useState('all');
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

  return (
    <div className="min-h-screen flex flex-col sacred-pattern">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => {}}
        onSelectCategory={(catId) => setActiveCategory(catId)}
        activeTab="services"
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

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6">
          <Link href="/" className="hover:text-vermilion-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-semibold">All Services Catalog</span>
        </nav>

        <ServicesCatalog
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
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
        onSelectCategory={(catId) => setActiveCategory(catId)}
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

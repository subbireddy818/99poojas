import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import CategoriesSection from './components/CategoriesSection';
import ServicesCatalog from './components/ServicesCatalog';
import ServiceDetailModal from './components/ServiceDetailModal';
import BookingModal from './components/BookingModal';
import WhyChooseUs from './components/WhyChooseUs';
import AppDownloadBanner from './components/AppDownloadBanner';
import Testimonials from './components/Testimonials';
import AboutSection from './components/AboutSection';
import HelpSupportModal from './components/HelpSupportModal';
import WishlistDrawer from './components/WishlistDrawer';
import LegalModal from './components/LegalModal';
import Footer from './components/Footer';
import { hyderabadLocations, services, categories, siteConfig } from './data/poojasData';

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark' || 
      window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [activeTab, setActiveTab] = useState('home'); // 'home', 'categories', 'services', 'about'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  
  // Modals & Drawers state
  const [detailService, setDetailService] = useState(null);
  const [bookingService, setBookingService] = useState(null);
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('wishlist');
      return saved ? JSON.parse(saved) : [1, 2];
    } catch {
      return [1, 2];
    }
  });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [legalType, setLegalType] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleWishlist = (serviceId) => {
    if (wishlist.includes(serviceId)) {
      setWishlist(prev => prev.filter(id => id !== serviceId));
      showToast('Removed ritual from your Wishlist.');
    } else {
      setWishlist(prev => [...prev, serviceId]);
      showToast('Added ritual to your Wishlist!');
    }
  };

  const handleSelectCategory = (catId) => {
    setActiveCategory(catId);
    setActiveTab('services');
    setTimeout(() => {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleExploreServices = () => {
    setActiveCategory('all');
    setActiveTab('services');
    setTimeout(() => {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleOpenSearch = () => {
    setActiveTab('services');
    setTimeout(() => {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col sacred-pattern">
      
      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-sacred-500/50 flex items-center gap-3 animate-in slide-in-from-bottom-5 text-sm font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-sacred-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navigation Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={handleOpenSearch}
        onSelectCategory={handleSelectCategory}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSupport={() => setSupportOpen(true)}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        onOpenLogin={() => alert('Welcome to 99Poojas Devotee Portal. Please enter your mobile number to receive OTP.')}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <>
            <HeroSlider
              onSelectCategory={handleSelectCategory}
              onExploreServices={handleExploreServices}
              onSelectServiceById={(id) => {
                const s = services.find(item => item.id === id);
                if (s) setDetailService(s);
              }}
            />

            <CategoriesSection
              onSelectCategory={handleSelectCategory}
              activeCategory={activeCategory}
            />

            <ServicesCatalog
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectService={(service) => setDetailService(service)}
              onBookService={(service) => setBookingService(service)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />

            <WhyChooseUs onOpenSupport={() => setSupportOpen(true)} />

            <AppDownloadBanner />

            <Testimonials />

            <AboutSection 
              onExploreServices={handleExploreServices}
              onOpenSupport={() => setSupportOpen(true)}
            />
          </>
        )}

        {activeTab === 'categories' && (
          <div className="py-8">
            <CategoriesSection
              onSelectCategory={handleSelectCategory}
              activeCategory={activeCategory}
            />
          </div>
        )}

        {activeTab === 'services' && (
          <div className="py-8">
            <ServicesCatalog
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onSelectService={(service) => setDetailService(service)}
              onBookService={(service) => setBookingService(service)}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />
          </div>
        )}

        {activeTab === 'about' && (
          <div className="py-8">
            <AboutSection 
              onExploreServices={handleExploreServices}
              onOpenSupport={() => setSupportOpen(true)}
            />
            <WhyChooseUs onOpenSupport={() => setSupportOpen(true)} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onSelectService={(service) => setDetailService(service)}
        onOpenLegal={(type) => setLegalType(type)}
        onOpenSupport={() => setSupportOpen(true)}
        onNavigateHome={() => {
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Detail Modal */}
      <ServiceDetailModal
        service={detailService}
        onClose={() => setDetailService(null)}
        onBookService={(s) => setBookingService(s)}
        isWishlisted={detailService ? wishlist.includes(detailService.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onShare={() => {
          navigator.clipboard?.writeText(window.location.href);
          showToast('Ritual link copied to clipboard!');
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        service={bookingService}
        onClose={() => setBookingService(null)}
        defaultLocation={selectedLocation}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onBookService={(s) => setBookingService(s)}
        onSelectService={(s) => setDetailService(s)}
      />

      {/* Help & Support Modal */}
      {supportOpen && (
        <HelpSupportModal onClose={() => setSupportOpen(false)} />
      )}

      {/* Legal Modal */}
      <LegalModal
        type={legalType}
        onClose={() => setLegalType(null)}
      />

    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import BookingModal from '../../../components/BookingModal';
import WishlistDrawer from '../../../components/WishlistDrawer';
import HelpSupportModal from '../../../components/HelpSupportModal';
import LegalModal from '../../../components/LegalModal';
import { services, categories, siteConfig, hyderabadLocations, faqs } from '../../../data/poojasData';
import { 
  Star, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  CalendarCheck, 
  Heart, 
  Share2, 
  Sparkles, 
  CheckCircle2, 
  Phone, 
  Award, 
  ChevronRight, 
  ArrowLeft,
  Flame,
  BookOpen,
  HelpCircle,
  MessageSquare,
  Users
} from 'lucide-react';

export default function ProductServicePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  
  // Synchronous service resolution
  const initialService = services.find(s => String(s.id) === String(id)) || services[0];
  const [service, setService] = useState(initialService);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(hyderabadLocations[1]);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [wishlist, setWishlist] = useState([1, 2]);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [legalType, setLegalType] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'vidhi', 'samagri', 'reviews'

  useEffect(() => {
    if (id) {
      const found = services.find(s => String(s.id) === String(id));
      if (found) setService(found);
    }
  }, [id]);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDarkMode(true);
      }
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (e) {}
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
  }, [darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleWishlist = (serviceId) => {
    if (wishlist.includes(serviceId)) {
      setWishlist(prev => prev.filter(item => item !== serviceId));
      showToast('Removed from your Wishlist.');
    } else {
      setWishlist(prev => [...prev, serviceId]);
      showToast('Added to your Wishlist!');
    }
  };

  const isWishlisted = wishlist.includes(service.id);
  const relatedServices = services.filter(s => s.categoryId === service.categoryId && s.id !== service.id).slice(0, 4);
  const category = categories.find(c => c.id === service.categoryId);

  return (
    <div className="min-h-screen flex flex-col sacred-pattern">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-sacred-500/50 flex items-center gap-3 animate-in slide-in-from-bottom-5 text-sm font-medium">
          <span className="w-2.5 h-2.5 rounded-full bg-sacred-500 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => router.push('/#services-section')}
        onSelectCategory={(catId) => router.push(`/category-details/${catId}`)}
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
        onOpenLogin={() => alert('Welcome to 99Poojas Devotee Portal. Enter your mobile number for login.')}
      />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6 flex-wrap">
          <Link href="/" className="hover:text-vermilion-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href={`/category-details/${service.categoryId}`} className="hover:text-vermilion-600 transition-colors">
            {service.categoryName}
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white font-semibold truncate max-w-[200px] sm:max-w-none">
            {service.name}
          </span>
        </nav>

        {/* Product Hero Section (2-Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Showcase & Gallery (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-3xl overflow-hidden shadow-sacred bg-amber-50 dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 h-[340px] sm:h-[420px]">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full text-xs font-bold bg-vermilion-600 text-white shadow-md">
                {service.categoryName}
              </span>

              {/* Wishlist button */}
              <button
                onClick={() => handleToggleWishlist(service.id)}
                className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isWishlisted
                    ? 'bg-vermilion-600 text-white shadow-md'
                    : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-vermilion-600 hover:bg-white'
                }`}
                title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Bottom Image Trust Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-amber-300 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span>5.0 Rating</span>
                  <span className="text-slate-300 font-normal">({service.reviewsCount} reviews)</span>
                </div>
                <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Shastra Vidhi</span>
                </div>
              </div>
            </div>

            {/* Certified Purohit Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800/90 border border-amber-100 dark:border-slate-700 shadow-sm space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-sacred-600 dark:text-sacred-400">
                Assigned Vedic Purohit
              </span>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full overflow-hidden bg-amber-100 border-2 border-sacred-400 p-0.5 flex-shrink-0">
                  <img
                    src={service.provider.image}
                    alt={service.provider.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {service.provider.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {service.provider.experience}
                  </p>
                  <div className="flex items-center gap-2 mt-1 text-xs text-amber-500 font-semibold">
                    <Star className="w-3 h-3 fill-current" />
                    <span>5.0 Star Rating</span>
                    <span className="text-slate-400">• 4+ Ceremonies This Week</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Verified Vedic Credentials
                </span>
                <span className="text-slate-500">
                  Member since Jan 2026
                </span>
              </div>
            </div>

            {/* Helpline quick card */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-vermilion-700 to-sacred-700 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-300 animate-pulse" />
                <div>
                  <div className="text-xs text-amber-200">Have Questions About This Ritual?</div>
                  <div className="text-sm font-bold">{siteConfig.phoneFormatted}</div>
                </div>
              </div>
              <a
                href={`tel:${siteConfig.phone}`}
                className="px-3.5 py-1.5 rounded-full bg-white text-vermilion-700 text-xs font-bold hover:bg-amber-100 transition-colors"
              >
                Call Now
              </a>
            </div>

          </div>

          {/* Right Column: Title, Pricing, Booking Widget & Details (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Category Header */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-bold text-sacred-600 dark:text-sacred-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{service.categoryName} Ceremony</span>
                </span>

                <button
                  onClick={() => {
                    if (typeof navigator !== 'undefined' && navigator.clipboard) {
                      navigator.clipboard.writeText(window.location.href);
                      showToast('Ceremony link copied to clipboard!');
                    }
                  }}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-vermilion-600 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-serif text-slate-900 dark:text-white mt-2 leading-tight">
                {service.name}
              </h1>

              {/* Quick Meta Row */}
              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1.5 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>5.0</span>
                  <span className="text-slate-400 font-normal">({service.reviewsCount} Devotee Reviews)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sacred-600" />
                  <span>{service.duration}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sacred-600" />
                  <span>Doorstep Service (Hyderabad)</span>
                </div>
              </div>
            </div>

            {/* Price Box with 30% Advance Breakdown */}
            <div className="p-6 rounded-3xl bg-amber-50/80 dark:bg-slate-800/90 border border-amber-200/80 dark:border-slate-700 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Pooja Dakshina
                </span>
                <div className="text-3xl sm:text-4xl font-extrabold text-vermilion-600 dark:text-sacred-400 font-serif mt-1">
                  {service.priceFormatted}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Includes Certified Purohit Dakshina & Sacred Samagri Kit
                </p>
              </div>

              <div className="w-full sm:w-auto flex flex-col gap-2">
                <div className="text-xs bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-vermilion-600">30% Advance: </span>
                  <strong>₹{Math.round(service.price * 0.3).toLocaleString('en-IN')}</strong> to confirm
                </div>
                
                <button
                  onClick={() => setBookingOpen(true)}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-vermilion-600 to-sacred-600 hover:from-vermilion-700 hover:to-sacred-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-sacred hover:shadow-gold-glow transition-all transform hover:-translate-y-0.5 text-sm"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>Book This Pooja Now</span>
                </button>
              </div>
            </div>

            {/* Tabbed Detail Navigation */}
            <div className="border-b border-slate-200 dark:border-slate-700 flex items-center gap-4 sm:gap-6 overflow-x-auto text-xs sm:text-sm font-semibold">
              {[
                { id: 'overview', label: 'Ritual Overview' },
                { id: 'vidhi', label: 'Pooja Vidhi & Steps' },
                { id: 'samagri', label: 'Inclusions & Samagri' },
                { id: 'reviews', label: `Devotee Reviews (${service.reviewsCount})` }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 border-b-2 whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'border-vermilion-600 text-vermilion-600 dark:text-sacred-400 font-bold'
                      : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-6 pt-2">
              
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sacred-600" />
                    <span>Sacred Significance & Benefits</span>
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-slate-800/50 border border-amber-100 dark:border-slate-700 space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-sacred-700 dark:text-sacred-400">
                      Spiritual Blessings & Objectives:
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Removes negative doshas and obstacles</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Invokes divine prosperity and good health</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Fosters family harmony & spiritual peace</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Performed with Gothra & Nakshatra Sankalpam</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 2: POOJA VIDHI & STEPS */}
              {activeTab === 'vidhi' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
                    <Flame className="w-4 h-4 text-sacred-600" />
                    <span>Step-by-Step Ceremony Procedure</span>
                  </h3>
                  
                  <div className="space-y-3">
                    {[
                      { step: 1, title: 'Ganapathi Pooja & Gauri Prarthana', desc: 'Invoking Lord Ganesha to remove all obstacles and bless the commencement of the sacred ritual.' },
                      { step: 2, title: 'Punyahavachanam & Kalasha Sthapana', desc: 'Purification mantras and establishing the consecrated Kalasham with sacred water and herbs.' },
                      { step: 3, title: 'Maha Sankalpam', desc: 'Personalized chanting of family names, Gothram, Nakshatram, and specific prayers for the devotee.' },
                      { step: 4, title: 'Pradhana Devata Archana & Homam / Abhishekam', desc: 'Traditional Shastric offerings, ghee ahutis, Rudram/Suktam recitations by the Purohits.' },
                      { step: 5, title: 'Maha Poornahuti, Mangala Harathi & Aasirvachanam', desc: 'Final offering, sacred Harathi, distribution of Prasadam, and Vedic blessing by the Purohits.' }
                    ].map((item) => (
                      <div key={item.step} className="p-3.5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-start gap-3.5">
                        <div className="w-7 h-7 rounded-full bg-vermilion-100 dark:bg-slate-700 text-vermilion-700 dark:text-sacred-400 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                          {item.step}
                        </div>
                        <div>
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">{item.title}</h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: SAMAGRI & INCLUSIONS */}
              {activeTab === 'samagri' && (
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                    Package Inclusions & Requirements
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 space-y-2">
                      <h4 className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                        ✓ Provided by 99Poojas:
                      </h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                        <li>• Certified Vedic Scholar Pandit(s)</li>
                        <li>• Complete Authentic Samagri Kit</li>
                        <li>• Sacred Homam sticks (Samidhalu), Ghee & Navadhanya</li>
                        <li>• Pasupu, Kumkuma, Akshintalu, Camphor, Dhoop</li>
                        <li>• Homa Kundam & Mats setup</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 space-y-2">
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">
                        ℹ️ Devotee to Arrange:
                      </h4>
                      <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5">
                        <li>• Fresh Flowers & Garland (Maala)</li>
                        <li>• Fresh Fruits & Coconuts (5 Nos)</li>
                        <li>• Deepam Oil, Cotton Wicks & Matchbox</li>
                        <li>• Betel Leaves (Tamalapakulu) & Supari</li>
                        <li>• Home cooked Sweet Naivedyam (Prasadam)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: DEVOTEE REVIEWS */}
              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                      Verified Devotee Reviews
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                      <Star className="w-4 h-4 fill-current" />
                      <span>5.0 / 5.0 Rating</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/a/ACg8ocKDo-DkHBolwHAJG0geNtH3iebwIMdk-qAGDsOc4E--pH159A=s96-c" alt="Prashanth" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white block">Prashanth Hunter</span>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400">April 23, 2026</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "Best service ever I have seen in 99Poojas. The purohits arrived on time with all required samagri, chanted with pure Vedic devotion and explained every step patiently."
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" alt="Venkat" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <span className="font-bold text-xs text-slate-900 dark:text-white block">Venkat Rao K.</span>
                            <div className="flex text-amber-400">
                              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] text-slate-400">March 15, 2026</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                        "Extremely authentic recitation, divine positive energy, and very courteous pandits. Everything was organized seamlessly with 99Poojas."
                      </p>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Available Locations Strip */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                Available In All Hyderabad Zones:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.availableLocations.map((loc, i) => (
                  <span key={i} className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {loc}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Related Rituals Section */}
        {relatedServices.length > 0 && (
          <section className="mt-20 pt-12 border-t border-amber-200/60 dark:border-slate-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-vermilion-600 uppercase tracking-wider">Related Rituals</span>
                <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white">
                  Other Popular {service.categoryName} Services
                </h3>
              </div>
              <Link 
                href={`/category-details/${service.categoryId}`}
                className="text-xs font-bold text-vermilion-600 hover:underline flex items-center gap-1"
              >
                <span>View All In This Category</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/service-detail/${rel.id}`}
                  className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-amber-100 dark:border-slate-700 hover:border-sacred-400 hover:shadow-sacred transition-all flex flex-col justify-between"
                >
                  <div className="relative h-40 bg-slate-900 overflow-hidden">
                    <img src={rel.image} alt={rel.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <span className="absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-black/60 text-amber-200">
                      {rel.categoryName}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <div>
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-vermilion-600 transition-colors line-clamp-1">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">
                        {rel.description}
                      </p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                      <span className="font-bold text-xs text-vermilion-600 dark:text-sacred-400">
                        {rel.priceFormatted}
                      </span>
                      <span className="text-[11px] font-bold text-slate-600 group-hover:text-vermilion-600">
                        View Details →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(catId) => router.push(`/category-details/${catId}`)}
        onSelectService={(s) => router.push(`/service-detail/${s.id}`)}
        onOpenLegal={(type) => setLegalType(type)}
        onOpenSupport={() => setSupportOpen(true)}
        onNavigateHome={() => router.push('/')}
      />

      {/* Booking Modal */}
      {bookingOpen && (
        <BookingModal
          service={service}
          onClose={() => setBookingOpen(false)}
          defaultLocation={selectedLocation}
        />
      )}

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onBookService={(s) => {
          setService(s);
          setBookingOpen(true);
        }}
        onSelectService={(s) => router.push(`/service-detail/${s.id}`)}
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

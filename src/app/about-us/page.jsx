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
import { 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Heart, 
  Flame, 
  ChevronRight, 
  Phone, 
  BookOpen, 
  Sun,
  Users,
  CalendarCheck
} from 'lucide-react';

export default function AboutUsPage() {
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
        activeTab="about"
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
          <span className="text-slate-900 dark:text-white font-semibold">About Us</span>
        </nav>

        {/* Hero Header */}
        <div className="rounded-3xl bg-gradient-to-r from-vermilion-700 via-vermilion-600 to-sacred-700 text-white p-8 sm:p-14 mb-12 shadow-sacred relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SACRED HERITAGE & SPIRITUAL EXCELLENCE</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif leading-tight">
              About 99Poojas
            </h1>
            <p className="text-sm sm:text-base text-amber-100/95 leading-relaxed">
              Guiding Your Spiritual Journey with Trusted Vedic Services. We connect devotees with authentic, certified Purohits for personalized home rituals across Hyderabad.
            </p>
          </div>
        </div>

        {/* Narrative & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-7 space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white">
              Welcome to the Sacred Realm of Hindu Traditions
            </h2>
            <p>
              Welcome to the sacred realm of Hindu traditions with <strong>'99 Poojas,'</strong> your insightful and user-friendly platform designed to immerse you in the richness of traditional rituals and ceremonies. We are excited to expand our offerings and provide a unique, spiritually elevated experience for devotees seeking the services of experienced Purohits at the comfort of their homes.
            </p>
            <p>
              99Poojas is a mobile-first platform connecting devotees with trusted pandits for authentic poojas, rituals, and spiritual services through easy booking and secure payments. Every ritual is conducted in strict accordance with Vedic Shastras, bringing divine grace, peace, and prosperity to your household.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800">
              <img
                src="https://99poojas.in/storage/116/02.jpg"
                alt="Vedic Blessings"
                className="w-full h-80 object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sacred border border-amber-200 dark:border-slate-700 flex items-center gap-3">
              <Award className="w-8 h-8 text-vermilion-600" />
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-base font-serif block">5,068+ Ceremonies</span>
                <span className="text-xs text-slate-500">99.9% Satisfied Devotees</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Home Pooja Services Offered */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-vermilion-600 uppercase tracking-wider">Services Offered</span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-1">
              Personalized Home Pooja Services
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2">
              Discover the convenience of bringing sacred rituals to your doorstep with certified Purohits.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Varalakshmi Vratam',
                desc: 'Experience the divine blessings of Goddess Lakshmi with our expert purohits who conduct the Varalakshmi Vratam for prosperity and family well-being.',
                icon: <Sun className="w-6 h-6 text-sacred-600" />
              },
              {
                title: 'Satya Narayana Swami Vratam',
                desc: 'Commemorate auspicious milestones with the Satya Narayana Swami Vratam, performed to invoke divine guidance, peace, and abundance.',
                icon: <BookOpen className="w-6 h-6 text-sacred-600" />
              },
              {
                title: 'Marriage Ceremony',
                desc: 'Let 99Poojas be a part of your sacred journey of love and commitment. Our Purohits conduct traditional Hindu wedding ceremonies with sanctity.',
                icon: <Heart className="w-6 h-6 text-sacred-600" />
              },
              {
                title: 'Housewarming Ceremony (Gruhapravesham)',
                desc: 'Ensure harmony and auspicious vibrations in your new home with Vastu and Gruhapravesha rituals to bless and protect your abode.',
                icon: <Flame className="w-6 h-6 text-sacred-600" />
              }
            ].map((s, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-amber-100 dark:border-slate-700 shadow-sm hover:shadow-sacred transition-all">
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-slate-700 flex items-center justify-center mb-4">
                  {s.icon}
                </div>
                <h4 className="font-bold text-base text-slate-900 dark:text-white font-serif mb-2">{s.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose 99Poojas Section */}
        <section className="p-8 sm:p-12 rounded-3xl bg-amber-50/70 dark:bg-slate-800/80 border border-amber-200/80 dark:border-slate-700 mb-16">
          <h3 className="text-2xl font-bold font-serif text-slate-900 dark:text-white mb-6 text-center">
            Why Choose '99 Poojas' Home Services?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Personalized Rituals</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Tailored ceremonies to meet your specific Gothram, sampradayam, and auspicious timing needs.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Experienced Purohits</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Well-versed in traditional Hindu Shastras and trained in renowned Veda Paathashalas.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Convenient Online Booking</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Easily schedule home poojas with 30% advance confirmation and live WhatsApp updates.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Spiritual Guidance</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Receive valuable insights and Muhurtham guidance directly from senior astrologers and pandits.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Cultural Reverence</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Immerse in the profound spiritual tapestry of Vedic rituals conducted with pure mantras.
              </p>
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Complete Samagri Purity</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                All essential sacred herbs, homam woods, ghee, and samagri provided without hassle.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="text-center bg-gradient-to-r from-vermilion-700 to-sacred-700 text-white p-8 sm:p-12 rounded-3xl shadow-sacred space-y-4">
          <h3 className="text-2xl sm:text-3xl font-bold font-serif">
            Embark on a Soulful Spiritual Journey Today
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 max-w-xl mx-auto">
            Let 99Poojas be your trusted companion in bringing sacred Vedic rituals into your home with authenticity and devotion.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/service-list"
              className="bg-white text-vermilion-700 hover:bg-amber-100 font-bold px-8 py-3 rounded-full text-xs sm:text-sm shadow-md transition-all"
            >
              Explore All 52 Poojas
            </Link>
            <Link
              href="/help-support"
              className="bg-black/20 hover:bg-black/30 border border-white/30 text-white font-semibold px-6 py-3 rounded-full text-xs sm:text-sm transition-all"
            >
              Contact Support
            </Link>
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

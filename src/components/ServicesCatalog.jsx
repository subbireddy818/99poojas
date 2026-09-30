'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Heart, 
  Clock, 
  Star, 
  Filter, 
  ChevronRight, 
  Sparkles,
  SlidersHorizontal,
  Check,
  CalendarCheck
} from 'lucide-react';
import { services, categories } from '../data/poojasData';

export default function ServicesCatalog({ 
  activeCategory, 
  setActiveCategory, 
  searchQuery, 
  setSearchQuery,
  onSelectService,
  onBookService,
  wishlist,
  onToggleWishlist
}) {
  const [sortBy, setSortBy] = useState('featured'); // 'featured', 'price-low', 'price-high', 'rating'

  // Filter and Sort services
  const filteredServices = useMemo(() => {
    let list = services.filter(service => {
      // Category filter
      if (activeCategory !== 'all' && service.categoryId !== Number(activeCategory)) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = service.name.toLowerCase().includes(q);
        const matchCat = service.categoryName?.toLowerCase().includes(q);
        const matchDesc = service.description?.toLowerCase().includes(q);
        if (!matchName && !matchCat && !matchDesc) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount);
    } else {
      // featured first
      list.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return list;
  }, [activeCategory, searchQuery, sortBy]);

  return (
    <section id="services-section" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-vermilion-50 dark:bg-slate-800 text-vermilion-700 dark:text-vermilion-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-vermilion-600" />
            <span>AUTHENTIC VEDIC CEREMONIES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-slate-900 dark:text-white tracking-tight">
            Explore All Spiritual Services
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Browse our catalog of 50+ Vedic poojas, homams, abhishekams, and sacred rites with transparent pricing.
          </p>
        </div>

        {/* Filter Bar Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pooja, homam, deity..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-vermilion-500 shadow-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-9 py-2.5 rounded-full text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-vermilion-500 shadow-sm cursor-pointer font-medium"
            >
              <option value="featured">Sort: Featured First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
            activeCategory === 'all'
              ? 'bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white shadow-sacred'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
          }`}
        >
          All Poojas ({services.length})
        </button>

        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white shadow-sacred'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat.name} ({cat.servicesCount})
          </button>
        ))}
      </div>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700 p-8">
          <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4 text-sacred-600">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Spiritual Services Found</h3>
          <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
            We couldn't find any poojas matching "{searchQuery}". Try searching with another ritual name or clearing filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}
            className="mt-5 px-6 py-2 rounded-full bg-vermilion-600 text-white text-sm font-semibold hover:bg-vermilion-700 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => {
            const isWishlisted = wishlist.includes(service.id);
            return (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-white dark:bg-slate-800/90 rounded-2xl overflow-hidden border border-amber-100/80 dark:border-slate-700/60 hover:border-sacred-400 hover:shadow-sacred transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden bg-amber-50 dark:bg-slate-900">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Pill */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/60 backdrop-blur-md text-amber-200 border border-white/20">
                    {service.categoryName}
                  </span>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(service.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted
                        ? 'bg-vermilion-600 text-white shadow-md'
                        : 'bg-white/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:text-vermilion-600 hover:bg-white'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{service.rating.toFixed(1)}</span>
                    <span className="text-slate-300 font-normal">({service.reviewsCount})</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {/* Title */}
                    <h3 
                      onClick={() => onSelectService(service)}
                      className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-vermilion-600 dark:group-hover:text-sacred-400 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {service.name}
                    </h3>

                    {/* Description */}
                    <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Meta info */}
                    <div className="mt-3 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-sacred-600" />
                        <span>{service.duration}</span>
                      </div>
                      <span className="text-slate-300">•</span>
                      <span>Vedic Ritual</span>
                    </div>
                  </div>

                  {/* Pricing & Booking Footer */}
                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-400">
                        Total Dakshina
                      </span>
                      <div className="text-base sm:text-lg font-bold text-vermilion-600 dark:text-sacred-400">
                        {service.priceFormatted}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onSelectService(service)}
                        className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        Details
                      </button>

                      <button
                        onClick={() => onBookService(service)}
                        className="flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-vermilion-600 to-sacred-600 hover:from-vermilion-700 hover:to-sacred-700 text-white shadow-sm hover:shadow transition-all"
                      >
                        <CalendarCheck className="w-3.5 h-3.5" />
                        <span>Book</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

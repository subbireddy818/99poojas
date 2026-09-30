'use client';

import React from 'react';
import { X, Heart, Trash2, CalendarCheck, ArrowRight } from 'lucide-react';
import { services } from '../data/poojasData';

export default function WishlistDrawer({ 
  isOpen, 
  onClose, 
  wishlist, 
  onRemoveFromWishlist,
  onBookService,
  onSelectService
}) {
  if (!isOpen) return null;

  const wishlistedServices = services.filter(s => wishlist.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl border-l border-amber-200 dark:border-slate-800 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-vermilion-700 to-sacred-700 text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-current text-amber-300" />
              <h3 className="font-bold font-serif text-lg">My Saved Poojas ({wishlistedServices.length})</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-black/20 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="p-5 flex-grow overflow-y-auto space-y-4">
            {wishlistedServices.length === 0 ? (
              <div className="text-center py-16 text-slate-400 space-y-3">
                <Heart className="w-12 h-12 mx-auto text-slate-300 stroke-1" />
                <h4 className="font-bold text-slate-700 dark:text-slate-300">Your wishlist is empty</h4>
                <p className="text-xs max-w-xs mx-auto">
                  Click the heart icon on any ritual to save it here for convenient booking.
                </p>
              </div>
            ) : (
              wishlistedServices.map((service) => (
                <div 
                  key={service.id}
                  className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-slate-800 border border-amber-100 dark:border-slate-700 flex gap-3 items-center group"
                >
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="w-16 h-16 rounded-xl object-cover bg-slate-200 flex-shrink-0"
                  />
                  <div className="flex-grow min-w-0">
                    <span className="text-[10px] font-bold text-sacred-600 dark:text-sacred-400 uppercase">
                      {service.categoryName}
                    </span>
                    <h4 
                      onClick={() => {
                        onClose();
                        onSelectService(service);
                      }}
                      className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate cursor-pointer hover:text-vermilion-600"
                    >
                      {service.name}
                    </h4>
                    <div className="font-bold text-xs text-vermilion-600 dark:text-sacred-400 mt-1">
                      {service.priceFormatted}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => {
                        onClose();
                        onBookService(service);
                      }}
                      className="p-2 rounded-xl bg-vermilion-600 hover:bg-vermilion-700 text-white shadow-sm"
                      title="Book Service"
                    >
                      <CalendarCheck className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(service.id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-slate-700 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all"
            >
              Continue Browsing
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

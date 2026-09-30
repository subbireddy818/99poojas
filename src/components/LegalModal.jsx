'use client';

import React from 'react';
import { X, ShieldCheck, FileText, RefreshCw, Trash2 } from 'lucide-react';
import { siteConfig } from '../data/poojasData';

export default function LegalModal({ type, onClose }) {
  if (!type) return null;

  const contentMap = {
    terms: {
      title: 'Terms & Conditions',
      icon: <FileText className="w-5 h-5 text-sacred-600" />,
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>Welcome to 99Poojas. By accessing and booking services on 99poojas.in, you agree to comply with the following terms:</p>
          <h5 className="font-bold text-slate-900 dark:text-white">1. Purohit Service Booking</h5>
          <p>99Poojas acts as a certified platform connecting devotees with qualified Purohits. Devotees agree to provide accurate details, auspicious timings, and complete address for rituals.</p>
          <h5 className="font-bold text-slate-900 dark:text-white">2. Advance Payments & Dakshina</h5>
          <p>A mandatory 30% advance deposit is required to confirm bookings and guarantee pandit availability. The remaining 70% dakshina is payable upon completion of the sacred ritual.</p>
          <h5 className="font-bold text-slate-900 dark:text-white">3. Purity & Code of Conduct</h5>
          <p>Devotees and Purohits agree to maintain spiritual sanctity and traditional reverence during all poojas and homams.</p>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: <ShieldCheck className="w-5 h-5 text-sacred-600" />,
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>At 99Poojas, we deeply value and protect the privacy of your personal and spiritual information.</p>
          <h5 className="font-bold text-slate-900 dark:text-white">Information We Collect</h5>
          <p>We collect your name, phone number, email address, ceremony location, Gothram, and Nakshatram solely for conducting authentic rituals and providing booking confirmations.</p>
          <h5 className="font-bold text-slate-900 dark:text-white">Data Security</h5>
          <p>We do not sell or rent your personal information to any third parties. All online payments are securely processed through encrypted channels.</p>
        </div>
      )
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      icon: <RefreshCw className="w-5 h-5 text-sacred-600" />,
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>We understand that ceremony schedules may need adjustment due to unforeseen circumstances.</p>
          <h5 className="font-bold text-slate-900 dark:text-white">1. Cancellation Window</h5>
          <p>Cancellations requested at least 12 hours prior to the scheduled Muhurtham time are eligible for full refund minus nominal handling charges.</p>
          <h5 className="font-bold text-slate-900 dark:text-white">2. Rescheduling</h5>
          <p>You can reschedule your booked pooja to another date or time slot free of cost up to 6 hours before the ceremony.</p>
        </div>
      )
    },
    deletion: {
      title: 'Data Deletion Request',
      icon: <Trash2 className="w-5 h-5 text-sacred-600" />,
      text: (
        <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>In accordance with data protection guidelines, you can request the complete deletion of your account and personal records.</p>
          <p>To request data erasure, please email us at <strong>hello@99poojas.in</strong> with your registered mobile number and booking details.</p>
        </div>
      )
    }
  };

  const item = contentMap[type] || contentMap.terms;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-vermilion-700 to-sacred-700 text-white p-6 relative flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-white/20">{item.icon}</div>
            <h3 className="font-bold font-serif text-xl">{item.title}</h3>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-black/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 max-h-[65vh] overflow-y-auto">
          {item.text}
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs transition-all"
          >
            I Understand & Accept
          </button>
        </div>
      </div>
    </div>
  );
}

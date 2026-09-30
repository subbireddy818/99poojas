'use client';

import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { siteConfig, faqs } from '../data/poojasData';

export default function HelpSupportModal({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200 dark:border-slate-800 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-vermilion-700 via-vermilion-600 to-sacred-700 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-amber-200 text-xs font-semibold mb-2">
            <Sparkles className="w-3 h-3" />
            <span>24/7 DEVOTEE ASSISTANCE</span>
          </div>
          <h3 className="text-2xl font-bold font-serif text-white">Help & Customer Support</h3>
          <p className="text-xs sm:text-sm text-amber-100 mt-1">
            Connect with the 99Poojas support desk for ritual guidance, custom ceremonies, or booking inquiries.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-8">
          
          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a 
              href={`tel:${siteConfig.phone}`}
              className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border border-amber-100 dark:border-slate-700 flex flex-col items-center text-center hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-vermilion-100 dark:bg-slate-700 flex items-center justify-center text-vermilion-600 mb-2 group-hover:scale-110 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Helpline Number</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{siteConfig.phoneFormatted}</span>
            </a>

            <a 
              href={`mailto:${siteConfig.email}`}
              className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border border-amber-100 dark:border-slate-700 flex flex-col items-center text-center hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-vermilion-100 dark:bg-slate-700 flex items-center justify-center text-vermilion-600 mb-2 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Inquiry Email</span>
              <span className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">{siteConfig.email}</span>
            </a>

            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border border-amber-100 dark:border-slate-700 flex flex-col items-center text-center">
              <div className="w-10 h-10 rounded-xl bg-vermilion-100 dark:bg-slate-700 flex items-center justify-center text-vermilion-600 mb-2">
                <MapPin className="w-5 h-5" />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Service Coverage</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">All Hyderabad & Secunderabad</span>
            </div>
          </div>

          {/* Inquiry Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">
                Send Us a Direct Message
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Number *</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ramesh@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">How Can We Help You? *</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the ritual you want to perform or questions you have..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white font-bold px-7 py-3 rounded-xl shadow-sacred hover:shadow-lg transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-8 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-3">
              <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-slate-900 dark:text-white font-serif">
                Thank you, {name}! Your message has been received.
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto">
                Our Purohit coordination team will call you on <strong>{phone}</strong> shortly to assist you.
              </p>
            </div>
          )}

          {/* Frequently Asked Questions */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
            <h4 className="text-base font-bold text-slate-900 dark:text-white font-serif">
              Frequently Asked Questions (FAQs)
            </h4>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                    {faq.q}
                  </h5>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

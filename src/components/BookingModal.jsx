'use client';

import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ShieldCheck, 
  CreditCard, 
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Download,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { hyderabadLocations, siteConfig } from '../data/poojasData';

export default function BookingModal({ service, onClose, defaultLocation }) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [slot, setSlot] = useState(service?.timeSlots?.[0] || '08:30 AM - 11:30 AM (Auspicious Morning)');
  const [location, setLocation] = useState(defaultLocation || hyderabadLocations[1]);
  
  // Devotee details
  const [devoteeName, setDevoteeName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gothram, setGothram] = useState('');
  const [nakshatram, setNakshatram] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMode, setPaymentMode] = useState('advance'); // 'advance' (30%) or 'full' (100%)
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [bookingId, setBookingId] = useState('');

  if (!service) return null;

  const totalAmount = service.price;
  const discountAmount = couponApplied ? Math.min(500, totalAmount * 0.1) : 0;
  const finalTotal = Math.max(0, totalAmount - discountAmount);
  const advanceAmount = Math.round(finalTotal * (service.advancePercentage / 100));
  const remainingAmount = finalTotal - advanceAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'DIVINE99' || couponCode.trim().toUpperCase() === 'PUROHIT') {
      setCouponApplied(true);
    } else {
      alert('Invalid Promo Code. Try "DIVINE99" for ₹500 off.');
    }
  };

  const handleFinalSubmit = () => {
    const generatedId = '99P-' + Math.floor(100000 + Math.random() * 900000);
    setBookingId(generatedId);
    setStep(4); // Success step
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {}
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-amber-200/50 dark:border-slate-800 overflow-hidden"
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

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden bg-white/20 p-1 backdrop-blur-md">
              <img src={service.image} alt={service.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div>
              <span className="text-xs font-bold text-amber-200 uppercase tracking-wider">Book Vedic Ritual</span>
              <h3 className="text-xl font-bold font-serif text-white">{service.name}</h3>
            </div>
          </div>

          {/* Stepper Bar (if not on success step) */}
          {step < 4 && (
            <div className="mt-6 flex items-center justify-between relative">
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/20 -translate-y-1/2 z-0" />
              
              {[
                { num: 1, label: 'Date & Slot' },
                { num: 2, label: 'Devotee Info' },
                { num: 3, label: 'Payment' }
              ].map((s) => (
                <div key={s.num} className="relative z-10 flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                    step === s.num 
                      ? 'bg-amber-300 text-slate-900 ring-4 ring-white/30 scale-110 font-extrabold' 
                      : step > s.num 
                        ? 'bg-emerald-500 text-white' 
                        : 'bg-white/30 text-white'
                  }`}>
                    {step > s.num ? '✓' : s.num}
                  </div>
                  <span className="text-[11px] font-medium text-amber-100">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Step Body */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto">
          
          {/* STEP 1: Date & Slot */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  1. Select Auspicious Date
                </label>
                <input
                  type="date"
                  value={date}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  2. Select Preferred Vedic Time Slot
                </label>
                <div className="space-y-2">
                  {service.timeSlots.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSlot(s)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between text-sm ${
                        slot === s
                          ? 'border-vermilion-600 bg-amber-50/80 dark:bg-slate-800 text-vermilion-700 dark:text-sacred-400 font-bold ring-2 ring-vermilion-500'
                          : 'border-slate-200 dark:border-slate-700 hover:border-sacred-400 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-sacred-600" />
                        <span>{s}</span>
                      </div>
                      {slot === s && <span className="w-2 h-2 rounded-full bg-vermilion-600"></span>}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-800 dark:text-slate-200 mb-2">
                  3. Select Hyderabad Zone / Area
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white font-medium focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                >
                  {hyderabadLocations.map((loc, idx) => (
                    <option key={idx} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white font-bold px-8 py-3 rounded-2xl shadow-sacred hover:shadow-lg transition-all"
                >
                  <span>Continue to Devotee Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Devotee & Pooja Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Devotee Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={devoteeName}
                    onChange={(e) => setDevoteeName(e.target.value)}
                    placeholder="e.g. Sridhar Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Mobile Number (for WhatsApp updates) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Email Address (for Booking receipt)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sridhar@example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Gothram & Nakshatram (Optional)
                  </label>
                  <input
                    type="text"
                    value={gothram}
                    onChange={(e) => setGothram(e.target.value)}
                    placeholder="e.g. Bharadwaja / Rohini"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Complete Ceremony Address in Hyderabad *
                </label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Flat/House No, Street, Landmark, Pincode"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Special Instructions / Requests for Purohit
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Telugu/Tamil sampradayam, extra mantras..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm focus:ring-2 focus:ring-vermilion-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (!devoteeName || !phone || !address) {
                      alert('Please fill in Name, Phone, and Ceremony Address to continue.');
                      return;
                    }
                    setStep(3);
                  }}
                  className="flex items-center gap-2 bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white font-bold px-8 py-3 rounded-2xl shadow-sacred hover:shadow-lg transition-all"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment & Order Summary */}
          {step === 3 && (
            <div className="space-y-6">
              
              {/* Order Breakdown Box */}
              <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Pooja Service:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{service.name}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Date & Slot:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{date} | {slot.split('(')[0]}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600 dark:text-slate-300">Devotee:</span>
                  <span className="font-medium text-slate-900 dark:text-white">{devoteeName} ({phone})</span>
                </div>

                <div className="pt-3 border-t border-amber-200 dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">Standard Dakshina:</span>
                    <span className="font-bold text-slate-900 dark:text-white">₹{totalAmount.toLocaleString('en-IN')}</span>
                  </div>

                  {couponApplied && (
                    <div className="flex items-center justify-between text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span>Promo Discount (DIVINE99):</span>
                      <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-amber-200 dark:border-slate-700">
                    <span>Total Service Amount:</span>
                    <span className="text-vermilion-600 dark:text-sacred-400">₹{finalTotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {/* Advance Rule Breakdown */}
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-slate-700 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-vermilion-600 block">30% Online Advance Required</span>
                    <span className="text-slate-500">To confirm Purohit booking & samagri</span>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-bold text-slate-900 dark:text-white">₹{advanceAmount.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-slate-400 block">Remaining ₹{remainingAmount.toLocaleString('en-IN')} on completion</span>
                  </div>
                </div>
              </div>

              {/* Promo code */}
              {!couponApplied ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Promo Code (e.g. DIVINE99)"
                    className="flex-grow px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-white text-sm uppercase focus:outline-none focus:ring-2 focus:ring-vermilion-500"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold text-sm"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <span>✓ Coupon applied successfully! ₹{discountAmount} saved.</span>
                  <button onClick={() => setCouponApplied(false)} className="text-red-500 hover:underline">Remove</button>
                </div>
              )}

              {/* Payment Mode Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Select Payment Option
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('advance')}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      paymentMode === 'advance'
                        ? 'border-vermilion-600 bg-amber-50 dark:bg-slate-800 text-vermilion-700 dark:text-sacred-400 font-bold ring-2 ring-vermilion-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="block font-bold">Pay 30% Advance Now</span>
                    <span className="text-slate-500 text-[11px]">Pay ₹{advanceAmount.toLocaleString('en-IN')} to confirm</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('full')}
                    className={`p-3 rounded-2xl border text-left text-xs transition-all ${
                      paymentMode === 'full'
                        ? 'border-vermilion-600 bg-amber-50 dark:bg-slate-800 text-vermilion-700 dark:text-sacred-400 font-bold ring-2 ring-vermilion-500'
                        : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="block font-bold">Pay Full Dakshina (100%)</span>
                    <span className="text-slate-500 text-[11px]">Pay ₹{finalTotal.toLocaleString('en-IN')} online</span>
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg hover:shadow-xl transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Confirm Booking (₹{(paymentMode === 'advance' ? advanceAmount : finalTotal).toLocaleString('en-IN')})</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: SUCCESS CONFIRMATION */}
          {step === 4 && (
            <div className="text-center py-6 space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mx-auto text-emerald-600 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Divine Blessing</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white mt-1">
                  Pooja Booked Successfully!
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 max-w-md mx-auto">
                  Your booking for <strong>{service.name}</strong> on <strong>{date}</strong> has been confirmed. Our certified Vedic Purohit has been assigned to your ceremony.
                </p>
              </div>

              {/* Receipt Summary Card */}
              <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-slate-800 border border-amber-200 dark:border-slate-700 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Booking ID:</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">{bookingId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Devotee Name:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{devoteeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact Number:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Location:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Time Slot:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{slot}</span>
                </div>
                <div className="flex justify-between border-t border-amber-200 dark:border-slate-700 pt-2 font-bold text-sm">
                  <span>Advance Paid:</span>
                  <span className="text-emerald-600">₹{(paymentMode === 'advance' ? advanceAmount : finalTotal).toLocaleString('en-IN')} (Confirmed)</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => alert(`Booking Receipt ${bookingId} downloaded to your device!`)}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-2xl bg-gradient-to-r from-vermilion-600 to-sacred-600 text-white text-xs font-bold shadow-sacred hover:shadow-lg transition-all"
                >
                  Return to Home
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

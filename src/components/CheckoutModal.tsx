import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { X, ShieldCheck, Mail, User, CreditCard, Calendar, Lock, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderTotal: number;
  onSuccess: () => void;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  orderTotal,
  onSuccess
}: CheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Shipping/Billing, 2: Processing, 3: Success Case
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  // Input sanitization
  const handleCardChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').substring(0, 16);
    const formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').substring(0, 4);
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2);
    }
    setCardExpiry(val);
  };

  const handleCvcChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCardCvc(e.target.value.replace(/\D/g, '').substring(0, 3));
  };

  const executeSimulatedPayment = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || !address) {
      alert('Please fill out all required shipping fields.');
      return;
    }
    setStep(2); // Go to processing
  };

  useEffect(() => {
    if (step === 2) {
      const timer = setTimeout(() => {
        setStep(3); // Success after 2 seconds
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs" onClick={onClose} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="payment-form"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10"
            id="checkout-step1-container"
          >
            {/* Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-display font-bold text-slate-800 text-sm tracking-wide uppercase">Secure Premium Checkout</h3>
                <p className="text-[10px] text-slate-400 font-mono tracking-widest font-semibold uppercase">Simulated Sandbox Environment</p>
              </div>
              <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={executeSimulatedPayment} className="p-6 space-y-4">
              {/* Order total */}
              <div className="flex items-center justify-between bg-sky-50 border border-sky-100/50 rounded-xl py-3 px-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-sky-500" />
                  <div>
                    <span className="block text-xs font-semibold text-sky-900">Encrypted Cloud Connection</span>
                    <span className="block text-[9px] text-sky-600/80 font-mono">Guaranteed Safe Inspection</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Payable Total</span>
                  <span className="block text-lg font-mono font-bold text-sky-600">${orderTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Shipping Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest border-l-2 border-sky-500 pl-2">1. Shipping and Billing</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wide font-bold text-slate-500 mb-1">Customer Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        placeholder="Johnathan Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-205 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
                        id="shipping-fullname"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wide font-bold text-slate-500 mb-1">Email Address *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-205 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
                        id="shipping-email"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wide font-bold text-slate-500 mb-1">Physical Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="742 Evergreen Terrace, Springfield"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full text-xs px-3 py-2.5 bg-slate-50/50 border border-slate-205 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
                    id="shipping-address"
                  />
                </div>
              </div>

              {/* Mock Payment details */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest border-l-2 border-sky-500 pl-2">2. Payment Method</h4>
                <p className="text-[10px] text-slate-400 italic">For simulation safety, default dummy values are provided. Feel free to modify them.</p>

                <div>
                  <label className="block text-[10px] uppercase tracking-wide font-bold text-slate-500 mb-1">Credit Card Number</label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      placeholder="XXXX XXXX XXXX XXXX"
                      value={cardNumber}
                      onChange={handleCardChange}
                      className="w-full text-xs font-mono pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-205 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
                      id="card-number-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wide font-bold text-slate-500 mb-1">Expiry Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={handleExpiryChange}
                        className="w-full text-xs font-mono pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-205 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
                        id="card-expiry-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wide font-bold text-slate-500 mb-1">CVV / CVC</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="password"
                        placeholder="123"
                        value={cardCvc}
                        onChange={handleCvcChange}
                        className="w-full text-xs font-mono pl-9 pr-3 py-2.5 bg-slate-50/50 border border-slate-205 rounded-xl focus:outline-hidden focus:border-sky-500 focus:bg-white transition-all"
                        id="card-cvv-input"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Actions */}
              <div className="pt-4 flex items-center justify-between gap-3 border-t border-slate-150">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-sky-100 transition-all duration-300"
                  id="submit-payment"
                >
                  <ShieldCheck className="w-4.5 h-4.5" />
                  Authorize simulated order
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="processing"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-slate-50 z-10"
            id="checkout-step2-processing"
          >
            <div className="relative w-16 h-16 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full border-4 border-sky-100" />
              <motion.div
                className="absolute inset-0 rounded-full border-4 border-t-sky-500 border-r-transparent border-b-transparent border-l-transparent"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
              <RefreshCw className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-sky-500 animate-spin" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-base uppercase tracking-wide">Securing Air-Lock Connection</h3>
            <p className="text-slate-500 text-xs mt-2 max-w-[280px] mx-auto">
              Testing credentials against simulated banking server... Sandbox will respond shortly.
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="success-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-slate-50 z-10"
            id="checkout-step3-success"
          >
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 border border-emerald-100">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            
            <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold rounded-full uppercase tracking-wider mb-2">
              Payment Confirmed
            </span>
            
            <h3 className="font-display font-bold text-slate-800 text-base uppercase tracking-wide">Experience Dispatched</h3>
            <p className="text-slate-500 text-xs mt-2 max-w-[325px] mx-auto leading-relaxed">
              Congratulations <span className="font-semibold text-slate-700">{fullName}</span>! Your customized high-performance premium <span className="font-medium text-sky-600">AeroVapour</span> pod package has been authorized.
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 my-5 border border-slate-100/85 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-455">Recipient Email</span>
                <span className="font-medium text-slate-700">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-455">Dispatch Hub</span>
                <span className="font-display text-sky-600 font-bold uppercase tracking-wider">AeroLabs Sector 7</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-455">Live Simulated Cost</span>
                <span className="font-mono text-emerald-600 font-bold">${orderTotal.toFixed(2)} USD</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 mb-6 italic">No real funds were drawn from any account. This is a functional checkout demonstration.</p>

            <button
              onClick={() => {
                onSuccess();
                onClose();
              }}
              className="w-full bg-slate-900 hover:bg-sky-500 text-white py-3 rounded-xl text-xs uppercase font-bold tracking-wider transition-all duration-300 shadow-md hover:shadow-sky-100"
            >
              Back to Showroom
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

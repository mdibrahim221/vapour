import React, { useState, useId, FormEvent } from 'react';
import { Mail, ArrowRight, ShieldCheck, Github, Radio, Flame, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  scrollToSection: (id: string) => void;
}

export default function Footer({ scrollToSection }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const newsletterEmailId = useId();

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 relative overflow-hidden" id="footer">
      
      {/* Soft color glow accent */}
      <div className="absolute left-1/4 bottom-0 w-[400px] h-[200px] bg-sky-500/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Block: Logo and Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* Logo & Info column */}
          <div className="col-span-1 lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => scrollToSection('hero')}>
              <div className="relative w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white overflow-hidden shadow-sm">
                <span className="font-display font-semibold text-lg text-white">A</span>
              </div>
              <div>
                <span className="font-display font-bold tracking-tight text-white text-base">
                  AERO<span className="text-sky-400">VAPOUR</span>
                </span>
                <span className="block text-[8px] text-sky-400 font-mono tracking-widest uppercase -mt-1 font-semibold">
                  Pure Vapour Labs
                </span>
              </div>
            </div>

            <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              Sculpted for elite performance. Our vaporizers fuse state-of-the-art aerodynamic mesh geometry with USP organic sensory formulations of extreme purity.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 bg-red-950/40 text-red-400 border border-red-900/30 px-3 py-1 rounded-full text-[9px] font-mono uppercase tracking-wider font-bold">
                <Flame className="w-3.5 h-3.5" />
                Underage sale prohibited - 21+ Only
              </span>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-widest pl-2 border-l-2 border-sky-400">
              The Premium Dispatch List
            </h4>
            <p className="text-xs text-slate-500 max-w-lg leading-relaxed">
              Subscribe to unlock early-access drops of limited anodized batch colors, custom hardware collaborations, and lab-exclusive seasonal flavor formulary codes.
            </p>

            {/* Newsletter form with validation support */}
            <form onSubmit={handleSubscribe} className="max-w-md">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <label htmlFor={newsletterEmailId} className="sr-only">Email address for premium newsletter</label>
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    id={newsletterEmailId}
                    type="email"
                    required
                    placeholder="Enter your email to secure privileges"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs text-white pl-10 pr-3 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-hidden focus:border-sky-500 transition-all font-light"
                  />
                </div>
                <button
                  type="submit"
                  disabled={subscribed}
                  className={`px-5 py-3 rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                    subscribed
                      ? 'bg-emerald-600 text-white cursor-default'
                      : 'bg-white hover:bg-sky-400 hover:text-slate-950 text-slate-900'
                  }`}
                  id="newsletter-submit-btn"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4" />
                      Privileges Unlocked!
                    </>
                  ) : (
                    <>
                      Register Address
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {subscribed && (
              <motion.p
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[10px] text-emerald-400 font-mono font-medium flex items-center gap-1"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Validation complete. First allocation coupon [AERO-MUTE] sent to your dispatch!
              </motion.p>
            )}
          </div>

        </div>

        {/* Middle Block: Dynamic Links lists */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 text-xs font-light">
          
          {/* Quick links */}
          <div className="space-y-4">
            <h4 className="font-display font-medium text-white tracking-widest uppercase text-[10px]">Navigate Labs</h4>
            <ul className="space-y-2.5 text-slate-500">
              <li><button onClick={() => scrollToSection('hero')} className="hover:text-sky-400 uppercase tracking-wide text-[10px]">Overview</button></li>
              <li><button onClick={() => scrollToSection('gallery')} className="hover:text-sky-400 uppercase tracking-wide text-[10px]">The Aero Series</button></li>
              <li><button onClick={() => scrollToSection('tech')} className="hover:text-sky-400 uppercase tracking-wide text-[10px]">Hardware Spectrometry</button></li>
              <li><button onClick={() => scrollToSection('flavors')} className="hover:text-sky-400 uppercase tracking-wide text-[10px]">Sensory Formulary</button></li>
              <li><button onClick={() => scrollToSection('configurator')} className="hover:text-sky-400 uppercase tracking-wide text-[10px]">Bespoke Configurator</button></li>
            </ul>
          </div>

          {/* Legal documentation warnings */}
          <div className="space-y-4">
            <h4 className="font-display font-medium text-white tracking-widest uppercase text-[10px]">Public Accords</h4>
            <ul className="space-y-2.5 text-slate-500">
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Age Gate Policy</a></li>
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Botanical Warranties</a></li>
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Disposal Certs</a></li>
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Service Codes</a></li>
            </ul>
          </div>

          {/* Support and communication */}
          <div className="space-y-4">
            <h4 className="font-display font-medium text-white tracking-widest uppercase text-[10px]">Support Hub</h4>
            <ul className="space-y-2.5 text-slate-500">
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Secure Portals</a></li>
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Corporate Inquiries</a></li>
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Lab Facilities</a></li>
              <li><a href="#footer" className="hover:text-sky-400 text-[10px] uppercase">Return Accords</a></li>
            </ul>
          </div>

          {/* Technical schematic specs */}
          <div className="space-y-4">
            <h4 className="font-display font-medium text-white tracking-widest uppercase text-[10px]">Lab Status</h4>
            <div className="space-y-2 font-mono text-[9px] text-slate-550 leading-relaxed">
              <p className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Sector 7 Active</p>
              <p>Fibre Laser: Online</p>
              <p>Melt limits: 1,844°C</p>
              <p>IP Rating: IPX-4 Seal</p>
            </div>
          </div>

        </div>

        {/* Bottom Block: Legal Disclaimers & Credits */}
        <div className="pt-8 border-t border-slate-800 text-[9px] sm:text-[10px] text-slate-550 space-y-4 font-light">
          
          <div className="text-slate-600 space-y-2 leading-relaxed">
            <p>
              <strong>WARNING</strong>: This product contains nicotine. Nicotine is an highly toxic, addictive chemical compound. Keep out of reach of children and domestic pets. These products have not been evaluated by the FDA to diagnose, cure, mitigate, or treat any medical conditions. Sales are restricted strictly to verified individuals age 21 or older within legal operating locations.
            </p>
            <p>
              © {new Date().getFullYear()} AeroVapour Labs, Inc. All rights reserved. Designed with meticulous engineering principles for luxury adult alternative flows.
            </p>
          </div>

          {/* Payment Badges and secure check icon */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-slate-950/45 border border-slate-800 rounded font-mono text-[8px] tracking-wider uppercase">Visa Secure</span>
              <span className="px-2 py-0.5 bg-slate-950/45 border border-slate-800 rounded font-mono text-[8px] tracking-wider uppercase">Mastercard ID</span>
              <span className="px-2 py-0.5 bg-slate-950/45 border border-slate-800 rounded font-mono text-[8px] tracking-wider uppercase">AmEx Safe</span>
              <span className="px-2 py-0.5 bg-slate-950/45 border border-slate-800 rounded font-mono text-[8px] tracking-wider uppercase">Apple Pay</span>
            </div>

            <div className="flex items-center gap-1.5 text-sky-450 font-mono text-[9px] font-bold">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              Secure 256-Bit SSL Decryption Active
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

import { useState } from 'react';
import { ShoppingBag, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  activeSection,
  scrollToSection
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Overview' },
    { id: 'gallery', label: 'Showcase' },
    { id: 'tech', label: 'Hardware' },
    { id: 'flavors', label: 'Flavours' },
    { id: 'configurator', label: 'Bespoke Lab' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
        <div className="glass-panel rounded-2xl sky-blur-glow py-3 px-5 sm:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center gap-2 cursor-pointer group"
            id="nav-logo"
          >
            <div className="relative w-8 h-8 rounded-lg bg-sky-500 flex items-center justify-center text-white overflow-hidden shadow-sm">
              <span className="font-display font-semibold text-lg text-white">A</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-sky-450 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div>
              <span className="font-display font-bold tracking-tight text-slate-800 text-sm sm:text-base">
                AERO<span className="text-sky-500">VAPOUR</span>
              </span>
              <span className="block text-[9px] text-sky-500 font-mono tracking-widest uppercase -mt-1 font-semibold">
                Premium Flow
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-1.5 rounded-xl text-xs font-medium tracking-wide uppercase transition-all duration-300 ${
                  activeSection === item.id
                    ? 'text-sky-600 font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50/50'
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-sky-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Quick Experience Badge */}
            <div className="hidden lg:flex items-center gap-1 bg-sky-50 border border-sky-100 text-sky-600 rounded-lg px-2.5 py-1 text-[10px] font-mono font-semibold tracking-wider uppercase">
              <Sparkles className="w-3 h-3 text-sky-500 animate-pulse" />
              Pure Vapour Labs
            </div>

            {/* Shopping Bag */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200"
              aria-label="Open Cart"
              id="cart-button"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-sky-500 text-white font-mono text-[9px] font-bold w-4 h-4 sm:w-4.5 sm:h-4.5 flex items-center justify-center rounded-full border-2 border-white animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100/50 transition-all duration-200"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-[76px] left-4 right-4 z-40"
          >
            <div className="glass-panel rounded-2xl sky-blur-glow-lg p-5 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    scrollToSection(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium uppercase tracking-wider transition-all ${
                    activeSection === item.id
                      ? 'bg-sky-50 text-sky-600 pl-6 border-l-2 border-sky-500'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                  id={`mobile-nav-item-${item.id}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <ArrowUpRight className={`w-4 h-4 opacity-50 ${activeSection === item.id ? 'text-sky-500 opacity-100' : ''}`} />
                  </div>
                </button>
              ))}
              
              <div className="h-px bg-slate-100 my-1" />
              
              <div className="p-3 bg-sky-50/55 rounded-xl border border-sky-100 flex items-center justify-between text-xs text-sky-700">
                <span className="font-semibold">Next-Gen Aerodynamics</span>
                <span className="font-mono text-[10px] bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">V2.4</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

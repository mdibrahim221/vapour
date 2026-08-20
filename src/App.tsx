import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, ShieldCheck } from 'lucide-react';
import { Product, VapeConfig } from './types';

// Import our cohesive UI components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SleekProductGallery from './components/SleekProductGallery';
import HardwareSpecs from './components/HardwareSpecs';
import InteractiveFlavors from './components/InteractiveFlavors';
import InteractiveConfigurator from './components/InteractiveConfigurator';
import Footer from './components/Footer';
import CartDrawer, { CartItem } from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const savedCart = localStorage.getItem('vape_cart_items');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error('Failed to parse cart items:', e);
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);

  // Load age verification status on mount
  useEffect(() => {
    const verified = localStorage.getItem('vape_age_verified') === 'true';
    setAgeVerified(verified);
  }, []);

  // Save cart items to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('vape_cart_items', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart items:', e);
    }
  }, [cartItems]);

  // Sync scroll section highlighting
  useEffect(() => {
    const sections = ['hero', 'gallery', 'tech', 'flavors', 'configurator'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Cart operations
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    flavor: string,
    nicotine: string,
    price: number
  ) => {
    const generatedId = `${product.id}-${selectedColor.replace('#', '')}-${flavor.replace(/\s+/g, '')}-${nicotine}`;
    
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === generatedId);
      if (exists) {
        return prev.map((item) =>
          item.id === generatedId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: generatedId,
          product,
          selectedColor,
          flavor,
          nicotine,
          isCustom: false,
          quantity: 1,
          price
        }
      ];
    });
  };

  const handleAddCustomToCart = (
    product: Product,
    config: VapeConfig,
    price: number
  ) => {
    const generatedId = `custom-${config.color.replace('#', '')}-${config.podCapacity}-${config.throatHit}-${config.engraving.replace(/\s+/g, '')}`;
    
    setCartItems((prev) => {
      const exists = prev.find((item) => item.id === generatedId);
      if (exists) {
        return prev.map((item) =>
          item.id === generatedId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: generatedId,
          product,
          selectedColor: config.color,
          flavor: `Bespoke Juice Blend`,
          nicotine: '2%',
          throatHit: config.throatHit,
          capacity: config.podCapacity,
          isCustom: true,
          quantity: 1,
          price
        }
      ];
    });
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const handleCheckoutTrigger = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutSuccess = () => {
    // Clear cart upon successful simulation
    setCartItems([]);
    setIsCheckoutOpen(false);
  };

  const handleVerifyAge = (isOfAge: boolean) => {
    if (isOfAge) {
      localStorage.setItem('vape_age_verified', 'true');
      setAgeVerified(true);
    } else {
      alert('Access Denied. You must be 21 years of age or older to enter.');
      window.location.href = 'https://www.google.com';
    }
  };

  // Calculate cart subtotal
  const cartSubtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliverySurcharge = cartSubtotal > 50 ? 0 : cartSubtotal === 0 ? 0 : 5.99;
  const cartTotalVal = cartSubtotal + deliverySurcharge;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans flex flex-col justify-between">
      
      {/* 21+ Age Gate Modal Backdrop and Alert Box */}
      <AnimatePresence>
        {ageVerified === false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl p-4"
            id="age-verification-overlay"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 text-center shadow-2xl border border-slate-100"
            >
              <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-rose-500 animate-bounce">
                <AlertCircle className="w-6 h-6" />
              </div>

              <span className="inline-block px-3 py-1 bg-rose-100 text-rose-800 text-[9px] font-mono font-black rounded-lg uppercase tracking-widest mb-2">
                Verification Protocol Required
              </span>

              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 tracking-tight leading-tight">
                Are you 21 years of age or older?
              </h2>

              <p className="text-xs text-slate-550 leading-relaxed font-light mt-3">
                This platform is dedicated strictly to adult smokers and lifestyle alternative vapers. By entering, you certify that you meet the regulatory age gate guidelines of your state.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3" id="age-gate-actions">
                <button
                  onClick={() => handleVerifyAge(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-650 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
                  id="age-gate-decline"
                >
                  I am Under 21
                </button>
                <button
                  onClick={() => handleVerifyAge(true)}
                  className="px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-md shadow-sky-50 flex items-center justify-center gap-1.5 transition-all duration-300"
                  id="age-gate-accept"
                >
                  <ShieldCheck className="w-4 h-4 fill-white/10" />
                  Accept & Entry
                </button>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 text-[10px] text-slate-400 font-light flex items-center justify-center">
                Encrypted Age Verification Agreement Policy
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Primary Landing layout */}
      <>
        {/* Transparent Blur Navbar */}
        <Navbar
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onOpenCart={() => setIsCartOpen(true)}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
        />

        {/* Hero Section with Cinematic Vapour Background */}
        <Hero onScrollDown={() => scrollToSection('gallery')} />

        {/* Sleek Showcase Gallery (Integrates custom color modifiers & flavors bundle options) */}
        <SleekProductGallery onAddToCart={handleAddToCart} />

        {/* Explorative 3D Exploded Schema part */}
        <HardwareSpecs />

        {/* Flavor Lab analysis */}
        <InteractiveFlavors />

        {/* Bespoke Configurator Lab */}
        <InteractiveConfigurator onAddCustomToCart={handleAddCustomToCart} />

        {/* Sophisticated Wide Footer with disclaimer */}
        <Footer scrollToSection={scrollToSection} />

        {/* Overlays and Sheets dynamic trigger */}
        <AnimatePresence>
          {isCartOpen && (
            <CartDrawer
              isOpen={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckoutTrigger}
            />
          )}

          {isCheckoutOpen && (
            <CheckoutModal
              isOpen={isCheckoutOpen}
              onClose={() => setIsCheckoutOpen(false)}
              orderTotal={cartTotalVal}
              onSuccess={handleCheckoutSuccess}
            />
          )}
        </AnimatePresence>
      </>
    </div>
  );
}

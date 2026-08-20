import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Shield, Battery, Droplet, Zap, ArrowRight, Check } from 'lucide-react';
import { Product, Flavor } from '../types';
import { PRODUCTS, FLAVORS } from '../data';

interface SleekProductGalleryProps {
  onAddToCart: (product: Product, color: string, flavor: string, nicotine: string, price: number) => void;
}

export default function SleekProductGallery({ onAddToCart }: SleekProductGalleryProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'max' | 'mini'>('all');
  const [selectedColors, setSelectedColors] = useState<Record<string, string>>({
    'aero-pro-max': '#38bdf8', // Sky Blue
    'aero-pod-mini': '#a7f3d0' // Ice Mint
  });
  const [selectedFlavors, setSelectedFlavors] = useState<Record<string, string>>({
    'aero-pro-max': 'Glacial Frost',
    'aero-pod-mini': 'Jasmine White Tea'
  });
  const [selectedNicotine, setSelectedNicotine] = useState<Record<string, string>>({
    'aero-pro-max': '2%',
    'aero-pod-mini': '2%'
  });
  const [notification, setNotification] = useState<string | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'max') return p.id === 'aero-pro-max';
    if (activeTab === 'mini') return p.id === 'aero-pod-mini';
    return true;
  });

  const handleColorSelect = (productId: string, hexColor: string) => {
    setSelectedColors((prev) => ({ ...prev, [productId]: hexColor }));
  };

  const handleFlavorSelect = (productId: string, flavorName: string) => {
    setSelectedFlavors((prev) => ({ ...prev, [productId]: flavorName }));
  };

  const handleNicotineSelect = (productId: string, strength: string) => {
    setSelectedNicotine((prev) => ({ ...prev, [productId]: strength }));
  };

  const triggerAddToCart = (product: Product) => {
    const color = selectedColors[product.id];
    const flavor = selectedFlavors[product.id];
    const nicotine = selectedNicotine[product.id];
    
    // Add to stateful cart
    onAddToCart(product, color, flavor, nicotine, product.price);

    // Show dynamic in-card success notification banner
    setNotification(product.id);
    setTimeout(() => {
      setNotification(null);
    }, 2800);
  };

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase">
            Signature Design Showroom
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            The Aero Series Portfolio
          </h2>
          <p className="text-slate-550 text-sm sm:text-base font-light mt-3">
            Whether you demand full-performance clouds or premium travel compliance, our curated hardware lines match every rhythm. Pure engineering. Seamless luxury.
          </p>

          {/* Filter Navigation */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl mt-8 border border-slate-200" id="showcase-tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              All Harware
            </button>
            <button
              onClick={() => setActiveTab('max')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'max'
                  ? 'bg-white text-slate-800 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Pro Max Series
            </button>
            <button
              onClick={() => setActiveTab('mini')}
              className={`px-5 py-2 text-xs font-semibold uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'mini'
                  ? 'bg-white text-slate-850 shadow-xs'
                  : 'text-slate-500 hover:text-slate-850'
              }`}
            >
              Pod Mini Series
            </button>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-14" id="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => {
              const currentColor = selectedColors[product.id];
              const currentFlavor = selectedFlavors[product.id];
              const currentNicotine = selectedNicotine[product.id];
              const isAdded = notification === product.id;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-slate-50/70 rounded-3xl border border-slate-100 hover:border-sky-100 hover:bg-slate-55/40 hover:shadow-xl hover:shadow-sky-50 transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between group"
                  id={`product-card-${product.id}`}
                >
                  <div>
                    {/* Header line */}
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <span className="inline-block px-2.5 py-0.5 bg-sky-100 text-sky-800 font-mono text-[9px] font-bold rounded-lg uppercase tracking-wider">
                          {product.id === 'aero-pro-max' ? 'Performance Flagship' : 'Ultra Compact'}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 mt-2">
                          {product.name}
                        </h3>
                        <p className="text-xs text-slate-400 font-mono tracking-wide mt-0.5">
                          {product.subtitle}
                        </p>
                      </div>

                      <div className="text-right">
                        <span className="block text-2xl font-display font-black text-slate-900">${product.price}</span>
                        <div className="flex items-center gap-0.5 mt-1 justify-end text-xs text-slate-500 bg-white border border-slate-100 rounded-lg px-2 py-0.5">
                          <Star className="w-3.5 h-3.5 fill-sky-400 text-sky-450" />
                          <span className="font-semibold font-mono text-[11px]">{product.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Image Area with Dynamic color glows */}
                    <div className="relative h-64 sm:h-72 my-6 bg-white rounded-2xl overflow-hidden border border-slate-100/80 flex items-center justify-center sky-blur-glow group-hover:scale-[1.01] transition-transform duration-300">
                      
                      {/* Interactive Sky background gradient linked to selected color */}
                      <div 
                        className="absolute inset-0 opacity-10 transition-colors duration-500" 
                        style={{ backgroundColor: currentColor }} 
                      />
                      
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-52 sm:h-60 w-auto object-contain z-10 scale-105 group-hover:scale-110 transition-transform duration-550"
                        referrerPolicy="no-referrer"
                      />

                      <div className="absolute bottom-3 left-3 z-15 flex items-center gap-1 bg-white/80 backdrop-blur-md px-2 py-1 rounded-md text-[9px] text-slate-500 font-mono">
                        <Shield className="w-3 h-3 text-sky-500" /> Premium Cartridge System
                      </div>
                    </div>

                    {/* Highlight Description */}
                    <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                      {product.description}
                    </p>

                    {/* Specifications badges */}
                    <div className="grid grid-cols-2 gap-3 my-5">
                      <div className="p-2.5 bg-white border border-slate-100 rounded-xl flex items-center gap-2">
                        <Battery className="w-4 h-4 text-sky-505" />
                        <div>
                          <span className="block text-[8px] uppercase tracking-wide font-bold text-slate-400">Power Node</span>
                          <span className="block text-[10px] font-mono font-bold text-slate-700">{product.battery}</span>
                        </div>
                      </div>
                      <div className="p-2.5 bg-white border border-slate-100 rounded-xl flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-sky-505" />
                        <div>
                          <span className="block text-[8px] uppercase tracking-wide font-bold text-slate-400">Reservoir</span>
                          <span className="block text-[10px] font-mono font-bold text-slate-700">{product.capacity}</span>
                        </div>
                      </div>
                    </div>

                    {/* Configuration Panel */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                      
                      {/* Color finish selector */}
                      <div>
                        <span className="block text-[10px] uppercase tracking-wide font-bold text-slate-400 mb-1.5">
                          1. Select Body Coating Color Finish
                        </span>
                        <div className="flex items-center gap-2.5">
                          {product.colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => handleColorSelect(product.id, color.hex)}
                              className={`relative w-8 h-8 rounded-full border border-neutral-100 flex items-center justify-center transition-all duration-200 ${
                                currentColor === color.hex ? 'scale-110 ring-2 ring-sky-500 ring-offset-2' : 'opacity-85 hover:opacity-100'
                              }`}
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                              id={`color-${product.id}-${color.name}`}
                            >
                              {currentColor === color.hex && (
                                <Check className="w-3.5 h-3.5 text-slate-800 mix-blend-difference" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Starter Flavors collection selection */}
                      <div>
                        <span className="block text-[10px] uppercase tracking-wide font-bold text-slate-400 mb-1.5">
                          2. Pick Complimentary Starter Liquid Pod
                        </span>
                        <div className="grid grid-cols-3 gap-2">
                          {FLAVORS.map((flavor) => (
                            <button
                              key={flavor.id}
                              onClick={() => handleFlavorSelect(product.id, flavor.name)}
                              className={`px-2.5 py-2 rounded-xl text-[10px] font-semibold text-center border transition-all ${
                                currentFlavor === flavor.name
                                  ? 'bg-sky-50 border-sky-400 text-sky-850'
                                  : 'bg-white border-slate-150 text-slate-550 hover:bg-slate-50'
                              }`}
                              id={`flavor-${product.id}-${flavor.id}`}
                            >
                              {flavor.name.split(' ')[0]}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Nicotine selection strength */}
                      <div>
                        <span className="block text-[10px] uppercase tracking-wide font-bold text-slate-400 mb-1.5">
                          3. Choose Nicotine Strength
                        </span>
                        <div className="flex items-center gap-2">
                          {['0%', '2%', '5%'].map((strength) => (
                            <button
                              key={strength}
                              onClick={() => handleNicotineSelect(product.id, strength)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-all ${
                                currentNicotine === strength
                                  ? 'bg-slate-900 border-slate-900 text-white'
                                  : 'bg-white border-slate-150 text-slate-550 hover:bg-slate-50'
                              }`}
                              id={`nicotine-${product.id}-${strength}`}
                            >
                              {strength}
                            </button>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Add action button */}
                  <div className="mt-8">
                    <button
                      onClick={() => triggerAddToCart(product)}
                      disabled={isAdded}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold uppercase text-[11px] tracking-widest flex items-center justify-center gap-2 shadow-xs transition-all duration-300 ${
                        isAdded
                          ? 'bg-emerald-500 text-white cursor-default'
                          : 'bg-slate-900 hover:bg-sky-500 hover:shadow-sky-100 text-white'
                      }`}
                      id={`add-to-cart-btn-${product.id}`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-white font-black" />
                          Config Pack Added Successfully!
                        </>
                      ) : (
                        <>
                          Configure & Add to Bag
                          <ArrowRight className="w-4 h-4 text-slate-350" />
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Brand Promise Section (Sleek Horizontal banner) */}
        <div className="mt-20 glass-panel rounded-3xl p-8 border border-sky-100/50 flex flex-col md:flex-row items-center justify-between gap-6" id="promise-banner">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 flex-shrink-0">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-display font-bold text-slate-800 text-sm">Strict Botanical Assurance</h4>
              <p className="text-slate-500 text-xs mt-1">Our starter juices use exclusively premium organic vegetable glycerin (VG) and kosher propylene glycol (PG).</p>
            </div>
          </div>
          <a
            href="#flavors"
            className="flex-shrink-0 bg-sky-50 hover:bg-sky-100 text-sky-600 px-5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all"
          >
            Review Flavour Sheets
          </a>
        </div>

      </div>
    </section>
  );
}

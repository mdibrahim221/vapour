import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Award, Sparkles, Sliders, Wind, Check } from 'lucide-react';
import { Flavor } from '../types';
import { FLAVORS } from '../data';

// Add sensory metrics for luxury feel
interface SensoryValue {
  coolness: number;
  sweetness: number;
  aromaDensity: number;
  throatHitSmoothness: number;
}

const SENSORY_METRICS: Record<string, SensoryValue> = {
  'glacial-frost': { coolness: 95, sweetness: 35, aromaDensity: 65, throatHitSmoothness: 80 },
  'azure-blueberries': { coolness: 45, sweetness: 85, aromaDensity: 90, throatHitSmoothness: 90 },
  'white-jasmine-tea': { coolness: 25, sweetness: 15, aromaDensity: 80, throatHitSmoothness: 95 }
};

export default function InteractiveFlavors() {
  const [selectedFlavor, setSelectedFlavor] = useState<Flavor>(FLAVORS[0]);
  const [isAtomizing, setIsAtomizing] = useState(false);

  const metrics = SENSORY_METRICS[selectedFlavor.id];

  const handleTestDraw = () => {
    setIsAtomizing(true);
    setTimeout(() => {
      setIsAtomizing(false);
    }, 2500);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden" id="flavors">
      
      {/* Decorative blurred vapor ring */}
      <div 
        className="absolute -right-32 top-1/4 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 transition-all duration-750"
        style={{ backgroundColor: selectedFlavor.accentColor }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase flex items-center justify-center gap-1">
            <Droplet className="w-3.5 h-3.5" /> Organic formulation lab
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Ethereal Sensory Formulations
          </h2>
          <p className="text-slate-550 text-sm sm:text-base font-light mt-3">
            Handcrafted in micro-batches using natural, USP-grade organic extractions. Choose a selection to preview chemical composition and vapor metrics.
          </p>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Juice Selection Cards */}
          <div className="col-span-1 lg:col-span-5 space-y-4">
            <span className="block text-[10px] uppercase tracking-wider font-extrabold text-slate-400 mb-2 pl-1">
              Select Batch Formulation
            </span>
            {FLAVORS.map((flavor) => {
              const isSelected = selectedFlavor.id === flavor.id;
              
              return (
                <button
                  key={flavor.id}
                  onClick={() => setSelectedFlavor(flavor)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-slate-50 border-slate-300 shadow-md'
                      : 'bg-white border-slate-150 hover:bg-slate-50/50 hover:border-slate-300'
                  }`}
                  id={`flavor-card-${flavor.id}`}
                >
                  {/* Subtle color highlight */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1.5 transition-transform ${
                      isSelected ? 'scale-y-100' : 'scale-y-0'
                    }`}
                    style={{ backgroundColor: flavor.accentColor }}
                  />

                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-display font-bold text-slate-800 text-sm sm:text-base">{flavor.name}</h3>
                      <p className="text-slate-500 text-[11px] font-sans font-light mt-0.5">{flavor.tagline}</p>
                    </div>
                    
                    <div 
                      className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center text-xs text-white shadow-xs group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: flavor.accentColor }}
                    >
                      <Droplet className="w-4 h-4 fill-white/10" />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Block: Sensory Analysis Display */}
          <div className="col-span-1 lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFlavor.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-slate-50/70 border border-slate-100 rounded-3xl p-6 sm:p-8 relative sky-blur-glow"
                id="flavor-sensory-panel"
              >
                {/* Active flavor glow */}
                <div 
                  className="absolute inset-[10%] rounded-full opacity-10 filter blur-[80px] pointer-events-none transition-all duration-500" 
                  style={{ backgroundColor: selectedFlavor.accentColor }}
                />

                <div className="relative z-10 space-y-6">
                  
                  {/* Title & Tag */}
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-mono tracking-widest text-sky-500 font-bold">
                        Sensory Profile Analysis
                      </span>
                      <h4 className="text-2xl font-display font-extrabold text-slate-900 mt-1">
                        {selectedFlavor.name}
                      </h4>
                    </div>

                    <div className="px-3 py-1 bg-white border border-slate-150 rounded-lg text-[10px] font-mono text-slate-600 font-semibold shadow-xs">
                      {selectedFlavor.mixRatio}
                    </div>
                  </div>

                  <p className="text-slate-500 text-xs sm:text-sm font-light leading-relaxed">
                    {selectedFlavor.description}
                  </p>

                  {/* Nicotine strengths tag cloud */}
                  <div>
                    <span className="block text-[9px] uppercase font-bold tracking-wide text-slate-400 mb-1.5">
                      Available Strengths
                    </span>
                    <div className="flex items-center gap-1.5">
                      {selectedFlavor.nicotineStrengths.map((str) => (
                        <span 
                          key={str}
                          className="px-2.5 py-1 bg-white border border-slate-150 text-[10px] font-mono text-slate-700 font-bold rounded-md"
                        >
                          {str} Base
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Sensory bars */}
                  <div className="space-y-3.5 pt-4 border-t border-slate-150/80">
                    
                    {/* Coolness */}
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        <span>Cooling Index (Menthol)</span>
                        <span className="font-mono text-slate-750">{metrics.coolness}%</span>
                      </div>
                      <div className="h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-sky-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.coolness}%` }}
                          transition={{ duration: 0.65, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Sweetness */}
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        <span>Sweetness Density</span>
                        <span className="font-mono text-slate-750">{metrics.sweetness}%</span>
                      </div>
                      <div className="h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-rose-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.sweetness}%` }}
                          transition={{ duration: 0.65, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                    {/* Aroma Density */}
                    <div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-500 mb-1 uppercase tracking-wider">
                        <span>Aromatic Expression (Exhale)</span>
                        <span className="font-mono text-slate-750">{metrics.aromaDensity}%</span>
                      </div>
                      <div className="h-2 bg-slate-200/60 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-violet-400 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${metrics.aromaDensity}%` }}
                          transition={{ duration: 0.65, ease: 'easeOut' }}
                        />
                      </div>
                    </div>

                  </div>

                  {/* Live Simulation Button: Press for draw cloud effect! */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={handleTestDraw}
                      disabled={isAtomizing}
                      className="w-full sm:w-auto bg-slate-900 border border-slate-900 hover:bg-sky-500 hover:border-transparent text-white text-xs uppercase tracking-widest font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md group"
                    >
                      {isAtomizing ? (
                        <>
                          <Wind className="w-4.5 h-4.5 text-white animate-bounce" />
                          Atomizing Vapor...
                        </>
                      ) : (
                        <>
                          Simulate Test Inhalation
                          <Wind className="w-4.5 h-4.5 text-slate-400 group-hover:text-white" />
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2 bg-white border border-slate-150 px-3 py-2 rounded-xl text-[10px] text-slate-500 font-mono">
                      <Award className="w-4 h-4 text-sky-500" />
                      100% Organically Extracted
                    </div>
                  </div>

                </div>

                {/* Animated smoke simulator overlay layer */}
                <AnimatePresence>
                  {isAtomizing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-3xl bg-slate-900/10 backdrop-blur-md flex flex-col items-center justify-center overflow-hidden z-25 text-center px-4"
                    >
                      {/* Floating steam curls */}
                      <div className="absolute inset-x-0 bottom-0 h-40 flex items-center justify-center overflow-hidden">
                        <motion.div 
                          className="w-32 h-32 rounded-full blur-xl filter opacity-45"
                          style={{ backgroundColor: selectedFlavor.accentColor }}
                          animate={{ y: [-20, -180], scale: [1, 2.8], opacity: [0.6, 0] }}
                          transition={{ duration: 2, ease: 'easeOut', repeat: Infinity }}
                        />
                        <motion.div 
                          className="w-24 h-24 rounded-full blur-xl filter opacity-35"
                          style={{ backgroundColor: selectedFlavor.accentColor }}
                          animate={{ y: [-10, -150], scale: [1, 2.2], opacity: [0.5, 0] }}
                          transition={{ duration: 1.8, delay: 0.4, ease: 'easeOut', repeat: Infinity }}
                        />
                      </div>

                      <div className="z-30 space-y-1.5 p-5 bg-white border border-slate-100 shadow-xl rounded-2xl max-w-[240px]">
                        <p className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center justify-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-sky-505 animate-pulse" /> Smooth Inhalation
                        </p>
                        <p className="text-[10px] text-slate-450 leading-relaxed font-light">
                          Our smart dual micro-heating mesh grid hits exactly 185°C. Release to check data.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

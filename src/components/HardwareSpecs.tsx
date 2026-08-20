import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ShieldAlert, BadgeCheck, Eye, Cpu, Settings, Layers } from 'lucide-react';
import { vapeTechnologyExploded } from '../data';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  x: string; // pre-calculated proportional coordinates
  y: string;
  description: string;
  specification: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'battery-node',
    title: 'Anodized Fast-Charge Base',
    subtitle: '750mAh smart lithium core',
    x: '48%',
    y: '80%',
    description: 'Equipped with an intelligent battery management system (BMS). Integrates direct short-circuit protection and completes a full USB-C fast-charge in exactly 22 minutes.',
    specification: '850mAh | Overcharge auto-cutoff'
  },
  {
    id: 'mesh-coil',
    title: 'Dual-Grid Mesh Heating',
    subtitle: 'Premium mesh structure',
    x: '52%',
    y: '58%',
    description: 'Constructed from aerospace alloy grids, creating 40% wider surface contact than traditional wire, generating immediate velvet-smooth clouds with zero delay.',
    specification: '1.2 Ohm mesh structure | High thermal limit'
  },
  {
    id: 'quartz-chamber',
    title: 'Quartz Tempered Chamber',
    subtitle: 'Heat insulated core',
    x: '50%',
    y: '45%',
    description: 'A dedicated premium quartz barrier surrounding the heater, protecting the outer body finish from transferring any sensible temperature to your fingertips.',
    specification: 'Tempered quartz glass | Double isolated'
  },
  {
    id: 'organic-cotton',
    title: 'Pure Organic Cotton',
    subtitle: '100% Japanese botanical cotton',
    x: '46%',
    y: '33%',
    description: 'We weave sterilized organic long-fiber cotton to ensure uniform capillarity. Retains flavor profiles exactly as mixed in the lab, with zero artificial residues.',
    specification: '100% Cotton | Unbleached organic'
  },
  {
    id: 'mag-seal',
    title: 'Precision Magnetic Air-Lock',
    subtitle: 'N52 Neodymium docking rings',
    x: '50%',
    y: '20%',
    description: 'Four military-grade magnetic contact points pulling with 1.4kg of constant force. Creates an airtight hermetic seal, making leaks physically impossible during travel.',
    specification: 'Quad N52 Magnets | Hermetic air alignment'
  }
];

export default function HardwareSpecs() {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot>(HOTSPOTS[1]); // Default to Mesh Coil

  return (
    <section className="py-24 bg-slate-50 relative" id="tech">
      
      {/* Background ambient light sky blue spots */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-sky-200/20 blur-[120px] rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase flex items-center justify-center gap-1.5">
            <Cpu className="w-4 h-4" />
            ENGINEERING SPECTROMETRY
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            Designed for Absolute Flow Precision
          </h2>
          <p className="text-slate-500 text-sm sm:text-base font-light mt-3">
            Every layer is sculpted to solve typical vape flaws: zero leak paths, complete thermal isolate barriers, and consistent thermal grids. Touch the pulsing markers to explore our blueprint.
          </p>
        </div>

        {/* Blueprint Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Interactive Blueprint visual stage */}
          <div className="col-span-1 lg:col-span-7 flex items-center justify-center relative bg-white border border-slate-150 rounded-3xl p-6 sm:p-10 shadow-xs h-[520px] sm:h-[600px] overflow-hidden group">
            
            {/* Grid schema styling back */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
            
            {/* Explo diagram */}
            <img 
              src={vapeTechnologyExploded} 
              alt="AeroVapour Exploded schematics" 
              className="h-full w-auto object-contain z-10 scale-102 group-hover:scale-105 transition-all duration-700"
              referrerPolicy="no-referrer"
            />

            {/* Hotspots layer */}
            <div className="absolute inset-0 z-20">
              {HOTSPOTS.map((hotspot) => {
                const isActive = selectedHotspot.id === hotspot.id;
                return (
                  <button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className="absolute w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center focus:outline-hidden focus:ring-2 focus:ring-sky-505 transition-all"
                    style={{ left: hotspot.x, top: hotspot.y }}
                    aria-label={`Inspect ${hotspot.title}`}
                    id={`hotspot-btn-${hotspot.id}`}
                  >
                    {/* Ring glow */}
                    <span className={`absolute inset-0 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-sky-500 scale-135 opacity-25' : 'bg-slate-400 scale-100 opacity-20'
                    }`} />
                    
                    {/* Pulsing ring */}
                    {!isActive && (
                      <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-60" style={{ animationDuration: '2s' }} />
                    )}

                    {/* Dot Center */}
                    <span className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                      isActive ? 'bg-sky-500 border-white scale-125' : 'bg-white border-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Scale indicator watermark */}
            <div className="absolute bottom-4 left-4 bg-slate-100 border border-slate-205/85 px-3 py-1.5 rounded-lg text-[9px] font-mono text-slate-500 flex items-center gap-1.5 z-10">
              <Layers className="w-3.5 h-3.5 text-sky-550" />
              Scale 1.4:1 Blueprint Render
            </div>
          </div>

          {/* Right Block: Selected part description details card */}
          <div className="col-span-1 lg:col-span-5 space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedHotspot.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35 }}
                className="bg-white border border-slate-150 rounded-3xl p-6 sm:p-8 shadow-md relative sky-blur-glow"
                id="hotspot-detail-card"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="p-2 bg-sky-50 text-sky-600 rounded-xl">
                    <Settings className="w-5 h-5 animate-spin" style={{ animationDuration: '8s' }} />
                  </span>
                  <span className="text-[10px] uppercase font-mono tracking-widest font-bold text-sky-500">
                    Inspecting Capsule Layer
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 leading-tight">
                  {selectedHotspot.title}
                </h3>
                
                <p className="text-xs text-sky-600 font-mono font-medium tracking-wide mt-1">
                  {selectedHotspot.subtitle}
                </p>

                <p className="text-slate-500 text-xs sm:text-sm mt-4 leading-relaxed font-light">
                  {selectedHotspot.description}
                </p>

                {/* Specific details metrics line */}
                <div className="mt-6 pt-5 border-t border-slate-100 flex justify-between items-center bg-slate-50/50 -mx-6 -mb-6 p-6 rounded-b-3xl">
                  <div>
                    <span className="block text-[8px] uppercase tracking-wider font-bold text-slate-400">Layer Specification</span>
                    <span className="block text-xs font-mono font-bold text-slate-700 mt-0.5">{selectedHotspot.specification}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] font-semibold px-2.5 py-1 rounded-lg">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Passed Lab Cert
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick specifications accordion or summary list */}
            <div className="bg-white border border-slate-150 rounded-3xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-755 uppercase tracking-widest border-l-2 border-sky-400 pl-2">
                Operational Certification
              </h4>
              <ul className="text-xs text-slate-500 space-y-2 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-0.5">•</span>
                  <span><strong>CE & ROHS V2 Compliant</strong>: Produced with entirely lead-free solder plates.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-0.5">•</span>
                  <span><strong>Thermal Shutdown Safeguard</strong>: Limits continuously prolonged draws beyond 10 seconds.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-500 mt-0.5">•</span>
                  <span><strong>Air-Aromatics Tuned</strong>: Acoustically dampened chambers emit completely silent inhalation draws.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

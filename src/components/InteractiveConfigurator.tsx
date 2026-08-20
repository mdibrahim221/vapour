import { useState, useId } from 'react';
import { motion } from 'motion/react';
import { Sliders, Sparkles, Plus, Check, LayoutGrid, Award, Info } from 'lucide-react';
import { Product, VapeConfig } from '../types';
import { heroVapeDevice } from '../data';

interface InteractiveConfiguratorProps {
  onAddCustomToCart: (
    product: Product,
    config: VapeConfig,
    price: number
  ) => void;
}

export default function InteractiveConfigurator({
  onAddCustomToCart
}: InteractiveConfiguratorProps) {
  const [color, setColor] = useState('#38bdf8'); // Sky Blue
  const [throatHit, setThroatHit] = useState<'Smooth' | 'Balanced' | 'Intense'>('Balanced');
  const [podCapacity, setPodCapacity] = useState<'2.0ml' | '4.5ml' | '6.0ml'>('4.5ml');
  const [engraving, setEngraving] = useState('');
  const [isConfigAdded, setIsConfigAdded] = useState(false);
  const engravingInputId = useId();

  // Create a pseudo-product for the customized configuration
  const customBaseProduct: Product = {
    id: 'aero-custom',
    name: 'Aero Bespoke Customized',
    subtitle: 'Personally Customized Pen',
    price: 39.99,
    rating: 5.0,
    image: heroVapeDevice,
    description: `Bespoke high-performance vaporizer personalized with tailored airflow, customized volume, and unique custom shell engravings. Designed for true connoisseurs.`,
    colors: [{ name: 'Bespoke', hex: color }],
    features: ['Custom Anodizing', 'Bespoke Engraving', 'Tailored resistance grid'],
    battery: '850 mAh Fast-Charge Pack',
    capacity: podCapacity,
    resistance: throatHit === 'Smooth' ? '1.4 ohm' : throatHit === 'Balanced' ? '1.2 ohm' : '0.8 ohm',
    puffCount: podCapacity === '2.0ml' ? 'Approx. 2500' : podCapacity === '4.5ml' ? 'Approx. 5000' : 'Approx. 7500'
  };

  const handleApplyConfig = () => {
    // Collect the current state configuration
    const activeConfig: VapeConfig = {
      color,
      throatHit,
      podCapacity,
      engraving: engraving.trim() || 'AERO DESIGN'
    };

    // Calculate premium price surcharge
    let price = 39.99;
    if (podCapacity === '6.0ml') price += 4.99;
    if (throatHit === 'Intense') price += 2.0;

    onAddCustomToCart(customBaseProduct, activeConfig, price);
    setIsConfigAdded(true);

    setTimeout(() => {
      setIsConfigAdded(false);
    }, 2800);
  };

  const colorsList = [
    { name: 'Sky Blue', hex: '#38bdf8' },
    { name: 'Pearlescent Frost', hex: '#f8fafc' },
    { name: 'Satin Slate', hex: '#64748b' },
    { name: 'Aurora Mint', hex: '#a7f3d0' },
    { name: 'Cosmic Gold', hex: '#fde047' }
  ];

  return (
    <section className="py-24 bg-slate-50 relative" id="configurator">
      
      {/* Absolute layout decorative spots */}
      <div className="absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-105/10 blur-[130px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-sky-500 uppercase flex items-center justify-center gap-1.5">
            <Sliders className="w-4 h-4 text-sky-500" />
            BESPOKE WORKSHOP
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 mt-3 tracking-tight">
            The Aero Bespoke Lab
          </h2>
          <p className="text-slate-550 text-sm sm:text-base font-light mt-3">
            Build your personal masterpiece. Customize shell finishes, tune aerodynamic airflow resistance, resize your fluid reservoirs, and engrave your device to own your experience.
          </p>
        </div>

        {/* Configuration interactive layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" id="configurator-container">
          
          {/* Left block: Realtime Interactive Blueprint Render of custom pen */}
          <div className="col-span-1 lg:col-span-6 flex flex-col justify-between bg-white border border-slate-150 p-6 sm:p-10 rounded-3xl shadow-md h-[480px] sm:h-[550px]" id="configurator-preview">
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-sky-100 text-sky-800 font-mono text-[9px] font-bold rounded-lg uppercase tracking-wider mb-4">
                Real-Time Blueprint Simulation
              </span>
              <h3 className="font-display font-extrabold text-slate-800 text-base sm:text-lg">
                Personalized {colorsList.find((c) => c.hex === color)?.name || 'Bespoke'} Vaporizer
              </h3>
            </div>

            {/* Visual device with customized colors and dynamic laser engravings */}
            <div className="relative flex-1 flex items-center justify-center py-6">
              
              {/* Radial gradient background based on selected finish */}
              <div 
                className="absolute inset-[20%] rounded-full blur-[80px] opacity-15 transition-all duration-500"
                style={{ backgroundColor: color }}
              />

              {/* Futuristic Vector Device Blueprint rendering using inline elements */}
              <div className="relative w-28 sm:w-32 h-[320px] sm:h-[350px] flex flex-col items-center select-none">
                
                {/* Clear Quartz mouth-tip pod */}
                <div className="w-8 h-10 bg-slate-200/50 border border-slate-350 rounded-t-xl flex items-center justify-center shadow-inner relative z-20">
                  <div className="w-2.5 h-full bg-slate-400/35 rounded-t-lg" />
                  {/* Dynamic capacity indicators */}
                  <span className="absolute bottom-1 right-1 px-1 py-[1px] bg-slate-100/95 border border-slate-200 rounded text-[7px] font-mono font-bold leading-none text-slate-450 uppercase scale-90">
                    {podCapacity}
                  </span>
                </div>

                {/* Magnetic Gold ring accent */}
                <div className="w-9 h-1.5 bg-yellow-405 border-y border-slate-350 relative z-25" />

                {/* Customized Anodized Pen Body with Real-time selected skin color */}
                <div 
                  className="w-12 flex-1 rounded-b-2xl border-x-2 border-b-2 border-slate-800 flex flex-col items-center justify-between py-6 px-1.5 shadow-lg relative overflow-hidden transition-all duration-500 z-10"
                  style={{ backgroundColor: color }}
                >
                  {/* Metal specular gloss overlay lines */}
                  <div className="absolute inset-y-0 left-0 w-2.5 bg-white/20" />
                  <div className="absolute inset-y-0 right-0 w-1.5 bg-black/10" />

                  {/* Flow intake indicator lights */}
                  <div className="w-1 h-3 rounded-full bg-white/90 shadow-sm animate-pulse" />

                  {/* CUSTOM REALTIME LASER ENGRAVING DISPLAY */}
                  <div className="w-5 flex-1 flex items-center justify-center relative my-4">
                    <div className="rotate-90 origin-center whitespace-nowrap">
                      <span className="font-mono text-[9px] uppercase tracking-widest font-black text-slate-900 mix-blend-difference drop-shadow-sm leading-none opacity-80">
                        {engraving.trim() ? engraving.substring(0, 12) : 'AERO DESIGN'}
                      </span>
                    </div>
                  </div>

                  {/* Draw airflow status LED ring (Linked to color brightness) */}
                  <div className="flex items-center gap-1 bg-black/45 border border-white/20 px-2 py-0.5 rounded-full text-[7px] font-mono font-bold text-white uppercase tracking-wider relative z-15">
                    <span className="w-1 h-1 rounded-full bg-sky-400 animate-ping" />
                    {throatHit} DR
                  </div>
                </div>

                {/* USB-C fast charge tail plate */}
                <div className="w-7 h-1 bg-slate-300 border-x border-b border-slate-500/80 rounded-b-lg relative z-5" />
              </div>

            </div>

            {/* Config summary tags */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-100">
              <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg uppercase">
                Airflow: {throatHit} Flow
              </span>
              <span className="text-[9px] font-mono font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg uppercase">
                Volume: {podCapacity} Pod
              </span>
              <span className="text-[9px] font-mono font-bold text-slate-550 bg-sky-50 text-sky-800 border border-sky-100 px-2.5 py-1 rounded-lg uppercase font-bold">
                Milled Engraving
              </span>
            </div>
          </div>

          {/* Right block: Configuration controls and inputs */}
          <div className="col-span-1 lg:col-span-6 space-y-6">
            
            {/* 1. SELECT FINISH COLOR */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider font-extrabold text-slate-500 mb-2 pl-1">
                1. Select Anodized Shell Coating Finish
              </span>
              <div className="grid grid-cols-5 gap-2.5">
                {colorsList.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.hex)}
                    className={`h-11 rounded-xl border border-slate-150 flex flex-col items-center justify-center transition-all ${
                      color === c.hex
                        ? 'bg-slate-900 border-slate-900 text-white scale-[1.03] shadow-md shadow-slate-200'
                        : 'bg-white hover:bg-slate-50'
                    }`}
                    title={c.name}
                    id={`custom-color-${c.name}`}
                  >
                    <span 
                      className={`w-4 h-4 rounded-full border border-black/10 transition-transform ${
                        color === c.hex ? 'scale-110' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <span className="text-[7px] uppercase font-mono font-semibold tracking-tight mt-1 truncate max-w-[65px]">
                      {c.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. CHOOSE THROAT HIT AIRFLOW */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-2.5 pl-1">
                2. Choose Airflow Draw Resistance Level
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'Smooth', title: 'Mouth to Lung (1.4 Ω)', sub: 'Tight quiet draw' },
                  { id: 'Balanced', title: 'Adaptive (1.2 Ω)', sub: 'Rich balanced aroma' },
                  { id: 'Intense', title: 'Direct Lung (0.8 Ω)', sub: 'Huge cold clouds' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setThroatHit(item.id as 'Smooth' | 'Balanced' | 'Intense')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      throatHit === item.id
                        ? 'bg-sky-50 border-sky-400 text-sky-850'
                        : 'bg-white border-slate-150 hover:bg-slate-50'
                    }`}
                    id={`config-flow-${item.id}`}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-wider">{item.id}</span>
                    <span className="block text-[9px] text-slate-505 font-mono mt-1 leading-tight">{item.title}</span>
                    <span className="block text-[8px] text-slate-400 font-light mt-0.5 leading-none">{item.sub}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. RESIZE POD CAPSULE */}
            <div>
              <span className="block text-[11px] uppercase tracking-wider font-extrabold text-slate-400 mb-2.5 pl-1">
                3. Choose Liquid Pod Capsule Volume Size
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: '2.0ml', tag: 'Aero Slim-Fit', plusPrice: '$0.00' },
                  { size: '4.5ml', tag: 'Standard Day', plusPrice: '$0.00' },
                  { size: '6.0ml', tag: 'High-Capacity', plusPrice: '+$4.99' }
                ].map((pod) => (
                  <button
                    key={pod.size}
                    onClick={() => setPodCapacity(pod.size as '2.0ml' | '4.5ml' | '6.0ml')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      podCapacity === pod.size
                        ? 'bg-sky-50 border-sky-400 text-sky-800'
                        : 'bg-white border-slate-150 hover:bg-slate-50'
                    }`}
                    id={`config-pod-${pod.size}`}
                  >
                    <span className="block text-[10px] font-mono font-bold">{pod.size}</span>
                    <span className="block text-[8px] text-slate-400 uppercase mt-1 leading-tight">{pod.tag}</span>
                    <span className="block text-[9px] font-mono font-bold text-sky-600 mt-1">{pod.plusPrice}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. DRIP LASER ENGRAVING */}
            <div>
              <div className="flex justify-between items-center mb-1.5 pl-1">
                <label htmlFor={engravingInputId} className="block text-[11px] uppercase tracking-wider font-extrabold text-slate-500">
                  4. Customize Premium Laser Engraving
                </label>
                <span className="text-[10px] font-mono text-slate-400">{engraving.length}/12 Chars</span>
              </div>
              <div className="relative">
                <input
                  id={engravingInputId}
                  type="text"
                  maxLength={12}
                  placeholder="e.g., AERO-X"
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  className="w-full text-xs font-mono px-4 py-3 bg-white border border-slate-150 rounded-xl focus:outline-hidden focus:border-sky-500 transition-all font-bold tracking-widest uppercase text-slate-800"
                />
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5 bg-slate-50 border border-slate-100 rounded-md px-2 py-1 text-[8px] font-mono text-slate-400 font-semibold uppercase leading-none">
                  <Sparkles className="w-3 h-3 text-sky-500 animate-pulse" /> Precision fiber laser
                </div>
              </div>
            </div>

            {/* Build summary list information */}
            <div className="p-4 bg-sky-50/50 border border-sky-100/50 rounded-2xl flex items-start gap-2.5 text-xs text-sky-800">
              <Info className="w-4 h-4 text-sky-510 mt-0.5" />
              <div>
                <p className="font-semibold">Bespoke Workshop Build Guarantee</p>
                <p className="text-slate-500 text-[10px] leading-relaxed mt-0.5">
                  Bespoke orders are meticulously assembled and certified in our dust-free clean room environment. Fully warrantied for 12 calendar months from the dispatch timestamp.
                </p>
              </div>
            </div>

            {/* Action purchase */}
            <div className="pt-2">
              <button
                onClick={handleApplyConfig}
                disabled={isConfigAdded}
                className={`w-full py-4 rounded-xl text-xs uppercase font-bold tracking-widest flex items-center justify-center gap-2 shadow-md transition-all duration-300 ${
                  isConfigAdded
                    ? 'bg-emerald-500 text-white cursor-default'
                    : 'bg-slate-900 border border-transparent hover:bg-sky-500 hover:shadow-sky-100 hover:scale-[1.01] text-white'
                }`}
                id="add-custom-config-btn"
              >
                {isConfigAdded ? (
                  <>
                    <Check className="w-4 h-4 text-white font-extrabold" />
                    Assembled Order Added to Basket!
                  </>
                ) : (
                  <>
                    Add Bespoke Selection - ${(39.99 + (podCapacity === '6.0ml' ? 4.99 : 0) + (throatHit === 'Intense' ? 2.0 : 0)).toFixed(2)}
                    <Plus className="w-4 h-4 text-slate-350" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

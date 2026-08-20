import { useId, useState, useEffect, useRef } from 'react';
import { Compass, Sparkles, AlertCircle, Play, Pause } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';

interface HeroProps {
  onScrollDown: () => void;
}

export default function Hero({ onScrollDown }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const titleId = useId();

  // Premium smoke/cloud loop that blends beautifully with the sky-blue overlays
  const videoSourceUrl = "https://assets.mixkit.co/videos/preview/mixkit-white-smoke-swirling-gently-44028-large.mp4";

  // Dynamic Scroll Parallax & Zoom effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.25]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const videoOpacity = useTransform(scrollYProgress, [0, 0.8], [0.8, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  // Pause video automatically when out of viewport for optimized performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (isPlaying) videoRef.current?.play().catch(() => {});
        } else {
          videoRef.current?.pause();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isPlaying]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-slate-50 overflow-hidden pt-20"
      id="hero"
    >
      {/* Dynamic Sky-Blue Background Blends */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-sky-200/40 blur-[130px]" />
        <div className="absolute bottom-20 right-1/4 w-[600px] h-[600px] rounded-full bg-blue-105/20 blur-[150px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white opacity-40 blur-[120px]" />
      </div>

      {/* Hero Video Component with custom Blend Mode */}
      <motion.div 
        style={{ scale: videoScale, y: videoY, opacity: videoOpacity }}
        className="absolute inset-0 w-full h-full z-10 overflow-hidden pointer-events-none select-none"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/10 via-sky-100/10 to-slate-50 z-20" />
        
        {/* Soft color tint over video overlay */}
        <div className="absolute inset-0 bg-sky-300/10 mix-blend-color z-15" />
        
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover select-none"
            onError={() => setVideoError(true)}
            id="hero-background-video"
          >
            <source src={videoSourceUrl} type="video/mp4" />
          </video>
        ) : (
          /* Smooth CSS Fluid Animated Gradient in case of offline/network block on video preview */
          <div className="w-full h-full bg-radial from-sky-100 via-slate-50 to-white animate-pulse" />
        )}
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-25 text-center mt-6"
      >
        <div className="flex flex-col items-center">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-flex items-center gap-1.5 bg-white/70 backdrop-blur-md border border-sky-150/80 px-4 py-1.5 rounded-full shadow-xs mb-6 sm:mb-8 hover:border-sky-30d/60 transition-all cursor-crosshair"
            id="hero-badge"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-slate-800 uppercase flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-spin" style={{ animationDuration: '6s' }} />
              AEROSENSORY COMPOSITION V2
            </span>
          </motion.div>

          {/* Requested Highlight Text */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.08] max-w-4xl pt-1"
            id={titleId}
          >
            Experience the <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-600 to-sky-400">
              Future of Vaping
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="text-slate-500 text-sm sm:text-base md:text-lg max-w-2xl mt-6 font-sans font-light leading-relaxed px-4"
            id="hero-subtitle"
          >
            A high-performance aerodynamic pod atomizer. Sculpted with pure sky-blue alloy, designed for absolute micro-heat precision, and engineered for those who demand organic purity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
            id="hero-actions"
          >
            <button
              onClick={onScrollDown}
              className="w-full sm:w-auto bg-slate-900 hover:bg-sky-500 text-white px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold transition-all duration-300 shadow-md hover:shadow-sky-100 flex items-center justify-center gap-2 group"
            >
              Discover the Showroom
              <Compass className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:rotate-45 transition-transform" />
            </button>
            
            <a
              href="#tech"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('tech')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider font-bold text-slate-705 border border-slate-205 bg-white/50 hover:bg-white hover:border-slate-800 hover:text-slate-900 shadow-xs flex items-center justify-center transition-all duration-300"
            >
              Explore Exploded Spec
            </a>
          </motion.div>

          {/* Quick specs footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 sm:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 w-full max-w-5xl border-t border-slate-150 pt-8 px-4"
            id="hero-specs-grid"
          >
            <div className="text-left">
              <span className="block text-[10px] font-mono tracking-widest text-sky-500 uppercase font-bold">Aerodynamics</span>
              <span className="block text-sm sm:text-base font-display font-bold text-slate-800 mt-1">Dual-Pneumic Draw</span>
            </div>
            <div className="text-left border-l border-slate-150 pl-4 sm:pl-8">
              <span className="block text-[10px] font-mono tracking-widest text-sky-500 uppercase font-bold">Purity</span>
              <span className="block text-sm sm:text-base font-display font-bold text-slate-800 mt-1">Organic Japanese Cotton</span>
            </div>
            <div className="text-left border-l border-slate-150 pl-4 sm:pl-8">
              <span className="block text-[10px] font-mono tracking-widest text-sky-500 uppercase font-bold">Capacity</span>
              <span className="block text-sm sm:text-base font-display font-bold text-slate-800 mt-1">Up to 5,000 Puffs</span>
            </div>
            <div className="text-left border-l border-slate-150 pl-4 sm:pl-8">
              <span className="block text-[10px] font-mono tracking-widest text-sky-500 uppercase font-bold">Craft</span>
              <span className="block text-sm sm:text-base font-display font-bold text-slate-800 mt-1">Anodized Silica-Blue</span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Float down arrow */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-25 hidden sm:block">
        <motion.button
          onClick={onScrollDown}
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="p-2 rounded-full border border-sky-200 bg-white/60 text-sky-600 hover:text-sky-800 hover:bg-white transition-all shadow-xs"
          aria-label="Scroll down"
          id="scroll-indicator-arrow"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.button>
      </div>
    </section>
  );
}

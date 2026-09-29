import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { MagneticButton } from '../MagneticButton';
import { CinematicHeroVideo } from '../CinematicHeroVideo';
import { HeroVideoSequence, HERO_VIDEOS } from '../../data/heroVideos';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onDiscoverBrand: () => void;
  isReady?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onDiscoverBrand,
  isReady = true
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [activeSequence, setActiveSequence] = useState<HeroVideoSequence>(HERO_VIDEOS[0]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offsets: Vertical and horizontal displacement to build genuine depth
  const videoY = scrollY * 0.35;
  const videoScale = 1 + Math.min(scrollY * 0.0003, 0.05);
  const titleY = scrollY * -0.14;
  const titleX = Math.max(scrollY * -0.06, -30); // Subtle horizontal drift
  const textY = scrollY * 0.1;

  // Dynamic composition balance based on active model position (Section 17)
  const isModelRight = activeSequence.modelAlignment === 'right';
  const isModelLeft = activeSequence.modelAlignment === 'left';

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100svh] md:min-h-screen w-full flex flex-col justify-between bg-[#0B0B0A] text-[#F3F0E9] overflow-hidden pt-24 pb-12 px-6 md:px-12 select-none"
    >
      {/* Background Fashion Film Video with Parallax & Clipping Mask Reveal */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="relative w-full h-[125%] -top-[12%]"
          style={{ y: videoY, scale: videoScale }}
        >
          {/* Vertical mask reveal: Emerging smoothly from darkness (Section 7) */}
          <motion.div
            className="w-full h-full"
            initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={
              isReady
                ? { clipPath: 'inset(0% 0% 0% 0%)' }
                : { clipPath: 'inset(100% 0% 0% 0%)' }
            }
            transition={{
              duration: 1.4,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            <CinematicHeroVideo
              isReady={isReady}
              onActiveSequenceChange={(seq) => setActiveSequence(seq)}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Top Editorial Kicker */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto w-full flex items-center justify-between text-xs tracking-[0.25em] text-[#C9BDAA] uppercase border-b border-[#252422]/50 pb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
      >
        <span>COLLECTION 01 / 2026</span>
        <span className="hidden md:inline text-[10px] tracking-[0.3em] text-[#77736D]">FORM FOLLOWS MOVEMENT</span>
        <span>ATELIER JOHANNESBURG</span>
      </motion.div>

      {/* Centerpiece Typography with Independent Motion & Consistent Editorial Posture */}
      <div
        className="relative z-20 max-w-7xl mx-auto w-full my-auto py-8 md:py-12 flex flex-col justify-center items-start text-left"
        style={{
          transform: `translate3d(${titleX}px, ${titleY}px, 0)`
        }}
      >
        {/* Subtle Kicker Label */}
        <motion.span
          className="text-xs md:text-sm font-sans tracking-[0.4em] text-[#C9BDAA] uppercase mb-4 block"
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          CONTEMPORARY LUXURY LABEL
        </motion.span>

        {/* Step 2: ÉLANE Wordmark */}
        <motion.h1
          className="font-serif text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.14em] font-light uppercase text-[#F3F0E9] leading-none mb-6"
          initial={{ opacity: 0, y: 35 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
          transition={{ duration: 1.0, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          ÉLANE
        </motion.h1>

        {/* Step 3: Staggered Line Reveal: WEAR THE MOVEMENT. */}
        <div className="overflow-hidden mb-6">
          <motion.h2
            className="font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide font-normal text-[#F3F0E9] leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            WEAR THE MOVEMENT.
          </motion.h2>
        </div>

        {/* Step 4: Supporting Copy */}
        <motion.p
          className="font-sans text-sm md:text-base text-[#C9BDAA] max-w-lg leading-relaxed font-light mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          Contemporary clothing designed around movement, form and individuality. Architecture tailored for the human body in transit.
        </motion.p>

        {/* Step 5: Magnetic CTAs */}
        <motion.div
          className="flex flex-wrap items-center gap-4 sm:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.95, ease: 'easeOut' }}
        >
          <MagneticButton
            onClick={onExploreCollection}
            strength={8}
            dataCursor="SHOP"
            className="group px-8 py-4 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center gap-2 shadow-xl shadow-black/40"
          >
            <span>EXPLORE COLLECTION</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 duration-300" />
          </MagneticButton>

          <MagneticButton
            onClick={onDiscoverBrand}
            strength={6}
            dataCursor="VIEW"
            className="group px-8 py-4 border border-[#F3F0E9]/30 hover:border-[#F3F0E9] text-[#F3F0E9] text-xs font-sans tracking-[0.25em] uppercase transition-all duration-300 flex items-center gap-2 bg-black/20 backdrop-blur-sm"
          >
            <span>DISCOVER ÉLANE</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1 duration-300" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Metainfo / Scroll Indicator */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto w-full flex items-end justify-between pt-6 border-t border-[#252422]/50 text-xs text-[#77736D]"
        style={{ transform: `translateY(${textY}px)` }}
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 1.1 }}
      >
        <div className="flex items-center gap-2 text-[#C9BDAA]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A66A45]" />
          <span className="tracking-widest uppercase">COLLECTION 01 IN STOCK</span>
        </div>

        <button
          onClick={onDiscoverBrand}
          className="hidden sm:flex items-center gap-2 tracking-[0.25em] text-[#77736D] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
        >
          <span>SCROLL TO EXPLORE</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </button>
      </motion.div>

      {/* Right Side Vertical Scroll Indicator (Section 20) */}
      <div className="hidden lg:flex absolute right-8 bottom-10 z-20 flex-col items-center gap-3 text-[10px] font-sans tracking-[0.3em] uppercase text-[#77736D] select-none pointer-events-none">
        <span style={{ writingMode: 'vertical-rl' }}>SCROLL</span>
        <div className="scroll-pulse-line" />
      </div>
    </section>
  );
};

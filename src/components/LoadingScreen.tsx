import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { heroImg } from '../data/products';
import { HERO_VIDEOS } from '../data/heroVideos';

interface LoadingScreenProps {
  onComplete: () => void;
}

const ROTATING_TEXTS = [
  'FORM / MOVEMENT',
  'TEXTURE / STRUCTURE',
  'DESIGN / INDIVIDUALITY',
  'ÉLANE / 2026'
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isAssetsReady, setIsAssetsReady] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExited, setIsExited] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotionQuery.matches) {
      setIsReducedMotion(true);
      setProgress(100);
      const timer = setTimeout(() => {
        setIsExited(true);
        onComplete();
      }, 350);
      return () => clearTimeout(timer);
    }

    // 2. Preload critical hero visual assets
    const img = new Image();
    img.src = HERO_VIDEOS[0]?.poster || heroImg;
    const handleLoaded = () => {
      setIsAssetsReady(true);
    };

    if (img.complete) {
      handleLoaded();
    } else {
      img.onload = handleLoaded;
      img.onerror = handleLoaded; // graceful fallback
    }

    // Fallback maximum duration (2.2s max) to guarantee the visitor never waits unnecessarily
    const fallbackTimer = setTimeout(() => {
      setIsAssetsReady(true);
    }, 2000);

    // 3. Rotating micro-typography interval
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length);
    }, 450);

    // 4. Smooth cinematic progress animation
    const targetDuration = 1400; // ~1.4 seconds for title sequence

    const tick = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawProgress = Math.min((elapsed / targetDuration) * 100, 100);

      setProgress(rawProgress);

      if (rawProgress < 100) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        // Assets check and curtain mask transition
        const finishTransition = () => {
          setIsTransitioning(true);
          setTimeout(() => {
            setIsExited(true);
            onComplete();
          }, 950); // Matches the curtain mask reveal duration
        };

        // If assets already marked ready, trigger transition directly
        finishTransition();
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearInterval(textInterval);
      clearTimeout(fallbackTimer);
    };
  }, [onComplete]);

  if (isExited) return null;

  // Format percentage number with leading zero e.g. "01", "27", "54", "78", "100"
  const formattedPercent = Math.round(progress).toString().padStart(2, '0');

  // Simple reduced-motion fade
  if (isReducedMotion) {
    return (
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-[#0B0B0A] text-[#F3F0E9] transition-opacity duration-300">
        <h1 className="font-serif text-4xl uppercase tracking-[0.2em] font-light">
          ÉLANE
        </h1>
      </div>
    );
  }

  return (
    <AnimatePresence>
      {!isExited && (
        <motion.div
          className="fixed inset-0 z-100 flex flex-col justify-between overflow-hidden select-none pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{
            opacity: isTransitioning ? 0 : 1,
          }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Masking Reveal Curtains: Emerges from darkness to reveal hero image behind */}
          <motion.div
            className="absolute inset-0 bg-[#0B0B0A] z-0"
            initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
            animate={{
              clipPath: isTransitioning
                ? 'inset(0% 0% 100% 0%)' // vertical masking reveal upward
                : 'inset(0% 0% 0% 0%)'
            }}
            transition={{
              duration: 0.9,
              ease: [0.65, 0.05, 0.36, 1] // Luxury high-contrast bezier
            }}
          />

          {/* Top Padding / Metamark */}
          <div className="relative z-10 p-8 md:p-12 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-[#77736D] uppercase">
            <span>ÉLANE ARCHIVE</span>
            <span>EDITION 01</span>
          </div>

          {/* Central Stage: Logo, Subtitle, Progress Line, Rotating Placeholders */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center px-6"
            animate={{
              y: isTransitioning ? -40 : 0,
              opacity: isTransitioning ? 0 : 1
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* ÉLANE Brand Logo with Letter Spacing Expansion */}
            <motion.h1
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase text-[#F3F0E9] leading-none text-center"
              initial={{ opacity: 0, scale: 0.96, letterSpacing: '0.08em' }}
              animate={{
                opacity: 1,
                scale: 1,
                letterSpacing: '0.24em'
              }}
              transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              ÉLANE
            </motion.h1>

            {/* Subtitle Soft Reveal */}
            <motion.p
              className="mt-4 text-[10px] sm:text-xs font-sans tracking-[0.35em] text-[#77736D] uppercase text-center"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
            >
              CONTEMPORARY FORM / 2026
            </motion.p>

            {/* Thin Horizontal Loading Line (0% to 100%) */}
            <div className="mt-12 sm:mt-16 w-56 sm:w-72 flex flex-col items-center">
              <div className="relative w-full h-[1px] bg-[#252422] overflow-hidden">
                <motion.div
                  className="absolute top-0 left-0 bottom-0 bg-[#F3F0E9]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>

              {/* Progress Figures & Rotating Placeholders (FORM/MOVEMENT, etc.) */}
              <div className="w-full mt-3.5 flex items-center justify-between text-[11px] font-mono text-[#77736D] tabular-nums">
                <span className="tracking-widest text-[#C9BDAA]">
                  {formattedPercent}
                </span>

                <div className="h-4 overflow-hidden relative text-right">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={ROTATING_TEXTS[textIndex]}
                      className="block tracking-[0.25em] text-[10px] font-sans text-[#77736D] uppercase"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {ROTATING_TEXTS[textIndex]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Footnote / Quick Enter Prompt */}
          <div className="relative z-10 p-8 md:p-12 flex justify-between items-center text-[10px] font-mono tracking-[0.3em] text-[#77736D] uppercase">
            <span>JOHANNESBURG / ATELIER</span>
            <button
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setIsExited(true);
                  onComplete();
                }, 300);
              }}
              className="pointer-events-auto text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
            >
              SKIP INTRO →
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

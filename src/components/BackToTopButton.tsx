import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface BackToTopButtonProps {
  threshold?: number;
  className?: string;
}

export const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  threshold = 450,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate dynamic threshold based on hero height or fixed fallback
      const heroHeight = window.innerHeight * 0.75;
      const effectiveThreshold = Math.max(threshold, heroHeight);
      setIsVisible(window.scrollY > effectiveThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts?: { duration?: number }) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 15, scale: 0.9 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 group flex items-center gap-2.5 px-3.5 py-3 md:px-4 md:py-3.5 bg-[#121210]/90 hover:bg-[#F3F0E9] backdrop-blur-md border border-[#252422] hover:border-[#C9BDAA] text-[#C9BDAA] hover:text-[#0B0B0A] shadow-2xl shadow-black/80 transition-all duration-300 cursor-pointer select-none ${className}`}
          aria-label="Back to top"
          title="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase font-medium">
            TOP
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

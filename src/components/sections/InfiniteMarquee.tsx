import React, { useRef, useEffect, useState } from 'react';

const MARQUEE_WORDS = [
  'FORM',
  'MOVEMENT',
  'INDIVIDUALITY',
  'STRUCTURE',
  'TEXTURE',
  'SIMPLICITY',
  'ÉLANE',
  'ELEGANCE'
];

export const InfiniteMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const singleSetRef = useRef<HTMLDivElement>(null);

  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    if (isReducedMotion) return;

    let animationFrameId: number;
    let lastTimestamp = performance.now();
    let currentOffset = 0;

    // Fast, continuous, fluid speed in pixels per second (~65px/s)
    // Never stops even when cursor is on it
    const BASE_SPEED = 65;
    let currentSpeed = BASE_SPEED;
    let targetSpeed = BASE_SPEED;

    // Scroll acceleration tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY);
      scrollVelocity = Math.min(delta * 1.8, 60); // dynamic scroll boost
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    const animate = (timestamp: number) => {
      const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      // Speed remains continuous and never stops or slows down on hover
      targetSpeed = BASE_SPEED + scrollVelocity;

      // Gradually decay scroll velocity boost back to 0
      scrollVelocity *= 0.92;
      if (scrollVelocity < 0.2) scrollVelocity = 0;

      // Smoothly interpolate current speed towards target speed
      currentSpeed += (targetSpeed - currentSpeed) * 0.08;

      // Measure the single set width for seamless wrap
      const singleSetWidth = singleSetRef.current ? singleSetRef.current.offsetWidth : 0;

      if (singleSetWidth > 0) {
        currentOffset += currentSpeed * deltaTime;
        if (currentOffset >= singleSetWidth) {
          currentOffset %= singleSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(-${currentOffset}px, 0, 0)`;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isReducedMotion]);

  // Reduced motion: static, centered, wrap-safe layout
  if (isReducedMotion) {
    return (
      <section
        className="w-full bg-[#0B0B0A] border-y border-[#252422] py-8 px-6 overflow-hidden select-none"
        aria-label="ÉLANE Brand Philosophy"
      >
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center">
          {MARQUEE_WORDS.map((word, i) => (
            <React.Fragment key={i}>
              <span className="font-serif text-2xl sm:text-3xl text-[#F3F0E9] tracking-[0.2em] uppercase font-light">
                {word}
              </span>
              {i < MARQUEE_WORDS.length - 1 && (
                <span className="text-[#C9BDAA] text-lg select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </section>
    );
  }

  // Render a repeatable block of the philosophy words with separators
  const renderWordSet = (setIndex: number, isReference = false) => (
    <div
      key={`set-${setIndex}`}
      ref={isReference ? singleSetRef : undefined}
      className="flex items-center shrink-0"
      aria-hidden={setIndex > 0 ? 'true' : undefined}
    >
      {MARQUEE_WORDS.map((word, wordIndex) => {
        const isBrand = word === 'ÉLANE';
        return (
          <div key={`word-${setIndex}-${wordIndex}`} className="flex items-center">
            {/* Word Item */}
            <span
              className={`font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] uppercase tracking-[0.22em] font-light transition-all duration-500 whitespace-nowrap cursor-default px-2 sm:px-4 ${
                isBrand
                  ? 'text-[#F3F0E9] hover:text-[#C9BDAA]'
                  : 'text-[#F3F0E9]/70 hover:text-[#F3F0E9]'
              }`}
            >
              {word}
            </span>

            {/* Subtle Separator */}
            <span
              className="text-[#C9BDAA]/60 text-sm sm:text-base md:text-lg select-none px-4 sm:px-6 md:px-8 font-serif"
              aria-hidden="true"
            >
              ·
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full h-24 sm:h-28 md:h-32 bg-[#0B0B0A] border-y border-[#252422]/80 flex items-center overflow-hidden select-none"
      aria-label="ÉLANE Brand Philosophy Marquee"
    >
      {/* Edge Fade Gradients (Left & Right masks for seamless disappearance) */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 z-10 bg-gradient-to-r from-[#0B0B0A] via-[#0B0B0A]/85 to-transparent pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 md:w-40 z-10 bg-gradient-to-l from-[#0B0B0A] via-[#0B0B0A]/85 to-transparent pointer-events-none" />

      {/* Moving Track */}
      <div
        ref={trackRef}
        className="flex items-center will-change-transform"
        style={{
          // Hardware accelerated smooth movement
          transform: 'translate3d(0, 0, 0)'
        }}
      >
        {/* Set 0 (used as reference for width) */}
        {renderWordSet(0, true)}
        {/* Sets 1, 2, 3 to ensure seamless coverage across all ultrawide / 4K monitors */}
        {renderWordSet(1)}
        {renderWordSet(2)}
        {renderWordSet(3)}
      </div>
    </section>
  );
};

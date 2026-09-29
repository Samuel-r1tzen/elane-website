import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_VIDEOS, HeroVideoSequence } from '../data/heroVideos';
import { heroImg } from '../data/products';

interface CinematicHeroVideoProps {
  isReady: boolean;
  onActiveSequenceChange?: (seq: HeroVideoSequence) => void;
  className?: string;
}

export const CinematicHeroVideo: React.FC<CinematicHeroVideoProps> = ({
  isReady,
  onActiveSequenceChange,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState<number | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // References for dual video buffers (A and B) to achieve seamless crossfade without hard cuts
  const videoPrimaryRef = useRef<HTMLVideoElement>(null);
  const videoSecondaryRef = useRef<HTMLVideoElement>(null);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activeSequence = HERO_VIDEOS[currentIndex];

  // Notify parent of sequence changes (for dynamic model/text balance)
  useEffect(() => {
    if (onActiveSequenceChange) {
      onActiveSequenceChange(activeSequence);
    }
  }, [currentIndex, onActiveSequenceChange, activeSequence]);

  // Reduced motion detection
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Crossfade to a specified sequence index
  const transitionToSequence = useCallback((targetIndex: number) => {
    if (isCrossfading || targetIndex === currentIndex) return;

    setNextIndex(targetIndex);
    setIsCrossfading(true);

    const nextVideo = videoSecondaryRef.current;
    if (nextVideo) {
      nextVideo.currentTime = 0;
      nextVideo.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    // Complete the crossfade after 1200ms
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current);
    transitionTimerRef.current = setTimeout(() => {
      setCurrentIndex(targetIndex);
      setNextIndex(null);
      setIsCrossfading(false);
    }, 1200);
  }, [isCrossfading, currentIndex]);

  // Auto-advance sequence when current video approaches end
  useEffect(() => {
    if (isReducedMotion) return;

    const primaryVideo = videoPrimaryRef.current;
    if (!primaryVideo) return;

    const handleTimeUpdate = () => {
      // Trigger smooth crossfade ~1.4 seconds before current clip ends
      if (primaryVideo.duration > 0 && primaryVideo.currentTime >= primaryVideo.duration - 1.4) {
        if (!isCrossfading && nextIndex === null) {
          const nextIdx = (currentIndex + 1) % HERO_VIDEOS.length;
          transitionToSequence(nextIdx);
        }
      }
    };

    primaryVideo.addEventListener('timeupdate', handleTimeUpdate);
    return () => {
      primaryVideo.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentIndex, isCrossfading, nextIndex, transitionToSequence, isReducedMotion]);

  // Handle manual next/prev
  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % HERO_VIDEOS.length;
    transitionToSequence(nextIdx);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + HERO_VIDEOS.length) % HERO_VIDEOS.length;
    transitionToSequence(prevIdx);
  };

  const nextSequence = nextIndex !== null ? HERO_VIDEOS[nextIndex] : null;

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#0B0B0A] ${className}`}>
      {/* Fallback Static Visual (Shown on network failure or initial mount) */}
      {hasVideoError ? (
        <img
          src={activeSequence.poster || heroImg}
          alt={activeSequence.title}
          className="w-full h-full object-cover filter grayscale contrast-110 brightness-90 transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            objectPosition: activeSequence.focalPosition,
            transform: `scale(${activeSequence.scale ?? 1})`,
            transformOrigin: 'center center'
          }}
        />
      ) : (
        <>
          {/* PRIMARY VIDEO LAYER */}
          <div
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isCrossfading ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <video
              ref={videoPrimaryRef}
              key={activeSequence.id}
              src={activeSequence.sources.hd}
              poster={activeSequence.poster}
              autoPlay
              muted
              loop={HERO_VIDEOS.length === 1}
              playsInline
              onError={() => setHasVideoError(true)}
              className="w-full h-full object-cover filter grayscale contrast-[1.10] brightness-[0.88] select-none pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                objectPosition: activeSequence.focalPosition,
                transform: `scale(${activeSequence.scale ?? 1})`,
                transformOrigin: 'center center'
              }}
            />
          </div>

          {/* SECONDARY VIDEO LAYER (Pre-buffers & crossfades in smoothly) */}
          {nextSequence && (
            <div
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCrossfading ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            >
              <video
                ref={videoSecondaryRef}
                key={nextSequence.id}
                src={nextSequence.sources.hd}
                poster={nextSequence.poster}
                muted
                playsInline
                className="w-full h-full object-cover filter grayscale contrast-[1.10] brightness-[0.88] select-none pointer-events-none transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  objectPosition: nextSequence.focalPosition,
                  transform: `scale(${nextSequence.scale ?? 1})`,
                  transformOrigin: 'center center'
                }}
              />
            </div>
          )}
        </>
      )}

      {/* Subtle 35mm Analog Film Grain Overlay (Section 18) */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px'
        }}
      />

      {/* Measured Obsidian Scrim Gradient: Clean model center, readable top & bottom (Section 8) */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-[#0B0B0A]/30 to-[#0B0B0A]/75 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0A]/60 via-transparent to-[#0B0B0A]/40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0A]/20 to-[#0B0B0A]/85 pointer-events-none" />

      {/* Discreet Film Chapter Indicator on lower-right edge */}
      <div className="absolute bottom-8 right-8 z-30 hidden sm:flex items-center gap-3 bg-[#0B0B0A]/70 backdrop-blur-md px-3.5 py-1.5 border border-[#252422] text-[10px] font-mono tracking-widest text-[#C9BDAA]">
        <button
          onClick={handlePrev}
          className="hover:text-[#F3F0E9] transition-colors cursor-pointer select-none"
          title="Previous fashion reel"
          aria-label="Previous fashion reel"
        >
          ←
        </button>

        <span className="tabular-nums">
          0{currentIndex + 1} <span className="text-[#77736D]">/ 0{HERO_VIDEOS.length}</span>
        </span>

        <span className="text-[#77736D] text-[9px] uppercase tracking-[0.2em] hidden md:inline">
          {activeSequence.title}
        </span>

        <button
          onClick={handleNext}
          className="hover:text-[#F3F0E9] transition-colors cursor-pointer select-none"
          title="Next fashion reel"
          aria-label="Next fashion reel"
        >
          →
        </button>
      </div>
    </div>
  );
};

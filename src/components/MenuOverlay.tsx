import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { PageView } from '../types';
import {
  heroImg,
  campaignImg,
  trenchCoatImg,
  plaidBlazerImg,
  laceBlouseImg,
  redTeeImg
} from '../data/products';
import { SOCIAL_CHANNELS } from './SocialIcons';
import { ShoppingCartInMotionIcon, LuxuryShoppingBagIcon } from './MotionIcons';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: PageView) => void;
  currentView: PageView;
  cartCount?: number;
  onOpenBag?: () => void;
}

interface NavItem {
  id: PageView;
  label: string;
  sub: string;
  image: string;
  video: string;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'shop',
    label: 'SHOP',
    sub: 'Collection 01 / Full Inventory',
    image: trenchCoatImg,
    video: 'https://videos.pexels.com/video-files/7148182/7148182-hd_1080_1920_30fps.mp4'
  },
  {
    id: 'collection',
    label: 'COLLECTION',
    sub: 'The Essentials & Form Study',
    image: heroImg,
    video: 'https://videos.pexels.com/video-files/7957041/7957041-hd_1080_1920_30fps.mp4'
  },
  {
    id: 'campaign',
    label: 'CAMPAIGN',
    sub: 'Motion / Winter 2026',
    image: campaignImg,
    video: 'https://videos.pexels.com/video-files/7957034/7957034-hd_1080_1920_30fps.mp4'
  },
  {
    id: 'journal',
    label: 'JOURNAL',
    sub: 'Editorial Essays & Perspective',
    image: laceBlouseImg,
    video: 'https://videos.pexels.com/video-files/11328619/11328619-hd_1080_1918_50fps.mp4'
  },
  {
    id: 'about',
    label: 'ABOUT',
    sub: 'Philosophy & Studio Craft',
    image: plaidBlazerImg,
    video: 'https://videos.pexels.com/video-files/8056093/8056093-hd_1080_1920_30fps.mp4'
  },
  {
    id: 'contact',
    label: 'CONTACT',
    sub: 'Atelier Inquiries & Stockists',
    image: redTeeImg,
    video: 'https://videos.pexels.com/video-files/7957041/7957041-hd_1080_1920_30fps.mp4'
  }
];

export const MenuOverlay: React.FC<MenuOverlayProps> = ({
  isOpen,
  onClose,
  onNavigate,
  currentView,
  cartCount = 0,
  onOpenBag
}) => {
  const [hoveredItem, setHoveredItem] = useState<NavItem>(NAV_ITEMS[0]);

  const handleSelect = (view: PageView) => {
    onNavigate(view);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          data-lenis-prevent
          className="fixed inset-0 z-80 bg-[#0B0B0A] text-[#F3F0E9] overflow-y-auto overscroll-y-contain touch-pan-y"
          style={{
            WebkitOverflowScrolling: 'touch',
            overscrollBehaviorY: 'contain'
          }}
          onTouchMove={(e) => e.stopPropagation()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Full-bleed Ambient Background with Video & Imagery playing when highlighted (Fixed in place) */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredItem.id}
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Fallback & Ambient Photography */}
                <img
                  src={hoveredItem.image}
                  alt={hoveredItem.label}
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[1.15] brightness-[0.6] scale-105"
                />

                {/* Looping Ambient Fashion Video */}
                {hoveredItem.video && (
                  <video
                    key={hoveredItem.video}
                    src={hoveredItem.video}
                    poster={hoveredItem.image}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-[1.12] brightness-[0.65] scale-105"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            {/* Dark Obsidian Scrim and Radial Vignette for High Contrast & Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0A]/95 via-[#0B0B0A]/85 to-[#0B0B0A]/80" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0A]/40 to-[#0B0B0A]/95" />
            <div className="absolute inset-0 bg-[#0B0B0A]/40" />

            {/* Subtle Film Grain Texture */}
            <div
              className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                backgroundSize: '160px 160px'
              }}
            />
          </div>

          {/* Scrollable Content Container */}
          <div className="relative z-10 min-h-full flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
            {/* Top Bar inside Menu */}
            <div className="shrink-0 flex items-center justify-between border-b border-[#252422] pb-5 sm:pb-6">
              <button
                onClick={() => handleSelect('home')}
                className="text-left group cursor-pointer"
              >
                <span className="font-serif text-2xl sm:text-3xl tracking-[0.25em] font-light uppercase text-[#F3F0E9] group-hover:text-[#C9BDAA] transition-colors">
                  ÉLANE
                </span>
                <span className="block text-[10px] tracking-[0.3em] text-[#77736D] uppercase mt-0.5">
                  WEAR THE MOVEMENT.
                </span>
              </button>

              <div className="flex items-center gap-3 sm:gap-4">
                {onOpenBag && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenBag();
                    }}
                    className="group flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-[#C9BDAA] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer py-1.5 px-3 border border-[#252422] hover:border-[#C9BDAA]/70"
                    aria-label={`Open shopping bag with ${cartCount} items`}
                  >
                    <LuxuryShoppingBagIcon className="w-3.5 h-3.5 text-[#C9BDAA] group-hover:scale-105 transition-transform" />
                    <span className="hidden xs:inline">BAG</span>
                    <span className="font-mono text-xs tabular-nums text-[#F3F0E9]">({cartCount})</span>
                  </button>
                )}

                <button
                  onClick={onClose}
                  className="group flex items-center gap-2 sm:gap-2.5 text-xs tracking-[0.25em] text-[#F3F0E9] hover:text-[#C9BDAA] uppercase transition-colors cursor-pointer py-1.5 px-2.5 sm:px-3"
                  aria-label="Close menu"
                >
                  <span>CLOSE</span>
                  <X className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                </button>
              </div>
            </div>

            {/* Menu Links with Staggered Rising Animation (Clean responsive layout that fits tablet & mobile) */}
            <div className="py-6 sm:py-8 md:py-10 my-4 sm:my-auto max-w-5xl w-full">
              <nav className="flex flex-col gap-2 sm:gap-3 md:gap-4.5 w-full">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = currentView === item.id;
                  const isHovered = hoveredItem.id === item.id;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.04 * index,
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      onMouseEnter={() => setHoveredItem(item)}
                      className="group"
                    >
                      <button
                        onClick={() => handleSelect(item.id)}
                        className="w-full text-left flex items-baseline justify-between py-1.5 sm:py-2 md:py-3 cursor-pointer group-hover:translate-x-2 sm:group-hover:translate-x-3 transition-transform duration-300"
                      >
                        <div className="flex items-baseline gap-3 sm:gap-6 md:gap-8">
                          <span className="font-mono text-xs sm:text-sm text-[#77736D] tracking-widest tabular-nums">
                            0{index + 1}
                          </span>
                          <div className="flex items-center gap-2.5 sm:gap-4">
                            <span
                              className={`font-serif text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl tracking-wide uppercase transition-colors duration-200 ${
                                isHovered
                                  ? 'text-[#F3F0E9] font-normal italic'
                                  : isActive
                                  ? 'text-[#C9BDAA]'
                                  : 'text-[#77736D] hover:text-[#F3F0E9]'
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.id === 'shop' && (
                              <ShoppingCartInMotionIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#C9BDAA] group-hover:text-[#F3F0E9] transition-transform duration-300 group-hover:translate-x-1" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="hidden sm:inline-block text-xs font-sans tracking-[0.2em] text-[#C9BDAA]/80 uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {item.sub}
                          </span>
                          <ArrowUpRight
                            className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                              isHovered
                                ? 'opacity-100 translate-x-1 -translate-y-1 text-[#C9BDAA]'
                                : 'opacity-0'
                            }`}
                          />
                        </div>
                      </button>
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Metainfo */}
            <motion.div
              className="shrink-0 flex flex-col md:flex-row items-start md:items-center justify-between pt-5 sm:pt-6 mt-4 sm:mt-6 border-t border-[#252422] text-xs text-[#77736D] tracking-widest gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <div className="flex items-center gap-4 sm:gap-6 text-[11px] sm:text-xs">
                <span>ATELIER JOHANNESBURG</span>
                <span>·</span>
                <span>SHIPPING WORLDWIDE</span>
              </div>
              <div className="flex items-center gap-3 sm:gap-5 flex-wrap text-[#C9BDAA]">
                {SOCIAL_CHANNELS.map((ch) => (
                  <a
                    key={ch.name}
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-[#F3F0E9] transition-colors"
                    title={ch.name}
                  >
                    {ch.renderIcon('w-3.5 h-3.5 sm:w-4 sm:h-4')}
                    <span className="text-[10px] tracking-widest uppercase">{ch.name}</span>
                  </a>
                ))}
                <span className="text-[#77736D] text-[11px] sm:text-xs">© 2026 ÉLANE</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

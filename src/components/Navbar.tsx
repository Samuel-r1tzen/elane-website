import React, { useState, useEffect } from 'react';
import { PageView } from '../types';

interface NavbarProps {
  onOpenMenu: () => void;
  onNavigateHome: () => void;
  onNavigateShop?: () => void;
  currentView: PageView;
  isReady: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenMenu,
  onNavigateHome,
  onNavigateShop,
  currentView,
  isReady
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isReady) return null;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isScrolled
          ? 'py-3.5 bg-[#0B0B0A]/85 backdrop-blur-md border-b border-[#252422]/60 shadow-lg shadow-black/20'
          : 'py-6 md:py-8 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Wordmark */}
        <button
          onClick={onNavigateHome}
          className="group text-left cursor-pointer flex items-baseline gap-2 focus:outline-none"
          aria-label="ÉLANE home"
        >
          <span className="font-serif text-2xl md:text-3xl tracking-[0.22em] font-light text-[#F3F0E9] group-hover:text-[#C9BDAA] transition-colors uppercase">
            ÉLANE
          </span>
          {currentView !== 'home' && (
            <span className="hidden sm:inline-block text-[10px] font-sans tracking-[0.25em] text-[#77736D] uppercase font-medium">
              / {currentView}
            </span>
          )}
        </button>

        {/* Top-Right: Minimalist SHOP & MENU */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* SHOP */}
          <button
            onClick={onNavigateShop}
            className={`group text-xs font-sans tracking-[0.25em] transition-colors uppercase cursor-pointer py-1.5 relative ${
              currentView === 'shop'
                ? 'text-[#C9BDAA]'
                : 'text-[#F3F0E9] hover:text-[#C9BDAA]'
            }`}
            aria-label="Explore shop collection"
          >
            <span>SHOP</span>
            <span
              className={`absolute bottom-0 left-0 h-[1px] bg-[#C9BDAA] transition-all duration-300 ${
                currentView === 'shop' ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            />
          </button>

          {/* MENU with 2 architectural horizontal lines */}
          <button
            onClick={onOpenMenu}
            className="group flex items-center gap-2.5 text-xs font-sans tracking-[0.25em] text-[#F3F0E9] hover:text-[#C9BDAA] uppercase transition-colors cursor-pointer py-1.5 relative"
            aria-label="Open navigation menu"
          >
            <span>MENU</span>
            <div className="flex flex-col gap-1 w-4" aria-hidden="true">
              <span className="h-[1px] w-4 bg-[#F3F0E9] group-hover:bg-[#C9BDAA] transition-colors" />
              <span className="h-[1px] w-2.5 bg-[#F3F0E9] group-hover:bg-[#C9BDAA] transition-colors group-hover:w-4 duration-200" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

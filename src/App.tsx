/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'motion/react';

import { Product, ProductSize, CartItem, LookbookLook, JournalArticle, PageView, ProductCategory } from './types';
import { PRODUCTS } from './data/products';
import { LOOKBOOK_ITEMS } from './data/lookbook';
import { JOURNAL_ARTICLES } from './data/journal';

import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { MenuOverlay } from './components/MenuOverlay';
import { ShoppingBagDrawer } from './components/ShoppingBagDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { LookbookModal } from './components/LookbookModal';
import { JournalModal } from './components/JournalModal';

import { HeroSection } from './components/sections/HeroSection';
import { InfiniteMarquee } from './components/sections/InfiniteMarquee';
import { NewFormSection } from './components/sections/NewFormSection';
import { PhilosophySection } from './components/sections/PhilosophySection';
import { NewArrivalsSection } from './components/sections/NewArrivalsSection';
import { HorizontalCollection } from './components/sections/HorizontalCollection';
import { CategoriesSection } from './components/sections/CategoriesSection';
import { CampaignSection } from './components/sections/CampaignSection';
import { LookbookSection } from './components/sections/LookbookSection';
import { JournalSection } from './components/sections/JournalSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/sections/Footer';
import { BackToTopButton } from './components/BackToTopButton';
import { LuxuryShoppingBagIcon } from './components/MotionIcons';

import { ShopView } from './pages/ShopView';
import { AboutView } from './pages/AboutView';
import { ContactView } from './pages/ContactView';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [isTransitioningPage, setIsTransitioningPage] = useState(false);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<ProductCategory>('ALL');

  // Modals & Panels
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedLook, setSelectedLook] = useState<LookbookLook | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  // Shopping Bag Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0], // E01 Signature Tee
      size: 'M',
      quantity: 1
    }
  ]);

  // Lenis smooth scroll instance reference
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // On touch-first devices (tablets and phones), native touch momentum scrolling is hardware accelerated and never traps overlays
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      return;
    }

    try {
      const lenis = new Lenis({
        duration: 1.0,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 0,
        infinite: false
      });

      lenisRef.current = lenis;
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

      let animationFrameId: number;
      const raf = (time: number) => {
        lenis.raf(time);
        animationFrameId = requestAnimationFrame(raf);
      };

      animationFrameId = requestAnimationFrame(raf);

      const handleResize = () => {
        lenis.resize();
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', handleResize);
        lenis.destroy();
        lenisRef.current = null;
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      };
    } catch (e) {
      console.warn('Lenis smooth scroll fallback to native', e);
    }
  }, []);

  // Modal / Drawer / Overlay scroll lock & Lenis pause
  const isAnyOverlayOpen =
    isMenuOpen ||
    isBagOpen ||
    isCheckoutOpen ||
    Boolean(selectedProduct) ||
    Boolean(selectedLook) ||
    Boolean(selectedArticle);

  useEffect(() => {
    if (lenisRef.current) {
      if (isAnyOverlayOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
        lenisRef.current.resize();
      }
    }
    if (isAnyOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isAnyOverlayOpen]);

  // Cart operations
  const handleAddToCart = (product: Product, size: ProductSize) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    // Open bag drawer seamlessly
    setIsBagOpen(true);
  };

  const handleUpdateQuantity = (id: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === id && item.size === size) {
            const nextQuantity = item.quantity + delta;
            return nextQuantity > 0 ? { ...item, quantity: nextQuantity } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (id: string, size: string) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.product.id === id && item.size === size))
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // View navigation handler with Cinematic Page Transition (Section 20)
  const handleNavigate = (view: PageView) => {
    if (view === currentView) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { duration: 1.0 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    setIsTransitioningPage(true);
    setIsMenuOpen(false);

    setTimeout(() => {
      setCurrentView(view);
      window.scrollTo(0, 0);
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
        setTimeout(() => {
          lenisRef.current?.resize();
        }, 150);
      }

      setTimeout(() => {
        setIsTransitioningPage(false);
      }, 250);
    }, 350);
  };

  const handleSelectCategoryFromHome = (category: ProductCategory) => {
    setSelectedCategoryFilter(category);
    handleNavigate('shop');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-[#0B0B0A] text-[#F3F0E9] font-sans">
      {/* Cinematic Loading Screen (Section 3) */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Minimal Fixed Navigation Bar (Streamlined: ÉLANE, SHOP, MENU) */}
      <Navbar
        onOpenMenu={() => setIsMenuOpen(true)}
        onNavigateHome={() => handleNavigate('home')}
        onNavigateShop={() => handleNavigate('shop')}
        currentView={currentView}
        isReady={!isLoading}
      />

      {/* Full-Screen Interactive Menu Overlay (Houses hidden Bag and Navigation) */}
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        currentView={currentView}
        cartCount={totalCartCount}
        onOpenBag={() => setIsBagOpen(true)}
      />

      {/* Shopping Bag Slide-Over Drawer (Section 24) */}
      <ShoppingBagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onClearCart={handleClearCart}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Lookbook Modal */}
      <LookbookModal
        look={selectedLook}
        products={PRODUCTS}
        onClose={() => setSelectedLook(null)}
        onSelectProduct={(p) => setSelectedProduct(p)}
      />

      {/* Journal Reader Modal */}
      <JournalModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />

      {/* Cinematic Page Transition Curtain (Section 20) */}
      <motion.div
        className="fixed inset-0 z-95 bg-[#0B0B0A] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isTransitioningPage ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Main Page Content Views with Smooth Transitions */}
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.main
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
            {/* Cinematic Hero Section with Staggered Intro & Multi-layer Parallax */}
            <HeroSection
              onExploreCollection={() => {
                setSelectedCategoryFilter('ALL');
                handleNavigate('shop');
              }}
              onDiscoverBrand={() => {
                const el = document.getElementById('philosophy-anchor');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else handleNavigate('about');
              }}
              isReady={!isLoading}
            />

            {/* Infinite Logo Marquee (Brand Philosophy Bridge) */}
            <InfiniteMarquee />

            {/* The New Form Section with Image Mask Reveal */}
            <NewFormSection />

            {/* Brand Philosophy Section (Ivory contrast) */}
            <div id="philosophy-anchor">
              <PhilosophySection onReadMore={() => handleNavigate('about')} />
            </div>

            {/* New Arrivals Grid (4 Key Products with card micro-interactions) */}
            <NewArrivalsSection
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onViewAllShop={() => {
                setSelectedCategoryFilter('ALL');
                handleNavigate('shop');
              }}
            />

            {/* Horizontal Collection Experience */}
            <HorizontalCollection
              products={PRODUCTS}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Categories Showcase */}
            <CategoriesSection
              onSelectCategory={handleSelectCategoryFromHome}
            />

            {/* Campaign 01 Motion with Ambient Zoom */}
            <CampaignSection
              onViewCampaign={() => {
                setSelectedLook(LOOKBOOK_ITEMS[2]);
              }}
            />

            {/* Asymmetrical Lookbook */}
            <LookbookSection
              onSelectLook={(look) => setSelectedLook(look)}
            />

            {/* Journal Stories */}
            <JournalSection
              onSelectArticle={(article) => setSelectedArticle(article)}
              onViewAllJournal={() => handleNavigate('journal')}
            />

            {/* Client FAQs Section */}
            <FaqSection
              onContactClick={() => handleNavigate('contact')}
            />

            {/* Dark Footer with Social Icons, Contact Details & Atelier Address */}
            <Footer onNavigate={handleNavigate} />
          </motion.main>
        )}

        {currentView === 'shop' && (
          <motion.div
            key="shop"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <ShopView
              products={PRODUCTS}
              initialCategory={selectedCategoryFilter}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onBackHome={() => handleNavigate('home')}
            />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'collection' && (
          <motion.div
            key="collection"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pt-24">
              <HorizontalCollection
                products={PRODUCTS}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
              <CategoriesSection
                onSelectCategory={handleSelectCategoryFromHome}
              />
              <LookbookSection
                onSelectLook={(look) => setSelectedLook(look)}
              />
            </div>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'campaign' && (
          <motion.div
            key="campaign"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pt-20">
              <CampaignSection
                onViewCampaign={() => setSelectedLook(LOOKBOOK_ITEMS[2])}
              />
              <LookbookSection
                onSelectLook={(look) => setSelectedLook(look)}
              />
            </div>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'journal' && (
          <motion.div
            key="journal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <div className="pt-24">
              <JournalSection
                onSelectArticle={(article) => setSelectedArticle(article)}
              />
            </div>
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'about' && (
          <motion.div
            key="about"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <AboutView
              onBackHome={() => handleNavigate('home')}
              onExploreShop={() => {
                setSelectedCategoryFilter('ALL');
                handleNavigate('shop');
              }}
            />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}

        {currentView === 'contact' && (
          <motion.div
            key="contact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
          >
            <ContactView onBackHome={() => handleNavigate('home')} />
            <Footer onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Discreet Luxury Bag Drawer Trigger (Hidden when empty; appears bottom-left when cart has items) */}
      <AnimatePresence>
        {totalCartCount > 0 && !isBagOpen && !isMenuOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={() => setIsBagOpen(true)}
            className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-[#121210]/95 hover:bg-[#1A1A18] text-[#F3F0E9] border border-[#252422] hover:border-[#C9BDAA] shadow-2xl backdrop-blur-md transition-all cursor-pointer group"
            aria-label={`Open shopping bag (${totalCartCount} items)`}
          >
            <LuxuryShoppingBagIcon className="w-4 h-4 text-[#C9BDAA] group-hover:scale-105 transition-transform" />
            <span className="text-xs font-sans tracking-[0.2em] uppercase font-medium">BAG</span>
            <span className="font-mono text-xs text-[#0B0B0A] bg-[#C9BDAA] px-1.5 py-0.2 font-semibold tabular-nums">
              {totalCartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Back to Top Button that fades in after scrolling past hero */}
      <BackToTopButton />
    </div>
  );
}

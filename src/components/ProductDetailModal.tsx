import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronDown, Bookmark, Check, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product, ProductSize } from '../types';
import { LuxuryShoppingBagIcon } from './MotionIcons';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: ProductSize) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('desc');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) return null;

  const currentSize = selectedSize || product.sizes[0];
  const images = [product.primaryImage, product.secondaryImage].filter(Boolean);

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const handleAdd = () => {
    onAddToCart(product, currentSize);
  };

  return (
    <div className="fixed inset-0 z-85 flex items-center justify-center overflow-y-auto p-4 md:p-8">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-[#0B0B0A]/90 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Main PDP Container */}
      <motion.div
        data-lenis-prevent
        className="relative z-10 w-full max-w-5xl bg-[#0E0E0D] border border-[#252422] text-[#F3F0E9] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onTouchMove={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Sticky Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252422] shrink-0 bg-[#0E0E0D]">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-[#C9BDAA]">{product.code}</span>
            <span className="text-[10px] tracking-[0.25em] text-[#77736D] uppercase font-sans">
              COLLECTION 01 / {product.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
            aria-label="Close product view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body: Left Gallery, Right Purchase Module */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#252422]"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {/* Left Gallery: Sticky/Scrollable Photography */}
          <div className="lg:col-span-7 p-6 md:p-8 bg-[#121210] flex flex-col gap-4">
            {/* Main Stage Image */}
            <div className="relative aspect-3/4 w-full overflow-hidden bg-[#161614] border border-[#252422]">
              <img
                src={images[activeImageIndex] || product.primaryImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-[#0B0B0A]/80 backdrop-blur-sm text-[10px] font-mono text-[#C9BDAA]">
                ANGLE {activeImageIndex + 1} OF {images.length}
              </div>
            </div>

            {/* Thumbnail switcher if multiple images */}
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImageIndex(i)}
                    className={`w-20 aspect-3/4 border overflow-hidden cursor-pointer transition-all ${
                      activeImageIndex === i
                        ? 'border-[#C9BDAA] opacity-100 ring-1 ring-[#C9BDAA]'
                        : 'border-[#252422] opacity-50 hover:opacity-80'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-5 p-6 md:p-8 bg-[#0E0E0D] flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              {/* Product Header */}
              <div>
                <span className="font-mono text-xs text-[#77736D] tracking-widest uppercase">
                  {product.code}
                </span>
                <h2 className="font-serif text-3xl md:text-4xl tracking-wide uppercase text-[#F3F0E9] mt-1">
                  {product.name}
                </h2>
                <div className="flex items-baseline justify-between mt-2.5">
                  <span className="font-mono text-xl tabular-nums text-[#F3F0E9]">
                    R{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs font-sans tracking-widest text-[#77736D]">
                    VAT INCLUDED
                  </span>
                </div>
              </div>

              {/* Color indicator */}
              <div className="pt-4 border-t border-[#252422]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-[#77736D] tracking-wider uppercase">COLOUR:</span>
                  <span className="text-[#C9BDAA] tracking-wider uppercase font-medium">
                    {product.colorName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full border border-[#C9BDAA] p-0.5 inline-flex items-center justify-center"
                    style={{ backgroundColor: product.color }}
                  />
                  <span className="text-xs text-[#77736D] font-mono">#01 TONAL</span>
                </div>
              </div>

              {/* Sizes selection */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2.5">
                  <span className="text-[#77736D] tracking-wider uppercase">SELECT SIZE:</span>
                  <span className="text-[11px] text-[#77736D] hover:text-[#C9BDAA] cursor-pointer underline">
                    SIZE GUIDE
                  </span>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((size) => {
                    const isSelected = currentSize === size;
                    return (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 text-xs font-mono tracking-widest uppercase transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#F3F0E9] text-[#0B0B0A] border-[#F3F0E9] font-semibold'
                            : 'bg-[#161614] text-[#F3F0E9] border-[#252422] hover:border-[#77736D]'
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Actions: ADD TO BAG & SAVE ITEM */}
              <div className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={handleAdd}
                  className="w-full py-4 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-lg group"
                >
                  <LuxuryShoppingBagIcon className="w-4 h-4 text-[#0B0B0A] transition-transform duration-300 group-hover:scale-110" />
                  <span>ADD TO BAG</span>
                  <span className="font-mono tabular-nums">· R{product.price.toLocaleString()}</span>
                </button>

                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`w-full py-3 border text-xs font-sans tracking-[0.2em] uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                    isSaved
                      ? 'border-[#A66A45] text-[#A66A45] bg-[#A66A45]/10'
                      : 'border-[#252422] text-[#77736D] hover:text-[#F3F0E9] hover:border-[#77736D]'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  <span>{isSaved ? 'SAVED TO ARCHIVE' : 'SAVE ITEM'}</span>
                </button>
              </div>

              {/* Quick Trust Highlights */}
              <div className="p-3 bg-[#121210] border border-[#252422] text-[11px] text-[#77736D] space-y-1">
                <div className="flex items-center gap-2 text-[#C9BDAA]">
                  <Check className="w-3.5 h-3.5 text-[#A66A45]" />
                  <span>Crafted in South Africa · Limited Production Run</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Complimentary domestic insured courier over R2,500</span>
                </div>
              </div>
            </div>

            {/* Expandable Accordions: DESCRIPTION, MATERIAL, FIT, CARE, SHIPPING */}
            <div className="pt-6 border-t border-[#252422] divide-y divide-[#252422]/60 text-xs">
              {/* Description */}
              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('desc')}
                  className="w-full flex items-center justify-between py-1 text-left tracking-wider uppercase text-[#F3F0E9] hover:text-[#C9BDAA] transition-colors"
                >
                  <span>DESCRIPTION</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === 'desc' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'desc' && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[#77736D] pt-2 leading-relaxed"
                    >
                      {product.description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Material */}
              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('material')}
                  className="w-full flex items-center justify-between py-1 text-left tracking-wider uppercase text-[#F3F0E9] hover:text-[#C9BDAA] transition-colors"
                >
                  <span>MATERIAL & TEXTURE</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === 'material' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'material' && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[#77736D] pt-2 leading-relaxed"
                    >
                      {product.details.material}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Fit */}
              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('fit')}
                  className="w-full flex items-center justify-between py-1 text-left tracking-wider uppercase text-[#F3F0E9] hover:text-[#C9BDAA] transition-colors"
                >
                  <span>FIT & SILHOUETTE</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === 'fit' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'fit' && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[#77736D] pt-2 leading-relaxed"
                    >
                      {product.details.fit}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Care */}
              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('care')}
                  className="w-full flex items-center justify-between py-1 text-left tracking-wider uppercase text-[#F3F0E9] hover:text-[#C9BDAA] transition-colors"
                >
                  <span>CARE INSTRUCTIONS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === 'care' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'care' && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[#77736D] pt-2 leading-relaxed"
                    >
                      {product.details.care}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Shipping */}
              <div className="py-2.5">
                <button
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between py-1 text-left tracking-wider uppercase text-[#F3F0E9] hover:text-[#C9BDAA] transition-colors"
                >
                  <span>SHIPPING & RETURNS</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      activeAccordion === 'shipping' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {activeAccordion === 'shipping' && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="text-[#77736D] pt-2 leading-relaxed"
                    >
                      {product.details.shipping}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

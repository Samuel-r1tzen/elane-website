import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { MagneticButton } from '../MagneticButton';

interface HorizontalCollectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const HorizontalCollection: React.FC<HorizontalCollectionProps> = ({
  products,
  onSelectProduct
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // Filter essentials
  const essentials = products.filter((p) => p.isEssential || p.category === 'ESSENTIALS').slice(0, 4);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % essentials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + essentials.length) % essentials.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 45) handleNext();
    else if (diff < -45) handlePrev();
    touchStartXRef.current = null;
  };

  return (
    <section className="relative w-full bg-[#0E0E0D] text-[#F3F0E9] py-24 md:py-32 px-6 md:px-12 border-t border-[#252422] overflow-hidden select-none">
      {/* Background Editorial Watermark / Kinetic Typography Layer */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.035] overflow-hidden">
        <motion.div
          animate={{ x: currentIndex * -80 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[18vw] whitespace-nowrap uppercase font-light text-[#F3F0E9] select-none tracking-tighter"
        >
          THE ESSENTIALS
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#252422]">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-1">
              04 // HORIZONTAL EXPLORATION
            </span>
            <div className="flex items-baseline gap-4 flex-wrap">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-[#F3F0E9]">
                COLLECTION 01
              </h2>
              <span className="font-serif italic text-2xl sm:text-3xl text-[#C9BDAA]">
                — THE ESSENTIALS
              </span>
            </div>
            <p className="text-xs md:text-sm text-[#77736D] mt-2 max-w-md font-sans">
              Pieces designed to become part of your everyday uniform. Built for uninterrupted movement and perennial longevity.
            </p>
          </div>

          {/* Stepper Controls & Counter with Magnetic Buttons */}
          <div className="flex items-center gap-6 mt-6 md:mt-0">
            <div className="font-mono text-sm tracking-widest text-[#C9BDAA]">
              <span className="text-[#F3F0E9] font-medium">0{currentIndex + 1}</span>
              <span className="text-[#77736D]"> / 0{essentials.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <MagneticButton
                onClick={handlePrev}
                strength={6}
                aria-label="Previous essential piece"
                className="w-10 h-10 border border-[#252422] hover:border-[#C9BDAA] text-[#77736D] hover:text-[#F3F0E9] flex items-center justify-center transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton
                onClick={handleNext}
                strength={6}
                aria-label="Next essential piece"
                className="w-10 h-10 border border-[#252422] hover:border-[#C9BDAA] text-[#77736D] hover:text-[#F3F0E9] flex items-center justify-center transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Feature Carousel Stage with touch swipe & DRAG cursor */}
        <div
          className="relative w-full overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          data-cursor="DRAG"
        >
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {essentials.map((product, idx) => (
              <div
                key={product.id}
                className="w-full shrink-0 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center"
              >
                {/* Visual Photography Column with Clipping Mask */}
                <div
                  className="lg:col-span-7 relative aspect-4/3 sm:aspect-16/10 bg-[#121210] border border-[#252422] overflow-hidden group cursor-pointer"
                  onClick={() => onSelectProduct(product)}
                  data-cursor="VIEW"
                >
                  <img
                    src={product.primaryImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/70 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-xs font-mono text-[#C9BDAA]">
                    <span>ARCHIVAL FORM {product.code}</span>
                    <span className="text-[10px] tracking-widest uppercase">
                      CLICK TO INSPECT PIECE
                    </span>
                  </div>
                </div>

                {/* Typography & Editorial Specs Column */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-6 lg:pl-6">
                  <div>
                    <span className="font-mono text-xs text-[#A66A45] tracking-[0.3em] uppercase">
                      SERIES SPECIFICATION // 0{idx + 1}
                    </span>
                    <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-[#F3F0E9] mt-2">
                      {product.name}
                    </h3>
                    <p className="font-mono text-xl tabular-nums text-[#C9BDAA] mt-2">
                      R{product.price.toLocaleString()}
                    </p>
                  </div>

                  <p className="font-sans text-sm md:text-base text-[#77736D] leading-relaxed font-light">
                    {product.description}
                  </p>

                  <div className="p-4 bg-[#161614] border border-[#252422] space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-[#77736D]">FABRIC PROFILE:</span>
                      <span className="text-[#F3F0E9] text-right truncate max-w-[200px]">
                        {product.details.material.split('.')[0]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#77736D]">SILHOUETTE:</span>
                      <span className="text-[#F3F0E9] text-right truncate max-w-[200px]">
                        {product.details.fit.split('.')[0]}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-4">
                    <MagneticButton
                      onClick={() => onSelectProduct(product)}
                      strength={6}
                      dataCursor="SHOP"
                      className="px-6 py-3.5 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors flex items-center gap-2"
                    >
                      <span>VIEW PIECE</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </MagneticButton>

                    <span className="text-xs font-mono text-[#77736D]">
                      AVAILABLE IN {product.sizes.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Minimal Progress Bar beneath gallery */}
        <div className="mt-8 flex items-center gap-4">
          <div className="relative flex-1 h-[1px] bg-[#252422] overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-[#C9BDAA]"
              animate={{
                width: `${((currentIndex + 1) / essentials.length) * 100}%`
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <span className="text-[10px] font-mono tracking-widest text-[#77736D]">
            SWIPE OR USE ARROWS
          </span>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { LookbookLook, Product } from '../types';

interface LookbookModalProps {
  look: LookbookLook | null;
  products: Product[];
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  look,
  products,
  onClose,
  onSelectProduct
}) => {
  if (!look) return null;

  const taggedProducts = products.filter((p) =>
    look.featuredProducts.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-85 flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-[#0B0B0A]/90 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Container */}
      <motion.div
        data-lenis-prevent
        className="relative z-10 w-full max-w-4xl bg-[#0E0E0D] border border-[#252422] text-[#F3F0E9] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252422]">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-[#C9BDAA]">{look.number}</span>
            <span className="text-[10px] tracking-[0.25em] text-[#77736D] uppercase">
              EDITORIAL STUDY / 2026
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#252422]"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Left: Editorial Image */}
          <div className="md:col-span-7 bg-[#121210] p-6 flex flex-col justify-center">
            <div className="relative aspect-3/4 w-full overflow-hidden bg-[#161614] border border-[#252422]">
              <img
                src={look.image}
                alt={look.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Curatorial Notes & Tagged Pieces */}
          <div className="md:col-span-5 p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-xs font-mono tracking-widest text-[#77736D]">
                  {look.subtitle}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wide text-[#F3F0E9] mt-1">
                  {look.title}
                </h3>
              </div>

              <blockquote className="border-l-2 border-[#A66A45] pl-4 py-1 italic font-serif text-lg text-[#C9BDAA] leading-relaxed">
                "{look.quote}"
              </blockquote>

              <p className="text-xs text-[#77736D] leading-relaxed">
                {look.notes}
              </p>
            </div>

            {/* Tagged Garments */}
            <div className="pt-6 border-t border-[#252422]">
              <h4 className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#77736D] mb-3">
                GARMENTS IN THIS LOOK
              </h4>
              <div className="space-y-3">
                {taggedProducts.map((p) => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onClose();
                      onSelectProduct(p);
                    }}
                    className="group flex items-center justify-between p-3 bg-[#161614] border border-[#252422] hover:border-[#C9BDAA] cursor-pointer transition-colors"
                  >
                    <div>
                      <p className="font-serif text-sm uppercase text-[#F3F0E9] group-hover:text-[#C9BDAA] transition-colors">
                        {p.code} — {p.name}
                      </p>
                      <p className="font-mono text-xs text-[#77736D]">
                        R{p.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-[10px] font-sans tracking-widest uppercase text-[#C9BDAA] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      VIEW PIECE <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

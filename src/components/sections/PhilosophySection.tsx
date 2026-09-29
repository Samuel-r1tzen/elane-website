import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface PhilosophySectionProps {
  onReadMore: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onReadMore }) => {
  return (
    <section className="relative w-full bg-[#F3F0E9] text-[#0B0B0A] py-28 md:py-36 px-6 md:px-12 selection:bg-[#0B0B0A] selection:text-[#F3F0E9]">
      <div className="max-w-5xl mx-auto flex flex-col items-start justify-center">
        {/* Subtle Section Subtitle */}
        <span className="text-[11px] font-mono tracking-[0.35em] text-[#77736D] uppercase mb-8 block">
          02 // BRAND PHILOSOPHY
        </span>

        {/* Large Statement Serif Typography */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light uppercase tracking-tight leading-[1.08] text-[#0B0B0A] max-w-4xl mb-12"
        >
          WE BELIEVE CLOTHING SHOULD MOVE WITH YOU.
        </motion.h2>

        {/* Supporting Paragraph & Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pt-8 border-t border-[#0B0B0A]/15 w-full items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-7"
          >
            <p className="font-sans text-base md:text-lg text-[#252422] leading-relaxed font-normal">
              ÉLANE explores the relationship between movement, structure and everyday expression. Each piece is designed with an uncompromising focus on silhouette, texture and simplicity.
            </p>
            <p className="font-sans text-sm text-[#77736D] leading-relaxed mt-4">
              We reject rigid, constraining tailoring in favour of anatomical drape. By selecting natural organic fibres with subtle tension memory, our garments accommodate your daily stride from dawn atelier sessions to late evening city transits.
            </p>

            <button
              onClick={onReadMore}
              className="mt-8 group inline-flex items-center gap-2 text-xs font-sans tracking-[0.25em] text-[#0B0B0A] hover:text-[#A66A45] uppercase font-semibold transition-colors cursor-pointer"
            >
              <span>EXPLORE BRAND ARCHIVE & STORY</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </motion.div>

          {/* 3 Core Design Pillars */}
          <div className="md:col-span-5 grid grid-cols-1 gap-6 pt-2 md:pt-0">
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#A66A45]">01. ANATOMICAL FORM</span>
              <p className="text-xs text-[#77736D] leading-normal">
                Pattern cutting engineered around natural joint articulation and fluid drape.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#A66A45]">02. TACTILE PURITY</span>
              <p className="text-xs text-[#77736D] leading-normal">
                Double-faced wools, compact organic cottons, and un-dyed virgin merino fleece.
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-xs text-[#A66A45]">03. QUIET LONGEVITY</span>
              <p className="text-xs text-[#77736D] leading-normal">
                Designed to become enduring elements of your perpetual daily uniform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

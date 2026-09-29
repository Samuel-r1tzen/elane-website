import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductCategory } from '../../types';
import { CATEGORIES_LIST } from '../../data/products';

interface CategoriesSectionProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  onSelectCategory
}) => {
  return (
    <section className="relative w-full bg-[#0B0B0A] text-[#F3F0E9] py-24 md:py-32 px-6 md:px-12 border-t border-[#252422] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-[#252422] flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-1">
              05 // TAXONOMY
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-[#F3F0E9]">
              COLLECTION CATEGORIES
            </h2>
          </div>
          <p className="text-xs text-[#77736D] mt-2 md:mt-0 font-sans tracking-wider uppercase">
            EXPLORE BY FORM & FUNCTION
          </p>
        </div>

        {/* 5-Category Editorial Stack */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {CATEGORIES_LIST.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              data-cursor="OPEN"
              className={`group relative h-80 sm:h-96 lg:h-[460px] bg-[#121210] border border-[#252422] overflow-hidden cursor-pointer flex flex-col justify-between p-6 transition-all duration-500 hover:border-[#C9BDAA]/70 ${
                idx === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Category Background Photography with Subtle Zoom */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover filter brightness-[0.45] contrast-110 group-hover:scale-105 group-hover:brightness-[0.6] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/95 via-[#0B0B0A]/30 to-transparent" />
              </div>

              {/* Top Index & Count */}
              <div className="relative z-10 flex items-center justify-between text-xs font-mono text-[#C9BDAA]">
                <span>0{idx + 1}</span>
                <span className="text-[10px] text-[#77736D] uppercase">
                  {cat.count} PIECES
                </span>
              </div>

              {/* Bottom Label, Arrow & Description */}
              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-2xl lg:text-3xl uppercase tracking-wide text-[#F3F0E9] group-hover:text-[#C9BDAA] group-hover:translate-x-1 transition-all duration-300">
                    {cat.label}
                  </h3>
                  <ArrowUpRight className="w-5 h-5 text-[#C9BDAA] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                </div>

                <p className="text-[11px] text-[#77736D] group-hover:text-[#C9BDAA]/80 transition-colors leading-relaxed line-clamp-2">
                  {cat.description}
                </p>

                <div className="pt-2">
                  <span className="inline-block text-[10px] font-sans tracking-[0.2em] uppercase text-[#F3F0E9] border-b border-transparent group-hover:border-[#C9BDAA] transition-colors pb-0.5">
                    VIEW RANGE
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

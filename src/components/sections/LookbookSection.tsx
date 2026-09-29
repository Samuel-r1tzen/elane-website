import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { LookbookLook } from '../../types';
import { LOOKBOOK_ITEMS } from '../../data/lookbook';

interface LookbookSectionProps {
  onSelectLook: (look: LookbookLook) => void;
}

export const LookbookSection: React.FC<LookbookSectionProps> = ({
  onSelectLook
}) => {
  return (
    <section className="relative w-full bg-[#0B0B0A] text-[#F3F0E9] py-24 md:py-32 px-6 md:px-12 border-t border-[#252422] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 pb-6 border-b border-[#252422] flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-1">
              06 // STYLING ESSAYS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-[#F3F0E9]">
              THE LOOKBOOK
            </h2>
          </div>
          <p className="text-xs text-[#77736D] mt-2 md:mt-0 font-sans tracking-wider uppercase">
            ASYMMETRIC FORM STUDY / 04 LOOKS
          </p>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
          {/* LOOK 01 - Large Lead Portrait (Col 1-7) */}
          <div
            onClick={() => onSelectLook(LOOKBOOK_ITEMS[0])}
            data-cursor="OPEN"
            className="md:col-span-7 group relative bg-[#121210] border border-[#252422] overflow-hidden cursor-pointer flex flex-col"
          >
            <div className="relative aspect-3/4 w-full overflow-hidden">
              <img
                src={LOOKBOOK_ITEMS[0].image}
                alt={LOOKBOOK_ITEMS[0].title}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 font-mono text-xs text-[#C9BDAA]">
                {LOOKBOOK_ITEMS[0].number}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-[#A66A45] uppercase">
                    {LOOKBOOK_ITEMS[0].subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#F3F0E9] uppercase">
                    {LOOKBOOK_ITEMS[0].title}
                  </h3>
                </div>
                <span className="p-2 bg-[#0B0B0A]/80 border border-[#252422] rounded-full text-[#C9BDAA]">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="p-4 bg-[#0E0E0D] border-t border-[#252422] text-xs text-[#77736D] font-serif italic">
              "{LOOKBOOK_ITEMS[0].quote}"
            </div>
          </div>

          {/* Right Column (Col 8-12): LOOK 02 Offset */}
          <div className="md:col-span-5 flex flex-col gap-8 md:pt-16">
            <div
              onClick={() => onSelectLook(LOOKBOOK_ITEMS[1])}
              data-cursor="OPEN"
              className="group relative bg-[#121210] border border-[#252422] overflow-hidden cursor-pointer"
            >
              <div className="relative aspect-4/5 w-full overflow-hidden">
                <img
                  src={LOOKBOOK_ITEMS[1].image}
                  alt={LOOKBOOK_ITEMS[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/90 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 font-mono text-xs text-[#C9BDAA]">
                  {LOOKBOOK_ITEMS[1].number}
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.2em] text-[#A66A45] uppercase">
                      {LOOKBOOK_ITEMS[1].subtitle}
                    </span>
                    <h3 className="font-serif text-xl md:text-2xl text-[#F3F0E9] uppercase">
                      {LOOKBOOK_ITEMS[1].title}
                    </h3>
                  </div>
                  <span className="p-2 bg-[#0B0B0A]/80 border border-[#252422] rounded-full text-[#C9BDAA]">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
              <div className="p-4 bg-[#0E0E0D] border-t border-[#252422] text-xs text-[#77736D] font-serif italic">
                "{LOOKBOOK_ITEMS[1].quote}"
              </div>
            </div>

            <div className="p-6 bg-[#161614] border border-[#252422] text-xs text-[#C9BDAA] space-y-2">
              <span className="font-mono text-[10px] text-[#A66A45] uppercase tracking-widest block">
                CURATORIAL DIALOGUE
              </span>
              <p className="leading-relaxed">
                Every look represents a dialogue between weight and fluidity. Designed to exist in natural light without studio embellishment.
              </p>
            </div>
          </div>

          {/* Row 2: LOOK 03 Wide Horizontal (Col 1-8) */}
          <div
            onClick={() => onSelectLook(LOOKBOOK_ITEMS[2])}
            data-cursor="OPEN"
            className="md:col-span-8 group relative bg-[#121210] border border-[#252422] overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-16/9 w-full overflow-hidden">
              <img
                src={LOOKBOOK_ITEMS[2].image}
                alt={LOOKBOOK_ITEMS[2].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 font-mono text-xs text-[#C9BDAA]">
                {LOOKBOOK_ITEMS[2].number}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-[#A66A45] uppercase">
                    {LOOKBOOK_ITEMS[2].subtitle}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl text-[#F3F0E9] uppercase">
                    {LOOKBOOK_ITEMS[2].title}
                  </h3>
                </div>
                <span className="p-2 bg-[#0B0B0A]/80 border border-[#252422] rounded-full text-[#C9BDAA]">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="p-4 bg-[#0E0E0D] border-t border-[#252422] text-xs text-[#77736D] font-serif italic">
              "{LOOKBOOK_ITEMS[2].quote}"
            </div>
          </div>

          {/* Row 2 Right: LOOK 04 Portrait (Col 9-12) */}
          <div
            onClick={() => onSelectLook(LOOKBOOK_ITEMS[3])}
            data-cursor="OPEN"
            className="md:col-span-4 group relative bg-[#121210] border border-[#252422] overflow-hidden cursor-pointer"
          >
            <div className="relative aspect-3/4 w-full overflow-hidden">
              <img
                src={LOOKBOOK_ITEMS[3].image}
                alt={LOOKBOOK_ITEMS[3].title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 font-mono text-xs text-[#C9BDAA]">
                {LOOKBOOK_ITEMS[3].number}
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-sans tracking-[0.2em] text-[#A66A45] uppercase">
                    {LOOKBOOK_ITEMS[3].subtitle}
                  </span>
                  <h3 className="font-serif text-xl text-[#F3F0E9] uppercase">
                    {LOOKBOOK_ITEMS[3].title}
                  </h3>
                </div>
                <span className="p-2 bg-[#0B0B0A]/80 border border-[#252422] rounded-full text-[#C9BDAA]">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>
            </div>
            <div className="p-4 bg-[#0E0E0D] border-t border-[#252422] text-xs text-[#77736D] font-serif italic">
              "{LOOKBOOK_ITEMS[3].quote}"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

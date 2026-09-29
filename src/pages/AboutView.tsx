import React from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { heroImg, jacketImg, campaignImg, lookbookImg } from '../data/products';
import { SocialMediaBar } from '../components/SocialIcons';
import { ShoppingCartInMotionIcon } from '../components/MotionIcons';

interface AboutViewProps {
  onBackHome: () => void;
  onExploreShop: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onBackHome, onExploreShop }) => {
  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F3F0E9] pt-28 pb-24 px-6 md:px-12 select-none">
      <div className="max-w-6xl mx-auto space-y-20 md:space-y-28">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#252422] pb-6">
          <button
            onClick={onBackHome}
            className="group flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-[#77736D] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN HOME</span>
          </button>
          <span className="font-mono text-xs text-[#C9BDAA]">
            STUDIO MONOGRAPH // 2026
          </span>
        </div>

        {/* Lead Statement */}
        <div className="space-y-6">
          <span className="text-xs font-mono tracking-[0.35em] text-[#A66A45] uppercase block">
            ABOUT ÉLANE
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#F3F0E9] font-light leading-[1.05] max-w-5xl">
            ÉLANE IS A STUDY IN MOVEMENT, FORM AND INDIVIDUALITY.
          </h1>
          <p className="font-serif italic text-2xl sm:text-3xl text-[#C9BDAA] max-w-2xl pt-2">
            "Clothing should never compete with the human wearing it."
          </p>
        </div>

        {/* Large Cinematic Imagery Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 aspect-4/3 bg-[#121210] border border-[#252422] overflow-hidden">
            <img
              src={campaignImg}
              alt="ÉLANE Studio Process"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="md:col-span-5 space-y-6">
            <h3 className="font-serif text-2xl md:text-3xl uppercase tracking-wide text-[#F3F0E9]">
              ORIGIN & INTENT
            </h3>
            <p className="text-sm text-[#C9BDAA] font-light leading-relaxed">
              Founded in Johannesburg, ÉLANE was conceived as an antidote to transient trend turnover and restrictive tailoring. We observed that contemporary life demands non-stop movement — between creative workspaces, international travel, and quiet repose.
            </p>
            <p className="text-xs text-[#77736D] leading-relaxed">
              Each garment begins not with surface decoration, but with an anatomical silhouette study: how the shoulder drops, how the trousers sweep during a step, and how heavy natural fibres breathe in fluctuating temperatures.
            </p>
          </div>
        </div>

        {/* The 5 Pillars of ÉLANE */}
        <div className="pt-12 border-t border-[#252422]">
          <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-8">
            FOUNDATIONAL PILLARS
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="p-6 bg-[#121210] border border-[#252422] space-y-3">
              <span className="font-mono text-xs text-[#C9BDAA]">01 // SILHOUETTE</span>
              <h4 className="font-serif text-xl uppercase text-[#F3F0E9]">
                SILHOUETTE
              </h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Sculptural, architectural outlines that flatter and accentuate without constriction.
              </p>
            </div>

            <div className="p-6 bg-[#121210] border border-[#252422] space-y-3">
              <span className="font-mono text-xs text-[#C9BDAA]">02 // TEXTURE</span>
              <h4 className="font-serif text-xl uppercase text-[#F3F0E9]">
                TEXTURE
              </h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Tactile virgin wools, double-faced cashmere, and dense 480gsm organic terry cotton.
              </p>
            </div>

            <div className="p-6 bg-[#121210] border border-[#252422] space-y-3">
              <span className="font-mono text-xs text-[#C9BDAA]">03 // MOVEMENT</span>
              <h4 className="font-serif text-xl uppercase text-[#F3F0E9]">
                MOVEMENT
              </h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Garments engineered with anatomical ease to move seamlessly in resonance with your body.
              </p>
            </div>

            <div className="p-6 bg-[#121210] border border-[#252422] space-y-3">
              <span className="font-mono text-xs text-[#C9BDAA]">04 // SIMPLICITY</span>
              <h4 className="font-serif text-xl uppercase text-[#F3F0E9]">
                SIMPLICITY
              </h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Radical editing. No extraneous graphics or hardware. Only pure line and tone.
              </p>
            </div>

            <div className="p-6 bg-[#121210] border border-[#252422] space-y-3">
              <span className="font-mono text-xs text-[#C9BDAA]">05 // LONGEVITY</span>
              <h4 className="font-serif text-xl uppercase text-[#F3F0E9]">
                LONGEVITY
              </h4>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Crafted to outlast seasons, forming the timeless foundation of an evolving wardrobe.
              </p>
            </div>
          </div>
        </div>

        {/* Social Dispatch */}
        <div className="pt-8 border-t border-[#252422] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <span className="text-[10px] font-mono tracking-[0.3em] text-[#77736D] uppercase">
            FOLLOW THE ATELIER ARCHIVE
          </span>
          <SocialMediaBar variant="solid" />
        </div>

        {/* Studio / Craftsmanship Closing CTA */}
        <div className="p-8 md:p-14 bg-[#121210] border border-[#252422] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="font-serif text-3xl uppercase tracking-wide text-[#F3F0E9]">
              EXPERIENCE COLLECTION 01
            </h3>
            <p className="text-xs text-[#77736D] mt-1 max-w-md">
              Discover the debut archive now available for acquisition worldwide.
            </p>
          </div>

          <button
            onClick={onExploreShop}
            className="group px-8 py-4 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors flex items-center gap-2.5 cursor-pointer shrink-0"
          >
            <ShoppingCartInMotionIcon className="w-4 h-4 text-[#0B0B0A] transition-transform duration-300 group-hover:translate-x-0.5" />
            <span>ENTER SHOP ARCHIVE</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

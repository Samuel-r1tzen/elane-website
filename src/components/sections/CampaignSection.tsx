import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { Play } from 'lucide-react';
import { campaignImg } from '../../data/products';
import { MagneticButton } from '../MagneticButton';

interface CampaignSectionProps {
  onViewCampaign: () => void;
}

export const CampaignSection: React.FC<CampaignSectionProps> = ({
  onViewCampaign
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: '-15%' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-70, 70]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] md:min-h-screen w-full bg-[#0B0B0A] text-[#F3F0E9] flex flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden select-none border-t border-[#252422]"
    >
      {/* Cinematic Parallax Background with Slow Ambient Scale (Section 12) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: imgY }}
          className="relative w-full h-[125%] -top-[12%]"
        >
          <motion.img
            src={campaignImg}
            alt="Campaign 01 Motion"
            animate={isInView ? { scale: [1.0, 1.04, 1.0] } : { scale: 1.0 }}
            transition={{ duration: 7.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full object-cover filter brightness-[0.52] contrast-125"
          />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0B0B0A]/40 to-[#0B0B0A]/95" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A] via-transparent to-[#0B0B0A]/70" />
        </motion.div>
      </div>

      {/* Top Campaign Index */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#C9BDAA] border-b border-[#252422]/60 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#A66A45] animate-pulse" />
          <span className="tracking-[0.25em] uppercase font-sans text-xs">
            CAMPAIGN 01 // MOTION
          </span>
        </div>
        <span className="tracking-widest uppercase">DIRECTED BY ÉLANE STUDIOS</span>
      </div>

      {/* Center Cinematic Statements with Staggered Line Reveals (Section 22) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-16 flex flex-col items-center text-center">
        <motion.span
          className="text-xs md:text-sm font-sans tracking-[0.4em] text-[#C9BDAA] uppercase mb-4"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          A CINEMATIC FASHION CAMPAIGN
        </motion.span>

        <div className="overflow-hidden">
          <motion.h2
            className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light uppercase tracking-wider text-[#F3F0E9] leading-none"
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            NOTHING STAYS STILL.
          </motion.h2>
        </div>

        <div className="overflow-hidden mt-3">
          <motion.h3
            className="font-serif italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#C9BDAA] tracking-wide"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            NEITHER SHOULD YOU.
          </motion.h3>
        </div>

        <motion.p
          className="font-sans text-xs md:text-sm text-[#C9BDAA]/80 max-w-lg mt-8 leading-relaxed font-light"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
        >
          Captured across the brutalist concrete structures of Johannesburg under highveld winter illumination. Form, volume, and momentum captured in pure monochrome.
        </motion.p>

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <MagneticButton
            onClick={onViewCampaign}
            strength={8}
            dataCursor="VIEW"
            className="group px-8 py-4 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-all duration-300 flex items-center gap-3 shadow-2xl"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>VIEW CAMPAIGN DOSSIER</span>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Bottom Metainfo */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-xs font-mono text-[#77736D] pt-4 border-t border-[#252422]/60">
        <span>CINEMATOGRAPHY: 35MM MONOCHROME</span>
        <span className="hidden sm:inline">SOUNDSCAPE: 120BPM MINIMAL AMBIENCE</span>
        <span>ARCHIVE EDITION 2026</span>
      </div>
    </section>
  );
};

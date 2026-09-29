import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { jacketImg } from '../../data/products';

export const NewFormSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-10%' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth scroll-driven typography translations
  const xLeft = useTransform(scrollYProgress, [0.15, 0.65], [-90, 0]);
  const xRight = useTransform(scrollYProgress, [0.18, 0.7], [90, 0]);
  const scaleCenter = useTransform(scrollYProgress, [0.2, 0.75], [0.88, 1]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[90vh] lg:min-h-screen w-full bg-[#0B0B0A] text-[#F3F0E9] py-24 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto w-full relative">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#252422]">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-1">
              01 // THE AESTHETIC THESIS
            </span>
            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-wide text-[#F3F0E9]">
              THE NEW FORM
            </h2>
          </div>
          <p className="text-xs md:text-sm font-sans tracking-[0.2em] text-[#C9BDAA] uppercase mt-2 md:mt-0">
            DESIGNED FOR MOVEMENT. DEFINED BY FORM.
          </p>
        </div>

        {/* Large Cinematic Visual with Scroll-Linked Overlay Typography & Clipping Mask Reveal */}
        <motion.div
          className="relative aspect-4/3 sm:aspect-16/9 w-full overflow-hidden bg-[#161614] border border-[#252422]"
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={isInView ? { clipPath: 'inset(0% 0% 0% 0%)' } : { clipPath: 'inset(100% 0% 0% 0%)' }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          data-cursor="VIEW"
        >
          <motion.img
            src={jacketImg}
            alt="The New Form"
            style={{ scale: imgScale }}
            className="w-full h-full object-cover filter brightness-[0.75] contrast-[1.1]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/90 via-[#0B0B0A]/30 to-transparent" />

          {/* Refined Scale Typography Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 pointer-events-none">
            <motion.div
              style={{ x: xLeft }}
              className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.2em] text-[#F3F0E9]/90 leading-none font-light drop-shadow-lg"
            >
              FORM
            </motion.div>

            <motion.div
              style={{ x: xRight }}
              className="font-serif italic text-xl sm:text-3xl md:text-4xl lg:text-5xl tracking-wide text-[#C9BDAA] leading-none font-normal my-1.5 sm:my-2.5 drop-shadow-lg"
            >
              FOLLOWS
            </motion.div>

            <motion.div
              style={{ scale: scaleCenter }}
              className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.2em] text-[#F3F0E9] leading-none font-light drop-shadow-lg"
            >
              MOVEMENT
            </motion.div>
          </div>

          {/* Footnote inside the media */}
          <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[11px] font-mono tracking-widest text-[#C9BDAA]">
            <span>STRUCTURED SILHOUETTE</span>
            <span>OBSIDIAN COLLECTION</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'motion/react';
import { X, Clock, Calendar } from 'lucide-react';
import { JournalArticle } from '../types';

interface JournalModalProps {
  article: JournalArticle | null;
  onClose: () => void;
}

export const JournalModal: React.FC<JournalModalProps> = ({
  article,
  onClose
}) => {
  if (!article) return null;

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

      {/* Reader Container */}
      <motion.div
        data-lenis-prevent
        className="relative z-10 w-full max-w-3xl bg-[#0E0E0D] border border-[#252422] text-[#F3F0E9] shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252422]">
          <div className="flex items-baseline gap-3">
            <span className="text-[10px] tracking-[0.25em] text-[#C9BDAA] uppercase">
              THE ÉLANE JOURNAL
            </span>
            <span className="text-[10px] tracking-[0.2em] text-[#77736D] uppercase">
              / {article.category}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div
          data-lenis-prevent
          className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y p-6 md:p-12 space-y-8"
          style={{ WebkitOverflowScrolling: 'touch' }}
          onTouchMove={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#77736D] mb-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl uppercase tracking-wide text-[#F3F0E9] leading-tight">
              {article.title}
            </h2>
          </div>

          <div className="relative aspect-16/9 w-full overflow-hidden bg-[#161614] border border-[#252422]">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-serif italic text-xl md:text-2xl text-[#C9BDAA] leading-relaxed border-l-2 border-[#A66A45] pl-6 py-1">
            "{article.excerpt}"
          </p>

          <div className="space-y-5 text-sm md:text-base text-[#C9BDAA]/90 leading-relaxed font-sans font-light">
            {article.content.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          <div className="pt-8 border-t border-[#252422] flex items-center justify-between text-xs text-[#77736D]">
            <span>WRITTEN BY ÉLANE ATELIER EDITORIAL</span>
            <span>JOHANNESBURG, ZA</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

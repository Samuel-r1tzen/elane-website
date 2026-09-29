import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { JournalArticle } from '../../types';
import { JOURNAL_ARTICLES } from '../../data/journal';

interface JournalSectionProps {
  onSelectArticle: (article: JournalArticle) => void;
  onViewAllJournal?: () => void;
}

export const JournalSection: React.FC<JournalSectionProps> = ({
  onSelectArticle,
  onViewAllJournal
}) => {
  return (
    <section className="relative w-full bg-[#0E0E0D] text-[#F3F0E9] py-24 md:py-32 px-6 md:px-12 border-t border-[#252422] select-none">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 pb-6 border-b border-[#252422] flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-1">
              07 // ESSAYS & CRITIQUE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-[#F3F0E9]">
              THE JOURNAL
            </h2>
          </div>
          <p className="text-xs text-[#77736D] mt-2 md:mt-0 font-sans tracking-wider uppercase">
            STUDIES IN FORM, COLOUR & ARCHITECTURE
          </p>
        </div>

        {/* 4 Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {JOURNAL_ARTICLES.map((article, idx) => (
            <div
              key={article.id}
              onClick={() => onSelectArticle(article)}
              data-cursor="READ"
              className="group flex flex-col justify-between bg-[#121210] border border-[#252422] p-5 cursor-pointer transition-all duration-300 hover:border-[#C9BDAA]/70"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-4/3 w-full overflow-hidden bg-[#161614] border border-[#252422] mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#0B0B0A]/80 backdrop-blur-sm text-[9px] font-mono tracking-widest text-[#C9BDAA] uppercase">
                    {article.category}
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#77736D] mb-2">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-serif text-xl uppercase tracking-wide text-[#F3F0E9] group-hover:text-[#C9BDAA] transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-[#77736D] font-light mt-2 line-clamp-3 leading-relaxed">
                  {article.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#252422]/60 flex items-center justify-between text-[11px] font-sans tracking-[0.2em] uppercase text-[#F3F0E9] group-hover:text-[#C9BDAA] transition-colors">
                <span>READ ESSAY</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

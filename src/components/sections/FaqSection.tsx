import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight, HelpCircle, MessageSquare } from 'lucide-react';

interface FaqItem {
  id: string;
  category: 'SIZING & FIT' | 'ORDERS & SHIPPING' | 'MATERIALS & CARE' | 'ATELIER & SERVICES';
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'SIZING & FIT',
    question: 'HOW DO ÉLANE GARMENTS FIT, AND HOW SHOULD I SELECT MY SIZE?',
    answer: 'ÉLANE pieces are engineered with an architectural, relaxed silhouette that allows natural fluid drape and unrestricted body movement. Outerwear and hoodies feature intentional drop shoulders and roomy cuts, while trousers sit high on the waist with generous leg sweeps. We recommend selecting your true standard size for the intended editorial drape, or sizing down one step if you prefer a closer, traditional fit. Detailed garment measurements are provided on every product dossier.'
  },
  {
    id: 'faq-02',
    category: 'ORDERS & SHIPPING',
    question: 'WHAT ARE YOUR SHIPPING TIMELINES AND GLOBAL DELIVERY DESTINATIONS?',
    answer: 'We provide complimentary express courier delivery across South Africa on all orders above R2,500, delivered within 2–4 business days. International orders are fulfilled globally via DHL Express with carbon-neutral transit within 3–5 business days. All shipments are fully insured, tracked in real-time, and hand-packed in our signature archival garment boxes with custom garment dust bags.'
  },
  {
    id: 'faq-03',
    category: 'MATERIALS & CARE',
    question: 'WHERE ARE YOUR TEXTILES SOURCED AND HOW ARE GARMENTS CONSTRUCTED?',
    answer: 'Every material in the collection is chosen for tactile weight, drape integrity, and ethical pedigree. Our virgin tropical wool and cashmere blends are woven in northern Italy, while our heavyweight 480gsm French terry and 280gsm organic jerseys are spun from GOTS-certified African cotton and finished in Johannesburg. Each garment is assembled in limited batches with reinforced bar-tacks, clean blind hems, and internal bound seams.'
  },
  {
    id: 'faq-04',
    category: 'MATERIALS & CARE',
    question: 'HOW DO I BEST CARE FOR MY ÉLANE SILHOUETTES FOR LIFETIME LONGEVITY?',
    answer: 'For heavyweight cotton fleece and jerseys: wash cold inside out on a gentle wool/silk cycle (30°C maximum) using mild liquid detergent, reshape damp, and dry flat away from direct sunlight to preserve fibre density. For double-faced wool coats, blazers, and virgin wool trousers: specialist eco dry clean only, and hang on wide contoured cedar hangers to maintain shoulder architecture.'
  },
  {
    id: 'faq-05',
    category: 'ORDERS & SHIPPING',
    question: 'WHAT IS YOUR RETURN POLICY AND HOW DO EXCHANGES WORK?',
    answer: 'We offer a 14-day return and exchange window from the date of delivery for all unworn garments in their pristine original condition with tags and archival dust bags intact. Complimentary return pickups are arranged by our concierge for domestic orders. For sizing exchanges, we dispatch the replacement piece as soon as the initial courier collection is booked.'
  },
  {
    id: 'faq-06',
    category: 'ATELIER & SERVICES',
    question: 'CAN I BOOK A PRIVATE FITTING OR ATELIER CONSULTATION IN JOHANNESBURG?',
    answer: 'Yes. Our private studio at 44 Stanley Avenue in Johannesburg welcomes clients by private appointment from Monday to Saturday (10:00 – 18:00 SAST). Appointments include a dedicated wardrobe stylist, tactile fabric viewing, full collection trial, and complimentary in-house hem or sleeve tailored adjustments.'
  },
  {
    id: 'faq-07',
    category: 'ATELIER & SERVICES',
    question: 'DO YOU PROVIDE BESPOKE HEMMING OR CUSTOM SIZING ADJUSTMENTS?',
    answer: 'Complimentary hem adjustments are available for all tailored trousers upon request at our Johannesburg atelier or via concierge consultation before global dispatch. Simply contact our concierge with your desired inseam measurement immediately after placing your order.'
  }
];

const CATEGORIES = ['ALL', 'SIZING & FIT', 'ORDERS & SHIPPING', 'MATERIALS & CARE', 'ATELIER & SERVICES'] as const;

interface FaqSectionProps {
  onContactClick?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onContactClick }) => {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>('ALL');
  const [expandedId, setExpandedId] = useState<string | null>('faq-01');

  const filteredItems = activeCategory === 'ALL'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section
      id="faq-section"
      className="relative w-full bg-[#0B0B0A] text-[#F3F0E9] py-24 md:py-32 px-6 md:px-12 border-t border-[#252422] select-none"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#252422]">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-[#A66A45]" />
              <span className="text-xs font-mono tracking-[0.35em] text-[#A66A45] uppercase">
                CLIENT DOSSIER
              </span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight font-light text-[#F3F0E9]">
              FREQUENTLY ASKED QUESTIONS
            </h2>
          </div>

          <p className="text-xs md:text-sm text-[#77736D] max-w-sm font-sans font-light leading-relaxed">
            Essential information regarding our anatomical cuts, international delivery, textile provenance, and bespoke atelier appointments.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap py-8 border-b border-[#252422]/60">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 text-[10px] sm:text-xs font-mono tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer border ${
                  isSelected
                    ? 'bg-[#F3F0E9] text-[#0B0B0A] border-[#F3F0E9] font-medium'
                    : 'bg-[#121210] text-[#77736D] hover:text-[#F3F0E9] border-[#252422] hover:border-[#77736D]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ Accordion List */}
        <div className="divide-y divide-[#252422]">
          {filteredItems.map((item, index) => {
            const isOpen = expandedId === item.id;

            return (
              <div
                key={item.id}
                className="group py-6 md:py-8 transition-colors duration-200"
              >
                <button
                  onClick={() => toggleItem(item.id)}
                  className="w-full text-left flex items-start justify-between gap-6 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 md:gap-8">
                    <span className="font-mono text-xs text-[#77736D] tracking-widest tabular-nums shrink-0 pt-1">
                      0{index + 1}
                    </span>
                    <div>
                      <span className="text-[10px] font-mono tracking-[0.25em] text-[#A66A45] uppercase block mb-1.5">
                        {item.category}
                      </span>
                      <h3
                        className={`font-serif text-xl sm:text-2xl md:text-3xl uppercase tracking-wide transition-colors duration-200 ${
                          isOpen
                            ? 'text-[#C9BDAA]'
                            : 'text-[#F3F0E9] group-hover:text-[#C9BDAA]'
                        }`}
                      >
                        {item.question}
                      </h3>
                    </div>
                  </div>

                  <div
                    className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-[#C9BDAA] text-[#0B0B0A] border-[#C9BDAA] rotate-180'
                        : 'border-[#252422] text-[#77736D] group-hover:border-[#C9BDAA] group-hover:text-[#F3F0E9]'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pl-8 md:pl-16 pr-4 pt-4 md:pt-6 pb-2">
                        <p className="text-xs sm:text-sm md:text-base text-[#C9BDAA] leading-relaxed font-light font-sans max-w-3xl">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Concierge Assistance Footer Callout */}
        <div className="mt-12 p-8 bg-[#121210] border border-[#252422] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#A66A45] text-xs font-mono tracking-widest uppercase">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>UNANSWERED QUESTIONS?</span>
            </div>
            <p className="font-serif text-2xl text-[#F3F0E9] uppercase">
              SPEAK DIRECTLY WITH THE ATELIER CONCIERGE
            </p>
            <p className="text-xs text-[#77736D] font-sans">
              Our Johannesburg studio team is on hand for bespoke sizing advice, order adjustments, and fabric consultations.
            </p>
          </div>

          {onContactClick && (
            <button
              onClick={onContactClick}
              className="px-6 py-3.5 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>CONTACT CONCIERGE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

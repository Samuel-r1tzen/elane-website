import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../ProductCard';

interface NewArrivalsSectionProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onViewAllShop: () => void;
}

export const NewArrivalsSection: React.FC<NewArrivalsSectionProps> = ({
  products,
  onSelectProduct,
  onViewAllShop
}) => {
  // Take 4 featured new arrivals
  const featured = products.slice(0, 4);

  return (
    <section className="relative w-full bg-[#0B0B0A] text-[#F3F0E9] py-24 md:py-32 px-6 md:px-12 select-none border-t border-[#252422]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#252422]">
          <div>
            <div className="flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] text-[#C9BDAA] uppercase mb-1">
              <span>03 // CATALOGUE</span>
              <span>·</span>
              <span className="text-[#A66A45]">COLLECTION 01 / 2026</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl uppercase tracking-wide text-[#F3F0E9]">
              NEW ARRIVALS
            </h2>
          </div>

          <button
            onClick={onViewAllShop}
            className="group flex items-center gap-2 text-xs font-sans tracking-[0.25em] text-[#F3F0E9] hover:text-[#C9BDAA] uppercase transition-colors cursor-pointer mt-4 md:mt-0"
          >
            <span>VIEW COMPLETE COLLECTION (08)</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* 4-Item Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featured.map((product, idx) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                onSelect={onSelectProduct}
                priority={idx < 2}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

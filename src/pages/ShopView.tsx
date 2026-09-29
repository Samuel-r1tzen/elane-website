import React, { useState, useMemo } from 'react';
import { ArrowLeft, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { Product, ProductCategory } from '../types';
import { ProductCard } from '../components/ProductCard';

interface ShopViewProps {
  products: Product[];
  initialCategory?: ProductCategory;
  onSelectProduct: (product: Product) => void;
  onBackHome: () => void;
}

const CATEGORY_TABS: ProductCategory[] = [
  'ALL',
  'NEW ARRIVALS',
  'ESSENTIALS',
  'OUTERWEAR',
  'TAILORING',
  'KNITWEAR',
  'ACCESSORIES'
];

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  initialCategory = 'ALL',
  onSelectProduct,
  onBackHome
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>(initialCategory);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory === 'NEW ARRIVALS') {
      list = list.filter((p) => p.isNewArrival);
    } else if (activeCategory !== 'ALL') {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, activeCategory, sortBy]);

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F3F0E9] pt-28 pb-24 px-6 md:px-12 select-none">
      <div className="max-w-7xl mx-auto">
        {/* Back Link & Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={onBackHome}
            className="group flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-[#77736D] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN TO OVERVIEW</span>
          </button>

          <span className="font-mono text-xs text-[#77736D]">
            COLLECTION 01 / CATALOGUE
          </span>
        </div>

        {/* Shop Title */}
        <div className="mb-10 pb-6 border-b border-[#252422] flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block mb-1">
              READY-TO-WEAR
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl uppercase tracking-wide text-[#F3F0E9]">
              THE ARCHIVE
            </h1>
          </div>
          <p className="text-xs text-[#77736D] max-w-sm font-sans font-light leading-relaxed">
            Every piece engineered for anatomical fluid drape and understated luxury. Free nationwide insured shipping above R2,500.
          </p>
        </div>

        {/* Filter Tabs & Sort Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10 pb-4 border-b border-[#252422]/60">
          {/* Segmented Category Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((tab) => {
              const isActive = activeCategory === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveCategory(tab)}
                  className={`px-3.5 py-1.5 text-xs font-sans tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#F3F0E9] text-[#0B0B0A] font-semibold'
                      : 'text-[#77736D] hover:text-[#F3F0E9] hover:bg-[#161614]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown & Count */}
          <div className="flex items-center justify-between lg:justify-end gap-6 text-xs text-[#77736D]">
            <span className="font-mono tabular-nums">
              SHOWING {filteredProducts.length} OF {products.length} PIECES
            </span>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-[#C9BDAA]" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#161614] border border-[#252422] text-[#F3F0E9] text-xs px-3 py-1.5 focus:outline-none focus:border-[#C9BDAA] cursor-pointer"
              >
                <option value="featured">SORT: FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-24 text-center text-[#77736D]">
            <p className="font-serif text-2xl uppercase text-[#F3F0E9] mb-2">
              NO PIECES FOUND
            </p>
            <p className="text-xs">
              No garments currently match the selected taxonomy filter.
            </p>
            <button
              onClick={() => setActiveCategory('ALL')}
              className="mt-4 px-6 py-2 border border-[#252422] text-xs text-[#C9BDAA] hover:text-[#F3F0E9] uppercase tracking-widest"
            >
              RESET FILTER
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelect={onSelectProduct}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

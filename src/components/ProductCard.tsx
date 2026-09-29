import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onQuickAdd?: (product: Product) => void;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickAdd
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMouseOffset({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(product)}
      data-cursor="SHOP"
      className="group flex flex-col cursor-pointer select-none"
    >
      {/* Image Framing Container with Clipping Mask Frame */}
      <div className="relative aspect-3/4 w-full overflow-hidden bg-[#121210] border border-[#252422]/60">
        {/* Primary Image: Subtly zooms and crossfades if secondary image exists */}
        <motion.img
          src={product.primaryImage}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
          animate={{
            scale: isHovered ? 1.04 : 1,
            x: mouseOffset.x * 0.4,
            y: mouseOffset.y * 0.4,
            opacity: isHovered && product.secondaryImage ? 0 : 1
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Secondary Angle Image (Crossfades in on hover) */}
        {product.secondaryImage && (
          <motion.img
            src={product.secondaryImage}
            alt={`${product.name} alternate view`}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1.04 : 1,
              x: mouseOffset.x * 0.4,
              y: mouseOffset.y * 0.4
            }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0A]/70 via-transparent to-transparent pointer-events-none" />

        {/* Top Floating Badge for Code & Category */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-[11px] font-sans tracking-widest text-[#F3F0E9]/80 pointer-events-none">
          <span className="font-mono text-xs">{product.code}</span>
          <span className="text-[10px] text-[#C9BDAA] uppercase tracking-[0.2em]">
            {product.category}
          </span>
        </div>

        {/* Bottom Hover Action: "VIEW PIECE" button */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <motion.span
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B0B0A]/90 backdrop-blur-sm border border-[#252422] text-[10px] font-sans tracking-[0.25em] text-[#F3F0E9] uppercase"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <span>VIEW PIECE</span>
            <ArrowUpRight className="w-3 h-3 text-[#C9BDAA] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.span>

          <span className="text-[10px] font-mono tracking-widest text-[#77736D] uppercase ml-auto">
            {product.colorName}
          </span>
        </div>
      </div>

      {/* Product Metadata beneath image with upward shift & underline */}
      <div className="pt-3.5 pb-2 transition-transform duration-400 group-hover:-translate-y-1">
        <div className="flex items-baseline justify-between gap-2">
          <div className="relative">
            <h3 className="font-serif text-lg md:text-xl tracking-wide uppercase text-[#F3F0E9] group-hover:text-[#C9BDAA] transition-colors">
              {product.name}
            </h3>
            {/* Animated Underline */}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C9BDAA] transition-all duration-300 group-hover:w-full" />
          </div>

          <span className="font-mono text-sm tabular-nums text-[#F3F0E9]">
            R{product.price.toLocaleString()}
          </span>
        </div>

        <p className="text-xs text-[#77736D] mt-1 line-clamp-1 font-sans font-light">
          {product.description}
        </p>
      </div>
    </div>
  );
};

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Minus, ArrowRight, ShoppingBag as BagIcon } from 'lucide-react';
import { CartItem } from '../types';
import { MagneticButton } from './MagneticButton';
import { LuxuryShoppingBagIcon, ShoppingCartInMotionIcon } from './MotionIcons';

interface ShoppingBagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, size: string, delta: number) => void;
  onRemoveItem: (id: string, size: string) => void;
  onProceedToCheckout: () => void;
}

export const ShoppingBagDrawer: React.FC<ShoppingBagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeShippingThreshold = 2500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingAmount = subtotal === 0 ? 0 : isFreeShipping ? 0 : 180;
  const total = subtotal + shippingAmount;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-80 flex justify-end">
          {/* Backdrop overlay */}
          <motion.div
            className="fixed inset-0 bg-[#0B0B0A]/75 backdrop-blur-sm cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
          />

          {/* Drawer Panel (Section 24: translateX(100%) -> translateX(0) with subtle easing) */}
          <motion.div
            data-lenis-prevent
            className="relative z-10 w-full max-w-md bg-[#0E0E0D] border-l border-[#252422] text-[#F3F0E9] h-full flex flex-col justify-between shadow-2xl overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#252422]">
              <div className="flex items-center gap-3">
                <LuxuryShoppingBagIcon className="w-5 h-5 text-[#C9BDAA]" />
                <span className="font-serif text-2xl tracking-wider uppercase font-light">
                  YOUR BAG
                </span>
                <span className="font-mono text-xs text-[#77736D] tabular-nums">
                  ({items.reduce((s, i) => s + i.quantity, 0)})
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free shipping banner */}
            <div className="bg-[#161614] px-6 py-2.5 text-[11px] text-[#C9BDAA] border-b border-[#252422] flex items-center justify-between">
              <span>
                {isFreeShipping
                  ? 'COMPLIMENTARY DOMESTIC DELIVERY APPLIED'
                  : `ADD R${(freeShippingThreshold - subtotal).toLocaleString()} FOR COMPLIMENTARY SHIPPING`}
              </span>
              <span className="font-mono text-[10px] text-[#77736D]">
                ZAR
              </span>
            </div>

            {/* Item List with Staggered Entrance */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto overscroll-y-contain touch-pan-y p-6 space-y-6"
              style={{ WebkitOverflowScrolling: 'touch' }}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16 text-[#77736D]">
                  <BagIcon className="w-10 h-10 stroke-[1] mb-4 text-[#252422]" />
                  <p className="font-serif text-xl text-[#F3F0E9] uppercase mb-1">
                    YOUR BAG IS EMPTY
                  </p>
                  <p className="text-xs text-[#77736D] max-w-xs mb-6">
                    Explore Collection 01 and find pieces tailored for fluid movement.
                  </p>
                  <button
                    onClick={onClose}
                    className="px-6 py-2.5 text-xs font-sans tracking-[0.2em] uppercase text-[#0B0B0A] bg-[#F3F0E9] hover:bg-[#C9BDAA] transition-colors cursor-pointer"
                  >
                    CONTINUE BROWSING
                  </button>
                </div>
              ) : (
                items.map((item, idx) => (
                  <motion.div
                    key={`${item.product.id}-${item.size}`}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="flex gap-4 pb-6 border-b border-[#252422]/60 last:border-b-0"
                  >
                    {/* Thumbnail */}
                    <div className="w-20 h-28 bg-[#161614] overflow-hidden shrink-0 border border-[#252422]">
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-serif text-lg tracking-wide uppercase text-[#F3F0E9]">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id, item.size)}
                            className="text-[11px] text-[#77736D] hover:text-[#A66A45] tracking-wider uppercase transition-colors cursor-pointer"
                          >
                            REMOVE
                          </button>
                        </div>
                        <p className="text-xs text-[#77736D] mt-0.5 tracking-wider">
                          SIZE: <span className="text-[#C9BDAA]">{item.size}</span> · {item.product.colorName}
                        </p>
                        <p className="font-mono text-xs tabular-nums text-[#F3F0E9] mt-2">
                          R{item.product.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center border border-[#252422] bg-[#161614]">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, -1)}
                            className="p-1.5 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs tabular-nums text-[#F3F0E9]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.size, 1)}
                            className="p-1.5 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-mono text-xs text-[#77736D] tabular-nums ml-auto">
                          R{(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#252422] bg-[#0B0B0A] space-y-4">
                <div className="space-y-1.5 text-xs text-[#77736D]">
                  <div className="flex justify-between">
                    <span>SUBTOTAL</span>
                    <span className="font-mono tabular-nums text-[#F3F0E9]">
                      R{subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>ESTIMATED DELIVERY</span>
                    <span className="font-mono tabular-nums text-[#F3F0E9]">
                      {shippingAmount === 0 ? 'COMPLIMENTARY' : `R${shippingAmount}`}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-[#252422] flex justify-between text-sm text-[#F3F0E9] font-medium">
                    <span className="font-serif tracking-widest uppercase">TOTAL</span>
                    <span className="font-mono tabular-nums">
                      R{total.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex flex-col gap-2.5">
                  <MagneticButton
                    onClick={() => {
                      onClose();
                      onProceedToCheckout();
                    }}
                    strength={6}
                    className="w-full py-3.5 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <ArrowRight className="w-4 h-4" />
                  </MagneticButton>

                  <button
                    onClick={onClose}
                    className="w-full py-2.5 border border-[#252422] hover:border-[#C9BDAA] text-[#77736D] hover:text-[#F3F0E9] text-xs font-sans tracking-[0.2em] uppercase transition-colors text-center cursor-pointer flex items-center justify-center gap-2 group"
                  >
                    <ShoppingCartInMotionIcon className="w-3.5 h-3.5 text-[#C9BDAA] group-hover:text-[#F3F0E9] transition-transform duration-300 group-hover:translate-x-0.5" />
                    <span>CONTINUE SHOPPING</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

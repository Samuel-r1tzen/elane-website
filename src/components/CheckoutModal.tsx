import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ShieldCheck, ArrowLeft, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onClearCart
}) => {
  const [formData, setFormData] = useState({
    name: 'Julian Vance',
    email: 'julian.vance@studio.co.za',
    phone: '+27 82 459 1083',
    address: '44 Stanley Avenue, Braamfontein Werf',
    city: 'Johannesburg',
    postalCode: '2092'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<{
    orderNumber: string;
    date: string;
  } | null>(null);

  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const isFreeShipping = subtotal >= 2500;
  const shippingAmount = subtotal === 0 ? 0 : isFreeShipping ? 0 : 180;
  const total = subtotal + shippingAmount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrder = `EL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setOrderConfirmed({
        orderNumber: generatedOrder,
        date: new Date().toLocaleDateString('en-ZA', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      });
      onClearCart();
    }, 900);
  };

  const handleClose = () => {
    setOrderConfirmed(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      data-lenis-prevent
      className="fixed inset-0 z-90 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto overscroll-y-contain touch-pan-y"
      style={{ WebkitOverflowScrolling: 'touch' }}
      onTouchMove={(e) => e.stopPropagation()}
    >
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 bg-[#0B0B0A]/85 backdrop-blur-md cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <motion.div
        data-lenis-prevent
        className="relative z-10 w-full max-w-3xl bg-[#0E0E0D] border border-[#252422] text-[#F3F0E9] shadow-2xl overflow-hidden my-8"
        initial={{ opacity: 0, scale: 0.98, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 15 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#252422]">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-[0.2em] font-light uppercase">
              ÉLANE
            </span>
            <span className="text-[11px] tracking-[0.25em] text-[#77736D] uppercase">
              / CONCIERGE CHECKOUT
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1 text-[#77736D] hover:text-[#F3F0E9] transition-colors cursor-pointer"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {orderConfirmed ? (
          /* Confirmation Screen */
          <div className="p-8 md:p-12 text-center flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-14 h-14 rounded-full border border-[#C9BDAA] flex items-center justify-center text-[#C9BDAA] mb-6"
            >
              <CheckCircle2 className="w-7 h-7 stroke-[1.5]" />
            </motion.div>

            <span className="text-xs font-mono tracking-widest text-[#C9BDAA] uppercase mb-2">
              ACQUISITION CONFIRMED
            </span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#F3F0E9] tracking-wide uppercase mb-3">
              WEAR THE MOVEMENT.
            </h3>
            <p className="text-sm text-[#77736D] max-w-md mb-8">
              Your garments are being prepared at the Johannesburg atelier. A confirmation dossier has been dispatched to {formData.email}.
            </p>

            <div className="w-full max-w-md bg-[#161614] border border-[#252422] p-5 text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-[#77736D]">ORDER REFERENCE:</span>
                <span className="font-mono text-[#F3F0E9] font-medium tracking-wider">
                  {orderConfirmed.orderNumber}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77736D]">DATE:</span>
                <span className="text-[#F3F0E9]">{orderConfirmed.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#77736D]">DISPATCH DESTINATION:</span>
                <span className="text-[#F3F0E9] text-right truncate max-w-[200px]">
                  {formData.address}, {formData.city}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#252422]">
                <span className="text-[#77736D]">FULFILMENT STATUS:</span>
                <span className="text-[#C9BDAA] font-medium tracking-wider">
                  PREPARING ARCHIVAL SHIPMENT
                </span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors cursor-pointer"
            >
              RETURN TO ÉLANE
            </button>
          </div>
        ) : (
          /* Form & Order Review */
          <div className="grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-[#252422]">
            {/* Left: Customer & Delivery Details */}
            <form onSubmit={handleSubmit} className="md:col-span-7 p-6 md:p-8 space-y-5">
              <div>
                <h4 className="font-serif text-lg tracking-wider uppercase text-[#F3F0E9]">
                  DELIVERY DESTINATION
                </h4>
                <p className="text-xs text-[#77736D] mt-0.5">
                  Archival delivery via insured tracked courier.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#77736D] mb-1">
                    FULL NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161614] border border-[#252422] px-3.5 py-2.5 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#77736D] mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#161614] border border-[#252422] px-3.5 py-2.5 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#77736D] mb-1">
                      PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#161614] border border-[#252422] px-3.5 py-2.5 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] tracking-[0.2em] uppercase text-[#77736D] mb-1">
                    STREET ADDRESS
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-[#161614] border border-[#252422] px-3.5 py-2.5 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#77736D] mb-1">
                      CITY
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-[#161614] border border-[#252422] px-3.5 py-2.5 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase text-[#77736D] mb-1">
                      POSTAL CODE
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-[#161614] border border-[#252422] px-3.5 py-2.5 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Payment note */}
              <div className="pt-2">
                <div className="p-3 bg-[#161614] border border-[#252422] flex items-start gap-2.5 text-[11px] text-[#77736D]">
                  <ShieldCheck className="w-4 h-4 text-[#C9BDAA] shrink-0 mt-0.5" />
                  <span>
                    Simulated atelier payment gateway. Order will be recorded and confirmed without debiting your payment instrument.
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full py-3.5 bg-[#F3F0E9] hover:bg-[#C9BDAA] disabled:opacity-50 text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors cursor-pointer"
              >
                {isSubmitting ? 'TRANSMITTING ACQUISITION...' : `COMPLETE ORDER — R${total.toLocaleString()}`}
              </button>
            </form>

            {/* Right: Order Summary */}
            <div className="md:col-span-5 p-6 md:p-8 bg-[#0B0B0A] flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-lg tracking-wider uppercase text-[#F3F0E9] mb-4">
                  PIECES SELECTED ({items.reduce((s, i) => s + i.quantity, 0)})
                </h4>

                <div className="max-h-64 overflow-y-auto space-y-4 pr-1">
                  {items.map((item) => (
                    <div
                      key={`${item.product.id}-${item.size}`}
                      className="flex gap-3 text-xs"
                    >
                      <img
                        src={item.product.primaryImage}
                        alt={item.product.name}
                        className="w-12 h-16 object-cover border border-[#252422] shrink-0"
                      />
                      <div className="flex-1">
                        <p className="font-serif uppercase text-[#F3F0E9]">
                          {item.product.name}
                        </p>
                        <p className="text-[#77736D] text-[11px]">
                          SIZE {item.size} × {item.quantity}
                        </p>
                        <p className="font-mono tabular-nums text-[#C9BDAA] mt-1">
                          R{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#252422] space-y-2 text-xs">
                <div className="flex justify-between text-[#77736D]">
                  <span>SUBTOTAL</span>
                  <span className="font-mono tabular-nums text-[#F3F0E9]">
                    R{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-[#77736D]">
                  <span>DELIVERY (SOUTH AFRICA)</span>
                  <span className="font-mono tabular-nums text-[#F3F0E9]">
                    {shippingAmount === 0 ? 'COMPLIMENTARY' : `R${shippingAmount}`}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#252422] text-[#F3F0E9] font-medium text-sm">
                  <span className="font-serif uppercase tracking-wider">TOTAL DUE</span>
                  <span className="font-mono tabular-nums text-[#F3F0E9]">
                    R{total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};

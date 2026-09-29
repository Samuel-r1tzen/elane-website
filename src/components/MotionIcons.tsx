import React from 'react';

export const ShoppingCartInMotionIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4'
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Trailing speed / wind motion lines behind the cart */}
    <path d="M1 7h3.2" strokeWidth="1.4" opacity="0.65" strokeDasharray="1.5 1.5" />
    <path d="M0.5 11h4.2" strokeWidth="1.6" opacity="0.95" />
    <path d="M1.8 15h3" strokeWidth="1.4" opacity="0.65" />

    {/* Forward-leaning kinetic shopping cart body */}
    <path d="M5.5 6h3.2l1.6 8.2a1.4 1.4 0 0 0 1.38 1.13h7.64a1.4 1.4 0 0 0 1.37-1.11l1.31-6.22H6.8" />

    {/* Front motion dash */}
    <path d="M21.5 7.5l1.2-.8" strokeWidth="1.3" opacity="0.8" />

    {/* Rolling wheels */}
    <circle cx="11.75" cy="19.25" r="1.5" />
    <circle cx="18.75" cy="19.25" r="1.5" />

    {/* Wheel rotation speed trails */}
    <path d="M8.5 19.8h1" strokeWidth="1.2" opacity="0.6" />
    <path d="M15.5 19.8h1" strokeWidth="1.2" opacity="0.6" />
  </svg>
);

export const LuxuryShoppingBagIcon: React.FC<{ className?: string }> = ({
  className = 'w-4 h-4'
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {/* Bag body */}
    <path d="M6 3 3.5 7.5V20a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2V7.5L18 3Z" />
    {/* Fold line */}
    <path d="M3.5 7.5h17" />
    {/* Handle arch */}
    <path d="M16 11.5a4 4 0 0 1-8 0" />
  </svg>
);

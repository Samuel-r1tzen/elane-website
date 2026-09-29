import React from 'react';

export interface SocialLink {
  name: string;
  url: string;
  icon: (className?: string) => React.ReactNode;
}

export const InstagramIcon = (className = 'w-4 h-4') => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const ThreadsIcon = (className = 'w-4 h-4') => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
  </svg>
);

export const XIcon = (className = 'w-4 h-4') => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const FacebookIcon = (className = 'w-4 h-4') => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const TikTokIcon = (className = 'w-4 h-4') => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const PinterestIcon = (className = 'w-4 h-4') => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.185-.331 1.348-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const SOCIAL_CHANNELS: { name: string; url: string; handle: string; renderIcon: (cls?: string) => React.ReactNode }[] = [
  {
    name: 'Instagram',
    url: 'https://instagram.com',
    handle: '@elane.movement',
    renderIcon: (cls = 'w-4 h-4') => InstagramIcon(cls)
  },
  {
    name: 'Threads',
    url: 'https://threads.net/@elane.movement',
    handle: '@elane.movement',
    renderIcon: (cls = 'w-4 h-4') => ThreadsIcon(cls)
  },
  {
    name: 'X',
    url: 'https://x.com',
    handle: '@elane_movement',
    renderIcon: (cls = 'w-3.5 h-3.5') => XIcon(cls)
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com',
    handle: 'ÉLANE Official',
    renderIcon: (cls = 'w-4 h-4') => FacebookIcon(cls)
  },
  {
    name: 'TikTok',
    url: 'https://tiktok.com',
    handle: '@elane_atelier',
    renderIcon: (cls = 'w-4 h-4') => TikTokIcon(cls)
  },
  {
    name: 'Pinterest',
    url: 'https://pinterest.com',
    handle: 'elane_aesthetic',
    renderIcon: (cls = 'w-4 h-4') => PinterestIcon(cls)
  }
];

export const SocialMediaBar: React.FC<{ className?: string; iconOnly?: boolean; variant?: 'subtle' | 'solid' }> = ({
  className = '',
  iconOnly = false,
  variant = 'subtle'
}) => {
  return (
    <div className={`flex items-center gap-3 sm:gap-4 flex-wrap ${className}`}>
      {SOCIAL_CHANNELS.map((ch) => (
        <a
          key={ch.name}
          href={ch.url}
          target="_blank"
          rel="noreferrer"
          title={ch.name}
          className={`flex items-center gap-2 text-xs transition-all duration-300 py-1 px-1.5 rounded group cursor-pointer ${
            variant === 'solid'
              ? 'bg-[#161614] border border-[#252422] text-[#C9BDAA] hover:text-[#F3F0E9] hover:border-[#C9BDAA]'
              : 'text-[#77736D] hover:text-[#F3F0E9]'
          }`}
          aria-label={ch.name}
        >
          <span className="transition-transform duration-300 group-hover:scale-110 text-[#C9BDAA] group-hover:text-[#F3F0E9]">
            {ch.renderIcon()}
          </span>
          {!iconOnly && (
            <span className="font-sans text-[11px] tracking-widest uppercase hidden md:inline">
              {ch.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};

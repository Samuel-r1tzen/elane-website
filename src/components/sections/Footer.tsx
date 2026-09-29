import React, { useState } from 'react';
import { ArrowRight, Check, MapPin, Mail, Phone, Clock } from 'lucide-react';
import { PageView } from '../../types';
import { SOCIAL_CHANNELS } from '../SocialIcons';
import { ShoppingCartInMotionIcon } from '../MotionIcons';

interface FooterProps {
  onNavigate: (view: PageView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="relative w-full bg-[#0B0B0A] text-[#F3F0E9] pt-24 pb-12 px-6 md:px-12 border-t border-[#252422] select-none">
      <div className="max-w-7xl mx-auto flex flex-col justify-between">
        {/* Top Tier: Giant Brand Wordmark & Tagline */}
        <div className="border-b border-[#252422] pb-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div>
              <span className="text-xs font-mono tracking-[0.35em] text-[#A66A45] uppercase block mb-3">
                CONTEMPORARY FASHION LABEL
              </span>
              <h2 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] tracking-[0.08em] sm:tracking-[0.1em] font-light uppercase text-[#F3F0E9] leading-none">
                ÉLANE
              </h2>
            </div>

            <div className="lg:text-right max-w-sm">
              <p className="font-serif italic text-2xl sm:text-3xl text-[#C9BDAA]">
                WEAR THE MOVEMENT.
              </p>
              <p className="text-xs text-[#77736D] mt-2 font-sans font-light leading-relaxed">
                Obsidian tailoring, organic textiles, and anatomical silhouettes engineered for perpetual motion.
              </p>
            </div>
          </div>
        </div>

        {/* Middle Tier: Navigation Links, Atelier & Contact Details, Socials, and Newsletter */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 md:gap-10 lg:gap-12 py-12 md:py-16 border-b border-[#252422]">
          {/* Main Links */}
          <div className="sm:col-span-1 md:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#77736D] uppercase block">
              DIRECTORY
            </span>
            <ul className="space-y-2.5 text-xs font-sans tracking-[0.2em] uppercase">
              <li>
                <button
                  onClick={() => onNavigate('shop')}
                  className="group text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer flex items-center gap-2"
                >
                  <ShoppingCartInMotionIcon className="w-3.5 h-3.5 text-[#C9BDAA] group-hover:text-[#F3F0E9] transition-transform group-hover:translate-x-0.5 duration-300" />
                  <span>SHOP COLLECTION</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collection')}
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                >
                  THE ESSENTIALS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('campaign')}
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                >
                  CAMPAIGN 01 / MOTION
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('journal')}
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                >
                  THE JOURNAL
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const el = document.getElementById('faq-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onNavigate('home');
                  }}
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                >
                  CLIENT FAQS
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                >
                  ABOUT ÉLANE
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors cursor-pointer"
                >
                  CONTACT & ATELIER
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Atelier Address */}
          <div className="sm:col-span-1 md:col-span-4 lg:col-span-3 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block">
              ATELIER & CONTACT
            </span>

            <div className="space-y-3.5 text-xs font-sans">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9BDAA] shrink-0 mt-0.5" />
                <div className="space-y-0.5 leading-relaxed">
                  <p className="font-serif text-[#F3F0E9] text-sm uppercase tracking-wide">
                    ÉLANE STUDIO
                  </p>
                  <p className="text-[#C9BDAA]">44 Stanley Avenue, Braamfontein Werf</p>
                  <p className="text-[#77736D]">Johannesburg, 2092, South Africa</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-3.5 h-3.5 text-[#C9BDAA] shrink-0" />
                <a
                  href="mailto:concierge@elane-atelier.com"
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] font-mono text-[11px] tracking-wide transition-colors"
                >
                  concierge@elane-atelier.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C9BDAA] shrink-0" />
                <a
                  href="tel:+27114821928"
                  className="text-[#C9BDAA] hover:text-[#F3F0E9] font-mono text-[11px] tracking-wide transition-colors"
                >
                  +27 (0)11 482 1928
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1.5 border-t border-[#252422]/60">
                <Clock className="w-3.5 h-3.5 text-[#77736D] shrink-0 mt-0.5" />
                <div className="text-[11px] text-[#77736D] leading-tight">
                  <p>MON – SAT: 10:00 – 18:00 SAST</p>
                  <p className="text-[10px] mt-0.5 text-[#C9BDAA]/70">BY PRIVATE APPOINTMENT</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Presence with crisp Icons including Facebook and X */}
          <div className="sm:col-span-1 md:col-span-5 lg:col-span-2 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#77736D] uppercase block">
              SOCIAL CHANNELS
            </span>
            <ul className="space-y-2.5 text-xs font-sans tracking-[0.16em] uppercase">
              {SOCIAL_CHANNELS.map((ch) => (
                <li key={ch.name}>
                  <a
                    href={ch.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-[#C9BDAA] hover:text-[#F3F0E9] transition-colors group"
                  >
                    <span className="text-[#C9BDAA] group-hover:text-[#F3F0E9] transition-transform group-hover:scale-110">
                      {ch.renderIcon('w-4 h-4')}
                    </span>
                    <span>{ch.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div className="sm:col-span-1 md:col-span-12 lg:col-span-4 space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#A66A45] uppercase block">
              JOIN THE ÉLANE JOURNAL
            </span>
            <p className="text-xs text-[#77736D] leading-relaxed">
              Receive private previews of upcoming drops, lookbook dossiers, and architectural design essays directly to your correspondence inbox.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 mt-3">
              <div className="relative flex-1">
                <input
                  type="email"
                  required
                  placeholder="YOUR EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#161614] border border-[#252422] px-4 py-3 text-xs tracking-wider text-[#F3F0E9] placeholder-[#77736D] focus:border-[#C9BDAA] focus:outline-none transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-[10px] font-sans tracking-[0.2em] uppercase font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
              >
                {isSubscribed ? (
                  <>
                    <span>ENROLLED</span>
                    <Check className="w-3.5 h-3.5 text-[#0B0B0A]" />
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#77736D] tracking-widest gap-4">
          <span>© 2026 ÉLANE. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#C9BDAA] cursor-pointer">PRIVACY POLICY</span>
            <span>·</span>
            <span className="hover:text-[#C9BDAA] cursor-pointer">TERMS OF SERVICE</span>
            <span>·</span>
            <span className="hover:text-[#C9BDAA] cursor-pointer">ETHICAL SOURCING</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

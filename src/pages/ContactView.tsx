import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Send, MapPin, Mail, Clock } from 'lucide-react';
import { SOCIAL_CHANNELS } from '../components/SocialIcons';

interface ContactViewProps {
  onBackHome: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onBackHome }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Client Concierge Inquiry',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: 'Client Concierge Inquiry', message: '' });
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0A] text-[#F3F0E9] pt-28 pb-24 px-6 md:px-12 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Top Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#252422] pb-6 mb-12">
          <button
            onClick={onBackHome}
            className="group flex items-center gap-2 text-xs font-sans tracking-[0.2em] text-[#77736D] hover:text-[#F3F0E9] uppercase transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>RETURN HOME</span>
          </button>
          <span className="font-mono text-xs text-[#C9BDAA]">
            CONCIERGE & ATELIER
          </span>
        </div>

        {/* Heading */}
        <div className="mb-14">
          <span className="text-xs font-mono tracking-[0.35em] text-[#A66A45] uppercase block mb-2">
            CORRESPONDENCE
          </span>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#F3F0E9] font-light">
            LET'S TALK.
          </h1>
          <p className="text-sm text-[#77736D] mt-3 font-sans max-w-lg">
            Direct your inquiries regarding bespoke fitting appointments, retail distribution, private orders, or editorial loans.
          </p>
        </div>

        {/* 2-Column Layout: Details on left, Contact Form on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Atelier Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 bg-[#121210] border border-[#252422] space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A66A45] uppercase">
                  ATELIER LOCATION
                </span>
                <div className="flex items-start gap-3 text-sm text-[#F3F0E9] pt-1">
                  <MapPin className="w-4 h-4 text-[#C9BDAA] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-serif text-lg">ÉLANE STUDIO</p>
                    <p className="text-xs text-[#77736D]">44 Stanley Avenue, Braamfontein Werf</p>
                    <p className="text-xs text-[#77736D]">Johannesburg, 2092, South Africa</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252422] space-y-1">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A66A45] uppercase">
                  DIRECT CONCIERGE
                </span>
                <div className="flex items-center gap-3 text-sm text-[#F3F0E9] pt-1">
                  <Mail className="w-4 h-4 text-[#C9BDAA]" />
                  <a
                    href="mailto:concierge@elane-atelier.com"
                    className="hover:text-[#C9BDAA] transition-colors font-mono text-xs"
                  >
                    concierge@elane-atelier.com
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-[#252422] space-y-2">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A66A45] uppercase">
                  SOCIAL ARCHIVE
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {SOCIAL_CHANNELS.map((ch) => (
                    <a
                      key={ch.name}
                      href={ch.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-2 bg-[#161614] border border-[#252422] hover:border-[#C9BDAA] text-xs text-[#C9BDAA] hover:text-[#F3F0E9] transition-all group"
                    >
                      <span className="text-[#C9BDAA] group-hover:text-[#F3F0E9] transition-transform group-hover:scale-110">
                        {ch.renderIcon('w-4 h-4')}
                      </span>
                      <div className="truncate">
                        <p className="font-sans text-[10px] tracking-wider uppercase text-[#F3F0E9]">
                          {ch.name}
                        </p>
                        <p className="text-[10px] font-mono text-[#77736D] truncate">
                          {ch.handle}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#252422] space-y-1">
                <span className="text-[10px] font-mono tracking-[0.25em] text-[#A66A45] uppercase">
                  CONSULTATION HOURS
                </span>
                <div className="flex items-center gap-3 text-xs text-[#77736D] pt-1">
                  <Clock className="w-4 h-4 text-[#C9BDAA]" />
                  <span>Tuesday – Saturday, 10:00 – 18:00 SAST</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#121210] border border-[#252422] p-8 md:p-10">
            {isSent ? (
              <div className="py-16 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-[#C9BDAA] mb-4" />
                <h3 className="font-serif text-3xl uppercase text-[#F3F0E9] mb-2">
                  TRANSMISSION RECEIVED
                </h3>
                <p className="text-xs text-[#77736D] max-w-sm mb-6 leading-relaxed">
                  Thank you for your correspondence. The ÉLANE concierge will respond to your inquiry within 24 operational hours.
                </p>
                <button
                  onClick={() => setIsSent(false)}
                  className="px-6 py-2.5 bg-[#F3F0E9] text-[#0B0B0A] text-xs font-sans tracking-[0.2em] uppercase font-semibold hover:bg-[#C9BDAA] transition-colors"
                >
                  SEND ANOTHER DISPATCH
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#77736D] mb-1.5">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Julian Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161614] border border-[#252422] px-4 py-3 text-xs text-[#F3F0E9] placeholder-[#77736D]/60 focus:border-[#C9BDAA] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#77736D] mb-1.5">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. julian@studio.co.za"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#161614] border border-[#252422] px-4 py-3 text-xs text-[#F3F0E9] placeholder-[#77736D]/60 focus:border-[#C9BDAA] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#77736D] mb-1.5">
                    SUBJECT OF INQUIRY
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#161614] border border-[#252422] px-4 py-3 text-xs text-[#F3F0E9] focus:border-[#C9BDAA] focus:outline-none cursor-pointer"
                  >
                    <option value="Client Concierge Inquiry">Client Concierge Inquiry</option>
                    <option value="Private Fitting Appointment">Private Fitting Appointment</option>
                    <option value="Wholesale / Stockist Inquiries">Wholesale / Stockist Inquiries</option>
                    <option value="Press & Editorial Loans">Press & Editorial Loans</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-sans tracking-[0.2em] uppercase text-[#77736D] mb-1.5">
                    MESSAGE
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe your inquiry or requested sizing consultation..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#161614] border border-[#252422] px-4 py-3 text-xs text-[#F3F0E9] placeholder-[#77736D]/60 focus:border-[#C9BDAA] focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#F3F0E9] hover:bg-[#C9BDAA] text-[#0B0B0A] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND MESSAGE'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { BusinessConfig, HeroConfig } from '../types';
import { ArrowRight, Sparkles, ShieldCheck, CheckCircle2, MessageCircle, Play } from 'lucide-react';
import { DynamicIcon } from './DynamicIcon';
import { formatPhoneNumberForWa } from '../utils/whatsapp';

interface HeroProps {
  business: BusinessConfig;
  heroConfig: HeroConfig;
  onExploreServices: () => void;
  onNavigateContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  business,
  heroConfig,
  onExploreServices,
  onNavigateContact,
}) => {
  const directWaUrl = `https://wa.me/${formatPhoneNumberForWa(
    business.whatsappNumber
  )}?text=${encodeURIComponent(
    `Halo Tim ${business.brandName}, saya tertarik untuk konsultasi mengenai solusi digital untuk bisnis saya.`
  )}`;

  return (
    <section className="relative overflow-hidden bg-[#071A3D] text-white pt-10 pb-20 lg:pt-16 lg:pb-28">
      {/* Background Decorative Gradients & Mesh Glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none translate-y-1/3"></div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copy & Action Calls */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Kicker Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-cyan-500/30 text-cyan-300 text-xs sm:text-sm font-semibold shadow-inner">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span>{heroConfig.kickerText || 'Solusi Bisnis & UMKM Modern'}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-heading text-white">
              {heroConfig.headline}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 drop-shadow-sm">
                {heroConfig.headlineHighlight}
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {heroConfig.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onExploreServices}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{heroConfig.ctaPrimaryText || 'Explore Services'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700/90 text-slate-100 border border-slate-600 hover:border-cyan-400 font-semibold text-base transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>{heroConfig.ctaSecondaryText || 'Contact Us'}</span>
              </a>
            </div>

            {/* Verified Trust Badge Indicator */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>{heroConfig.badgeText || 'Terpercaya & Legalitas Lengkap'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garansi Kepuasan & Support</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Digital Showcase Card */}
          <div className="lg:col-span-5 relative">
            {/* Glow frame behind card */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 rounded-3xl blur-lg opacity-40 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-[#071A3D]/95 border border-blue-500/30 p-6 shadow-2xl backdrop-blur-xl">
              {/* Window Header */}
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <div className="px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-cyan-300 font-mono flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>{business.brandName.toLowerCase().replace(/\s+/g, '')}.com/live</span>
                </div>
              </div>

              {/* Inside Showcase Graphic */}
              <div className="space-y-4">
                {/* Active Solution Banner */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-blue-900/40 via-slate-800/60 to-slate-900/40 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase font-bold tracking-wider text-cyan-400">
                      Ekosistem Digital Terintegrasi
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Active 2025
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {business.brandName} Digital Hub
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    {business.slogan}
                  </p>
                </div>

                {/* Feature Highlight Indicators */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">Arsitektur & Akses</div>
                    <div className="text-base font-bold text-cyan-400 flex items-center gap-1 mt-0.5">
                      <span>Cepat & Responsif</span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-1">Mobile & Desktop Ready</div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60">
                    <div className="text-[11px] text-slate-400">Pemesanan & Order</div>
                    <div className="text-base font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
                      <span>WhatsApp Direct</span>
                    </div>
                    <div className="text-[10px] text-cyan-400 mt-1">Auto Invoice Generator</div>
                  </div>
                </div>

                {/* Live Channels list */}
                <div className="p-3.5 rounded-xl bg-blue-950/40 border border-blue-500/20 space-y-2">
                  <div className="text-xs font-semibold text-slate-200 flex items-center justify-between">
                    <span>Keunggulan Layanan NASLA DIGITAL:</span>
                    <span className="text-[10px] text-cyan-400 font-mono">Modern & Terpercaya</span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                      <span>Katalog Produk & Portfolio Interaktif</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                      <span>WhatsApp Direct Order & Auto Invoice</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
                      <span>Dashboard Admin CMS & Multi Preset</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Statistics Strip */}
        <div className="mt-16 pt-10 border-t border-blue-900/40 grid grid-cols-2 md:grid-cols-4 gap-6">
          {heroConfig.stats.map((st) => (
            <div
              key={st.id}
              className="p-4 rounded-xl bg-slate-900/60 border border-blue-900/40 hover:border-cyan-500/40 transition-all text-center sm:text-left"
            >
              <div className="flex items-center justify-center sm:justify-start gap-2.5 mb-1.5">
                {st.iconName && (
                  <div className="p-1.5 rounded-lg bg-blue-950 text-cyan-400 border border-blue-800">
                    <DynamicIcon name={st.iconName} className="w-4 h-4" />
                  </div>
                )}
                <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-cyan-300 font-heading">
                  {st.value}
                </div>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200">{st.label}</div>
              {st.subtext && <div className="text-[11px] text-slate-400 mt-0.5">{st.subtext}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

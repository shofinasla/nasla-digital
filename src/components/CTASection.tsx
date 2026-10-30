import React from 'react';
import { BusinessConfig } from '../types';
import { ArrowRight, MessageCircle, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatPhoneNumberForWa } from '../utils/whatsapp';

interface CTASectionProps {
  business: BusinessConfig;
  onNavigateContact?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  business,
  onNavigateContact,
}) => {
  const directWaUrl = `https://wa.me/${formatPhoneNumberForWa(
    business.whatsappNumber
  )}?text=${encodeURIComponent(
    `Halo Tim ${business.brandName}, saya ingin konsultasi dan memulai proyek digital untuk bisnis saya.`
  )}`;

  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#071A3D] via-[#0B3D91] to-slate-900 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-400/15 rounded-full blur-3xl pointer-events-none -translate-y-1/3 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/3"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Mulai Transformasi Sekarang</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              Siap Membawa Bisnis Anda ke Tingkat Selanjutnya?
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Diskusikan ide, visi, dan target bisnis Anda bersama tim konsultan {business.brandName}. Kami siap merancang solusi digital terbaik yang tepat sasaran.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                href={directWaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-base shadow-xl shadow-cyan-400/20 transition-all flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
              >
                <MessageCircle className="w-5 h-5 text-slate-950 fill-slate-950" />
                <span>Konsultasi WhatsApp Sekarang</span>
              </a>

              {onNavigateContact && (
                <button
                  onClick={onNavigateContact}
                  className="w-full sm:w-auto px-7 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lihat Opsi Kontak Lainnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Konsultasi Awal Bebas Biaya</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Garansi Kerahasiaan Brief</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

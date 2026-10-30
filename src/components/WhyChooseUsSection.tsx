import React from 'react';
import { WhyChooseUsItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface WhyChooseUsSectionProps {
  items: WhyChooseUsItem[];
  brandName: string;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  items,
  brandName,
}) => {
  return (
    <section className="py-20 lg:py-28 bg-[#071A3D] text-white relative overflow-hidden">
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Keunggulan Kompetitif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Mengapa Memilih {brandName}?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Kami mengutamakan kualitas eksekusi, kecepatan performa, dan kemudahan pengelolaan jangka panjang untuk setiap klien kami.
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-slate-900/80 border border-blue-900/40 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                  <DynamicIcon name={item.iconName} className="w-7 h-7" />
                </div>
                {item.badge && (
                  <span className="px-3 py-1 rounded-full bg-blue-950 text-cyan-300 border border-blue-800 text-xs font-semibold">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

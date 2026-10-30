import React from 'react';
import { BusinessConfig, VisionMissionConfig, Milestone } from '../types';
import { DynamicIcon } from './DynamicIcon';
import { CheckCircle2, Award, ShieldCheck, ArrowRight, Building, Sparkles } from 'lucide-react';

interface AboutSectionProps {
  business: BusinessConfig;
  visionMission: VisionMissionConfig;
  milestones?: Milestone[];
  onNavigateAbout?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  business,
  visionMission,
  milestones,
  onNavigateAbout,
}) => {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Tentang {business.brandName}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Mitra Terpercaya Menuju Kesuksesan di Era Digital
          </h2>
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            {business.description}
          </p>
        </div>

        {/* Vision & Mission Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Vision Card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-gradient-to-br from-[#071A3D] to-[#0B3D91] text-white shadow-xl relative overflow-hidden flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none"></div>
            <div>
              <div className="flex items-center gap-3.5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-lg shadow-cyan-500/20 flex-shrink-0">
                  <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1">
                    <img
                      src={business.logoUrl || '/logo.png'}
                      alt={business.brandName}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-300 font-semibold block">
                    Brand Resmi
                  </span>
                  <span className="text-lg font-bold font-heading text-white">
                    {business.brandName}
                  </span>
                </div>
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-white">
                {visionMission.visionTitle}
              </h3>
              <p className="text-slate-200 text-base leading-relaxed">
                {visionMission.visionText}
              </p>
            </div>

            {/* Legal Badges */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 gap-4 text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-cyan-300 block font-semibold">BADAN USAHA:</span>
                <span className="font-bold text-white">{business.legalEntity}</span>
              </div>
              <div>
                <span className="text-[10px] text-cyan-300 block font-semibold">IZIN & LEGALITAS:</span>
                <span className="font-bold text-white">{business.licenseNumber}</span>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-4 text-slate-900">
                {visionMission.missionTitle}
              </h3>
              <div className="space-y-3.5">
                {visionMission.missions.map((m, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <p className="text-slate-700 text-sm sm:text-base leading-relaxed">{m}</p>
                  </div>
                ))}
              </div>
            </div>

            {onNavigateAbout && (
              <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={onNavigateAbout}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
                >
                  <span>Lihat Selengkapnya Tentang Kami & Tim</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4 Core Values */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-heading">
              {visionMission.valuesHeading}
            </h3>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              {visionMission.valuesSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionMission.values.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200/60 text-blue-600 flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <DynamicIcon name={val.iconName} className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 font-heading mb-2 group-hover:text-blue-600 transition-colors">
                  {val.title}
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

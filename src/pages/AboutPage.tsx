import React from 'react';
import {
  BusinessConfig,
  VisionMissionConfig,
  TeamMember,
  Milestone,
} from '../types';
import { DynamicIcon } from '../components/DynamicIcon';
import {
  Building2,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  CheckCircle2,
  Linkedin,
  Clock,
  ArrowRight,
} from 'lucide-react';

interface AboutPageProps {
  business: BusinessConfig;
  visionMission: VisionMissionConfig;
  teamMembers: TeamMember[];
  milestones: Milestone[];
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  business,
  visionMission,
  teamMembers,
  milestones,
  onNavigateContact,
}) => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Page Hero Header */}
      <section className="bg-[#071A3D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Tentang Perusahaan</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight">
            Membangun Masa Depan Digital Bersama {business.brandName}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            {business.slogan}
          </p>
        </div>
      </section>

      {/* Company Story & Identity */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                CERITA & LATAR BELAKANG
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Dedikasi untuk Kemajuan Bisnis & Digitalisasi Indonesia
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {business.description}
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Didirikan sejak tahun <strong>{business.establishedYear}</strong> oleh <strong>{business.ownerName}</strong>, kami berfokus membantu para pelaku usaha memiliki identitas digital yang profesional, sistem penjualan mandiri, dan integrasi komunikasi instan melalui WhatsApp.
              </p>

              {/* Official legal credentials */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block font-semibold">BADAN HUKUM:</span>
                  <span className="font-bold text-slate-900 text-sm">{business.legalEntity}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">NOMOR LEGALITAS / NIB:</span>
                  <span className="font-bold text-slate-900 text-sm">{business.licenseNumber}</span>
                </div>
              </div>
            </div>

            {/* Right side visual badge card */}
            <div className="lg:col-span-6">
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#071A3D] to-[#0B3D91] text-white shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-xl shadow-cyan-500/20 flex-shrink-0">
                    <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1.5">
                      <img
                        src={business.logoUrl || '/logo.png'}
                        alt={business.brandName}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-semibold block">
                      Brand Resmi
                    </span>
                    <span className="text-xl font-bold font-heading text-white">
                      {business.brandName}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-heading mb-4 text-white">
                  {visionMission.visionTitle}
                </h3>
                <p className="text-slate-200 text-base leading-relaxed mb-8">
                  {visionMission.visionText}
                </p>

                <div className="pt-6 border-t border-white/15">
                  <h4 className="text-sm font-bold text-cyan-300 uppercase tracking-wider mb-3">
                    {visionMission.missionTitle}:
                  </h4>
                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                    {visionMission.missions.map((m, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values 4 Pillars */}
      <section className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
              PRINSIP DASAR
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
              {visionMission.valuesHeading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              {visionMission.valuesSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionMission.values.map((val) => (
              <div
                key={val.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <DynamicIcon name={val.iconName} className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-slate-900 font-heading mb-2">{val.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones Roadmap */}
      {milestones && milestones.length > 0 && (
        <section className="py-20 bg-white border-t border-slate-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                PERJALANAN KAMI
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Milestone & Perkembangan
              </h2>
            </div>

            <div className="space-y-6 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-blue-200">
              {milestones.map((ms, idx) => (
                <div
                  key={ms.id || idx}
                  className={`relative flex flex-col md:flex-row items-start ${
                    idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-blue-100 z-10 mt-6"></div>

                  {/* Card Content */}
                  <div className="ml-10 md:ml-0 md:w-1/2 md:px-8">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm hover:border-blue-300 transition-all">
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold font-mono inline-block mb-2">
                        {ms.year}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 font-heading mb-1">
                        {ms.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{ms.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership & Team */}
      {teamMembers && teamMembers.length > 0 && (
        <section className="py-20 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                TIM & ARSITEK
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Para Ahli di Balik {business.brandName}
              </h2>
              <p className="text-slate-600 text-sm">
                Didukung oleh talenta berpengalaman di bidang software engineering, UI/UX, SEO, dan strategi bisnis.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center flex flex-col justify-between group hover:shadow-xl hover:border-blue-300 transition-all"
                >
                  <div>
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#071A3D] to-blue-600 text-white font-extrabold text-2xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:scale-105 transition-transform">
                      {member.initials}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">{member.name}</h3>
                    <p className="text-xs text-blue-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100 flex justify-center">
                    <a
                      href={member.linkedinUrl || 'https://linkedin.com'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition-colors"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-16 bg-[#071A3D] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-extrabold font-heading">
            Mari Berkolaborasi dan Wujudkan Solusi Digital Bisnis Anda
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            Diskusikan kebutuhan spesifik Anda dengan tim kami tanpa komitmen awal.
          </p>
          <button
            onClick={onNavigateContact}
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2 mx-auto cursor-pointer"
          >
            <span>Hubungi Kami Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

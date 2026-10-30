import React from 'react';
import { HeroConfig } from '../../types';
import { LayoutDashboard, Sparkles } from 'lucide-react';

interface HeroEditorProps {
  heroConfig: HeroConfig;
  onChange: (updated: HeroConfig) => void;
}

export const HeroEditor: React.FC<HeroEditorProps> = ({ heroConfig, onChange }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <LayoutDashboard className="w-5 h-5 text-cyan-400" />
          <span>Editor Hero Banner</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Sesuaikan teks headline utama, subheadline, tombol CTA, dan angka statistik trust badge di halaman depan.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Teks Kicker / Badge Atas
          </label>
          <input
            type="text"
            value={heroConfig.kickerText}
            onChange={(e) => onChange({ ...heroConfig, kickerText: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Headline Utama (Bagian 1)
            </label>
            <input
              type="text"
              value={heroConfig.headline}
              onChange={(e) => onChange({ ...heroConfig, headline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-cyan-300 block mb-1">
              Headline Highlight Gradient (Bagian 2)
            </label>
            <input
              type="text"
              value={heroConfig.headlineHighlight}
              onChange={(e) => onChange({ ...heroConfig, headlineHighlight: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Subheadline Deskriptif
          </label>
          <textarea
            rows={3}
            value={heroConfig.subheadline}
            onChange={(e) => onChange({ ...heroConfig, subheadline: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Teks Tombol CTA 1
            </label>
            <input
              type="text"
              value={heroConfig.ctaPrimaryText}
              onChange={(e) => onChange({ ...heroConfig, ctaPrimaryText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Teks Tombol CTA 2 (WhatsApp)
            </label>
            <input
              type="text"
              value={heroConfig.ctaSecondaryText}
              onChange={(e) => onChange({ ...heroConfig, ctaSecondaryText: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* 4 Trust Stats counters */}
        <div className="pt-4 border-t border-slate-700/60">
          <span className="text-xs font-bold text-cyan-300 block mb-3">
            4 Indikator Statistik Trust Bar:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {heroConfig.stats.map((st, idx) => (
              <div key={st.id} className="p-3 rounded-xl bg-slate-900 border border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-400">Stat #{idx + 1}</span>
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => {
                      const updated = [...heroConfig.stats];
                      updated[idx].value = e.target.value;
                      onChange({ ...heroConfig, stats: updated });
                    }}
                    placeholder="Contoh: 100+"
                    className="w-24 px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs font-bold text-cyan-300 text-right"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => {
                      const updated = [...heroConfig.stats];
                      updated[idx].label = e.target.value;
                      onChange({ ...heroConfig, stats: updated });
                    }}
                    placeholder="Label (Proyek Selesai)"
                    className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs text-white"
                  />
                  <input
                    type="text"
                    value={st.subtext || ''}
                    onChange={(e) => {
                      const updated = [...heroConfig.stats];
                      updated[idx].subtext = e.target.value;
                      onChange({ ...heroConfig, stats: updated });
                    }}
                    placeholder="Subteks (Website & App)"
                    className="w-full px-2 py-1 rounded bg-slate-800 border border-slate-600 text-xs text-slate-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

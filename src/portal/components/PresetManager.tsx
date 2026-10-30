import React from 'react';
import { TemplatePreset } from '../../types';
import { templatePresets } from '../../data/presets';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface PresetManagerProps {
  onApplyPreset: (preset: TemplatePreset) => void;
}

export const PresetManager: React.FC<PresetManagerProps> = ({ onApplyPreset }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span>1-Click Preset Template Industri</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Pilih salah satu preset di bawah ini untuk langsung mengisi seluruh website dengan konten, layanan, produk, dan teks yang sesuai dengan jenis bisnis Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {templatePresets.map((preset) => (
          <div
            key={preset.id}
            className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 hover:border-cyan-400 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-blue-950 text-cyan-300 text-[11px] font-semibold border border-blue-800/60">
                  {preset.badge}
                </span>
                <span className="text-xs text-slate-400">{preset.category}</span>
              </div>
              <h3 className="text-base font-bold text-white mb-1.5 font-heading group-hover:text-cyan-300 transition-colors">
                {preset.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                {preset.description}
              </p>
            </div>

            <button
              onClick={() => onApplyPreset(preset)}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-cyan-500 hover:text-slate-950 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Terapkan Preset {preset.category}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

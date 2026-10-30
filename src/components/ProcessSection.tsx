import React from 'react';
import { ProcessStep } from '../types';
import { ArrowRight, CheckCircle, Sparkles, Workflow } from 'lucide-react';

interface ProcessSectionProps {
  steps: ProcessStep[];
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ steps }) => {
  return (
    <section className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>Alur Kerja Transparan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            5 Langkah Mudah Menuju Hasil Nyata
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Proses terstruktur yang menjamin setiap proyek terselesaikan tepat waktu, sesuai anggaran, dan melampaui ekspektasi Anda.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((st, idx) => (
            <div
              key={st.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all flex flex-col justify-between group relative"
            >
              <div>
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 font-heading">
                    {st.stepNumber}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                </div>

                <h3 className="text-base font-bold text-slate-900 font-heading mb-2 group-hover:text-blue-600 transition-colors">
                  {st.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  {st.description}
                </p>
              </div>

              {/* Output marker */}
              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] text-slate-400 font-semibold block uppercase">HASIL OUTPUT:</span>
                <span className="text-xs font-semibold text-blue-700">{st.keyOutput}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

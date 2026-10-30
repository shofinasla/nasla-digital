import React from 'react';
import { ArrowLeft, Home, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';

interface NotFoundPageProps {
  onNavigateHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-slate-50 text-slate-900">
      <div className="max-w-md w-full space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-400 p-0.5 mx-auto shadow-xl shadow-blue-500/20">
          <div className="w-full h-full bg-[#071A3D] rounded-[22px] flex items-center justify-center text-cyan-300 font-extrabold text-2xl font-mono">
            404
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold font-heading text-slate-900">
            Halaman Tidak Ditemukan
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            Halaman yang Anda tuju tidak tersedia atau tautan telah dipindahkan.
          </p>
        </div>

        <button
          onClick={onNavigateHome}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <div className="text-[11px] text-slate-400 pt-4 border-t border-slate-200">
          {SITE_CONFIG.templateName}
        </div>
      </div>
    </div>
  );
};

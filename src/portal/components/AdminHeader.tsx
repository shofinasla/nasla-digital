import React from 'react';
import { Save, Eye, LogOut, Check, RotateCcw, AlertTriangle } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';

interface AdminHeaderProps {
  brandName: string;
  savedNotice: boolean;
  onSave: () => void;
  onViewWebsite: () => void;
  onLogout: () => void;
  onReset: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  brandName,
  savedNotice,
  onSave,
  onViewWebsite,
  onLogout,
  onReset,
}) => {
  const [confirmReset, setConfirmReset] = React.useState(false);

  return (
    <>
      <header className="bg-[#071A3D] border-b border-blue-900/50 px-4 sm:px-6 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-md shrink-0">
            <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-0.5">
              <img
                src="/logo.png"
                alt="NASLA DIGITAL"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-bold text-white font-heading truncate max-w-[180px] sm:max-w-md">
              {brandName} — Demo CMS
            </h1>
            <span className="text-[10px] text-cyan-300 font-medium hidden sm:block">
              {SITE_CONFIG.templateName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {savedNotice && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/40 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>Tersimpan di Browser!</span>
            </div>
          )}

          <button
            onClick={onSave}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span className="hidden sm:inline">Simpan Perubahan</span>
          </button>

          <button
            onClick={() => setConfirmReset(true)}
            className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Reset Data Demo"
          >
            <RotateCcw className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Reset Demo</span>
          </button>

          <button
            onClick={onViewWebsite}
            className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            title="Lihat Website"
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Lihat Web</span>
          </button>

          <button
            onClick={onLogout}
            className="p-2 rounded-xl bg-slate-800 hover:bg-rose-900/50 text-slate-400 hover:text-rose-300 border border-slate-700 transition-all cursor-pointer"
            title="Keluar"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Confirmation Modal for Reset */}
      {confirmReset && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 text-slate-200 shadow-2xl animate-fadeIn space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-white">Reset Semua Data Demo?</h3>
              <p className="text-xs text-slate-400">
                Tindakan ini akan mengembalikan seluruh teks, produk, layanan, dan konfigurasi ke setelan awal template.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setConfirmReset(false)}
                className="px-4 py-2 rounded-xl text-slate-400 hover:bg-slate-800 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onReset();
                  setConfirmReset(false);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md"
              >
                Ya, Reset ke Default
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

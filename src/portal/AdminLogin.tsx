import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { Lock, User, KeyRound, ArrowLeft, ShieldAlert, CheckCircle2, Info } from 'lucide-react';
import { SITE_CONFIG } from '../config/site.config';
import { StorageService } from '../services/storage';

interface AdminLoginProps {
  business: BusinessConfig;
  onLoginSuccess: () => void;
  onReturnToWebsite: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  business,
  onLoginSuccess,
  onReturnToWebsite,
}) => {
  const [username, setUsername] = useState(SITE_CONFIG.DEMO_ADMIN_USERNAME);
  const [password, setPassword] = useState(SITE_CONFIG.DEMO_ADMIN_PASSWORD);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const isUserValid =
      username.trim().toLowerCase() === SITE_CONFIG.DEMO_ADMIN_USERNAME.toLowerCase() ||
      username.trim().toLowerCase() === SITE_CONFIG.DEMO_ADMIN_EMAIL.toLowerCase();
    const isPassValid = password.trim() === SITE_CONFIG.DEMO_ADMIN_PASSWORD;

    if (isUserValid && isPassValid) {
      StorageService.setItem(SITE_CONFIG.STORAGE_KEYS.AUTH_STATE, { loggedIn: true });
      onLoginSuccess();
    } else {
      setError('Kredensial demo tidak cocok. Gunakan username: admin dan password: demo-admin');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071A3D] via-[#0B3D91] to-slate-950 flex flex-col justify-center items-center p-4 text-slate-100 relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Return Button */}
      <button
        onClick={onReturnToWebsite}
        className="absolute top-6 left-6 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer backdrop-blur-md"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Website</span>
      </button>

      {/* Login Box */}
      <div className="w-full max-w-md bg-slate-900/95 border border-blue-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative z-10 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 mx-auto shadow-lg shadow-blue-500/30">
            <div className="w-full h-full bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1.5">
              <img
                src={business.logoUrl || '/logo.png'}
                alt={business.brandName}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-heading">
            Admin Demo CMS
          </h2>
          <p className="text-xs text-slate-400">
            {business.brandName} — {SITE_CONFIG.templateName}
          </p>
        </div>

        {/* Security / Demo Disclaimer Notice */}
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Mode Demo & Kustomisasi</span>
          </div>
          <p className="text-[11px] text-amber-200/80 leading-relaxed">
            Autentikasi ini ditujukan untuk demonstrasi lokal template. Untuk rilis produksi sebenarnya, hubungkan dengan backend auth pilihan Anda.
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Username / Email Demo
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1.5">
              Password Demo
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all cursor-pointer"
          >
            Masuk ke Panel Demo
          </button>
        </form>

        {/* Demo Credentials quick info */}
        <div className="pt-4 border-t border-slate-800 text-center">
          <span className="text-[11px] text-slate-400 block mb-1 font-medium">
            Kredensial Bawaan:
          </span>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-800 text-cyan-300 text-xs font-mono border border-slate-700">
            <span>User: <strong>admin</strong></span>
            <span>•</span>
            <span>Pass: <strong>demo-admin</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
};

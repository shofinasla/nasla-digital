import React, { useState } from 'react';
import { Download, Copy, Check, FileCode, ShieldCheck, Terminal, Globe, Rocket } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site.config';

interface SellerKitPanelProps {
  fullDataPayload: object;
}

export const SellerKitPanel: React.FC<SellerKitPanelProps> = ({ fullDataPayload }) => {
  const [copied, setCopied] = useState(false);
  const jsonString = JSON.stringify(fullDataPayload, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nasla-template-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-emerald-400 font-heading flex items-center gap-2">
          <FileCode className="w-5 h-5" />
          <span>Seller Kit & Export Konfigurasi</span>
        </h2>
        <p className="text-xs text-slate-300 mt-1">
          Bagi pembeli yang telah menyesuaikan konten melalui dashboard dan ingin mengekstrak data ke dalam kode permanen sebelum build ke production.
        </p>
      </div>

      {/* Export Card */}
      <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/50 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white">
              Export Data Konfigurasi Aktif (.JSON)
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Salin atau unduh data konfigurasi terkini untuk disimpan permanen.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer border border-slate-600"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Tersalin!' : 'Copy JSON'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download File .JSON</span>
            </button>
          </div>
        </div>

        {/* Quick Instructions */}
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 space-y-2.5 leading-relaxed">
          <div className="font-bold text-white flex items-center gap-1.5">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Panduan Cepat Pembeli Template (Developer & Non-Developer):</span>
          </div>
          <ol className="list-decimal pl-5 space-y-1.5 text-slate-400">
            <li>
              <strong>Ekstrak ZIP:</strong> Ekstrak file template yang diunduh dari Lynk.id ke folder komputer Anda.
            </li>
            <li>
              <strong>Instalasi:</strong> Buka terminal di folder project lalu jalankan <code className="text-cyan-300 font-mono bg-slate-800 px-1 py-0.5 rounded">npm install</code>
            </li>
            <li>
              <strong>Jalankan Lokal:</strong> Jalankan <code className="text-cyan-300 font-mono bg-slate-800 px-1 py-0.5 rounded">npm run dev</code> untuk melihat website di <code className="text-cyan-300 font-mono">http://localhost:3000</code>
            </li>
            <li>
              <strong>Build Production:</strong> Jalankan <code className="text-cyan-300 font-mono bg-slate-800 px-1 py-0.5 rounded">npm run build</code> untuk menghasilkan folder <code className="text-cyan-300 font-mono">dist</code>
            </li>
            <li>
              <strong>Deploy Gratis:</strong> Upload folder <code className="text-cyan-300 font-mono">dist</code> ke <strong>Vercel</strong>, <strong>Netlify</strong>, atau <strong>Cloudflare Pages</strong>.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

import React from 'react';

export const TrustSection: React.FC = () => {
  const partners = [
    { name: 'Alpha Retail Group', label: 'E-Commerce & Retail' },
    { name: 'Vanguard Contractor', label: 'Konstruksi & Properti' },
    { name: 'Optima Legal Partner', label: 'Firma Hukum & Konsultan' },
    { name: 'Nusantara Coffee Roastery', label: 'F&B & Kuliner UMKM' },
    { name: 'Logix Global Supply', label: 'Distributor & Supply Chain' },
    { name: 'Aura Living Studio', label: 'Desain & Creative Brand' },
  ];

  return (
    <section className="py-10 bg-slate-900 border-b border-blue-900/30 text-slate-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs uppercase font-bold tracking-widest text-cyan-400/90 mb-6 font-heading">
          Dipercaya oleh Berbagai Klien & Mitra Bisnis di Seluruh Indonesia
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 items-center justify-center">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/40 text-center transition-all group"
            >
              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                {partner.name}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">{partner.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ServiceItem, PricingPlan } from '../../types';
import { Zap, Plus, Trash2, Edit2, CheckCircle2 } from 'lucide-react';
import { formatRupiah } from '../../utils/whatsapp';

interface ServicesManagerProps {
  services: ServiceItem[];
  pricingPlans: PricingPlan[];
  onUpdateServices: (services: ServiceItem[]) => void;
  onUpdatePricing: (pricing: PricingPlan[]) => void;
}

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  services,
  pricingPlans,
  onUpdateServices,
  onUpdatePricing,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'services' | 'pricing'>('services');

  const handleAddService = () => {
    const newService: ServiceItem = {
      id: `srv-${Date.now()}`,
      title: 'Layanan Baru (Contoh)',
      category: 'General',
      shortDesc: 'Deskripsi singkat layanan baru Anda di sini.',
      fullDesc: 'Penjelasan menyeluruh mengenai fitur, proses, dan hasil akhir dari layanan ini.',
      iconName: 'sparkles',
      priceStartFrom: 1500000,
      priceFormatted: 'Mulai Rp 1.500.000',
      deliverables: ['Deliverable 1', 'Deliverable 2', 'Deliverable 3'],
      popular: false,
    };
    onUpdateServices([...services, newService]);
  };

  const handleDeleteService = (id: string) => {
    onUpdateServices(services.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Layanan & Paket Harga</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola kartu layanan bisnis, rincian benefit, serta 3 paket harga pilihan.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
            <button
              onClick={() => setActiveSubTab('services')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'services'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Layanan ({services.length})
            </button>
            <button
              onClick={() => setActiveSubTab('pricing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeSubTab === 'pricing'
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Paket Harga ({pricingPlans.length})
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'services' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleAddService}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Layanan Baru</span>
            </button>
          </div>

          <div className="space-y-4">
            {services.map((srv, idx) => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 font-mono">
                    Layanan #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleDeleteService(srv.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Hapus Layanan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="text-[11px] text-slate-400 block mb-1">Judul Layanan</label>
                    <input
                      type="text"
                      value={srv.title}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].title = e.target.value;
                        onUpdateServices(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Kategori</label>
                    <input
                      type="text"
                      value={srv.category}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].category = e.target.value;
                        onUpdateServices(updated);
                      }}
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Label Harga</label>
                    <input
                      type="text"
                      value={srv.priceFormatted || ''}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].priceFormatted = e.target.value;
                        onUpdateServices(updated);
                      }}
                      placeholder="Mulai Rp 2.500.000"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">Badge Populer (Opsional)</label>
                    <input
                      type="text"
                      value={srv.featuredBadge || ''}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[idx].featuredBadge = e.target.value;
                        onUpdateServices(updated);
                      }}
                      placeholder="Paling Diminati"
                      className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Deskripsi Singkat</label>
                  <textarea
                    rows={2}
                    value={srv.shortDesc}
                    onChange={(e) => {
                      const updated = [...services];
                      updated[idx].shortDesc = e.target.value;
                      onUpdateServices(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  ></textarea>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeSubTab === 'pricing' && (
        <div className="space-y-4">
          {pricingPlans.map((plan, idx) => (
            <div
              key={plan.id}
              className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-300">
                  Paket #{idx + 1}: {plan.name}
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  {formatRupiah(plan.price)} {plan.period}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Nama Paket</label>
                  <input
                    type="text"
                    value={plan.name}
                    onChange={(e) => {
                      const updated = [...pricingPlans];
                      updated[idx].name = e.target.value;
                      onUpdatePricing(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Harga (Angka)</label>
                  <input
                    type="number"
                    value={plan.price}
                    onChange={(e) => {
                      const updated = [...pricingPlans];
                      updated[idx].price = Number(e.target.value);
                      onUpdatePricing(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Periode (e.g. /proyek)</label>
                  <input
                    type="text"
                    value={plan.period}
                    onChange={(e) => {
                      const updated = [...pricingPlans];
                      updated[idx].period = e.target.value;
                      onUpdatePricing(updated);
                    }}
                    className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

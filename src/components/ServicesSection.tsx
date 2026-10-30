import React, { useState } from 'react';
import { BusinessConfig, ServiceItem, PricingPlan } from '../types';
import { DynamicIcon } from './DynamicIcon';
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  MessageCircle,
  X,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { buildServiceWaUrl, buildPricingPlanWaUrl, formatRupiah } from '../utils/whatsapp';

interface ServicesSectionProps {
  business: BusinessConfig;
  services: ServiceItem[];
  pricingPlans: PricingPlan[];
  showPricing?: boolean;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  business,
  services,
  pricingPlans,
  showPricing = true,
}) => {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [clientName, setClientName] = useState('');
  const [customNote, setCustomNote] = useState('');

  const handleOpenModal = (service: ServiceItem) => {
    setSelectedService(service);
    setClientName('');
    setCustomNote('');
  };

  const handleSendServiceInquiry = () => {
    if (!selectedService) return;
    const url = buildServiceWaUrl(business, selectedService, clientName, customNote);
    window.open(url, '_blank');
    setSelectedService(null);
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Layanan Unggulan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Solusi Digital Komprehensif untuk Menumbuhkan Bisnis
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Pilih layanan profesional yang dirancang khusus untuk mengoptimasi kinerja, visibilitas, dan profitabilitas bisnis Anda.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className={`rounded-3xl p-8 bg-white border transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1.5 ${
                service.popular
                  ? 'border-blue-400 shadow-xl shadow-blue-500/10 ring-1 ring-blue-400/30'
                  : 'border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md'
              }`}
            >
              <div>
                {/* Card Top */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                    <DynamicIcon name={service.iconName} className="w-7 h-7" />
                  </div>
                  {service.featuredBadge ? (
                    <span className="px-3 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-sm">
                      {service.featuredBadge}
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {service.category}
                    </span>
                  )}
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-bold text-slate-900 font-heading mb-3 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                {/* Deliverables snippet */}
                <div className="space-y-2 mb-6 pt-4 border-t border-slate-100">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {service.deliverables.length > 3 && (
                    <div className="text-[11px] text-blue-600 font-semibold pl-6">
                      +{service.deliverables.length - 3} benefit lainnya
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Price & Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium uppercase">INVESTASI:</span>
                  <span className="text-sm font-bold text-slate-900">
                    {service.priceFormatted || (service.priceStartFrom ? formatRupiah(service.priceStartFrom) : 'Konsultasi')}
                  </span>
                </div>

                <button
                  onClick={() => handleOpenModal(service)}
                  className="px-4 py-2 rounded-xl bg-slate-100 group-hover:bg-blue-600 text-slate-800 group-hover:text-white font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Detail & Pesan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pricing Plans Section */}
        {showPricing && pricingPlans && pricingPlans.length > 0 && (
          <div className="mt-20 pt-16 border-t border-slate-200">
            <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600">
                PILIHAN INVESTASI
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                Paket Layanan Siap Pakai
              </h3>
              <p className="text-slate-600 text-sm sm:text-base">
                Investasi transparan tanpa biaya tersembunyi. Dapatkan hasil maksimal untuk akselerasi bisnis Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {pricingPlans.map((plan) => {
                const planWaUrl = buildPricingPlanWaUrl(business, plan);
                return (
                  <div
                    key={plan.id}
                    className={`rounded-3xl p-8 bg-white border transition-all flex flex-col justify-between relative ${
                      plan.isPopular
                        ? 'border-blue-600 shadow-2xl shadow-blue-600/15 ring-2 ring-blue-600/50 scale-100 lg:-translate-y-2'
                        : 'border-slate-200 shadow-sm'
                    }`}
                  >
                    {plan.isPopular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                        Pilihan Terpopuler
                      </div>
                    )}

                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 font-heading">{plan.name}</h4>
                      <p className="text-slate-500 text-xs mt-1 min-h-[32px]">{plan.tagline}</p>

                      {/* Price Tag */}
                      <div className="my-6 pb-6 border-b border-slate-100">
                        <div className="flex items-baseline gap-1">
                          <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
                            {formatRupiah(plan.price)}
                          </span>
                          <span className="text-xs text-slate-500 font-medium">{plan.period}</span>
                        </div>
                      </div>

                      {/* Feature List */}
                      <div className="space-y-3 mb-8">
                        <div className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                          Termasuk Dalam Paket:
                        </div>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                            <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                        {plan.notIncluded?.map((notFeat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 line-through">
                            <X className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                            <span>{notFeat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <a
                      href={planWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full py-3.5 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2 transition-all ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/30'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                      }`}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{plan.buttonText || 'Pilih Paket Ini'}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Modal Detail Layanan & Fast WhatsApp Inquiry */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                  <DynamicIcon name={selectedService.iconName} className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 font-heading">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs text-blue-600 font-semibold">
                    Kategori: {selectedService.category}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-5">
              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-1">Deskripsi Lengkap:</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{selectedService.fullDesc}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-800 mb-2">Benefit & Deliverables:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-3">
                <div className="text-xs font-bold text-blue-900">
                  Kirim Pesan Langsung ke WhatsApp Tim {business.brandName}:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Nama Anda / Bisnis:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Bpk. Budi / CV Maju"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                      Catatan / Kebutuhan Khusus:
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Ingin konsultasi jadwal minggu ini"
                      value={customNote}
                      onChange={(e) => setCustomNote(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">ESTIMASI BIAYA:</span>
                <span className="text-base font-extrabold text-blue-700 font-heading">
                  {selectedService.priceFormatted || (selectedService.priceStartFrom ? formatRupiah(selectedService.priceStartFrom) : 'Konsultasi Gratis')}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedService(null)}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Batal
                </button>
                <button
                  onClick={handleSendServiceInquiry}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim ke WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

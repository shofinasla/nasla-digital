import React from 'react';
import {
  BusinessConfig,
  ServiceItem,
  PricingPlan,
  FAQItem,
} from '../types';
import { ServicesSection } from '../components/ServicesSection';
import { FAQSection } from '../components/FAQSection';
import { CTASection } from '../components/CTASection';
import { Zap, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ServicesPageProps {
  business: BusinessConfig;
  services: ServiceItem[];
  pricingPlans: PricingPlan[];
  faqs: FAQItem[];
  onNavigateContact: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  business,
  services,
  pricingPlans,
  faqs,
  onNavigateContact,
}) => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="bg-[#071A3D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Katalog Layanan & Investasi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight">
            Layanan Profesional untuk Pertumbuhan Bisnis Anda
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Dari pembuatan website, strategi pemasaran digital, hingga optimasi konversi penjualan terintegrasi WhatsApp.
          </p>
        </div>
      </section>

      {/* Services List with Pricing */}
      <ServicesSection
        business={business}
        services={services}
        pricingPlans={pricingPlans}
        showPricing={true}
      />

      {/* CTA */}
      <CTASection
        business={business}
        onNavigateContact={onNavigateContact}
      />

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        business={business}
      />
    </div>
  );
};

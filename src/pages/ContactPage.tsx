import React from 'react';
import { BusinessConfig, FAQItem } from '../types';
import { ContactSection } from '../components/ContactSection';
import { FAQSection } from '../components/FAQSection';
import { MessageCircle } from 'lucide-react';

interface ContactPageProps {
  business: BusinessConfig;
  faqs: FAQItem[];
}

export const ContactPage: React.FC<ContactPageProps> = ({ business, faqs }) => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="bg-[#071A3D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>Kontak & Konsultasi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight">
            Mari Terhubung dengan Tim {business.brandName}
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Kami siap mendengarkan rencana proyek Anda dan memberikan solusi terbaik sesuai tujuan bisnis Anda.
          </p>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection business={business} />

      {/* FAQ */}
      <FAQSection faqs={faqs} business={business} />
    </div>
  );
};

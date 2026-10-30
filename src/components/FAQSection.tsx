import React, { useState } from 'react';
import { FAQItem, BusinessConfig } from '../types';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle, Sparkles } from 'lucide-react';
import { formatPhoneNumberForWa } from '../utils/whatsapp';

interface FAQSectionProps {
  faqs: FAQItem[];
  business: BusinessConfig;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ faqs, business }) => {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Semua Pertanyaan' },
    { id: 'layanan', label: 'Layanan & Fitur' },
    { id: 'pemesanan', label: 'Pemesanan' },
    { id: 'teknis', label: 'Teknis & Deployment' },
    { id: 'pembayaran', label: 'Pembayaran' },
  ];

  const filteredFaqs = faqs.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const directWaUrl = `https://wa.me/${formatPhoneNumberForWa(
    business.whatsappNumber
  )}?text=${encodeURIComponent(
    `Halo Tim ${business.brandName}, saya punya pertanyaan yang belum tercantum di FAQ website.`
  )}`;

  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Tanya Jawab (FAQ)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Temukan jawaban cepat seputar penggunaan template, layanan, cara pemesanan, dan dukungan teknis.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-300 bg-blue-50/30 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="font-bold text-sm sm:text-base text-slate-900 font-heading">
                    {faq.question}
                  </span>
                  <div
                    className={`p-1.5 rounded-full transition-transform ${
                      isOpen ? 'bg-blue-600 text-white rotate-180' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-0 text-slate-600 text-sm leading-relaxed border-t border-blue-100/50 mt-1">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="font-bold text-sm text-slate-900">Masih Punya Pertanyaan Lain?</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Tim support kami siap membantu menjawab konsultasi Anda secara ramah.
            </p>
          </div>
          <a
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-md shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};

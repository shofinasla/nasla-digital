import React, { useState } from 'react';
import { Testimonial, FAQItem } from '../../types';
import { MessageSquare, Plus, Trash2, HelpCircle } from 'lucide-react';

interface TestimonialsManagerProps {
  testimonials: Testimonial[];
  faqs: FAQItem[];
  onUpdateTestimonials: (testimonials: Testimonial[]) => void;
  onUpdateFaqs: (faqs: FAQItem[]) => void;
}

export const TestimonialsManager: React.FC<TestimonialsManagerProps> = ({
  testimonials,
  faqs,
  onUpdateTestimonials,
  onUpdateFaqs,
}) => {
  const [subTab, setSubTab] = useState<'testimonials' | 'faqs'>('testimonials');

  const handleAddTestimonial = () => {
    const newTesti: Testimonial = {
      id: `testi-${Date.now()}`,
      name: 'Nama Klien (Demo)',
      role: 'Role / Jabatan',
      company: 'Nama Perusahaan',
      location: 'Kota, Indonesia',
      comment: 'Ulasan positif mengenai kepuasan terhadap hasil kerja dan pelayanan.',
      rating: 5,
      serviceOrProduct: 'Layanan / Produk Terkait',
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      verified: true,
    };
    onUpdateTestimonials([newTesti, ...testimonials]);
  };

  const handleAddFaq = () => {
    const newFaq: FAQItem = {
      id: `faq-${Date.now()}`,
      category: 'layanan',
      question: 'Pertanyaan baru mengenai layanan Anda?',
      answer: 'Jawaban detail dan jelas untuk membantu pengunjung memahami proses atau ketentuan.',
    };
    onUpdateFaqs([...faqs, newFaq]);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-amber-400" />
            <span>Testimoni Klien & FAQ</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola ulasan kepuasan pelanggan serta daftar tanya jawab umum di website.
          </p>
        </div>

        <div className="bg-slate-800 p-1 rounded-xl flex items-center border border-slate-700">
          <button
            onClick={() => setSubTab('testimonials')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'testimonials'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Testimoni ({testimonials.length})
          </button>
          <button
            onClick={() => setSubTab('faqs')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              subTab === 'faqs'
                ? 'bg-blue-600 text-white shadow'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            FAQ ({faqs.length})
          </button>
        </div>
      </div>

      {subTab === 'testimonials' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleAddTestimonial}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Testimoni</span>
            </button>
          </div>

          <div className="space-y-3">
            {testimonials.map((t, idx) => (
              <div
                key={t.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={t.name}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].name = e.target.value;
                        onUpdateTestimonials(updated);
                      }}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-white"
                    />
                    <input
                      type="text"
                      value={t.company}
                      onChange={(e) => {
                        const updated = [...testimonials];
                        updated[idx].company = e.target.value;
                        onUpdateTestimonials(updated);
                      }}
                      className="px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300"
                    />
                  </div>
                  <button
                    onClick={() =>
                      onUpdateTestimonials(testimonials.filter((item) => item.id !== t.id))
                    }
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={t.comment}
                  onChange={(e) => {
                    const updated = [...testimonials];
                    updated[idx].comment = e.target.value;
                    onUpdateTestimonials(updated);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300"
                ></textarea>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={handleAddFaq}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Tambah Pertanyaan FAQ</span>
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={faq.id}
                className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...faqs];
                      updated[idx].question = e.target.value;
                      onUpdateFaqs(updated);
                    }}
                    className="flex-1 px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs font-bold text-white mr-2"
                  />
                  <button
                    onClick={() => onUpdateFaqs(faqs.filter((item) => item.id !== faq.id))}
                    className="p-1 rounded text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={faq.answer}
                  onChange={(e) => {
                    const updated = [...faqs];
                    updated[idx].answer = e.target.value;
                    onUpdateFaqs(updated);
                  }}
                  className="w-full px-2 py-1 rounded bg-slate-900 border border-slate-700 text-xs text-slate-300"
                ></textarea>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

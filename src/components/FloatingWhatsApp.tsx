import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { formatPhoneNumberForWa } from '../utils/whatsapp';

interface FloatingWhatsAppProps {
  business: BusinessConfig;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({ business }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const quickMessages = [
    'Halo, saya mau tanya harga layanan website.',
    'Halo, saya ingin konsultasi proyek bisnis.',
    'Halo, apakah bisa kirim proposal penawaran?',
  ];

  const handleSend = (textToSend?: string) => {
    const finalMsg = textToSend || message || `Halo Tim ${business.brandName}, saya ingin konsultasi.`;
    const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, '_blank');
    setOpen(false);
    setMessage('');
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Window */}
      {open && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-fadeIn text-slate-900">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#071A3D] to-[#0B3D91] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold">
                <MessageCircle className="w-5 h-5 fill-white text-emerald-500" />
              </div>
              <div>
                <h4 className="text-sm font-bold font-heading">{business.brandName} Support</h4>
                <span className="text-[10px] text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Online • Siap Membantu
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="p-1 rounded-lg hover:bg-white/10 text-slate-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 bg-slate-50">
            <div className="p-3 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 shadow-sm leading-relaxed">
              Halo! 👋 Ada yang bisa kami bantu mengenai pembuatan website, strategi digital, atau konsultasi bisnis Anda?
            </div>

            {/* Quick Prompts */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Pilih Pertanyaan Cepat:</span>
              {quickMessages.map((qm, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qm)}
                  className="w-full text-left p-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 text-[11px] text-slate-700 hover:text-blue-700 font-medium transition-colors cursor-pointer"
                >
                  {qm}
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Tulis pesan Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleSend()}
                className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-600/40 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"
        title="Chat WhatsApp"
      >
        <MessageCircle className="w-6 h-6 fill-white text-emerald-600" />
        <span className="text-xs font-bold hidden sm:inline-block">Konsultasi WhatsApp</span>
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { BusinessConfig } from '../types';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  CreditCard,
  Send,
  Building,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { buildGeneralContactWaUrl, formatPhoneNumberForWa } from '../utils/whatsapp';

interface ContactSectionProps {
  business: BusinessConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ business }) => {
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('Website & Aplikasi');
  const [company, setCompany] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [budgetRange, setBudgetRange] = useState('Rp 3 Juta - Rp 7 Juta');
  const [messageText, setMessageText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const url = buildGeneralContactWaUrl(business, {
      name,
      topic,
      companyOrBrand: company,
      emailOrPhone,
      budgetRange,
      messageText,
    });

    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Pusat Komunikasi & Kontak</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            Hubungi Tim {business.brandName}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Isi formulir di bawah ini untuk terhubung langsung ke WhatsApp kami atau hubungi kami melalui saluran resmi lainnya.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading mb-2">
              Kirim Pesan Langsung ke WhatsApp
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-8">
              Pesan akan otomatis dirangkai menjadi format rapi dan membuka aplikasi WhatsApp Anda.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nama Lengkap / Kontak *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Shofi Nasla"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Nama Bisnis / Perusahaan
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: PT Sukses Mandiri"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Topik / Layanan
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="Website & Aplikasi">Website & Aplikasi</option>
                    <option value="Digital Marketing & Ads">Digital Marketing & Ads</option>
                    <option value="SEO Optimization">SEO Optimization</option>
                    <option value="E-Commerce & WhatsApp Order">E-Commerce & WhatsApp Order</option>
                    <option value="Branding & UI/UX">Branding & UI/UX</option>
                    <option value="Konsultasi IT & Bisnis">Konsultasi IT & Bisnis</option>
                    <option value="Pertanyaan Umum">Pertanyaan Umum</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1.5">
                    Estimasi Budget
                  </label>
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                  >
                    <option value="< Rp 2 Juta">&lt; Rp 2 Juta</option>
                    <option value="Rp 2 Juta - Rp 5 Juta">Rp 2 Juta - Rp 5 Juta</option>
                    <option value="Rp 5 Juta - Rp 10 Juta">Rp 5 Juta - Rp 10 Juta</option>
                    <option value="> Rp 10 Juta">&gt; Rp 10 Juta (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Email atau No. Telepon Anda
                </label>
                <input
                  type="text"
                  placeholder="Contoh: kontak@perusahaan.com atau 08123456789"
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">
                  Rincian Kebutuhan / Pesan *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Ceritakan rencana proyek atau pertanyaan yang ingin Anda konsultasikan..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Kirim Pesan ke WhatsApp Sekarang</span>
              </button>
            </form>
          </div>

          {/* Right Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Cards */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-base font-bold text-slate-900 font-heading">
                Informasi Kontak Resmi
              </h4>

              <div className="space-y-3.5">
                <a
                  href={`https://wa.me/${formatPhoneNumberForWa(business.whatsappNumber)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                      WHATSAPP RESMI:
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-emerald-700">
                      {business.phone || `+${formatPhoneNumberForWa(business.whatsappNumber)}`}
                    </span>
                  </div>
                </a>

                <a
                  href={`mailto:${business.email}`}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50 hover:bg-blue-100/80 border border-blue-200/60 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-800 uppercase block">
                      EMAIL RESMI:
                    </span>
                    <span className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                      {business.email}
                    </span>
                  </div>
                </a>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="w-10 h-10 rounded-xl bg-slate-800 text-white flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase block">
                      ALAMAT KANTOR:
                    </span>
                    <span className="text-xs font-semibold text-slate-800 leading-relaxed block">
                      {business.address.street}
                      {business.address.city ? `, ${business.address.city}` : ''}
                      {business.address.province ? `, ${business.address.province}` : ''}
                      {business.address.postalCode &&
                      !business.address.street.includes(business.address.postalCode)
                        ? ` ${business.address.postalCode}`
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm font-heading">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Jam Operasional</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Hari Kerja ({business.operatingHours.days}):</span>
                  <span className="font-bold text-slate-800">{business.operatingHours.hours}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Akhir Pekan:</span>
                  <span className="font-bold text-slate-800">{business.operatingHours.weekendHours}</span>
                </div>
              </div>
            </div>

            {/* Verified Bank Account 
            {business.bankAccount && (
              <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-[#071A3D] text-white shadow-md space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-cyan-300">
                    <CreditCard className="w-4 h-4" />
                    <span>Rekening Pembayaran Resmi</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Verified
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                  <div className="text-xs text-slate-400">{business.bankAccount.bankName}</div>
                  <div className="text-lg font-mono font-bold text-cyan-300 tracking-wider">
                    {business.bankAccount.accountNumber}
                  </div>
                  <div className="text-xs text-slate-200 font-semibold uppercase">
                    A/N {business.bankAccount.accountHolder}
                  </div>
                </div>
              </div>
            )}

            */}
          </div>
        </div>
      </div>
    </section>
  );
};

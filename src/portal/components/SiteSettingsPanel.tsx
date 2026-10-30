import React from 'react';
import { BusinessConfig } from '../../types';
import { Building, Phone, Mail, MapPin, CreditCard, Globe } from 'lucide-react';

interface SiteSettingsPanelProps {
  business: BusinessConfig;
  onChange: (updated: BusinessConfig) => void;
}

export const SiteSettingsPanel: React.FC<SiteSettingsPanelProps> = ({
  business,
  onChange,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
          <Building className="w-5 h-5 text-blue-400" />
          <span>Profil Bisnis & Data Kontak</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Sesuaikan identitas bisnis, nomor WhatsApp untuk pemesanan, alamat kantor, dan rekening bank resmi.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
        {/* Logo Configuration */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/80 flex flex-col sm:flex-row items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 flex-shrink-0 shadow-md">
            <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-1">
              <img
                src={business.logoUrl || '/logo.png'}
                alt={business.brandName}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
          <div className="flex-1 w-full space-y-1">
            <label className="text-xs font-bold text-slate-200 block">
              Logo Website (File Path atau Image URL)
            </label>
            <input
              type="text"
              value={business.logoUrl || '/logo.png'}
              onChange={(e) => onChange({ ...business, logoUrl: e.target.value })}
              placeholder="/logo.png atau URL logo"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 block">
              File default disimpan di folder <code className="text-cyan-300">public/logo.png</code>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Nama Brand / Perusahaan Anda
            </label>
            <input
              type="text"
              value={business.brandName}
              onChange={(e) => onChange({ ...business, brandName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Tagline Singkat
            </label>
            <input
              type="text"
              value={business.tagline}
              onChange={(e) => onChange({ ...business, tagline: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Slogan / Value Proposition
          </label>
          <input
            type="text"
            value={business.slogan}
            onChange={(e) => onChange({ ...business, slogan: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-300 block mb-1">
            Deskripsi Bisnis / Company Overview
          </label>
          <textarea
            rows={3}
            value={business.description}
            onChange={(e) => onChange({ ...business, description: e.target.value })}
            className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              No. WhatsApp Utama (Format 628xxx)
            </label>
            <input
              type="text"
              value={business.whatsappNumber}
              onChange={(e) => onChange({ ...business, whatsappNumber: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Email Resmi
            </label>
            <input
              type="email"
              value={business.email}
              onChange={(e) => onChange({ ...business, email: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Website / Domain Resmi
            </label>
            <input
              type="text"
              value={business.websiteUrl || 'https://www.nasla.digital'}
              onChange={(e) => onChange({ ...business, websiteUrl: e.target.value })}
              placeholder="https://www.nasla.digital"
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-300 block mb-1">
              Telepon Kantor
            </label>
            <input
              type="text"
              value={business.phone}
              onChange={(e) => onChange({ ...business, phone: e.target.value })}
              className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Address */}
        <div className="pt-2 border-t border-slate-700/60">
          <span className="text-xs font-bold text-cyan-300 block mb-2">Alamat & Lokasi:</span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] text-slate-400 block mb-1">Jalan / Alamat Lengkap</label>
              <input
                type="text"
                value={business.address.street}
                onChange={(e) =>
                  onChange({
                    ...business,
                    address: { ...business.address, street: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Kota / Provinsi</label>
              <input
                type="text"
                value={business.address.city}
                onChange={(e) =>
                  onChange({
                    ...business,
                    address: { ...business.address, city: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Bank Account */}
        <div className="pt-4 border-t border-slate-700/60">
          <span className="text-xs font-bold text-cyan-300 block mb-3">
            Rekening Pembayaran Resmi:
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Nama Bank</label>
              <input
                type="text"
                value={business.bankAccount.bankName}
                onChange={(e) =>
                  onChange({
                    ...business,
                    bankAccount: { ...business.bankAccount, bankName: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Nomor Rekening</label>
              <input
                type="text"
                value={business.bankAccount.accountNumber}
                onChange={(e) =>
                  onChange({
                    ...business,
                    bankAccount: { ...business.bankAccount, accountNumber: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Atas Nama (A/N)</label>
              <input
                type="text"
                value={business.bankAccount.accountHolder}
                onChange={(e) =>
                  onChange({
                    ...business,
                    bankAccount: { ...business.bankAccount, accountHolder: e.target.value },
                  })
                }
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

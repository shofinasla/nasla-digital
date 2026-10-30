import React from 'react';
import {
  Sparkles,
  Building,
  LayoutDashboard,
  Zap,
  ShoppingBag,
  BookOpen,
  Users,
  MessageSquare,
  FileCode,
} from 'lucide-react';

export type AdminTabType =
  | 'presets'
  | 'business'
  | 'hero'
  | 'services'
  | 'products'
  | 'blog'
  | 'about'
  | 'testimonials'
  | 'seller-kit';

interface AdminSidebarProps {
  activeTab: AdminTabType;
  onSelectTab: (tab: AdminTabType) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  onSelectTab,
}) => {
  const tabs = [
    { id: 'presets', label: '1-Click Preset Industri', icon: Sparkles, color: 'text-amber-400' },
    { id: 'business', label: 'Profil Bisnis & Kontak', icon: Building },
    { id: 'hero', label: 'Hero & Headline', icon: LayoutDashboard },
    { id: 'services', label: 'Layanan & Paket Harga', icon: Zap },
    { id: 'products', label: 'Produk & Portofolio', icon: ShoppingBag },
    { id: 'blog', label: 'Artikel Blog', icon: BookOpen },
    { id: 'about', label: 'Tentang, Visi & Tim', icon: Users },
    { id: 'testimonials', label: 'Testimoni & FAQ', icon: MessageSquare },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-950/90 border-r border-slate-800 p-4 space-y-1.5 shrink-0">
      <div className="text-[10px] uppercase font-bold text-slate-500 px-3 py-2 tracking-wider">
        Modul Manajemen Konten
      </div>

      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onSelectTab(tab.id as AdminTabType)}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
              isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Icon className={`w-4 h-4 ${tab.color || ''}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}

      <div className="pt-4 mt-4 border-t border-slate-800">
        <button
          onClick={() => onSelectTab('seller-kit')}
          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
            activeTab === 'seller-kit'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/50'
          }`}
        >
          <FileCode className="w-4 h-4" />
          <span>Seller Kit & Export JSON</span>
        </button>
      </div>
    </aside>
  );
};

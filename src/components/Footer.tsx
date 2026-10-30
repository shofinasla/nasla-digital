import React from 'react';
import { BusinessConfig } from '../types';
import {
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Linkedin,
  ArrowUp,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { formatPhoneNumberForWa } from '../utils/whatsapp';
import { SITE_CONFIG } from '../config/site.config';

interface FooterProps {
  business: BusinessConfig;
  onNavigate?: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ business, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products & Portfolio' },
    { id: 'blog', label: 'Blog & Articles' },
    { id: 'contact', label: 'Contact Us' },
  ];

  const handleLink = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#071A3D] text-slate-300 pt-16 pb-12 border-t border-blue-900/40 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-blue-900/40">
          {/* Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5 shadow-md flex-shrink-0">
                <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={business.logoUrl || '/logo.png'}
                    alt={business.brandName}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white block font-heading">
                  {business.brandName}
                </span>
                <span className="text-xs text-cyan-300 font-medium">
                  {business.tagline}
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              {business.slogan}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href={`https://instagram.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-600 hover:to-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href={`https://linkedin.com`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-blue-700 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>

              <a
                href={`https://wa.me/${formatPhoneNumberForWa(business.whatsappNumber)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-emerald-600 text-slate-300 hover:text-white flex items-center justify-center transition-all"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Navigasi Halaman
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLink(link.id)}
                    className="text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Quicklist */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Layanan Bisnis
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• Website Profile & Landing Page</li>
              <li>• Digital Marketing & Paid Advertising</li>
              <li>• SEO Optimization & Google Visibility</li>
              <li>• Toko Online & WhatsApp Order System</li>
              <li>• Branding, Logo & UI/UX Design</li>
              <li>• IT & Business Strategy Consulting</li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Kontak & Operasional
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>
                  {business.address.street}
                  {business.address.city ? `, ${business.address.city}` : ''}
                  {business.address.province ? `, ${business.address.province}` : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>{business.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{business.phone || `+${formatPhoneNumberForWa(business.whatsappNumber)}`}</span>
              </div>
              <div className="pt-1 text-[11px] text-slate-400">
                Jam Operasional: {business.operatingHours.days} ({business.operatingHours.hours})
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            &copy; {new Date().getFullYear()} {business.brandName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-400 text-[11px]">
              <strong className="text-cyan-300 font-semibold">{business.brandName}</strong> — {business.tagline}
            </span>
            <button
              onClick={scrollToTop}
              aria-label="Kembali ke Atas"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

import React, { useState, useEffect } from 'react';
import { BusinessConfig, CartItem } from '../types';
import { Menu, X, ShoppingBag, ArrowRight, Sparkles, Phone, Check } from 'lucide-react';

interface NavbarProps {
  business: BusinessConfig;
  cart: CartItem[];
  onOpenCart: () => void;
  activePage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  business,
  cart,
  onOpenCart,
  activePage,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'services', label: 'Services', path: '/services' },
    { id: 'products', label: 'Products', path: '/products' },
    { id: 'blog', label: 'Blog', path: '/blog' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleLinkClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-900/90 backdrop-blur-md shadow-lg border-b border-blue-900/30 py-3 text-white'
          : 'bg-[#071A3D] text-white py-4 border-b border-blue-900/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-400 p-0.5 shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full bg-white rounded-[10px] overflow-hidden flex items-center justify-center p-1">
                <img
                  src={business.logoUrl || '/logo.png'}
                  alt={business.brandName}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-1.5 font-heading">
                {business.brandName}
              </span>
              <span className="text-[11px] text-blue-200/80 font-medium block truncate max-w-[200px] sm:max-w-xs">
                {business.tagline}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = activePage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-cyan-400 bg-blue-950/70 border border-blue-500/30 shadow-inner'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart Drawer Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 transition-all cursor-pointer hover:border-blue-400/50"
              title="Keranjang / Daftar Pesanan"
            >
              <ShoppingBag className="w-5 h-5 text-cyan-400" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#071A3D] animate-pulse">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Get Started CTA */}
            <button
              onClick={() => handleLinkClick('contact')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white text-sm font-bold shadow-md shadow-blue-600/30 hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Cart Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-lg bg-slate-800 text-cyan-400 border border-slate-700"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                  {totalCartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-800 text-slate-200 border border-slate-700 focus:outline-none"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-blue-900/40 px-4 pt-3 pb-6 space-y-2 backdrop-blur-xl animate-fadeIn">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-semibold flex items-center justify-between transition-colors ${
                  isActive
                    ? 'text-cyan-400 bg-blue-950/80 border border-blue-500/30 font-bold'
                    : 'text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <Check className="w-4 h-4 text-cyan-400" />}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Get Started / Hubungi Kami</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

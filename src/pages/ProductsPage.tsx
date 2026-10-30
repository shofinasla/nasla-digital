import React from 'react';
import { Product, BusinessConfig } from '../types';
import { PortfolioSection } from '../components/PortfolioSection';
import { CTASection } from '../components/CTASection';
import { ShoppingBag } from 'lucide-react';

interface ProductsPageProps {
  products: Product[];
  business: BusinessConfig;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onNavigateContact: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  products,
  business,
  onSelectProduct,
  onAddToCart,
  onNavigateContact,
}) => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="bg-[#071A3D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <ShoppingBag className="w-3.5 h-3.5 text-cyan-400" />
            <span>Katalog Lengkap</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight">
            Produk & Portofolio Mahakarya
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Temukan produk digital, solusi web, dan hasil karya yang siap diimplementasikan untuk usaha Anda.
          </p>
        </div>
      </section>

      {/* Full Catalog Section */}
      <PortfolioSection
        products={products}
        business={business}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
        title="Jelajahi Semua Produk & Portofolio"
        subtitle="Gunakan filter kategori atau kotak pencarian untuk menemukan solusi yang paling relevan dengan kebutuhan Anda."
      />

      {/* CTA Banner */}
      <CTASection
        business={business}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
};

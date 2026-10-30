import React, { useState, useMemo } from 'react';
import { Product, BusinessConfig } from '../types';
import {
  Search,
  Star,
  ShoppingBag,
  ExternalLink,
  MessageCircle,
  Eye,
  Sparkles,
  Tag,
  Check,
} from 'lucide-react';
import { formatRupiah, formatPhoneNumberForWa } from '../utils/whatsapp';
import { DynamicIcon } from './DynamicIcon';

interface PortfolioSectionProps {
  products: Product[];
  business: BusinessConfig;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  title?: string;
  subtitle?: string;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  products,
  business,
  onSelectProduct,
  onAddToCart,
  title = 'Katalog Produk & Portofolio Proyek',
  subtitle = 'Koleksi mahakarya dan solusi siap pakai yang telah kami kembangkan untuk berbagai industri bisnis.',
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [addedId, setAddedId] = useState<string | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const list = ['Semua'];
    products.forEach((p) => {
      if (p.category && !list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, [products]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory =
        activeCategory === 'Semua' || product.category === activeCategory;
      const matchSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.tags && product.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCategory && matchSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const handleAddWithFeedback = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleFastWhatsApp = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
    const msg = `Halo Admin ${business.brandName}, saya tertarik untuk memesan/inquiry mengenai:\n\n*${product.name}*\nKategori: ${product.category}\nHarga: ${formatRupiah(product.price)}\n\nMohon info ketersediaan dan proses pemesanannya ya. Terima kasih! 🙏`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <section id="products" className="py-20 lg:py-28 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>Portofolio & Produk Unggulan</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
            {title}
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">{subtitle}</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-100">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#071A3D] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari produk / proyek..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">
              Tidak ada produk atau portofolio yang cocok dengan pencarian Anda.
            </p>
            <button
              onClick={() => {
                setActiveCategory('Semua');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
            >
              Reset Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="rounded-3xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Card Visual Header */}
                  <div className="relative h-48 bg-gradient-to-br from-[#071A3D] via-[#0B3D91] to-slate-900 p-6 flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-xl pointer-events-none"></div>

                    <div className="flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                        {product.category}
                      </span>
                      {product.isBestSeller && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase shadow">
                          Best Seller
                        </span>
                      )}
                    </div>

                    <div className="z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 mb-2">
                        <DynamicIcon name={product.iconType || 'sparkles'} className="w-5 h-5" />
                      </div>
                      <h4 className="text-white font-bold text-base line-clamp-1 group-hover:text-cyan-300 transition-colors">
                        {product.name}
                      </h4>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-slate-600 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* Highlights bullet points */}
                    <div className="space-y-1.5 pt-2">
                      {product.highlights.slice(0, 3).map((hl, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0"></span>
                          <span className="truncate">{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tags */}
                    {product.tags && product.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {product.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Footer Price & CTAs */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase">HARGA / INVESTASI:</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-base font-extrabold text-slate-900 font-heading">
                          {formatRupiah(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-slate-400 line-through">
                            {formatRupiah(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={(e) => handleAddWithFeedback(product, e)}
                        className={`p-2 rounded-xl border transition-all cursor-pointer ${
                          addedId === product.id
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                        title="Tambah ke Keranjang"
                      >
                        {addedId === product.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <ShoppingBag className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        onClick={(e) => handleFastWhatsApp(product, e)}
                        className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                        title="Pesan via WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

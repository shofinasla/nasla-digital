import React, { useState } from 'react';
import { Product, BusinessConfig, ProductVariant } from '../types';
import {
  X,
  Star,
  ShoppingBag,
  MessageCircle,
  CheckCircle2,
  Share2,
  Clock,
  ShieldCheck,
  Building,
  Check,
} from 'lucide-react';
import { formatRupiah, buildSingleProductWaUrl, formatPhoneNumberForWa } from '../utils/whatsapp';
import { DynamicIcon } from './DynamicIcon';

interface ProductDetailModalProps {
  product: Product | null;
  business: BusinessConfig;
  onClose: () => void;
  onAddToCart: (
    product: Product,
    quantity: number,
    variant?: ProductVariant,
    notes?: string
  ) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  business,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants?.[0]
  );
  const [customerName, setCustomerName] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [added, setAdded] = useState(false);

  const unitPrice = product.price + (selectedVariant ? selectedVariant.priceDelta : 0);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedVariant, customerNotes);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const handleOrderWhatsApp = () => {
    const url = buildSingleProductWaUrl(
      business,
      product,
      quantity,
      selectedVariant,
      customerName,
      customerCompany,
      customerNotes
    );
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto relative text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Visual */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#071A3D] to-[#0B3D91] text-white mb-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-semibold text-white">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="text-xs font-bold text-white">{product.rating}</span>
              <span className="text-[10px] text-slate-300">({product.reviewsCount} review)</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 shrink-0">
              <DynamicIcon name={product.iconType || 'sparkles'} className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                {product.name}
              </h3>
              <p className="text-xs text-cyan-300 mt-0.5">{product.tagline}</p>
            </div>
          </div>
        </div>

        {/* Body Content */}
        <div className="space-y-6">
          <div>
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Deskripsi Lengkap
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          </div>

          {/* Highlights */}
          {product.highlights && product.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Spesifikasi & Keunggulan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2 text-xs text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Optional Variants */}
          {product.variants && product.variants.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Pilihan Varian / Paket
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-3 rounded-xl text-left border text-xs transition-all cursor-pointer ${
                      selectedVariant?.id === variant.id
                        ? 'bg-blue-50 border-blue-600 text-blue-900 font-bold shadow-sm'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div>{variant.name}</div>
                    {variant.priceDelta !== 0 && (
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        +{formatRupiah(variant.priceDelta)}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Fast Order Form inputs */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="text-xs font-bold text-slate-800">
              Data Tambahan untuk Form Pemesanan:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Nama Anda"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <input
                type="text"
                placeholder="Nama Bisnis/Perusahaan (Opsional)"
                value={customerCompany}
                onChange={(e) => setCustomerCompany(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <input
              type="text"
              placeholder="Catatan / Kebutuhan Tambahan"
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Price & Quantity Bar */}
          <div className="flex items-center justify-between pt-2">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase">TOTAL INVESTASI:</span>
              <span className="text-2xl font-extrabold text-slate-900 font-heading">
                {formatRupiah(totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 cursor-pointer shadow-sm"
              >
                -
              </button>
              <span className="w-8 text-center text-xs font-bold text-slate-800">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 cursor-pointer shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Footer CTAs */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-5 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
              added
                ? 'bg-emerald-600 text-white border-emerald-600'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            <span>{added ? 'Ditambahkan ke Keranjang' : 'Tambah ke Keranjang'}</span>
          </button>

          <button
            type="button"
            onClick={handleOrderWhatsApp}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
            <span>Pesan Langsung via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};

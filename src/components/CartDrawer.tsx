import React, { useState } from 'react';
import { CartItem, BusinessConfig } from '../types';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  CreditCard,
} from 'lucide-react';
import { formatRupiah, buildCartCheckoutWaUrl } from '../utils/whatsapp';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  business: BusinessConfig;
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  business,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCompany, setCustomerCompany] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transfer Bank (BCA / Mandiri / QRIS)');
  const [customerNotes, setCustomerNotes] = useState('');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => {
    const unitPrice =
      item.product.price + (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  const handleCheckoutWhatsApp = () => {
    if (cart.length === 0) return;
    const url = buildCartCheckoutWaUrl(business, cart, {
      name: customerName,
      phone: customerPhone,
      company: customerCompany,
      address: customerAddress,
      paymentMethod,
      notes: customerNotes,
    });
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      ></div>

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between text-slate-900 animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-[#071A3D] text-white">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-white/10 text-cyan-400">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-heading">Daftar Pesanan & Keranjang</h3>
                <span className="text-xs text-slate-300">{cart.length} item dipilih</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold text-slate-800">Keranjang Masih Kosong</h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Pilih layanan atau produk di halaman katalog untuk menambahkan ke dalam daftar pesanan Anda.
                </p>
                <button
                  onClick={onClose}
                  className="mt-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Jelajahi Produk
                </button>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700 uppercase">Item Terpilih:</span>
                    <button
                      onClick={onClearCart}
                      className="text-[11px] text-rose-600 hover:underline font-semibold cursor-pointer"
                    >
                      Hapus Semua
                    </button>
                  </div>

                  {cart.map((item, idx) => {
                    const itemPrice =
                      item.product.price +
                      (item.selectedVariant ? item.selectedVariant.priceDelta : 0);
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3"
                      >
                        <div className="min-w-0 flex-1">
                          <h5 className="text-xs font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h5>
                          {item.selectedVariant && (
                            <span className="text-[10px] text-blue-600 font-semibold block">
                              Varian: {item.selectedVariant.name}
                            </span>
                          )}
                          <div className="text-xs font-bold text-slate-800 mt-1">
                            {formatRupiah(itemPrice)}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center bg-white border border-slate-300 rounded-lg p-0.5 shadow-sm">
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-slate-600 hover:bg-slate-100"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Customer Details for Checkout */}
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-3">
                  <span className="text-xs font-bold text-blue-900 block">
                    Data Pemesan untuk Invoice:
                  </span>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Nama Lengkap *"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="No. WhatsApp / Telepon *"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Nama Perusahaan / Bisnis (Opsional)"
                      value={customerCompany}
                      onChange={(e) => setCustomerCompany(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Alamat / Kota Pengiriman / Instansi"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                    <textarea
                      rows={2}
                      placeholder="Catatan tambahan (opsional)"
                      value={customerNotes}
                      onChange={(e) => setCustomerNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    ></textarea>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-slate-50 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 uppercase font-bold">Total Estimasi:</span>
                <span className="text-xl font-extrabold text-slate-900 font-heading">
                  {formatRupiah(subtotal)}
                </span>
              </div>

              <button
                onClick={handleCheckoutWhatsApp}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-white text-emerald-600" />
                <span>Kirim Pesanan ke WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Transaksi Langsung & Aman via WhatsApp Admin</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

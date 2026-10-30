import React from 'react';
import { Product } from '../../types';
import { ShoppingBag, Plus, Trash2 } from 'lucide-react';
import { formatRupiah } from '../../utils/whatsapp';

interface ProductsManagerProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({
  products,
  onUpdateProducts,
}) => {
  const handleAddProduct = () => {
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: 'Produk / Portofolio Baru (Demo)',
      category: 'Kategori Baru',
      tagline: 'Ringkasan fitur produk atau proyek',
      description: 'Deskripsi lengkap spesifikasi atau studi kasus dari produk/proyek ini.',
      price: 2500000,
      rating: 5.0,
      reviewsCount: 10,
      highlights: ['Fitur Utama 1', 'Fitur Utama 2', 'Fitur Utama 3'],
      iconType: 'shop',
      tags: ['Demo', 'Baru'],
    };
    onUpdateProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id: string) => {
    onUpdateProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-cyan-400" />
            <span>Katalog Produk & Portofolio</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola daftar karya, produk fisik, jasa paket, atau portofolio studi kasus.
          </p>
        </div>

        <button
          onClick={handleAddProduct}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Item Baru</span>
        </button>
      </div>

      <div className="space-y-4">
        {products.map((prod, idx) => (
          <div
            key={prod.id}
            className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300">
                Item #{idx + 1}: {prod.name}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {formatRupiah(prod.price)}
                </span>
                <button
                  onClick={() => handleDeleteProduct(prod.id)}
                  className="p-1.5 rounded-lg hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 transition-colors"
                  title="Hapus Item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-400 block mb-1">Nama Produk / Proyek</label>
                <input
                  type="text"
                  value={prod.name}
                  onChange={(e) => {
                    const updated = [...products];
                    updated[idx].name = e.target.value;
                    onUpdateProducts(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Harga (Angka)</label>
                <input
                  type="number"
                  value={prod.price}
                  onChange={(e) => {
                    const updated = [...products];
                    updated[idx].price = Number(e.target.value);
                    onUpdateProducts(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Kategori</label>
                <input
                  type="text"
                  value={prod.category}
                  onChange={(e) => {
                    const updated = [...products];
                    updated[idx].category = e.target.value;
                    onUpdateProducts(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Tagline Ringkas</label>
                <input
                  type="text"
                  value={prod.tagline}
                  onChange={(e) => {
                    const updated = [...products];
                    updated[idx].tagline = e.target.value;
                    onUpdateProducts(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Deskripsi</label>
              <textarea
                rows={2}
                value={prod.description}
                onChange={(e) => {
                  const updated = [...products];
                  updated[idx].description = e.target.value;
                  onUpdateProducts(updated);
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

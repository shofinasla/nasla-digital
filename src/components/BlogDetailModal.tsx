import React from 'react';
import { BlogPost, BusinessConfig } from '../types';
import { X, Calendar, Clock, User, Share2, MessageCircle, Tag, Check } from 'lucide-react';
import { formatPhoneNumberForWa } from '../utils/whatsapp';

interface BlogDetailModalProps {
  post: BlogPost | null;
  business: BusinessConfig;
  onClose: () => void;
}

export const BlogDetailModal: React.FC<BlogDetailModalProps> = ({
  post,
  business,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);

  if (!post) return null;

  const handleShareWa = () => {
    const text = `Baca artikel menarik ini: "${post.title}" dari ${business.brandName}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text + '\n\n' + window.location.href)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto relative text-slate-900">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Category & Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            {post.category}
          </span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>{post.publishDate}</span>
          </div>
          <span className="text-slate-300">•</span>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 font-heading leading-tight mb-6">
          {post.title}
        </h2>

        {/* Author Box */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/80 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center">
              {post.author.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="text-xs sm:text-sm font-bold text-slate-900">{post.author}</div>
              <div className="text-[11px] text-slate-500">{post.authorRole}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWa}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
              title="Bagikan ke WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
              title="Salin Link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-slate max-w-none text-sm sm:text-base leading-relaxed text-slate-700 space-y-4 whitespace-pre-line">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Topik Terkait:</span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#071A3D] to-[#0B3D91] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-base text-white font-heading">
              Ingin Menerapkan Strategi Ini untuk Bisnis Anda?
            </h4>
            <p className="text-xs text-slate-200 mt-0.5">
              Konsultasikan ide Anda langsung dengan tim ahli {business.brandName}.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              const cleanPhone = formatPhoneNumberForWa(business.whatsappNumber);
              window.open(
                `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                  `Halo Admin ${business.brandName}, saya baru membaca artikel "${post.title}" dan ingin konsultasi lebih lanjut.`
                )}`,
                '_blank'
              );
            }}
            className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold text-xs shrink-0 cursor-pointer shadow-md"
          >
            Konsultasi Sekarang
          </button>
        </div>
      </div>
    </div>
  );
};

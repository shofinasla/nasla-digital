import React from 'react';
import { BlogPost, BusinessConfig } from '../types';
import { BlogSection } from '../components/BlogSection';
import { CTASection } from '../components/CTASection';
import { BookOpen } from 'lucide-react';

interface BlogPageProps {
  blogPosts: BlogPost[];
  business: BusinessConfig;
  onNavigateContact: () => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  blogPosts,
  business,
  onNavigateContact,
}) => {
  return (
    <div className="bg-slate-50 text-slate-900">
      {/* Header */}
      <section className="bg-[#071A3D] text-white py-16 lg:py-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
            <span>Pusat Artikel & Edukasi</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight">
            Wawasan Bisnis & Tren Digital Terbaru
          </h1>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Pelajari strategi praktis mengenai website, SEO, pemasaran digital, dan optimasi penjualan dari para praktisi.
          </p>
        </div>
      </section>

      {/* Full Blog Listing */}
      <BlogSection
        blogPosts={blogPosts}
        business={business}
        isFullPage={true}
        title="Koleksi Artikel Pilihan"
        subtitle="Filter berdasarkan topik bisnis, SEO, e-commerce, atau teknologi yang ingin Anda pelajari."
      />

      {/* CTA */}
      <CTASection
        business={business}
        onNavigateContact={onNavigateContact}
      />
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { BlogPost, BusinessConfig } from '../types';
import { BookOpen, Calendar, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';
import { BlogDetailModal } from './BlogDetailModal';

interface BlogSectionProps {
  blogPosts: BlogPost[];
  business: BusinessConfig;
  onNavigateBlog?: () => void;
  title?: string;
  subtitle?: string;
  isFullPage?: boolean;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  blogPosts,
  business,
  onNavigateBlog,
  title = 'Wawasan & Artikel Bisnis Terkini',
  subtitle = 'Kumpulan strategi, tips pemasaran digital, dan tren teknologi untuk mengakselerasi pertumbuhan usaha Anda.',
  isFullPage = false,
}) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('Semua');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const list = ['Semua'];
    blogPosts.forEach((p) => {
      if (p.category && !list.includes(p.category)) {
        list.push(p.category);
      }
    });
    return list;
  }, [blogPosts]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchCat =
        activeCategory === 'Semua' || post.category === activeCategory;
      const matchSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchCat && matchSearch;
    });
  }, [blogPosts, activeCategory, searchQuery]);

  const displayedPosts = isFullPage ? filteredPosts : filteredPosts.slice(0, 3);

  return (
    <section id="blog" className="py-20 lg:py-28 bg-slate-50 text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-left space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>Pusat Edukasi & Blog</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              {title}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl">{subtitle}</p>
          </div>

          {!isFullPage && onNavigateBlog && (
            <button
              onClick={onNavigateBlog}
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors cursor-pointer group"
            >
              <span>Lihat Semua Artikel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </div>

        {/* Filters if on full page */}
        {isFullPage && (
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#071A3D] text-white shadow-md'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari topik artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>
        )}

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="rounded-3xl bg-white border border-slate-200/90 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Header Graphic Gradient */}
                <div className="h-44 bg-gradient-to-br from-[#071A3D] to-blue-900 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl pointer-events-none"></div>

                  <div className="flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/20 text-white text-[11px] font-semibold">
                      {post.category}
                    </span>
                    <span className="text-[11px] text-cyan-300 font-medium">
                      {post.readTime}
                    </span>
                  </div>

                  <div className="z-10 text-xs text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{post.publishDate}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0">
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                      {post.author.substring(0, 1).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                  </div>

                  <span className="text-xs font-bold text-blue-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    <span>Baca</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Blog Article Reader Modal */}
      {selectedPost && (
        <BlogDetailModal
          post={selectedPost}
          business={business}
          onClose={() => setSelectedPost(null)}
        />
      )}
    </section>
  );
};

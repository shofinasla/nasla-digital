import React from 'react';
import { BlogPost } from '../../types';
import { BookOpen, Plus, Trash2 } from 'lucide-react';

interface BlogManagerProps {
  blogPosts: BlogPost[];
  onUpdateBlog: (posts: BlogPost[]) => void;
}

export const BlogManager: React.FC<BlogManagerProps> = ({
  blogPosts,
  onUpdateBlog,
}) => {
  const handleAddPost = () => {
    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: 'Judul Artikel Baru (Demo)',
      slug: `artikel-baru-${Date.now()}`,
      excerpt: 'Ringkasan artikel edukatif untuk menarik pembaca dan calon klien.',
      content: 'Tuliskan isi artikel lengkap di sini dengan format paragraf atau poin-poin yang mudah dipahami.',
      category: 'Tips Bisnis',
      author: 'Admin Team',
      authorRole: 'Content Specialist',
      publishDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      readTime: '3 Menit Baca',
      tags: ['Bisnis', 'Edukasi'],
      featured: false,
    };
    onUpdateBlog([...blogPosts, newPost]);
  };

  const handleDeletePost = (id: string) => {
    onUpdateBlog(blogPosts.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span>Manajemen Artikel Blog & Edukasi</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Kelola artikel tips bisnis, SEO, dan wawasan industri untuk meningkatkan visibilitas website Anda.
          </p>
        </div>

        <button
          onClick={handleAddPost}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span>Tulis Artikel Baru</span>
        </button>
      </div>

      <div className="space-y-4">
        {blogPosts.map((post, idx) => (
          <div
            key={post.id}
            className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-300">
                Artikel #{idx + 1}: {post.title}
              </span>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="p-1.5 rounded-lg hover:bg-rose-900/50 text-slate-400 hover:text-rose-400 transition-colors"
                title="Hapus Artikel"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="text-[11px] text-slate-400 block mb-1">Judul Artikel</label>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => {
                    const updated = [...blogPosts];
                    updated[idx].title = e.target.value;
                    onUpdateBlog(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Kategori</label>
                <input
                  type="text"
                  value={post.category}
                  onChange={(e) => {
                    const updated = [...blogPosts];
                    updated[idx].category = e.target.value;
                    onUpdateBlog(updated);
                  }}
                  className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Ringkasan (Excerpt)</label>
              <input
                type="text"
                value={post.excerpt}
                onChange={(e) => {
                  const updated = [...blogPosts];
                  updated[idx].excerpt = e.target.value;
                  onUpdateBlog(updated);
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Isi Artikel Lengkap</label>
              <textarea
                rows={4}
                value={post.content}
                onChange={(e) => {
                  const updated = [...blogPosts];
                  updated[idx].content = e.target.value;
                  onUpdateBlog(updated);
                }}
                className="w-full px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white font-mono"
              ></textarea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

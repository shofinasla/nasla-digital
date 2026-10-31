import React, { useState, useEffect, useRef } from 'react';
import { Testimonial, BusinessConfig } from '../types';
import {
  Star,
  Plus,
  CheckCircle2,
  X,
  ChevronLeft,
  ChevronRight,
  Quote,
  Sparkles,
} from 'lucide-react';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  business: BusinessConfig;
  onAddTestimonial: (testi: Omit<Testimonial, 'id' | 'date'>) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  business,
  onAddTestimonial,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const [location, setLocation] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [serviceOrProduct, setServiceOrProduct] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Carousel slider state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Responsive visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, testimonials.length - visibleCount);

  // Keep index within bounds if window resizes or items change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [maxIndex, currentIndex]);

  // Autoplay slider (every 5 seconds)
  useEffect(() => {
    if (isPaused || modalOpen || maxIndex === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [isPaused, modalOpen, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 40;

    if (diffX > threshold) {
      // Swiped left -> next
      handleNext();
    } else if (diffX < -threshold) {
      // Swiped right -> prev
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    onAddTestimonial({
      name: name.trim(),
      role: role.trim() || 'Pelanggan',
      company: company.trim() || 'Pengguna Layanan',
      location: location.trim() || 'Indonesia',
      comment: comment.trim(),
      rating,
      serviceOrProduct: serviceOrProduct.trim() || 'Solusi Website & Digital',
      verified: true,
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setModalOpen(false);
      setName('');
      setRole('');
      setCompany('');
      setLocation('');
      setComment('');
      setRating(5);
      setServiceOrProduct('');
      // Jump to the latest testimonial added (beginning of list)
      setCurrentIndex(0);
    }, 1500);
  };

  return (
    <section className="py-20 lg:py-28 bg-white text-slate-900 relative overflow-hidden">
      {/* Subtle decorative background glow in pure white section */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-50/60 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-50/60 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="text-center md:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>Testimoni Klien</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-heading">
              Kisah Sukses Bersama {business.brandName}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl leading-relaxed">
              Dengarkan langsung ulasan dan pengalaman nyata dari para pengusaha dan mitra yang telah mempercayakan kehadiran digital mereka kepada kami.
            </p>
          </div>

          {/* Action buttons & Slider Controls for Desktop */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 shrink-0">
            <button
              onClick={() => setModalOpen(true)}
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Tulis Ulasan Anda</span>
            </button>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Testimoni Sebelumnya"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Testimoni Selanjutnya"
                className="w-11 h-11 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 text-slate-700 hover:text-blue-600 flex items-center justify-center transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Viewport Container */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out will-change-transform"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              }}
            >
              {testimonials.map((testi) => (
                <div
                  key={testi.id}
                  className="px-3 shrink-0 box-border flex flex-col"
                  style={{
                    width: `${100 / visibleCount}%`,
                  }}
                >
                  <div className="h-full p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-blue-300 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                    <div>
                      {/* Rating Stars & Verified Tag */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < testi.rating
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-slate-200'
                              }`}
                            />
                          ))}
                        </div>

                        {testi.verified && (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/90 px-2.5 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Terverifikasi</span>
                          </span>
                        )}
                      </div>

                      {/* Decorative quote badge */}
                      <div className="mb-3 text-blue-200 group-hover:text-blue-400 transition-colors">
                        <Quote className="w-6 h-6 rotate-180 opacity-60" />
                      </div>

                      {/* Comment text */}
                      <p className="text-slate-700 text-sm sm:text-[15px] leading-relaxed italic mb-6">
                        "{testi.comment}"
                      </p>
                    </div>

                    {/* Author Details */}
                    <div className="pt-4 border-t border-slate-200/80">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm">
                          {testi.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-bold text-slate-900 truncate font-heading group-hover:text-blue-600 transition-colors">
                            {testi.name}
                          </h4>
                          <p className="text-xs text-slate-500 truncate">
                            {testi.role} • {testi.company}
                          </p>
                          <span className="text-[11px] text-blue-600 font-semibold block truncate mt-0.5">
                            {testi.serviceOrProduct}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Carousel Pagination Dots & Indicators */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Swipe guide on mobile */}
          <p className="text-xs text-slate-500 flex items-center gap-1.5 sm:order-1">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Geser untuk melihat testimoni lainnya ({currentIndex + 1} dari {maxIndex + 1})</span>
          </p>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 sm:order-2">
            {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Lihat slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2.5 bg-blue-600'
                    : 'w-2.5 h-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Mobile slider buttons */}
          <div className="flex items-center gap-2 sm:hidden sm:order-3">
            <button
              onClick={handlePrev}
              aria-label="Sebelumnya"
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-sm"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Sebelumnya</span>
            </button>
            <button
              onClick={handleNext}
              aria-label="Selanjutnya"
              className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 flex items-center gap-1 shadow-sm"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Modal Add Testimonial */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-fadeIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-heading">
                Tulis Ulasan Pengalaman Anda
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-slate-900">Terima Kasih!</h4>
                <p className="text-sm text-slate-600">
                  Ulasan Anda telah berhasil disimpan dan langsung ditambahkan ke halaman website.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="py-4 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Contoh: Hendra Wijaya"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Jabatan / Role
                    </label>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="Contoh: Owner / CEO"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Nama Perusahaan / Bisnis
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Contoh: CV Maju Selaras"
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Layanan / Produk yang Digunakan
                  </label>
                  <input
                    type="text"
                    value={serviceOrProduct}
                    onChange={(e) => setServiceOrProduct(e.target.value)}
                    placeholder="Contoh: Website Perusahaan & SEO"
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Rating Bintang (1 - 5)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1.5 focus:outline-none cursor-pointer"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= rating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Isi Ulasan & Pengalaman *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Ceritakan pengalaman Anda bekerja sama dengan tim kami..."
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100 cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all"
                  >
                    Kirim Ulasan
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

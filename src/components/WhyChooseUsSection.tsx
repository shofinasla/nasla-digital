import React, { useState, useEffect, useCallback } from 'react';
import { WhyChooseUsItem } from '../types';
import { DynamicIcon } from './DynamicIcon';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
} from 'lucide-react';

interface WhyChooseUsSectionProps {
  items: WhyChooseUsItem[];
  brandName: string;
}

export const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  items,
  brandName,
}) => {
  const total = items.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= total - 1 ? 0 : prev + 1));
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? total - 1 : prev - 1));
  }, [total]);

  // Autoplay timer for mobile slider
  useEffect(() => {
    if (!isPlaying || total <= 1) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, total, handleNext]);

  // Touch swipe gesture handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45; // 45px swipe threshold

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  if (!items.length) return null;

  return (
    <section
      id="mengapa-memilih-kami"
      aria-label={`Mengapa Memilih ${brandName}`}
      className="py-16 sm:py-20 lg:py-28 bg-[#071A3D] text-white relative overflow-hidden"
    >
      {/* Background Subtle Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Grid Pattern Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Keunggulan Kompetitif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading">
            Mengapa Memilih {brandName}?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            Kami mengutamakan kualitas eksekusi, kecepatan performa, dan kemudahan pengelolaan jangka panjang untuk setiap klien kami.
          </p>
        </div>

        {/* =========================================================================
            MOBILE SLIDER VIEW (< md)
            Touch-enabled carousel with swipe, navigation, counter & dots
           ========================================================================= */}
        <div
          className="block md:hidden relative"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          {/* Top Controls Bar for Mobile: Counter & Autoplay */}
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-blue-900/60 text-xs font-mono text-cyan-300">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Keunggulan</span>
              <span className="font-bold text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">
                {String(total).padStart(2, '0')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? 'Jeda otomatis' : 'Putar otomatis'}
                className="w-8 h-8 rounded-full bg-slate-900/80 border border-blue-900/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 flex items-center justify-center transition-all"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5 text-cyan-400" />
                )}
              </button>

              <span className="text-[11px] text-slate-400 font-medium hidden xs:inline">
                Geser untuk jelajah
              </span>
            </div>
          </div>

          {/* Slider Viewport & Cards */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {items.map((item, index) => (
                <div
                  key={item.id}
                  className="w-full shrink-0 px-1"
                  aria-hidden={index !== currentIndex}
                >
                  <div className="p-7 rounded-3xl bg-slate-900/95 border border-blue-900/50 shadow-xl shadow-blue-950/40 relative flex flex-col justify-between min-h-[300px]">
                    {/* Top Row: Icon, Index Number & Badge */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
                          <DynamicIcon name={item.iconName} className="w-7 h-7" />
                        </div>
                        <div className="flex items-center gap-2">
                          {item.badge && (
                            <span className="px-3 py-1 rounded-full bg-blue-950/90 text-cyan-300 border border-blue-800 text-xs font-semibold">
                              {item.badge}
                            </span>
                          )}
                          <span className="text-xs font-mono font-bold text-slate-500">
                            #{String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-white font-heading mb-3 text-cyan-50">
                        {item.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    {/* Bottom Status / Indicator Accent */}
                    <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                      <span className="text-cyan-400 font-medium">Standar Layanan Unggul</span>
                      <span className="text-slate-500">NASLA DIGITAL</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Bottom Navigation: Prev/Next & Dots */}
          <div className="flex items-center justify-between mt-6 px-2">
            {/* Prev Button */}
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Keunggulan sebelumnya"
              className="w-11 h-11 rounded-full bg-slate-900/90 border border-blue-900/60 text-white hover:border-cyan-500 hover:text-cyan-300 active:scale-95 flex items-center justify-center shadow-md transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Dots */}
            <div className="flex items-center gap-1.5" role="tablist">
              {items.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Buka keunggulan ${index + 1}`}
                  role="tab"
                  aria-selected={currentIndex === index}
                  className={`transition-all duration-300 rounded-full h-2.5 ${
                    currentIndex === index
                      ? 'w-7 bg-gradient-to-r from-blue-500 to-cyan-400'
                      : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={handleNext}
              aria-label="Keunggulan berikutnya"
              className="w-11 h-11 rounded-full bg-slate-900/90 border border-blue-900/60 text-white hover:border-cyan-500 hover:text-cyan-300 active:scale-95 flex items-center justify-center shadow-md transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* =========================================================================
            DESKTOP GRID VIEW (>= md)
            Full grid scannable across 2/3 columns with hover elevations
           ========================================================================= */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="p-8 rounded-3xl bg-slate-900/80 border border-blue-900/40 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
                    <DynamicIcon name={item.iconName} className="w-7 h-7" />
                  </div>
                  <div className="flex items-center gap-2">
                    {item.badge && (
                      <span className="px-3 py-1 rounded-full bg-blue-950 text-cyan-300 border border-blue-800 text-xs font-semibold">
                        {item.badge}
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-cyan-400 transition-colors">
                      #{String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-5 mt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                <span className="group-hover:text-cyan-400 transition-colors">Keunggulan #{index + 1}</span>
                <span className="font-medium text-slate-400">NASLA DIGITAL</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

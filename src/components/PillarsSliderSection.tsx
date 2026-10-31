import React, { useState, useEffect, useRef, useCallback } from 'react';
import { VisionMissionConfig, CoreValue } from '../types';
import { DynamicIcon } from './DynamicIcon';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface PillarsSliderSectionProps {
  visionMission: VisionMissionConfig;
  brandName?: string;
  onNavigateContact?: () => void;
}

export const PillarsSliderSection: React.FC<PillarsSliderSectionProps> = ({
  visionMission,
  brandName = 'NASLA DIGITAL',
  onNavigateContact,
}) => {
  const items: CoreValue[] = visionMission.values || [];
  const total = items.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Responsive cards per view: 1 on mobile, 2 on tablet (md), 3 on desktop (lg)
  const [cardsPerView, setCardsPerView] = useState(3);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth < 768) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, total - cardsPerView);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  // Autoplay interval
  useEffect(() => {
    if (!isPlaying || total <= cardsPerView) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [isPlaying, cardsPerView, total, handleNext]);

  // Touch Swipe Handlers for mobile
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
    const minSwipeDistance = 50;

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
      id="pilar-nilai"
      aria-label="Pilar Nilai & Komitmen Kerja Kami"
      className="py-20 lg:py-28 bg-[#071A3D] text-white relative overflow-hidden select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2"></div>
      <div className="absolute -bottom-24 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

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
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/90 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Standar Keunggulan {brandName}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-heading leading-tight">
              {visionMission.valuesHeading || 'Pilar Nilai & Komitmen Kerja Kami'}
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              {visionMission.valuesSubheading ||
                'Setiap karya yang lahir dari NASLA DIGITAL dilandasi dedikasi tinggi, estetika modern, dan presisi teknis.'}
            </p>
          </div>

          {/* Navigation Controls & Status */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Slide Index Counter */}
            <div className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-blue-900/60 text-xs font-mono text-cyan-300">
              <span className="font-bold text-white">
                {String(currentIndex + 1).padStart(2, '0')}
              </span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">
                {String(maxIndex + 1).padStart(2, '0')}
              </span>
            </div>

            {/* Autoplay Toggle */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Jeda tayangan otomatis' : 'Mulai tayangan otomatis'}
              className="p-2.5 rounded-xl bg-slate-900/80 border border-blue-900/60 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/50 transition-all cursor-pointer"
              title={isPlaying ? 'Jeda Putar Otomatis' : 'Putar Otomatis'}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {/* Prev & Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Geser ke slide sebelumnya"
                className="w-11 h-11 rounded-xl bg-slate-900/90 border border-blue-900/60 hover:border-cyan-400 hover:bg-blue-950 text-white flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer shadow-lg shadow-black/20"
              >
                <ChevronLeft className="w-5 h-5 text-slate-200 hover:text-cyan-300" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Geser ke slide berikutnya"
                className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Slider Container */}
        <div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-out will-change-transform"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
            }}
          >
            {items.map((val, index) => {
              const formattedNumber = String(index + 1).padStart(2, '0');
              const isFirst = index === currentIndex;

              return (
                <div
                  key={val.id}
                  style={{ width: `${100 / cardsPerView}%` }}
                  className="flex-shrink-0 px-3 md:px-3.5 py-2"
                >
                  <div className="h-full flex flex-col justify-between p-7 lg:p-8 rounded-3xl bg-slate-900/90 border border-blue-900/50 hover:border-cyan-400/60 hover:bg-slate-900 transition-all duration-300 group shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 hover:-translate-y-1 relative overflow-hidden">
                    {/* Top Accent Gradient Border */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-400 to-transparent opacity-60 group-hover:opacity-100 transition-opacity"></div>

                    {/* Top Row: Index Watermark & Badge */}
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                          <DynamicIcon name={val.iconName} className="w-7 h-7" />
                        </div>

                        <div className="flex items-center gap-2">
                          {val.badge && (
                            <span className="px-3 py-1 rounded-full bg-blue-950/90 text-cyan-300 border border-cyan-500/30 text-xs font-semibold tracking-wide shadow-sm">
                              {val.badge}
                            </span>
                          )}
                          <span className="text-2xl font-black font-mono text-slate-700/80 group-hover:text-cyan-400/40 transition-colors">
                            #{formattedNumber}
                          </span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-white font-heading mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                        {val.title}
                      </h3>

                      {/* Description */}
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                        {val.desc}
                      </p>
                    </div>

                    {/* Bottom Area: Key Metric & Highlights */}
                    <div className="mt-4 pt-5 border-t border-slate-800/80 space-y-4">
                      {/* Metric Callout */}
                      {val.metric && (
                        <div className="flex items-baseline gap-2 p-3 rounded-2xl bg-blue-950/60 border border-blue-900/40">
                          <span className="text-2xl font-extrabold text-cyan-300 font-heading">
                            {val.metric}
                          </span>
                          <span className="text-xs text-slate-300 font-medium">
                            {val.metricLabel || 'Standar Mutu'}
                          </span>
                        </div>
                      )}

                      {/* Bullet Highlights */}
                      {val.highlights && val.highlights.length > 0 && (
                        <div className="space-y-2">
                          {val.highlights.map((hl, hlIdx) => (
                            <div
                              key={hlIdx}
                              className="flex items-start gap-2 text-xs text-slate-300"
                            >
                              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                              <span className="leading-tight">{hl}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
            const isActive = dotIdx === currentIndex;
            return (
              <button
                key={dotIdx}
                onClick={() => setCurrentIndex(dotIdx)}
                aria-label={`Buka slide ke-${dotIdx + 1}`}
                className={`transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-8 h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 shadow-sm shadow-cyan-400/50'
                    : 'w-2.5 h-2.5 rounded-full bg-slate-700 hover:bg-slate-500'
                }`}
              />
            );
          })}
        </div>

        {/* Bottom Sub-CTA Link */}
        {onNavigateContact && (
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900/80 border border-blue-900/40 text-slate-300 text-sm">
              <span className="text-slate-300">
                Ingin konsultasikan proyek impian Anda dengan standar dedikasi teknis kami?
              </span>
              <button
                onClick={onNavigateContact}
                className="inline-flex items-center gap-1.5 font-bold text-cyan-300 hover:text-cyan-200 transition-colors cursor-pointer group"
              >
                <span>Mulai Konsultasi Gratis</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

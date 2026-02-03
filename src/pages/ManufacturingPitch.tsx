import React, { useState, useEffect, useCallback } from 'react';
import { manufacturingTransformationSlides, totalMfgSlides } from '@/data/manufacturingTransformationSlides';
import { MfgSlideRenderer } from '@/components/pitch/manufacturing/MfgSlideRenderer';
import { ChevronLeft, ChevronRight, Presentation, Grid3X3 } from 'lucide-react';

const ManufacturingPitch: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPresenting, setIsPresenting] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < totalMfgSlides) {
      setCurrentSlide(index);
      setShowThumbnails(false);
    }
  }, []);

  const nextSlide = useCallback(() => {
    if (currentSlide < totalMfgSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  }, [currentSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  }, [currentSlide]);

  const togglePresentationMode = useCallback(() => {
    if (!isPresenting) {
      document.documentElement.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsPresenting(!isPresenting);
  }, [isPresenting]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          nextSlide();
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          prevSlide();
          break;
        case 'Escape':
          setIsPresenting(false);
          setShowThumbnails(false);
          break;
        case 'p':
        case 'P':
          togglePresentationMode();
          break;
        case 'g':
        case 'G':
          setShowThumbnails(!showThumbnails);
          break;
        case 'Home':
          goToSlide(0);
          break;
        case 'End':
          goToSlide(totalMfgSlides - 1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, togglePresentationMode, goToSlide, showThumbnails]);

  // Handle fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsPresenting(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const slide = manufacturingTransformationSlides[currentSlide];

  return (
    <div className="relative w-full h-screen bg-slate-100 overflow-hidden">
      {/* Main Slide Content */}
      <div className="w-full h-full">
        <MfgSlideRenderer
          slide={slide}
          slideNumber={currentSlide + 1}
          totalSlides={totalMfgSlides}
        />
      </div>

      {/* Navigation Controls - Hidden in presentation mode */}
      {!isPresenting && (
        <>
          {/* Bottom Navigation Bar */}
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg border border-slate-200">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-slate-700" />
            </button>

            {/* Slide Counter */}
            <div className="flex items-center gap-2 px-4">
              <span className="text-lg font-bold text-slate-800">{currentSlide + 1}</span>
              <span className="text-slate-400">/</span>
              <span className="text-lg text-slate-500">{totalMfgSlides}</span>
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalMfgSlides - 1}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-slate-700" />
            </button>

            {/* Divider */}
            <div className="w-px h-8 bg-slate-200" />

            {/* Thumbnails Toggle */}
            <button
              onClick={() => setShowThumbnails(!showThumbnails)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                showThumbnails ? 'bg-amber-100 text-amber-600' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
              title="Show slide grid (G)"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>

            {/* Presentation Mode */}
            <button
              onClick={togglePresentationMode}
              className="w-10 h-10 rounded-full bg-amber-500 hover:bg-amber-600 flex items-center justify-center transition-colors"
              title="Presentation mode (P)"
            >
              <Presentation className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Slide Progress Bar */}
          <div className="fixed bottom-0 left-0 right-0 h-1 bg-slate-200 z-40">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
              style={{ width: `${((currentSlide + 1) / totalMfgSlides) * 100}%` }}
            />
          </div>
        </>
      )}

      {/* Thumbnail Grid Overlay */}
      {showThumbnails && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-auto p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Slide Navigator</h2>
              <button
                onClick={() => setShowThumbnails(false)}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
              >
                Close (Esc)
              </button>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {manufacturingTransformationSlides.map((s, index) => (
                <button
                  key={s.id}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-video bg-white rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                    index === currentSlide ? 'border-amber-500 ring-2 ring-amber-500/50' : 'border-transparent hover:border-white/50'
                  }`}
                >
                  <div className="absolute inset-0 p-2 flex flex-col justify-between">
                    <div className="text-left">
                      <span className="text-xs font-bold text-amber-600">#{index + 1}</span>
                      <p className="text-xs font-medium text-slate-800 line-clamp-2">
                        {s.headline || s.type}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500 capitalize">{s.type.replace('mfg-', '')}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcut Hint */}
      {!isPresenting && (
        <div className="fixed top-4 left-4 z-40 text-xs text-slate-400">
          <span className="bg-slate-800/50 px-2 py-1 rounded text-white">←→</span> Navigate
          <span className="mx-2">|</span>
          <span className="bg-slate-800/50 px-2 py-1 rounded text-white">P</span> Present
          <span className="mx-2">|</span>
          <span className="bg-slate-800/50 px-2 py-1 rounded text-white">G</span> Grid
        </div>
      )}
    </div>
  );
};

export default ManufacturingPitch;

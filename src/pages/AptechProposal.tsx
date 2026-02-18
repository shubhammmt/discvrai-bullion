import React, { useState, useEffect } from 'react';
import { aptechCBOSlides } from '@/data/aptechCBOSlides';
import { CBOSlideRenderer } from '@/components/proposal/aptech/CBOSlideRenderer';
import { ChevronLeft, ChevronRight, Eye, EyeOff, LayoutGrid, X } from 'lucide-react';

const AptechProposal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);
  const [gridView, setGridView] = useState(false);

  const totalSlides = aptechCBOSlides.length;

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) setCurrentSlide(s => s + 1);
  };
  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(s => s - 1);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (gridView) {
        if (e.key === 'Escape') setGridView(false);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'p' || e.key === 'P') setPresentationMode(prev => !prev);
      if (e.key === 'Escape') setPresentationMode(false);
      if (e.key === 'g' || e.key === 'G') setGridView(prev => !prev);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentSlide, gridView]);

  const currentSlideData = aptechCBOSlides[currentSlide];

  return (
    <div className="h-screen bg-slate-100 overflow-hidden relative">
      {/* Slide content */}
      <CBOSlideRenderer
        slide={currentSlideData}
        slideNumber={currentSlide + 1}
        totalSlides={totalSlides}
      />

      {/* Grid overlay */}
      {gridView && (
        <div className="fixed inset-0 z-50 bg-slate-900/95 overflow-auto p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white font-bold text-lg">All Slides</h2>
            <button
              onClick={() => setGridView(false)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {aptechCBOSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => { setCurrentSlide(index); setGridView(false); }}
                className={`rounded-xl overflow-hidden border-2 transition-all text-left ${
                  index === currentSlide
                    ? 'border-blue-500 shadow-lg shadow-blue-500/30'
                    : 'border-slate-700 hover:border-slate-400'
                }`}
              >
                <div className="bg-white aspect-video flex flex-col p-3 relative">
                  <div className="text-[8px] font-bold text-blue-600 uppercase tracking-wider mb-1">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] font-semibold text-slate-800 leading-tight">
                    {slide.title}
                  </div>
                  {slide.headline && (
                    <div className="text-[8px] text-slate-500 mt-1 leading-tight line-clamp-2">
                      {slide.headline}
                    </div>
                  )}
                  {index === currentSlide && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-500" />
                  )}
                </div>
                <div className="bg-slate-800 px-2 py-1">
                  <p className="text-slate-300 text-[9px] truncate">{slide.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Top Controls */}
      {!presentationMode && !gridView && (
        <div className="fixed top-3 left-3 z-50 flex items-center gap-2">
          <button
            onClick={() => setPresentationMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 backdrop-blur-sm border border-blue-200 text-blue-700 hover:bg-blue-100 transition-all text-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Present (P)</span>
          </button>
          <button
            onClick={() => setGridView(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-50 backdrop-blur-sm border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all text-xs"
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Grid (G)</span>
          </button>
        </div>
      )}

      {/* Exit Presentation Mode */}
      {presentationMode && (
        <button
          onClick={() => setPresentationMode(false)}
          className="fixed top-3 left-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-black/40 hover:bg-black/10 hover:text-black/70 transition-all text-xs opacity-0 hover:opacity-100"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Exit (Esc)</span>
        </button>
      )}

      {/* Navigation */}
      {!presentationMode && !gridView && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-200 shadow-sm">
            {aptechCBOSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-200 ${
                  index === currentSlide
                    ? 'w-6 h-2 bg-blue-600 rounded-full'
                    : 'w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            disabled={currentSlide === totalSlides - 1}
            className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Slide label */}
      {!presentationMode && !gridView && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <span className="text-slate-600 text-xs bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 border border-slate-200 shadow-sm">
            {currentSlideData.title}
          </span>
        </div>
      )}

      {/* Keyboard hints */}
      {!presentationMode && !gridView && (
        <div className="fixed bottom-6 right-6 z-50 text-slate-400 text-xs space-y-1 text-right">
          <p>← → Navigate</p>
          <p>G — Grid view</p>
          <p>P — Present</p>
        </div>
      )}
    </div>
  );
};

export default AptechProposal;

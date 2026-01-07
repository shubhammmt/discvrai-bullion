import React, { useState, useEffect } from 'react';
import { enterprisePitchSlides } from '@/data/enterprisePitchSlides';
import { EnterpriseSlideRenderer } from '@/components/pitch/enterprise/EnterpriseSlideRenderer';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

const EnterprisePitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);

  const nextSlide = () => {
    if (currentSlide < enterprisePitchSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'p' || e.key === 'P') setPresentationMode(prev => !prev);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const currentSlideData = enterprisePitchSlides[currentSlide];

  return (
    <div className="h-screen bg-slate-950 overflow-hidden relative">
      <EnterpriseSlideRenderer slide={currentSlideData} />
      
      {/* Top Controls - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="fixed top-3 left-3 z-50">
          <button
            onClick={() => setPresentationMode(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 hover:bg-white/20 hover:text-white transition-all text-xs"
          >
            <Eye className="w-3 h-3" />
            <span>Present</span>
          </button>
        </div>
      )}
      
      {/* Exit Presentation Mode */}
      {presentationMode && (
        <button
          onClick={() => setPresentationMode(false)}
          className="fixed top-3 left-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white/40 hover:bg-white/10 hover:text-white/70 transition-all text-xs"
        >
          <EyeOff className="w-3 h-3" />
          <span>Exit (P)</span>
        </button>
      )}
      
      {/* Navigation - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {enterprisePitchSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'w-6 bg-white' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === enterprisePitchSlides.length - 1}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Slide counter - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="fixed top-6 right-6 z-50">
          <span className="text-white/40 text-sm font-mono">
            {String(currentSlide + 1).padStart(2, '0')} / {String(enterprisePitchSlides.length).padStart(2, '0')}
          </span>
        </div>
      )}
    </div>
  );
};

export default EnterprisePitch;

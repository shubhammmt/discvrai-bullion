import React, { useState, useEffect } from 'react';
import { enterprisePitchSlides } from '@/data/enterprisePitchSlides';
import { EnterpriseSlideRenderer } from '@/components/pitch/enterprise/EnterpriseSlideRenderer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const EnterprisePitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

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
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const currentSlideData = enterprisePitchSlides[currentSlide];

  return (
    <div className="h-screen bg-slate-950 overflow-hidden relative">
      <EnterpriseSlideRenderer slide={currentSlideData} />
      
      {/* Navigation */}
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
      
      {/* Slide counter */}
      <div className="fixed top-6 right-6 z-50">
        <span className="text-white/40 text-sm font-mono">
          {String(currentSlide + 1).padStart(2, '0')} / {String(enterprisePitchSlides.length).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
};

export default EnterprisePitch;

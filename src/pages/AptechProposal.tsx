import React, { useState, useEffect } from 'react';
import { aptechProposalSlides } from '@/data/aptechProposalSlides';
import { AptechSlideRenderer } from '@/components/pitch/aptech/AptechSlideRenderer';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

const AptechProposal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);

  const nextSlide = () => {
    if (currentSlide < aptechProposalSlides.length - 1) {
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
      if (e.key === 'Escape') setPresentationMode(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const currentSlideData = aptechProposalSlides[currentSlide];
  const totalSlides = aptechProposalSlides.length;

  return (
    <div className="h-screen bg-white overflow-hidden relative">
      {/* Slide content */}
      <AptechSlideRenderer 
        slide={currentSlideData} 
        slideNumber={currentSlide + 1}
        totalSlides={totalSlides}
      />
      
      {/* Top Controls - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="fixed top-3 left-3 z-50 flex items-center gap-2">
          <button
            onClick={() => setPresentationMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-100 backdrop-blur-sm border border-orange-300 text-orange-600 hover:bg-orange-200 transition-all text-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Present (P)</span>
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
      
      {/* Navigation - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="w-10 h-10 rounded-full bg-orange-100 backdrop-blur-sm border border-orange-300 flex items-center justify-center text-orange-600 hover:bg-orange-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 border border-slate-200">
            {aptechProposalSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-200 ${
                  index === currentSlide 
                    ? 'w-6 h-2 bg-orange-500 rounded-full' 
                    : 'w-2 h-2 bg-slate-300 rounded-full hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === aptechProposalSlides.length - 1}
            className="w-10 h-10 rounded-full bg-orange-100 backdrop-blur-sm border border-orange-300 flex items-center justify-center text-orange-600 hover:bg-orange-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
      
      {/* Slide title hint - Hidden in presentation mode */}
      {!presentationMode && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
          <span className="text-slate-500 text-xs bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 border border-slate-200">
            {currentSlideData.title}
          </span>
        </div>
      )}
      
      {/* Keyboard hints */}
      {!presentationMode && (
        <div className="fixed bottom-6 right-6 z-50 text-slate-400 text-xs space-y-1">
          <p>← → Navigate slides</p>
          <p>P - Present mode</p>
        </div>
      )}
    </div>
  );
};

export default AptechProposal;

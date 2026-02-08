import React, { useState, useEffect } from 'react';
import { reaSlides, totalREASlides } from '@/data/reaProposalSlides';
import { REASlideRenderer } from '@/components/proposal/rea/REASlideRenderer';
import { ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';

const REAProposal: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [presentationMode, setPresentationMode] = useState(false);

  const nextSlide = () => {
    if (currentSlide < totalREASlides - 1) setCurrentSlide(currentSlide + 1);
  };

  const prevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(currentSlide - 1);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      if (e.key === 'p' || e.key === 'P') setPresentationMode(prev => !prev);
      if (e.key === 'Escape') setPresentationMode(false);
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  return (
    <div className="h-screen bg-gray-100 overflow-hidden relative">
      <REASlideRenderer
        slide={reaSlides[currentSlide]}
        slideNumber={currentSlide + 1}
        totalSlides={totalREASlides}
      />

      {!presentationMode && (
        <div className="fixed top-3 left-3 z-50">
          <button
            onClick={() => setPresentationMode(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-600/10 backdrop-blur-sm border border-blue-600/30 text-blue-700 hover:bg-blue-600/20 transition-all text-xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Present (P)</span>
          </button>
        </div>
      )}

      {presentationMode && (
        <button
          onClick={() => setPresentationMode(false)}
          className="fixed top-3 left-3 z-50 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/5 backdrop-blur-sm border border-black/10 text-gray-400 hover:bg-black/10 hover:text-gray-700 transition-all text-xs opacity-0 hover:opacity-100"
        >
          <EyeOff className="w-3.5 h-3.5" />
          <span>Exit (Esc)</span>
        </button>
      )}

      {!presentationMode && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
          <button onClick={prevSlide} disabled={currentSlide === 0} className="w-10 h-10 rounded-full bg-blue-600/10 backdrop-blur-sm border border-blue-600/30 flex items-center justify-center text-blue-700 hover:bg-blue-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-sm rounded-full px-3 py-2 border border-gray-200 shadow-sm">
            {reaSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-200 ${
                  index === currentSlide
                    ? 'w-6 h-2 bg-blue-600 rounded-full'
                    : 'w-2 h-2 bg-blue-600/30 rounded-full hover:bg-blue-600/50'
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide} disabled={currentSlide === totalREASlides - 1} className="w-10 h-10 rounded-full bg-blue-600/10 backdrop-blur-sm border border-blue-600/30 flex items-center justify-center text-blue-700 hover:bg-blue-600/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {!presentationMode && (
        <>
          <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
            <span className="text-gray-500 text-xs bg-white/80 backdrop-blur-sm rounded-full px-4 py-1.5 border border-gray-200 shadow-sm">
              {reaSlides[currentSlide].title}
            </span>
          </div>
          <div className="fixed bottom-6 right-6 z-50 text-gray-400 text-xs space-y-1">
            <p>← → Navigate slides</p>
            <p>P - Present mode</p>
          </div>
        </>
      )}
    </div>
  );
};

export default REAProposal;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MasterTrustSlideRenderer } from '@/components/proposal/mastertrust/MasterTrustSlideRenderer';
import { masterTrustProposalSlides } from '@/data/masterTrustProposalSlides';
import { ChevronLeft, ChevronRight, Bot } from 'lucide-react';

const MasterTrustProposal = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, masterTrustProposalSlides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Slide container - 16:9 aspect ratio */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div 
          className="w-full bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{ 
            maxWidth: '1280px',
            aspectRatio: '16 / 9'
          }}
        >
          <MasterTrustSlideRenderer slide={masterTrustProposalSlides[currentSlide]} />
        </div>
      </div>

      {/* Navigation bar */}
      <div className="bg-white border-t border-slate-200 px-8 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-emerald-600" />
            <span className="font-semibold text-slate-700">Discvr AI</span>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-2">
            {masterTrustProposalSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-emerald-600 w-6' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {currentSlide + 1} / {masterTrustProposalSlides.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === masterTrustProposalSlides.length - 1}
                className="p-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterTrustProposal;

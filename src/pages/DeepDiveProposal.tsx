import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DeepDiveSlideRenderer } from '@/components/proposal/deepdive/DeepDiveSlideRenderer';
import { deepDiveSlides } from '@/data/deepDiveProposalSlides';
import { ChevronLeft, ChevronRight, Bot } from 'lucide-react';

const DeepDiveProposal = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, deepDiveSlides.length - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); nextSlide(); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); prevSlide(); }
      else if (e.key === 'Escape') { navigate('/'); }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  const sectionColors: Record<string, string> = {
    cover: 'bg-slate-800',
    nudges: 'bg-blue-600',
    personalization: 'bg-purple-600',
    distributor: 'bg-teal-600',
    summary: 'bg-slate-700',
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div
          className="w-full bg-white shadow-2xl rounded-lg overflow-hidden"
          style={{ maxWidth: '1280px', aspectRatio: '16 / 9' }}
        >
          <DeepDiveSlideRenderer
            slide={deepDiveSlides[currentSlide]}
            slideNumber={currentSlide + 1}
            totalSlides={deepDiveSlides.length}
          />
        </div>
      </div>

      <div className="bg-white border-t border-slate-200 px-8 py-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-slate-700" />
            <span className="font-semibold text-slate-700">DiscvrAI</span>
            <span className="text-xs text-slate-400 ml-2">Deep Dive</span>
          </div>

          <div className="flex items-center gap-1.5">
            {deepDiveSlides.map((slide, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? `w-6 ${sectionColors[slide.section]}`
                    : `w-2 ${sectionColors[slide.section]} opacity-30 hover:opacity-60`
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {currentSlide + 1} / {deepDiveSlides.length}
            </span>
            <div className="flex gap-2">
              <button onClick={prevSlide} disabled={currentSlide === 0} className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button onClick={nextSlide} disabled={currentSlide === deepDiveSlides.length - 1} className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepDiveProposal;

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DeepCoverSlide } from '@/components/proposal/deep-industries/DeepCoverSlide';
import { DeepOpportunitySlide } from '@/components/proposal/deep-industries/DeepOpportunitySlide';
import { DeepChallengeSlide } from '@/components/proposal/deep-industries/DeepChallengeSlide';
import { DeepSolutionSlide } from '@/components/proposal/deep-industries/DeepSolutionSlide';
import { DeepProofSlide } from '@/components/proposal/deep-industries/DeepProofSlide';
import { DeepNextStepsSlide } from '@/components/proposal/deep-industries/DeepNextStepsSlide';

const slides = [
  DeepCoverSlide,
  DeepOpportunitySlide,
  DeepChallengeSlide,
  DeepSolutionSlide,
  DeepProofSlide,
  DeepNextStepsSlide,
];

const DeepIndustriesProposal: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        setCurrent(c => Math.min(c + 1, slides.length - 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrent(c => Math.max(c - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  const SlideComponent = slides[current];

  return (
    <div className="w-screen h-screen bg-slate-950 overflow-hidden relative">
      <SlideComponent />

      {/* Navigation */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-full px-5 py-2.5 border border-white/10">
        <button
          onClick={() => setCurrent(c => Math.max(c - 1, 0))}
          disabled={current === 0}
          className="p-1.5 rounded-full text-white/70 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all ${
                i === current ? 'bg-teal-400 w-6' : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrent(c => Math.min(c + 1, slides.length - 1))}
          disabled={current === slides.length - 1}
          className="p-1.5 rounded-full text-white/70 hover:text-white disabled:opacity-30 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <span className="text-white/50 text-xs font-mono ml-2">
          {current + 1} / {slides.length}
        </span>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 px-8 pb-2 flex justify-between text-[10px] text-white/20 z-40">
        <span>Confidential | DiscvrAI | March 2026</span>
      </div>
    </div>
  );
};

export default DeepIndustriesProposal;

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

      {/* Minimal footer */}
      <div className="fixed bottom-0 left-0 right-0 px-8 pb-2 flex justify-between text-[10px] text-white/20 z-40">
        <span>Confidential | DiscvrAI | March 2026</span>
        <span className="font-mono">{current + 1} / {slides.length}</span>
      </div>
    </div>
  );
};

export default DeepIndustriesProposal;

import React, { useState, useEffect } from 'react';
import { NbfcCoverSlide } from '@/components/proposal/nbfc/NbfcCoverSlide';
import { NbfcOpportunitySlide } from '@/components/proposal/nbfc/NbfcOpportunitySlide';
import { NbfcChallengeSlide } from '@/components/proposal/nbfc/NbfcChallengeSlide';
import { NbfcSolutionSlide } from '@/components/proposal/nbfc/NbfcSolutionSlide';
import { NbfcUnderwritingSlide } from '@/components/proposal/nbfc/NbfcUnderwritingSlide';
import { NbfcCollectionsSlide } from '@/components/proposal/nbfc/NbfcCollectionsSlide';
import { NbfcSegmentsSlide } from '@/components/proposal/nbfc/NbfcSegmentsSlide';
import { NbfcNextStepsSlide } from '@/components/proposal/nbfc/NbfcNextStepsSlide';

const slides = [
  NbfcCoverSlide,
  NbfcOpportunitySlide,
  NbfcChallengeSlide,
  NbfcSolutionSlide,
  NbfcUnderwritingSlide,
  NbfcCollectionsSlide,
  NbfcSegmentsSlide,
  NbfcNextStepsSlide,
];

const NbfcProposal: React.FC = () => {
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
    <div className="w-screen h-screen bg-[#0a0e1a] overflow-hidden relative">
      <SlideComponent />
      <div className="fixed bottom-0 left-0 right-0 px-8 pb-2 flex justify-between text-[10px] text-white/20 z-40">
        <span>Confidential | DiscvrAI | March 2026</span>
        <span className="font-mono">{current + 1} / {slides.length}</span>
      </div>
    </div>
  );
};

export default NbfcProposal;

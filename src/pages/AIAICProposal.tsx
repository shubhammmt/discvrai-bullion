import React, { useState, useEffect } from 'react';
import { AIAICCoverSlide } from '@/components/proposal/aiaic/AIAICCoverSlide';
import { AIAICPillarsSlide } from '@/components/proposal/aiaic/AIAICPillarsSlide';
import { AIAICFitSlide } from '@/components/proposal/aiaic/AIAICFitSlide';

const slides = [AIAICCoverSlide, AIAICPillarsSlide, AIAICFitSlide];

const AIAICProposal: React.FC = () => {
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
    <div className="w-screen h-screen bg-[#f8faf6] overflow-hidden relative">
      <SlideComponent />
    </div>
  );
};

export default AIAICProposal;

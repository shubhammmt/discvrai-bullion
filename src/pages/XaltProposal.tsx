import React, { useState, useEffect } from 'react';
import { xaltProposalSlides } from '@/data/xaltProposalSlides';
import { XaltSlideRenderer } from '@/components/proposal/xalt/XaltSlideRenderer';

const XaltProposal = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < xaltProposalSlides.length - 1) {
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

  const currentSlideData = xaltProposalSlides[currentSlide];

  return (
    <div className="h-screen bg-white overflow-hidden">
      <XaltSlideRenderer 
        slide={currentSlideData} 
        slideNumber={currentSlide + 1}
        totalSlides={xaltProposalSlides.length}
      />
    </div>
  );
};

export default XaltProposal;

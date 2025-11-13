import React, { useState, useEffect } from 'react';
import { partnerDistributionSlides } from '@/data/partnerDistributionSlides';
import { PartnerSlideRenderer } from '@/components/pitch/partner/PartnerSlideRenderer';

const PartnerDistribution = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < partnerDistributionSlides.length - 1) {
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
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide]);

  const currentSlideData = partnerDistributionSlides[currentSlide];

  return (
    <div className="h-screen bg-background overflow-hidden">
      <PartnerSlideRenderer slide={currentSlideData} />
    </div>
  );
};

export default PartnerDistribution;

import React, { useState, useEffect } from 'react';
import { amcPitchSlides } from '@/data/amcPitchSlides';
import { AMCSlideRenderer } from '@/components/pitch/amc/AMCSlideRenderer';

const AMCPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < amcPitchSlides.length - 1) {
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

  const currentSlideData = amcPitchSlides[currentSlide];

  return (
    <div className="h-screen bg-background overflow-hidden">
      <AMCSlideRenderer slide={currentSlideData} />
    </div>
  );
};

export default AMCPitch;

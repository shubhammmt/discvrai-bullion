import React, { useState, useEffect } from 'react';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PitchNavigation } from '@/components/pitch/PitchNavigation';
import { PitchHeader } from '@/components/pitch/PitchHeader';
import { contestSponsorshipPitchSlides } from '@/data/contestSponsorshipPitchSlides';

const ContestSponsorshipPitch = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === ' ') {
        setCurrentSlide((prev) => Math.min(prev + 1, contestSponsorshipPitchSlides.length - 1));
      } else if (event.key === 'ArrowLeft') {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, contestSponsorshipPitchSlides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  if (!contestSponsorshipPitchSlides || contestSponsorshipPitchSlides.length === 0) {
    return <div className="text-center text-red-500">No slides available</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <PitchHeader 
        currentSlide={currentSlide}
        totalSlides={contestSponsorshipPitchSlides.length}
      />
      
      <div className="pt-16">
        <div className="max-w-6xl mx-auto p-8">
          <SlideRenderer slide={contestSponsorshipPitchSlides[currentSlide]} />
        </div>
        
        <PitchNavigation
          currentSlide={currentSlide}
          totalSlides={contestSponsorshipPitchSlides.length}
          onNextSlide={nextSlide}
          onPrevSlide={prevSlide}
          onGoToSlide={goToSlide}
        />
      </div>
    </div>
  );
};

export default ContestSponsorshipPitch;
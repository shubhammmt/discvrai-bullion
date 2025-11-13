import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
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
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="min-h-screen">
        {/* Slide Content */}
        <div className="min-h-screen">
          <AMCSlideRenderer slide={currentSlideData} />
        </div>

        {/* Navigation Controls */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl print:hidden z-50">
          <Button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">
              Slide {currentSlide + 1} of {amcPitchSlides.length}
            </span>
          </div>

          <Button
            onClick={nextSlide}
            disabled={currentSlide === amcPitchSlides.length - 1}
            size="lg"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Slide Indicators */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-2 print:hidden z-50">
          {amcPitchSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-purple-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AMCPitch;

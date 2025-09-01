import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PitchHeader } from '@/components/pitch/PitchHeader';
import { PitchNavigation } from '@/components/pitch/PitchNavigation';
import { pitchSlidesV4 } from '@/data/pitchSlidesV4';

const PitchV4 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlidesV4.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlidesV4.length) % pitchSlidesV4.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <PitchHeader 
        currentSlide={currentSlide} 
        totalSlides={pitchSlidesV4.length}
      />

      <div className="max-w-7xl mx-auto p-6">
        <Card 
          className="min-h-[600px] p-8 touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <CardContent className="h-full flex items-center justify-center">
            {pitchSlidesV4[currentSlide] ? (
              <SlideRenderer slide={pitchSlidesV4[currentSlide]} />
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Slide Not Found</h2>
                <p className="text-gray-600">Current slide index: {currentSlide}</p>
                <p className="text-gray-600">Total slides: {pitchSlidesV4.length}</p>
                <p className="text-gray-600">Slide IDs: {pitchSlidesV4.map(s => s.id).join(', ')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <PitchNavigation
        currentSlide={currentSlide}
        totalSlides={pitchSlidesV4.length}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onGoToSlide={goToSlide}
      />
    </div>
  );
};

export default PitchV4;
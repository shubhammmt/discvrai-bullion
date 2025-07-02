
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PitchHeader } from '@/components/pitch/PitchHeader';
import { PitchNavigation } from '@/components/pitch/PitchNavigation';
import { KeyboardShortcuts } from '@/components/pitch/KeyboardShortcuts';
import { pitchSlidesV2 } from '@/data/pitchSlidesV2';

const PitchV2 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlidesV2.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlidesV2.length) % pitchSlidesV2.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
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
      <PitchHeader currentSlide={currentSlide} totalSlides={pitchSlidesV2.length} />

      <div className="max-w-7xl mx-auto p-6">
        <Card className="min-h-[600px] p-8">
          <CardContent className="h-full flex items-center justify-center">
            <SlideRenderer slide={pitchSlidesV2[currentSlide]} />
          </CardContent>
        </Card>
      </div>

      <PitchNavigation
        currentSlide={currentSlide}
        totalSlides={pitchSlidesV2.length}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onGoToSlide={goToSlide}
      />

    </div>
  );
};

export default PitchV2;

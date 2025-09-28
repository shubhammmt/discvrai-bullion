import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PitchHeader } from '@/components/pitch/PitchHeader';
import { PitchNavigation } from '@/components/pitch/PitchNavigation';
import { newsFirstPitchSlides } from '@/data/newsFirstPitchSlides';

const NewsFirstPitch = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsFirstPitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsFirstPitchSlides.length) % newsFirstPitchSlides.length);
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
      <PitchHeader currentSlide={currentSlide} totalSlides={newsFirstPitchSlides.length} />

      <div className="max-w-7xl mx-auto p-6">
        <Card className="min-h-[600px] p-8">
          <CardContent className="h-full flex items-center justify-center">
            <SlideRenderer slide={newsFirstPitchSlides[currentSlide]} />
          </CardContent>
        </Card>
      </div>

      <PitchNavigation
        currentSlide={currentSlide}
        totalSlides={newsFirstPitchSlides.length}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onGoToSlide={goToSlide}
      />
    </div>
  );
};

export default NewsFirstPitch;
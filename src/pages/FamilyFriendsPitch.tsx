import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PitchHeader } from '@/components/pitch/PitchHeader';
import { PitchNavigation } from '@/components/pitch/PitchNavigation';
import { familyFriendsPitchSlides } from '@/data/familyFriendsPitchSlides';
import { Button } from '@/components/ui/button';
import { Download, Printer } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';

const FamilyFriendsPitch = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Discvr-Family-Friends-Pitch',
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % familyFriendsPitchSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + familyFriendsPitchSlides.length) % familyFriendsPitchSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Escape') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-950 dark:to-blue-950">
      <PitchHeader currentSlide={currentSlide} totalSlides={familyFriendsPitchSlides.length} />

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex gap-2 mb-4 justify-end print:hidden">
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print/Save PDF
          </Button>
        </div>

        <div ref={printRef}>
          <Card className="min-h-[600px] p-8">
            <CardContent className="h-full flex items-center justify-center">
              <SlideRenderer slide={familyFriendsPitchSlides[currentSlide]} />
            </CardContent>
          </Card>
        </div>
      </div>

      <PitchNavigation
        currentSlide={currentSlide}
        totalSlides={familyFriendsPitchSlides.length}
        onPrevSlide={prevSlide}
        onNextSlide={nextSlide}
        onGoToSlide={goToSlide}
      />
    </div>
  );
};

export default FamilyFriendsPitch;

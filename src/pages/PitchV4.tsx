import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { SlideRenderer } from '@/components/pitch/SlideRenderer';
import { PitchHeader } from '@/components/pitch/PitchHeader';
import { PitchNavigation } from '@/components/pitch/PitchNavigation';
import { KeyboardShortcuts } from '@/components/pitch/KeyboardShortcuts';
import { PDFExportView } from '@/components/pitch/PDFExportView';
import { pitchSlidesV4 } from '@/data/pitchSlidesV4';

const PitchV4 = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % pitchSlidesV4.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + pitchSlidesV4.length) % pitchSlidesV4.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const downloadPDF = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'DiscvrAI-Pitch-Presentation',
    onBeforePrint: () => {
      setIsDownloading(true);
      return new Promise(resolve => {
        setTimeout(resolve, 500);
      });
    },
    onAfterPrint: () => {
      setIsDownloading(false);
    },
  });

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
        onDownload={downloadPDF}
        isDownloading={isDownloading}
      />
      
      {/* Hidden PDF Export View */}
      <div style={{ display: 'none' }}>
        <div ref={printRef}>
          <PDFExportView slides={pitchSlidesV4} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Card className="min-h-[600px] p-8">
          <CardContent className="h-full flex items-center justify-center">
            {pitchSlidesV4[currentSlide] ? (
              <SlideRenderer slide={pitchSlidesV4[currentSlide]} />
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Slide Not Found</h2>
                <p className="text-gray-600">Current slide index: {currentSlide}</p>
                <p className="text-gray-600">Total slides: {pitchSlidesV4.length}</p>
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

      <KeyboardShortcuts />
    </div>
  );
};

export default PitchV4;
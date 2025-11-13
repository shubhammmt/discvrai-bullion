import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { partnerDistributionSlides } from '@/data/partnerDistributionSlides';
import { PartnerSlideRenderer } from '@/components/pitch/partner/PartnerSlideRenderer';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const PartnerDistribution = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const printRef = useRef<HTMLDivElement>(null);

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

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'Discvr-Partner-Distribution-Deck',
  });

  const currentSlideData = partnerDistributionSlides[currentSlide];

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* PDF Export Button */}
      <div className="absolute top-4 right-4 z-50 print:hidden">
        <Button onClick={handlePrint} variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export PDF
        </Button>
      </div>

      {/* Scrollable Content */}
      <ScrollArea className="flex-1">
        <div ref={printRef}>
          <PartnerSlideRenderer slide={currentSlideData} />
        </div>
      </ScrollArea>

      {/* Slide Navigation */}
      <div className="flex items-center justify-center gap-2 p-4 border-t print:hidden">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          variant="outline"
          size="sm"
        >
          Previous
        </Button>
        <span className="text-sm text-muted-foreground">
          {currentSlide + 1} / {partnerDistributionSlides.length}
        </span>
        <Button
          onClick={nextSlide}
          disabled={currentSlide === partnerDistributionSlides.length - 1}
          variant="outline"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default PartnerDistribution;

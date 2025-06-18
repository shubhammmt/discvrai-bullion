
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PitchNavigationProps {
  currentSlide: number;
  totalSlides: number;
  onPrevSlide: () => void;
  onNextSlide: () => void;
  onGoToSlide: (index: number) => void;
}

export const PitchNavigation: React.FC<PitchNavigationProps> = ({
  currentSlide,
  totalSlides,
  onPrevSlide,
  onNextSlide,
  onGoToSlide
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
      <div className="bg-white rounded-full shadow-lg border border-gray-200 px-6 py-3">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={onPrevSlide}
            disabled={currentSlide === 0}
          >
            <ChevronLeft size={20} />
          </Button>

          <div className="flex gap-2">
            {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => onGoToSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button 
            variant="ghost" 
            size="sm"
            onClick={onNextSlide}
            disabled={currentSlide === totalSlides - 1}
          >
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

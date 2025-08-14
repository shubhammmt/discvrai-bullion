
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PitchHeaderProps {
  currentSlide: number;
  totalSlides: number;
}

export const PitchHeader: React.FC<PitchHeaderProps> = ({ currentSlide, totalSlides }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Button>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Brain className="w-1.5 h-1.5 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-semibold">DiscvrAI</h1>
            <p className="text-sm text-gray-500">Complete Financial Health Platform</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-500">
            {currentSlide + 1} / {totalSlides}
          </div>
        </div>
      </div>
    </div>
  );
};

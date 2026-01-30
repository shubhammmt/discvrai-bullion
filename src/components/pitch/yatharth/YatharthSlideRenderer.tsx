import React from 'react';
import { YatharthSlide } from '@/data/yatharthHealthcareSlides';
import { TitleSlide } from './slides/TitleSlide';
import { FounderSlide } from './slides/FounderSlide';
import { CapabilitiesSlide } from './slides/CapabilitiesSlide';
import { OperationsSlide } from './slides/OperationsSlide';
import { MPISlide } from './slides/MPISlide';
import { RCMSlide } from './slides/RCMSlide';
import { ComparisonSlide } from './slides/ComparisonSlide';
import { DifferentiatorsSlide } from './slides/DifferentiatorsSlide';
import { NextStepsSlide } from './slides/NextStepsSlide';

interface YatharthSlideRendererProps {
  slide: YatharthSlide;
  slideNumber: number;
  totalSlides: number;
}

export const YatharthSlideRenderer: React.FC<YatharthSlideRendererProps> = ({ 
  slide, 
  slideNumber, 
  totalSlides 
}) => {
  const props = { slide, slideNumber, totalSlides };
  
  switch (slide.type) {
    case 'title':
      return <TitleSlide {...props} />;
    case 'founder':
      return <FounderSlide {...props} />;
    case 'capabilities':
      return <CapabilitiesSlide {...props} />;
    case 'operations':
      return <OperationsSlide {...props} />;
    case 'mpi':
      return <MPISlide {...props} />;
    case 'rcm':
      return <RCMSlide {...props} />;
    case 'comparison':
      return <ComparisonSlide {...props} />;
    case 'differentiators':
      return <DifferentiatorsSlide {...props} />;
    case 'nextsteps':
      return <NextStepsSlide {...props} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-gray-500">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

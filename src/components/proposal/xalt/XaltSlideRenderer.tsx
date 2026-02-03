import React from 'react';
import { XaltSlide } from '@/data/xaltProposalSlides';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide1 } from './slides/SolutionSlide1';
import { SolutionSlide2 } from './slides/SolutionSlide2';
import { AssistantsSlide } from './slides/AssistantsSlide';
import { PathsSlide } from './slides/PathsSlide';
import { ROISlide } from './slides/ROISlide';
import { TimelineSlide } from './slides/TimelineSlide';

interface XaltSlideRendererProps {
  slide: XaltSlide;
  slideNumber: number;
  totalSlides: number;
}

export const XaltSlideRenderer: React.FC<XaltSlideRendererProps> = ({ 
  slide, 
  slideNumber, 
  totalSlides 
}) => {
  const props = { slideNumber, totalSlides };
  
  switch (slide.type) {
    case 'problem':
      return <ProblemSlide {...props} />;
    case 'solution1':
      return <SolutionSlide1 {...props} />;
    case 'solution2':
      return <SolutionSlide2 {...props} />;
    case 'assistants':
      return <AssistantsSlide {...props} />;
    case 'paths':
      return <PathsSlide {...props} />;
    case 'roi':
      return <ROISlide {...props} />;
    case 'timeline':
      return <TimelineSlide {...props} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-gray-500">Slide type not found</p>
        </div>
      );
  }
};

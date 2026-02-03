import React from 'react';
import { XaltSlide } from '@/data/xaltProposalSlides';
import { TitleSlide } from './slides/TitleSlide';
import { StrategicQuestionSlide } from './slides/StrategicQuestionSlide';
import { PainPointsSlide } from './slides/PainPointsSlide';
import { AIModelSlide } from './slides/AIModelSlide';
import { ValueSlide } from './slides/ValueSlide';
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
    case 'title':
      return <TitleSlide {...props} />;
    case 'strategic':
      return <StrategicQuestionSlide {...props} />;
    case 'painpoints':
      return <PainPointsSlide {...props} />;
    case 'aimodel':
      return <AIModelSlide {...props} />;
    case 'value':
      return <ValueSlide {...props} />;
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

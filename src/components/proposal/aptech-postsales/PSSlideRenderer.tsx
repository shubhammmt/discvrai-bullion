import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSCoverSlide } from './PSCoverSlide';
import { PSProblemStatementSlide } from './PSProblemStatementSlide';
import { PSPresalesRecapSlide } from './PSPresalesRecapSlide';
import { PSSolutionSlide } from './PSSolutionSlide';
import { PSAgentsDashboardsSlide } from './PSAgentsDashboardsSlide';
import { PSTriggersSlide } from './PSTriggersSlide';
import { PSWhoSeesWhatSlide } from './PSWhoSeesWhatSlide';
import { PSTimelineInvestmentSlide } from './PSTimelineInvestmentSlide';
import { PSDemoSlide } from './PSDemoSlide';
import { PSNextStepsSlide } from './PSNextStepsSlide';

interface Props {
  slide: AptechPostSalesSlide;
  slideNumber: number;
  totalSlides: number;
}

export const PSSlideRenderer: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const props = { slide, slideNumber, totalSlides };
  switch (slide.type) {
    case 'ps-cover':              return <PSCoverSlide slide={slide} />;
    case 'ps-problem-statement':  return <PSProblemStatementSlide {...props} />;
    case 'ps-presales-recap':     return <PSPresalesRecapSlide {...props} />;
    case 'ps-solution':           return <PSSolutionSlide {...props} />;
    case 'ps-agents-dashboards':  return <PSAgentsDashboardsSlide {...props} />;
    case 'ps-triggers':           return <PSTriggersSlide {...props} />;
    case 'ps-who-sees-what':      return <PSWhoSeesWhatSlide {...props} />;
    case 'ps-timeline-investment':return <PSTimelineInvestmentSlide {...props} />;
    case 'ps-demo':               return <PSDemoSlide {...props} />;
    case 'ps-next-steps':         return <PSNextStepsSlide {...props} />;
    default:
      return <div className="p-8 text-slate-400">Slide type not found: {slide.type}</div>;
  }
};

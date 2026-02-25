import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSCoverSlide } from './PSCoverSlide';
import { PSPresalesRecapSlide } from './PSPresalesRecapSlide';
import { PSConnectingDotsSlide } from './PSConnectingDotsSlide';
import { PSThreeStagesSlide } from './PSThreeStagesSlide';
import { PSOneInterfaceSlide } from './PSOneInterfaceSlide';
import { PSAgentsDashboardsSlide } from './PSAgentsDashboardsSlide';
import { PSRecommendationsSlide } from './PSRecommendationsSlide';
import { PSDemoSlide } from './PSDemoSlide';
import { PSWhoSeesWhatSlide } from './PSWhoSeesWhatSlide';
import { PSTriggersSlide } from './PSTriggersSlide';
import { PSLifecycleSlide } from './PSLifecycleSlide';
import { PSInvestmentSlide } from './PSInvestmentSlide';
import { PSTimelineSlide } from './PSTimelineSlide';
import { PSNextStepsSlide } from './PSNextStepsSlide';
import { PSWhyThisFitsSlide } from './PSWhyThisFitsSlide';

interface Props {
  slide: AptechPostSalesSlide;
  slideNumber: number;
  totalSlides: number;
}

export const PSSlideRenderer: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const props = { slide, slideNumber, totalSlides };
  switch (slide.type) {
    case 'ps-cover':            return <PSCoverSlide slide={slide} />;
    case 'ps-presales-recap':   return <PSPresalesRecapSlide {...props} />;
    case 'ps-connecting-dots':  return <PSConnectingDotsSlide {...props} />;
    case 'ps-three-stages':     return <PSThreeStagesSlide {...props} />;
    case 'ps-one-interface':    return <PSOneInterfaceSlide {...props} />;
    case 'ps-agents-dashboards':return <PSAgentsDashboardsSlide {...props} />;
    case 'ps-recommendations':  return <PSRecommendationsSlide {...props} />;
    case 'ps-demo':             return <PSDemoSlide {...props} />;
    case 'ps-who-sees-what':    return <PSWhoSeesWhatSlide {...props} />;
    case 'ps-triggers':         return <PSTriggersSlide {...props} />;
    case 'ps-lifecycle':        return <PSLifecycleSlide {...props} />;
    case 'ps-investment':       return <PSInvestmentSlide {...props} />;
    case 'ps-timeline':         return <PSTimelineSlide {...props} />;
    case 'ps-next-steps':       return <PSNextStepsSlide {...props} />;
    case 'ps-why-this-fits':    return <PSWhyThisFitsSlide {...props} />;
    default:
      return <div className="p-8 text-slate-400">Slide type not found: {slide.type}</div>;
  }
};

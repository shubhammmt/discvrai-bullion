import React from 'react';
import { MasterTrustSlide } from '@/data/masterTrustProposalSlides';
import { MTCoverSlide } from './slides/MTCoverSlide';
import { MTExecutiveSlide } from './slides/MTExecutiveSlide';
import { MTOpportunitySlide } from './slides/MTOpportunitySlide';
import { MTHorizonsOverviewSlide } from './slides/MTHorizonsOverviewSlide';
import { MTHorizon1Slide } from './slides/MTHorizon1Slide';
import { MTHorizon2Slide } from './slides/MTHorizon2Slide';
import { MTHorizon3Slide } from './slides/MTHorizon3Slide';
import { MTPillarsSlide } from './slides/MTPillarsSlide';
import { MTImpactSlide } from './slides/MTImpactSlide';
import { MTNextStepsSlide } from './slides/MTNextStepsSlide';

interface MasterTrustSlideRendererProps {
  slide: MasterTrustSlide;
}

export const MasterTrustSlideRenderer: React.FC<MasterTrustSlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'cover':
      return <MTCoverSlide slide={slide} />;
    case 'executive':
      return <MTExecutiveSlide slide={slide} />;
    case 'opportunity':
      return <MTOpportunitySlide slide={slide} />;
    case 'horizons-overview':
      return <MTHorizonsOverviewSlide slide={slide} />;
    case 'horizon-1':
      return <MTHorizon1Slide slide={slide} />;
    case 'horizon-2':
      return <MTHorizon2Slide slide={slide} />;
    case 'horizon-3':
      return <MTHorizon3Slide slide={slide} />;
    case 'pillars':
      return <MTPillarsSlide slide={slide} />;
    case 'impact':
      return <MTImpactSlide slide={slide} />;
    case 'next-steps':
      return <MTNextStepsSlide slide={slide} />;
    default:
      return <div className="p-12 text-slate-500">Slide type not found</div>;
  }
};

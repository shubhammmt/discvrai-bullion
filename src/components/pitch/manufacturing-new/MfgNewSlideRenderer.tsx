import React from 'react';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DalmiaCoverSlide } from './DalmiaCoverSlide';
import { DalmiaOverviewSlide } from './DalmiaOverviewSlide';
import { DalmiaGlobalExamplesSlide } from './DalmiaGlobalExamplesSlide';
import { DalmiaTodaySlide } from './DalmiaTodaySlide';
import { DalmiaVisionArchitectureSlide } from './DalmiaVisionArchitectureSlide';
import { DalmiaValueStreamsSlide } from './DalmiaValueStreamsSlide';
import { DalmiaPricingEngineSlide } from './DalmiaPricingEngineSlide';
import { DalmiaSalesCopilotSlide } from './DalmiaSalesCopilotSlide';
import { DalmiaDealer360Slide } from './DalmiaDealer360Slide';
import { DalmiaMarketingEngineSlide } from './DalmiaMarketingEngineSlide';
import { DalmiaDemandSensingSlide } from './DalmiaDemandSensingSlide';
import { DalmiaO2CSlide } from './DalmiaO2CSlide';
import { DalmiaDashboardingSlide } from './DalmiaDashboardingSlide';
import { DalmiaTransformationRoadmapSlide } from './DalmiaTransformationRoadmapSlide';

interface MfgNewSlideRendererProps {
  slide: ManufacturingNewSlide;
  slideNumber: number;
  totalSlides: number;
}

export const MfgNewSlideRenderer: React.FC<MfgNewSlideRendererProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const baseProps = { slideNumber, totalSlides };

  switch (slide.type) {
    case 'dalmia-cover':
      return <DalmiaCoverSlide slide={slide} {...baseProps} />;
    case 'dalmia-overview':
      return <DalmiaOverviewSlide slide={slide} {...baseProps} />;
    case 'dalmia-global-examples':
      return <DalmiaGlobalExamplesSlide slide={slide} {...baseProps} />;
    case 'dalmia-today':
      return <DalmiaTodaySlide slide={slide} {...baseProps} />;
    case 'dalmia-vision-architecture':
      return <DalmiaVisionArchitectureSlide slide={slide} {...baseProps} />;
    case 'dalmia-value-streams':
      return <DalmiaValueStreamsSlide slide={slide} {...baseProps} />;
    case 'dalmia-pricing-engine':
      return <DalmiaPricingEngineSlide slide={slide} {...baseProps} />;
    case 'dalmia-sales-copilot':
      return <DalmiaSalesCopilotSlide slide={slide} {...baseProps} />;
    case 'dalmia-dealer360':
      return <DalmiaDealer360Slide slide={slide} {...baseProps} />;
    case 'dalmia-marketing-engine':
      return <DalmiaMarketingEngineSlide slide={slide} {...baseProps} />;
    case 'dalmia-demand-sensing':
      return <DalmiaDemandSensingSlide slide={slide} {...baseProps} />;
    case 'dalmia-o2c':
      return <DalmiaO2CSlide slide={slide} {...baseProps} />;
    case 'dalmia-dashboarding':
      return <DalmiaDashboardingSlide slide={slide} {...baseProps} />;
    case 'dalmia-transformation-roadmap':
      return <DalmiaTransformationRoadmapSlide slide={slide} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

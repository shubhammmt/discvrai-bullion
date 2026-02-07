import React from 'react';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DalmiaCoverSlide } from './DalmiaCoverSlide';
import { DalmiaCEOImperativeSlide } from './DalmiaCEOImperativeSlide';
import { DalmiaValuePoolsSlide } from './DalmiaValuePoolsSlide';
import { DalmiaCurrentStateSlide } from './DalmiaCurrentStateSlide';
import { DalmiaVisionArchitectureSlide } from './DalmiaVisionArchitectureSlide';
import { DalmiaDynamicPricingSlide } from './DalmiaDynamicPricingSlide';
import { DalmiaSalesDealer360Slide } from './DalmiaSalesDealer360Slide';
import { DalmiaMarketingEngagementSlide } from './DalmiaMarketingEngagementSlide';
import { DalmiaSupplyChainSlide } from './DalmiaSupplyChainSlide';
import { DalmiaValueMapSlide } from './DalmiaValueMapSlide';
import { DalmiaRoadmapAskSlide } from './DalmiaRoadmapAskSlide';

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
    case 'dalmia-imperative':
      return <DalmiaCEOImperativeSlide slide={slide} {...baseProps} />;
    case 'dalmia-value-pools':
      return <DalmiaValuePoolsSlide slide={slide} {...baseProps} />;
    case 'dalmia-current-state':
      return <DalmiaCurrentStateSlide slide={slide} {...baseProps} />;
    case 'dalmia-vision-architecture':
      return <DalmiaVisionArchitectureSlide slide={slide} {...baseProps} />;
    case 'dalmia-pricing':
      return <DalmiaDynamicPricingSlide slide={slide} {...baseProps} />;
    case 'dalmia-sales-dealer360':
      return <DalmiaSalesDealer360Slide slide={slide} {...baseProps} />;
    case 'dalmia-marketing-engagement':
      return <DalmiaMarketingEngagementSlide slide={slide} {...baseProps} />;
    case 'dalmia-supply-chain':
      return <DalmiaSupplyChainSlide slide={slide} {...baseProps} />;
    case 'dalmia-valuemap':
      return <DalmiaValueMapSlide slide={slide} {...baseProps} />;
    case 'dalmia-roadmap-ask':
      return <DalmiaRoadmapAskSlide slide={slide} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

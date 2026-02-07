import React from 'react';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { DalmiaCoverSlide } from './DalmiaCoverSlide';
import { DalmiaCEOImperativeSlide } from './DalmiaCEOImperativeSlide';
import { DalmiaValuePoolsSlide } from './DalmiaValuePoolsSlide';
import { DalmiaTodaySlide } from './DalmiaTodaySlide';
import { DalmiaBenchmarkSlide } from './DalmiaBenchmarkSlide';
import { DalmiaNorthStarSlide } from './DalmiaNorthStarSlide';
import { DalmiaCapabilityStackSlide } from './DalmiaCapabilityStackSlide';
import { DalmiaDynamicPricingSlide } from './DalmiaDynamicPricingSlide';
import { DalmiaSalesIntelligenceSlide } from './DalmiaSalesIntelligenceSlide';
import { DalmiaDealer360Slide } from './DalmiaDealer360Slide';
import { DalmiaMarketingEngineSlide } from './DalmiaMarketingEngineSlide';
import { DalmiaLoyalty2Slide } from './DalmiaLoyalty2Slide';
import { DalmiaDemandSensingSlide } from './DalmiaDemandSensingSlide';
import { DalmiaO2CSlide } from './DalmiaO2CSlide';
import { DalmiaSuvidha2Slide } from './DalmiaSuvidha2Slide';
import { DalmiaValueMapSlide } from './DalmiaValueMapSlide';
import { DalmiaRoadmapSlide } from './DalmiaRoadmapSlide';
import { DalmiaOperatingModelSlide } from './DalmiaOperatingModelSlide';

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
    case 'dalmia-today':
      return <DalmiaTodaySlide slide={slide} {...baseProps} />;
    case 'dalmia-benchmark':
      return <DalmiaBenchmarkSlide slide={slide} {...baseProps} />;
    case 'dalmia-northstar':
      return <DalmiaNorthStarSlide slide={slide} {...baseProps} />;
    case 'dalmia-capability-stack':
      return <DalmiaCapabilityStackSlide slide={slide} {...baseProps} />;
    case 'dalmia-pricing':
      return <DalmiaDynamicPricingSlide slide={slide} {...baseProps} />;
    case 'dalmia-sales':
      return <DalmiaSalesIntelligenceSlide slide={slide} {...baseProps} />;
    case 'dalmia-dealer360':
      return <DalmiaDealer360Slide slide={slide} {...baseProps} />;
    case 'dalmia-marketing':
      return <DalmiaMarketingEngineSlide slide={slide} {...baseProps} />;
    case 'dalmia-loyalty':
      return <DalmiaLoyalty2Slide slide={slide} {...baseProps} />;
    case 'dalmia-demand':
      return <DalmiaDemandSensingSlide slide={slide} {...baseProps} />;
    case 'dalmia-o2c':
      return <DalmiaO2CSlide slide={slide} {...baseProps} />;
    case 'dalmia-suvidha':
      return <DalmiaSuvidha2Slide slide={slide} {...baseProps} />;
    case 'dalmia-valuemap':
      return <DalmiaValueMapSlide slide={slide} {...baseProps} />;
    case 'dalmia-roadmap':
      return <DalmiaRoadmapSlide slide={slide} {...baseProps} />;
    case 'dalmia-operating-model':
      return <DalmiaOperatingModelSlide slide={slide} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

import React from 'react';
import { CompanyIntroSlide } from './CompanyIntroSlide';
import { AMCCoverSlide } from './AMCCoverSlide';
import { ChallengeSlide } from './ChallengeSlide';
import { D2CFunnelSlide } from './D2CFunnelSlide';
import { ContentDistributionSlide } from './ContentDistributionSlide';
import { EngagementSlide } from './EngagementSlide';
import { GTMSlide } from '../GTMSlide';
import { MoatsSlide } from '../MoatsSlide';
import { RoadmapSlide } from '../RoadmapSlide';
import { AudienceSlide } from '../AudienceSlide';

interface AMCSlideRendererProps {
  slide: any;
}

export const AMCSlideRenderer: React.FC<AMCSlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'company-intro':
      return <CompanyIntroSlide slide={slide} />;
    case 'cover':
      return <AMCCoverSlide slide={slide} />;
    case 'challenge':
      return <ChallengeSlide slide={slide} />;
    case 'd2c-funnel':
      return <D2CFunnelSlide slide={slide} />;
    case 'content-distribution':
      return <ContentDistributionSlide slide={slide} />;
    case 'engagement':
      return <EngagementSlide slide={slide} />;
    case 'engines':
    case 'flywheel':
    case 'integration':
    case 'distributor':
    case 'roi':
    case 'competitive':
    case 'cta':
      return <GTMSlide slide={slide} />;
    case 'moats':
      return <MoatsSlide slide={slide} />;
    case 'roadmap':
      return <RoadmapSlide slide={slide} />;
    case 'audience':
      return <AudienceSlide slide={slide} />;
    default:
      return <div className="p-12">Slide type not found: {slide.type}</div>;
  }
};

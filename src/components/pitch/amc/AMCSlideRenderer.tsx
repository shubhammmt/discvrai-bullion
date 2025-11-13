import React from 'react';
import { CompanyIntroSlide } from './CompanyIntroSlide';
import { AMCCoverSlide } from './AMCCoverSlide';
import { ChallengeSlide } from './ChallengeSlide';
import { D2CFunnelSlide } from './D2CFunnelSlide';
import { ContentDistributionSlide } from './ContentDistributionSlide';
import { EngagementSlide } from './EngagementSlide';
import { EnginesSlide } from './EnginesSlide';
import { FlywheelSlide } from './FlywheelSlide';
import { IntegrationSlide } from './IntegrationSlide';
import { DistributorSlide } from './DistributorSlide';
import { ROISlide } from './ROISlide';
import { CompetitiveSlide } from './CompetitiveSlide';
import { CTASlide } from './CTASlide';

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
      return <EnginesSlide slide={slide} />;
    case 'flywheel':
      return <FlywheelSlide slide={slide} />;
    case 'integration':
      return <IntegrationSlide slide={slide} />;
    case 'distributor':
      return <DistributorSlide slide={slide} />;
    case 'roi':
      return <ROISlide slide={slide} />;
    case 'competitive':
      return <CompetitiveSlide slide={slide} />;
    case 'cta':
      return <CTASlide slide={slide} />;
    default:
      return <div className="p-12">Slide type not found: {slide.type}</div>;
  }
};

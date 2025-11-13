import React from 'react';
import { PlatformOverviewSlide } from './PlatformOverviewSlide';
import { DistributionValueSlide } from './DistributionValueSlide';

interface PartnerSlideRendererProps {
  slide: any;
}

export const PartnerSlideRenderer: React.FC<PartnerSlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'platform-overview':
      return <PlatformOverviewSlide slide={slide} />;
    case 'distribution-value':
      return <DistributionValueSlide slide={slide} />;
    default:
      return <div>Unknown slide type</div>;
  }
};

import React from 'react';
import { AMCEnterpriseSlide } from '@/data/amcEnterprisePitchSlides';
import { AMCEnterpriseSlideLayout } from './AMCEnterpriseSlideLayout';
import { AMCCoverSlide } from './slides/AMCCoverSlide';
import { AMCProblemSlide } from './slides/AMCProblemSlide';
import { AMCWhyNowSlide } from './slides/AMCWhyNowSlide';
import { AMCFailedSolutionsSlide } from './slides/AMCFailedSolutionsSlide';
import { AMCSolutionSlide } from './slides/AMCSolutionSlide';
import { AMCCapabilitiesSlide } from './slides/AMCCapabilitiesSlide';
import { AMCConversionSlide } from './slides/AMCConversionSlide';
import { AMCDifferentiatorsSlide } from './slides/AMCDifferentiatorsSlide';
import { AMCMarketSlide } from './slides/AMCMarketSlide';
import { AMCBusinessModelSlide } from './slides/AMCBusinessModelSlide';
import { AMCAskSlide } from './slides/AMCAskSlide';
import { AMCCTASlide } from './slides/AMCCTASlide';

interface AMCEnterpriseSlideRendererProps {
  slide: AMCEnterpriseSlide;
  slideNumber: number;
  totalSlides: number;
}

export const AMCEnterpriseSlideRenderer: React.FC<AMCEnterpriseSlideRendererProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const renderSlide = () => {
    switch (slide.type) {
      case 'amc-cover':
        return <AMCCoverSlide slide={slide as any} />;
      case 'amc-problem':
        return <AMCProblemSlide slide={slide as any} />;
      case 'amc-why-now':
        return <AMCWhyNowSlide slide={slide as any} />;
      case 'amc-failed-solutions':
        return <AMCFailedSolutionsSlide slide={slide as any} />;
      case 'amc-solution':
        return <AMCSolutionSlide slide={slide as any} />;
      case 'amc-capabilities':
        return <AMCCapabilitiesSlide slide={slide as any} />;
      case 'amc-conversion':
        return <AMCConversionSlide slide={slide as any} />;
      case 'amc-differentiators':
        return <AMCDifferentiatorsSlide slide={slide as any} />;
      case 'amc-market':
        return <AMCMarketSlide slide={slide as any} />;
      case 'amc-business-model':
        return <AMCBusinessModelSlide slide={slide as any} />;
      case 'amc-ask':
        return <AMCAskSlide slide={slide as any} />;
      case 'amc-cta':
        return <AMCCTASlide slide={slide as any} />;
      default:
        return <div className="p-12 text-center">Slide type not found: {slide.type}</div>;
    }
  };

  // Cover and CTA slides have their own layout
  if (slide.type === 'amc-cover' || slide.type === 'amc-cta') {
    return (
      <div className="min-h-screen flex flex-col">
        {renderSlide()}
      </div>
    );
  }

  return (
    <AMCEnterpriseSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
      {renderSlide()}
    </AMCEnterpriseSlideLayout>
  );
};

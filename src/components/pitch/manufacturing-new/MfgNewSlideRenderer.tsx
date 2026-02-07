import React from 'react';
import { ManufacturingNewSlide } from '@/data/manufacturingNewSlides';
import { MfgNewTitleSlide } from './MfgNewTitleSlide';
import { MfgNewChallengeSlide } from './MfgNewChallengeSlide';
import { MfgNewGapSlide } from './MfgNewGapSlide';
import { MfgNewPlatformSlide } from './MfgNewPlatformSlide';
import { MfgNewCapabilitiesSlide } from './MfgNewCapabilitiesSlide';
import { MfgNewUseCaseSlide } from './MfgNewUseCaseSlide';
import { MfgNewEnterpriseUseCaseSlide } from './MfgNewEnterpriseUseCaseSlide';
import { MfgNewCaseStudySlide } from './MfgNewCaseStudySlide';
import { MfgNewTechnicalSlide } from './MfgNewTechnicalSlide';
import { MfgNewImplementationSlide } from './MfgNewImplementationSlide';
import { MfgNewImpactSlide } from './MfgNewImpactSlide';
import { MfgNewCredibilitySlide } from './MfgNewCredibilitySlide';
import { MfgNewNextStepsSlide } from './MfgNewNextStepsSlide';
import { MfgNewContactSlide } from './MfgNewContactSlide';

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
    case 'mfg-title':
      return <MfgNewTitleSlide slide={slide as any} {...baseProps} />;
    case 'mfg-challenge':
      return <MfgNewChallengeSlide slide={slide as any} {...baseProps} />;
    case 'mfg-gap':
      return <MfgNewGapSlide slide={slide as any} {...baseProps} />;
    case 'mfg-platform':
      return <MfgNewPlatformSlide slide={slide as any} {...baseProps} />;
    case 'mfg-capabilities':
      return <MfgNewCapabilitiesSlide slide={slide as any} {...baseProps} />;
    case 'mfg-usecase':
      return <MfgNewUseCaseSlide slide={slide as any} {...baseProps} />;
    case 'mfg-enterprise-usecase':
      return <MfgNewEnterpriseUseCaseSlide slide={slide as any} {...baseProps} />;
    case 'mfg-casestudy':
      return <MfgNewCaseStudySlide slide={slide as any} {...baseProps} />;
    case 'mfg-technical':
      return <MfgNewTechnicalSlide slide={slide as any} {...baseProps} />;
    case 'mfg-implementation':
      return <MfgNewImplementationSlide slide={slide as any} {...baseProps} />;
    case 'mfg-impact':
      return <MfgNewImpactSlide slide={slide as any} {...baseProps} />;
    case 'mfg-credibility':
      return <MfgNewCredibilitySlide slide={slide as any} {...baseProps} />;
    case 'mfg-nextsteps':
      return <MfgNewNextStepsSlide slide={slide as any} {...baseProps} />;
    case 'mfg-contact':
      return <MfgNewContactSlide slide={slide as any} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

import React from 'react';
import { ManufacturingSlide } from '@/data/manufacturingTransformationSlides';
import { MfgTitleSlide } from './MfgTitleSlide';
import { MfgChallengeSlide } from './MfgChallengeSlide';
import { MfgGapSlide } from './MfgGapSlide';
import { MfgPlatformSlide } from './MfgPlatformSlide';
import { MfgCapabilitiesSlide } from './MfgCapabilitiesSlide';
import { MfgUseCaseSlide } from './MfgUseCaseSlide';
import { MfgCaseStudySlide } from './MfgCaseStudySlide';
import { MfgTechnicalSlide } from './MfgTechnicalSlide';
import { MfgImplementationSlide } from './MfgImplementationSlide';
import { MfgImpactSlide } from './MfgImpactSlide';
import { MfgCredibilitySlide } from './MfgCredibilitySlide';
import { MfgNextStepsSlide } from './MfgNextStepsSlide';
import { MfgContactSlide } from './MfgContactSlide';

interface MfgSlideRendererProps {
  slide: ManufacturingSlide;
  slideNumber: number;
  totalSlides: number;
}

export const MfgSlideRenderer: React.FC<MfgSlideRendererProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const baseProps = { slideNumber, totalSlides };

  switch (slide.type) {
    case 'mfg-title':
      return <MfgTitleSlide slide={slide as any} {...baseProps} />;
    case 'mfg-challenge':
      return <MfgChallengeSlide slide={slide as any} {...baseProps} />;
    case 'mfg-gap':
      return <MfgGapSlide slide={slide as any} {...baseProps} />;
    case 'mfg-platform':
      return <MfgPlatformSlide slide={slide as any} {...baseProps} />;
    case 'mfg-capabilities':
      return <MfgCapabilitiesSlide slide={slide as any} {...baseProps} />;
    case 'mfg-usecase':
      return <MfgUseCaseSlide slide={slide as any} {...baseProps} />;
    case 'mfg-casestudy':
      return <MfgCaseStudySlide slide={slide as any} {...baseProps} />;
    case 'mfg-technical':
      return <MfgTechnicalSlide slide={slide as any} {...baseProps} />;
    case 'mfg-implementation':
      return <MfgImplementationSlide slide={slide as any} {...baseProps} />;
    case 'mfg-impact':
      return <MfgImpactSlide slide={slide as any} {...baseProps} />;
    case 'mfg-credibility':
      return <MfgCredibilitySlide slide={slide as any} {...baseProps} />;
    case 'mfg-nextsteps':
      return <MfgNextStepsSlide slide={slide as any} {...baseProps} />;
    case 'mfg-contact':
      return <MfgContactSlide slide={slide as any} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

import React from 'react';
import { AptechSlide } from '@/data/aptechProposalSlides';
import { AptechCoverSlide } from './slides/AptechCoverSlide';
import { AptechChallengesSlide } from './slides/AptechChallengesSlide';
import { AptechCapabilitiesSlide } from './slides/AptechCapabilitiesSlide';
import { AptechOptionsSlide } from './slides/AptechOptionsSlide';
import { AptechFlywheelSlide } from './slides/AptechFlywheelSlide';
import { AptechTripleLayerSlide } from './slides/AptechTripleLayerSlide';
import { AptechDemoSlide } from './slides/AptechDemoSlide';
import { AptechImpactSlide } from './slides/AptechImpactSlide';
import { AptechExplorationSlide } from './slides/AptechExplorationSlide';
import { AptechNextStepsSlide } from './slides/AptechNextStepsSlide';

interface AptechSlideRendererProps {
  slide: AptechSlide;
  slideNumber: number;
  totalSlides: number;
}

export const AptechSlideRenderer: React.FC<AptechSlideRendererProps> = ({
  slide,
  slideNumber,
  totalSlides
}) => {
  const baseProps = { slideNumber, totalSlides };

  switch (slide.type) {
    case 'aptech-cover':
      return <AptechCoverSlide slide={slide as any} {...baseProps} />;
    case 'aptech-challenges':
      return <AptechChallengesSlide slide={slide as any} {...baseProps} />;
    case 'aptech-capabilities':
      return <AptechCapabilitiesSlide slide={slide as any} {...baseProps} />;
    case 'aptech-options':
      return <AptechOptionsSlide slide={slide as any} {...baseProps} />;
    case 'aptech-flywheel':
      return <AptechFlywheelSlide slide={slide as any} {...baseProps} />;
    case 'aptech-triple-layer':
      return <AptechTripleLayerSlide slide={slide as any} {...baseProps} />;
    case 'aptech-demo':
      return <AptechDemoSlide slide={slide as any} {...baseProps} />;
    case 'aptech-impact':
      return <AptechImpactSlide slide={slide as any} {...baseProps} />;
    case 'aptech-exploration':
      return <AptechExplorationSlide slide={slide as any} {...baseProps} />;
    case 'aptech-next-steps':
      return <AptechNextStepsSlide slide={slide as any} {...baseProps} />;
    default:
      return (
        <div className="h-screen w-full bg-white flex items-center justify-center">
          <p className="text-slate-800">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

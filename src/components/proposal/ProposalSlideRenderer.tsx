import React from 'react';
import { JindalSlide } from '@/data/jindalProposalSlides';
import { CoverSlide } from './slides/CoverSlide';
import { TOCSlide } from './slides/TOCSlide';
import { ProblemSlide } from './slides/ProblemSlide';
import { SolutionSlide } from './slides/SolutionSlide';
import { ImpactSlide } from './slides/ImpactSlide';
import { PlatformSlide } from './slides/PlatformSlide';
import { TimelineSlide } from './slides/TimelineSlide';
import { IPCommercialSlide } from './slides/IPCommercialSlide';
import { ArchitectureSlide } from './slides/ArchitectureSlide';
import { NextStepsSlide } from './slides/NextStepsSlide';

interface ProposalSlideRendererProps {
  slide: JindalSlide;
}

export const ProposalSlideRenderer: React.FC<ProposalSlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'cover':
      return <CoverSlide slide={slide} />;
    case 'toc':
      return <TOCSlide slide={slide} />;
    case 'problem':
      return <ProblemSlide slide={slide} />;
    case 'solution':
      return <SolutionSlide slide={slide} />;
    case 'impact':
      return <ImpactSlide slide={slide} />;
    case 'platform':
      return <PlatformSlide slide={slide} />;
    case 'timeline':
      return <TimelineSlide slide={slide} />;
    case 'ip-commercial':
      return <IPCommercialSlide slide={slide} />;
    case 'architecture':
      return <ArchitectureSlide slide={slide} />;
    case 'next-steps':
      return <NextStepsSlide slide={slide} />;
    default:
      return <div className="text-gray-500">Slide type not found</div>;
  }
};


import React from 'react';
import { TitleSlide } from './TitleSlide';
import { VisionSlide } from './VisionSlide';
import { SolutionSlide } from './SolutionSlide';
import { AITechStackSlide } from './AITechStackSlide';
import { ProblemSlide } from './ProblemSlide';
import { MarketSlide } from './MarketSlide';
import { RevenueSlide } from './RevenueSlide';
import { BusinessModelSlide } from './BusinessModelSlide';
import { CompetitionSlide } from './CompetitionSlide';
import { MoatsSlide } from './MoatsSlide';
import { GTMSlide } from './GTMSlide';
import { RisksSlide } from './RisksSlide';
import { TeamSlide } from './TeamSlide';
import { FundingSlide } from './FundingSlide';
import { UserFlowSlide } from './UserFlowSlide';
import { ExecutionExampleSlide } from './ExecutionExampleSlide';
import { BigTechSlide } from './BigTechSlide';

interface SlideRendererProps {
  slide: any;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />;
    case 'problem':
      return <ProblemSlide slide={slide} />;
    case 'solution':
      return <SolutionSlide slide={slide} />;
    case 'market':
      return <MarketSlide slide={slide} />;
    case 'revenue':
      return <RevenueSlide slide={slide} />;
    case 'business-model':
      return <BusinessModelSlide slide={slide} />;
    case 'ai-tech-stack':
      return <AITechStackSlide slide={slide} />;
    case 'competition':
      return <CompetitionSlide slide={slide} />;
    case 'big-tech':
      return <BigTechSlide slide={slide} />;
    case 'moats':
      return <MoatsSlide slide={slide} />;
    case 'gtm':
      return <GTMSlide slide={slide} />;
    case 'vision':
      return <VisionSlide slide={slide} />;
    case 'risks':
      return <RisksSlide slide={slide} />;
    case 'team':
      return <TeamSlide slide={slide} />;
    case 'funding':
      return <FundingSlide slide={slide} />;
    case 'user-flow':
      return <UserFlowSlide slide={slide} />;
    case 'execution-example':
      return <ExecutionExampleSlide slide={slide} />;
    default:
      return <div>Slide content not found</div>;
  }
};

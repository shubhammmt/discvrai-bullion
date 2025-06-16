
import React from 'react';
import { TitleSlide } from './TitleSlide';
import { VisionSlide } from './VisionSlide';
import { VisionSlideNew } from './VisionSlideNew';
import { SolutionSlide } from './SolutionSlide';
import { AITechStackSlide } from './AITechStackSlide';
import { ProblemSlide } from './ProblemSlide';
import { MarketSlide } from './MarketSlide';
import { RevenueSlide } from './RevenueSlide';
import { BusinessModelSlide } from './BusinessModelSlide';
import { B2BBusinessSlide } from './B2BBusinessSlide';
import { CompetitionSlide } from './CompetitionSlide';
import { MoatsSlide } from './MoatsSlide';
import { GTMSlide } from './GTMSlide';
import { RisksSlide } from './RisksSlide';
import { TeamSlide } from './TeamSlide';
import { FundingSlide } from './FundingSlide';
import { UserFlowSlide } from './UserFlowSlide';
import { ExecutionExampleSlide } from './ExecutionExampleSlide';
import { BigTechSlide } from './BigTechSlide';
import { PlatformPositioningSlide } from './PlatformPositioningSlide';
import { PlatformDifferentiationSlide } from './PlatformDifferentiationSlide';
import { AIInfrastructureSlide } from './AIInfrastructureSlide';
import { DetailedGTMSlide } from './DetailedGTMSlide';
import { DifferentiationSlide } from './DifferentiationSlide';
import { MarketOpportunitySlide } from './MarketOpportunitySlide';
import { TargetPersonaSlide } from './TargetPersonaSlide';
import { UnitEconomicsSlide } from './UnitEconomicsSlide';
import { GoToMarketSlide } from './GoToMarketSlide';
import { CompetitiveMoatsSlide } from './CompetitiveMoatsSlide';
import { TractionSlide } from './TractionSlide';
import { FinancialAssumptionsSlide } from './FinancialAssumptionsSlide';
import { TeamBreakdownSlide } from './TeamBreakdownSlide';

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
    case 'differentiation':
      return <DifferentiationSlide slide={slide} />;
    case 'market-opportunity':
      return <MarketOpportunitySlide slide={slide} />;
    case 'target-persona':
      return <TargetPersonaSlide slide={slide} />;
    case 'revenue-model':
      return <RevenueSlide slide={slide} />;
    case 'unit-economics':
      return <UnitEconomicsSlide slide={slide} />;
    case 'go-to-market':
      return <GoToMarketSlide slide={slide} />;
    case 'competitive-moats':
      return <CompetitiveMoatsSlide slide={slide} />;
    case 'traction':
      return <TractionSlide slide={slide} />;
    case 'vision-new':
      return <VisionSlideNew slide={slide} />;
    case 'funding':
      return <FundingSlide slide={slide} />;
    case 'financial-assumptions':
      return <FinancialAssumptionsSlide slide={slide} />;
    case 'team-breakdown':
      return <TeamBreakdownSlide slide={slide} />;
    case 'competition':
      return <CompetitionSlide slide={slide} />;
    case 'market':
      return <MarketSlide slide={slide} />;
    case 'revenue':
      return <RevenueSlide slide={slide} />;
    case 'business-model':
      return <BusinessModelSlide slide={slide} />;
    case 'b2b-business':
      return <B2BBusinessSlide slide={slide} />;
    case 'ai-tech-stack':
      return <AITechStackSlide slide={slide} />;
    case 'user-flow':
      return <UserFlowSlide slide={slide} />;
    case 'platform-positioning':
      return <PlatformPositioningSlide slide={slide} />;
    case 'platform-differentiation':
      return <PlatformDifferentiationSlide slide={slide} />;
    case 'ai-infrastructure':
      return <AIInfrastructureSlide slide={slide} />;
    case 'detailed-gtm':
      return <DetailedGTMSlide slide={slide} />;
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
    case 'execution-example':
      return <ExecutionExampleSlide slide={slide} />;
    default:
      return <div>Slide content not found</div>;
  }
};

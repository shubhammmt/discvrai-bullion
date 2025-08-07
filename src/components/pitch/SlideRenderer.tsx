
import React from 'react';
import { TitleSlide } from './TitleSlide';
import { ProblemSlide } from './ProblemSlide';
import { SolutionSlide } from './SolutionSlide';
import { MarketOpportunitySlide } from './MarketOpportunitySlide';
import { TargetPersonaSlide } from './TargetPersonaSlide';
import { RevenueSlide } from './RevenueSlide';
import { UnitEconomicsSlide } from './UnitEconomicsSlide';
import { CACReductionSlide } from './CACReductionSlide';
import { GoToMarketSlide } from './GoToMarketSlide';
import { CompetitiveMoatsSlide } from './CompetitiveMoatsSlide';
import { TractionSlide } from './TractionSlide';
import { VisionSlideNew } from './VisionSlideNew';
import { FundingSlide } from './FundingSlide';
import { FinancialAssumptionsSlide } from './FinancialAssumptionsSlide';
import { TeamBreakdownSlide } from './TeamBreakdownSlide';
import { TeamSlide } from './TeamSlide';
import { CompetitionSlide } from './CompetitionSlide';
import { TechFoundationSlide } from './TechFoundationSlide';
import { MarketSlide } from './MarketSlide';
import { MarketOpportunitySlideV2 } from './MarketOpportunitySlideV2';
import { TargetPersonaSlideV2 } from './TargetPersonaSlideV2';
import { AAValidationSlide } from './AAValidationSlide';
import { B2BPartnershipsSlide } from './B2BPartnershipsSlide';
import { B2BBusinessModelSlide } from './B2BBusinessModelSlide';
import { RisksSlide } from './RisksSlide';
import { GTMDetailedSlide } from './GTMDetailedSlide';

interface SlideRendererProps {
  slide: any;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'title':
      return <TitleSlide slide={slide} />;
    case 'problem':
    case 'problem-statement':
      return <ProblemSlide slide={slide} />;
    case 'solution':
      return <SolutionSlide slide={slide} />;
    case 'competition':
      return <CompetitionSlide slide={slide} />;
    case 'market-opportunity':
      return <MarketOpportunitySlideV2 slide={slide} />;
    case 'target-persona':
      return <TargetPersonaSlideV2 slide={slide} />;
    case 'aa-validation':
      return <AAValidationSlide slide={slide} />;
    case 'revenue-model':
      return <RevenueSlide slide={slide} />;
    case 'unit-economics':
      return <UnitEconomicsSlide slide={slide} />;
    case 'cac-reduction':
      return <CACReductionSlide slide={slide} />;
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
    case 'team':
      return <TeamSlide slide={slide} />;
    case 'team-funding':
      return <TeamSlide slide={slide} />;
    case 'market':
      return <MarketSlide slide={slide} />;
    case 'tech-foundation':
      return <TechFoundationSlide slide={slide} />;
    case 'b2b-partnerships':
      return <B2BPartnershipsSlide slide={slide} />;
    case 'b2b-business-model':
      return <B2BBusinessModelSlide slide={slide} />;
    case 'risks':
      return <RisksSlide slide={slide} />;
    case 'gtm-detailed':
      return <GTMDetailedSlide slide={slide} />;
    default:
      return <div>Slide type not supported: {slide.type}</div>;
  }
};

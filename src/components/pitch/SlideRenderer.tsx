
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
import { MarketGrowthSlide } from './MarketGrowthSlide';
import { CompetitiveLandscapeSlide } from './CompetitiveLandscapeSlide';
import { RiskAnalysisSlide } from './RiskAnalysisSlide';
import { PlatformArchitectureSlide } from './PlatformArchitectureSlide';
import { CommunityGTMSlide } from './CommunityGTMSlide';
import { CredibleInformationCrisisSlide } from './CredibleInformationCrisisSlide';
import { HumanAISolutionSlide } from './HumanAISolutionSlide';
import { CommunityStrategySlide } from './CommunityStrategySlide';
import { ReviewEcosystemSlide } from './ReviewEcosystemSlide';
import { CredibleInformationCrisisSlideV2 } from './CredibleInformationCrisisSlideV2';
import { NetworkEffectsDataMoatsSlide } from './NetworkEffectsDataMoatsSlide';
import { PlatformDifferentiationSlideV2 } from './PlatformDifferentiationSlideV2';
import { SRCCValuePropositionSlide } from './SRCCValuePropositionSlide';
import { SRCCImplementationSlide } from './SRCCImplementationSlide';
import { AboutSlide } from './AboutSlide';
import { AudienceSlide } from './AudienceSlide';
import { ValueSlide } from './ValueSlide';
import { OfferingsSlide } from './OfferingsSlide';
import { PricingSlide } from './PricingSlide';
import { CTASlide } from './CTASlide';
import { OpportunitySlide } from './OpportunitySlide';
import { ContestFormatsSlide } from './ContestFormatsSlide';

interface SlideRendererProps {
  slide: any;
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  // Safety check for slide object
  if (!slide || typeof slide !== 'object') {
    return <div className="text-center text-red-500">Invalid slide data</div>;
  }

  if (!slide.type) {
    return <div className="text-center text-red-500">Slide missing type property</div>;
  }

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
    case 'market-growth':
      return <MarketGrowthSlide slide={slide} />;
    case 'competitive-landscape':
      return <CompetitiveLandscapeSlide slide={slide} />;
    case 'risk-analysis':
      return <RiskAnalysisSlide slide={slide} />;
    case 'platform-architecture':
      return <PlatformArchitectureSlide slide={slide} />;
    case 'unit_economics':
      return <UnitEconomicsSlide slide={slide} />;
    case 'revenue_model':
      return <RevenueSlide slide={slide} />;
    case 'financial_assumptions':
      return <FinancialAssumptionsSlide slide={slide} />;
    case 'community-gtm':
      return <CommunityGTMSlide slide={slide} />;
    case 'credible-information-crisis':
      return <CredibleInformationCrisisSlide slide={slide} />;
    case 'human-ai-solution':
      return <HumanAISolutionSlide slide={slide} />;
    case 'community-strategy':
      return <CommunityStrategySlide slide={slide} />;
    case 'review-ecosystem':
      return <ReviewEcosystemSlide slide={slide} />;
    case 'credible-information-crisis-v2':
      return <CredibleInformationCrisisSlideV2 slide={slide} />;
    case 'network-effects-data-moats':
      return <NetworkEffectsDataMoatsSlide slide={slide} />;
    case 'platform-differentiation-v2':
      return <PlatformDifferentiationSlideV2 slide={slide} />;
    case 'srcc-value-proposition':
      return <SRCCValuePropositionSlide slide={slide} />;
    case 'srcc-implementation':
      return <SRCCImplementationSlide slide={slide} />;
    case 'about':
      return <AboutSlide slide={slide} />;
    case 'audience':
      return <AudienceSlide slide={slide} />;
    case 'value':
      return <ValueSlide slide={slide} />;
    case 'offerings':
      return <OfferingsSlide slide={slide} />;
    case 'pricing':
      return <PricingSlide slide={slide} />;
    case 'cta':
      return <CTASlide slide={slide} />;
    case 'opportunity':
      return <OpportunitySlide slide={slide} />;
    case 'contest-formats':
      return <ContestFormatsSlide slide={slide} />;
    default:
      return <div>Slide type not supported: {slide.type}</div>;
  }
};

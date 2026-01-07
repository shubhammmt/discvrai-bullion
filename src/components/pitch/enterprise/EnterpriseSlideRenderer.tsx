import React from 'react';
import { EnterpriseCoverSlide } from './EnterpriseCoverSlide';
import { EnterpriseCompanySlide } from './EnterpriseCompanySlide';
import { EnterpriseProblemSlide } from './EnterpriseProblemSlide';
import { SolutionOverviewSlide } from './SolutionOverviewSlide';
import { AIAgentsSlide } from './AIAgentsSlide';
import { ContentEngineSlide } from './ContentEngineSlide';
import { AnalyticsInsightsSlide } from './AnalyticsInsightsSlide';
import { EngagementPlatformSlide } from './EngagementPlatformSlide';
import { IntegrationPathsSlide } from './IntegrationPathsSlide';
import { CaseStudySlide } from './CaseStudySlide';
import { EnterpriseROISlide } from './EnterpriseROISlide';
import { WhyUsSlide } from './WhyUsSlide';
import { EnterpriseCTASlide } from './EnterpriseCTASlide';
import { PlatformArchitectureSlide } from './PlatformArchitectureSlide';
import { TechnicalPillarsSlide } from './TechnicalPillarsSlide';
import { UseCaseMatrixSlide } from './UseCaseMatrixSlide';

interface EnterpriseSlideRendererProps {
  slide: any;
}

export const EnterpriseSlideRenderer: React.FC<EnterpriseSlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'enterprise-cover':
      return <EnterpriseCoverSlide slide={slide} />;
    case 'company-intro':
      return <EnterpriseCompanySlide slide={slide} />;
    case 'enterprise-problem':
      return <EnterpriseProblemSlide slide={slide} />;
    case 'solution-overview':
      return <SolutionOverviewSlide slide={slide} />;
    case 'ai-agents':
      return <AIAgentsSlide slide={slide} />;
    case 'content-engine':
      return <ContentEngineSlide slide={slide} />;
    case 'analytics-insights':
      return <AnalyticsInsightsSlide slide={slide} />;
    case 'engagement-platform':
      return <EngagementPlatformSlide slide={slide} />;
    case 'integration-paths':
      return <IntegrationPathsSlide slide={slide} />;
    case 'case-study':
      return <CaseStudySlide slide={slide} />;
    case 'roi-enterprise':
      return <EnterpriseROISlide slide={slide} />;
    case 'why-us':
      return <WhyUsSlide slide={slide} />;
    case 'enterprise-cta':
      return <EnterpriseCTASlide slide={slide} />;
    case 'platform-architecture':
      return <PlatformArchitectureSlide slide={slide} />;
    case 'technical-pillars':
      return <TechnicalPillarsSlide slide={slide} />;
    case 'use-case-matrix':
      return <UseCaseMatrixSlide slide={slide} />;
    default:
      return <div className="p-12 text-white">Slide type not found: {slide.type}</div>;
  }
};

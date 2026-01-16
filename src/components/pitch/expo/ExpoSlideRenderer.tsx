import React from 'react';
import { ExpoSlide } from '@/data/expoPitchSlides';
import { ExpoCoverSlide } from './slides/ExpoCoverSlide';
import { ExpoProblemSlide } from './slides/ExpoProblemSlide';
import { ExpoSolutionSlide } from './slides/ExpoSolutionSlide';
import { ExpoPlatformSlide } from './slides/ExpoPlatformSlide';
import { ExpoEngagementModelsSlide } from './slides/ExpoEngagementModelsSlide';
import { ExpoResultsSlide } from './slides/ExpoResultsSlide';
import { ExpoUseCasesSlide } from './slides/ExpoUseCasesSlide';
import { ExpoTechnologySlide } from './slides/ExpoTechnologySlide';
import { ExpoCompetitiveSlide } from './slides/ExpoCompetitiveSlide';
import { ExpoTractionSlide } from './slides/ExpoTractionSlide';
import { ExpoAMCValueSlide } from './slides/ExpoAMCValueSlide';
import { ExpoAMCAnalyticsSlide } from './slides/ExpoAMCAnalyticsSlide';
import { ExpoAMCComparisonSlide } from './slides/ExpoAMCComparisonSlide';
import { ExpoAMCDashboardsSlide } from './slides/ExpoAMCDashboardsSlide';
import { ExpoAMCMetricsSlide } from './slides/ExpoAMCMetricsSlide';
import { ExpoMfgValueSlide } from './slides/ExpoMfgValueSlide';
import { ExpoMfgCaseStudySlide } from './slides/ExpoMfgCaseStudySlide';
import { ExpoMfgIntegrationSlide } from './slides/ExpoMfgIntegrationSlide';
import { ExpoMfgTimelineSlide } from './slides/ExpoMfgTimelineSlide';
import { ExpoMfgMetricsSlide } from './slides/ExpoMfgMetricsSlide';
import { ExpoHealthcareValueSlide } from './slides/ExpoHealthcareValueSlide';
import { ExpoHealthcareUseCasesSlide } from './slides/ExpoHealthcareUseCasesSlide';
import { ExpoHealthcareIntegrationSlide } from './slides/ExpoHealthcareIntegrationSlide';
import { ExpoHealthcareTimelineSlide } from './slides/ExpoHealthcareTimelineSlide';
import { ExpoHealthcareMetricsSlide } from './slides/ExpoHealthcareMetricsSlide';
import { ExpoWhyNowSlide } from './slides/ExpoWhyNowSlide';
import { ExpoNextStepsSlide } from './slides/ExpoNextStepsSlide';
import { ExpoContactSlide } from './slides/ExpoContactSlide';
import { ExpoThankYouSlide } from './slides/ExpoThankYouSlide';
import { ExpoIndustriesSlide } from './slides/ExpoIndustriesSlide';

interface ExpoSlideRendererProps {
  slide: ExpoSlide;
}

export const ExpoSlideRenderer: React.FC<ExpoSlideRendererProps> = ({ slide }) => {
  switch (slide.type) {
    case 'cover':
      return <ExpoCoverSlide slide={slide} />;
    case 'problem':
      return <ExpoProblemSlide slide={slide} />;
    case 'solution':
      return <ExpoSolutionSlide slide={slide} />;
    case 'platform':
      return <ExpoPlatformSlide slide={slide} />;
    case 'engagement-models':
      return <ExpoEngagementModelsSlide slide={slide} />;
    case 'results':
      return <ExpoResultsSlide slide={slide} />;
    case 'use-cases':
      return <ExpoUseCasesSlide slide={slide} />;
    case 'technology':
      return <ExpoTechnologySlide slide={slide} />;
    case 'competitive':
      return <ExpoCompetitiveSlide slide={slide} />;
    case 'traction':
      return <ExpoTractionSlide slide={slide} />;
    case 'amc-value':
      return <ExpoAMCValueSlide slide={slide} />;
    case 'amc-analytics':
      return <ExpoAMCAnalyticsSlide slide={slide} />;
    case 'amc-comparison':
      return <ExpoAMCComparisonSlide slide={slide} />;
    case 'amc-dashboards':
      return <ExpoAMCDashboardsSlide slide={slide} />;
    case 'amc-metrics':
      return <ExpoAMCMetricsSlide slide={slide} />;
    case 'mfg-value':
      return <ExpoMfgValueSlide slide={slide} />;
    case 'mfg-case-study':
      return <ExpoMfgCaseStudySlide slide={slide} />;
    case 'mfg-integration':
      return <ExpoMfgIntegrationSlide slide={slide} />;
    case 'mfg-timeline':
      return <ExpoMfgTimelineSlide slide={slide} />;
    case 'mfg-metrics':
      return <ExpoMfgMetricsSlide slide={slide} />;
    case 'healthcare-value':
      return <ExpoHealthcareValueSlide slide={slide} />;
    case 'healthcare-use-cases':
      return <ExpoHealthcareUseCasesSlide slide={slide} />;
    case 'healthcare-integration':
      return <ExpoHealthcareIntegrationSlide slide={slide} />;
    case 'healthcare-timeline':
      return <ExpoHealthcareTimelineSlide slide={slide} />;
    case 'healthcare-metrics':
      return <ExpoHealthcareMetricsSlide slide={slide} />;
    case 'why-now':
      return <ExpoWhyNowSlide slide={slide} />;
    case 'next-steps':
      return <ExpoNextStepsSlide slide={slide} />;
    case 'contact':
      return <ExpoContactSlide slide={slide} />;
    case 'thank-you':
      return <ExpoThankYouSlide slide={slide} />;
    case 'industries':
      return <ExpoIndustriesSlide slide={slide} />;
    default:
      return (
        <div className="h-full w-full flex items-center justify-center bg-white text-slate-800">
          <p className="text-2xl">Slide type not found: {slide.type}</p>
        </div>
      );
  }
};

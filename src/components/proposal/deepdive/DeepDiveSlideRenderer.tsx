import React from 'react';
import { DeepDiveSlide } from '@/data/deepDiveProposalSlides';
import { CoverSlide } from './slides/CoverSlide';
import { ArchitectureFlowSlide } from './slides/ArchitectureFlowSlide';
import { ContextIntelligenceSlide } from './slides/ContextIntelligenceSlide';
import { TimingPredictionSlide } from './slides/TimingPredictionSlide';
import { MultiSignalFusionSlide } from './slides/MultiSignalFusionSlide';
import { LearningOptimizationSlide } from './slides/LearningOptimizationSlide';
import { PersonalizationArchSlide } from './slides/PersonalizationArchSlide';
import { ProgressiveProfilingSlide } from './slides/ProgressiveProfilingSlide';
import { DynamicSegmentationSlide } from './slides/DynamicSegmentationSlide';
import { MultiFactorScoringSlide } from './slides/MultiFactorScoringSlide';
import { PredictiveModelsSlide } from './slides/PredictiveModelsSlide';
import { AIResearchAssistantSlide } from './slides/AIResearchAssistantSlide';
import { PredictiveAnalyticsSlide } from './slides/PredictiveAnalyticsSlide';
import { CrossSellOpportunitySlide } from './slides/CrossSellOpportunitySlide';
import { AutomatedCommunicationSlide } from './slides/AutomatedCommunicationSlide';
import { SynergyArchitectureSlide } from './slides/SynergyArchitectureSlide';

interface DeepDiveSlideRendererProps {
  slide: DeepDiveSlide;
  slideNumber: number;
  totalSlides: number;
}

const sectionConfig: Record<string, { label: string; color: string }> = {
  nudges: { label: 'AI Nudges', color: 'bg-blue-600' },
  personalization: { label: 'Personalization', color: 'bg-purple-600' },
  distributor: { label: 'Distributor', color: 'bg-teal-600' },
  summary: { label: 'Summary', color: 'bg-slate-700' },
};

export const DeepDiveSlideRenderer: React.FC<DeepDiveSlideRendererProps> = ({ slide, slideNumber, totalSlides }) => {
  const section = sectionConfig[slide.section];
  const commonProps = { slide, slideNumber, totalSlides };

  switch (slide.type) {
    case 'cover':
      return <CoverSlide slide={slide} />;
    case 'architecture-flow':
    case 'distributor-architecture':
      return <ArchitectureFlowSlide {...commonProps} sectionLabel={section?.label || ''} sectionColor={section?.color || ''} />;
    case 'context-intelligence':
      return <ContextIntelligenceSlide {...commonProps} />;
    case 'timing-prediction':
      return <TimingPredictionSlide {...commonProps} />;
    case 'multi-signal-fusion':
      return <MultiSignalFusionSlide {...commonProps} />;
    case 'learning-optimization':
      return <LearningOptimizationSlide {...commonProps} />;
    case 'personalization-architecture':
      return <PersonalizationArchSlide {...commonProps} />;
    case 'progressive-profiling':
      return <ProgressiveProfilingSlide {...commonProps} />;
    case 'dynamic-segmentation':
      return <DynamicSegmentationSlide {...commonProps} />;
    case 'multi-factor-scoring':
      return <MultiFactorScoringSlide {...commonProps} />;
    case 'predictive-models':
      return <PredictiveModelsSlide {...commonProps} />;
    case 'ai-research-assistant':
      return <AIResearchAssistantSlide {...commonProps} />;
    case 'predictive-analytics':
      return <PredictiveAnalyticsSlide {...commonProps} />;
    case 'cross-sell-opportunity':
      return <CrossSellOpportunitySlide {...commonProps} />;
    case 'automated-communication':
      return <AutomatedCommunicationSlide {...commonProps} />;
    case 'synergy-architecture':
      return <SynergyArchitectureSlide {...commonProps} />;
    default:
      return <div className="h-full w-full bg-white flex items-center justify-center text-slate-500">Slide type not found</div>;
  }
};

import React from 'react';
import { AptechExecSlide } from '@/data/aptechExecutionSlides';
import { ExecCoverSlide } from './ExecCoverSlide';
import { ExecPurposeSlide } from './ExecPurposeSlide';
import { ExecSharedSlide } from './ExecSharedSlide';
import { ExecPhase0Slide } from './ExecPhase0Slide';
import { ExecTimelineImpactSlide } from './ExecTimelineImpactSlide';
import { ExecModulesCoreSlide } from './ExecModulesCoreSlide';
import { ExecModulesAddonsSlide } from './ExecModulesAddonsSlide';
import { ExecPodsSlide } from './ExecPodsSlide';
import { ExecEffortSlide } from './ExecEffortSlide';
import { ExecDependenciesSlide } from './ExecDependenciesSlide';
import { ExecParallelSlide } from './ExecParallelSlide';
import { ExecTimelinePSlide } from './ExecTimelinePSlide';
import { ExecCostSummarySlide } from './ExecCostSummarySlide';
import { ExecCostTableSlide } from './ExecCostTableSlide';
import { ExecPaymentSlide } from './ExecPaymentSlide';
import { ExecDeliverablesSlide } from './ExecDeliverablesSlide';
import { ExecGovernanceSlide } from './ExecGovernanceSlide';
import { ExecDiscussSlide } from './ExecDiscussSlide';

interface Props {
  slide: AptechExecSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ExecSlideRenderer: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const p = { slideNumber, totalSlides };
  switch (slide.type) {
    case 'exec-cover':           return <ExecCoverSlide />;
    case 'exec-purpose':         return <ExecPurposeSlide {...p} />;
    case 'exec-shared':          return <ExecSharedSlide {...p} />;
    case 'exec-phase0':          return <ExecPhase0Slide {...p} />;
    case 'exec-timeline-impact': return <ExecTimelineImpactSlide {...p} />;
    case 'exec-modules-core':    return <ExecModulesCoreSlide {...p} />;
    case 'exec-modules-addons':  return <ExecModulesAddonsSlide {...p} />;
    case 'exec-pods':            return <ExecPodsSlide {...p} />;
    case 'exec-effort':          return <ExecEffortSlide {...p} />;
    case 'exec-dependencies':    return <ExecDependenciesSlide {...p} />;
    case 'exec-parallel':        return <ExecParallelSlide {...p} />;
    case 'exec-timeline-p':      return <ExecTimelinePSlide {...p} />;
    case 'exec-cost-summary':    return <ExecCostSummarySlide {...p} />;
    case 'exec-cost-table':      return <ExecCostTableSlide {...p} />;
    case 'exec-payment':         return <ExecPaymentSlide {...p} />;
    case 'exec-deliverables':    return <ExecDeliverablesSlide {...p} />;
    case 'exec-governance':      return <ExecGovernanceSlide {...p} />;
    case 'exec-discuss':         return <ExecDiscussSlide {...p} />;
    default:
      return <div className="p-8 text-slate-400">Slide type not found: {slide.type}</div>;
  }
};

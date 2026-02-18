import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOCoverSlide } from './CBOCoverSlide';
import { CBOExecSummarySlide } from './CBOExecSummarySlide';
import { CBOProblemsSlide } from './CBOProblemsSlide';
import { CBOCostSlide } from './CBOCostSlide';
import { CBOSolutionSlide } from './CBOSolutionSlide';
import { CBOProblemSolutionSlide } from './CBOProblemSolutionSlide';
import { CBOPhase1Slide } from './CBOPhase1Slide';
import { CBOOutcomesSlide } from './CBOOutcomesSlide';
import { CBOInvestmentSlide } from './CBOInvestmentSlide';
import { CBORoadmapSlide } from './CBORoadmapSlide';
import { CBORisksSlide } from './CBORisksSlide';
import { CBONextStepsSlide } from './CBONextStepsSlide';
import { CBOBenchmarksSlide } from './CBOBenchmarksSlide';
import { CBOAskSlide } from './CBOAskSlide';
import { CBOArchitectureSlide } from './CBOArchitectureSlide';
import { CBOFinancialModelSlide } from './CBOFinancialModelSlide';

interface Props {
  slide: AptechCBOSlide;
  slideNumber: number;
  totalSlides: number;
}

export const CBOSlideRenderer: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const props = { slide, slideNumber, totalSlides };
  switch (slide.type) {
    case 'cbo-cover':            return <CBOCoverSlide slide={slide} />;
    case 'cbo-exec-summary':     return <CBOExecSummarySlide {...props} />;
    case 'cbo-problems':         return <CBOProblemsSlide {...props} />;
    case 'cbo-cost-of-inaction': return <CBOCostSlide {...props} />;
    case 'cbo-solution':         return <CBOSolutionSlide {...props} />;
    case 'cbo-problem-solution': return <CBOProblemSolutionSlide {...props} />;
    case 'cbo-phase1':           return <CBOPhase1Slide {...props} />;
    case 'cbo-outcomes':         return <CBOOutcomesSlide {...props} />;
    case 'cbo-investment':       return <CBOInvestmentSlide {...props} />;
    case 'cbo-roadmap':          return <CBORoadmapSlide {...props} />;
    case 'cbo-risks':            return <CBORisksSlide {...props} />;
    case 'cbo-next-steps':       return <CBONextStepsSlide {...props} />;
    case 'cbo-benchmarks':       return <CBOBenchmarksSlide {...props} />;
    case 'cbo-ask':              return <CBOAskSlide {...props} />;
    case 'cbo-architecture':     return <CBOArchitectureSlide {...props} />;
    case 'cbo-financial-model':  return <CBOFinancialModelSlide {...props} />;
    default:
      return <div className="p-8 text-slate-400">Slide type not found: {slide.type}</div>;
  }
};

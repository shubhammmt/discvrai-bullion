import React from 'react';
import { AptechExecSlide } from '@/data/aptechExecutionSlides';
import { ExecCoverSlide } from './ExecCoverSlide';
import { ExecOverviewSlide } from './ExecOverviewSlide';
import { ExecTrackASlide } from './ExecTrackASlide';
import { ExecTrackBSlide } from './ExecTrackBSlide';
import { ExecExclusionsSlide } from './ExecExclusionsSlide';
import { ExecPaymentSlide } from './ExecPaymentSlide';
import { ExecScopeChangeSlide } from './ExecScopeChangeSlide';
import { ExecSummarySlide } from './ExecSummarySlide';

interface Props {
  slide: AptechExecSlide;
  slideNumber: number;
  totalSlides: number;
}

export const ExecSlideRenderer: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => {
  const p = { slideNumber, totalSlides };
  switch (slide.type) {
    case 'exec-cover':        return <ExecCoverSlide />;
    case 'exec-overview':     return <ExecOverviewSlide {...p} />;
    case 'exec-track-a':      return <ExecTrackASlide {...p} />;
    case 'exec-track-b':      return <ExecTrackBSlide {...p} />;
    case 'exec-exclusions':   return <ExecExclusionsSlide {...p} />;
    case 'exec-payment':      return <ExecPaymentSlide {...p} />;
    case 'exec-scope-change': return <ExecScopeChangeSlide {...p} />;
    case 'exec-summary':      return <ExecSummarySlide {...p} />;
    default:
      return <div className="p-8 text-slate-400">Slide type not found: {slide.type}</div>;
  }
};

import React from 'react';
import { AptechPostSalesSlide } from '@/data/aptechPostSalesSlides';
import { PSSlideLayout } from './PSSlideLayout';

interface Props { slide: AptechPostSalesSlide; slideNumber: number; totalSlides: number; }

const stageColors: Record<string, { bg: string; border: string; tag: string; dot: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   tag: 'bg-blue-600 text-white', dot: 'bg-blue-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', tag: 'bg-indigo-600 text-white', dot: 'bg-indigo-500' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', tag: 'bg-violet-600 text-white', dot: 'bg-violet-500' },
};

export const PSThreeStagesSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <PSSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Rollout Stages</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-5">
      {slide.stages?.map((stage: any, i: number) => {
        const c = stageColors[stage.color] || stageColors.blue;
        return (
          <div key={i} className={`rounded-xl border-2 ${c.border} ${c.bg} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-bold px-3 py-1 rounded-full ${c.tag}`}>Stage {stage.stage}</span>
              <span className="text-xs font-medium text-slate-500">{stage.timeline}</span>
            </div>
            <p className="text-lg font-bold text-slate-800 mb-3">{stage.what}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{stage.deliverables}</p>
          </div>
        );
      })}
    </div>

    <div className="mt-5 flex items-center gap-4">
      <div className="flex items-center gap-2 bg-blue-100 rounded-full px-4 py-2">
        <span className="w-2 h-2 rounded-full bg-blue-600" />
        <span className="text-sm font-bold text-blue-800">First value: 4–8 weeks</span>
      </div>
      <div className="flex items-center gap-2 bg-indigo-100 rounded-full px-4 py-2">
        <span className="w-2 h-2 rounded-full bg-indigo-600" />
        <span className="text-sm font-bold text-indigo-800">Full 2A+2B: 20–24 weeks</span>
      </div>
    </div>
  </PSSlideLayout>
);

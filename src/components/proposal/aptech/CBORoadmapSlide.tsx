import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

const phaseColors: Record<string, { bg: string; border: string; tag: string; dot: string }> = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   tag: 'bg-blue-600 text-white', dot: 'bg-blue-500' },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', tag: 'bg-indigo-600 text-white', dot: 'bg-indigo-500' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', tag: 'bg-violet-600 text-white', dot: 'bg-violet-500' },
};

export const CBORoadmapSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Implementation Roadmap</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-5 mb-5">
      {slide.phases?.map((phase: any, i: number) => {
        const c = phaseColors[phase.color] || phaseColors.blue;
        return (
          <div key={i} className={`rounded-xl border-2 ${c.border} ${c.bg} p-5`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${c.tag}`}>{phase.label}</span>
              <span className="text-xs text-slate-500">{phase.timeline}</span>
            </div>
            <p className="font-bold text-slate-800 mb-3">{phase.title}</p>
            <ul className="space-y-2">
              {phase.items.map((item: string, ii: number) => (
                <li key={ii} className="flex items-start gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                  <span className="text-xs text-slate-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>

    {/* Success metrics */}
    <div className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Success Metrics</p>
      <div className="flex items-center gap-6">
        {slide.metrics?.map((m: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-700">{m}</span>
          </div>
        ))}
      </div>
    </div>
  </CBOSlideLayout>
);

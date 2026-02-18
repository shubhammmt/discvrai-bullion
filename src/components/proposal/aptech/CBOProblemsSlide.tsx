import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

const colorMap: Record<string, string> = {
  red: 'border-red-300 bg-red-50',
  orange: 'border-orange-300 bg-orange-50',
  amber: 'border-amber-300 bg-amber-50',
};
const labelColorMap: Record<string, string> = {
  red: 'bg-red-600',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
};
const dotMap: Record<string, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  amber: 'bg-amber-500',
};

export const CBOProblemsSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">The Problem</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    {/* Funnel visual */}
    <div className="flex flex-col gap-4">
      {slide.funnelSections?.map((section: any, si: number) => (
        <div key={si} className={`rounded-xl border-2 p-5 ${colorMap[section.color]}`}>
          <div className="flex items-center gap-3 mb-3">
            <span className={`text-xs font-bold text-white px-3 py-1 rounded-full ${labelColorMap[section.color]}`}>
              {section.label}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {section.items.map((item: string, ii: number) => (
              <div key={ii} className="flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${dotMap[section.color]}`} />
                <span className="text-sm text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>

    {/* Counter */}
    <div className="mt-4 flex items-center gap-3">
      <span className="text-4xl font-bold text-slate-900">9</span>
      <p className="text-base text-slate-600">critical failure points identified across the entire customer journey</p>
    </div>
  </CBOSlideLayout>
);

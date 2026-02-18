import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOBenchmarksSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Industry Benchmarks</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="space-y-3">
      {slide.benchmarks?.map((b: any, i: number) => (
        <div key={i} className="grid grid-cols-12 gap-3 bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 items-center hover:bg-blue-50 hover:border-blue-100 transition-colors">
          <div className="col-span-1">
            <span className="text-xs font-bold text-slate-400">{b.number}</span>
          </div>
          <div className="col-span-3">
            <p className="text-sm font-semibold text-slate-800">{b.title}</p>
          </div>
          <div className="col-span-3 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0 mt-1.5" />
            <p className="text-xs text-red-600">{b.current}</p>
          </div>
          <div className="col-span-3 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
            <p className="text-xs text-blue-700 font-medium">{b.solution}</p>
          </div>
          <div className="col-span-2 flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 mt-1.5" />
            <p className="text-xs text-emerald-600">{b.impact}</p>
          </div>
        </div>
      ))}
    </div>

    {/* Column legend */}
    <div className="mt-4 flex items-center gap-6 text-xs text-slate-400">
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400" />Current State</div>
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500" />Solution</div>
      <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" />Industry Best Practice</div>
    </div>
  </CBOSlideLayout>
);

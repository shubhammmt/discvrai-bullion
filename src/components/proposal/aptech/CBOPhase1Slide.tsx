import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOPhase1Slide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Immediate Solution</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="grid grid-cols-2 gap-6">
      {/* Phase 1A */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold bg-blue-600 text-white px-2.5 py-0.5 rounded-full">Phase 1A</span>
            <p className="text-sm font-semibold text-blue-800 mt-1">{slide.phase1a?.label?.replace('Phase 1A — ', '')}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-700">{slide.phase1a?.investment}</p>
            <p className="text-xs text-blue-500">{slide.phase1a?.timeline}</p>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Deliverables</p>
        <ul className="space-y-1.5 mb-5">
          {slide.phase1a?.deliverables?.map((d: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-blue-500 font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs text-slate-700">{d}</span>
            </li>
          ))}
        </ul>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Expected Impact</p>
        <div className="grid grid-cols-3 gap-2">
          {slide.phase1a?.impact?.map((imp: any, i: number) => (
            <div key={i} className="bg-white rounded-lg p-2 text-center border border-blue-100">
              <p className="text-sm font-bold text-blue-700">{imp.metric}</p>
              <p className="text-xs font-medium text-slate-600 mt-0.5">{imp.label}</p>
              <p className="text-xs text-slate-400">{imp.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Phase 1B */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xs font-bold bg-indigo-600 text-white px-2.5 py-0.5 rounded-full">Phase 1B</span>
            <p className="text-sm font-semibold text-indigo-800 mt-1">{slide.phase1b?.label?.replace('Phase 1B — ', '')}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-indigo-700">{slide.phase1b?.investment}</p>
            <p className="text-xs text-indigo-500">{slide.phase1b?.timeline}</p>
          </div>
        </div>

        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Deliverables</p>
        <ul className="space-y-1.5 mb-5">
          {slide.phase1b?.deliverables?.map((d: string, i: number) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-indigo-500 font-bold text-xs flex-shrink-0 mt-0.5">✓</span>
              <span className="text-xs text-slate-700">{d}</span>
            </li>
          ))}
        </ul>

        <div className="bg-indigo-100 rounded-lg p-3 border border-indigo-200 mt-4">
          <p className="text-xs font-semibold text-indigo-700">Expected Impact</p>
          <p className="text-sm text-indigo-800 mt-1">{slide.phase1b?.impact}</p>
        </div>

        {/* Sequence note */}
        <div className="mt-4 bg-white border border-indigo-100 rounded-lg p-3">
          <p className="text-xs text-slate-500">Phase 1B activates after Phase 1A proves ROI. Modular and non-disruptive to existing flows.</p>
        </div>
      </div>
    </div>
  </CBOSlideLayout>
);

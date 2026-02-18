import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOExecSummarySlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    {/* Slide label */}
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Executive Summary</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8 max-w-3xl">{slide.headline}</h2>

    <div className="grid grid-cols-2 gap-8">
      {/* Left: Problem metrics */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">The Problem</p>
        <div className="grid grid-cols-2 gap-4">
          {slide.problems?.map((p: any, i: number) => (
            <div key={i} className="bg-red-50 border border-red-100 rounded-xl p-4">
              <p className="text-2xl font-bold text-red-600">{p.value}<span className="text-sm font-medium text-red-400 ml-1">{p.note}</span></p>
              <p className="text-sm font-semibold text-slate-700 mt-1">{p.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{p.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Solution */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-4">The Solution</p>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 h-full">
          <p className="text-lg font-bold text-blue-800 mb-4">{slide.solution?.title}</p>
          <ul className="space-y-3">
            {slide.solution?.points?.map((pt: string, i: number) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 mt-0.5">✓</span>
                <span className="text-sm text-slate-700">{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    {/* Bottom highlight bar */}
    <div className="mt-6 bg-slate-900 rounded-xl p-4 flex items-center justify-between">
      <p className="text-white font-semibold">Total Annual Opportunity</p>
      <p className="text-2xl font-bold text-blue-400">₹3.84–9.43 Cr</p>
    </div>
  </CBOSlideLayout>
);

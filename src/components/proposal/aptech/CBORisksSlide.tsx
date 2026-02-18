import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBORisksSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Risk Mitigation</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-5">{slide.headline}</h2>

    <div className="grid grid-cols-2 gap-4 mb-5">
      {slide.risks?.map((risk: any, i: number) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
              {i + 1}
            </span>
            <p className="font-bold text-slate-800 text-sm">{risk.title}</p>
          </div>
          <div className="pl-8 space-y-2">
            <div>
              <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Mitigation</p>
              <p className="text-xs text-slate-700 mt-0.5">{risk.mitigation}</p>
            </div>
            <div>
              <p className="text-xs text-emerald-600 font-semibold uppercase tracking-wider">Success Factor</p>
              <p className="text-xs text-slate-700 mt-0.5">{risk.successFactor}</p>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Governance */}
    <div className="bg-blue-50 border border-blue-200 rounded-xl px-5 py-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-blue-600 mb-2">Governance Model</p>
      <div className="flex items-center gap-8">
        {slide.governance?.map((g: string, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-sm text-slate-700">{g}</span>
          </div>
        ))}
      </div>
    </div>
  </CBOSlideLayout>
);

import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOArchitectureSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} appendix>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Technical Architecture</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">{slide.headline}</h2>

    <div className="grid grid-cols-5 gap-3 mb-5">
      {slide.components?.map((comp: any, i: number) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <span className="text-xs font-bold text-slate-400">{comp.number}</span>
          <p className="font-bold text-sm text-slate-800 mt-1 mb-2">{comp.title}</p>
          <ul className="space-y-1.5">
            {comp.items.map((item: string, ii: number) => (
              <li key={ii} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0 mt-1.5" />
                <span className="text-xs text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Data flow */}
    <div className="bg-slate-900 rounded-xl p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Data Flow</p>
      <div className="flex flex-wrap items-center gap-2">
        {slide.dataFlow?.split(' → ').map((step: string, i: number, arr: string[]) => (
          <React.Fragment key={i}>
            <span className="text-xs font-medium text-blue-300 bg-blue-900/40 border border-blue-800 rounded px-2 py-1">{step}</span>
            {i < arr.length - 1 && <span className="text-slate-500 text-sm">→</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  </CBOSlideLayout>
);

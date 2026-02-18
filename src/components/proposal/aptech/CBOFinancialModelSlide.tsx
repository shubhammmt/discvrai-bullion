import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

export const CBOFinancialModelSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides} appendix>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Detailed Financial Model</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4">{slide.headline}</h2>

    <div className="grid grid-cols-3 gap-6">
      {/* Revenue table */}
      <div className="col-span-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Revenue Impact by Phase</p>
        <div className="grid grid-cols-5 gap-2 mb-1.5 px-2">
          {['Phase', 'Enrollments/Mo', 'Revenue/Mo', 'Annual Revenue', 'Incremental'].map((h, i) => (
            <div key={i} className="text-xs font-semibold uppercase tracking-wider text-slate-400">{h}</div>
          ))}
        </div>
        <div className="space-y-1.5">
          {slide.revenueRows?.map((row: any, i: number) => (
            <div key={i} className={`grid grid-cols-5 gap-2 rounded-lg px-2 py-2.5 border items-center ${
              row.phase === 'Current' ? 'bg-slate-100 border-slate-200' : 'bg-emerald-50 border-emerald-100'
            }`}>
              <div className={`font-bold text-sm ${row.phase === 'Current' ? 'text-slate-600' : 'text-blue-700'}`}>{row.phase}</div>
              <div className="text-xs text-slate-600">{row.enrollments}</div>
              <div className="text-xs text-slate-700">{row.monthly}</div>
              <div className="text-xs font-medium text-slate-800">{row.annual}</div>
              <div className={`text-xs font-bold ${row.incremental === 'Baseline' ? 'text-slate-400' : 'text-emerald-600'}`}>{row.incremental}</div>
            </div>
          ))}
        </div>

        {/* Assumptions */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Key Assumptions</p>
          <ul className="space-y-1">
            {slide.assumptions?.map((a: string, i: number) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-slate-400 flex-shrink-0 mt-1.5" />
                <span className="text-xs text-slate-600">{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Savings column */}
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Cost Savings</p>
        <div className="space-y-3 mb-4">
          {slide.savings?.map((s: any, i: number) => (
            <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-xs text-slate-500">{s.label}</p>
              <p className="font-bold text-blue-700 text-lg">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="bg-slate-900 rounded-xl p-4">
          <p className="text-xs text-slate-400 mb-1">Total Annual Impact</p>
          <p className="text-2xl font-bold text-blue-400">₹3.84–9.43 Cr</p>
          <p className="text-xs text-slate-400 mt-1">Conservative estimate</p>
        </div>
      </div>
    </div>
  </CBOSlideLayout>
);

import React from 'react';
import { AptechCBOSlide } from '@/data/aptechCBOSlides';
import { CBOSlideLayout } from './CBOSlideLayout';

interface Props { slide: AptechCBOSlide; slideNumber: number; totalSlides: number; }

const severityStyle: Record<string, string> = {
  critical: 'bg-red-50 border-red-200',
  high: 'bg-orange-50 border-orange-200',
  medium: 'bg-amber-50 border-amber-200',
  total: 'bg-slate-900 border-slate-900',
};

export const CBOCostSlide: React.FC<Props> = ({ slide, slideNumber, totalSlides }) => (
  <CBOSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Quantified Impact</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6">{slide.headline}</h2>

    <div className="grid grid-cols-5 gap-3 mb-1 px-1">
      {['Impact Area', 'Monthly Loss', 'Annual Loss', '', ''].slice(0,3).map((h, i) => (
        <div key={i} className={`text-xs font-semibold uppercase tracking-wider text-slate-500 ${i === 0 ? 'col-span-2' : ''}`}>{h}</div>
      ))}
    </div>

    <div className="space-y-2">
      {slide.financialRows?.map((row: any, i: number) => (
        <div key={i} className={`grid grid-cols-5 gap-3 rounded-lg border p-3 items-center ${severityStyle[row.severity]}`}>
          <div className="col-span-2 font-semibold text-sm text-slate-800" style={{ color: row.severity === 'total' ? 'white' : undefined }}>
            {row.area}
          </div>
          <div className={`font-bold text-sm ${row.severity === 'critical' ? 'text-red-600' : row.severity === 'total' ? 'text-red-300' : 'text-orange-600'}`}>
            {row.monthly}
          </div>
          <div className={`font-bold text-sm ${row.severity === 'critical' ? 'text-red-700' : row.severity === 'total' ? 'text-red-200' : 'text-orange-700'}`}>
            {row.annual}
          </div>
          {row.severity === 'critical' && <div className="text-xs text-red-400 font-medium">Critical</div>}
          {row.severity === 'high' && <div className="text-xs text-orange-400 font-medium">High</div>}
          {row.severity === 'medium' && <div className="text-xs text-amber-500 font-medium">Medium</div>}
          {row.severity === 'total' && <div className="text-xs text-slate-300 font-bold">Total</div>}
        </div>
      ))}
    </div>

    {/* Operational stats */}
    <div className="mt-5 grid grid-cols-3 gap-4">
      {slide.operationalStats?.map((s: any, i: number) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-slate-900">{s.metric}</p>
          <p className="text-xs font-semibold text-slate-600 mt-0.5">{s.label}</p>
          <p className="text-xs text-slate-400 mt-0.5">{s.sub}</p>
        </div>
      ))}
    </div>
  </CBOSlideLayout>
);

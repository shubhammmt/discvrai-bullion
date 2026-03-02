import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecScopeChangeSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Governance</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8 max-w-3xl">
      Scope change policy &amp; next steps
    </h2>

    <div className="grid grid-cols-2 gap-6">
      {/* Scope Change */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Scope Change</p>
        <div className="space-y-4">
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">✓</span>
              <p className="font-bold text-slate-900">Up to 10%</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Up to 10% scope change (by effort/cost) is <strong>accommodated within the agreed pricing</strong>.
            </p>
          </div>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-xs">+</span>
              <p className="font-bold text-slate-900">Beyond 10%</p>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Changes beyond 10% are <strong>charged separately</strong> as per agreed manpower/rates.
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Next Steps</p>
        <div className="space-y-3">
          {[
            { num: '1', text: 'Sign-off on proposal and commercial terms' },
            { num: '2', text: 'Kick-off and 4-week scoping' },
            { num: '3', text: 'Detailed plan for first delivery and refined milestones shared at scoping completion' },
            { num: '4', text: 'Monthly plan refresh and weekly steering during delivery' },
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4">
              <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{step.num}</span>
              <p className="text-sm text-slate-800 font-medium leading-relaxed pt-1">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </ExecSlideLayout>
);

import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecOverviewSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Slide 2</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8 max-w-3xl">
      Proposal at a glance
    </h2>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-lg">2</span>
          <p className="font-bold text-slate-900 text-lg">Two Tracks</p>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>Track A</strong> (Pre-Sales) and <strong>Track B</strong> (Post-Sales) — designed to run in parallel for faster time-to-value.
        </p>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-lg bg-slate-800 text-white flex items-center justify-center font-bold text-sm">P0</span>
          <p className="font-bold text-slate-900 text-lg">Phase 0 — Scoping</p>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          4-week scoping and discovery from kick-off. Detailed plan for first delivery shared at scoping completion.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">🚀</span>
          <p className="font-bold text-slate-900 text-lg">First Delivery</p>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Target <strong>12–16 weeks</strong> from kick-off. Exact scope and date confirmed after scoping.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm">10%</span>
          <p className="font-bold text-slate-900 text-lg">Scope Change Policy</p>
        </div>
        <p className="text-sm text-slate-700 leading-relaxed">
          Up to <strong>10% scope change</strong> accommodated within agreed pricing. Beyond that, charged as per agreed rates.
        </p>
      </div>
    </div>
  </ExecSlideLayout>
);

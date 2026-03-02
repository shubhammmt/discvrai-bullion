import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecSummarySlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Closing</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-8 max-w-3xl">
      Summary
    </h2>

    <div className="max-w-3xl space-y-5">
      {/* Tracks */}
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">Track A — Pre-Sales</p>
          <p className="text-2xl font-bold text-slate-900">₹45 Lakhs</p>
          <p className="text-sm text-slate-600 mt-1">12–24 weeks post scoping</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">Track B — Post-Sales</p>
          <p className="text-2xl font-bold text-slate-900">₹93.5 Lakhs</p>
          <p className="text-sm text-slate-600 mt-1">24–36 weeks post scoping</p>
        </div>
      </div>

      {/* Key points */}
      <div className="bg-slate-900 rounded-xl p-6 text-white">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded bg-blue-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">P0</span>
            <p className="text-sm"><strong>Phase 0:</strong> 4-week scoping from kick-off</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded bg-amber-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">✕</span>
            <p className="text-sm"><strong>Exclusive of:</strong> Cloud, LLM, voice, telephony, WhatsApp usage, travel (client-borne as per actuals)</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-5 h-5 rounded bg-emerald-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">₹</span>
            <p className="text-sm"><strong>Payment:</strong> 30% start scoping · 20% scoping complete · 20% M1 · 20% M2 · 10% dev complete</p>
          </div>
        </div>
      </div>
    </div>
  </ExecSlideLayout>
);

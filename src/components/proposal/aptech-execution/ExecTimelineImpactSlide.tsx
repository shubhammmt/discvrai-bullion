import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecTimelineImpactSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Engagement Model</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      How scoping affects timeline, costing, and scope changes
    </h2>

    <div className="grid grid-cols-3 gap-5 mb-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <p className="font-bold text-slate-900 text-sm mb-3">📅 Timeline Impact</p>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex justify-between border-b border-blue-100 pb-1.5">
            <span className="text-slate-500">Weeks 1–4</span><span className="font-semibold">Scoping (Phase 0)</span>
          </div>
          <div className="flex justify-between border-b border-blue-100 pb-1.5">
            <span className="text-slate-500">First delivery</span><span className="font-semibold text-emerald-700">12–16 weeks from kick-off</span>
          </div>
          <div className="flex justify-between border-b border-blue-100 pb-1.5">
            <span className="text-slate-500">Full 2A+2B</span><span className="font-semibold">20–24 weeks from kick-off</span>
          </div>
          <p className="text-slate-500 pt-1 italic">First value is expected in 12–16 weeks. After scoping, we share a detailed plan with a firmer date.</p>
        </div>
      </div>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="font-bold text-slate-900 text-sm mb-3">💰 Costing Impact</p>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <span className="text-slate-500">Current doc</span><span className="font-semibold">Broader estimation</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-1.5">
            <span className="text-slate-500">After scoping</span><span className="font-semibold text-blue-700">Detailed SOW</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Final proposal</span><span className="font-semibold">Fixed-price or T&M</span>
          </div>
          <p className="text-slate-500 pt-1 italic">Final proposal can be fixed-price (module-based) or time & material with monthly caps, per Aptech preference.</p>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <p className="font-bold text-slate-900 text-sm mb-3">🔄 Scope Change Policy</p>
        <div className="space-y-2 text-xs text-slate-700">
          <div className="bg-white rounded-lg p-3 border border-amber-100">
            <p className="font-bold text-amber-700 mb-1">10% Buffer</p>
            <p>Up to 10% scope change (by effort/cost) is accommodated within agreed pricing.</p>
          </div>
          <div className="bg-white rounded-lg p-3 border border-amber-100">
            <p className="font-bold text-amber-700 mb-1">Beyond 10%</p>
            <p>Charged separately as per manpower costing (T&M or agreed rates).</p>
          </div>
          <p className="text-slate-500 pt-1"><strong>Example:</strong> Base ₹50L → 10% buffer ₹5L (covered). If change needs ₹8L: ₹5L covered, ₹3L charged separately.</p>
        </div>
      </div>
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3">
      <span className="text-blue-600 font-bold text-xs">MONTHLY REFRESH:</span>
      <span className="text-xs text-slate-700">Every month — review progress, update plan for next delivery milestone, add/modify modules based on learnings. Scope changes tracked against the 10% buffer.</span>
    </div>
  </ExecSlideLayout>
);

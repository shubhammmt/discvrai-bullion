import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecCostSummarySlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 6.1 — Cost Consolidation</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      One-time totals — module-based
    </h2>

    <div className="grid grid-cols-2 gap-6 mb-6">
      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-blue-800 text-sm mb-2">Track A — Pre-Sales</p>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between"><span>Phase 1A (core, non-payment)</span><span className="font-bold">₹15–20L</span></div>
            <div className="flex justify-between"><span>Center Enablement (Lead Card)</span><span className="font-bold">₹12–15L</span></div>
            <div className="flex justify-between border-t border-blue-200 pt-1.5 mt-1.5"><span className="font-semibold">Track A core total</span><span className="font-bold text-blue-700">₹27–35L</span></div>
            <div className="flex justify-between text-slate-500"><span>Optional: Phase 1B payment</span><span className="font-semibold">+ ₹8–12L</span></div>
          </div>
        </div>

        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="font-bold text-emerald-800 text-sm mb-2">Track B — Post-Sales</p>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between"><span>Stage 2A (Onboarding)</span><span className="font-bold">₹12–19L</span></div>
            <div className="flex justify-between"><span>Stage 2B (Retention/Fees/Query)</span><span className="font-bold">₹6–10L</span></div>
            <div className="flex justify-between"><span>Train the trainer</span><span className="font-bold">₹2–4L</span></div>
            <div className="flex justify-between border-t border-emerald-200 pt-1.5 mt-1.5"><span className="font-semibold">Track B base total</span><span className="font-bold text-emerald-700">₹20–33L</span></div>
            <div className="flex justify-between text-slate-500"><span>Later: Stage 3 (predictive + reco)</span><span className="font-semibold">+ ₹9–15L</span></div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="font-bold text-slate-800 text-sm mb-2">Aptech Connect Add-ons</p>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between"><span>C. Portfolio + Certification Clarity</span><span className="font-bold">₹4–7L</span></div>
            <div className="flex justify-between"><span>D. Placement + Employability</span><span className="font-bold">₹6–10L</span></div>
            <div className="flex justify-between"><span>A++. Deep Academic Workflow</span><span className="font-bold">₹4–8L</span></div>
            <div className="flex justify-between border-t border-slate-200 pt-1.5 mt-1.5"><span className="font-semibold">Total add-ons</span><span className="font-bold">₹14–25L</span></div>
          </div>
        </div>

        {/* Bundle summary */}
        <div className="bg-slate-900 rounded-xl p-4 text-white">
          <p className="font-bold text-sm mb-3">Consolidated Guidance Totals</p>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between border-b border-slate-700 pb-1.5">
              <span className="text-slate-300">Track A core + Track B base + Trainer</span>
              <span className="font-bold text-blue-400">₹47–68L</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-1.5">
              <span className="text-slate-300">+ Payment (Phase 1B)</span>
              <span className="font-bold">+ ₹8–12L</span>
            </div>
            <div className="flex justify-between border-b border-slate-700 pb-1.5">
              <span className="text-slate-300">+ Stage 3 (reco + predictive)</span>
              <span className="font-bold">+ ₹9–15L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-300">+ All Connect add-ons (C+D+A++)</span>
              <span className="font-bold">+ ₹14–25L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ExecSlideLayout>
);

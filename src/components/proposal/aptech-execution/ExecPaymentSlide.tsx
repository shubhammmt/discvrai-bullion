import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecPaymentSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 6.2 + 6.4 + 6.5 + 6.6</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      Payment terms, recurring costs, and parallel impact
    </h2>

    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Final proposal */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-3">Final Proposal (for slides / commercial)</p>
        <div className="overflow-hidden rounded-lg border border-blue-200">
          <table className="w-full text-sm">
            <thead><tr className="bg-blue-100"><th className="text-left px-3 py-2 font-bold text-blue-800">Track</th><th className="text-right px-3 py-2 font-bold text-blue-800">Total (₹L)</th><th className="text-right px-3 py-2 font-bold text-blue-800">Duration</th></tr></thead>
            <tbody>
              <tr className="border-t border-blue-200 bg-white"><td className="px-3 py-2 font-semibold text-slate-800">Track A — Pre-sales</td><td className="px-3 py-2 text-right font-bold text-blue-700">45</td><td className="px-3 py-2 text-right text-slate-600">12–24 weeks</td></tr>
              <tr className="border-t border-blue-200 bg-white"><td className="px-3 py-2 font-semibold text-slate-800">Track B — Post-sales</td><td className="px-3 py-2 text-right font-bold text-emerald-700">93.5</td><td className="px-3 py-2 text-right text-slate-600">24–36 weeks</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-2 italic">Above excludes: 4-week scoping (in engagement start), cloud, LLM, voice, telephony, WhatsApp, travel.</p>
      </div>

      {/* Payment terms */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">Payment Terms</p>
        <div className="space-y-2">
          {[
            { pct: '30%', label: 'At start of scoping' },
            { pct: '20%', label: 'On scoping completion' },
            { pct: '20%', label: 'On Milestone 1' },
            { pct: '20%', label: 'On Milestone 2' },
            { pct: '10%', label: 'On development completion' },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 bg-white rounded-lg p-2.5 border border-slate-100">
              <span className="w-12 h-8 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-sm">{t.pct}</span>
              <span className="text-sm text-slate-700">{t.label}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">Applicable per track unless otherwise agreed.</p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Recurring Costs</p>
        <div className="space-y-1.5 text-xs text-slate-700">
          <div className="flex items-start gap-2"><span className="text-slate-400">•</span><span><strong>AMC / support:</strong> As per commercial agreement</span></div>
          <div className="flex items-start gap-2"><span className="text-slate-400">•</span><span><strong>Client-borne:</strong> Cloud, LLM (including voice), telephony, WhatsApp/voice usage</span></div>
        </div>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Parallel Execution Impact on Cost</p>
        <div className="space-y-1.5 text-xs text-slate-700">
          <div className="flex items-start gap-2"><span className="text-blue-500">•</span><span><strong>Fixed-price / module pricing:</strong> Total one-time cost largely unchanged; parallelisation changes staffing and calendar time</span></div>
          <div className="flex items-start gap-2"><span className="text-amber-500">•</span><span><strong>Time & material:</strong> Parallelisation increases peak manpower and can increase total cost if scope expands; otherwise primarily reduces calendar time</span></div>
        </div>
      </div>
    </div>
  </ExecSlideLayout>
);

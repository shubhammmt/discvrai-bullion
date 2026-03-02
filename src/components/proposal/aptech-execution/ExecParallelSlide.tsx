import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecParallelSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 4 — Parallel vs Sequential</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      What can run together and what cannot
    </h2>

    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Can run in parallel */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3">✅ Can Run in Parallel (Recommended)</p>
        <p className="text-sm text-slate-700 mb-3">Track A and Track B can run in parallel as long as shared foundations start in <strong>Week 1–2</strong>:</p>
        <div className="space-y-2">
          {[
            'WhatsApp adapter + embedded chat UI shell',
            'Identity model (Lead ID → Student ID)',
            'Event ingestion base (Aptrack sessions/attendance + fees schedule)',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-2 bg-white rounded-lg p-2.5 border border-emerald-100">
              <span className="text-emerald-600 font-bold text-sm">✓</span>
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Must be sequential */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-5">
        <p className="text-xs font-bold uppercase tracking-wider text-red-700 mb-3">⛔ Must Be Sequential (True Dependencies)</p>
        <div className="space-y-3">
          {[
            { title: 'Churn probability model (ML)', reason: 'Needs months of data (Stage 3). Before that: ship rules-based churn probability + engagement score.' },
            { title: 'Deep academic workflow (A++)', reason: 'Only after LMS/Aptrack module-state APIs are confirmed.' },
            { title: 'Portfolio/cert + placement add-ons', reason: 'Parallel only after their data sources and workflow ownership are clear.' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-lg p-3 border border-red-100">
              <p className="font-semibold text-slate-800 text-sm">{item.title}</p>
              <p className="text-xs text-slate-600 mt-1">{item.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-slate-900 rounded-xl p-4 flex items-center gap-4">
      <span className="text-blue-400 font-bold text-sm">Key Insight:</span>
      <span className="text-white text-sm">Parallel execution is the recommended path — it reduces calendar time without inflating total one-time cost (module pricing stays the same).</span>
    </div>
  </ExecSlideLayout>
);

import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecPurposeSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Program Structure</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      Two tracks, run in parallel — one unified program
    </h2>

    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* Track A */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">A</span>
          <div>
            <p className="font-bold text-slate-900">Track A — Pre-Sales</p>
            <p className="text-xs text-slate-500">Discovery → Engagement → Transaction</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 mb-3">
          Improve conversion + attribution + counsellor effectiveness <strong>up to enrollment</strong>.
        </p>
        <div className="space-y-1.5">
          {['AI Career Counsellor (qualification + scoring)', 'Lead ID + attribution binding', 'Enrichment (voice + WhatsApp warming)', 'Center Enablement — Smart Lead Card', 'Payment-enabled enrollment (optional)'].map((m, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
              <span className="text-xs text-slate-600">{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Track B */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">B</span>
          <div>
            <p className="font-bold text-slate-900">Track B — Post-Sales</p>
            <p className="text-xs text-slate-500">Day 1 → Completion</p>
          </div>
        </div>
        <p className="text-sm text-slate-700 mb-3">
          Standardised onboarding + engagement loops, doubt resolution, fees discipline, retention/risk workflows, and later recommendations/predictive.
        </p>
        <div className="space-y-1.5">
          {['Onboarding + trigger framework (Day 0–90)', 'Doubt resolution / Query agent', 'Fees collection agent', 'Retention scoring + risk workflow', 'Dashboards (I4, I5, I6)', 'Post-course recommendations (A9)', 'Train the trainer'].map((m, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
              <span className="text-xs text-slate-600">{m}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="bg-slate-900 rounded-xl p-4 flex items-center gap-4">
      <span className="text-amber-400 font-bold text-sm">Client Expectation:</span>
      <span className="text-white text-sm">Run both tracks in parallel — shared foundation enables this from Week 1.</span>
    </div>
  </ExecSlideLayout>
);

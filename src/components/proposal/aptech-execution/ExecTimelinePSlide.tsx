import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const rows = [
  { window: 'Weeks 1–4', label: 'Phase 0: Scoping', trackA: 'Detailed module scoping, API discovery, integration contracts', trackB: 'Detailed module scoping, API discovery, integration contracts', shared: 'Scoping complete; detailed plan for first delivery' },
  { window: 'Weeks 5–12', label: 'Build Phase 1', trackA: 'Architecture + Lead ID + Qualification + WA sequences + Enrichment start', trackB: 'Architecture + event model + Agentic UI + induction + trigger v1 + surveys start', shared: 'WhatsApp + chat shell; identity + event store; pilot-ready thread + basic dashboards' },
  { window: 'Weeks 12–16', label: 'First Delivery', trackA: 'Lead Card v1; qualification + enrichment live', trackB: 'Triggers + engagement score v1; I4 onboarding queue', shared: 'First deployable pilot / first value' },
  { window: 'Weeks 17–20', label: 'Build Phase 2', trackA: 'Lead Card v2 + attribution; optional payment', trackB: 'Fees + query agent + I5; I6 risk view + churn (rules)', shared: 'Operational post-sales workflows live' },
  { window: 'Weeks 21–24', label: 'Stabilize + Rollout', trackA: 'Stabilize + scale rollout', trackB: 'Stabilize + scale rollout; Train the trainer', shared: 'Full 2A+2B base complete + rollout' },
];

export const ExecTimelinePSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 5 — Timeline</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-1 max-w-3xl">
      Option P: Parallel pods — recommended
    </h2>
    <p className="text-sm text-slate-500 mb-4">Both tracks in parallel. First delivery in 12–16 weeks. Full 2A+2B in 20–24 weeks from kick-off.</p>

    <div className="overflow-hidden rounded-xl border border-slate-200 mb-5">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '14%' }}>Window</th>
            <th className="text-left px-3 py-2.5 font-bold text-blue-600 uppercase tracking-wider" style={{ width: '28%' }}>Track A (Pre-Sales)</th>
            <th className="text-left px-3 py-2.5 font-bold text-emerald-600 uppercase tracking-wider" style={{ width: '28%' }}>Track B (Post-Sales)</th>
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '30%' }}>Shared Output</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-t border-slate-100 ${i === 2 ? 'bg-emerald-50' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              <td className="px-3 py-2.5">
                <p className="font-bold text-slate-800">{r.window}</p>
                <p className="text-slate-500 text-[10px]">{r.label}</p>
              </td>
              <td className="px-3 py-2.5 text-slate-700">{r.trackA}</td>
              <td className="px-3 py-2.5 text-slate-700">{r.trackB}</td>
              <td className="px-3 py-2.5 text-slate-600 font-medium">{r.shared}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
        <p className="text-xs font-bold text-slate-600 mb-1">Option S — Sequential (single pod)</p>
        <p className="text-xs text-slate-500">~32–40 weeks total. Lower peak manpower but misses client intent to run in parallel.</p>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
        <p className="text-xs font-bold text-slate-600 mb-1">Option A — Aggressive parallel</p>
        <p className="text-xs text-slate-500">~20–22 weeks possible for 2A+2B if we add 2–3 engineers. Cost increases; risk increases.</p>
      </div>
    </div>
  </ExecSlideLayout>
);

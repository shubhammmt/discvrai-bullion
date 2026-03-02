import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const costRows = [
  { scope: 'Track A — Pre-sales (core)', low: '27', high: '35', notes: 'Phase 1A + Center Enablement (Lead Card)', highlight: false },
  { scope: 'Track A — Payment (optional)', low: '8', high: '12', notes: 'Phase 1B', highlight: false },
  { scope: 'Track B — Post-sales base (2A+2B)', low: '18', high: '29', notes: 'Onboarding, triggers, query, fees, retention, dashboards', highlight: false },
  { scope: 'Track B — Train the trainer', low: '2', high: '4', notes: 'Session-prep agent + feedback; kept simple', highlight: false },
  { scope: 'Track B — Stage 3 (later)', low: '9', high: '15', notes: 'Recommendations, predictive, Lost Customer', highlight: false },
  { scope: 'Aptech Connect add-ons (C, D, A++)', low: '14', high: '25', notes: 'Portfolio/cert, placement, deep academic', highlight: false },
  { scope: '', low: '', high: '', notes: '', highlight: false, divider: true },
  { scope: 'Base program (A core + B base + Trainer)', low: '47', high: '68', notes: 'Both tracks, first deployment', highlight: true },
  { scope: 'With payment', low: '55', high: '80', notes: '+ Phase 1B', highlight: false },
  { scope: 'With Stage 3', low: '64', high: '95', notes: '+ Stage 3', highlight: false },
  { scope: 'Full scope (all add-ons)', low: '78', high: '120', notes: 'Payment + Stage 3 + Connect C,D,A++', highlight: true },
];

export const ExecCostTableSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 6.3 — Complete Cost Summary</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-1 max-w-3xl">
      Complete cost summary — both tracks
    </h2>
    <p className="text-xs text-slate-500 mb-4">All figures in ₹ Lacs, indicative and subject to negotiation. Refined after 4-week scoping.</p>

    <div className="overflow-hidden rounded-xl border border-slate-200 mb-5">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '35%' }}>Scope</th>
            <th className="text-right px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '10%' }}>Low (₹L)</th>
            <th className="text-right px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '10%' }}>High (₹L)</th>
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '40%' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {costRows.map((r, i) => {
            if ((r as any).divider) return <tr key={i}><td colSpan={4} className="border-t-2 border-slate-300" /></tr>;
            return (
              <tr key={i} className={`border-t border-slate-100 ${r.highlight ? 'bg-blue-50 font-semibold' : i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <td className={`px-3 py-2 ${r.highlight ? 'text-blue-800 font-bold' : 'text-slate-800 font-semibold'}`}>{r.scope}</td>
                <td className={`px-3 py-2 text-right ${r.highlight ? 'text-blue-700 font-bold' : 'text-slate-700 font-bold'}`}>{r.low}</td>
                <td className={`px-3 py-2 text-right ${r.highlight ? 'text-blue-700 font-bold' : 'text-slate-700 font-bold'}`}>{r.high}</td>
                <td className="px-3 py-2 text-slate-500">{r.notes}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
        <p className="text-xs font-bold text-amber-700 mb-1">Excluded (Client-Borne)</p>
        <p className="text-xs text-slate-600">Cloud hosting, LLM usage (text + voice), voice telephony infra, WhatsApp/voice usage. Integration support for our adapters is in scope; 3P changes quoted separately.</p>
      </div>
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
        <p className="text-xs font-bold text-slate-700 mb-1">Travel & Team Expenses</p>
        <p className="text-xs text-slate-600">All travel and related expenses (workshops, client visits, onboarding) billed to client as per actuals or agreed travel policy.</p>
      </div>
    </div>
  </ExecSlideLayout>
);

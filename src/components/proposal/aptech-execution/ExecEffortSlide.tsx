import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const efforts = [
  { module: 'AI Career Counsellor (web+WA)', roles: 'AI(2), BE(2), FE(1), QA(1)', pw: '10–14', notes: 'Multi-channel routing + KB' },
  { module: 'Lead ID + attribution', roles: 'BE(2), Data(1), QA(1)', pw: '6–10', notes: 'Depends on AptTrack API maturity' },
  { module: 'Enrichment (voice+WA)', roles: 'BE(2), AI(1), QA(1)', pw: '6–10', notes: 'Telephony + WA orchestration' },
  { module: 'Center Enablement (Lead Card)', roles: 'FE(2), BE(1), QA(1), Design(0.5)', pw: '8–12', notes: 'Start as responsive web' },
  { module: 'Payment flow (optional)', roles: 'BE(1), FE(1), QA(1)', pw: '4–8', notes: 'Security + receipts' },
  { module: 'Trigger engine + config', roles: 'BE(3), Data(1), QA(1)', pw: '8–12', notes: 'Foundation for post-sales' },
  { module: 'Onboarding flows (Day 0–90)', roles: 'AI(2), BE(1), QA(1), Content(1)', pw: '8–12', notes: 'Induction + milestones + surveys' },
  { module: 'Query/doubt resolution agent', roles: 'AI(2), BE(1), QA(1), Content(1)', pw: '6–10', notes: 'FAQ + escalation (Connect B)' },
  { module: 'Fees agent + fee dashboard', roles: 'BE(2), FE(1), QA(1)', pw: '6–10', notes: 'Needs fee schedule/status' },
  { module: 'Engagement score + churn (rules)', roles: 'Data(2), BE(1), QA(1)', pw: '6–10', notes: 'Predictive ML later (Stage 3)' },
  { module: 'Dashboards (I4/I5/I6)', roles: 'FE(2), BE(1), Data(1), QA(1)', pw: '8–12', notes: 'Action queues + metrics' },
  { module: 'A9 Recommendations (rules)', roles: 'AI(1), BE(1), FE(0.5), QA(0.5)', pw: '4–8', notes: 'Ship rules-first before ML' },
  { module: 'Add-on C (portfolio/cert)', roles: 'BE(1), AI(1), FE(1), QA(1)', pw: '6–10', notes: 'Requires portfolio/cert data' },
  { module: 'Add-on D (placement/resume)', roles: 'BE(1), AI(1), FE(1), QA(1), Content(1)', pw: '8–14', notes: 'Depends on placement workflow' },
  { module: 'Train the trainer', roles: 'AI(1), Content(0.5), QA(0.5)', pw: '2–5', notes: 'Session-prep + feedback; kept simple' },
];

export const ExecEffortSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 3.2 — Effort by Module</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">
      Manpower by module — effort ranges (person-weeks)
    </h2>
    <p className="text-xs text-slate-500 mb-3">Effort shown as person-weeks (PW). Refined after API confirmation in 4-week scoping.</p>

    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left px-3 py-2 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '25%' }}>Module</th>
            <th className="text-left px-3 py-2 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '25%' }}>Roles</th>
            <th className="text-center px-3 py-2 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '10%' }}>PW</th>
            <th className="text-left px-3 py-2 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '30%' }}>Notes</th>
          </tr>
        </thead>
        <tbody>
          {efforts.map((e, i) => (
            <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              <td className="px-3 py-1.5 font-semibold text-slate-800">{e.module}</td>
              <td className="px-3 py-1.5 text-slate-600 font-mono">{e.roles}</td>
              <td className="px-3 py-1.5 text-center font-bold text-blue-700">{e.pw}</td>
              <td className="px-3 py-1.5 text-slate-500">{e.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </ExecSlideLayout>
);

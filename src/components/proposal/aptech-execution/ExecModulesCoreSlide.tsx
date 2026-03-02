import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const modules = [
  { module: 'AI Career Counsellor (qualification + scoring)', track: 'A', enables: 'Qualification, intent scoring, course fitment', interfaces: 'Web chat, WhatsApp, optional voice', dependency: 'KB + Lead ID', cost: 'Phase 1A (incl.)' },
  { module: 'Lead ID + attribution binding', track: 'A', enables: 'Immutable attribution, dispute resolution, ROI measurement', interfaces: 'HQ dashboard, counsellor lead card', dependency: 'AptTrack/Aptrack', cost: '5–8' },
  { module: 'Enrichment (voice + WhatsApp warming)', track: 'A', enables: '15–30 min response, visit scheduling, objections', interfaces: 'WhatsApp, voice', dependency: 'Telephony + WA adapter', cost: 'Phase 1A (incl.)' },
  { module: 'Center Enablement — Smart Lead Card', track: 'A', enables: 'Counsellor context + playbooks + scripts', interfaces: 'Web app (responsive)', dependency: 'Lead ID + transcript', cost: '12–15' },
  { module: 'Payment-enabled enrollment (optional)', track: 'A', enables: 'Online payment/enrollment, receipts', interfaces: 'Web payment flow', dependency: 'Payment gateway', cost: '8–12' },
  { module: 'Onboarding + trigger framework (Day 0–90)', track: 'B', enables: 'Induction, session touchpoints, triggers, surveys', interfaces: 'Chat/WhatsApp + dashboards', dependency: 'Aptrack 2.0 events', cost: '12–19' },
  { module: 'Doubt resolution / Query agent (A7)', track: 'B', enables: 'Real-time student support + escalation', interfaces: 'Chat/WhatsApp', dependency: 'KB + ticket routing', cost: '2–3' },
  { module: 'Fees collection agent (A6)', track: 'B', enables: 'Due reminders, overdue escalations, handoff', interfaces: 'WhatsApp/chat + dashboard', dependency: 'Fees schedule', cost: '2–4' },
  { module: 'Retention scoring + risk workflow', track: 'B', enables: 'Engagement score + churn probability', interfaces: 'I4/I6 dashboards', dependency: 'Event store + scoring', cost: '2–3' },
  { module: 'Dashboards (I4, I5, I6)', track: 'B', enables: 'Metrics + action queues + leadership visibility', interfaces: 'Web dashboards', dependency: 'Shared analytics', cost: 'Inside 2A/2B' },
  { module: 'Post-course recommendations (A9)', track: 'B', enables: '"What next" in same interface; upgrade-ready', interfaces: 'Chat/WhatsApp', dependency: 'Catalogue + completion', cost: '3–5 (Stage 3)' },
  { module: 'Train the trainer', track: 'B', enables: 'Session-prep agent + feedback capture', interfaces: 'Chat/WhatsApp or web', dependency: 'KB', cost: '2–4' },
];

export const ExecModulesCoreSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 2.1 — Consolidated Module Inventory</p>
    <h2 className="text-2xl font-bold text-slate-900 leading-tight mb-4 max-w-3xl">
      Core modules — base program
    </h2>

    <div className="overflow-hidden rounded-xl border border-slate-200">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-100">
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '22%' }}>Module</th>
            <th className="text-center px-2 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '5%' }}>Track</th>
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '22%' }}>What It Enables</th>
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '18%' }}>Output Interfaces</th>
            <th className="text-left px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '16%' }}>Key Dependency</th>
            <th className="text-right px-3 py-2.5 font-bold text-slate-600 uppercase tracking-wider" style={{ width: '10%' }}>Cost (₹L)</th>
          </tr>
        </thead>
        <tbody>
          {modules.map((m, i) => (
            <tr key={i} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
              <td className="px-3 py-2 font-semibold text-slate-800">{m.module}</td>
              <td className="px-2 py-2 text-center">
                <span className={`inline-flex w-5 h-5 rounded text-white text-[10px] font-bold items-center justify-center ${m.track === 'A' ? 'bg-blue-600' : 'bg-emerald-600'}`}>{m.track}</span>
              </td>
              <td className="px-3 py-2 text-slate-600">{m.enables}</td>
              <td className="px-3 py-2 text-slate-600">{m.interfaces}</td>
              <td className="px-3 py-2 text-slate-500">{m.dependency}</td>
              <td className="px-3 py-2 text-right font-semibold text-slate-700">{m.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </ExecSlideLayout>
);

import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const scopeItems = [
  { title: 'Onboarding & Trigger Framework (Day 0–90)', desc: 'Induction, session touchpoints, absence/faculty triggers, surveys', channels: 'Chat/WhatsApp + dashboards' },
  { title: 'Doubt Resolution / Query Agent', desc: 'Real-time student support in one thread + escalation', channels: 'Chat/WhatsApp' },
  { title: 'Fees Collection Agent', desc: 'Due reminders, overdue escalations, counsellor handoff', channels: 'WhatsApp/chat + dashboard' },
  { title: 'Retention Scoring & Risk Workflow', desc: 'Engagement score, churn probability, actionables', channels: 'I4/I6 dashboard' },
  { title: 'Dashboards — I4, I5, I6', desc: 'Metrics, action queues, leadership visibility', channels: 'Web dashboards' },
  { title: 'Train the Trainer', desc: 'Simple agentic solution for session prep + feedback capture', channels: 'Chat/WhatsApp or web' },
  { title: 'Post-Course Recommendations (Later — Stage 3)', desc: '"What next" in same interface; upgrade-ready', channels: 'Chat/WhatsApp' },
];

export const ExecTrackBSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-emerald-600 mb-2">Track B</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-1 max-w-3xl">
      Post-Sales — Day 1 → Completion
    </h2>
    <p className="text-sm text-slate-500 mb-5">Scope &amp; Cost</p>

    <div className="mb-5">
      <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">What We Build</p>
      <div className="space-y-2.5">
        {scopeItems.map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-emerald-50/60 border border-emerald-100 rounded-xl px-5 py-3">
            <span className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-slate-900 text-sm">{item.title}</p>
              <p className="text-xs text-slate-600 mt-0.5">{item.desc}</p>
            </div>
            <span className="text-xs text-emerald-700 bg-emerald-100 rounded-full px-2.5 py-1 font-medium flex-shrink-0 mt-0.5">{item.channels}</span>
          </div>
        ))}
      </div>
      <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-xl px-5 py-3">
        <p className="text-xs text-slate-600">
          <strong>Integration support</strong> with Aptech/vendor systems (Aptrack, ProConnect, CRM, etc.) for our product integrations is included.
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-6">
      <div className="bg-emerald-600 rounded-xl p-5 text-white">
        <p className="text-xs uppercase tracking-wider text-emerald-200 font-bold mb-1">Total Cost</p>
        <p className="text-3xl font-bold">₹93.5 Lakhs</p>
        <p className="text-sm text-emerald-200 mt-1">Fixed for this proposal</p>
      </div>
      <div className="bg-slate-900 rounded-xl p-5 text-white">
        <p className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">Duration</p>
        <p className="text-3xl font-bold">24–36 weeks</p>
        <p className="text-sm text-slate-400 mt-1">Post scoping (excluding 4-week scoping)</p>
      </div>
    </div>
  </ExecSlideLayout>
);

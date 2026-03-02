import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecGovernanceSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 8 — Ongoing Governance</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      Governance, monthly refresh, and KPI tracking
    </h2>

    <div className="grid grid-cols-2 gap-5">
      {[
        {
          icon: '📅', title: 'Weekly Steering', desc: 'Progress review, blockers, decisions. Joint call between DiscvrAI PM and Aptech stakeholders.',
          color: 'blue'
        },
        {
          icon: '🔄', title: 'Monthly Plan Refresh', desc: 'Update plan for next delivery milestone. Add/modify modules based on learnings or new requirements.',
          color: 'blue'
        },
        {
          icon: '📊', title: 'KPI Review (Once Live)', desc: 'Engagement, churn, fees collection, query resolution — measured and reviewed against agreed baselines.',
          color: 'emerald'
        },
        {
          icon: '📈', title: 'Data Readiness for Stage 3', desc: 'Track what\'s needed for predictive models (min ~9 months from go-live). Plan data collection from Day 1.',
          color: 'emerald'
        },
      ].map((item, i) => (
        <div key={i} className={`bg-${item.color === 'blue' ? 'blue' : 'emerald'}-50 border border-${item.color === 'blue' ? 'blue' : 'emerald'}-200 rounded-xl p-5`}>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{item.icon}</span>
            <p className="font-bold text-slate-900">{item.title}</p>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>

    <div className="mt-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">Scope Change Control (10% Buffer)</p>
      <div className="grid grid-cols-3 gap-4 text-xs text-slate-700">
        <div><strong>Within 10%:</strong> Accommodated within agreed pricing. No additional charge.</div>
        <div><strong>Beyond 10%:</strong> Charged separately as per manpower costing (T&M or agreed rates).</div>
        <div><strong>Monthly tracking:</strong> Scope changes are tracked and applied against the buffer or charged separately.</div>
      </div>
    </div>
  </ExecSlideLayout>
);

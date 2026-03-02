import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecDeliverablesSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 7 — Scoping Phase Deliverables</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      What the 4-week scoping phase delivers
    </h2>

    <div className="grid grid-cols-2 gap-4">
      {[
        { icon: '📋', title: 'Complete Detailed Plan', desc: 'For first delivery (first pilot / first value milestone). Module-by-module breakdown with dates.' },
        { icon: '✅', title: 'Acceptance Criteria', desc: 'Per module acceptance criteria + demo-ready definition. Clear pass/fail for each deliverable.' },
        { icon: '🔌', title: 'Integration Contracts', desc: 'Aptrack/ProConnect events/APIs required, with full specs. Event schemas and data contracts.' },
        { icon: '💰', title: 'Refined Cost & Timeline', desc: 'Module-level costs with higher confidence. From "broader estimation" to detailed SOW.' },
        { icon: '🎯', title: 'Pilot Plan', desc: 'Brands, centers, volumes, and success criteria. Clear scope for first deployment.' },
        { icon: '🏗️', title: 'Technical Architecture', desc: 'System design, data flows, security. How all components connect and communicate.' },
        { icon: '📝', title: 'Prerequisites Checklist', desc: 'What Aptech needs to provide: API access, test data, credentials, environments, etc.' },
      ].map((item, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">{item.icon}</span>
          <div>
            <p className="font-bold text-slate-900 text-sm">{item.title}</p>
            <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
      <span className="text-emerald-600 font-bold text-sm">🎯</span>
      <span className="text-sm text-slate-700">After scoping, both Aptech and DiscvrAI have a <strong>shared, unambiguous view</strong> of what gets built, when, and at what cost — before committing to full build.</span>
    </div>
  </ExecSlideLayout>
);

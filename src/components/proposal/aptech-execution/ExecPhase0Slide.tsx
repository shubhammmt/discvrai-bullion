import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

export const ExecPhase0Slide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Engagement Model</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-1 max-w-3xl">
      Phase 0: 4-week scoping and discovery
    </h2>
    <p className="text-sm text-slate-500 mb-5">Before any detailed build plan — we scope, discover, and align.</p>

    <div className="grid grid-cols-2 gap-5 mb-5">
      <div className="space-y-3">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">📋 Detailed Module Scoping</p>
          <ul className="space-y-1">
            {['Module-by-module deep-dive (per Section 2 inventory)', 'Acceptance criteria per module', 'Interface mockups/wireframes (chat, dashboards, Lead Card)', 'Integration contract definition (Aptrack/ProConnect APIs, events, data schema)'].map((t, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><span className="text-blue-500 mt-0.5">•</span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">🔌 Internal Data & Product Connects</p>
          <ul className="space-y-1">
            {['Access to Aptrack 2.0 / ProConnect 1.0 for API docs + test envs', 'Sample data (anonymized) for testing and validation', 'Understand current systems, data flows, constraints', 'Identify prerequisites (API stability, data availability, credentials)'].map((t, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><span className="text-slate-400 mt-0.5">•</span>{t}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">🏗️ Infrastructure & Technical Prerequisites</p>
          <ul className="space-y-1">
            {['Hosting/infra requirements confirmation', 'WhatsApp Business API setup and approval', 'Voice telephony provider selection and setup', 'Security and compliance requirements (if any)'].map((t, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><span className="text-slate-400 mt-0.5">•</span>{t}</li>
            ))}
          </ul>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <p className="font-bold text-slate-900 text-sm mb-2">✅ Output After 4 Weeks</p>
          <ul className="space-y-1">
            {['Complete detailed plan for first delivery', 'Refined cost and timeline (module-level, with confidence)', 'Integration contracts (API specs, event schemas)', 'Pilot plan (brands, centers, volumes, success criteria)', 'Technical architecture document'].map((t, i) => (
              <li key={i} className="text-xs text-slate-600 flex items-start gap-1.5"><span className="text-emerald-500 mt-0.5">✓</span>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-3">
      <span className="text-amber-600 font-bold text-xs">NOTE:</span>
      <span className="text-xs text-slate-700">Current costs/timelines are <strong>broader estimations</strong>. After this 4-week scoping phase, we share refined module-level costs with higher confidence.</span>
    </div>
  </ExecSlideLayout>
);

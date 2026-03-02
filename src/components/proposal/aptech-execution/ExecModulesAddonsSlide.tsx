import React from 'react';
import { ExecSlideLayout } from './ExecSlideLayout';

interface Props { slideNumber: number; totalSlides: number; }

const addons = [
  { addon: 'C. Portfolio + Certification Clarity', why: 'Feedback loop after submissions + certification status + "how to obtain"', build: 'Chat/profile + optional widgets', cost: '4–7', dependency: 'Portfolio/cert data source (ProConnect/LMS)' },
  { addon: 'D. Placement + Employability', why: 'Readiness checklist, basic resume builder, interview Q&A, job-attempt feedback', build: 'Chat/WhatsApp + optional list', cost: '6–10', dependency: 'Placement workflow ownership + data' },
  { addon: 'A++. Deep Academic Workflow', why: 'Module sequencing/completion state beyond attendance (if we own workflow layer)', build: 'Dashboards + chat summaries', cost: '4–8', dependency: 'LMS/Aptrack module APIs' },
];

export const ExecModulesAddonsSlide: React.FC<Props> = ({ slideNumber, totalSlides }) => (
  <ExecSlideLayout slideNumber={slideNumber} totalSlides={totalSlides}>
    <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">Section 2.2 — Aptech Connect Add-ons</p>
    <h2 className="text-3xl font-bold text-slate-900 leading-tight mb-6 max-w-3xl">
      Aptech Connect add-ons — explicitly scoped & billable
    </h2>

    <div className="space-y-4 mb-8">
      {addons.map((a, i) => (
        <div key={i} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-bold text-slate-900">{a.addon}</p>
              <p className="text-sm text-slate-600 mt-1">{a.why}</p>
            </div>
            <span className="bg-blue-100 text-blue-700 font-bold text-sm px-3 py-1 rounded-lg flex-shrink-0 ml-4">₹{a.cost}L</span>
          </div>
          <div className="flex items-center gap-6 text-xs">
            <span className="text-slate-500"><strong className="text-slate-700">Output:</strong> {a.build}</span>
            <span className="text-slate-500"><strong className="text-slate-700">Dependency:</strong> {a.dependency}</span>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">Note on Add-ons</p>
      <p className="text-sm text-slate-700">
        Add-ons can run in parallel with base modules <strong>only after</strong> their data sources and workflow ownership are clearly defined.
        Priority and sequencing should be discussed in the scoping phase.
      </p>
    </div>
  </ExecSlideLayout>
);

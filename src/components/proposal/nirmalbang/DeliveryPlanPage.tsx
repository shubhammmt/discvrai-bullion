import React from 'react';
import { Calendar, CheckCircle2, Clock } from 'lucide-react';

export const DeliveryPlanPage: React.FC = () => {
  const phases = [
    {
      phase: '0',
      title: 'Discovery & Scope Freeze',
      duration: '1–2 weeks',
      color: 'slate',
      items: [
        'Role definition and requirements gathering',
        'Hiring volume confirmation',
        'Interview design and question framework',
        'Final scope lock and sign-off',
      ],
    },
    {
      phase: '1',
      title: 'Core Hiring & Pre-Screening',
      duration: '4–5 weeks',
      color: 'blue',
      items: [
        'JD parsing and role setup module',
        'Candidate sourcing (limited platforms)',
        'Resume normalization engine',
        'AI pre-screening & scoring system',
        'Recruiter dashboard development',
      ],
    },
    {
      phase: '2',
      title: 'AI Interview System',
      duration: '4–5 weeks',
      color: 'indigo',
      items: [
        'Interview scheduling system',
        'Google Meet AI interviewer (audio-only)',
        'Interview transcript generation',
        'Evaluation & scoring engine',
      ],
    },
    {
      phase: '3',
      title: 'Intelligence & Go-Live',
      duration: '2–3 weeks',
      color: 'green',
      items: [
        'Explainability views for decisions',
        'Hiring manager dashboard',
        'Security & compliance checks',
        'Production rollout & training',
      ],
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 5</div>
        <h1 className="text-2xl font-bold text-slate-800">Delivery Plan & Timeline</h1>
        <p className="text-slate-500 text-sm mt-1">12–16 weeks end-to-end delivery</p>
      </div>

      <div className="px-10 py-8">
        {/* Timeline Overview */}
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Calendar className="w-6 h-6 text-blue-600" />
              <div>
                <div className="font-semibold text-slate-800">Total Delivery Timeline</div>
                <div className="text-slate-600 text-sm">From kickoff to production</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">12–15</div>
              <div className="text-slate-600 text-sm">Weeks</div>
            </div>
          </div>
        </div>

        {/* Phase-wise Breakdown */}
        <div className="space-y-4">
          {phases.map((phase, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className={`bg-${phase.color}-50 px-6 py-4 border-b border-slate-200`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-${phase.color}-200 flex items-center justify-center`}>
                      <span className={`text-${phase.color}-700 font-bold text-sm`}>{phase.phase}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-slate-800">{phase.title}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm font-medium">{phase.duration}</span>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-white">
                <div className="grid grid-cols-2 gap-3">
                  {phase.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex items-start gap-2">
                      <CheckCircle2 className={`w-4 h-4 text-${phase.color}-500 flex-shrink-0 mt-0.5`} />
                      <span className="text-slate-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Timeline */}
        <div className="mt-8">
          <div className="text-sm font-medium text-slate-700 mb-3">Visual Timeline</div>
          <div className="flex gap-2">
            <div className="flex-1">
              <div className="h-3 bg-slate-200 rounded-full" />
              <div className="text-xs text-slate-500 mt-1 text-center">Phase 0</div>
              <div className="text-xs text-slate-400 text-center">1-2 wks</div>
            </div>
            <div className="flex-[2.5]">
              <div className="h-3 bg-blue-400 rounded-full" />
              <div className="text-xs text-slate-500 mt-1 text-center">Phase 1</div>
              <div className="text-xs text-slate-400 text-center">4-5 wks</div>
            </div>
            <div className="flex-[2.5]">
              <div className="h-3 bg-indigo-400 rounded-full" />
              <div className="text-xs text-slate-500 mt-1 text-center">Phase 2</div>
              <div className="text-xs text-slate-400 text-center">4-5 wks</div>
            </div>
            <div className="flex-[1.5]">
              <div className="h-3 bg-green-400 rounded-full" />
              <div className="text-xs text-slate-500 mt-1 text-center">Phase 3</div>
              <div className="text-xs text-slate-400 text-center">2-3 wks</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Delivery Plan — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};

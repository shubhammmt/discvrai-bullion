import React from 'react';
import { FileCheck, HelpCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const NextStepsPage: React.FC = () => {
  const assumptions = [
    'Low hiring volume: 3–5 active roles, 10–30 hires/month',
    'Limited sourcing platforms (2–3 platforms initially)',
    'Audio-based interviews in Phase 1 (video as future upgrade)',
    'English as primary interview language',
    'Standard business hours for AI interview availability',
  ];

  const openQuestions = [
    'Confirmation of hiring volume and seasonal variations',
    'Interview language preferences (Hindi/Regional optional)',
    'Google Workspace / Meet permissions and access',
    'Data retention and privacy policy alignment',
    'Preferred sourcing platforms for integration',
    'Internal stakeholder availability for Phase 0',
  ];

  const nextSteps = [
    { step: '1', title: 'Confirm Scope', desc: 'Align on final requirements and assumptions' },
    { step: '2', title: 'Commercial Sign-off', desc: 'Finalize pricing and payment terms' },
    { step: '3', title: 'Kick off Phase 0', desc: 'Begin discovery and scope freeze' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 8</div>
        <h1 className="text-2xl font-bold text-slate-800">Assumptions, Open Questions & Next Steps</h1>
      </div>

      <div className="px-10 py-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Key Assumptions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <FileCheck className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Key Assumptions</h2>
            </div>
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
              <ul className="space-y-3">
                {assumptions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Open Questions */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Open Questions</h2>
            </div>
            <div className="bg-amber-50 rounded-xl p-5 border border-amber-100">
              <ul className="space-y-3">
                {openQuestions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-amber-700 text-xs font-bold">?</span>
                    </div>
                    <span className="text-slate-600 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <ArrowRight className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Next Steps</h2>
          </div>
          <div className="flex gap-4">
            {nextSteps.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex-1 bg-green-50 rounded-xl p-5 border border-green-100">
                  <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center mb-3">
                    <span className="text-green-700 font-bold">{item.step}</span>
                  </div>
                  <div className="font-semibold text-slate-800 mb-1">{item.title}</div>
                  <div className="text-slate-600 text-sm">{item.desc}</div>
                </div>
                {idx < nextSteps.length - 1 && (
                  <div className="flex items-center">
                    <ArrowRight className="w-6 h-6 text-slate-300" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-lg mb-1">Ready to Get Started?</div>
              <div className="text-blue-100 text-sm">
                Let's schedule a call to finalize scope and begin Phase 0
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-100 text-sm">Prepared by</div>
              <div className="font-semibold">Discvr.ai Team</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Next Steps — NirmalBang AI Recruitment Platform | Confidential
        </div>
      </div>
    </div>
  );
};

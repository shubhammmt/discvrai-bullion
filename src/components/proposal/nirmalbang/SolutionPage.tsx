import React from 'react';
import { ArrowDown, FileText, Search, Brain, Filter, Mic, UserCheck, CheckCircle2 } from 'lucide-react';

export const SolutionPage: React.FC = () => {
  const steps = [
    { icon: FileText, title: 'Job Description', desc: 'JD parsing & role setup', color: 'blue' },
    { icon: Search, title: 'Candidate Sourcing', desc: 'From selected platforms', color: 'indigo' },
    { icon: Brain, title: 'AI Pre-Screening', desc: 'Resume scoring & analysis', color: 'violet' },
    { icon: Filter, title: 'Shortlisting', desc: 'Based on role fit', color: 'purple' },
    { icon: Mic, title: 'AI-Led Interview', desc: 'First-round automation', color: 'fuchsia' },
    { icon: UserCheck, title: 'Human Decision', desc: 'Final interview & hire', color: 'green' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 3</div>
        <h1 className="text-2xl font-bold text-slate-800">Proposed AI Recruitment Solution</h1>
      </div>

      <div className="px-10 py-8">
        {/* Flow Diagram */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6 text-center">End-to-End Hiring Flow</h2>
          <div className="flex flex-col items-center">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-4 w-full max-w-md">
                  <div className={`w-12 h-12 rounded-xl bg-${step.color}-100 flex items-center justify-center flex-shrink-0`}>
                    <step.icon className={`w-6 h-6 text-${step.color}-600`} />
                  </div>
                  <div className="flex-1 bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <div className="font-semibold text-slate-800 text-sm">{step.title}</div>
                    <div className="text-slate-500 text-xs">{step.desc}</div>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    idx < 5 ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                  }`}>
                    {idx < 5 ? 'AI' : 'Human'}
                  </div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="my-2">
                    <ArrowDown className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step Details */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              JD Parsing & Role Setup
            </div>
            <ul className="text-slate-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>AI extracts key requirements from job descriptions</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Creates structured evaluation criteria</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              Candidate Sourcing
            </div>
            <ul className="text-slate-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Integration with selected job platforms</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Automated resume collection</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Brain className="w-4 h-4 text-blue-600" />
              AI Pre-Screening & Scoring
            </div>
            <ul className="text-slate-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Resume normalization and analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Objective scoring based on role fit</span>
              </li>
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <Mic className="w-4 h-4 text-blue-600" />
              AI-Led Interviews
            </div>
            <ul className="text-slate-600 text-sm space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Structured first-round interviews</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                <span>Consistent evaluation for all candidates</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Key Principle */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-slate-800 mb-1">Humans Always Make Final Decisions</div>
              <p className="text-slate-600 text-sm">
                AI assists and automates repetitive tasks. Your hiring managers review AI summaries 
                and conduct final interviews. No candidate is auto-rejected without human oversight.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Proposed Solution — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};

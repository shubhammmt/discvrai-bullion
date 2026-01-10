import React from 'react';
import { AlertTriangle, Users, Briefcase, TrendingDown } from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 2</div>
        <h1 className="text-2xl font-bold text-slate-800">Current Hiring Challenges</h1>
      </div>

      <div className="px-10 py-8">
        {/* Challenges for Small Teams */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Challenges Faced by Small Hiring Teams
          </h2>
          <div className="space-y-3">
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800 mb-1">Too Many Resumes, Too Little Time</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Even with moderate hiring volumes, reviewing 50–100 resumes per role consumes 
                  significant HR bandwidth. Manual screening leads to fatigue and missed opportunities.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800 mb-1">Difficulty in Early Candidate Evaluation</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Without structured pre-screening, weak candidates reach later stages, wasting 
                  interviewer time and extending hiring cycles unnecessarily.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 bg-slate-50 rounded-xl p-5 border border-slate-100">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-semibold text-slate-800 mb-1">Manual Interview Scheduling</div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Coordinating between candidates and interviewers involves multiple back-and-forth 
                  communications, creating delays and administrative overhead.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sales Hiring Specific */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            Challenges Specific to Sales Hiring
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="font-semibold text-slate-800 mb-2 text-sm">Assessing Motivation</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Gauging a candidate's drive and communication skills requires real conversation—hard 
                to assess from resumes alone.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="font-semibold text-slate-800 mb-2 text-sm">Fresher vs. Experienced</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                Differentiating between candidates with similar profiles but vastly different 
                potential is challenging without structured evaluation.
              </p>
            </div>
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="font-semibold text-slate-800 mb-2 text-sm">Interviewer Dependency</div>
              <p className="text-slate-600 text-sm leading-relaxed">
                High reliance on senior team members for interviews creates bottlenecks and 
                inconsistent evaluation standards.
              </p>
            </div>
          </div>
        </div>

        {/* Business Impact */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-blue-600" />
            Business Impact
          </h2>
          <div className="bg-red-50 rounded-xl p-6 border border-red-100">
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">30–45</div>
                <div className="text-slate-700 text-sm font-medium">Days Average Time-to-Hire</div>
                <div className="text-slate-500 text-xs mt-1">vs. industry best of 15–20 days</div>
              </div>
              <div className="text-center border-x border-red-200 px-6">
                <div className="text-3xl font-bold text-red-600 mb-2">40%</div>
                <div className="text-slate-700 text-sm font-medium">HR Time on Screening</div>
                <div className="text-slate-500 text-xs mt-1">That could be strategic work</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">15–20%</div>
                <div className="text-slate-700 text-sm font-medium">Good Candidates Lost</div>
                <div className="text-slate-500 text-xs mt-1">Due to slow response times</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-slate-600 text-sm">
              <strong>Result:</strong> Delayed closures, missed good candidates, and higher recruiter fatigue
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Current Hiring Challenges — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};

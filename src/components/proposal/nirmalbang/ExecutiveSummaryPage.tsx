import React from 'react';
import { Target, Clock, TrendingUp, Users, CheckCircle2 } from 'lucide-react';

export const ExecutiveSummaryPage: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 1</div>
        <h1 className="text-2xl font-bold text-slate-800">Executive Summary</h1>
      </div>

      <div className="px-10 py-8">
        {/* The Challenge */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            The Hiring Challenge
          </h2>
          <p className="text-slate-600 leading-relaxed text-base">
            NirmalBang's sales hiring faces a common but critical challenge: a small HR team managing 
            recruitment with limited bandwidth. The current process involves manual resume screening, 
            time-consuming interview coordination, and inconsistent candidate evaluation—all of which 
            slow down hiring and strain resources.
          </p>
        </div>

        {/* Current Pain Points */}
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-100 mb-8">
          <div className="text-amber-800 font-semibold mb-4">Current Hiring Challenges</div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-700 text-xs font-bold">1</span>
              </div>
              <div>
                <div className="font-medium text-slate-800 text-sm">Limited HR Bandwidth</div>
                <div className="text-slate-600 text-sm">Small team handling multiple roles</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-700 text-xs font-bold">2</span>
              </div>
              <div>
                <div className="font-medium text-slate-800 text-sm">Manual Resume Screening</div>
                <div className="text-slate-600 text-sm">Time-intensive review process</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-700 text-xs font-bold">3</span>
              </div>
              <div>
                <div className="font-medium text-slate-800 text-sm">Interview Scheduling</div>
                <div className="text-slate-600 text-sm">Coordination overhead</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-amber-700 text-xs font-bold">4</span>
              </div>
              <div>
                <div className="font-medium text-slate-800 text-sm">Inconsistent Quality</div>
                <div className="text-slate-600 text-sm">Variable candidate evaluation</div>
              </div>
            </div>
          </div>
        </div>

        {/* Proposed Solution */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Proposed Solution
          </h2>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-slate-700 leading-relaxed text-base">
              We propose building an <strong>AI-powered recruitment platform</strong> that automates 
              sourcing, pre-screening, and first-round interviews—while keeping final hiring decisions 
              firmly with your team. This lean, practical approach is designed specifically for 
              cost-conscious teams with moderate hiring volumes.
            </p>
          </div>
        </div>

        {/* Key Outcomes */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Key Outcomes
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-slate-800">Faster Hiring Cycles</div>
                <div className="text-slate-600 text-sm">Reduce time-to-hire by 40–60%</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-slate-800">Reduced Manual Effort</div>
                <div className="text-slate-600 text-sm">Free up HR for strategic work</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-slate-800">Consistent Screening</div>
                <div className="text-slate-600 text-sm">Standardized evaluation criteria</div>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-green-50 rounded-xl p-4 border border-green-100">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <div className="font-medium text-slate-800">Controlled Costs</div>
                <div className="text-slate-600 text-sm">Predictable monthly expenses</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Executive Summary — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};

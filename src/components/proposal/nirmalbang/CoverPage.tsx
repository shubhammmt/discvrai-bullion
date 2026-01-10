import React from 'react';
import { Brain, Building2, Calendar } from 'lucide-react';

export const CoverPage: React.FC = () => {
  const today = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header Band */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-10 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="text-white/80 text-sm font-medium">Proposal by</div>
              <div className="text-white text-xl font-bold">Discvr.ai</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white/80 text-sm">Prepared for</div>
            <div className="text-white text-lg font-semibold">Vivek Joshi</div>
            <div className="text-white/70 text-sm">North Sales Head, NirmalBang</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-10 py-12">
        <div className="mb-8">
          <div className="text-slate-500 text-sm font-medium uppercase tracking-wider mb-3">
            Solution Proposal
          </div>
          <h1 className="text-4xl font-bold text-slate-800 leading-tight mb-4">
            AI-Powered Recruitment Platform
          </h1>
          <h2 className="text-2xl text-slate-600 font-medium">
            For Sales Hiring Excellence
          </h2>
        </div>

        <div className="h-px bg-slate-200 my-8" />

        {/* Key Info Cards */}
        <div className="grid grid-cols-3 gap-6 mb-10">
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <Building2 className="w-6 h-6 text-blue-600 mb-3" />
            <div className="text-sm text-slate-500 mb-1">Client</div>
            <div className="text-lg font-semibold text-slate-800">NirmalBang</div>
            <div className="text-sm text-slate-500">Financial Services</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <Calendar className="w-6 h-6 text-blue-600 mb-3" />
            <div className="text-sm text-slate-500 mb-1">Timeline</div>
            <div className="text-lg font-semibold text-slate-800">12–16 Weeks</div>
            <div className="text-sm text-slate-500">End-to-end delivery</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div className="text-2xl mb-2">₹</div>
            <div className="text-sm text-slate-500 mb-1">Investment</div>
            <div className="text-lg font-semibold text-slate-800">₹50L One-time</div>
            <div className="text-sm text-slate-500">₹1–2L/month post go-live</div>
          </div>
        </div>

        {/* Scope Summary */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="text-blue-800 font-semibold mb-3">What This Proposal Covers</div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-slate-700">End-to-end recruitment automation</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-slate-700">AI-powered pre-screening & scoring</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-slate-700">AI-led first-round interviews</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2" />
              <span className="text-slate-700">Transparent cost structure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm text-slate-500">
          <span>{today}</span>
          <span>Confidential</span>
        </div>
      </div>
    </div>
  );
};

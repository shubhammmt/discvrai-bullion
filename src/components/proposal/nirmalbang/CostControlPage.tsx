import React from 'react';
import { TrendingDown, TrendingUp, Eye, CheckCircle2 } from 'lucide-react';

export const CostControlPage: React.FC = () => {
  const lowCostFactors = [
    { title: 'Audio-Only Interviews', desc: 'Lower bandwidth and processing costs compared to video' },
    { title: 'Limited Sourcing Platforms', desc: 'Focused integration reduces complexity and costs' },
    { title: 'Low Resume Volume', desc: 'AI processing costs scale with volume—lower volume = lower costs' },
    { title: 'Short Interview Durations', desc: '15–20 minute interviews minimize speech processing costs' },
    { title: 'Efficient LLM Usage', desc: 'Optimized prompts and caching reduce API calls' },
  ];

  const increasingFactors = [
    { title: 'Video Interviews', desc: 'Requires additional video processing and storage' },
    { title: 'Avatar-Based Interviewer', desc: 'Real-time avatar generation increases compute costs' },
    { title: 'Higher Resume Volumes', desc: 'More candidates = more AI processing required' },
    { title: 'Multi-Language Expansion', desc: 'Additional language models and translation costs' },
    { title: 'Advanced Analytics', desc: 'Deep insights require more compute and storage' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 7</div>
        <h1 className="text-2xl font-bold text-slate-800">Cost Control & Scaling Transparency</h1>
      </div>

      <div className="px-10 py-8">
        <div className="grid grid-cols-2 gap-6 mb-8">
          {/* Low Cost Factors */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">How Costs Remain Low</h2>
            </div>
            <div className="space-y-3">
              {lowCostFactors.map((item, idx) => (
                <div key={idx} className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800 text-sm">{item.title}</div>
                      <div className="text-slate-600 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Increasing Factors */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-600" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">What Can Increase Costs</h2>
            </div>
            <div className="space-y-3">
              {increasingFactors.map((item, idx) => (
                <div key={idx} className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-slate-800 text-sm">{item.title}</div>
                      <div className="text-slate-600 text-xs mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Transparency Note */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-slate-800 mb-2">Full Visibility & Control</div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong>Costs scale with usage</strong> — you only pay for what you use</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong>Monthly usage reports</strong> — detailed breakdown of all costs</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong>No hidden charges</strong> — all cost drivers are transparent upfront</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                  <span><strong>Scalable by design</strong> — upgrade features only when needed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Cost Control — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};

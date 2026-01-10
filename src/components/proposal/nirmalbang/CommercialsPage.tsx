import React from 'react';
import { IndianRupee, Server, Brain, Mic, Video, Headphones } from 'lucide-react';

export const CommercialsPage: React.FC = () => {
  const implementationCosts = [
    { phase: 'Phase 0', title: 'Discovery & Scope Freeze', cost: '₹3–4L' },
    { phase: 'Phase 1', title: 'Core Hiring & Pre-Screening', cost: '₹18–22L' },
    { phase: 'Phase 2', title: 'AI Interview System', cost: '₹22–25L' },
    { phase: 'Phase 3', title: 'Intelligence & Go-Live', cost: '₹8–10L' },
  ];

  const monthlyCosts = [
    { icon: Server, title: 'Cloud Infrastructure', cost: '₹40–60K', desc: 'Hosting, databases, storage' },
    { icon: Brain, title: 'AI / LLM Usage', cost: '₹30–50K', desc: 'Screening & evaluation models' },
    { icon: Mic, title: 'Speech-to-Text / TTS', cost: '₹20–30K', desc: 'Voice processing' },
    { icon: Video, title: 'Google Meet Bot Infra', cost: '₹20–30K', desc: 'Interview automation' },
    { icon: Headphones, title: 'Support & Monitoring', cost: '₹20–30K', desc: 'Ongoing maintenance' },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Page Header */}
      <div className="bg-slate-50 px-10 py-6 border-b border-slate-200">
        <div className="text-blue-600 text-sm font-medium uppercase tracking-wider mb-1">Page 6</div>
        <h1 className="text-2xl font-bold text-slate-800">Commercials & Cost Transparency</h1>
      </div>

      <div className="px-10 py-8">
        {/* One-Time Implementation Cost */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue-600" />
            One-Time Implementation Cost
          </h2>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Phase</th>
                  <th className="text-left px-6 py-3 text-sm font-semibold text-slate-700">Deliverables</th>
                  <th className="text-right px-6 py-3 text-sm font-semibold text-slate-700">Cost (Indicative)</th>
                </tr>
              </thead>
              <tbody>
                {implementationCosts.map((item, idx) => (
                  <tr key={idx} className="border-t border-slate-100">
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {item.phase}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 text-sm">{item.title}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-800">{item.cost}</td>
                  </tr>
                ))}
                <tr className="border-t-2 border-slate-200 bg-blue-50">
                  <td className="px-6 py-4" colSpan={2}>
                    <span className="font-semibold text-slate-800">Total One-Time Cost</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-xl font-bold text-blue-600">₹50–61L</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Costs */}
        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <IndianRupee className="w-5 h-5 text-blue-600" />
            Post Go-Live Monthly Costs
          </h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {monthlyCosts.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-slate-50 rounded-xl p-4 border border-slate-100">
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium text-slate-800 text-sm">{item.title}</div>
                    <div className="font-semibold text-slate-800 text-sm">{item.cost}</div>
                  </div>
                  <div className="text-slate-500 text-xs">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Total Monthly */}
          <div className="bg-green-50 rounded-xl p-5 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-800">Total Monthly Cost</div>
                <div className="text-slate-600 text-sm">Predictable, usage-based pricing</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-green-600">₹1–2L</div>
                <div className="text-slate-500 text-sm">per month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-slate-50 px-10 py-4 border-t border-slate-200">
        <div className="text-sm text-slate-500 text-center">
          Commercials — NirmalBang AI Recruitment Platform
        </div>
      </div>
    </div>
  );
};

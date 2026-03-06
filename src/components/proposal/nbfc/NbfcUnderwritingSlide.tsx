import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { CreditCard, Smartphone, ShieldCheck, BarChart3, Brain } from 'lucide-react';

const dataCategories = [
  { icon: Smartphone, label: 'Digital Payments', data: 'UPI velocity, ATM withdrawal frequency', signal: 'Cash flow stress or income stability' },
  { icon: Brain, label: 'Behavioral Patterns', data: 'App usage, digital footprint', signal: 'Behavioral reliability and discipline' },
  { icon: BarChart3, label: 'Financial Indicators', data: 'GST returns, rental payments, LIC policies', signal: 'Capacity to service obligations' },
  { icon: CreditCard, label: 'Telecom / Utility', data: 'Mobile recharge regularity, electricity bills', signal: 'Fixed cost management consistency' },
  { icon: ShieldCheck, label: 'Psychometrics', data: 'Attitudes toward debt, responsibility tests', signal: 'Character assessment for NTC users' },
];

const results = [
  { metric: '38%', label: 'Rural customer acquisition increase (Maharashtra pilot)' },
  { metric: '24hrs', label: 'Approval time — down from 5 days' },
  { metric: '350M', label: 'First-time applicants reachable via AI/ML scoring' },
  { metric: '33%', label: 'Loan delinquency reduction target' },
];

export const NbfcUnderwritingSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Alternative Data & Underwriting</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          Beyond Bureau Scores — <span className="text-amber-400">190M New-to-Credit Users</span>
        </h2>

        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Left: data categories */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Alternative Data Sources</h3>
            {dataCategories.map((d, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-5 py-3.5 flex items-start gap-4">
                <d.icon className="w-5 h-5 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-white font-medium text-sm">{d.label}</p>
                  <p className="text-white/40 text-xs mt-0.5">{d.data}</p>
                  <p className="text-amber-400/70 text-xs mt-1">→ {d.signal}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: results */}
          <div className="flex flex-col">
            <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3">Proven Impact</h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {results.map((r, i) => (
                <div key={i} className="bg-gradient-to-br from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl p-5 flex flex-col justify-center">
                  <p className="text-3xl font-bold text-amber-400">{r.metric}</p>
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">{r.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 bg-white/[0.03] border border-white/[0.06] rounded-xl px-5 py-4">
              <p className="text-white/60 text-xs leading-relaxed">
                <span className="text-white font-semibold">Live feed models</span> — not static bureau reports. A 20% decline in monthly deposits over 3 months triggers early warning before default.
              </p>
            </div>
          </div>
        </div>
      </div>
    </NbfcSlideLayout>
  );
};

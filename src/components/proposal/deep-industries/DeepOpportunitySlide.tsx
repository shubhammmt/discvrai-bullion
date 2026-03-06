import React from 'react';
import { DeepSlideLayout } from './DeepSlideLayout';
import { TrendingUp, Landmark, Ship, Gauge } from 'lucide-react';

const metrics = [
  {
    icon: TrendingUp,
    label: 'Order Book',
    value: '₹3,050 Cr+',
    detail: 'vs ₹632 Cr in FY22',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Landmark,
    label: 'PEC Contract',
    value: '₹1,402 Cr',
    detail: '15-year, 40 wells, ~50% EBITDA',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Ship,
    label: 'Offshore',
    value: '~₹100 Cr/yr',
    detail: 'Prabha barge; Mexico, Africa, Argentina',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Gauge,
    label: 'Operational Edge',
    value: '99.6%',
    detail: 'Uptime; 4–6 mo execution vs 10–12',
    color: 'from-emerald-500 to-emerald-600',
  },
];

export const DeepOpportunitySlide: React.FC = () => {
  return (
    <DeepSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">The Opportunity</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10">
          You're Scaling Fast — The Question Is How You <span className="text-teal-400">Sustain It</span>
        </h2>

        <div className="grid grid-cols-4 gap-6 flex-1">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center mb-5`}>
                <m.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/40 text-sm font-medium mb-1">{m.label}</p>
              <p className="text-3xl font-bold text-white mb-2">{m.value}</p>
              <p className="text-white/50 text-sm mt-auto">{m.detail}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-teal-500/10 border border-teal-500/20 rounded-xl px-6 py-4">
          <p className="text-white/70 text-base">
            <span className="text-teal-400 font-semibold">Key question:</span>{' '}
            Growth is real. As you add wells, rigs, and vessels, how do you maintain operational excellence without scaling headcount proportionally?
          </p>
        </div>
      </div>
    </DeepSlideLayout>
  );
};

import React from 'react';
import { DeepSlideLayout } from './DeepSlideLayout';
import { AlertTriangle, Wrench, Globe } from 'lucide-react';

const risks = [
  {
    icon: AlertTriangle,
    title: 'Safety & Surprises',
    example: 'Mori #5 — gas leakage, 2–3 month PEC ramp delay',
    impact: 'Revenue deferral, reputational risk',
    accent: 'border-red-500/30 bg-red-500/5',
    iconBg: 'bg-red-500/20 text-red-400',
  },
  {
    icon: Wrench,
    title: 'Asset Reliability',
    example: '99.6% uptime is your edge. One unplanned shutdown on $30K/day barge = ₹90L+ lost/month',
    impact: 'Downtime, uncertain repair costs',
    accent: 'border-amber-500/30 bg-amber-500/5',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  {
    icon: Globe,
    title: 'Visibility',
    example: 'Fleet across 3 continents; 40 PEC wells; 18 rigs',
    impact: 'Flying blind — chasing updates, manual coordination',
    accent: 'border-blue-500/30 bg-blue-500/5',
    iconBg: 'bg-blue-500/20 text-blue-400',
  },
];

export const DeepChallengeSlide: React.FC = () => {
  return (
    <DeepSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">The Challenge</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10">
          Three Risks as You <span className="text-teal-400">Scale</span>
        </h2>

        <div className="grid grid-cols-3 gap-8 flex-1">
          {risks.map((r, i) => (
            <div key={i} className={`rounded-2xl border ${r.accent} p-7 flex flex-col`}>
              <div className={`w-14 h-14 rounded-xl ${r.iconBg} flex items-center justify-center mb-6`}>
                <r.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{r.title}</h3>
              <div className="space-y-4 flex-1">
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Example</p>
                  <p className="text-white/70 text-sm leading-relaxed">{r.example}</p>
                </div>
                <div>
                  <p className="text-white/30 text-xs uppercase tracking-wider mb-1">Impact</p>
                  <p className="text-white/70 text-sm leading-relaxed">{r.impact}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-4">
          <p className="text-white/60 text-base">
            These aren't IT problems. They're <span className="text-white font-semibold">business problems</span> that digital tools can help solve.
          </p>
        </div>
      </div>
    </DeepSlideLayout>
  );
};

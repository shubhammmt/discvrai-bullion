import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { Shield, AlertTriangle, Users, Scale } from 'lucide-react';

const challenges = [
  {
    icon: Shield,
    title: 'Regulatory Pressure',
    points: [
      'Scale-Based Regulation (SBR) — stricter governance for Upper/Middle layers',
      'DPDP Act — every NBFC is now a "Data Fiduciary" with legal liability',
      'Integrated Ombudsman 2026 — ₹30L compensation cap; AI audit trails mandatory',
      'V-KYC Master Directions — anti-deepfake, geotagging, liveness detection',
    ],
    accent: 'border-red-500/30 bg-red-500/5',
    iconBg: 'bg-red-500/20 text-red-400',
  },
  {
    icon: AlertTriangle,
    title: 'Asset Quality Risk',
    points: [
      'Credit costs elevated in unsecured MSME and 2/3-wheeler segments',
      'Bajaj Finance cut 25% of unsecured MSME volumes to manage risk',
      'GNPA at 2.5% — one macro shock away from stress',
      'Evergreening detection now under RBI scanner',
    ],
    accent: 'border-amber-500/30 bg-amber-500/5',
    iconBg: 'bg-amber-500/20 text-amber-400',
  },
  {
    icon: Users,
    title: 'Operational Scale',
    points: [
      '190M new-to-credit users with no bureau history',
      'Processing 6.5L+ applications/day during peak — zero error tolerance',
      'Regional language support across Tier 3–6 towns',
      'Cross-sell conversion at 60-70% vs 5-20% for new customers',
    ],
    accent: 'border-blue-500/30 bg-blue-500/5',
    iconBg: 'bg-blue-500/20 text-blue-400',
  },
];

export const NbfcChallengeSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">The Challenge</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          Growth Without Digital Infrastructure Is <span className="text-amber-400">Unsustainable</span>
        </h2>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {challenges.map((c, i) => (
            <div key={i} className={`rounded-2xl border ${c.accent} p-6 flex flex-col`}>
              <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center mb-5`}>
                <c.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-4">{c.title}</h3>
              <ul className="space-y-2.5 flex-1">
                {c.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-xs text-white/60 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-white/[0.03] border border-white/[0.06] rounded-xl px-6 py-3">
          <p className="text-white/60 text-sm">
            The NBFC that embeds AI into its <span className="text-white font-semibold">operating model</span> — not as a side project — will sustain premium valuations.
          </p>
        </div>
      </div>
    </NbfcSlideLayout>
  );
};

import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { Zap, Shield, TrendingUp } from 'lucide-react';

const pillars = [
  {
    icon: Zap,
    title: 'Operational Elasticity',
    subtitle: 'Process at scale, zero compromise',
    bullets: [
      'Video KYC with anti-deepfake liveness & geotagging — fully RBI compliant',
      'Intelligent Document Processing — 42% automated QC on loan applications',
      'GenAI voice bots in regional languages — 24/7 customer support',
      'One-click MSME onboarding via GSTIN, PAN, Udhyam API',
      '6.5L+ applications/day processing capability',
    ],
    stat: '60-70%',
    statLabel: 'Cost per contact reduction',
  },
  {
    icon: Shield,
    title: 'Risk Precision',
    subtitle: 'Beyond bureau scores',
    bullets: [
      'Alternative credit scoring — UPI velocity, psychometrics, behavioral signals',
      'Real-time early warning: 30-60 day pre-default prediction',
      'Predictive collections with dynamic risk scoring updated daily',
      'Contagion & evergreening detection for AIF round-tripping',
      'DPDP-compliant consent management & E2E encryption',
    ],
    stat: '33%',
    statLabel: 'Delinquency reduction target',
  },
  {
    icon: TrendingUp,
    title: 'Revenue Agility',
    subtitle: '360° customer monetization',
    bullets: [
      'Next Best Action (NBA) engine — right product, right time, right channel',
      'Cross-sell automation across lending, insurance, investments',
      'Hyper-personalized acquisition — 25% revenue boost potential',
      'AI voice bots contributing ₹1,980 Cr in loan disbursements/quarter',
      '"Right Time, Right Channel" outreach — 30-45% contact rate increase',
    ],
    stat: '10x',
    statLabel: 'Marketing performance improvement',
  },
];

export const NbfcSolutionSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">What We Enable</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          Three Pillars of <span className="text-amber-400">AI-Native NBFC Transformation</span>
        </h2>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {pillars.map((p, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center mb-4">
                <p.icon className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-1">{p.title}</h3>
              <p className="text-xs text-amber-400/70 mb-4">{p.subtitle}</p>
              <ul className="space-y-2 flex-1">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex gap-2.5 text-xs text-white/60 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-amber-400/60 mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/[0.06]">
                <p className="text-2xl font-bold text-amber-400">{p.stat}</p>
                <p className="text-xs text-white/40">{p.statLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </NbfcSlideLayout>
  );
};

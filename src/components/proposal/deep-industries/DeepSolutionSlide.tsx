import React from 'react';
import { DeepSlideLayout } from './DeepSlideLayout';
import { Eye, BarChart3, MapPin } from 'lucide-react';

const pillars = [
  {
    icon: Eye,
    title: 'See Problems Before They Cost You',
    bullets: [
      'Predictive monitoring on wells, compressors, vessels',
      '24/7 automated surveillance for safety anomalies',
      'Fewer surprises like Mori #5',
    ],
  },
  {
    icon: BarChart3,
    title: 'Optimize PEC Extraction',
    bullets: [
      'Real-time visibility across all 40 wells — pressure, flow, alerts in one dashboard',
      'Systems that suggest when to adjust parameters',
      'Reduce the "2–3 month ramp delay" from geological surprises',
    ],
  },
  {
    icon: MapPin,
    title: 'One View of Your Fleet',
    bullets: [
      'Rigs, barges, tugs — location, status, fuel — in one screen',
      'No more chasing updates across Mexico, Africa, Argentina',
      'Digital twins for key assets — simulate maintenance, reduce repair surprises',
    ],
  },
];

export const DeepSolutionSlide: React.FC = () => {
  return (
    <DeepSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">What We Enable</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10">
          Business Outcomes, <span className="text-teal-400">Not Buzzwords</span>
        </h2>

        <div className="grid grid-cols-3 gap-8 flex-1">
          {pillars.map((p, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-7 flex flex-col">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center mb-6">
                <p.icon className="w-7 h-7 text-teal-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-5">{p.title}</h3>
              <ul className="space-y-3 flex-1">
                {p.bullets.map((b, j) => (
                  <li key={j} className="flex gap-3 text-sm text-white/65 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60 mt-1.5 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-teal-500/10 border border-teal-500/20 rounded-xl px-6 py-4">
          <p className="text-white/70 text-base">
            We <span className="text-teal-400 font-semibold">connect what you have</span> and give you visibility. We don't replace your systems.
          </p>
        </div>
      </div>
    </DeepSlideLayout>
  );
};

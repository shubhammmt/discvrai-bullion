import React from 'react';
import { DeepSlideLayout } from './DeepSlideLayout';
import { Target, Clock, Rocket, ArrowRight, Bot } from 'lucide-react';

const steps = [
  {
    icon: Target,
    num: '01',
    title: 'Pick One Area',
    items: ['Safety & Mori #5 learnings', 'PEC optimization (1 well cluster)', 'Asset reliability (1 compressor or 1 rig)'],
  },
  {
    icon: Clock,
    num: '02',
    title: '90-Day Pilot',
    items: ['Deploy on 1–2 assets or 1 well cluster', 'Define success: 1 prevented failure, X% visibility improvement'],
  },
  {
    icon: Rocket,
    num: '03',
    title: 'Measure & Scale',
    items: ['If it works: Expand to more wells, fleet, or full safety suite', 'If not: No long-term commitment'],
  },
];

export const DeepNextStepsSlide: React.FC = () => {
  return (
    <DeepSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">How We Start</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10">
          Low Risk, <span className="text-teal-400">High Clarity</span>
        </h2>

        <div className="grid grid-cols-3 gap-8 flex-1">
          {steps.map((s, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-7 flex flex-col relative">
              <span className="absolute top-5 right-6 text-4xl font-bold text-white/[0.06]">{s.num}</span>
              <div className="w-12 h-12 rounded-xl bg-teal-500/15 flex items-center justify-center mb-5">
                <s.icon className="w-6 h-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{s.title}</h3>
              <ul className="space-y-3 flex-1">
                {s.items.map((item, j) => (
                  <li key={j} className="flex gap-3 text-sm text-white/60 leading-relaxed">
                    <ArrowRight className="w-4 h-4 text-teal-400/50 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Next steps footer */}
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="bg-teal-500/10 border border-teal-500/20 rounded-xl px-6 py-5">
            <p className="text-white font-semibold mb-2">Immediate Next Steps</p>
            <ul className="space-y-2">
              <li className="flex gap-2 text-white/60 text-sm">
                <ArrowRight className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                2–3 hour workshop with ops team
              </li>
              <li className="flex gap-2 text-white/60 text-sm">
                <ArrowRight className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                One-pager on Safety & Mori #5 for board
              </li>
            </ul>
          </div>
          <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-6 py-5 flex items-center gap-4">
            <Bot className="w-8 h-8 text-teal-400" />
            <div>
              <p className="text-white font-semibold">Start small. Prove value. Scale when ready.</p>
              <p className="text-white/40 text-sm mt-1">shubham@discvr.ai | +91-9873961591</p>
            </div>
          </div>
        </div>
      </div>
    </DeepSlideLayout>
  );
};

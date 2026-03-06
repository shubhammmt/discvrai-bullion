import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { ArrowUpRight, Clock, PhoneCall, Target, TrendingDown } from 'lucide-react';

const metrics = [
  { icon: ArrowUpRight, value: '40%', label: 'Recovery rate improvement', detail: 'Predictive scoring + micro-segmentation' },
  { icon: PhoneCall, value: '30-45%', label: 'Contact rate increase', detail: '"Right Time" & "Right Channel" algorithms' },
  { icon: TrendingDown, value: '60-70%', label: 'Cost per contact reduction', detail: 'Automated intelligent channel routing' },
  { icon: Target, value: '25-35%', label: 'Acceptance rate increase', detail: 'AI-suggested personalized restructuring' },
  { icon: Clock, value: '50-60%', label: 'Wasted attempts decrease', detail: 'Behavioral response timing analysis' },
];

export const NbfcCollectionsSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">Intelligent Collections</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          From Reactive Recovery to <span className="text-amber-400">Predictive Asset Quality</span>
        </h2>

        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Left: metrics */}
          <div className="space-y-3">
            {metrics.map((m, i) => (
              <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-xl px-6 py-4 flex items-center gap-5">
                <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center shrink-0">
                  <m.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xl font-bold text-amber-400">{m.value}</span>
                    <span className="text-sm text-white font-medium">{m.label}</span>
                  </div>
                  <p className="text-xs text-white/40 mt-0.5">{m.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: approach */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 flex-1">
              <h3 className="text-base font-bold text-white mb-4">How It Works</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">30-60 Days Before Default</p>
                  <p className="text-white/60 text-sm">ML models identify borrowers likely to miss payments based on transaction velocity, communication anomalies, and external credit inquiries.</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">Proactive Intervention</p>
                  <p className="text-white/60 text-sm">Friendly check-ins, tailored payment plans, and restructuring offers triggered automatically — preventing 40-60% of potential NPAs.</p>
                </div>
                <div>
                  <p className="text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">Cooperative Recovery</p>
                  <p className="text-white/60 text-sm">AI suggests restructuring based on real-time analysis of borrower's current capacity. WhatsApp at 10 AM or email at lunch — personalized by response history.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-5 py-3">
              <p className="text-white/70 text-xs">
                <span className="text-amber-400 font-semibold">40-60%</span> of potential NPAs preventable through early AI intervention.
              </p>
            </div>
          </div>
        </div>
      </div>
    </NbfcSlideLayout>
  );
};

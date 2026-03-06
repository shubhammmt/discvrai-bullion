import React from 'react';
import { DeepSlideLayout } from './DeepSlideLayout';
import { CheckCircle2, Quote } from 'lucide-react';

const proofs = [
  { label: 'Shell', stat: '20% reduction in unplanned downtime; 15% cut in maintenance costs' },
  { label: 'Deloitte', stat: '70% of refinery downtime could have been prevented with better data analytics' },
  { label: 'Typical Results', stat: '20–50% fewer unplanned outages; 10–20% lower maintenance costs' },
];

export const DeepProofSlide: React.FC = () => {
  return (
    <DeepSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">Industry Proof</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-10">
          Proven in Oil & Gas — <span className="text-teal-400">We're Not Experimenting</span>
        </h2>

        <div className="flex-1 flex flex-col gap-5">
          {proofs.map((p, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl px-8 py-6 flex items-start gap-5">
              <CheckCircle2 className="w-6 h-6 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-lg mb-1">{p.label}</p>
                <p className="text-white/60 text-base">{p.stat}</p>
              </div>
            </div>
          ))}

          {/* Your context callout */}
          <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-2xl px-8 py-6 mt-auto">
            <div className="flex items-start gap-4">
              <Quote className="w-8 h-8 text-teal-400/40 shrink-0" />
              <div>
                <p className="text-white font-semibold text-lg mb-2">Your Context</p>
                <p className="text-white/60 text-base leading-relaxed">
                  Works on legacy assets — overlay sensors on existing equipment; no need to replace.
                  This is <span className="text-teal-400 font-medium">standard practice</span> for operators who want to stay ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DeepSlideLayout>
  );
};

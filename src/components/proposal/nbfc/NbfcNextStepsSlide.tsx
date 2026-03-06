import React from 'react';
import { NbfcSlideLayout } from './NbfcSlideLayout';
import { Search, Cpu, Rocket, Mail, Phone, MessageSquare } from 'lucide-react';

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Strategic Diagnostic',
    duration: '4-8 Weeks',
    deliverables: [
      'Business Process Blueprint — workflows, leakage points, automation opportunities',
      'Technical Readiness Report — systems, data quality, integration gaps',
      'Value Mapping Document — CFO-ready business impact model',
      'Transformation Roadmap — 16-week execution plan',
    ],
    note: 'You get actionable insights even if you don\'t proceed.',
  },
  {
    icon: Cpu,
    step: '02',
    title: '16 Weeks to Production',
    duration: 'Phased Deployment',
    deliverables: [
      'Weeks 1-4: Day-0 digitalization, system integrations, clean core',
      'Weeks 5-12: First Virtual Pod live (Collections / Underwriting / RM)',
      'Weeks 13-16: Performance tuning, team training, self-sufficient client',
    ],
    note: 'Day-0 delivers value standalone. AI is added when foundation is ready.',
  },
  {
    icon: Rocket,
    step: '03',
    title: 'Scale & Optimize',
    duration: 'Ongoing',
    deliverables: [
      'Expand Virtual Pods across functions — HR, Finance, Compliance',
      'Continuous model retraining on your portfolio data',
      'Self-service configuration — no vendor lock-in',
      '99.9% uptime SLA — multi-cloud, horizontal scaling',
    ],
    note: 'Built for enterprise: SEBI, RBI, DPDP compliant.',
  },
];

export const NbfcNextStepsSlide: React.FC = () => {
  return (
    <NbfcSlideLayout>
      <div className="h-full flex flex-col">
        <div className="mb-2">
          <span className="text-amber-400 text-sm font-semibold uppercase tracking-widest">How We Start</span>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8">
          Low Risk, High Clarity — <span className="text-amber-400">No Commitment Required</span>
        </h2>

        <div className="grid grid-cols-3 gap-6 flex-1">
          {steps.map((s, i) => (
            <div key={i} className="bg-white/[0.04] border border-white/[0.06] rounded-2xl p-6 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center">
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-amber-400/50 text-xs font-mono">{s.step}</p>
                  <p className="text-white font-bold text-sm">{s.title}</p>
                </div>
              </div>
              <p className="text-amber-400 text-xs font-semibold mb-3">{s.duration}</p>
              <ul className="space-y-2 flex-1">
                {s.deliverables.map((d, j) => (
                  <li key={j} className="flex gap-2.5 text-xs text-white/60 leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-amber-400/60 mt-1.5 shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-white/40 mt-3 pt-3 border-t border-white/[0.06] italic">{s.note}</p>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-6 bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-500/20 rounded-xl px-6 py-4 flex items-center justify-between">
          <div>
            <p className="text-white font-semibold text-sm">Ready to explore?</p>
            <p className="text-white/50 text-xs">30-minute discovery call — understand your challenges, no commitment.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Mail className="w-4 h-4 text-amber-400" />
              shubham@discvr.ai
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50">
              <Phone className="w-4 h-4 text-amber-400" />
              +91-9873961591
            </div>
          </div>
        </div>
      </div>
    </NbfcSlideLayout>
  );
};

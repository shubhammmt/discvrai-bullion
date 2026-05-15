import React from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { Clock, MessageSquare, Mail, CheckCircle2, ArrowRight, Link as LinkIcon } from 'lucide-react';

export default function AWNICRecovery() {
  const steps = [
    { t: 'T+0', label: 'Quote abandoned', desc: 'Customer left at premium-shown step · App · Abu Dhabi', icon: Clock, tone: 'slate' },
    { t: 'T+15min', label: 'Score & decide', desc: 'Propensity 89 · not in-force · no open claim · proceed', icon: CheckCircle2, tone: 'teal' },
    { t: 'T+30min', label: 'WhatsApp · Touch 1', desc: '"Your quote is ready · 1-tap return" with pre-filled link', icon: MessageSquare, tone: 'navy' },
    { t: 'T+24h', label: 'Email · Touch 2 (if no return)', desc: 'Comparative reminder + AED 50 loyalty add-on', icon: Mail, tone: 'navy' },
    { t: 'T+26h', label: 'Customer returned via link', desc: 'Pre-filled vehicle, IBAN, EID — no re-entry', icon: LinkIcon, tone: 'green' },
    { t: 'T+27h', label: 'Bind completed · AED 1,840 GWP', desc: 'Attributed to recovery campaign · holdout-measured', icon: CheckCircle2, tone: 'green' },
  ];

  return (
    <>
      <PageHeader eyebrow="Screen 3 · 60 seconds" title="Abandonment Recovery Journey"
        sub="Per-quote orchestration — not generic blast. Two touches, channel rules, holdout proof."
        right={<Pill tone="green">Recovered bind · attributed</Pill>} />
      <ArchStrip active="channels" />
      <Narration>Recover quotes without generic blast campaigns. Each touch is gated by channel rules and frequency caps; the bind is attributed back to the journey.</Narration>

      <div className="px-8 pb-10 grid grid-cols-3 gap-5">
        <Card title="Customer · Layla A." className="col-span-1">
          <div className="space-y-2 text-xs">
            <div className="flex justify-between"><span className="text-slate-500">Emirate</span><span className="font-medium">Abu Dhabi</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Vehicle</span><span className="font-medium">Toyota Camry · 2023</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Quote ID</span><span className="font-mono font-medium">Q-48201</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Channel</span><span className="font-medium">App</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Propensity</span><span className="font-semibold text-emerald-700">89</span></div>
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] uppercase text-slate-500 mb-1.5">Eligibility checks</div>
              {['Not in-force · pass', 'No open claim · pass', 'Within frequency cap · pass', 'Consent on record · pass'].map(c => (
                <div key={c} className="flex items-center gap-1.5 text-emerald-700 text-[11px]"><CheckCircle2 className="w-3 h-3" />{c}</div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Recovery journey timeline" className="col-span-2">
          <div className="relative">
            <div className="absolute left-[88px] top-2 bottom-2 w-px bg-slate-200" />
            <div className="space-y-4">
              {steps.map((s, i) => {
                const Icon = s.icon;
                const colorMap: any = { slate: '#94A3B8', teal: '#0D9488', navy: '#0B2D4A', green: '#059669' };
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-20 text-[11px] font-mono font-semibold text-slate-500 pt-1 text-right">{s.t}</div>
                    <div className="relative">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 bg-white" style={{ borderColor: colorMap[s.tone] }}>
                        <Icon className="w-4 h-4" style={{ color: colorMap[s.tone] }} />
                      </div>
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="text-sm font-semibold text-slate-900">{s.label}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{s.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <div className="text-[10px] uppercase text-emerald-700 font-semibold">Recovery rate · cohort</div>
              <div className="text-xl font-bold text-emerald-800">24.1%</div>
              <div className="text-[10px] text-emerald-700">vs holdout 9.6%</div>
            </div>
            <div className="rounded-lg bg-teal-50 border border-teal-200 p-3">
              <div className="text-[10px] uppercase text-teal-700 font-semibold">Avg touches</div>
              <div className="text-xl font-bold text-teal-800">1.7</div>
              <div className="text-[10px] text-teal-700">cap = 2 / 24h</div>
            </div>
            <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
              <div className="text-[10px] uppercase text-blue-900 font-semibold">GWP recovered · MTD</div>
              <div className="text-xl font-bold text-blue-900">AED 318K</div>
              <div className="text-[10px] text-blue-900">attributed to journey v3</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

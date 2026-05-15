import React from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { Phone, FileText, AlertCircle, Gift, MessageCircle, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AWNICAgent() {
  return (
    <>
      <PageHeader eyebrow="Screen 6 · 60 seconds" title="Agent Assist · Contact Center"
        sub="Unified timeline · suggested talk track · one-click outcome that retrains the model."
        right={<Pill tone="navy">Live call · 02:14</Pill>} />
      <ArchStrip active="channels" />
      <Narration>Humans stay in the loop with explainable recommendations. Outcome capture closes the learning loop into the next model retrain.</Narration>

      <div className="px-8 pb-10 grid grid-cols-3 gap-5">
        <Card title="Customer · Mohammed S. · P-771204" className="col-span-1">
          <div className="space-y-2 text-xs">
            <div className="grid grid-cols-2 gap-y-1">
              <span className="text-slate-500">Tenure</span><span className="font-medium">3.1 years</span>
              <span className="text-slate-500">Tier</span><span className="font-medium">Comprehensive</span>
              <span className="text-slate-500">GWP</span><span className="font-medium">AED 4,820</span>
              <span className="text-slate-500">Renewal</span><span className="font-semibold text-amber-700">12 days</span>
              <span className="text-slate-500">Churn risk</span><span className="font-semibold text-rose-700">86</span>
              <span className="text-slate-500">Loyalty pts</span><span className="font-semibold text-teal-700">1,840</span>
            </div>
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[10px] uppercase text-slate-500 mb-1">Compliance flags</div>
              <Pill tone="green">No open claim</Pill> <Pill tone="green">No complaint</Pill> <Pill tone="teal">Within frequency cap</Pill>
            </div>
          </div>
        </Card>

        <Card title="Unified timeline" className="col-span-1">
          <div className="space-y-3 text-xs">
            {[
              { t: '−4 days', i: Phone, c: 'navy', label: 'Inbound call · billing query · resolved (3m)' },
              { t: '−12 days', i: FileText, c: 'teal', label: 'Renewal quote viewed in App · no action' },
              { t: '−21 days', i: Gift, c: 'green', label: 'Loyalty bonus offered · ignored' },
              { t: '−2 months', i: AlertCircle, c: 'amber', label: 'Complaint logged · resolved in 4h' },
              { t: '−9 months', i: FileText, c: 'slate', label: 'Claim CLM-7211 · settled · CSAT 8/10' },
              { t: '−3 years', i: CheckCircle2, c: 'navy', label: 'First bind · App acquisition · CAC AED 142' },
            ].map((e, i) => {
              const Icon = e.i;
              const colors: any = { navy: '#0B2D4A', teal: '#0D9488', green: '#059669', amber: '#D97706', slate: '#94A3B8' };
              return (
                <div key={i} className="flex gap-3">
                  <div className="w-16 text-[10px] font-mono text-slate-500 pt-1">{e.t}</div>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center border-2 bg-white shrink-0" style={{ borderColor: colors[e.c] }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: colors[e.c] }} />
                  </div>
                  <div className="flex-1 pt-1 text-slate-700">{e.label}</div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="col-span-1 space-y-5">
          <Card title="Suggested talk track · renewal save">
            <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
              <div className="rounded bg-teal-50 border border-teal-200 p-3">
                <div className="text-[10px] font-bold uppercase text-teal-700 mb-1">Open</div>
                "Hi Mohammed, this is Aisha from AWNIC. Calling to confirm your motor renewal and an early-renewal loyalty bonus on your account."
              </div>
              <div className="rounded bg-blue-50 border border-blue-200 p-3">
                <div className="text-[10px] font-bold uppercase text-blue-900 mb-1">Anchor</div>
                "Your premium is held at AED 4,820 — same as last year. Plus +500 loyalty points if you renew this week."
              </div>
              <div className="rounded bg-slate-50 border border-slate-200 p-3">
                <div className="text-[10px] font-bold uppercase text-slate-600 mb-1">Avoid</div>
                Discounting · cross-sell · roadside upsell (frequency cap nearing limit).
              </div>
            </div>
          </Card>

          <Card title="Log outcome · feeds next retrain">
            <div className="grid grid-cols-2 gap-2">
              {['Renewed today', 'Renewed later', 'Wants callback', 'Lost · price', 'Lost · service', 'Suppressed'].map(o => (
                <button key={o} className="text-[11px] px-3 py-2 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 text-left">{o}</button>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <RefreshCw className="w-3 h-3" /> Outcome appended to model retrain queue · weekly cadence
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

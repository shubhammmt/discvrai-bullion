import React from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { TrendingUp, Download, FileSpreadsheet } from 'lucide-react';

export default function AWNICExperiment() {
  const log = [
    { id: 'D-104412', ver: 'save-v2', ch: 'WhatsApp', cust: 'P-771204', out: 'Renewed', rev: 'AED 4,820' },
    { id: 'D-104411', ver: 'cross-home-v1', ch: 'App', cust: 'P-770588', out: 'Clicked', rev: '—' },
    { id: 'D-104410', ver: 'guardrail-TR002', ch: '—', cust: 'P-770411', out: 'Suppressed', rev: '—' },
    { id: 'D-104409', ver: 'acq-prop-v3', ch: 'Meta', cust: 'Q-48201', out: 'Bound', rev: 'AED 1,840' },
    { id: 'D-104408', ver: 'recovery-j3', ch: 'WhatsApp', cust: 'Q-48198', out: 'Recovered', rev: 'AED 2,140' },
    { id: 'D-104407', ver: 'save-v2', ch: 'Agent', cust: 'P-770702', out: 'Lost · price', rev: '—' },
    { id: 'D-104406', ver: 'cross-cyber-v1', ch: 'Email', cust: 'P-770293', out: 'Ignored', rev: '—' },
  ];

  return (
    <>
      <PageHeader eyebrow="Screen 7 · 60 seconds" title="Experimentation & Closed-Loop Attribution"
        sub="Holdout uplift · decision audit · weekly executive readout — ready by Week 10."
        right={<button className="text-xs font-semibold px-3 py-1.5 rounded text-white flex items-center gap-1" style={{ background: '#0B2D4A' }}><Download className="w-3.5 h-3.5" /> Weekly Readout PDF</button>} />
      <ArchStrip active="decision" />
      <Narration>Every decision measurable — ready for week-10 executive readout. Holdout uplift with confidence intervals; full audit log per decision.</Narration>

      <div className="px-8 pb-10 grid grid-cols-3 gap-5">
        <Card title="Holdout · Renewal save offer v2" className="col-span-2">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Save rate · 30-day window</div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-slate-600">Control · 12% holdout</span><span className="font-semibold text-slate-900">62.4%</span></div>
                  <div className="h-3 rounded bg-slate-100 overflow-hidden"><div className="h-full bg-slate-400" style={{ width: '62.4%' }} /></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1"><span className="text-teal-700 font-medium">Treatment · v2 save</span><span className="font-semibold text-teal-800">71.8%</span></div>
                  <div className="h-3 rounded bg-teal-100 overflow-hidden"><div className="h-full bg-teal-600" style={{ width: '71.8%' }} /></div>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <div className="flex items-center gap-2 text-emerald-800 font-semibold text-sm"><TrendingUp className="w-4 h-4" /> +9.4pt lift</div>
                <div className="text-[11px] text-emerald-700 mt-1">95% CI: +6.8pt to +11.9pt · n = 4,820 · p &lt; 0.01</div>
              </div>
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2">Net economics</div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between"><span className="text-slate-600">Incremental renewals</span><span className="font-semibold">453 policies</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Avg GWP per renewal</span><span className="font-semibold">AED 3,640</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Loyalty cost</span><span>AED 88 / save</span></div>
                <div className="flex justify-between"><span className="text-slate-600">Decision cost (compute)</span><span>AED 0.42</span></div>
                <div className="flex justify-between border-t border-slate-200 pt-2"><span className="text-slate-700 font-semibold">Net incremental GWP</span><span className="font-bold text-emerald-700">AED 1.61M</span></div>
                <div className="flex justify-between"><span className="text-slate-700 font-semibold">CLTV uplift (3y)</span><span className="font-bold text-blue-900">AED 4.18M</span></div>
              </div>
              <div className="mt-3 text-[11px] text-slate-500">Window · last 30d · pilot cohort 4,820 policies</div>
            </div>
          </div>
        </Card>

        <Card title="Active experiments">
          <div className="space-y-2 text-xs">
            {[
              { n: 'Renewal save v2', t: '+9.4pt', tone: 'green' as const },
              { n: 'Acquisition copy A/B', t: '+1.2pt', tone: 'teal' as const },
              { n: 'Cross-sell home v1', t: '+0.4pt', tone: 'amber' as const },
              { n: 'Recovery 2-touch vs 3-touch', t: '+2.1pt', tone: 'green' as const },
              { n: 'Channel preference learner', t: 'in flight', tone: 'slate' as const },
            ].map(e => (
              <div key={e.n} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-slate-700">{e.n}</span><Pill tone={e.tone}>{e.t}</Pill>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Decision audit log · last 7 events" className="col-span-3">
          <table className="w-full text-xs">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500">
                <th className="py-2">Decision ID</th><th>Rule / Model</th><th>Channel</th><th>Customer / Quote</th><th>Outcome</th><th>Revenue attributed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {log.map(l => (
                <tr key={l.id} className="hover:bg-slate-50">
                  <td className="py-2.5 font-mono text-slate-700">{l.id}</td>
                  <td><Pill tone="navy">{l.ver}</Pill></td>
                  <td className="text-slate-600">{l.ch}</td>
                  <td className="font-mono text-slate-700">{l.cust}</td>
                  <td className="font-medium text-slate-800">{l.out}</td>
                  <td className="font-semibold text-emerald-700">{l.rev}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
            <span>Full audit retained 24 months · exportable</span>
            <button className="flex items-center gap-1 px-2 py-1 rounded border border-slate-200 hover:bg-slate-50"><FileSpreadsheet className="w-3 h-3" /> Export CSV</button>
          </div>
        </Card>
      </div>
    </>
  );
}

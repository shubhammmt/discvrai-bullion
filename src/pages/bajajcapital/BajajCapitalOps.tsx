import React from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { opsFunnel, opsThroughput, exceptionQueue, opsKpis } from './data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

export default function BajajCapitalOps() {
  const maxFunnel = Math.max(...opsFunnel.map(f => f.count));

  return (
    <div>
      <PageHeader
        eyebrow="Demo 02 · COO command center"
        title="Ops & Onboarding Command Center"
        sub="One trustworthy view of throughput, TAT, e-mandate, and exceptions. Anomalies surfaced with explainable rules + ML — assignment is one click."
        right={<Pill tone="blue">Reads CRM / core · advisory only</Pill>}
      />

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          {opsKpis.map(k => <Kpi key={k.label} label={k.label} value={k.value} delta={k.delta} tone={k.tone} />)}
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card title="Onboarding funnel · MTD" className="col-span-2">
            <div className="space-y-2">
              {opsFunnel.map((f, i) => {
                const pct = (f.count / maxFunnel) * 100;
                const drop = i > 0 ? ((opsFunnel[i - 1].count - f.count) / opsFunnel[i - 1].count) * 100 : 0;
                return (
                  <div key={f.stage} className="flex items-center gap-3">
                    <div className="w-44 text-xs font-semibold text-slate-700">{f.stage}</div>
                    <div className="flex-1 h-7 bg-slate-100 rounded relative overflow-hidden">
                      <div className="h-full" style={{ width: `${pct}%`, background: BRAND.blue, opacity: 0.85 }} />
                      <div className="absolute inset-0 flex items-center px-2 text-[11px] text-white font-semibold">{f.count.toLocaleString()}</div>
                    </div>
                    <div className="w-20 text-right text-[11px] text-slate-500">{i === 0 ? '—' : `↓ ${drop.toFixed(1)}%`}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 rounded-lg p-3 text-xs" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#0F1F4D' }}>
              <Sparkles className="w-3.5 h-3.5 inline mr-1" />
              <span className="font-semibold">Largest drop:</span> e-Mandate signing (-17%). Retry agent in shadow-mode is recovering 21% of failures with a second-attempt nudge.
            </div>
          </Card>

          <Card title="Weekly throughput · last 6 days">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={opsThroughput} margin={{ top: 10 }}>
                  <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Bar dataKey="completed" fill={BRAND.blue} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="exceptions" fill={BRAND.amber} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Blue: completed · Amber: exceptions routed to humans</div>
          </Card>
        </div>

        <Card title="Exception queue · live" right={<Pill tone="red">1 surveillance alert</Pill>}>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <th className="py-2 pr-3">ID</th>
                <th className="py-2 pr-3">Queue</th>
                <th className="py-2 pr-3">Age</th>
                <th className="py-2 pr-3">Reason</th>
                <th className="py-2 pr-3">Risk</th>
                <th className="py-2 pr-3">Owner</th>
                <th className="py-2 pr-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {exceptionQueue.map(x => (
                <tr key={x.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 pr-3 font-mono text-xs text-slate-700">{x.id}</td>
                  <td className="py-3 pr-3 text-slate-800">{x.queue}</td>
                  <td className="py-3 pr-3 text-slate-600">{x.age}</td>
                  <td className="py-3 pr-3 text-slate-600 text-xs">{x.reason}</td>
                  <td className="py-3 pr-3"><Pill tone={x.risk === 'Red' ? 'red' : x.risk === 'Amber' ? 'amber' : 'green'}>{x.risk}</Pill></td>
                  <td className="py-3 pr-3 text-slate-600 text-xs">{x.owner}</td>
                  <td className="py-3 pr-3 text-right">
                    <button className="text-[11px] px-3 py-1.5 rounded text-white font-medium inline-flex items-center gap-1" style={{ background: BRAND.blue }}>
                      Assign <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Anomaly drill-down · EX-7841 (synthetic)" right={<Pill tone="red">Rule + ML flag</Pill>}>
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-rose-200 bg-rose-50 p-3">
              <div className="flex items-center gap-2 text-rose-800 font-semibold text-sm"><AlertTriangle className="w-4 h-4" /> Why flagged</div>
              <ul className="mt-2 text-xs text-slate-700 space-y-1.5">
                <li>· Redemption value $48K vs cohort median $4.2K (~6σ)</li>
                <li>· Account age 14 days · velocity rule triggered</li>
                <li>· Beneficiary added 2h before redemption</li>
              </ul>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Recommended action</div>
              <div className="text-sm text-slate-800">Hold disbursement · 2nd-line review · contact RM for context · disposition within 4h SLA.</div>
              <button className="mt-3 text-[11px] px-3 py-1.5 rounded text-white font-medium" style={{ background: BRAND.blue }}>Open in surveillance</button>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Audit log</div>
              <ul className="text-[11px] text-slate-600 space-y-1">
                <li>· 04:12 — Rule r-v6 fired</li>
                <li>· 04:12 — ML model anom-2.1 score 0.91</li>
                <li>· 04:13 — Auto-routed to Surveillance</li>
                <li>· 04:14 — RM notification sent</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

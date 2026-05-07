import React, { useState } from 'react';
import { SBILayout, KpiCard, Card, Pill } from './SBILayout';
import { Users, Send, FlaskConical, Handshake, TrendingUp, Play, Pause } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line,
} from 'recharts';

const tabs = [
  { id: 'segments', label: 'Segments & Propensity', icon: Users },
  { id: 'orchestration', label: 'NBO Orchestration', icon: Send },
  { id: 'experiments', label: 'Experiment Velocity', icon: FlaskConical },
  { id: 'partners', label: 'Partner-Safe Activation', icon: Handshake },
  { id: 'revenue', label: 'Revenue Impact', icon: TrendingUp },
];

const segments = [
  { name: 'New Card · 0–60d', size: 184000, activation: 62, spendUplift: 18, emi: 9, upgrade: 4 },
  { name: 'Active Spender', size: 412000, activation: 92, spendUplift: 12, emi: 14, upgrade: 8 },
  { name: 'Dormant 90d+', size: 96000, activation: 21, spendUplift: 26, emi: 4, upgrade: 2 },
  { name: 'EMI-prone', size: 127000, activation: 81, spendUplift: 9, emi: 38, upgrade: 6 },
  { name: 'Premium upgrade', size: 58000, activation: 88, spendUplift: 7, emi: 11, upgrade: 32 },
  { name: 'Co-brand · Travel', size: 102000, activation: 84, spendUplift: 16, emi: 12, upgrade: 18 },
];

const offers = [
  { id: 'O-2041', name: '5x rewards · Dining (4 weeks)', segment: 'Active Spender', channel: 'In-app', ctr: 14.6, conv: 7.2, lift: '+₹312/card', state: 'Live' },
  { id: 'O-3120', name: 'EMI · 0% on ₹15K+ spend', segment: 'EMI-prone', channel: 'Email · WhatsApp', ctr: 21.1, conv: 11.4, lift: '+₹540/card', state: 'Live' },
  { id: 'O-1872', name: 'Welcome activation · ₹500 voucher', segment: 'New Card · 0–60d', channel: 'In-app · SMS', ctr: 27.3, conv: 18.9, lift: '+9.4 pp activation', state: 'Live' },
  { id: 'O-4502', name: 'Premium upgrade · waived joining', segment: 'Premium upgrade', channel: 'In-app · RM call', ctr: 11.4, conv: 6.8, lift: '+₹1,140 ARPU', state: 'Challenger' },
  { id: 'O-2890', name: 'Dormant revival · double points', segment: 'Dormant 90d+', channel: 'Email · push', ctr: 6.1, conv: 2.4, lift: '+₹85/card', state: 'Paused' },
];

const experiments = [
  { name: 'Activation nudge cadence', vars: 'Day 2 vs Day 5 · 50/50', uplift: '+3.1 pp', conf: '97%', state: 'Promote' },
  { name: 'EMI offer copy · benefit-led vs urgency', vars: '60/40', uplift: '+1.4 pp', conf: '92%', state: 'Promote' },
  { name: 'Premium upgrade RM-assist', vars: 'Self-serve vs RM-assist', uplift: '+0.6 pp', conf: '78%', state: 'Hold' },
  { name: 'Dining 5x · channel mix', vars: 'Push only vs Push+SMS', uplift: '+2.0 pp', conf: '95%', state: 'Promote' },
];

const channels = ['App push', 'In-app banner', 'Email', 'SMS', 'WhatsApp', 'RM call', 'Partner site'].map((c, i) => ({
  ch: c,
  reach: [82, 65, 71, 88, 52, 11, 38][i],
  ctr: [12, 9, 6, 4, 17, 28, 5][i],
}));

const lift = Array.from({ length: 8 }, (_, i) => ({
  w: `W${i + 1}`,
  baseline: 100,
  control: 100 + i * 0.4,
  treatment: 100 + i * 1.3,
}));

const radar = [
  { trait: 'Activation', A: 78, B: 62 },
  { trait: 'Spend uplift', A: 86, B: 70 },
  { trait: 'EMI take-up', A: 64, B: 58 },
  { trait: 'Upgrade', A: 71, B: 55 },
  { trait: 'Cross-sell', A: 69, B: 49 },
  { trait: 'Retention', A: 82, B: 74 },
];

export default function SBIPersonalization() {
  const [tab, setTab] = useState('segments');

  return (
    <SBILayout
      title="Real-Time Personalization Studio"
      subtitle="SBI Card · Demo 02"
      tabs={tabs}
      active={tab}
      onChange={setTab}
    >
      {tab === 'segments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <KpiCard label="Addressable cards" value="9.4 M" sub="active + dormant pool" />
            <KpiCard label="Live segments" value="48" sub="propensity-scored daily" />
            <KpiCard label="Decision velocity" value="120 ms" delta="−40 ms" tone="up" sub="real-time API p95" />
            <KpiCard label="Activation uplift" value="+12.4 pp" delta="vs control" tone="up" sub="last 90 days" />
            <KpiCard label="Spend / active card" value="+₹284" delta="+9.6%" tone="up" sub="incremental" />
          </div>
          <Card title="Segment propensity matrix" subtitle="Higher = more responsive · scored daily">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Segment</th>
                  <th className="text-right">Size</th>
                  <th className="text-right">Activation</th>
                  <th className="text-right">Spend uplift</th>
                  <th className="text-right">EMI take-up</th>
                  <th className="text-right">Upgrade</th>
                  <th className="text-left pl-4">Top action</th>
                </tr>
              </thead>
              <tbody>
                {segments.map((s) => (
                  <tr key={s.name} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-medium text-slate-800">{s.name}</td>
                    <td className="text-right">{(s.size / 1000).toFixed(0)}K</td>
                    <td className="text-right">{s.activation}</td>
                    <td className="text-right">{s.spendUplift}</td>
                    <td className="text-right">{s.emi}</td>
                    <td className="text-right">{s.upgrade}</td>
                    <td className="pl-4 text-xs text-[#1E2761]">{
                      s.activation < 30 ? 'Revival sequence · 4 touch' :
                      s.upgrade > 20 ? 'Premium nudge in-app + RM' :
                      s.emi > 30 ? 'Pre-approved 0% EMI' : 'Category accelerator (5x)'
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="grid grid-cols-2 gap-5">
            <Card title="Personalized vs broadcast — outcome radar">
              <ResponsiveContainer width="100%" height={260}>
                <RadarChart data={radar}>
                  <PolarGrid stroke="#e2e8f0" />
                  <PolarAngleAxis dataKey="trait" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fontSize: 10 }} />
                  <Radar name="Personalized" dataKey="A" stroke="#1E2761" fill="#1E2761" fillOpacity={0.3} />
                  <Radar name="Broadcast control" dataKey="B" stroke="#94a3b8" fill="#94a3b8" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="What we already do well · what's the next layer">
              <div className="space-y-3 text-sm">
                <div className="flex gap-3">
                  <Pill tone="blue">Foundation</Pill>
                  <span className="text-slate-700">Segmentation, journey campaigns, RM tools, partner offers</span>
                </div>
                <div className="flex gap-3">
                  <Pill tone="emerald">Next layer</Pill>
                  <span className="text-slate-700">Real-time NBO at decision point, with explainable rationale per customer</span>
                </div>
                <div className="flex gap-3">
                  <Pill tone="amber">Velocity</Pill>
                  <span className="text-slate-700">A/B tests run 3–4× faster · automatic winner promotion</span>
                </div>
                <div className="flex gap-3">
                  <Pill tone="rose">Discipline</Pill>
                  <span className="text-slate-700">Incremental lift measurement, not vanity click metrics</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'orchestration' && (
        <div className="space-y-6">
          <Card title="Live offer book" subtitle="Champion / challenger split managed automatically">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">ID</th>
                  <th className="text-left">Offer</th>
                  <th className="text-left">Segment</th>
                  <th className="text-left">Channels</th>
                  <th className="text-right">CTR %</th>
                  <th className="text-right">Conv %</th>
                  <th className="text-left">Incremental lift</th>
                  <th className="text-left">State</th>
                </tr>
              </thead>
              <tbody>
                {offers.map((o) => (
                  <tr key={o.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-xs">{o.id}</td>
                    <td className="font-medium text-slate-800">{o.name}</td>
                    <td className="text-slate-700">{o.segment}</td>
                    <td className="text-xs text-slate-600">{o.channel}</td>
                    <td className="text-right">{o.ctr}</td>
                    <td className="text-right">{o.conv}</td>
                    <td className="text-emerald-700 text-xs font-semibold">{o.lift}</td>
                    <td>
                      <Pill tone={o.state === 'Live' ? 'emerald' : o.state === 'Challenger' ? 'amber' : 'slate'}>
                        {o.state === 'Paused' ? <Pause className="w-3 h-3 inline mr-1" /> : <Play className="w-3 h-3 inline mr-1" />}{o.state}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="grid grid-cols-2 gap-5">
            <Card title="Channel performance" subtitle="Reach × CTR matrix · last 14 days">
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={channels}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="ch" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={60} />
                  <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Bar yAxisId="l" dataKey="reach" name="Reach %" fill="#1E2761" radius={[4, 4, 0, 0]} />
                  <Bar yAxisId="r" dataKey="ctr" name="CTR %" fill="#5C6BC0" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Decision flow · NBO selection" subtitle="What happens when a customer opens the app">
              <div className="space-y-3 text-sm">
                {[
                  ['1', 'Identify customer · pull live profile + 90d signals', '12 ms'],
                  ['2', 'Score top 8 candidate offers via ranker model', '34 ms'],
                  ['3', 'Apply business rules · eligibility · frequency caps', '8 ms'],
                  ['4', 'Honor consent + channel preference', '4 ms'],
                  ['5', 'Return ranked NBO with reason codes', '6 ms'],
                ].map(([n, t, ms]) => (
                  <div key={n} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#1E2761] text-white text-xs flex items-center justify-center font-bold shrink-0">{n}</div>
                    <div className="flex-1 text-slate-800">{t}</div>
                    <Pill tone="blue">{ms}</Pill>
                  </div>
                ))}
                <div className="text-xs text-slate-500 pt-2 border-t border-slate-100">Total p95 latency: ~120 ms · all decisions logged + replayable</div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'experiments' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Active experiments" value="34" sub="across 12 segments" />
            <KpiCard label="Avg. time-to-winner" value="9 days" delta="vs 24" tone="up" />
            <KpiCard label="Auto-promoted this month" value="11" sub="champion–challenger" />
            <KpiCard label="Cumulative lift captured" value="+₹4.8 Cr" tone="up" sub="incremental, 90-day" />
          </div>
          <Card title="Experiment register">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Experiment</th>
                  <th className="text-left">Variants</th>
                  <th className="text-right">Uplift</th>
                  <th className="text-right">Confidence</th>
                  <th className="text-left pl-4">Decision</th>
                </tr>
              </thead>
              <tbody>
                {experiments.map((e) => (
                  <tr key={e.name} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-medium text-slate-800">{e.name}</td>
                    <td className="text-slate-700">{e.vars}</td>
                    <td className="text-right text-emerald-700 font-semibold">{e.uplift}</td>
                    <td className="text-right">{e.conf}</td>
                    <td className="pl-4">
                      <Pill tone={e.state === 'Promote' ? 'emerald' : 'amber'}>{e.state}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title="Cumulative incremental lift" subtitle="Treatment vs control vs baseline">
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={lift}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="w" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line type="monotone" dataKey="baseline" stroke="#cbd5e1" strokeDasharray="4 4" dot={false} />
                <Line type="monotone" dataKey="control" stroke="#94a3b8" dot={false} />
                <Line type="monotone" dataKey="treatment" stroke="#1E2761" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {tab === 'partners' && (
        <div className="space-y-6">
          <Card title="Issuer-side decisioning · partner-safe" subtitle="Co-brand activation without sharing transaction-level data">
            <div className="grid grid-cols-3 gap-4">
              {[
                { p: 'Travel co-brand', segs: 12, offers: 18, share: 'Masked aggregates only', status: 'Active' },
                { p: 'Retail co-brand', segs: 8, offers: 11, share: 'Masked aggregates only', status: 'Active' },
                { p: 'Fuel co-brand', segs: 5, offers: 7, share: 'Masked aggregates only', status: 'Active' },
              ].map((p) => (
                <div key={p.p} className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-900">{p.p}</div>
                  <div className="text-xs text-slate-500 mt-2">{p.segs} segments · {p.offers} offers</div>
                  <div className="text-xs text-slate-600 mt-2">{p.share}</div>
                  <Pill tone="emerald">{p.status}</Pill>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-lg bg-blue-50 border border-blue-100 p-4 text-xs text-slate-700">
              <span className="font-semibold text-[#1E2761]">Data discipline:</span> partners receive only the
              decisioning output (e.g. eligible / not eligible · tier) — no PII, no transaction data, no scores leave the SBI Card boundary.
            </div>
          </Card>
        </div>
      )}

      {tab === 'revenue' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Incremental spend (90d)" value="₹187 Cr" delta="+12.4%" tone="up" />
            <KpiCard label="Conversion uplift" value="+9.7 pp" delta="vs broadcast" tone="up" />
            <KpiCard label="CPA · personalized" value="₹312" delta="−18%" tone="up" />
            <KpiCard label="Marketing ROAS" value="6.4x" delta="+1.7x" tone="up" />
          </div>
          <Card title="Top 5 growth levers · CSMO view">
            <div className="space-y-3">
              {[
                { l: 'EMI 0% on ₹15K+ spend (Active Spender)', v: '+₹38 Cr' },
                { l: 'Activation NBA · 48h post-issuance', v: '+9.4 pp activation' },
                { l: 'Premium upgrade · in-app + RM', v: '+₹1,140 ARPU/upgrade' },
                { l: 'Dormant revival · double-points 30d', v: '+₹85/card on revived 12K' },
                { l: 'Travel co-brand · 5x dining 4-week burst', v: '+₹312/card' },
              ].map((l) => (
                <div key={l.l} className="flex justify-between items-center text-sm py-2 border-b border-slate-100 last:border-0">
                  <div className="text-slate-800">{l.l}</div>
                  <Pill tone="emerald">{l.v}</Pill>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </SBILayout>
  );
}

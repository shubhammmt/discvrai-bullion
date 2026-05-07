import React, { useState } from 'react';
import { SBILayout, KpiCard, Card, Pill } from './SBILayout';
import { AlertOctagon, Sparkles, Phone, Headphones, BarChart3, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  AreaChart, Area, LineChart, Line, PieChart, Pie, Cell,
} from 'recharts';

const tabs = [
  { id: 'stress', label: 'Early Stress Detection', icon: AlertOctagon },
  { id: 'engine', label: 'Recovery NBA Engine', icon: Sparkles },
  { id: 'contact', label: 'Contact Strategy', icon: Phone },
  { id: 'agent', label: 'Agent Assist', icon: Headphones },
  { id: 'outcome', label: 'Outcome Tracker', icon: BarChart3 },
];

const cohort = [
  { band: 'Healthy · 0 risk', count: 1240000, color: '#10b981' },
  { band: 'Watch · early stress', count: 84000, color: '#f59e0b' },
  { band: 'Bucket 1 (1–30 dpd)', count: 38000, color: '#fb923c' },
  { band: 'Bucket 2 (31–60 dpd)', count: 12400, color: '#ef4444' },
  { band: 'Bucket 3 (61–90 dpd)', count: 5200, color: '#dc2626' },
  { band: 'Bucket 4+ (90+ dpd)', count: 2100, color: '#7f1d1d' },
];

const stressSignals = [
  { sig: 'Spend velocity drop > 40% MoM', weight: 0.22, count: 9400 },
  { sig: 'Min-due-only payments × 2', weight: 0.19, count: 6200 },
  { sig: 'Cash-advance utilization > 30%', weight: 0.17, count: 3100 },
  { sig: 'Credit-line utilization > 90%', weight: 0.14, count: 11200 },
  { sig: 'Multiple bureau enquiries (60d)', weight: 0.11, count: 7800 },
  { sig: 'Auto-debit failure', weight: 0.09, count: 5400 },
  { sig: 'Salary credit irregularity', weight: 0.08, count: 4100 },
];

const customers = [
  { id: 'C-220411', cust: '****4621', risk: 'Watch', score: 64, exposure: '₹1.4 L', tenure: '4 y', nba: 'Soft reminder · WhatsApp', value: 'High' },
  { id: 'C-220412', cust: '****8810', risk: 'Bucket 1', score: 78, exposure: '₹2.8 L', tenure: '7 y', nba: 'EMI conversion offer', value: 'High · retain' },
  { id: 'C-220413', cust: '****3320', risk: 'Bucket 2', score: 86, exposure: '₹98 K', tenure: '2 y', nba: 'Restructuring · 12-month plan', value: 'Medium' },
  { id: 'C-220414', cust: '****1077', risk: 'Watch', score: 58, exposure: '₹4.2 L', tenure: '11 y', nba: 'Service intervention · RM call', value: 'Top · protect' },
  { id: 'C-220415', cust: '****6532', risk: 'Bucket 3', score: 92, exposure: '₹1.8 L', tenure: '5 y', nba: 'Assisted call · settlement options', value: 'Medium' },
];

const channelMix = [
  { ch: 'WhatsApp', best: 38, alt: 22 },
  { ch: 'IVR · auto', best: 14, alt: 18 },
  { ch: 'Agent call', best: 22, alt: 28 },
  { ch: 'Email', best: 9, alt: 16 },
  { ch: 'SMS', best: 12, alt: 10 },
  { ch: 'In-app', best: 5, alt: 6 },
];

const trend = Array.from({ length: 12 }, (_, i) => ({
  m: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'][i],
  cure: 38 + i * 0.7 + Math.random(),
  roll: 11 - i * 0.18 + Math.random() * 0.5,
  cost: 124 - i * 1.4 + Math.random() * 4,
}));

export default function SBILifecycle() {
  const [tab, setTab] = useState('stress');

  return (
    <SBILayout
      title="Lifecycle Risk & Recovery Orchestrator"
      subtitle="SBI Card · Demo 04"
      tabs={tabs}
      active={tab}
      onChange={setTab}
    >
      {tab === 'stress' && (
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <KpiCard label="Active accounts" value="13.8 M" sub="watched daily" />
            <KpiCard label="Early-stress flagged" value="84,000" sub="14d horizon" />
            <KpiCard label="Predicted roll-forward saved" value="−14%" tone="up" delta="vs control" />
            <KpiCard label="Top-tier value protected" value="₹62 Cr" sub="annualised LTV" />
            <KpiCard label="False-positive rate" value="6.4%" delta="−2.1 pp" tone="up" />
          </div>
          <div className="grid grid-cols-3 gap-5">
            <Card title="Cohort risk map" subtitle="Portfolio segmentation by stress band" className="col-span-1">
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={cohort} dataKey="count" nameKey="band" innerRadius={50} outerRadius={90}>
                    {cohort.map((c, i) => <Cell key={i} fill={c.color} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-1.5 mt-2">
                {cohort.map((c) => (
                  <div key={c.band} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded" style={{ background: c.color }} />
                      {c.band}
                    </div>
                    <span className="font-semibold text-slate-700">{c.count.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Predictive stress signals · contribution" className="col-span-2">
              <table className="w-full text-sm">
                <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-2.5">Signal</th>
                    <th className="text-right">Model weight</th>
                    <th className="text-right">Customers tripping</th>
                    <th className="text-left pl-4">Lead time</th>
                  </tr>
                </thead>
                <tbody>
                  {stressSignals.map((s) => (
                    <tr key={s.sig} className="border-b border-slate-100">
                      <td className="py-2.5 text-slate-800">{s.sig}</td>
                      <td className="text-right font-semibold">{(s.weight * 100).toFixed(0)}%</td>
                      <td className="text-right">{s.count.toLocaleString()}</td>
                      <td className="pl-4 text-xs text-slate-500">~14–28 days before delinquency</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-3 text-xs text-slate-500">
                Model is monitored for fairness, drift and bias; explainability shipped with each prediction.
              </div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'engine' && (
        <div className="space-y-6">
          <Card title="Best next action by customer" subtitle="Responsible recovery · human-in-the-loop on high-impact decisions">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Case</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Risk band</th>
                  <th className="text-right">Stress score</th>
                  <th className="text-right">Exposure</th>
                  <th className="text-left">Tenure</th>
                  <th className="text-left">Recommended NBA</th>
                  <th className="text-left">LTV tag</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-xs">{c.id}</td>
                    <td>{c.cust}</td>
                    <td><Pill tone={c.risk === 'Watch' ? 'amber' : c.risk === 'Bucket 1' ? 'amber' : 'rose'}>{c.risk}</Pill></td>
                    <td className="text-right">{c.score}</td>
                    <td className="text-right">{c.exposure}</td>
                    <td>{c.tenure}</td>
                    <td className="text-xs text-[#1E2761] font-semibold">{c.nba}</td>
                    <td className="text-xs"><Pill tone={c.value.includes('Top') ? 'emerald' : c.value.includes('High') ? 'blue' : 'slate'}>{c.value}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="grid grid-cols-4 gap-4">
            {[
              { l: 'Soft reminders dispatched', v: '46,800' },
              { l: 'EMI conversions accepted', v: '7,420' },
              { l: 'Restructurings approved', v: '1,180' },
              { l: 'Service interventions logged', v: '3,940' },
            ].map((k) => <KpiCard key={k.l} label={k.l} value={k.v} />)}
          </div>
        </div>
      )}

      {tab === 'contact' && (
        <div className="space-y-6">
          <Card title="Channel preference · best vs alternate" subtitle="Optimised for response × cost × customer comfort">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={channelMix}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="ch" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="best" name="Optimised mix %" fill="#1E2761" radius={[4, 4, 0, 0]} />
                <Bar dataKey="alt" name="Current mix %" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <div className="grid grid-cols-2 gap-5">
            <Card title="Best time-of-day windows">
              <div className="space-y-2.5 text-sm">
                {[
                  { t: '10:30 – 12:00 IST', a: 'Salaried · pre-lunch · WhatsApp + SMS', r: '32% response' },
                  { t: '15:30 – 17:00 IST', a: 'Self-employed · post-cashflow · IVR + agent', r: '28% response' },
                  { t: '19:00 – 20:30 IST', a: 'Family decision window · WhatsApp', r: '41% response' },
                  { t: 'Saturday 11:00 – 13:00', a: 'High-value · RM-led · scheduled call', r: '54% response' },
                ].map((x) => (
                  <div key={x.t} className="flex items-center justify-between border border-slate-200 rounded-lg p-3">
                    <div>
                      <div className="font-semibold text-slate-800">{x.t}</div>
                      <div className="text-xs text-slate-500">{x.a}</div>
                    </div>
                    <Pill tone="emerald">{x.r}</Pill>
                  </div>
                ))}
              </div>
            </Card>
            <Card title="Message sequencing · responsible recovery">
              <ol className="space-y-3 text-sm text-slate-800">
                {[
                  ['T+1', 'Soft WhatsApp reminder · helpful tone · payment options'],
                  ['T+5', 'EMI conversion offer · in-app + WhatsApp · explainable rationale'],
                  ['T+10', 'Service intervention call for high-LTV · empathy script'],
                  ['T+15', 'Restructuring proposal · documented · dual-approval'],
                  ['T+25', 'Assisted recovery · L2 agent · with consent capture'],
                ].map(([t, m], i) => (
                  <li key={t} className="flex gap-3">
                    <span className="w-12 text-xs font-mono text-slate-500 pt-0.5">{t}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-4 text-xs text-slate-500">No coercive language · all sequences pass compliance & fairness review · opt-out honoured immediately.</div>
            </Card>
          </div>
        </div>
      )}

      {tab === 'agent' && (
        <div className="space-y-6">
          <Card title="Prioritised call queue · agent assist workspace">
            <div className="grid grid-cols-3 gap-4">
              {customers.slice(0, 3).map((c) => (
                <div key={c.id} className="rounded-xl border border-slate-200 p-5 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-slate-900">{c.cust}</div>
                    <Pill tone={c.risk === 'Bucket 2' ? 'rose' : 'amber'}>{c.risk}</Pill>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600">
                    <div><span className="text-slate-400">Exposure</span><div className="text-slate-900 font-medium">{c.exposure}</div></div>
                    <div><span className="text-slate-400">Tenure</span><div className="text-slate-900 font-medium">{c.tenure}</div></div>
                    <div><span className="text-slate-400">Stress</span><div className="text-slate-900 font-medium">{c.score}/100</div></div>
                    <div><span className="text-slate-400">LTV</span><div className="text-slate-900 font-medium">{c.value}</div></div>
                  </div>
                  <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs">
                    <div className="text-[10px] uppercase tracking-wider text-[#1E2761] font-semibold mb-1">Recommended action</div>
                    <div className="text-slate-800 font-medium">{c.nba}</div>
                    <div className="text-[11px] text-slate-600 mt-1">Why: high LTV · responsive on WhatsApp · no recent service complaint.</div>
                  </div>
                  <button className="mt-3 w-full text-xs px-3 py-2 rounded bg-[#1E2761] text-white hover:bg-[#2A3A95]">Open script · log outcome</button>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Compliance-aware action log (sample)">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Time</th>
                  <th className="text-left">Agent</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Action</th>
                  <th className="text-left">Consent</th>
                  <th className="text-left">Outcome</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['12:14', 'A-204', '****8810', 'EMI offer presented', 'Verbal · recorded', 'Accepted · ₹2.8 L over 12m'],
                  ['12:09', 'A-118', '****3320', 'Restructuring discussed', 'Documented', 'Awaiting customer review'],
                  ['11:58', 'A-204', '****1077', 'Service intervention', 'On record', 'Issue resolved · retained'],
                ].map((r) => (
                  <tr key={r.join('-')} className="border-b border-slate-100">
                    {r.map((x, i) => <td key={i} className="py-2 text-slate-700">{x}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'outcome' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Cure rate · Bucket 1" value="48.4%" delta="+6.1 pp" tone="up" />
            <KpiCard label="Roll-forward · 30→60" value="9.2%" delta="−2.4 pp" tone="up" />
            <KpiCard label="Recovery cost / ₹100" value="₹4.20" delta="−₹0.80" tone="up" />
            <KpiCard label="Retained value (90d)" value="₹62 Cr" tone="up" />
          </div>
          <Card title="Cure / roll-rate / cost trend (12 months)">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line yAxisId="l" type="monotone" dataKey="cure" name="Cure %" stroke="#10b981" strokeWidth={2} dot={false} />
                <Line yAxisId="l" type="monotone" dataKey="roll" name="Roll-forward %" stroke="#dc2626" strokeWidth={2} dot={false} />
                <Line yAxisId="r" type="monotone" dataKey="cost" name="Recovery cost / ₹100" stroke="#1E2761" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Governance commitments">
            <ul className="space-y-2 text-sm text-slate-700">
              {[
                'Customer protection & fairness reviews on every recovery model',
                'Opt-out honoured immediately across all channels',
                'Human-in-the-loop on restructuring & write-offs',
                'Full audit trail per action · monthly compliance readout',
              ].map((g) => (
                <li key={g} className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" />{g}</li>
              ))}
            </ul>
          </Card>
        </div>
      )}
    </SBILayout>
  );
}

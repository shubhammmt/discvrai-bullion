import React, { useEffect, useState } from 'react';
import { SBILayout, KpiCard, Card, Pill } from './SBILayout';
import { Activity, ShieldX, ListChecks, SlidersHorizontal, BarChart3, AlertTriangle, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  BarChart, Bar, ScatterChart, Scatter, ZAxis,
} from 'recharts';

const tabs = [
  { id: 'stream', label: 'Real-Time Risk Stream', icon: Activity },
  { id: 'declines', label: 'False-Decline Intelligence', icon: ShieldX },
  { id: 'cases', label: 'Case Prioritization', icon: ListChecks },
  { id: 'tuning', label: 'Rule + Model Tuning', icon: SlidersHorizontal },
  { id: 'scorecard', label: 'Executive Scorecard', icon: BarChart3 },
];

const merchants = ['Online · Travel', 'POS · Dining', 'eCom · Electronics', 'POS · Fuel', 'ATM · Cash', 'Recurring · Subscriptions'];
const channels = ['Web', 'App', 'POS', 'ATM', 'Recurring', 'Tap'];
const stat = ['Approved', 'Reviewed', 'Blocked'];

function makeTxn(id: number) {
  const score = Math.random();
  const decision = score > 0.92 ? 'Blocked' : score > 0.78 ? 'Reviewed' : 'Approved';
  return {
    id: `T-${(900000 + id).toString()}`,
    time: new Date(Date.now() - id * 4_300).toLocaleTimeString('en-IN', { hour12: false }),
    amt: Math.round(200 + Math.random() * 48000),
    mcc: merchants[Math.floor(Math.random() * merchants.length)],
    ch: channels[Math.floor(Math.random() * channels.length)],
    risk: Math.round(score * 100),
    geo: ['Mumbai', 'Delhi', 'BLR', 'CCU', 'HYD', 'Singapore', 'Dubai'][Math.floor(Math.random() * 7)],
    device: Math.random() > 0.85 ? 'New device' : 'Known device',
    decision,
  };
}

const cases = [
  { id: 'C-44012', cust: '****8421', score: 92, exp: '₹64,200', conf: 0.91, age: '3 m', rec: 'Block + verify' },
  { id: 'C-44013', cust: '****1109', score: 88, exp: '₹48,750', conf: 0.84, age: '8 m', rec: 'Step-up auth' },
  { id: 'C-44014', cust: '****7203', score: 79, exp: '₹22,400', conf: 0.62, age: '14 m', rec: 'Review · pass to L2' },
  { id: 'C-44015', cust: '****3318', score: 74, exp: '₹17,900', conf: 0.71, age: '4 m', rec: 'Approve · soft alert' },
  { id: 'C-44016', cust: '****9050', score: 96, exp: '₹1,12,400', conf: 0.95, age: '21 m', rec: 'Block + freeze · L1 call' },
];

const trend = Array.from({ length: 14 }, (_, i) => ({
  d: `D-${14 - i}`,
  loss: 12 - i * 0.4 + Math.random() * 1.5,
  fp: 6.4 - i * 0.18 + Math.random() * 0.6,
  latency: 240 - i * 6 + Math.random() * 12,
}));

const ruleVsModel = [
  { dim: 'Card-not-present', rule: 71, model: 86 },
  { dim: 'Cross-border', rule: 68, model: 84 },
  { dim: 'High-velocity', rule: 64, model: 81 },
  { dim: 'New device', rule: 59, model: 78 },
  { dim: 'Recurring fraud', rule: 52, model: 74 },
];

const declineSamples = [
  { id: 'T-908741', amt: '₹62,400', mcc: 'Travel', why: 'Cross-border first-time', verdict: 'False decline · refund + apology', value: 'Saved ₹62K + LTV' },
  { id: 'T-908755', amt: '₹18,200', mcc: 'Electronics', why: 'New device', verdict: 'Step-up auth would have approved', value: 'Avoid friction loss' },
  { id: 'T-908790', amt: '₹4,100', mcc: 'Subscriptions', why: 'Velocity rule', verdict: 'Approve · loosen velocity for known recurrent', value: 'Prevent churn' },
  { id: 'T-908812', amt: '₹35,900', mcc: 'POS · Jewellery', why: 'High ticket', verdict: 'Approve via geo + device match', value: 'Premium customer NPS' },
];

export default function SBIFraud() {
  const [tab, setTab] = useState('stream');
  const [stream, setStream] = useState(() => Array.from({ length: 12 }, (_, i) => makeTxn(i)));

  useEffect(() => {
    if (tab !== 'stream') return;
    const t = setInterval(() => {
      setStream((prev) => [makeTxn(Math.floor(Math.random() * 100000)), ...prev].slice(0, 14));
    }, 1800);
    return () => clearInterval(t);
  }, [tab]);

  return (
    <SBILayout
      title="Fraud Friction Optimizer"
      subtitle="SBI Card · Demo 03"
      tabs={tabs}
      active={tab}
      onChange={setTab}
    >
      {tab === 'stream' && (
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <KpiCard label="Txns / min" value="1,284" sub="rolling avg" />
            <KpiCard label="Live risk score (avg)" value="14.2" sub="0–100 scale" />
            <KpiCard label="Decision latency p95" value="184 ms" delta="−56 ms" tone="up" />
            <KpiCard label="Blocks (last hour)" value="42" sub="0.05% of stream" />
            <KpiCard label="False-decline rate" value="3.4%" delta="−1.8 pp" tone="up" />
          </div>
          <Card title="Live transaction stream" subtitle="Demo data · risk-scored in real time">
            <div className="overflow-hidden rounded border border-slate-200">
              <table className="w-full text-sm">
                <thead className="text-[11px] uppercase text-slate-500 bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="text-left py-2 pl-3">Time</th>
                    <th className="text-left">Txn ID</th>
                    <th className="text-right">Amount</th>
                    <th className="text-left">Merchant</th>
                    <th className="text-left">Channel</th>
                    <th className="text-left">Geo</th>
                    <th className="text-left">Device</th>
                    <th className="text-right">Risk</th>
                    <th className="text-left pl-3">Decision</th>
                  </tr>
                </thead>
                <tbody>
                  {stream.map((t) => (
                    <tr key={t.id} className="border-b border-slate-100 last:border-0">
                      <td className="py-2 pl-3 font-mono text-xs text-slate-500">{t.time}</td>
                      <td className="font-mono text-xs">{t.id}</td>
                      <td className="text-right">₹{t.amt.toLocaleString()}</td>
                      <td>{t.mcc}</td>
                      <td>{t.ch}</td>
                      <td>{t.geo}</td>
                      <td className={t.device === 'New device' ? 'text-amber-700 text-xs' : 'text-xs text-slate-600'}>{t.device}</td>
                      <td className="text-right">
                        <span className={`font-semibold ${t.risk > 78 ? 'text-rose-600' : t.risk > 60 ? 'text-amber-600' : 'text-emerald-600'}`}>{t.risk}</span>
                      </td>
                      <td className="pl-3">
                        <Pill tone={t.decision === 'Blocked' ? 'rose' : t.decision === 'Reviewed' ? 'amber' : 'emerald'}>{t.decision}</Pill>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
          <div className="grid grid-cols-2 gap-5">
            <Card title="Loss & friction trend (14 days)">
              <ResponsiveContainer width="100%" height={220}>
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="d" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line yAxisId="l" type="monotone" dataKey="loss" name="Fraud loss (₹L)" stroke="#dc2626" dot={false} />
                  <Line yAxisId="l" type="monotone" dataKey="fp" name="False-decline %" stroke="#f59e0b" dot={false} />
                  <Line yAxisId="r" type="monotone" dataKey="latency" name="Latency ms" stroke="#1E2761" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Risk × value scatter" subtitle="Higher-right = high-loss potential">
              <ResponsiveContainer width="100%" height={220}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis type="number" dataKey="risk" name="Risk" tick={{ fontSize: 11 }} domain={[0, 100]} />
                  <YAxis type="number" dataKey="amt" name="Amount" tick={{ fontSize: 11 }} />
                  <ZAxis range={[40, 200]} />
                  <Tooltip />
                  <Scatter data={stream} fill="#1E2761" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </div>
      )}

      {tab === 'declines' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="False-decline rate" value="3.4%" delta="−1.8 pp" tone="up" />
            <KpiCard label="Lost spend (recovered)" value="₹4.7 Cr" sub="last 30 days" />
            <KpiCard label="Customer frustration proxy" value="−27%" tone="up" sub="re-attempt churn" />
            <KpiCard label="Recoverable cohort" value="14,200" sub="this week" />
          </div>
          <Card title="Sample false-declines · with fix recommendation">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Txn</th>
                  <th className="text-right">Amount</th>
                  <th className="text-left">Merchant</th>
                  <th className="text-left">Reason fired</th>
                  <th className="text-left">Recommended verdict</th>
                  <th className="text-left">Value to SBI</th>
                </tr>
              </thead>
              <tbody>
                {declineSamples.map((d) => (
                  <tr key={d.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-xs">{d.id}</td>
                    <td className="text-right">{d.amt}</td>
                    <td>{d.mcc}</td>
                    <td className="text-amber-700 text-xs">{d.why}</td>
                    <td className="text-emerald-700 text-xs">{d.verdict}</td>
                    <td className="text-xs text-slate-600">{d.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}

      {tab === 'cases' && (
        <div className="space-y-6">
          <Card title="Analyst worklist · prioritized by expected loss × confidence">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Case</th>
                  <th className="text-left">Customer</th>
                  <th className="text-right">Risk</th>
                  <th className="text-right">Expected loss</th>
                  <th className="text-right">Confidence</th>
                  <th className="text-left">Tenure</th>
                  <th className="text-left">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {cases.map((c) => (
                  <tr key={c.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-xs">{c.id}</td>
                    <td>{c.cust}</td>
                    <td className="text-right text-rose-600 font-semibold">{c.score}</td>
                    <td className="text-right">{c.exp}</td>
                    <td className="text-right">{(c.conf * 100).toFixed(0)}%</td>
                    <td>{c.age}</td>
                    <td className="text-xs text-[#1E2761] font-semibold">{c.rec}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <div className="grid grid-cols-3 gap-4">
            <KpiCard label="Cases / analyst / hour" value="11.2" delta="+38%" tone="up" />
            <KpiCard label="Median time-to-disposition" value="3.8 min" delta="−1.6 min" tone="up" />
            <KpiCard label="Loss prevented (week)" value="₹1.1 Cr" tone="up" />
          </div>
        </div>
      )}

      {tab === 'tuning' && (
        <div className="space-y-6">
          <Card title="Rule vs model assist · accuracy by attack pattern">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={ruleVsModel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="dim" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="rule" name="Existing rules" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="model" name="Model-assisted policy" fill="#1E2761" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card title="Champion vs challenger · controlled rollout" subtitle="5% slice for 14 days · auto-promote on stat-sig win">
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs text-slate-500">Champion (current)</div>
                <div className="text-lg font-bold text-slate-900 mt-1">Rule-only baseline</div>
                <div className="text-xs text-slate-600 mt-2">Loss/M: ₹4.6 Cr · FD: 5.2%</div>
              </div>
              <div className="rounded-lg border border-blue-200 p-4 bg-blue-50">
                <div className="text-xs text-[#1E2761] font-semibold">Challenger A</div>
                <div className="text-lg font-bold text-slate-900 mt-1">Model + step-up auth</div>
                <div className="text-xs text-slate-700 mt-2">Loss/M: ₹3.2 Cr · FD: 3.4%</div>
                <Pill tone="emerald">Promote</Pill>
              </div>
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs text-slate-500">Challenger B</div>
                <div className="text-lg font-bold text-slate-900 mt-1">Model + soft reject</div>
                <div className="text-xs text-slate-600 mt-2">Loss/M: ₹3.7 Cr · FD: 4.1%</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === 'scorecard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-4 gap-4">
            <KpiCard label="Fraud prevented (90d)" value="₹14.6 Cr" tone="up" />
            <KpiCard label="False declines reduced" value="−34%" tone="up" />
            <KpiCard label="Decision latency p95" value="184 ms" tone="up" />
            <KpiCard label="Analyst throughput" value="+38%" tone="up" />
          </div>
          <Card title="Executive note · CSMO + Risk leadership">
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" /> Overlay on existing fraud stack — no rip-and-replace.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" /> Champion–challenger ensures every change is value-proven before rollout.</li>
              <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5" /> Customer experience improved alongside loss reduction — a non-trivial combination.</li>
              <li className="flex gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /> All blocks include clear customer comms + 1-tap re-attempt path with step-up auth.</li>
            </ul>
          </Card>
        </div>
      )}
    </SBILayout>
  );
}

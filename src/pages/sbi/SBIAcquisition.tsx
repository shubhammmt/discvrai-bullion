import React, { useMemo, useState } from 'react';
import { SBILayout, KpiCard, Card, Pill } from './SBILayout';
import {
  Gauge, Activity, GitBranch, ScrollText, Beaker, Download,
} from 'lucide-react';
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid,
  BarChart, Bar, Legend, AreaChart, Area, FunnelChart, Funnel, LabelList,
} from 'recharts';

const tabs = [
  { id: 'console', label: 'Executive KPI Console', icon: Gauge },
  { id: 'channels', label: 'Channel Intelligence', icon: Activity },
  { id: 'journey', label: 'Application Journey', icon: GitBranch },
  { id: 'explain', label: 'Decision Explainability', icon: ScrollText },
  { id: 'simulator', label: 'Scenario Simulator', icon: Beaker },
];

const trend = Array.from({ length: 12 }, (_, i) => ({
  m: ['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'][i],
  approvals: 18000 + i * 950 + Math.round(Math.random() * 1200),
  qar: 62 + i * 0.6 + Math.random() * 1.5,
  early_dq: 4.2 - i * 0.04 + Math.random() * 0.2,
}));

const channels = [
  { ch: 'Banca · SBI Branch', vol: 38400, qar: 78.4, tat: 1.6, edq: 2.1, spend: 142, rec: '+8%' },
  { ch: 'Open Market DSA', vol: 24700, qar: 61.2, tat: 2.9, edq: 4.6, spend: 64, rec: '−15%' },
  { ch: 'Digital Direct (Web/App)', vol: 31900, qar: 71.5, tat: 0.7, edq: 2.8, spend: 95, rec: '+12%' },
  { ch: 'Co-brand Partners', vol: 19800, qar: 74.0, tat: 1.2, edq: 2.4, spend: 118, rec: '+5%' },
  { ch: 'Aggregator Lead', vol: 12400, qar: 56.9, tat: 2.4, edq: 5.2, spend: 48, rec: '−22%' },
];

const journeySteps = [
  { stage: 'Lead Capture', users: 100000, drop: 0, ai: '—' },
  { stage: 'OTP & Consent', users: 86200, drop: 13.8, ai: 'OTP retry UX' },
  { stage: 'PAN + DOB', users: 79400, drop: 7.9, ai: 'Auto-fill from bureau' },
  { stage: 'Address & KYC', users: 64100, drop: 19.3, ai: 'DigiLocker prompt' },
  { stage: 'Income & Employment', users: 51800, drop: 19.2, ai: 'Bureau-assisted prefill' },
  { stage: 'Card Selection', users: 47200, drop: 8.9, ai: 'Personalised default' },
  { stage: 'Decision Issued', users: 42600, drop: 9.7, ai: 'Counter-offer for borderline' },
  { stage: 'Activation', users: 33500, drop: 21.4, ai: 'NBA nudge in 48h' },
];

const reasonCodes = [
  { code: 'R-101', label: 'Bureau score below threshold', share: 38, decision: 'Decline', note: 'Stable across cohorts' },
  { code: 'R-204', label: 'Income vs requested limit gap', share: 22, decision: 'Counter-offer', note: 'Convertible with limit reduction' },
  { code: 'R-118', label: 'Recent enquiry velocity high', share: 14, decision: 'Review', note: 'Manual analyst override eligible' },
  { code: 'R-330', label: 'Address mismatch with bureau', share: 11, decision: 'Review', note: 'DigiLocker resolves 73% cases' },
  { code: 'R-072', label: 'Existing exposure with SBI Group', share: 9, decision: 'Approve · upgrade', note: 'Cross-sell trigger' },
  { code: 'R-555', label: 'Channel quality flag', share: 6, decision: 'Decline', note: 'Watchlist channels' },
];

const sample = [
  { id: 'APP-94821', name: 'Customer 4821', score: 742, channel: 'Digital Direct', decision: 'Approve', limit: '₹2.4 L', reasons: ['R-072'] },
  { id: 'APP-94822', name: 'Customer 4822', score: 678, channel: 'Open Market DSA', decision: 'Counter-offer', limit: '₹1.1 L', reasons: ['R-204', 'R-118'] },
  { id: 'APP-94823', name: 'Customer 4823', score: 612, channel: 'Aggregator', decision: 'Decline', limit: '—', reasons: ['R-101', 'R-555'] },
  { id: 'APP-94824', name: 'Customer 4824', score: 705, channel: 'Banca · Branch', decision: 'Review', limit: '₹1.8 L', reasons: ['R-330'] },
];

export default function SBIAcquisition() {
  const [tab, setTab] = useState('console');
  const [bureau, setBureau] = useState(720);
  const [income, setIncome] = useState(40000);
  const [pol, setPol] = useState(0); // -10..10 stricter→looser

  const sim = useMemo(() => {
    const baseApprovals = 24800;
    const baseEdq = 3.6;
    const factor = 1 + pol * 0.018;
    const approvals = Math.round(baseApprovals * factor);
    const edq = +(baseEdq + pol * 0.08).toFixed(2);
    const qar = +(72 - pol * 0.6).toFixed(1);
    return { approvals, edq, qar };
  }, [pol]);

  return (
    <SBILayout
      title="Acquisition Quality Command Center"
      subtitle="SBI Card · Demo 01"
      tabs={tabs}
      active={tab}
      onChange={setTab}
      rightSlot={
        <button className="text-xs px-3 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 flex items-center gap-1.5 text-slate-700">
          <Download className="w-3.5 h-3.5" /> Weekly Business Review
        </button>
      }
    >
      {tab === 'console' && (
        <div className="space-y-6">
          <div className="grid grid-cols-5 gap-4">
            <KpiCard label="Approved accounts (MTD)" value="42,612" delta="+8.4%" tone="up" sub="vs 30-day prior" />
            <KpiCard label="Quality-adjusted approval %" value="71.8%" delta="+2.1 pp" tone="up" sub="bureau · early-DQ adjusted" />
            <KpiCard label="Onboarding completion" value="68.4%" delta="+4.7 pp" tone="up" sub="lead → activation" />
            <KpiCard label="Decision TAT (median)" value="38 sec" delta="−22 sec" tone="up" sub="straight-through cohort" />
            <KpiCard label="Early delinquency proxy" value="2.94%" delta="−0.41 pp" tone="up" sub="3-MoB DPD30+" />
          </div>

          <div className="grid grid-cols-3 gap-5">
            <Card title="Approvals & quality trend" subtitle="12-month rolling, demo data" className="col-span-2">
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
                  <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line yAxisId="l" type="monotone" dataKey="approvals" name="Approvals" stroke="#1E2761" strokeWidth={2} dot={false} />
                  <Line yAxisId="r" type="monotone" dataKey="qar" name="Quality-adjusted approval %" stroke="#10b981" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </Card>
            <Card title="Top recommendations · this week">
              <div className="space-y-3">
                {[
                  { p: 'High', t: 'Reallocate 15% spend from Aggregator → Co-brand', i: 'Expected +1,650 approvals at same QAR' },
                  { p: 'High', t: 'Auto-suggest counter-offer for R-204 cohort', i: '~22% rescue of declined applications' },
                  { p: 'Med', t: 'Trigger DigiLocker prompt at Address step', i: 'Drop-off from 19.3% → ~12%' },
                  { p: 'Med', t: 'Activation NBA nudge for last 7-day issued cards', i: '+3.4 pp activation in 48h window' },
                ].map((r) => (
                  <div key={r.t} className="flex gap-3 text-sm">
                    <Pill tone={r.p === 'High' ? 'rose' : 'amber'}>{r.p}</Pill>
                    <div>
                      <div className="text-slate-900 font-medium">{r.t}</div>
                      <div className="text-xs text-slate-500">{r.i}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Early-delinquency proxy by vintage" subtitle="Quality lens on volume growth">
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="m" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="early_dq" stroke="#1E2761" fill="#1E2761" fillOpacity={0.15} name="Early DQ %" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {tab === 'channels' && (
        <div className="space-y-6">
          <Card title="Channel quality scorecard" subtitle="Volume-weighted with quality adjustment">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={channels} layout="vertical" margin={{ left: 50 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="ch" tick={{ fontSize: 11 }} width={140} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="qar" name="Quality-Adjusted Approval %" fill="#1E2761" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Source quality & budget recommendation">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Channel</th>
                  <th className="text-right">Volume</th>
                  <th className="text-right">QAR %</th>
                  <th className="text-right">TAT (d)</th>
                  <th className="text-right">Early DQ %</th>
                  <th className="text-right">Spend ₹/lead</th>
                  <th className="text-right">Budget rec.</th>
                </tr>
              </thead>
              <tbody>
                {channels.map((c) => (
                  <tr key={c.ch} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-medium text-slate-800">{c.ch}</td>
                    <td className="text-right">{c.vol.toLocaleString()}</td>
                    <td className="text-right">{c.qar.toFixed(1)}</td>
                    <td className="text-right">{c.tat}</td>
                    <td className="text-right">{c.edq.toFixed(1)}</td>
                    <td className="text-right">₹{c.spend}</td>
                    <td className="text-right">
                      <Pill tone={c.rec.startsWith('+') ? 'emerald' : 'rose'}>{c.rec}</Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-xs text-slate-500">
              AI recommendation engine uses 60-day cohort QAR + early-DQ proxy to suggest reallocation, with caps to avoid channel volatility.
            </div>
          </Card>
        </div>
      )}

      {tab === 'journey' && (
        <div className="space-y-6">
          <Card title="Step-wise abandonment with AI levers">
            <div className="space-y-2">
              {journeySteps.map((s, idx) => {
                const pct = (s.users / journeySteps[0].users) * 100;
                return (
                  <div key={s.stage} className="grid grid-cols-12 gap-3 items-center text-sm">
                    <div className="col-span-3 font-medium text-slate-800">{idx + 1}. {s.stage}</div>
                    <div className="col-span-5">
                      <div className="h-3 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#1E2761] to-[#2A3A95]"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <div className="col-span-1 text-right text-slate-700">{s.users.toLocaleString()}</div>
                    <div className="col-span-1 text-right">
                      {s.drop > 15 ? <Pill tone="rose">−{s.drop}%</Pill> : s.drop > 0 ? <Pill tone="amber">−{s.drop}%</Pill> : <Pill>—</Pill>}
                    </div>
                    <div className="col-span-2 text-xs text-[#1E2761] font-medium">{s.ai}</div>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card title="Top 5 friction points" subtitle="Ranked by recoverable applications · 30-day window">
            <div className="grid grid-cols-5 gap-4">
              {[
                { f: 'Address & KYC step', r: '6,200 apps', a: 'DigiLocker auto-prompt' },
                { f: 'Income proof upload', r: '4,800 apps', a: 'Bureau-assisted prefill' },
                { f: 'OTP retry loop', r: '3,100 apps', a: 'Smart retry UX' },
                { f: 'Card selection paralysis', r: '2,400 apps', a: 'Personalised default' },
                { f: 'Activation gap (T+0 to T+7)', r: '5,700 cards', a: 'NBA nudge sequence' },
              ].map((x) => (
                <div key={x.f} className="rounded-lg border border-slate-200 p-4">
                  <div className="text-sm font-semibold text-slate-900">{x.f}</div>
                  <div className="text-xs text-rose-600 mt-1 font-semibold">{x.r}</div>
                  <div className="text-xs text-slate-600 mt-2">{x.a}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === 'explain' && (
        <div className="space-y-6">
          <Card title="Reason code distribution" subtitle="Last 30 days · supervised decision-support, not autonomous approvals">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">Code</th>
                  <th className="text-left">Description</th>
                  <th className="text-right">Share</th>
                  <th className="text-left pl-4">Decision class</th>
                  <th className="text-left">Note</th>
                </tr>
              </thead>
              <tbody>
                {reasonCodes.map((r) => (
                  <tr key={r.code} className="border-b border-slate-100">
                    <td className="py-2.5 font-mono text-xs text-slate-700">{r.code}</td>
                    <td className="text-slate-800">{r.label}</td>
                    <td className="text-right text-slate-700">{r.share}%</td>
                    <td className="pl-4">
                      <Pill tone={r.decision === 'Decline' ? 'rose' : r.decision.includes('Approve') ? 'emerald' : 'amber'}>{r.decision}</Pill>
                    </td>
                    <td className="text-xs text-slate-500">{r.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
          <Card title="Sample applications · with override workflow">
            <table className="w-full text-sm">
              <thead className="text-[11px] uppercase text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="text-left py-2.5">App ID</th>
                  <th className="text-left">Customer</th>
                  <th className="text-right">Bureau</th>
                  <th className="text-left">Channel</th>
                  <th className="text-left">Recommended</th>
                  <th className="text-right">Limit</th>
                  <th className="text-left">Reasons</th>
                  <th className="text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {sample.map((s) => (
                  <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2.5 font-mono text-xs">{s.id}</td>
                    <td>{s.name}</td>
                    <td className="text-right">{s.score}</td>
                    <td>{s.channel}</td>
                    <td>
                      <Pill tone={s.decision === 'Decline' ? 'rose' : s.decision === 'Approve' ? 'emerald' : 'amber'}>{s.decision}</Pill>
                    </td>
                    <td className="text-right">{s.limit}</td>
                    <td className="text-xs text-slate-600">{s.reasons.join(', ')}</td>
                    <td className="text-right">
                      <button className="text-xs text-[#1E2761] font-semibold hover:underline">Override · audit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-3 text-xs text-slate-500">
              Every override is captured with reviewer, justification, and timestamp · feeds back to model retraining cycle.
            </div>
          </Card>
        </div>
      )}

      {tab === 'simulator' && (
        <div className="space-y-6">
          <Card title="Threshold scenario simulator" subtitle="Estimate approvals vs early-DQ as you tune policy">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Bureau cutoff</label>
                <input type="range" min={650} max={780} value={bureau} onChange={(e) => setBureau(+e.target.value)} className="w-full accent-[#1E2761]" />
                <div className="text-sm text-slate-700">{bureau}</div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Min income (₹/m)</label>
                <input type="range" min={20000} max={100000} step={5000} value={income} onChange={(e) => setIncome(+e.target.value)} className="w-full accent-[#1E2761]" />
                <div className="text-sm text-slate-700">₹{income.toLocaleString()}</div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Policy stance</label>
                <input type="range" min={-10} max={10} value={pol} onChange={(e) => setPol(+e.target.value)} className="w-full accent-[#1E2761]" />
                <div className="text-sm text-slate-700">{pol < 0 ? 'Stricter' : pol > 0 ? 'Looser' : 'Neutral'} ({pol})</div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4">
              <KpiCard label="Projected weekly approvals" value={sim.approvals.toLocaleString()} sub="vs current 24,800" />
              <KpiCard label="Projected QAR %" value={`${sim.qar}%`} sub="quality lens" />
              <KpiCard label="Projected early-DQ %" value={`${sim.edq}%`} tone={sim.edq < 3.6 ? 'up' : 'down'} delta={sim.edq < 3.6 ? 'better' : 'worse'} sub="3-MoB DPD30+" />
            </div>
            <div className="mt-4 rounded-lg bg-blue-50 border border-blue-100 p-3 text-xs text-slate-700">
              <span className="font-semibold text-[#1E2761]">Governance:</span> simulator outputs require dual-approval before being promoted to production policy. Champion-challenger rollout in 5% slice for 14 days.
            </div>
          </Card>
        </div>
      )}
    </SBILayout>
  );
}

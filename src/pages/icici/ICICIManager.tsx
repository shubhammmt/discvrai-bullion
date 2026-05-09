import React, { useState } from 'react';
import { Layout, Card, KPI, Pill, Tab } from './ui';
import { FUNNEL, REPS, RENEWAL_BUCKETS, INTERVENTIONS, COACHING_REASONS, REGIONS } from './data';
import { LayoutDashboard, Users, Flame, Inbox, GraduationCap, AlertTriangle, ArrowUpRight, Send } from 'lucide-react';

const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'funnel', label: 'Funnel & Reps', icon: Users },
  { id: 'risk', label: 'Lapse Risk', icon: Flame },
  { id: 'queue', label: 'Intervention Queue', icon: Inbox },
  { id: 'coaching', label: 'Coaching', icon: GraduationCap },
];

export default function ICICIManager() {
  const [tab, setTab] = useState('overview');
  return (
    <Layout title="Renewal & Cross-sell Control Tower" subtitle="Module 03 · Sales Manager view"
      tabs={TABS} active={tab} onChange={setTab}
      right={<Pill tone="orange">Region · West · Zonal head</Pill>}>
      {tab === 'overview' && <Overview />}
      {tab === 'funnel' && <Funnel />}
      {tab === 'risk' && <RiskHeatmap />}
      {tab === 'queue' && <Queue />}
      {tab === 'coaching' && <Coaching />}
    </Layout>
  );
}

function Overview() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        <KPI label="Renewals · 30 days" value="1,842" delta="+6%" tone="up" sub="₹3.2 Cr at risk if not actioned" />
        <KPI label="Renewal conversion" value="84%" delta="+3.2%" tone="up" sub="vs target 82%" />
        <KPI label="High-risk lapse" value="247" delta="−18" tone="up" sub="customers in red zone" />
        <KPI label="Cross-sell potential" value="3,128" sub="active customers · matched products" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card title="Renewal pipeline" subtitle="Action windows by aging" className="col-span-2">
          <div className="grid grid-cols-3 gap-3">
            {RENEWAL_BUCKETS.map(b => (
              <div key={b.window} className="p-4 rounded-lg border border-slate-200 bg-gradient-to-br from-white to-orange-50">
                <div className="text-[11px] text-slate-600 font-semibold uppercase tracking-wider">{b.window}</div>
                <div className="text-2xl font-bold text-slate-900 mt-1">{b.count.toLocaleString()}</div>
                <div className="text-xs text-slate-600 mt-0.5">Premium value: <span className="font-semibold text-slate-800">{b.value}</span></div>
                <div className="mt-2 flex items-center gap-2">
                  <div className="text-[10px] text-slate-500">Lapse risk</div>
                  <div className="flex-1 bg-slate-200 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-500 h-full" style={{ width: `${b.risk * 5}%` }} />
                  </div>
                  <div className="text-[10px] font-bold text-rose-600">{b.risk}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="This week's leadership ask" right={<Pill tone="orange">High priority</Pill>}>
          <div className="space-y-2 text-sm">
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-100">
              <div className="text-rose-700 font-semibold flex items-center gap-1"><AlertTriangle className="w-3.5 h-3.5" /> Pooja Verma · Metro-NCR</div>
              <div className="text-xs text-slate-700 mt-1">SLA at 78%, dragging zonal average. Coaching session recommended.</div>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100">
              <div className="text-amber-700 font-semibold">5 lapse-risk customers in West</div>
              <div className="text-xs text-slate-700 mt-1">Combined renewal value ₹1.2L. Assign manager touch this week.</div>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-100">
              <div className="text-emerald-700 font-semibold">Cross-sell campaign performing</div>
              <div className="text-xs text-slate-700 mt-1">Senior care attach rate up 14% in South. Replicate playbook in West.</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Funnel() {
  return (
    <div className="space-y-4">
      <Card title="Funnel · last 30 days" subtitle="All regions · all distributor types">
        <div className="space-y-2">
          {FUNNEL.map((f, i) => (
            <div key={f.stage} className="flex items-center gap-3">
              <div className="w-24 text-xs font-semibold text-slate-700">{f.stage}</div>
              <div className="flex-1 bg-slate-100 rounded-md h-9 overflow-hidden relative">
                <div className="bg-gradient-to-r from-[#F37920] to-[#FB923C] h-full flex items-center px-3 text-white text-xs font-bold" style={{ width: `${f.conv}%` }}>
                  {f.count.toLocaleString()}
                </div>
              </div>
              <div className="w-12 text-xs font-bold text-slate-700 text-right">{f.conv}%</div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Rep performance · West region" subtitle="Click any rep to drill down">
        <table className="w-full text-sm">
          <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
            <tr>
              <th className="text-left font-semibold py-2">Rep</th>
              <th className="text-left font-semibold py-2">Region</th>
              <th className="text-right font-semibold py-2">SLA</th>
              <th className="text-right font-semibold py-2">Meet→Quote</th>
              <th className="text-right font-semibold py-2">Quote→Bind</th>
              <th className="text-right font-semibold py-2">Renewal</th>
              <th className="text-right font-semibold py-2">Bound (30d)</th>
              <th className="text-right font-semibold py-2">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {REPS.map(r => {
              const ok = r.sla >= 85 && r.q2b >= 40;
              return (
                <tr key={r.id} className="hover:bg-slate-50">
                  <td className="py-2.5 font-semibold text-slate-900">{r.name}</td>
                  <td className="text-xs text-slate-600">{r.region}</td>
                  <td className={`text-right font-semibold ${r.sla < 85 ? 'text-rose-600' : 'text-emerald-700'}`}>{r.sla}%</td>
                  <td className="text-right text-slate-700">{r.m2q}%</td>
                  <td className="text-right text-slate-700">{r.q2b}%</td>
                  <td className="text-right text-slate-700">{r.ren}%</td>
                  <td className="text-right font-semibold text-slate-900">{r.bound}</td>
                  <td className="text-right">{ok ? <Pill tone="emerald">On track</Pill> : <Pill tone="rose">Coach</Pill>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

function RiskHeatmap() {
  const grid = REGIONS.map(r => ({
    region: r,
    cells: ['T1','T2','T3'].map(t => ({ tier: t, risk: Math.floor(5 + Math.random() * 28) })),
  }));
  const tone = (n: number) => n < 12 ? 'bg-emerald-100 text-emerald-800' : n < 22 ? 'bg-amber-100 text-amber-800' : 'bg-rose-200 text-rose-900';
  return (
    <div className="space-y-4">
      <Card title="Lapse risk heatmap" subtitle="By region × city tier · % of renewals at high lapse risk">
        <div className="grid grid-cols-4 gap-3">
          <div></div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">T1</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">T2</div>
          <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold text-center">T3</div>
          {grid.map(row => (
            <React.Fragment key={row.region}>
              <div className="text-xs font-semibold text-slate-700 flex items-center">{row.region}</div>
              {row.cells.map(c => (
                <div key={c.tier} className={`p-3 rounded-md text-center font-bold text-sm ${tone(c.risk)}`}>{c.risk}%</div>
              ))}
            </React.Fragment>
          ))}
        </div>
        <div className="mt-4 flex items-center gap-3 text-[11px] text-slate-600">
          <span>Legend:</span>
          <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">&lt;12% Low</span>
          <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">12–22% Watch</span>
          <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-900 font-semibold">22%+ Act now</span>
        </div>
      </Card>
    </div>
  );
}

function Queue() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <KPI label="Today's interventions" value="14" sub="auto-prioritized · awaiting assign" />
        <KPI label="Assigned" value="9" delta="64%" tone="up" sub="of today's queue" />
        <KPI label="Resolved this week" value="42" delta="+11" tone="up" sub="₹6.4L premium saved" />
      </div>
      <Card title="Daily intervention queue" subtitle="Manager assigns to rep · audit-logged · KPI tracked">
        <div className="space-y-2">
          {INTERVENTIONS.map(i => (
            <div key={i.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 bg-white">
              <div className={`w-1 h-12 rounded-full ${i.risk==='High'?'bg-rose-500':i.risk==='Medium'?'bg-amber-500':'bg-emerald-500'}`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-slate-900 text-sm">{i.cust}</div>
                  <Pill tone={i.risk==='High'?'rose':i.risk==='Medium'?'amber':'emerald'}>{i.risk} risk</Pill>
                  <span className="text-[11px] text-slate-500">Premium value: <span className="font-semibold text-slate-700">{i.value}</span></span>
                </div>
                <div className="text-xs text-slate-600 mt-0.5">{i.issue}</div>
                <div className="text-xs text-[#F37920] mt-1 font-medium flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> Action: {i.action}</div>
              </div>
              <select className="text-xs border border-slate-300 rounded px-2 py-1.5">
                <option>Assign to rep…</option>
                {REPS.map(r => <option key={r.id}>{r.name}</option>)}
              </select>
              <button className="px-3 py-1.5 bg-[#F37920] text-white text-xs font-bold rounded">Assign</button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

function Coaching() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Card title="Top lost reasons · last 30 days" subtitle="Why deals didn't close">
          <div className="space-y-2">
            {COACHING_REASONS.map(r => (
              <div key={r.reason}>
                <div className="flex justify-between text-xs">
                  <div className="text-slate-700 font-medium">{r.reason}</div>
                  <div className="font-bold text-[#F37920]">{r.share}%</div>
                </div>
                <div className="bg-slate-100 rounded h-2 mt-1 overflow-hidden">
                  <div className="bg-[#F37920] h-full" style={{ width: `${r.share * 2.5}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Suggested coaching script · this week" subtitle="Auto-generated from objection trend">
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm text-slate-800 leading-relaxed">
            <div className="text-[10px] uppercase tracking-wider text-[#F37920] font-bold mb-1.5">Topic: Premium objection handling</div>
            "Don't apologize for the premium. Reframe it as cost-per-day. Use the hospital-day comparison (₹62/day vs ₹15K hospital day). For high-income customers, lead with continuity benefit, not affordability."
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="text-center p-2 rounded bg-white border border-slate-200">
                <div className="text-xs text-slate-500">Affected reps</div>
                <div className="font-bold text-slate-900">12</div>
              </div>
              <div className="text-center p-2 rounded bg-white border border-slate-200">
                <div className="text-xs text-slate-500">Lost premium</div>
                <div className="font-bold text-rose-600">₹4.2L</div>
              </div>
              <div className="text-center p-2 rounded bg-white border border-slate-200">
                <div className="text-xs text-slate-500">Recoverable</div>
                <div className="font-bold text-emerald-700">~60%</div>
              </div>
            </div>
            <button className="mt-3 w-full py-2 bg-[#F37920] text-white text-xs font-bold rounded flex items-center justify-center gap-1.5">
              <Send className="w-3.5 h-3.5" /> Push to 12 reps as nudge
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

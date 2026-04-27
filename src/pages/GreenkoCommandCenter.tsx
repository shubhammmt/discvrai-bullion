import React, { useState } from 'react';
import {
  LayoutDashboard, Wind, Sun, Zap, IndianRupee, Workflow, Sparkles,
  AlertTriangle, ArrowRight, CheckCircle2, TrendingDown, TrendingUp, X, Activity, Bell
} from 'lucide-react';
import { CommandCenterShell, Panel, SevBadge, PilotPlan } from '@/components/command-center/CommandCenterShell';

const ACCENT = '#1f7a3a';
const ACCENT_DARK = '#155c2c';

interface Plant {
  id: string; name: string; type: 'wind' | 'solar' | 'hydro';
  state: string; capacityMW: number; generationMW: number; planMW: number;
  plf: number; costVar: number; status: 'healthy' | 'watch' | 'risk';
}

const PLANTS: Plant[] = [
  { id: 'AP-S-2', name: 'AP Solar Park 2', type: 'solar', state: 'Andhra Pradesh', capacityMW: 750, generationMW: 612, planMW: 680, plf: 32.4, costVar: 4.2, status: 'risk' },
  { id: 'KA-W-1', name: 'Karnataka Wind 1', type: 'wind', state: 'Karnataka', capacityMW: 320, generationMW: 196, planMW: 210, plf: 28.8, costVar: 1.4, status: 'watch' },
  { id: 'TG-S-3', name: 'Telangana Solar 3', type: 'solar', state: 'Telangana', capacityMW: 500, generationMW: 488, planMW: 480, plf: 36.1, costVar: -0.8, status: 'healthy' },
  { id: 'MP-H-1', name: 'MP Pumped Hydro', type: 'hydro', state: 'Madhya Pradesh', capacityMW: 1200, generationMW: 1140, planMW: 1150, plf: 41.2, costVar: 0.3, status: 'healthy' },
  { id: 'GJ-W-2', name: 'Gujarat Wind 2', type: 'wind', state: 'Gujarat', capacityMW: 410, generationMW: 318, planMW: 360, plf: 30.1, costVar: 2.8, status: 'watch' },
  { id: 'RJ-S-4', name: 'Rajasthan Solar 4', type: 'solar', state: 'Rajasthan', capacityMW: 900, generationMW: 884, planMW: 870, plf: 38.4, costVar: -0.5, status: 'healthy' },
];

interface Exception {
  id: string; sev: 'High' | 'Med'; plant: string; msg: string;
  reason: string; recommendation: string; owner: string; ageMin: number;
  status: 'open' | 'resolved'; impact: string;
}

const INITIAL_EXC: Exception[] = [
  { id: 'E-1042', sev: 'High', plant: 'AP Solar Park 2', msg: 'Generation 10% below plan · 4 strings underperforming', reason: 'Inverter fault on Block-3 + soiling on Strings 14–22', recommendation: 'Dispatch O&M crew within 6h; isolate Block-3, schedule cleaning cycle', owner: 'Plant Head', ageMin: 42, status: 'open', impact: '₹ 18.4 L/day' },
  { id: 'E-1041', sev: 'High', plant: 'Karnataka Wind 1', msg: 'Predictive maintenance risk · gearbox vibration ↑', reason: 'WTG-08 vibration crossed yellow threshold (4.6 mm/s)', recommendation: 'Schedule inspection in next 48h window; reduce load 15%', owner: 'O&M Lead', ageMin: 95, status: 'open', impact: '₹ 6.2 L/day' },
  { id: 'E-1039', sev: 'Med', plant: 'AP Solar Park 2', msg: 'Cost variance breach · O&M ledger', reason: 'Spares spend +18% MTD vs budget', recommendation: 'Review consumables PO cycle; consolidate 3 vendors', owner: 'Finance', ageMin: 220, status: 'open', impact: '₹ 4.1 L/mo' },
  { id: 'E-1038', sev: 'Med', plant: 'Gujarat Wind 2', msg: 'Forecast vs actual gap 11.7% · curtailment risk', reason: 'Grid scheduling mismatch — DISCOM signal lag', recommendation: 'Re-issue revised schedule; engage SLDC desk', owner: 'Commercial', ageMin: 38, status: 'open', impact: '₹ 3.8 L/day' },
];

const TYPE_ICON = { wind: Wind, solar: Sun, hydro: Zap };
const STATUS_COLOR = { healthy: '#16a34a', watch: '#f59e0b', risk: '#dc2626' };

const COPILOT = [
  { q: 'Why is AP Solar 2 below plan?', a: 'AP Solar Park 2 is generating 612 MW vs plan of 680 MW (-10%). Root cause: inverter fault on Block-3 + heavy soiling on Strings 14–22. Estimated impact ₹18.4L/day. Recommended action assigned to Plant Head with 6h SLA.' },
  { q: 'Top cost variance this month', a: 'AP Solar Park 2 leads with +4.2% O&M cost variance, driven by spares spend +18% vs budget. Gujarat Wind 2 next at +2.8%. Consolidating 3 spares vendors could recover ~₹4.1L/mo.' },
  { q: 'Predictive maintenance risks', a: 'Karnataka Wind 1 WTG-08: gearbox vibration 4.6 mm/s (yellow). Recommend inspection in next 48h with 15% load reduction. 1 more medium-risk asset across Gujarat fleet.' },
  { q: 'Generation vs plan today', a: 'Fleet at 96.8% of plan. 4 plants on plan, 2 plants need attention (AP-S-2, KA-W-1). PLF tracking 34.2%, cost variance +1.6% MTD.' },
];

const GreenkoCommandCenter: React.FC = () => {
  const [active, setActive] = useState('home');
  const [exceptions, setExceptions] = useState<Exception[]>(INITIAL_EXC);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);

  const totalCap = PLANTS.reduce((s, p) => s + p.capacityMW, 0);
  const totalGen = PLANTS.reduce((s, p) => s + p.generationMW, 0);
  const totalPlan = PLANTS.reduce((s, p) => s + p.planMW, 0);
  const genVsPlan = ((totalGen / totalPlan) * 100).toFixed(1);
  const open = exceptions.filter(e => e.status === 'open').length;
  const high = exceptions.filter(e => e.status === 'open' && e.sev === 'High').length;

  const resolve = (id: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    setSelectedExc(null);
  };

  const modules = [
    { id: 'home', label: 'Decision Hub', icon: LayoutDashboard },
    { id: 'plants', label: 'Plant Operations', icon: Activity },
    { id: 'forecast', label: 'Forecast & Curtailment', icon: TrendingUp },
    { id: 'maint', label: 'Predictive Maintenance', icon: Sparkles },
    { id: 'cost', label: 'O&M Cost Control', icon: IndianRupee },
    { id: 'workflow', label: 'Action Workflow', icon: Workflow },
    { id: 'pilot', label: 'AI Pilot Plan', icon: Sparkles },
  ];

  const kpis: { label: string; value: string; sub?: string; tone?: 'green' | 'amber' | 'red' | 'neutral' }[] = [
    { label: 'Installed Capacity', value: `${(totalCap / 1000).toFixed(2)} GW`, sub: `${PLANTS.length} plants` },
    { label: 'Gen vs Plan', value: `${genVsPlan}%`, sub: `${totalGen}/${totalPlan} MW`, tone: parseFloat(genVsPlan) >= 98 ? 'green' : 'amber' },
    { label: 'Open Exceptions', value: `${open}`, sub: `${high} high severity`, tone: high > 0 ? 'red' : 'neutral' },
    { label: 'Avg PLF (24h)', value: `${(PLANTS.reduce((s, p) => s + p.plf, 0) / PLANTS.length).toFixed(1)}%` },
    { label: 'Cost Var MTD', value: '+1.6%', sub: 'vs O&M budget' },
    { label: 'Action SLA', value: '87%', sub: 'within target', tone: 'green' },
  ];

  return (
    <CommandCenterShell
      brand={{ short: 'Greenko', name: 'Greenko Decision Hub', tagline: 'Energy operations · India', accent: ACCENT, accentDark: ACCENT_DARK }}
      modules={modules}
      active={active}
      onChange={setActive}
      copilot={COPILOT}
      topKpis={active === 'home' ? kpis : undefined}
    >
      {active === 'home' && (
        <div className="grid grid-cols-12 gap-4">
          {/* Plant grid */}
          <Panel title="Unified Plant View · Click to inspect" className="col-span-12 lg:col-span-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {PLANTS.map(p => {
                const Icon = TYPE_ICON[p.type];
                const sel = selectedPlant === p.id;
                const genPct = (p.generationMW / p.planMW) * 100;
                return (
                  <button key={p.id} onClick={() => setSelectedPlant(sel ? null : p.id)}
                    className={`text-left bg-slate-50 border rounded-lg p-3 transition-all ${sel ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                          <Icon className="w-4 h-4" style={{ color: ACCENT }} />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">{p.name}</div>
                          <div className="text-[10px] text-slate-500">{p.state} · {p.capacityMW} MW</div>
                        </div>
                      </div>
                      <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase" style={{ background: `${STATUS_COLOR[p.status]}15`, color: STATUS_COLOR[p.status] }}>
                        {p.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Gen vs Plan</span>
                      <span className={`font-semibold ${genPct >= 98 ? 'text-emerald-600' : genPct >= 92 ? 'text-amber-600' : 'text-red-600'}`}>{genPct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                      <div className="h-full" style={{ width: `${Math.min(100, genPct)}%`, background: STATUS_COLOR[p.status] }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] mt-2">
                      <span className="text-slate-500">PLF {p.plf}%</span>
                      <span className={`flex items-center gap-1 ${p.costVar > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {p.costVar > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        Cost {p.costVar > 0 ? '+' : ''}{p.costVar}%
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Panel>

          {/* Exception queue */}
          <Panel title="Exception Queue · Owner-assigned" right={<Bell className="w-3.5 h-3.5 text-slate-400" />} className="col-span-12 lg:col-span-5">
            <div className="space-y-2">
              {exceptions.map(e => (
                <button key={e.id} onClick={() => setSelectedExc(e)} disabled={e.status === 'resolved'}
                  className={`w-full text-left border rounded-lg p-3 transition-all ${
                    e.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-slate-50 border-slate-200 hover:border-emerald-400'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <SevBadge sev={e.sev} />
                    <span className="text-[10px] text-slate-500 font-mono">{e.id}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">{e.ageMin}m ago</span>
                    {e.status === 'resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-1">{e.plant}</div>
                  <div className="text-xs text-slate-600">{e.msg}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-500">Owner: <span className="font-semibold text-slate-700">{e.owner}</span></span>
                    <span className="text-[10px] font-semibold" style={{ color: ACCENT }}>{e.impact}</span>
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {active === 'plants' && (
        <Panel title="Plant Operations · Live performance">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                <tr><th className="text-left py-2">Plant</th><th>Type</th><th>State</th><th>Capacity</th><th>Generation</th><th>Plan</th><th>PLF</th><th>Cost Var</th><th>Status</th></tr>
              </thead>
              <tbody>
                {PLANTS.map(p => (
                  <tr key={p.id} className="border-b border-slate-100">
                    <td className="py-2.5 font-medium text-slate-900">{p.name}</td>
                    <td className="text-center capitalize">{p.type}</td>
                    <td className="text-center text-slate-600">{p.state}</td>
                    <td className="text-center">{p.capacityMW} MW</td>
                    <td className="text-center font-semibold">{p.generationMW} MW</td>
                    <td className="text-center text-slate-600">{p.planMW} MW</td>
                    <td className="text-center">{p.plf}%</td>
                    <td className={`text-center font-semibold ${p.costVar > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{p.costVar > 0 ? '+' : ''}{p.costVar}%</td>
                    <td className="text-center"><span className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase" style={{ background: `${STATUS_COLOR[p.status]}15`, color: STATUS_COLOR[p.status] }}>{p.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      )}

      {active === 'forecast' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Panel title="Forecast vs Actual · Last 7 days">
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => {
                const f = 100 - i * 1.2; const a = f + (i % 2 === 0 ? -3.4 : 1.8);
                return (
                  <div key={d} className="flex items-center gap-3 text-xs">
                    <span className="w-10 text-slate-500">{d}</span>
                    <div className="flex-1 bg-slate-100 rounded h-5 relative overflow-hidden">
                      <div className="absolute h-full bg-slate-300" style={{ width: `${f}%` }} />
                      <div className="absolute h-full" style={{ width: `${a}%`, background: ACCENT }} />
                    </div>
                    <span className="w-20 text-right">{a.toFixed(1)}% / {f.toFixed(1)}%</span>
                  </div>
                );
              })}
            </div>
          </Panel>
          <Panel title="Curtailment & Grid Risk">
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" /><div><div className="font-semibold">Gujarat Wind 2 · DISCOM lag</div><div className="text-xs text-slate-600">Forecast gap 11.7% · revised schedule pending. Engage SLDC.</div></div></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /><div><div className="font-semibold">Karnataka · grid frequency drift</div><div className="text-xs text-slate-600">2 events past 24h · curtailment likely if &gt;3.</div></div></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /><div><div className="font-semibold">AP, MP, RJ corridors stable</div><div className="text-xs text-slate-600">No curtailment events past 48h.</div></div></li>
            </ul>
          </Panel>
        </div>
      )}

      {active === 'maint' && (
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { asset: 'WTG-08 · KA Wind 1', signal: 'Gearbox vibration 4.6 mm/s', risk: 'High', eta: '48h', action: 'Inspect + reduce load 15%' },
            { asset: 'INV-3-Block · AP Solar 2', signal: 'Inverter fault code F-204', risk: 'High', eta: '6h', action: 'Dispatch O&M crew · isolate block' },
            { asset: 'WTG-12 · Gujarat Wind 2', signal: 'Pitch system error rate ↑', risk: 'Med', eta: '7d', action: 'Schedule routine inspection' },
            { asset: 'String 14–22 · AP Solar 2', signal: 'Soiling loss 7.2%', risk: 'Med', eta: '3d', action: 'Cleaning cycle' },
            { asset: 'Transformer T-3 · MP Hydro', signal: 'Oil temp drift', risk: 'Low', eta: '14d', action: 'Trend monitor' },
          ].map((m, i) => (
            <Panel key={i} title={m.asset}>
              <div className="text-xs text-slate-600 mb-2">{m.signal}</div>
              <div className="flex items-center gap-2 mb-2"><SevBadge sev={m.risk} /><span className="text-[10px] text-slate-500">ETA window: {m.eta}</span></div>
              <div className="bg-emerald-50 border border-emerald-200 rounded p-2 text-xs text-slate-800">{m.action}</div>
            </Panel>
          ))}
        </div>
      )}

      {active === 'cost' && (
        <Panel title="O&M Cost Variance · MTD">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr><th className="text-left py-2">Cost Center</th><th>Budget</th><th>Actual</th><th>Variance</th><th>Driver</th></tr>
            </thead>
            <tbody>
              {[
                { c: 'AP Solar 2 · Spares', b: '₹ 84 L', a: '₹ 99 L', v: '+18%', d: 'Vendor consolidation pending' },
                { c: 'Gujarat Wind · O&M Labour', b: '₹ 62 L', a: '₹ 65 L', v: '+5%', d: 'Overtime spike' },
                { c: 'MP Hydro · Consumables', b: '₹ 41 L', a: '₹ 38 L', v: '−7%', d: 'On track' },
                { c: 'KA Wind · Logistics', b: '₹ 28 L', a: '₹ 32 L', v: '+14%', d: 'Diesel + remote site' },
              ].map((r, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2.5">{r.c}</td><td className="text-center text-slate-600">{r.b}</td>
                  <td className="text-center font-semibold">{r.a}</td>
                  <td className={`text-center font-semibold ${r.v.startsWith('+') ? 'text-red-600' : 'text-emerald-600'}`}>{r.v}</td>
                  <td className="text-xs text-slate-600">{r.d}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {active === 'workflow' && (
        <Panel title="Action Workflow · Decision-to-closure">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {['Signal Detected', 'Owner Assigned', 'Action Drafted', 'Approval', 'Closed'].map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Step {i + 1}</div>
                <div className="text-sm font-semibold mt-1">{s}</div>
                <div className="text-[10px] text-slate-500 mt-1">{[123, 98, 76, 64, 58][i]} this wk</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-600">Avg closure time: <span className="font-semibold text-slate-900">11.3h</span> · SLA met: <span className="font-semibold" style={{ color: ACCENT }}>87%</span></div>
        </Panel>
      )}

      {active === 'pilot' && (
        <PilotPlan
          accent={ACCENT}
          weeks={[
            { week: 'Week 1', title: 'Connect & Baseline', bullets: ['ERP + 2 plant data sources connected', 'Baseline KPIs locked: Gen vs Plan, PLF, O&M variance', 'CXO + plant-head workshop · pain points mapped'] },
            { week: 'Week 2', title: 'Intelligence Layer', bullets: ['Live exception engine on 1 plant', 'Predictive maint signals for top 5 assets', 'Forecast vs actual variance alerts'] },
            { week: 'Week 3', title: 'Action & Hand-off', bullets: ['Owner-assigned workflow with SLA tracking', 'AI Copilot trained on Greenko ops vocabulary', 'Steerco review · scale plan to 5 plants'] },
          ]}
          outcomes={[
            'Live decision hub on 1 plant + 1 cost-center use case',
            'Measurable improvement in MIS cycle time (target: −60%)',
            'Owner-led action workflow replacing email/Excel chains',
            'Predictive maintenance signals on top 5 critical assets',
            'AI Copilot grounded in Greenko ops vocabulary',
            'Scale-up roadmap to fleet-wide rollout in 90 days',
          ]}
        />
      )}

      {/* Decision modal */}
      {selectedExc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedExc(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={ev => ev.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><SevBadge sev={selectedExc.sev} /><span className="text-xs text-slate-500 font-mono">{selectedExc.id}</span></div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedExc.plant}</h3>
                <p className="text-sm text-slate-600">{selectedExc.msg}</p>
              </div>
              <button onClick={() => setSelectedExc(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> Root Cause</div>
                <div className="text-sm text-slate-800">{selectedExc.reason}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1 flex items-center gap-1.5"><ArrowRight className="w-3 h-3" /> Recommended Action</div>
                <div className="text-sm text-slate-800">{selectedExc.recommendation}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Owner</div><div className="text-sm font-semibold text-slate-900">{selectedExc.owner}</div></div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Impact</div><div className="text-sm font-semibold" style={{ color: ACCENT }}>{selectedExc.impact}</div></div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => resolve(selectedExc.id)} className="flex-1 text-white rounded-lg py-2.5 text-sm font-semibold hover:opacity-90" style={{ background: ACCENT }}>Approve & Close Action</button>
              <button onClick={() => setSelectedExc(null)} className="px-4 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Defer</button>
            </div>
          </div>
        </div>
      )}
    </CommandCenterShell>
  );
};

export default GreenkoCommandCenter;

import React, { useState } from 'react';
import {
  LayoutDashboard, Ship, Warehouse, Truck, Globe, Users, Workflow, Sparkles,
  AlertTriangle, ArrowRight, CheckCircle2, X, Bell, FileCheck
} from 'lucide-react';
import { CommandCenterShell, Panel, SevBadge, PilotPlan } from '@/components/command-center/CommandCenterShell';

const ACCENT = '#0ea5e9';
const ACCENT_DARK = '#0369a1';

interface Lane { id: string; origin: string; destination: string; status: 'on-track' | 'at-risk' | 'breached'; slaHours: number; variancePct: number; costPerMove: number; movesToday: number; }
interface DC { id: string; name: string; region: string; utilization: number; status: 'healthy' | 'congested' | 'underutilized'; }
interface Exception { id: string; sev: 'High' | 'Med'; title: string; category: 'Lane' | 'DC' | 'Vendor'; detail: string; reason: string; recommendation: string; owner: string; impact: string; status: 'open' | 'resolved'; ageMin: number; }

const LANES: Lane[] = [
  { id: 'L-JEA-MUN', origin: 'Jebel Ali', destination: 'Mundra', status: 'breached', slaHours: 96, variancePct: 18, costPerMove: 312, movesToday: 84 },
  { id: 'L-SOH-DJI', origin: 'Sohar', destination: 'Djibouti', status: 'at-risk', slaHours: 72, variancePct: 9, costPerMove: 268, movesToday: 56 },
  { id: 'L-CAU-SOK', origin: 'Caucedo', destination: 'Sokhna', status: 'on-track', slaHours: 240, variancePct: 2, costPerMove: 412, movesToday: 22 },
  { id: 'L-LON-NHV', origin: 'London Gateway', destination: 'Nhava Sheva', status: 'on-track', slaHours: 384, variancePct: -1, costPerMove: 524, movesToday: 18 },
  { id: 'L-SIN-DUB', origin: 'Singapore', destination: 'Dubai', status: 'at-risk', slaHours: 168, variancePct: 7, costPerMove: 298, movesToday: 41 },
];

const DCS: DC[] = [
  { id: 'DC-SOH', name: 'DC Sohar', region: 'MENA', utilization: 94, status: 'congested' },
  { id: 'DC-JEA', name: 'DC Jebel Ali', region: 'MENA', utilization: 78, status: 'healthy' },
  { id: 'DC-MUN', name: 'DC Mundra', region: 'India', utilization: 82, status: 'healthy' },
  { id: 'DC-CAU', name: 'DC Caucedo', region: 'Americas', utilization: 52, status: 'underutilized' },
  { id: 'DC-LON', name: 'DC London Gateway', region: 'Europe', utilization: 71, status: 'healthy' },
  { id: 'DC-SIN', name: 'DC Singapore', region: 'APAC', utilization: 88, status: 'congested' },
];

const INITIAL_EXC: Exception[] = [
  { id: 'OPS-5012', sev: 'High', title: 'SLA breach risk · Jebel Ali → Mundra', category: 'Lane', detail: '18% variance vs planned transit time', reason: 'Port congestion at Mundra (DC util 82% + customs delay)', recommendation: 'Reroute 14 containers via Pipavav; expedite customs pre-clearance for top-3 shippers', owner: 'Lane Ops · MENA-IN', impact: '$ 84K SLA penalty avoided', status: 'open', ageMin: 28 },
  { id: 'OPS-5011', sev: 'High', title: 'DC-Sohar congestion · 94% utilization', category: 'DC', detail: 'Inbound queue building, 22 trucks waiting', reason: 'Two regional shippers consolidated dispatch in same window', recommendation: 'Stagger inbound slots; redirect 8 inbound moves to DC-Jebel Ali (78% util)', owner: 'WH Manager · Sohar', impact: '$ 36K congestion cost', status: 'open', ageMin: 52 },
  { id: 'OPS-5010', sev: 'Med', title: 'Carrier underperformance · APAC corridor', category: 'Vendor', detail: 'On-time rate dropped to 84% (target 92%)', reason: 'Equipment shortage at SIN; vessel delays compounding', recommendation: 'Shift 30% volume to alternate carrier for next 14 days; trigger vendor review', owner: 'Vendor Mgmt · APAC', impact: '$ 22K reliability improvement', status: 'open', ageMin: 142 },
  { id: 'OPS-5009', sev: 'Med', title: 'Sohar → Djibouti at risk', category: 'Lane', detail: '9% variance, trending negative', reason: 'Weather window closing; vessel rotation tight', recommendation: 'Authorize next-day departure; re-confirm with charterer', owner: 'Lane Ops · MENA', impact: '$ 18K', status: 'open', ageMin: 16 },
];

const LANE_COLOR = { 'on-track': '#16a34a', 'at-risk': '#f59e0b', 'breached': '#dc2626' };
const DC_COLOR = { healthy: '#16a34a', congested: '#dc2626', underutilized: '#f59e0b' };

const COPILOT = [
  { q: 'Which lane is most at risk?', a: 'Jebel Ali → Mundra: 18% transit variance, breach risk in next 24h. Root cause: Mundra port congestion + customs delay. Recommendation: reroute 14 containers via Pipavav and pre-clear top-3 shippers. Avoids ~$84K SLA penalty.' },
  { q: 'Where is DC capacity stressed?', a: 'DC-Sohar at 94% (congested) and DC-Singapore at 88%. DC-Caucedo has 48% headroom. Recommendation: stagger Sohar inbound slots and redirect 8 moves to DC-Jebel Ali (78%).' },
  { q: 'Which carriers are under-performing?', a: 'APAC corridor carrier OTP at 84% vs 92% target. Recommend shifting 30% volume to alternate carrier for 14 days and triggering a vendor review.' },
  { q: 'Cost per move outliers', a: 'London Gateway → Nhava Sheva at $524/move (highest). Long-haul justified, but utilisation only 18 moves today — opportunity to consolidate adjacent lane volume.' },
];

const DPWorldOrchestration: React.FC = () => {
  const [active, setActive] = useState('home');
  const [exceptions, setExceptions] = useState<Exception[]>(INITIAL_EXC);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);

  const open = exceptions.filter(e => e.status === 'open').length;
  const high = exceptions.filter(e => e.status === 'open' && e.sev === 'High').length;
  const breached = LANES.filter(l => l.status === 'breached').length;
  const atRisk = LANES.filter(l => l.status === 'at-risk').length;

  const resolve = (id: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    setSelectedExc(null);
  };

  const modules = [
    { id: 'home', label: 'Orchestration Hub', icon: LayoutDashboard },
    { id: 'lanes', label: 'Lane Performance', icon: Ship },
    { id: 'dc', label: 'DC Capacity', icon: Warehouse },
    { id: 'vendors', label: 'Carrier & Vendor', icon: Truck },
    { id: 'docs', label: 'Customs & Docs', icon: FileCheck },
    { id: 'workflow', label: 'Action Workflow', icon: Workflow },
    { id: 'pilot', label: 'AI Pilot Plan', icon: Sparkles },
  ];

  const kpis: { label: string; value: string; sub?: string; tone?: 'green' | 'amber' | 'red' | 'neutral' }[] = [
    { label: 'Active lanes', value: `${LANES.length}` },
    { label: 'Lanes breached', value: `${breached}`, tone: breached > 0 ? 'red' : 'green' },
    { label: 'Lanes at risk', value: `${atRisk}`, tone: atRisk > 0 ? 'amber' : 'green' },
    { label: 'DCs congested', value: `${DCS.filter(d => d.status === 'congested').length}`, tone: 'red' },
    { label: 'Open exceptions', value: `${open}`, sub: `${high} high severity`, tone: high > 0 ? 'red' : 'neutral' },
    { label: 'Cost vs benchmark', value: '+3.4%', sub: 'rolling 7d', tone: 'amber' },
  ];

  return (
    <CommandCenterShell
      brand={{ short: 'DP World', name: 'DP World Orchestration', tagline: 'Global trade · Multi-modal logistics', accent: ACCENT, accentDark: ACCENT_DARK }}
      modules={modules}
      active={active}
      onChange={setActive}
      copilot={COPILOT}
      topKpis={active === 'home' ? kpis : undefined}
    >
      {active === 'home' && (
        <div className="grid grid-cols-12 gap-4">
          <Panel title="Lane & DC Network" className="col-span-12 lg:col-span-7">
            <div className="grid md:grid-cols-2 gap-3">
              {LANES.map(l => (
                <div key={l.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Ship className="w-4 h-4" style={{ color: ACCENT }} />
                    <span className="text-sm font-semibold text-slate-900">{l.origin} → {l.destination}</span>
                    <span className="ml-auto text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase" style={{ background: `${LANE_COLOR[l.status]}15`, color: LANE_COLOR[l.status] }}>{l.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-600">
                    <span>SLA {l.slaHours}h</span>
                    <span className={l.variancePct > 5 ? 'text-red-600 font-semibold' : l.variancePct > 0 ? 'text-amber-600' : 'text-emerald-600'}>{l.variancePct > 0 ? '+' : ''}{l.variancePct}%</span>
                    <span>${l.costPerMove}/move</span>
                    <span>{l.movesToday} today</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid md:grid-cols-3 gap-2">
              {DCS.map(d => (
                <div key={d.id} className="bg-white border border-slate-200 rounded-lg p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-900">{d.name}</span>
                    <span className="text-[9px] px-1 py-0.5 rounded uppercase font-semibold" style={{ background: `${DC_COLOR[d.status]}15`, color: DC_COLOR[d.status] }}>{d.status}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">{d.region}</div>
                  <div className="mt-1 h-1.5 bg-slate-100 rounded overflow-hidden"><div className="h-full" style={{ width: `${d.utilization}%`, background: DC_COLOR[d.status] }} /></div>
                  <div className="text-[10px] text-slate-500 mt-1">{d.utilization}% util</div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Exception Queue" right={<Bell className="w-3.5 h-3.5 text-slate-400" />} className="col-span-12 lg:col-span-5">
            <div className="space-y-2">
              {exceptions.map(e => (
                <button key={e.id} onClick={() => setSelectedExc(e)} disabled={e.status === 'resolved'}
                  className={`w-full text-left border rounded-lg p-3 ${e.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-slate-50 border-slate-200 hover:border-sky-400'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <SevBadge sev={e.sev} />
                    <span className="text-[10px] text-slate-500 font-mono">{e.id}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">{e.category} · {e.ageMin}m</span>
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-1">{e.title}</div>
                  <div className="text-xs text-slate-600">{e.detail}</div>
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

      {active === 'lanes' && (
        <Panel title="Lane Performance · Detail">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr><th className="text-left py-2">Lane</th><th>SLA (h)</th><th>Variance</th><th>$ / move</th><th>Moves today</th><th>Status</th></tr>
            </thead>
            <tbody>
              {LANES.map(l => (
                <tr key={l.id} className="border-b border-slate-100">
                  <td className="py-2.5 font-medium">{l.origin} → {l.destination}</td>
                  <td className="text-center">{l.slaHours}</td>
                  <td className={`text-center font-semibold ${l.variancePct > 5 ? 'text-red-600' : l.variancePct > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>{l.variancePct > 0 ? '+' : ''}{l.variancePct}%</td>
                  <td className="text-center">${l.costPerMove}</td>
                  <td className="text-center">{l.movesToday}</td>
                  <td className="text-center"><span className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase" style={{ background: `${LANE_COLOR[l.status]}15`, color: LANE_COLOR[l.status] }}>{l.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {active === 'dc' && (
        <div className="grid md:grid-cols-3 gap-4">
          {DCS.map(d => (
            <Panel key={d.id} title={d.name}>
              <div className="text-xs text-slate-500 mb-2">{d.region}</div>
              <div className="text-3xl font-semibold mb-1" style={{ color: DC_COLOR[d.status] }}>{d.utilization}%</div>
              <div className="text-xs text-slate-600 capitalize mb-3">{d.status}</div>
              <div className="bg-slate-50 border border-slate-200 rounded p-2 text-xs text-slate-700">
                {d.status === 'congested' ? 'Stagger inbound slots; redirect to nearest healthy DC.' :
                 d.status === 'underutilized' ? 'Opportunity to absorb adjacent lane volume.' :
                 'Operating in target band.'}
              </div>
            </Panel>
          ))}
        </div>
      )}

      {active === 'vendors' && (
        <Panel title="Carrier & Vendor Scorecard">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr><th className="text-left py-2">Carrier</th><th>Corridor</th><th>OTP</th><th>Equipment</th><th>Disputes</th><th>Health</th></tr>
            </thead>
            <tbody>
              {[
                { c: 'Maersk Line', co: 'APAC–MENA', otp: 84, eq: 'Short', d: 4, h: 'red' },
                { c: 'CMA CGM', co: 'Europe–IN', otp: 93, eq: 'Adequate', d: 0, h: 'green' },
                { c: 'MSC', co: 'Americas–MENA', otp: 91, eq: 'Adequate', d: 1, h: 'green' },
                { c: 'Hapag-Lloyd', co: 'MENA–IN', otp: 88, eq: 'Tight', d: 2, h: 'amber' },
              ].map((r, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2.5 font-medium">{r.c}</td><td className="text-center text-slate-600">{r.co}</td>
                  <td className="text-center font-semibold">{r.otp}%</td><td className="text-center">{r.eq}</td>
                  <td className="text-center">{r.d}</td>
                  <td className="text-center"><span className="w-2 h-2 inline-block rounded-full" style={{ background: r.h === 'green' ? '#16a34a' : r.h === 'amber' ? '#f59e0b' : '#dc2626' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {active === 'docs' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Panel title="Customs Pre-clearance · Today">
            <div className="space-y-2 text-sm">
              {[
                { p: 'Mundra', total: 84, cleared: 62, pending: 22 },
                { p: 'Jebel Ali', total: 142, cleared: 138, pending: 4 },
                { p: 'Sokhna', total: 38, cleared: 30, pending: 8 },
              ].map((r, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between text-xs mb-1"><span className="font-semibold">{r.p}</span><span className="text-slate-500">{r.cleared}/{r.total}</span></div>
                  <div className="h-1.5 bg-slate-100 rounded overflow-hidden"><div className="h-full" style={{ width: `${(r.cleared / r.total) * 100}%`, background: ACCENT }} /></div>
                  {r.pending > 5 && <div className="text-[10px] text-red-600 mt-1">{r.pending} shipments pending — risk of dwell charges</div>}
                </div>
              ))}
            </div>
          </Panel>
          <Panel title="Doc Exceptions">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" /><div><div className="font-semibold">BL discrepancy · 6 shipments</div><div className="text-xs text-slate-600">Mundra inbound · weight mismatch &gt;2%</div></div></li>
              <li className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /><div><div className="font-semibold">Missing CO · APAC consol</div><div className="text-xs text-slate-600">3 shipments awaiting Certificate of Origin</div></div></li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5" /><div><div className="font-semibold">London Gateway docs clean</div><div className="text-xs text-slate-600">No exceptions past 24h</div></div></li>
            </ul>
          </Panel>
        </div>
      )}

      {active === 'workflow' && (
        <Panel title="Action Workflow · Exception-to-resolution">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {['Signal', 'Owner', 'Recommendation', 'Approval', 'Action Logged'].map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Step {i + 1}</div>
                <div className="text-sm font-semibold mt-1">{s}</div>
                <div className="text-[10px] text-slate-500 mt-1">{[412, 386, 358, 331, 318][i]} this wk</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-600">Exception TAT: <span className="font-semibold text-slate-900">6.2h</span> · SLA breaches avoided: <span className="font-semibold" style={{ color: ACCENT }}>$ 0.42M MTD</span></div>
        </Panel>
      )}

      {active === 'pilot' && (
        <PilotPlan
          accent={ACCENT}
          weeks={[
            { week: 'Week 1', title: 'Connect & Baseline', bullets: ['TOS + WMS + carrier feeds for 1 corridor', 'Baseline KPIs: SLA, exception TAT, cost/move', 'CXO + Lane/DC ops workshop'] },
            { week: 'Week 2', title: 'Intelligence Layer', bullets: ['Live lane + DC orchestration view', 'Reroute / reallocation recommendations', 'Carrier scorecard with auto-flagging'] },
            { week: 'Week 3', title: 'Action & Hand-off', bullets: ['Owner-led approval workflow with audit trail', 'AI Copilot trained on DP World ops vocabulary', 'Steerco · global rollout plan'] },
          ]}
          outcomes={[
            'Live orchestration layer for one high-friction corridor',
            'Reroute / reallocation recommendations with one-click approve',
            'Exception TAT reduced (target: −40%)',
            'Carrier scorecard + automated escalation',
            'AI Copilot grounded in DP World ops vocabulary',
            '90-day plan to scale to additional corridors and DCs',
          ]}
        />
      )}

      {selectedExc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedExc(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={ev => ev.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><SevBadge sev={selectedExc.sev} /><span className="text-xs text-slate-500 font-mono">{selectedExc.id}</span><span className="text-[10px] text-slate-500">· {selectedExc.category}</span></div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedExc.title}</h3>
                <p className="text-sm text-slate-600">{selectedExc.detail}</p>
              </div>
              <button onClick={() => setSelectedExc(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> Root Cause</div><div className="text-sm text-slate-800">{selectedExc.reason}</div></div>
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-sky-700 font-semibold mb-1 flex items-center gap-1.5"><ArrowRight className="w-3 h-3" /> Recommended Action</div><div className="text-sm text-slate-800">{selectedExc.recommendation}</div></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Owner</div><div className="text-sm font-semibold">{selectedExc.owner}</div></div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Impact</div><div className="text-sm font-semibold" style={{ color: ACCENT }}>{selectedExc.impact}</div></div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => resolve(selectedExc.id)} className="flex-1 text-white rounded-lg py-2.5 text-sm font-semibold hover:opacity-90" style={{ background: ACCENT }}>Approve & Log Action</button>
              <button onClick={() => setSelectedExc(null)} className="px-4 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Defer</button>
            </div>
          </div>
        </div>
      )}
    </CommandCenterShell>
  );
};

export default DPWorldOrchestration;

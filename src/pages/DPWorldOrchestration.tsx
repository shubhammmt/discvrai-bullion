import React, { useState, useEffect } from 'react';
import { Ship, AlertTriangle, CheckCircle2, ArrowRight, Bell, X, Warehouse, Truck, Globe } from 'lucide-react';

interface Lane {
  id: string;
  origin: string;
  destination: string;
  status: 'on-track' | 'at-risk' | 'breached';
  slaHours: number;
  variancePct: number;
  costPerMove: number;
  movesToday: number;
}

interface DC {
  id: string;
  name: string;
  region: string;
  utilization: number;
  status: 'healthy' | 'congested' | 'underutilized';
}

interface Exception {
  id: string;
  sev: 'High' | 'Med';
  title: string;
  category: 'Lane' | 'DC' | 'Vendor';
  detail: string;
  reason: string;
  recommendation: string;
  owner: string;
  impact: string;
  status: 'open' | 'resolved';
  ageMin: number;
}

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
const DC_COLOR = { healthy: '#16a34a', congested: '#dc2626', underutilized: '#0ea5e9' };

const DPWorldOrchestration: React.FC = () => {
  const [exceptions, setExceptions] = useState<Exception[]>(INITIAL_EXC);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const open = exceptions.filter(e => e.status === 'open').length;
  const high = exceptions.filter(e => e.status === 'open' && e.sev === 'High').length;
  const totalMoves = LANES.reduce((s, l) => s + l.movesToday, 0);
  const avgCost = (LANES.reduce((s, l) => s + l.costPerMove * l.movesToday, 0) / totalMoves).toFixed(0);

  const resolve = (id: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    setSelectedExc(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#1f4e79] flex items-center justify-center">
            <Ship className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">DP World · Supply Chain Orchestration Layer</div>
            <div className="text-xs text-slate-500">Lanes · DCs · Vendors · Exception-to-Action</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" /> Live · {now.toLocaleTimeString()} UTC</div>
          <div className="text-slate-500">User: <span className="font-semibold text-slate-800">Global Ops Console</span></div>
        </div>
      </div>

      <div className="px-6 py-4 grid grid-cols-6 gap-3">
        {[
          { label: 'On-Time %', val: '91.7%', sub: 'Target 95%', color: 'text-amber-600' },
          { label: 'Cost / Move', val: `$${avgCost}`, sub: `${totalMoves} moves today` },
          { label: 'Avg DC Utilization', val: `${Math.round(DCS.reduce((s, d) => s + d.utilization, 0) / DCS.length)}%`, sub: `${DCS.filter(d => d.status === 'congested').length} congested`, color: 'text-amber-600' },
          { label: 'Open Exceptions', val: `${open}`, sub: `${high} high severity`, color: high > 0 ? 'text-red-600' : 'text-slate-900' },
          { label: 'Lanes Tracked', val: `${LANES.length}`, sub: 'Across 5 regions' },
          { label: 'Avg Exception TAT', val: '64m', sub: 'Down from 4h baseline', color: 'text-emerald-600' },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</div>
            <div className={`text-2xl font-semibold mt-1 ${(k as any).color || 'text-slate-900'}`}>{k.val}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 grid grid-cols-12 gap-4">
        {/* Left col: lanes + DCs */}
        <div className="col-span-7 space-y-4">
          {/* Lanes */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Truck className="w-4 h-4 text-[#1f4e79]" />
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Lane Performance</h3>
            </div>
            <div className="space-y-2">
              {LANES.map(l => (
                <div key={l.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3 grid grid-cols-12 items-center gap-3">
                  <div className="col-span-4 flex items-center gap-2">
                    <span className="w-1 h-8 rounded-full" style={{ background: LANE_COLOR[l.status] }} />
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{l.origin} → {l.destination}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{l.id}</div>
                    </div>
                  </div>
                  <div className="col-span-2 text-xs"><span className="text-slate-500">SLA</span> <span className="font-semibold text-slate-800">{l.slaHours}h</span></div>
                  <div className="col-span-2 text-xs">
                    <span className="text-slate-500">Variance</span>{' '}
                    <span className={`font-semibold ${l.variancePct > 10 ? 'text-red-600' : l.variancePct > 5 ? 'text-amber-600' : 'text-emerald-600'}`}>
                      {l.variancePct > 0 ? '+' : ''}{l.variancePct}%
                    </span>
                  </div>
                  <div className="col-span-2 text-xs"><span className="text-slate-500">$/Move</span> <span className="font-semibold text-slate-800">${l.costPerMove}</span></div>
                  <div className="col-span-2 text-right">
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold uppercase" style={{ background: `${LANE_COLOR[l.status]}15`, color: LANE_COLOR[l.status] }}>
                      {l.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DC capacity */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-3">
              <Warehouse className="w-4 h-4 text-[#1f4e79]" />
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">DC Capacity Signals</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {DCS.map(d => (
                <div key={d.id} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-sm font-semibold text-slate-900">{d.name}</div>
                    <Globe className="w-3 h-3 text-slate-400" />
                  </div>
                  <div className="text-[10px] text-slate-500 mb-2">{d.region}</div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-slate-500">Utilization</span>
                    <span className="font-semibold tabular-nums" style={{ color: DC_COLOR[d.status] }}>{d.utilization}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full" style={{ width: `${d.utilization}%`, background: DC_COLOR[d.status] }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: exception queue */}
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#1f4e79]" />
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Exception → Action Queue</h3>
            </div>
            <span className="text-[10px] text-slate-500">Auditable closure</span>
          </div>
          <div className="space-y-2 flex-1">
            {exceptions.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedExc(e)}
                disabled={e.status === 'resolved'}
                className={`w-full text-left border rounded-lg p-3 transition-all ${
                  e.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60'
                  : 'bg-slate-50 border-slate-200 hover:border-[#1f4e79]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${e.sev === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{e.sev}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">{e.category}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{e.id}</span>
                  <span className="text-[10px] text-slate-500 ml-auto">{e.ageMin}m</span>
                  {e.status === 'resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </div>
                <div className="text-sm font-medium text-slate-900 mb-1">{e.title}</div>
                <div className="text-xs text-slate-600">{e.detail}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-500">Owner: <span className="font-semibold text-slate-700">{e.owner}</span></span>
                  <span className="text-[10px] font-semibold text-[#1f4e79]">{e.impact}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedExc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedExc(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={ev => ev.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${selectedExc.sev === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{selectedExc.sev}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">{selectedExc.category}</span>
                  <span className="text-xs text-slate-500 font-mono">{selectedExc.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedExc.title}</h3>
                <p className="text-sm text-slate-600">{selectedExc.detail}</p>
              </div>
              <button onClick={() => setSelectedExc(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> Detected Cause (Multi-System)</div>
                <div className="text-sm text-slate-800">{selectedExc.reason}</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-orange-700 font-semibold mb-1 flex items-center gap-1.5"><ArrowRight className="w-3 h-3" /> Recommended Action</div>
                <div className="text-sm text-slate-800">{selectedExc.recommendation}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Approver</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedExc.owner}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Impact</div>
                  <div className="text-sm font-semibold text-[#1f4e79]">{selectedExc.impact}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => resolve(selectedExc.id)} className="flex-1 bg-[#1f4e79] text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-[#163a5c]">Approve & Log Action</button>
              <button onClick={() => setSelectedExc(null)} className="px-4 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Defer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DPWorldOrchestration;

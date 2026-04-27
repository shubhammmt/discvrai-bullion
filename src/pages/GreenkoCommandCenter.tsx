import React, { useState, useEffect } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Wind, Sun, Zap, ArrowRight, Bell, TrendingDown, TrendingUp, X } from 'lucide-react';

interface Plant {
  id: string;
  name: string;
  type: 'wind' | 'solar' | 'hydro';
  state: string;
  capacityMW: number;
  generationMW: number;
  planMW: number;
  plf: number;
  costVar: number;
  status: 'healthy' | 'watch' | 'risk';
}

interface Exception {
  id: string;
  sev: 'High' | 'Med';
  plant: string;
  msg: string;
  reason: string;
  recommendation: string;
  owner: string;
  ageMin: number;
  status: 'open' | 'resolved';
  impact: string;
}

const PLANTS: Plant[] = [
  { id: 'AP-S-2', name: 'AP Solar Park 2', type: 'solar', state: 'Andhra Pradesh', capacityMW: 750, generationMW: 612, planMW: 680, plf: 32.4, costVar: 4.2, status: 'risk' },
  { id: 'KA-W-1', name: 'Karnataka Wind 1', type: 'wind', state: 'Karnataka', capacityMW: 320, generationMW: 196, planMW: 210, plf: 28.8, costVar: 1.4, status: 'watch' },
  { id: 'TG-S-3', name: 'Telangana Solar 3', type: 'solar', state: 'Telangana', capacityMW: 500, generationMW: 488, planMW: 480, plf: 36.1, costVar: -0.8, status: 'healthy' },
  { id: 'MP-H-1', name: 'MP Pumped Hydro', type: 'hydro', state: 'Madhya Pradesh', capacityMW: 1200, generationMW: 1140, planMW: 1150, plf: 41.2, costVar: 0.3, status: 'healthy' },
  { id: 'GJ-W-2', name: 'Gujarat Wind 2', type: 'wind', state: 'Gujarat', capacityMW: 410, generationMW: 318, planMW: 360, plf: 30.1, costVar: 2.8, status: 'watch' },
  { id: 'RJ-S-4', name: 'Rajasthan Solar 4', type: 'solar', state: 'Rajasthan', capacityMW: 900, generationMW: 884, planMW: 870, plf: 38.4, costVar: -0.5, status: 'healthy' },
];

const INITIAL_EXCEPTIONS: Exception[] = [
  { id: 'E-1042', sev: 'High', plant: 'AP Solar Park 2', msg: 'Generation 10% below plan · 4 strings underperforming', reason: 'Inverter fault on Block-3 + soiling on Strings 14–22', recommendation: 'Dispatch O&M crew within 6h; isolate Block-3, schedule cleaning cycle', owner: 'Plant Head', ageMin: 42, status: 'open', impact: '₹ 18.4 L/day' },
  { id: 'E-1041', sev: 'High', plant: 'Karnataka Wind 1', msg: 'Predictive maintenance risk · gearbox vibration ↑', reason: 'WTG-08 vibration crossed yellow threshold (4.6 mm/s)', recommendation: 'Schedule inspection in next 48h window; reduce load 15%', owner: 'O&M Lead', ageMin: 95, status: 'open', impact: '₹ 6.2 L/day' },
  { id: 'E-1039', sev: 'Med', plant: 'AP Solar Park 2', msg: 'Cost variance breach · O&M ledger', reason: 'Spares spend +18% MTD vs budget', recommendation: 'Review consumables PO cycle; consolidate 3 vendors', owner: 'Finance', ageMin: 220, status: 'open', impact: '₹ 4.1 L/mo' },
  { id: 'E-1038', sev: 'Med', plant: 'Gujarat Wind 2', msg: 'Forecast vs actual gap 11.7% · curtailment risk', reason: 'Grid scheduling mismatch — DISCOM signal lag', recommendation: 'Re-issue revised schedule; engage SLDC desk', owner: 'Commercial', ageMin: 38, status: 'open', impact: '₹ 3.8 L/day' },
];

const TYPE_ICON = { wind: Wind, solar: Sun, hydro: Zap };
const STATUS_COLOR = { healthy: '#16a34a', watch: '#f59e0b', risk: '#dc2626' };

const GreenkoCommandCenter: React.FC = () => {
  const [exceptions, setExceptions] = useState<Exception[]>(INITIAL_EXCEPTIONS);
  const [selectedPlant, setSelectedPlant] = useState<string | null>(null);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const totalCapacity = PLANTS.reduce((s, p) => s + p.capacityMW, 0);
  const totalGen = PLANTS.reduce((s, p) => s + p.generationMW, 0);
  const totalPlan = PLANTS.reduce((s, p) => s + p.planMW, 0);
  const genVsPlan = ((totalGen / totalPlan) * 100).toFixed(1);
  const openExc = exceptions.filter(e => e.status === 'open').length;
  const highSev = exceptions.filter(e => e.status === 'open' && e.sev === 'High').length;

  const resolve = (id: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    setSelectedExc(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">Greenko · Energy Operations Command Center</div>
            <div className="text-xs text-slate-500">Decision intelligence layer · Across plants and cost centers</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live · {now.toLocaleTimeString()}</div>
          <div className="text-slate-500">User: <span className="font-semibold text-slate-800">CXO Console</span></div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="px-6 py-4 grid grid-cols-6 gap-3">
        {[
          { label: 'Installed Capacity', val: `${(totalCapacity / 1000).toFixed(2)} GW`, sub: `${PLANTS.length} plants` },
          { label: 'Generation vs Plan', val: `${genVsPlan}%`, sub: `${totalGen} / ${totalPlan} MW`, color: parseFloat(genVsPlan) >= 98 ? 'text-emerald-600' : 'text-amber-600' },
          { label: 'Open Exceptions', val: `${openExc}`, sub: `${highSev} high severity`, color: highSev > 0 ? 'text-red-600' : 'text-slate-900' },
          { label: 'Avg PLF', val: `${(PLANTS.reduce((s, p) => s + p.plf, 0) / PLANTS.length).toFixed(1)}%`, sub: 'Trailing 24h' },
          { label: 'Cost Variance MTD', val: '+1.6%', sub: 'vs O&M budget' },
          { label: 'Action Closure SLA', val: '87%', sub: 'within target' },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</div>
            <div className={`text-2xl font-semibold mt-1 ${(k as any).color || 'text-slate-900'}`}>{k.val}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      <div className="px-6 pb-6 grid grid-cols-12 gap-4">
        {/* Plant grid */}
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Unified Plant View</h3>
            <span className="text-[10px] text-slate-500">Click a plant to inspect</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {PLANTS.map(p => {
              const Icon = TYPE_ICON[p.type];
              const sel = selectedPlant === p.id;
              const genPct = (p.generationMW / p.planMW) * 100;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlant(sel ? null : p.id)}
                  className={`text-left bg-slate-50 border rounded-lg p-3 transition-all ${sel ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                        <Icon className="w-4 h-4 text-emerald-700" />
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
                    <span className={`font-semibold ${genPct >= 98 ? 'text-emerald-600' : genPct >= 92 ? 'text-amber-600' : 'text-red-600'}`}>
                      {genPct.toFixed(1)}%
                    </span>
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
        </div>

        {/* Exception queue */}
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-emerald-700" />
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Exception Queue</h3>
            </div>
            <span className="text-[10px] text-slate-500">Owner-assigned · Closure tracked</span>
          </div>
          <div className="space-y-2 flex-1">
            {exceptions.map(e => {
              const filtered = !!selectedPlant && !e.plant.toLowerCase().includes(PLANTS.find(p => p.id === selectedPlant)?.name.toLowerCase().split(' ')[0] || '');
              return (
                <button
                  key={e.id}
                  onClick={() => setSelectedExc(e)}
                  disabled={e.status === 'resolved'}
                  className={`w-full text-left border rounded-lg p-3 transition-all ${
                    e.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60'
                    : filtered ? 'bg-slate-50/50 border-slate-200 opacity-40'
                    : 'bg-slate-50 border-slate-200 hover:border-emerald-400'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${e.sev === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                      {e.sev}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">{e.id}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">{e.ageMin}m ago</span>
                    {e.status === 'resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-1">{e.plant}</div>
                  <div className="text-xs text-slate-600">{e.msg}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-500">Owner: <span className="font-semibold text-slate-700">{e.owner}</span></span>
                    <span className="text-[10px] font-semibold text-emerald-700">{e.impact}</span>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="mt-3 pt-3 border-t border-slate-200 text-[11px] text-slate-500 text-center">
            Auto-escalation engaged · SLA timers running
          </div>
        </div>
      </div>

      {/* Decision modal */}
      {selectedExc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedExc(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={ev => ev.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${selectedExc.sev === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{selectedExc.sev}</span>
                  <span className="text-xs text-slate-500 font-mono">{selectedExc.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedExc.plant}</h3>
                <p className="text-sm text-slate-600">{selectedExc.msg}</p>
              </div>
              <button onClick={() => setSelectedExc(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3 h-3" /> Root Cause
                </div>
                <div className="text-sm text-slate-800">{selectedExc.reason}</div>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-semibold mb-1 flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3" /> Recommended Action
                </div>
                <div className="text-sm text-slate-800">{selectedExc.recommendation}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Assigned Owner</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedExc.owner}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Estimated Impact</div>
                  <div className="text-sm font-semibold text-emerald-700">{selectedExc.impact}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => resolve(selectedExc.id)} className="flex-1 bg-emerald-700 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-emerald-800">
                Approve & Close Action
              </button>
              <button onClick={() => setSelectedExc(null)} className="px-4 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">
                Defer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenkoCommandCenter;

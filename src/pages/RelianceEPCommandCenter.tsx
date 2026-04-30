import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity, AlertTriangle, CheckCircle2, Cpu, Database, Filter, Gauge,
  HelpCircle, LineChart as LineIcon, ListChecks, Play, Pause, RefreshCw,
  ShieldAlert, Siren, TrendingUp, Workflow, Zap, Droplets, Factory,
  ChevronRight, Info, FileText, Send, Hash, Clock, Brain
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip as RTooltip, ResponsiveContainer,
  ReferenceDot, ReferenceLine, CartesianGrid, Area, AreaChart
} from 'recharts';

const ACCENT = '#0D9488';
const INK = '#0B1F33';

// ---------------- Types ----------------
type Status = 'NORMAL' | 'WARN' | 'CRITICAL';
type Band = 'LOW' | 'MEDIUM' | 'HIGH';

interface Asset {
  id: string;
  name: string;
  site: string;
  cls: string;
  band: string; // operating band
  baseScore: number;
  status: Status;
  health: number;
  pFail7d: number;
  riskBand: Band;
  drivers: { name: string; weight: number }[];
  anomalies: number;
  lastUpdate: string;
}

interface Anomaly {
  id: string;
  ts: number;
  tag: string;
  rule_id: string;
  evidence: Record<string, number | string>;
  severity: 'info' | 'warn' | 'critical';
}

interface AuditRow {
  id: string;
  ts: string;
  actor: string;
  action: string;
  asset: string;
  workOrderId?: string;
  status: 'QUEUED' | 'ACCEPTED' | 'EXECUTED';
  payloadHash: string;
}

// ---------------- Seed data ----------------
const SITES = ['KG-D6 FPSO', 'CBM Sohagpur', 'Jamnagar Onshore', 'Krishna Godavari Block'];
const CLASSES = ['Centrifugal Pump', 'Compressor', 'Top-Drive', 'Heat Exchanger', 'Mud Pump'];

const seedAssets: Asset[] = [
  { id: 'KGD-PMP-014', name: 'Subsea Booster Pump 14', site: 'KG-D6 FPSO', cls: 'Centrifugal Pump', band: 'High-flow', baseScore: 92, status: 'NORMAL', health: 92, pFail7d: 0.08, riskBand: 'LOW', drivers: [{ name: 'Vibration RMS stable', weight: 0.3 }, { name: 'Discharge temp nominal', weight: 0.25 }], anomalies: 0, lastUpdate: 'just now' },
  { id: 'KGD-CMP-007', name: 'Gas Compressor Train 7', site: 'KG-D6 FPSO', cls: 'Compressor', band: 'Mid-load', baseScore: 78, status: 'WARN', health: 78, pFail7d: 0.34, riskBand: 'MEDIUM', drivers: [{ name: 'Discharge temp slope ↑', weight: 0.4 }, { name: 'Vibration drift', weight: 0.25 }, { name: '3 anomalies / 24h', weight: 0.2 }], anomalies: 3, lastUpdate: '2m ago' },
  { id: 'KG-RIG-TD-02', name: 'Top-Drive Rig 2', site: 'Krishna Godavari Block', cls: 'Top-Drive', baseScore: 88, band: 'Drilling', status: 'NORMAL', health: 88, pFail7d: 0.11, riskBand: 'LOW', drivers: [{ name: 'Hookload nominal', weight: 0.3 }], anomalies: 1, lastUpdate: '1m ago' },
  { id: 'JMN-HX-031', name: 'Crude Heat Exchanger 31', site: 'Jamnagar Onshore', cls: 'Heat Exchanger', baseScore: 64, band: 'Fouling-watch', status: 'CRITICAL', health: 64, pFail7d: 0.71, riskBand: 'HIGH', drivers: [{ name: 'ΔT degradation 14%', weight: 0.45 }, { name: 'Fouling factor rising', weight: 0.3 }, { name: 'Pressure drop ↑', weight: 0.15 }], anomalies: 7, lastUpdate: '30s ago' },
  { id: 'CBM-MP-009', name: 'Mud Pump Skid 9', site: 'CBM Sohagpur', cls: 'Mud Pump', baseScore: 81, band: 'Mid-load', status: 'NORMAL', health: 81, pFail7d: 0.18, riskBand: 'LOW', drivers: [{ name: 'Pump pressure stable', weight: 0.3 }], anomalies: 0, lastUpdate: '4m ago' },
  { id: 'KGD-PMP-021', name: 'Booster Pump 21', site: 'KG-D6 FPSO', cls: 'Centrifugal Pump', band: 'High-flow', baseScore: 86, status: 'NORMAL', health: 86, pFail7d: 0.12, riskBand: 'LOW', drivers: [{ name: 'All tags nominal', weight: 0.5 }], anomalies: 0, lastUpdate: '1m ago' },
];

// generate 24h time series for selected asset
function genSeries(seed: number, baseline: number, vol: number, scenario: 'normal' | 'degrading' | 'failing') {
  const pts: { t: number; vibration: number; temp: number; pressure: number }[] = [];
  const N = 96; // 15-min ticks over 24h
  let v = baseline;
  let temp = 65;
  let pres = 42;
  for (let i = 0; i < N; i++) {
    const noise = Math.sin(i * 0.7 + seed) * vol + (Math.random() - 0.5) * vol * 0.6;
    v = baseline + noise;
    temp = 65 + Math.sin(i * 0.3 + seed) * 1.2 + (Math.random() - 0.5) * 0.6;
    pres = 42 + Math.cos(i * 0.4) * 0.8 + (Math.random() - 0.5) * 0.4;
    if (scenario === 'degrading' && i > 60) {
      v += (i - 60) * 0.05;
      temp += (i - 60) * 0.15;
    }
    if (scenario === 'failing' && i > 50) {
      v += (i - 50) * 0.12;
      temp += (i - 50) * 0.35;
      pres += (i - 50) * 0.08;
    }
    pts.push({ t: i, vibration: +v.toFixed(2), temp: +temp.toFixed(1), pressure: +pres.toFixed(1) });
  }
  return pts;
}

// rolling z-score anomaly detector
function detectAnomalies(series: { t: number; vibration: number; temp: number }[]): Anomaly[] {
  const out: Anomaly[] = [];
  const win = 24;
  const zThr = 3.0;
  (['vibration', 'temp'] as const).forEach((tag) => {
    for (let i = win; i < series.length; i++) {
      const window = series.slice(i - win, i).map(p => p[tag] as number);
      const mu = window.reduce((a, b) => a + b, 0) / win;
      const sd = Math.sqrt(window.reduce((a, b) => a + (b - mu) ** 2, 0) / win) || 0.01;
      const x = series[i][tag] as number;
      const z = Math.abs((x - mu) / sd);
      if (z > zThr) {
        out.push({
          id: `${tag}-${i}`,
          ts: series[i].t,
          tag,
          rule_id: 'ROLL_Z_24',
          evidence: { x: +x.toFixed(2), mu_24h: +mu.toFixed(2), sigma: +sd.toFixed(2), z_score: +z.toFixed(2), z_threshold: zThr },
          severity: z > 4.5 ? 'critical' : 'warn',
        });
      }
    }
    // slope rule
    for (let i = 60; i < series.length; i++) {
      const w = series.slice(i - 60, i).map(p => p[tag] as number);
      const slope = (w[w.length - 1] - w[0]) / 60;
      const thr = tag === 'temp' ? 0.25 : 0.06;
      if (slope > thr) {
        out.push({
          id: `${tag}-slope-${i}`,
          ts: series[i].t,
          tag,
          rule_id: 'SLOPE_60',
          evidence: { slope_per_tick: +slope.toFixed(3), threshold: thr, window_pts: 60 },
          severity: 'warn',
        });
      }
    }
  });
  return out;
}

// ---------------- Component ----------------
const RelianceEPCommandCenter: React.FC = () => {
  const [tab, setTab] = useState<'overview' | 'health' | 'anomaly' | 'predict' | 'execute'>('overview');
  const [demoMode, setDemoMode] = useState(false);
  const [scenario, setScenario] = useState<'normal' | 'degrading' | 'failing'>('degrading');
  const [assets, setAssets] = useState<Asset[]>(seedAssets);
  const [selectedId, setSelectedId] = useState<string>('JMN-HX-031');
  const [filterSite, setFilterSite] = useState<string>('All');
  const [filterClass, setFilterClass] = useState<string>('All');
  const [showFormula, setShowFormula] = useState(false);
  const [audit, setAudit] = useState<AuditRow[]>([]);
  const [executing, setExecuting] = useState<string | null>(null);
  const tickRef = useRef<number>(0);

  const selected = assets.find(a => a.id === selectedId)!;
  const series = useMemo(() => genSeries(selected.baseScore, selected.cls === 'Heat Exchanger' ? 6 : 4, 1.2,
    selected.status === 'CRITICAL' ? 'failing' : selected.status === 'WARN' ? 'degrading' : 'normal'
  ), [selected.id, selected.status]);
  const anomalies = useMemo(() => detectAnomalies(series), [series]);

  // Demo mode: progressively degrade KGD-CMP-007 to CRITICAL
  useEffect(() => {
    if (!demoMode) return;
    const iv = setInterval(() => {
      tickRef.current += 1;
      setAssets(prev => prev.map(a => {
        if (a.id !== 'KGD-CMP-007') return a;
        const newHealth = Math.max(38, a.health - 2);
        const newP = Math.min(0.92, a.pFail7d + 0.05);
        const status: Status = newHealth < 60 ? 'CRITICAL' : newHealth < 80 ? 'WARN' : 'NORMAL';
        const band: Band = newP > 0.6 ? 'HIGH' : newP > 0.3 ? 'MEDIUM' : 'LOW';
        return { ...a, health: newHealth, pFail7d: newP, status, riskBand: band, anomalies: a.anomalies + 1, lastUpdate: 'live' };
      }));
      if (tickRef.current > 8) setDemoMode(false);
    }, 1500);
    return () => clearInterval(iv);
  }, [demoMode]);

  const filtered = assets.filter(a =>
    (filterSite === 'All' || a.site === filterSite) &&
    (filterClass === 'All' || a.cls === filterClass)
  );

  const recommend = (a: Asset): { action: string; reason: string; sla: string }[] => {
    const recs: { action: string; reason: string; sla: string }[] = [];
    if (a.riskBand === 'HIGH' || a.status === 'CRITICAL') {
      recs.push({ action: 'HOLD_OPERATION', reason: 'High p_fail_7d with active critical anomalies', sla: 'Immediate' });
      recs.push({ action: 'INSPECT', reason: 'Dispatch reliability engineer for on-site root cause', sla: '< 4h' });
    }
    if (a.riskBand === 'MEDIUM' || a.status === 'WARN') {
      recs.push({ action: 'DERATE', reason: 'Reduce setpoint by 12% to stabilise vibration & temp', sla: '< 30m' });
      recs.push({ action: 'SCHEDULE_PM', reason: 'Preventive maintenance window in next opportunity', sla: '< 72h' });
    }
    if (recs.length === 0) recs.push({ action: 'MONITOR', reason: 'Asset within nominal envelope', sla: 'Routine' });
    return recs;
  };

  const triggerExecute = async (action: string) => {
    setExecuting(action);
    await new Promise(r => setTimeout(r, 900));
    const woId = `WO-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    const corrId = `corr-${Date.now().toString(36)}`;
    const hash = Math.random().toString(16).slice(2, 14);
    setAudit(prev => [{
      id: corrId,
      ts: new Date().toISOString().replace('T', ' ').slice(0, 19),
      actor: 'reliability.lead@reliance',
      action: `${action} → n8n.workorder.create`,
      asset: selected.id,
      workOrderId: woId,
      status: 'ACCEPTED',
      payloadHash: hash,
    }, ...prev]);
    setExecuting(null);
  };

  const statusClr = (s: Status) =>
    s === 'CRITICAL' ? 'bg-red-50 text-red-700 border-red-200'
    : s === 'WARN' ? 'bg-amber-50 text-amber-700 border-amber-200'
    : 'bg-emerald-50 text-emerald-700 border-emerald-200';
  const bandClr = (b: Band) =>
    b === 'HIGH' ? 'bg-red-600 text-white'
    : b === 'MEDIUM' ? 'bg-amber-500 text-white'
    : 'bg-emerald-600 text-white';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top nav */}
      <header className="sticky top-0 z-20 bg-white border-b border-slate-200">
        <div className="max-w-[1500px] mx-auto px-6 py-3 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md grid place-items-center text-white font-bold" style={{ background: INK }}>R</div>
            <div>
              <p className="text-sm font-bold leading-tight">Reliance E&P · Operations Command Center</p>
              <p className="text-[10px] text-slate-500 leading-tight">Illustrative demo · Synthetic telemetry · DiscvrAI</p>
            </div>
          </div>
          <nav className="flex items-center gap-1 ml-4">
            {[
              { k: 'overview', label: 'Overview', icon: Activity },
              { k: 'health', label: '1 · Asset Health', icon: Gauge },
              { k: 'anomaly', label: '2 · Anomaly', icon: Siren },
              { k: 'predict', label: '3 · Predictive', icon: Brain },
              { k: 'execute', label: '4 · Decide & Execute', icon: Workflow },
            ].map(t => {
              const Ic = t.icon;
              const active = tab === t.k;
              return (
                <button key={t.k} onClick={() => setTab(t.k as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${active ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>
                  <Ic className="h-3.5 w-3.5" /> {t.label}
                </button>
              );
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <select value={scenario} onChange={e => setScenario(e.target.value as any)}
              className="text-xs border border-slate-200 rounded-md px-2 py-1.5 bg-white">
              <option value="normal">Scenario: Normal</option>
              <option value="degrading">Scenario: Degrading</option>
              <option value="failing">Scenario: Failing</option>
            </select>
            <button onClick={() => { setDemoMode(true); tickRef.current = 0; }}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md text-white font-medium" style={{ background: ACCENT }}>
              {demoMode ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {demoMode ? 'Running…' : 'Inject bad telemetry'}
            </button>
            <button onClick={() => { setAssets(seedAssets); setAudit([]); tickRef.current = 0; }}
              className="text-xs px-2.5 py-1.5 rounded-md border border-slate-200 hover:bg-slate-50 flex items-center gap-1">
              <RefreshCw className="h-3 w-3" /> Reset
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1500px] mx-auto px-6 py-5">

        {/* OVERVIEW */}
        {tab === 'overview' && (
          <div className="space-y-5">
            <div className="grid grid-cols-4 gap-4">
              {[
                { label: 'Assets monitored', value: assets.length, sub: 'across 4 sites', icon: Factory, clr: 'text-slate-700' },
                { label: 'Critical right now', value: assets.filter(a => a.status === 'CRITICAL').length, sub: 'requires hold/inspect', icon: AlertTriangle, clr: 'text-red-600' },
                { label: 'High p_fail (7d)', value: assets.filter(a => a.riskBand === 'HIGH').length, sub: 'predictive band', icon: TrendingUp, clr: 'text-amber-600' },
                { label: 'Workflows executed (24h)', value: audit.length, sub: 'n8n orchestrated', icon: Workflow, clr: 'text-teal-700' },
              ].map((k, i) => {
                const Ic = k.icon;
                return (
                  <div key={i} className="bg-white border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</p>
                      <Ic className={`h-4 w-4 ${k.clr}`} />
                    </div>
                    <p className={`text-3xl font-bold mt-1 ${k.clr}`}>{k.value}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{k.sub}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-sm font-bold">Live fleet status</p>
                    <p className="text-[11px] text-slate-500">Click an asset to drill into its health, anomalies and risk drivers</p>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">refreshed live</span>
                </div>
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-left text-[10px] uppercase text-slate-500 border-b border-slate-200">
                      <th className="py-2">Asset</th><th>Site</th><th>Class</th>
                      <th>Health</th><th>Status</th><th>p_fail 7d</th><th>Anomalies</th><th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.map(a => (
                      <tr key={a.id} className="border-b border-slate-100 hover:bg-slate-50 cursor-pointer"
                        onClick={() => { setSelectedId(a.id); setTab('health'); }}>
                        <td className="py-2.5">
                          <div className="font-bold text-slate-900">{a.name}</div>
                          <div className="text-[10px] font-mono text-slate-400">{a.id}</div>
                        </td>
                        <td className="text-slate-600">{a.site}</td>
                        <td className="text-slate-600">{a.cls}</td>
                        <td><span className="font-bold">{a.health}</span><span className="text-slate-400">/100</span></td>
                        <td><span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusClr(a.status)}`}>{a.status}</span></td>
                        <td>
                          <div className="flex items-center gap-1.5">
                            <span className={`h-2 w-2 rounded-full ${a.riskBand === 'HIGH' ? 'bg-red-500' : a.riskBand === 'MEDIUM' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                            <span className="font-mono text-[11px]">{(a.pFail7d * 100).toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="text-slate-700 font-semibold">{a.anomalies}</td>
                        <td><ChevronRight className="h-3.5 w-3.5 text-slate-400" /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <p className="text-sm font-bold mb-3 flex items-center gap-1.5"><ListChecks className="h-4 w-4" /> Recent decisions</p>
                {audit.length === 0 ? (
                  <p className="text-xs text-slate-500">No workflow actions yet. Go to <button onClick={() => setTab('execute')} className="underline text-teal-700">Decide & Execute</button> to dispatch a work order.</p>
                ) : (
                  <div className="space-y-2">
                    {audit.slice(0, 5).map(r => (
                      <div key={r.id} className="border border-slate-100 rounded-md p-2.5 text-[11px]">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-mono text-slate-400">{r.ts}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold">{r.status}</span>
                        </div>
                        <p className="font-semibold text-slate-900">{r.action}</p>
                        <p className="text-slate-500">Asset: <span className="font-mono">{r.asset}</span> · WO <span className="font-mono">{r.workOrderId}</span></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-lg p-5">
              <p className="text-xs uppercase tracking-wider text-teal-300 font-semibold mb-2">Why this matters for Reliance E&P</p>
              <div className="grid grid-cols-4 gap-4 text-xs">
                <div><p className="font-bold text-sm mb-1">Edge layer, not rip-and-replace</p><p className="text-slate-300">Reads from PI/SCADA/historians; writes back via n8n to SAP PM, MAXIMO, or PTW systems.</p></div>
                <div><p className="font-bold text-sm mb-1">Explainable score</p><p className="text-slate-300">Health & p_fail outputs include numeric evidence and rule_id — no black box.</p></div>
                <div><p className="font-bold text-sm mb-1">Human-in-the-loop</p><p className="text-slate-300">Every material action requires sign-off; immutable audit row written.</p></div>
                <div><p className="font-bold text-sm mb-1">Weeks to pilot</p><p className="text-slate-300">Same rules engine drives KG-D6 pumps, drilling rigs, Jamnagar exchangers.</p></div>
              </div>
            </div>
          </div>
        )}

        {/* HEALTH */}
        {tab === 'health' && (
          <div className="grid grid-cols-12 gap-4">
            <aside className="col-span-4 bg-white border border-slate-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="h-3.5 w-3.5 text-slate-500" />
                <p className="text-xs font-bold text-slate-700">Fleet</p>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <select value={filterSite} onChange={e => setFilterSite(e.target.value)} className="text-[11px] border border-slate-200 rounded px-2 py-1.5">
                  <option>All</option>{SITES.map(s => <option key={s}>{s}</option>)}
                </select>
                <select value={filterClass} onChange={e => setFilterClass(e.target.value)} className="text-[11px] border border-slate-200 rounded px-2 py-1.5">
                  <option>All</option>{CLASSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1.5 max-h-[600px] overflow-y-auto">
                {filtered.map(a => (
                  <button key={a.id} onClick={() => setSelectedId(a.id)}
                    className={`w-full text-left p-2.5 rounded-md border ${selectedId === a.id ? 'border-teal-500 bg-teal-50' : 'border-slate-200 hover:border-slate-300'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{a.name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${statusClr(a.status)}`}>{a.status}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span>{a.site}</span>
                      <span className="font-mono">H {a.health}</span>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <section className="col-span-8 space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{selected.cls} · {selected.site}</p>
                    <h2 className="text-2xl font-bold mt-1">{selected.name}</h2>
                    <p className="text-[11px] font-mono text-slate-400">{selected.id} · band: {selected.band}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className={`px-2.5 py-1 rounded-full border text-xs font-bold ${statusClr(selected.status)}`}>{selected.status}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">Updated {selected.lastUpdate}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mt-5">
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Health score</p>
                      <button onClick={() => setShowFormula(!showFormula)} className="text-slate-400 hover:text-slate-700"><HelpCircle className="h-3.5 w-3.5" /></button>
                    </div>
                    <p className="text-4xl font-bold mt-1">{selected.health}<span className="text-base text-slate-400">/100</span></p>
                    <div className="h-2 bg-white rounded-full overflow-hidden mt-2 border border-slate-200">
                      <div className={`h-full ${selected.health < 60 ? 'bg-red-500' : selected.health < 80 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${selected.health}%` }} />
                    </div>
                    <AnimatePresence>
                      {showFormula && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                          className="mt-3 text-[10px] text-slate-600 bg-white p-2 rounded border border-slate-200">
                          <p className="font-bold mb-1">Score formula (transparent):</p>
                          <code className="block text-[10px] text-slate-700">health = 100 − Σ wᵢ · |z(tagᵢ)| − k · anomalies_24h</code>
                          <p className="mt-1">wᵢ are tag weights (configured), z is rolling 24h normalised deviation, k = 1.5.</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Anomalies (24h)</p>
                    <p className="text-4xl font-bold mt-1">{anomalies.length}</p>
                    <p className="text-[11px] text-slate-500 mt-1">across vibration & temp tags</p>
                    <button onClick={() => setTab('anomaly')} className="text-[11px] text-teal-700 font-semibold mt-2 inline-flex items-center gap-1">View signals <ChevronRight className="h-3 w-3" /></button>
                  </div>

                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">p_fail (7d)</p>
                    <div className="flex items-end gap-2 mt-1">
                      <p className="text-4xl font-bold">{(selected.pFail7d * 100).toFixed(0)}<span className="text-base text-slate-400">%</span></p>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${bandClr(selected.riskBand)}`}>{selected.riskBand}</span>
                    </div>
                    <button onClick={() => setTab('predict')} className="text-[11px] text-teal-700 font-semibold mt-2 inline-flex items-center gap-1">See drivers <ChevronRight className="h-3 w-3" /></button>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-5">
                <p className="text-sm font-bold mb-2">Tag trends · last 24h</p>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={series}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} />
                    <RTooltip contentStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="vibration" stroke="#0D9488" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="temp" stroke="#dc2626" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="pressure" stroke="#6366f1" strokeWidth={1.5} dot={false} strokeDasharray="3 3" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-4 text-[10px] text-slate-600 mt-1">
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-teal-600" /> Vibration RMS (mm/s)</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-red-600" /> Discharge temp (°C, normalised)</span>
                  <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-500" /> Pressure (bar, normalised)</span>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ANOMALY */}
        {tab === 'anomaly' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-sm font-bold">{selected.name} · multi-tag signals (24h)</p>
                  <p className="text-[11px] text-slate-500">Markers reference rule_id and numeric evidence — no mystery alerts</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 bg-slate-100 rounded">z_thr=3.0 · slope_window=60</span>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={series}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} />
                  <RTooltip contentStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="vibration" stroke="#0D9488" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="temp" stroke="#dc2626" strokeWidth={2} dot={false} />
                  {anomalies.filter(a => a.tag === 'vibration').map(a => (
                    <ReferenceDot key={a.id} x={a.ts} y={(series[a.ts] as any)?.vibration} r={5} fill="#0D9488" stroke="#fff" strokeWidth={2} />
                  ))}
                  {anomalies.filter(a => a.tag === 'temp').map(a => (
                    <ReferenceDot key={a.id} x={a.ts} y={(series[a.ts] as any)?.temp} r={5} fill="#dc2626" stroke="#fff" strokeWidth={2} />
                  ))}
                </LineChart>
              </ResponsiveContainer>

              <div className="mt-4">
                <p className="text-xs font-bold mb-2">Detected anomalies ({anomalies.length})</p>
                <div className="max-h-[260px] overflow-y-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-[11px]">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr className="text-left text-slate-500 uppercase text-[9px]">
                        <th className="p-2">Tick</th><th>Tag</th><th>Rule</th><th>Evidence</th><th>Severity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {anomalies.length === 0 ? (
                        <tr><td colSpan={5} className="p-4 text-center text-slate-400">No anomalies in this window — try the Failing scenario.</td></tr>
                      ) : anomalies.map(a => (
                        <tr key={a.id} className="border-t border-slate-100">
                          <td className="p-2 font-mono">{a.ts}</td>
                          <td className="font-semibold">{a.tag}</td>
                          <td><span className="font-mono px-1.5 py-0.5 bg-slate-100 rounded">{a.rule_id}</span></td>
                          <td className="font-mono text-[10px] text-slate-600">{Object.entries(a.evidence).map(([k, v]) => `${k}=${v}`).join(' · ')}</td>
                          <td>
                            <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${a.severity === 'critical' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{a.severity.toUpperCase()}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-span-4 space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-bold mb-2 flex items-center gap-1.5"><Info className="h-3.5 w-3.5" /> Algorithms in play</p>
                <div className="space-y-2 text-[11px]">
                  <div className="border border-slate-200 rounded p-2.5">
                    <p className="font-bold">ROLL_Z_24 — Rolling z-score</p>
                    <code className="text-[10px] block mt-1 text-slate-600">z = |x − μ_24h| / σ_24h ; flag if z &gt; 3.0</code>
                    <p className="text-slate-500 mt-1">Catches sudden tag deviations against recent 24h behaviour.</p>
                  </div>
                  <div className="border border-slate-200 rounded p-2.5">
                    <p className="font-bold">SLOPE_60 — Trend break</p>
                    <code className="text-[10px] block mt-1 text-slate-600">slope_60 = (xₜ − xₜ₋₆₀) / 60 ; flag if &gt; threshold</code>
                    <p className="text-slate-500 mt-1">Catches sustained drift even when no single point is extreme.</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <p className="text-xs font-bold text-amber-800 mb-1">Known limitations (documented)</p>
                <ul className="text-[11px] text-amber-700 space-y-1 list-disc list-inside">
                  <li>Cold-start: needs ≥24 ticks before z-score is reliable.</li>
                  <li>Scenario-driven false positives possible during commissioning.</li>
                  <li>Currently univariate; multivariate (PCA-residual) is on the roadmap.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PREDICT */}
        {tab === 'predict' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7 bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-sm font-bold">7-day failure probability — {selected.name}</p>
              <p className="text-[11px] text-slate-500 mb-4">Logistic regression on rolling features (means, σ, slopes, anomaly counts). Trained on synthetic labelled episodes.</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="p-5 rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">p_fail_7d</p>
                  <p className="text-5xl font-bold mt-1">{(selected.pFail7d * 100).toFixed(0)}<span className="text-lg text-slate-400">%</span></p>
                  <span className={`inline-block mt-2 px-2.5 py-0.5 rounded text-[10px] font-bold ${bandClr(selected.riskBand)}`}>RISK BAND: {selected.riskBand}</span>
                </div>
                <div className="p-5 rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white">
                  <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Top failure drivers</p>
                  <div className="space-y-2 mt-2">
                    {selected.drivers.map((d, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-medium">{d.name}</span>
                          <span className="font-mono font-bold">w={d.weight.toFixed(2)}</span>
                        </div>
                        <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-teal-600" style={{ width: `${d.weight * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs font-bold mb-2">Risk trajectory (last 24h projected to +7d)</p>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={series.map((s, i) => ({ t: i, p: Math.min(0.95, selected.pFail7d * (0.4 + (i / series.length) * 0.7)) }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="t" tick={{ fontSize: 10 }} />
                  <YAxis tick={{ fontSize: 10 }} domain={[0, 1]} />
                  <RTooltip contentStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="p" stroke="#dc2626" fill="#fecaca" />
                  <ReferenceLine y={0.6} stroke="#dc2626" strokeDasharray="3 3" label={{ value: 'HIGH', fontSize: 9, fill: '#dc2626' }} />
                  <ReferenceLine y={0.3} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'MEDIUM', fontSize: 9, fill: '#f59e0b' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="col-span-5 space-y-4">
              <div className="bg-slate-900 text-white rounded-lg p-4">
                <p className="text-[10px] uppercase tracking-wider text-teal-300 font-semibold">Model card</p>
                <p className="text-sm font-bold mt-1">DiscvrAI · ReliabilityModel v0.4 (synthetic)</p>
                <div className="grid grid-cols-2 gap-2 text-[10px] mt-3 text-slate-300">
                  <div><span className="block text-slate-500">Type</span>Logistic regression</div>
                  <div><span className="block text-slate-500">Features</span>14 rolling stats</div>
                  <div><span className="block text-slate-500">Horizon</span>7 days</div>
                  <div><span className="block text-slate-500">Calibration</span>Platt scaled</div>
                </div>
                <p className="text-[10px] text-slate-400 mt-3 italic">Drivers shown are non-contradictory: same evidence powers anomaly markers in Module 2.</p>
              </div>
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <p className="text-xs font-bold mb-2">Recommended next step</p>
                {recommend(selected).slice(0, 1).map((r, i) => (
                  <div key={i} className="border border-teal-200 bg-teal-50 rounded-md p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-teal-900">{r.action}</span>
                      <span className="text-[10px] text-teal-700 font-mono">SLA {r.sla}</span>
                    </div>
                    <p className="text-[11px] text-teal-800">{r.reason}</p>
                  </div>
                ))}
                <button onClick={() => setTab('execute')} className="mt-3 w-full text-xs py-2 rounded-md text-white font-semibold" style={{ background: ACCENT }}>
                  Go to Decide & Execute →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* EXECUTE */}
        {tab === 'execute' && (
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-7 bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-sm font-bold">Recommended actions · {selected.name}</p>
              <p className="text-[11px] text-slate-500 mb-4">Mapped from risk band + active anomaly types via policy.yaml — humans approve every material action.</p>

              <div className="space-y-2.5 mb-5">
                {recommend(selected).map((r, i) => (
                  <div key={i} className="border border-slate-200 rounded-lg p-3.5 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-sm font-bold">{r.action}</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 rounded">SLA {r.sla}</span>
                      </div>
                      <p className="text-[11px] text-slate-600">{r.reason}</p>
                    </div>
                    <button disabled={executing === r.action}
                      onClick={() => triggerExecute(r.action)}
                      className="text-xs px-3 py-1.5 rounded-md text-white font-semibold disabled:opacity-50 flex items-center gap-1.5"
                      style={{ background: r.action === 'HOLD_OPERATION' ? '#dc2626' : ACCENT }}>
                      {executing === r.action ? <RefreshCw className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                      Execute
                    </button>
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-2">Workflow target</p>
                <div className="flex items-center gap-3 text-[11px]">
                  <Workflow className="h-4 w-4 text-teal-700" />
                  <code className="font-mono text-slate-700">POST https://n8n.reliance.local/webhook/workorder.create</code>
                </div>
                <p className="text-[10px] text-slate-500 mt-1.5">Returns 202 + work_order_id; downstream hops into SAP PM / MAXIMO via existing connectors.</p>
              </div>
            </div>

            <div className="col-span-5 bg-white border border-slate-200 rounded-lg p-5">
              <p className="text-sm font-bold flex items-center gap-1.5"><FileText className="h-4 w-4" /> Immutable audit trail</p>
              <p className="text-[11px] text-slate-500 mb-3">Every executed action stamped with correlation id + payload hash.</p>
              {audit.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs border border-dashed border-slate-200 rounded-lg">
                  No actions yet. Execute a recommendation to see the audit row appear.
                </div>
              ) : (
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {audit.map(r => (
                    <div key={r.id} className="border border-slate-200 rounded-md p-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1"><Clock className="h-3 w-3" />{r.ts}</span>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-bold">{r.status} · 202</span>
                      </div>
                      <p className="text-xs font-bold text-slate-900">{r.action}</p>
                      <div className="grid grid-cols-2 gap-1 mt-1.5 text-[10px]">
                        <div><span className="text-slate-500">Asset:</span> <span className="font-mono">{r.asset}</span></div>
                        <div><span className="text-slate-500">WO:</span> <span className="font-mono">{r.workOrderId}</span></div>
                        <div><span className="text-slate-500">Actor:</span> {r.actor}</div>
                        <div className="flex items-center gap-1"><Hash className="h-2.5 w-2.5 text-slate-400" /><span className="font-mono text-slate-500">{r.payloadHash}</span></div>
                      </div>
                      <div className="mt-1.5 text-[10px] text-slate-500">corr-id <span className="font-mono">{r.id}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </main>

      <footer className="max-w-[1500px] mx-auto px-6 py-4 mt-4 border-t border-slate-200">
        <p className="text-[10px] text-slate-400 text-center">
          Illustrative demo only · Synthetic telemetry, fictitious asset IDs and scenarios · Not for operational use ·
          Built by DiscvrAI for the Reliance E&P workshop.
        </p>
      </footer>
    </div>
  );
};

export default RelianceEPCommandCenter;

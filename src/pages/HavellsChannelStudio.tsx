import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, MapPin, AlertTriangle, TrendingDown, TrendingUp,
  Package, Calendar, Users, Send, ChevronRight, CheckCircle2, Clock, Bell,
  ShieldAlert, Activity, FileText, Sparkles, X
} from 'lucide-react';
import { toast } from 'sonner';

const NAVY = '#0F2A4A';
const ACCENT = '#F59E0B';
const RED = '#DC2626';
const GREEN = '#059669';
const INK = '#0B1220';

// --- MOCK DATA ---
const REGIONS = [
  { code: 'North', state: 'amber', fill: 87.4, dRisk: 142, branches: 18, delta: -2.1 },
  { code: 'West',  state: 'red',   fill: 81.2, dRisk: 318, branches: 22, delta: -5.4 },
  { code: 'South', state: 'green', fill: 93.8, dRisk: 41,  branches: 19, delta: +1.2 },
  { code: 'East',  state: 'amber', fill: 88.1, dRisk: 96,  branches: 14, delta: -1.4 },
];

const TOP_BRANCHES = [
  { id: 'WST-MUM-04', region: 'West',  name: 'Mumbai Central — Cluster 04', risk: 78, drop: -6.2 },
  { id: 'WST-PUN-02', region: 'West',  name: 'Pune Hinjewadi',              risk: 64, drop: -4.8 },
  { id: 'NTH-DEL-07', region: 'North', name: 'Delhi NCR — Gurgaon East',    risk: 52, drop: -3.1 },
  { id: 'WST-AHM-01', region: 'West',  name: 'Ahmedabad SG Highway',        risk: 47, drop: -3.9 },
  { id: 'EST-KOL-03', region: 'East',  name: 'Kolkata Salt Lake',           risk: 36, drop: -2.4 },
];

const DISTRIBUTORS = [
  { id: 'D-204', name: 'Sai Electricals (Mumbai)',   region: 'West',  fill: 72.4, otif: 78, gap: -14.2, scheme: 'High',   status: 'critical' },
  { id: 'D-118', name: 'Krishna Trade Links (Pune)', region: 'West',  fill: 84.1, otif: 86, gap: -6.3,  scheme: 'Medium', status: 'watch' },
  { id: 'D-241', name: 'Rajdhani Distributors',      region: 'West',  fill: 91.0, otif: 92, gap: -1.1,  scheme: 'Low',    status: 'ok' },
  { id: 'D-187', name: 'Ganesh Marketing',           region: 'West',  fill: 89.6, otif: 88, gap: -2.8,  scheme: 'Medium', status: 'ok' },
  { id: 'D-312', name: 'Western Powerlines',         region: 'West',  fill: 86.2, otif: 84, gap: -3.9,  scheme: 'Low',    status: 'watch' },
];

const D204_SKUS = [
  { sku: 'MOD-PLT-WHT-6M', name: 'Modular plate white 6M', fill: 64, cover: 2.1, lost: 18.4, flag: 'stockout' },
  { sku: 'LED-DL-12W',     name: 'LED downlighter 12W',    fill: 71, cover: 3.4, lost: 22.6, flag: 'partial' },
  { sku: 'MCB-32A-DP',     name: 'MCB 32A DP',             fill: 58, cover: 1.7, lost: 14.1, flag: 'stockout' },
  { sku: 'FAN-CL-1200',    name: 'Ceiling fan 1200mm',     fill: 88, cover: 9.2, lost: 4.2,  flag: 'slump' },
  { sku: 'WIR-25-FR',      name: 'Wire 2.5sqmm FR (90m)',  fill: 92, cover: 7.6, lost: 1.8,  flag: 'ok' },
  { sku: 'GYS-15L-5S',     name: 'Geyser 15L 5-star',      fill: 81, cover: 5.3, lost: 6.7,  flag: 'partial' },
];

const EXCEPTIONS_INIT = [
  { id: 'EX-9041', type: 'Fill breach',                 region: 'West',  dist: 'D-204', sku: 'MOD-PLT-WHT-6M', risk: 18.4, age: '2d 4h', owner: '—' },
  { id: 'EX-9032', type: 'Fill breach',                 region: 'West',  dist: 'D-204', sku: 'MCB-32A-DP',     risk: 14.1, age: '3d 1h', owner: '—' },
  { id: 'EX-9028', type: 'Post-scheme inventory hangover', region: 'North', dist: 'D-156', sku: 'LED-DL-12W', risk: 11.7, age: '1d 8h', owner: 'RM North' },
  { id: 'EX-9025', type: 'Beat plan miss vs sell-through', region: 'West', dist: 'D-118', sku: 'FAN-CL-1200', risk: 9.2,  age: '4d',    owner: '—' },
  { id: 'EX-9019', type: 'Unexplained sell-in spike',   region: 'East',  dist: 'D-273', sku: 'WIR-25-FR',      risk: 7.4,  age: '1d 2h', owner: '—' },
  { id: 'EX-9012', type: 'Fill breach',                 region: 'West',  dist: 'D-241', sku: 'GYS-15L-5S',     risk: 6.7,  age: '5d',    owner: 'Branch Mgr' },
];

const DRIVERS_BY_EX: Record<string, { drivers: string[]; conf: 'High'|'Med' }> = {
  'EX-9041': {
    drivers: [
      'Replenishment from Bhiwandi DC delayed by 36h (truck rotation gap)',
      'Sell-out spike on D-204 over weekend trade event (+42% vs 4-wk avg)',
      'No safety-stock buffer on plate SKUs at distributor level',
    ], conf: 'High',
  },
  'EX-9032': { drivers: ['MCB 32A allocation pulled to North scheme', 'Open POs against D-204 unfulfilled past T+3', 'Substitution SKU also low — no fallback'], conf: 'High' },
  'EX-9028': { drivers: ['Post-Diwali scheme overstock at D-156', 'Sell-out at half of pre-scheme run rate', 'Returns request initiated by distributor'], conf: 'Med' },
  'EX-9025': { drivers: ['Beat plan visits down 28% in cluster', 'Sell-through gap widening week-on-week', 'RM bandwidth split across 3 launches'], conf: 'Med' },
  'EX-9019': { drivers: ['Sell-in 3.1× sell-out for 2 weeks', 'Possible scheme pull-forward', 'No matching primary order pattern'], conf: 'High' },
  'EX-9012': { drivers: ['Seasonal demand softening on geysers', 'Distributor over-indexed on 5-star', 'Branch manager closure in progress'], conf: 'Med' },
};

const ACTIONS = [
  { t: 'Route priority dispatch / credit unlock', owner: 'Regional Sales Ops · West', impact: 'Recover ~₹12.4L fill in 7d if executed' },
  { t: 'Branch beat plan: focus visits on D-204 + LED DL 12W',  owner: 'RM West',          impact: 'Lift sell-out by ~8% over 14d' },
  { t: 'Temporary trade guardrail on scheme SKU',                owner: 'Trade Marketing (request)', impact: 'Protect ~₹3.1L margin vs leakage' },
  { t: 'Escalate supply constraint with SKU list + ₹ impact',    owner: 'HO Sales Ops → S&OP liaison', impact: 'Inbound triage cycle ↓ from 5d to 2d' },
];

const STEPS = ['National pulse', 'Region drill', 'Distributor deep dive', 'Exception queue', 'Explainability', 'Recommended plays', 'Assign & nudge', 'Closure board'];

// --- COMPONENTS ---
const KpiRibbon: React.FC<{ openEx: number; risk: number }> = ({ openEx, risk }) => (
  <div className="grid grid-cols-4 gap-3 px-6 py-3 border-b border-slate-200 bg-white">
    {[
      { l: 'National fill rate (7d)', v: '88.6%', d: '−1.4 vs LW', neg: true },
      { l: 'Open Sales Ops exceptions', v: String(openEx), d: 'incl. 3 critical', neg: true },
      { l: 'Revenue at risk', v: `₹${risk.toFixed(1)} Cr`, d: 'flagged exceptions', neg: true },
      { l: 'Schemes live', v: '14', d: '4 ending this week', neg: false },
    ].map(k => (
      <div key={k.l} className="px-4 py-2 rounded-lg border border-slate-200">
        <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{k.l}</div>
        <div className="text-2xl font-bold mt-1" style={{ color: INK }}>{k.v}</div>
        <div className="text-[11px] mt-0.5" style={{ color: k.neg ? RED : '#64748B' }}>{k.d}</div>
      </div>
    ))}
  </div>
);

const Stepper: React.FC<{ step: number; setStep: (n: number) => void }> = ({ step, setStep }) => (
  <div className="flex items-center gap-1 px-6 py-3 bg-slate-50 border-b border-slate-200 overflow-x-auto">
    {STEPS.map((s, i) => {
      const active = i === step;
      const done = i < step;
      return (
        <button key={s} onClick={() => setStep(i)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md whitespace-nowrap transition text-xs font-semibold"
          style={{
            background: active ? NAVY : done ? '#E2E8F0' : 'transparent',
            color: active ? 'white' : done ? '#334155' : '#64748B',
          }}>
          <span className="w-5 h-5 rounded-full grid place-items-center text-[10px] font-bold"
                style={{ background: active ? ACCENT : done ? GREEN : '#CBD5E1', color: 'white' }}>
            {done ? '✓' : i + 1}
          </span>
          {s}
        </button>
      );
    })}
  </div>
);

const RegionDot: React.FC<{ state: string }> = ({ state }) => {
  const c = state === 'red' ? RED : state === 'amber' ? ACCENT : GREEN;
  return <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ background: c }} />;
};

const HavellsChannelStudio: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [selectedRegion, setSelectedRegion] = useState<string>('West');
  const [selectedEx, setSelectedEx] = useState<string>('EX-9041');
  const [exceptions, setExceptions] = useState(EXCEPTIONS_INIT);
  const [activity, setActivity] = useState<{ ts: string; text: string }[]>([
    { ts: 'D-3 09:14', text: 'Auto-detected: fill breach EX-9041 on D-204 / MOD-PLT-WHT-6M' },
    { ts: 'D-2 11:02', text: 'Driver analysis confirmed: replenishment delay + weekend spike' },
  ]);
  const [closed, setClosed] = useState(false);

  const openEx = exceptions.filter(e => e.owner === '—' || !closed).length;
  const totalRisk = useMemo(() => exceptions.reduce((s, e) => s + e.risk, 0) / 10, [exceptions]); // scale to Cr feel

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') navigate('/havells-pitch?s=4');
      if (e.key === 'ArrowRight' && step < 7) setStep(step + 1);
      if (e.key === 'ArrowLeft' && step > 0) setStep(step - 1);
      if (/^[1-8]$/.test(e.key)) setStep(parseInt(e.key, 10) - 1);
    };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [step, navigate]);

  const assignOwner = (owner: string) => {
    setExceptions(ex => ex.map(e => e.id === selectedEx ? { ...e, owner } : e));
    setActivity(a => [...a, { ts: 'Now', text: `Assigned to ${owner} · SLA 24h` }]);
    toast.success(`Assigned to ${owner}`, { description: 'SLA clock started · 24h' });
  };

  const sendNudge = () => {
    setActivity(a => [...a, { ts: 'Now', text: 'Nudge sent on WhatsApp + email' }]);
    toast(`Nudge sent`, { description: 'RM West + Branch Mumbai-04 · ack pending' });
  };

  const closeException = () => {
    setClosed(true);
    setActivity(a => [...a, { ts: 'Now', text: 'Closure confirmed · sell-out recovered to 88% of plan' }]);
    toast.success('Exception closed', { description: 'Fill recovered · ₹14.2L recouped' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top chrome */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded grid place-items-center text-white font-bold text-xs" style={{ background: NAVY }}>D</div>
            <div>
              <div className="text-sm font-bold" style={{ color: INK }}>Channel Execution Studio</div>
              <div className="text-[10px] text-slate-500 italic">Illustrative data for workflow demonstration · For Sales Operations</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 hidden md:inline">Press <kbd className="px-1.5 py-0.5 bg-slate-100 rounded text-[10px]">Esc</kbd> to return to deck</span>
            <button onClick={() => navigate('/havells-pitch?s=4')} className="px-3 py-1.5 rounded-md border border-slate-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-50">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to deck
            </button>
          </div>
        </div>
        <KpiRibbon openEx={openEx} risk={totalRisk} />
        <Stepper step={step} setStep={setStep} />
      </header>

      <main className="px-6 py-5 max-w-[1400px] mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.18 }}>

            {/* STEP 1 */}
            {step === 0 && (
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-7">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 1</div>
                        <div className="text-xl font-bold" style={{ color: INK }}>National pulse</div>
                      </div>
                      <div className="text-xs text-slate-500">Last refresh: 06 min ago</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {REGIONS.map(r => (
                        <button key={r.code} onClick={() => { setSelectedRegion(r.code); setStep(1); }}
                          className="text-left rounded-lg border-2 p-4 transition hover:shadow-md"
                          style={{ borderColor: r.state === 'red' ? RED : r.state === 'amber' ? ACCENT : '#E2E8F0', background: r.state === 'red' ? '#FEF2F2' : r.state === 'amber' ? '#FFFBEB' : 'white' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-slate-500" />
                              <span className="font-bold text-lg" style={{ color: INK }}>{r.code}</span>
                              <RegionDot state={r.state} />
                            </div>
                            <span className="text-[10px] uppercase font-bold" style={{ color: r.state === 'red' ? RED : r.state === 'amber' ? ACCENT : GREEN }}>{r.state === 'red' ? 'Critical' : r.state === 'amber' ? 'Pressure' : 'Healthy'}</span>
                          </div>
                          <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                            <div><div className="text-slate-500">Fill 7d</div><div className="font-bold text-base">{r.fill}%</div></div>
                            <div><div className="text-slate-500">@Risk ₹L</div><div className="font-bold text-base">{r.dRisk}</div></div>
                            <div><div className="text-slate-500">Δ vs LW</div><div className="font-bold text-base" style={{ color: r.delta < 0 ? RED : GREEN }}>{r.delta > 0 ? '+' : ''}{r.delta}</div></div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-1">Top 5 clusters by revenue-at-risk (7d)</div>
                    <div className="text-sm text-slate-500 mb-4">Click a row to drill into its region</div>
                    <table className="w-full text-sm">
                      <thead className="text-[11px] uppercase text-slate-500 border-b">
                        <tr><th className="text-left py-2">Cluster</th><th className="text-right">@Risk ₹L</th><th className="text-right">Fill Δ</th></tr>
                      </thead>
                      <tbody>
                        {TOP_BRANCHES.map(b => (
                          <tr key={b.id} onClick={() => { setSelectedRegion(b.region); setStep(1); }}
                              className="border-b border-slate-100 cursor-pointer hover:bg-slate-50">
                            <td className="py-2.5">
                              <div className="font-semibold text-xs" style={{ color: INK }}>{b.name}</div>
                              <div className="text-[10px] text-slate-500">{b.id} · {b.region}</div>
                            </td>
                            <td className="text-right font-bold" style={{ color: RED }}>{b.risk}</td>
                            <td className="text-right text-xs" style={{ color: RED }}>{b.drop}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 1 && (
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-9">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 2 · Region: {selectedRegion}</div>
                        <div className="text-xl font-bold" style={{ color: INK }}>Who is off plan</div>
                      </div>
                      <select value={selectedRegion} onChange={e => setSelectedRegion(e.target.value)} className="text-xs border border-slate-300 rounded px-2 py-1">
                        {REGIONS.map(r => <option key={r.code}>{r.code}</option>)}
                      </select>
                    </div>
                    <table className="w-full text-sm">
                      <thead className="text-[11px] uppercase text-slate-500 border-b">
                        <tr>
                          <th className="text-left py-2">Distributor</th>
                          <th className="text-right">Fill % (7d)</th>
                          <th className="text-right">OTIF proxy</th>
                          <th className="text-right">ST−SI gap</th>
                          <th className="text-center">Scheme</th>
                          <th className="text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DISTRIBUTORS.map(d => (
                          <tr key={d.id} onClick={() => { if (d.id === 'D-204') setStep(2); }}
                              className={`border-b border-slate-100 ${d.id === 'D-204' ? 'cursor-pointer hover:bg-amber-50 bg-red-50/40' : d.id === 'D-118' ? 'bg-amber-50/40' : ''}`}>
                            <td className="py-2.5">
                              <div className="font-semibold text-xs" style={{ color: INK }}>{d.name}</div>
                              <div className="text-[10px] text-slate-500">{d.id}</div>
                            </td>
                            <td className="text-right font-bold" style={{ color: d.fill < 80 ? RED : d.fill < 90 ? ACCENT : GREEN }}>{d.fill}%</td>
                            <td className="text-right">{d.otif}</td>
                            <td className="text-right" style={{ color: RED }}>{d.gap}%</td>
                            <td className="text-center text-xs">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold" style={{ background: d.scheme === 'High' ? '#FEE2E2' : d.scheme === 'Medium' ? '#FEF3C7' : '#F1F5F9', color: d.scheme === 'High' ? RED : d.scheme === 'Medium' ? ACCENT : '#64748B' }}>{d.scheme}</span>
                            </td>
                            <td className="text-center text-xs">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase" style={{ background: d.status === 'critical' ? RED : d.status === 'watch' ? ACCENT : '#E2E8F0', color: d.status === 'ok' ? '#475569' : 'white' }}>{d.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="rounded-xl border-2 p-4" style={{ borderColor: ACCENT, background: '#FFFBEB' }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-4 h-4" style={{ color: ACCENT }} />
                      <div className="font-bold text-sm" style={{ color: INK }}>Why on my desk?</div>
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-700">
                      <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: ACCENT }} />Replenishment to D-204 delayed beyond T+3 — fill collapsing</li>
                      <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: ACCENT }} />Sell-out spike on 2 modular SKUs over weekend trade event</li>
                      <li className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: ACCENT }} />Scheme pull-forward distorting D-118 run-rate signal</li>
                    </ul>
                    <button onClick={() => setStep(2)} className="mt-4 w-full px-3 py-2 rounded-md text-white text-xs font-bold" style={{ background: NAVY }}>
                      Drill into D-204 →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 2 && (
              <div className="rounded-xl bg-white border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 3 · D-204 · Sai Electricals (Mumbai)</div>
                    <div className="text-xl font-bold" style={{ color: INK }}>Distributor deep dive</div>
                  </div>
                  <div className="flex gap-1">
                    {['Fill', 'Schemes', 'Returns/claims'].map((t, i) => (
                      <button key={t} className="px-3 py-1.5 text-xs font-semibold rounded-md" style={{ background: i === 0 ? NAVY : 'transparent', color: i === 0 ? 'white' : '#64748B', border: i === 0 ? 'none' : '1px solid #CBD5E1' }}>{t}</button>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3 mb-4">
                  {[
                    { l: 'Fill % (7d)', v: '72.4%', c: RED },
                    { l: 'Days cover (avg)', v: '4.8', c: ACCENT },
                    { l: 'Lost sales est. (7d)', v: '₹67.8L', c: RED },
                    { l: 'Open POs unfulfilled', v: '11', c: ACCENT },
                  ].map(k => (
                    <div key={k.l} className="rounded-lg border border-slate-200 p-3">
                      <div className="text-[11px] uppercase text-slate-500 font-semibold">{k.l}</div>
                      <div className="text-xl font-bold mt-1" style={{ color: k.c }}>{k.v}</div>
                    </div>
                  ))}
                </div>
                <table className="w-full text-sm">
                  <thead className="text-[11px] uppercase text-slate-500 border-b">
                    <tr>
                      <th className="text-left py-2">SKU</th>
                      <th className="text-right">Line fill</th>
                      <th className="text-right">Days cover</th>
                      <th className="text-right">Lost sales (₹L)</th>
                      <th className="text-center">Flag</th>
                    </tr>
                  </thead>
                  <tbody>
                    {D204_SKUS.map(s => (
                      <tr key={s.sku} className={`border-b border-slate-100 ${s.flag !== 'ok' ? '' : ''}`}>
                        <td className="py-2.5">
                          <div className="font-semibold text-xs" style={{ color: INK }}>{s.name}</div>
                          <div className="text-[10px] text-slate-500 font-mono">{s.sku}</div>
                        </td>
                        <td className="text-right font-bold" style={{ color: s.fill < 70 ? RED : s.fill < 85 ? ACCENT : GREEN }}>{s.fill}%</td>
                        <td className="text-right">{s.cover}</td>
                        <td className="text-right font-semibold" style={{ color: s.lost > 10 ? RED : '#475569' }}>{s.lost}</td>
                        <td className="text-center">
                          {s.flag === 'stockout' && <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: RED, color: 'white' }}>STOCKOUT RISK</span>}
                          {s.flag === 'partial' && <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: ACCENT, color: 'white' }}>CHRONIC PARTIAL</span>}
                          {s.flag === 'slump' && <span className="px-2 py-0.5 rounded text-[10px] font-bold" style={{ background: '#7C3AED', color: 'white' }}>POST-SCHEME SLUMP</span>}
                          {s.flag === 'ok' && <span className="text-[10px] text-slate-400">—</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 text-right">
                  <button onClick={() => setStep(3)} className="px-4 py-2 rounded-md text-white text-xs font-bold inline-flex items-center gap-2" style={{ background: NAVY }}>
                    Open exception queue <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 */}
            {step === 3 && (
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-8">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 4</div>
                        <div className="text-xl font-bold" style={{ color: INK }}>Exception queue · Sales Ops triage</div>
                      </div>
                      <div className="text-[11px] text-slate-500">Sorted by Age × Revenue at risk</div>
                    </div>
                    <table className="w-full text-sm">
                      <thead className="text-[11px] uppercase text-slate-500 border-b">
                        <tr>
                          <th className="text-left py-2">Type</th>
                          <th className="text-left">Region</th>
                          <th className="text-left">Distributor · SKU</th>
                          <th className="text-right">@Risk ₹L</th>
                          <th className="text-right">Age</th>
                          <th className="text-left">Owner</th>
                        </tr>
                      </thead>
                      <tbody>
                        {exceptions.map(e => (
                          <tr key={e.id} onClick={() => { setSelectedEx(e.id); setStep(4); }}
                              className={`border-b border-slate-100 cursor-pointer ${selectedEx === e.id ? 'bg-blue-50' : 'hover:bg-slate-50'}`}>
                            <td className="py-2.5">
                              <div className="font-semibold text-xs" style={{ color: INK }}>{e.type}</div>
                              <div className="text-[10px] text-slate-500 font-mono">{e.id}</div>
                            </td>
                            <td className="text-xs">{e.region}</td>
                            <td className="text-xs"><span className="font-mono">{e.dist}</span> · {e.sku}</td>
                            <td className="text-right font-bold" style={{ color: e.risk > 10 ? RED : '#475569' }}>{e.risk}</td>
                            <td className="text-right text-xs">{e.age}</td>
                            <td className="text-xs"><span className="font-semibold" style={{ color: e.owner === '—' ? RED : '#475569' }}>{e.owner}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-3">Selected · {selectedEx}</div>
                    <div className="text-sm font-bold mb-3" style={{ color: INK }}>{exceptions.find(e => e.id === selectedEx)?.type}</div>
                    <div className="space-y-2 text-xs text-slate-600 mb-4">
                      <div className="flex justify-between"><span>Distributor</span><span className="font-mono font-semibold">{exceptions.find(e => e.id === selectedEx)?.dist}</span></div>
                      <div className="flex justify-between"><span>SKU</span><span className="font-mono font-semibold">{exceptions.find(e => e.id === selectedEx)?.sku}</span></div>
                      <div className="flex justify-between"><span>Revenue at risk</span><span className="font-bold" style={{ color: RED }}>₹{exceptions.find(e => e.id === selectedEx)?.risk}L</span></div>
                    </div>
                    <button onClick={() => setStep(4)} className="w-full px-3 py-2 rounded-md text-white text-xs font-bold" style={{ background: NAVY }}>
                      See drivers & confidence →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5 */}
            {step === 4 && (
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-7">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 5 · {selectedEx}</div>
                    <div className="text-xl font-bold mb-1" style={{ color: INK }}>Why this exception — drivers</div>
                    <div className="text-xs text-slate-500 mb-4">Not a black box. Each driver is sourced and weighted.</div>
                    <div className="space-y-3">
                      {DRIVERS_BY_EX[selectedEx]?.drivers.map((d, i) => (
                        <div key={i} className="flex gap-3 p-3 rounded-lg border border-slate-200">
                          <div className="w-7 h-7 rounded-full grid place-items-center text-white text-xs font-bold shrink-0" style={{ background: NAVY }}>{i+1}</div>
                          <div className="text-sm text-slate-700 leading-snug">{d}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-xs text-slate-500 font-semibold uppercase">Confidence</span>
                      <span className="px-3 py-1 rounded-full text-xs font-bold" style={{ background: DRIVERS_BY_EX[selectedEx]?.conf === 'High' ? '#D1FAE5' : '#FEF3C7', color: DRIVERS_BY_EX[selectedEx]?.conf === 'High' ? GREEN : ACCENT }}>
                        {DRIVERS_BY_EX[selectedEx]?.conf}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="rounded-xl border border-slate-200 bg-slate-900 text-slate-100 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-amber-400" />
                      <div className="text-xs uppercase tracking-wider font-semibold text-amber-400">Audit trail</div>
                    </div>
                    <div className="text-xs space-y-2 font-mono">
                      <div>Signal sources:</div>
                      <div className="pl-3 border-l-2 border-slate-700 space-y-1.5">
                        <div>• Sell-in file · Tue 06:00 IST</div>
                        <div>• Stock snapshot · Wed 09:30 IST</div>
                        <div>• Scheme calendar · v2026-W17</div>
                        <div>• Beat plan adherence · BR-WST-MUM-04</div>
                        <div>• PO status · ERP module M-OTC</div>
                      </div>
                      <div className="pt-2 text-slate-400">Model: rules + driver attribution v1.4</div>
                      <div className="text-slate-400">No writeback to ERP in this view.</div>
                    </div>
                  </div>
                  <button onClick={() => setStep(5)} className="w-full mt-3 px-4 py-2.5 rounded-md text-white text-sm font-bold flex items-center justify-center gap-2" style={{ background: NAVY }}>
                    See recommended plays <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6 */}
            {step === 5 && (
              <div>
                <div className="mb-4">
                  <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 6 · {selectedEx}</div>
                  <div className="text-xl font-bold" style={{ color: INK }}>Recommended plays — Sales Ops led</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {ACTIONS.map((a, i) => (
                    <div key={i} className="rounded-xl bg-white border border-slate-200 p-5 hover:shadow-lg transition">
                      <div className="flex items-start justify-between gap-3">
                        <div className="w-8 h-8 rounded grid place-items-center text-white font-bold text-sm shrink-0" style={{ background: NAVY }}>{i+1}</div>
                        <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded" style={{ background: '#FEF3C7', color: ACCENT }}>SALES OPS</span>
                      </div>
                      <div className="font-semibold mt-3 leading-snug" style={{ color: INK }}>{a.t}</div>
                      <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs"><Users className="w-3.5 h-3.5 text-slate-400" /><span className="text-slate-500">Owner:</span> <span className="font-semibold" style={{ color: INK }}>{a.owner}</span></div>
                        <div className="flex items-center gap-2 text-xs"><TrendingUp className="w-3.5 h-3.5" style={{ color: GREEN }} /><span className="text-slate-500">Impact:</span> <span className="font-semibold text-slate-700">{a.impact}</span></div>
                      </div>
                      <button onClick={() => setStep(6)} className="mt-3 w-full text-xs font-bold px-3 py-2 rounded-md border" style={{ borderColor: NAVY, color: NAVY }}>
                        Assign & track →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 7 */}
            {step === 6 && (
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-7">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 7 · {selectedEx}</div>
                    <div className="text-xl font-bold mb-4" style={{ color: INK }}>Assign owner, set SLA, nudge</div>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 uppercase">Assign to</label>
                        <div className="grid grid-cols-2 gap-2 mt-2">
                          {['RM West', 'Branch Mgr Mumbai-04', 'HO Sales Ops', 'Trade Marketing'].map(o => (
                            <button key={o} onClick={() => assignOwner(o)} className="px-3 py-2 rounded-md border border-slate-300 text-xs font-semibold text-left hover:border-blue-500 hover:bg-blue-50">
                              {o}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs font-semibold text-slate-600 uppercase">SLA</label>
                          <select className="w-full mt-2 border border-slate-300 rounded-md px-3 py-2 text-sm">
                            <option>24 hours</option><option>48 hours</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-slate-600 uppercase">Priority</label>
                          <select className="w-full mt-2 border border-slate-300 rounded-md px-3 py-2 text-sm">
                            <option>P1 — Revenue critical</option><option>P2</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 uppercase">Note</label>
                        <textarea className="w-full mt-2 border border-slate-300 rounded-md px-3 py-2 text-sm" rows={2} defaultValue="Need confirmation by EOD on dispatch ETA from Bhiwandi DC." />
                      </div>
                      <div className="flex gap-2">
                        <button onClick={sendNudge} className="px-4 py-2 rounded-md text-white text-sm font-bold flex items-center gap-2" style={{ background: NAVY }}>
                          <Bell className="w-4 h-4" /> Send nudge
                        </button>
                        <button onClick={() => setStep(7)} className="px-4 py-2 rounded-md border border-slate-300 text-sm font-bold flex items-center gap-2">
                          <ArrowRight className="w-4 h-4" /> Go to closure
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-5">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Activity className="w-4 h-4" style={{ color: NAVY }} />
                      <div className="text-xs uppercase tracking-wider font-semibold text-slate-600">Activity log</div>
                    </div>
                    <div className="space-y-2.5">
                      {activity.slice().reverse().map((a, i) => (
                        <div key={i} className="flex gap-3 text-xs">
                          <div className="text-slate-400 font-mono w-16 shrink-0">{a.ts}</div>
                          <div className="text-slate-700">{a.text}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 8 */}
            {step === 7 && (
              <div className="grid grid-cols-12 gap-5">
                <div className="col-span-8">
                  <div className="rounded-xl bg-white border border-slate-200 p-5">
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Step 8</div>
                    <div className="text-xl font-bold mb-4" style={{ color: INK }}>Closure & impact board</div>

                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[
                        { l: 'Open exceptions', a: 47, b: closed ? 39 : 47, suf: '' },
                        { l: 'Revenue at risk', a: 318, b: closed ? 264 : 318, suf: '₹L' },
                        { l: 'D-204 fill % (7d)', a: 72.4, b: closed ? 84.1 : 72.4, suf: '%' },
                      ].map(m => (
                        <div key={m.l} className="rounded-lg border border-slate-200 p-3">
                          <div className="text-[11px] uppercase text-slate-500 font-semibold">{m.l}</div>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-lg text-slate-400 line-through">{m.a}{m.suf}</span>
                            <span className="text-2xl font-bold" style={{ color: closed ? GREEN : INK }}>{m.b}{m.suf}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] mt-1" style={{ color: closed ? GREEN : '#94A3B8' }}>
                            {closed ? <TrendingUp className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                            {closed ? 'Improved' : 'Pending action'}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">Closed this week</div>
                    <div className="space-y-2">
                      {[
                        { id: 'EX-8987', t: 'Fill breach · D-156 / LED downlighter 12W', who: 'RM North · Anita Sharma', ts: 'D-2 16:42' },
                        { id: 'EX-8964', t: 'Post-scheme hangover · D-241 / MCB 32A DP', who: 'Trade Marketing · S. Iyer', ts: 'D-3 11:15' },
                        { id: 'EX-8951', t: 'Beat plan miss · D-118 / Modular plate', who: 'Branch Mgr Pune · R. Kale', ts: 'D-4 09:08' },
                      ].map(c => (
                        <div key={c.id} className="flex items-center gap-3 p-2.5 rounded-md border border-slate-100">
                          <CheckCircle2 className="w-4 h-4 shrink-0" style={{ color: GREEN }} />
                          <div className="flex-1">
                            <div className="text-xs font-semibold" style={{ color: INK }}>{c.t}</div>
                            <div className="text-[10px] text-slate-500">{c.id} · Closed by {c.who}</div>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono">{c.ts}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  <div className="rounded-xl border-2 p-5" style={{ borderColor: closed ? GREEN : NAVY, background: closed ? '#F0FDF4' : '#F8FAFC' }}>
                    <div className="text-xs uppercase tracking-wider font-semibold mb-2" style={{ color: closed ? GREEN : NAVY }}>{selectedEx}</div>
                    <div className="font-bold text-lg mb-3" style={{ color: INK }}>{closed ? '✓ Closed' : 'Awaiting closure'}</div>
                    <div className="text-xs text-slate-600 leading-relaxed mb-4">
                      {closed
                        ? 'Dispatch routed from Bhiwandi DC, fill recovered to 84.1% over 5 days. Sell-out on flagged SKUs back within 12% of plan.'
                        : 'Dispatch awaiting confirmation. Owner has acknowledged. Expect closure within SLA.'}
                    </div>
                    {!closed && (
                      <button onClick={closeException} className="w-full px-4 py-2.5 rounded-md text-white text-sm font-bold mb-2" style={{ background: GREEN }}>
                        Mark closed (simulate)
                      </button>
                    )}
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      <button onClick={() => navigate('/havells-pitch?s=5')} className="px-3 py-2 rounded-md text-xs font-bold border" style={{ borderColor: NAVY, color: NAVY }}>
                        ← Return to deck (Slide 5)
                      </button>
                      <button onClick={() => navigate('/havells-pitch?s=10')} className="px-3 py-2 rounded-md text-white text-xs font-bold" style={{ background: NAVY }}>
                        Go to next steps →
                      </button>
                    </div>
                    <button onClick={() => { setStep(0); setClosed(false); setExceptions(EXCEPTIONS_INIT); }} className="w-full mt-2 text-[11px] text-slate-500 hover:underline">
                      Restart demo
                    </button>
                  </div>
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="px-6 py-3 text-center text-[11px] text-slate-400 border-t border-slate-200 bg-white">
        Channel Execution Studio · Illustrative data · Built for Sales Operations · ← → or 1–8 to navigate · Esc to return to deck
      </footer>
    </div>
  );
};

export default HavellsChannelStudio;

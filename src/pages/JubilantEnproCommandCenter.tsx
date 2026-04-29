import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Activity, AlertTriangle, Anchor, Bot, Briefcase, CheckCircle2, ChevronRight,
  Clock, DollarSign, Filter, Gauge, LayoutDashboard, LineChart, ListChecks,
  Send, Ship, ShieldCheck, Sparkles, Truck, Waves, Wrench, FileText, X,
} from 'lucide-react';

/* ───────────── Design tokens ───────────── */
const NAVY = '#0B2545';
const NAVY_SOFT = '#13355F';
const TEAL = '#0E7C86';
const BLUE = '#1E6091';
const INK = '#0F172A';
const MUTED = '#64748B';
const LINE = '#E2E8F0';
const BG = '#F6F8FB';

const RAG = {
  R: { bg: '#FEE2E2', fg: '#991B1B', dot: '#DC2626', label: 'Red' },
  A: { bg: '#FEF3C7', fg: '#92400E', dot: '#D97706', label: 'Amber' },
  G: { bg: '#D1FAE5', fg: '#065F46', dot: '#059669', label: 'Green' },
};

const inr = (cr: number) => `₹${cr.toFixed(cr < 10 ? 1 : 0)} Cr`;

/* ───────────── Shared synthetic dataset ───────────── */
type Project = { id: string; name: string; client: string; ev: number; pv: number; ac: number; status: 'R' | 'A' | 'G' };
const PROJECTS: Project[] = [
  { id: 'KG-24-017', name: 'KG Basin Subsea Tie-in',     client: 'East Coast Operator',  pv: 184, ev: 162, ac: 178, status: 'R' },
  { id: 'NWIS-R-112', name: 'NW Inspection Sweep R-112', client: 'West Offshore JV',     pv: 96,  ev: 92,  ac: 94,  status: 'A' },
  { id: 'PRP-VI-203', name: 'Pipeline Repair VI-203',    client: 'Bay of Bengal Cluster',pv: 142, ev: 138, ac: 140, status: 'G' },
  { id: 'CMB-ROV-44', name: 'Cambay ROV Survey-44',      client: 'West Coast E&P',       pv: 58,  ev: 54,  ac: 56,  status: 'A' },
];

type Exception = {
  id: string; tab: 'ops' | 'fin' | 'sc'; project: string; function: string;
  title: string; severity: 'R' | 'A'; vor: number; owner: string; ageDays: number;
};
const EXCEPTIONS: Exception[] = [
  { id: 'EX-1042', tab: 'ops', project: 'KG-24-017',  function: 'Under-Sea Ops',   title: 'DSV-2 thruster anomaly — integrity alert on riser clamp',     severity: 'R', vor: 3.8, owner: 'A. Rao (Ops)',     ageDays: 2 },
  { id: 'EX-1043', tab: 'fin', project: 'KG-24-017',  function: 'Finance MIS',     title: 'Margin variance −4.6% vs plan; unbilled WIP ageing >45 d',     severity: 'R', vor: 6.2, owner: 'S. Mehta (Fin)',   ageDays: 5 },
  { id: 'EX-1044', tab: 'sc',  project: 'NWIS-R-112', function: 'Supply Chain',    title: 'Subsea connector lead-time drift +18 d — stock-out risk',     severity: 'A', vor: 2.1, owner: 'R. Iyer (SCM)',    ageDays: 3 },
  { id: 'EX-1045', tab: 'ops', project: 'CMB-ROV-44', function: 'Under-Sea Ops',   title: 'Weather window slip — 2 vessels idle 36 hrs',                 severity: 'A', vor: 1.4, owner: 'P. Nair (Ops)',    ageDays: 1 },
  { id: 'EX-1046', tab: 'fin', project: 'PRP-VI-203', function: 'Finance MIS',     title: 'DSO breach for Tier-1 client — ₹14.2 Cr in 90+ bucket',       severity: 'A', vor: 1.8, owner: 'S. Mehta (Fin)',   ageDays: 7 },
  { id: 'EX-1047', tab: 'sc',  project: 'KG-24-017',  function: 'Supply Chain',    title: 'Charter vessel conflict — overlap on 14–17 of next window',    severity: 'A', vor: 0.9, owner: 'R. Iyer (SCM)',    ageDays: 1 },
];

const FUNCTIONS = ['All Functions', 'Under-Sea Ops', 'Finance MIS', 'Supply Chain'];
const RISKS = ['All Risk', 'Red', 'Amber', 'Green'];
const PROJECT_OPTS = ['All Projects', ...PROJECTS.map(p => p.id)];

/* ───────────── Tiny atoms ───────────── */
const Disclaimer = () => (
  <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-[11px] text-slate-500 text-center">
    Illustrative demo with synthetic data. Not for operational or regulatory decision use. Project IDs, vendors and clients are fictional.
  </div>
);

const RagBadge: React.FC<{ s: 'R' | 'A' | 'G'; label?: string }> = ({ s, label }) => {
  const r = RAG[s];
  return (
    <span className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-semibold" style={{ background: r.bg, color: r.fg }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: r.dot }} />
      {label ?? r.label}
    </span>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; icon?: React.ReactNode; right?: React.ReactNode }> = ({ children, className = '', title, icon, right }) => (
  <div className={`bg-white rounded-lg border border-slate-200 shadow-sm ${className}`}>
    {title && (
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: NAVY }}>
          {icon}
          {title}
        </div>
        {right}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const Kpi: React.FC<{ label: string; value: string; sub?: string; tone?: 'R' | 'A' | 'G' | 'N'; icon?: React.ReactNode }> = ({ label, value, sub, tone = 'N', icon }) => {
  const accent = tone === 'R' ? '#DC2626' : tone === 'A' ? '#D97706' : tone === 'G' ? '#059669' : NAVY;
  return (
    <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-4">
      <div className="flex items-center justify-between text-xs font-medium text-slate-500 uppercase tracking-wide">
        <span>{label}</span>
        {icon}
      </div>
      <div className="mt-2 text-2xl font-bold" style={{ color: accent }}>{value}</div>
      {sub && <div className="mt-1 text-xs text-slate-500">{sub}</div>}
    </div>
  );
};

/* ───────────── Top Nav ───────────── */
type TabId = 'overview' | 'ops' | 'fin' | 'sc' | 'copilot' | 'tracker';
const TABS: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Executive Overview', icon: <LayoutDashboard className="w-4 h-4" /> },
  { id: 'ops',      label: 'Under-Sea Operations', icon: <Waves className="w-4 h-4" /> },
  { id: 'fin',      label: 'Finance MIS',         icon: <LineChart className="w-4 h-4" /> },
  { id: 'sc',       label: 'Supply Chain & Logistics', icon: <Truck className="w-4 h-4" /> },
  { id: 'copilot',  label: 'AI Copilot',          icon: <Bot className="w-4 h-4" /> },
  { id: 'tracker',  label: 'Action Tracker',      icon: <ListChecks className="w-4 h-4" /> },
];

/* ═════════════════════════════════════════════════════════════════════════ */
const JubilantEnproCommandCenter: React.FC = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const initialTab = (params.get('tab') as TabId) || 'overview';
  const [tab, setTab] = useState<TabId>(initialTab);

  // Global filters
  const [fProject, setFProject] = useState('All Projects');
  const [fFunction, setFFunction] = useState('All Functions');
  const [fRisk, setFRisk] = useState('All Risk');

  // Cross-tab focus (from exception click)
  const [focusEx, setFocusEx] = useState<string | null>(params.get('ex'));

  // Action tracker (seeded + dynamic from copilot)
  type Action = {
    id: string; linkedEx: string; impact: string; owner: string; func: string;
    due: string; status: 'Open' | 'In Progress' | 'Done'; value: number;
  };
  const [actions, setActions] = useState<Action[]>([
    { id: 'ACT-2201', linkedEx: 'EX-1042', impact: 'Avoid DSV downtime on KG-24-017',         owner: 'A. Rao',   func: 'Ops',     due: '12-May', status: 'In Progress', value: 3.8 },
    { id: 'ACT-2202', linkedEx: 'EX-1043', impact: 'Recover unbilled WIP — KG-24-017',         owner: 'S. Mehta', func: 'Finance', due: '08-May', status: 'Open',        value: 6.2 },
    { id: 'ACT-2203', linkedEx: 'EX-1044', impact: 'Expedite connectors — NWIS-R-112',          owner: 'R. Iyer',  func: 'SCM',     due: '15-May', status: 'In Progress', value: 2.1 },
    { id: 'ACT-2204', linkedEx: 'EX-1046', impact: 'Collections push — Tier-1 90+ bucket',     owner: 'S. Mehta', func: 'Finance', due: '20-May', status: 'Open',        value: 1.8 },
    { id: 'ACT-2199', linkedEx: 'EX-1041', impact: 'Reroute spares through Mumbai hub',        owner: 'R. Iyer',  func: 'SCM',     due: '02-May', status: 'Done',        value: 1.2 },
  ]);

  // Sync tab + ex into URL for deep links
  useEffect(() => {
    const next = new URLSearchParams();
    next.set('tab', tab);
    if (focusEx) next.set('ex', focusEx);
    setParams(next, { replace: true });
  }, [tab, focusEx, setParams]);

  const goException = (ex: Exception) => {
    setFocusEx(ex.id);
    setFProject(ex.project);
    setTab(ex.tab === 'ops' ? 'ops' : ex.tab === 'fin' ? 'fin' : 'sc');
  };

  const filteredEx = useMemo(() => EXCEPTIONS.filter(e => {
    if (fProject !== 'All Projects' && e.project !== fProject) return false;
    if (fFunction !== 'All Functions' && e.function !== fFunction) return false;
    if (fRisk === 'Red' && e.severity !== 'R') return false;
    if (fRisk === 'Amber' && e.severity !== 'A') return false;
    if (fRisk === 'Green') return false;
    return true;
  }), [fProject, fFunction, fRisk]);

  return (
    <div style={{ background: BG, minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif', color: INK }}>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-md flex items-center justify-center text-white" style={{ background: NAVY }}>
              <Anchor className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[15px] font-bold leading-tight" style={{ color: NAVY }}>Jubilant Enpro Command Center</div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Illustrative · DiscvrAI workshop build</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/jubilant-enpro-pitch')} className="text-xs px-3 py-1.5 rounded border border-slate-300 text-slate-600 hover:bg-slate-50">
              ← Back to deck
            </button>
            <span className="text-[11px] px-2 py-1 rounded font-semibold" style={{ background: '#FEF3C7', color: '#92400E' }}>ILLUSTRATIVE</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-[1280px] mx-auto px-6 flex gap-1 overflow-x-auto">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => { setTab(t.id); setFocusEx(null); }}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                tab === t.id ? 'text-[color:var(--navy)]' : 'text-slate-500 hover:text-slate-800 border-transparent'
              }`}
              style={tab === t.id ? { color: NAVY, borderColor: NAVY } : { borderColor: 'transparent' }}
            >
              {t.icon}{t.label}
            </button>
          ))}
        </div>

        {/* Global filter bar */}
        <div className="bg-slate-50 border-t border-slate-200">
          <div className="max-w-[1280px] mx-auto px-6 py-2 flex items-center gap-3 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-500 font-medium">Filters:</span>
            <Select value={fProject} onChange={setFProject} options={PROJECT_OPTS} />
            <Select value={fFunction} onChange={setFFunction} options={FUNCTIONS} />
            <Select value={fRisk} onChange={setFRisk} options={RISKS} />
            <span className="text-slate-400 ml-auto">Date range: <b className="text-slate-600">Last 30 days</b></span>
            {focusEx && (
              <button onClick={() => setFocusEx(null)} className="flex items-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800 font-semibold">
                Focused: {focusEx} <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-[1280px] mx-auto px-6 py-6">
        {tab === 'overview' && <Overview filteredEx={filteredEx} onExceptionClick={goException} />}
        {tab === 'ops' && <UnderSea focusEx={focusEx} fProject={fProject} />}
        {tab === 'fin' && <FinanceMIS focusEx={focusEx} fProject={fProject} />}
        {tab === 'sc'  && <SupplyChain focusEx={focusEx} fProject={fProject} />}
        {tab === 'copilot' && <Copilot onCreateAction={(a) => setActions(prev => [a, ...prev])} />}
        {tab === 'tracker' && <Tracker actions={actions} setActions={setActions} />}
      </main>

      <Disclaimer />
    </div>
  );
};

/* ───────────── Filter select ───────────── */
const Select: React.FC<{ value: string; onChange: (v: string) => void; options: string[] }> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="bg-white border border-slate-300 rounded px-2 py-1 text-xs text-slate-700 focus:outline-none focus:border-[color:var(--blue)]"
    style={{ minWidth: 120 }}
  >
    {options.map(o => <option key={o}>{o}</option>)}
  </select>
);

/* ═════════════════ Screen 1 — Executive Overview ═════════════════ */
const Overview: React.FC<{ filteredEx: Exception[]; onExceptionClick: (e: Exception) => void }> = ({ filteredEx, onExceptionClick }) => {
  const atRisk = PROJECTS.filter(p => p.status !== 'G');
  const valueAtRisk = atRisk.reduce((s, p) => s + (p.pv - p.ev), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-5 gap-4">
        <Kpi label="Revenue vs Plan (QTD)" value="₹612 Cr" sub="−3.4% vs plan · ₹634 Cr" tone="A" icon={<DollarSign className="w-4 h-4 text-slate-400" />} />
        <Kpi label="EBITDA Margin" value="14.2%" sub="vs target 16.0%" tone="A" icon={<Activity className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Projects at Risk" value={`${atRisk.length} · ₹${valueAtRisk.toFixed(0)} Cr`} sub="Value at risk this quarter" tone="R" icon={<AlertTriangle className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Cash Conversion Cycle" value="78 days" sub="+6 d vs last quarter" tone="A" icon={<Clock className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Order Book Coverage" value="14.6 mo" sub="Healthy · target ≥12 mo" tone="G" icon={<Briefcase className="w-4 h-4 text-slate-400" />} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <Card title="What changed this week" icon={<Sparkles className="w-4 h-4" style={{ color: TEAL }} />} className="col-span-1">
          <ul className="space-y-3 text-sm text-slate-700">
            {[
              ['KG-24-017', 'DSV-2 thruster anomaly raised integrity alert; ₹3.8 Cr downtime exposure.'],
              ['KG-24-017', 'Margin slipped −4.6% vs plan — driven by unbilled WIP ageing >45 d.'],
              ['NWIS-R-112', 'Subsea connector lead-time drifted +18 d; spares cover at 11 days.'],
              ['PRP-VI-203', 'Tier-1 client receivables ₹14.2 Cr crossed 90+ ageing bucket.'],
              ['Portfolio', 'Order book added ₹86 Cr from 2 Cambay extensions (verbal LoI).'],
            ].map(([pid, txt], i) => (
              <li key={i} className="flex gap-2">
                <ChevronRight className="w-4 h-4 mt-0.5 shrink-0" style={{ color: BLUE }} />
                <span><b style={{ color: NAVY }}>{pid}</b> — {txt}</span>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Exception queue (click to drill into tab)" icon={<AlertTriangle className="w-4 h-4 text-amber-600" />} className="col-span-2"
          right={<span className="text-xs text-slate-500">{filteredEx.length} open</span>}>
          <table className="w-full text-sm">
            <thead className="text-xs text-slate-500 uppercase tracking-wide">
              <tr className="border-b border-slate-100">
                <th className="text-left py-2 font-medium">Exception</th>
                <th className="text-left font-medium">Project</th>
                <th className="text-left font-medium">Function</th>
                <th className="text-left font-medium">Severity</th>
                <th className="text-right font-medium">Value at Risk</th>
                <th className="text-left font-medium">Owner</th>
                <th className="text-right font-medium">Age</th>
              </tr>
            </thead>
            <tbody>
              {filteredEx.map(e => (
                <tr key={e.id} onClick={() => onExceptionClick(e)} className="border-b border-slate-50 hover:bg-slate-50 cursor-pointer">
                  <td className="py-2.5">
                    <div className="font-mono text-[11px] text-slate-500">{e.id}</div>
                    <div className="text-slate-800">{e.title}</div>
                  </td>
                  <td className="font-mono text-xs" style={{ color: NAVY }}>{e.project}</td>
                  <td className="text-xs text-slate-600">{e.function}</td>
                  <td><RagBadge s={e.severity} /></td>
                  <td className="text-right font-semibold" style={{ color: NAVY }}>{inr(e.vor)}</td>
                  <td className="text-xs text-slate-600">{e.owner}</td>
                  <td className="text-right text-xs text-slate-500">{e.ageDays}d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  );
};

/* ═════════════════ Screen 2 — Under-Sea Operations ═════════════════ */
const UnderSea: React.FC<{ focusEx: string | null; fProject: string }> = ({ focusEx, fProject }) => {
  const focused = focusEx === 'EX-1042' || focusEx === 'EX-1045';
  return (
    <div className="space-y-6">
      {focused && <FocusBanner ex={focusEx!} note="Filtered to relevant assets and inspection records." />}

      <div className="grid grid-cols-4 gap-4">
        <Kpi label="DSV Availability" value="86.4%" sub="Target 92% · 2 vessels in maintenance" tone="A" icon={<Ship className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Unplanned Downtime (30d)" value="118 hrs" sub="+22 hrs vs prior month" tone="R" icon={<Clock className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Critical Integrity Alerts" value="3" sub="2 Red · 1 Amber" tone="R" icon={<AlertTriangle className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Diver Exposure (hrs/wk)" value="142 hrs" sub="Within HSE envelope" tone="G" icon={<ShieldCheck className="w-4 h-4 text-slate-400" />} />
      </div>

      <Card title="Inspection intelligence — AI-flagged defects" icon={<Sparkles className="w-4 h-4" style={{ color: TEAL }} />}>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 uppercase">
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 font-medium">Asset ID</th>
              <th className="text-left font-medium">Project</th>
              <th className="text-left font-medium">Last inspection</th>
              <th className="text-left font-medium">Defect risk</th>
              <th className="text-right font-medium">AI confidence</th>
              <th className="text-left font-medium">Recommended action</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['RIS-CL-08', 'KG-24-017',  '04-May', 'R', 0.92, 'Schedule clamp re-tension within 72 hrs · open work order'],
              ['MAN-SP-22', 'KG-24-017',  '03-May', 'A', 0.78, 'Re-inspect with high-res ROV next window'],
              ['PIPE-VI-7', 'PRP-VI-203', '01-May', 'G', 0.88, 'No action — within tolerance'],
              ['CAB-NW-14', 'NWIS-R-112', '30-Apr', 'A', 0.81, 'Spot inspection during next vessel pass'],
              ['ROV-TH-3',  'CMB-ROV-44', '29-Apr', 'A', 0.74, 'Calibrate after weather window opens'],
            ].filter(r => fProject === 'All Projects' || r[1] === fProject).map((r, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-2.5 font-mono text-xs" style={{ color: NAVY }}>{r[0]}</td>
                <td className="font-mono text-xs text-slate-600">{r[1]}</td>
                <td className="text-xs text-slate-500">{r[2]}</td>
                <td><RagBadge s={r[3] as 'R' | 'A' | 'G'} /></td>
                <td className="text-right text-sm font-semibold" style={{ color: NAVY }}>{Math.round((r[4] as number) * 100)}%</td>
                <td className="text-sm text-slate-700">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Maintenance planner — next 14 days" icon={<Wrench className="w-4 h-4" style={{ color: BLUE }} />} className="col-span-2">
          <div className="grid grid-cols-14 gap-1 text-[10px] mb-2">
            {Array.from({ length: 14 }).map((_, i) => <div key={i} className="text-center text-slate-400">D{i + 1}</div>)}
          </div>
          {[
            { name: 'DSV-2 thruster fix', start: 0, len: 3, tone: 'R', wx: true,  proj: 'KG-24-017' },
            { name: 'ROV-3 calibration',  start: 2, len: 2, tone: 'A', wx: false, proj: 'CMB-ROV-44' },
            { name: 'Riser clamp swap',   start: 4, len: 4, tone: 'A', wx: true,  proj: 'KG-24-017' },
            { name: 'Pipeline weld VI-7', start: 7, len: 3, tone: 'G', wx: false, proj: 'PRP-VI-203' },
            { name: 'Cable spot check',   start: 10, len: 2, tone: 'G', wx: false, proj: 'NWIS-R-112' },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-2 mb-1.5">
              <div className="w-44 text-xs">
                <div className="font-medium text-slate-800 truncate">{m.name}</div>
                <div className="text-[10px] text-slate-400 font-mono">{m.proj}</div>
              </div>
              <div className="flex-1 grid grid-cols-14 gap-1 h-6">
                {Array.from({ length: 14 }).map((_, d) => {
                  const inBar = d >= m.start && d < m.start + m.len;
                  if (!inBar) return <div key={d} className="bg-slate-50 rounded-sm" />;
                  const r = RAG[m.tone as 'R' | 'A' | 'G'];
                  return <div key={d} className="rounded-sm" style={{ background: r.dot, opacity: 0.85 }} title={m.name} />;
                })}
              </div>
              {m.wx && <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">WX risk</span>}
            </div>
          ))}
        </Card>

        <Card title="Safety & compliance" icon={<ShieldCheck className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="space-y-3">
            <Stat label="Open audit actions" value="11" sub="3 overdue >7 d" tone="A" />
            <Stat label="Overdue permits" value="2" sub="Vessel DSV-2, PTW-4471" tone="R" />
            <Stat label="Near-miss trend (4w)" value="↘ 18%" sub="Trending down — good" tone="G" />
          </div>
        </Card>
      </div>
    </div>
  );
};

const Stat: React.FC<{ label: string; value: string; sub?: string; tone: 'R' | 'A' | 'G' }> = ({ label, value, sub, tone }) => {
  const c = tone === 'R' ? '#DC2626' : tone === 'A' ? '#D97706' : '#059669';
  return (
    <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0 last:pb-0">
      <div>
        <div className="text-xs text-slate-500">{label}</div>
        {sub && <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>}
      </div>
      <div className="text-lg font-bold" style={{ color: c }}>{value}</div>
    </div>
  );
};

const FocusBanner: React.FC<{ ex: string; note: string }> = ({ ex, note }) => (
  <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm flex items-center gap-2">
    <AlertTriangle className="w-4 h-4 text-amber-700" />
    <span className="font-semibold text-amber-900">Drilled in from {ex}</span>
    <span className="text-amber-800">— {note}</span>
  </div>
);

/* ═════════════════ Screen 3 — Finance MIS ═════════════════ */
const FinanceMIS: React.FC<{ focusEx: string | null; fProject: string }> = ({ focusEx, fProject }) => {
  const focused = focusEx === 'EX-1043' || focusEx === 'EX-1046';
  const projRows = PROJECTS.filter(p => fProject === 'All Projects' || p.id === fProject);
  return (
    <div className="space-y-6">
      {focused && <FocusBanner ex={focusEx!} note="Filtered to project margin and receivables view." />}
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Invoice Cycle Time" value="11.2 d" sub="Target 7 d" tone="A" icon={<FileText className="w-4 h-4 text-slate-400" />} />
        <Kpi label="DSO" value="74 d" sub="+6 d vs last qtr" tone="R" icon={<Clock className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Month-end Close" value="6.4 d" sub="Target 4 d" tone="A" icon={<Gauge className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Margin Variance" value="−2.8%" sub="2 Red projects pulling avg" tone="R" icon={<LineChart className="w-4 h-4 text-slate-400" />} />
      </div>

      <Card title="Project control — earned value summary" icon={<Briefcase className="w-4 h-4" style={{ color: BLUE }} />}>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 uppercase">
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 font-medium">Project</th>
              <th className="text-left font-medium">Name</th>
              <th className="text-right font-medium">Planned (PV)</th>
              <th className="text-right font-medium">Earned (EV)</th>
              <th className="text-right font-medium">Actual (AC)</th>
              <th className="text-right font-medium">Variance %</th>
              <th className="text-left font-medium">Billing</th>
            </tr>
          </thead>
          <tbody>
            {projRows.map(p => {
              const v = ((p.ev - p.ac) / p.ev) * 100;
              const tone: 'R' | 'A' | 'G' = v < -3 ? 'R' : v < 0 ? 'A' : 'G';
              return (
                <tr key={p.id} className="border-b border-slate-50">
                  <td className="py-2.5 font-mono text-xs" style={{ color: NAVY }}>{p.id}</td>
                  <td className="text-sm text-slate-700">{p.name}</td>
                  <td className="text-right text-sm">{inr(p.pv)}</td>
                  <td className="text-right text-sm">{inr(p.ev)}</td>
                  <td className="text-right text-sm">{inr(p.ac)}</td>
                  <td className="text-right"><RagBadge s={tone} label={`${v.toFixed(1)}%`} /></td>
                  <td><RagBadge s={p.status} label={p.status === 'R' ? 'WIP unbilled' : p.status === 'A' ? 'Partial' : 'Current'} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Receivables ageing" icon={<DollarSign className="w-4 h-4" style={{ color: TEAL }} />} className="col-span-2">
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { b: '0–30 d', v: 42.6, t: 'G' },
              { b: '31–60 d', v: 28.4, t: 'G' },
              { b: '61–90 d', v: 18.1, t: 'A' },
              { b: '90+ d',  v: 22.7, t: 'R' },
            ].map(b => (
              <div key={b.b} className="rounded border border-slate-200 p-3">
                <div className="text-[11px] text-slate-500">{b.b}</div>
                <div className="text-lg font-bold mt-1" style={{ color: NAVY }}>{inr(b.v)}</div>
                <RagBadge s={b.t as 'R' | 'A' | 'G'} />
              </div>
            ))}
          </div>
          <div className="text-xs font-semibold text-slate-500 uppercase mb-2">Top overdue accounts</div>
          <table className="w-full text-sm">
            <tbody>
              {[
                ['East Coast Operator', 'PRP-VI-203', 14.2, 96],
                ['West Offshore JV',    'NWIS-R-112', 6.4, 78],
                ['Bay of Bengal Cluster','KG-24-017', 4.1, 64],
              ].map((r, i) => (
                <tr key={i} className="border-b border-slate-50">
                  <td className="py-2 text-sm text-slate-700">{r[0]}</td>
                  <td className="font-mono text-xs text-slate-500">{r[1]}</td>
                  <td className="text-right font-semibold" style={{ color: NAVY }}>{inr(r[2] as number)}</td>
                  <td className="text-right text-xs text-slate-500">{r[3]} d</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card title="Top 3 margin leakage drivers" icon={<Sparkles className="w-4 h-4" style={{ color: TEAL }} />}>
          <ol className="space-y-3 text-sm text-slate-700">
            <li className="border-l-2 border-red-400 pl-3">
              <div className="font-semibold" style={{ color: NAVY }}>Vessel idle time — KG-24-017</div>
              <div className="text-xs text-slate-500 mt-1">Weather slips + thruster issue · ~₹3.8 Cr</div>
            </li>
            <li className="border-l-2 border-amber-400 pl-3">
              <div className="font-semibold" style={{ color: NAVY }}>Charter conflict premiums</div>
              <div className="text-xs text-slate-500 mt-1">Spot rates +22% on 2 windows · ~₹2.1 Cr</div>
            </li>
            <li className="border-l-2 border-amber-400 pl-3">
              <div className="font-semibold" style={{ color: NAVY }}>Spares expedite charges</div>
              <div className="text-xs text-slate-500 mt-1">Air-freight on 3 SKUs · ~₹1.4 Cr</div>
            </li>
          </ol>
        </Card>
      </div>
    </div>
  );
};

/* ═════════════════ Screen 4 — Supply Chain ═════════════════ */
const SupplyChain: React.FC<{ focusEx: string | null; fProject: string }> = ({ focusEx, fProject }) => {
  const focused = focusEx === 'EX-1044' || focusEx === 'EX-1047';
  return (
    <div className="space-y-6">
      {focused && <FocusBanner ex={focusEx!} note="Filtered to relevant materials and vessel windows." />}
      <Card title="Material readiness by project" icon={<Truck className="w-4 h-4" style={{ color: BLUE }} />}>
        <div className="grid grid-cols-4 gap-4">
          {PROJECTS.map(p => (
            <div key={p.id} className="rounded border border-slate-200 p-3">
              <div className="font-mono text-xs" style={{ color: NAVY }}>{p.id}</div>
              <div className="text-xs text-slate-500 mb-2 truncate">{p.name}</div>
              <RagBadge s={p.status} label={p.status === 'R' ? 'Critical gap' : p.status === 'A' ? 'Watch' : 'On plan'} />
              <div className="mt-3 text-xs text-slate-500">
                {p.status === 'R' ? '2 critical SKUs short' : p.status === 'A' ? '1 SKU drifting' : 'All SKUs covered'}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Critical spares — risk register" icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 uppercase">
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 font-medium">Part family</th>
              <th className="text-left font-medium">Project</th>
              <th className="text-right font-medium">Lead-time drift</th>
              <th className="text-right font-medium">Stock cover</th>
              <th className="text-left font-medium">Stock-out risk</th>
              <th className="text-left font-medium">Recommended action</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Subsea connectors',   'NWIS-R-112', '+18 d', '11 d', 'R', 'Dual-source from Singapore hub · expedite 12 units'],
              ['Riser clamps',        'KG-24-017',  '+9 d',  '14 d', 'A', 'Buffer stock at Mumbai depot'],
              ['ROV consumables',     'CMB-ROV-44', '+3 d',  '24 d', 'G', 'No action'],
              ['Hydraulic seals',     'PRP-VI-203', '+6 d',  '18 d', 'A', 'Negotiate framework rate'],
            ].filter(r => fProject === 'All Projects' || r[1] === fProject).map((r, i) => (
              <tr key={i} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-2.5 text-sm text-slate-700">{r[0]}</td>
                <td className="font-mono text-xs" style={{ color: NAVY }}>{r[1]}</td>
                <td className="text-right text-sm">{r[2]}</td>
                <td className="text-right text-sm">{r[3]}</td>
                <td><RagBadge s={r[4] as 'R' | 'A' | 'G'} /></td>
                <td className="text-sm text-slate-700">{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Vessel scheduling — next 14 days" icon={<Ship className="w-4 h-4" style={{ color: BLUE }} />} className="col-span-2">
          {[
            { v: 'DSV Sagara-1', load: 92, conflict: false, dem: false, proj: 'PRP-VI-203' },
            { v: 'DSV Sagara-2', load: 78, conflict: true,  dem: true,  proj: 'KG-24-017' },
            { v: 'PSV Kaveri-3', load: 64, conflict: false, dem: false, proj: 'NWIS-R-112' },
            { v: 'AHTS Indus-7', load: 41, conflict: true,  dem: false, proj: 'KG-24-017' },
          ].map((v, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
              <div className="w-44">
                <div className="text-sm font-semibold text-slate-800">{v.v}</div>
                <div className="font-mono text-[11px] text-slate-500">{v.proj}</div>
              </div>
              <div className="flex-1 h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${v.load}%`, background: v.load > 90 ? '#DC2626' : v.load > 75 ? '#D97706' : TEAL }} />
              </div>
              <div className="w-12 text-right text-sm font-semibold" style={{ color: NAVY }}>{v.load}%</div>
              {v.conflict && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-semibold">Conflict</span>}
              {v.dem && <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 font-semibold">Demurrage</span>}
            </div>
          ))}
        </Card>
        <Card title="Logistics cost view" icon={<DollarSign className="w-4 h-4" style={{ color: TEAL }} />}>
          <Stat label="Fuel variance MTD" value="+₹1.6 Cr" sub="vs budgeted ₹4.2 Cr" tone="A" />
          <Stat label="Charter premium" value="+₹2.1 Cr" sub="2 spot windows · KG, NWIS" tone="R" />
          <Stat label="Delay cost impact" value="₹0.8 Cr" sub="2 demurrage events" tone="A" />
        </Card>
      </div>
    </div>
  );
};

/* ═════════════════ Screen 5 — AI Copilot ═════════════════ */
type Msg = { role: 'user' | 'ai'; content: React.ReactNode; humanSignoff?: boolean };
const SUGGESTED = [
  'Why did margin decline in KG-24-017 this month?',
  'Show highest value operational risk in next 2 weeks.',
  'What can improve DSO by 8 days this quarter?',
  'Which maintenance actions reduce downtime fastest?',
];

const Copilot: React.FC<{ onCreateAction: (a: any) => void }> = ({ onCreateAction }) => {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [signoff, setSignoff] = useState(true);
  const [input, setInput] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const respond = (q: string) => {
    setMsgs(m => [...m, { role: 'user', content: q }]);
    setTimeout(() => setMsgs(m => [...m, { role: 'ai', content: buildAnswer(q, onCreateAction, signoff), humanSignoff: signoff }]), 350);
  };

  const send = () => { if (input.trim()) { respond(input.trim()); setInput(''); } };

  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-220px)] min-h-[640px]">
      {/* Context sources */}
      <Card title="Context sources" icon={<FileText className="w-4 h-4" style={{ color: BLUE }} />} className="col-span-3 overflow-auto">
        <div className="space-y-2 text-sm">
          {[
            ['Finance MIS', 'Project P&L · receivables · WIP'],
            ['Project Controls', 'EV / PV / AC by project'],
            ['Maintenance logs', 'DSV, ROV, integrity alerts'],
            ['Logistics planner', 'Vessel windows · charter rates'],
            ['HSE register', 'Permits · audit actions'],
          ].map(([t, s], i) => (
            <div key={i} className="border border-slate-200 rounded p-2.5 bg-slate-50">
              <div className="text-xs font-semibold" style={{ color: NAVY }}>{t}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">{s}</div>
              <div className="text-[10px] text-emerald-700 mt-1">● Connected</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Conversation */}
      <Card title="Wealth-grade conversational MIS — Copilot" icon={<Bot className="w-4 h-4" style={{ color: TEAL }} />} className="col-span-9 flex flex-col"
        right={
          <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer">
            <input type="checkbox" checked={signoff} onChange={(e) => setSignoff(e.target.checked)} />
            Require human sign-off on critical actions
          </label>
        }>
        <div className="flex-1 overflow-auto pr-1">
          {msgs.length === 0 && (
            <div className="text-center py-12">
              <Bot className="w-10 h-10 mx-auto text-slate-300 mb-3" />
              <div className="text-sm text-slate-500 mb-4">Ask the Copilot — or pick a suggested prompt below.</div>
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`mb-3 ${m.role === 'user' ? 'flex justify-end' : ''}`}>
              <div className={`${m.role === 'user' ? 'bg-slate-100 text-slate-800 max-w-[70%]' : 'bg-white border border-slate-200 w-full'} rounded-lg p-3 text-sm`}>
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="border-t border-slate-100 pt-3 mt-3">
          <div className="flex flex-wrap gap-2 mb-2">
            {SUGGESTED.map(s => (
              <button key={s} onClick={() => respond(s)} className="text-xs px-2.5 py-1 rounded-full border border-slate-300 text-slate-700 hover:bg-slate-50">
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask the Copilot…"
              className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[color:var(--blue)]"
            />
            <button onClick={send} className="px-4 py-2 rounded-md text-white text-sm font-semibold flex items-center gap-1.5" style={{ background: NAVY }}>
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

const buildAnswer = (q: string, onCreate: (a: any) => void, signoff: boolean) => {
  // Simple keyword router → boardroom-grade answer template
  const lq = q.toLowerCase();
  const data = lq.includes('margin') || lq.includes('kg-24') ? margAns
             : lq.includes('risk') ? riskAns
             : lq.includes('dso') ? dsoAns
             : lq.includes('downtime') || lq.includes('maintenance') ? maintAns
             : margAns;

  const create = () => {
    const id = `ACT-${2300 + Math.floor(Math.random() * 99)}`;
    onCreate({ id, linkedEx: data.linkedEx, impact: data.actionImpact, owner: data.owner, func: data.func, due: data.due, status: 'Open', value: data.value });
    alert(`Draft action ${id} added to Action Tracker${signoff ? ' (pending sign-off)' : ''}`);
  };

  return (
    <div>
      <div className="text-xs font-semibold uppercase text-slate-400 mb-1">Executive summary</div>
      <p className="text-sm text-slate-800 mb-3">{data.summary}</p>

      <div className="text-xs font-semibold uppercase text-slate-400 mb-1">Drivers</div>
      <ul className="text-sm text-slate-700 mb-3 space-y-1">
        {data.drivers.map((d, i) => <li key={i} className="flex gap-2"><ChevronRight className="w-3.5 h-3.5 mt-1" style={{ color: BLUE }} /><span>{d}</span></li>)}
      </ul>

      <div className="text-xs font-semibold uppercase text-slate-400 mb-1">Quantified impact</div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        {(['Low', 'Base', 'High'] as const).map((k, i) => (
          <div key={k} className="rounded border border-slate-200 p-2 text-center">
            <div className="text-[10px] text-slate-500 uppercase">{k}</div>
            <div className="text-sm font-bold" style={{ color: NAVY }}>{data.impact[i]}</div>
          </div>
        ))}
      </div>

      <div className="text-xs font-semibold uppercase text-slate-400 mb-1">Recommended actions</div>
      <div className="border border-slate-200 rounded-md p-3 bg-slate-50 mb-3">
        <div className="text-sm font-semibold" style={{ color: NAVY }}>{data.actionImpact}</div>
        <div className="text-xs text-slate-500 mt-0.5">Owner: {data.owner} · Due: {data.due} · Linked: <span className="font-mono">{data.linkedEx}</span></div>
        <button onClick={create} className="mt-2 text-xs px-3 py-1.5 rounded text-white font-semibold" style={{ background: TEAL }}>
          + Create draft action {signoff && '(needs sign-off)'}
        </button>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500">
        <span>Confidence: <b style={{ color: NAVY }}>{data.confidence}%</b></span>
        <span>Sources: {data.sources.map((s, i) => <span key={i} className="ml-1 px-1.5 py-0.5 bg-slate-100 rounded font-mono text-[10px]">{s}</span>)}</span>
      </div>
    </div>
  );
};

const margAns = {
  summary: 'KG-24-017 margin slipped −4.6% vs plan. Two thirds is operational (vessel idle + clamp re-work); one third is finance hygiene (unbilled WIP > 45 d).',
  drivers: ['DSV-2 thruster anomaly · 36 hrs idle this fortnight', 'Riser clamp re-tension forced extra ROV pass', 'Unbilled WIP ₹6.2 Cr trapped in milestone-gating dispute'],
  impact: ['₹3.2 Cr', '₹6.0 Cr', '₹8.4 Cr'],
  actionImpact: 'Recover ₹6.2 Cr WIP via revised milestone evidence pack',
  owner: 'S. Mehta (Finance)',
  func: 'Finance',
  due: '12-May',
  linkedEx: 'EX-1043',
  confidence: 86,
  sources: ['MIS-P&L', 'PROJ-CTRL', 'MAINT-LOG'],
};
const riskAns = {
  summary: 'Highest-value operational risk in next 14 days is DSV-2 thruster anomaly on KG-24-017 — ₹3.8 Cr exposure if window slips.',
  drivers: ['Integrity alert on riser clamp', 'Weather window narrows after Day 6', 'Backup vessel chartered at +22% spot rate'],
  impact: ['₹2.1 Cr', '₹3.8 Cr', '₹5.6 Cr'],
  actionImpact: 'Pre-stage spares at Kakinada base + accelerate thruster fix to 72 hrs',
  owner: 'A. Rao (Ops)',
  func: 'Ops',
  due: '08-May',
  linkedEx: 'EX-1042',
  confidence: 91,
  sources: ['MAINT-LOG', 'WX-FCST', 'CHARTER-RATES'],
};
const dsoAns = {
  summary: 'DSO can fall by ~8 days this quarter via two levers: collections push on the 90+ bucket and earlier milestone billing on KG and NWIS.',
  drivers: ['₹14.2 Cr in 90+ bucket from one Tier-1 client', 'Milestones 4 & 5 invoiced 11 days late on average', 'Reconciliation cycle adds 4 d of avoidable delay'],
  impact: ['5 d', '8 d', '11 d'],
  actionImpact: 'Set up weekly collections war-room + auto-trigger billing on EV completion',
  owner: 'S. Mehta (Finance)',
  func: 'Finance',
  due: '20-May',
  linkedEx: 'EX-1046',
  confidence: 78,
  sources: ['AR-AGEING', 'MILESTONE-LOG', 'MIS-P&L'],
};
const maintAns = {
  summary: 'Three predictive maintenance actions cut next-quarter unplanned downtime by ~38% with low cost.',
  drivers: ['Riser clamp re-tension prevents recurring ROV passes', 'Thruster oil-condition trigger avoids 2 unplanned halts', 'Cable spot-checks reduce escalation to full inspection'],
  impact: ['28%', '38%', '46%'],
  actionImpact: 'Adopt predictive triggers for 4 critical asset families across KG and NWIS',
  owner: 'A. Rao (Ops)',
  func: 'Ops',
  due: '30-May',
  linkedEx: 'EX-1042',
  confidence: 83,
  sources: ['MAINT-LOG', 'SENSOR-FEED', 'INSPECTION'],
};

/* ═════════════════ Screen 6 — Action Tracker ═════════════════ */
const Tracker: React.FC<{ actions: any[]; setActions: any }> = ({ actions, setActions }) => {
  const done = actions.filter(a => a.status === 'Done');
  const realized = done.reduce((s, a) => s + a.value, 0);
  const pipeline = actions.filter(a => a.status !== 'Done').reduce((s, a) => s + a.value, 0);
  const trend = [3, 5, 4, 6, 7, 8, 11];

  const advance = (id: string) => setActions((prev: any[]) =>
    prev.map(a => a.id === id ? { ...a, status: a.status === 'Open' ? 'In Progress' : a.status === 'In Progress' ? 'Done' : 'Done' } : a));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        <Kpi label="Open actions" value={String(actions.filter(a => a.status !== 'Done').length)} sub="Across Ops, Finance, SCM" tone="A" icon={<ListChecks className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Done this quarter" value={String(done.length)} sub="Closed and value-realised" tone="G" icon={<CheckCircle2 className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Value realised" value={inr(realized)} sub="Cumulative impact (closed)" tone="G" icon={<DollarSign className="w-4 h-4 text-slate-400" />} />
        <Kpi label="Pipeline value" value={inr(pipeline)} sub="Open + In-Progress" tone="N" icon={<Briefcase className="w-4 h-4 text-slate-400" />} />
      </div>

      <Card title="Consolidated action tracker" icon={<ListChecks className="w-4 h-4" style={{ color: BLUE }} />}
        right={<span className="text-xs text-slate-500">From exceptions + Copilot</span>}>
        <table className="w-full text-sm">
          <thead className="text-xs text-slate-500 uppercase">
            <tr className="border-b border-slate-100">
              <th className="text-left py-2 font-medium">Action ID</th>
              <th className="text-left font-medium">Linked Exception</th>
              <th className="text-left font-medium">Business impact</th>
              <th className="text-left font-medium">Owner</th>
              <th className="text-left font-medium">Function</th>
              <th className="text-left font-medium">Due</th>
              <th className="text-left font-medium">Status</th>
              <th className="text-right font-medium">Expected ₹</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {actions.map(a => (
              <tr key={a.id} className="border-b border-slate-50 hover:bg-slate-50">
                <td className="py-2.5 font-mono text-xs" style={{ color: NAVY }}>{a.id}</td>
                <td className="font-mono text-xs text-slate-500">{a.linkedEx}</td>
                <td className="text-sm text-slate-700">{a.impact}</td>
                <td className="text-xs text-slate-600">{a.owner}</td>
                <td className="text-xs text-slate-600">{a.func}</td>
                <td className="text-xs text-slate-600">{a.due}</td>
                <td>
                  <span className={`text-[11px] px-2 py-0.5 rounded font-semibold ${
                    a.status === 'Done' ? 'bg-emerald-100 text-emerald-800'
                    : a.status === 'In Progress' ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-200 text-slate-700'}`}>{a.status}</span>
                </td>
                <td className="text-right text-sm font-semibold" style={{ color: NAVY }}>{inr(a.value)}</td>
                <td>
                  {a.status !== 'Done' && (
                    <button onClick={() => advance(a.id)} className="text-[11px] px-2 py-1 rounded border border-slate-300 hover:bg-slate-100">
                      Advance
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="grid grid-cols-3 gap-6">
        <Card title="Completion trend (7 weeks)" icon={<LineChart className="w-4 h-4" style={{ color: TEAL }} />} className="col-span-2">
          <div className="flex items-end gap-3 h-40">
            {trend.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t" style={{ height: `${v * 12}px`, background: i === trend.length - 1 ? NAVY : BLUE, opacity: i === trend.length - 1 ? 1 : 0.6 }} />
                <div className="text-[10px] text-slate-400">W{i + 1}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card title="Realised value summary" icon={<CheckCircle2 className="w-4 h-4" style={{ color: '#059669' }} />}>
          <Stat label="Ops" value={inr(done.filter(a => a.func === 'Ops').reduce((s, a) => s + a.value, 0) || 0)} tone="G" />
          <Stat label="Finance" value={inr(done.filter(a => a.func === 'Finance').reduce((s, a) => s + a.value, 0) || 0)} tone="G" />
          <Stat label="SCM" value={inr(done.filter(a => a.func === 'SCM').reduce((s, a) => s + a.value, 0))} tone="G" />
        </Card>
      </div>
    </div>
  );
};

export default JubilantEnproCommandCenter;

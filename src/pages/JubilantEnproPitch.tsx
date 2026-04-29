import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Waves, AlertTriangle, Layers, Calculator,
  Truck, Target, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Clock,
  DollarSign, Activity, ShieldCheck, Brain, MessageSquare, ListChecks,
  Anchor, Ship, LineChart, Bot,
} from 'lucide-react';

const NAVY = '#0B2545';
const NAVY_SOFT = '#13355F';
const TEAL = '#0E7C86';
const BLUE = '#1E6091';
const GOLD = '#C8A35B';

const RAG = {
  R: { bg: '#FEE2E2', fg: '#991B1B' },
  A: { bg: '#FEF3C7', fg: '#92400E' },
  G: { bg: '#D1FAE5', fg: '#065F46' },
};

const Slide: React.FC<{ children: React.ReactNode; title: string; eyebrow: string; n: number; total: number; demoTab?: string; demoLabel?: string }> = ({ children, title, eyebrow, n, total, demoTab, demoLabel }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${NAVY}, ${BLUE}, ${TEAL})` }} />
      <div className="px-12 pt-7 pb-4 flex justify-between items-center border-b border-slate-200">
        <div>
          <div className="text-[11px] uppercase tracking-[0.22em] font-semibold" style={{ color: TEAL }}>{eyebrow}</div>
          <h1 className="text-[28px] font-bold mt-1 leading-tight" style={{ color: NAVY }}>{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          {demoTab && (
            <button
              onClick={() => navigate(`/jubilant-enpro?tab=${demoTab}`)}
              className="text-xs px-3 py-1.5 rounded text-white font-semibold flex items-center gap-1.5 hover:opacity-90"
              style={{ background: NAVY }}
            >
              {demoLabel ?? 'Open in demo'} <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-widest text-slate-500">Jubilant Enpro × DiscvrAI</div>
            <div className="text-[11px] text-slate-400 mt-1 font-mono">{String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-12 py-8">{children}</div>
      <div className="px-12 py-3 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500">
        <span>Illustrative — synthetic data. OEM, vendor and client names are fictional. Not for operational or regulatory decision use.</span>
        <span>Confidential discussion document</span>
      </div>
    </div>
  );
};

const Card: React.FC<{ children: React.ReactNode; className?: string; title?: string; icon?: React.ReactNode }> = ({ children, className = '', title, icon }) => (
  <div className={`bg-white border border-slate-200 rounded-lg shadow-sm ${className}`}>
    {title && (
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-slate-100 text-[13px] font-semibold" style={{ color: NAVY }}>
        {icon}{title}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

const Pill: React.FC<{ children: React.ReactNode; tone?: 'R' | 'A' | 'G' | 'navy' | 'teal' }> = ({ children, tone = 'navy' }) => {
  const map: Record<string, { bg: string; fg: string }> = {
    R: RAG.R, A: RAG.A, G: RAG.G,
    navy: { bg: '#EEF2F7', fg: NAVY },
    teal: { bg: '#E0F2F1', fg: TEAL },
  };
  const t = map[tone];
  return <span className="inline-block px-2 py-0.5 rounded text-[11px] font-semibold" style={{ background: t.bg, color: t.fg }}>{children}</span>;
};

const slides: Array<{ eyebrow: string; title: string; demoTab?: string; demoLabel?: string; render: () => React.ReactNode }> = [
  /* ───────── 1 — Why now / Executive Overview hook ───────── */
  {
    eyebrow: 'Slide 1 — Why now',
    title: 'Subsea complexity is up. Margin tolerance is not.',
    demoTab: 'overview',
    demoLabel: 'Open Executive Overview',
    render: () => (
      <div className="grid grid-cols-3 gap-6 h-full">
        <Card className="col-span-2" title="The business case for one command layer" icon={<Waves className="w-4 h-4" style={{ color: TEAL }} />}>
          <ul className="space-y-4 text-[15px] text-slate-700">
            <li className="flex gap-3"><Anchor className="w-5 h-5 mt-0.5" style={{ color: BLUE }} /><span><b>Programs are getting harder</b> — deeper assets, tighter weather windows, stricter integrity regimes — while client tolerance for downtime keeps shrinking.</span></li>
            <li className="flex gap-3"><Calculator className="w-5 h-5 mt-0.5" style={{ color: BLUE }} /><span><b>Manual coordination across ops and finance can no longer scale</b> — billing lags, rework and reconciliations consume the team faster than headcount can grow.</span></li>
            <li className="flex gap-3"><Sparkles className="w-5 h-5 mt-0.5" style={{ color: BLUE }} /><span><b>Leadership lacks one real-time control tower</b> — projects, finance and logistics live in disconnected MIS sheets refreshed weekly.</span></li>
          </ul>
        </Card>
        <Card title="What good looks like" icon={<Target className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="space-y-3 text-sm">
            <Row k="Revenue vs plan" v="−3.4%" tone="A" />
            <Row k="EBITDA margin" v="14.2% / 16% target" tone="A" />
            <Row k="Projects at risk" v="2 · ₹46 Cr exposure" tone="R" />
            <Row k="Cash conversion" v="78 d (+6 d)" tone="A" />
            <Row k="Order book cover" v="14.6 mo" tone="G" />
          </div>
          <div className="mt-4 p-3 rounded bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <b style={{ color: NAVY }}>Demo cue:</b> open Exception Queue → click any row → land in the right functional tab pre-filtered.
          </div>
        </Card>
      </div>
    ),
  },

  /* ───────── 2 — Cross-functional pain trace ───────── */
  {
    eyebrow: 'Slide 2 — Pain is cross-functional',
    title: 'One delayed project shows up in ops, finance and supply chain — separately.',
    demoTab: 'ops',
    demoLabel: 'Open Under-Sea + trace KG-24-017',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        <Card title="Under-Sea Ops view — KG-24-017" icon={<Waves className="w-4 h-4" style={{ color: TEAL }} />}>
          <Pill tone="R">DSV-2 thruster anomaly</Pill>
          <ul className="mt-3 text-sm text-slate-700 space-y-2">
            <li>• Integrity alert on riser clamp</li>
            <li>• 36 hrs idle this fortnight</li>
            <li>• Weather window narrows after Day 6</li>
          </ul>
          <div className="mt-3 text-xs text-slate-500">Logged as <span className="font-mono">EX-1042</span></div>
        </Card>
        <Card title="Finance MIS view — KG-24-017" icon={<LineChart className="w-4 h-4" style={{ color: BLUE }} />}>
          <Pill tone="R">Margin −4.6% vs plan</Pill>
          <ul className="mt-3 text-sm text-slate-700 space-y-2">
            <li>• Unbilled WIP ₹6.2 Cr ageing &gt;45 d</li>
            <li>• Milestone evidence pack stuck</li>
            <li>• AR delay cascading into DSO</li>
          </ul>
          <div className="mt-3 text-xs text-slate-500">Logged as <span className="font-mono">EX-1043</span></div>
        </Card>
        <Card title="Supply Chain view — linked" icon={<Truck className="w-4 h-4" style={{ color: TEAL }} />}>
          <Pill tone="A">Charter vessel conflict</Pill>
          <ul className="mt-3 text-sm text-slate-700 space-y-2">
            <li>• Spot rate +22% on next window</li>
            <li>• Spares re-routed via Mumbai hub</li>
            <li>• Demurrage clock running 0.8 Cr</li>
          </ul>
          <div className="mt-3 text-xs text-slate-500">Logged as <span className="font-mono">EX-1047</span></div>
        </Card>
        <div className="col-span-3 rounded-md p-4 border-l-4" style={{ borderColor: TEAL, background: '#F0FDFA' }}>
          <div className="text-sm font-semibold" style={{ color: NAVY }}>The point</div>
          <div className="text-sm text-slate-700 mt-1">Same project (<span className="font-mono">KG-24-017</span>) — three different systems, three owners, no single line-of-sight to the ₹13.9 Cr aggregate exposure. <b>This is what the command center fixes.</b></div>
        </div>
      </div>
    ),
  },

  /* ───────── 3 — Connected command layer ───────── */
  {
    eyebrow: 'Slide 3 — Connected command layer',
    title: 'One decision layer across operations, finance and logistics.',
    demoTab: 'overview',
    demoLabel: 'See shared IDs flow across tabs',
    render: () => (
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-7" title="Integrated data model" icon={<Layers className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="grid grid-cols-3 gap-3">
            {[
              { t: 'Project Controls', s: 'PV · EV · AC · variance', i: <Target className="w-4 h-4" /> },
              { t: 'Finance MIS', s: 'P&L · AR · billing · WIP', i: <Calculator className="w-4 h-4" /> },
              { t: 'Maintenance & HSE', s: 'Sensor · permits · audits', i: <ShieldCheck className="w-4 h-4" /> },
              { t: 'Logistics Planner', s: 'Vessels · charters · ports', i: <Ship className="w-4 h-4" /> },
              { t: 'Inspection & Integrity', s: 'ROV · DSV · anomalies', i: <Waves className="w-4 h-4" /> },
              { t: 'AI Copilot', s: 'Conversational MIS', i: <Bot className="w-4 h-4" /> },
            ].map((b, i) => (
              <div key={i} className="border border-slate-200 rounded p-3 bg-slate-50">
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: NAVY }}>{b.i}{b.t}</div>
                <div className="text-[11px] text-slate-500 mt-1">{b.s}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white border border-slate-200 rounded text-xs text-slate-600">
            <b style={{ color: NAVY }}>Shared keys:</b> Project IDs (<span className="font-mono">KG-24-017</span>, <span className="font-mono">NWIS-R-112</span>, <span className="font-mono">PRP-VI-203</span>) and Exception IDs (<span className="font-mono">EX-10xx</span>) flow across every tab — same row, three lenses.
          </div>
        </Card>
        <Card className="col-span-5" title="What changes for leadership" icon={<TrendingUp className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="space-y-3 text-sm">
            {[
              ['From weekly MIS', 'to live exception queue'],
              ['From three tools per question', 'to one Copilot answer'],
              ['From department metrics', 'to ₹-impact across function'],
              ['From email chains', 'to traceable Action Tracker'],
            ].map(([a, b], i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-slate-500 line-through w-44">{a}</span>
                <ArrowRight className="w-4 h-4" style={{ color: TEAL }} />
                <span className="font-semibold" style={{ color: NAVY }}>{b}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    ),
  },

  /* ───────── 4 — Under-Sea use cases ───────── */
  {
    eyebrow: 'Slide 4 — Under-Sea use cases',
    title: 'From reactive offshore response to predictive control.',
    demoTab: 'ops',
    demoLabel: 'Open Under-Sea Operations',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { i: <Waves className="w-5 h-5" />, t: 'AI-flagged inspection intelligence', d: 'ROV/DSV imagery scored for defect risk with confidence; recommended next action with 24/72-hr SLA.' },
          { i: <ShieldCheck className="w-5 h-5" />, t: 'Integrity alerts → preventive work orders', d: 'Critical anomalies create work orders pre-staged with spares, vessel and permits — not after the fact.' },
          { i: <Clock className="w-5 h-5" />, t: 'Weather-aware maintenance planner', d: '14-day intervention plan factors weather windows, vessel availability and HSE permit validity.' },
        ].map((u, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{ color: NAVY }}>{u.i}{u.t}</div>
            <p className="text-sm text-slate-700">{u.d}</p>
          </Card>
        ))}
        <Card className="col-span-3" title="Outcome we expect" icon={<Activity className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <Outcome k="Unplanned downtime" v="−35%" />
            <Outcome k="Inspection cycle time" v="−40%" />
            <Outcome k="DSV availability" v="+6 pts" />
            <Outcome k="HSE near-miss trend" v="↘ 18%" />
          </div>
        </Card>
      </div>
    ),
  },

  /* ───────── 5 — Finance use cases ───────── */
  {
    eyebrow: 'Slide 5 — Finance use cases',
    title: 'Real-time finance visibility protects project margin.',
    demoTab: 'fin',
    demoLabel: 'Open Finance MIS',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { i: <DollarSign className="w-5 h-5" />, t: 'Invoice-to-cash automation', d: 'Auto-trigger billing on EV milestone completion; expose stuck WIP and ageing in the same view.' },
          { i: <Calculator className="w-5 h-5" />, t: 'Project margin variance tied to ops events', d: 'Margin slip on KG-24-017 is traceable to the exact thruster anomaly and weather window slip.' },
          { i: <Clock className="w-5 h-5" />, t: 'DSO acceleration', d: 'Identify 90+ ageing concentration, run weekly collections war-room, fix milestone-billing lag.' },
        ].map((u, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{ color: NAVY }}>{u.i}{u.t}</div>
            <p className="text-sm text-slate-700">{u.d}</p>
          </Card>
        ))}
        <Card className="col-span-3" title="Outcome we expect" icon={<Activity className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <Outcome k="DSO" v="−8 days" />
            <Outcome k="Invoice cycle time" v="11.2 d → 7 d" />
            <Outcome k="Month-end close" v="6.4 d → 4 d" />
            <Outcome k="Margin leakage recovered" v="₹8–12 Cr/yr" />
          </div>
        </Card>
      </div>
    ),
  },

  /* ───────── 6 — Supply Chain use cases ───────── */
  {
    eyebrow: 'Slide 6 — Supply chain & logistics',
    title: 'Reduce cost leakage and schedule risk before it hits margin.',
    demoTab: 'sc',
    demoLabel: 'Open Supply Chain & Logistics',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { i: <Truck className="w-5 h-5" />, t: 'Material readiness by project', d: 'RAG status per project; critical-spares risk register with lead-time drift and stock-cover days.' },
          { i: <Ship className="w-5 h-5" />, t: 'Vessel scheduling & conflict alerts', d: '14-day vessel board flags overlap, demurrage exposure and load %; pre-empts charter-spot premiums.' },
          { i: <DollarSign className="w-5 h-5" />, t: 'Logistics cost intelligence', d: 'Fuel variance, charter premium and delay cost stitched to operational events for clean attribution.' },
        ].map((u, i) => (
          <Card key={i}>
            <div className="flex items-center gap-2 mb-2 text-sm font-semibold" style={{ color: NAVY }}>{u.i}{u.t}</div>
            <p className="text-sm text-slate-700">{u.d}</p>
          </Card>
        ))}
        <Card className="col-span-3" title="Outcome we expect" icon={<Activity className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <Outcome k="Stock-out incidents" v="−50%" />
            <Outcome k="Charter spot premium" v="−₹4–6 Cr/yr" />
            <Outcome k="Demurrage events" v="−60%" />
            <Outcome k="Schedule slippage" v="−25%" />
          </div>
        </Card>
      </div>
    ),
  },

  /* ───────── 7 — KPI commitments ───────── */
  {
    eyebrow: 'Slide 7 — KPI commitments',
    title: 'Transformation tracked through measurable outcomes.',
    demoTab: 'overview',
    render: () => (
      <Card title="Owner · Baseline · Target — first 12 months" icon={<Target className="w-4 h-4" style={{ color: TEAL }} />}>
        <table className="w-full text-sm">
          <thead className="text-[11px] uppercase tracking-wider text-slate-500">
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 font-semibold">KPI</th>
              <th className="text-left font-semibold">Owner</th>
              <th className="text-right font-semibold">Baseline</th>
              <th className="text-right font-semibold">Target (12m)</th>
              <th className="text-right font-semibold">Annual ₹ impact</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['DSO', 'Finance Head', '74 d', '66 d', '₹6–8 Cr cash release'],
              ['Unplanned offshore downtime', 'Offshore Ops Head', '118 hrs/mo', '76 hrs/mo', '₹14–18 Cr margin'],
              ['Invoice cycle time', 'Finance Head', '11.2 d', '7 d', 'Faster recognition'],
              ['Stock-out incidents (critical)', 'Supply Chain Head', '8 / qtr', '4 / qtr', '₹3–4 Cr saved'],
              ['Charter spot premium spend', 'Supply Chain Head', '+22% avg', '+8% avg', '₹4–6 Cr saved'],
              ['Month-end close', 'Finance Head', '6.4 d', '4 d', 'PMO velocity'],
              ['Project margin variance', 'PMO', '−2.8%', '+0.5%', '₹10+ Cr restored'],
            ].map((r, i) => (
              <tr key={i} className="border-b border-slate-100">
                <td className="py-2.5 font-medium text-slate-800">{r[0]}</td>
                <td className="text-slate-600">{r[1]}</td>
                <td className="text-right">{r[2]}</td>
                <td className="text-right font-semibold" style={{ color: TEAL }}>{r[3]}</td>
                <td className="text-right font-semibold" style={{ color: NAVY }}>{r[4]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    ),
  },

  /* ───────── 8 — Roadmap + Action Tracker ───────── */
  {
    eyebrow: 'Slide 8 — Roadmap & governance',
    title: 'Practical phased rollout, not big-bang change.',
    demoTab: 'tracker',
    demoLabel: 'Open Action Tracker',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { p: 'Now · 0–90 days', tone: 'teal', bullets: ['Stand up command center for 2 anchor projects', 'Connect Finance MIS, Project Controls, Maintenance logs', 'Launch exception queue + Action Tracker governance'] },
          { p: 'Next · 90–180 days', tone: 'navy', bullets: ['Add Logistics planner, charter & demurrage data', 'Roll out AI Copilot for ops + finance leadership', 'KPI baseline → first quarterly outcome review'] },
          { p: 'Later · 180–365 days', tone: 'navy', bullets: ['Predictive integrity models on critical asset families', 'Auto-billing on EV milestone completion', 'Extend to enterprise-wide PMO + investor MIS'] },
        ].map((p, i) => (
          <Card key={i}>
            <Pill tone={p.tone === 'teal' ? 'teal' : 'navy'}>{p.p}</Pill>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {p.bullets.map((b, j) => (
                <li key={j} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: TEAL }} />{b}</li>
              ))}
            </ul>
          </Card>
        ))}
        <Card className="col-span-3" title="Governance — every action is owned, dated and ₹-quantified" icon={<ListChecks className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="grid grid-cols-4 gap-4 text-sm">
            <Outcome k="Actions in flight (illustrative)" v="42" />
            <Outcome k="Avg time-to-close" v="9 days" />
            <Outcome k="Realised value YTD" v="₹11.4 Cr" />
            <Outcome k="Pipeline value" v="₹28 Cr" />
          </div>
        </Card>
      </div>
    ),
  },

  /* ───────── 9 — Optional: AI Copilot in action ───────── */
  {
    eyebrow: 'Slide 9 — Optional · AI Copilot in action',
    title: 'From static MIS reporting to decision intelligence.',
    demoTab: 'copilot',
    demoLabel: 'Open AI Copilot live',
    render: () => (
      <div className="grid grid-cols-12 gap-6">
        <Card className="col-span-5" title="Three prompts to run live" icon={<MessageSquare className="w-4 h-4" style={{ color: TEAL }} />}>
          <ul className="space-y-3 text-sm">
            {[
              'Why did margin decline in KG-24-017 this month?',
              'Show highest value operational risk in next 2 weeks.',
              'What can improve DSO by 8 days this quarter?',
            ].map((p, i) => (
              <li key={i} className="border border-slate-200 rounded p-3 bg-slate-50">
                <span className="text-[11px] font-mono text-slate-500">Prompt {i + 1}</span>
                <div className="text-slate-800 mt-1">{p}</div>
              </li>
            ))}
          </ul>
        </Card>
        <Card className="col-span-7" title="Every Copilot answer carries the same five layers" icon={<Brain className="w-4 h-4" style={{ color: TEAL }} />}>
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              ['1 · Executive summary', 'One-liner a CXO can act on'],
              ['2 · Drivers', 'Ranked, source-cited'],
              ['3 · Quantified impact', 'Low / Base / High in ₹'],
              ['4 · Recommended actions', 'Owner + due date + tracker link'],
              ['5 · Confidence + sources', 'Auditable, traceable'],
              ['Human sign-off toggle', 'Mandatory on critical paths'],
            ].map(([t, s], i) => (
              <div key={i} className="border border-slate-200 rounded p-3">
                <div className="text-[12px] font-semibold" style={{ color: NAVY }}>{t}</div>
                <div className="text-[12px] text-slate-500 mt-0.5">{s}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-600 p-3 rounded bg-slate-50 border border-slate-200">
            <b style={{ color: NAVY }}>Boundary:</b> Copilot drafts; humans approve. No automated action without workflow sign-off.
          </div>
        </Card>
      </div>
    ),
  },
];

const Row: React.FC<{ k: string; v: string; tone: 'R' | 'A' | 'G' }> = ({ k, v, tone }) => {
  const c = tone === 'R' ? '#DC2626' : tone === 'A' ? '#D97706' : '#059669';
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0 text-sm">
      <span className="text-slate-600">{k}</span>
      <span className="font-bold" style={{ color: c }}>{v}</span>
    </div>
  );
};

const Outcome: React.FC<{ k: string; v: string }> = ({ k, v }) => (
  <div className="border border-slate-200 rounded p-3 bg-slate-50">
    <div className="text-[11px] uppercase tracking-wide text-slate-500">{k}</div>
    <div className="text-lg font-bold mt-1" style={{ color: NAVY }}>{v}</div>
  </div>
);

const JubilantEnproPitch: React.FC = () => {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const total = slides.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setI(v => Math.min(v + 1, total - 1));
      if (e.key === 'ArrowLeft')  setI(v => Math.max(v - 1, 0));
      if (e.key === 'Escape') navigate('/');
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate, total]);

  const s = slides[i];

  return (
    <div style={{ background: '#F4F6FA' }}>
      <Slide eyebrow={s.eyebrow} title={s.title} n={i + 1} total={total} demoTab={s.demoTab} demoLabel={s.demoLabel}>
        {s.render()}
      </Slide>

      {/* Pager */}
      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white border border-slate-200 rounded-full px-3 py-1.5 shadow-md">
        <button onClick={() => setI(v => Math.max(v - 1, 0))} disabled={i === 0} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {slides.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className="w-2 h-2 rounded-full transition-all"
              style={{ background: idx === i ? NAVY : '#CBD5E1', width: idx === i ? 18 : 8 }} />
          ))}
        </div>
        <button onClick={() => setI(v => Math.min(v + 1, total - 1))} disabled={i === total - 1} className="p-1 rounded hover:bg-slate-100 disabled:opacity-30">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default JubilantEnproPitch;

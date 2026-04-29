import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft, ChevronRight, Waves, AlertTriangle, Layers, Cpu, Calculator,
  Truck, Target, Map, Sparkles, ArrowRight, CheckCircle2, TrendingUp, Clock,
  DollarSign, Activity, Shield, Zap, Brain, MessageSquare
} from 'lucide-react';

const navy = '#0B2545';
const accent = '#1E6091';
const gold = '#C8A35B';

const Slide: React.FC<{ children: React.ReactNode; title: string; eyebrow: string; n: number; total: number }> = ({ children, title, eyebrow, n, total }) => (
  <div className="w-full min-h-screen flex flex-col bg-white" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
    <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${navy}, ${accent}, ${gold})` }} />
    <div className="px-12 pt-8 pb-4 flex justify-between items-center border-b border-slate-200">
      <div>
        <div className="text-xs uppercase tracking-[0.2em] font-semibold" style={{ color: gold }}>{eyebrow}</div>
        <h1 className="text-3xl font-bold mt-1" style={{ color: navy }}>{title}</h1>
      </div>
      <div className="text-right">
        <div className="text-xs uppercase tracking-widest text-slate-500">Jubilant Enpro × DiscvrAI</div>
        <div className="text-xs text-slate-400 mt-1 font-mono">{String(n).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
      </div>
    </div>
    <div className="flex-1 px-12 py-10">{children}</div>
    <div className="px-12 py-3 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
      <span>Illustrative — synthetic data. OEM and vendor names fictional.</span>
      <span>Confidential discussion document</span>
    </div>
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; style?: React.CSSProperties }> = ({ children, className = '', style }) => (
  <div style={style} className={`bg-white border border-slate-200 rounded-lg p-5 shadow-sm ${className}`}>{children}</div>
);

const Pill: React.FC<{ children: React.ReactNode; tone?: 'navy' | 'gold' | 'amber' | 'green' }> = ({ children, tone = 'navy' }) => {
  const tones = {
    navy: { bg: '#EEF2F7', fg: navy },
    gold: { bg: '#FBF4E2', fg: '#8C6A1F' },
    amber: { bg: '#FEF3C7', fg: '#92400E' },
    green: { bg: '#D1FAE5', fg: '#065F46' },
  }[tone];
  return <span className="inline-block px-2.5 py-1 rounded text-xs font-semibold" style={{ background: tones.bg, color: tones.fg }}>{children}</span>;
};

const slides: Array<{ eyebrow: string; title: string; render: () => React.ReactNode }> = [
  // 1
  {
    eyebrow: 'Slide 1 — Why Now',
    title: 'Offshore complexity is up. Margin tolerance is not.',
    render: () => (
      <div className="grid grid-cols-3 gap-6 h-full">
        <Card className="col-span-2">
          <div className="text-sm font-semibold mb-3" style={{ color: navy }}>The business case for digital, in three lines</div>
          <ul className="space-y-4 text-slate-700">
            <li className="flex gap-3"><Waves className="w-5 h-5 mt-0.5" style={{ color: accent }} /><span><b>Subsea programs are getting harder</b> — deeper assets, tighter weather windows, stricter integrity regimes — while client tolerance for downtime keeps shrinking.</span></li>
            <li className="flex gap-3"><Calculator className="w-5 h-5 mt-0.5" style={{ color: accent }} /><span><b>Manual coordination across ops and finance can no longer scale</b> — billing lags, rework, and reconciliations consume the team faster than headcount can grow.</span></li>
            <li className="flex gap-3"><Sparkles className="w-5 h-5 mt-0.5" style={{ color: accent }} /><span><b>Digital is now the differentiator</b> — control, speed, and transparency win the next round of EPC and DSV contracts, not just capability.</span></li>
          </ul>
        </Card>
        <div className="space-y-4">
          {[
            { k: 'Avg. unplanned offshore downtime', v: '4–7 hrs/asset/wk', tone: 'amber' as const },
            { k: 'Manual ROV review backlog', v: '3–6 weeks', tone: 'amber' as const },
            { k: 'Project margin visibility', v: 'Post-close only', tone: 'amber' as const },
            { k: 'Target outcome (12 mo)', v: 'In-flight control', tone: 'green' as const },
          ].map((m, i) => (
            <Card key={i}><div className="text-xs text-slate-500">{m.k}</div><div className="text-2xl font-bold mt-1" style={{ color: navy }}>{m.v}</div><div className="mt-2"><Pill tone={m.tone}>indicative</Pill></div></Card>
          ))}
        </div>
      </div>
    ),
  },
  // 2
  {
    eyebrow: 'Slide 2 — Current-State Pain Map',
    title: 'Where value leaks today: subsea, finance, supply chain.',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: Waves, h: 'Under-Sea Operations', c: '#0E7490', items: ['Manual ROV inspection burden', 'Reactive maintenance on critical assets', 'Integrity findings discovered late', 'High diver exposure on inspection runs'] },
          { icon: Calculator, h: 'Finance', c: '#7C3AED', items: ['Milestone billing lag', 'Spreadsheet-heavy reconciliation', 'Project profitability visible post-close', 'Forecast accuracy slips at month-end'] },
          { icon: Truck, h: 'Supply Chain & Logistics', c: '#B45309', items: ['Vessel scheduling conflicts', 'Spare-part stock-out surprises', 'Demurrage from coordination gaps', 'Fragmented vendor SLAs'] },
        ].map((p, i) => {
          const I = p.icon;
          return (
            <Card key={i}>
              <div className="flex items-center gap-3 mb-3"><I className="w-6 h-6" style={{ color: p.c }} /><div className="font-bold" style={{ color: navy }}>{p.h}</div></div>
              <ul className="space-y-2">{p.items.map((it, j) => <li key={j} className="text-sm text-slate-700 flex gap-2"><AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: '#D97706' }} /><span>{it}</span></li>)}</ul>
            </Card>
          );
        })}
        <Card className="col-span-3 border-l-4" style={{ borderLeftColor: gold }}>
          <div className="text-sm"><b style={{ color: navy }}>The pattern:</b> none of these are capability gaps — Jubilant Enpro already executes complex offshore work. The unlock is <b>connecting</b> the workflows, data, and decisions that already exist in silos.</div>
        </Card>
      </div>
    ),
  },
  // 3
  {
    eyebrow: 'Slide 3 — Target Operating Model',
    title: 'A connected command layer over ops, finance, and logistics.',
    render: () => (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            { h: 'Edge', sub: 'Offshore capture', items: ['ROV video streams', 'Asset telemetry', 'Vessel position'] },
            { h: 'Core', sub: 'Onshore intelligence', items: ['Unified data model', 'AI inspection + predictive', 'Project margin engine'] },
            { h: 'Decision', sub: 'Role-based views', items: ['Ops cockpit', 'Finance control tower', 'Logistics board'] },
          ].map((l, i) => (
            <Card key={i}>
              <Pill tone="gold">Layer {i + 1}</Pill>
              <div className="text-lg font-bold mt-2" style={{ color: navy }}>{l.h}</div>
              <div className="text-xs text-slate-500 mb-3">{l.sub}</div>
              <ul className="space-y-1.5 text-sm text-slate-700">{l.items.map((x, j) => <li key={j} className="flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5" style={{ color: accent }} />{x}</li>)}</ul>
            </Card>
          ))}
        </div>
        <Card>
          <div className="grid grid-cols-4 gap-4 items-center">
            <div className="col-span-1"><div className="text-xs uppercase tracking-widest text-slate-500">Anchored on</div><div className="text-lg font-bold" style={{ color: navy }}>One trusted data foundation</div></div>
            <div className="col-span-3 grid grid-cols-4 gap-3 text-xs">
              {['Common KPI definitions', 'Role-based access & audit', 'Edge + cloud architecture', 'Explainable AI outputs'].map((x, i) => (
                <div key={i} className="px-3 py-2 rounded text-center font-semibold" style={{ background: '#EEF2F7', color: navy }}>{x}</div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    ),
  },
  // 4
  {
    eyebrow: 'Slide 4 — Demo Core: Subsea Operations',
    title: 'AI-assisted inspection, predictive uptime, safer interventions.',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: Cpu, h: 'AI-Assisted ROV Inspection', items: ['Computer-vision triage of dive footage', 'Defect classification with human-in-loop', 'Auto-drafted inspection reports'], kpi: 'Inspection cycle time ↓ 40–60%' },
          { icon: Activity, h: 'Predictive Maintenance', items: ['IoT telemetry on DSV systems, cranes, pumps', 'Failure-mode models per asset class', 'Weather-window-aware work orders'], kpi: 'Unplanned downtime ↓ 25–35%' },
          { icon: Shield, h: 'Risk-Based Intervention', items: ['Integrity scoring per joint / segment', 'Compliance & safety traceability', 'Diver exposure minimization'], kpi: 'Diver hours ↓ 20–30%' },
        ].map((u, i) => {
          const I = u.icon;
          return (
            <Card key={i}>
              <I className="w-7 h-7 mb-3" style={{ color: accent }} />
              <div className="font-bold mb-3" style={{ color: navy }}>{u.h}</div>
              <ul className="space-y-1.5 text-sm text-slate-700 mb-4">{u.items.map((x, j) => <li key={j} className="flex gap-2"><ArrowRight className="w-4 h-4 mt-0.5" style={{ color: gold }} />{x}</li>)}</ul>
              <div className="pt-3 border-t border-slate-200"><Pill tone="green">{u.kpi}</Pill></div>
            </Card>
          );
        })}
        <Card className="col-span-3" >
          <div className="text-sm text-slate-700"><b style={{ color: navy }}>Workshop message:</b> "Do not replace experts. Give experts machine-speed triage and better evidence."</div>
        </Card>
      </div>
    ),
  },
  // 5
  {
    eyebrow: 'Slide 5 — Demo Core: Finance',
    title: 'Invoice-to-cash automation and in-flight margin control.',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: Calculator, h: 'Invoice-to-Cash Automation', items: ['OCR + RPA for AP/AR', 'Contract-linked milestone billing', 'Approval workflows with audit'], kpi: 'Invoice cycle ↓ 50%, DSO ↓ 8–12 days' },
          { icon: TrendingUp, h: 'Project Margin Cockpit', items: ['Planned Value / Earned Value / Actual Cost', 'Variance alerts before overrun', 'Change-order timing intelligence'], kpi: 'Margin variance caught at 30–50% completion' },
          { icon: Brain, h: 'Forecast & Close', items: ['Exception-based monthly close', 'Rolling forecast with driver tree', 'Working-capital scenario engine'], kpi: 'Close time ↓ 30–40%' },
        ].map((u, i) => {
          const I = u.icon;
          return (
            <Card key={i}>
              <I className="w-7 h-7 mb-3" style={{ color: '#7C3AED' }} />
              <div className="font-bold mb-3" style={{ color: navy }}>{u.h}</div>
              <ul className="space-y-1.5 text-sm text-slate-700 mb-4">{u.items.map((x, j) => <li key={j} className="flex gap-2"><ArrowRight className="w-4 h-4 mt-0.5" style={{ color: gold }} />{x}</li>)}</ul>
              <div className="pt-3 border-t border-slate-200"><Pill tone="green">{u.kpi}</Pill></div>
            </Card>
          );
        })}
        <Card className="col-span-3" >
          <div className="text-sm text-slate-700"><b style={{ color: navy }}>Workshop message:</b> "Finance transformation funds operations transformation."</div>
        </Card>
      </div>
    ),
  },
  // 6
  {
    eyebrow: 'Slide 6 — Demo Core: Supply Chain & Logistics',
    title: 'Visibility first. Orchestration second. Cost discipline always.',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { icon: Truck, h: 'Schedule Risk Alerts', items: ['Vessel conflict detection', 'Weather window forecasting', 'Critical-path slip warnings'], kpi: 'Demurrage ↓ 15–25%' },
          { icon: Layers, h: 'Material Movement Visibility', items: ['Spare-part tracking by project', 'Lead-time drift monitoring', 'Stock-out probability scoring'], kpi: 'Stock-out incidents ↓ 30–40%' },
          { icon: Map, h: 'Scenario Planning', items: ['What-if for delay impact', 'Cost-to-serve simulation', 'Multi-vendor swap analysis'], kpi: 'Planning accuracy ↑ 20–30%' },
        ].map((u, i) => {
          const I = u.icon;
          return (
            <Card key={i}>
              <I className="w-7 h-7 mb-3" style={{ color: '#B45309' }} />
              <div className="font-bold mb-3" style={{ color: navy }}>{u.h}</div>
              <ul className="space-y-1.5 text-sm text-slate-700 mb-4">{u.items.map((x, j) => <li key={j} className="flex gap-2"><ArrowRight className="w-4 h-4 mt-0.5" style={{ color: gold }} />{x}</li>)}</ul>
              <div className="pt-3 border-t border-slate-200"><Pill tone="green">{u.kpi}</Pill></div>
            </Card>
          );
        })}
      </div>
    ),
  },
  // 7
  {
    eyebrow: 'Slide 7 — KPI Commitments',
    title: 'What leadership should expect to see — and own.',
    render: () => (
      <div className="grid grid-cols-3 gap-6">
        {[
          { h: 'Operations', c: '#0E7490', icon: Activity, kpis: [['Inspection cycle time', '↓ 40–60%'], ['Unplanned downtime', '↓ 25–35%'], ['Asset availability', '↑ 5–8 pts'], ['TRIR / safety incidents', '↓ trend'], ['Compliance closure aging', 'Within SLA']] },
          { h: 'Finance', c: '#7C3AED', icon: DollarSign, kpis: [['Invoice cycle time', '↓ 50%'], ['DSO', '↓ 8–12 days'], ['Month-end close', '↓ 30–40%'], ['Forecast accuracy', '±5%'], ['Margin variance caught early', '≥ 80%']] },
          { h: 'Supply Chain', c: '#B45309', icon: Truck, kpis: [['Material readiness index', '≥ 95%'], ['Critical spare stock-outs', '↓ 30–40%'], ['Vessel utilization', '↑ 8–12 pts'], ['Demurrage value', '↓ 15–25%'], ['On-time vendor delivery', '≥ 92%']] },
        ].map((g, i) => {
          const I = g.icon;
          return (
            <Card key={i}>
              <div className="flex items-center gap-2 mb-4"><I className="w-5 h-5" style={{ color: g.c }} /><div className="font-bold" style={{ color: navy }}>{g.h} KPIs</div></div>
              <div className="space-y-2">{g.kpis.map(([k, v], j) => (
                <div key={j} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <span className="text-sm text-slate-700">{k}</span>
                  <span className="text-sm font-bold" style={{ color: g.c }}>{v}</span>
                </div>
              ))}</div>
            </Card>
          );
        })}
      </div>
    ),
  },
  // 8
  {
    eyebrow: 'Slide 8 — Roadmap',
    title: '90 / 180 / 365 days — disciplined, sequenced, value-first.',
    render: () => (
      <div className="space-y-5">
        {[
          { h: 'Days 0–90', tag: 'Foundation + first wins', c: '#0E7490', items: ['Baseline KPI capture across ops, finance, supply chain', 'Data integration sprint (priority systems)', '1 inspection AI pilot + 1 AP/AR automation pilot', 'Governance, access, and audit framework live'] },
          { h: 'Days 90–180', tag: 'Scale the proven', c: '#1E6091', items: ['Inspection AI on 2–3 active campaigns', 'Project margin cockpit (PV/EV/AC) live for top programs', 'AP/AR automation scaled across BU', 'Logistics visibility layer with alerts'] },
          { h: 'Days 180–365', tag: 'Orchestrate + institutionalize', c: gold, items: ['Predictive maintenance across critical asset classes', 'Logistics orchestration with what-if scenarios', 'AI Copilot for management reviews', 'Frontline upskilling and KPI ownership'] },
        ].map((p, i) => (
          <Card key={i} className="border-l-4" style={{ borderLeftColor: p.c }}>
            <div className="grid grid-cols-5 gap-4 items-start">
              <div className="col-span-1"><div className="text-2xl font-bold" style={{ color: p.c }}>{p.h}</div><div className="text-xs uppercase tracking-widest text-slate-500 mt-1">{p.tag}</div></div>
              <div className="col-span-4 grid grid-cols-2 gap-2">{p.items.map((x, j) => (
                <div key={j} className="text-sm text-slate-700 flex gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: p.c }} /><span>{x}</span></div>
              ))}</div>
            </div>
          </Card>
        ))}
        <Card className="border-l-4" style={{ borderLeftColor: gold }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3"><MessageSquare className="w-6 h-6" style={{ color: gold }} /><div><div className="font-bold" style={{ color: navy }}>See it live: Operations Command Center demo</div><div className="text-xs text-slate-500">Subsea, finance and supply-chain views with the AI Copilot on top of MIS.</div></div></div>
            <a href="/jubilant-enpro" className="px-5 py-2.5 rounded-lg text-white text-sm font-semibold flex items-center gap-2" style={{ background: navy }}>Open demo <ArrowRight className="w-4 h-4" /></a>
          </div>
        </Card>
      </div>
    ),
  },
];

export default function JubilantEnproPitch() {
  const [i, setI] = useState(0);
  const navigate = useNavigate();
  const total = slides.length;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') setI((p) => Math.min(p + 1, total - 1));
      if (e.key === 'ArrowLeft') setI((p) => Math.max(p - 1, 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [total]);

  const s = slides[i];
  return (
    <div className="relative bg-slate-50 min-h-screen">
      <Slide eyebrow={s.eyebrow} title={s.title} n={i + 1} total={total}>{s.render()}</Slide>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white border border-slate-200 rounded-full shadow-lg px-3 py-2 z-50">
        <button onClick={() => setI((p) => Math.max(p - 1, 0))} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30" disabled={i === 0}><ChevronLeft className="w-4 h-4" /></button>
        <div className="flex gap-1.5 px-2">
          {slides.map((_, j) => (
            <button key={j} onClick={() => setI(j)} className="w-2 h-2 rounded-full transition-all" style={{ background: j === i ? navy : '#CBD5E1', width: j === i ? 24 : 8 }} />
          ))}
        </div>
        <button onClick={() => setI((p) => Math.min(p + 1, total - 1))} className="p-2 rounded-full hover:bg-slate-100 disabled:opacity-30" disabled={i === total - 1}><ChevronRight className="w-4 h-4" /></button>
        <div className="w-px h-5 bg-slate-200 mx-1" />
        <button onClick={() => navigate('/jubilant-enpro')} className="px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5" style={{ background: navy }}>
          <Zap className="w-3 h-3" /> Open demo
        </button>
      </div>
    </div>
  );
}

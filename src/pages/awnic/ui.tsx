import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Gauge, Target, RefreshCw, Layers, ArrowLeft, Presentation, Circle, Shield, FlaskConical, Plug, Repeat } from 'lucide-react';

export const BRAND = {
  navy: '#0B2D4A',
  navyDark: '#061A2E',
  teal: '#0D9488',
  ink: '#0F172A',
  paper: '#F8FAFC',
  amber: '#D97706',
  green: '#059669',
  danger: '#DC2626',
};

const nav = [
  { to: '/awnic/cockpit', icon: Gauge, label: 'Executive Cockpit' },
  { to: '/awnic/acquisition', icon: Target, label: 'Acquisition' },
  { to: '/awnic/recovery', icon: Repeat, label: 'Abandon Recovery' },
  { to: '/awnic/retention', icon: RefreshCw, label: 'Retention & Renewal' },
  { to: '/awnic/crosssell', icon: Layers, label: 'Cross-Sell Studio' },
  { to: '/awnic/agent', icon: Shield, label: 'Agent Assist' },
  { to: '/awnic/experiment', icon: FlaskConical, label: 'Experimentation' },
  { to: '/awnic/integration', icon: Plug, label: 'Integration Status' },
];

export const AWNICLayout: React.FC = () => {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      <aside className="w-64 shrink-0 border-r border-slate-200 flex flex-col bg-white">
        <Link to="/awnic" className="px-5 py-5 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: BRAND.navy }}>
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: BRAND.teal }}>AWNIC</div>
            <div className="text-sm font-semibold text-slate-900">Growth Intelligence</div>
          </div>
        </Link>
        <nav className="flex-1 py-3 overflow-y-auto">
          {nav.map(n => {
            const Icon = n.icon;
            const active = loc.pathname.startsWith(n.to);
            return (
              <NavLink key={n.to} to={n.to}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition border-l-2 ${active ? 'bg-teal-50 text-slate-900 font-medium' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
                style={active ? { borderColor: BRAND.teal } : {}}>
                <Icon className="w-4 h-4" /> {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link to="/pitch/awnic" className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200">
            <Presentation className="w-3.5 h-3.5" /> Open 6-Slide Deck
          </Link>
          <Link to="/awnic" className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200">
            <ArrowLeft className="w-3.5 h-3.5" /> Hub
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
            <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" /> Demo mode · synthetic
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export const PageHeader: React.FC<{ eyebrow: string; title: string; sub?: string; right?: React.ReactNode }> = ({ eyebrow, title, sub, right }) => (
  <div className="px-8 pt-7 pb-5 border-b border-slate-200 flex items-end justify-between bg-white">
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: BRAND.teal }}>{eyebrow}</div>
      <h1 className="text-2xl font-semibold mt-1 text-slate-900">{title}</h1>
      {sub && <p className="text-sm text-slate-600 mt-1 max-w-3xl">{sub}</p>}
    </div>
    {right}
  </div>
);

export const ArchStrip: React.FC<{ active?: 'sources' | 'c360' | 'decision' | 'channels' }> = ({ active }) => {
  const steps = [
    { k: 'sources', label: 'Sources', sub: 'Policy · App · Web · Claims · Complaints' },
    { k: 'c360', label: 'Customer 360', sub: 'Unified ID · history · loyalty' },
    { k: 'decision', label: 'Decisioning', sub: 'Propensity · churn · NBA · guardrails' },
    { k: 'channels', label: 'Channels', sub: 'App · WhatsApp · Agent · Ads' },
  ];
  return (
    <div className="mx-8 my-4 rounded-lg border border-slate-200 bg-white px-4 py-2.5 flex items-center gap-2 text-[11px]">
      <span className="text-slate-400 uppercase tracking-widest font-semibold mr-2">Architecture</span>
      {steps.map((s, i) => (
        <React.Fragment key={s.k}>
          <div className={`px-2.5 py-1.5 rounded ${active === s.k ? 'bg-teal-50 border border-teal-200' : 'bg-slate-50 border border-slate-200'}`}>
            <div className={`font-semibold ${active === s.k ? 'text-teal-700' : 'text-slate-700'}`}>{s.label}</div>
            <div className="text-[10px] text-slate-500">{s.sub}</div>
          </div>
          {i < steps.length - 1 && <div className="text-slate-300">›</div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export const Card: React.FC<React.PropsWithChildren<{ title?: string; right?: React.ReactNode; className?: string }>> = ({ title, right, children, className = '' }) => (
  <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {title && (
      <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-slate-700 font-semibold">{title}</div>
        {right}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export const Kpi: React.FC<{ label: string; value: string | number; unit?: string; delta?: string; tone?: 'navy' | 'teal' | 'amber' | 'green' | 'danger' }> = ({ label, value, unit, delta, tone = 'navy' }) => {
  const color = { navy: BRAND.navy, teal: BRAND.teal, amber: BRAND.amber, green: BRAND.green, danger: BRAND.danger }[tone];
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[11px] uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <div className="text-3xl font-semibold" style={{ color }}>{value}</div>
        {unit && <div className="text-sm text-slate-500">{unit}</div>}
      </div>
      {delta && <div className="text-[11px] text-slate-500 mt-1">{delta}</div>}
    </div>
  );
};

export const Pill: React.FC<{ tone?: 'navy' | 'teal' | 'amber' | 'green' | 'danger' | 'slate'; children: React.ReactNode }> = ({ tone = 'slate', children }) => {
  const m: Record<string, string> = {
    navy: 'bg-blue-50 text-blue-900 border-blue-200',
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${m[tone]}`}>{children}</span>;
};

export const Narration: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mx-8 mb-6 mt-2 rounded-lg border border-teal-200 bg-teal-50/60 px-4 py-3 text-sm text-teal-900 flex items-start gap-2">
    <div className="text-[10px] font-bold uppercase tracking-widest text-teal-700 mt-0.5">Narration</div>
    <div className="flex-1">{children}</div>
  </div>
);

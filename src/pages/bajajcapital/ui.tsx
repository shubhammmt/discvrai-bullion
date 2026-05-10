import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Users, Activity, PiggyBank, Layers, ArrowLeft, Presentation, Circle, ShieldCheck } from 'lucide-react';

export const BRAND = {
  blue: '#1E3A8A',      // deep navy blue
  blueDark: '#0F1F4D',
  accent: '#2563EB',
  ink: '#0F172A',
  paper: '#F8FAFC',
  amber: '#D97706',
  green: '#059669',
  red: '#DC2626',
};

const nav = [
  { to: '/bajajcapital/cockpit', icon: Users, label: 'RM Intelligence Cockpit' },
  { to: '/bajajcapital/ops', icon: Activity, label: 'Ops / COO Command' },
  { to: '/bajajcapital/retirement', icon: PiggyBank, label: 'Retirement Education' },
  { to: '/bajajcapital/architecture', icon: Layers, label: 'Architecture' },
];

export const BajajCapitalLayout: React.FC = () => {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      <aside className="w-64 shrink-0 border-r border-slate-200 flex flex-col bg-white">
        <Link to="/bajajcapital" className="px-5 py-5 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: BRAND.blue }}>
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: BRAND.blue }}>Bajaj Capital</div>
            <div className="text-sm font-semibold text-slate-900">Intelligence Suite</div>
          </div>
        </Link>
        <nav className="flex-1 py-3">
          {nav.map(n => {
            const Icon = n.icon;
            const active = loc.pathname.startsWith(n.to);
            return (
              <NavLink key={n.to} to={n.to}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition border-l-2 ${active ? 'bg-blue-50 text-slate-900 font-medium' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}
                style={active ? { borderColor: BRAND.blue } : {}}>
                <Icon className="w-4 h-4" /> {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link to="/pitch/bajajcapital" className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200">
            <Presentation className="w-3.5 h-3.5" /> Open 6-Slide Deck
          </Link>
          <Link to="/bajajcapital" className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200">
            <ArrowLeft className="w-3.5 h-3.5" /> Hub
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
            <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" /> Demo · synthetic data
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-1.5 text-[11px] text-amber-800 font-medium tracking-wide">
          DEMO · SYNTHETIC DATA · NOT INVESTMENT ADVICE · NO REAL CLIENT INFORMATION
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export const PageHeader: React.FC<{ eyebrow: string; title: string; sub?: string; right?: React.ReactNode }> = ({ eyebrow, title, sub, right }) => (
  <div className="px-8 pt-7 pb-5 border-b border-slate-200 flex items-end justify-between bg-white">
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: BRAND.blue }}>{eyebrow}</div>
      <h1 className="text-2xl font-semibold mt-1 text-slate-900">{title}</h1>
      {sub && <p className="text-sm text-slate-600 mt-1 max-w-2xl">{sub}</p>}
    </div>
    {right}
  </div>
);

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

export const Kpi: React.FC<{ label: string; value: string | number; unit?: string; delta?: string; tone?: 'blue' | 'amber' | 'green' | 'ink' | 'red' }> = ({ label, value, unit, delta, tone = 'blue' }) => {
  const color = { blue: BRAND.blue, amber: BRAND.amber, green: BRAND.green, ink: BRAND.ink, red: BRAND.red }[tone];
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

export const Pill: React.FC<{ tone?: 'blue' | 'amber' | 'green' | 'slate' | 'red'; children: React.ReactNode }> = ({ tone = 'slate', children }) => {
  const m: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    slate: 'bg-slate-50 text-slate-700 border-slate-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${m[tone]}`}>{children}</span>;
};

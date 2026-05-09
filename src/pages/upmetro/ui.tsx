import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Network, AlertTriangle, KeyRound, ShieldCheck, ClipboardCheck, Train, Presentation, ArrowLeft, Circle } from 'lucide-react';

export const BRAND = {
  navy: '#FFFFFF',          // sidebar / header surface
  navyDeep: '#F8FAFC',      // page background
  accent: '#0E7490',        // cyan-700
  warn: '#D97706',          // amber-600
  red: '#DC2626',           // red-600
  green: '#059669',         // emerald-600
};

const nav = [
  { to: '/upmetro/command', icon: LayoutDashboard, label: 'Cyber Command' },
  { to: '/upmetro/assets',  icon: Network,        label: 'IT-OT Map' },
  { to: '/upmetro/incidents', icon: AlertTriangle, label: 'SOC Workbench' },
  { to: '/upmetro/access',  icon: KeyRound,       label: 'Identity & Vendor' },
  { to: '/upmetro/recovery',icon: ShieldCheck,    label: 'Recovery & Drills' },
  { to: '/upmetro/compliance', icon: ClipboardCheck, label: 'Compliance' },
];

export const UPMetroLayout: React.FC = () => {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-800">
      <aside className="w-64 shrink-0 border-r border-slate-200 flex flex-col bg-white">
        <Link to="/upmetro" className="px-5 py-5 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md flex items-center justify-center bg-cyan-600">
            <Train className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-cyan-700">UP Metro</div>
            <div className="text-sm font-semibold text-slate-900">Cyber Resilience Suite</div>
          </div>
        </Link>
        <nav className="flex-1 py-3">
          {nav.map(n => {
            const Icon = n.icon;
            const active = loc.pathname.startsWith(n.to);
            return (
              <NavLink key={n.to} to={n.to}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition border-l-2 ${active ? 'bg-cyan-50 border-cyan-600 text-slate-900 font-medium' : 'border-transparent text-slate-600 hover:bg-slate-50'}`}>
                <Icon className="w-4 h-4" /> {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-200 space-y-2">
          <Link to="/pitch/upmetro" className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200">
            <Presentation className="w-3.5 h-3.5" /> Open 6-Slide Deck
          </Link>
          <Link to="/upmetro" className="flex items-center gap-2 text-xs px-3 py-2 rounded bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200">
            <ArrowLeft className="w-3.5 h-3.5" /> Hub
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
            <Circle className="w-2 h-2 fill-emerald-500 text-emerald-500 animate-pulse" /> Live · Demo data
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
      <div className="text-[10px] uppercase tracking-[0.22em] text-cyan-700 font-semibold">{eyebrow}</div>
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

export const Kpi: React.FC<{ label: string; value: string | number; unit?: string; delta?: string; tone?: 'red' | 'amber' | 'green' | 'cyan' }> = ({ label, value, unit, delta, tone = 'cyan' }) => {
  const color = { red: BRAND.red, amber: BRAND.warn, green: BRAND.green, cyan: BRAND.accent }[tone];
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

export const SevPill: React.FC<{ sev: string }> = ({ sev }) => {
  const m: Record<string, string> = {
    Critical: 'bg-red-50 text-red-700 border-red-200',
    High:     'bg-orange-50 text-orange-700 border-orange-200',
    Medium:   'bg-amber-50 text-amber-700 border-amber-200',
    Low:      'bg-emerald-50 text-emerald-700 border-emerald-200',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${m[sev] || m.Medium}`}>{sev}</span>;
};

export const StatusDot: React.FC<{ status: string }> = ({ status }) => {
  const c = status === 'Green' ? '#10b981' : status === 'Amber' ? '#f59e0b' : '#ef4444';
  return <span className="inline-block w-2 h-2 rounded-full" style={{ background: c }} />;
};

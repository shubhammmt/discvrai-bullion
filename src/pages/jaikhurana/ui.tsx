import React from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import { Activity, TrendingDown, Truck, ShieldAlert, MountainSnow, Bot, ArrowLeft, Presentation, Circle, Ship } from 'lucide-react';

export const BRAND = {
  navy: '#0B1437',
  navyDeep: '#070C24',
  accent: '#22D3EE',
  accentDeep: '#0891B2',
  ink: '#E2E8F0',
  paper: '#0F1A3D',
  amber: '#F59E0B',
  green: '#10B981',
  red: '#F43F5E',
};

const nav = [
  { to: '/jaikhurana/exec', icon: Activity, label: 'Executive Command' },
  { to: '/jaikhurana/freight', icon: Truck, label: 'Freight Booking Advisor' },
  { to: '/jaikhurana/leakage', icon: TrendingDown, label: 'Cost Leakage Cockpit' },
  { to: '/jaikhurana/vendor', icon: ShieldAlert, label: 'Vendor Risk' },
  { to: '/jaikhurana/ropeway', icon: MountainSnow, label: 'Ropeway / Project Assurance' },
  { to: '/jaikhurana/assurance', icon: Bot, label: 'Assurance Copilot' },
];

export const JaiKhuranaLayout: React.FC = () => {
  const loc = useLocation();
  return (
    <div className="min-h-screen flex" style={{ background: BRAND.navyDeep, color: BRAND.ink }}>
      <aside className="w-64 shrink-0 border-r flex flex-col" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
        <Link to="/jaikhurana" className="px-5 py-5 border-b flex items-center gap-3" style={{ borderColor: '#1E2A55' }}>
          <div className="w-10 h-10 rounded-md flex items-center justify-center" style={{ background: BRAND.accentDeep }}>
            <Ship className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] tracking-[0.2em] uppercase" style={{ color: BRAND.accent }}>Group Logistics</div>
            <div className="text-sm font-semibold text-white">Execution Intelligence</div>
          </div>
        </Link>
        <nav className="flex-1 py-3">
          {nav.map(n => {
            const Icon = n.icon;
            const active = loc.pathname.startsWith(n.to);
            return (
              <NavLink key={n.to} to={n.to}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition border-l-2 ${active ? 'font-medium text-white' : 'border-transparent text-slate-400 hover:text-white'}`}
                style={active ? { borderColor: BRAND.accent, background: 'rgba(34,211,238,0.06)' } : {}}>
                <Icon className="w-4 h-4" /> {n.label}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4 border-t space-y-2" style={{ borderColor: '#1E2A55' }}>
          <Link to="/pitch/jaikhurana" className="flex items-center gap-2 text-xs px-3 py-2 rounded text-slate-300 border" style={{ background: '#0F1A3D', borderColor: '#1E2A55' }}>
            <Presentation className="w-3.5 h-3.5" /> Open 7-Slide Deck
          </Link>
          <Link to="/jaikhurana" className="flex items-center gap-2 text-xs px-3 py-2 rounded text-slate-300 border" style={{ background: '#0F1A3D', borderColor: '#1E2A55' }}>
            <ArrowLeft className="w-3.5 h-3.5" /> Hub
          </Link>
          <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-2">
            <Circle className="w-2 h-2 fill-emerald-400 text-emerald-400 animate-pulse" /> Synthetic demo · not operational data
          </div>
        </div>
      </aside>
      <main className="flex-1 min-w-0 overflow-auto">
        <div className="border-b px-6 py-1.5 text-[11px] font-medium tracking-wide" style={{ background: '#1A1208', borderColor: '#3F2D0A', color: '#FCD34D' }}>
          DEMO · SYNTHETIC DATA · NO ADANI / GROUP BRANDING IMPLIED · NOT OPERATIONAL DATA
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export const PageHeader: React.FC<{ eyebrow: string; title: string; sub?: string; right?: React.ReactNode }> = ({ eyebrow, title, sub, right }) => (
  <div className="px-8 pt-7 pb-5 border-b flex items-end justify-between" style={{ background: BRAND.navy, borderColor: '#1E2A55' }}>
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: BRAND.accent }}>{eyebrow}</div>
      <h1 className="text-2xl font-semibold mt-1 text-white">{title}</h1>
      {sub && <p className="text-sm text-slate-400 mt-1 max-w-3xl">{sub}</p>}
    </div>
    {right}
  </div>
);

export const Card: React.FC<React.PropsWithChildren<{ title?: string; right?: React.ReactNode; className?: string }>> = ({ title, right, children, className = '' }) => (
  <div className={`rounded-xl border ${className}`} style={{ background: BRAND.paper, borderColor: '#1E2A55' }}>
    {title && (
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: '#1E2A55' }}>
        <div className="text-xs uppercase tracking-wider text-slate-300 font-semibold">{title}</div>
        {right}
      </div>
    )}
    <div className="p-4">{children}</div>
  </div>
);

export const Kpi: React.FC<{ label: string; value: string | number; unit?: string; delta?: string; tone?: 'navy' | 'amber' | 'green' | 'red' }> = ({ label, value, unit, delta, tone = 'navy' }) => {
  const color = { navy: BRAND.accent, amber: BRAND.amber, green: BRAND.green, red: BRAND.red }[tone];
  return (
    <div className="rounded-xl border p-4" style={{ background: BRAND.paper, borderColor: '#1E2A55' }}>
      <div className="text-[11px] uppercase tracking-wider text-slate-400">{label}</div>
      <div className="mt-1 flex items-baseline gap-1">
        <div className="text-3xl font-semibold" style={{ color }}>{value}</div>
        {unit && <div className="text-sm text-slate-400">{unit}</div>}
      </div>
      {delta && <div className="text-[11px] text-slate-500 mt-1">{delta}</div>}
    </div>
  );
};

export const Pill: React.FC<{ tone?: 'navy' | 'amber' | 'green' | 'slate' | 'red'; children: React.ReactNode }> = ({ tone = 'slate', children }) => {
  const m: Record<string, string> = {
    navy: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    green: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    slate: 'bg-slate-500/10 text-slate-300 border-slate-500/30',
    red: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  };
  return <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${m[tone]}`}>{children}</span>;
};

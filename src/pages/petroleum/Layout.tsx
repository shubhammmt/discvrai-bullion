import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Fuel, Truck, Flame, Droplets, Building2,
  ShieldAlert, ListChecks, Bot, PlayCircle, Sparkles
} from 'lucide-react';

const nav = [
  { to: '/petroleum', label: 'Executive Command Center', icon: LayoutDashboard, end: true },
  { to: '/petroleum/retail', label: 'Retail Stations', icon: Fuel },
  { to: '/petroleum/dispatch', label: 'Dispatch Control Tower', icon: Truck },
  { to: '/petroleum/lpg', label: 'LPG Intelligence', icon: Flame },
  { to: '/petroleum/lubricants', label: 'Lubricants Growth', icon: Droplets },
  { to: '/petroleum/b2b', label: 'B2B Sales & Credit', icon: Building2 },
  { to: '/petroleum/leakage', label: 'Margin Leakage', icon: ShieldAlert },
  { to: '/petroleum/rhythm', label: 'Daily Operating Rhythm', icon: ListChecks },
  { to: '/petroleum/copilot', label: 'Petroleum Copilot', icon: Bot },
  { to: '/petroleum/walkthrough', label: 'Executive Walkthrough', icon: PlayCircle },
];

export default function PetroleumLayout() {
  const loc = useLocation();
  const active = nav.find(n => n.end ? loc.pathname === n.to : loc.pathname.startsWith(n.to))?.label ?? 'Command Center';

  return (
    <div className="min-h-screen flex w-full bg-slate-50 text-slate-900">
      <aside className="w-64 shrink-0 bg-slate-950 text-slate-200 flex flex-col border-r border-slate-800">
        <div className="px-5 py-5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-slate-950" />
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight text-white">DiscvrAI</div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Decision & Execution Layer</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-2 py-3 space-y-0.5 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-colors ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/20'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span className="truncate">{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="px-4 py-3 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed">
          Sits on top of ERP, POS, depot, tanker & finance systems.
          <br />Connect → Detect → Decide → Execute.
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <header className="bg-white border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">
              Petroleum Business Command Center · Zimbabwe
            </div>
            <h1 className="text-lg font-semibold text-slate-900 mt-0.5">{active}</h1>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live · 14 systems connected
            </div>
            <div className="text-slate-500">CEO View · {new Date().toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' })}</div>
          </div>
        </header>
        <div className="p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

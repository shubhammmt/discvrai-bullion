import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export const ICICI_ORANGE = '#F37920';
export const ICICI_NAVY = '#0A1A4A';

export interface Tab { id: string; label: string; icon?: React.ComponentType<any>; }

export const Layout: React.FC<{
  title: string; subtitle: string; tabs: Tab[]; active: string;
  onChange: (id: string) => void; children: React.ReactNode; right?: React.ReactNode;
}> = ({ title, subtitle, tabs, active, onChange, children, right }) => (
  <div className="min-h-screen bg-slate-50">
    <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-[1600px] mx-auto px-7 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/icici-lombard" className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#F37920]">
            <ArrowLeft className="w-4 h-4" /> Hub
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <div className="w-9 h-9 rounded-md bg-[#F37920] flex items-center justify-center text-white font-bold text-[10px] leading-none px-1 text-center">IL</div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">{subtitle}</div>
            <div className="text-base font-semibold text-slate-900 leading-tight">{title}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {right}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
            <ShieldCheck className="w-3.5 h-3.5" /> Demo · Mock data only
          </div>
        </div>
      </div>
      <div className="max-w-[1600px] mx-auto px-7 flex gap-1 overflow-x-auto">
        {tabs.map(t => {
          const I = t.icon;
          return (
            <button key={t.id} onClick={() => onChange(t.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                active === t.id ? 'border-[#F37920] text-[#F37920]' : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}>
              {I && <I className="w-4 h-4" />} {t.label}
            </button>
          );
        })}
      </div>
    </header>
    <main className="max-w-[1600px] mx-auto px-7 py-6">{children}</main>
    <footer className="max-w-[1600px] mx-auto px-7 py-4 text-[11px] text-slate-500 flex justify-between border-t border-slate-200 mt-8">
      <span>Confidential · Mock data · Assistive recommendations · Suitability checks enforced</span>
      <span>Audit trail enabled · Human-in-the-loop · ICICI Lombard pilot framework</span>
    </footer>
  </div>
);

export const Card: React.FC<{ title?: string; subtitle?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }> =
  ({ title, subtitle, right, children, className = '' }) => (
  <div className={`rounded-xl bg-white border border-slate-200 p-5 ${className}`}>
    {(title || right) && (
      <div className="flex items-start justify-between mb-3.5">
        <div>
          {title && <div className="text-sm font-semibold text-slate-900">{title}</div>}
          {subtitle && <div className="text-[11px] text-slate-500 mt-0.5">{subtitle}</div>}
        </div>
        {right}
      </div>
    )}
    {children}
  </div>
);

export const KPI: React.FC<{ label: string; value: string; delta?: string; tone?: 'up'|'down'|'neutral'; sub?: string }> =
  ({ label, value, delta, tone = 'neutral', sub }) => {
  const cls = tone === 'up' ? 'text-emerald-700 bg-emerald-50' : tone === 'down' ? 'text-rose-700 bg-rose-50' : 'text-slate-700 bg-slate-100';
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-4">
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
      <div className="mt-1 flex items-baseline gap-2">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {delta && <span className={`text-[11px] px-1.5 py-0.5 rounded font-semibold ${cls}`}>{delta}</span>}
      </div>
      {sub && <div className="text-[11px] text-slate-500 mt-1">{sub}</div>}
    </div>
  );
};

export const Pill: React.FC<{ tone?: 'orange'|'amber'|'rose'|'emerald'|'slate'|'blue'; children: React.ReactNode }> =
  ({ tone = 'slate', children }) => {
  const map: Record<string, string> = {
    orange: 'bg-orange-50 text-[#F37920] border-orange-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    blue: 'bg-blue-50 text-blue-700 border-blue-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold border ${map[tone]}`}>{children}</span>;
};

export const ScoreRing: React.FC<{ score: number; size?: number }> = ({ score, size = 56 }) => {
  const tone = score >= 85 ? '#16a34a' : score >= 70 ? '#F37920' : '#94a3b8';
  const r = size / 2 - 6;
  const c = 2 * Math.PI * r;
  const dash = (score / 100) * c;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={size/2} cy={size/2} r={r} stroke="#e2e8f0" strokeWidth="6" fill="none" />
      <circle cx={size/2} cy={size/2} r={r} stroke={tone} strokeWidth="6" fill="none"
        strokeDasharray={`${dash} ${c}`} strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`} />
      <text x="50%" y="54%" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0f172a">{score}</text>
    </svg>
  );
};

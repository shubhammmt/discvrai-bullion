import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';

export interface SBITab { id: string; label: string; icon?: React.ComponentType<any>; }

interface Props {
  title: string;
  subtitle: string;
  tabs: SBITab[];
  active: string;
  onChange: (id: string) => void;
  children: React.ReactNode;
  rightSlot?: React.ReactNode;
}

export const SBILayout: React.FC<Props> = ({ title, subtitle, tabs, active, onChange, children, rightSlot }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1600px] mx-auto px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/sbi-card" className="flex items-center gap-2 text-xs text-slate-500 hover:text-[#1E2761]">
              <ArrowLeft className="w-4 h-4" /> Hub
            </Link>
            <div className="h-6 w-px bg-slate-200" />
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[#1E2761] to-[#2A3A95] flex items-center justify-center text-white font-bold text-sm">
              SBI
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500 font-semibold">{subtitle}</div>
              <div className="text-base font-semibold text-slate-900 leading-tight">{title}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {rightSlot}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-700 text-xs font-medium border border-emerald-100">
              <ShieldCheck className="w-3.5 h-3.5" /> Production-grade · Governed
            </div>
          </div>
        </div>
        <div className="max-w-[1600px] mx-auto px-8 flex gap-1 overflow-x-auto">
          {tabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => onChange(t.id)}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap ${
                  active === t.id
                    ? 'border-[#1E2761] text-[#1E2761]'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {Icon && <Icon className="w-4 h-4" />} {t.label}
              </button>
            );
          })}
        </div>
      </header>
      <main className="max-w-[1600px] mx-auto px-8 py-7">{children}</main>
      <footer className="max-w-[1600px] mx-auto px-8 py-4 text-[11px] text-slate-500 flex justify-between border-t border-slate-200 mt-10">
        <span>Confidential · Demo data only · No customer PII · Consent-aware decisioning</span>
        <span>Overlay on current stack · Human-in-the-loop · Full audit trail</span>
      </footer>
    </div>
  );
};

export const KpiCard: React.FC<{ label: string; value: string; delta?: string; tone?: 'up' | 'down' | 'neutral'; sub?: string }> = ({ label, value, delta, tone = 'neutral', sub }) => {
  const toneCls = tone === 'up' ? 'text-emerald-600 bg-emerald-50' : tone === 'down' ? 'text-rose-600 bg-rose-50' : 'text-slate-600 bg-slate-100';
  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5">
      <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{label}</div>
      <div className="mt-1.5 flex items-baseline gap-2">
        <div className="text-2xl font-bold text-slate-900">{value}</div>
        {delta && <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${toneCls}`}>{delta}</span>}
      </div>
      {sub && <div className="text-[11px] text-slate-500 mt-1">{sub}</div>}
    </div>
  );
};

export const Card: React.FC<{ title?: string; subtitle?: string; children: React.ReactNode; right?: React.ReactNode; className?: string }> = ({ title, subtitle, children, right, className = '' }) => (
  <div className={`rounded-xl bg-white border border-slate-200 p-5 ${className}`}>
    {(title || right) && (
      <div className="flex items-start justify-between mb-4">
        <div>
          {title && <div className="text-base font-semibold text-slate-900">{title}</div>}
          {subtitle && <div className="text-xs text-slate-500 mt-0.5">{subtitle}</div>}
        </div>
        {right}
      </div>
    )}
    {children}
  </div>
);

export const Pill: React.FC<{ tone?: 'blue' | 'amber' | 'rose' | 'emerald' | 'slate'; children: React.ReactNode }> = ({ tone = 'slate', children }) => {
  const map = {
    blue: 'bg-blue-50 text-[#1E2761] border-blue-100',
    amber: 'bg-amber-50 text-amber-700 border-amber-100',
    rose: 'bg-rose-50 text-rose-700 border-rose-100',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-100',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold border ${map[tone]}`}>{children}</span>;
};

import { ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Risk } from './data';

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`bg-white border border-slate-200 rounded-xl shadow-sm ${className}`}>{children}</div>;
}

export function SectionTitle({ title, sub, right }: { title: string; sub?: string; right?: ReactNode }) {
  return (
    <div className="flex items-end justify-between mb-3">
      <div>
        <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  );
}

export function Kpi({
  label, value, sub, trend, accent = 'slate',
}: {
  label: string; value: string; sub?: string; trend?: number;
  accent?: 'slate' | 'emerald' | 'amber' | 'red' | 'blue' | 'violet';
}) {
  const accentMap: Record<string, string> = {
    slate: 'border-slate-200',
    emerald: 'border-emerald-200 bg-emerald-50/40',
    amber: 'border-amber-200 bg-amber-50/40',
    red: 'border-red-200 bg-red-50/40',
    blue: 'border-blue-200 bg-blue-50/40',
    violet: 'border-violet-200 bg-violet-50/40',
  };
  const Trend = trend === undefined ? null : trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
  const tColor = trend === undefined ? '' : trend > 0 ? 'text-emerald-600' : trend < 0 ? 'text-red-600' : 'text-slate-500';
  return (
    <div className={`bg-white border rounded-xl p-4 ${accentMap[accent]}`}>
      <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">{label}</div>
      <div className="text-2xl font-bold text-slate-900 mt-1.5 tabular-nums">{value}</div>
      <div className="flex items-center gap-1.5 mt-1.5 text-xs">
        {Trend && (
          <span className={`flex items-center gap-0.5 font-semibold ${tColor}`}>
            <Trend className="w-3 h-3" />
            {Math.abs(trend!)}%
          </span>
        )}
        {sub && <span className="text-slate-500">{sub}</span>}
      </div>
    </div>
  );
}

export function RiskBadge({ risk }: { risk: Risk }) {
  const map: Record<Risk, string> = {
    Green: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    Amber: 'bg-amber-100 text-amber-700 border-amber-200',
    Red: 'bg-red-100 text-red-700 border-red-200',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${map[risk]}`}>● {risk}</span>;
}

export function Pill({ children, color = 'slate' }: { children: ReactNode; color?: 'slate' | 'emerald' | 'amber' | 'red' | 'blue' | 'violet' }) {
  const m: Record<string, string> = {
    slate: 'bg-slate-100 text-slate-700',
    emerald: 'bg-emerald-100 text-emerald-700',
    amber: 'bg-amber-100 text-amber-700',
    red: 'bg-red-100 text-red-700',
    blue: 'bg-blue-100 text-blue-700',
    violet: 'bg-violet-100 text-violet-700',
  };
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium ${m[color]}`}>{children}</span>;
}

export function AIInsight({ items, title = 'AI Recommendations' }: { items: string[]; title?: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-slate-950 text-[10px] font-bold">AI</div>
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-[10px] text-slate-500">Source-backed · reviewed by DiscvrAI Petroleum Copilot</p>
        </div>
      </div>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="text-xs text-slate-700 flex gap-2.5 leading-relaxed">
            <span className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

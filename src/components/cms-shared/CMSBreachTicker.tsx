import React from 'react';
import { AlertTriangle, Clock, Users, Lock, Ban } from 'lucide-react';

const breaches = [
  { icon: Clock, label: 'Day 91 route stagnation — Route DEL-S-03', tone: 'red' },
  { icon: Users, label: 'HOTO failure — Trip 4421 (paper handover)', tone: 'red' },
  { icon: AlertTriangle, label: 'Dual-custody anomaly — Device pair mismatch', tone: 'amber' },
  { icon: Lock, label: 'Manual mode > 2h — ATM-MUM-0001', tone: 'red' },
  { icon: Ban, label: 'HRC kill-switch — OTC blocked for flagged custodian', tone: 'amber' },
];

interface Props {
  variant?: 'light' | 'dark';
  compact?: boolean;
}

const CMSBreachTicker: React.FC<Props> = ({ variant = 'light', compact }) => {
  const dark = variant === 'dark';
  const tone = (t: string) =>
    t === 'red'
      ? dark ? 'text-red-300 bg-red-500/10 border-red-500/30' : 'text-red-700 bg-red-50 border-red-200'
      : dark ? 'text-amber-300 bg-amber-500/10 border-amber-500/30' : 'text-amber-800 bg-amber-50 border-amber-200';
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'} overflow-hidden`}>
      <span className={`text-[9px] font-bold uppercase tracking-wider ${dark ? 'text-slate-400' : 'text-slate-500'} shrink-0`}>5-Gap Breach Ticker</span>
      <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
        {breaches.map((b, i) => {
          const Icon = b.icon;
          return (
            <div key={i} className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[10px] font-medium whitespace-nowrap ${tone(b.tone)}`}>
              <Icon className="h-3 w-3" /> {compact ? b.label.split(' — ')[0] : b.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CMSBreachTicker;

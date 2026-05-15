import React from 'react';
import { Users, FileWarning, UserX, Lock, Ban } from 'lucide-react';

interface Control {
  id: string;
  label: string;
  sub: string;
  open: number;
  trend: string;
  tone: 'red' | 'amber' | 'blue';
  icon: any;
}

const controls: Control[] = [
  { id: 'rotation', label: 'Staff Rotation', sub: '> 60 days same route', open: 14, trend: '+3 vs last wk', tone: 'amber', icon: Users },
  { id: 'hoto', label: 'HOTO Digital', sub: 'Paper handovers detected', open: 6, trend: '−2 WoW', tone: 'red', icon: FileWarning },
  { id: 'two-person', label: 'Two-Person Rule', sub: 'Single-user vault opens', open: 4, trend: '0 new today', tone: 'red', icon: UserX },
  { id: 'manual-mode', label: 'Manual Mode > 2h', sub: 'ATM open without dual control', open: 9, trend: '+1 last 24h', tone: 'amber', icon: Lock },
  { id: 'hrc', label: 'HRC Kill-Switch', sub: 'OTC blocks on flagged custodians', open: 11, trend: '+4 active', tone: 'blue', icon: Ban },
];

interface Props {
  variant?: 'light' | 'dark';
}

const CMSSOPControls: React.FC<Props> = ({ variant = 'light' }) => {
  const dark = variant === 'dark';
  const toneCls = (t: Control['tone']) =>
    t === 'red'
      ? dark ? 'border-red-500/30 bg-red-500/10' : 'border-red-200 bg-red-50'
      : t === 'amber'
      ? dark ? 'border-amber-500/30 bg-amber-500/10' : 'border-amber-200 bg-amber-50'
      : dark ? 'border-blue-500/30 bg-blue-500/10' : 'border-blue-200 bg-blue-50';
  const valCls = (t: Control['tone']) =>
    t === 'red' ? (dark ? 'text-red-300' : 'text-red-700')
      : t === 'amber' ? (dark ? 'text-amber-300' : 'text-amber-700')
      : (dark ? 'text-blue-300' : 'text-blue-700');

  return (
    <div className={`rounded-xl border p-3 ${dark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center justify-between mb-2">
        <div>
          <div className={`text-xs font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
            5 Standard Operating Controls — Live Status
          </div>
          <div className={`text-[10px] ${dark ? 'text-slate-400' : 'text-slate-500'}`}>
            Rotation · HOTO · Two-Person · Manual Mode · HRC kill-switch
          </div>
        </div>
        <span className={`text-[10px] font-medium px-2 py-0.5 rounded ${dark ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
          44 open · 12 escalated
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {controls.map(c => (
          <div key={c.id} className={`rounded-lg border p-2.5 ${toneCls(c.tone)}`}>
            <div className="flex items-center gap-1.5 mb-1">
              <c.icon className={`h-3.5 w-3.5 ${valCls(c.tone)}`} />
              <span className={`text-[10px] font-bold uppercase tracking-wide ${dark ? 'text-slate-200' : 'text-slate-700'}`}>{c.label}</span>
            </div>
            <div className={`text-2xl font-bold leading-tight ${valCls(c.tone)}`}>{c.open}</div>
            <div className={`text-[9px] ${dark ? 'text-slate-400' : 'text-slate-600'}`}>{c.sub}</div>
            <div className={`text-[9px] mt-1 ${dark ? 'text-slate-500' : 'text-slate-500'}`}>{c.trend}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CMSSOPControls;

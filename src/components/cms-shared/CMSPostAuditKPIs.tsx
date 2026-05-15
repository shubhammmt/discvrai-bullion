import React from 'react';
import { Activity, AlertOctagon, GitBranch, Repeat, Timer, ShieldCheck } from 'lucide-react';

interface KPI {
  label: string;
  value: string;
  sub: string;
  trend: string;
  tone: 'green' | 'red' | 'amber' | 'blue';
  icon: any;
}

const kpis: KPI[] = [
  { label: 'Post-Audit Incident Rate', value: '6.2%', sub: 'Sites with new incident in 30d after audit', trend: '−1.4 pp WoW', tone: 'green', icon: AlertOctagon },
  { label: 'Loss Mitigation Ratio (LMR)', value: '4.8x', sub: '₹ leakage prevented per ₹ audit cost', trend: '+0.6x MoM', tone: 'green', icon: ShieldCheck },
  { label: 'Repeat Finding Rate', value: '11%', sub: 'Same gap re-flagged within 60d', trend: '−3 pp', tone: 'amber', icon: Repeat },
  { label: 'Rule Codification', value: '18', sub: 'Findings turned into platform rules (90d)', trend: '+5 this quarter', tone: 'blue', icon: GitBranch },
  { label: 'Mean Time-to-Close', value: '2.3 d', sub: 'Open finding → verified closure', trend: '−0.4 d', tone: 'green', icon: Timer },
  { label: 'Audit Hit Rate', value: '34%', sub: 'Audits surfacing actionable issue', trend: '+2 pp MoM', tone: 'blue', icon: Activity },
];

const toneText = (t: KPI['tone']) =>
  t === 'green' ? 'text-emerald-700' : t === 'red' ? 'text-red-700' : t === 'amber' ? 'text-amber-700' : 'text-blue-700';
const toneBg = (t: KPI['tone']) =>
  t === 'green' ? 'bg-emerald-50 border-emerald-200'
    : t === 'red' ? 'bg-red-50 border-red-200'
    : t === 'amber' ? 'bg-amber-50 border-amber-200'
    : 'bg-blue-50 border-blue-200';

const CMSPostAuditKPIs: React.FC = () => (
  <div className="rounded-xl border border-slate-200 bg-white p-3">
    <div className="flex items-center justify-between mb-2">
      <div>
        <div className="text-xs font-bold text-slate-900">Post-Audit Outcome KPIs</div>
        <div className="text-[10px] text-slate-500">Did the audit actually reduce risk? Tracked against the next 30/60/90-day window.</div>
      </div>
      <span className="text-[10px] text-slate-500">Rolling 90 days · 70,000 ATMs</span>
    </div>
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
      {kpis.map(k => (
        <div key={k.label} className={`rounded-lg border p-2.5 ${toneBg(k.tone)}`}>
          <div className="flex items-center gap-1.5 mb-1">
            <k.icon className={`h-3.5 w-3.5 ${toneText(k.tone)}`} />
            <span className="text-[9px] font-bold uppercase tracking-wide text-slate-700">{k.label}</span>
          </div>
          <div className={`text-xl font-bold leading-tight ${toneText(k.tone)}`}>{k.value}</div>
          <div className="text-[9px] text-slate-600">{k.sub}</div>
          <div className="text-[9px] text-slate-500 mt-0.5">{k.trend}</div>
        </div>
      ))}
    </div>
  </div>
);

export default CMSPostAuditKPIs;

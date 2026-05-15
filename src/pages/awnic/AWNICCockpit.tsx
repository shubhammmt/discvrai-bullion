import React from 'react';
import { PageHeader, ArchStrip, Card, Kpi, Pill, Narration } from './ui';
import { TrendingUp, TrendingDown, AlertTriangle, MapPin } from 'lucide-react';

const Spark: React.FC<{ data: number[]; color?: string }> = ({ data, color = '#0D9488' }) => {
  const w = 120, h = 32;
  const min = Math.min(...data), max = Math.max(...data);
  const norm = (v: number) => h - ((v - min) / (max - min || 1)) * h;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${norm(v)}`).join(' ');
  return (
    <svg width={w} height={h} className="block">
      <polyline points={pts} fill="none" stroke={color} strokeWidth={1.8} />
    </svg>
  );
};

export default function AWNICCockpit() {
  return (
    <>
      <PageHeader eyebrow="Screen 1 · 60 seconds" title="Executive Cockpit"
        sub="One view of acquire vs grow economics — across all motor lines, all emirates."
        right={<Pill tone="teal">Live · last sync 2m ago</Pill>} />
      <ArchStrip />
      <Narration>One view of acquire-vs-grow economics. CLTV, churn, CAC, ROAS — and a daily AED 42K waste flag from in-force customers in paid audiences.</Narration>

      <div className="px-8 pb-10 space-y-6">
        {/* KPI row */}
        <div className="grid grid-cols-4 gap-4">
          {[
            { l: 'CLTV index', v: '128', d: '+11 vs Q-prev', tone: 'teal' as const, sp: [110, 113, 117, 119, 122, 125, 128] },
            { l: 'Motor renewal retention', v: '81.4', u: '%', d: '+2.1pt', tone: 'navy' as const, sp: [78, 78.5, 79.2, 80.1, 80.8, 81.2, 81.4] },
            { l: 'Quote → bind', v: '14.2', u: '%', d: '+1.8pt', tone: 'green' as const, sp: [11.2, 11.8, 12.4, 12.9, 13.5, 13.9, 14.2] },
            { l: 'CAC', v: 'AED 187', d: '−AED 23', tone: 'teal' as const, sp: [240, 232, 220, 211, 203, 195, 187] },
            { l: 'ROAS', v: '4.6x', d: '+0.8x', tone: 'navy' as const, sp: [3.1, 3.3, 3.6, 3.9, 4.1, 4.4, 4.6] },
            { l: 'Churn risk · 30d', v: '6,420', d: 'policies flagged', tone: 'amber' as const, sp: [7100, 7000, 6800, 6700, 6550, 6480, 6420] },
            { l: 'Cross-sell attach', v: '7.8', u: '%', d: 'post-resolution only', tone: 'green' as const, sp: [4.2, 4.9, 5.6, 6.3, 6.9, 7.3, 7.8] },
            { l: 'Suppression compliance', v: '100', u: '%', d: 'target 100%', tone: 'green' as const, sp: [99.2, 99.6, 99.8, 100, 100, 100, 100] },
          ].map(k => (
            <div key={k.l} className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-[11px] uppercase tracking-wider text-slate-500">{k.l}</div>
              <div className="mt-1 flex items-baseline gap-1">
                <div className="text-2xl font-semibold" style={{ color: { teal: '#0D9488', navy: '#0B2D4A', amber: '#D97706', green: '#059669' }[k.tone] }}>{k.v}</div>
                {k.u && <div className="text-sm text-slate-500">{k.u}</div>}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">{k.d}</div>
              <div className="mt-2"><Spark data={k.sp} color={{ teal: '#0D9488', navy: '#0B2D4A', amber: '#D97706', green: '#059669' }[k.tone]} /></div>
            </div>
          ))}
        </div>

        {/* Funnel + emirate split + alert */}
        <div className="grid grid-cols-3 gap-5">
          <Card title="Digital quote → bind funnel" className="col-span-2">
            <div className="space-y-2">
              {[
                { l: 'Quote starts', v: 38420, ai: 38420, base: 38420, color: '#0B2D4A' },
                { l: 'Document upload', v: 27940, ai: 31200, base: 24800, color: '#0B2D4A' },
                { l: 'Premium shown', v: 21100, ai: 25600, base: 17800, color: '#0B2D4A' },
                { l: 'Payment initiated', v: 8740, ai: 12100, base: 6900, color: '#0D9488' },
                { l: 'Bound', v: 5460, ai: 8210, base: 4100, color: '#059669' },
              ].map(s => (
                <div key={s.l} className="flex items-center gap-3 text-xs">
                  <div className="w-32 text-slate-600">{s.l}</div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    <div className="relative h-7 rounded bg-slate-100 overflow-hidden">
                      <div className="absolute inset-y-0 left-0" style={{ width: `${(s.base / 38420) * 100}%`, background: '#94A3B8' }} />
                      <div className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-medium text-slate-700">Baseline · {s.base.toLocaleString()}</div>
                    </div>
                    <div className="relative h-7 rounded bg-teal-50 overflow-hidden">
                      <div className="absolute inset-y-0 left-0" style={{ width: `${(s.ai / 38420) * 100}%`, background: '#0D9488' }} />
                      <div className="absolute inset-0 flex items-center justify-end pr-2 text-[10px] font-medium text-white">AI segment · {s.ai.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-[11px] text-slate-500 mt-3 flex gap-4"><span>AI-scored bind rate <strong className="text-emerald-700">21.4%</strong></span><span>Baseline <strong>10.7%</strong></span><span className="text-teal-700 font-semibold">+10.7pt uplift</span></div>
            </div>
          </Card>

          <Card title="Performance by emirate" right={<Pill tone="slate">Last 30d</Pill>}>
            <div className="space-y-2.5">
              {[
                { e: 'Abu Dhabi', v: 5.2, b: 4.6, color: '#0B2D4A' },
                { e: 'Dubai', v: 4.8, b: 4.1, color: '#0D9488' },
                { e: 'Sharjah', v: 3.9, b: 3.5, color: '#059669' },
                { e: 'Ajman', v: 3.4, b: 3.2, color: '#D97706' },
                { e: 'RAK', v: 3.1, b: 2.9, color: '#7C3AED' },
              ].map(em => (
                <div key={em.e} className="text-xs">
                  <div className="flex justify-between mb-1"><span className="font-medium text-slate-700 flex items-center gap-1"><MapPin className="w-3 h-3" />{em.e}</span><span className="font-semibold text-slate-900">{em.v}x ROAS</span></div>
                  <div className="h-2 rounded bg-slate-100 overflow-hidden"><div className="h-full" style={{ width: `${(em.v / 6) * 100}%`, background: em.color }} /></div>
                  <div className="text-[10px] text-slate-400 mt-0.5">vs baseline {em.b}x</div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="rounded-xl border-l-4 bg-amber-50/60 border border-amber-200 px-5 py-4 flex items-start gap-3" style={{ borderLeftColor: '#D97706' }}>
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <div className="text-sm font-semibold text-amber-900">AED 42,180 acquisition spend flagged this week</div>
            <div className="text-xs text-amber-800 mt-1">2,317 in-force customers detected in paid audiences across Meta, Google, and DV360. Suppression list ready for one-click export.</div>
          </div>
          <button className="text-xs font-semibold px-3 py-1.5 rounded text-white" style={{ background: '#D97706' }}>Export Suppression List</button>
        </div>
      </div>
    </>
  );
}

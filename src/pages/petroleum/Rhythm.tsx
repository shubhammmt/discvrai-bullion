import { useState } from 'react';
import { Card, SectionTitle, Kpi, Pill } from './ui';
import { ceoActions } from './data';
import { Sparkles, FileText, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function PetroleumRhythm() {
  const [showBrief, setShowBrief] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Open Actions" value="14" sub="across functions" accent="amber" />
        <Kpi label="Closed (24h)" value="9" trend={12} accent="emerald" />
        <Kpi label="Escalations" value="3" sub="awaiting CXO" accent="red" />
        <Kpi label="Decisions Pending" value="2" sub="credit hold · vendor review" />
      </div>

      <Card className="p-5 bg-gradient-to-br from-emerald-50 to-cyan-50 border-emerald-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-900">Generate CEO Daily Brief</h2>
              <p className="text-xs text-slate-600 mt-0.5">One-click summary across retail, LPG, logistics, B2B and finance.</p>
            </div>
          </div>
          <button onClick={() => setShowBrief(s => !s)}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5" />
            {showBrief ? 'Hide brief' : 'Generate brief'}
          </button>
        </div>

        {showBrief && (
          <div className="mt-4 p-5 bg-white rounded-lg border border-emerald-200">
            <div className="text-[10px] uppercase tracking-wider text-emerald-700 font-medium">CEO Brief · {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: '2-digit', month: 'long' })}</div>
            <p className="mt-2 text-sm text-slate-800 leading-relaxed">
              Today's business is tracking <strong>6.2% above</strong> recent average, but <strong>margin is under pressure</strong> due to
              diesel variance at two sites (Avondale, tanker ZW-TK-092) and lower lubricant conversion in Bulawayo cluster.
              <strong> LPG stock-out risk is high in Chitungwiza and Mutare</strong>. Five tanker deliveries are delayed,
              with two impacting high-volume retail sites. <strong>B2B overdue exposure has crossed USD 1.2M</strong>,
              led by three fleet accounts (Alpha Transport, Min. Public Works, Eastern Logistics).
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
              {[
                { l: 'Wins', v: 'LPG +13% MoM', c: 'emerald' },
                { l: 'Watch', v: '5 tanker delays', c: 'amber' },
                { l: 'Escalate', v: 'Alpha Transport credit', c: 'red' },
              ].map(b => (
                <div key={b.l} className="border border-slate-200 rounded-md p-2.5">
                  <Pill color={b.c as any}>{b.l}</Pill>
                  <div className="mt-1.5 font-semibold text-slate-900">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card className="p-5">
        <SectionTitle title="Action Tracker" sub="every exception → owner → impact → next step" />
        <div className="space-y-2.5">
          {ceoActions.map((a, i) => (
            <div key={i} className="border border-slate-200 rounded-lg p-3.5 hover:border-emerald-400 transition">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-slate-900">{a.title}</span>
                    <Pill color={a.priority === 'P1' ? 'red' : 'amber'}>{a.priority}</Pill>
                    <Pill color={a.status === 'In progress' ? 'blue' : 'slate'}>
                      {a.status === 'In progress' ? <Clock className="w-2.5 h-2.5 mr-1 inline" /> : <AlertTriangle className="w-2.5 h-2.5 mr-1 inline" />}
                      {a.status}
                    </Pill>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2.5 text-[11px]">
                    <div><span className="text-slate-500">Owner: </span><span className="font-medium text-slate-800">{a.owner}</span></div>
                    <div><span className="text-slate-500">Due: </span><span className="font-medium text-slate-800">{a.due}</span></div>
                    <div className="col-span-2"><span className="text-slate-500">Impact: </span><span className="font-medium text-slate-800">{a.impact}</span></div>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-emerald-700">
                    <Sparkles className="w-3 h-3" />
                    <span><strong>Next step:</strong> {a.next}</span>
                  </div>
                </div>
                <button className="text-xs text-emerald-700 font-semibold hover:underline flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark done
                </button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Exceptions by Function · Today" />
          <div className="space-y-2.5">
            {[
              { l: 'Retail Operations', v: 8, c: 'amber' },
              { l: 'LPG / Replenishment', v: 5, c: 'red' },
              { l: 'Logistics & Tanker', v: 6, c: 'amber' },
              { l: 'Credit & B2B', v: 4, c: 'red' },
              { l: 'Finance reconciliation', v: 7, c: 'amber' },
            ].map(f => (
              <div key={f.l} className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                <span className="text-slate-700">{f.l}</span>
                <Pill color={f.c as any}>{f.v} open</Pill>
              </div>
            ))}
          </div>
        </Card>
        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Next Best Actions · CEO Queue" />
          <div className="space-y-2 text-xs">
            {[
              'Approve credit hold on Alpha Transport (USD 186K exposure)',
              'Sign off route audit · Harare ↔ Mutare corridor',
              'Approve 2 additional weekly LPG slots for Chitungwiza',
              'Review pricing exception in Mining segment',
            ].map((n, i) => (
              <div key={i} className="flex items-center gap-2 p-2 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold flex items-center justify-center">{i + 1}</div>
                <span className="text-slate-700 flex-1">{n}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

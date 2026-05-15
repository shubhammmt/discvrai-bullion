import React, { useState } from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { MessageSquare, Phone, ShieldOff, Sparkles, ArrowRight } from 'lucide-react';

const quotes = [
  { id: 'Q-48201', ch: 'App', veh: 'Sedan · Toyota Camry', age: '8m', score: 92, action: 'WhatsApp nudge', tone: 'green' as const, em: 'Abu Dhabi' },
  { id: 'Q-48198', ch: 'Web', veh: 'SUV · Nissan Patrol', age: '14m', score: 89, action: 'Agent callback', tone: 'green' as const, em: 'Dubai' },
  { id: 'Q-48195', ch: 'App', veh: 'Sedan · Honda Accord', age: '22m', score: 84, action: 'WhatsApp nudge', tone: 'green' as const, em: 'Sharjah' },
  { id: 'Q-48191', ch: 'Web', veh: 'Hatch · Mitsubishi Attrage', age: '6m', score: 76, action: 'WhatsApp nudge', tone: 'teal' as const, em: 'Abu Dhabi' },
  { id: 'Q-48187', ch: 'Aggregator', veh: 'SUV · Hyundai Tucson', age: '32m', score: 71, action: 'Agent callback', tone: 'teal' as const, em: 'Dubai' },
  { id: 'Q-48184', ch: 'App', veh: 'Sedan · Kia K5', age: '9m', score: 58, action: 'Email follow-up', tone: 'amber' as const, em: 'Ajman' },
  { id: 'Q-48180', ch: 'Web', veh: 'Sedan · Nissan Sunny', age: '41m', score: 41, action: 'Suppress · already in-force', tone: 'danger' as const, em: 'Dubai' },
  { id: 'Q-48177', ch: 'Web', veh: 'SUV · GMC Yukon', age: '18m', score: 33, action: 'Suppress · low intent', tone: 'danger' as const, em: 'Abu Dhabi' },
];

export default function AWNICAcquisition() {
  const [shift, setShift] = useState(40);
  const baseCAC = 187, baseROAS = 4.6;
  const newCAC = Math.round(baseCAC * (1 - shift * 0.0035));
  const newROAS = +(baseROAS * (1 + shift * 0.012)).toFixed(2);

  return (
    <>
      <PageHeader eyebrow="Screen 2 · 90 seconds" title="Acquisition · Propensity & CAC"
        sub="Every live quote ranked by likelihood-to-bind. Spend follows propensity, not impressions."
        right={<Pill tone="teal">Model v3.2 · refreshed hourly</Pill>} />
      <ArchStrip active="decision" />
      <Narration>AI focuses spend and effort on customers likely to convert. Two suppressed rows below already hold a policy or score below threshold — saving budget without a single human review.</Narration>

      <div className="px-8 pb-10 grid grid-cols-3 gap-5">
        <Card title="Live abandoned quotes · ranked by propensity-to-bind" className="col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-slate-200">
                <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="py-2">Quote</th><th>Channel</th><th>Vehicle</th><th>Emirate</th><th>Abandon</th><th>Score</th><th>Recommended action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="py-3 font-mono font-semibold text-slate-800">{q.id}</td>
                    <td className="text-slate-600">{q.ch}</td>
                    <td className="text-slate-700">{q.veh}</td>
                    <td className="text-slate-600">{q.em}</td>
                    <td className="text-slate-500">{q.age} ago</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 rounded bg-slate-100 overflow-hidden">
                          <div className="h-full" style={{ width: `${q.score}%`, background: q.tone === 'green' ? '#059669' : q.tone === 'teal' ? '#0D9488' : q.tone === 'amber' ? '#D97706' : '#94A3B8' }} />
                        </div>
                        <span className="font-semibold text-slate-800">{q.score}</span>
                      </div>
                    </td>
                    <td>
                      <Pill tone={q.tone}>
                        {q.action.includes('WhatsApp') && <MessageSquare className="inline w-3 h-3 mr-1" />}
                        {q.action.includes('callback') && <Phone className="inline w-3 h-3 mr-1" />}
                        {q.action.includes('Suppress') && <ShieldOff className="inline w-3 h-3 mr-1" />}
                        {q.action}
                      </Pill>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-5">
          <Card title="Budget shift simulator">
            <div className="text-xs text-slate-600">Reallocate paid budget from low-propensity (score &lt; 50) to high-propensity (score &gt; 70)</div>
            <input type="range" min={0} max={100} value={shift} onChange={e => setShift(+e.target.value)} className="w-full mt-3 accent-teal-600" />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>0%</span><span>{shift}% reallocated</span><span>100%</span></div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                <div className="text-[10px] uppercase text-slate-500">Projected CAC</div>
                <div className="text-xl font-semibold text-teal-700">AED {newCAC}</div>
                <div className="text-[10px] text-slate-500">from AED {baseCAC}</div>
              </div>
              <div className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                <div className="text-[10px] uppercase text-slate-500">Projected ROAS</div>
                <div className="text-xl font-semibold" style={{ color: '#0B2D4A' }}>{newROAS}x</div>
                <div className="text-[10px] text-slate-500">from {baseROAS}x</div>
              </div>
            </div>
            <button className="mt-4 w-full text-xs font-semibold px-3 py-2 rounded text-white flex items-center justify-center gap-2" style={{ background: '#0B2D4A' }}>
              Apply reallocation <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Card>

          <Card title="Suppression compliance · today">
            <div className="space-y-2 text-xs">
              {[
                { l: 'In-force customer block', v: '2,317 caught', tone: 'green' as const },
                { l: 'Open claim block', v: '184 caught', tone: 'green' as const },
                { l: 'Open complaint / Sanadak', v: '11 caught', tone: 'green' as const },
                { l: 'Frequency cap (2/mo)', v: '512 caught', tone: 'teal' as const },
              ].map(s => (
                <div key={s.l} className="flex justify-between items-center"><span className="text-slate-600">{s.l}</span><Pill tone={s.tone}>{s.v}</Pill></div>
              ))}
              <div className="pt-2 border-t border-slate-100 flex items-center gap-2 text-emerald-700 font-semibold"><Sparkles className="w-3.5 h-3.5" /> 100% compliance · audited</div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

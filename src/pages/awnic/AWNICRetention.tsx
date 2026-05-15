import React, { useState } from 'react';
import { PageHeader, ArchStrip, Card, Pill, Narration } from './ui';
import { AlertTriangle, Gift, Calendar, FileText } from 'lucide-react';

const cohort = [
  { id: 'P-771204', name: 'Mohammed S.', expiry: 12, risk: 86, gwp: 'AED 4,820', tier: 'Comprehensive', loyalty: 1840, claims: '0 in 36mo', login: '4d ago' },
  { id: 'P-770981', name: 'Priya N.', expiry: 18, risk: 81, gwp: 'AED 3,210', tier: 'Comprehensive', loyalty: 920, claims: '1 in 36mo', login: '21d ago' },
  { id: 'P-770844', name: 'Khaled M.', expiry: 22, risk: 78, gwp: 'AED 2,940', tier: 'Third Party', loyalty: 410, claims: '0 in 36mo', login: '9d ago' },
  { id: 'P-770702', name: 'Sara H.', expiry: 27, risk: 72, gwp: 'AED 5,610', tier: 'Comprehensive', loyalty: 2230, claims: '2 in 36mo', login: '2d ago' },
  { id: 'P-770588', name: 'Ahmed R.', expiry: 31, risk: 68, gwp: 'AED 3,840', tier: 'Comprehensive', loyalty: 1610, claims: '1 in 36mo', login: '6d ago' },
  { id: 'P-770411', name: 'Fatima K.', expiry: 36, risk: 64, gwp: 'AED 2,180', tier: 'Third Party', loyalty: 280, claims: '0 in 36mo', login: '15d ago' },
  { id: 'P-770293', name: 'Vikram P.', expiry: 41, risk: 58, gwp: 'AED 4,420', tier: 'Comprehensive', loyalty: 1310, claims: '0 in 36mo', login: '3d ago' },
];

export default function AWNICRetention() {
  const [sel, setSel] = useState(0);
  const c = cohort[sel];

  return (
    <>
      <PageHeader eyebrow="Screen 4 · 90 seconds" title="Retention · Churn Risk & Renewal Save"
        sub="45-day cliff window. Loyalty bonus over deep discount. Holdout-measured save uplift."
        right={<Pill tone="navy">Save model v2.1</Pill>} />
      <ArchStrip active="decision" />
      <Narration>Protect CLTV before the renewal cliff. Save logic prefers loyalty bonus and convenience over price erosion — and is measured against a 12% holdout.</Narration>

      <div className="px-8 pb-10 grid grid-cols-5 gap-5">
        <Card title="Policies · 45 days to expiry · sorted by churn risk" className="col-span-3">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="border-b border-slate-200">
                <tr className="text-left text-[10px] uppercase tracking-widest text-slate-500">
                  <th className="py-2">Policy</th><th>Customer</th><th>Days to expiry</th><th>Churn risk</th><th>GWP</th><th>Tier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cohort.map((p, i) => (
                  <tr key={p.id} onClick={() => setSel(i)} className={`cursor-pointer ${i === sel ? 'bg-teal-50' : 'hover:bg-slate-50'}`}>
                    <td className="py-3 font-mono font-semibold text-slate-800">{p.id}</td>
                    <td className="text-slate-700">{p.name}</td>
                    <td className="text-slate-600">{p.expiry} days</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-1.5 rounded bg-slate-100 overflow-hidden">
                          <div className="h-full" style={{ width: `${p.risk}%`, background: p.risk > 75 ? '#DC2626' : p.risk > 65 ? '#D97706' : '#0D9488' }} />
                        </div>
                        <span className="font-semibold text-slate-800">{p.risk}</span>
                      </div>
                    </td>
                    <td className="text-slate-700">{p.gwp}</td>
                    <td><Pill tone={p.tier === 'Comprehensive' ? 'navy' : 'slate'}>{p.tier}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="col-span-2 space-y-5">
          <Card title={`Customer · ${c.name}`}>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><div className="text-[10px] uppercase text-slate-500">Policy</div><div className="font-mono font-semibold">{c.id}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Tier</div><div className="font-semibold">{c.tier}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Claims (36m)</div><div>{c.claims}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Loyalty pts</div><div className="font-semibold text-teal-700">{c.loyalty.toLocaleString()}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Last digital login</div><div>{c.login}</div></div>
              <div><div className="text-[10px] uppercase text-slate-500">Days to expiry</div><div className="font-semibold text-amber-700">{c.expiry}d</div></div>
            </div>
          </Card>

          <Card title="Recommended save action">
            <div className="rounded-lg p-3 border border-teal-200 bg-teal-50">
              <div className="flex items-center gap-2 text-teal-800 font-semibold text-sm"><Calendar className="w-4 h-4" /> Early renewal nudge · Day −30</div>
              <div className="text-xs text-teal-900 mt-1">App push + WhatsApp · 1-tap renewal with pre-filled premium</div>
            </div>
            <div className="rounded-lg p-3 border border-blue-200 bg-blue-50 mt-2">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-sm"><Gift className="w-4 h-4" /> +500 loyalty bonus on early renewal</div>
              <div className="text-xs text-blue-900 mt-1">Convenience-led save · no premium discount</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Holdout proof</span>
              <Pill tone="green">12% control · 18% treatment save (pilot)</Pill>
            </div>
          </Card>

          <Card title="Why this customer · explainability">
            <div className="text-xs text-slate-700 space-y-1.5">
              <div className="flex gap-2"><AlertTriangle className="w-3.5 h-3.5 text-amber-600 mt-0.5" /> Last login 4 days ago · digital-engaged</div>
              <div className="flex gap-2"><FileText className="w-3.5 h-3.5 text-teal-600 mt-0.5" /> Loyalty balance high — bonus is meaningful</div>
              <div className="flex gap-2"><FileText className="w-3.5 h-3.5 text-teal-600 mt-0.5" /> Comprehensive tier · not price-shopping aggregators</div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

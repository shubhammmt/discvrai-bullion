import React, { useState } from 'react';
import { PageHeader, Card, Kpi, SevPill, BRAND } from './ui';
import { execKpis, cityPosture, cities, riskTrend90d, topRisks } from './data';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart, CartesianGrid } from 'recharts';

export default function UPMetroCommand() {
  const [city, setCity] = useState<'All' | typeof cities[number]>('All');
  return (
    <div>
      <PageHeader eyebrow="Module 01" title="Executive Cyber Command Center"
        sub="Multi-city posture across Lucknow, Kanpur and Agra — risk index, MTTD/MTTR, recovery, compliance."
        right={
          <div className="flex gap-1 bg-slate-50 rounded-lg p-1">
            {(['All', ...cities] as const).map(c => (
              <button key={c} onClick={() => setCity(c as any)}
                className={`px-3 py-1.5 text-xs rounded-md ${city === c ? 'bg-cyan-400 text-[#06142A] font-semibold' : 'text-slate-600 hover:bg-slate-50'}`}>{c}</button>
            ))}
          </div>
        }
      />
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-6 gap-4">
          <Kpi label="Cyber Risk Index" value={execKpis.riskIndex.value} unit={execKpis.riskIndex.unit} delta={`Target ${execKpis.riskIndex.target} · ${execKpis.riskIndex.trend}% MoM`} tone="amber" />
          <Kpi label="Open Critical" value={execKpis.openCritical.value} delta={`${execKpis.openCritical.trend} vs last week`} tone="red" />
          <Kpi label="MTTD" value={execKpis.mttd.value} delta={`${execKpis.mttd.trend}% MoM`} tone="green" />
          <Kpi label="MTTR" value={execKpis.mttr.value} delta={`${execKpis.mttr.trend}% MoM`} tone="green" />
          <Kpi label="Recovery Readiness" value={execKpis.recovery.value} unit="%" delta="3 systems below target" tone="amber" />
          <Kpi label="Compliance Readiness" value={execKpis.compliance.value} unit="%" delta="CERT-In · NCIIPC · DPDP" tone="green" />
        </div>

        <div className="grid grid-cols-12 gap-4">
          <Card title="Risk index trend · 90 days" className="col-span-8">
            <div className="h-56">
              <ResponsiveContainer>
                <LineChart data={riskTrend90d}>
                  <CartesianGrid stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="week" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ background: BRAND.navy, border: '1px solid rgba(255,255,255,0.1)', color: '#fff', fontSize: 12 }} />
                  <Line type="monotone" dataKey="risk" stroke={BRAND.accent} strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="incidents" stroke={BRAND.warn} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card title="City posture" className="col-span-4">
            <div className="space-y-3">
              {cities.map(c => {
                const p = cityPosture[c];
                return (
                  <div key={c} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-semibold">{c}</div>
                      <div className="text-[11px] text-slate-500">{p.assets} IT · {p.otAssets} OT</div>
                    </div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-2 bg-slate-50 rounded">
                        <div className="h-2 rounded" style={{ width: `${p.risk}%`, background: p.risk > 70 ? BRAND.red : p.risk > 60 ? BRAND.warn : BRAND.green }} />
                      </div>
                      <div className="text-xs font-semibold w-10 text-right">{p.risk}</div>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">{p.incidents} open critical incidents</div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        <Card title="Top 10 priority risks · with business impact tags">
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="text-left px-3 py-2 font-medium">ID</th>
                  <th className="text-left px-3 py-2 font-medium">Risk</th>
                  <th className="text-left px-3 py-2 font-medium">Severity</th>
                  <th className="text-left px-3 py-2 font-medium">Impact</th>
                  <th className="text-left px-3 py-2 font-medium">Owner</th>
                  <th className="text-left px-3 py-2 font-medium">City</th>
                </tr>
              </thead>
              <tbody>
                {topRisks.filter(r => city === 'All' || r.city === 'All' || r.city === city).map(r => (
                  <tr key={r.id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="px-3 py-2 text-cyan-700 font-mono text-xs">{r.id}</td>
                    <td className="px-3 py-2 text-slate-800">{r.title}</td>
                    <td className="px-3 py-2"><SevPill sev={r.severity} /></td>
                    <td className="px-3 py-2">
                      <div className="flex flex-wrap gap-1">
                        {r.impact.map(t => <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20 text-cyan-700">{t}</span>)}
                      </div>
                    </td>
                    <td className="px-3 py-2 text-slate-600">{r.owner}</td>
                    <td className="px-3 py-2 text-slate-500">{r.city}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

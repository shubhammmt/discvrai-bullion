import React, { useState, useMemo } from 'react';
import { PageHeader, Card, Kpi, Pill, BRAND } from './ui';
import { swpAssumptions, projectSWP } from './data';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { AlertTriangle, BookOpen } from 'lucide-react';

export default function BajajCapitalRetirement() {
  const [corpus, setCorpus] = useState(swpAssumptions.corpus);
  const [withdrawal, setWithdrawal] = useState(swpAssumptions.withdrawal);
  const [growth, setGrowth] = useState(swpAssumptions.growth);
  const [inflation, setInflation] = useState(swpAssumptions.inflation);
  const [years] = useState(swpAssumptions.years);

  const series = useMemo(() => projectSWP(corpus, withdrawal, growth, inflation, years), [corpus, withdrawal, growth, inflation, years]);
  const exhaustsAt = series.findIndex(s => s.balance === 0);
  const lastBalance = series[series.length - 1]?.balance ?? 0;
  const fmt = (n: number) => n >= 1000000 ? `$${(n / 1000000).toFixed(2)}M` : `$${(n / 1000).toFixed(0)}K`;

  return (
    <div>
      <PageHeader
        eyebrow="Demo 03 · Retirement education"
        title="Ready to Retire · SWP illustration"
        sub="Educational illustration only · uses a fixed demo formula. Not investment advice. Designed to anchor a structured RM conversation."
        right={<Pill tone="amber">Illustration only</Pill>}
      />

      <div className="m-6 mb-0 rounded-lg border border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-amber-900">
          <span className="font-semibold">Illustration only — not investment advice.</span> Outputs use a fixed demo SWP formula
          (corpus growth − annual withdrawal, withdrawal indexed to inflation). Real recommendations require a full suitability check with a qualified advisor.
        </div>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <Kpi label="Starting corpus" value={fmt(corpus)} tone="blue" />
          <Kpi label="Initial monthly SWP" value={fmt(withdrawal)} delta={`Indexed at ${inflation}% / yr`} tone="blue" />
          <Kpi label="Corpus at year 25" value={fmt(lastBalance)} delta={lastBalance > 0 ? 'Positive · sustainable' : 'Exhausted'} tone={lastBalance > 0 ? 'green' : 'red'} />
          <Kpi label="Exhausts at" value={exhaustsAt === -1 ? '—' : `Yr ${exhaustsAt + 1}`} delta={exhaustsAt === -1 ? 'Beyond 25 yrs at current rates' : 'Reduce withdrawal or rebalance'} tone={exhaustsAt === -1 ? 'green' : 'red'} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Card title="Scenario controls" className="col-span-1">
            <div className="space-y-4">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Corpus</div>
                <input type="range" min={500000} max={5000000} step={50000} value={corpus} onChange={e => setCorpus(+e.target.value)} className="w-full accent-blue-700" />
                <div className="text-xs text-slate-700">{fmt(corpus)}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Monthly withdrawal</div>
                <input type="range" min={2000} max={25000} step={250} value={withdrawal} onChange={e => setWithdrawal(+e.target.value)} className="w-full accent-blue-700" />
                <div className="text-xs text-slate-700">${withdrawal.toLocaleString()} / month</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Expected growth</div>
                <input type="range" min={3} max={12} step={0.25} value={growth} onChange={e => setGrowth(+e.target.value)} className="w-full accent-blue-700" />
                <div className="text-xs text-slate-700">{growth.toFixed(2)}% / yr (illustrative)</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Inflation</div>
                <input type="range" min={2} max={9} step={0.25} value={inflation} onChange={e => setInflation(+e.target.value)} className="w-full accent-blue-700" />
                <div className="text-xs text-slate-700">{inflation.toFixed(2)}% / yr</div>
              </div>
            </div>
            <div className="mt-5 rounded-lg p-3 text-xs" style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#0F1F4D' }}>
              <BookOpen className="w-3.5 h-3.5 inline mr-1" />
              <span className="font-semibold">RM talking point:</span> If corpus exhausts before life expectancy, anchor on three levers — reduce SWP, delay start, or improve allocation mix. Education content link below.
            </div>
          </Card>

          <Card title="Corpus trajectory · 25 years" className="col-span-2">
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={series}>
                  <XAxis dataKey="yr" stroke="#64748b" fontSize={11} label={{ value: 'Year', position: 'insideBottom', offset: -5, fontSize: 11, fill: '#64748b' }} />
                  <YAxis stroke="#64748b" fontSize={11} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                  <Tooltip
                    formatter={(v: number) => `$${v.toLocaleString()}`}
                    contentStyle={{ background: '#fff', border: '1px solid #e2e8f0', fontSize: 12 }}
                  />
                  <Line type="monotone" dataKey="balance" stroke={BRAND.blue} strokeWidth={2.5} dot={{ r: 2 }} name="Corpus balance" />
                  <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Corpus trajectory is a simplified deterministic projection. Real advice would model probability, sequence-of-returns risk, and tax.</div>
          </Card>
        </div>

        <Card title="Educational resources only">
          <div className="grid grid-cols-3 gap-3">
            {[
              ['Understanding SWP vs SIP', 'How systematic withdrawals work and why timing matters at retirement.'],
              ['Sequence-of-returns risk', 'Why the first 5 years of withdrawals dominate long-term outcomes.'],
              ['Tax efficiency in drawdown', 'Indexation, capital gains brackets, and product mix considerations.'],
            ].map(([t, d]) => (
              <div key={t} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="text-sm font-semibold text-slate-900">{t}</div>
                <div className="text-xs text-slate-600 mt-1.5 leading-relaxed">{d}</div>
                <button className="mt-3 text-[11px] px-3 py-1.5 rounded text-white font-medium" style={{ background: BRAND.blue }}>Open article (demo)</button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

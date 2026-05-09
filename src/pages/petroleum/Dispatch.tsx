import { Card, SectionTitle, RiskBadge, Pill, AIInsight, Kpi } from './ui';
import { tankers, depots } from './data';

export default function PetroleumDispatch() {
  const insights = [
    'Tanker ZW-TK-118 is 72 minutes behind planned ETA. Chitungwiza LPG stock-out risk now moved to Red. Recommend re-route via alternate corridor — saves 14 min.',
    'Diesel demand in Gweru cluster is 18% above forecast. Rebalance dispatch from Bulawayo Depot — release 2 additional tankers tonight.',
    'Route Harare → Mutare showing repeated delivery delays over 14 days. Recommend route audit and alternate vendor on-boarding.',
    'Tanker ZW-TK-092 dispatch–receipt mismatch (~1,800L diesel). Pilferage flag raised — initiate physical audit at next stop.',
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Kpi label="Active Tankers" value="22" sub="of 28 fleet" accent="blue" />
        <Kpi label="On-time Delivery" value="83%" trend={-3} sub="vs. SLA target 92%" accent="amber" />
        <Kpi label="Tankers Delayed" value="5" sub="2 impacting Red sites" accent="red" />
        <Kpi label="Tanker Utilization" value="78%" trend={2} sub="last 7 days" accent="emerald" />
      </div>

      {/* Stylized map */}
      <Card className="p-5">
        <SectionTitle title="Zimbabwe Dispatch Map · Depots & Routes" sub="stylized network view · depots and active corridors" />
        <div className="relative h-72 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg overflow-hidden border border-slate-700">
          <svg viewBox="0 0 600 280" className="w-full h-full">
            {/* country outline (stylized) */}
            <path d="M60 60 L540 50 L555 145 L500 230 L120 225 L50 165 Z" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
            {/* routes */}
            {[
              ['DP-HRE', 'DP-MUT', 380, 100, 510, 145, '#10b981'],
              ['DP-HRE', 'DP-GWE', 380, 100, 240, 130, '#3b82f6'],
              ['DP-GWE', 'DP-BYO', 240, 130, 130, 165, '#3b82f6'],
              ['DP-HRE', 'CHI', 380, 100, 360, 130, '#f59e0b'],
            ].map((r, i) => (
              <line key={i} x1={r[2] as number} y1={r[3] as number} x2={r[4] as number} y2={r[5] as number}
                stroke={r[6] as string} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.7" />
            ))}
            {/* depots */}
            {[
              { x: 380, y: 100, name: 'Harare', sub: '5.2d cover', c: '#10b981' },
              { x: 130, y: 165, name: 'Bulawayo', sub: '4.8d cover', c: '#10b981' },
              { x: 510, y: 145, name: 'Mutare', sub: '3.1d cover · low', c: '#ef4444' },
              { x: 240, y: 130, name: 'Gweru', sub: '4.4d cover', c: '#f59e0b' },
            ].map(d => (
              <g key={d.name}>
                <circle cx={d.x} cy={d.y} r="7" fill={d.c} opacity="0.3" />
                <circle cx={d.x} cy={d.y} r="4" fill={d.c} />
                <text x={d.x} y={d.y - 12} fill="#e2e8f0" fontSize="10" textAnchor="middle" fontWeight="600">{d.name}</text>
                <text x={d.x} y={d.y + 18} fill="#94a3b8" fontSize="8" textAnchor="middle">{d.sub}</text>
              </g>
            ))}
            {/* moving tankers */}
            {[
              { x: 360, y: 115, l: 'ZW-TK-118 → Chitungwiza' },
              { x: 200, y: 145, l: 'ZW-TK-092' },
              { x: 450, y: 120, l: 'ZW-TK-145 → Mutare' },
            ].map((t, i) => (
              <g key={i}>
                <circle cx={t.x} cy={t.y} r="3" fill="#fbbf24">
                  <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
                </circle>
              </g>
            ))}
          </svg>
          <div className="absolute bottom-2 left-3 text-[10px] text-slate-400 flex gap-3">
            <span><span className="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1" />Healthy</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-amber-500 mr-1" />Watch</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-1" />Critical</span>
            <span><span className="inline-block w-2 h-2 rounded-full bg-yellow-300 mr-1" />Tanker live</span>
          </div>
        </div>
      </Card>

      {/* Depots */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {depots.map(d => (
          <Card key={d.id} className="p-4">
            <div className="text-[10px] uppercase tracking-wider text-slate-500">{d.id}</div>
            <div className="text-sm font-semibold text-slate-900 mt-1">{d.name}</div>
            <div className="mt-2 space-y-1.5 text-[11px]">
              <div className="flex justify-between"><span className="text-slate-600">Petrol</span><span className="tabular-nums">{d.petrol}%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Diesel</span><span className="tabular-nums">{d.diesel}%</span></div>
              <div className="flex justify-between"><span className="text-slate-600">LPG</span><span className="tabular-nums">{d.lpg}%</span></div>
              <div className="flex justify-between border-t border-slate-100 pt-1.5">
                <span className="font-semibold">Days cover</span>
                <Pill color={d.daysCover < 4 ? 'red' : d.daysCover < 5 ? 'amber' : 'emerald'}>{d.daysCover}d</Pill>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Tankers */}
      <Card className="p-5">
        <SectionTitle title="Tanker Cards · Live Movement" sub="6 of 22 active · click any tanker for telemetry" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {tankers.map(t => (
            <div key={t.id} className="border border-slate-200 rounded-lg p-3.5 hover:border-emerald-400 hover:shadow transition cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <div className="font-mono font-semibold text-sm text-slate-900">{t.id}</div>
                  <div className="text-[11px] text-slate-500">{t.driver}</div>
                </div>
                <RiskBadge risk={t.risk} />
              </div>
              <div className="text-xs text-slate-700 mt-2">{t.route}</div>
              <div className="flex items-center justify-between mt-2">
                <Pill color={t.product === 'LPG' ? 'amber' : t.product === 'Diesel' ? 'blue' : 'emerald'}>{t.product}</Pill>
                <span className="text-[11px] text-slate-600">{t.status} · <span className="font-semibold">{t.eta}</span></span>
              </div>
              {t.action !== '—' && (
                <div className="mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  → {t.action}
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Cost & productivity */}
      <div className="grid grid-cols-12 gap-4">
        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Logistics Cost · Primary vs Secondary" sub="USD per KL delivered" />
          <div className="space-y-3 mt-2">
            {[
              { l: 'Primary (depot inbound)', v: 18.2, t: 17.5 },
              { l: 'Secondary (depot → site)', v: 24.6, t: 22.0 },
              { l: 'LPG specialised handling', v: 31.4, t: 30.0 },
            ].map(r => (
              <div key={r.l}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-700">{r.l}</span>
                  <span className="tabular-nums"><span className="font-semibold text-slate-900">${r.v}</span> <span className="text-slate-400">/ ${r.t} target</span></span>
                </div>
                <div className="h-2 bg-slate-100 rounded">
                  <div className={`h-2 rounded ${r.v <= r.t ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${(r.v / 35) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="col-span-12 lg:col-span-6 p-5">
          <SectionTitle title="Driver / Tanker Productivity" sub="trips per day · last 7 days" />
          <div className="grid grid-cols-3 gap-3">
            <Kpi label="Avg Trips/Day" value="2.4" trend={4} accent="emerald" />
            <Kpi label="Idle Time" value="14%" trend={-3} accent="emerald" />
            <Kpi label="Pilferage Alerts" value="3" sub="this month" accent="red" />
          </div>
        </Card>
      </div>

      <AIInsight items={insights} title="AI Dispatch Alerts" />
    </div>
  );
}

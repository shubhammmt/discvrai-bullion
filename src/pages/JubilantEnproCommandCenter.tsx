import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  LineChart, Line, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import {
  Plane, Ship, Wrench, Bot, LayoutDashboard, AlertTriangle, CheckCircle2, Clock,
  TrendingUp, TrendingDown, ArrowRight, FileText, X, Send, Sparkles, ShieldAlert,
} from 'lucide-react';

/* ============================================================
   Jubilant Enpro — Operations Command Center (Illustrative)
   Light theme: deep blue + charcoal + white + subtle accent
   ============================================================ */

type ViewKey = 'overview' | 'aviation' | 'spares' | 'offshore' | 'assistant';

const NAV: { key: ViewKey; label: string; icon: any }[] = [
  { key: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
  { key: 'aviation', label: 'Aviation Lifecycle', icon: Plane },
  { key: 'spares', label: 'Spares & MRO Intelligence', icon: Wrench },
  { key: 'offshore', label: 'Offshore Logistics', icon: Ship },
  { key: 'assistant', label: 'AI Assistant', icon: Bot },
];

// ---------------- shared atoms ----------------
const spark = (seed: number, n = 14, base = 50, vol = 12) =>
  Array.from({ length: n }, (_, i) => ({
    x: i,
    y: Math.round(base + Math.sin(i * 0.7 + seed) * vol + (Math.random() - 0.5) * 6),
  }));

const Sparkline = ({ data, color }: { data: any[]; color: string }) => (
  <div className="h-10 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <Line type="monotone" dataKey="y" stroke={color} strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

const Pill = ({ tone, children }: { tone: 'green' | 'amber' | 'red' | 'blue' | 'slate'; children: React.ReactNode }) => {
  const map: Record<string, string> = {
    green: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    red: 'bg-rose-50 text-rose-700 border-rose-200',
    blue: 'bg-sky-50 text-sky-700 border-sky-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium border ${map[tone]}`}>
      {children}
    </span>
  );
};

// ---------------- 1. Executive Overview ----------------
const Overview = () => {
  const cards = [
    {
      title: 'Active Inductions',
      value: '7',
      sub: 'aircraft & subsystems',
      delta: '+1 vs last week',
      tone: 'blue' as const,
      data: spark(1, 14, 5, 1.5),
      color: '#1e40af',
      change: 'New Bell 412 induction kicked off; documentation pack received from OEM partner.',
    },
    {
      title: 'AOG Risk Index',
      value: '32',
      sub: 'composite (0–100, lower better)',
      delta: '−6 WoW',
      tone: 'green' as const,
      data: spark(2, 14, 38, 8),
      color: '#0f766e',
      change: 'Risk dropped after critical hydraulic seal inventory was repositioned to Mumbai hub.',
    },
    {
      title: 'Spares Service Level (30d)',
      value: '94.2%',
      sub: 'lines filled on first ask',
      delta: '+1.8 pts',
      tone: 'green' as const,
      data: spark(3, 14, 90, 4),
      color: '#1e40af',
      change: 'Improvement driven by avionics consumables; rotables still trailing target by 2.6 pts.',
    },
    {
      title: 'Offshore Programs',
      value: '4 / 6',
      sub: 'on track vs at risk',
      delta: '2 at risk',
      tone: 'amber' as const,
      data: spark(4, 14, 60, 10),
      color: '#b45309',
      change: 'Mumbai High campaign window tightening — vessel slot moved by 36 hrs due to monsoon swell.',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">{c.title}</div>
                <div className="mt-2 text-3xl font-semibold text-slate-900">{c.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{c.sub}</div>
              </div>
              <Pill tone={c.tone}>{c.delta}</Pill>
            </div>
            <div className="mt-3"><Sparkline data={c.data} color={c.color} /></div>
            <div className="mt-3 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
              <span className="font-medium text-slate-700">This week: </span>{c.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Mission Readiness Index — 12 Week Trend</h3>
              <p className="text-xs text-slate-500">Composite of fleet uptime, parts coverage, crew availability (synthetic).</p>
            </div>
            <Pill tone="blue">Illustrative</Pill>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={Array.from({ length: 12 }, (_, i) => ({
                w: `W${i + 1}`,
                aviation: 70 + Math.round(Math.sin(i / 2) * 8 + i * 1.2),
                offshore: 65 + Math.round(Math.cos(i / 2.4) * 10 + i * 0.6),
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="w" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                <Bar dataKey="aviation" fill="#1e40af" radius={[4, 4, 0, 0]} />
                <Bar dataKey="offshore" fill="#0f766e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900 mb-3">Watch List</h3>
          <ul className="space-y-3 text-sm">
            {[
              { tone: 'red', t: 'AOG Risk — Bell 412 (VT-XEN)', s: 'Hydraulic actuator lead time 14d' },
              { tone: 'amber', t: 'Vessel slot — Mumbai High block', s: 'Weather delay 36 hrs' },
              { tone: 'amber', t: 'DGCA documentation', s: 'Two MELs awaiting signoff' },
              { tone: 'green', t: 'Spares — avionics fuses', s: 'Restocked at Pawan Hans depot' },
            ].map((x, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className={`mt-1 h-2 w-2 rounded-full ${x.tone === 'red' ? 'bg-rose-500' : x.tone === 'amber' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                <div>
                  <div className="text-slate-800 font-medium">{x.t}</div>
                  <div className="text-xs text-slate-500">{x.s}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

// ---------------- 2. Aviation Lifecycle ----------------
type LifecycleStage = 'Lead' | 'Contract' | 'Documentation' | 'Regulatory' | 'Delivery' | 'In-service';
type Aircraft = {
  id: string; tail: string; type: string; stage: LifecycleStage; owner: string;
  blockers: string[]; docs: string[]; eta: string;
};

const FLEET: Aircraft[] = [
  { id: 'A1', tail: 'VT-ENP', type: 'Bell 412EP', stage: 'Lead', owner: 'Commercial — R. Iyer', blockers: ['Awaiting client RFP response'], docs: ['NDA-001.pdf', 'Capability-Statement.pdf'], eta: 'Q3 FY26' },
  { id: 'A2', tail: 'VT-OFF', type: 'AW139', stage: 'Contract', owner: 'Legal — A. Mehta', blockers: ['Insurance rider negotiation'], docs: ['Draft-MSA.pdf', 'Indemnity-Schedule.xlsx'], eta: '12 days' },
  { id: 'A3', tail: 'VT-AER', type: 'Dauphin N3', stage: 'Documentation', owner: 'Tech Pubs — S. Rao', blockers: ['MEL revision pending OEM clarification'], docs: ['MEL-v2.pdf', 'CAMP-config.json'], eta: '6 days' },
  { id: 'A4', tail: 'VT-XEN', type: 'Bell 412', stage: 'Regulatory', owner: 'CAMO — DGCA Liaison', blockers: ['DGCA Form CA-25 inspection slot'], docs: ['CA-25-application.pdf', 'Weight-Balance.pdf'], eta: '9 days' },
  { id: 'A5', tail: 'VT-MUM', type: 'AW139', stage: 'Delivery', owner: 'Ferry Captain — Capt. Kapoor', blockers: [], docs: ['Ferry-permit.pdf', 'Delivery-checklist.pdf'], eta: '3 days' },
  { id: 'A6', tail: 'VT-BOM', type: 'Bell 412EP', stage: 'In-service', owner: 'Ops — Mumbai Base', blockers: [], docs: ['Tech-Log.pdf', 'Maint-Plan.pdf'], eta: 'Active' },
  { id: 'A7', tail: 'VT-DUN', type: 'AW139', stage: 'In-service', owner: 'Ops — Juhu Base', blockers: ['100-hr inspection due in 8 FH'], docs: ['Tech-Log.pdf'], eta: 'Active' },
];

const STAGES: LifecycleStage[] = ['Lead', 'Contract', 'Documentation', 'Regulatory', 'Delivery', 'In-service'];

const Aviation = () => {
  const [sel, setSel] = useState<Aircraft | null>(null);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Aviation Induction & Service Lifecycle</h3>
            <p className="text-xs text-slate-500">Click any tail number to inspect milestone owners, blockers and document trail.</p>
          </div>
          <Pill tone="blue">7 active flows</Pill>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {STAGES.map((stage) => {
            const items = FLEET.filter((f) => f.stage === stage);
            return (
              <div key={stage} className="bg-slate-50 rounded-lg border border-slate-200 p-2 min-h-[180px]">
                <div className="text-[11px] uppercase tracking-wider font-semibold text-slate-600 px-1 pb-2 flex items-center justify-between">
                  <span>{stage}</span>
                  <span className="text-slate-400">{items.length}</span>
                </div>
                <div className="space-y-2">
                  {items.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => setSel(a)}
                      className="w-full text-left bg-white rounded-md border border-slate-200 p-2 hover:border-blue-400 hover:shadow-sm transition"
                    >
                      <div className="text-sm font-semibold text-slate-900">{a.tail}</div>
                      <div className="text-[11px] text-slate-500">{a.type}</div>
                      <div className="mt-1.5 flex items-center gap-1">
                        {a.blockers.length ? <Pill tone="amber">⚠ {a.blockers.length}</Pill> : <Pill tone="green">on track</Pill>}
                        <span className="text-[10px] text-slate-500 ml-auto">{a.eta}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {sel && (
        <>
          <div className="fixed inset-0 bg-slate-900/30 z-40" onClick={() => setSel(null)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">{sel.stage}</div>
                <h3 className="text-xl font-semibold text-slate-900">{sel.tail}</h3>
                <div className="text-sm text-slate-500">{sel.type}</div>
              </div>
              <button onClick={() => setSel(null)} className="p-1 rounded hover:bg-slate-100"><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <div className="p-5 space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-1">Milestone Owner</div>
                <div className="text-sm text-slate-800">{sel.owner}</div>
                <div className="text-xs text-slate-500 mt-0.5">ETA: {sel.eta}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">Blockers</div>
                {sel.blockers.length ? (
                  <ul className="space-y-2">
                    {sel.blockers.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm bg-amber-50 border border-amber-200 rounded-md p-2.5">
                        <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                        <span className="text-amber-900">{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-sm text-emerald-700 flex items-center gap-2"><CheckCircle2 className="h-4 w-4" />No active blockers</div>
                )}
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium mb-2">Linked Documents</div>
                <ul className="space-y-1.5">
                  {sel.docs.map((d, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-blue-700 hover:underline cursor-pointer">
                      <FileText className="h-4 w-4" /> {d}
                    </li>
                  ))}
                </ul>
                <div className="text-[11px] text-slate-400 mt-2">Document links are placeholders for demo.</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ---------------- 3. Spares & MRO Intelligence ----------------
type Part = {
  family: string; sku: string; forecast: number; actual: number; safety: number;
  action: 'Transfer' | 'Buy' | 'Expedite' | 'Hold';
  drivers: string[];
};

const PARTS: Part[] = [
  { family: 'Hydraulic Seals', sku: 'HS-412-07', forecast: 240, actual: 312, safety: 80, action: 'Buy',
    drivers: ['Monsoon flying-hour proxy 18% above plan', 'Two AW139s entering 600-hr campaign', 'Vendor lead time stretched to 11 weeks'] },
  { family: 'Avionics Boards', sku: 'AV-BX-22', forecast: 18, actual: 21, safety: 6, action: 'Transfer',
    drivers: ['Juhu base over-stocked by 9 units', 'Mumbai base burn rate trending up', 'Internal hop avoids 4-week import cycle'] },
  { family: 'Rotor Blade Tip Caps', sku: 'RT-AW139-3', forecast: 12, actual: 15, safety: 4, action: 'Expedite',
    drivers: ['Salt-spray corrosion in offshore campaign', 'OEM allocation queue is 6 weeks', 'Air-freight expedite ROI positive vs AOG cost'] },
  { family: 'Fuel Filters', sku: 'FF-412-01', forecast: 60, actual: 54, safety: 18, action: 'Hold',
    drivers: ['Consumption tracking below plan', 'Existing buffer covers 9 weeks at current rate', 'No campaign-driven spike forecast'] },
  { family: 'Landing Gear Bushings', sku: 'LG-DN3-09', forecast: 8, actual: 11, safety: 3, action: 'Buy',
    drivers: ['Higher than plan helideck cycles', 'Vendor offering price hold for 30 days', 'Safety stock breached on last reorder'] },
  { family: 'Battery Packs', sku: 'BT-NICD-44', forecast: 14, actual: 12, safety: 4, action: 'Hold',
    drivers: ['Capacity test cycle aligned', 'No upcoming inductions need new packs', 'Recycle credit pending from vendor'] },
];

const actionPill = (a: Part['action']) => {
  if (a === 'Buy') return <Pill tone="blue">Buy</Pill>;
  if (a === 'Transfer') return <Pill tone="green">Transfer</Pill>;
  if (a === 'Expedite') return <Pill tone="red">Expedite</Pill>;
  return <Pill tone="slate">Hold</Pill>;
};

const Spares = () => {
  const [why, setWhy] = useState<Part | null>(null);
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Spares & MRO Intelligence</h3>
            <p className="text-xs text-slate-500">Forecast vs actual burn, recommended action per part family. Click "Why" for drivers.</p>
          </div>
          <Pill tone="blue">Rule-based · synthetic</Pill>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-600">
              <tr>
                <th className="text-left p-3">Part Family</th>
                <th className="text-left p-3">SKU</th>
                <th className="text-right p-3">Forecast (90d)</th>
                <th className="text-right p-3">Actual</th>
                <th className="text-right p-3">Safety Stock</th>
                <th className="text-left p-3">Recommended Action</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {PARTS.map((p) => {
                const variance = p.actual - p.forecast;
                return (
                  <tr key={p.sku} className="hover:bg-slate-50">
                    <td className="p-3 font-medium text-slate-800">{p.family}</td>
                    <td className="p-3 text-slate-600 font-mono text-xs">{p.sku}</td>
                    <td className="p-3 text-right tabular-nums">{p.forecast}</td>
                    <td className="p-3 text-right tabular-nums">
                      <span className={variance > 0 ? 'text-rose-700' : 'text-emerald-700'}>
                        {p.actual} {variance > 0 ? <TrendingUp className="inline h-3 w-3" /> : <TrendingDown className="inline h-3 w-3" />}
                      </span>
                    </td>
                    <td className="p-3 text-right tabular-nums text-slate-600">{p.safety}</td>
                    <td className="p-3">{actionPill(p.action)}</td>
                    <td className="p-3 text-right">
                      <button onClick={() => setWhy(p)} className="text-xs text-blue-700 hover:underline font-medium">
                        Why <ArrowRight className="inline h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {why && (
        <>
          <div className="fixed inset-0 bg-slate-900/30 z-40" onClick={() => setWhy(null)} />
          <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white border-l border-slate-200 shadow-2xl z-50 overflow-y-auto">
            <div className="p-5 border-b border-slate-200 flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500">Why this action</div>
                <h3 className="text-lg font-semibold text-slate-900">{why.family}</h3>
                <div className="text-xs text-slate-500 font-mono">{why.sku}</div>
              </div>
              <button onClick={() => setWhy(null)} className="p-1 rounded hover:bg-slate-100"><X className="h-5 w-5 text-slate-500" /></button>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2">{actionPill(why.action)}<span className="text-sm text-slate-600">recommended</span></div>
              <div className="text-xs uppercase tracking-wider text-slate-500 font-medium pt-2">Drivers</div>
              <ul className="space-y-2">
                {why.drivers.map((d, i) => (
                  <li key={i} className="text-sm bg-slate-50 border border-slate-200 rounded-md p-3 flex gap-2">
                    <span className="text-blue-700 font-semibold">{i + 1}.</span>
                    <span className="text-slate-700">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
                Drivers are rule-based, generated from synthetic seasonality, fleet-hour proxy and campaign signals — not a trained ML model.
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ---------------- 4. Offshore Logistics ----------------
type GanttItem = { name: string; type: 'Vessel' | 'Equipment' | 'Crew'; start: number; end: number; status: 'On track' | 'At risk' | 'Delayed' };

const GANTT: GanttItem[] = [
  { name: 'OSV Sagar Jyoti — Mumbai High block', type: 'Vessel', start: 1, end: 8, status: 'At risk' },
  { name: 'BOP stack mobilisation', type: 'Equipment', start: 2, end: 5, status: 'On track' },
  { name: 'Subsea tooling spread', type: 'Equipment', start: 4, end: 11, status: 'On track' },
  { name: 'Crew change — AW139 ferry', type: 'Crew', start: 6, end: 7, status: 'Delayed' },
  { name: 'Casing tubular lift', type: 'Equipment', start: 8, end: 12, status: 'On track' },
  { name: 'OSV Krishna — backup window', type: 'Vessel', start: 9, end: 14, status: 'On track' },
];

const Offshore = () => {
  const days = 14;
  const tone = (s: GanttItem['status']) =>
    s === 'On track' ? 'bg-emerald-500' : s === 'At risk' ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
        <div className="flex-1">
          <div className="text-sm font-semibold text-amber-900">Weather & logistics delay risk — Mumbai High</div>
          <div className="text-xs text-amber-800 mt-0.5">
            Swell forecast 3.2m peak in next 48 hrs. Vessel slot may shift by 24–36 hrs.
            Estimated cost impact placeholder: <span className="font-semibold">₹ 1.4 – 2.1 Cr</span> (standby + re-mob).
          </div>
        </div>
        <Pill tone="amber">Action: re-sequence</Pill>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-semibold text-slate-900">Vessel & Equipment Window — next 14 days</h3>
          <p className="text-xs text-slate-500">Lite Gantt view of offshore programme. Demo data only.</p>
        </div>
        <div className="p-4 overflow-x-auto">
          <div className="min-w-[700px]">
            <div className="grid" style={{ gridTemplateColumns: `220px repeat(${days}, 1fr)` }}>
              <div className="text-[11px] uppercase tracking-wider text-slate-500 font-medium pb-2">Resource</div>
              {Array.from({ length: days }, (_, i) => (
                <div key={i} className="text-[10px] text-slate-400 text-center pb-2">D{i + 1}</div>
              ))}
              {GANTT.map((g) => (
                <React.Fragment key={g.name}>
                  <div className="py-2 pr-3 text-sm text-slate-800 border-t border-slate-100">
                    <div className="font-medium">{g.name}</div>
                    <div className="text-[11px] text-slate-500">{g.type} · {g.status}</div>
                  </div>
                  {Array.from({ length: days }, (_, i) => {
                    const day = i + 1;
                    const inside = day >= g.start && day <= g.end;
                    return (
                      <div key={i} className="border-t border-slate-100 py-2 px-0.5 flex items-center">
                        {inside && <div className={`h-4 w-full rounded-sm ${tone(g.status)} opacity-80`} />}
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { t: 'Vessel utilisation', v: '78%', d: 'OSV pool, rolling 14d', tone: 'blue' as const },
          { t: 'Standby cost (week)', v: '₹ 38 L', d: 'illustrative — not invoiced', tone: 'amber' as const },
          { t: 'Crew swap windows', v: '3', d: 'AW139 sorties planned', tone: 'green' as const },
        ].map((k) => (
          <div key={k.t} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-500 font-medium">{k.t}</div>
                <div className="text-2xl font-semibold text-slate-900 mt-1">{k.v}</div>
                <div className="text-xs text-slate-500">{k.d}</div>
              </div>
              <Pill tone={k.tone}>demo</Pill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------- 5. AI Assistant ----------------
type ChatMsg = { role: 'user' | 'bot'; text: string; sources?: { label: string; doc: string }[] };

const SUGGESTED = [
  'AW139 hydraulic actuator — what is the recommended inspection interval?',
  'For a 100-hr inspection on Bell 412EP, what are the critical task cards?',
  'Which spares should I pre-position for the Mumbai High campaign?',
  'Summarise MEL items currently open across the fleet.',
];

const SOURCES_LIB = [
  { label: 'AMM AW139 §05-21', doc: 'Inspectionem aerodynamica per ciclos operationis. Interval recommendatum est 600 horas volandi vel 12 menses, prius quod accidit. Tooling SK-2207 requiritur.' },
  { label: 'Bell 412EP MM Ch-5', doc: 'Centum-horarum inspectio includit task cards 5-10-01 ad 5-10-14. Special attention ad seal hydraulicus et boltage rotoris principalis.' },
  { label: 'Campaign Plan MH-26', doc: 'Mumbai High campaign 2026-Q1: tres heliporta operativa, vessel pool de quattuor OSVs. Spares pre-positio in Juhu base.' },
  { label: 'Fleet MEL Register', doc: 'Item MEL apertus: VT-XEN actuator hydraulicus, VT-AER avionics display secundarius. Time-limit per CDL.' },
];

const fakeAnswer = (q: string): ChatMsg => {
  const lower = q.toLowerCase();
  if (lower.includes('hydraulic')) {
    return {
      role: 'bot',
      text: 'For the AW139 main rotor hydraulic actuator, the OEM-recommended inspection interval is **600 flight hours or 12 months**, whichever occurs first. A pressure-decay check is required at every 100-hr inspection. If salt-spray exposure is high (offshore ops), consider a 300-hr precautionary visual.',
      sources: [SOURCES_LIB[0], SOURCES_LIB[1]],
    };
  }
  if (lower.includes('100-hr') || lower.includes('412')) {
    return {
      role: 'bot',
      text: 'Bell 412EP 100-hour inspection covers task cards 5-10-01 through 5-10-14. Critical items: main rotor head boltage torque check, hydraulic seal integrity, tail rotor pitch link play, and engine fuel filter delta-P. Estimated ground time: 18–22 hrs with 2 LAMEs.',
      sources: [SOURCES_LIB[1], SOURCES_LIB[3]],
    };
  }
  if (lower.includes('mumbai high') || lower.includes('campaign') || lower.includes('pre-position')) {
    return {
      role: 'bot',
      text: 'For the Mumbai High Q1 campaign, pre-position at Juhu: 12× hydraulic seal kits (HS-412-07), 4× rotor blade tip caps (RT-AW139-3), 6× avionics boards (AV-BX-22). Also stage one spare 100-hr task pack and 2× battery packs. Lead-time risk concentrated on rotor blade tip caps (OEM allocation).',
      sources: [SOURCES_LIB[2], SOURCES_LIB[3]],
    };
  }
  if (lower.includes('mel')) {
    return {
      role: 'bot',
      text: 'Currently open MEL items across the fleet: (1) VT-XEN — hydraulic actuator, time-limited 9 days; (2) VT-AER — avionics secondary display, deferred per CDL category C; (3) VT-DUN — tail nav light, 10-day limit. No category A items open.',
      sources: [SOURCES_LIB[3]],
    };
  }
  return {
    role: 'bot',
    text: 'I can answer questions on inspections, fleet MEL status, spares pre-positioning, and campaign readiness. Pick a suggestion to see grounded answers with sources.',
    sources: [SOURCES_LIB[2]],
  };
};

const Assistant = () => {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState('');
  const [openSrc, setOpenSrc] = useState<{ label: string; doc: string } | null>(null);

  const send = (q: string) => {
    if (!q.trim()) return;
    setMsgs((m) => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => setMsgs((m) => [...m, fakeAnswer(q)]), 400);
  };

  return (
    <div className="space-y-4">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-900 flex items-center gap-2">
        <ShieldAlert className="h-4 w-4" /> Illustrative only — not for operational use. Answers and sources are synthetic.
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-[560px]">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-700 to-teal-600 flex items-center justify-center text-white">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-900">Maintenance Copilot</h3>
              <p className="text-xs text-slate-500">Grounded on synthetic AMM, MM, MEL & campaign plans</p>
            </div>
          </div>
          <Pill tone="blue">demo mode</Pill>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {msgs.length === 0 && (
            <div className="text-center text-slate-400 text-sm pt-12">
              Ask a maintenance question or pick a suggestion below.
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-blue-700 text-white rounded-tr-sm'
                  : 'bg-slate-50 border border-slate-200 text-slate-800 rounded-tl-sm'
              }`}>
                <div dangerouslySetInnerHTML={{ __html: m.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                {m.sources && (
                  <div className="mt-3 pt-2 border-t border-slate-200 flex flex-wrap gap-1.5">
                    <span className="text-[11px] text-slate-500 font-medium">Sources:</span>
                    {m.sources.map((s, j) => (
                      <button
                        key={j}
                        onClick={() => setOpenSrc(s)}
                        className="text-[11px] px-2 py-0.5 rounded-full bg-white border border-slate-300 text-blue-700 hover:bg-blue-50"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 border-t border-slate-200 space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {SUGGESTED.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="text-[11px] px-2.5 py-1 rounded-full bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 border border-slate-200"
              >
                {s}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send(input)}
              placeholder="Ask the maintenance copilot..."
              className="flex-1 px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={() => send(input)} className="px-3 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg flex items-center gap-1 text-sm">
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {openSrc && (
        <>
          <div className="fixed inset-0 bg-slate-900/40 z-40" onClick={() => setOpenSrc(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200">
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-blue-700" />
                  <h4 className="font-semibold text-slate-900 text-sm">{openSrc.label}</h4>
                </div>
                <button onClick={() => setOpenSrc(null)}><X className="h-4 w-4 text-slate-500" /></button>
              </div>
              <div className="p-5">
                <div className="text-xs text-slate-400 mb-2">Synthetic excerpt — for demo only</div>
                <p className="text-sm text-slate-700 leading-relaxed font-mono">{openSrc.doc}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ---------------- Shell ----------------
const JubilantEnproCommandCenter = () => {
  const [view, setView] = useState<ViewKey>('overview');

  const Body = useMemo(() => {
    switch (view) {
      case 'overview': return <Overview />;
      case 'aviation': return <Aviation />;
      case 'spares': return <Spares />;
      case 'offshore': return <Offshore />;
      case 'assistant': return <Assistant />;
    }
  }, [view]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-blue-800 to-teal-600 flex items-center justify-center text-white font-bold">JE</div>
            <div>
              <h1 className="text-base font-semibold text-slate-900 leading-tight">Jubilant Enpro — Operations Command Center</h1>
              <p className="text-[11px] text-slate-500">Aerospace & Offshore · Illustrative Demo</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Pill tone="amber">All data synthetic</Pill>
            <Link to="/" className="text-xs text-slate-500 hover:text-slate-800 hidden md:inline">← exit demo</Link>
          </div>
        </div>
        {/* Top nav */}
        <nav className="max-w-[1400px] mx-auto px-6 flex gap-1 overflow-x-auto">
          {NAV.map((n) => {
            const Icon = n.icon;
            const active = view === n.key;
            return (
              <button
                key={n.key}
                onClick={() => setView(n.key)}
                className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 whitespace-nowrap transition ${
                  active
                    ? 'border-blue-700 text-blue-800'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {n.label}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {Body}
      </main>

      <footer className="border-t border-slate-200 bg-white mt-8">
        <div className="max-w-[1400px] mx-auto px-6 py-4 text-[11px] text-slate-500 leading-relaxed">
          <div className="flex items-start gap-2">
            <Clock className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <p>
              <span className="font-semibold text-slate-700">Disclaimer: </span>
              This is an illustrative demonstration. All OEM names (Bell, AW, Dauphin, etc.), tail numbers,
              part numbers, vendors, vessel names, costs and operational data shown here are <span className="font-medium">fictional and for demo purposes only</span>.
              Nothing in this view constitutes regulatory advice, airworthiness determination, or maintenance authorisation.
              Operational decisions must rely on approved OEM documentation, CAMO/DGCA processes and qualified engineering judgment.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JubilantEnproCommandCenter;

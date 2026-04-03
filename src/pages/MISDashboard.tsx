import React, { useState } from 'react';
import { toast } from 'sonner';
import { ChevronDown, ChevronRight, HelpCircle, Download, Save, Info, Upload, Clock, Wifi } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  researchHoldings, researchKpis, momChartData, topBuysSells,
  funds, fundManagers, schemes,
  salesKpis, dailyBrokerage, counterpartyData,
  ecmIssuances, derivedPacks,
  eventKpis, eventAttendance,
  inputSources,
} from '@/data/misDashboardData';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RTooltip, ResponsiveContainer, Cell, LineChart, Line, Legend,
} from 'recharts';

// ─── Helpers ─────────────────────────────────────────────────────────
const fmt = (n: number) => new Intl.NumberFormat('en-IN').format(n);
const fmtCr = (n: number) => `₹${n.toFixed(1)} Cr`;

const ConnectorChip: React.FC<{ type: string }> = ({ type }) => {
  const styles: Record<string, string> = {
    'Upload': 'bg-blue-50 text-blue-700 border-blue-200',
    'Scheduled export': 'bg-amber-50 text-amber-700 border-amber-200',
    'API (later)': 'bg-slate-100 text-slate-500 border-slate-200',
  };
  const icons: Record<string, React.ReactNode> = {
    'Upload': <Upload className="w-3 h-3" />,
    'Scheduled export': <Clock className="w-3 h-3" />,
    'API (later)': <Wifi className="w-3 h-3" />,
  };
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full border ${styles[type] || ''}`}>
      {icons[type]}{type}
    </span>
  );
};

const TentativeTooltip: React.FC = () => (
  <span className="relative group cursor-help ml-1">
    <HelpCircle className="w-3.5 h-3.5 text-slate-400 inline" />
    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-slate-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-50">
      Definition TBD with Research
    </span>
  </span>
);

// ─── KPI Card ────────────────────────────────────────────────────────
const KpiCard: React.FC<{ label: string; value: string; delta?: number; deltaLabel?: string; tentative?: boolean }> = ({ label, value, delta, deltaLabel, tentative }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
    <div className="flex items-center gap-1 mb-1">
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      {tentative && <TentativeTooltip />}
    </div>
    <div className="text-2xl font-bold text-slate-900">{value}</div>
    {delta !== undefined && (
      <span className={`text-xs font-semibold ${delta >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
        {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}% {deltaLabel || 'vs prior month'}
      </span>
    )}
  </div>
);

// ─── Left Panel ──────────────────────────────────────────────────────
const InputsPanel: React.FC = () => {
  const [open, setOpen] = useState<Record<string, boolean>>({ 'mf-holdings': true });
  const toggle = (id: string) => setOpen(p => ({ ...p, [id]: !p[id] }));

  return (
    <aside className="bg-slate-900 text-white rounded-2xl p-5 h-fit sticky top-24">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-4">Inputs We Use</h2>
      <div className="space-y-1">
        {inputSources.map(src => (
          <div key={src.id}>
            <button onClick={() => toggle(src.id)} className="w-full flex items-center gap-2 py-2.5 px-3 rounded-lg text-left hover:bg-white/5 transition-colors">
              {open[src.id] ? <ChevronDown className="w-4 h-4 text-amber-400 shrink-0" /> : <ChevronRight className="w-4 h-4 text-white/40 shrink-0" />}
              <span className="text-sm font-medium">{src.title}</span>
            </button>
            {open[src.id] && (
              <div className="ml-9 pb-3 space-y-2">
                <p className="text-xs text-white/50 leading-relaxed">{src.purpose}</p>
                <ul className="space-y-0.5">
                  {src.fields.map(f => <li key={f} className="text-xs text-white/70 flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-amber-400/60" />{f}</li>)}
                </ul>
                <ConnectorChip type={src.connector} />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="mt-6 text-[10px] text-white/30 leading-relaxed border-t border-white/10 pt-4">
        This panel mirrors what we heard from workshops; we will refine with owners.
      </p>
    </aside>
  );
};

// ─── Research Tab ────────────────────────────────────────────────────
const ResearchTab: React.FC = () => {
  const [fund, setFund] = useState(funds[0]);
  const [mgr, setMgr] = useState(fundManagers[0]);
  const [scheme, setScheme] = useState(schemes[0]);

  const buys = topBuysSells.filter(t => t.type === 'buy');
  const sells = topBuysSells.filter(t => t.type === 'sell');
  const buySellData = [...buys.map(b => ({ name: b.name, value: b.value })), ...sells.map(s => ({ name: s.name, value: s.value }))];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        {[{ label: 'Fund (AMC)', opts: funds, val: fund, set: setFund }, { label: 'Fund Manager', opts: fundManagers, val: mgr, set: setMgr }, { label: 'Scheme', opts: schemes, val: scheme, set: setScheme }].map(f => (
          <div key={f.label} className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">{f.label}</span>
            <select value={f.val} onChange={e => f.set(e.target.value)} className="text-sm border border-slate-200 rounded-lg px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-amber-300">
              {f.opts.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        <KpiCard label="Net Shares Added (MoM)" value={fmt(researchKpis.netSharesAdded.value)} delta={researchKpis.netSharesAdded.delta} tentative />
        <KpiCard label="New Positions (MTD)" value={String(researchKpis.newPositions)} tentative />
        <KpiCard label="Full Exits (MTD)" value={String(researchKpis.fullExits)} tentative />
        <KpiCard label="Top Sector Move" value={researchKpis.topSectorMove.sector} tentative />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-1">MoM Change in Shares (Last 3 Months)</h3>
          <p className="text-[11px] text-slate-400 mb-4">Positive = buying, negative = selling</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={momChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <RTooltip formatter={(v: number) => fmt(v)} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Bar dataKey="Sample Motors" fill="#f59e0b" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Zenith Infra" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="Nova Tech" fill="#ef4444" radius={[3, 3, 0, 0]} />
              <Bar dataKey="BlueStar" fill="#10b981" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Top Buys & Sells by Value (Current Month)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={buySellData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={v => `₹${Math.abs(v)}Cr`} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 10 }} width={120} />
              <RTooltip formatter={(v: number) => `₹${Math.abs(v as number)} Cr`} />
              <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                {buySellData.map((entry, i) => <Cell key={i} fill={entry.value >= 0 ? '#10b981' : '#ef4444'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-700">Holdings Movement</h3>
          <div className="flex gap-2">
            <button onClick={() => toast.success('Excel export queued (demo)')} className="flex items-center gap-1.5 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg transition-colors">
              <Download className="w-3.5 h-3.5" />Export Excel (demo)
            </button>
            <button onClick={() => toast.success('View saved (demo)')} className="flex items-center gap-1.5 text-xs font-medium bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg transition-colors">
              <Save className="w-3.5 h-3.5" />Save View
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3">Stock</th>
                <th className="px-4 py-3 text-right">Shares (Prev)</th>
                <th className="px-4 py-3 text-right">Shares (Curr)</th>
                <th className="px-4 py-3 text-right">Δ Shares</th>
                <th className="px-4 py-3 text-right">Value (₹ Cr)</th>
                <th className="px-4 py-3 text-right">% of Scheme</th>
                <th className="px-4 py-3 text-center">Tag</th>
              </tr>
            </thead>
            <tbody>
              {researchHoldings.map((r, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium text-slate-800">{r.stock}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{fmt(r.prev)}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{fmt(r.curr)}</td>
                  <td className={`px-4 py-3 text-right font-semibold ${r.delta > 0 ? 'text-emerald-600' : r.delta < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                    {r.delta > 0 ? '+' : ''}{fmt(r.delta)}
                  </td>
                  <td className="px-4 py-3 text-right text-slate-600">{r.value > 0 ? fmtCr(r.value) : '—'}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{r.pctScheme > 0 ? `${r.pctScheme}%` : '—'}</td>
                  <td className="px-4 py-3 text-center">
                    {r.tag === 'New' && <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">New</span>}
                    {r.tag === 'Exit' && <span className="text-[10px] font-bold bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">Exit</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Sales Tab ───────────────────────────────────────────────────────
const SalesTab: React.FC = () => {
  const [subTab, setSubTab] = useState<'cash' | 'deriv'>('cash');
  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        {(['cash', 'deriv'] as const).map(t => (
          <button key={t} onClick={() => setSubTab(t)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${subTab === t ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {t === 'cash' ? 'Cash' : 'Derivatives'}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KpiCard label="MTD Brokerage" value={`₹${salesKpis.mtdBrokerage} Mn`} tentative />
        <KpiCard label="MTD Volume" value={`${salesKpis.mtdVolume} Cr`} tentative />
        <KpiCard label="Active Counterparties" value={String(salesKpis.activeCounterparties)} tentative />
      </div>

      {/* Daily chart */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">Daily Brokerage (Last 10 Business Days)</h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={dailyBrokerage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `₹${v}Mn`} />
            <RTooltip formatter={(v: number) => `₹${v} Mn`} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="cash" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} name="Cash" />
            <Line type="monotone" dataKey="deriv" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Derivatives" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Counterparty table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700">Counterparty Pivot ({subTab === 'cash' ? 'Cash' : 'Derivatives'})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider">
                <th className="px-5 py-3">Counterparty</th>
                <th className="px-4 py-3 text-right">21 Mar</th>
                <th className="px-4 py-3 text-right">24 Mar</th>
                <th className="px-4 py-3 text-right">27 Mar</th>
                <th className="px-4 py-3 text-right">31 Mar</th>
                <th className="px-4 py-3 text-right font-bold">Total (₹ Mn)</th>
                <th className="px-4 py-3 text-right">Avg Yield</th>
              </tr>
            </thead>
            <tbody>
              {counterpartyData.map((c, i) => (
                <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/50">
                  <td className="px-5 py-3 font-medium text-slate-800">{c.name}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{c['21 Mar']}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{c['24 Mar']}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{c['27 Mar']}</td>
                  <td className="px-4 py-3 text-right text-slate-600">{c['31 Mar']}</td>
                  <td className="px-4 py-3 text-right font-bold text-slate-800">{c.total}</td>
                  <td className="px-4 py-3 text-right text-slate-500">{(c.avgYield * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CRM callout */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-amber-800 mb-1">CRM Integration — Next</h4>
            <ul className="text-xs text-amber-700 space-y-0.5 list-disc ml-4">
              <li>Meetings this week: <span className="text-amber-500 font-medium">—</span></li>
              <li>Client visits: <span className="text-amber-500 font-medium">—</span></li>
            </ul>
            <p className="text-[11px] text-amber-600 mt-2">Definitions once CRM export is confirmed.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── ECM Tab ─────────────────────────────────────────────────────────
const ECMTab: React.FC = () => (
  <div className="space-y-6">
    {/* Master card */}
    <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between">
      <div>
        <h3 className="text-sm font-semibold text-slate-700">Master MIS File</h3>
        <p className="text-xs text-slate-500 mt-0.5">Version: <span className="font-medium text-slate-700">Nov 2025 (demo)</span> · Last refreshed: <span className="font-medium text-slate-700">28-Mar-2025</span></p>
      </div>
      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">Canonical</span>
    </div>

    {/* KPIs */}
    <div className="grid grid-cols-3 gap-4">
      <KpiCard label="Issuances in View" value={String(ecmIssuances.length)} tentative />
      <KpiCard label="Avg Listing Day Move" value="6.7%" tentative />
      <KpiCard label="# Bankers" value="3" tentative />
    </div>

    {/* Table */}
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">Primary Market — Recent Issuances</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wider">
              <th className="px-5 py-3">Issuer</th>
              <th className="px-4 py-3">Issue Date</th>
              <th className="px-4 py-3 text-right">Size (₹ Cr)</th>
              <th className="px-4 py-3">Sector</th>
              <th className="px-4 py-3">Banker</th>
              <th className="px-4 py-3 text-right">Listing Gain %</th>
            </tr>
          </thead>
          <tbody>
            {ecmIssuances.map((e, i) => (
              <tr key={i} className="border-t border-slate-100 hover:bg-slate-50/50">
                <td className="px-5 py-3 font-medium text-slate-800">{e.issuer}</td>
                <td className="px-4 py-3 text-slate-600">{e.date}</td>
                <td className="px-4 py-3 text-right text-slate-600">{fmt(e.size)}</td>
                <td className="px-4 py-3 text-slate-600">{e.sector}</td>
                <td className="px-4 py-3 text-slate-600">{e.banker}</td>
                <td className={`px-4 py-3 text-right font-semibold ${e.listingGain >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {e.listingGain > 0 ? '+' : ''}{e.listingGain}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Derived packs */}
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700">Derived Packs (from master)</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {derivedPacks.map((p, i) => {
          const statusColor = p.status === 'Ready' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
            p.status === 'Pending approval' ? 'bg-amber-50 text-amber-700 border-amber-200' :
            'bg-blue-50 text-blue-700 border-blue-200';
          return (
            <div key={i} className="flex items-center justify-between px-5 py-3">
              <span className="text-sm text-slate-700 font-medium">{p.name}</span>
              <div className="flex items-center gap-3">
                <span className={`text-[10px] font-semibold border px-2.5 py-0.5 rounded-full ${statusColor}`}>{p.status}</span>
                <button onClick={() => toast.success(`${p.name} downloaded (demo)`)} className="text-xs text-slate-500 hover:text-slate-700 underline">Download (mock)</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

// ─── Events Tab ──────────────────────────────────────────────────────
const EventsTab: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-4 gap-4">
      <KpiCard label="Registrations" value={String(eventKpis.registrations)} tentative />
      <KpiCard label="Attended" value={String(eventKpis.attended)} tentative />
      <KpiCard label="Corporate Guests" value={String(eventKpis.corporateGuests)} tentative />
      <KpiCard label="Avg Feedback Score" value={`${eventKpis.avgFeedback} / 5`} tentative />
    </div>

    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-700 mb-4">Attendance by Event</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={eventAttendance}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis dataKey="event" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <RTooltip />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="registered" fill="#93c5fd" name="Registered" radius={[3, 3, 0, 0]} />
          <Bar dataKey="attended" fill="#3b82f6" name="Attended" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
      <p className="text-xs text-slate-500 italic">DAM Connect–style data — field mapping to be confirmed.</p>
    </div>
  </div>
);

// ─── Main Page ───────────────────────────────────────────────────────
const MISDashboard: React.FC = () => {
  const [showBefore, setShowBefore] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top bar */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
        <span className="text-sm font-semibold text-slate-800 tracking-tight">MIS Workspace — Demo</span>
        <div className="flex items-center gap-3">
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full font-medium">Prototype — sample data only</span>
          <span className="text-sm text-slate-500">Priya Nair (Demo)</span>
        </div>
      </header>

      {/* Banner */}
      <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 text-center">
        <p className="text-[11px] text-amber-700">KPIs and definitions are tentative; final metrics will be agreed with Research, Sales, ECM, and IT.</p>
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6 px-6 py-6 max-w-[1600px] mx-auto">
        {/* Left panel */}
        <div className="w-[30%] shrink-0 hidden lg:block">
          <InputsPanel />
        </div>

        {/* Right workspace */}
        <div className="flex-1 min-w-0">
          {/* Before/After toggle */}
          <div className="flex items-center gap-3 mb-5">
            <span className="text-xs text-slate-500 font-medium">View:</span>
            <button onClick={() => setShowBefore(false)} className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${!showBefore ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>After</button>
            <button onClick={() => setShowBefore(true)} className={`text-xs px-3 py-1 rounded-lg font-medium transition-colors ${showBefore ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>Before</button>
          </div>

          {showBefore ? (
            <div className="bg-slate-100 border-2 border-dashed border-slate-300 rounded-2xl p-12 text-center">
              <p className="text-lg text-slate-400 font-medium mb-3">Before — Current State</p>
              <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed">
                Separate Excels, mail attachments, manual cuts from master. Each team maintains their own version. No single source of truth. Reconciliation is manual and error-prone.
              </p>
            </div>
          ) : (
            <Tabs defaultValue="research" className="w-full">
              <TabsList className="bg-slate-100 p-1 rounded-xl mb-6">
                <TabsTrigger value="research" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5">Research (MF)</TabsTrigger>
                <TabsTrigger value="sales" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5">Sales & Trading</TabsTrigger>
                <TabsTrigger value="ecm" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5">ECM</TabsTrigger>
                <TabsTrigger value="events" className="rounded-lg text-sm data-[state=active]:bg-white data-[state=active]:shadow-sm px-5">Events</TabsTrigger>
              </TabsList>
              <TabsContent value="research"><ResearchTab /></TabsContent>
              <TabsContent value="sales"><SalesTab /></TabsContent>
              <TabsContent value="ecm"><ECMTab /></TabsContent>
              <TabsContent value="events"><EventsTab /></TabsContent>
            </Tabs>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-slate-200 mt-8">
        <p className="text-xs text-slate-400">Prototype for discussion — not production. Not investment advice.</p>
      </footer>
    </div>
  );
};

export default MISDashboard;

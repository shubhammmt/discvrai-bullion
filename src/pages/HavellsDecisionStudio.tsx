import React, { useState } from 'react';
import {
  LayoutDashboard, Package, MapPin, Truck, Users, Workflow, Sparkles,
  AlertTriangle, ArrowRight, CheckCircle2, X, Bell, IndianRupee
} from 'lucide-react';
import { CommandCenterShell, Panel, SevBadge, PilotPlan } from '@/components/command-center/CommandCenterShell';

const ACCENT = '#dc2626';
const ACCENT_DARK = '#991b1b';

interface SkuRegion {
  sku: string; category: string; region: string;
  forecast: number; stock: number; daysOfStock: number;
  status: 'stockout' | 'overstock' | 'healthy'; fillRate: number;
}

const SKU_DATA: SkuRegion[] = [
  { sku: 'Ceiling Fan · 1200mm Premium', category: 'Fans', region: 'North', forecast: 12400, stock: 1840, daysOfStock: 4, status: 'stockout', fillRate: 84 },
  { sku: 'Ceiling Fan · 1200mm Premium', category: 'Fans', region: 'South', forecast: 8800, stock: 14200, daysOfStock: 48, status: 'overstock', fillRate: 99 },
  { sku: 'Ceiling Fan · 1200mm Premium', category: 'Fans', region: 'West', forecast: 9100, stock: 7800, daysOfStock: 26, status: 'healthy', fillRate: 96 },
  { sku: 'Ceiling Fan · 1200mm Premium', category: 'Fans', region: 'East', forecast: 5400, stock: 4900, daysOfStock: 27, status: 'healthy', fillRate: 95 },
  { sku: 'MCB · 32A Single Pole', category: 'Switchgear', region: 'North', forecast: 28000, stock: 24800, daysOfStock: 27, status: 'healthy', fillRate: 97 },
  { sku: 'MCB · 32A Single Pole', category: 'Switchgear', region: 'South', forecast: 18000, stock: 31600, daysOfStock: 53, status: 'overstock', fillRate: 99 },
  { sku: 'LED Panel · 22W Square', category: 'Lighting', region: 'West', forecast: 14200, stock: 2100, daysOfStock: 4, status: 'stockout', fillRate: 79 },
  { sku: 'LED Panel · 22W Square', category: 'Lighting', region: 'North', forecast: 11800, stock: 9400, daysOfStock: 24, status: 'healthy', fillRate: 94 },
];

interface Exception {
  id: string; sev: 'High' | 'Med'; title: string; region: string;
  detail: string; reason: string; recommendation: string;
  owner: string; impact: string; status: 'open' | 'resolved';
}

const INITIAL_EXC: Exception[] = [
  { id: 'X-2104', sev: 'High', title: 'Stockout risk in 72h · Fans · North', region: 'North', detail: '1840 units left vs 12.4K monthly forecast', reason: 'Demand spike +18% from Tier-2 distributors; replenishment delayed by 3 days', recommendation: 'Rebalance 4,200 units from South (overstock 48d). Prioritize dispatch to top-3 distributors.', owner: 'Regional SCM · North', impact: '₹ 1.8 Cr revenue at risk', status: 'open' },
  { id: 'X-2103', sev: 'High', title: 'Overstock · MCB Switchgear · South', region: 'South', detail: '53 days of stock vs 28-day target', reason: 'Forecast over-correction post-Q3 promo; demand normalized', recommendation: 'Reroute 6,800 units to West (planned promo). Hold next replenishment cycle.', owner: 'Planning · South', impact: '₹ 0.9 Cr WC tied up', status: 'open' },
  { id: 'X-2102', sev: 'Med', title: 'LED Panel stockout · West region', region: 'West', detail: 'Fill rate dropped to 79%', reason: 'Vendor lead time slip; West DC inventory depleted', recommendation: 'Expedite air freight 5K units; rebalance from North DC', owner: 'Sales Head · West', impact: '₹ 0.6 Cr', status: 'open' },
  { id: 'X-2101', sev: 'Med', title: 'Distributor fill-rate dip · West', region: 'West', detail: 'Top 5 distributors fill below 90%', reason: 'Allocation skewed to modern trade in last cycle', recommendation: 'Adjust allocation rules; protect general trade in next planning run', owner: 'Sales Head · West', impact: '₹ 0.4 Cr', status: 'open' },
];

const STATUS_COLOR = { stockout: '#dc2626', overstock: '#f59e0b', healthy: '#16a34a' };

const COPILOT = [
  { q: 'Where is my biggest stockout risk?', a: 'Ceiling Fans 1200mm Premium in the North — 4 days of cover vs 12.4K monthly forecast. ₹1.8 Cr at risk. Recommendation: rebalance 4,200 units from South (sitting on 48 days of stock).' },
  { q: 'How much working capital is stuck?', a: 'Approx ₹2.1 Cr stuck in 3 overstock pockets — MCB 32A South (53 days), Ceiling Fan South (48 days), and LED Driver inventory in East. Reroute + freeze next replenishment cycle to recover.' },
  { q: 'Which distributors are dropping?', a: 'Top 5 West distributors fill rate below 90%, driven by allocation skew to modern trade last cycle. AI suggests adjusting allocation rules in next planning run.' },
  { q: 'Demand vs supply this week', a: 'Fans demand +12% national, Lighting flat, Switchgear -4%. Two stockout pockets (North Fans, West Lighting), two overstock pockets (South Fans, South MCB). Net rebalance recommended: 11,000 units across 3 lanes.' },
];

const HavellsDecisionStudio: React.FC = () => {
  const [active, setActive] = useState('home');
  const [exceptions, setExceptions] = useState<Exception[]>(INITIAL_EXC);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);

  const open = exceptions.filter(e => e.status === 'open').length;
  const high = exceptions.filter(e => e.status === 'open' && e.sev === 'High').length;
  const stockoutCount = SKU_DATA.filter(s => s.status === 'stockout').length;
  const overstockCount = SKU_DATA.filter(s => s.status === 'overstock').length;

  const resolve = (id: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    setSelectedExc(null);
  };

  const modules = [
    { id: 'home', label: 'Decision Studio', icon: LayoutDashboard },
    { id: 'demand', label: 'Demand & Stock Health', icon: Package },
    { id: 'rebalance', label: 'Network Rebalance', icon: MapPin },
    { id: 'channel', label: 'Channel & Distributors', icon: Users },
    { id: 'logistics', label: 'Logistics SLAs', icon: Truck },
    { id: 'workflow', label: 'Action Workflow', icon: Workflow },
    { id: 'pilot', label: 'AI Pilot Plan', icon: Sparkles },
  ];

  const kpis: { label: string; value: string; sub?: string; tone?: 'green' | 'amber' | 'red' | 'neutral' }[] = [
    { label: 'SKU × Region tracked', value: `${SKU_DATA.length}` },
    { label: 'Stockout pockets', value: `${stockoutCount}`, tone: stockoutCount > 0 ? 'red' : 'green' },
    { label: 'Overstock pockets', value: `${overstockCount}`, tone: overstockCount > 0 ? 'amber' : 'green' },
    { label: 'Avg fill rate', value: '92.4%', tone: 'amber' },
    { label: 'WC at risk', value: '₹ 2.1 Cr', sub: 'Stuck inventory' },
    { label: 'Open exceptions', value: `${open}`, sub: `${high} high severity`, tone: high > 0 ? 'red' : 'neutral' },
  ];

  return (
    <CommandCenterShell
      brand={{ short: 'Havells', name: 'Havells Decision Studio', tagline: 'Demand-to-Dispatch · India', accent: ACCENT, accentDark: ACCENT_DARK }}
      modules={modules}
      active={active}
      onChange={setActive}
      copilot={COPILOT}
      topKpis={active === 'home' ? kpis : undefined}
    >
      {active === 'home' && (
        <div className="grid grid-cols-12 gap-4">
          <Panel title="SKU × Region Stock Health" className="col-span-12 lg:col-span-7">
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr><th className="text-left py-2">SKU</th><th>Region</th><th>Forecast</th><th>Stock</th><th>Days</th><th>Fill</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {SKU_DATA.map((s, i) => (
                    <tr key={i} className={`border-b border-slate-100 ${selectedRegion && s.region !== selectedRegion ? 'opacity-40' : ''}`}>
                      <td className="py-2"><div className="font-medium text-slate-900">{s.sku}</div><div className="text-[10px] text-slate-500">{s.category}</div></td>
                      <td className="text-center"><button onClick={() => setSelectedRegion(selectedRegion === s.region ? null : s.region)} className="text-slate-700 underline-offset-2 hover:underline">{s.region}</button></td>
                      <td className="text-center text-slate-600">{s.forecast.toLocaleString()}</td>
                      <td className="text-center font-semibold">{s.stock.toLocaleString()}</td>
                      <td className="text-center">{s.daysOfStock}d</td>
                      <td className="text-center">{s.fillRate}%</td>
                      <td className="text-center"><span className="text-[9px] px-1.5 py-0.5 rounded font-semibold uppercase" style={{ background: `${STATUS_COLOR[s.status]}15`, color: STATUS_COLOR[s.status] }}>{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
          <Panel title="Exception Queue" right={<Bell className="w-3.5 h-3.5 text-slate-400" />} className="col-span-12 lg:col-span-5">
            <div className="space-y-2">
              {exceptions.map(e => (
                <button key={e.id} onClick={() => setSelectedExc(e)} disabled={e.status === 'resolved'}
                  className={`w-full text-left border rounded-lg p-3 ${e.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60' : 'bg-slate-50 border-slate-200 hover:border-red-400'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <SevBadge sev={e.sev} />
                    <span className="text-[10px] text-slate-500 font-mono">{e.id}</span>
                    <span className="text-[10px] text-slate-500 ml-auto">{e.region}</span>
                    {e.status === 'resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                  </div>
                  <div className="text-sm font-medium text-slate-900 mb-1">{e.title}</div>
                  <div className="text-xs text-slate-600">{e.detail}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-slate-500">Owner: <span className="font-semibold text-slate-700">{e.owner}</span></span>
                    <span className="text-[10px] font-semibold" style={{ color: ACCENT }}>{e.impact}</span>
                  </div>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      )}

      {active === 'demand' && (
        <div className="grid md:grid-cols-3 gap-4">
          {['Fans', 'Switchgear', 'Lighting'].map(cat => (
            <Panel key={cat} title={`${cat} · Demand vs Supply`}>
              <div className="text-3xl font-semibold mb-1" style={{ color: ACCENT }}>{cat === 'Fans' ? '+12%' : cat === 'Switchgear' ? '−4%' : '+1%'}</div>
              <div className="text-xs text-slate-500 mb-3">Demand vs forecast · last 7 days</div>
              <div className="space-y-1.5">
                {SKU_DATA.filter(s => s.category === cat).slice(0, 4).map((s, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 truncate flex-1">{s.region}</span>
                    <span className="font-semibold" style={{ color: STATUS_COLOR[s.status] }}>{s.daysOfStock}d</span>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      )}

      {active === 'rebalance' && (
        <Panel title="Recommended Network Rebalance">
          <div className="space-y-3">
            {[
              { from: 'South DC', to: 'North DC', sku: 'Ceiling Fan 1200mm Premium', qty: 4200, save: '₹ 1.8 Cr revenue protected', eta: '36h via road' },
              { from: 'South DC', to: 'West DC', sku: 'MCB 32A Single Pole', qty: 6800, save: '₹ 0.9 Cr WC released', eta: '48h via road' },
              { from: 'North DC', to: 'West DC', sku: 'LED Panel 22W Square', qty: 5000, save: '₹ 0.6 Cr revenue protected', eta: '24h air freight' },
            ].map((r, i) => (
              <div key={i} className="border border-slate-200 rounded-lg p-3 bg-slate-50">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-semibold text-slate-900">{r.from}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="font-semibold text-slate-900">{r.to}</span>
                  <span className="text-xs text-slate-500 ml-auto">{r.eta}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">{r.sku} · <span className="font-semibold">{r.qty.toLocaleString()} units</span></div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: ACCENT }}>{r.save}</span>
                  <button className="text-xs px-3 py-1 rounded text-white" style={{ background: ACCENT }}>Approve & Dispatch</button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {active === 'channel' && (
        <Panel title="Distributor & Channel Health">
          <table className="w-full text-sm">
            <thead className="text-[10px] uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr><th className="text-left py-2">Distributor</th><th>Region</th><th>Fill Rate</th><th>OTIF</th><th>Disputes (open)</th><th>Health</th></tr>
            </thead>
            <tbody>
              {[
                { d: 'Sharma Electricals', r: 'North', f: '88%', o: '92%', dp: 3, h: 'amber' },
                { d: 'Reddy Distributors', r: 'South', f: '97%', o: '95%', dp: 0, h: 'green' },
                { d: 'Patel Trading', r: 'West', f: '79%', o: '84%', dp: 5, h: 'red' },
                { d: 'Bose Marketing', r: 'East', f: '94%', o: '93%', dp: 1, h: 'green' },
                { d: 'Kumar Power', r: 'West', f: '86%', o: '88%', dp: 2, h: 'amber' },
              ].map((r, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2.5 font-medium">{r.d}</td><td className="text-center text-slate-600">{r.r}</td>
                  <td className="text-center">{r.f}</td><td className="text-center">{r.o}</td>
                  <td className="text-center">{r.dp}</td>
                  <td className="text-center"><span className="w-2 h-2 inline-block rounded-full" style={{ background: r.h === 'green' ? '#16a34a' : r.h === 'amber' ? '#f59e0b' : '#dc2626' }} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>
      )}

      {active === 'logistics' && (
        <div className="grid md:grid-cols-2 gap-4">
          <Panel title="Lane SLA · OTIF">
            {[
              { l: 'Faridabad → Delhi NCR', otif: 96, target: 95 },
              { l: 'Neemrana → Mumbai', otif: 88, target: 92 },
              { l: 'Haridwar → Bengaluru', otif: 81, target: 90 },
              { l: 'Sahibabad → Kolkata', otif: 93, target: 92 },
            ].map((r, i) => (
              <div key={i} className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1"><span className="text-slate-700">{r.l}</span><span className={`font-semibold ${r.otif >= r.target ? 'text-emerald-600' : 'text-red-600'}`}>{r.otif}% / {r.target}%</span></div>
                <div className="h-1.5 bg-slate-100 rounded overflow-hidden"><div className="h-full" style={{ width: `${r.otif}%`, background: r.otif >= r.target ? '#16a34a' : ACCENT }} /></div>
              </div>
            ))}
          </Panel>
          <Panel title="Top Cost Levers">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2"><IndianRupee className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} /><div><div className="font-semibold">Air freight on West LED</div><div className="text-xs text-slate-600">+₹ 14L vs road · justified to protect ₹0.6 Cr revenue</div></div></li>
              <li className="flex items-start gap-2"><IndianRupee className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} /><div><div className="font-semibold">Underutilised Neemrana → Mumbai lane</div><div className="text-xs text-slate-600">Truck fill 71% · consolidate with adjacent SKU plan</div></div></li>
              <li className="flex items-start gap-2"><IndianRupee className="w-4 h-4 mt-0.5" style={{ color: ACCENT }} /><div><div className="font-semibold">Detention charges · Bengaluru</div><div className="text-xs text-slate-600">Top-3 distributor unloading delays · ₹6.2L/mo</div></div></li>
            </ul>
          </Panel>
        </div>
      )}

      {active === 'workflow' && (
        <Panel title="Action Workflow · Demand-to-Dispatch">
          <div className="grid grid-cols-5 gap-2 text-center text-xs">
            {['Signal', 'Owner', 'Recommendation', 'Approval', 'Dispatch'].map((s, i) => (
              <div key={i} className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500">Step {i + 1}</div>
                <div className="text-sm font-semibold mt-1">{s}</div>
                <div className="text-[10px] text-slate-500 mt-1">{[218, 196, 188, 174, 162][i]} this wk</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-600">Avg cycle: <span className="font-semibold text-slate-900">8.4h</span> · SLA met: <span className="font-semibold" style={{ color: ACCENT }}>91%</span></div>
        </Panel>
      )}

      {active === 'pilot' && (
        <PilotPlan
          accent={ACCENT}
          weeks={[
            { week: 'Week 1', title: 'Connect & Baseline', bullets: ['SAP + DMS + WMS integration on 1 region', 'Baseline KPIs: fill rate, days of stock, OTIF', 'CXO + Sales/SCM workshop'] },
            { week: 'Week 2', title: 'Intelligence Layer', bullets: ['Live SKU × region stock-health view', 'Network rebalance recommendations', 'Distributor fill-rate alerts'] },
            { week: 'Week 3', title: 'Action & Hand-off', bullets: ['Owner-led approval workflow', 'AI Copilot trained on Havells channel vocabulary', 'Steerco · scale to all 4 regions'] },
          ]}
          outcomes={[
            'Live demand-to-dispatch decision studio for 1 region',
            'Network rebalance recommendations with one-click approve',
            'Distributor fill-rate watchlist with auto-escalation',
            'Working capital release from overstock pockets (target: ₹1–2 Cr)',
            'AI Copilot grounded in Havells channel + SCM vocabulary',
            '90-day plan to scale across categories and regions',
          ]}
        />
      )}

      {selectedExc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedExc(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={ev => ev.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1"><SevBadge sev={selectedExc.sev} /><span className="text-xs text-slate-500 font-mono">{selectedExc.id}</span></div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedExc.title}</h3>
                <p className="text-sm text-slate-600">{selectedExc.detail}</p>
              </div>
              <button onClick={() => setSelectedExc(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> Root Cause</div><div className="text-sm text-slate-800">{selectedExc.reason}</div></div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-red-700 font-semibold mb-1 flex items-center gap-1.5"><ArrowRight className="w-3 h-3" /> Recommended Action</div><div className="text-sm text-slate-800">{selectedExc.recommendation}</div></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Owner</div><div className="text-sm font-semibold">{selectedExc.owner}</div></div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3"><div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Impact</div><div className="text-sm font-semibold" style={{ color: ACCENT }}>{selectedExc.impact}</div></div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => resolve(selectedExc.id)} className="flex-1 text-white rounded-lg py-2.5 text-sm font-semibold hover:opacity-90" style={{ background: ACCENT }}>Approve & Execute</button>
              <button onClick={() => setSelectedExc(null)} className="px-4 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Defer</button>
            </div>
          </div>
        </div>
      )}
    </CommandCenterShell>
  );
};

export default HavellsDecisionStudio;

import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, CheckCircle2, ArrowRight, Bell, TrendingDown, TrendingUp, X, MapPin } from 'lucide-react';

interface SkuRegion {
  sku: string;
  category: string;
  region: string;
  forecast: number;
  stock: number;
  daysOfStock: number;
  status: 'stockout' | 'overstock' | 'healthy';
  fillRate: number;
}

interface Exception {
  id: string;
  sev: 'High' | 'Med';
  title: string;
  region: string;
  detail: string;
  reason: string;
  recommendation: string;
  owner: string;
  impact: string;
  status: 'open' | 'resolved';
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

const INITIAL_EXC: Exception[] = [
  { id: 'X-2104', sev: 'High', title: 'Stockout risk in 72h · Fans · North', region: 'North', detail: '1840 units left vs 12.4K monthly forecast', reason: 'Demand spike +18% from Tier-2 distributors; replenishment delayed by 3 days', recommendation: 'Rebalance 4,200 units from South (overstock 48d). Prioritize dispatch to top-3 distributors.', owner: 'Regional SCM · North', impact: '₹ 1.8 Cr revenue at risk', status: 'open' },
  { id: 'X-2103', sev: 'High', title: 'Overstock · MCB Switchgear · South', region: 'South', detail: '53 days of stock vs 28-day target', reason: 'Forecast over-correction post-Q3 promo; demand normalized', recommendation: 'Reroute 6,800 units to West (planned promo). Hold next replenishment cycle.', owner: 'Planning · South', impact: '₹ 0.9 Cr WC tied up', status: 'open' },
  { id: 'X-2102', sev: 'Med', title: 'LED Panel stockout · West region', region: 'West', detail: 'Fill rate dropped to 79%', reason: 'Vendor lead time slip; West DC inventory depleted', recommendation: 'Expedite air freight 5K units; rebalance from North DC', owner: 'Sales Head · West', impact: '₹ 0.6 Cr', status: 'open' },
  { id: 'X-2101', sev: 'Med', title: 'Distributor fill-rate dip · West', region: 'West', detail: 'Top 5 distributors fill below 90%', reason: 'Allocation skewed to modern trade in last cycle', recommendation: 'Adjust allocation rules; protect general trade in next planning run', owner: 'Sales Head · West', impact: '₹ 0.4 Cr', status: 'open' },
];

const REGIONS = ['North', 'South', 'East', 'West'];
const STATUS_COLOR = { stockout: '#dc2626', overstock: '#f59e0b', healthy: '#16a34a' };

const HavellsDecisionStudio: React.FC = () => {
  const [exceptions, setExceptions] = useState<Exception[]>(INITIAL_EXC);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedExc, setSelectedExc] = useState<Exception | null>(null);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const open = exceptions.filter(e => e.status === 'open').length;
  const high = exceptions.filter(e => e.status === 'open' && e.sev === 'High').length;
  const stockoutSkus = SKU_DATA.filter(s => s.status === 'stockout').length;
  const overstockSkus = SKU_DATA.filter(s => s.status === 'overstock').length;

  const filteredSku = selectedRegion ? SKU_DATA.filter(s => s.region === selectedRegion) : SKU_DATA;

  const resolve = (id: string) => {
    setExceptions(prev => prev.map(e => e.id === id ? { ...e, status: 'resolved' } : e));
    setSelectedExc(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-900 flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="text-lg font-semibold text-slate-900">Havells · Demand-to-Dispatch Decision Studio</div>
            <div className="text-xs text-slate-500">Channel · Inventory · Working Capital</div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" /> Live · {now.toLocaleTimeString()}</div>
          <div className="text-slate-500">User: <span className="font-semibold text-slate-800">SCM Control Tower</span></div>
        </div>
      </div>

      <div className="px-6 py-4 grid grid-cols-6 gap-3">
        {[
          { label: 'National Fill Rate', val: '92.4%', sub: 'Target 95%', color: 'text-amber-600' },
          { label: 'Forecast Accuracy', val: '78%', sub: 'Trailing 30d' },
          { label: 'Inventory Turns', val: '6.2x', sub: 'YTD' },
          { label: 'Stockout SKUs', val: `${stockoutSkus}`, sub: 'Across regions', color: 'text-red-600' },
          { label: 'Overstock SKUs', val: `${overstockSkus}`, sub: 'Working capital risk', color: 'text-amber-600' },
          { label: 'Open Exceptions', val: `${open}`, sub: `${high} high severity`, color: high > 0 ? 'text-red-600' : 'text-slate-900' },
        ].map((k, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">{k.label}</div>
            <div className={`text-2xl font-semibold mt-1 ${(k as any).color || 'text-slate-900'}`}>{k.val}</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Region filter */}
      <div className="px-6 pb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-slate-500" />
        <span className="text-xs text-slate-500 mr-2">Region:</span>
        <button onClick={() => setSelectedRegion(null)} className={`text-xs px-3 py-1 rounded-full border ${!selectedRegion ? 'bg-blue-900 text-white border-blue-900' : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'}`}>All India</button>
        {REGIONS.map(r => (
          <button key={r} onClick={() => setSelectedRegion(r)} className={`text-xs px-3 py-1 rounded-full border ${selectedRegion === r ? 'bg-blue-900 text-white border-blue-900' : 'bg-white border-slate-300 text-slate-600 hover:border-slate-400'}`}>{r}</button>
        ))}
      </div>

      <div className="px-6 pb-6 grid grid-cols-12 gap-4">
        {/* SKU heatmap */}
        <div className="col-span-7 bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider mb-3">SKU × Region Stock Health</h3>
          <div className="overflow-hidden rounded-lg border border-slate-200">
            <div className="grid grid-cols-12 px-3 py-2 bg-slate-50 border-b border-slate-200 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              <div className="col-span-4">SKU</div>
              <div className="col-span-1">Region</div>
              <div className="col-span-2 text-right">Forecast</div>
              <div className="col-span-2 text-right">Stock</div>
              <div className="col-span-1 text-right">DOS</div>
              <div className="col-span-2 text-right">Status</div>
            </div>
            <div className="divide-y divide-slate-100 max-h-[420px] overflow-y-auto">
              {filteredSku.map((s, i) => (
                <div key={i} className="grid grid-cols-12 px-3 py-2.5 items-center text-sm hover:bg-slate-50">
                  <div className="col-span-4 text-slate-800">{s.sku}</div>
                  <div className="col-span-1 text-slate-600 text-xs">{s.region}</div>
                  <div className="col-span-2 text-right text-slate-700 tabular-nums">{s.forecast.toLocaleString()}</div>
                  <div className="col-span-2 text-right text-slate-700 tabular-nums">{s.stock.toLocaleString()}</div>
                  <div className="col-span-1 text-right text-slate-700 tabular-nums">{s.daysOfStock}d</div>
                  <div className="col-span-2 text-right">
                    <span className="text-[10px] px-2 py-0.5 rounded font-semibold uppercase" style={{ background: `${STATUS_COLOR[s.status]}15`, color: STATUS_COLOR[s.status] }}>
                      {s.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Exception queue */}
        <div className="col-span-5 bg-white border border-slate-200 rounded-xl p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-900" />
              <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wider">Exception Queue</h3>
            </div>
            <span className="text-[10px] text-slate-500">Cross-functional · SLA tracked</span>
          </div>
          <div className="space-y-2 flex-1">
            {exceptions.map(e => (
              <button
                key={e.id}
                onClick={() => setSelectedExc(e)}
                disabled={e.status === 'resolved'}
                className={`w-full text-left border rounded-lg p-3 transition-all ${
                  e.status === 'resolved' ? 'bg-emerald-50 border-emerald-200 opacity-60'
                  : 'bg-slate-50 border-slate-200 hover:border-blue-700'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-semibold ${e.sev === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{e.sev}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{e.id}</span>
                  {e.status === 'resolved' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 ml-auto" />}
                </div>
                <div className="text-sm font-medium text-slate-900 mb-1">{e.title}</div>
                <div className="text-xs text-slate-600">{e.detail}</div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[10px] text-slate-500">Owner: <span className="font-semibold text-slate-700">{e.owner}</span></span>
                  <span className="text-[10px] font-semibold text-blue-900">{e.impact}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {selectedExc && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedExc(null)}>
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-6" onClick={ev => ev.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${selectedExc.sev === 'High' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{selectedExc.sev}</span>
                  <span className="text-xs text-slate-500 font-mono">{selectedExc.id}</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900">{selectedExc.title}</h3>
                <p className="text-sm text-slate-600">{selectedExc.detail}</p>
              </div>
              <button onClick={() => setSelectedExc(null)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1 flex items-center gap-1.5"><AlertTriangle className="w-3 h-3" /> AI Explanation</div>
                <div className="text-sm text-slate-800">{selectedExc.reason}</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="text-[10px] uppercase tracking-wider text-blue-900 font-semibold mb-1 flex items-center gap-1.5"><ArrowRight className="w-3 h-3" /> Recommended Action</div>
                <div className="text-sm text-slate-800">{selectedExc.recommendation}</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Approver</div>
                  <div className="text-sm font-semibold text-slate-900">{selectedExc.owner}</div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Business Impact</div>
                  <div className="text-sm font-semibold text-blue-900">{selectedExc.impact}</div>
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => resolve(selectedExc.id)} className="flex-1 bg-blue-900 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-blue-950">Approve & Route to Execution</button>
              <button onClick={() => setSelectedExc(null)} className="px-4 border border-slate-300 rounded-lg text-sm text-slate-700 hover:bg-slate-50">Defer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HavellsDecisionStudio;

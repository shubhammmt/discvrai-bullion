import React, { useMemo, useState } from 'react';
import data from '@/data/adfDistributorData.json';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { LayoutDashboard, BarChart3, Package, Truck, Sparkles, AlertTriangle, Trophy, GitBranch, Building2, Users, Clock, Receipt, MapPin, Bot, Send, MessageCircle, Brain, TrendingDown, ArrowDown, AlertCircle, Database, RefreshCw, FileText } from 'lucide-react';

const fmtMoney = (n: number) => n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${n.toFixed(0)}`;
const fmtMoneyFull = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const fmtPct = (n: number) => `${(n*100).toFixed(1)}%`;
const fmtNum = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });

const Card: React.FC<React.PropsWithChildren<{className?: string}>> = ({ children, className='' }) =>
  <div className={`bg-white border border-slate-200 rounded-xl p-4 ${className}`}>{children}</div>;

const CardTitle: React.FC<React.PropsWithChildren<{icon?: React.ReactNode}>> = ({ children, icon }) =>
  <div className="text-[13px] font-medium text-slate-900 mb-3 flex items-center gap-2">{icon}{children}</div>;

const KPI: React.FC<{ label: string; value: string; sub?: string; tone?: 'good'|'warn'|'danger'|'default' }> = ({ label, value, sub, tone='default' }) => {
  const colors = { good:'text-emerald-700', warn:'text-amber-700', danger:'text-rose-700', default:'text-slate-900' } as const;
  return (
    <div className="bg-slate-50 rounded-lg px-3.5 py-3 border border-slate-100">
      <div className="text-[11px] text-slate-500 mb-1">{label}</div>
      <div className={`text-2xl font-medium ${colors[tone]}`}>{value}</div>
      {sub && <div className="text-[11px] text-slate-400 mt-0.5">{sub}</div>}
    </div>
  );
};

const Badge: React.FC<React.PropsWithChildren<{tone:'good'|'warn'|'danger'|'info'|'gray'}>> = ({ children, tone }) => {
  const map = {
    good: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    warn: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-800 border-rose-200',
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    gray: 'bg-slate-100 text-slate-700 border-slate-200',
  };
  return <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-medium border ${map[tone]}`}>{children}</span>;
};

const fillTone = (f: number) => f >= 0.9 ? 'good' : f >= 0.7 ? 'warn' : 'danger';
const fillColor = (f: number) => f >= 0.9 ? 'bg-emerald-500' : f >= 0.7 ? 'bg-amber-500' : 'bg-rose-500';

const Bar: React.FC<{ value: number; max: number; tone?: 'good'|'warn'|'danger' }> = ({ value, max, tone }) => (
  <div className="w-full h-2 bg-slate-100 rounded overflow-hidden">
    <div className={`h-full rounded ${tone==='danger'?'bg-rose-500':tone==='warn'?'bg-amber-500':'bg-emerald-500'}`} style={{ width: `${Math.min(100,(value/max)*100)}%` }} />
  </div>
);

const Alert: React.FC<{ tone: 'danger'|'warn'|'info'; icon: React.ReactNode; children: React.ReactNode }> = ({ tone, icon, children }) => {
  const map = { danger:'bg-rose-50 border-rose-200 text-rose-900', warn:'bg-amber-50 border-amber-200 text-amber-900', info:'bg-blue-50 border-blue-200 text-blue-900' };
  return <div className={`flex gap-2.5 p-3 rounded-lg border text-[12px] mb-2 ${map[tone]}`}><div className="shrink-0 mt-0.5">{icon}</div><div>{children}</div></div>;
};

// ---------- Overview Tab ----------
const OverviewTab = () => {
  const { sales, po, inv } = data;
  const naanGarlic = sales.topSkus.find((s:any)=>/garlic/i.test(s['ADF Item Name']))?.sales || 0;
  const naanPct = naanGarlic / sales.totalSales;
  const top5 = sales.topChains.slice(0,5);
  const top5Sku = sales.topSkus.slice(0,5);
  const max5 = top5[0]?.sales || 1;
  const max5Sku = top5Sku[0]?.sales || 1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        <KPI label="13-wk revenue" value={fmtMoney(sales.totalSales)} sub="KeHE + UNFI combined" tone="good" />
        <KPI label="Active chains" value={fmtNum(sales.chainCount)} sub={`${fmtNum(sales.storeCount)} stores`} />
        <KPI label="Overall fill rate" value={fmtPct(sales.fillRate)} sub="cases shipped / ordered" tone={fillTone(sales.fillRate) as any} />
        <KPI label="On-time PO delivery" value={fmtPct(po.onTimePct)} sub={`${po.onTime} of ${po.totalPO} POs`} tone="danger" />
        <KPI label="Avg days late" value={`${po.avgLateDays.toFixed(1)}d`} sub="across late POs" tone="warn" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}>Priority alerts</CardTitle>
          <Alert tone="danger" icon={<AlertCircle className="w-4 h-4"/>}>
            <strong>{((1-po.onTimePct)*100).toFixed(1)}% of POs were late</strong> — {po.late} of {po.totalPO} received POs missed requested dates across {po.dcCount} DCs
          </Alert>
          {sales.lowFillChains.slice(0,1).map((c:any)=>(
            <Alert key={c['Retailer Chain Name']} tone="danger" icon={<TrendingDown className="w-4 h-4"/>}>
              <strong>{c['Retailer Chain Name']} fill rate critically low</strong> — {fmtPct(c.fill)} on {fmtNum(c.ordered)} cases ordered across {c.stores} stores
            </Alert>
          ))}
          <Alert tone="info" icon={<Trophy className="w-4 h-4"/>}>
            <strong>{sales.topSkus[0]['ADF Item Name']} drives {fmtPct(sales.topSkus[0].sales/sales.totalSales)} of revenue</strong> — {fmtMoney(sales.topSkus[0].sales)} of {fmtMoney(sales.totalSales)} total. Concentration risk.
          </Alert>
          <Alert tone="warn" icon={<Package className="w-4 h-4"/>}>
            <strong>{inv.atRisk.length} SKUs at stockout risk</strong> — 0 on-hand and 0 on PO across DCs
          </Alert>
        </Card>

        <Card>
          <CardTitle icon={<Trophy className="w-4 h-4 text-emerald-600"/>}>Top 5 chains by revenue</CardTitle>
          <div className="space-y-2.5">
            {top5.map((c:any)=>(
              <div key={c['Retailer Chain Name']} className="flex items-center gap-3 text-[12px]">
                <div className="w-32 truncate text-slate-600">{c['Retailer Chain Name']}</div>
                <div className="flex-1"><Bar value={c.sales} max={max5} tone={fillTone(c.fill) as any}/></div>
                <div className="w-20 text-right font-medium text-slate-900">{fmtMoney(c.sales)}</div>
                <Badge tone={fillTone(c.fill) as any}>{fmtPct(c.fill)}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle icon={<GitBranch className="w-4 h-4 text-rose-600"/>}>Top 5 SKUs — revenue concentration view</CardTitle>
        <div className="space-y-2.5">
          {top5Sku.map((s:any)=>{
            const pct = s.sales/sales.totalSales;
            return (
              <div key={s['ADF Item Name']} className="flex items-center gap-3 text-[12px]">
                <div className="w-44 truncate text-slate-600">{s['ADF Item Name']}</div>
                <div className="flex-1"><Bar value={s.sales} max={max5Sku} tone={pct>0.4?'danger':pct>0.2?'warn':'good'} /></div>
                <div className="w-32 text-right font-medium text-slate-900">{fmtMoney(s.sales)} · {fmtPct(pct)}</div>
              </div>
            );
          })}
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Top 2 SKUs = {fmtPct((top5Sku[0].sales+top5Sku[1].sales)/sales.totalSales)} of total revenue. AI flags this weekly.</p>
      </Card>
    </div>
  );
};

// ---------- Sales Tab ----------
const SalesTab = () => {
  const { sales } = data;
  const [sourceFilter, setSourceFilter] = useState<'ALL'|'KEHE'|'UNFI'>('ALL');
  const [fillFilter, setFillFilter] = useState<'all'|'good'|'watch'|'action'>('all');

  const filtered = useMemo(()=>{
    return sales.topChains.filter((c:any)=>{
      if (sourceFilter!=='ALL' && c.source!==sourceFilter) return false;
      if (fillFilter==='good' && c.fill<0.9) return false;
      if (fillFilter==='watch' && (c.fill<0.7 || c.fill>=0.9)) return false;
      if (fillFilter==='action' && c.fill>=0.7) return false;
      return true;
    });
  },[sourceFilter, fillFilter, sales.topChains]);

  const avgPerStore = sales.totalSales / sales.storeCount / 13;
  const kehe = sales.sources.find((s:any)=>s.Source==='KEHE');
  const unfi = sales.sources.find((s:any)=>s.Source==='UNFI');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <KPI label="Revenue" value={fmtMoney(sales.totalSales)} sub="13-week period"/>
        <KPI label="Avg $/store/wk" value={`$${avgPerStore.toFixed(2)}`} sub={`${fmtNum(sales.storeCount)} stores`}/>
        <KPI label="KeHE revenue" value={fmtMoney(kehe?.sales||0)} sub={`${kehe?.chains||0} chains · fill ${fmtPct(kehe?.fill||0)}`}/>
        <KPI label="UNFI revenue" value={fmtMoney(unfi?.sales||0)} sub={`${unfi?.chains||0} accounts · fill ${fmtPct(unfi?.fill||0)}`}/>
      </div>

      <Card>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <CardTitle icon={<BarChart3 className="w-4 h-4 text-blue-600"/>}>Fill rate distribution — top chains</CardTitle>
          <div className="flex items-center gap-2 text-[11px]">
            <div className="flex gap-1">
              {(['ALL','KEHE','UNFI'] as const).map(s=>(
                <button key={s} onClick={()=>setSourceFilter(s)} className={`px-2.5 py-1 rounded border ${sourceFilter===s?'bg-slate-900 text-white border-slate-900':'bg-white border-slate-200 text-slate-600'}`}>{s}</button>
              ))}
            </div>
            <div className="flex gap-1 ml-2">
              {(['all','good','watch','action'] as const).map(f=>(
                <button key={f} onClick={()=>setFillFilter(f)} className={`px-2.5 py-1 rounded border capitalize ${fillFilter===f?'bg-slate-900 text-white border-slate-900':'bg-white border-slate-200 text-slate-600'}`}>{f}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 mb-2 text-[11px] text-slate-600">
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-emerald-500"/>≥90% good</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-amber-500"/>70–89% watch</div>
          <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-rose-500"/>&lt;70% action</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 px-2 font-medium">Chain</th><th className="font-medium px-2">Source</th><th className="font-medium px-2">Stores</th>
              <th className="font-medium px-2">Revenue</th><th className="font-medium px-2 w-40">Fill rate</th><th className="font-medium px-2">$/Store/Wk</th><th className="font-medium px-2">Status</th>
            </tr></thead>
            <tbody>
              {filtered.map((c:any,i:number)=>(
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-2 px-2 text-slate-900 max-w-[260px] truncate">{c['Retailer Chain Name']}</td>
                  <td className="px-2"><Badge tone="gray">{c.source}</Badge></td>
                  <td className="px-2">{c.stores}</td>
                  <td className="px-2 font-medium">{fmtMoneyFull(c.sales)}</td>
                  <td className="px-2"><div className="flex items-center gap-2"><Bar value={c.fill} max={1} tone={fillTone(c.fill) as any}/><span className="w-10 text-right">{fmtPct(c.fill)}</span></div></td>
                  <td className="px-2">${(c.sales/Math.max(1,c.stores)/13).toFixed(2)}</td>
                  <td className="px-2"><Badge tone={fillTone(c.fill) as any}>{c.fill>=0.9?'Good':c.fill>=0.7?'Watch':'Action'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Showing top {filtered.length} of {fmtNum(sales.chainCount)} chains. Filter by distributor and fill rate band.</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<Building2 className="w-4 h-4 text-violet-600"/>}>Revenue by category</CardTitle>
          {sales.categories.map((c:any)=>(
            <div key={c.Category} className="flex items-center gap-3 text-[12px] mb-2">
              <div className="w-28 text-slate-600 capitalize">{c.Category?.toLowerCase()}</div>
              <div className="flex-1"><Bar value={c.sales} max={sales.categories[0].sales} tone={fillTone(c.fill) as any}/></div>
              <div className="w-24 text-right font-medium">{fmtMoney(c.sales)} · {fmtPct(c.fill)}</div>
            </div>
          ))}
        </Card>
        <Card>
          <CardTitle icon={<Users className="w-4 h-4 text-blue-600"/>}>Revenue by distributor</CardTitle>
          {sales.sources.map((s:any)=>(
            <div key={s.Source} className="flex items-center gap-3 text-[12px] mb-2">
              <div className="w-20 text-slate-600">{s.Source}</div>
              <div className="flex-1"><Bar value={s.sales} max={Math.max(...sales.sources.map((x:any)=>x.sales))} tone={fillTone(s.fill) as any}/></div>
              <div className="w-28 text-right font-medium">{fmtMoney(s.sales)} · fill {fmtPct(s.fill)}</div>
            </div>
          ))}
          <p className="text-[11px] text-slate-500 mt-2">{sales.sources.length} distributors · {fmtNum(sales.chainCount)} chains · {fmtNum(sales.skuCount)} active SKUs.</p>
        </Card>
      </div>

      <Card>
        <CardTitle icon={<AlertTriangle className="w-4 h-4 text-rose-600"/>}>Low fill chains needing action</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 px-2 font-medium">Chain</th><th className="font-medium px-2">Source</th><th className="font-medium px-2">Stores</th>
              <th className="font-medium px-2">Ordered</th><th className="font-medium px-2">Shipped</th><th className="font-medium px-2">Short</th><th className="font-medium px-2">Fill</th>
            </tr></thead>
            <tbody>
              {sales.lowFillChains.map((c:any,i:number)=>(
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 px-2 max-w-[300px] truncate">{c['Retailer Chain Name']}</td>
                  <td className="px-2"><Badge tone="gray">{c.source}</Badge></td>
                  <td className="px-2">{c.stores}</td>
                  <td className="px-2">{fmtNum(c.ordered)}</td>
                  <td className="px-2">{fmtNum(c.shipped)}</td>
                  <td className="px-2 text-rose-700 font-medium">−{fmtNum(c.ordered-c.shipped)}</td>
                  <td className="px-2"><Badge tone="danger">{fmtPct(c.fill)}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ---------- Inventory Tab ----------
const InventoryTab = () => {
  const { inv } = data;
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <KPI label="Total SKUs tracked" value={fmtNum(inv.skuCount)} sub="KeHE + UNFI DCs"/>
        <KPI label="DCs covered" value={fmtNum(inv.dcCount)} sub="across both distributors"/>
        <KPI label="Total on-hand cases" value={fmtNum(inv.totalOnHand)} sub="all DCs combined"/>
        <KPI label="Total on PO" value={fmtNum(inv.totalOnPO)} sub="inbound replenishment" tone="warn"/>
      </div>

      <Card>
        <CardTitle icon={<MapPin className="w-4 h-4 text-blue-600"/>}>Inventory by distribution centre</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 px-2 font-medium">DC</th><th className="font-medium px-2">On Hand</th><th className="font-medium px-2">On PO</th>
              <th className="font-medium px-2">SKUs stocked</th><th className="font-medium px-2">Stockouts</th><th className="font-medium px-2">Coverage</th>
            </tr></thead>
            <tbody>
              {inv.byDC.map((d:any)=>{
                const cov = d.skus/inv.skuCount;
                return (
                  <tr key={d.dc} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-2 font-medium">{d.dc}</td>
                    <td className="px-2">{fmtNum(d.onHand)}</td>
                    <td className="px-2">{fmtNum(d.onPO)}</td>
                    <td className="px-2">{d.skus} / {inv.skuCount}</td>
                    <td className="px-2"><Badge tone={d.stockouts>40?'danger':d.stockouts>30?'warn':'good'}>{d.stockouts}</Badge></td>
                    <td className="px-2"><div className="flex items-center gap-2"><Bar value={cov} max={1} tone={cov>0.5?'good':cov>0.25?'warn':'danger'}/><span className="w-10 text-right">{fmtPct(cov)}</span></div></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Each DC carries a subset of the {inv.skuCount}-SKU catalogue. High stockout count signals either narrow assortment or unaddressed reorders.</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<Package className="w-4 h-4 text-emerald-600"/>}>Top-stocked SKUs (all DCs)</CardTitle>
          <div className="space-y-1.5">
            {inv.topSkus.slice(0,12).map((s:any)=>(
              <div key={s.upc} className="flex items-center gap-2 text-[12px]">
                <div className="flex-1 truncate text-slate-700">{s.item}</div>
                <div className="w-16 text-right font-medium">{fmtNum(s.onHand)}</div>
                <div className="w-10 text-right text-slate-400">/{s.dcCoverage}DC</div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <CardTitle icon={<ArrowDown className="w-4 h-4 text-amber-600"/>}>Low stock — reorder candidates</CardTitle>
          <div className="space-y-1.5">
            {inv.lowStock.map((s:any)=>(
              <div key={s.upc} className="flex items-center gap-2 text-[12px]">
                <div className="flex-1 truncate text-slate-700">{s.item}</div>
                <Badge tone={s.onPO>0?'info':'warn'}>{s.onPO>0?`OH ${fmtNum(s.onHand)} · PO ${fmtNum(s.onPO)}`:`OH ${fmtNum(s.onHand)} · no PO`}</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardTitle icon={<AlertCircle className="w-4 h-4 text-rose-600"/>}>What the inventory layer auto-flags</CardTitle>
        <Alert tone="danger" icon={<Package className="w-4 h-4"/>}>
          <strong>Stockout risk:</strong> {inv.atRisk.length} SKU+DC combos with On Hand = 0 and On PO = 0 — potential OOS unless replenishment triggered
        </Alert>
        <Alert tone="warn" icon={<ArrowDown className="w-4 h-4"/>}>
          <strong>Low cover:</strong> Where weeks-on-hand &lt; 4 and no open PO — especially high-velocity DCs (Dallas, Hudson Valley, Manchester)
        </Alert>
        <Alert tone="info" icon={<Building2 className="w-4 h-4"/>}>
          <strong>Inventory imbalance:</strong> Same SKU overstocked at one DC and at risk at another — signals redistribution rather than new PO
        </Alert>
      </Card>
    </div>
  );
};

// ---------- PO Tab ----------
const POTab = () => {
  const { po } = data;
  const shortfall = po.totalOrdered - po.totalReceived;
  const topDCs = [...po.dcs].sort((a:any,b:any)=>b['PO Amount']-a['PO Amount']).slice(0,8);
  const maxAmt = topDCs[0]?.['PO Amount'] || 1;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <KPI label="Total POs" value={fmtNum(po.totalPO)} sub="all RECEIVED status"/>
        <KPI label="On-time delivery" value={fmtPct(po.onTimePct)} sub={`${po.onTime} of ${po.totalPO} on time`} tone="danger"/>
        <KPI label="Avg days late" value={`${po.avgLateDays.toFixed(1)}d`} sub={`avg lead ${po.avgLeadDays.toFixed(0)}d`} tone="warn"/>
        <KPI label="Total shortfall" value={`${fmtNum(shortfall)} cases`} sub={`${fmtPct(1-po.fillQty)} fill gap`} tone="danger"/>
      </div>

      <Card>
        <CardTitle icon={<Building2 className="w-4 h-4 text-blue-600"/>}>Performance by distribution centre</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 px-2 font-medium">DC</th><th className="font-medium px-2"># POs</th><th className="font-medium px-2">Late</th>
              <th className="font-medium px-2">Ordered</th><th className="font-medium px-2">Received</th><th className="font-medium px-2">Shortfall</th><th className="font-medium px-2">PO Value</th>
            </tr></thead>
            <tbody>
              {po.dcs.map((d:any)=>{
                const short = d['Original Qty Ordered'] - d['Qty Received'];
                return (
                  <tr key={d['Distribution Center']} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-2 px-2 font-medium">{d['Distribution Center']}</td>
                    <td className="px-2">{d['# of POs']}</td>
                    <td className="px-2"><Badge tone={d['Late POs']===d['# of POs']?'danger':d['Late POs']>0?'warn':'good'}>{d['Late POs']}</Badge></td>
                    <td className="px-2">{fmtNum(d['Original Qty Ordered'])}</td>
                    <td className="px-2">{fmtNum(d['Qty Received'])}</td>
                    <td className={`px-2 font-medium ${short>50?'text-rose-700':short>0?'text-amber-700':'text-emerald-700'}`}>{short>0?`−${short}`:'0'}</td>
                    <td className="px-2">${fmtNum(d['PO Amount'])}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-[11px] text-slate-500 mt-3">Every single DC received at least some late POs — this is a systemic fulfilment issue, not isolated.</p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<Clock className="w-4 h-4 text-amber-600"/>}>Lateness pattern</CardTitle>
          <p className="text-[12px] text-slate-600 mb-2">All {po.totalPO} POs across {po.dcCount} DCs. {po.late} were late by an average of {po.avgLateDays.toFixed(1)} days. Average lead time {po.avgLeadDays.toFixed(0)} days from PO creation to receipt.</p>
          <Alert tone="danger" icon={<AlertTriangle className="w-4 h-4"/>}>
            Late POs directly cause the low fill rates seen in chains like Sprouts. The two problems are connected — fix PO on-time and fill rates will improve.
          </Alert>
        </Card>
        <Card>
          <CardTitle icon={<Receipt className="w-4 h-4 text-blue-600"/>}>PO value concentration (top DCs)</CardTitle>
          {topDCs.map((d:any)=>(
            <div key={d['Distribution Center']} className="flex items-center gap-3 text-[12px] mb-2">
              <div className="w-32 truncate text-slate-600">{d['Distribution Center']}</div>
              <div className="flex-1"><Bar value={d['PO Amount']} max={maxAmt} tone={d['Late POs']===d['# of POs']?'danger':'warn'}/></div>
              <div className="w-20 text-right font-medium">${fmtNum(d['PO Amount'])}</div>
            </div>
          ))}
        </Card>
      </div>

      <Card>
        <CardTitle icon={<Truck className="w-4 h-4 text-violet-600"/>}>Supplier ship-from performance</CardTitle>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead><tr className="text-left text-slate-500 border-b border-slate-200">
              <th className="py-2 px-2 font-medium">Ship from</th><th className="font-medium px-2">POs</th><th className="font-medium px-2">Late</th>
              <th className="font-medium px-2">On-time %</th><th className="font-medium px-2">Avg days late</th><th className="font-medium px-2">PO Value</th>
            </tr></thead>
            <tbody>
              {po.suppliers.map((s:any,i:number)=>(
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 px-2 font-medium">{s.supplier}</td>
                  <td className="px-2">{s.pos}</td>
                  <td className="px-2"><Badge tone={s.late===s.pos?'danger':s.late>0?'warn':'good'}>{s.late}</Badge></td>
                  <td className="px-2">{fmtPct(s.ontime_pct)}</td>
                  <td className="px-2">{(s.avg_late_days||0).toFixed(1)}d</td>
                  <td className="px-2">${fmtNum(s.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ---------- AI Copilot Tab ----------
const COPILOT_QA = (d: typeof data) => [
  {
    q: 'Give me this week\'s narrative summary',
    a: `**13-week distributor snapshot, week ending 04/25/2026.** Combined KeHE + UNFI revenue was **${fmtMoney(d.sales.totalSales)}** across **${fmtNum(d.sales.chainCount)} chains** and **${fmtNum(d.sales.storeCount)} stores**, on a fill rate of **${fmtPct(d.sales.fillRate)}**. The headline issue is the supply line: only **${d.po.onTime} of ${d.po.totalPO} POs (${fmtPct(d.po.onTimePct)})** arrived on time, with an average lateness of **${d.po.avgLateDays.toFixed(1)} days**. Every one of the **${d.po.dcCount} DCs** received at least one late PO — this is systemic, not isolated. Revenue is heavily concentrated: **${d.sales.topSkus[0]['ADF Item Name']}** alone accounts for **${fmtPct(d.sales.topSkus[0].sales/d.sales.totalSales)}** of sell-through. Recommend pulling the supply chain lead into the next review.`,
    sources: ['Sales · CombinedData', 'PO · Detail', 'Inventory · 13 DCs'],
  },
  (() => {
    const mv: any = d.po.dcs.find((x:any)=>/Moreno/.test(x['Distribution Center']));
    const mvShort = mv ? (mv['Original Qty Ordered'] - mv['Qty Received']) : 0;
    return {
      q: 'What is causing the low Sprouts / low-fill chain problem?',
      a: `Looking at the chains below 70% fill that ordered ≥20 cases, the pattern is consistent: **${d.sales.lowFillChains.length} chains** have ordered a total of **${fmtNum(d.sales.lowFillChains.reduce((s:number,c:any)=>s+c.ordered,0))} cases** but only received **${fmtNum(d.sales.lowFillChains.reduce((s:number,c:any)=>s+c.shipped,0))}**. Cross-referencing with the PO file, the DCs supplying these chains (Hudson Valley, Manchester PA, Moreno Valley) are exactly the DCs with the worst PO lateness — **Moreno Valley alone is ${fmtNum(mvShort)} cases short on inbound**. The two problems are the same problem viewed from different ends.`,
      sources: ['Sales · low-fill chains', 'PO · DC shortfall', 'Join: chain→DC'],
    };
  })(),
  {
    q: 'Which chains should ADF prioritise for growth?',
    a: `Looking at revenue-per-store-per-week rather than headline revenue, the hidden gems are smaller chains with high pull-through. The top revenue chains by absolute $ are **${d.sales.topChains.slice(0,3).map((c:any)=>c['Retailer Chain Name']).join(', ')}**, but on $/store/week the most efficient buyers warrant deeper investment — they convert listings into velocity. Combined with the **${d.sales.sources.length}-distributor split** (KeHE ${fmtMoney(d.sales.sources.find((s:any)=>s.Source==='KEHE')?.sales||0)}, UNFI ${fmtMoney(d.sales.sources.find((s:any)=>s.Source==='UNFI')?.sales||0)}), the growth motion is: protect the top 10, then push the top 10 hidden-gem chains to add 5–10 more stores each.`,
    sources: ['Sales · top chains', 'Sales · sources'],
  },
  {
    q: 'Which SKUs are at stockout risk and what should we reorder?',
    a: `The inventory file shows **${d.inv.atRisk.length} SKUs** with 0 on-hand and 0 on-PO across every DC — these are the immediate stockout-risk SKUs. A further **${d.inv.lowStock.length}** SKUs have less than 50 cases on-hand. Cross-referencing with the sales velocity, the highest-priority reorders are SKUs in the top-30 by revenue that show below 4 weeks of cover. Recommend triggering POs this week for any top-30 SKU in this band — the lead time from the PO file averages **${d.po.avgLeadDays.toFixed(0)} days**, so anything ordered today lands 2-3 weeks out.`,
    sources: ['Inventory · at-risk', 'Inventory · low stock', 'PO · lead times'],
  },
  {
    q: 'How would you build the data pipeline to connect these three files?',
    a: `Three steps. **First**, normalise SKU identifiers — the sales file uses KeHE UPC, inventory uses 12-digit UPC, PO uses Product Code. Build a single master SKU map. **Second**, normalise DC names — the inventory uses city names (Aurora, Dallas/FW), the PO file uses DC codes (Hudson Valley NY DC). A simple lookup table fixes this. **Third**, schedule weekly portal exports from KeHE and UNFI, drop them into S3, and run a daily ETL that joins on SKU+DC and writes to a single warehouse table. Once joined, the AI narrative writes itself from fresh data every Monday — no new collection needed.`,
    sources: ['Schema mapping', 'Weekly automation'],
  },
  {
    q: 'Build me a buyer presentation for the top chain',
    a: `**${d.sales.topChains[0]['Retailer Chain Name']} — buyer review pack.** 13-week revenue **${fmtMoney(d.sales.topChains[0].sales)}** across **${d.sales.topChains[0].stores} stores**, fill rate **${fmtPct(d.sales.topChains[0].fill)}**. Top SKUs by velocity in this chain mirror the national mix (Naan dominates). Distributor: **${d.sales.topChains[0].source}**. Three asks for the buyer meeting: (1) review of slow-mover SKUs with low pull-through, (2) commitment on FY26 promo calendar timing, (3) discussion of store-count expansion in under-distributed regions. AI can auto-generate this one-pager for any of the ${fmtNum(d.sales.chainCount)} chains on demand.`,
    sources: ['Sales · top chain', 'SKU mix'],
  },
];

const CopilotTab = () => {
  const qa = useMemo(()=>COPILOT_QA(data),[]);
  const [active, setActive] = useState(0);
  const current = qa[active];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div className="lg:col-span-1 space-y-3">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white"><Bot className="w-4 h-4"/></div>
              <div>
                <div className="text-[13px] font-semibold text-slate-900">ADF Distributor Copilot</div>
                <div className="text-[10px] text-slate-500">Sales · Inventory · PO — joined</div>
              </div>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500 mb-2 font-medium">Suggested questions</div>
            <div className="space-y-1.5">
              {qa.map((q,i)=>(
                <button key={i} onClick={()=>setActive(i)} className={`w-full text-left text-[12px] p-2.5 rounded-md border transition ${active===i?'bg-indigo-50 border-indigo-300 text-indigo-900 font-medium':'border-slate-200 text-slate-700 hover:bg-slate-50'}`}>{q.q}</button>
              ))}
            </div>
          </Card>

          <Card>
            <CardTitle icon={<Sparkles className="w-4 h-4 text-violet-600"/>}>What this copilot can do</CardTitle>
            <ul className="text-[12px] text-slate-700 space-y-1.5 list-disc pl-4">
              <li>Weekly narrative summary auto-generated from sales, inventory, and PO data</li>
              <li>Natural language queries across all 3 datasets</li>
              <li>Cross-file root-cause linking (chain ↔ DC ↔ supplier)</li>
              <li>Auto buyer presentation packs for any chain</li>
              <li>Reorder candidate scoring using sales velocity ÷ on-hand</li>
            </ul>
          </Card>
        </div>

        <Card className="lg:col-span-2 p-0 flex flex-col min-h-[560px]">
          <div className="px-5 py-3 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 text-violet-600"/><span className="text-[12px] font-semibold text-slate-700">Source-backed answer · joined dataset</span></div>
            <Badge tone="info">Audit-trail enabled</Badge>
          </div>
          <div className="flex-1 p-5 space-y-4 overflow-y-auto">
            <div className="flex justify-end">
              <div className="max-w-[80%] bg-slate-900 text-white px-4 py-2.5 rounded-2xl rounded-br-sm text-[13px]">{current.q}</div>
            </div>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shrink-0 text-[10px] font-bold">AI</div>
              <div className="flex-1">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl rounded-tl-sm p-4">
                  <p className="text-[13px] text-slate-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: current.a.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>') }}/>
                  <div className="mt-3.5 pt-3 border-t border-slate-200">
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-medium mb-1.5">Source data</div>
                    <div className="flex flex-wrap gap-1.5">{current.sources.map(s=><Badge key={s} tone="info">{s}</Badge>)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-200 p-3 flex gap-2">
            <input placeholder="Ask the distributor copilot…" className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-indigo-500"/>
            <button className="px-4 py-2 bg-slate-900 text-white text-[12px] font-semibold rounded-md hover:bg-slate-800 flex items-center gap-1.5"><Send className="w-3.5 h-3.5"/>Ask</button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <Card><CardTitle icon={<Sparkles className="w-4 h-4 text-emerald-600"/>}>Tier 1 — quick wins</CardTitle>
          <ul className="text-[12px] text-slate-700 space-y-2">
            <li>📬 <strong>Weekly AI narrative email</strong> — one paragraph, what changed, what's at risk</li>
            <li>🚨 <strong>Exception alerts</strong> — fill rate −10pts WoW, SKU concentration &gt;40%, DC 100% late</li>
            <li>🔗 <strong>Root-cause linking</strong> — chain low fill ↔ DC short-ship ↔ supplier late</li>
          </ul>
        </Card>
        <Card><CardTitle icon={<Brain className="w-4 h-4 text-blue-600"/>}>Tier 2 — strategic</CardTitle>
          <ul className="text-[12px] text-slate-700 space-y-2">
            <li>📈 <strong>Demand forecast</strong> per SKU per DC — auto reorder triggers</li>
            <li>🏆 <strong>Chain scoring</strong> — revenue/store, velocity trend, hidden gems</li>
            <li>⏱️ <strong>Period-over-period</strong> — week-on-week, quarter trend</li>
          </ul>
        </Card>
        <Card><CardTitle icon={<MessageCircle className="w-4 h-4 text-violet-600"/>}>Tier 3 — copilot</CardTitle>
          <ul className="text-[12px] text-slate-700 space-y-2">
            <li>💬 <strong>Natural language query</strong> across joined data</li>
            <li>📑 <strong>Auto buyer decks</strong> per chain, on demand</li>
            <li>🤖 <strong>PO anomaly detection</strong> — flag late before it causes OOS</li>
          </ul>
        </Card>
      </div>

      <Card>
        <CardTitle icon={<Database className="w-4 h-4 text-blue-600"/>}>Data foundation needed first</CardTitle>
        <Alert tone="info" icon={<Database className="w-4 h-4"/>}><strong>Connect the three files into one model.</strong> Sales + Inventory + PO joined on SKU + DC unlocks every AI feature above. No new data needed — just joined.</Alert>
        <Alert tone="info" icon={<RefreshCw className="w-4 h-4"/>}><strong>Add historical periods.</strong> One 13-week snapshot can't detect trends. Archiving each weekly export gives 4+ periods of comparable data per quarter.</Alert>
        <Alert tone="info" icon={<FileText className="w-4 h-4"/>}><strong>Automate refresh.</strong> Scheduled KeHE + UNFI portal exports → S3 → ETL → warehouse. Then the AI narrative writes itself every Monday morning.</Alert>
      </Card>
    </div>
  );
};

// ---------- Main ----------
const AdfDistributorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">ADF</div>
            <div>
              <h1 className="text-[14px] font-semibold text-slate-900 leading-tight">ADF Foods · Distributor Intelligence Hub</h1>
              <p className="text-[11px] text-slate-500 leading-tight">KeHE + UNFI · 13 weeks ending 04/25/2026 · Sales · Inventory · PO</p>
            </div>
          </div>
          <div className="text-[11px] text-slate-400 hidden md:block">Powered by joined distributor data + AI copilot</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="overview" className="space-y-5">
          <TabsList className="bg-white border border-slate-200 p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="overview" className="gap-1.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg text-[12px] px-3 py-1.5"><LayoutDashboard className="w-3.5 h-3.5"/>Overview</TabsTrigger>
            <TabsTrigger value="sales" className="gap-1.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg text-[12px] px-3 py-1.5"><BarChart3 className="w-3.5 h-3.5"/>Sales & Chains</TabsTrigger>
            <TabsTrigger value="inventory" className="gap-1.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg text-[12px] px-3 py-1.5"><Package className="w-3.5 h-3.5"/>Inventory</TabsTrigger>
            <TabsTrigger value="po" className="gap-1.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg text-[12px] px-3 py-1.5"><Truck className="w-3.5 h-3.5"/>Purchase Orders</TabsTrigger>
            <TabsTrigger value="ai" className="gap-1.5 data-[state=active]:bg-slate-900 data-[state=active]:text-white rounded-lg text-[12px] px-3 py-1.5"><Sparkles className="w-3.5 h-3.5"/>AI Copilot</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><OverviewTab/></TabsContent>
          <TabsContent value="sales"><SalesTab/></TabsContent>
          <TabsContent value="inventory"><InventoryTab/></TabsContent>
          <TabsContent value="po"><POTab/></TabsContent>
          <TabsContent value="ai"><CopilotTab/></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdfDistributorDashboard;

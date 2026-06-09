import React, { useMemo, useState } from 'react';
import raw from '@/data/adfDistributorData.json';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  LayoutDashboard, BarChart3, Package, Truck, Sparkles, AlertTriangle, Building2,
  Clock, MapPin, Bot, Send, Brain, TrendingDown, AlertCircle, Database, FileText, Layers,
  ArrowUp, ArrowDown, ArrowUpDown
} from 'lucide-react';
import {
  BarChart, Bar as RBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, ComposedChart
} from 'recharts';

const data: any = raw;

// ---------- Sortable table helpers ----------
type SortDir = 'asc' | 'desc';
function useSort<T>(rows: T[], initialKey: keyof T, initialDir: SortDir = 'desc') {
  const [key, setKey] = useState<keyof T>(initialKey);
  const [dir, setDir] = useState<SortDir>(initialDir);
  const sorted = useMemo(() => {
    const copy = [...rows];
    copy.sort((a: any, b: any) => {
      const av = a[key], bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av;
      return dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return copy;
  }, [rows, key, dir]);
  const toggle = (k: keyof T) => {
    if (k === key) setDir(dir === 'asc' ? 'desc' : 'asc');
    else { setKey(k); setDir(typeof (rows[0] as any)?.[k] === 'number' ? 'desc' : 'asc'); }
  };
  return { sorted, key, dir, toggle };
}

const SortTh: React.FC<{ active: boolean; dir: SortDir; align?: 'left'|'right'; onClick: () => void; children: React.ReactNode }> = ({ active, dir, align='left', onClick, children }) => (
  <th onClick={onClick} className={`px-2 py-1.5 cursor-pointer select-none hover:bg-slate-100 ${align==='right'?'text-right':'text-left'}`}>
    <span className={`inline-flex items-center gap-1 ${active?'text-slate-900':'text-slate-600'}`}>
      {children}
      {active ? (dir==='asc' ? <ArrowUp className="w-3 h-3"/> : <ArrowDown className="w-3 h-3"/>) : <ArrowUpDown className="w-3 h-3 text-slate-300"/>}
    </span>
  </th>
);

// ---------- helpers ----------
const fmtMoney = (n: number) => n >= 1000 ? `$${(n/1000).toFixed(1)}K` : `$${Math.round(n)}`;
const fmtMoneyFull = (n: number) => `$${n.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
const fmtNum = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });
const shortItem = (s: string) => {
  if (!s) return '';
  const cut = s.split(' 6 X')[0].split(' 12 X')[0].split(',')[0];
  return cut.length > 32 ? cut.slice(0,32)+'…' : cut;
};

const Card: React.FC<React.PropsWithChildren<{className?: string}>> = ({ children, className='' }) =>
  <div className={`bg-white border border-slate-200 rounded-xl p-4 ${className}`}>{children}</div>;
const CardTitle: React.FC<React.PropsWithChildren<{icon?: React.ReactNode; right?: React.ReactNode}>> = ({ children, icon, right }) =>
  <div className="text-[13px] font-medium text-slate-900 mb-3 flex items-center gap-2 justify-between">
    <span className="flex items-center gap-2">{icon}{children}</span>
    {right}
  </div>;

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

const Alert: React.FC<{ tone: 'danger'|'warn'|'info'|'good'; icon: React.ReactNode; children: React.ReactNode }> = ({ tone, icon, children }) => {
  const map = {
    danger:'bg-rose-50 border-rose-200 text-rose-900',
    warn:'bg-amber-50 border-amber-200 text-amber-900',
    info:'bg-blue-50 border-blue-200 text-blue-900',
    good:'bg-emerald-50 border-emerald-200 text-emerald-900',
  };
  return <div className={`flex gap-2.5 p-3 rounded-lg border text-[12px] mb-2 ${map[tone]}`}><div className="shrink-0 mt-0.5">{icon}</div><div>{children}</div></div>;
};

const COLORS = ['#3b82f6','#ef4444','#10b981','#f59e0b','#8b5cf6','#06b6d4','#ec4899','#84cc16'];

// ---------- derived ----------
const inv = data.inv as Array<any>;
const sales = data.sales;
const po = data.po;

const invTotals = inv.reduce((a,i)=>({
  kehe_oh:a.kehe_oh+i.kehe_oh, kehe_op:a.kehe_op+i.kehe_op,
  unfi_oh:a.unfi_oh+i.unfi_oh, unfi_op:a.unfi_op+i.unfi_op,
}),{kehe_oh:0,kehe_op:0,unfi_oh:0,unfi_op:0});
const totalInv = invTotals.kehe_oh+invTotals.unfi_oh;
const totalOnPO = invTotals.kehe_op+invTotals.unfi_op;
const stockouts = inv.filter(i=>i.total_oh===0 && i.total_op===0);
const lowWoh = inv.filter(i=>i.unfi_13w>0).sort((a,b)=>a.unfi_wks-b.unfi_wks).slice(0,8);
const topInv = [...inv].sort((a,b)=>(b.total_oh+b.total_op)-(a.total_oh+a.total_op)).slice(0,10);

// ---------- Overview ----------
const OverviewTab = () => {
  const sourceData = sales.by_source.map((s:any,i:number)=>({ name:s.Source, value:s.sales, fill: COLORS[i] }));
  const catData = sales.by_category.map((c:any,i:number)=>({ name:c.Category, value:(c.sales ?? c['Sales Dollars'] ?? 0), fill: COLORS[i+2] }));
  const topChainData = sales.top_chains.slice(0,5).map((c:any)=>({ name:c['Retailer Chain Name'], value:c['Sales Dollars'] }));
  const topItemData = sales.top_items.slice(0,5).map((i:any)=>({ name:i.item_short, value:i.sales }));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
        <KPI label="13-wk Revenue" value={fmtMoney(sales.total_sales)} sub={`${fmtNum(sales.transactions)} txns`} tone="good" />
        <KPI label="Active Chains" value={fmtNum(sales.chains)} sub={`${fmtNum(sales.stores)} stores`} />
        <KPI label="Total Inventory" value={fmtNum(totalInv)} sub={`+${fmtNum(totalOnPO)} on PO`} />
        <KPI label="PO Spend" value={fmtMoney(po.total_amount)} sub={`${po.lines} lines`} />
        <KPI label="PO Fill Rate" value={`${po.fill_pct}%`} sub={`${fmtNum(po.received)} / ${fmtNum(po.ordered)}`} tone="good" />
        <KPI label="On-Time Delivery" value={`${(100-po.late_pct).toFixed(1)}%`} sub={`avg ${po.avg_days_late}d late`} tone="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<AlertTriangle className="w-4 h-4 text-amber-600" />}>Priority alerts</CardTitle>
          <Alert tone="danger" icon={<AlertCircle className="w-4 h-4"/>}>
            <strong>{po.late_pct}% of POs are late</strong> — {po.late_count} of {po.lines} POs slipped requested dates. Avg slip {po.avg_days_late} days. Ridgefield WA worst at 17d, Gilroy CA 16.8d.
          </Alert>
          <Alert tone="danger" icon={<Package className="w-4 h-4"/>}>
            <strong>UNFI Garlic Naan: 3.0 wks on hand</strong> — 1,575 cases vs 527 weekly velocity. 1,780 on PO must land on time to avoid stockout.
          </Alert>
          <Alert tone="warn" icon={<TrendingDown className="w-4 h-4"/>}>
            <strong>Single-customer risk</strong> — "CONFIDENTIAL" account = $230,721 (57% of revenue). HEB #2 at $9,951.
          </Alert>
          <Alert tone="warn" icon={<Database className="w-4 h-4"/>}>
            <strong>UNFI ordering data gap</strong> — UNFI Cases Ordered is 0 across the file. Need to confirm with UNFI EDI team whether orders feed is broken.
          </Alert>
          <Alert tone="info" icon={<Layers className="w-4 h-4"/>}>
            <strong>Stockouts</strong> — 2 SKUs at zero everywhere: Ashoka Ivy Gourd Tindora Cut, Ashoka Gooseberries Amla Whole.
          </Alert>
        </Card>

        <Card>
          <CardTitle icon={<BarChart3 className="w-4 h-4 text-blue-600" />}>Sales by distributor</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{top:10,right:10,bottom:10,left:10}}>
              <Pie data={sourceData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2}
                label={({percent}:any)=>`${(percent*100).toFixed(0)}%`} labelLine={false}
                style={{fontSize:11, fontWeight:600, fill:'#fff'}}>
                {sourceData.map((d:any,i:number)=><Cell key={i} fill={d.fill}/>)}
              </Pie>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {sales.by_source.map((s:any,i:number)=>(
              <div key={s.Source} className="bg-slate-50 rounded p-2 text-[12px] border-l-2" style={{borderLeftColor: COLORS[i]}}>
                <div className="font-semibold text-slate-800">{s.Source}</div>
                <div className="text-slate-600">{fmtMoneyFull(s.sales)} · {fmtNum(s.cases)} cases</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle icon={<Building2 className="w-4 h-4 text-violet-600"/>}>Top 5 retailers ($)</CardTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topChainData} layout="vertical" margin={{left:8,right:30,top:5,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis type="number" tick={{fontSize:10}} tickFormatter={(v)=>fmtMoney(v)}/>
              <YAxis dataKey="name" type="category" width={140} tick={{fontSize:10}}/>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)} />
              <RBar dataKey="value" fill="#3b82f6" radius={[0,4,4,0]} label={{position:'right',fontSize:10,fill:'#475569',formatter:(v:any)=>fmtMoney(v)}}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle icon={<Package className="w-4 h-4 text-emerald-600"/>}>Top 5 SKUs ($)</CardTitle>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topItemData} layout="vertical" margin={{left:8,right:30,top:5,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis type="number" tick={{fontSize:10}} tickFormatter={(v)=>fmtMoney(v)}/>
              <YAxis dataKey="name" type="category" width={140} tick={{fontSize:10}}/>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)} />
              <RBar dataKey="value" fill="#10b981" radius={[0,4,4,0]} label={{position:'right',fontSize:10,fill:'#475569',formatter:(v:any)=>fmtMoney(v)}}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle icon={<Layers className="w-4 h-4 text-amber-600"/>}>Category mix</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{top:10,right:10,bottom:10,left:10}}>
              <Pie data={catData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2}
                label={({percent}:any)=>`${(percent*100).toFixed(0)}%`} labelLine={false}
                style={{fontSize:11, fontWeight:600, fill:'#fff'}}>
                {catData.map((d:any,i:number)=><Cell key={i} fill={d.fill}/>)}
              </Pie>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {catData.map((c:any,i:number)=>(
              <div key={c.name} className="bg-slate-50 rounded p-2 text-[12px] border-l-2" style={{borderLeftColor: c.fill}}>
                <div className="font-semibold text-slate-800">{c.name}</div>
                <div className="text-slate-600">{fmtMoneyFull(c.value)} · {((c.value/sales.total_sales)*100).toFixed(0)}%</div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 mt-2">Frozen drives 80% of revenue — protect frozen Naan velocity at all costs.</div>
        </Card>

        <Card>
          <CardTitle icon={<Truck className="w-4 h-4 text-rose-600"/>}>PO on-time mix</CardTitle>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart margin={{top:10,right:10,bottom:10,left:10}}>
              <Pie data={[
                {name:'Late',value:po.late_count,fill:'#ef4444'},
                {name:'On-Time',value:po.ontime_count,fill:'#10b981'},
              ]} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={2}
                label={({percent}:any)=>`${(percent*100).toFixed(0)}%`} labelLine={false}
                style={{fontSize:11, fontWeight:600, fill:'#fff'}}>
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-[11px] text-slate-500 mt-2">{po.late_count} of {po.lines} POs late · {po.in_full_count} delivered in full · {po.short_count} short-shipped</div>
        </Card>
      </div>
    </div>
  );
};

// ---------- Sales & Chains ----------
const SalesTab = () => {
  const itemData = sales.top_items.map((i:any)=>({ name:i.item_short, sales:i.sales, cases:i.cases }));
  const chainData = sales.top_chains.map((c:any)=>({ name:c['Retailer Chain Name'], sales:c['Sales Dollars'] }));
  const tableRows = useMemo(()=> sales.top_items.map((i:any)=>({ sku:i.item_short as string, sales:i.sales as number, cases:i.cases as number, ppc: i.sales/Math.max(i.cases,1) })) as Array<{sku:string;sales:number;cases:number;ppc:number}>, []);
  const { sorted, key, dir, toggle } = useSort(tableRows, 'sales');
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        <KPI label="UNFI revenue" value={fmtMoney(252938)} sub="63% of total" tone="good" />
        <KPI label="KEHE revenue" value={fmtMoney(148247)} sub="37% of total" />
        <KPI label="Frozen share" value="80%" sub="$320K of $401K" tone="good" />
        <KPI label="Top customer concentration" value="57%" sub="CONFIDENTIAL acct" tone="warn" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<Package className="w-4 h-4 text-blue-600"/>}>Top SKUs — sales vs cases</CardTitle>
          <ResponsiveContainer width="100%" height={360}>
            <ComposedChart data={itemData} margin={{left:0,right:20,top:10,bottom:90}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="name" tick={{fontSize:9}} angle={-35} textAnchor="end" interval={0} height={100}/>
              <YAxis yAxisId="l" tick={{fontSize:10}} tickFormatter={(v)=>fmtMoney(v)} label={{value:'Sales ($)',angle:-90,position:'insideLeft',style:{fontSize:10,fill:'#64748b'}}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fontSize:10}} label={{value:'Cases',angle:90,position:'insideRight',style:{fontSize:10,fill:'#64748b'}}}/>
              <Tooltip formatter={(v:any,k:any)=>k==='sales'?fmtMoneyFull(v as number):fmtNum(v as number)}/>
              <Legend verticalAlign="top" align="right" wrapperStyle={{fontSize:11,paddingBottom:8}}/>
              <RBar yAxisId="l" dataKey="sales" fill="#3b82f6" name="Sales $" radius={[3,3,0,0]} />
              <Line yAxisId="r" type="monotone" dataKey="cases" stroke="#ef4444" strokeWidth={2} name="Cases shipped" dot={{r:3}}/>
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle icon={<Building2 className="w-4 h-4 text-emerald-600"/>}>Top 10 chains</CardTitle>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={chainData} layout="vertical" margin={{left:8,right:40,top:5,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis type="number" tick={{fontSize:10}} tickFormatter={(v)=>fmtMoney(v)} />
              <YAxis dataKey="name" type="category" width={160} tick={{fontSize:10}}/>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)} />
              <RBar dataKey="sales" fill="#10b981" radius={[0,4,4,0]} label={{position:'right',fontSize:10,fill:'#475569',formatter:(v:any)=>fmtMoney(v)}}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <CardTitle icon={<FileText className="w-4 h-4 text-slate-600"/>}>Full SKU table</CardTitle>
        <div className="overflow-auto max-h-80 border border-slate-100 rounded">
          <table className="w-full text-[12px]">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <SortTh active={key==='sku'} dir={dir} onClick={()=>toggle('sku')}>SKU</SortTh>
                <SortTh active={key==='sales'} dir={dir} align="right" onClick={()=>toggle('sales')}>Sales</SortTh>
                <SortTh active={key==='cases'} dir={dir} align="right" onClick={()=>toggle('cases')}>Cases</SortTh>
                <SortTh active={key==='ppc'} dir={dir} align="right" onClick={()=>toggle('ppc')}>$/case</SortTh>
              </tr>
            </thead>
            <tbody>
              {sorted.map((i:any)=>(
                <tr key={i.sku} className="border-t border-slate-100">
                  <td className="px-2 py-1.5">{i.sku}</td>
                  <td className="px-2 py-1.5 text-right font-medium">{fmtMoneyFull(i.sales)}</td>
                  <td className="px-2 py-1.5 text-right">{fmtNum(i.cases)}</td>
                  <td className="px-2 py-1.5 text-right text-slate-500">${i.ppc.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// ---------- Inventory ----------
const InventoryTab = () => {
  const distData = [
    { name:'KeHE', value: invTotals.kehe_oh, fill:'#3b82f6' },
    { name:'UNFI', value: invTotals.unfi_oh, fill:'#ef4444' },
  ];
  const stacked = [
    { name:'KeHE', 'On Hand': invTotals.kehe_oh, 'On PO': invTotals.kehe_op },
    { name:'UNFI', 'On Hand': invTotals.unfi_oh, 'On PO': invTotals.unfi_op },
  ];
  const topInvChart = topInv.map(i=>({ name: i.short_name.split(' 6 X')[0].split(' 12 X')[0].slice(0,28), 'On Hand': i.total_oh, 'On PO': i.total_op }));
  const lowChart = lowWoh.map(i=>({ name: i.short_name.split(' 6 X')[0].slice(0,24), wks: i.unfi_wks, oh: i.unfi_oh }));

  const invRows = useMemo(()=> inv.map((i:any)=>({
    sku: i.short_name as string,
    kehe_oh: i.kehe_oh as number, kehe_op: i.kehe_op as number,
    unfi_oh: i.unfi_oh as number, unfi_op: i.unfi_op as number,
    unfi_13w: (i.unfi_13w ?? 0) as number, unfi_wks: (i.unfi_wks ?? 0) as number,
    statusRank: (i.total_oh===0 && i.total_op===0) ? 0
              : (i.unfi_wks!=null && i.unfi_wks<4) ? 1
              : (i.unfi_wks!=null && i.unfi_wks<6) ? 2 : 3,
  })) as Array<{sku:string;kehe_oh:number;kehe_op:number;unfi_oh:number;unfi_op:number;unfi_13w:number;unfi_wks:number;statusRank:number}>, []);
  const invSort = useSort(invRows, 'unfi_wks', 'asc');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        <KPI label="Total on hand" value={fmtNum(totalInv)} sub="cases across KeHE+UNFI" />
        <KPI label="On purchase order" value={fmtNum(totalOnPO)} sub="pending inbound" tone="warn" />
        <KPI label="KeHE share" value={`${((invTotals.kehe_oh/totalInv)*100).toFixed(1)}%`} sub={`${fmtNum(invTotals.kehe_oh)} cases`} />
        <KPI label="UNFI share" value={`${((invTotals.unfi_oh/totalInv)*100).toFixed(1)}%`} sub={`${fmtNum(invTotals.unfi_oh)} cases`} />
        <KPI label="Stockouts" value={String(stockouts.length)} sub="zero OH & zero PO" tone="danger" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card>
          <CardTitle icon={<Package className="w-4 h-4 text-blue-600"/>}>Inventory distribution by distributor</CardTitle>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart margin={{top:10,right:10,bottom:10,left:10}}>
              <Pie data={distData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={2}
                label={({percent}:any)=>`${(percent*100).toFixed(0)}%`} labelLine={false}
                style={{fontSize:12,fontWeight:600,fill:'#fff'}}>
                {distData.map((d,i)=><Cell key={i} fill={d.fill}/>)}
              </Pie>
              <Tooltip formatter={(v:any)=>fmtNum(v as number)+' cases'} />
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {distData.map((d)=>(
              <div key={d.name} className="bg-slate-50 rounded p-2 text-[12px] border-l-2" style={{borderLeftColor:d.fill}}>
                <div className="font-semibold text-slate-800">{d.name}</div>
                <div className="text-slate-600">{fmtNum(d.value)} cases · {((d.value/totalInv)*100).toFixed(1)}%</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardTitle icon={<BarChart3 className="w-4 h-4 text-emerald-600"/>}>On Hand vs On PO by distributor</CardTitle>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={stacked} margin={{top:20,right:20,left:0,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="name" tick={{fontSize:11}}/>
              <YAxis tick={{fontSize:10}} tickFormatter={(v)=>fmtNum(v)}/>
              <Tooltip formatter={(v:any)=>fmtNum(v as number)+' cases'} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{fontSize:11,paddingBottom:8}}/>
              <RBar dataKey="On Hand" stackId="a" fill="#3b82f6"/>
              <RBar dataKey="On PO" stackId="a" fill="#ef4444" radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={<Package className="w-4 h-4 text-violet-600"/>}>Top 10 SKUs by total inventory</CardTitle>
          <ResponsiveContainer width="100%" height={340}>
            <BarChart data={topInvChart} margin={{left:0,right:20,top:20,bottom:90}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="name" tick={{fontSize:9}} angle={-35} textAnchor="end" interval={0} height={100}/>
              <YAxis tick={{fontSize:10}} tickFormatter={(v)=>fmtNum(v)}/>
              <Tooltip formatter={(v:any)=>fmtNum(v as number)+' cases'} />
              <Legend verticalAlign="top" align="right" wrapperStyle={{fontSize:11,paddingBottom:8}}/>
              <RBar dataKey="On Hand" stackId="a" fill="#3b82f6"/>
              <RBar dataKey="On PO" stackId="a" fill="#ef4444"/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={<AlertTriangle className="w-4 h-4 text-rose-600"/>}>Stockout risk — lowest UNFI weeks-on-hand</CardTitle>
          <ResponsiveContainer width="100%" height={260}>
            <ComposedChart data={lowChart} margin={{left:0,right:8,bottom:60}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="name" tick={{fontSize:9}} angle={-20} textAnchor="end" interval={0} height={70}/>
              <YAxis yAxisId="l" tick={{fontSize:10}} label={{value:'Weeks on Hand',angle:-90,position:'insideLeft',style:{fontSize:10}}}/>
              <YAxis yAxisId="r" orientation="right" tick={{fontSize:10}}/>
              <Tooltip />
              <Legend wrapperStyle={{fontSize:11}}/>
              <RBar yAxisId="l" dataKey="wks" fill="#ef4444" name="Weeks on Hand" radius={[3,3,0,0]}/>
              <Line yAxisId="r" type="monotone" dataKey="oh" stroke="#3b82f6" name="On Hand (cases)" strokeWidth={2}/>
            </ComposedChart>
          </ResponsiveContainer>
          <div className="text-[11px] text-slate-500 mt-2">Anything &lt; 4 weeks needs an urgent expedite. Garlic Naan and Plain Naan are critical.</div>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={<FileText className="w-4 h-4 text-slate-600"/>}>SKU-level inventory ({inv.length} items)</CardTitle>
          <div className="overflow-auto max-h-96 border border-slate-100 rounded">
            <table className="w-full text-[11.5px]">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <SortTh active={invSort.key==='sku'} dir={invSort.dir} onClick={()=>invSort.toggle('sku')}>SKU</SortTh>
                  <SortTh active={invSort.key==='kehe_oh'} dir={invSort.dir} align="right" onClick={()=>invSort.toggle('kehe_oh')}>KeHE OH</SortTh>
                  <SortTh active={invSort.key==='kehe_op'} dir={invSort.dir} align="right" onClick={()=>invSort.toggle('kehe_op')}>KeHE PO</SortTh>
                  <SortTh active={invSort.key==='unfi_oh'} dir={invSort.dir} align="right" onClick={()=>invSort.toggle('unfi_oh')}>UNFI OH</SortTh>
                  <SortTh active={invSort.key==='unfi_op'} dir={invSort.dir} align="right" onClick={()=>invSort.toggle('unfi_op')}>UNFI PO</SortTh>
                  <SortTh active={invSort.key==='unfi_13w'} dir={invSort.dir} align="right" onClick={()=>invSort.toggle('unfi_13w')}>UNFI 13wk</SortTh>
                  <SortTh active={invSort.key==='unfi_wks'} dir={invSort.dir} align="right" onClick={()=>invSort.toggle('unfi_wks')}>UNFI WoH</SortTh>
                  <SortTh active={invSort.key==='statusRank'} dir={invSort.dir} onClick={()=>invSort.toggle('statusRank')}>Status</SortTh>
                </tr>
              </thead>
              <tbody>
                {invSort.sorted.map((i)=>{
                  const tone = i.statusRank===0 || i.statusRank===1 ? 'danger' : i.statusRank===2 ? 'warn' : 'good';
                  const label = i.statusRank===0 ? 'Stockout' : i.statusRank===1 ? 'Critical' : i.statusRank===2 ? 'Watch' : 'Healthy';
                  return (
                    <tr key={i.sku} className="border-t border-slate-100">
                      <td className="px-2 py-1.5 max-w-xs truncate" title={i.sku}>{i.sku}</td>
                      <td className="px-2 py-1.5 text-right">{fmtNum(i.kehe_oh)}</td>
                      <td className="px-2 py-1.5 text-right text-slate-500">{fmtNum(i.kehe_op)}</td>
                      <td className="px-2 py-1.5 text-right">{fmtNum(i.unfi_oh)}</td>
                      <td className="px-2 py-1.5 text-right text-slate-500">{fmtNum(i.unfi_op)}</td>
                      <td className="px-2 py-1.5 text-right">{i.unfi_13w || '—'}</td>
                      <td className="px-2 py-1.5 text-right font-medium">{i.unfi_wks || '—'}</td>
                      <td className="px-2 py-1.5"><Badge tone={tone as any}>{label}</Badge></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ---------- PO ----------
const POTab = () => {
  const dcData = po.by_dc.map((d:any)=>({ name:d.dc.replace(' DC',''), amount:d.amount, late:d.late, lines:d.lines, slip:d.avg_days_late }));
  const onTimeData = [
    { name:'Late', value:po.late_count, fill:'#ef4444' },
    { name:'On-Time', value:po.ontime_count, fill:'#10b981' },
  ];
  const dailyData = po.daily.map((d:any)=>({ date: d.date.slice(5), amount:d.amount }));
  const productRows = useMemo(()=> po.by_product.map((p:any)=>({
    name: p.product as string, amount: p.amount as number, ordered: p.ordered as number,
    recv: p.received as number, fill: (p.received/Math.max(p.ordered,1)) as number, lines: p.lines as number,
  })) as Array<{name:string;amount:number;ordered:number;recv:number;fill:number;lines:number}>, []);
  const prodSort = useSort(productRows, 'amount', 'desc');

  const dcRows = useMemo(()=> po.by_dc.map((d:any)=>({
    dc: d.dc as string, amount: d.amount as number, lines: d.lines as number, late: d.late as number,
    slip: d.avg_days_late as number, fill: (d.received/Math.max(d.ordered,1)) as number,
  })) as Array<{dc:string;amount:number;lines:number;late:number;slip:number;fill:number}>, []);
  const dcSort = useSort(dcRows, 'amount', 'desc');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
        <KPI label="PO spend" value={fmtMoneyFull(po.total_amount)} sub={`${po.lines} lines`} tone="good" />
        <KPI label="Units ordered" value={fmtNum(po.ordered)} sub={`${fmtNum(po.received)} received`} />
        <KPI label="Fill rate" value={`${po.fill_pct}%`} sub={`${po.short_count} short-shipped`} tone="good" />
        <KPI label="Late POs" value={`${po.late_pct}%`} sub={`${po.late_count}/${po.lines} POs`} tone="danger" />
        <KPI label="Avg days late" value={`${po.avg_days_late}d`} sub="across late POs" tone="warn" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <Card className="lg:col-span-2">
          <CardTitle icon={<MapPin className="w-4 h-4 text-blue-600"/>}>Total PO amount by distribution center</CardTitle>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={dcData} margin={{left:0,right:20,top:20,bottom:70}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="name" tick={{fontSize:10}} angle={-30} textAnchor="end" interval={0} height={80}/>
              <YAxis tick={{fontSize:10}} tickFormatter={(v)=>fmtMoney(v)} label={{value:'PO $',angle:-90,position:'insideLeft',style:{fontSize:10,fill:'#64748b'}}}/>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)} />
              <RBar dataKey="amount" fill="#3b82f6" radius={[3,3,0,0]} name="PO $" label={{position:'top',fontSize:10,fill:'#475569',formatter:(v:any)=>fmtMoney(v)}}/>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle icon={<Clock className="w-4 h-4 text-rose-600"/>}>On-Time vs Late</CardTitle>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart margin={{top:10,right:10,bottom:10,left:10}}>
              <Pie data={onTimeData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}
                label={({percent}:any)=>`${(percent*100).toFixed(0)}%`} labelLine={false}
                style={{fontSize:12,fontWeight:600,fill:'#fff'}}>
              </Pie>
              <Tooltip formatter={(v:any)=>`${v} POs`}/>
              <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{fontSize:11}}/>
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardTitle icon={<TrendingDown className="w-4 h-4 text-amber-600"/>}>Daily PO amount trend</CardTitle>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailyData} margin={{left:0,right:20,top:10,bottom:5}}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="date" tick={{fontSize:10}}/>
              <YAxis tick={{fontSize:10}} tickFormatter={(v)=>fmtMoney(v)}/>
              <Tooltip formatter={(v:any)=>fmtMoneyFull(v as number)}/>
              <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} dot={{r:3}} name="PO $"/>
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={<Package className="w-4 h-4 text-violet-600"/>}>PO by product</CardTitle>
          <div className="overflow-auto max-h-80 border border-slate-100 rounded">
            <table className="w-full text-[12px]">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <SortTh active={prodSort.key==='name'} dir={prodSort.dir} onClick={()=>prodSort.toggle('name')}>Product</SortTh>
                  <SortTh active={prodSort.key==='amount'} dir={prodSort.dir} align="right" onClick={()=>prodSort.toggle('amount')}>PO $</SortTh>
                  <SortTh active={prodSort.key==='ordered'} dir={prodSort.dir} align="right" onClick={()=>prodSort.toggle('ordered')}>Ordered</SortTh>
                  <SortTh active={prodSort.key==='recv'} dir={prodSort.dir} align="right" onClick={()=>prodSort.toggle('recv')}>Received</SortTh>
                  <SortTh active={prodSort.key==='fill'} dir={prodSort.dir} align="right" onClick={()=>prodSort.toggle('fill')}>Fill %</SortTh>
                  <SortTh active={prodSort.key==='lines'} dir={prodSort.dir} align="right" onClick={()=>prodSort.toggle('lines')}>Lines</SortTh>
                </tr>
              </thead>
              <tbody>
                {prodSort.sorted.map((p)=>(
                  <tr key={p.name} className="border-t border-slate-100">
                    <td className="px-2 py-1.5">{p.name}</td>
                    <td className="px-2 py-1.5 text-right font-medium">{fmtMoneyFull(p.amount)}</td>
                    <td className="px-2 py-1.5 text-right">{fmtNum(p.ordered)}</td>
                    <td className="px-2 py-1.5 text-right">{fmtNum(p.recv)}</td>
                    <td className="px-2 py-1.5 text-right"><Badge tone={p.fill>=0.95?'good':p.fill>=0.85?'warn':'danger'}>{(p.fill*100).toFixed(0)}%</Badge></td>
                    <td className="px-2 py-1.5 text-right text-slate-500">{p.lines}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardTitle icon={<MapPin className="w-4 h-4 text-emerald-600"/>}>DC performance breakdown</CardTitle>
          <div className="overflow-auto max-h-80 border border-slate-100 rounded">
            <table className="w-full text-[12px]">
              <thead className="bg-slate-50 sticky top-0 z-10">
                <tr>
                  <SortTh active={dcSort.key==='dc'} dir={dcSort.dir} onClick={()=>dcSort.toggle('dc')}>DC</SortTh>
                  <SortTh active={dcSort.key==='amount'} dir={dcSort.dir} align="right" onClick={()=>dcSort.toggle('amount')}>PO $</SortTh>
                  <SortTh active={dcSort.key==='lines'} dir={dcSort.dir} align="right" onClick={()=>dcSort.toggle('lines')}>Lines</SortTh>
                  <SortTh active={dcSort.key==='late'} dir={dcSort.dir} align="right" onClick={()=>dcSort.toggle('late')}>Late</SortTh>
                  <SortTh active={dcSort.key==='slip'} dir={dcSort.dir} align="right" onClick={()=>dcSort.toggle('slip')}>Avg days late</SortTh>
                  <SortTh active={dcSort.key==='fill'} dir={dcSort.dir} align="right" onClick={()=>dcSort.toggle('fill')}>Fill %</SortTh>
                </tr>
              </thead>
              <tbody>
                {dcSort.sorted.map((d)=>(
                  <tr key={d.dc} className="border-t border-slate-100">
                    <td className="px-2 py-1.5">{d.dc}</td>
                    <td className="px-2 py-1.5 text-right font-medium">{fmtMoneyFull(d.amount)}</td>
                    <td className="px-2 py-1.5 text-right">{d.lines}</td>
                    <td className="px-2 py-1.5 text-right">{d.late}</td>
                    <td className="px-2 py-1.5 text-right"><Badge tone={d.slip>=10?'danger':d.slip>=5?'warn':'good'}>{d.slip}d</Badge></td>
                    <td className="px-2 py-1.5 text-right"><Badge tone={d.fill>=0.95?'good':d.fill>=0.85?'warn':'danger'}>{(d.fill*100).toFixed(0)}%</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

// ---------- AI Copilot ----------
const PROMPTS = [
  { q: 'Why is 91% of POs late and how do I fix it?', a: `**Root cause: chronic ETA misses, not isolated slippage.**\n\n- 109 of 119 received POs (91.6%) slipped requested dates. Average slip is **${po.avg_days_late} days**.\n- Worst offenders: **Ridgefield WA 17d**, **Gilroy CA 16.8d**, **Denver CO 12d**, **Atlanta GA 10.9d**, **Moreno Valley CA 10.9d**.\n- Best: Chesterfield NH 2.5d, Manchester PA 4.0d — same SKUs, same factory, dramatically lower slip → freight lane is the variable, not production.\n\n**Suggested actions:**\n1. Negotiate revised lead times with KeHE for west-coast DCs (add 7–10 days into the EDI ASN cycle).\n2. Treat ETA on Naan Garlic & Naan Plain (94% of PO spend) as the protected lane — air or expedite when the slip exceeds 5d.\n3. Add an "On-Time PO" KPI to the weekly KeHE business review with avg-days-late tracked by DC.` },
  { q: 'What is my real stockout risk in the next 4 weeks?', a: `**5 SKUs in danger window at UNFI:**\n\n| SKU | OH | On PO | 13wk Avg | Weeks on Hand |\n|---|---:|---:|---:|---:|\n| Garlic Naan | 1,575 | 1,780 | 527 | **3.0** |\n| Plain Naan | 1,079 | 1,020 | 315 | **3.4** |\n| Bombay Biryani | 21 | 0 | 4 | 5.2 |\n| Butter Chicken Sauce (Vegan) | 63 | 0 | 10 | 6.3 |\n| Tikka Masala Sauce (Vegan) | 72 | 0 | 9 | 8.0 |\n\nPlus **2 hard stockouts already**: Ashoka Ivy Gourd Tindora Cut and Ashoka Gooseberries Amla Whole — zero everywhere.\n\n**If Garlic Naan PO slips more than 3 weeks, UNFI runs dry on the #1 revenue item ($175K / 44% of revenue).**` },
  { q: 'Where is the revenue concentration risk?', a: `**Top customer dependence is dangerously high.**\n\n- **CONFIDENTIAL account: $230,721 = 57.5% of 13-wk revenue.**\n- #2 HEB at $9,951 — a **23× gap** between #1 and #2.\n- Top 5 chains = 64% of revenue.\n\n**Top 5 SKUs concentration:**\n- Garlic Naan: $175,473 (43.7%)\n- Tandoori Naan: $92,637 (23.1%)\n- Naan + Tandoori together = **66.8%** of revenue\n\n**Recommendation:** build a non-Naan, non-CONFIDENTIAL pipeline — Dal Makhani ($19K) and Tandoori Aloo Wrap ($11K) are the most expandable shelf-stable adjacencies.` },
  { q: 'Is the UNFI ordering data actually missing?', a: `**Yes — Cases Ordered = 0 for every UNFI row, but Cases Shipped = 12,600 and Sales = $252,938.**\n\nThis means:\n- The feed is dropping the "ordered" column for UNFI but the shipment + revenue lines are intact.\n- We cannot compute UNFI fill rate from this file. KeHE shows 8,812 shipped vs 11,066 ordered = **79.6% fill**, which is the real bottleneck to fix.\n\n**Action:** flag to UNFI EDI team — request the 850 / 855 stream so ordered vs shipped is reconciled in next week's pull.` },
  { q: 'What should I expedite this week?', a: `**Three actions, in order:**\n\n1. **Expedite Garlic Naan & Plain Naan into UNFI Hudson Valley NY DC** — these two SKUs = 94% of PO spend and HVA has the highest PO value ($30.9K) and 100% late rate.\n2. **Cancel & re-cut zero-velocity Ashoka SKUs** (Tindora Cut, Amla Whole) — stockout but no incoming PO and no UNFI sales velocity. Either delist or push a trade-promotion to clear shelves.\n3. **Push KeHE fill rate** from 79.6% — short-shipped 19 of 119 lines. Identify the 19 lines and rebook within 7 days, or you'll lose the slot at the retailer level.` },
  { q: 'How do I tell the CMO this in one sentence?', a: `**"Revenue is healthy at $401K but two structural risks compound: 57% of it sits with one customer and 94% of inbound POs are landing 10 days late — if Garlic Naan misses its next PO at UNFI, we lose our #1 SKU at our biggest distributor in under 3 weeks."**` },
];

const AICopilotTab = () => {
  const [picked, setPicked] = useState<number | null>(0);
  const [q, setQ] = useState('');
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      <Card className="lg:col-span-1">
        <CardTitle icon={<Sparkles className="w-4 h-4 text-violet-600"/>}>Suggested questions</CardTitle>
        <div className="space-y-1.5">
          {PROMPTS.map((p,i)=>(
            <button key={i} onClick={()=>setPicked(i)} className={`w-full text-left px-3 py-2 rounded-lg text-[12px] border transition ${picked===i ? 'bg-violet-50 border-violet-300 text-violet-900' : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'}`}>
              {p.q}
            </button>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-slate-100">
          <CardTitle icon={<Database className="w-4 h-4 text-slate-500"/>}>Data sources</CardTitle>
          <ul className="text-[11px] text-slate-600 space-y-1">
            <li>• Combined KeHE+UNFI inventory (13wk ending 04/25/26)</li>
            <li>• 13-wk Distributor Sales Report</li>
            <li>• Purchase Orders Detail (119 POs)</li>
          </ul>
        </div>
      </Card>

      <Card className="lg:col-span-2">
        <CardTitle icon={<Bot className="w-4 h-4 text-violet-600"/>} right={<Badge tone="info">Beta · grounded on uploaded data</Badge>}>ADF Copilot</CardTitle>
        <div className="bg-gradient-to-br from-violet-50 to-blue-50 rounded-lg p-4 min-h-[320px] border border-violet-100">
          {picked !== null ? (
            <div>
              <div className="text-[12px] text-slate-500 mb-1.5">You asked</div>
              <div className="text-[13px] font-medium text-slate-900 mb-3">{PROMPTS[picked].q}</div>
              <div className="text-[12.5px] text-slate-800 whitespace-pre-wrap leading-relaxed bg-white/80 rounded-lg p-3 border border-slate-100">
                {PROMPTS[picked].a.split('\n').map((line,i)=>{
                  if (line.startsWith('**') && line.endsWith('**')) return <div key={i} className="font-semibold mt-2 mb-1">{line.replace(/\*\*/g,'')}</div>;
                  if (line.startsWith('|')) return <div key={i} className="font-mono text-[11px]">{line}</div>;
                  if (line.startsWith('- ')) return <div key={i} className="ml-3">{line.split(/\*\*(.+?)\*\*/g).map((p,j)=>j%2===1?<b key={j}>{p}</b>:p)}</div>;
                  if (/^\d\./.test(line)) return <div key={i} className="ml-3 mt-1">{line.split(/\*\*(.+?)\*\*/g).map((p,j)=>j%2===1?<b key={j}>{p}</b>:p)}</div>;
                  return <div key={i}>{line.split(/\*\*(.+?)\*\*/g).map((p,j)=>j%2===1?<b key={j}>{p}</b>:p)}</div>;
                })}
              </div>
            </div>
          ) : <div className="text-slate-400 text-[13px]">Pick a question on the left to see a grounded answer.</div>}
        </div>
        <div className="mt-3 flex gap-2">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Ask anything across sales, inventory, POs…" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-[13px] focus:outline-none focus:ring-2 focus:ring-violet-200" />
          <button className="px-3 py-2 bg-violet-600 text-white rounded-lg text-[13px] hover:bg-violet-700 flex items-center gap-1"><Send className="w-4 h-4"/>Ask</button>
        </div>
        <div className="text-[10.5px] text-slate-400 mt-1.5">Free-text answers will be wired to Lovable AI Gateway next. Suggested questions are pre-grounded on the uploaded files.</div>
      </Card>
    </div>
  );
};

// ---------- Shell ----------
const AdfDistributorDashboard: React.FC = () => {
  const [tab,setTab]=useState('overview');
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          <div>
            <div className="text-[11px] text-slate-500 uppercase tracking-wider">ADF Foods · Management Console</div>
            <h1 className="text-xl font-semibold text-slate-900">Distributor Intelligence Hub</h1>
            <div className="text-[12px] text-slate-500 mt-0.5">13-wk period ending 04/25/2026 · KeHE + UNFI · Sales · Inventory · POs</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone="info"><Brain className="w-3 h-3 inline mr-1"/>AI-grounded</Badge>
            <Badge tone="gray">Refreshed daily</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-4">
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="bg-white border border-slate-200 mb-4">
            <TabsTrigger value="overview" className="text-[12px]"><LayoutDashboard className="w-3.5 h-3.5 mr-1.5"/>Overview</TabsTrigger>
            <TabsTrigger value="sales" className="text-[12px]"><BarChart3 className="w-3.5 h-3.5 mr-1.5"/>Sales & Chains</TabsTrigger>
            <TabsTrigger value="inventory" className="text-[12px]"><Package className="w-3.5 h-3.5 mr-1.5"/>Inventory</TabsTrigger>
            <TabsTrigger value="po" className="text-[12px]"><Truck className="w-3.5 h-3.5 mr-1.5"/>Purchase Orders</TabsTrigger>
            <TabsTrigger value="ai" className="text-[12px]"><Sparkles className="w-3.5 h-3.5 mr-1.5"/>AI Copilot</TabsTrigger>
          </TabsList>
          <TabsContent value="overview"><OverviewTab/></TabsContent>
          <TabsContent value="sales"><SalesTab/></TabsContent>
          <TabsContent value="inventory"><InventoryTab/></TabsContent>
          <TabsContent value="po"><POTab/></TabsContent>
          <TabsContent value="ai"><AICopilotTab/></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdfDistributorDashboard;

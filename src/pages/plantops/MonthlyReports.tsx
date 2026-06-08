import React, { useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useManpower, useWastage } from './store';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Download } from 'lucide-react';

function monthKey(d: string) { return d.slice(0, 7); }

export default function MonthlyReportsPage() {
  const { data: mp } = useManpower();
  const { data: ws } = useWastage();
  const months = useMemo(() => Array.from(new Set([...mp, ...ws].map(e => monthKey(e.date)))).sort().reverse(), [mp, ws]);
  const [month, setMonth] = useState(months[0] || new Date().toISOString().slice(0,7));

  const mpMonth = mp.filter(e => monthKey(e.date) === month);
  const wsMonth = ws.filter(e => monthKey(e.date) === month);

  const totalMp = mpMonth.reduce((s,e)=>s+e.total_manpower,0);
  const totalMt = +mpMonth.reduce((s,e)=>s+e.output_mt,0).toFixed(2);
  const avgMpm = totalMp ? +(totalMt/totalMp).toFixed(3) : 0;
  const avgActual = wsMonth.length ? +(wsMonth.reduce((s,e)=>s+e.actual_wastage_percent,0)/wsMonth.length).toFixed(2) : 0;
  const critical = wsMonth.filter(e => e.wastage_status === 'Critical').length;

  const dailyTrend = useMemo(() => {
    const m = new Map<string, any>();
    mpMonth.forEach(e => {
      const cur = m.get(e.date) || { date: e.date, manpower: 0, mt: 0, waste: 0 };
      cur.manpower += e.total_manpower; cur.mt += e.output_mt; m.set(e.date, cur);
    });
    wsMonth.forEach(e => {
      const cur = m.get(e.date) || { date: e.date, manpower: 0, mt: 0, waste: 0 };
      cur.waste += e.actual_wastage_percent; m.set(e.date, cur);
    });
    return Array.from(m.values()).sort((a,b)=>a.date.localeCompare(b.date));
  }, [mpMonth, wsMonth]);

  const topItems = useMemo(() => {
    const m = new Map<string, { name: string; pct: number; count: number }>();
    wsMonth.forEach(e => {
      const cur = m.get(e.item_name) || { name: e.item_name, pct: 0, count: 0 };
      cur.pct += e.actual_wastage_percent; cur.count += 1; m.set(e.item_name, cur);
    });
    return Array.from(m.values()).map(x => ({ name: x.name, value: +(x.pct/x.count).toFixed(2) }))
      .sort((a,b)=>b.value-a.value).slice(0,10);
  }, [wsMonth]);

  const exportCsv = () => {
    const headers = ['date','category','subcategory','activity','total_manpower','output_mt','mt_per_man','productivity_status'];
    const rows = mpMonth.map(e => headers.map(h => (e as any)[h]).join(','));
    const csv = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
    a.download = `manpower_${month}.csv`; a.click();
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Monthly Reports</h1>
          <p className="text-sm text-slate-500">Consolidated month-end view across manpower and wastage.</p>
        </div>
        <div className="flex items-center gap-2">
          <select value={month} onChange={e=>setMonth(e.target.value)} className="border rounded-md px-3 py-2 text-sm bg-white">
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <Button variant="outline" onClick={exportCsv}><Download className="w-4 h-4 mr-2" /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Kpi label="Total Manpower-Days" value={totalMp} />
        <Kpi label="Total Output (MT)" value={totalMt} />
        <Kpi label="Avg MT / Man" value={avgMpm} />
        <Kpi label="Avg Wastage %" value={`${avgActual}%`} />
        <Kpi label="Critical Exceptions" value={critical} tone={critical>0?'bad':'good'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Daily Manpower & Output</div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="l" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="r" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip /><Legend />
              <Line yAxisId="l" type="monotone" dataKey="manpower" stroke="#059669" />
              <Line yAxisId="r" type="monotone" dataKey="mt" stroke="#0ea5e9" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Top 10 Wastage Items (Avg %)</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={topItems} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={140} />
              <Tooltip />
              <Bar dataKey="value" fill="#ef4444" radius={[0,4,4,0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card className="p-5">
        <div className="text-sm font-semibold mb-3">Wastage Exceptions ({wsMonth.filter(e=>e.actual_wastage_percent>e.standard_wastage_percent).length})</div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead><TableHead>Product Line</TableHead><TableHead>Item</TableHead>
                <TableHead className="text-right">Std %</TableHead><TableHead className="text-right">Actual %</TableHead>
                <TableHead className="text-right">Variance</TableHead><TableHead>Reason</TableHead><TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wsMonth.filter(e=>e.actual_wastage_percent>e.standard_wastage_percent).slice(0,50).map(e=>(
                <TableRow key={e.id}>
                  <TableCell>{e.date}</TableCell>
                  <TableCell>{e.product_line}</TableCell>
                  <TableCell>{e.item_name}</TableCell>
                  <TableCell className="text-right">{e.standard_wastage_percent}%</TableCell>
                  <TableCell className="text-right text-red-600 font-medium">{e.actual_wastage_percent}%</TableCell>
                  <TableCell className="text-right">{e.wastage_variance_percent}%</TableCell>
                  <TableCell>{e.wastage_reason}</TableCell>
                  <TableCell>
                    <Badge className={e.wastage_status==='Critical'?'bg-red-100 text-red-700':'bg-amber-100 text-amber-700'}>{e.wastage_status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

function Kpi({ label, value, tone='default' }: any) {
  const t = tone==='bad'?'bg-red-50 border-red-200':tone==='good'?'bg-emerald-50 border-emerald-200':'bg-white';
  return <Card className={`p-4 border ${t}`}>
    <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </Card>;
}

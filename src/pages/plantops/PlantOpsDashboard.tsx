import React, { useMemo } from 'react';
import { useManpower, useWastage } from './store';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line,
  PieChart, Pie, Cell, CartesianGrid, Legend,
} from 'recharts';
import { Users, Sun, Moon, Clock, Package, Activity, AlertTriangle, TrendingDown } from 'lucide-react';

const COLORS = ['#059669', '#0ea5e9', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6'];

function Kpi({ icon: Icon, label, value, sub, tone = 'default' }: any) {
  const toneClass = {
    default: 'bg-white',
    good: 'bg-emerald-50 border-emerald-200',
    warn: 'bg-amber-50 border-amber-200',
    bad: 'bg-red-50 border-red-200',
  }[tone];
  return (
    <Card className={`p-4 border ${toneClass}`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
          <div className="text-2xl font-semibold mt-1">{value}</div>
          {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
        </div>
        <div className="w-9 h-9 rounded-md bg-slate-100 grid place-items-center text-slate-600">
          <Icon className="w-4 h-4" />
        </div>
      </div>
    </Card>
  );
}

export default function PlantOpsDashboard() {
  const { data: mp } = useManpower();
  const { data: ws } = useWastage();

  const today = new Date().toISOString().slice(0, 10);
  // Use most recent date present in data if today has no entries
  const latestDate = mp[0]?.date || today;

  const todays = mp.filter(e => e.date === latestDate);
  const totalMp = todays.reduce((s, e) => s + e.total_manpower, 0);
  const dayMp = todays.reduce((s, e) => s + e.manpower_day, 0);
  const nightMp = todays.reduce((s, e) => s + e.manpower_night, 0);
  const otMp = todays.reduce((s, e) => s + e.manpower_ot, 0);
  const outputMt = +todays.reduce((s, e) => s + e.output_mt, 0).toFixed(2);
  const mtPerMan = totalMp > 0 ? +(outputMt / totalMp).toFixed(3) : 0;

  const byCategory = useMemo(() => {
    const m = new Map<string, number>();
    todays.forEach(e => m.set(e.category, (m.get(e.category) || 0) + e.total_manpower));
    return Array.from(m, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [todays]);

  const bySubcategory = useMemo(() => {
    const m = new Map<string, number>();
    todays.forEach(e => m.set(e.subcategory, (m.get(e.subcategory) || 0) + e.total_manpower));
    return Array.from(m, ([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value).slice(0, 10);
  }, [todays]);

  const trend = useMemo(() => {
    const m = new Map<string, { date: string; mp: number; mt: number }>();
    mp.forEach(e => {
      const cur = m.get(e.date) || { date: e.date, mp: 0, mt: 0 };
      cur.mp += e.total_manpower; cur.mt += e.output_mt;
      m.set(e.date, cur);
    });
    return Array.from(m.values()).sort((a, b) => a.date.localeCompare(b.date));
  }, [mp]);

  const todaysWs = ws.filter(e => e.date === latestDate);
  const totalWaste = +todaysWs.reduce((s, e) => s + (e.wastage_unit === 'Kg' ? e.wastage_quantity : e.wastage_quantity * (e.wastage_unit === 'MT' ? 1000 : 1)), 0).toFixed(1);
  const avgActual = todaysWs.length ? +(todaysWs.reduce((s, e) => s + e.actual_wastage_percent, 0) / todaysWs.length).toFixed(2) : 0;
  const avgStd = todaysWs.length ? +(todaysWs.reduce((s, e) => s + e.standard_wastage_percent, 0) / todaysWs.length).toFixed(2) : 0;
  const critical = ws.filter(e => e.wastage_status === 'Critical').length;
  const topWasteLine = [...todaysWs].sort((a, b) => b.actual_wastage_percent - a.actual_wastage_percent)[0];

  const topCat = byCategory[0]?.name || '—';
  const topSub = bySubcategory[0]?.name || '—';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h1 className="text-2xl font-bold">Operations Dashboard</h1>
          <p className="text-sm text-slate-500">Snapshot for {latestDate} • Plant-wide</p>
        </div>
        <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Live</Badge>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">Manpower</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <Kpi icon={Users} label="Total Manpower" value={totalMp} />
          <Kpi icon={Sun} label="Day" value={dayMp} />
          <Kpi icon={Moon} label="Night" value={nightMp} />
          <Kpi icon={Clock} label="OT" value={otMp} />
          <Kpi icon={Package} label="Output (MT)" value={outputMt} />
          <Kpi icon={Activity} label="MT / Man" value={mtPerMan} tone={mtPerMan >= 0.15 ? 'good' : 'warn'} />
          <Kpi icon={Users} label="Top Category" value={<span className="text-sm">{topCat}</span>} sub={`Top sub: ${topSub}`} />
        </div>
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-600 mb-2">Wastage</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <Kpi icon={Trash} label="Total Wastage (Kg)" value={totalWaste} />
          <Kpi icon={Activity} label="Actual %" value={`${avgActual}%`} tone={avgActual > avgStd ? 'bad' : 'good'} />
          <Kpi icon={Activity} label="Standard %" value={`${avgStd}%`} />
          <Kpi icon={TrendingDown} label="Variance" value={`${(avgActual - avgStd).toFixed(2)}%`} tone={avgActual > avgStd ? 'warn' : 'good'} />
          <Kpi icon={AlertTriangle} label="Critical Exceptions" value={critical} tone={critical > 0 ? 'bad' : 'good'} />
          <Kpi icon={Package} label="Highest Wastage Line" value={<span className="text-sm">{topWasteLine?.product_line || '—'}</span>} sub={topWasteLine ? `${topWasteLine.item_name} • ${topWasteLine.actual_wastage_percent}%` : ''} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Category-wise Manpower (Today)</div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={60} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#059669" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4">
          <div className="text-sm font-semibold mb-3">Day vs Night Split (Today)</div>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={[
                { name: 'Day', value: dayMp },
                { name: 'Night', value: nightMp },
                { name: 'OT', value: otMp },
              ]} dataKey="value" nameKey="name" outerRadius={90} label>
                {COLORS.map((c, i) => <Cell key={i} fill={c} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 lg:col-span-2">
          <div className="text-sm font-semibold mb-3">Monthly Manpower & Output Trend</div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 11 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="mp" name="Manpower" stroke="#059669" strokeWidth={2} />
              <Line yAxisId="right" type="monotone" dataKey="mt" name="Output (MT)" stroke="#0ea5e9" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        <Card className="p-4 lg:col-span-2">
          <div className="text-sm font-semibold mb-3">Top 10 Manpower-Consuming Departments (Today)</div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bySubcategory} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis type="number" tick={{ fontSize: 11 }} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} width={180} />
              <Tooltip />
              <Bar dataKey="value" fill="#0ea5e9" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

function Trash(props: any) { return <AlertTriangle {...props} />; }

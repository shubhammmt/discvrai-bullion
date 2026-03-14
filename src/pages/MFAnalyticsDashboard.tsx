import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, FunnelChart, Funnel, LabelList,
} from 'recharts';
import {
  TrendingUp, Users, IndianRupee, Activity, Zap, BarChart3, PieChart as PieIcon,
  Smartphone, Monitor, ArrowDown, Repeat, ShoppingCart, Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ─── Mock Data ───
const FUNNEL_DATA = [
  { name: 'Aware', value: 1000, fill: 'hsl(221, 83%, 53%)' },
  { name: 'Explore', value: 600, fill: 'hsl(221, 83%, 63%)' },
  { name: 'Evaluate', value: 200, fill: 'hsl(221, 83%, 73%)' },
  { name: 'Convert', value: 50, fill: 'hsl(142, 71%, 45%)' },
];

const COST_BY_AGENT = [
  { agent: 'Supervisor', cost: 800 },
  { agent: 'Screener', cost: 180 },
  { agent: 'Goal Planner', cost: 120 },
  { agent: 'Portfolio', cost: 95 },
  { agent: 'Transaction', cost: 55 },
];

const LATENCY_BY_AGENT = [
  { agent: 'Supervisor', latency: 1200 },
  { agent: 'Screener', latency: 850 },
  { agent: 'Goal Planner', latency: 920 },
  { agent: 'Portfolio', latency: 680 },
  { agent: 'Transaction', latency: 450 },
];

const INTENT_DATA = [
  { intent: 'fund_search', count: 300, color: 'hsl(221, 83%, 53%)' },
  { intent: 'portfolio_view', count: 180, color: 'hsl(142, 71%, 45%)' },
  { intent: 'goal_planning', count: 120, color: 'hsl(38, 92%, 50%)' },
  { intent: 'buy_transaction', count: 95, color: 'hsl(262, 83%, 58%)' },
  { intent: 'sip_setup', count: 80, color: 'hsl(340, 82%, 52%)' },
  { intent: 'sell_transaction', count: 45, color: 'hsl(0, 84%, 60%)' },
  { intent: 'general_question', count: 110, color: 'hsl(199, 89%, 48%)' },
  { intent: 'direct_response', count: 70, color: 'hsl(160, 60%, 45%)' },
];

const USER_STATES = [
  { state: 'Visitor', count: 450, color: 'hsl(221, 83%, 53%)' },
  { state: 'Explorer', count: 280, color: 'hsl(142, 71%, 45%)' },
  { state: 'Evaluator', count: 150, color: 'hsl(38, 92%, 50%)' },
  { state: 'High Intent', count: 80, color: 'hsl(262, 83%, 58%)' },
  { state: 'Investor', count: 40, color: 'hsl(340, 82%, 52%)' },
];

const TOKEN_TREND = [
  { date: 'Mar 1', tokens: 12000, cost: 85 },
  { date: 'Mar 3', tokens: 15400, cost: 110 },
  { date: 'Mar 5', tokens: 18200, cost: 130 },
  { date: 'Mar 7', tokens: 14800, cost: 105 },
  { date: 'Mar 9', tokens: 21000, cost: 150 },
  { date: 'Mar 11', tokens: 19500, cost: 140 },
  { date: 'Mar 13', tokens: 24000, cost: 170 },
  { date: 'Mar 14', tokens: 22800, cost: 162 },
];

const METRICS = {
  conversion_pct: 5.0,
  aov: 25000,
  total_aum: 5000000,
  new_aum: 125000,
  new_tx: 45,
  new_sip: 12,
  sip_churn: 3,
};

const DEVICE_DATA = [
  { name: 'Mobile', value: 68, color: 'hsl(221, 83%, 53%)' },
  { name: 'Desktop', value: 32, color: 'hsl(142, 71%, 45%)' },
];

const UTM_DATA = [
  { source: 'google', medium: 'cpc', campaign: 'mf-awareness', sessions: 320 },
  { source: 'instagram', medium: 'social', campaign: 'sip-promo', sessions: 180 },
  { source: 'direct', medium: '(none)', campaign: '(none)', sessions: 250 },
  { source: 'whatsapp', medium: 'referral', campaign: 'invite', sessions: 150 },
  { source: 'youtube', medium: 'video', campaign: 'calculator', sessions: 100 },
];

function formatINR(v: number): string {
  if (v >= 10000000) return `₹${(v / 10000000).toFixed(2)} Cr`;
  if (v >= 100000) return `₹${(v / 100000).toFixed(2)} L`;
  return `₹${v.toLocaleString('en-IN')}`;
}

function MetricCard({ title, value, icon: Icon, change, color }: {
  title: string; value: string; icon: typeof TrendingUp; change?: string; color: string;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider">{title}</span>
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', color)}>
            <Icon className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {change && <p className="text-xs text-green-600 mt-1">{change}</p>}
      </CardContent>
    </Card>
  );
}

const MFAnalyticsDashboard = () => {
  const [period, setPeriod] = useState('30d');

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Analytics Dashboard</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Mutual Fund Agentic Commerce Platform</p>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36 h-9 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="90d">Last 90 Days</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          <MetricCard title="Conversion" value={`${METRICS.conversion_pct}%`} icon={TrendingUp} change="+0.8% vs last" color="text-green-600 bg-green-100 dark:bg-green-900/30" />
          <MetricCard title="AOV" value={formatINR(METRICS.aov)} icon={IndianRupee} color="text-blue-600 bg-blue-100 dark:bg-blue-900/30" />
          <MetricCard title="Total AUM" value={formatINR(METRICS.total_aum)} icon={BarChart3} color="text-purple-600 bg-purple-100 dark:bg-purple-900/30" />
          <MetricCard title="New AUM" value={formatINR(METRICS.new_aum)} icon={Zap} change="+18% MoM" color="text-amber-600 bg-amber-100 dark:bg-amber-900/30" />
          <MetricCard title="New Txns" value={String(METRICS.new_tx)} icon={ShoppingCart} color="text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30" />
          <MetricCard title="New SIPs" value={String(METRICS.new_sip)} icon={Repeat} color="text-teal-600 bg-teal-100 dark:bg-teal-900/30" />
          <MetricCard title="SIP Churn" value={String(METRICS.sip_churn)} icon={ArrowDown} color="text-red-500 bg-red-100 dark:bg-red-900/30" />
        </div>

        {/* Funnel + Cost/Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Funnel */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                {FUNNEL_DATA.map((stage, i) => {
                  const prevVal = i > 0 ? FUNNEL_DATA[i - 1].value : stage.value;
                  const dropoff = i > 0 ? (((prevVal - stage.value) / prevVal) * 100).toFixed(0) : null;
                  const widthPct = (stage.value / FUNNEL_DATA[0].value) * 100;
                  return (
                    <div key={stage.name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-medium text-foreground">{stage.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-foreground">{stage.value.toLocaleString()}</span>
                          {dropoff && (
                            <Badge variant="secondary" className="text-[9px] text-red-500">-{dropoff}%</Badge>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-6 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                          style={{ width: `${widthPct}%`, backgroundColor: stage.fill }}
                        >
                          <span className="text-[10px] text-white font-medium">{widthPct.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <IndianRupee className="w-4 h-4 text-primary" />
                  Cost & Performance
                </span>
                <Badge variant="outline" className="text-xs">Total: ₹1,250</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={COST_BY_AGENT} layout="vertical" margin={{ left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis dataKey="agent" type="category" width={80} tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
                  <Bar dataKey="cost" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} name="Cost (₹)" />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-3">
                <p className="text-xs text-muted-foreground mb-2">Avg Latency by Agent (ms)</p>
                <div className="space-y-1.5">
                  {LATENCY_BY_AGENT.map(a => (
                    <div key={a.agent} className="flex items-center gap-2 text-xs">
                      <span className="text-muted-foreground w-24 truncate">{a.agent}</span>
                      <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                        <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(a.latency / 1500) * 100}%` }} />
                      </div>
                      <span className="text-foreground font-medium w-12 text-right">{a.latency}ms</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Token Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Token Usage Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={TOKEN_TREND}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }} />
                <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 12 }} />
                <Line yAxisId="left" type="monotone" dataKey="tokens" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} name="Tokens" />
                <Line yAxisId="right" type="monotone" dataKey="cost" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3 }} name="Cost (₹)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Intent & User State */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Intent Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-primary" />
                Intent Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={INTENT_DATA} dataKey="count" nameKey="intent" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                      {INTENT_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1.5 flex-1">
                  {INTENT_DATA.map(d => (
                    <div key={d.intent} className="flex items-center gap-2 text-xs">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span className="text-muted-foreground truncate flex-1">{d.intent.replace(/_/g, ' ')}</span>
                      <span className="font-semibold text-foreground">{d.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* User State */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                User State Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4">
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie data={USER_STATES} dataKey="count" nameKey="state" cx="50%" cy="50%" outerRadius={80} innerRadius={40}>
                      {USER_STATES.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '8px', fontSize: 11 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2 flex-1">
                  {USER_STATES.map(d => {
                    const total = USER_STATES.reduce((s, x) => s + x.count, 0);
                    const pct = ((d.count / total) * 100).toFixed(0);
                    return (
                      <div key={d.state} className="space-y-1">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">{d.state}</span>
                          <span className="font-semibold text-foreground">{d.count} ({pct}%)</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-1.5">
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: d.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Device & Attribution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Device */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-primary" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={140} height={140}>
                  <PieChart>
                    <Pie data={DEVICE_DATA} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} innerRadius={35}>
                      {DEVICE_DATA.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-4">
                  {DEVICE_DATA.map(d => {
                    const DevIcon = d.name === 'Mobile' ? Smartphone : Monitor;
                    return (
                      <div key={d.name} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: d.color + '20' }}>
                          <DevIcon className="w-4 h-4" style={{ color: d.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{d.value}%</p>
                          <p className="text-[10px] text-muted-foreground">{d.name}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Attribution (UTM)</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-1">
                <div className="grid grid-cols-4 gap-2 text-[10px] text-muted-foreground uppercase tracking-wider pb-1 border-b border-border">
                  <span>Source</span><span>Medium</span><span>Campaign</span><span className="text-right">Sessions</span>
                </div>
                {UTM_DATA.map((row, i) => (
                  <div key={i} className="grid grid-cols-4 gap-2 text-xs py-1.5 border-b border-border/50 last:border-0">
                    <span className="font-medium text-foreground">{row.source}</span>
                    <span className="text-muted-foreground">{row.medium}</span>
                    <span className="text-muted-foreground truncate">{row.campaign}</span>
                    <span className="font-semibold text-foreground text-right">{row.sessions}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MFAnalyticsDashboard;

import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Users, TrendingUp, Activity, ShieldCheck, AlertTriangle, Sparkles, Target,
  Mail, MessageSquare, Smartphone, Store, Database, Lock, GitBranch, Clock,
  ArrowUpRight, ArrowDownRight, CheckCircle2, FlaskConical, Layers, Filter,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';

// ---------------- Mock data ----------------
const KPIS = [
  { label: 'Active members', value: '4.82M', delta: '+2.1%', up: true, icon: Users },
  { label: 'Campaign response rate', value: '11.4%', delta: '+0.8 pp', up: true, icon: Activity },
  { label: 'Revenue / visit uplift', value: '+6.3%', delta: 'vs control', up: true, icon: TrendingUp },
  { label: 'Incremental vs control', value: '+₹1.42 Cr', delta: 'last 4 wks', up: true, icon: Sparkles },
];

const TREND = [
  { wk: 'W1', resp: 9.1, conv: 3.2 }, { wk: 'W2', resp: 9.6, conv: 3.4 },
  { wk: 'W3', resp: 10.2, conv: 3.7 }, { wk: 'W4', resp: 10.0, conv: 3.6 },
  { wk: 'W5', resp: 10.7, conv: 3.9 }, { wk: 'W6', resp: 10.9, conv: 4.1 },
  { wk: 'W7', resp: 11.2, conv: 4.3 }, { wk: 'W8', resp: 11.4, conv: 4.5 },
];

const ALERTS = [
  { sev: 'high', title: 'Segment fatigue: Deal-seeker', detail: '4.2 contacts / 7d — exceeds frequency cap of 3.', icon: AlertTriangle },
  { sev: 'med',  title: 'Offer cannibalization risk', detail: 'Premium tier offer overlaps Loyalty Q4 push (38% audience overlap).', icon: Layers },
  { sev: 'low',  title: 'Data freshness lag — SMS', detail: 'Consent feed last refreshed 9h ago (SLA: 4h).', icon: Clock },
];

type Segment = {
  id: string; name: string; size: string; tier: 'Platinum' | 'Gold' | 'Silver' | 'Bronze';
  churn: 'Low' | 'Medium' | 'High'; lifecycle: string; lastContact: string; nba: string;
  channels: string[]; persona: { name: string; reason: string; uplift: string; confidence: string; cap: string };
};

const SEGMENTS: Segment[] = [
  {
    id: 's1', name: 'High-value omnichannel', size: '184,200', tier: 'Platinum',
    churn: 'Low', lifecycle: 'Engaged', lastContact: '3d ago',
    nba: 'Early access to Premium Q4 drop',
    channels: ['app', 'email'],
    persona: { name: 'Aarav M. — Platinum, Mumbai', reason: 'High propensity for Premium category + engaged in app within 7d + no email in 14d.', uplift: '+9.2% conversion', confidence: '0.84', cap: 'Eligible — within frequency cap (2 / 7d).' },
  },
  {
    id: 's2', name: 'Dormant 90d', size: '612,400', tier: 'Gold',
    churn: 'High', lifecycle: 'At risk', lastContact: '94d ago',
    nba: 'Win-back voucher ₹500 + category nudge',
    channels: ['email', 'sms'],
    persona: { name: 'Priya S. — Gold, Bengaluru', reason: 'No visit in 90d, historic affinity for Beauty + Apparel, opted-in for SMS.', uplift: '+4.1% reactivation', confidence: '0.71', cap: 'Eligible — first touch in window.' },
  },
  {
    id: 's3', name: 'Deal-seeker', size: '948,100', tier: 'Silver',
    churn: 'Medium', lifecycle: 'Promo-driven', lastContact: '1d ago',
    nba: 'Suppress — fatigue threshold breached',
    channels: ['app', 'sms', 'email'],
    persona: { name: 'Rohit K. — Silver, Pune', reason: 'Contacted 4× in last 7 days. Suppress to protect long-term response rate.', uplift: 'Protect baseline', confidence: '0.92', cap: 'Suppressed — exceeds 3 / 7d cap.' },
  },
  {
    id: 's4', name: 'Premium tier', size: '57,800', tier: 'Platinum',
    churn: 'Low', lifecycle: 'Loyal', lastContact: '6d ago',
    nba: 'Concierge invite — in-mall private preview',
    channels: ['email', 'in-store'],
    persona: { name: 'Neha R. — Platinum, Delhi NCR', reason: 'Top 1% spend, attended 2 prior previews, lives within 8 km of flagship.', uplift: '+12.4% ATV', confidence: '0.88', cap: 'Eligible — concierge channel exempt from cap.' },
  },
  {
    id: 's5', name: 'New joiners (30d)', size: '142,600', tier: 'Bronze',
    churn: 'Medium', lifecycle: 'Onboarding', lastContact: '5d ago',
    nba: 'Welcome journey step 2 — category sampler',
    channels: ['app', 'email'],
    persona: { name: 'Karan T. — Bronze, Hyderabad', reason: 'Completed signup 18d ago, browsed 3 categories, no purchase yet.', uplift: '+3.6% first-purchase', confidence: '0.66', cap: 'Eligible — onboarding journey active.' },
  },
];

const CHANNEL_ICON: Record<string, any> = { app: Smartphone, email: Mail, sms: MessageSquare, 'in-store': Store };

const EXPERIMENTS = [
  { col: 'Draft', items: [
    { name: 'Win-back ₹500 voucher — Dormant 90d', audience: '612k', holdout: '10%', metric: 'Reactivation %', incr: '—', status: 'Awaiting approval' },
  ]},
  { col: 'Live', items: [
    { name: 'Premium Q4 early access', audience: '184k', holdout: '15%', metric: 'Conversion %', incr: '+2.1 pp', status: 'Day 6 / 14' },
    { name: 'Beauty cross-sell — Gold', audience: '231k', holdout: '20%', metric: 'Revenue / visit', incr: '+4.8%', status: 'Day 11 / 21' },
  ]},
  { col: 'Completed', items: [
    { name: 'Festive SMS burst — Silver', audience: '948k', holdout: '10%', metric: 'Response %', incr: '+0.6 pp', status: 'Closed — modest lift' },
    { name: 'App push — Cart abandoners', audience: '78k', holdout: '15%', metric: 'Conversion %', incr: '+5.4 pp', status: 'Closed — winner' },
  ]},
];

const tierColor: Record<string, string> = {
  Platinum: 'bg-slate-900 text-white',
  Gold: 'bg-amber-100 text-amber-900 border-amber-200',
  Silver: 'bg-slate-100 text-slate-700 border-slate-200',
  Bronze: 'bg-orange-100 text-orange-900 border-orange-200',
};
const churnColor: Record<string, string> = {
  Low: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  Medium: 'text-amber-700 bg-amber-50 border-amber-200',
  High: 'text-red-700 bg-red-50 border-red-200',
};
const sevColor: Record<string, string> = {
  high: 'border-red-200 bg-red-50 text-red-900',
  med: 'border-amber-200 bg-amber-50 text-amber-900',
  low: 'border-slate-200 bg-slate-50 text-slate-700',
};

// ---------------- Component ----------------
const CVMCommandCenter: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('s1');
  const [tierFilter, setTierFilter] = useState<string>('All');
  const [churnFilter, setChurnFilter] = useState<string>('All');

  const selected = useMemo(() => SEGMENTS.find(s => s.id === selectedId)!, [selectedId]);
  const filtered = useMemo(() => SEGMENTS.filter(s =>
    (tierFilter === 'All' || s.tier === tierFilter) &&
    (churnFilter === 'All' || s.churn === churnFilter)
  ), [tierFilter, churnFilter]);

  const suggestedExperiment = useMemo(() => ({
    name: `Test: ${selected.nba}`,
    audience: selected.size,
    holdout: '15%',
    metric: selected.tier === 'Platinum' ? 'Revenue / visit' : 'Conversion %',
    duration: '14 days',
  }), [selected]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-[1400px] mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-slate-900 text-white grid place-items-center">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">CVM Command Center</h1>
              <p className="text-xs text-slate-500">Group marketing · Who · What · Where · With what guardrails</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono text-[10px]">Model v3.2</Badge>
            <Badge variant="outline" className="font-mono text-[10px]">PII masked</Badge>
            <Badge className="bg-emerald-600 hover:bg-emerald-600 text-white text-[10px]">Live data</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 py-6 space-y-6">
        {/* KPI Strip */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {KPIS.map(k => {
            const Icon = k.icon;
            return (
              <Card key={k.label} className="border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <span className="text-xs uppercase tracking-wider text-slate-500">{k.label}</span>
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="mt-2 text-2xl font-bold">{k.value}</div>
                  <div className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${k.up ? 'text-emerald-700' : 'text-red-700'}`}>
                    {k.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                    {k.delta}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Trend + Alerts */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2 border-slate-200">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Response & conversion — last 8 weeks</CardTitle>
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-slate-900" /> Response %</span>
                  <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Conversion %</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[240px] pt-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={TREND} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0f172a" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="wk" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 12 }} />
                  <Area type="monotone" dataKey="resp" stroke="#0f172a" fill="url(#g1)" strokeWidth={2} />
                  <Area type="monotone" dataKey="conv" stroke="#10b981" fill="url(#g2)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" /> Operational alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {ALERTS.map((a, i) => {
                const Icon = a.icon;
                return (
                  <div key={i} className={`rounded-md border p-3 ${sevColor[a.sev]}`}>
                    <div className="flex items-start gap-2">
                      <Icon className="h-4 w-4 mt-0.5 shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold">{a.title}</p>
                        <p className="text-xs opacity-80 mt-0.5">{a.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </section>

        {/* Tabs */}
        <Tabs defaultValue="segments" className="w-full">
          <TabsList className="bg-white border border-slate-200">
            <TabsTrigger value="segments">Segment explorer</TabsTrigger>
            <TabsTrigger value="nba">Next-best-action</TabsTrigger>
            <TabsTrigger value="experiments">Campaigns & experiments</TabsTrigger>
            <TabsTrigger value="governance">Data & governance</TabsTrigger>
          </TabsList>

          {/* Segments */}
          <TabsContent value="segments" className="mt-4">
            <Card className="border-slate-200">
              <CardHeader className="pb-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <CardTitle className="text-base">Segments</CardTitle>
                  <div className="flex items-center gap-2 text-xs">
                    <Filter className="h-3.5 w-3.5 text-slate-400" />
                    <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
                      className="border border-slate-200 rounded px-2 py-1 bg-white">
                      <option>All</option><option>Platinum</option><option>Gold</option><option>Silver</option><option>Bronze</option>
                    </select>
                    <select value={churnFilter} onChange={e => setChurnFilter(e.target.value)}
                      className="border border-slate-200 rounded px-2 py-1 bg-white">
                      <option>All</option><option>Low</option><option>Medium</option><option>High</option>
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Segment</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Churn risk</TableHead>
                      <TableHead>Lifecycle</TableHead>
                      <TableHead>Last contact</TableHead>
                      <TableHead>Channels</TableHead>
                      <TableHead>Next best action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map(s => (
                      <TableRow
                        key={s.id}
                        onClick={() => setSelectedId(s.id)}
                        className={`cursor-pointer ${selectedId === s.id ? 'bg-slate-100' : ''}`}
                      >
                        <TableCell className="font-medium">{s.name}</TableCell>
                        <TableCell className="font-mono text-xs">{s.size}</TableCell>
                        <TableCell>
                          <Badge className={tierColor[s.tier]} variant="outline">{s.tier}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${churnColor[s.churn]}`}>
                            {s.churn}
                          </span>
                        </TableCell>
                        <TableCell className="text-sm text-slate-600">{s.lifecycle}</TableCell>
                        <TableCell className="text-sm text-slate-600">{s.lastContact}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5 text-slate-500">
                            {s.channels.map(c => {
                              const Icon = CHANNEL_ICON[c] || Smartphone;
                              return <Icon key={c} className="h-3.5 w-3.5" />;
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{s.nba}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-xs text-slate-500 mt-3">Tip: click a row — the NBA panel and suggested experiment update.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NBA */}
          <TabsContent value="nba" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <Card className="lg:col-span-2 border-slate-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">Next-best-action — {selected.persona.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">From: {selected.name}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Recommended action</p>
                    <p className="text-lg font-semibold">{selected.nba}</p>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Why this action</p>
                    <p className="text-sm text-slate-700">{selected.persona.reason}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-md border border-slate-200 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Expected uplift</p>
                      <p className="text-base font-semibold text-emerald-700 mt-1">{selected.persona.uplift}</p>
                    </div>
                    <div className="rounded-md border border-slate-200 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Confidence</p>
                      <p className="text-base font-semibold mt-1">{selected.persona.confidence}</p>
                    </div>
                    <div className="rounded-md border border-slate-200 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Channels</p>
                      <div className="flex items-center gap-1.5 mt-1.5 text-slate-700">
                        {selected.channels.map(c => {
                          const Icon = CHANNEL_ICON[c] || Smartphone;
                          return <Icon key={c} className="h-4 w-4" />;
                        })}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-md border border-emerald-200 bg-emerald-50 p-3 flex items-start gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-700 mt-0.5" />
                    <div className="text-sm text-emerald-900">
                      <p className="font-semibold">Governance check</p>
                      <p className="text-xs mt-0.5">{selected.persona.cap}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-1">
                    <Button className="bg-slate-900 hover:bg-slate-800">Approve & queue</Button>
                    <Button variant="outline">Send to experiment</Button>
                    <Button variant="ghost">Suppress</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <FlaskConical className="h-4 w-4 text-slate-500" /> Suggested experiment
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500">Name</p>
                    <p className="font-medium">{suggestedExperiment.name}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Audience</p>
                      <p className="font-mono">{suggestedExperiment.audience}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Holdout</p>
                      <p className="font-mono">{suggestedExperiment.holdout}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Primary metric</p>
                      <p>{suggestedExperiment.metric}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-slate-500">Duration</p>
                      <p>{suggestedExperiment.duration}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">Create draft experiment</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experiments */}
          <TabsContent value="experiments" className="mt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {EXPERIMENTS.map(col => (
                <Card key={col.col} className="border-slate-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm uppercase tracking-wider text-slate-500">{col.col}</CardTitle>
                      <Badge variant="outline" className="text-xs">{col.items.length}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {col.items.map((it, i) => (
                      <div key={i} className="rounded-md border border-slate-200 bg-white p-3 hover:shadow-sm transition">
                        <p className="text-sm font-semibold">{it.name}</p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-[11px] text-slate-600">
                          <div><span className="text-slate-400">Audience: </span>{it.audience}</div>
                          <div><span className="text-slate-400">Holdout: </span>{it.holdout}</div>
                          <div><span className="text-slate-400">Metric: </span>{it.metric}</div>
                          <div><span className="text-slate-400">Lift: </span><span className={it.incr.startsWith('+') ? 'text-emerald-700 font-semibold' : ''}>{it.incr}</span></div>
                        </div>
                        <div className="mt-2 text-[11px] text-slate-500">{it.status}</div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-slate-200 mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Premium Q4 early access — variant detail</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="rounded-md border border-slate-200 p-3">
                    <div className="flex items-center justify-between"><p className="font-semibold text-sm">Variant A — App push</p><Badge variant="outline">Control: 15%</Badge></div>
                    <p className="text-xs text-slate-500 mt-1">"Your early window opens Friday."</p>
                    <p className="text-xs mt-2">Conv: <span className="font-mono">5.8%</span> · Resp: <span className="font-mono">14.1%</span></p>
                  </div>
                  <div className="rounded-md border border-emerald-200 bg-emerald-50/40 p-3">
                    <div className="flex items-center justify-between"><p className="font-semibold text-sm">Variant B — App push + email</p><Badge className="bg-emerald-600 hover:bg-emerald-600 text-white">Leading +2.1pp</Badge></div>
                    <p className="text-xs text-slate-600 mt-1">"You're invited — preview Friday, in-mall pickup Saturday."</p>
                    <p className="text-xs mt-2">Conv: <span className="font-mono">7.9%</span> · Resp: <span className="font-mono">16.3%</span></p>
                  </div>
                </div>
                <div className="mt-3 rounded-md border border-slate-200 p-3 text-xs text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="h-4 w-4 text-slate-500 mt-0.5" />
                  <span><span className="font-semibold text-slate-800">Guardrails:</span> Frequency cap 3 / 7d · Exclusions: Dormant 90d, Suppressed list · Holdout sealed for 14 days.</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { icon: Database, title: 'Sources synced', value: '12 / 12', sub: 'POS, app, email, SMS, in-mall, CRM, loyalty…' },
                { icon: Clock, title: 'Last refresh', value: '14 min ago', sub: 'SLA: 30 min · all green except SMS consent (9h)' },
                { icon: Lock, title: 'PII policy', value: 'Masked in UI', sub: 'Tokenized identifiers · audit log enabled' },
                { icon: GitBranch, title: 'Model version', value: 'v3.2', sub: 'Promoted 9 days ago · A/B challenger v3.3 at 5%' },
              ].map((g, i) => {
                const Icon = g.icon;
                return (
                  <Card key={i} className="border-slate-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <span className="text-xs uppercase tracking-wider text-slate-500">{g.title}</span>
                        <Icon className="h-4 w-4 text-slate-400" />
                      </div>
                      <p className="text-xl font-bold mt-2">{g.value}</p>
                      <p className="text-xs text-slate-500 mt-1">{g.sub}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="border-slate-200 mt-4">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Policy & rule pack (read-only)</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-2">
                {[
                  'Frequency cap: max 3 contacts / 7 days across email + SMS + push.',
                  'Suppression: anyone in Dormant 90d cannot receive promo SMS within first 7 days of re-engagement.',
                  'Channel consent: SMS requires explicit opt-in; email requires double opt-in for new joiners.',
                  'Exclusions: staff accounts, fraud-flagged accounts, and active complaint cases.',
                  'Holdout: every campaign reserves ≥10% control; incrementality reported weekly.',
                ].map((r, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-slate-700">{r}</span>
                  </div>
                ))}
                <p className="text-[11px] text-slate-500 pt-2 border-t mt-3">This panel is illustrative — production rules are configured per group company and regulatory boundary.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-[11px] text-slate-400 pt-2">CVM Command Center · Demo · Synthetic data</p>
      </main>
    </div>
  );
};

export default CVMCommandCenter;

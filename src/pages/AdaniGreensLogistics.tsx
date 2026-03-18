import React, { useState, useEffect } from 'react';
import { AlertTriangle, Package, Truck, Warehouse, BarChart3, Info, Sun, Wind, Battery, ChevronDown, ChevronUp, Clock, Shield, MapPin, Bot, Zap, MessageSquare, Lightbulb, CheckCircle, ArrowRight, Send, Sparkles, Brain, Search, Network, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from 'recharts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import data from '@/data/adani_greens_logistics.json';
import agenticData from '@/data/adani_greens_agentic.json';

const TIPS = {
  otif: 'On-Time In-Full: % of shipments delivered on or before expected date with full quantity.',
  freightCost: 'Total freight cost ÷ total quantity shipped. Lower = more efficient.',
  vehicleFill: 'Actual payload vs. max vehicle capacity. Target 75–85%.',
  importPendency: 'Import/project orders not yet shipped. Critical = aging > 48 hours.',
  customs: 'Orders awaiting or completed customs clearance at port.',
  warehouseUtil: 'Occupied pallets ÷ total pallet capacity. 65–80% is optimal.',
  belowSafety: 'SKUs where current stock < minimum safety threshold.',
};

const InfoTip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-3.5 h-3.5 text-adani-text-secondary hover:text-adani-text-primary cursor-help inline-block ml-1.5 opacity-60 hover:opacity-100 transition-opacity" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed bg-adani-navy text-white border-adani-navy/50">
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const fmt = (n: number) => n.toLocaleString('en-IN');
const fmtINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const getOtifColor = (v: number) => v >= 85 ? 'text-adani-green' : v >= 70 ? 'text-adani-amber' : 'text-adani-red';
const getOtifBg = (v: number) => v >= 85 ? 'bg-adani-green/10' : v >= 70 ? 'bg-adani-amber/10' : 'bg-adani-red/10';
const getUtilColor = (v: number) => v >= 65 && v <= 80 ? 'hsl(var(--adani-green))' : v > 80 ? 'hsl(var(--adani-amber))' : 'hsl(var(--adani-red))';

const priorityColor = (p: string) => {
  const pl = p.toLowerCase();
  if (pl === 'high' || pl === 'critical') return 'bg-adani-red/15 text-adani-red border-adani-red/30';
  if (pl === 'medium') return 'bg-adani-amber/15 text-adani-amber border-adani-amber/30';
  return 'bg-adani-text-secondary/15 text-adani-text-secondary border-adani-text-secondary/30';
};

const customsColor = (s: string) => {
  if (s === 'Cleared') return 'bg-adani-green/15 text-adani-green border-adani-green/30';
  if (s === 'In Transit') return 'bg-adani-navy/15 text-adani-navy border-adani-navy/30';
  return 'bg-adani-amber/15 text-adani-amber border-adani-amber/30';
};

const alertIcon = (type: string) => {
  if (type === 'critical_sto') return <Clock className="w-4 h-4" />;
  if (type === 'customs_clearance') return <Shield className="w-4 h-4" />;
  return <Package className="w-4 h-4" />;
};

const alertStyle = (type: string) => {
  if (type === 'critical_sto') return 'bg-adani-red/10 border-adani-red/30 text-adani-red';
  if (type === 'customs_clearance') return 'bg-adani-amber/10 border-adani-amber/30 text-adani-amber';
  return 'bg-adani-amber/10 border-adani-amber/30 text-adani-amber';
};

const severityStyle = (s: string) => {
  if (s === 'critical') return { bg: 'bg-adani-red/10', border: 'border-adani-red/30', text: 'text-adani-red', dot: 'bg-adani-red' };
  if (s === 'warning') return { bg: 'bg-adani-amber/10', border: 'border-adani-amber/30', text: 'text-adani-amber', dot: 'bg-adani-amber' };
  return { bg: 'bg-adani-navy/10', border: 'border-adani-navy/30', text: 'text-adani-navy', dot: 'bg-adani-navy' };
};

const MiniGauge: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-20 h-10 overflow-hidden">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="hsl(var(--adani-surface-elevated))" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 126} 126`} />
      </svg>
    </div>
    <span className="text-lg font-bold text-adani-text-primary">{value}%</span>
    <span className="text-[10px] text-adani-text-secondary uppercase tracking-wider">{label}</span>
  </div>
);

const LEG_COLORS = ['hsl(var(--adani-green))', 'hsl(var(--adani-navy))', 'hsl(var(--adani-amber))'];

const AdaniGreensLogistics: React.FC = () => {
  const [chartMetric, setChartMetric] = useState<'shipmentCount' | 'totalFreightCost' | 'avgFreightPerShipment'>('shipmentCount');
  const [pendencyOpen, setPendencyOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState<string | null>(null);

  const sortedStos = [...data.stoPendency.topPendingStos].sort((a, b) => b.agingHours - a.agingHours);

  const chartData = data.transportation.byLegType.map(l => ({
    name: l.legType,
    value: l[chartMetric],
  }));

  const metricLabels: Record<string, string> = {
    shipmentCount: 'Shipments',
    totalFreightCost: 'Total Freight (₹)',
    avgFreightPerShipment: 'Avg Freight/Shipment (₹)',
  };

  const handleAskAI = (query: string) => {
    const match = agenticData.conversationalQueries.find(
      q => q.query.toLowerCase() === query.toLowerCase()
    );
    if (match) {
      setChatResponse(match.response);
    } else {
      const fuzzy = agenticData.conversationalQueries.find(
        q => query.toLowerCase().includes(q.category) || q.query.toLowerCase().includes(query.toLowerCase().split(' ').slice(0, 3).join(' '))
      );
      setChatResponse(fuzzy ? fuzzy.response : "Try one of the suggested questions, or ask: 'Which import orders need my attention?', 'Why is vehicle fill rate low?', 'What's the customs clearance status?'");
    }
    setChatQuery(query);
  };

  const { agentSummary, recommendedActions, agentInsights, conversationalQueries, agentCapabilities } = agenticData;

  return (
    <div className="min-h-screen bg-adani-surface text-adani-text-primary">
      {/* Header */}
      <header className="bg-gradient-to-r from-adani-navy via-adani-navy to-[hsl(220_50%_25%)] text-white px-4 sm:px-6 lg:px-8 py-4 shadow-lg">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-adani-green/20 flex items-center justify-center shadow-inner">
              <Sun className="w-5 h-5 text-adani-green" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Adani Greens Logistics — AI Control Tower</h1>
              <p className="text-xs text-white/60">DiscvrAI × Adani Greens · Supply Chain Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1.5 bg-adani-green/15 px-2.5 py-1 rounded-full text-adani-green"><Activity className="w-3 h-3 animate-pulse" /> Live</span>
            <span className="flex items-center gap-1"><Wind className="w-3.5 h-3.5" /> Khavda Project</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Gujarat, India</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5">

        {/* Alerts */}
        {data.alerts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {data.alerts.map((a, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium hover:scale-[1.01] transition-transform ${alertStyle(a.type)}`}>
                {alertIcon(a.type)}
                <span>{a.message}</span>
                <Badge variant="outline" className="ml-auto border-current text-current text-[10px]">{a.count}</Badge>
              </div>
            ))}
          </motion.div>
        )}

        {/* Agent Summary Banner */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="bg-gradient-to-r from-adani-surface-elevated to-adani-amber/5 border-l-4 border-l-adani-amber border-adani-border shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-adani-amber/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-adani-amber" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] uppercase tracking-widest font-semibold text-adani-amber">AI Agent Summary</span>
                  </div>
                  <h2 className="text-base font-bold text-adani-text-primary mb-2">{agentSummary.headline}</h2>
                  <p className="text-sm text-adani-text-secondary leading-relaxed">{agentSummary.summary}</p>
                  <div className="flex gap-3 mt-3">
                    <Badge className="bg-adani-red/15 text-adani-red border-adani-red/30 text-xs" variant="outline">Critical: {agentSummary.priorityCount.critical}</Badge>
                    <Badge className="bg-adani-amber/15 text-adani-amber border-adani-amber/30 text-xs" variant="outline">High: {agentSummary.priorityCount.high}</Badge>
                    <Badge className="bg-adani-text-secondary/15 text-adani-text-secondary border-adani-text-secondary/30 text-xs" variant="outline">Medium: {agentSummary.priorityCount.medium}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: 'OTIF %', tip: TIPS.otif, value: <span className={`text-2xl font-bold ${getOtifColor(data.transportation.otifPct)}`}>{data.transportation.otifPct}%</span>, sub: <div className={`mt-1.5 w-full h-1.5 rounded-full ${getOtifBg(data.transportation.otifPct)}`}><div className={`h-full rounded-full ${data.transportation.otifPct >= 85 ? 'bg-adani-green' : data.transportation.otifPct >= 70 ? 'bg-adani-amber' : 'bg-adani-red'}`} style={{ width: `${data.transportation.otifPct}%` }} /></div> },
            { label: 'Freight/Unit', tip: TIPS.freightCost, value: <span className="text-2xl font-bold text-adani-text-primary">{fmtINR(data.transportation.freightCostPerUnit)}</span>, sub: <span className="text-[10px] text-adani-text-secondary mt-1">per unit shipped</span> },
            { label: 'Vehicle Fill', tip: TIPS.vehicleFill, value: <MiniGauge value={data.transportation.avgVehicleFillRatePct} label="Target 75-85%" color={data.transportation.avgVehicleFillRatePct >= 75 ? 'hsl(var(--adani-green))' : 'hsl(var(--adani-amber))'} /> },
            { label: 'Pending Orders', tip: TIPS.importPendency, value: <span className="text-2xl font-bold text-adani-text-primary">{data.stoPendency.totalPending}</span>, sub: <span className="text-[10px] text-adani-red font-semibold mt-1">{data.stoPendency.criticalPendingOver48h} critical (&gt;48h)</span> },
            { label: 'Warehouse Util', tip: TIPS.warehouseUtil, value: <MiniGauge value={data.warehouseUtilisation.avgUtilisationPct} label={`${data.warehouseUtilisation.totalWarehouses} warehouses`} color={getUtilColor(data.warehouseUtilisation.avgUtilisationPct)} /> },
            { label: 'Below Safety', tip: TIPS.belowSafety, value: <span className={`text-2xl font-bold ${data.inventory.belowSafetyStockCount > 0 ? 'text-adani-red' : 'text-adani-green'}`}>{data.inventory.belowSafetyStockCount}</span>, sub: <span className="text-[10px] text-adani-text-secondary mt-1">of {data.inventory.totalSkus} SKUs</span> },
          ].map((kpi, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>
              <Card className="bg-adani-surface-elevated border-adani-border hover:shadow-md hover:border-adani-navy/20 transition-all duration-200 h-full">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="flex items-center text-[10px] text-adani-text-secondary uppercase tracking-wider mb-2">
                    {kpi.label}<InfoTip text={kpi.tip} />
                  </div>
                  {kpi.value}
                  {kpi.sub}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Transportation + Recommended Actions — FULL WIDTH STACKED */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Transportation Chart (3/5) */}
          <Card className="lg:col-span-3 bg-adani-surface-elevated border-adani-border">
            <CardHeader className="pb-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <CardTitle className="text-base font-semibold flex items-center gap-2">
                  <Truck className="w-4 h-4 text-adani-navy" /> Transportation by Leg Type
                </CardTitle>
                <div className="flex gap-1 bg-adani-surface rounded-lg p-0.5">
                  {(['shipmentCount', 'totalFreightCost', 'avgFreightPerShipment'] as const).map(m => (
                    <button key={m} onClick={() => setChartMetric(m)}
                      className={`text-[10px] px-3 py-1.5 rounded-md font-medium transition-colors ${chartMetric === m ? 'bg-adani-navy text-white' : 'text-adani-text-secondary hover:text-adani-text-primary'}`}>
                      {metricLabels[m]}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--adani-border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--adani-text-secondary))' }} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--adani-text-secondary))' }} tickFormatter={v => chartMetric !== 'shipmentCount' ? `₹${(v / 1000).toFixed(0)}k` : v} />
                      <RechartsTooltip contentStyle={{ background: 'hsl(var(--adani-navy))', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} formatter={(v: number) => chartMetric !== 'shipmentCount' ? fmtINR(v) : v} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {chartData.map((_, i) => <Cell key={i} fill={LEG_COLORS[i]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-adani-border">
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary">Leg Type</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Shipments</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Total Freight</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Distance</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.transportation.byLegType.map((l, i) => (
                        <TableRow key={i} className="border-adani-border">
                          <TableCell className="font-medium text-sm">{l.legType}</TableCell>
                          <TableCell className="text-right text-sm">{l.shipmentCount}</TableCell>
                          <TableCell className="text-right text-sm">{fmtINR(l.totalFreightCost)}</TableCell>
                          <TableCell className="text-right text-sm">{fmt(l.totalDistanceKm)} km</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Actions (2/5) */}
          <Card className="lg:col-span-2 bg-adani-surface-elevated border-adani-border flex flex-col">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Zap className="w-4 h-4 text-adani-amber" /> Recommended Actions
              </CardTitle>
              <p className="text-[10px] text-adani-text-secondary mt-0.5">AI agent proposes — you approve</p>
            </CardHeader>
            <CardContent className="space-y-2.5 overflow-y-auto flex-1">
              {recommendedActions.map((action) => {
                const style = severityStyle(action.priority);
                return (
                  <div key={action.id} className={`rounded-lg border p-3 ${style.bg} ${style.border} space-y-1.5`}>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className={`text-[9px] uppercase flex-shrink-0 ${priorityColor(action.priority)}`}>
                        {action.priority}
                      </Badge>
                      <span className="text-xs font-semibold text-adani-text-primary leading-tight">{action.title}</span>
                    </div>
                    <p className="text-[11px] text-adani-text-secondary leading-relaxed">{action.reasoning}</p>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <ArrowRight className="w-3 h-3 text-adani-green flex-shrink-0" />
                      <span className="text-adani-text-primary font-medium">{action.suggestedAction}</span>
                    </div>
                    <div className="text-[10px] text-adani-green font-semibold">Impact: {action.estimatedImpact}</div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Import Pendency + Agent Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Import Pendency (3/5) */}
          <Card className="lg:col-span-3 bg-adani-surface-elevated border-adani-border">
            <Collapsible open={pendencyOpen} onOpenChange={setPendencyOpen}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-adani-amber" /> Import Order Pendency
                    </CardTitle>
                    {pendencyOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="bg-adani-surface rounded-lg p-3 text-center">
                      <p className="text-[10px] text-adani-text-secondary uppercase">Total Pending</p>
                      <p className="text-xl font-bold">{data.stoPendency.totalPending}</p>
                    </div>
                    <div className="bg-adani-red/5 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-adani-red uppercase">Critical (&gt;48h)</p>
                      <p className="text-xl font-bold text-adani-red">{data.stoPendency.criticalPendingOver48h}</p>
                    </div>
                    <div className="bg-adani-surface rounded-lg p-3 text-center">
                      <p className="text-[10px] text-adani-text-secondary uppercase">Qty Pending</p>
                      <p className="text-xl font-bold">{fmt(data.stoPendency.totalQtyPending)}</p>
                    </div>
                    <div className="bg-adani-green/5 rounded-lg p-3 text-center">
                      <p className="text-[10px] text-adani-green uppercase">Shipped</p>
                      <p className="text-xl font-bold text-adani-green">{data.stoPendency.shippedCount}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 flex-wrap">
                    {data.stoPendency.byPriority.map((p, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-[10px] ${priorityColor(p.priority)}`}>{p.priority}</Badge>
                        <span className="text-sm font-medium">{p.count} orders</span>
                        <span className="text-xs text-adani-text-secondary">({fmt(p.totalQtyOrdered)} units)</span>
                      </div>
                    ))}
                  </div>

                  <div className="overflow-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-adani-border">
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Order #</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Material</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Qty</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Target</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Created</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Expected</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Priority</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Aging (h)</TableHead>
                          <TableHead className="text-[10px] uppercase text-adani-text-secondary">Customs</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {sortedStos.map((s, i) => (
                          <TableRow key={i} className={`border-adani-border ${s.agingHours > 48 ? 'bg-adani-red/5' : ''}`}>
                            <TableCell className="font-mono text-xs">{s.stoNumber}</TableCell>
                            <TableCell className="text-xs">{s.materialId}</TableCell>
                            <TableCell className="text-right text-xs">{fmt(s.quantityOrdered)}</TableCell>
                            <TableCell className="text-xs">{s.targetDc}</TableCell>
                            <TableCell className="text-xs">{s.creationDate}</TableCell>
                            <TableCell className="text-xs">{s.expectedDeliveryDate}</TableCell>
                            <TableCell><Badge variant="outline" className={`text-[10px] ${priorityColor(s.priorityScore)}`}>{s.priorityScore}</Badge></TableCell>
                            <TableCell className={`text-right text-xs font-semibold ${s.agingHours > 48 ? 'text-adani-red' : ''}`}>{s.agingHours}</TableCell>
                            <TableCell><Badge variant="outline" className={`text-[10px] ${customsColor(s.customsStatus)}`}>{s.customsStatus}</Badge></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>

          {/* Agent Insights (2/5) */}
          <Card className="lg:col-span-2 bg-adani-surface-elevated border-adani-border flex flex-col">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-adani-amber" /> Agent Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 overflow-y-auto flex-1">
              {agentInsights.map((insight) => {
                const style = severityStyle(insight.severity);
                return (
                  <div key={insight.id} className={`rounded-lg border p-3 ${style.bg} ${style.border}`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                      <Badge variant="outline" className={`text-[9px] uppercase ${style.text} border-current`}>
                        {insight.severity}
                      </Badge>
                      <span className="text-[10px] text-adani-text-secondary uppercase tracking-wider">{insight.category}</span>
                    </div>
                    <p className="text-xs text-adani-text-primary leading-relaxed">{insight.insight}</p>
                    {insight.value !== undefined && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <span className="text-xs font-bold text-adani-text-primary">
                          {typeof insight.value === 'number' && insight.value > 1000 ? fmtINR(insight.value) : insight.value}
                        </span>
                        {insight.target && (
                          <span className="text-[10px] text-adani-text-secondary">Target: {insight.target}</span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Warehouse + Ask the AI */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Warehouse Utilisation (3/5) */}
          <Card className="lg:col-span-3 bg-adani-surface-elevated border-adani-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Warehouse className="w-4 h-4 text-adani-navy" /> Warehouse Utilisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data.warehouseUtilisation.warehouses.map(w => ({ name: w.warehouseId, utilisation: w.utilisationPct }))} barSize={36}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--adani-border))" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--adani-text-secondary))' }} />
                      <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--adani-text-secondary))' }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                      <RechartsTooltip contentStyle={{ background: 'hsl(var(--adani-navy))', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
                      <Bar dataKey="utilisation" radius={[6, 6, 0, 0]}>
                        {data.warehouseUtilisation.warehouses.map((w, i) => (
                          <Cell key={i} fill={getUtilColor(w.utilisationPct)} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-adani-border">
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary">Warehouse</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Util %</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Occupied</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Capacity</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.warehouseUtilisation.warehouses.map((w, i) => (
                        <TableRow key={i} className="border-adani-border">
                          <TableCell className="font-medium text-xs">{w.warehouseId}</TableCell>
                          <TableCell className="text-right text-xs font-semibold">{w.utilisationPct}%</TableCell>
                          <TableCell className="text-right text-xs">{fmt(w.occupiedPallets)}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(w.totalPalletCapacity)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ask the AI (2/5) */}
          <Card className="lg:col-span-2 bg-adani-surface-elevated border-adani-border flex flex-col">
            <CardHeader className="pb-2 flex-shrink-0">
              <CardTitle className="text-sm font-semibold flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-adani-green" /> Ask the AI
              </CardTitle>
              <p className="text-[10px] text-adani-text-secondary">Natural language logistics queries</p>
            </CardHeader>
            <CardContent className="space-y-3 flex-1">
              <div className="flex flex-wrap gap-1.5">
                {conversationalQueries.map((q, i) => (
                  <button key={i} onClick={() => handleAskAI(q.query)}
                    className="text-[10px] bg-adani-navy/10 hover:bg-adani-navy/20 text-adani-navy px-2.5 py-1.5 rounded-full transition-colors text-left leading-tight">
                    {q.query}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <Input value={chatQuery} onChange={(e) => setChatQuery(e.target.value)}
                  placeholder="Ask about your logistics..."
                  className="text-xs bg-adani-surface border-adani-border text-adani-text-primary placeholder:text-adani-text-secondary"
                  onKeyDown={(e) => e.key === 'Enter' && chatQuery && handleAskAI(chatQuery)} />
                <Button size="sm" onClick={() => chatQuery && handleAskAI(chatQuery)}
                  className="bg-adani-navy hover:bg-adani-navy/90 text-white flex-shrink-0">
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>

              {chatResponse && (
                <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-adani-green/5 border border-adani-green/20 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Bot className="w-3.5 h-3.5 text-adani-green" />
                    <span className="text-[10px] font-semibold text-adani-green uppercase tracking-wider">AI Response</span>
                  </div>
                  <p className="text-xs text-adani-text-primary leading-relaxed">{chatResponse}</p>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Inventory */}
        <Card className="bg-adani-surface-elevated border-adani-border">
          <Collapsible open={inventoryOpen} onOpenChange={setInventoryOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Package className="w-4 h-4 text-adani-green" /> Inventory Summary
                    {data.inventory.belowSafetyStockCount > 0 && (
                      <Badge className="bg-adani-red/15 text-adani-red border-adani-red/30 text-[10px]" variant="outline">
                        {data.inventory.belowSafetyStockCount} below safety
                      </Badge>
                    )}
                  </CardTitle>
                  {inventoryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-adani-border">
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary">SKU ID</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary">Material</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Current</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Safety</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary text-right">Inbound</TableHead>
                        <TableHead className="text-[10px] uppercase text-adani-text-secondary">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.inventory.skuSummary.map((s, i) => (
                        <TableRow key={i} className={`border-adani-border ${s.belowSafetyStock ? 'bg-adani-red/5' : ''}`}>
                          <TableCell className="font-mono text-xs">{s.skuId}</TableCell>
                          <TableCell className="text-xs">{s.materialDescription}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.currentStockLevel)}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.safetyStockLevel)}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.inboundExpectedQty)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[10px] ${s.belowSafetyStock ? 'bg-adani-red/15 text-adani-red border-adani-red/30' : 'bg-adani-green/15 text-adani-green border-adani-green/30'}`}>
                              {s.belowSafetyStock ? 'Below Safety' : 'OK'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Agent Capabilities Strip */}
        <div className="flex flex-wrap items-center justify-center gap-3 py-2">
          {agentCapabilities.map((cap, i) => (
            <TooltipProvider key={i} delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2 bg-adani-navy/10 border border-adani-navy/20 rounded-full px-4 py-2 cursor-default hover:bg-adani-navy/15 transition-colors">
                    {i === 0 && <Search className="w-3.5 h-3.5 text-adani-navy" />}
                    {i === 1 && <Zap className="w-3.5 h-3.5 text-adani-amber" />}
                    {i === 2 && <MessageSquare className="w-3.5 h-3.5 text-adani-green" />}
                    {i === 3 && <Network className="w-3.5 h-3.5 text-adani-navy" />}
                    <span className="text-xs font-medium text-adani-text-primary">{cap.capability}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs text-xs bg-adani-navy text-white border-adani-navy/50">
                  {cap.description}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Last Updated */}
        <div className="text-center text-xs text-adani-text-secondary py-4">
          Last updated: {new Date(data.lastUpdated).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          <span className="mx-2">·</span>
          Source: {data.source}
          <span className="mx-2">·</span>
          <span className="text-adani-green">Agentic layer: {agenticData.source}</span>
        </div>
      </main>
    </div>
  );
};

export default AdaniGreensLogistics;

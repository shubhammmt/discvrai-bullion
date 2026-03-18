import React, { useState } from 'react';
import { AlertTriangle, Package, Truck, Warehouse, Info, ChevronDown, ChevronUp, Clock, Zap, Fan, Lightbulb as LightbulbIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Cell, Tooltip as RechartsTooltip } from 'recharts';
import data from '@/data/bajaj_supply_chain.json';

const TIPS: Record<string, string> = {
  otif: 'On-Time In-Full: % of shipments delivered on or before expected date with full quantity.',
  freightCost: 'Total freight cost ÷ total quantity shipped. Lower = more efficient.',
  vehicleFill: 'Actual payload vs. max vehicle capacity. Target 75–85%.',
  stoPendency: 'Stock Transport Orders not yet shipped. Critical = aging > 48 hours.',
  warehouseUtil: 'Occupied pallets ÷ total pallet capacity. 65–80% is optimal.',
  belowSafety: 'SKUs where current stock < minimum safety threshold.',
};

const InfoTip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider delayDuration={200}>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="w-3.5 h-3.5 text-bajaj-text-secondary hover:text-bajaj-text-primary cursor-help inline-block ml-1.5 opacity-60 hover:opacity-100 transition-opacity" />
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-xs leading-relaxed bg-bajaj-navy text-white border-bajaj-navy/50">
        {text}
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const fmt = (n: number) => n.toLocaleString('en-IN');
const fmtINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

const getOtifColor = (v: number) => v >= 85 ? 'text-bajaj-green' : v >= 70 ? 'text-bajaj-amber' : 'text-bajaj-red';
const getUtilColor = (v: number) => v >= 65 && v <= 80 ? 'hsl(var(--bajaj-green))' : v > 80 ? 'hsl(var(--bajaj-amber))' : 'hsl(var(--bajaj-red))';

const priorityColor = (p: string) => {
  const pl = p.toLowerCase();
  if (pl === 'high' || pl === 'critical') return 'bg-bajaj-red/15 text-bajaj-red border-bajaj-red/30';
  if (pl === 'medium') return 'bg-bajaj-amber/15 text-bajaj-amber border-bajaj-amber/30';
  return 'bg-bajaj-text-secondary/15 text-bajaj-text-secondary border-bajaj-text-secondary/30';
};

const alertStyle = (type: string) => {
  if (type === 'critical_sto') return 'bg-bajaj-red/10 border-bajaj-red/30 text-bajaj-red';
  if (type === 'low_stock') return 'bg-bajaj-amber/10 border-bajaj-amber/30 text-bajaj-amber';
  return 'bg-bajaj-amber/10 border-bajaj-amber/30 text-bajaj-amber';
};

const MiniGauge: React.FC<{ value: number; label: string; color: string }> = ({ value, label, color }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-20 h-10 overflow-hidden">
      <svg viewBox="0 0 100 50" className="w-full h-full">
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="hsl(var(--bajaj-border))" strokeWidth="8" strokeLinecap="round" />
        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${(value / 100) * 126} 126`} />
      </svg>
    </div>
    <span className="text-lg font-bold text-bajaj-text-primary">{value}%</span>
    <span className="text-[10px] text-bajaj-text-secondary uppercase tracking-wider">{label}</span>
  </div>
);

const LEG_COLORS = ['hsl(var(--bajaj-blue))', 'hsl(var(--bajaj-navy))', 'hsl(var(--bajaj-amber))'];

const BajajElectricalsDashboard: React.FC = () => {
  const [chartMetric, setChartMetric] = useState<'shipmentCount' | 'totalFreightCost' | 'avgFreightPerShipment'>('shipmentCount');
  const [pendencyOpen, setPendencyOpen] = useState(true);
  const [inventoryOpen, setInventoryOpen] = useState(true);

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

  return (
    <div className="min-h-screen bg-bajaj-surface text-bajaj-text-primary">
      {/* Header */}
      <header className="bg-bajaj-navy text-white px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-bajaj-blue/20 flex items-center justify-center">
              <Zap className="w-5 h-5 text-bajaj-blue" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">Bajaj Electricals — Supply Chain Control Tower</h1>
              <p className="text-xs text-white/60">DiscvrAI × Bajaj Electricals · Operational Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/50">
            <span className="flex items-center gap-1"><Fan className="w-3.5 h-3.5" /> Consumer Electricals</span>
            <span className="flex items-center gap-1"><LightbulbIcon className="w-3.5 h-3.5" /> Lighting & Appliances</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">

        {/* Alerts */}
        {data.alerts.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {data.alerts.map((a, i) => (
              <div key={i} className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${alertStyle(a.type)}`}>
                {a.type === 'critical_sto' ? <Clock className="w-4 h-4" /> : <Package className="w-4 h-4" />}
                <span>{a.message}</span>
                <Badge variant="outline" className="ml-auto border-current text-current text-[10px]">{a.count}</Badge>
              </div>
            ))}
          </div>
        )}

        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* OTIF */}
          <Card className="bg-bajaj-surface-elevated border-bajaj-border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center text-[10px] text-bajaj-text-secondary uppercase tracking-wider mb-2">
                OTIF %<InfoTip text={TIPS.otif} />
              </div>
              <span className={`text-3xl font-bold ${getOtifColor(data.transportation.otifPct)}`}>{data.transportation.otifPct}%</span>
              <div className="mt-2 w-full h-1.5 rounded-full bg-bajaj-green/10">
                <div className="h-full rounded-full bg-bajaj-green" style={{ width: `${data.transportation.otifPct}%` }} />
              </div>
            </CardContent>
          </Card>

          {/* Freight/Unit */}
          <Card className="bg-bajaj-surface-elevated border-bajaj-border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center text-[10px] text-bajaj-text-secondary uppercase tracking-wider mb-2">
                Freight/Unit<InfoTip text={TIPS.freightCost} />
              </div>
              <span className="text-3xl font-bold text-bajaj-text-primary">{fmtINR(data.transportation.freightCostPerUnit)}</span>
              <span className="text-[10px] text-bajaj-text-secondary mt-1">per unit shipped</span>
            </CardContent>
          </Card>

          {/* Vehicle Fill Rate */}
          <Card className="bg-bajaj-surface-elevated border-bajaj-border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center text-[10px] text-bajaj-text-secondary uppercase tracking-wider mb-2">
                Vehicle Fill<InfoTip text={TIPS.vehicleFill} />
              </div>
              <MiniGauge value={data.transportation.avgVehicleFillRatePct} label="Target 75-85%" color={data.transportation.avgVehicleFillRatePct >= 75 ? 'hsl(var(--bajaj-green))' : 'hsl(var(--bajaj-amber))'} />
            </CardContent>
          </Card>

          {/* Pending STOs */}
          <Card className="bg-bajaj-surface-elevated border-bajaj-border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center text-[10px] text-bajaj-text-secondary uppercase tracking-wider mb-2">
                Pending STOs<InfoTip text={TIPS.stoPendency} />
              </div>
              <span className="text-3xl font-bold text-bajaj-text-primary">{data.stoPendency.totalPending}</span>
              <span className="text-[10px] text-bajaj-red font-semibold mt-1">{data.stoPendency.criticalPendingOver48h} critical (&gt;48h)</span>
            </CardContent>
          </Card>

          {/* Warehouse Util */}
          <Card className="bg-bajaj-surface-elevated border-bajaj-border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center text-[10px] text-bajaj-text-secondary uppercase tracking-wider mb-2">
                Warehouse Util<InfoTip text={TIPS.warehouseUtil} />
              </div>
              <MiniGauge value={data.warehouseUtilisation.avgUtilisationPct} label={`${data.warehouseUtilisation.totalWarehouses} warehouses`} color={getUtilColor(data.warehouseUtilisation.avgUtilisationPct)} />
            </CardContent>
          </Card>

          {/* Below Safety */}
          <Card className="bg-bajaj-surface-elevated border-bajaj-border hover:shadow-md transition-shadow">
            <CardContent className="p-4 flex flex-col items-center">
              <div className="flex items-center text-[10px] text-bajaj-text-secondary uppercase tracking-wider mb-2">
                Below Safety<InfoTip text={TIPS.belowSafety} />
              </div>
              <span className={`text-3xl font-bold ${data.inventory.belowSafetyStockCount > 0 ? 'text-bajaj-red' : 'text-bajaj-green'}`}>
                {data.inventory.belowSafetyStockCount}
              </span>
              <span className="text-[10px] text-bajaj-text-secondary mt-1">of {data.inventory.totalSkus} SKUs</span>
            </CardContent>
          </Card>
        </div>

        {/* Transportation by Leg Type */}
        <Card className="bg-bajaj-surface-elevated border-bajaj-border">
          <CardHeader className="pb-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Truck className="w-4 h-4 text-bajaj-navy" /> Transportation by Leg Type
              </CardTitle>
              <div className="flex gap-1 bg-bajaj-surface rounded-lg p-0.5">
                {(['shipmentCount', 'totalFreightCost', 'avgFreightPerShipment'] as const).map(m => (
                  <button key={m} onClick={() => setChartMetric(m)}
                    className={`text-[10px] px-3 py-1.5 rounded-md font-medium transition-colors ${chartMetric === m ? 'bg-bajaj-navy text-white' : 'text-bajaj-text-secondary hover:text-bajaj-text-primary'}`}>
                    {metricLabels[m]}
                  </button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--bajaj-border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(var(--bajaj-text-secondary))' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--bajaj-text-secondary))' }} tickFormatter={v => chartMetric !== 'shipmentCount' ? `₹${(v / 1000).toFixed(0)}k` : String(v)} />
                    <RechartsTooltip
                      contentStyle={{ background: 'hsl(var(--bajaj-navy))', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }}
                      formatter={(v: number) => chartMetric !== 'shipmentCount' ? fmtINR(v) : v}
                    />
                    <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                      {chartData.map((_, i) => <Cell key={i} fill={LEG_COLORS[i]} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-bajaj-border">
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Leg Type</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Shipments</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Total Freight</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Distance</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Avg/Shipment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.transportation.byLegType.map((l, i) => (
                      <TableRow key={i} className="border-bajaj-border">
                        <TableCell className="font-medium text-sm">{l.legType}</TableCell>
                        <TableCell className="text-right text-sm">{l.shipmentCount}</TableCell>
                        <TableCell className="text-right text-sm">{fmtINR(l.totalFreightCost)}</TableCell>
                        <TableCell className="text-right text-sm">{fmt(l.totalDistanceKm)} km</TableCell>
                        <TableCell className="text-right text-sm">{fmtINR(l.avgFreightPerShipment)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STO Pendency */}
        <Card className="bg-bajaj-surface-elevated border-bajaj-border">
          <Collapsible open={pendencyOpen} onOpenChange={setPendencyOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-bajaj-amber" /> STO Pendency
                  </CardTitle>
                  {pendencyOpen ? <ChevronUp className="w-4 h-4 text-bajaj-text-secondary" /> : <ChevronDown className="w-4 h-4 text-bajaj-text-secondary" />}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-bajaj-surface rounded-lg p-3 text-center">
                    <p className="text-[10px] text-bajaj-text-secondary uppercase">Total Pending</p>
                    <p className="text-xl font-bold">{data.stoPendency.totalPending}</p>
                  </div>
                  <div className="bg-bajaj-red/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-bajaj-red uppercase">Critical (&gt;48h)</p>
                    <p className="text-xl font-bold text-bajaj-red">{data.stoPendency.criticalPendingOver48h}</p>
                  </div>
                  <div className="bg-bajaj-surface rounded-lg p-3 text-center">
                    <p className="text-[10px] text-bajaj-text-secondary uppercase">Qty Pending</p>
                    <p className="text-xl font-bold">{fmt(data.stoPendency.totalQtyPending)}</p>
                  </div>
                  <div className="bg-bajaj-green/5 rounded-lg p-3 text-center">
                    <p className="text-[10px] text-bajaj-green uppercase">Shipped</p>
                    <p className="text-xl font-bold text-bajaj-green">{data.stoPendency.shippedCount}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  {data.stoPendency.byPriority.map((p, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Badge variant="outline" className={`text-[10px] ${priorityColor(p.priority)}`}>{p.priority}</Badge>
                      <span className="text-sm font-medium">{p.count} orders</span>
                      <span className="text-xs text-bajaj-text-secondary">({fmt(p.totalQtyOrdered)} units)</span>
                    </div>
                  ))}
                </div>

                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-bajaj-border">
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">STO #</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Material ID</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Qty</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Target DC</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Created</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Expected</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Priority</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Aging (h)</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sortedStos.map((s, i) => (
                        <TableRow key={i} className={`border-bajaj-border ${s.agingHours > 48 ? 'bg-bajaj-red/5' : ''}`}>
                          <TableCell className="font-mono text-xs">{s.stoNumber}</TableCell>
                          <TableCell className="text-xs">{s.materialId}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.quantityOrdered)}</TableCell>
                          <TableCell className="text-xs">{s.targetDc}</TableCell>
                          <TableCell className="text-xs">{s.creationDate}</TableCell>
                          <TableCell className="text-xs">{s.expectedDeliveryDate}</TableCell>
                          <TableCell><Badge variant="outline" className={`text-[10px] ${priorityColor(s.priorityScore)}`}>{s.priorityScore}</Badge></TableCell>
                          <TableCell className={`text-right text-xs font-semibold ${s.agingHours > 48 ? 'text-bajaj-red' : ''}`}>{s.agingHours}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>

        {/* Warehouse Utilisation */}
        <Card className="bg-bajaj-surface-elevated border-bajaj-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Warehouse className="w-4 h-4 text-bajaj-navy" /> Warehouse Utilisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.warehouseUtilisation.warehouses.map(w => ({ name: w.warehouseId, utilisation: w.utilisationPct }))} barSize={40}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--bajaj-border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 10, fill: 'hsl(var(--bajaj-text-secondary))' }} />
                    <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--bajaj-text-secondary))' }} domain={[0, 100]} tickFormatter={v => `${v}%`} />
                    <RechartsTooltip contentStyle={{ background: 'hsl(var(--bajaj-navy))', border: 'none', borderRadius: 8, color: '#fff', fontSize: 12 }} />
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
                    <TableRow className="border-bajaj-border">
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Warehouse</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Util %</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Occupied</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Capacity</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Stock</TableHead>
                      <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Inbound</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.warehouseUtilisation.warehouses.map((w, i) => (
                      <TableRow key={i} className="border-bajaj-border">
                        <TableCell className="font-medium text-xs">{w.warehouseId}</TableCell>
                        <TableCell className="text-right text-xs font-semibold">{w.utilisationPct}%</TableCell>
                        <TableCell className="text-right text-xs">{fmt(w.occupiedPallets)}</TableCell>
                        <TableCell className="text-right text-xs">{fmt(w.totalPalletCapacity)}</TableCell>
                        <TableCell className="text-right text-xs">{fmt(w.currentStockLevel)}</TableCell>
                        <TableCell className="text-right text-xs">{fmt(w.inboundExpectedQty)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Inventory Summary */}
        <Card className="bg-bajaj-surface-elevated border-bajaj-border">
          <Collapsible open={inventoryOpen} onOpenChange={setInventoryOpen}>
            <CollapsibleTrigger asChild>
              <CardHeader className="cursor-pointer pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <Package className="w-4 h-4 text-bajaj-blue" /> Inventory Summary
                  </CardTitle>
                  {inventoryOpen ? <ChevronUp className="w-4 h-4 text-bajaj-text-secondary" /> : <ChevronDown className="w-4 h-4 text-bajaj-text-secondary" />}
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent>
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-bajaj-border">
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">SKU ID</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Material</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Current</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Safety</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary text-right">Inbound</TableHead>
                        <TableHead className="text-[10px] uppercase text-bajaj-text-secondary">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.inventory.skuSummary.map((s, i) => (
                        <TableRow key={i} className={`border-bajaj-border ${s.belowSafetyStock ? 'bg-bajaj-red/5' : ''}`}>
                          <TableCell className="font-mono text-xs">{s.skuId}</TableCell>
                          <TableCell className="text-xs">{s.materialDescription}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.currentStockLevel)}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.safetyStockLevel)}</TableCell>
                          <TableCell className="text-right text-xs">{fmt(s.inboundExpectedQty)}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`text-[10px] ${s.belowSafetyStock ? 'bg-bajaj-red/15 text-bajaj-red border-bajaj-red/30' : 'bg-bajaj-green/15 text-bajaj-green border-bajaj-green/30'}`}>
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

        {/* Last Updated */}
        <div className="text-center text-xs text-bajaj-text-secondary py-4">
          Last updated: {new Date(data.lastUpdated).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
          <span className="mx-2">·</span>
          Source: {data.source}
        </div>
      </main>
    </div>
  );
};

export default BajajElectricalsDashboard;

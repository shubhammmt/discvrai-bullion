import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Switch } from '@/components/ui/switch';
import {
  Database, Search, Shield, Filter, ChevronLeft, ChevronRight, AlertTriangle,
  Activity, CheckCircle2, Info, X, PackagePlus, Banknote, FileText, RefreshCw,
  ClipboardCheck, Archive, Eye, Clock, ShieldAlert, Image, FileCode, File,
  Maximize2, MapPin, Building2, Cpu, Signal, EyeOff, Zap, Calendar, Truck,
  User, Route, Camera, Video, Download, TrendingUp, TrendingDown, Wifi, WifiOff,
  Battery, BatteryCharging, Box, Lock, Unlock, BarChart3, GitBranch, Brain, Wrench,
  Network, ShieldCheck
} from 'lucide-react';
import LineageMap from '@/components/cms-data-lake/LineageMap';
import ActionConsole from '@/components/cms-data-lake/ActionConsole';
import PredictiveIntelligence from '@/components/cms-data-lake/PredictiveIntelligence';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart,
  Tooltip as RechartsTooltip
} from 'recharts';
import {
  atmProfiles, dataHealthMetrics, getStatusColor, getSeverityColor, getPenaltyColor,
  formatINR, ATMProfile, generateBurnRates, generateErrorPatterns,
  generateEjLogs, generateTimelineEvents, generateOverageEvents,
  generateDigitalEvidence, generateRejectBin, generateReplenishmentPlan,
  generateHardwareErrors, generateCashOps
} from '@/data/cmsDataLake';

// ── InfoTip ──
const Tip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider><Tooltip><TooltipTrigger asChild>
    <Info className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-help inline-block ml-0.5" />
  </TooltipTrigger><TooltipContent className="max-w-[220px] text-[11px]"><p>{text}</p></TooltipContent></Tooltip></TooltipProvider>
);

const PAGE_SIZE = 30;

const CMSDataLake = () => {
  const [search, setSearch] = useState('');
  const [bankFilter, setBankFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [atRiskOnly, setAtRiskOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedATM, setSelectedATM] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState('status');
  const [ejSearch, setEjSearch] = useState('');
  const [previewDoc, setPreviewDoc] = useState<ReturnType<typeof generateDigitalEvidence>[0] | null>(null);
  const [timelineDetail, setTimelineDetail] = useState<ReturnType<typeof generateTimelineEvents>[0] | null>(null);

  const banks = useMemo(() => ['All', ...Array.from(new Set(atmProfiles.map(a => a.bank))).sort()], []);
  const regionsArr = useMemo(() => ['All', ...Array.from(new Set(atmProfiles.map(a => a.region))).sort()], []);

  const filtered = useMemo(() => {
    let list = atmProfiles;
    if (bankFilter !== 'All') list = list.filter(a => a.bank === bankFilter);
    if (regionFilter !== 'All') list = list.filter(a => a.region === regionFilter);
    if (riskFilter !== 'All') list = list.filter(a => a.penaltyRisk === riskFilter);
    if (atRiskOnly) list = list.filter(a => a.dataCompleteness < 50 || a.penaltyRisk !== 'None');
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(a => a.terminalId.toLowerCase().includes(q) || a.bank.toLowerCase().includes(q) || a.hub.toLowerCase().includes(q) || a.state.toLowerCase().includes(q)); }
    return list;
  }, [search, bankFilter, regionFilter, riskFilter, atRiskOnly]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const avgComp = filtered.length ? Math.round(filtered.reduce((s, a) => s + a.dataCompleteness, 0) / filtered.length) : 0;
  const onlineCount = filtered.filter(a => a.status === 'Online').length;
  const penaltyCount = filtered.filter(a => a.penaltyRisk !== 'None').length;

  // Drawer data
  const atm = selectedATM ? atmProfiles.find(a => a.terminalId === selectedATM) : null;
  const termTimeline = selectedATM ? timelineEvents.filter(e => e.terminalId === selectedATM) : [];
  const termEj = selectedATM ? ejLogs.filter(e => e.terminalId === selectedATM) : [];
  const termOverages = selectedATM ? overageEvents.filter(o => o.terminalId === selectedATM) : [];
  const termEvidence = selectedATM ? digitalEvidence.filter(d => d.terminalId === selectedATM) : [];
  const termErrors = selectedATM ? hardwareErrors.filter(h => h.terminalId === selectedATM) : [];
  const rejectBin = selectedATM ? rejectBinStatuses.find(r => r.terminalId === selectedATM) : null;
  const repPlan = selectedATM ? replenishmentPlans[selectedATM] : null;
  const filteredEj = ejSearch.trim() ? termEj.filter(e => (e.errorCode || '').toLowerCase().includes(ejSearch.toLowerCase()) || (e.errorDesc || '').toLowerCase().includes(ejSearch.toLowerCase()) || e.ticketId.toLowerCase().includes(ejSearch.toLowerCase())) : termEj;
  const burnRates = useMemo(() => selectedATM ? generateBurnRates(selectedATM) : [], [selectedATM]);
  const errorPatterns = useMemo(() => selectedATM ? generateErrorPatterns(selectedATM) : [], [selectedATM]);

  const getVerdict = (a: ATMProfile) => {
    const parts: string[] = [];
    parts.push(a.status === 'Online' ? 'Healthy machine' : a.status === 'Offline' ? '⚠ Machine OFFLINE' : '🔧 Under Maintenance');
    const hoursToLoad = Math.max(0, Math.round((new Date(a.nextReplenishmentDate).getTime() - new Date('2026-04-12T18:00:00').getTime()) / 3600000));
    parts.push(`Next load in ${hoursToLoad}h`);
    if (a.pendingClaimCount > 0) parts.push(`${a.pendingClaimCount} claim(s) at T+${a.claimRiskDay}`);
    if (a.penaltyRisk !== 'None') parts.push(a.penaltyRisk);
    if (Math.abs(a.balanceDrift) > 3000) parts.push(`Balance drift: ${formatINR(a.balanceDrift)}`);
    return parts.join(' · ');
  };

  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    indent_created: { icon: <PackagePlus className="h-3 w-3" />, color: 'text-blue-600 bg-blue-100' },
    cash_loaded: { icon: <Banknote className="h-3 w-3" />, color: 'text-emerald-600 bg-emerald-100' },
    ej_log: { icon: <FileText className="h-3 w-3" />, color: 'text-slate-600 bg-slate-100' },
    auto_recovery: { icon: <RefreshCw className="h-3 w-3" />, color: 'text-amber-600 bg-amber-100' },
    physical_eod: { icon: <ClipboardCheck className="h-3 w-3" />, color: 'text-purple-600 bg-purple-100' },
    overage_flag: { icon: <AlertTriangle className="h-3 w-3" />, color: 'text-red-600 bg-red-100' },
    reject_bin: { icon: <Archive className="h-3 w-3" />, color: 'text-slate-600 bg-slate-200' },
    error: { icon: <Zap className="h-3 w-3" />, color: 'text-red-600 bg-red-100' },
    transaction: { icon: <Banknote className="h-3 w-3" />, color: 'text-emerald-600 bg-emerald-50' },
    connectivity: { icon: <Wifi className="h-3 w-3" />, color: 'text-cyan-600 bg-cyan-100' },
    power: { icon: <BatteryCharging className="h-3 w-3" />, color: 'text-yellow-600 bg-yellow-100' },
  };

  const evidenceIcon = (type: string) => {
    switch (type) {
      case 'EJ File': return <FileCode className="h-4 w-4 text-blue-500" />;
      case 'MSP Log': return <FileText className="h-4 w-4 text-purple-500" />;
      case 'Counter JPEG': return <Image className="h-4 w-4 text-emerald-500" />;
      case 'Body Cam': return <Video className="h-4 w-4 text-rose-500" />;
      case 'Loading Slip': return <Download className="h-4 w-4 text-amber-500" />;
      default: return <File className="h-4 w-4 text-slate-400" />;
    }
  };

  const personaColor = (p: string) => {
    switch (p) {
      case 'High-Traffic Salary Site': return 'bg-blue-100 text-blue-700';
      case 'Commercial Hub': return 'bg-purple-100 text-purple-700';
      case 'Remote Area': return 'bg-slate-100 text-slate-700';
      case 'High-Risk Pilferage Zone': return 'bg-red-100 text-red-700';
      case 'Transit Corridor': return 'bg-cyan-100 text-cyan-700';
      default: return 'bg-emerald-100 text-emerald-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1">
              <Database className="h-3.5 w-3.5" /> UNIFIED EVENT FABRIC
            </div>
            <div>
              <h1 className="text-xs font-bold text-slate-900 leading-tight">Unified ATM Data Lake</h1>
              <p className="text-[9px] text-slate-500">70,000 ATMs · Full Lineage: Vault → Sub-Vault → Custodian → ATM → Recon → Complaint → Audit</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Data Governance Badge */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-emerald-200 bg-emerald-50">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              <div>
                <p className="text-[9px] font-bold text-emerald-700 leading-tight">Audit-Ready</p>
                <p className="text-[7px] text-emerald-600">Lineage Verified · Governed</p>
              </div>
            </div>
            <div className="relative w-60">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input placeholder="Search ATM ID, bank, hub..." value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="pl-7 h-7 text-[11px] border-slate-200" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="h-3 w-3 text-slate-400" /></button>}
            </div>
          </div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="bg-white border-b border-slate-100 px-4 py-1.5">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 flex-wrap">
          <Filter className="h-3 w-3 text-slate-400" />
          {[
            { val: bankFilter, set: setBankFilter, opts: banks, label: 'All Banks', w: 'w-[100px]' },
            { val: regionFilter, set: setRegionFilter, opts: regionsArr, label: 'All Regions', w: 'w-[100px]' },
          ].map((f, i) => (
            <Select key={i} value={f.val} onValueChange={v => { f.set(v); setPage(1); }}>
              <SelectTrigger className={`h-6 ${f.w} text-[10px] border-slate-200`}><SelectValue /></SelectTrigger>
              <SelectContent>{f.opts.map(o => <SelectItem key={o} value={o} className="text-[11px]">{o === 'All' ? f.label : o}</SelectItem>)}</SelectContent>
            </Select>
          ))}
          <Select value={riskFilter} onValueChange={v => { setRiskFilter(v); setPage(1); }}>
            <SelectTrigger className="h-6 w-[130px] text-[10px] border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[11px]">All Risk</SelectItem>
              <SelectItem value="None" className="text-[11px]">No Risk</SelectItem>
              <SelectItem value="Harmonizing Penalty Pending" className="text-[11px]">Penalty Pending</SelectItem>
              <SelectItem value="Under Review" className="text-[11px]">Under Review</SelectItem>
              <SelectItem value="Penalty Active" className="text-[11px]">Penalty Active</SelectItem>
            </SelectContent>
          </Select>
          <div className="h-4 w-px bg-slate-200 mx-1" />
          <div className="flex items-center gap-1.5">
            <Switch checked={atRiskOnly} onCheckedChange={v => { setAtRiskOnly(v); setPage(1); }} className="h-4 w-7" />
            <span className="text-[10px] text-slate-600 font-medium">At-Risk Only</span>
          </div>
          <div className="ml-auto text-[10px] text-slate-500">{filtered.length.toLocaleString()} ATMs · Page {page}/{totalPages || 1}</div>
        </div>
      </div>

      {/* PULSE */}
      <div className="px-4 py-2 bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto flex gap-2 items-stretch">
          <div className="flex gap-2 flex-1">
            {[
              { label: 'Fleet', value: filtered.length.toLocaleString(), sub: 'of 70,000', icon: Database, color: 'text-blue-600 bg-blue-50', tip: 'ATMs matching filters' },
              { label: 'Online', value: `${onlineCount}`, sub: `${filtered.length ? Math.round(onlineCount / filtered.length * 100) : 0}%`, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', tip: 'Connected and transacting' },
              { label: 'Data Health', value: `${avgComp}%`, sub: 'avg completeness', icon: Activity, color: avgComp >= 90 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50', tip: 'EOD + MSP + Identity sync rates' },
              { label: 'Penalty Risk', value: String(penaltyCount), sub: 'ATMs flagged', icon: AlertTriangle, color: penaltyCount > 0 ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50', tip: 'Pending Harmonizing Penalties' },
            ].map(k => (
              <div key={k.label} className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-100 bg-white min-w-0 flex-1">
                <div className={`h-7 w-7 rounded flex items-center justify-center shrink-0 ${k.color}`}><k.icon className="h-3.5 w-3.5" /></div>
                <div className="min-w-0">
                  <span className="text-[9px] text-slate-500 uppercase font-medium">{k.label}<Tip text={k.tip} /></span>
                  <p className="text-sm font-bold text-slate-900 leading-tight">{k.value}</p>
                  <p className="text-[9px] text-slate-400">{k.sub}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="w-52 border border-slate-100 rounded-md px-2.5 py-1.5 bg-white shrink-0">
            <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Source Health</p>
            {dataHealthMetrics.map(m => (
              <div key={m.label} className="flex items-center gap-1.5 mb-0.5 last:mb-0">
                <span className="text-[9px] text-slate-600 w-12 truncate">{m.label.split(' ')[0]}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${m.pct >= 95 ? 'bg-emerald-500' : m.pct >= 90 ? 'bg-blue-500' : m.pct >= 85 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.pct}%` }} />
                </div>
                <span className="text-[9px] font-bold text-slate-700 w-7 text-right">{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FLEET TABLE */}
      <div className="flex-1 px-4 py-2">
        <div className="max-w-[1600px] mx-auto rounded-md border border-slate-200 bg-white overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 h-7">
                  {['ATM ID','Bank','Hub','Type','Site Persona','Status','Balance (Proj.)','Next Replenish','Risk','Data %'].map(h => (
                    <TableHead key={h} className={`text-[9px] font-bold uppercase text-slate-500 py-1 ${h.includes('Balance') || h.includes('Data') ? 'text-right' : ''}`}>{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageData.map(a => (
                  <TableRow key={a.terminalId} onClick={() => { setSelectedATM(a.terminalId); setDrawerTab('status'); }}
                    className={`cursor-pointer h-7 hover:bg-blue-50/60 text-[11px] ${selectedATM === a.terminalId ? 'bg-blue-50' : ''}`}>
                    <TableCell className="py-1 font-mono font-bold text-slate-900">
                      {a.terminalId}
                      {a.highCashBurn && <Badge className="ml-1 text-[7px] px-0.5 py-0 bg-orange-100 text-orange-600">🔥</Badge>}
                      {a.frequentJam && <Badge className="ml-0.5 text-[7px] px-0.5 py-0 bg-red-100 text-red-600">⚡</Badge>}
                    </TableCell>
                    <TableCell className="py-1 text-slate-700">{a.bank}</TableCell>
                    <TableCell className="py-1 text-slate-600 max-w-[90px] truncate">{a.hub}, {a.state}</TableCell>
                    <TableCell className="py-1"><Badge variant="outline" className="text-[8px] px-1 py-0">{a.atmType}</Badge></TableCell>
                    <TableCell className="py-1"><Badge className={`text-[7px] px-1 py-0 ${personaColor(a.sitePersona)}`}>{a.sitePersona.split(' ').slice(0,2).join(' ')}</Badge></TableCell>
                    <TableCell className="py-1"><Badge className={`text-[8px] px-1 py-0 ${getStatusColor(a.status)}`}>{a.status}</Badge></TableCell>
                    <TableCell className="py-1 text-right font-mono text-[10px]">
                      {formatINR(a.systemBalance)}
                      {Math.abs(a.balanceDrift) > 3000 && (
                        <span className={`ml-1 text-[8px] font-bold ${a.balanceDrift < 0 ? 'text-red-500' : 'text-amber-500'}`}>
                          ({a.balanceDrift > 0 ? '+' : ''}{formatINR(a.balanceDrift)})
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="py-1 text-[10px] text-slate-500">{a.nextReplenishmentDate.split(' ')[0].slice(5)}</TableCell>
                    <TableCell className="py-1"><Badge className={`text-[8px] px-1 py-0 ${getPenaltyColor(a.penaltyRisk)}`}>{a.penaltyRisk === 'None' ? '—' : a.penaltyRisk.replace('Harmonizing Penalty ', '')}</Badge></TableCell>
                    <TableCell className="py-1 text-right"><span className={`font-bold ${a.dataCompleteness >= 90 ? 'text-emerald-600' : a.dataCompleteness >= 75 ? 'text-amber-600' : 'text-red-600'}`}>{a.dataCompleteness}%</span></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-100 bg-slate-50/50">
            <p className="text-[10px] text-slate-500">Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}</p>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="h-6 w-6 p-0"><ChevronLeft className="h-3.5 w-3.5" /></Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => { const s = Math.max(1, Math.min(page - 2, totalPages - 4)); const p = s + i; if (p > totalPages) return null; return (
                <Button key={p} variant={p === page ? 'default' : 'ghost'} size="sm" onClick={() => setPage(p)} className={`h-6 w-6 p-0 text-[10px] ${p === page ? 'bg-slate-900 text-white' : ''}`}>{p}</Button>
              ); })}
              <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="h-6 w-6 p-0"><ChevronRight className="h-3.5 w-3.5" /></Button>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ 7-TAB SIDE PANEL ═══ */}
      <Sheet open={!!selectedATM} onOpenChange={open => { if (!open) setSelectedATM(null); }}>
        <SheetContent side="right" className="w-full sm:max-w-3xl p-0 overflow-y-auto">
          {atm && (
            <div className="flex flex-col h-full">
              {/* Panel Header + Verdict */}
              <div className="px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
                <SheetHeader>
                  <SheetTitle className="text-sm font-bold flex items-center gap-2">
                    <span className="font-mono">{atm.terminalId}</span>
                    <Badge className={`text-[8px] ${getStatusColor(atm.status)}`}>{atm.status}</Badge>
                    <Badge className={`text-[7px] ${personaColor(atm.sitePersona)}`}>{atm.sitePersona}</Badge>
                  </SheetTitle>
                  <SheetDescription className="text-[10px]">{atm.bank} · {atm.hub}, {atm.state} · {atm.atmType} · {atm.region}</SheetDescription>
                </SheetHeader>
                <div className="mt-2 px-2.5 py-1.5 rounded-md bg-slate-50 border border-slate-200">
                  <p className="text-[10px] text-slate-700"><span className="font-bold text-slate-900">Verdict:</span> {getVerdict(atm)}</p>
                </div>
                <Tabs value={drawerTab} onValueChange={setDrawerTab} className="mt-2.5">
                  <TabsList className="h-7 w-full grid grid-cols-10">
                    <TabsTrigger value="status" className="text-[7px] h-6 gap-0.5 px-0.5"><Wifi className="h-3 w-3" /> Live</TabsTrigger>
                    <TabsTrigger value="dna" className="text-[7px] h-6 gap-0.5 px-0.5"><Cpu className="h-3 w-3" /> DNA</TabsTrigger>
                    <TabsTrigger value="lineage" className="text-[7px] h-6 gap-0.5 px-0.5"><Network className="h-3 w-3" /> Lineage</TabsTrigger>
                    <TabsTrigger value="ledger" className="text-[7px] h-6 gap-0.5 px-0.5"><FileText className="h-3 w-3" /> Ledger</TabsTrigger>
                    <TabsTrigger value="burns" className="text-[7px] h-6 gap-0.5 px-0.5"><BarChart3 className="h-3 w-3" /> Burns</TabsTrigger>
                    <TabsTrigger value="risk" className="text-[7px] h-6 gap-0.5 px-0.5"><AlertTriangle className="h-3 w-3" /> Risk</TabsTrigger>
                    <TabsTrigger value="actions" className="text-[7px] h-6 gap-0.5 px-0.5"><Wrench className="h-3 w-3" /> Actions</TabsTrigger>
                    <TabsTrigger value="ml" className="text-[7px] h-6 gap-0.5 px-0.5"><Brain className="h-3 w-3" /> ML</TabsTrigger>
                    <TabsTrigger value="planning" className="text-[7px] h-6 gap-0.5 px-0.5"><Calendar className="h-3 w-3" /> Plan</TabsTrigger>
                    <TabsTrigger value="evidence" className="text-[7px] h-6 gap-0.5 px-0.5"><Archive className="h-3 w-3" /> Logs</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Panel Body */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {/* ═══ TAB 1: LIVE STATUS ═══ */}
                {drawerTab === 'status' && (
                  <div className="space-y-3">
                    {/* Balance */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Balance Comparison</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-blue-50 rounded-lg p-2.5">
                          <p className="text-[9px] text-blue-600 font-medium">System Balance (Switch)<Tip text="Bank switch reported balance as of last sync." /></p>
                          <p className="text-lg font-bold text-blue-700 font-mono">{formatINR(atm.systemBalance)}</p>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-2.5">
                          <p className="text-[9px] text-amber-600 font-medium">Machine Balance<Tip text={`Calculated via EJ Logs or latest EOD Data. Last sync: ${atm.lastSync}.`} /></p>
                          <p className="text-lg font-bold text-amber-700 font-mono">{formatINR(atm.machineBalance)}</p>
                        </div>
                      </div>
                      {Math.abs(atm.balanceDrift) > 0 && (
                        <div className={`mt-2 px-2.5 py-1.5 rounded ${Math.abs(atm.balanceDrift) > 3000 ? 'bg-red-50 border border-red-200' : 'bg-slate-50 border border-slate-200'}`}>
                          <p className={`text-[10px] font-bold ${Math.abs(atm.balanceDrift) > 3000 ? 'text-red-600' : 'text-slate-600'}`}>
                            Balance Drift: <span className="font-mono">{atm.balanceDrift > 0 ? '+' : ''}{formatINR(atm.balanceDrift)}</span>
                            {Math.abs(atm.balanceDrift) > 3000 && ' — Investigate Required'}
                          </p>
                        </div>
                      )}
                    </div>
                    {/* Machine Specs */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Machine Specifications</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5 text-slate-400" /><span className="text-slate-600">Type: <span className="font-bold text-slate-900">{atm.atmType}</span></span></div>
                        <div className="flex items-center gap-1.5">
                          {atm.status === 'Online' ? <Wifi className="h-3.5 w-3.5 text-emerald-500" /> : <WifiOff className="h-3.5 w-3.5 text-red-500" />}
                          <span className="text-slate-600">Connectivity: <span className={`font-bold ${atm.status === 'Online' ? 'text-emerald-600' : 'text-red-600'}`}>{atm.status}</span></span>
                        </div>
                        <div className="flex items-center gap-1.5"><Archive className="h-3.5 w-3.5 text-slate-400" />
                          <span className="text-slate-600">Reject Bin: <span className={`font-bold ${rejectBin?.binType === 'Sealed' ? 'text-emerald-600' : 'text-amber-600'}`}>{rejectBin?.binType || 'Unknown'}</span>
                          {rejectBin?.cassetteSeal && <span className="text-[9px] text-slate-400"> ({rejectBin.cassetteSeal})</span>}</span>
                        </div>
                        <div className="flex items-center gap-1.5"><Signal className="h-3.5 w-3.5 text-slate-400" /><span className="text-slate-600">Last Sync: <span className="font-bold text-slate-900">{atm.lastSync.split(' ')[1]}</span></span></div>
                      </div>
                    </div>
                    {/* Connectivity History */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Network Connectivity Timeline<Tip text="Hourly network connectivity state history." /></p>
                      <div className="space-y-1">
                        <div className="flex gap-0.5">
                          {atm.connectivityHistory.map((c, i) => (
                            <TooltipProvider key={i}><Tooltip><TooltipTrigger asChild>
                              <div className={`h-4 flex-1 rounded-sm cursor-help ${c.state === 'Online' ? 'bg-emerald-400' : c.state === 'Offline' ? 'bg-red-400' : 'bg-amber-400'}`} />
                            </TooltipTrigger><TooltipContent className="text-[10px]">
                              <p className="font-bold">{c.timestamp.split(' ')[1]} — {c.state}</p>
                              <p>{c.duration}</p>
                              {c.state === 'Offline' && <p className="text-red-500 font-bold">⚠ Blind Window</p>}
                            </TooltipContent></Tooltip></TooltipProvider>
                          ))}
                        </div>
                        <div className="flex gap-3 mt-1 text-[8px] text-slate-500">
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-400" /> Online</span>
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-amber-400" /> Degraded</span>
                          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-400" /> Offline</span>
                        </div>
                      </div>
                    </div>
                    {/* Quick Insights */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Quick Insights</p>
                      <div className="flex flex-wrap gap-1.5">
                        {atm.highCashBurn && <Badge className="text-[9px] bg-orange-100 text-orange-700 gap-1">🔥 High Cash Burn Location</Badge>}
                        {atm.frequentJam && <Badge className="text-[9px] bg-red-100 text-red-700 gap-1">⚡ Frequent Jam Machine</Badge>}
                        {atm.pendingClaimCount > 0 && <Badge className="text-[9px] bg-purple-100 text-purple-700 gap-1">📋 {atm.pendingClaimCount} Pending Claims</Badge>}
                        {atm.penaltyRisk !== 'None' && <Badge className={`text-[9px] ${getPenaltyColor(atm.penaltyRisk)}`}>⚠ {atm.penaltyRisk}</Badge>}
                        {atm.dataCompleteness < 80 && <Badge className="text-[9px] bg-amber-100 text-amber-700">📊 Low Data Completeness</Badge>}
                        {atm.connectivityHistory.some(c => c.state === 'Offline') && <Badge className="text-[9px] bg-red-100 text-red-700">📡 Has Blind Windows</Badge>}
                        {!atm.highCashBurn && !atm.frequentJam && atm.pendingClaimCount === 0 && atm.penaltyRisk === 'None' && atm.dataCompleteness >= 80 && (
                          <Badge className="text-[9px] bg-emerald-100 text-emerald-700">✅ Clean — No Alerts</Badge>
                        )}
                      </div>
                    </div>
                    {/* Data Completeness */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <div className="flex justify-between mb-1.5"><span className="text-[9px] font-bold text-slate-500 uppercase">Data Completeness<Tip text="Combined score of EOD, MSP, and Identity data sync." /></span><span className="text-sm font-bold text-slate-900">{atm.dataCompleteness}%</span></div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${atm.dataCompleteness >= 95 ? 'bg-emerald-500' : atm.dataCompleteness >= 85 ? 'bg-blue-500' : atm.dataCompleteness >= 70 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${atm.dataCompleteness}%` }} />
                      </div>
                      {atm.dataCompleteness < 90 && (
                        <p className="text-[9px] text-amber-600 mt-1.5 font-medium">⚠ Missing EJ Logs for April 12th — Investigative Window Blinded</p>
                      )}
                    </div>
                  </div>
                )}

                {/* ═══ TAB 2: MACHINE DNA ═══ */}
                {drawerTab === 'dna' && (
                  <div className="space-y-3">
                    {/* Slot Mapping */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><Box className="h-3.5 w-3.5 text-blue-500" /> Slot Mapping (Master Data)<Tip text="Physical cassette configuration. Used to detect Denomination Drift." /></p>
                      <div className="grid grid-cols-4 gap-2">
                        {atm.slotMapping.map(s => {
                          const fillPct = Math.round(s.currentCount / s.capacity * 100);
                          const denomDrift = s.denom === 500 && s.currentCount > s.capacity * 0.9;
                          return (
                            <div key={s.slot} className={`rounded-lg p-2 border text-center ${denomDrift ? 'border-red-300 bg-red-50' : 'border-slate-200 bg-slate-50'}`}>
                              <p className="text-[8px] text-slate-400 uppercase font-bold">Slot {s.slot}</p>
                              <p className="text-sm font-bold text-slate-900">₹{s.denom}</p>
                              <div className="h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                                <div className={`h-full rounded-full ${fillPct > 80 ? 'bg-emerald-500' : fillPct > 40 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${fillPct}%` }} />
                              </div>
                              <p className="text-[9px] text-slate-600 mt-0.5">{s.currentCount}/{s.capacity}</p>
                              <p className="text-[8px] text-slate-400">{fillPct}% full</p>
                              {denomDrift && <p className="text-[7px] text-red-600 font-bold mt-0.5">⚠ DRIFT</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Cassette Inventory */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><Lock className="h-3.5 w-3.5 text-purple-500" /> Cassette Inventory</p>
                      <div className="rounded border overflow-hidden">
                        <Table>
                          <TableHeader><TableRow className="bg-slate-50 h-6">
                            <TableHead className="text-[9px] font-bold py-0.5">Cassette ID</TableHead>
                            <TableHead className="text-[9px] font-bold py-0.5">Slot</TableHead>
                            <TableHead className="text-[9px] font-bold py-0.5">Type</TableHead>
                            <TableHead className="text-[9px] font-bold py-0.5">Vault Packed</TableHead>
                            <TableHead className="text-[9px] font-bold py-0.5">Seal Verified</TableHead>
                          </TableRow></TableHeader>
                          <TableBody>
                            {atm.cassettes.map(c => (
                              <TableRow key={c.id} className="text-[10px] h-6">
                                <TableCell className="py-0.5 font-mono font-bold text-slate-800">{c.id}</TableCell>
                                <TableCell className="py-0.5">Slot {c.slot}</TableCell>
                                <TableCell className="py-0.5">
                                  <Badge className={`text-[8px] px-1 py-0 ${c.type === 'Sealed' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {c.type === 'Sealed' ? <Lock className="h-2.5 w-2.5 mr-0.5" /> : <Unlock className="h-2.5 w-2.5 mr-0.5" />}
                                    {c.type}
                                  </Badge>
                                </TableCell>
                                <TableCell className="py-0.5">{c.vaultPacked ? <Badge className="text-[8px] px-1 py-0 bg-blue-100 text-blue-700">Yes</Badge> : <span className="text-slate-400">No</span>}</TableCell>
                                <TableCell className="py-0.5 text-[9px] text-slate-500">{c.lastSealVerified.split(' ')[0].slice(5)} {c.lastSealVerified.split(' ')[1]}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Location Context */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-rose-500" /> Location Context & Site Persona</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div><span className="text-slate-500">Site Persona:</span> <Badge className={`text-[9px] ${personaColor(atm.sitePersona)}`}>{atm.sitePersona}</Badge></div>
                        <div><span className="text-slate-500">Hub:</span> <span className="font-bold text-slate-900">{atm.hub}</span></div>
                        <div><span className="text-slate-500">State:</span> <span className="font-bold text-slate-900">{atm.state}</span></div>
                        <div><span className="text-slate-500">Region:</span> <span className="font-bold text-slate-900">{atm.region}</span></div>
                        <div><span className="text-slate-500">Replenishment Path:</span> <Badge variant="outline" className="text-[9px]">{atm.replenishmentPath}</Badge></div>
                        <div><span className="text-slate-500">Route:</span> <span className="font-mono text-slate-800">{atm.routeId}</span></div>
                      </div>
                      {atm.sitePersona === 'High-Risk Pilferage Zone' && (
                        <div className="mt-2 px-2 py-1.5 bg-red-50 border border-red-200 rounded">
                          <p className="text-[10px] font-bold text-red-600">🔴 High-Risk Zone — Enhanced custody protocols active. Dual-key verification required.</p>
                        </div>
                      )}
                      {atm.sitePersona === 'High-Traffic Salary Site' && (
                        <div className="mt-2 px-2 py-1.5 bg-blue-50 border border-blue-200 rounded">
                          <p className="text-[10px] font-bold text-blue-600">📊 Salary Site — Expect peak cash burn on 1st, 7th, 15th. Auto-indent threshold: ₹5L.</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ═══ TAB: LINEAGE MAP ═══ */}
                {drawerTab === 'lineage' && (
                  <div className="space-y-3">
                    <LineageMap
                      terminalId={atm.terminalId}
                      custodianName={atm.custodianName}
                      vaultPacked={atm.cassettes.some(c => c.vaultPacked)}
                    />
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2">Extended Event Timeline</p>
                      <div className="space-y-1.5">
                        {[
                          { time: '05:45', label: 'Vault Loading', detail: 'Cash packed at CMS Vault — Mumbai Central. Camera-assisted verification completed.', warn: false, icon: <Lock className="h-3 w-3 text-purple-500" /> },
                          { time: '06:00', label: 'Sub-Vault Movement', detail: 'Cassettes moved to Sub-Vault W-12 for CIT dispatch.', warn: false, icon: <Box className="h-3 w-3 text-blue-500" /> },
                          { time: '06:30', label: 'CIT Handover', detail: `Custodian ${atm.custodianName} received sealed cassettes. Route: ${atm.routeId}`, warn: false, icon: <User className="h-3 w-3 text-slate-500" /> },
                          { time: '07:15', label: 'ATM Cash Load', detail: 'CLL uploaded. 4 cassettes swapped. All seals verified.', warn: false, icon: <Banknote className="h-3 w-3 text-emerald-500" /> },
                          ...(atm.frequentJam ? [{ time: '09:12', label: 'FLM Intervention', detail: 'Auto-recovery triggered. FLM notified for physical check.', warn: true, icon: <Wrench className="h-3 w-3 text-amber-500" /> }] : []),
                          { time: '18:00', label: 'EOD Reconciliation', detail: 'Physical count completed. Balance drift documented.', warn: false, icon: <ClipboardCheck className="h-3 w-3 text-purple-500" /> },
                          { time: 'Scheduled', label: 'Audit Action', detail: 'Next audit cycle: Q1-2026 (Apr 18–20). Risk assessment in progress.', warn: false, icon: <ShieldAlert className="h-3 w-3 text-indigo-500" /> },
                        ].map((ev, i) => (
                          <div key={i} className={`flex items-start gap-2 p-2 rounded border ${ev.warn ? 'border-amber-200 bg-amber-50' : 'border-slate-100 bg-white'}`}>
                            <span className="text-[9px] text-slate-400 font-mono w-12 shrink-0 pt-0.5">{ev.time}</span>
                            {ev.icon}
                            <div className="flex-1 min-w-0">
                              <p className="text-[10px] font-bold text-slate-900">{ev.label}</p>
                              <p className="text-[9px] text-slate-600">{ev.detail}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* ═══ TAB 3: MACHINE LEDGER (with Connectivity/Power) ═══ */}
                {drawerTab === 'ledger' && (
                  <div>
                    {termTimeline.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-8">No timeline events for this ATM.</p>
                    ) : (
                      <div className="relative pl-6 space-y-0">
                        <div className="absolute left-[9px] top-1 bottom-1 w-0.5 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100" />
                        {termTimeline.map(ev => {
                          const ic = iconMap[ev.type] || iconMap['ej_log'];
                          return (
                            <div key={ev.id} className="relative pb-2 last:pb-0 group cursor-pointer" onClick={() => setTimelineDetail(ev)}>
                              <div className={`absolute -left-6 top-1 h-5 w-5 rounded-full flex items-center justify-center ${ic.color} border-2 border-white shadow-sm`}>{ic.icon}</div>
                              <div className={`ml-1.5 rounded border p-2 text-[11px] transition-all group-hover:shadow-md group-hover:border-blue-300 ${ev.blindWindow ? 'border-red-400 bg-red-50 ring-1 ring-red-200' : getSeverityColor(ev.severity)}`}>
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="font-bold text-slate-900">{ev.title}</span>
                                  {ev.blindWindow && <Badge className="text-[7px] bg-red-200 text-red-800 px-1 py-0 animate-pulse">BLIND WINDOW</Badge>}
                                  {ev.suspectedOverage && <Badge className="text-[7px] bg-red-100 text-red-600 px-1 py-0">₹{ev.suspectedOverage.toLocaleString()} suspected</Badge>}
                                  <Eye className="h-2.5 w-2.5 text-slate-300 opacity-0 group-hover:opacity-100 ml-auto shrink-0" />
                                  <span className="text-[9px] text-slate-400">{ev.timestamp.split(' ')[1]}</span>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{ev.detail}</p>
                                {ev.blindWindow && (
                                  <p className="text-[9px] text-red-700 font-bold mt-1">⚠ Machine was OFFLINE during this period. Cash movements unverifiable.</p>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ═══ TAB 4: BURN RATES & PATTERNS ═══ */}
                {drawerTab === 'burns' && (
                  <div className="space-y-3">
                    {/* 30-Day Cash Burn */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><BarChart3 className="h-3.5 w-3.5 text-blue-500" /> 30-Day Cash Burn Pattern<Tip text="Daily dispensed vs loaded amounts. Explains why next indent is the forecasted amount." /></p>
                      <div className="h-[180px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={burnRates} margin={{ top: 5, right: 5, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="date" tick={{ fontSize: 8 }} interval={4} />
                            <YAxis tick={{ fontSize: 8 }} tickFormatter={v => `${(v / 100000).toFixed(0)}L`} />
                            <RechartsTooltip contentStyle={{ fontSize: 10 }} formatter={(v: number) => formatINR(v)} />
                            <Area type="monotone" dataKey="balance" fill="#dbeafe" stroke="#3b82f6" strokeWidth={1.5} name="Balance" />
                            <Bar dataKey="dispensed" fill="#f87171" name="Dispensed" />
                            <Bar dataKey="loaded" fill="#34d399" name="Loaded" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      <div className="flex gap-4 mt-1 text-[8px] text-slate-500 justify-center">
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-blue-300" /> Balance</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-red-400" /> Dispensed</span>
                        <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-sm bg-emerald-400" /> Loaded</span>
                      </div>
                    </div>

                    {/* Error Pattern History */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><TrendingUp className="h-3.5 w-3.5 text-red-500" /> Historical Error Patterns (4 Months)<Tip text="Monthly error occurrences. Rising trends indicate degrading hardware." /></p>
                      {errorPatterns.length === 0 ? (
                        <p className="text-[10px] text-slate-400 text-center py-4">No recurring errors detected.</p>
                      ) : (
                        <div className="space-y-2">
                          {errorPatterns.map(ep => (
                            <div key={ep.errorCode} className="rounded border border-slate-100 p-2">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] font-bold text-red-600">{ep.errorCode}</span>
                                <span className="text-[10px] text-slate-600 flex-1">{ep.errorDesc}</span>
                                <Badge className={`text-[7px] px-1 py-0 ${ep.trend === 'rising' ? 'bg-red-100 text-red-700' : ep.trend === 'declining' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                                  {ep.trend === 'rising' ? <TrendingUp className="h-2.5 w-2.5 mr-0.5" /> : ep.trend === 'declining' ? <TrendingDown className="h-2.5 w-2.5 mr-0.5" /> : null}
                                  {ep.trend}
                                </Badge>
                              </div>
                              <div className="flex items-end gap-1 h-8">
                                {ep.monthlyCount.map((c, i) => (
                                  <TooltipProvider key={i}><Tooltip><TooltipTrigger asChild>
                                    <div className="flex-1 flex flex-col items-center">
                                      <div className={`w-full rounded-t ${ep.trend === 'rising' ? 'bg-red-400' : 'bg-slate-300'}`} style={{ height: `${Math.max(4, c * 4)}px` }} />
                                      <span className="text-[7px] text-slate-400 mt-0.5">{ep.monthLabels[i]}</span>
                                    </div>
                                  </TooltipTrigger><TooltipContent className="text-[10px]">{ep.monthLabels[i]}: {c} occurrences</TooltipContent></Tooltip></TooltipProvider>
                                ))}
                              </div>
                              {ep.trend === 'rising' && <p className="text-[8px] text-red-600 font-medium mt-1">⚠ This error is increasing. Machine had {ep.errorDesc} {ep.monthlyCount[3]} times this month.</p>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ═══ TAB 5: RISK & PROBLEMS ═══ */}
                {drawerTab === 'risk' && (
                  <div className="space-y-3">
                    {termOverages.length > 0 && (
                      <div className="rounded-lg border border-red-200 bg-red-50/30 p-3">
                        <p className="text-[10px] font-bold text-red-700 mb-2 flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Harmonizing Penalty Tracker</p>
                        {termOverages.map(o => (
                          <div key={o.id} className={`p-2.5 rounded border mb-2 last:mb-0 ${o.penaltyApplicable ? 'border-red-200 bg-white' : 'border-emerald-200 bg-emerald-50'}`}>
                            <div className="flex justify-between text-[11px] mb-1">
                              <span className="font-bold">₹{o.amount.toLocaleString('en-IN')}</span>
                              <Badge className={`text-[8px] ${o.status === 'Unreported' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{o.status}</Badge>
                            </div>
                            <p className="text-[10px] text-slate-600">Detected: {o.detectedAt}</p>
                            {o.eodsPassed > 0 && <p className="text-[10px] font-semibold text-red-600 mt-1">⚠ {o.eodsPassed} EOD(s) passed without declaration — Penalty applicable</p>}
                          </div>
                        ))}
                      </div>
                    )}
                    {termEj.filter(e => e.status === 'Disputed').map(d => (
                      <div key={d.id} className="rounded-lg border border-amber-200 bg-amber-50/30 p-3">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> T+5 Claim Clock</span>
                          <Badge className="text-[9px] bg-amber-100 text-amber-700 font-mono">Day 3/5 — ₹100/day after T+5</Badge>
                        </div>
                        <p className="text-[11px] font-mono font-bold text-slate-800">{d.ticketId}</p>
                        <p className="text-[10px] text-slate-600 mt-0.5">{d.errorDesc}</p>
                        {d.amount && <p className="text-[11px] font-bold mt-1">₹{d.amount.toLocaleString('en-IN')}</p>}
                        <div className="mt-2 flex gap-0.5">{[1,2,3,4,5].map(day => <div key={day} className={`h-1.5 flex-1 rounded-full ${day <= 3 ? (day >= 3 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-200'}`} />)}</div>
                      </div>
                    ))}
                    {termErrors.length > 0 && (
                      <div className="rounded-lg border border-slate-200 p-3">
                        <p className="text-[10px] font-bold text-slate-700 mb-2 flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-red-500" /> Error Analysis</p>
                        <div className="rounded border overflow-hidden">
                          <Table>
                            <TableHeader><TableRow className="bg-slate-50 h-6">
                              <TableHead className="text-[9px] font-bold py-0.5">Code</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5">Description</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5">State</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5 text-right">Count</TableHead>
                            </TableRow></TableHeader>
                            <TableBody>
                              {termErrors.map(e => (
                                <TableRow key={e.id} className="text-[10px] h-6">
                                  <TableCell className="py-0.5 font-mono font-bold text-red-600">{e.errorCode}</TableCell>
                                  <TableCell className="py-0.5 text-slate-600">{e.errorDesc}</TableCell>
                                  <TableCell className="py-0.5"><Badge className={`text-[8px] px-1 py-0 ${e.machineState === 'Auto-Recovery' ? 'bg-amber-100 text-amber-700' : e.machineState === 'Hard-Failure' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{e.machineState}</Badge></TableCell>
                                  <TableCell className="py-0.5 text-right font-bold">{e.occurrences}</TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    )}
                    {termOverages.length === 0 && termEj.filter(e => e.status === 'Disputed').length === 0 && termErrors.length === 0 && (
                      <div className="text-center py-8"><CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" /><p className="text-xs text-slate-500">No active risk items for this ATM.</p></div>
                    )}
                  </div>
                )}

                {/* ═══ TAB: ACTION CONSOLE ═══ */}
                {drawerTab === 'actions' && (
                  <ActionConsole terminalId={atm.terminalId} />
                )}

                {/* ═══ TAB: ML PREDICTIVE INTELLIGENCE ═══ */}
                {drawerTab === 'ml' && (
                  <PredictiveIntelligence
                    terminalId={atm.terminalId}
                    frequentJam={atm.frequentJam}
                    highCashBurn={atm.highCashBurn}
                    balanceDrift={atm.balanceDrift}
                    pendingClaimCount={atm.pendingClaimCount}
                    dataCompleteness={atm.dataCompleteness}
                  />
                )}

                {/* ═══ TAB 6: PLANNING ═══ */}
                {drawerTab === 'planning' && (
                  <div className="space-y-3">
                    <div className="rounded-lg border border-blue-200 bg-blue-50/30 p-3">
                      <p className="text-[10px] font-bold text-blue-700 mb-2 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Next Replenishment</p>
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div><span className="text-slate-500">Date:</span> <span className="font-bold text-slate-900">{repPlan?.scheduledDate || atm.nextReplenishmentDate.split(' ')[0]}</span></div>
                        <div><span className="text-slate-500">Time:</span> <span className="font-bold text-slate-900">{repPlan?.scheduledTime || atm.nextReplenishmentDate.split(' ')[1]}</span></div>
                        <div><span className="text-slate-500">Amount:</span> <span className="font-bold text-slate-900 font-mono">{formatINR(repPlan?.forecastAmount || atm.nextReplenishmentAmount)}</span></div>
                        <div><span className="text-slate-500">Path:</span> <Badge variant="outline" className="text-[9px] px-1 py-0">{atm.replenishmentPath}</Badge></div>
                      </div>
                    </div>
                    {repPlan && (
                      <div className="rounded-lg border border-slate-200 p-3">
                        <p className="text-[10px] font-bold text-slate-700 mb-2">Denomination Breakout</p>
                        <div className="grid grid-cols-4 gap-2">
                          {repPlan.denomBreakdown.map(d => (
                            <div key={d.denom} className="bg-slate-50 rounded p-2 text-center">
                              <p className="text-[10px] text-slate-500">₹{d.denom}</p>
                              <p className="text-sm font-bold text-slate-900">{d.count.toLocaleString()}</p>
                              <p className="text-[9px] text-slate-400">{formatINR(d.total)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[10px] font-bold text-slate-700 mb-2 flex items-center gap-1"><User className="h-3.5 w-3.5" /> Assigned Custodian</p>
                      <div className="text-[11px] space-y-1">
                        <div className="flex justify-between"><span className="text-slate-500">Name:</span><span className="font-bold text-slate-900">{atm.custodianName}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Route ID:</span><span className="font-mono text-slate-800">{atm.routeId}</span></div>
                        <div className="flex justify-between"><span className="text-slate-500">Route Path:</span><Badge variant="outline" className="text-[9px]">{atm.replenishmentPath}</Badge></div>
                        {repPlan && (
                          <>
                            <div className="flex justify-between"><span className="text-slate-500">Total Visits:</span><span className="font-bold">{repPlan.custodianHistory.totalVisits}</span></div>
                            <div className="flex justify-between"><span className="text-slate-500">Avg Delay:</span><span>{repPlan.custodianHistory.avgDelay}</span></div>
                          </>
                        )}
                      </div>
                      {atm.custodianRiskFlag && (
                        <div className="mt-2 px-2 py-1.5 bg-red-50 border border-red-200 rounded">
                          <p className="text-[10px] font-bold text-red-600">🔴 Security Note: Custodian has {repPlan?.custodianHistory.redFlags || 1} red flag(s) in this region</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* ═══ TAB 7: RAW LOG EXPLORER & EVIDENCE ═══ */}
                {drawerTab === 'evidence' && (
                  <div className="space-y-3">
                    {/* Raw Log Explorer */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><FileCode className="h-3.5 w-3.5 text-blue-500" /> Raw Log Explorer<Tip text="Click any log to view raw data with error highlights." /></p>
                      <div className="relative mb-2">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                        <Input placeholder="Search by ticket, error code..." value={ejSearch} onChange={e => setEjSearch(e.target.value)}
                          className="pl-7 h-6 text-[10px] border-slate-200" />
                      </div>
                      {filteredEj.length === 0 ? (
                        <p className="text-[10px] text-slate-400 text-center py-4">No EJ records found.</p>
                      ) : (
                        <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] max-h-[300px] overflow-auto space-y-0.5">
                          {filteredEj.map(ej => {
                            const isError = ej.type === 'Error' || ej.status === 'Failed';
                            const isDisputed = ej.status === 'Disputed';
                            return (
                              <div key={ej.id} className={`flex gap-2 px-1 py-0.5 rounded ${isError ? 'bg-red-900/30' : isDisputed ? 'bg-amber-900/30' : 'hover:bg-slate-800'}`}>
                                <span className="text-slate-500 shrink-0">{ej.timestamp.split(' ')[1]}</span>
                                <span className={`shrink-0 ${isError ? 'text-red-400 font-bold' : isDisputed ? 'text-amber-400 font-bold' : 'text-green-400'}`}>
                                  {ej.type === 'Error' ? 'ERR' : ej.type === 'AutoRecovery' ? 'RCV' : ej.type === 'Maintenance' ? 'MNT' : 'TXN'}
                                </span>
                                <span className="text-slate-400">{ej.ticketId}</span>
                                {ej.errorCode && <span className="text-red-400 font-bold">{ej.errorCode}</span>}
                                {ej.errorDesc && <span className={isError ? 'text-red-300' : 'text-slate-300'}>{ej.errorDesc}</span>}
                                {ej.amount && <span className="text-emerald-400">₹{ej.amount.toLocaleString('en-IN')}</span>}
                                <span className={`ml-auto shrink-0 ${ej.status === 'Success' ? 'text-emerald-500' : ej.status === 'Failed' ? 'text-red-500' : ej.status === 'Disputed' ? 'text-amber-500' : 'text-cyan-500'}`}>{ej.status}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Data Lineage */}
                    <div className="rounded-lg border border-slate-200 p-3">
                      <p className="text-[9px] font-bold text-slate-500 uppercase mb-2 flex items-center gap-1"><GitBranch className="h-3.5 w-3.5 text-purple-500" /> Data Lineage & Sync Status</p>
                      {termEvidence.length === 0 ? (
                        <p className="text-[10px] text-slate-400 text-center py-4">No documents linked.</p>
                      ) : (
                        <div className="space-y-1.5">
                          {termEvidence.map(d => (
                            <div key={d.id} onClick={() => setPreviewDoc(d)}
                              className="group cursor-pointer flex items-center gap-2 p-2 rounded border border-slate-100 hover:border-blue-300 hover:shadow-sm transition-all">
                              {/* Thumbnail / preview */}
                              {d.type === 'Counter JPEG' || d.type === 'Body Cam' ? (
                                <div className="h-10 w-14 bg-slate-200 rounded flex items-center justify-center shrink-0">
                                  {d.type === 'Counter JPEG' ? <Camera className="h-4 w-4 text-slate-400" /> : <Video className="h-4 w-4 text-slate-400" />}
                                </div>
                              ) : d.type === 'EJ File' ? (
                                <div className="h-10 w-14 bg-slate-900 rounded p-1 overflow-hidden shrink-0">
                                  <p className="text-[6px] font-mono text-green-400 leading-tight whitespace-pre">{d.preview?.split('\n').slice(0, 3).join('\n') || '...'}</p>
                                </div>
                              ) : d.type === 'MSP Log' ? (
                                <div className="h-10 w-14 bg-slate-800 rounded p-1 overflow-hidden shrink-0">
                                  <p className="text-[6px] font-mono text-cyan-300 leading-tight whitespace-pre">{d.preview?.split('\n').slice(0, 3).join('\n') || '...'}</p>
                                </div>
                              ) : (
                                <div className="h-10 w-14 bg-slate-100 rounded flex items-center justify-center shrink-0">{evidenceIcon(d.type)}</div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-medium text-slate-800 truncate">{d.filename}</p>
                                <p className="text-[8px] text-slate-400">{d.type} · {d.size}</p>
                                {d.syncSource && (
                                  <p className="text-[8px] text-purple-500 mt-0.5">
                                    Synced via <span className="font-bold">{d.syncSource}</span> at {d.syncTimestamp?.split(' ')[1]}
                                  </p>
                                )}
                              </div>
                              <Maximize2 className="h-3 w-3 text-slate-300 opacity-0 group-hover:opacity-100 shrink-0" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Timeline Detail Modal */}
      <Dialog open={!!timelineDetail} onOpenChange={() => setTimelineDetail(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle className="text-sm font-bold">{timelineDetail?.title}</DialogTitle></DialogHeader>
          {timelineDetail && (
            <div className="space-y-3">
              <div className={`p-3 rounded-lg border ${timelineDetail.blindWindow ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-200'}`}>
                <p className="text-xs text-slate-600">{timelineDetail.detail}</p>
                <p className="text-[10px] text-slate-400 mt-1">{timelineDetail.timestamp}</p>
                {timelineDetail.blindWindow && (
                  <div className="mt-2 px-2 py-1.5 bg-red-100 border border-red-300 rounded">
                    <p className="text-[10px] font-bold text-red-700">⚠ BLIND WINDOW — Machine was offline during this period. Any cash movements during this time are unverifiable and should be treated as suspicious.</p>
                  </div>
                )}
              </div>
              {timelineDetail.suspectedOverage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-[10px] font-bold text-red-700">⚠ Suspected Overage: ₹{timelineDetail.suspectedOverage.toLocaleString('en-IN')}</p>
                  <p className="text-[10px] text-red-600 mt-0.5">This amount may be stuck or unreported. Check reject bin and EJ correlation.</p>
                </div>
              )}
              {timelineDetail.linkedEntities && timelineDetail.linkedEntities.length > 0 && (
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase mb-1.5">Linked EJ Record</p>
                  {termEj.filter(e => timelineDetail.linkedEntities!.includes(e.id)).map(ej => (
                    <div key={ej.id} className="bg-slate-900 rounded-lg p-3 font-mono text-[11px] text-green-400 space-y-0.5">
                      <p>TICKET: {ej.ticketId}</p>
                      <p>TIME: {ej.timestamp}</p>
                      <p>TYPE: {ej.type}</p>
                      {ej.errorCode && <p className="text-red-400 font-bold">ERROR: {ej.errorCode} — {ej.errorDesc}</p>}
                      {ej.amount && <p>AMOUNT: ₹{ej.amount.toLocaleString('en-IN')}</p>}
                      <p>STATUS: {ej.status}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Evidence Preview */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2">
              {previewDoc && evidenceIcon(previewDoc.type)}{previewDoc?.filename}
              {previewDoc?.syncSource && <span className="text-[9px] font-normal text-purple-500 ml-2">via {previewDoc.syncSource} @ {previewDoc.syncTimestamp?.split(' ')[1]}</span>}
            </DialogTitle>
          </DialogHeader>
          {previewDoc?.type === 'EJ File' && (
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-[11px] max-h-[400px] overflow-auto whitespace-pre leading-relaxed">
              {previewDoc.preview?.split('\n').map((line, i) => {
                const isError = line.includes('ERROR') || line.includes('JAM') || line.includes('FAILURE');
                const isRecovery = line.includes('RECOVERY');
                const isDispute = line.includes('DISPUTE');
                return (
                  <div key={i} className={`${isError ? 'text-red-400 font-bold bg-red-900/20 px-1 rounded' : isRecovery ? 'text-amber-400' : isDispute ? 'text-amber-300 bg-amber-900/20 px-1 rounded' : 'text-green-400'}`}>
                    {line}
                  </div>
                );
              })}
            </div>
          )}
          {previewDoc?.type === 'MSP Log' && (
            <div className="bg-slate-800 rounded-lg p-4 font-mono text-[11px] max-h-[400px] overflow-auto whitespace-pre leading-relaxed">
              {previewDoc.preview?.split('\n').map((line, i) => {
                const isAlert = line.includes('ALERT');
                const isLost = line.includes('LOST');
                return (
                  <div key={i} className={`${isAlert ? 'text-red-400 font-bold' : isLost ? 'text-red-300 bg-red-900/20 px-1 rounded' : 'text-cyan-300'}`}>
                    {line}
                  </div>
                );
              })}
            </div>
          )}
          {previewDoc && ['Counter JPEG', 'Body Cam'].includes(previewDoc.type) && (
            <div className="bg-slate-100 rounded-lg p-8 flex flex-col items-center">
              <div className="w-full max-w-[300px] h-[200px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                {previewDoc.type === 'Counter JPEG' ? <Camera className="h-12 w-12 text-slate-400" /> : <Video className="h-12 w-12 text-slate-400" />}
              </div>
              <p className="text-xs text-slate-500 mt-2">{previewDoc.type} · {previewDoc.size}</p>
            </div>
          )}
          {previewDoc && !['EJ File', 'MSP Log', 'Counter JPEG', 'Body Cam'].includes(previewDoc.type) && (
            <div className="bg-slate-50 rounded-lg p-8 text-center"><File className="h-12 w-12 text-slate-400 mx-auto mb-2" /><p className="text-sm text-slate-600">{previewDoc.filename}</p><p className="text-xs text-slate-400 mt-1">{previewDoc.size}</p></div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSDataLake;

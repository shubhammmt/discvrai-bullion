import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Database, Search, Shield, Filter, ChevronLeft, ChevronRight, AlertTriangle,
  Activity, CheckCircle2, Info, X, PackagePlus, Banknote, FileText, RefreshCw,
  ClipboardCheck, Archive, Eye, Clock, ShieldAlert, Image, FileCode, File, Maximize2,
  MapPin, Building2, Cpu, Signal, EyeOff
} from 'lucide-react';
import {
  atmProfiles, dataHealthMetrics, ejLogs, timelineEvents, overageEvents,
  digitalEvidence, cashOperations, getStatusColor, getSeverityColor, getPenaltyColor,
  formatINR, ATMProfile
} from '@/data/cmsDataLake';

// ── InfoTooltip ──
const InfoTip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-3 w-3 text-slate-400 hover:text-slate-600 cursor-help inline-block ml-0.5" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px] text-[11px]"><p>{text}</p></TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

// ── Mock EJ content for preview ──
const mockEjContent = `=== ELECTRONIC JOURNAL ===
Terminal: ATM-MUM-0001 | Date: 2026-04-12
09:12:34 | TXN_START  | Card: XXXX-4521
09:12:40 | BNA_ERROR  | Code: BNA-TJ01 | TRANSPORT JAM
09:12:41 | TXN_REVERSED | FAILED
09:14:01 | AUTO_RECOVERY | Jam auto-cleared
09:22:15 | TXN_SUCCESS | ₹10,000 dispensed`;

const mockMspLog = `[MSP Log — ATM-MUM-0001]
[06:30:00] SYSTEM_BOOT: OK
[07:15:00] CASH_LOAD: CIT Rajesh Sharma
[09:12:40] ALERT: BNA TRANSPORT JAM
[09:14:01] AUTO_RECOVERY: Jam cleared
[18:00:00] EOD_VISIT: Agent Ramesh K.`;

const healthTooltips: Record<string, string> = {
  'EJ Logs Synced': 'Electronic Journal logs successfully pulled from ATM hardware today.',
  'CLL Uploaded': 'Custodian successfully uploaded the digital Cash Loading Slip.',
  'EOD Reports Filed': 'End-of-Day physical verification reports filed by field agents.',
  'MSP Logs Available': 'Machine State & Performance logs from ATM monitoring software.',
  'Identity Data Complete': 'Terminal ID, Bank, Region, Hub, ATM Type fully mapped.',
};

const PAGE_SIZE = 25;

const CMSDataLake = () => {
  // ── State ──
  const [search, setSearch] = useState('');
  const [bankFilter, setBankFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [penaltyFilter, setPenaltyFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [atRiskOnly, setAtRiskOnly] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedATM, setSelectedATM] = useState<string | null>(null);
  const [drawerTab, setDrawerTab] = useState('timeline');
  const [ejSearch, setEjSearch] = useState('');
  const [previewDoc, setPreviewDoc] = useState<typeof digitalEvidence[0] | null>(null);

  // ── Derived ──
  const banks = useMemo(() => ['All', ...Array.from(new Set(atmProfiles.map(a => a.bank))).sort()], []);
  const regionsArr = useMemo(() => ['All', ...Array.from(new Set(atmProfiles.map(a => a.region))).sort()], []);

  const filtered = useMemo(() => {
    let list = atmProfiles;
    if (bankFilter !== 'All') list = list.filter(a => a.bank === bankFilter);
    if (regionFilter !== 'All') list = list.filter(a => a.region === regionFilter);
    if (typeFilter !== 'All') list = list.filter(a => a.atmType === typeFilter);
    if (penaltyFilter !== 'All') list = list.filter(a => a.penaltyRisk === penaltyFilter);
    if (atRiskOnly) list = list.filter(a => a.dataCompleteness < 50 || a.penaltyRisk !== 'None');
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a =>
        a.terminalId.toLowerCase().includes(q) ||
        a.bank.toLowerCase().includes(q) ||
        a.hub.toLowerCase().includes(q) ||
        a.state.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, bankFilter, regionFilter, penaltyFilter, typeFilter, atRiskOnly]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const pageData = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Pulse metrics based on filtered set
  const avgComp = filtered.length ? Math.round(filtered.reduce((s, a) => s + a.dataCompleteness, 0) / filtered.length) : 0;
  const onlineCount = filtered.filter(a => a.status === 'Online').length;
  const penaltyCount = filtered.filter(a => a.penaltyRisk !== 'None').length;
  const offlineCount = filtered.filter(a => a.status === 'Offline').length;

  // Drawer data
  const atm = selectedATM ? atmProfiles.find(a => a.terminalId === selectedATM) : null;
  const termTimeline = selectedATM ? timelineEvents.filter(e => e.terminalId === selectedATM) : [];
  const termEj = selectedATM ? ejLogs.filter(e => e.terminalId === selectedATM) : [];
  const termOverages = selectedATM ? overageEvents.filter(o => o.terminalId === selectedATM) : [];
  const termEvidence = selectedATM ? digitalEvidence.filter(d => d.terminalId === selectedATM) : [];
  const termCash = selectedATM ? cashOperations.filter(c => c.terminalId === selectedATM) : [];

  const filteredEj = ejSearch.trim()
    ? termEj.filter(e => (e.errorCode || '').toLowerCase().includes(ejSearch.toLowerCase()) || (e.errorDesc || '').toLowerCase().includes(ejSearch.toLowerCase()) || e.ticketId.toLowerCase().includes(ejSearch.toLowerCase()))
    : termEj;

  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    indent_created: { icon: <PackagePlus className="h-3 w-3" />, color: 'text-blue-600 bg-blue-100' },
    cash_loaded: { icon: <Banknote className="h-3 w-3" />, color: 'text-emerald-600 bg-emerald-100' },
    ej_log: { icon: <FileText className="h-3 w-3" />, color: 'text-slate-600 bg-slate-100' },
    auto_recovery: { icon: <RefreshCw className="h-3 w-3" />, color: 'text-amber-600 bg-amber-100' },
    physical_eod: { icon: <ClipboardCheck className="h-3 w-3" />, color: 'text-purple-600 bg-purple-100' },
    overage_flag: { icon: <AlertTriangle className="h-3 w-3" />, color: 'text-red-600 bg-red-100' },
    reject_bin: { icon: <Archive className="h-3 w-3" />, color: 'text-slate-600 bg-slate-200' },
  };

  const getCountdown = (detectedAt: string) => {
    const detected = new Date(detectedAt);
    const deadline = new Date(detected.getTime() + 5 * 24 * 60 * 60 * 1000);
    const now = new Date('2026-04-12T18:00:00');
    const remaining = deadline.getTime() - now.getTime();
    const days = Math.max(0, Math.floor(remaining / (24 * 60 * 60 * 1000)));
    const hours = Math.max(0, Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)));
    return { days, hours, expired: remaining <= 0 };
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* ═══ HEADER ═══ */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-slate-900 text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1">
              <Database className="h-3.5 w-3.5" /> DATA LAKE
            </div>
            <div>
              <h1 className="text-xs font-bold text-slate-900 leading-tight">Unified ATM Data Lake</h1>
              <p className="text-[9px] text-slate-500">70,000 ATMs · Real-time · Machine Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <Input
                placeholder="Search ATM ID, bank, hub..."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="pl-7 h-7 text-[11px] border-slate-200"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2">
                  <X className="h-3 w-3 text-slate-400" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1">
              <Shield className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-[9px] text-slate-500">Audit-Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* ═══ FILTER BAR ═══ */}
      <div className="bg-white border-b border-slate-100 px-4 py-1.5">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 flex-wrap">
          <Filter className="h-3 w-3 text-slate-400" />
          <Select value={bankFilter} onValueChange={v => { setBankFilter(v); setPage(1); }}>
            <SelectTrigger className="h-6 w-[100px] text-[10px] border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>{banks.map(b => <SelectItem key={b} value={b} className="text-[11px]">{b === 'All' ? 'All Banks' : b}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={v => { setRegionFilter(v); setPage(1); }}>
            <SelectTrigger className="h-6 w-[100px] text-[10px] border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>{regionsArr.map(r => <SelectItem key={r} value={r} className="text-[11px]">{r === 'All' ? 'All Regions' : r}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={v => { setTypeFilter(v); setPage(1); }}>
            <SelectTrigger className="h-6 w-[100px] text-[10px] border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[11px]">All Types</SelectItem>
              <SelectItem value="Standard" className="text-[11px]">Standard</SelectItem>
              <SelectItem value="Recycler" className="text-[11px]">Recycler</SelectItem>
            </SelectContent>
          </Select>
          <Select value={penaltyFilter} onValueChange={v => { setPenaltyFilter(v); setPage(1); }}>
            <SelectTrigger className="h-6 w-[130px] text-[10px] border-slate-200"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="All" className="text-[11px]">All Penalty Status</SelectItem>
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
          <div className="ml-auto text-[10px] text-slate-500">
            {filtered.length.toLocaleString()} ATMs · Page {page}/{totalPages || 1}
          </div>
        </div>
      </div>

      {/* ═══ PULSE ═══ */}
      <div className="px-4 py-2 bg-white border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto flex gap-2 items-stretch">
          {/* KPI chips */}
          <div className="flex gap-2 flex-1">
            {[
              { label: 'Fleet', value: filtered.length.toLocaleString(), sub: 'of 70,000', icon: Database, color: 'text-blue-600 bg-blue-50', tip: 'Total ATMs matching current filters.' },
              { label: 'Online', value: `${onlineCount.toLocaleString()}`, sub: `${filtered.length ? Math.round(onlineCount / filtered.length * 100) : 0}%`, icon: CheckCircle2, color: 'text-emerald-600 bg-emerald-50', tip: 'ATMs currently connected and transacting.' },
              { label: 'Data Health', value: `${avgComp}%`, sub: 'avg completeness', icon: Activity, color: avgComp >= 90 ? 'text-emerald-600 bg-emerald-50' : 'text-amber-600 bg-amber-50', tip: 'Average data completeness combining EJ, CLL, EOD, MSP sync rates.' },
              { label: 'Penalty Risk', value: penaltyCount.toString(), sub: 'ATMs flagged', icon: AlertTriangle, color: penaltyCount > 0 ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50', tip: 'ATMs with pending or active Harmonizing Penalties.' },
              { label: 'Offline', value: offlineCount.toString(), sub: 'disconnected', icon: ShieldAlert, color: offlineCount > 0 ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50', tip: 'ATMs not reachable for data sync.' },
            ].map(kpi => (
              <div key={kpi.label} className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-100 bg-white min-w-0 flex-1">
                <div className={`h-7 w-7 rounded flex items-center justify-center shrink-0 ${kpi.color}`}>
                  <kpi.icon className="h-3.5 w-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-0.5">
                    <span className="text-[9px] text-slate-500 uppercase font-medium">{kpi.label}</span>
                    <InfoTip text={kpi.tip} />
                  </div>
                  <p className="text-sm font-bold text-slate-900 leading-tight">{kpi.value}</p>
                  <p className="text-[9px] text-slate-400">{kpi.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Completeness mini-bars */}
          <div className="w-56 border border-slate-100 rounded-md px-2.5 py-1.5 bg-white shrink-0">
            <p className="text-[9px] font-bold text-slate-500 uppercase mb-1">Source Completeness</p>
            {dataHealthMetrics.map(m => (
              <div key={m.label} className="flex items-center gap-1.5 mb-0.5 last:mb-0">
                <span className="text-[9px] text-slate-600 w-14 truncate">{m.label.replace(' Synced', '').replace(' Uploaded', '').replace(' Available', '').replace(' Filed', '').replace(' Complete', '')}</span>
                <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${m.pct >= 95 ? 'bg-emerald-500' : m.pct >= 90 ? 'bg-blue-500' : m.pct >= 85 ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${m.pct}%` }} />
                </div>
                <span className="text-[9px] font-bold text-slate-700 w-8 text-right">{m.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ FLEET TABLE ═══ */}
      <div className="flex-1 px-4 py-2">
        <div className="max-w-[1600px] mx-auto">
          <div className="rounded-md border border-slate-200 bg-white overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-slate-50 h-7">
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">ATM ID</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Bank</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Region</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">State</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Hub</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Type</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Status</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1 text-right">Data %</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Penalty Risk</TableHead>
                    <TableHead className="text-[9px] font-bold uppercase text-slate-500 py-1">Last Sync</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pageData.map(a => (
                    <TableRow
                      key={a.terminalId}
                      onClick={() => { setSelectedATM(a.terminalId); setDrawerTab('timeline'); }}
                      className={`cursor-pointer h-7 hover:bg-blue-50/60 text-[11px] ${selectedATM === a.terminalId ? 'bg-blue-50' : ''}`}
                    >
                      <TableCell className="py-1 font-mono font-bold text-slate-900">{a.terminalId}</TableCell>
                      <TableCell className="py-1 text-slate-700">{a.bank}</TableCell>
                      <TableCell className="py-1 text-slate-600">{a.region}</TableCell>
                      <TableCell className="py-1 text-slate-600">{a.state}</TableCell>
                      <TableCell className="py-1 text-slate-600 max-w-[100px] truncate">{a.hub}</TableCell>
                      <TableCell className="py-1">
                        <Badge variant="outline" className="text-[9px] px-1 py-0">{a.atmType}</Badge>
                      </TableCell>
                      <TableCell className="py-1">
                        <Badge className={`text-[9px] px-1.5 py-0 ${getStatusColor(a.status)}`}>{a.status}</Badge>
                      </TableCell>
                      <TableCell className="py-1 text-right">
                        <span className={`font-bold ${a.dataCompleteness >= 90 ? 'text-emerald-600' : a.dataCompleteness >= 75 ? 'text-amber-600' : 'text-red-600'}`}>
                          {a.dataCompleteness}%
                        </span>
                      </TableCell>
                      <TableCell className="py-1">
                        <Badge className={`text-[9px] px-1.5 py-0 ${getPenaltyColor(a.penaltyRisk)}`}>
                          {a.penaltyRisk === 'None' ? '—' : a.penaltyRisk}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-1 text-[10px] text-slate-400">{a.lastSync.split(' ')[1]}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-3 py-1.5 border-t border-slate-100 bg-slate-50/50">
              <p className="text-[10px] text-slate-500">
                Showing {((page - 1) * PAGE_SIZE) + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length.toLocaleString()}
              </p>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" disabled={page <= 1} onClick={() => setPage(p => p - 1)} className="h-6 w-6 p-0">
                  <ChevronLeft className="h-3.5 w-3.5" />
                </Button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
                  const p = start + i;
                  if (p > totalPages) return null;
                  return (
                    <Button key={p} variant={p === page ? 'default' : 'ghost'} size="sm" onClick={() => setPage(p)}
                      className={`h-6 w-6 p-0 text-[10px] ${p === page ? 'bg-slate-900 text-white' : ''}`}>
                      {p}
                    </Button>
                  );
                })}
                <Button variant="ghost" size="sm" disabled={page >= totalPages} onClick={() => setPage(p => p + 1)} className="h-6 w-6 p-0">
                  <ChevronRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ SIDE DRAWER ═══ */}
      <Sheet open={!!selectedATM} onOpenChange={(open) => { if (!open) setSelectedATM(null); }}>
        <SheetContent side="right" className="w-full sm:max-w-2xl p-0 overflow-y-auto">
          {atm && (
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="px-4 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
                <SheetHeader>
                  <SheetTitle className="text-sm font-bold flex items-center gap-2">
                    <span className="font-mono">{atm.terminalId}</span>
                    <Badge className={`text-[9px] ${getStatusColor(atm.status)}`}>{atm.status}</Badge>
                    {atm.penaltyRisk !== 'None' && (
                      <Badge className={`text-[9px] ${getPenaltyColor(atm.penaltyRisk)}`}>{atm.penaltyRisk}</Badge>
                    )}
                  </SheetTitle>
                  <SheetDescription className="text-[10px]">
                    {atm.bank} · {atm.hub}, {atm.state} · {atm.atmType} · {atm.region} Region · Data: {atm.dataCompleteness}%
                  </SheetDescription>
                </SheetHeader>

                {/* Profile chips */}
                <div className="flex gap-3 mt-2 text-[10px] text-slate-600">
                  <span className="flex items-center gap-1"><Building2 className="h-3 w-3 text-slate-400" />{atm.bank}</span>
                  <span className="flex items-center gap-1"><MapPin className="h-3 w-3 text-slate-400" />{atm.hub}</span>
                  <span className="flex items-center gap-1"><Cpu className="h-3 w-3 text-slate-400" />{atm.atmType}</span>
                  <span className="flex items-center gap-1"><Signal className="h-3 w-3 text-slate-400" />Sync: {atm.lastSync.split(' ')[1]}</span>
                </div>

                {/* Drawer Tabs */}
                <Tabs value={drawerTab} onValueChange={setDrawerTab} className="mt-3">
                  <TabsList className="h-7 w-full grid grid-cols-4">
                    <TabsTrigger value="timeline" className="text-[10px] h-6">Timeline</TabsTrigger>
                    <TabsTrigger value="intel" className="text-[10px] h-6">Intelligence</TabsTrigger>
                    <TabsTrigger value="logs" className="text-[10px] h-6">Log Explorer</TabsTrigger>
                    <TabsTrigger value="evidence" className="text-[10px] h-6">Evidence</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto px-4 py-3">
                {/* ── TIMELINE TAB ── */}
                {drawerTab === 'timeline' && (
                  <div>
                    {termTimeline.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-8">No timeline events for this ATM.</p>
                    ) : (
                      <div className="relative pl-6 space-y-0">
                        <div className="absolute left-[9px] top-1 bottom-1 w-0.5 bg-gradient-to-b from-slate-300 via-slate-200 to-slate-100" />
                        {termTimeline.map(ev => {
                          const ic = iconMap[ev.type] || { icon: <FileText className="h-3 w-3" />, color: 'text-slate-600 bg-slate-100' };
                          return (
                            <div key={ev.id} className="relative pb-2.5 last:pb-0">
                              <div className={`absolute -left-6 top-1 h-5 w-5 rounded-full flex items-center justify-center ${ic.color} border-2 border-white shadow-sm`}>
                                {ic.icon}
                              </div>
                              <div className={`ml-1.5 rounded border p-2 text-[11px] ${getSeverityColor(ev.severity)}`}>
                                <div className="flex items-center gap-1.5 mb-0.5">
                                  <span className="font-bold text-slate-900">{ev.title}</span>
                                  <span className="text-[9px] text-slate-400 ml-auto">{ev.timestamp.split(' ')[1]}</span>
                                </div>
                                <p className="text-slate-600 leading-relaxed">{ev.detail}</p>
                                {ev.linkedEntities && (
                                  <div className="mt-1 flex gap-1">
                                    {ev.linkedEntities.map(le => (
                                      <span key={le} className="text-[9px] font-mono bg-slate-100 text-slate-500 px-1 py-0.5 rounded">↗ {le}</span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* ── INTELLIGENCE TAB ── */}
                {drawerTab === 'intel' && (
                  <div className="space-y-3">
                    {/* T+5 Claims */}
                    {ejLogs.filter(e => e.terminalId === selectedATM && e.status === 'Disputed').map(d => {
                      const cd = getCountdown(d.timestamp);
                      return (
                        <div key={d.id} className="p-3 rounded-lg border border-amber-200 bg-amber-50/30">
                          <div className="flex items-center justify-between mb-1.5">
                            <div className="flex items-center gap-1.5">
                              <Clock className="h-3.5 w-3.5 text-amber-600" />
                              <span className="text-[10px] font-bold text-amber-800">T+5 Resolution Window</span>
                            </div>
                            <Badge className={`text-[9px] ${cd.expired ? 'bg-red-100 text-red-700' : cd.days <= 1 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                              {cd.expired ? 'PENALTY ACTIVE' : `${cd.days}D ${cd.hours}H remaining`}
                            </Badge>
                          </div>
                          <p className="text-[11px] font-mono font-bold text-slate-800">{d.ticketId}</p>
                          <p className="text-[10px] text-slate-600 mt-0.5">{d.errorDesc}</p>
                          {d.amount && <p className="text-[11px] font-bold text-slate-900 mt-1">₹{d.amount.toLocaleString('en-IN')}</p>}
                          <div className="mt-2 flex gap-0.5">
                            {[1, 2, 3, 4, 5].map(day => {
                              const elapsed = 5 - cd.days;
                              return (
                                <div key={day} className={`h-1.5 flex-1 rounded-full ${day <= elapsed ? (day >= 4 ? 'bg-red-500' : day >= 3 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-200'}`} />
                              );
                            })}
                          </div>
                          <div className="flex justify-between mt-0.5">
                            <span className="text-[8px] text-slate-400">T-Day</span>
                            <span className="text-[8px] text-slate-400">T+5 Penalties</span>
                          </div>
                        </div>
                      );
                    })}

                    {/* Overages */}
                    {termOverages.map(o => {
                      const cd = getCountdown(o.detectedAt);
                      return (
                        <div key={o.id} className={`p-2.5 rounded-lg border text-[11px] ${o.penaltyApplicable ? 'border-red-200 bg-red-50' : 'border-emerald-200 bg-emerald-50'}`}>
                          <div className="flex justify-between items-center">
                            <span className="font-bold">₹{o.amount.toLocaleString('en-IN')}</span>
                            <div className="flex gap-1">
                              {o.penaltyApplicable && (
                                <Badge className="text-[8px] bg-red-600 text-white animate-pulse">
                                  ⏰ {cd.expired ? 'ACTIVE' : `${cd.days}D`}
                                </Badge>
                              )}
                              <Badge className={`text-[9px] ${o.status === 'Unreported' ? 'bg-red-100 text-red-700' : o.status === 'Under Review' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                {o.status}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-[10px] mt-1 text-slate-600">
                            Detected: {o.detectedAt} {o.declaredAt ? `· Declared: ${o.declaredAt}` : '· ⚠ Not declared'}
                          </p>
                          {o.penaltyApplicable && (
                            <p className="text-[9px] font-semibold text-red-600 mt-1">⚠ Harmonizing Penalty — not reported within EOD</p>
                          )}
                        </div>
                      );
                    })}

                    {/* Auto-recovery */}
                    {termEj.filter(e => e.type === 'AutoRecovery').map(ar => (
                      <div key={ar.id} className="p-2.5 rounded-lg border border-amber-200 bg-white">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Badge className="text-[8px] bg-amber-600 text-white">AUTO-RECOVERY</Badge>
                          <span className="font-mono text-[10px] font-bold text-slate-800">{ar.ticketId}</span>
                        </div>
                        <p className="text-[10px] text-slate-600">{ar.errorDesc}</p>
                        <div className="mt-1.5 p-1.5 bg-amber-50 rounded border border-amber-100">
                          <p className="text-[9px] text-amber-700 font-semibold">🔴 FLM ticket Silent Closed — No overage reported</p>
                        </div>
                      </div>
                    ))}

                    {/* Data Gaps */}
                    <div className="border border-slate-200 rounded-lg p-2.5">
                      <p className="text-[10px] font-bold text-slate-700 mb-1.5 flex items-center gap-1"><EyeOff className="h-3 w-3" /> Data Gap Analysis</p>
                      {[
                        { label: 'EJ Logs', ok: termEj.length > 0, msg: 'Missing EJ Logs — Investigative Window Blinded' },
                        { label: 'Cash Records', ok: termCash.length > 0, msg: 'No cash operations recorded' },
                        { label: 'EJ File', ok: termEvidence.some(d => d.type === 'EJ File'), msg: 'EJ file not uploaded' },
                        { label: 'EOD Report', ok: termEvidence.some(d => d.type === 'EOD Report'), msg: 'EOD report not filed' },
                      ].map((c, i) => (
                        <div key={i} className={`flex items-center gap-1.5 py-0.5 text-[10px] ${c.ok ? 'text-emerald-600' : 'text-red-600'}`}>
                          {c.ok ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                          <span>{c.ok ? c.label : c.msg}</span>
                        </div>
                      ))}
                    </div>

                    {termOverages.length === 0 && termEj.filter(e => e.type === 'AutoRecovery').length === 0 && ejLogs.filter(e => e.terminalId === selectedATM && e.status === 'Disputed').length === 0 && (
                      <p className="text-xs text-slate-500 text-center py-6">No intelligence alerts for this ATM.</p>
                    )}
                  </div>
                )}

                {/* ── LOG EXPLORER TAB ── */}
                {drawerTab === 'logs' && (
                  <div>
                    <div className="relative mb-2">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-400" />
                      <Input
                        placeholder="Search error codes, tickets..."
                        value={ejSearch}
                        onChange={e => setEjSearch(e.target.value)}
                        className="pl-7 h-7 text-[10px]"
                      />
                    </div>
                    {filteredEj.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-6">No EJ entries found.</p>
                    ) : (
                      <div className="rounded border overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-slate-50 h-6">
                              <TableHead className="text-[9px] font-bold py-0.5">Ticket</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5">Time</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5">Type</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5">Error</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5 text-right">Amt</TableHead>
                              <TableHead className="text-[9px] font-bold py-0.5">Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredEj.map(e => (
                              <TableRow key={e.id} className="text-[10px] h-6">
                                <TableCell className="py-0.5 font-mono font-bold">{e.ticketId}</TableCell>
                                <TableCell className="py-0.5 text-slate-500">{e.timestamp.split(' ')[1]}</TableCell>
                                <TableCell className="py-0.5"><Badge variant="outline" className="text-[8px] px-1 py-0">{e.type}</Badge></TableCell>
                                <TableCell className="py-0.5 text-slate-600 max-w-[140px] truncate">{e.errorCode ? `${e.errorCode}: ${e.errorDesc}` : e.errorDesc || '—'}</TableCell>
                                <TableCell className="py-0.5 text-right font-semibold">{e.amount ? `₹${e.amount.toLocaleString('en-IN')}` : '—'}</TableCell>
                                <TableCell className="py-0.5">
                                  <Badge className={`text-[8px] px-1 py-0 ${e.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : e.status === 'Failed' ? 'bg-red-100 text-red-700' : e.status === 'Disputed' ? 'bg-purple-100 text-purple-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {e.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </div>
                )}

                {/* ── EVIDENCE TAB ── */}
                {drawerTab === 'evidence' && (
                  <div>
                    {termEvidence.length === 0 ? (
                      <p className="text-xs text-slate-500 text-center py-6">No documents linked.</p>
                    ) : (
                      <div className="grid grid-cols-2 gap-2">
                        {termEvidence.map(d => (
                          <div
                            key={d.id}
                            onClick={() => setPreviewDoc(d)}
                            className="group cursor-pointer rounded-lg border border-slate-200 p-2 hover:border-blue-300 hover:shadow transition-all"
                          >
                            {/* Thumbnail */}
                            {d.type === 'Counter JPEG' ? (
                              <div className="h-14 w-full bg-slate-200 rounded flex items-center justify-center">
                                <Image className="h-5 w-5 text-slate-400" />
                              </div>
                            ) : d.type === 'EJ File' ? (
                              <div className="h-14 w-full bg-slate-900 rounded p-1.5 overflow-hidden">
                                <p className="text-[7px] font-mono text-green-400 leading-tight">09:12:34 TXN_START<br/>09:12:40 BNA_ERROR<br/>09:14:01 AUTO_RECOVERY</p>
                              </div>
                            ) : d.type === 'MSP Log' ? (
                              <div className="h-14 w-full bg-slate-800 rounded p-1.5 overflow-hidden">
                                <p className="text-[7px] font-mono text-cyan-300 leading-tight">SYSTEM_BOOT: OK<br/>ALERT: BNA JAM<br/>AUTO_RECOVERY</p>
                              </div>
                            ) : (
                              <div className="h-14 w-full bg-slate-100 rounded flex items-center justify-center">
                                <File className="h-5 w-5 text-slate-400" />
                              </div>
                            )}
                            <div className="mt-1 flex items-start gap-1">
                              <div className="min-w-0 flex-1">
                                <p className="text-[9px] font-medium text-slate-800 truncate">{d.filename}</p>
                                <p className="text-[8px] text-slate-400">{d.type} · {d.size}</p>
                              </div>
                              <Maximize2 className="h-2.5 w-2.5 text-slate-300 opacity-0 group-hover:opacity-100 shrink-0 mt-0.5" />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* ── Evidence Preview Dialog ── */}
      <Dialog open={!!previewDoc} onOpenChange={() => setPreviewDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold">{previewDoc?.filename}</DialogTitle>
          </DialogHeader>
          {previewDoc?.type === 'EJ File' && (
            <div className="bg-slate-900 rounded-lg p-4 font-mono text-[11px] text-green-400 max-h-[400px] overflow-auto whitespace-pre leading-relaxed">{mockEjContent}</div>
          )}
          {previewDoc?.type === 'MSP Log' && (
            <div className="bg-slate-800 rounded-lg p-4 font-mono text-[11px] text-cyan-300 max-h-[400px] overflow-auto whitespace-pre leading-relaxed">{mockMspLog}</div>
          )}
          {previewDoc?.type === 'Counter JPEG' && (
            <div className="bg-slate-100 rounded-lg p-8 flex flex-col items-center">
              <div className="w-full max-w-[300px] h-[200px] bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center">
                  <Image className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">Counter Photo</p>
                  <p className="text-[10px] text-slate-400">Cassette readings verified</p>
                </div>
              </div>
            </div>
          )}
          {previewDoc && !['EJ File', 'MSP Log', 'Counter JPEG'].includes(previewDoc.type) && (
            <div className="bg-slate-50 rounded-lg p-8 text-center">
              <File className="h-12 w-12 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-600">{previewDoc.filename}</p>
              <p className="text-xs text-slate-400 mt-1">{previewDoc.size}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSDataLake;

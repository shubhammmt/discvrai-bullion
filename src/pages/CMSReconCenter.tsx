import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { toast } from 'sonner';
import {
  AlertTriangle, DollarSign, RefreshCw, Clock,
  Search, Filter, X, ChevronRight, Eye, Zap, Info, Download,
  ArrowUpRight, ArrowDownRight, Target, Activity, CheckCircle2,
  XCircle, AlertCircle, ShieldAlert, Banknote, Cpu, ThumbsUp, ThumbsDown,
  Scale, Gavel, Inbox, MapPin, Shield, Camera, User, Lock,
  TrendingUp, BarChart3, History, Award, Flame,
  Bell, Timer, Image, ShieldCheck, Play, Monitor
} from 'lucide-react';
import {
  reconPulse, mismatchedLedgers, pendingClaims, harmonizingPenalties,
  bankDisputes, vaultAuditEntries, autoRecoverySilentMatches,
  threeWayRecons, reconBanks, reconRegions, riskLevels,
  formatINR, getSeverityBadge, getClaimTimerColor,
  TransactionComparison
} from '@/data/cmsReconCenter';

// ── Mini Sparkline ──
const MiniSparkline: React.FC<{ data: number[]; color: string; width?: number; height?: number }> = ({ data, color, width = 80, height = 24 }) => {
  if (!data.length) return null;
  const min = Math.min(...data); const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * width},${height - ((v - min) / range) * height}`).join(' ');
  return (
    <svg width={width} height={height} className="inline-block">
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) / (data.length - 1) * width} cy={height - ((data[data.length - 1] - min) / range) * height} r="2" fill={color} />
    </svg>
  );
};

const InfoTip: React.FC<{ text: string }> = ({ text }) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Info className="h-3 w-3 text-slate-400 hover:text-slate-300 cursor-help inline-block ml-0.5" />
      </TooltipTrigger>
      <TooltipContent className="max-w-[220px] text-[11px]"><p>{text}</p></TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

const genSparkline = (base: number, variance: number, n = 14) =>
  Array.from({ length: n }, (_, i) => base + (Math.sin(i * 0.7) * variance) + (Math.random() - 0.5) * variance * 0.5);

const TIMEFRAMES = [
  { value: 'live', label: 'Live Dashboard' },
  { value: '7d', label: 'Last 7 Days' },
  { value: 'mtd', label: 'Month-to-Date' },
  { value: 'quarterly', label: 'Quarterly Review' },
];

const historicalResolved = [
  { id: 'HR-001', terminalId: 'ATM-1001', bank: 'HDFC', region: 'North', amount: 15000, resolvedAs: 'Technical Error', resolutionMode: 'Auto-Resolved by Bot', outcome: 'Refund Authorized', savedAmount: 15000, penaltyPaid: 0, timeToResolve: '4.2 hrs', date: '2025-01-08' },
  { id: 'HR-002', terminalId: 'ATM-2045', bank: 'SBI', region: 'West', amount: 42000, resolvedAs: 'Theft', resolutionMode: 'Manual Escalation', outcome: 'Shortage Recovered from Vendor', savedAmount: 42000, penaltyPaid: 1200, timeToResolve: '3.1 days', date: '2025-01-07' },
  { id: 'HR-003', terminalId: 'ATM-3012', bank: 'ICICI', region: 'South', amount: 8500, resolvedAs: 'Technical Error', resolutionMode: 'Auto-Resolved by Bot', outcome: 'Refund Authorized; AR Matched', savedAmount: 8500, penaltyPaid: 0, timeToResolve: '1.8 hrs', date: '2025-01-06' },
  { id: 'HR-004', terminalId: 'ATM-1089', bank: 'HDFC', region: 'North', amount: 65000, resolvedAs: 'Theft', resolutionMode: 'Manual Escalation + Audit', outcome: 'FIR Filed; Vendor Debited', savedAmount: 52000, penaltyPaid: 4800, timeToResolve: '5.4 days', date: '2025-01-05' },
  { id: 'HR-005', terminalId: 'ATM-4501', bank: 'Axis', region: 'East', amount: 12000, resolvedAs: 'Technical Error', resolutionMode: 'Auto-Resolved by Bot', outcome: 'Refund Authorized', savedAmount: 12000, penaltyPaid: 0, timeToResolve: '2.1 hrs', date: '2025-01-04' },
  { id: 'HR-006', terminalId: 'ATM-2078', bank: 'SBI', region: 'West', amount: 95000, resolvedAs: 'Theft', resolutionMode: 'Manual Escalation', outcome: 'Insurance Claim Filed', savedAmount: 71000, penaltyPaid: 8500, timeToResolve: '7.2 days', date: '2025-01-03' },
  { id: 'HR-007', terminalId: 'ATM-3098', bank: 'ICICI', region: 'South', amount: 5500, resolvedAs: 'Technical Error', resolutionMode: 'Auto-Resolved by Bot', outcome: 'Denomination Drift Corrected', savedAmount: 5500, penaltyPaid: 0, timeToResolve: '45 mins', date: '2025-01-02' },
  { id: 'HR-008', terminalId: 'ATM-1045', bank: 'HDFC', region: 'North', amount: 28000, resolvedAs: 'Theft', resolutionMode: 'Manual Escalation', outcome: 'Custodian Suspended; Recovery Pending', savedAmount: 0, penaltyPaid: 3200, timeToResolve: '4.8 days', date: '2025-01-01' },
];

const penaltyAnalysis = [
  { entity: 'HDFC — North', totalPenalty: 184000, incidents: 23, avgDelay: '2.3 EODs', trend: 'rising', severity: 'critical' },
  { entity: 'SBI — West', totalPenalty: 156000, incidents: 18, avgDelay: '1.8 EODs', trend: 'stable', severity: 'high' },
  { entity: 'ICICI — South', totalPenalty: 92000, incidents: 12, avgDelay: '1.2 EODs', trend: 'declining', severity: 'medium' },
  { entity: 'Axis — East', totalPenalty: 78000, incidents: 9, avgDelay: '1.5 EODs', trend: 'stable', severity: 'medium' },
  { entity: 'PNB — North', totalPenalty: 65000, incidents: 8, avgDelay: '2.1 EODs', trend: 'rising', severity: 'high' },
  { entity: 'BOB — West', totalPenalty: 43000, incidents: 6, avgDelay: '0.9 EODs', trend: 'declining', severity: 'low' },
];

const topLeakageContributors = [
  { name: 'Vendor: SecureCash Logistics', region: 'North', amount: 1840000, incidents: 34, type: 'Vendor' },
  { name: 'Vendor: CashGuard Services', region: 'West', amount: 1520000, incidents: 28, type: 'Vendor' },
  { name: 'Region: North Zone', region: 'North', amount: 2100000, incidents: 45, type: 'Region' },
  { name: 'Region: West Zone', region: 'West', amount: 1680000, incidents: 31, type: 'Region' },
  { name: 'Custodian Pool: Batch 2024-Q3', region: 'Mixed', amount: 920000, incidents: 18, type: 'Custodian' },
];

const recoveryEfficiency = [
  { category: 'Auto-Recovery (AR)', potential: 4200000, recovered: 3780000 },
  { category: 'Vendor Debit', potential: 3100000, recovered: 2170000 },
  { category: 'Insurance Claims', potential: 1800000, recovered: 900000 },
  { category: 'Manual Resolution', potential: 2500000, recovered: 2125000 },
];

// ── Preemptive Alerts Queue (FLM Signal-Triggered) ──
const preemptiveAlerts = [
  { id: 'PA-001', terminalId: 'ATM-1001', bank: 'HDFC', region: 'North', signalType: 'Auto-Recovery After Jam', signalTime: '09:14:01', inferredOverage: 2000, confidence: 92, status: 'Pending Declaration', eodCountdown: '6h 45m', flmAgent: 'Vikram Meena', ejRef: 'CMS-02435508', riskLevel: 'High', detail: 'BNA Transport Jam → Auto-Recovery → FLM Silent Close. Cash likely stuck in transport. Inferred ₹2,000 overage.' },
  { id: 'PA-002', terminalId: 'ATM-2045', bank: 'SBI', region: 'West', signalType: 'Complaint-Triggered Jam', signalTime: '11:30:00', inferredOverage: 5000, confidence: 85, status: 'Pending Declaration', eodCountdown: '4h 30m', flmAgent: 'Rajesh Sharma', ejRef: 'CMS-02435512', riskLevel: 'High', detail: 'Customer complaint ₹5,000 not dispensed. EJ shows DISP_OK but sensor mismatch. Probable cassette retraction.' },
  { id: 'PA-003', terminalId: 'ATM-3012', bank: 'ICICI', region: 'South', signalType: 'Auto-Recovery After Jam', signalTime: '14:16:00', inferredOverage: 1000, confidence: 78, status: 'Under Review', eodCountdown: '2h 15m', flmAgent: 'Karthik Nair', ejRef: 'CMS-02435514', riskLevel: 'Medium', detail: 'CDM Note Feed Failure → Auto-Recovery. Single ₹500 × 2 notes suspected in reject path. Moderate confidence.' },
  { id: 'PA-004', terminalId: 'ATM-1089', bank: 'HDFC', region: 'North', signalType: 'Repeat Jam Pattern', signalTime: '10:42:00', inferredOverage: 3500, confidence: 71, status: 'Pending Declaration', eodCountdown: '5h 18m', flmAgent: 'Amit Verma', ejRef: 'CMS-02435520', riskLevel: 'Medium', detail: '3rd jam in 48h window. Cumulative suspected overage from transport mechanism. Pattern suggests roller degradation.' },
  { id: 'PA-005', terminalId: 'ATM-4501', bank: 'Axis', region: 'East', signalType: 'Silent Close Event', signalTime: '12:05:00', inferredOverage: 8000, confidence: 95, status: 'Critical', eodCountdown: '1h 55m', flmAgent: 'Sunil Das', ejRef: 'CMS-02435525', riskLevel: 'Critical', detail: 'FLM auto-closed jam without physical verification. High-value ₹2,000 × 4 notes detected in transport sensor. No reject bin update.' },
  { id: 'PA-006', terminalId: 'ATM-2078', bank: 'SBI', region: 'West', signalType: 'Auto-Recovery After Jam', signalTime: '15:22:00', inferredOverage: 500, confidence: 62, status: 'Low Priority', eodCountdown: '8h 38m', flmAgent: 'Deepak Joshi', ejRef: 'CMS-02435530', riskLevel: 'Low', detail: 'Single note jam in ₹500 cassette. Auto-cleared within 15 seconds. Low probability of stuck note.' },
];

// ── Control Window Tracker Data ──
const controlWindowEntries = [
  { id: 'CW-001', terminalId: 'ATM-1001', overageAmount: 2000, detectedAt: '09:14:01', eodDeadline: '18:00:00', remainingTime: '6h 45m', remainingPct: 56, status: 'Active', declarationStatus: 'Not Declared', breachRisk: false },
  { id: 'CW-002', terminalId: 'ATM-2045', overageAmount: 5000, detectedAt: '11:30:00', eodDeadline: '18:00:00', remainingTime: '4h 30m', remainingPct: 37, status: 'Active', declarationStatus: 'Not Declared', breachRisk: false },
  { id: 'CW-003', terminalId: 'ATM-4501', overageAmount: 8000, detectedAt: '12:05:00', eodDeadline: '18:00:00', remainingTime: '1h 55m', remainingPct: 16, status: 'Critical', declarationStatus: 'Not Declared', breachRisk: true },
  { id: 'CW-004', terminalId: 'ATM-3098', overageAmount: 3200, detectedAt: '08:22:00', eodDeadline: '18:00:00', remainingTime: '0h 00m', remainingPct: 0, status: 'Breached', declarationStatus: 'CONTROL BREACH', breachRisk: true },
  { id: 'CW-005', terminalId: 'ATM-1045', overageAmount: 1500, detectedAt: '10:15:00', eodDeadline: '18:00:00', remainingTime: '5h 45m', remainingPct: 48, status: 'Active', declarationStatus: 'System-Assisted Pending', breachRisk: false },
];

const vaultCounterCaptures = [
  { id: 'VCC-001', terminalId: 'ATM-1001', captureTime: '06:28:15', cassettes: 4, verifiedBy: 'Camera Station A3', totalLoaded: 2500000, thumbnails: ['Cassette-1 ₹500 × 2000', 'Cassette-2 ₹100 × 2000', 'Cassette-3 ₹200 × 1500', 'Cassette-4 ₹2000 × 500'], integrityScore: 98, tamperDetected: false },
  { id: 'VCC-002', terminalId: 'ATM-2045', captureTime: '06:42:30', cassettes: 4, verifiedBy: 'Camera Station B1', totalLoaded: 3000000, thumbnails: ['Cassette-1 ₹500 × 2400', 'Cassette-2 ₹100 × 3000', 'Cassette-3 ₹200 × 2500', 'Cassette-4 ₹2000 × 600'], integrityScore: 96, tamperDetected: false },
  { id: 'VCC-003', terminalId: 'ATM-3012', captureTime: '06:55:10', cassettes: 4, verifiedBy: 'Camera Station A1', totalLoaded: 2000000, thumbnails: ['Cassette-1 ₹500 × 1600', 'Cassette-2 ₹100 × 2000', 'Cassette-3 ₹200 × 1000', 'Cassette-4 ₹2000 × 400'], integrityScore: 88, tamperDetected: true },
];

const CMSReconCenter = () => {
  const [bankFilter, setBankFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [penaltySubTab, setPenaltySubTab] = useState<'harmonizing' | 'delay'>('harmonizing');
  const [analyzeItem, setAnalyzeItem] = useState<string | null>(null);
  const [actionLog, setActionLog] = useState<Record<string, string>>({});
  const [timeframe, setTimeframe] = useState('live');
  const [historicalTab, setHistoricalTab] = useState('mismatch-history');
  const [archiveFilter, setArchiveFilter] = useState('all');
  const [archiveSearch, setArchiveSearch] = useState('');
  const [postMortemItem, setPostMortemItem] = useState<typeof historicalResolved[0] | null>(null);
  const [inboxFilter, setInboxFilter] = useState<'all' | 'customer' | 'system'>('all');

  const isHistorical = timeframe !== 'live';

  const handleAction = (id: string, action: string, label: string) => {
    setActionLog(prev => ({ ...prev, [id]: action }));
    toast.success(`${action}`, { description: `${label} — Audit trail updated.` });
  };

  const pulse = reconPulse;
  const reconData = analyzeItem ? threeWayRecons[analyzeItem] : null;
  const timeframeLabel = TIMEFRAMES.find(t => t.value === timeframe)?.label || 'Live Dashboard';

  const sparklines = useMemo(() => ({
    leakage: genSparkline(pulse.totalLeakage, pulse.totalLeakage * 0.15),
    recovery: genSparkline(pulse.recoveryPotential, pulse.recoveryPotential * 0.1),
    autoRes: genSparkline(pulse.autoResolutionRate, 8),
    penalty: genSparkline(pulse.penaltyExposure, pulse.penaltyExposure * 0.2),
    unrecoverable: genSparkline(pulse.unrecoverablePenaltyLoss, pulse.unrecoverablePenaltyLoss * 0.12),
    mir: genSparkline(pulse.mir, 5),
  }), []);

  // Filtered data
  const fDisputes = useMemo(() => {
    let list = bankDisputes;
    if (bankFilter !== 'All') list = list.filter(d => d.bankName === bankFilter);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(d => d.claimRef.toLowerCase().includes(q) || d.customerName.toLowerCase().includes(q) || (d.mappedTerminalId || '').toLowerCase().includes(q)); }
    return list;
  }, [bankFilter, search]);

  const fVault = useMemo(() => {
    let list = vaultAuditEntries.filter(v => v.varianceType !== 'Match');
    if (bankFilter !== 'All') list = list.filter(v => v.bank === bankFilter);
    if (regionFilter !== 'All') list = list.filter(v => v.region === regionFilter);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(v => v.terminalId.toLowerCase().includes(q)); }
    return list;
  }, [bankFilter, regionFilter, search]);

  const fClaims = useMemo(() => {
    let list = pendingClaims;
    if (bankFilter !== 'All') list = list.filter(c => c.bank === bankFilter);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(c => c.terminalId.toLowerCase().includes(q) || c.claimId.toLowerCase().includes(q)); }
    return list;
  }, [bankFilter, search]);

  const fPenalties = useMemo(() => {
    let list = harmonizingPenalties;
    if (bankFilter !== 'All') list = list.filter(p => p.bank === bankFilter);
    if (search.trim()) { const q = search.toLowerCase(); list = list.filter(p => p.terminalId.toLowerCase().includes(q)); }
    return list;
  }, [bankFilter, search]);

  const orphanCount = fDisputes.filter(d => !d.autoMapped).length;
  const readyCount = fDisputes.filter(d => d.verdictReady).length;

  const filteredArchive = useMemo(() => {
    let list = historicalResolved;
    if (archiveFilter === 'theft') list = list.filter(r => r.resolvedAs === 'Theft');
    if (archiveFilter === 'technical') list = list.filter(r => r.resolvedAs === 'Technical Error');
    if (archiveSearch.trim()) {
      const q = archiveSearch.toLowerCase();
      list = list.filter(r => r.terminalId.toLowerCase().includes(q) || r.bank.toLowerCase().includes(q));
    }
    return list;
  }, [archiveFilter, archiveSearch]);

  const theftCount = historicalResolved.filter(r => r.resolvedAs === 'Theft').length;
  const techCount = historicalResolved.filter(r => r.resolvedAs === 'Technical Error').length;
  const totalSaved = historicalResolved.reduce((s, r) => s + r.savedAmount, 0);

  const periodChanges = useMemo(() => ({
    leakage: pulse.leakageTrend,
    recovery: -8.2,
    autoRes: 3.4,
    penalty: pulse.penaltyTrend,
    unrecoverable: 12.5,
    mir: pulse.mirTrend,
  }), []);

  // Combined counts for Hub 1
  const customerClaimCount = fDisputes.length + fClaims.length;
  const systemOverageCount = preemptiveAlerts.length;
  const totalInboxCount = customerClaimCount + systemOverageCount;

  // Combined counts for Hub 3
  const activePenalties = fPenalties.length;
  const activeWindows = controlWindowEntries.filter(c => c.status !== 'Breached').length;
  const breachedWindows = controlWindowEntries.filter(c => c.status === 'Breached').length;
  const totalPenaltyCount = activePenalties + controlWindowEntries.length;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* ═══ HEADER ═══ */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`${isHistorical ? 'bg-indigo-600' : 'bg-red-600'} text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1`}>
              {isHistorical ? <History className="h-3.5 w-3.5" /> : <Target className="h-3.5 w-3.5" />}
              {isHistorical ? 'ANALYSIS MODE' : 'RECON CENTER'}
            </div>
            <div>
              <h1 className="text-xs font-bold text-white leading-tight">
                {isHistorical ? 'Strategic Financial Analysis' : 'Reconciliation Command Center'}
              </h1>
              <p className="text-[9px] text-slate-400">
                {isHistorical ? `${timeframeLabel} · Pattern Recognition & Leakage Analysis` : 'Real-Time Discrepancy & Penalty Management'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-emerald-500/30 bg-emerald-500/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
              <div>
                <p className="text-[9px] font-bold text-emerald-400 leading-tight">Agile Sync ✓</p>
                <p className="text-[7px] text-emerald-500/80">Recon · Complaints · Penalties</p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-slate-700 rounded-md p-0.5">
              {TIMEFRAMES.map(tf => (
                <button key={tf.value}
                  onClick={() => { setTimeframe(tf.value); if (tf.value !== 'live') setActiveTab('inbox'); }}
                  className={`px-2 py-1 rounded text-[10px] font-medium transition-colors ${
                    timeframe === tf.value
                      ? tf.value === 'live' ? 'bg-emerald-600 text-white' : 'bg-indigo-600 text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-600'
                  }`}>
                  {tf.value === 'live' && <span className="inline-block w-1.5 h-1.5 bg-emerald-400 rounded-full mr-1 animate-pulse" />}
                  {tf.label}
                </button>
              ))}
            </div>
            <div className="relative w-44">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <Input placeholder="Search ATM, Claim..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-7 h-7 text-[11px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-500" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="h-3 w-3 text-slate-400" /></button>}
            </div>
            <Button variant="outline" size="sm" className="h-7 text-[10px] border-slate-600 text-slate-300 gap-1 bg-transparent hover:bg-slate-700">
              <Download className="h-3 w-3" /> Export
            </Button>
          </div>
        </div>
      </header>

      {/* ═══ FILTER BAR ═══ */}
      <div className="bg-slate-800/50 border-b border-slate-700/50 px-4 py-1.5">
        <div className="max-w-[1600px] mx-auto flex items-center gap-2 flex-wrap">
          <Filter className="h-3 w-3 text-slate-500" />
          <Select value={bankFilter} onValueChange={setBankFilter}>
            <SelectTrigger className="h-6 w-[100px] text-[10px] bg-slate-700 border-slate-600 text-slate-300"><SelectValue /></SelectTrigger>
            <SelectContent>{reconBanks.map(b => <SelectItem key={b} value={b} className="text-[11px]">{b === 'All' ? 'All Banks' : b}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="h-6 w-[100px] text-[10px] bg-slate-700 border-slate-600 text-slate-300"><SelectValue /></SelectTrigger>
            <SelectContent>{reconRegions.map(r => <SelectItem key={r} value={r} className="text-[11px]">{r === 'All' ? 'All Regions' : r}</SelectItem>)}</SelectContent>
          </Select>
          <div className="ml-auto text-[10px] text-slate-500">
            {isHistorical
              ? <span className="text-indigo-400"><History className="h-3 w-3 inline mr-1" />Viewing: {timeframeLabel}</span>
              : <>{pulse.totalCases.toLocaleString()} active · {pulse.resolvedToday} resolved today · Avg {pulse.avgResolutionHrs}h resolution</>
            }
          </div>
        </div>
      </div>

      {/* ═══ PULSE CARDS ═══ */}
      <div className="px-4 py-2.5 bg-slate-800/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-6 gap-2">
          {[
            { label: 'Total Leakage', value: formatINR(pulse.totalLeakage), trend: periodChanges.leakage, icon: DollarSign, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', tip: 'Physical Shortages + Unresolved Claims.', spark: sparklines.leakage, sparkColor: '#f87171' },
            { label: 'Recovery Potential', value: formatINR(pulse.recoveryPotential), trend: periodChanges.recovery, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', tip: 'Total shortages recoverable from vendors/insurance.', spark: sparklines.recovery, sparkColor: '#34d399' },
            { label: 'Auto-Resolution', value: `${pulse.autoResolutionRate}%`, trend: periodChanges.autoRes, icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', tip: '% disputes resolved without human intervention.', spark: sparklines.autoRes, sparkColor: '#60a5fa' },
            { label: 'Penalty Exposure', value: formatINR(pulse.penaltyExposure), trend: periodChanges.penalty, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', tip: 'Pending Harmonizing + T+5 fines.', spark: sparklines.penalty, sparkColor: '#fb923c' },
            { label: 'Unrecoverable', value: formatINR(pulse.unrecoverablePenaltyLoss), trend: periodChanges.unrecoverable, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', tip: 'Total Harmonizing Penalties accrued — non-recoverable.', spark: sparklines.unrecoverable, sparkColor: '#f87171' },
            { label: 'MIR', value: `${pulse.mir}%`, trend: periodChanges.mir, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', tip: 'Manual Intervention Rate.', spark: sparklines.mir, sparkColor: '#fbbf24' },
          ].map(tile => (
            <div key={tile.label} className={`rounded-lg border p-2.5 ${tile.bg}`}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase font-medium flex items-center gap-0.5">
                  {tile.label} <InfoTip text={tile.tip} />
                </span>
                <tile.icon className={`h-3.5 w-3.5 ${tile.color}`} />
              </div>
              <div className="flex items-end justify-between">
                <p className={`text-lg font-bold ${tile.color}`}>{tile.value}</p>
                {isHistorical && <MiniSparkline data={tile.spark} color={tile.sparkColor} />}
              </div>
              <div className="flex items-center gap-1 mt-0.5">
                {tile.trend < 0 ? <ArrowDownRight className="h-2.5 w-2.5 text-emerald-400" /> : <ArrowUpRight className="h-2.5 w-2.5 text-red-400" />}
                <span className={`text-[9px] font-medium ${tile.trend < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.abs(tile.trend)}% {isHistorical ? `vs prev ${timeframe === '7d' ? 'week' : timeframe === 'mtd' ? 'month' : 'quarter'}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ MAIN WORKSPACE ═══ */}
      <div className="flex-1 px-4 py-3">
        <div className="max-w-[1600px] mx-auto">

          {/* ══════════ LIVE MODE ══════════ */}
          {!isHistorical ? (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-8 bg-slate-800 border border-slate-700 mb-3">
                <TabsTrigger value="inbox" className="text-[10px] h-7 data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-1">
                  <Inbox className="h-3 w-3" /> Resolution Inbox
                  <Badge className="text-[8px] bg-blue-500/20 text-blue-300 ml-1">{totalInboxCount}</Badge>
                </TabsTrigger>
                <TabsTrigger value="vault" className="text-[10px] h-7 data-[state=active]:bg-purple-600 data-[state=active]:text-white gap-1">
                  <Shield className="h-3 w-3" /> Physical vs. Digital
                  <Badge className="text-[8px] bg-purple-500/20 text-purple-300 ml-1">{fVault.length}</Badge>
                </TabsTrigger>
                <TabsTrigger value="penalty" className="text-[10px] h-7 data-[state=active]:bg-red-600 data-[state=active]:text-white gap-1">
                  <Clock className="h-3 w-3" /> Penalty Tracking
                  <Badge className="text-[8px] bg-red-500/20 text-red-300 ml-1">{totalPenaltyCount}</Badge>
                  {breachedWindows > 0 && <Badge className="text-[8px] bg-red-500/20 text-red-300 animate-pulse">!</Badge>}
                </TabsTrigger>
              </TabsList>

              {/* ═══════════════════════════════════════════════════ */}
              {/* HUB 1: RESOLUTION INBOX                           */}
              {/* ═══════════════════════════════════════════════════ */}
              <TabsContent value="inbox" className="mt-0">
                {/* Filter toggle */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1 bg-slate-800 border border-slate-700 rounded-md p-0.5">
                    {([
                      { val: 'all' as const, label: 'Show All', count: totalInboxCount },
                      { val: 'customer' as const, label: 'Customer Claims', count: customerClaimCount, icon: User },
                      { val: 'system' as const, label: 'System Overages', count: systemOverageCount, icon: Monitor },
                    ]).map(f => (
                      <button key={f.val}
                        onClick={() => setInboxFilter(f.val)}
                        className={`px-2.5 py-1 rounded text-[10px] font-medium transition-colors flex items-center gap-1 ${
                          inboxFilter === f.val ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-700'
                        }`}>
                        {f.icon && <f.icon className="h-3 w-3" />}
                        {f.label}
                        <span className="text-[8px] opacity-70">({f.count})</span>
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="text-emerald-400">✓ {readyCount} Ready for Verdict</span>
                    <span className="text-red-400">✗ {orphanCount} Orphan — Manual Mapping</span>
                  </div>
                </div>

                {/* ── CUSTOMER CLAIMS SECTION ── */}
                {inboxFilter !== 'system' && (
                  <>
                    {/* Bank Dispute Table */}
                    <div className="mb-3">
                      <div className="mb-1.5 text-[10px] text-slate-500 flex items-center gap-1">
                        <User className="h-3.5 w-3.5 text-blue-400" />
                        Customer Claims — Bank emails & complaints auto-mapped to ATM IDs and EJ logs.
                      </div>
                      <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow className="border-b border-slate-700 h-7">
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Source</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Claim Ref</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Bank</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Customer</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Amount</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Mapping</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">ATM</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Deadline</TableHead>
                              <TableHead className="text-[9px] font-bold text-slate-400 py-1">Action</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {fDisputes.map(d => (
                              <TableRow key={d.id} className={`border-b border-slate-700/50 h-7 text-[11px] ${!d.autoMapped ? 'bg-red-500/5' : 'hover:bg-slate-700/30'}`}>
                                <TableCell className="py-1">
                                  <div className="flex items-center gap-1 text-slate-400">
                                    <User className="h-3 w-3 text-blue-400" />
                                    <span className="text-[10px] truncate max-w-[100px]">{d.source}</span>
                                  </div>
                                </TableCell>
                                <TableCell className="py-1 font-mono font-bold text-white text-[10px]">{d.claimRef}</TableCell>
                                <TableCell className="py-1 text-slate-400">{d.bankName}</TableCell>
                                <TableCell className="py-1 text-slate-300 text-[10px]">{d.customerName} <span className="text-slate-500">****{d.cardLast4}</span></TableCell>
                                <TableCell className="py-1 text-right font-bold text-white">{formatINR(d.claimedAmount)}</TableCell>
                                <TableCell className="py-1">
                                  {d.autoMapped ? (
                                    <Badge className="text-[8px] px-1 py-0 bg-emerald-500/20 text-emerald-400">✓ Mapped</Badge>
                                  ) : (
                                    <Badge className="text-[8px] px-1 py-0 bg-red-500/20 text-red-400 animate-pulse">✗ Orphan</Badge>
                                  )}
                                </TableCell>
                                <TableCell className="py-1 font-mono text-[10px] text-slate-300">{d.mappedTerminalId || '—'}</TableCell>
                                <TableCell className="py-1">
                                  <span className="text-[9px] text-amber-400 font-mono">T+5</span>
                                </TableCell>
                                <TableCell className="py-1">
                                  {d.verdictReady ? (
                                    <Button size="sm" variant="ghost" className="h-5 text-[9px] text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 px-1.5 gap-0.5"
                                      onClick={() => d.mappedTerminalId && setAnalyzeItem(d.mappedTerminalId)}>
                                      <Eye className="h-3 w-3" /> Verdict
                                    </Button>
                                  ) : (
                                    <Button size="sm" variant="ghost" className="h-5 text-[9px] text-red-400 hover:text-red-300 hover:bg-red-500/10 px-1.5 gap-0.5">
                                      <MapPin className="h-3 w-3" /> Map
                                    </Button>
                                  )}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>

                    {/* Transaction Validation (claims with side-by-side comparison) */}
                    <div className="mb-3">
                      <div className="mb-1.5 text-[10px] text-slate-500 flex items-center gap-1">
                        <Scale className="h-3.5 w-3.5 text-amber-400" />
                        Side-by-side Verdict: Bank Switch vs Machine EJ
                        <Badge className="text-[8px] bg-amber-500/20 text-amber-300 ml-1">{fClaims.length} claims</Badge>
                      </div>
                      <div className="space-y-2">
                        {fClaims.map(c => {
                          const acted = actionLog[c.id];
                          const isPenalty = c.daysElapsed >= 5;
                          const isCritical = c.daysElapsed >= 4;
                          return (
                            <div key={c.id} className={`rounded-lg border bg-slate-800 overflow-hidden h-auto ${
                              isPenalty ? 'border-red-500/50' : isCritical ? 'border-red-500/30' : 'border-slate-700'
                            } ${acted ? 'opacity-50' : ''}`}>
                              <div className="px-3 py-2 flex items-center gap-3">
                                <User className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 text-[11px]">
                                    <span className="font-mono font-bold text-white">{c.claimId}</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="font-mono text-slate-400">{c.terminalId}</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="text-slate-500">{c.bank}</span>
                                    <span className="text-slate-600">·</span>
                                    <span className="font-bold text-white">{formatINR(c.claimedAmount)}</span>
                                  </div>
                                  <p className="text-[10px] text-slate-500 mt-0.5">{c.errorDesc}</p>
                                </div>
                                <div className="w-40 shrink-0">
                                  <div className="flex items-center justify-between mb-0.5">
                                    <Badge className={`text-[9px] px-1.5 py-0 font-mono ${getClaimTimerColor(c.daysElapsed)}`}>
                                      {isPenalty ? '⚠ PENALTY' : `Day ${c.daysElapsed}/5`}
                                    </Badge>
                                    <span className="text-[9px] text-amber-400 font-medium">
                                      {isPenalty ? 'Overdue' : `${5 - c.daysElapsed}d left`}
                                    </span>
                                  </div>
                                  <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${isPenalty ? 'bg-red-500' : isCritical ? 'bg-red-500' : c.daysElapsed >= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                      style={{ width: `${Math.min(100, (c.daysElapsed / 5) * 100)}%` }} />
                                  </div>
                                </div>
                              </div>
                              <div className="px-3 pb-2">
                                <div className="grid grid-cols-3 gap-2 text-[10px] mb-2">
                                  <div className="bg-blue-500/5 border border-blue-500/20 rounded p-2">
                                    <p className="text-[8px] text-blue-400 font-bold uppercase mb-1">Bank Switch Says:</p>
                                    <p className="text-slate-300">{c.bankSwitch.action}</p>
                                    <Badge className={`text-[7px] px-1 py-0 mt-1 ${c.bankSwitch.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                      {c.bankSwitch.status}
                                    </Badge>
                                  </div>
                                  <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                                    <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Machine EJ Says:</p>
                                    <p className="text-slate-300">{c.machineEJ.action}</p>
                                    <Badge className="text-[7px] px-1 py-0 mt-1 bg-red-500/20 text-red-400">{c.machineEJ.status}</Badge>
                                  </div>
                                  <div className={`rounded p-2 border ${c.systemVerdict.includes('Refund') ? 'bg-emerald-500/10 border-emerald-500/30' : c.systemVerdict.includes('Reject') ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                                    <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">SYSTEM VERDICT</p>
                                    <p className={`text-sm font-bold ${c.systemVerdict.includes('Refund') ? 'text-emerald-400' : c.systemVerdict.includes('Reject') ? 'text-red-400' : 'text-amber-400'}`}>
                                      {c.systemVerdict}
                                    </p>
                                    <p className="text-[8px] text-slate-400 mt-1 leading-snug">{c.verdictReason}</p>
                                  </div>
                                </div>
                                {!acted ? (
                                  <div className="flex items-center gap-2 pt-2 border-t border-slate-700/50">
                                    <Button size="sm" className="h-6 text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                                      onClick={() => handleAction(c.id, 'Authorize Refund', c.claimId)}>
                                      <ThumbsUp className="h-3 w-3" /> Authorize Refund
                                    </Button>
                                    <Button size="sm" variant="outline" className="h-6 text-[9px] border-red-500/50 text-red-400 hover:bg-red-500/10 gap-1"
                                      onClick={() => handleAction(c.id, 'Reject — Successful Transaction', c.claimId)}>
                                      <ThumbsDown className="h-3 w-3" /> Reject
                                    </Button>
                                    <Button size="sm" variant="ghost" className="h-6 text-[9px] text-blue-400 hover:bg-blue-500/10 gap-1"
                                      onClick={() => setAnalyzeItem(c.terminalId)}>
                                      <Eye className="h-3 w-3" /> 3-Pane Detail
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="pt-2 border-t border-slate-700/50 flex items-center gap-2 text-[10px]">
                                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                    <span className="text-emerald-400 font-medium">{acted}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                )}

                {/* ── SYSTEM OVERAGES SECTION ── */}
                {inboxFilter !== 'customer' && (
                  <div>
                    <div className="mb-1.5 text-[10px] text-slate-500 flex items-center gap-1">
                      <Monitor className="h-3.5 w-3.5 text-orange-400" />
                      System-Detected Overages — FLM signals: auto-recovery, complaint-triggered jams, silent close events.
                      <span className="ml-auto flex items-center gap-3">
                        <span className="text-red-400">{preemptiveAlerts.filter(a => a.riskLevel === 'Critical').length} Critical</span>
                        <span className="text-amber-400">{preemptiveAlerts.filter(a => a.confidence >= 80).length} High Confidence</span>
                      </span>
                    </div>
                    <div className="space-y-2">
                      {preemptiveAlerts.map(alert => {
                        const acted = actionLog[alert.id];
                        const confColor = alert.confidence >= 90 ? 'text-emerald-400' : alert.confidence >= 75 ? 'text-amber-400' : 'text-slate-400';
                        const riskBorder = alert.riskLevel === 'Critical' ? 'border-red-500/50 bg-red-500/5' : alert.riskLevel === 'High' ? 'border-orange-500/30' : alert.riskLevel === 'Medium' ? 'border-amber-500/20' : 'border-slate-700';
                        return (
                          <div key={alert.id} className={`rounded-lg border bg-slate-800 p-3 ${riskBorder} ${acted ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-3 mb-2">
                              <Monitor className="h-3.5 w-3.5 text-orange-400 shrink-0" />
                              <span className="font-mono font-bold text-white text-[11px]">{alert.terminalId}</span>
                              <span className="text-[10px] text-slate-500">{alert.bank} · {alert.region}</span>
                              <Badge className={`text-[8px] px-1.5 py-0 ${
                                alert.riskLevel === 'Critical' ? 'bg-red-500/20 text-red-400 animate-pulse' :
                                alert.riskLevel === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                alert.riskLevel === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-slate-500/20 text-slate-400'
                              }`}>{alert.riskLevel}</Badge>
                              <Badge className="text-[8px] px-1.5 py-0 bg-blue-500/20 text-blue-400">{alert.signalType}</Badge>
                              <div className="ml-auto flex items-center gap-2">
                                <span className={`text-[10px] font-mono font-bold ${alert.eodCountdown.startsWith('1h') || alert.eodCountdown.startsWith('0h') ? 'text-red-400' : 'text-amber-400'}`}>
                                  ⏱ {alert.eodCountdown}
                                </span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2 mb-2">
                              <div className="bg-orange-500/5 border border-orange-500/20 rounded p-2">
                                <p className="text-[8px] text-orange-400 font-bold uppercase mb-1">Inferred Overage</p>
                                <p className="text-lg font-bold font-mono text-orange-400">{formatINR(alert.inferredOverage)}</p>
                              </div>
                              <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                                <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Confidence</p>
                                <p className={`text-lg font-bold font-mono ${confColor}`}>{alert.confidence}%</p>
                                <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden mt-1">
                                  <div className={`h-full rounded-full ${alert.confidence >= 90 ? 'bg-emerald-500' : alert.confidence >= 75 ? 'bg-amber-500' : 'bg-slate-500'}`}
                                    style={{ width: `${alert.confidence}%` }} />
                                </div>
                              </div>
                              <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                                <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">FLM Agent</p>
                                <p className="text-sm font-bold text-white">{alert.flmAgent}</p>
                              </div>
                              <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                                <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">EJ Reference</p>
                                <p className="text-[10px] font-mono text-blue-400">{alert.ejRef}</p>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mb-2">{alert.detail}</p>
                            {!acted ? (
                              <div className="flex items-center gap-2">
                                {alert.confidence >= 90 && (
                                  <Button size="sm" className="h-6 text-[9px] bg-emerald-500 hover:bg-emerald-600 text-white gap-1 font-bold"
                                    onClick={() => handleAction(alert.id, 'Auto-Confirmed Declaration (90%+ Confidence)', alert.terminalId)}>
                                    <Zap className="h-3 w-3" /> Auto-Confirm Declaration
                                  </Button>
                                )}
                                <Button size="sm" className="h-6 text-[9px] bg-orange-600 hover:bg-orange-700 text-white gap-1"
                                  onClick={() => handleAction(alert.id, 'Declare Pre-Emptive Overage', alert.terminalId)}>
                                  <Banknote className="h-3 w-3" /> Declare Overage
                                </Button>
                                <Button size="sm" variant="outline" className="h-6 text-[9px] border-amber-500/50 text-amber-400 hover:bg-amber-500/10 gap-1"
                                  onClick={() => handleAction(alert.id, 'Assign FLM Verification', alert.terminalId)}>
                                  <User className="h-3 w-3" /> Assign FLM Check
                                </Button>
                                {alert.riskLevel === 'Critical' && (
                                  <Button size="sm" variant="outline" className="h-6 text-[9px] border-red-500/50 text-red-400 hover:bg-red-500/10 gap-1"
                                    onClick={() => handleAction(alert.id, 'Escalate to Regional Manager', alert.terminalId)}>
                                    <Gavel className="h-3 w-3" /> Escalate
                                  </Button>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[10px]">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-medium">{acted}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </TabsContent>

              {/* ═══════════════════════════════════════════════════ */}
              {/* HUB 2: PHYSICAL VS. DIGITAL (Vault Verification)  */}
              {/* ═══════════════════════════════════════════════════ */}
              <TabsContent value="vault" className="mt-0">
                <div className="mb-2 text-[10px] text-slate-500 flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-purple-400" />
                  Vault Verification — 3-way match: Physical Vault Count vs Digital Deposit Slips vs Custodian App Entries. Only variances shown.
                </div>
                <div className="space-y-2">
                  {fVault.map(v => {
                    const acted = actionLog[v.id];
                    return (
                      <div key={v.id} className={`rounded-lg border bg-slate-800 p-3 ${
                        v.pilferageRiskScore >= 70 ? 'border-red-500/40' :
                        v.pilferageRiskScore >= 40 ? 'border-amber-500/30' :
                        'border-slate-700'
                      } ${acted ? 'opacity-50' : ''}`}>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono font-bold text-white text-[11px]">{v.terminalId}</span>
                          <span className="text-[10px] text-slate-500">{v.bank} · {v.region}</span>
                          <Badge className={`text-[8px] px-1.5 py-0 ${v.varianceType === 'Shortage' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            {v.varianceType}
                          </Badge>
                          <div className="flex items-center gap-1 ml-1">
                            <Badge className={`text-[7px] px-1 py-0 ${v.sealStatus === 'Sealed' ? 'bg-emerald-500/20 text-emerald-400' : v.sealStatus === 'Broken' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'}`}>
                              <Lock className="h-2.5 w-2.5 mr-0.5" />{v.sealStatus}
                            </Badge>
                            {!v.cllScanMatch && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400">CLL ✗</Badge>}
                            {!v.loadingSlipUploaded && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400">No Slip</Badge>}
                          </div>
                          <span className="ml-auto text-[10px] text-slate-500">
                            <User className="h-3 w-3 inline mr-0.5" />{v.custodianName} ({v.custodianId})
                          </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-[10px] mb-2">
                          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-2">
                            <p className="text-[8px] text-emerald-400 font-bold uppercase mb-1">Physical Vault</p>
                            <p className="text-lg font-bold font-mono text-white">{formatINR(v.physicalVaultCount)}</p>
                          </div>
                          <div className="bg-blue-500/5 border border-blue-500/20 rounded p-2">
                            <p className="text-[8px] text-blue-400 font-bold uppercase mb-1">Digital Slip</p>
                            <p className="text-lg font-bold font-mono text-white">{formatINR(v.digitalDepositSlip)}</p>
                          </div>
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                            <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Custodian Entry</p>
                            <p className="text-lg font-bold font-mono text-white">{formatINR(v.custodianEntry)}</p>
                          </div>
                          <div className={`rounded p-2 border ${v.variance !== 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                            <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">VARIANCE</p>
                            <p className={`text-lg font-bold font-mono ${v.variance < 0 ? 'text-red-400' : v.variance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                              {v.variance < 0 ? '-' : v.variance > 0 ? '+' : ''}{formatINR(Math.abs(v.variance))}
                            </p>
                            <div className="flex items-center gap-1 mt-1">
                              <span className="text-[8px] text-slate-500">Pilferage Risk:</span>
                              <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full ${v.pilferageRiskScore >= 70 ? 'bg-red-500' : v.pilferageRiskScore >= 40 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${v.pilferageRiskScore}%` }} />
                              </div>
                              <span className={`text-[9px] font-bold ${v.pilferageRiskScore >= 70 ? 'text-red-400' : v.pilferageRiskScore >= 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                                {v.pilferageRiskScore}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-[10px] text-slate-400 mb-2">{v.notes}</p>
                        {!acted ? (
                          <div className="flex items-center gap-2">
                            {v.pilferageRiskScore >= 60 && (
                              <Button size="sm" className="h-6 text-[9px] bg-red-600 hover:bg-red-700 text-white gap-1"
                                onClick={() => handleAction(v.id, 'Escalate to Checker', v.terminalId)}>
                                <Gavel className="h-3 w-3" /> Escalate to Checker
                              </Button>
                            )}
                            <Button size="sm" variant="outline" className="h-6 text-[9px] border-amber-500/50 text-amber-400 hover:bg-amber-500/10 gap-1"
                              onClick={() => handleAction(v.id, 'Flag as Shortage Query', v.terminalId)}>
                              <AlertTriangle className="h-3 w-3" /> Shortage Query
                            </Button>
                            <Button size="sm" variant="ghost" className="h-6 text-[9px] text-blue-400 hover:bg-blue-500/10 gap-1"
                              onClick={() => setAnalyzeItem(v.terminalId)}>
                              <Eye className="h-3 w-3" /> Analyze
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 text-[10px]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">{acted}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </TabsContent>

              {/* ═══════════════════════════════════════════════════ */}
              {/* HUB 3: SLA & PENALTY TRACKING (Penalty Command)   */}
              {/* ═══════════════════════════════════════════════════ */}
              <TabsContent value="penalty" className="mt-0">
                {/* Breach Alert Banner */}
                {breachedWindows > 0 && (
                  <div className="mb-3 rounded-lg border border-red-500/50 bg-red-500/10 p-3 flex items-center gap-3">
                    <AlertTriangle className="h-5 w-5 text-red-400 shrink-0 animate-pulse" />
                    <div>
                      <p className="text-[11px] font-bold text-red-400">⚠ NON-NEGOTIABLE CONTROL BREACH DETECTED</p>
                      <p className="text-[10px] text-red-300/80">{breachedWindows} overage(s) passed EOD deadline without declaration. Harmonizing Penalty auto-applied.</p>
                    </div>
                  </div>
                )}

                {/* Sub-Tab Toggle */}
                <div className="flex items-center gap-1 mb-3 p-1 bg-slate-800 rounded-lg border border-slate-700 w-fit">
                  <button
                    onClick={() => setPenaltySubTab('harmonizing')}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                      penaltySubTab === 'harmonizing'
                        ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <AlertTriangle className="h-3 w-3" /> Harmonizing Penalties
                    <Badge className={`text-[8px] px-1 py-0 ${penaltySubTab === 'harmonizing' ? 'bg-red-500/30 text-red-100' : 'bg-slate-600 text-slate-300'}`}>
                      {controlWindowEntries.length}
                    </Badge>
                  </button>
                  <button
                    onClick={() => setPenaltySubTab('delay')}
                    className={`px-3 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                      penaltySubTab === 'delay'
                        ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/20'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <Clock className="h-3 w-3" /> Delay Penalties
                    <Badge className={`text-[8px] px-1 py-0 ${penaltySubTab === 'delay' ? 'bg-amber-500/30 text-amber-100' : 'bg-slate-600 text-slate-300'}`}>
                      {fClaims.length}
                    </Badge>
                  </button>
                </div>

                {/* ══ SUB-TAB: Harmonizing Penalties ══ */}
                {penaltySubTab === 'harmonizing' && (
                  <div>
                    <p className="text-[10px] text-red-400/70 mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Staff reporting errors — undeclared overages detected by EJ/Machine. <span className="font-bold text-red-400">Money already lost.</span>
                    </p>
                    <div className="space-y-2">
                      {controlWindowEntries
                        .sort((a, b) => a.remainingPct - b.remainingPct)
                        .map(cw => {
                        const acted = actionLog[cw.id];
                        const isBreach = cw.status === 'Breached';
                        const isCritical = cw.remainingPct <= 20 && !isBreach;
                        const matchedHP = fPenalties.find(p => p.terminalId === cw.terminalId);
                        const missedEODs = matchedHP?.eodsPassed || (isBreach ? 1 : 0);
                        const penaltyPerEOD = matchedHP?.dailyBackdatedPenalty || 500;
                        const accruedPenalty = missedEODs * penaltyPerEOD;
                        return (
                          <div key={cw.id} className={`rounded-lg border bg-slate-800 p-3 ${
                            isBreach ? 'border-red-500/60 bg-red-900/20' : isCritical ? 'border-red-500/30' : 'border-red-500/20'
                          } ${acted ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-3 mb-2">
                              <Monitor className="h-3.5 w-3.5 text-red-400 shrink-0" />
                              <span className="font-mono font-bold text-white text-[11px]">{cw.terminalId}</span>
                              <Badge className={`text-[8px] px-1.5 py-0 ${
                                isBreach ? 'bg-red-600 text-white animate-pulse' :
                                isCritical ? 'bg-red-500/20 text-red-400' :
                                'bg-red-500/10 text-red-300'
                              }`}>{isBreach ? '🚨 CONTROL BREACH' : cw.status}</Badge>
                              {isBreach && <Badge className="text-[8px] px-1.5 py-0 bg-red-600/30 text-red-300">Non-Negotiable</Badge>}
                            </div>
                            <div className="grid grid-cols-4 gap-2 mb-2">
                              <div className="bg-red-500/5 border border-red-500/20 rounded p-2">
                                <p className="text-[8px] text-red-400 font-bold uppercase mb-1">Expected Overage</p>
                                <p className="text-lg font-bold font-mono text-red-400">{formatINR(cw.overageAmount)}</p>
                              </div>
                              <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                                <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Next EOD Deadline</p>
                                <p className="text-lg font-bold font-mono text-white">{cw.eodDeadline}</p>
                                <p className="text-[8px] text-slate-500">18:00 cutoff</p>
                              </div>
                              <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                                <p className="text-[8px] text-red-400 font-bold uppercase mb-1">Missed Windows</p>
                                <p className="text-lg font-bold font-mono text-red-400">{missedEODs}</p>
                                <p className="text-[8px] text-red-300/60">EODs passed</p>
                              </div>
                              <div className="bg-red-500/10 border border-red-500/30 rounded p-2">
                                <p className="text-[8px] text-red-400 font-bold uppercase mb-1">Accrued Penalty</p>
                                <p className="text-lg font-bold font-mono text-red-400">{formatINR(accruedPenalty)}</p>
                                <p className="text-[8px] text-red-300/60 font-semibold">Unrecoverable Loss</p>
                              </div>
                            </div>
                            {/* Deadline bar */}
                            <div className="mb-2">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[9px] text-red-300/70 font-medium">
                                  {isBreach ? '⏰ EXPIRED — Penalty Active' : `⏰ Declare within ${cw.remainingTime}`}
                                </span>
                                <span className="text-[9px] text-red-300/50">₹{penaltyPerEOD}/missed EOD</span>
                              </div>
                              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full rounded-full transition-all ${
                                  isBreach ? 'bg-red-600' : isCritical ? 'bg-red-500' : cw.remainingPct > 40 ? 'bg-red-400' : 'bg-red-500'
                                }`} style={{ width: `${Math.max(isBreach ? 100 : 100 - cw.remainingPct, 3)}%` }} />
                              </div>
                            </div>
                            {!acted && !isBreach ? (
                              <Button size="sm" className="h-7 text-[10px] bg-red-600 hover:bg-red-700 text-white gap-1 font-bold"
                                onClick={() => handleAction(cw.id, 'Overage Declared — Penalty Clock Stopped', cw.terminalId)}>
                                <Banknote className="h-3 w-3" /> Declare Overage Now
                              </Button>
                            ) : isBreach && !acted ? (
                              <div className="flex items-center gap-2">
                                <Button size="sm" className="h-7 text-[10px] bg-red-600 hover:bg-red-700 text-white gap-1 font-bold"
                                  onClick={() => handleAction(cw.id, 'Late Declaration Filed — Penalty Applied', cw.terminalId)}>
                                  <Gavel className="h-3 w-3" /> Declare Overage Now
                                </Button>
                                <span className="text-[9px] text-red-400 font-bold">⚠ Harmonizing Penalty already applied</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[10px]">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-medium">{acted}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* ══ SUB-TAB: Delay Penalties (Customer Claims T+5) ══ */}
                {penaltySubTab === 'delay' && (
                  <div>
                    <p className="text-[10px] text-amber-400/70 mb-2 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Customer claim management — resolve before T+5 to avoid daily penalties. <span className="font-bold text-amber-400">Money can still be saved.</span>
                    </p>
                    <div className="space-y-2">
                      {fClaims
                        .sort((a, b) => b.daysElapsed - a.daysElapsed)
                        .map(c => {
                        const acted = actionLog[c.id];
                        const daysRemaining = Math.max(0, 5 - c.daysElapsed);
                        const isOverdue = c.daysElapsed >= 5;
                        const isCritical = daysRemaining <= 1 && !isOverdue;
                        return (
                          <div key={c.id} className={`rounded-lg border bg-slate-800 p-3 ${
                            isOverdue ? 'border-red-500/50 bg-red-900/10' :
                            isCritical ? 'border-amber-500/50' : 'border-amber-500/20'
                          } ${acted ? 'opacity-50' : ''}`}>
                            <div className="flex items-center gap-3 mb-2">
                              <User className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                              <span className="font-mono font-bold text-white text-[11px]">{c.terminalId}</span>
                              <span className="text-[10px] text-slate-500">{c.bank}</span>
                              <span className="text-[9px] text-slate-500 font-mono">{c.claimId}</span>
                              {isOverdue && (
                                <Badge className="text-[8px] px-1.5 py-0 bg-red-600 text-white animate-pulse ml-1">Daily Fine Active</Badge>
                              )}
                              <Badge className={`text-[8px] px-1.5 py-0 ml-auto ${
                                isOverdue ? 'bg-red-500/20 text-red-400' :
                                isCritical ? 'bg-amber-500/20 text-amber-400' :
                                'bg-amber-500/10 text-amber-300'
                              }`}>
                                {isOverdue ? `OVERDUE — Day ${c.daysElapsed}` : `Resolve within ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-5 gap-2 mb-2">
                              <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                                <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Claim Amount</p>
                                <p className="text-lg font-bold font-mono text-amber-400">{formatINR(c.claimedAmount)}</p>
                              </div>
                              <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                                <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Complaint Date</p>
                                <p className="text-sm font-bold font-mono text-white">{c.txnDate}</p>
                                <p className="text-[8px] text-slate-500">T-Day</p>
                              </div>
                              <div className={`rounded p-2 border ${isOverdue ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                <p className={`text-[8px] font-bold uppercase mb-1 ${isOverdue ? 'text-red-400' : 'text-amber-400'}`}>Time Since Complaint</p>
                                <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden mt-1">
                                  <div className={`h-full rounded-full transition-all ${
                                    isOverdue ? 'bg-red-500' : c.daysElapsed >= 3 ? 'bg-amber-500' : 'bg-emerald-500'
                                  }`} style={{ width: `${Math.min(100, (c.daysElapsed / 5) * 100)}%` }} />
                                </div>
                                <p className={`text-[9px] font-bold mt-1 ${isOverdue ? 'text-red-400' : 'text-amber-300'}`}>
                                  {isOverdue ? `OVERDUE — Day ${c.daysElapsed}` : `Day ${c.daysElapsed} of 5`}
                                </p>
                              </div>
                              <div className={`rounded p-2 border ${isOverdue ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/5 border-amber-500/20'}`}>
                                <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">Daily Penalty Rate</p>
                                <p className={`text-lg font-bold font-mono ${isOverdue ? 'text-red-400' : 'text-amber-400'}`}>{formatINR(c.penaltyPerDay)}</p>
                                <p className="text-[8px] text-slate-500">per day after T+5</p>
                              </div>
                              <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                                <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">Status</p>
                                <p className={`text-[10px] font-bold ${
                                  c.status === 'EJ Mismatch' ? 'text-red-400' :
                                  c.status === 'Awaiting Physical' ? 'text-amber-400' :
                                  c.status === 'Pending Verification' ? 'text-amber-300' :
                                  'text-blue-400'
                                }`}>
                                  {c.status === 'EJ Mismatch' ? 'Awaiting EJ Log' :
                                   c.status === 'Awaiting Physical' ? 'Awaiting Video' :
                                   c.status}
                                </p>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mb-2">{c.errorDesc}</p>
                            {!acted ? (
                              <div className="flex items-center gap-2">
                                <Button size="sm" className={`h-7 text-[10px] font-bold gap-1 ${
                                  isOverdue ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'
                                } text-white`}
                                  onClick={() => handleAction(c.id, 'Claim Resolved — Penalty Clock Stopped', c.terminalId)}>
                                  <ShieldCheck className="h-3 w-3" /> Resolve & Stop Penalty
                                </Button>
                                <Button size="sm" variant="outline" className="h-7 text-[10px] border-slate-600 text-slate-300 hover:bg-slate-700 gap-1"
                                  onClick={() => setAnalyzeItem(c.terminalId)}>
                                  <Eye className="h-3 w-3" /> 3-Pane Detail
                                </Button>
                                {c.accruedPenalty > 0 && (
                                  <span className="ml-auto text-[9px] text-red-400 font-bold">Accrued: {formatINR(c.accruedPenalty)}</span>
                                )}
                              </div>
                            ) : (
                              <div className="flex items-center gap-2 text-[10px]">
                                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                                <span className="text-emerald-400 font-medium">{acted}</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          ) : (
            /* ══════════ HISTORICAL MODE ══════════ */
            <>
              <div className="mb-3 rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3 flex items-start gap-3">
                <TrendingUp className="h-4 w-4 text-indigo-400 mt-0.5 shrink-0" />
                <div>
                  <p className="text-[11px] font-bold text-indigo-300 mb-1">Pattern Recognition — {timeframeLabel}</p>
                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {timeframe === '7d' && 'Insight: 68% of mismatches this week originated from North Zone ATMs. HDFC Batch processing delays caused 4 out of 6 T+5 breaches. Auto-resolution rate improved by 3.4% — bot is handling more EJ-confirmed jams autonomously.'}
                    {timeframe === 'mtd' && 'Insight: Vault shortages in North Region spiked 18% month-over-month, concentrated around salary disbursement dates (1st, 15th). SecureCash Logistics accounts for 42% of all pilferage-flagged entries. Penalty exposure declined 12% due to faster EOD compliance.'}
                    {timeframe === 'quarterly' && 'Insight: Quarterly leakage reduced from ₹12.8 Cr to ₹10.2 Cr (↓20%). Top improvement: Auto-Recovery matching now catches 78% of denomination drifts within 2 hours. Key risk: West Zone custodian pool shows recurring seal-break patterns — recommend vendor audit.'}
                  </p>
                </div>
              </div>

              <Tabs value={historicalTab} onValueChange={setHistoricalTab}>
                <TabsList className="h-8 bg-slate-800 border border-slate-700 mb-3">
                  <TabsTrigger value="mismatch-history" className="text-[10px] h-7 data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-1">
                    <BarChart3 className="h-3 w-3" /> 3-Way Mismatch History
                  </TabsTrigger>
                  <TabsTrigger value="resolved-archive" className="text-[10px] h-7 data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Resolved Claims Archive
                  </TabsTrigger>
                  <TabsTrigger value="penalty-analysis" className="text-[10px] h-7 data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-1">
                    <Flame className="h-3 w-3" /> Penalty Analysis
                  </TabsTrigger>
                  <TabsTrigger value="strategic" className="text-[10px] h-7 data-[state=active]:bg-indigo-600 data-[state=active]:text-white gap-1">
                    <Award className="h-3 w-3" /> Strategic Insights
                  </TabsTrigger>
                </TabsList>

                {/* ── Tab 1: 3-Way Mismatch History ── */}
                <TabsContent value="mismatch-history" className="mt-0">
                  <div className="mb-3 grid grid-cols-4 gap-2">
                    <div className="rounded-lg border border-slate-700 bg-slate-800 p-3 text-center">
                      <p className="text-[9px] text-slate-400 uppercase font-medium mb-1">Total Mismatches</p>
                      <p className="text-2xl font-bold text-white">{theftCount + techCount}</p>
                    </div>
                    <div className="rounded-lg border border-red-500/30 bg-red-500/5 p-3 text-center">
                      <p className="text-[9px] text-red-400 uppercase font-medium mb-1">Resolved as Theft</p>
                      <p className="text-2xl font-bold text-red-400">{theftCount}</p>
                      <p className="text-[9px] text-slate-500">{((theftCount / (theftCount + techCount)) * 100).toFixed(0)}%</p>
                    </div>
                    <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3 text-center">
                      <p className="text-[9px] text-blue-400 uppercase font-medium mb-1">Resolved as Technical</p>
                      <p className="text-2xl font-bold text-blue-400">{techCount}</p>
                      <p className="text-[9px] text-slate-500">{((techCount / (theftCount + techCount)) * 100).toFixed(0)}%</p>
                    </div>
                    <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-center">
                      <p className="text-[9px] text-emerald-400 uppercase font-medium mb-1">Total Recovered</p>
                      <p className="text-2xl font-bold text-emerald-400">{formatINR(totalSaved)}</p>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800 p-3 mb-3">
                    <p className="text-[10px] text-slate-400 font-medium mb-2">Resolution Breakdown</p>
                    <div className="h-4 bg-slate-700 rounded-full overflow-hidden flex">
                      <div className="bg-red-500 h-full transition-all" style={{ width: `${(theftCount / (theftCount + techCount)) * 100}%` }} />
                      <div className="bg-blue-500 h-full transition-all" style={{ width: `${(techCount / (theftCount + techCount)) * 100}%` }} />
                    </div>
                    <div className="flex items-center gap-4 mt-1.5 text-[9px]">
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Theft/Fraud ({theftCount})</span>
                      <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> Technical Error ({techCount})</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                    <div className="px-3 py-2 border-b border-slate-700 flex items-center gap-2">
                      <Select value={archiveFilter} onValueChange={setArchiveFilter}>
                        <SelectTrigger className="h-6 w-[140px] text-[10px] bg-slate-700 border-slate-600 text-slate-300"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all" className="text-[11px]">All Resolutions</SelectItem>
                          <SelectItem value="theft" className="text-[11px]">Theft Only</SelectItem>
                          <SelectItem value="technical" className="text-[11px]">Technical Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1 max-w-[200px]">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3 w-3 text-slate-500" />
                        <Input placeholder="Search archive..." value={archiveSearch} onChange={e => setArchiveSearch(e.target.value)}
                          className="pl-7 h-6 text-[10px] bg-slate-700 border-slate-600 text-white" />
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-slate-700 h-7">
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">ATM</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Bank</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Region</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Amount</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Resolved As</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Mode</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Time</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredArchive.map(r => (
                          <TableRow key={r.id} className="border-b border-slate-700/50 h-7 text-[11px] hover:bg-slate-700/30 cursor-pointer"
                            onDoubleClick={() => setPostMortemItem(r)}>
                            <TableCell className="py-1 font-mono font-bold text-white text-[10px]">{r.terminalId}</TableCell>
                            <TableCell className="py-1 text-slate-400">{r.bank}</TableCell>
                            <TableCell className="py-1 text-slate-400">{r.region}</TableCell>
                            <TableCell className="py-1 text-right font-bold text-white">{formatINR(r.amount)}</TableCell>
                            <TableCell className="py-1">
                              <Badge className={`text-[8px] px-1 py-0 ${r.resolvedAs === 'Theft' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {r.resolvedAs}
                              </Badge>
                            </TableCell>
                            <TableCell className="py-1 text-[10px] text-slate-300">{r.resolutionMode}</TableCell>
                            <TableCell className="py-1 text-[10px] text-slate-400">{r.timeToResolve}</TableCell>
                            <TableCell className="py-1">
                              <Button size="sm" variant="ghost" className="h-5 text-[9px] text-indigo-400 hover:bg-indigo-500/10 px-1.5 gap-0.5"
                                onClick={() => setPostMortemItem(r)}>
                                <Eye className="h-3 w-3" /> Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* ── Tab 2: Resolved Archive ── */}
                <TabsContent value="resolved-archive" className="mt-0">
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    {recoveryEfficiency.map(re => (
                      <div key={re.category} className="rounded-lg border border-slate-700 bg-slate-800 p-3">
                        <p className="text-[10px] text-slate-400 font-medium mb-2">{re.category}</p>
                        <div className="flex items-end justify-between mb-1">
                          <span className="text-lg font-bold text-emerald-400">{formatINR(re.recovered)}</span>
                          <span className="text-[10px] text-slate-500">/ {formatINR(re.potential)}</span>
                        </div>
                        <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(re.recovered / re.potential) * 100}%` }} />
                        </div>
                        <p className="text-[9px] text-slate-500 mt-1">{((re.recovered / re.potential) * 100).toFixed(0)}% efficiency</p>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                {/* ── Tab 3: Penalty Analysis ── */}
                <TabsContent value="penalty-analysis" className="mt-0">
                  <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-b border-slate-700 h-7">
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Entity</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Total Penalty</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Incidents</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Avg Delay</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Trend</TableHead>
                          <TableHead className="text-[9px] font-bold text-slate-400 py-1">Severity</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {penaltyAnalysis.map(pa => (
                          <TableRow key={pa.entity} className="border-b border-slate-700/50 h-7 text-[11px] hover:bg-slate-700/30">
                            <TableCell className="py-1 font-bold text-white">{pa.entity}</TableCell>
                            <TableCell className="py-1 text-right font-bold text-red-400">{formatINR(pa.totalPenalty)}</TableCell>
                            <TableCell className="py-1 text-right text-white">{pa.incidents}</TableCell>
                            <TableCell className="py-1 text-slate-300">{pa.avgDelay}</TableCell>
                            <TableCell className="py-1">
                              <Badge className={`text-[8px] px-1 py-0 ${
                                pa.trend === 'rising' ? 'bg-red-500/20 text-red-400' :
                                pa.trend === 'stable' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-emerald-500/20 text-emerald-400'
                              }`}>{pa.trend}</Badge>
                            </TableCell>
                            <TableCell className="py-1">
                              <Badge className={`text-[8px] px-1 py-0 ${
                                pa.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                                pa.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                pa.severity === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                                'bg-slate-500/20 text-slate-400'
                              }`}>{pa.severity}</Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>

                {/* ── Tab 4: Strategic Insights ── */}
                <TabsContent value="strategic" className="mt-0">
                  <div className="space-y-3">
                    <div className="rounded-lg border border-slate-700 bg-slate-800 p-4">
                      <p className="text-[10px] text-slate-400 font-bold uppercase mb-2">Top Leakage Contributors</p>
                      <div className="space-y-2">
                        {topLeakageContributors.map(c => (
                          <div key={c.name} className="flex items-center gap-3 text-[11px]">
                            <Badge className={`text-[8px] px-1.5 py-0 w-16 justify-center ${
                              c.type === 'Vendor' ? 'bg-red-500/20 text-red-400' :
                              c.type === 'Region' ? 'bg-amber-500/20 text-amber-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>{c.type}</Badge>
                            <span className="text-white font-medium flex-1">{c.name}</span>
                            <span className="text-slate-400">{c.region}</span>
                            <span className="font-bold text-red-400 font-mono">{formatINR(c.amount)}</span>
                            <span className="text-slate-500">{c.incidents} incidents</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>

      {/* ═══ 3-PANE RECONCILIATION MODAL ═══ */}
      <Dialog open={!!analyzeItem} onOpenChange={() => setAnalyzeItem(null)}>
        <DialogContent className="max-w-5xl bg-slate-800 border-slate-700 text-slate-100 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2 text-white">
              <Target className="h-4 w-4 text-red-400" />
              3-Pane Reconciliation — {analyzeItem}
              {reconData && <Badge className="text-[9px] bg-slate-700 text-slate-300 ml-2">{reconData.date}</Badge>}
            </DialogTitle>
          </DialogHeader>

          {reconData ? (
            <div className="px-5 pb-5 pt-3">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Pane 1: Bank */}
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <DollarSign className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase">Pane 1: The Bank's Side</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Claim Amount</span><span className="text-white font-mono font-bold">{formatINR(reconData.bankSide.claimAmount)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Switch Code</span><span className="text-white font-mono text-[10px]">{reconData.bankSide.switchApprovalCode}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Dispute Ref</span><span className="text-white font-mono text-[10px]">{reconData.bankSide.disputeTableRef}</span></div>
                    <div className="border-t border-slate-600 pt-2">
                      <p className="text-[9px] text-blue-400 font-bold uppercase mb-1">Bank Narrative</p>
                      <p className="text-[10px] text-slate-300 leading-relaxed">{reconData.bankSide.claimNarrative}</p>
                    </div>
                    <p className="text-[9px] text-slate-500">{reconData.bankSide.bankContactEmail}</p>
                  </div>
                </div>
                {/* Pane 2: Machine + Auditually Video */}
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Cpu className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Pane 2: The Machine's Side</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div>
                      <p className="text-[9px] text-amber-400 font-bold uppercase mb-1">Parsed EJ Log</p>
                      <pre className="bg-slate-950 border border-slate-700 rounded p-2 text-[9px] font-mono leading-relaxed max-h-[120px] overflow-y-auto">
                        {reconData.machineSide.ejLogSegment.split('\n').map((line, i) => {
                          const isError = /E-\d{4}|JAM|FAIL|TIMEOUT/i.test(line);
                          const isRecovery = /RECOVERY|RETRACTED/i.test(line);
                          const isSilent = /CLOSED|No Action/i.test(line);
                          return <div key={i} className={isError ? 'text-red-400' : isRecovery ? 'text-amber-400' : isSilent ? 'text-red-400 font-bold' : 'text-slate-400'}>{line}</div>;
                        })}
                      </pre>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {reconData.machineSide.sensorTriggers.map((s, i) => (
                        <Badge key={i} className="text-[7px] px-1 py-0 bg-amber-500/20 text-amber-400">{s}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Auto-Recovery</span>
                      <span className="text-amber-300">{reconData.machineSide.autoRecoveryStatus}</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-400">Reject Bin</span>
                      <Badge className={`text-[7px] px-1 py-0 ${reconData.machineSide.rejectBinStatus === 'Sealed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {reconData.machineSide.rejectBinStatus} · {reconData.machineSide.rejectBinNotes} notes
                      </Badge>
                    </div>
                    {/* Auditually Video Player */}
                    <div className="border-t border-slate-600 pt-2 mt-1">
                      <p className="text-[9px] text-amber-400 font-bold uppercase mb-1.5 flex items-center gap-1">
                        <Play className="h-3 w-3" /> Auditually Video
                      </p>
                      <div className="bg-slate-950 border border-slate-700 rounded-lg overflow-hidden">
                        <div className="h-24 flex items-center justify-center bg-slate-900">
                          <div className="text-center">
                            <Play className="h-8 w-8 text-amber-400/60 mx-auto mb-1" />
                            <p className="text-[9px] text-slate-500">Transaction Footage — {reconData.date}</p>
                          </div>
                        </div>
                        <div className="px-2 py-1.5 flex items-center gap-2 text-[9px] text-slate-500 bg-slate-900/50">
                          <Badge className="text-[7px] px-1 py-0 bg-emerald-500/20 text-emerald-400">HD</Badge>
                          <span>Duration: 00:42</span>
                          <span className="ml-auto">Camera: Front Panel</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pane 3: Human */}
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <User className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Pane 3: The Human Side</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Custodian</span><span className="text-white">{reconData.humanSide.custodianName} ({reconData.humanSide.custodianId})</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Vault Count</span><span className="text-white font-mono font-bold">{formatINR(reconData.humanSide.vaultCount)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Loading Slip</span><span className="text-white font-mono text-[10px]">{reconData.humanSide.loadingSlipRef}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">EOD Time</span><span className="text-slate-300 text-[10px]">{reconData.humanSide.eodTimestamp}</span></div>
                    <div>
                      <p className="text-[9px] text-emerald-400 font-bold uppercase mb-1">Photo Evidence</p>
                      <div className="flex gap-1 flex-wrap">
                        {reconData.humanSide.photoEvidence.map((photo, i) => (
                          <div key={i} className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-[8px] text-slate-400 flex items-center gap-1">
                            <Camera className="h-2.5 w-2.5" />{photo}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[9px] text-emerald-400 font-bold uppercase mb-1">Denomination</p>
                      <div className="grid grid-cols-2 gap-1">
                        {reconData.humanSide.denominationBreakdown.map(d => (
                          <div key={d.denom} className="bg-slate-800 rounded px-2 py-1 text-center">
                            <span className="text-[9px] text-slate-500">₹{d.denom}</span>
                            <span className="text-[9px] text-white font-bold ml-1">{d.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Vault Counter Capture */}
                    <div className="border-t border-slate-600 pt-2 mt-2">
                      <p className="text-[9px] text-emerald-400 font-bold uppercase mb-1.5 flex items-center gap-1">
                        <Camera className="h-3 w-3" /> Vault Counter Capture
                      </p>
                      {(() => {
                        const vcc = vaultCounterCaptures.find(v => v.terminalId === analyzeItem?.replace('ATM-MUM-', 'ATM-'));
                        const capture = vcc || vaultCounterCaptures[0];
                        return (
                          <div className="space-y-1.5">
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="text-slate-400">Station:</span>
                              <span className="text-white font-medium">{capture.verifiedBy}</span>
                              <span className="text-slate-600">·</span>
                              <span className="text-slate-400">Time:</span>
                              <span className="text-white">{capture.captureTime}</span>
                              <Badge className={`text-[7px] px-1 py-0 ml-auto ${capture.integrityScore >= 95 ? 'bg-emerald-500/20 text-emerald-400' : capture.integrityScore >= 85 ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400'}`}>
                                Integrity: {capture.integrityScore}%
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-1">
                              {capture.thumbnails.map((thumb, i) => (
                                <div key={i} className="bg-slate-800 border border-slate-600 rounded px-2 py-1.5 flex items-center gap-1.5">
                                  <div className="h-6 w-8 bg-slate-700 rounded flex items-center justify-center shrink-0">
                                    <Image className="h-3 w-3 text-slate-500" />
                                  </div>
                                  <span className="text-[8px] text-slate-400">{thumb}</span>
                                </div>
                              ))}
                            </div>
                            <div className="flex items-center gap-2 text-[10px]">
                              <span className="text-slate-400">Total Loaded:</span>
                              <span className="text-white font-mono font-bold">{formatINR(capture.totalLoaded)}</span>
                              {capture.tamperDetected && (
                                <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400 animate-pulse ml-auto">⚠ Tamper Alert</Badge>
                              )}
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verdict */}
              <div className={`rounded-lg border p-4 ${
                reconData.verdict.recommendation === 'Authorize Refund' ? 'border-emerald-500/40 bg-emerald-500/10' :
                reconData.verdict.recommendation === 'Escalate to Audit' ? 'border-red-500/40 bg-red-500/10' :
                'border-amber-500/40 bg-amber-500/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="text-[11px] font-bold text-white uppercase">System Verdict</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[9px] px-2 py-0.5 ${
                      reconData.verdict.recommendation === 'Authorize Refund' ? 'bg-emerald-600 text-white' :
                      reconData.verdict.recommendation === 'Escalate to Audit' ? 'bg-red-600 text-white' :
                      'bg-amber-600 text-white'
                    }`}>{reconData.verdict.recommendation}</Badge>
                    <span className="text-[10px] text-slate-400">Confidence: <span className="font-bold text-white">{reconData.verdict.confidence}%</span></span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">{reconData.verdict.reasoning}</p>
                <div className="flex items-center gap-1.5 mb-3">
                  <Target className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">Estimated Recovery: {formatINR(reconData.verdict.estimatedRecovery)}</span>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-slate-600/50">
                  <Button size="sm" className="h-7 text-[10px] bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                    onClick={() => { handleAction(analyzeItem!, 'Authorize Refund', analyzeItem!); setAnalyzeItem(null); }}>
                    <ThumbsUp className="h-3.5 w-3.5" /> Authorize Refund
                  </Button>
                  <Button size="sm" className="h-7 text-[10px] bg-amber-600 hover:bg-amber-700 text-white gap-1"
                    onClick={() => { handleAction(analyzeItem!, 'Declare Overage', analyzeItem!); setAnalyzeItem(null); }}>
                    <Banknote className="h-3.5 w-3.5" /> Declare Overage
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-[10px] border-red-500/50 text-red-400 hover:bg-red-500/10 gap-1"
                    onClick={() => { handleAction(analyzeItem!, 'Reject', analyzeItem!); setAnalyzeItem(null); }}>
                    <ThumbsDown className="h-3.5 w-3.5" /> Reject
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-[10px] border-amber-500/50 text-amber-400 hover:bg-amber-500/10 gap-1"
                    onClick={() => { handleAction(analyzeItem!, 'Escalate to Audit', analyzeItem!); setAnalyzeItem(null); }}>
                    <Gavel className="h-3.5 w-3.5" /> Escalate to Audit
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <AlertCircle className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No 3-Pane reconciliation data available for this ATM.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* ═══ POST-MORTEM MODAL ═══ */}
      <Dialog open={!!postMortemItem} onOpenChange={() => setPostMortemItem(null)}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700 text-slate-100">
          <DialogHeader>
            <DialogTitle className="text-sm font-bold flex items-center gap-2 text-white">
              <History className="h-4 w-4 text-indigo-400" />
              Post-Mortem Analysis — {postMortemItem?.terminalId}
            </DialogTitle>
          </DialogHeader>
          {postMortemItem && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-slate-700 bg-slate-700/30 p-3">
                  <p className="text-[9px] text-slate-400 uppercase mb-1">Claim Amount</p>
                  <p className="text-xl font-bold font-mono text-white">{formatINR(postMortemItem.amount)}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{postMortemItem.bank} · {postMortemItem.region} · {postMortemItem.date}</p>
                </div>
                <div className={`rounded-lg border p-3 ${postMortemItem.resolvedAs === 'Theft' ? 'border-red-500/30 bg-red-500/5' : 'border-blue-500/30 bg-blue-500/5'}`}>
                  <p className="text-[9px] text-slate-400 uppercase mb-1">Root Cause</p>
                  <p className={`text-xl font-bold ${postMortemItem.resolvedAs === 'Theft' ? 'text-red-400' : 'text-blue-400'}`}>
                    {postMortemItem.resolvedAs}
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-indigo-500/30 bg-indigo-500/5 p-3">
                  <p className="text-[9px] text-indigo-400 uppercase font-bold mb-2">Resolution Mode</p>
                  <p className="text-[11px] text-slate-200">{postMortemItem.resolutionMode}</p>
                </div>
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <p className="text-[9px] text-emerald-400 uppercase font-bold mb-2">Final Outcome</p>
                  <p className="text-[11px] text-slate-200">{postMortemItem.outcome}</p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-slate-700 bg-slate-700/30 p-3 text-center">
                    <p className="text-[9px] text-slate-400 uppercase mb-1">Time-to-Resolve</p>
                    <p className="text-lg font-bold font-mono text-indigo-400">{postMortemItem.timeToResolve}</p>
                  </div>
                  <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3 text-center">
                    <p className="text-[9px] text-emerald-400 uppercase mb-1">Saved</p>
                    <p className="text-lg font-bold font-mono text-emerald-400">{formatINR(postMortemItem.savedAmount)}</p>
                  </div>
                  <div className={`rounded-lg border p-3 text-center ${postMortemItem.penaltyPaid > 0 ? 'border-red-500/30 bg-red-500/5' : 'border-emerald-500/30 bg-emerald-500/5'}`}>
                    <p className="text-[9px] text-slate-400 uppercase mb-1">Penalty Paid</p>
                    <p className={`text-lg font-bold font-mono ${postMortemItem.penaltyPaid > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {postMortemItem.penaltyPaid > 0 ? formatINR(postMortemItem.penaltyPaid) : '₹0'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSReconCenter;

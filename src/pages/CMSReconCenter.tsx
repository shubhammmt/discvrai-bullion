import React, { useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import {
  TrendingDown, TrendingUp, AlertTriangle, Shield, DollarSign, RefreshCw, Clock,
  Search, Filter, X, FileText, ChevronRight, ChevronDown, Eye, Zap, Info, Download,
  BarChart3, ArrowUpRight, ArrowDownRight, Target, Activity, CheckCircle2,
  XCircle, AlertCircle, ShieldAlert, Banknote, Cpu, ThumbsUp, ThumbsDown,
  Scale, Gavel, Code
} from 'lucide-react';
import {
  reconPulse, mismatchedLedgers, pendingClaims, harmonizingPenalties,
  threeWayRecons, autoRecoverySilentMatches, reconBanks, reconRegions, riskLevels,
  formatINR, getSeverityBadge, getClaimTimerColor,
  MismatchedLedger, PendingClaim, HarmonizingPenalty, AutoRecoverySilentMatch, TransactionComparison
} from '@/data/cmsReconCenter';

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

const CMSReconCenter = () => {
  const [bankFilter, setBankFilter] = useState('All');
  const [regionFilter, setRegionFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('mismatched');
  const [analyzeItem, setAnalyzeItem] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [expandedAR, setExpandedAR] = useState<string | null>(null);
  const [claimActions, setClaimActions] = useState<Record<string, string>>({});
  const [mismatchActions, setMismatchActions] = useState<Record<string, string>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleClaimAction = (claimId: string, action: string) => {
    setClaimActions(prev => ({ ...prev, [claimId]: action }));
    toast.success(`${action} — ${claimId}`, { description: 'Action recorded. Audit trail updated.' });
  };

  const handleMismatchAction = (id: string, action: string) => {
    setMismatchActions(prev => ({ ...prev, [id]: action }));
    toast.success(`${action} — ${id}`, { description: 'Action recorded. Audit trail updated.' });
  };

  const filteredMismatches = useMemo(() => {
    let list = mismatchedLedgers;
    if (bankFilter !== 'All') list = list.filter(m => m.bank === bankFilter);
    if (regionFilter !== 'All') list = list.filter(m => m.region === regionFilter);
    if (riskFilter !== 'All') list = list.filter(m => m.severity === riskFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m => m.terminalId.toLowerCase().includes(q) || m.bank.toLowerCase().includes(q));
    }
    return list;
  }, [bankFilter, regionFilter, riskFilter, search]);

  const filteredClaims = useMemo(() => {
    let list = pendingClaims;
    if (bankFilter !== 'All') list = list.filter(c => c.bank === bankFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c => c.terminalId.toLowerCase().includes(q) || c.claimId.toLowerCase().includes(q));
    }
    return list;
  }, [bankFilter, search]);

  const filteredPenalties = useMemo(() => {
    let list = harmonizingPenalties;
    if (bankFilter !== 'All') list = list.filter(p => p.bank === bankFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.terminalId.toLowerCase().includes(q));
    }
    return list;
  }, [bankFilter, search]);

  const filteredAR = useMemo(() => {
    let list = autoRecoverySilentMatches;
    if (bankFilter !== 'All') list = list.filter(a => a.bank === bankFilter);
    if (regionFilter !== 'All') list = list.filter(a => a.region === regionFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(a => a.terminalId.toLowerCase().includes(q));
    }
    return list;
  }, [bankFilter, regionFilter, search]);

  const reconData = analyzeItem ? threeWayRecons[analyzeItem] : null;
  const pulse = reconPulse;

  // Render the 3-column comparison for a single transaction
  const renderComparisonRow = (txn: TransactionComparison, idx: number) => (
    <div key={txn.txnId} className={`${idx > 0 ? 'border-t border-slate-700/50 pt-2 mt-2' : ''}`}>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="text-[9px] font-mono text-slate-500">{txn.txnId}</span>
        <span className="text-[9px] text-slate-600">@{txn.timestamp}</span>
        {txn.variance !== 0 && (
          <Badge className="text-[8px] px-1 py-0 bg-red-500/20 text-red-400 font-mono ml-auto animate-pulse">
            Δ {txn.variance > 0 ? '+' : '-'}{formatINR(txn.variance)}
          </Badge>
        )}
      </div>
      <div className="grid grid-cols-4 gap-2 text-[10px]">
        {/* Bank Switch */}
        <div className="bg-blue-500/5 border border-blue-500/20 rounded p-2">
          <p className="text-[8px] text-blue-400 font-bold uppercase mb-1">Bank Switch</p>
          <p className="text-slate-300">{txn.bankSwitch.action}</p>
          <p className="font-mono font-bold text-white">{formatINR(txn.bankSwitch.amount)}</p>
          <Badge className={`text-[7px] px-1 py-0 mt-1 ${txn.bankSwitch.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {txn.bankSwitch.status}
          </Badge>
        </div>
        {/* Machine EJ */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
          <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Machine EJ</p>
          <p className="text-slate-300">{txn.machineEJ.action}</p>
          <p className={`font-mono font-bold ${txn.machineEJ.amount !== txn.bankSwitch.amount ? 'text-red-400' : 'text-white'}`}>
            {formatINR(txn.machineEJ.amount)}
          </p>
          <Badge className={`text-[7px] px-1 py-0 mt-1 ${txn.machineEJ.status.includes('Success') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
            {txn.machineEJ.status}
          </Badge>
          {txn.machineEJ.errorCode && (
            <p className="text-[8px] text-red-400 font-mono mt-0.5">{txn.machineEJ.errorCode}</p>
          )}
        </div>
        {/* Physical Slip */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-2">
          <p className="text-[8px] text-emerald-400 font-bold uppercase mb-1">Physical Slip</p>
          <p className="text-slate-300">{txn.physicalSlip.action}</p>
          {txn.physicalSlip.amount > 0 && <p className="font-mono font-bold text-white">{formatINR(txn.physicalSlip.amount)}</p>}
          <p className="text-[8px] text-slate-400 mt-0.5">{txn.physicalSlip.note}</p>
        </div>
        {/* Variance */}
        <div className={`rounded p-2 border ${txn.variance !== 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
          <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">THE VARIANCE</p>
          <p className={`text-lg font-bold font-mono ${txn.variance !== 0 ? 'text-red-400' : 'text-emerald-400'}`}>
            {txn.variance !== 0 ? `${txn.variance > 0 ? '+' : '-'}${formatINR(txn.variance)}` : '✓ MATCH'}
          </p>
          <p className="text-[8px] text-slate-400 mt-1 leading-snug">{txn.varianceReason}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* ═══ HEADER ═══ */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1">
              <Target className="h-3.5 w-3.5" /> RECON CENTER
            </div>
            <div>
              <h1 className="text-xs font-bold text-white leading-tight">Reconciliation Command Center</h1>
              <p className="text-[9px] text-slate-400">Financial Reconciliation · Penalty Tracker · Dispute Resolution</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-56">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <Input placeholder="Search ATM, Claim ID..." value={search} onChange={e => setSearch(e.target.value)}
                className="pl-7 h-7 text-[11px] bg-slate-700 border-slate-600 text-white placeholder:text-slate-500" />
              {search && <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2"><X className="h-3 w-3 text-slate-400" /></button>}
            </div>
            <Button variant="outline" size="sm" className="h-7 text-[10px] border-slate-600 text-slate-300 gap-1 bg-transparent hover:bg-slate-700">
              <Download className="h-3 w-3" /> Export for Bank
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
          <Select value={riskFilter} onValueChange={setRiskFilter}>
            <SelectTrigger className="h-6 w-[100px] text-[10px] bg-slate-700 border-slate-600 text-slate-300"><SelectValue /></SelectTrigger>
            <SelectContent>{riskLevels.map(r => <SelectItem key={r} value={r} className="text-[11px]">{r === 'All' ? 'All Risk' : r}</SelectItem>)}</SelectContent>
          </Select>
          <div className="ml-auto text-[10px] text-slate-500">
            {pulse.totalCases.toLocaleString()} active cases · {pulse.resolvedToday} resolved today · Avg {pulse.avgResolutionHrs}h resolution
          </div>
        </div>
      </div>

      {/* ═══ RECON PULSE ═══ */}
      <div className="px-4 py-3 bg-slate-800/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-3">
          {[
            { label: 'Total Operational Leakage', value: formatINR(pulse.totalLeakage), trend: pulse.leakageTrend, icon: DollarSign, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', tip: 'Physical Shortages + Unresolved Claims.' },
            { label: 'Manual Intervention Rate', value: `${pulse.mir}%`, trend: pulse.mirTrend, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', tip: '% needing human verification vs STP.' },
            { label: 'Penalty Exposure', value: formatINR(pulse.penaltyExposure), trend: pulse.penaltyTrend, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', tip: 'Pending Harmonizing + T+5 fines.' },
            { label: 'Overage Recovery Rate', value: `${pulse.overageRecoveryRate}%`, trend: pulse.recoveryTrend, icon: RefreshCw, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', tip: '% of overages recovered & declared.' },
          ].map(tile => (
            <div key={tile.label} className={`rounded-lg border p-3 ${tile.bg}`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] text-slate-400 uppercase font-medium flex items-center gap-0.5">
                  {tile.label} <InfoTip text={tile.tip} />
                </span>
                <tile.icon className={`h-4 w-4 ${tile.color}`} />
              </div>
              <p className={`text-xl font-bold ${tile.color}`}>{tile.value}</p>
              <div className="flex items-center gap-1 mt-1">
                {tile.trend < 0 ? <ArrowDownRight className="h-3 w-3 text-emerald-400" /> : <ArrowUpRight className="h-3 w-3 text-red-400" />}
                <span className={`text-[10px] font-medium ${tile.trend < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.abs(tile.trend)}% vs yesterday
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ RECON QUEUES ═══ */}
      <div className="flex-1 px-4 py-3">
        <div className="max-w-[1600px] mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-8 bg-slate-800 border border-slate-700 mb-3">
              <TabsTrigger value="mismatched" className="text-[10px] h-7 data-[state=active]:bg-red-600 data-[state=active]:text-white gap-1">
                <XCircle className="h-3 w-3" /> Mismatched Ledgers
                <Badge className="text-[8px] bg-red-500/20 text-red-300 ml-1">{filteredMismatches.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="claims" className="text-[10px] h-7 data-[state=active]:bg-amber-600 data-[state=active]:text-white gap-1">
                <Clock className="h-3 w-3" /> Pending Claims (T+5)
                <Badge className="text-[8px] bg-amber-500/20 text-amber-300 ml-1">{filteredClaims.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="penalties" className="text-[10px] h-7 data-[state=active]:bg-orange-600 data-[state=active]:text-white gap-1">
                <AlertTriangle className="h-3 w-3" /> Harmonizing Penalties
                <Badge className="text-[8px] bg-orange-500/20 text-orange-300 ml-1">{filteredPenalties.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="auto-recovery" className="text-[10px] h-7 data-[state=active]:bg-purple-600 data-[state=active]:text-white gap-1">
                <ShieldAlert className="h-3 w-3" /> Auto-Recovery Silent Match
                <Badge className="text-[8px] bg-purple-500/20 text-purple-300 ml-1">{filteredAR.filter(a => a.pilferageFlag).length}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* ═══ BUCKET A: MISMATCHED LEDGERS ═══ */}
            <TabsContent value="mismatched" className="mt-0">
              <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                {filteredMismatches.map(m => {
                  const isExpanded = expandedRows.has(m.id);
                  const acted = mismatchActions[m.id];
                  return (
                    <div key={m.id} className={`border-b border-slate-700/50 ${acted ? 'opacity-50' : ''}`}>
                      {/* Summary Row */}
                      <div
                        className="flex items-center gap-3 px-3 py-2 hover:bg-slate-700/30 cursor-pointer text-[11px]"
                        onClick={() => toggleRow(m.id)}
                      >
                        <button className="text-slate-500">
                          {isExpanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
                        </button>
                        <span className="font-mono font-bold text-white w-28">{m.terminalId}</span>
                        <span className="text-slate-400 w-12">{m.bank}</span>
                        <span className="text-slate-500 w-12">{m.region}</span>
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-slate-400">Switch: <span className="text-blue-300 font-mono">{formatINR(m.bankSwitchAmount)}</span></span>
                          <span className="text-slate-600">≠</span>
                          <span className="text-slate-400">EJ: <span className="text-amber-300 font-mono">{formatINR(m.ejLogAmount)}</span></span>
                          <span className="text-slate-600">≠</span>
                          <span className="text-slate-400">Physical: <span className="text-emerald-300 font-mono">{formatINR(m.physicalCount)}</span></span>
                        </div>
                        <span className={`font-bold font-mono text-sm ${m.variance < 0 ? 'text-red-400' : m.variance > 0 ? 'text-amber-400' : 'text-blue-400'}`}>
                          {m.variance < 0 ? '-' : m.variance > 0 ? '+' : ''}{formatINR(m.variance)}
                        </span>
                        <Badge className={`text-[8px] px-1 py-0 ${getSeverityBadge(m.severity)}`}>{m.severity}</Badge>
                        <div className="flex gap-0.5">
                          {m.autoRecoveryFlag && <Badge className="text-[7px] px-1 py-0 bg-amber-500/20 text-amber-400">AR</Badge>}
                          {m.silentClose && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400">SC</Badge>}
                          {m.denominationDrift && <Badge className="text-[7px] px-1 py-0 bg-blue-500/20 text-blue-400">DD</Badge>}
                        </div>
                        <span className="text-emerald-400 text-[10px] font-medium w-20 text-right">
                          <Target className="h-3 w-3 inline mr-0.5" />{formatINR(m.predictedRecovery)}
                        </span>
                      </div>

                      {/* Expanded: Transaction Comparison Table */}
                      {isExpanded && (
                        <div className="px-4 pb-3 bg-slate-850">
                          <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 p-3 mb-2">
                            <p className="text-[9px] text-slate-500 uppercase font-bold mb-2 flex items-center gap-1">
                              <Scale className="h-3 w-3" /> Three-Way Match Comparison — {m.transactions.length} flagged transaction(s)
                            </p>
                            {m.transactions.map((txn, idx) => renderComparisonRow(txn, idx))}
                          </div>

                          {/* Action Buttons */}
                          {!acted ? (
                            <div className="flex items-center gap-2 mt-2">
                              {Math.abs(m.variance) > 5000 && (
                                <Button size="sm" className="h-6 text-[9px] bg-red-600 hover:bg-red-700 text-white gap-1"
                                  onClick={(e) => { e.stopPropagation(); handleMismatchAction(m.id, 'Escalate to Audit'); }}>
                                  <Gavel className="h-3 w-3" /> Escalate to Audit
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="h-6 text-[9px] border-amber-500/50 text-amber-400 hover:bg-amber-500/10 gap-1"
                                onClick={(e) => { e.stopPropagation(); handleMismatchAction(m.id, 'Accept Shortage'); }}>
                                <CheckCircle2 className="h-3 w-3" /> Accept Shortage
                              </Button>
                              <Button size="sm" variant="ghost" className="h-6 text-[9px] text-blue-400 hover:bg-blue-500/10 gap-1"
                                onClick={() => setAnalyzeItem(m.terminalId)}>
                                <Eye className="h-3 w-3" /> Full 3-Way Recon
                              </Button>
                              <div className="ml-auto text-[10px] text-emerald-400 flex items-center gap-1">
                                <Target className="h-3 w-3" /> Potential Recovery: <span className="font-bold">{formatINR(m.predictedRecovery)}</span>
                              </div>
                            </div>
                          ) : (
                            <div className="mt-2 flex items-center gap-2 text-[10px]">
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">Action: {acted}</span>
                              <span className="text-slate-500">— Audit trail updated</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* ═══ BUCKET B: PENDING CLAIMS (T+5) ═══ */}
            <TabsContent value="claims" className="mt-0">
              <div className="space-y-2">
                {filteredClaims.map(c => {
                  const acted = claimActions[c.id];
                  const isPenalty = c.daysElapsed >= 5;
                  const isCritical = c.daysElapsed >= 4;
                  return (
                    <div key={c.id} className={`rounded-lg border bg-slate-800 overflow-hidden ${
                      isPenalty ? 'border-red-500/50 animate-pulse' :
                      isCritical ? 'border-red-500/30' :
                      'border-slate-700'
                    } ${acted ? 'opacity-50' : ''}`}>
                      {/* Claim Header */}
                      <div className="px-3 py-2 flex items-center gap-3">
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

                        {/* T+5 Timer */}
                        <div className="w-40">
                          <div className="flex items-center justify-between mb-0.5">
                            <Badge className={`text-[9px] px-1.5 py-0 font-mono ${getClaimTimerColor(c.daysElapsed)}`}>
                              {isPenalty ? '⚠ PENALTY ACTIVE' : `Day ${c.daysElapsed}/5`}
                            </Badge>
                            {c.accruedPenalty > 0 && (
                              <span className="text-[9px] text-red-400 font-bold">{formatINR(c.accruedPenalty)}</span>
                            )}
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all ${
                                isPenalty ? 'bg-red-500' : isCritical ? 'bg-red-500' : c.daysElapsed >= 3 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${Math.min(100, (c.daysElapsed / 5) * 100)}%` }}
                            />
                          </div>
                          {isPenalty && (
                            <p className="text-[8px] text-red-400 mt-0.5 font-mono">
                              Backdated: {formatINR(c.penaltyPerDay)}/day since Day 3
                            </p>
                          )}
                          {isCritical && !isPenalty && (
                            <p className="text-[8px] text-red-400 mt-0.5">
                              ⚠ Penalty triggers in {5 - c.daysElapsed} day(s)
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 3-Way Comparison for this Claim */}
                      <div className="px-3 pb-2">
                        <div className="grid grid-cols-4 gap-2 text-[10px]">
                          <div className="bg-blue-500/5 border border-blue-500/20 rounded p-2">
                            <p className="text-[8px] text-blue-400 font-bold uppercase mb-1">A: Bank Switch</p>
                            <p className="text-slate-300">{c.bankSwitch.action}</p>
                            <p className="font-mono font-bold text-white">{formatINR(c.bankSwitch.amount)}</p>
                            <Badge className={`text-[7px] px-1 py-0 mt-1 ${c.bankSwitch.status === 'Success' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                              {c.bankSwitch.status}
                            </Badge>
                          </div>
                          <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                            <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">B: Machine EJ</p>
                            <p className="text-slate-300">{c.machineEJ.action}</p>
                            <p className={`font-mono font-bold ${c.machineEJ.amount !== c.bankSwitch.amount ? 'text-red-400' : 'text-white'}`}>
                              {formatINR(c.machineEJ.amount)}
                            </p>
                            <Badge className={`text-[7px] px-1 py-0 mt-1 ${c.machineEJ.status.includes('Success') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                              {c.machineEJ.status}
                            </Badge>
                            {c.machineEJ.errorCode && <p className="text-[8px] text-red-400 font-mono mt-0.5">{c.machineEJ.errorCode}</p>}
                          </div>
                          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-2">
                            <p className="text-[8px] text-emerald-400 font-bold uppercase mb-1">C: Physical Slip</p>
                            <p className="text-slate-300">{c.physicalSlip.action}</p>
                            {c.physicalSlip.amount > 0 && <p className="font-mono font-bold text-white">{formatINR(c.physicalSlip.amount)}</p>}
                            <p className="text-[8px] text-slate-400 mt-0.5">{c.physicalSlip.note}</p>
                          </div>
                          <div className={`rounded p-2 border ${!c.ejMatch ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                            <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">D: VARIANCE</p>
                            <p className={`text-lg font-bold font-mono ${!c.ejMatch ? 'text-red-400' : 'text-emerald-400'}`}>
                              {!c.ejMatch ? formatINR(c.claimedAmount) : '✓ MATCH'}
                            </p>
                            <p className="text-[8px] text-slate-400 mt-1">
                              {!c.ejMatch ? 'DISCREPANCY — EJ contradicts Switch' : 'EJ confirms dispense data'}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        {!acted ? (
                          <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-700/50">
                            {c.ejMatch && (
                              <Button size="sm" className="h-6 text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                                onClick={() => handleClaimAction(c.id, 'Approve Claim')}>
                                <ThumbsUp className="h-3 w-3" /> Approve Claim
                              </Button>
                            )}
                            {!c.ejMatch && c.bankSwitch.status === 'Success' && (
                              <Button size="sm" className="h-6 text-[9px] bg-red-600 hover:bg-red-700 text-white gap-1"
                                onClick={() => handleClaimAction(c.id, 'Reject Claim')}>
                                <ThumbsDown className="h-3 w-3" /> Reject Claim
                              </Button>
                            )}
                            {!c.ejMatch && (
                              <Button size="sm" className="h-6 text-[9px] bg-emerald-600 hover:bg-emerald-700 text-white gap-1"
                                onClick={() => handleClaimAction(c.id, 'Approve Claim')}>
                                <ThumbsUp className="h-3 w-3" /> Approve Claim
                              </Button>
                            )}
                            {c.claimedAmount > 5000 && (
                              <Button size="sm" variant="outline" className="h-6 text-[9px] border-red-500/50 text-red-400 hover:bg-red-500/10 gap-1"
                                onClick={() => handleClaimAction(c.id, 'Escalate to Audit')}>
                                <Gavel className="h-3 w-3" /> Escalate to Audit
                              </Button>
                            )}
                            <div className="ml-auto text-[10px] text-slate-500">
                              Penalty at risk: <span className="text-red-400 font-bold">{formatINR(c.penaltyPerDay)}/day</span> from Day 3
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center gap-2 text-[10px]">
                            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                            <span className="text-emerald-400 font-medium">Action: {acted}</span>
                            <span className="text-slate-500">— Audit trail updated</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </TabsContent>

            {/* ═══ BUCKET C: HARMONIZING PENALTIES ═══ */}
            <TabsContent value="penalties" className="mt-0">
              <div className="space-y-2">
                {filteredPenalties.map(p => (
                  <div key={p.id} className={`rounded-lg border bg-slate-800 p-3 ${
                    p.status === 'Penalty Applied' ? 'border-red-500/50' :
                    p.eodsPassed >= 2 ? 'border-red-500/30' :
                    'border-slate-700'
                  }`}>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono font-bold text-white text-[11px]">{p.terminalId}</span>
                      <span className="text-[10px] text-slate-500">{p.bank}</span>
                      <Badge className={`text-[8px] px-1 py-0 ${
                        p.status === 'Penalty Applied' ? 'bg-red-500/20 text-red-400' :
                        p.status === 'Declared Late' ? 'bg-amber-500/20 text-amber-400' :
                        p.status === 'Under Review' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-slate-500/20 text-slate-400'
                      }`}>{p.status}</Badge>
                      <div className="flex gap-0.5 ml-1">
                        {p.autoRecovery && <Badge className="text-[7px] px-1 py-0 bg-amber-500/20 text-amber-400">AR</Badge>}
                        {p.flmSilentClose && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400">SC</Badge>}
                      </div>
                      <span className="ml-auto text-[10px] text-slate-500">CIT: {p.citAgent}</span>
                    </div>

                    {/* Penalty Math */}
                    <div className="grid grid-cols-4 gap-3 text-[10px]">
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                        <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Overage Detected</p>
                        <p className="text-lg font-bold font-mono text-amber-400">{formatINR(p.overageAmount)}</p>
                        <p className="text-[8px] text-slate-500 mt-0.5">{p.detectedAt}</p>
                      </div>
                      <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                        <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">EOD Deadline</p>
                        <p className="font-mono text-white text-sm">{p.eodDeadline.split(' ')[1]}</p>
                        <p className="text-[8px] text-slate-500">{p.eodDeadline.split(' ')[0]}</p>
                      </div>
                      <div className="bg-red-500/5 border border-red-500/20 rounded p-2">
                        <p className="text-[8px] text-red-400 font-bold uppercase mb-1">Declaration Delay</p>
                        <p className="text-lg font-bold font-mono text-red-400">{p.eodsPassed} EODs</p>
                        <p className="text-[8px] text-red-400/70">{p.declarationDelay} elapsed</p>
                      </div>
                      <div className={`rounded p-2 border ${p.penaltyAmount > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                        <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">Current Penalty</p>
                        <p className={`text-lg font-bold font-mono ${p.penaltyAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {p.penaltyAmount > 0 ? formatINR(p.penaltyAmount) : '₹0'}
                        </p>
                        <p className="text-[8px] text-slate-400 mt-0.5">{p.penaltyFormula}</p>
                        {p.penaltyAmount > 0 && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400 mt-1">Non-recoverable</Badge>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* ═══ BUCKET D: AUTO-RECOVERY SILENT MATCH ═══ */}
            <TabsContent value="auto-recovery" className="mt-0">
              <div className="mb-2 text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldAlert className="h-3.5 w-3.5 text-purple-400" />
                Comparing "Suspected Overage" (from EJ Auto-Recovery) vs "Declared Overage" (from FLM Ticket). Mismatches flagged for potential pilferage.
              </div>
              <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b border-slate-700 h-7">
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 w-6"></TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">ATM ID</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Bank</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">AR Time</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Suspected ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Declared ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">DELTA ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">FLM Ticket</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Flag</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Audit ROI</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAR.map(ar => (
                      <React.Fragment key={ar.id}>
                        <TableRow
                          className={`border-b border-slate-700/50 h-7 hover:bg-slate-700/30 text-[11px] cursor-pointer ${ar.pilferageFlag ? 'bg-red-500/5' : ''}`}
                          onClick={() => setExpandedAR(expandedAR === ar.id ? null : ar.id)}
                        >
                          <TableCell className="py-1">
                            {expandedAR === ar.id ? <ChevronDown className="h-3 w-3 text-slate-500" /> : <ChevronRight className="h-3 w-3 text-slate-500" />}
                          </TableCell>
                          <TableCell className="py-1 font-mono font-bold text-white">{ar.terminalId}</TableCell>
                          <TableCell className="py-1 text-slate-400">{ar.bank}</TableCell>
                          <TableCell className="py-1 text-slate-400 text-[10px]">{ar.arTimestamp.split(' ')[1]}</TableCell>
                          <TableCell className="py-1 text-right font-mono text-amber-400">{formatINR(ar.suspectedOverage)}</TableCell>
                          <TableCell className="py-1 text-right font-mono text-white">{formatINR(ar.declaredOverage)}</TableCell>
                          <TableCell className="py-1 text-right">
                            <span className={`font-bold font-mono ${ar.delta > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                              {ar.delta > 0 ? `+${formatINR(ar.delta)}` : '✓ MATCH'}
                            </span>
                          </TableCell>
                          <TableCell className="py-1">
                            <Badge className={`text-[8px] px-1 py-0 ${
                              ar.flmTicketStatus === 'Silent Closed' ? 'bg-red-500/20 text-red-400' :
                              ar.flmTicketStatus === 'Resolved' ? 'bg-emerald-500/20 text-emerald-400' :
                              'bg-amber-500/20 text-amber-400'
                            }`}>{ar.flmTicketStatus}</Badge>
                          </TableCell>
                          <TableCell className="py-1">
                            {ar.pilferageFlag ? (
                              <Badge className="text-[8px] px-1.5 py-0 bg-red-600 text-white animate-pulse">⚠ PILFERAGE</Badge>
                            ) : (
                              <Badge className="text-[8px] px-1 py-0 bg-emerald-500/20 text-emerald-400">CLEAR</Badge>
                            )}
                          </TableCell>
                          <TableCell className="py-1 text-right text-emerald-400 font-medium text-[10px]">
                            {ar.auditROI > 0 ? formatINR(ar.auditROI) : '—'}
                          </TableCell>
                        </TableRow>

                        {/* Expanded: EJ Snippet */}
                        {expandedAR === ar.id && (
                          <TableRow className="bg-slate-900/50">
                            <TableCell colSpan={10} className="p-3">
                              <div className="flex items-center gap-1.5 mb-1.5">
                                <Code className="h-3.5 w-3.5 text-purple-400" />
                                <span className="text-[9px] font-bold text-purple-400 uppercase">EJ Log Snippet — Auto-Recovery Sequence</span>
                              </div>
                              <pre className="bg-slate-950 border border-slate-700 rounded p-3 text-[10px] font-mono leading-relaxed overflow-x-auto">
                                {ar.ejSnippet.split('\n').map((line, i) => {
                                  const isError = /E-\d{4}|JAM|ERROR|FAIL/i.test(line);
                                  const isRecovery = /RECOVERY|RETRACTED/i.test(line);
                                  const isSilent = /CLOSED|No Action|PENDING/i.test(line);
                                  return (
                                    <div key={i} className={
                                      isError ? 'text-red-400' :
                                      isRecovery ? 'text-amber-400' :
                                      isSilent ? 'text-red-400 font-bold' :
                                      'text-slate-400'
                                    }>{line}</div>
                                  );
                                })}
                              </pre>
                              {ar.pilferageFlag && (
                                <div className="mt-2 flex items-center gap-2">
                                  <Button size="sm" className="h-6 text-[9px] bg-red-600 hover:bg-red-700 text-white gap-1">
                                    <Gavel className="h-3 w-3" /> Flag for Investigation
                                  </Button>
                                  <span className="text-[10px] text-red-400">
                                    Suspected: {formatINR(ar.suspectedOverage)} → Declared: {formatINR(ar.declaredOverage)} → <span className="font-bold">Δ {formatINR(ar.delta)} UNACCOUNTED</span>
                                  </span>
                                </div>
                              )}
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ═══ 3-WAY RECONCILIATION MODAL ═══ */}
      <Dialog open={!!analyzeItem} onOpenChange={() => setAnalyzeItem(null)}>
        <DialogContent className="max-w-5xl bg-slate-800 border-slate-700 text-slate-100 p-0">
          <DialogHeader className="px-5 pt-4 pb-3 border-b border-slate-700">
            <DialogTitle className="text-sm font-bold flex items-center gap-2 text-white">
              <Target className="h-4 w-4 text-red-400" />
              3-Way Reconciliation — {analyzeItem}
              <Badge className="text-[9px] bg-slate-700 text-slate-300 ml-2">{reconData?.date || '2026-04-12'}</Badge>
            </DialogTitle>
          </DialogHeader>

          {reconData ? (
            <div className="px-5 pb-5 pt-3">
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase">System Ledger</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Opening</span><span className="text-white font-mono">{formatINR(reconData.systemLedger.openingBalance)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Withdrawals</span><span className="text-red-400 font-mono">-{formatINR(reconData.systemLedger.withdrawalsProcessed)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Deposits</span><span className="text-emerald-400 font-mono">+{formatINR(reconData.systemLedger.depositsReceived)}</span></div>
                    <div className="border-t border-slate-600 pt-1.5 flex justify-between font-bold">
                      <span className="text-blue-300">Expected Closing</span>
                      <span className="text-white font-mono">{formatINR(reconData.systemLedger.expectedClosing)}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Cpu className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Machine Truth</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">EJ Opening</span><span className="text-white font-mono">{formatINR(reconData.machineTruth.ejOpeningBalance)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">EJ Withdrawals</span><span className="text-red-400 font-mono">-{formatINR(reconData.machineTruth.ejWithdrawals)}</span></div>
                    <div className="border-t border-slate-600 pt-1.5 flex justify-between font-bold">
                      <span className="text-amber-300">EJ Closing</span>
                      <span className="text-white font-mono">{formatINR(reconData.machineTruth.ejClosingBalance)}</span>
                    </div>
                    {reconData.machineTruth.autoRecoveries > 0 && <p className="text-[9px] text-amber-400">⚠ {reconData.machineTruth.autoRecoveries} auto-recovery · {reconData.machineTruth.jams} jam</p>}
                  </div>
                </div>

                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Banknote className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-[10px] font-bold text-emerald-400 uppercase">Physical Truth</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Custodian Count</span><span className="text-white font-mono">{formatINR(reconData.physicalTruth.custodianCount)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Reject Bin</span><span className="text-slate-300 font-mono">{formatINR(reconData.physicalTruth.rejectBinCount)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">CLL Verified</span>
                      {reconData.physicalTruth.cllVerified ? <Badge className="text-[8px] px-1 py-0 bg-emerald-500/20 text-emerald-400">✓</Badge> : <Badge className="text-[8px] px-1 py-0 bg-red-500/20 text-red-400">✗</Badge>}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1">EOD: {reconData.physicalTruth.eodAgentName}</div>
                  </div>
                </div>
              </div>

              {/* Denomination Breakdown */}
              <div className="rounded-lg border border-slate-700 bg-slate-900/50 p-3 mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Denomination Breakdown</p>
                <div className="grid grid-cols-4 gap-2">
                  {reconData.physicalTruth.denominationBreakdown.map(d => (
                    <div key={d.denom} className="bg-slate-800 rounded p-2 text-center">
                      <p className="text-[10px] text-slate-500">₹{d.denom}</p>
                      <p className="text-sm font-bold text-white">{d.count.toLocaleString()}</p>
                      <p className="text-[9px] text-slate-400">{formatINR(d.total)}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verdict */}
              <div className={`rounded-lg border p-4 ${
                reconData.verdict.recommendation === 'Flag for Audit' ? 'border-red-500/40 bg-red-500/10' :
                reconData.verdict.recommendation === 'Accept Shortage' ? 'border-amber-500/40 bg-amber-500/10' :
                'border-emerald-500/40 bg-emerald-500/10'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span className="text-[11px] font-bold text-white uppercase">System Verdict</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`text-[9px] px-2 py-0.5 ${
                      reconData.verdict.recommendation === 'Flag for Audit' ? 'bg-red-600 text-white' :
                      reconData.verdict.recommendation === 'Accept Shortage' ? 'bg-amber-600 text-white' :
                      'bg-emerald-600 text-white'
                    }`}>{reconData.verdict.recommendation}</Badge>
                    <span className="text-[10px] text-slate-400">Confidence: <span className="font-bold text-white">{reconData.verdict.confidence}%</span></span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">{reconData.verdict.reasoning}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <Target className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">Predicted Recovery: {formatINR(reconData.verdict.estimatedRecovery)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 py-12 text-center">
              <AlertCircle className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">No 3-Way reconciliation data available for this ATM.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSReconCenter;

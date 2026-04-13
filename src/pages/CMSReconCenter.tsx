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
  Search, Filter, X, ChevronRight, ChevronDown, Eye, Zap, Info, Download,
  ArrowUpRight, ArrowDownRight, Target, Activity, CheckCircle2,
  XCircle, AlertCircle, ShieldAlert, Banknote, Cpu, ThumbsUp, ThumbsDown,
  Scale, Gavel, Code, Inbox, FileArchive, MapPin, Shield, Camera, User, Lock
} from 'lucide-react';
import {
  reconPulse, mismatchedLedgers, pendingClaims, harmonizingPenalties,
  bankDisputes, vaultAuditEntries, autoRecoverySilentMatches,
  threeWayRecons, reconBanks, reconRegions, riskLevels,
  formatINR, getSeverityBadge, getClaimTimerColor,
  TransactionComparison
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
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('inbox');
  const [analyzeItem, setAnalyzeItem] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [expandedAR, setExpandedAR] = useState<string | null>(null);
  const [actionLog, setActionLog] = useState<Record<string, string>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const handleAction = (id: string, action: string, label: string) => {
    setActionLog(prev => ({ ...prev, [id]: action }));
    toast.success(`${action}`, { description: `${label} — Audit trail updated.` });
  };

  const pulse = reconPulse;
  const reconData = analyzeItem ? threeWayRecons[analyzeItem] : null;

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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* ═══ HEADER ═══ */}
      <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 px-4 py-2">
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-red-600 text-white px-2.5 py-1 rounded-md font-bold text-[11px] flex items-center gap-1">
              <Target className="h-3.5 w-3.5" /> RESOLUTION ENGINE
            </div>
            <div>
              <h1 className="text-xs font-bold text-white leading-tight">Financial Resolution Engine</h1>
              <p className="text-[9px] text-slate-400">₹40–43 Cr Leakage Recovery · Physical × Digital × Machine Reconciliation</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-56">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-500" />
              <Input placeholder="Search ATM, Claim, Customer..." value={search} onChange={e => setSearch(e.target.value)}
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
          <div className="ml-auto text-[10px] text-slate-500">
            {pulse.totalCases.toLocaleString()} active · {pulse.resolvedToday} resolved today · Avg {pulse.avgResolutionHrs}h resolution
          </div>
        </div>
      </div>

      {/* ═══ FINANCIAL INSIGHTS HEADER ═══ */}
      <div className="px-4 py-2.5 bg-slate-800/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-6 gap-2">
          {[
            { label: 'Total Leakage', value: formatINR(pulse.totalLeakage), trend: pulse.leakageTrend, icon: DollarSign, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', tip: 'Physical Shortages + Unresolved Claims.' },
            { label: 'Recovery Potential', value: formatINR(pulse.recoveryPotential), trend: -8.2, icon: Target, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20', tip: 'Total shortages recoverable from vendors/insurance.' },
            { label: 'Auto-Resolution Rate', value: `${pulse.autoResolutionRate}%`, trend: 3.4, icon: Zap, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', tip: '% disputes resolved by system without human intervention.' },
            { label: 'Penalty Exposure', value: formatINR(pulse.penaltyExposure), trend: pulse.penaltyTrend, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20', tip: 'Pending Harmonizing + T+5 fines.' },
            { label: 'Unrecoverable Loss', value: formatINR(pulse.unrecoverablePenaltyLoss), trend: 12.5, icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/20', tip: 'Total Harmonizing Penalties accrued this month — non-recoverable.' },
            { label: 'MIR', value: `${pulse.mir}%`, trend: pulse.mirTrend, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20', tip: 'Manual Intervention Rate.' },
          ].map(tile => (
            <div key={tile.label} className={`rounded-lg border p-2.5 ${tile.bg}`}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[8px] text-slate-400 uppercase font-medium flex items-center gap-0.5">
                  {tile.label} <InfoTip text={tile.tip} />
                </span>
                <tile.icon className={`h-3.5 w-3.5 ${tile.color}`} />
              </div>
              <p className={`text-lg font-bold ${tile.color}`}>{tile.value}</p>
              <div className="flex items-center gap-1 mt-0.5">
                {tile.trend < 0 ? <ArrowDownRight className="h-2.5 w-2.5 text-emerald-400" /> : <ArrowUpRight className="h-2.5 w-2.5 text-red-400" />}
                <span className={`text-[9px] font-medium ${tile.trend < 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  {Math.abs(tile.trend)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ MAIN WORKSPACE ═══ */}
      <div className="flex-1 px-4 py-3">
        <div className="max-w-[1600px] mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="h-8 bg-slate-800 border border-slate-700 mb-3">
              <TabsTrigger value="inbox" className="text-[10px] h-7 data-[state=active]:bg-blue-600 data-[state=active]:text-white gap-1">
                <Inbox className="h-3 w-3" /> Dispute Inbox
                <Badge className="text-[8px] bg-blue-500/20 text-blue-300 ml-1">{fDisputes.length}</Badge>
                {orphanCount > 0 && <Badge className="text-[8px] bg-red-500/20 text-red-300">{orphanCount} orphan</Badge>}
              </TabsTrigger>
              <TabsTrigger value="vault" className="text-[10px] h-7 data-[state=active]:bg-purple-600 data-[state=active]:text-white gap-1">
                <Shield className="h-3 w-3" /> A: Vault Audit
                <Badge className="text-[8px] bg-purple-500/20 text-purple-300 ml-1">{fVault.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="txn-validator" className="text-[10px] h-7 data-[state=active]:bg-amber-600 data-[state=active]:text-white gap-1">
                <Scale className="h-3 w-3" /> B: Txn Validator
                <Badge className="text-[8px] bg-amber-500/20 text-amber-300 ml-1">{fClaims.length}</Badge>
              </TabsTrigger>
              <TabsTrigger value="penalties" className="text-[10px] h-7 data-[state=active]:bg-red-600 data-[state=active]:text-white gap-1">
                <Clock className="h-3 w-3" /> C: Penalty Watch
                <Badge className="text-[8px] bg-red-500/20 text-red-300 ml-1">{fPenalties.length}</Badge>
              </TabsTrigger>
            </TabsList>

            {/* ═══ DISPUTE INBOX ═══ */}
            <TabsContent value="inbox" className="mt-0">
              <div className="mb-2 flex items-center gap-2 text-[10px] text-slate-500">
                <Inbox className="h-3.5 w-3.5 text-blue-400" />
                Bank emails & Zip files ingested. Auto-mapped to ATM IDs and EJ logs.
                <span className="ml-auto flex items-center gap-3">
                  <span className="text-emerald-400">✓ {readyCount} Ready for Verdict</span>
                  <span className="text-red-400">✗ {orphanCount} Orphan — Manual Mapping</span>
                </span>
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
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">EJ Match</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Confidence</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fDisputes.map(d => (
                      <TableRow key={d.id} className={`border-b border-slate-700/50 h-7 text-[11px] ${!d.autoMapped ? 'bg-red-500/5' : 'hover:bg-slate-700/30'}`}>
                        <TableCell className="py-1">
                          <div className="flex items-center gap-1 text-slate-400">
                            <FileArchive className="h-3 w-3 text-slate-500" />
                            <span className="text-[10px] truncate max-w-[140px]">{d.source}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-1 font-mono font-bold text-white text-[10px]">{d.claimRef}</TableCell>
                        <TableCell className="py-1 text-slate-400">{d.bankName}</TableCell>
                        <TableCell className="py-1 text-slate-300 text-[10px]">{d.customerName} <span className="text-slate-500">****{d.cardLast4}</span></TableCell>
                        <TableCell className="py-1 text-right font-bold text-white">{formatINR(d.claimedAmount)}</TableCell>
                        <TableCell className="py-1">
                          {d.autoMapped ? (
                            <Badge className="text-[8px] px-1 py-0 bg-emerald-500/20 text-emerald-400">✓ Auto-Mapped</Badge>
                          ) : (
                            <Badge className="text-[8px] px-1 py-0 bg-red-500/20 text-red-400 animate-pulse">✗ Orphan</Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-1 font-mono text-[10px] text-slate-300">{d.mappedTerminalId || '—'}</TableCell>
                        <TableCell className="py-1 font-mono text-[10px] text-slate-400 truncate max-w-[120px]">{d.mappedEjRef || '—'}</TableCell>
                        <TableCell className="py-1">
                          {d.mappingConfidence ? (
                            <span className={`text-[10px] font-bold ${d.mappingConfidence >= 90 ? 'text-emerald-400' : 'text-amber-400'}`}>{d.mappingConfidence}%</span>
                          ) : <span className="text-slate-600">—</span>}
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
            </TabsContent>

            {/* ═══ QUEUE A: VAULT AUDIT (Physical vs Digital) ═══ */}
            <TabsContent value="vault" className="mt-0">
              <div className="mb-2 text-[10px] text-slate-500 flex items-center gap-1">
                <Shield className="h-3.5 w-3.5 text-purple-400" />
                Physical Vault Counts vs Digital Deposit Slips vs Custodian Entries. Only variances shown.
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

                      {/* 3-Column Comparison */}
                      <div className="grid grid-cols-4 gap-2 text-[10px] mb-2">
                        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-2">
                          <p className="text-[8px] text-emerald-400 font-bold uppercase mb-1">Physical Vault</p>
                          <p className="text-lg font-bold font-mono text-white">{formatINR(v.physicalVaultCount)}</p>
                          <p className="text-[8px] text-slate-500">Actual cash counted</p>
                        </div>
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded p-2">
                          <p className="text-[8px] text-blue-400 font-bold uppercase mb-1">Digital Slip</p>
                          <p className="text-lg font-bold font-mono text-white">{formatINR(v.digitalDepositSlip)}</p>
                          <p className="text-[8px] text-slate-500">Deposit slip record</p>
                        </div>
                        <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                          <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Custodian Entry</p>
                          <p className="text-lg font-bold font-mono text-white">{formatINR(v.custodianEntry)}</p>
                          <p className="text-[8px] text-slate-500">Reported by CIT agent</p>
                        </div>
                        <div className={`rounded p-2 border ${v.variance !== 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                          <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">VARIANCE</p>
                          <p className={`text-lg font-bold font-mono ${v.variance < 0 ? 'text-red-400' : v.variance > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                            {v.variance < 0 ? '-' : v.variance > 0 ? '+' : ''}{formatINR(v.variance)}
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
                              onClick={() => handleAction(v.id, 'Escalate to Audit', v.terminalId)}>
                              <Gavel className="h-3 w-3" /> Escalate to Audit
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

            {/* ═══ QUEUE B: TRANSACTION LOG VALIDATOR ═══ */}
            <TabsContent value="txn-validator" className="mt-0">
              <div className="mb-2 text-[10px] text-slate-500 flex items-center gap-1">
                <Scale className="h-3.5 w-3.5 text-amber-400" />
                Side-by-side Verdict Comparison: Bank Switch vs Machine EJ. System auto-generates resolution.
              </div>
              <div className="space-y-2">
                {fClaims.map(c => {
                  const acted = actionLog[c.id];
                  const isPenalty = c.daysElapsed >= 5;
                  const isCritical = c.daysElapsed >= 4;
                  return (
                    <div key={c.id} className={`rounded-lg border bg-slate-800 overflow-hidden ${
                      isPenalty ? 'border-red-500/50' : isCritical ? 'border-red-500/30' : 'border-slate-700'
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
                        <div className="w-36">
                          <div className="flex items-center justify-between mb-0.5">
                            <Badge className={`text-[9px] px-1.5 py-0 font-mono ${getClaimTimerColor(c.daysElapsed)}`}>
                              {isPenalty ? '⚠ PENALTY' : `Day ${c.daysElapsed}/5`}
                            </Badge>
                            {c.accruedPenalty > 0 && <span className="text-[9px] text-red-400 font-bold">{formatINR(c.accruedPenalty)}</span>}
                          </div>
                          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${isPenalty ? 'bg-red-500' : isCritical ? 'bg-red-500' : c.daysElapsed >= 3 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                              style={{ width: `${Math.min(100, (c.daysElapsed / 5) * 100)}%` }} />
                          </div>
                          {isPenalty && <p className="text-[8px] text-red-400 mt-0.5 font-mono">Backdated: {formatINR(c.penaltyPerDay)}/day</p>}
                        </div>
                      </div>

                      {/* Verdict Comparison */}
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
                            <Badge className={`text-[7px] px-1 py-0 mt-1 bg-red-500/20 text-red-400`}>
                              {c.machineEJ.status}
                            </Badge>
                            {c.machineEJ.errorCode && <p className="text-[8px] text-red-400 font-mono mt-0.5">{c.machineEJ.errorCode}</p>}
                          </div>
                          <div className={`rounded p-2 border ${c.systemVerdict.includes('Refund') ? 'bg-emerald-500/10 border-emerald-500/30' : c.systemVerdict.includes('Reject') ? 'bg-red-500/10 border-red-500/30' : 'bg-amber-500/10 border-amber-500/30'}`}>
                            <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">SYSTEM VERDICT</p>
                            <p className={`text-sm font-bold ${c.systemVerdict.includes('Refund') ? 'text-emerald-400' : c.systemVerdict.includes('Reject') ? 'text-red-400' : 'text-amber-400'}`}>
                              {c.systemVerdict}
                            </p>
                            <p className="text-[8px] text-slate-400 mt-1 leading-snug">{c.verdictReason}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
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
                            {c.claimedAmount > 5000 && (
                              <Button size="sm" variant="outline" className="h-6 text-[9px] border-amber-500/50 text-amber-400 hover:bg-amber-500/10 gap-1"
                                onClick={() => handleAction(c.id, 'Escalate to Audit', c.claimId)}>
                                <Gavel className="h-3 w-3" /> Escalate
                              </Button>
                            )}
                            <Button size="sm" variant="ghost" className="h-6 text-[9px] text-blue-400 hover:bg-blue-500/10 gap-1"
                              onClick={() => setAnalyzeItem(c.terminalId)}>
                              <Eye className="h-3 w-3" /> 3-Pane Detail
                            </Button>
                            <span className="ml-auto text-[10px] text-slate-500">
                              Penalty at risk: <span className="text-red-400 font-bold">{formatINR(c.penaltyPerDay)}/day</span>
                            </span>
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
            </TabsContent>

            {/* ═══ QUEUE C: PENALTY & OVERAGE WATCH ═══ */}
            <TabsContent value="penalties" className="mt-0">
              <div className="mb-2 text-[10px] text-slate-500 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-red-400" />
                T+5 Countdown & Harmonizing Penalty tracker. EJ overages not reported in Physical Vault within 1 EOD.
              </div>
              <div className="space-y-2">
                {fPenalties.map(p => (
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
                      {/* EJ vs Vault indicator */}
                      <div className="ml-auto flex items-center gap-2 text-[9px]">
                        <span className={p.ejOverageDetected ? 'text-amber-400' : 'text-slate-600'}>
                          EJ: {p.ejOverageDetected ? '⚠ Overage Found' : 'Clean'}
                        </span>
                        <span className="text-slate-600">vs</span>
                        <span className={p.physicalVaultReported ? 'text-emerald-400' : 'text-red-400'}>
                          Vault: {p.physicalVaultReported ? '✓ Reported' : '✗ Not Reported'}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-5 gap-2 text-[10px] mb-2">
                      <div className="bg-amber-500/5 border border-amber-500/20 rounded p-2">
                        <p className="text-[8px] text-amber-400 font-bold uppercase mb-1">Overage</p>
                        <p className="text-lg font-bold font-mono text-amber-400">{formatINR(p.overageAmount)}</p>
                        <p className="text-[8px] text-slate-500">{p.detectedAt.split(' ')[1]}</p>
                      </div>
                      <div className="bg-slate-700/50 border border-slate-600 rounded p-2">
                        <p className="text-[8px] text-slate-400 font-bold uppercase mb-1">EOD Deadline</p>
                        <p className="font-mono text-white text-sm">{p.eodDeadline.split(' ')[1]}</p>
                      </div>
                      <div className="bg-red-500/5 border border-red-500/20 rounded p-2">
                        <p className="text-[8px] text-red-400 font-bold uppercase mb-1">EODs Passed</p>
                        <p className="text-lg font-bold font-mono text-red-400">{p.eodsPassed}</p>
                        <p className="text-[8px] text-red-400/70">{p.declarationDelay}</p>
                      </div>
                      <div className={`rounded p-2 border ${p.penaltyAmount > 0 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                        <p className="text-[8px] font-bold uppercase mb-1 text-slate-400">Penalty ₹</p>
                        <p className={`text-lg font-bold font-mono ${p.penaltyAmount > 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                          {p.penaltyAmount > 0 ? formatINR(p.penaltyAmount) : '₹0'}
                        </p>
                        <p className="text-[8px] text-slate-400">{p.penaltyFormula}</p>
                      </div>
                      <div className="bg-red-500/5 border border-red-500/20 rounded p-2">
                        <p className="text-[8px] text-red-400 font-bold uppercase mb-1">Daily Backdated</p>
                        <p className="text-lg font-bold font-mono text-red-400">{formatINR(p.dailyBackdatedPenalty)}</p>
                        <p className="text-[8px] text-slate-500">per EOD delay</p>
                        {p.penaltyAmount > 0 && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400 mt-1">Non-recoverable</Badge>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button size="sm" className="h-6 text-[9px] bg-amber-600 hover:bg-amber-700 text-white gap-1"
                        onClick={() => handleAction(p.id, 'Declare Overage', p.terminalId)}>
                        <Banknote className="h-3 w-3" /> Declare Overage
                      </Button>
                      <Button size="sm" variant="outline" className="h-6 text-[9px] border-red-500/50 text-red-400 hover:bg-red-500/10 gap-1"
                        onClick={() => handleAction(p.id, 'Escalate to Audit', p.terminalId)}>
                        <Gavel className="h-3 w-3" /> Escalate
                      </Button>
                      <span className="ml-auto text-[10px] text-slate-500">CIT: {p.citAgent}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* ═══ 3-PANE RECONCILIATION MODAL ═══ */}
      <Dialog open={!!analyzeItem} onOpenChange={() => setAnalyzeItem(null)}>
        <DialogContent className="max-w-6xl bg-slate-800 border-slate-700 text-slate-100 p-0 max-h-[90vh] overflow-y-auto">
          <DialogHeader className="px-5 pt-4 pb-3 border-b border-slate-700 sticky top-0 bg-slate-800 z-10">
            <DialogTitle className="text-sm font-bold flex items-center gap-2 text-white">
              <Target className="h-4 w-4 text-red-400" />
              3-Pane Reconciliation — {analyzeItem}
              {reconData && <Badge className="text-[9px] bg-slate-700 text-slate-300 ml-2">{reconData.date}</Badge>}
            </DialogTitle>
          </DialogHeader>

          {reconData ? (
            <div className="px-5 pb-5 pt-3">
              {/* 3 Panes */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Pane 1: Bank's Side */}
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

                {/* Pane 2: Machine's Side */}
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Cpu className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Pane 2: The Machine's Side</span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    <div>
                      <p className="text-[9px] text-amber-400 font-bold uppercase mb-1">Parsed EJ Log</p>
                      <pre className="bg-slate-950 border border-slate-700 rounded p-2 text-[9px] font-mono leading-relaxed max-h-[150px] overflow-y-auto">
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
                  </div>
                </div>

                {/* Pane 3: Human Side */}
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

                    {/* Photo Evidence */}
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

                    {/* Denomination Breakdown */}
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
                  </div>
                </div>
              </div>

              {/* Bottom: Verdict + Action Bar */}
              <div className={`rounded-lg border p-4 ${
                reconData.verdict.recommendation === 'Authorize Refund' ? 'border-emerald-500/40 bg-emerald-500/10' :
                reconData.verdict.recommendation === 'Escalate to Audit' ? 'border-red-500/40 bg-red-500/10' :
                reconData.verdict.recommendation === 'Declare Overage' ? 'border-amber-500/40 bg-amber-500/10' :
                'border-red-500/40 bg-red-500/10'
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
                      reconData.verdict.recommendation === 'Declare Overage' ? 'bg-amber-600 text-white' :
                      'bg-red-600 text-white'
                    }`}>{reconData.verdict.recommendation}</Badge>
                    <span className="text-[10px] text-slate-400">Confidence: <span className="font-bold text-white">{reconData.verdict.confidence}%</span></span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed mb-3">{reconData.verdict.reasoning}</p>
                <div className="flex items-center gap-1.5 mb-3">
                  <Target className="h-3 w-3 text-emerald-400" />
                  <span className="text-[10px] text-emerald-400 font-medium">Estimated Recovery: {formatINR(reconData.verdict.estimatedRecovery)}</span>
                </div>

                {/* Action Bar */}
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
                    onClick={() => { handleAction(analyzeItem!, 'Reject — Successful Transaction', analyzeItem!); setAnalyzeItem(null); }}>
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
              <p className="text-[10px] text-slate-600 mt-1">Requires matched data across Bank, Machine, and Physical sources.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSReconCenter;

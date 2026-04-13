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
import {
  TrendingDown, TrendingUp, AlertTriangle, Shield, DollarSign, RefreshCw, Clock,
  Search, Filter, X, FileText, ChevronRight, Eye, Zap, Info, Download,
  BarChart3, ArrowUpRight, ArrowDownRight, Target, Activity, CheckCircle2,
  XCircle, AlertCircle, ShieldAlert, Banknote, Cpu
} from 'lucide-react';
import {
  reconPulse, mismatchedLedgers, pendingClaims, harmonizingPenalties,
  threeWayRecons, reconBanks, reconRegions, riskLevels,
  formatINR, getSeverityBadge, getClaimTimerColor,
  MismatchedLedger, PendingClaim, HarmonizingPenalty, ThreeWayRecon
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
  const [showAutoRecoveryOnly, setShowAutoRecoveryOnly] = useState(false);

  // Filtered data
  const filteredMismatches = useMemo(() => {
    let list = mismatchedLedgers;
    if (bankFilter !== 'All') list = list.filter(m => m.bank === bankFilter);
    if (regionFilter !== 'All') list = list.filter(m => m.region === regionFilter);
    if (riskFilter !== 'All') list = list.filter(m => m.severity === riskFilter);
    if (showAutoRecoveryOnly) list = list.filter(m => m.autoRecoveryFlag);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(m => m.terminalId.toLowerCase().includes(q) || m.bank.toLowerCase().includes(q));
    }
    return list;
  }, [bankFilter, regionFilter, riskFilter, search, showAutoRecoveryOnly]);

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

  const reconData = analyzeItem ? threeWayRecons[analyzeItem] : null;

  const pulse = reconPulse;

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
              <p className="text-[9px] text-slate-400">Financial Reconciliation · ATM Cash Operations · Penalty Tracker</p>
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
          <div className="h-4 w-px bg-slate-600 mx-1" />
          <div className="flex items-center gap-1.5">
            <Switch checked={showAutoRecoveryOnly} onCheckedChange={setShowAutoRecoveryOnly} className="h-4 w-7" />
            <span className="text-[10px] text-slate-400">Auto-Recovery Only</span>
          </div>
          <div className="ml-auto text-[10px] text-slate-500">
            {pulse.totalCases.toLocaleString()} active cases · {pulse.resolvedToday} resolved today · Avg {pulse.avgResolutionHrs}h resolution
          </div>
        </div>
      </div>

      {/* ═══ RECON PULSE ═══ */}
      <div className="px-4 py-3 bg-slate-800/30">
        <div className="max-w-[1600px] mx-auto grid grid-cols-4 gap-3">
          {[
            {
              label: 'Total Operational Leakage',
              value: formatINR(pulse.totalLeakage),
              trend: pulse.leakageTrend,
              icon: DollarSign,
              color: 'text-red-400',
              bg: 'bg-red-500/10 border-red-500/20',
              tip: 'Real-time sum of Physical Shortages + Unresolved Customer Claims across all ATMs.'
            },
            {
              label: 'Manual Intervention Rate',
              value: `${pulse.mir}%`,
              trend: pulse.mirTrend,
              icon: Activity,
              color: 'text-amber-400',
              bg: 'bg-amber-500/10 border-amber-500/20',
              tip: '% of reconciliations requiring human verification vs automated straight-through processing.'
            },
            {
              label: 'Penalty Exposure',
              value: formatINR(pulse.penaltyExposure),
              trend: pulse.penaltyTrend,
              icon: AlertTriangle,
              color: 'text-orange-400',
              bg: 'bg-orange-500/10 border-orange-500/20',
              tip: 'Total ₹ value of pending Harmonizing Penalties and T+5 regulatory fines.'
            },
            {
              label: 'Overage Recovery Rate',
              value: `${pulse.overageRecoveryRate}%`,
              trend: pulse.recoveryTrend,
              icon: RefreshCw,
              color: 'text-emerald-400',
              bg: 'bg-emerald-500/10 border-emerald-500/20',
              tip: '% of identified machine overages successfully recovered and declared.'
            },
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
                {tile.trend < 0 ? (
                  <ArrowDownRight className="h-3 w-3 text-emerald-400" />
                ) : (
                  <ArrowUpRight className="h-3 w-3 text-red-400" />
                )}
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
            </TabsList>

            {/* ── BUCKET A: MISMATCHED LEDGERS ── */}
            <TabsContent value="mismatched" className="mt-0">
              <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-750 border-b border-slate-700 h-7">
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">ATM ID</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Bank</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Region</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Switch ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">EJ ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Physical ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Variance</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Type</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Severity</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Flags</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Recovery ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMismatches.map(m => (
                      <TableRow key={m.id} className="border-b border-slate-700/50 h-7 hover:bg-slate-700/30 text-[11px]">
                        <TableCell className="py-1 font-mono font-bold text-white">{m.terminalId}</TableCell>
                        <TableCell className="py-1 text-slate-300">{m.bank}</TableCell>
                        <TableCell className="py-1 text-slate-400">{m.region}</TableCell>
                        <TableCell className="py-1 text-right text-slate-300">{formatINR(m.bankSwitchAmount)}</TableCell>
                        <TableCell className="py-1 text-right text-slate-300">{formatINR(m.ejLogAmount)}</TableCell>
                        <TableCell className="py-1 text-right text-slate-300">{formatINR(m.physicalCount)}</TableCell>
                        <TableCell className="py-1 text-right font-bold">
                          <span className={m.variance < 0 ? 'text-red-400' : m.variance > 0 ? 'text-amber-400' : 'text-blue-400'}>
                            {m.variance < 0 ? '-' : m.variance > 0 ? '+' : ''}{formatINR(m.variance)}
                          </span>
                        </TableCell>
                        <TableCell className="py-1">
                          <Badge variant="outline" className={`text-[8px] px-1 py-0 border ${
                            m.varianceType === 'Shortage' ? 'border-red-500/50 text-red-400' :
                            m.varianceType === 'Overage' ? 'border-amber-500/50 text-amber-400' :
                            'border-blue-500/50 text-blue-400'
                          }`}>{m.varianceType}</Badge>
                        </TableCell>
                        <TableCell className="py-1">
                          <Badge className={`text-[8px] px-1 py-0 ${getSeverityBadge(m.severity)}`}>{m.severity}</Badge>
                        </TableCell>
                        <TableCell className="py-1">
                          <div className="flex gap-0.5">
                            {m.autoRecoveryFlag && (
                              <TooltipProvider><Tooltip><TooltipTrigger><Badge className="text-[7px] px-1 py-0 bg-amber-500/20 text-amber-400">AR</Badge></TooltipTrigger>
                              <TooltipContent className="text-[10px]">Auto-Recovery detected</TooltipContent></Tooltip></TooltipProvider>
                            )}
                            {m.silentClose && (
                              <TooltipProvider><Tooltip><TooltipTrigger><Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400">SC</Badge></TooltipTrigger>
                              <TooltipContent className="text-[10px]">FLM Silent Close — No overage reported</TooltipContent></Tooltip></TooltipProvider>
                            )}
                            {m.denominationDrift && (
                              <TooltipProvider><Tooltip><TooltipTrigger><Badge className="text-[7px] px-1 py-0 bg-blue-500/20 text-blue-400">DD</Badge></TooltipTrigger>
                              <TooltipContent className="text-[10px]">{m.denominationDrift}</TooltipContent></Tooltip></TooltipProvider>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="py-1 text-right text-emerald-400 font-medium">{formatINR(m.predictedRecovery)}</TableCell>
                        <TableCell className="py-1">
                          <Button size="sm" variant="ghost" className="h-5 text-[9px] text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-1.5 gap-0.5"
                            onClick={() => setAnalyzeItem(m.terminalId)}>
                            <Eye className="h-3 w-3" /> Analyze
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* ── BUCKET B: PENDING CLAIMS ── */}
            <TabsContent value="claims" className="mt-0">
              <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-750 border-b border-slate-700 h-7">
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Claim ID</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">ATM</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Bank</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Amount</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Error</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">T+5 Timer</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Accrued ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">EJ Match</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Status</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClaims.map(c => (
                      <TableRow key={c.id} className="border-b border-slate-700/50 h-7 hover:bg-slate-700/30 text-[11px]">
                        <TableCell className="py-1 font-mono font-bold text-white">{c.claimId}</TableCell>
                        <TableCell className="py-1 font-mono text-slate-300">{c.terminalId}</TableCell>
                        <TableCell className="py-1 text-slate-400">{c.bank}</TableCell>
                        <TableCell className="py-1 text-right font-bold text-white">{formatINR(c.claimedAmount)}</TableCell>
                        <TableCell className="py-1 text-slate-400 max-w-[180px] truncate text-[10px]">{c.errorDesc}</TableCell>
                        <TableCell className="py-1">
                          <Badge className={`text-[9px] px-1.5 py-0 font-mono ${getClaimTimerColor(c.daysElapsed)}`}>
                            {c.daysElapsed >= 5 ? '⚠ PENALTY' : `Day ${c.daysElapsed}/5`}
                          </Badge>
                          <div className="flex gap-px mt-0.5">
                            {[1,2,3,4,5].map(d => (
                              <div key={d} className={`h-1 flex-1 rounded-full ${d <= c.daysElapsed ? (d >= 4 ? 'bg-red-500' : d >= 3 ? 'bg-amber-500' : 'bg-emerald-500') : 'bg-slate-600'}`} />
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="py-1 text-right">
                          <span className={c.accruedPenalty > 0 ? 'text-red-400 font-bold' : 'text-slate-500'}>
                            {c.accruedPenalty > 0 ? formatINR(c.accruedPenalty) : '—'}
                          </span>
                        </TableCell>
                        <TableCell className="py-1">
                          {c.ejMatch ? (
                            <Badge className="text-[8px] px-1 py-0 bg-emerald-500/20 text-emerald-400">✓ Match</Badge>
                          ) : (
                            <Badge className="text-[8px] px-1 py-0 bg-red-500/20 text-red-400">✗ Mismatch</Badge>
                          )}
                        </TableCell>
                        <TableCell className="py-1">
                          <Badge variant="outline" className={`text-[8px] px-1 py-0 ${
                            c.status === 'Resolved' ? 'border-emerald-500/50 text-emerald-400' :
                            c.status === 'EJ Mismatch' ? 'border-red-500/50 text-red-400' :
                            'border-slate-500/50 text-slate-400'
                          }`}>{c.status}</Badge>
                        </TableCell>
                        <TableCell className="py-1">
                          <Button size="sm" variant="ghost" className="h-5 text-[9px] text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-1.5 gap-0.5"
                            onClick={() => setAnalyzeItem(c.terminalId)}>
                            <Eye className="h-3 w-3" /> Analyze
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* ── BUCKET C: HARMONIZING PENALTIES ── */}
            <TabsContent value="penalties" className="mt-0">
              <div className="rounded-lg border border-slate-700 bg-slate-800 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-750 border-b border-slate-700 h-7">
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">ATM</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Bank</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Overage ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Detected</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">EOD Deadline</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Declaration Delay</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1 text-right">Penalty ₹</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">CIT Agent</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Flags</TableHead>
                      <TableHead className="text-[9px] font-bold text-slate-400 py-1">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPenalties.map(p => (
                      <TableRow key={p.id} className="border-b border-slate-700/50 h-7 hover:bg-slate-700/30 text-[11px]">
                        <TableCell className="py-1 font-mono font-bold text-white">{p.terminalId}</TableCell>
                        <TableCell className="py-1 text-slate-300">{p.bank}</TableCell>
                        <TableCell className="py-1 text-right font-bold text-amber-400">{formatINR(p.overageAmount)}</TableCell>
                        <TableCell className="py-1 text-slate-400 text-[10px]">{p.detectedAt}</TableCell>
                        <TableCell className="py-1 text-slate-400 text-[10px]">{p.eodDeadline}</TableCell>
                        <TableCell className="py-1">
                          <Badge className="text-[9px] px-1.5 py-0 bg-red-500/20 text-red-400 font-mono">{p.declarationDelay}</Badge>
                        </TableCell>
                        <TableCell className="py-1 text-right font-bold text-red-400">{formatINR(p.penaltyAmount)}</TableCell>
                        <TableCell className="py-1 text-slate-400">{p.citAgent}</TableCell>
                        <TableCell className="py-1">
                          <div className="flex gap-0.5">
                            {p.autoRecovery && <Badge className="text-[7px] px-1 py-0 bg-amber-500/20 text-amber-400">AR</Badge>}
                            {p.flmSilentClose && <Badge className="text-[7px] px-1 py-0 bg-red-500/20 text-red-400">SC</Badge>}
                          </div>
                        </TableCell>
                        <TableCell className="py-1">
                          <Badge className={`text-[8px] px-1 py-0 ${
                            p.status === 'Penalty Applied' ? 'bg-red-100 text-red-700' :
                            p.status === 'Declared Late' ? 'bg-amber-100 text-amber-700' :
                            p.status === 'Under Review' ? 'bg-blue-100 text-blue-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>{p.status}</Badge>
                        </TableCell>
                      </TableRow>
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
              {/* 3 Columns */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                {/* System Ledger */}
                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
                    <span className="text-[10px] font-bold text-blue-400 uppercase">System Ledger</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">Opening Balance</span><span className="text-white font-mono">{formatINR(reconData.systemLedger.openingBalance)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Withdrawals</span><span className="text-red-400 font-mono">-{formatINR(reconData.systemLedger.withdrawalsProcessed)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">Deposits</span><span className="text-emerald-400 font-mono">+{formatINR(reconData.systemLedger.depositsReceived)}</span></div>
                    <div className="border-t border-slate-600 pt-1.5 flex justify-between font-bold">
                      <span className="text-blue-300">Expected Closing</span>
                      <span className="text-white font-mono">{formatINR(reconData.systemLedger.expectedClosing)}</span>
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1">{reconData.systemLedger.switchTransactions} switch txns · Last sync: {reconData.systemLedger.lastSwitchSync.split(' ')[1]}</div>
                  </div>
                </div>

                {/* Machine Truth */}
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Cpu className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-[10px] font-bold text-amber-400 uppercase">Machine Truth</span>
                  </div>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between"><span className="text-slate-400">EJ Opening</span><span className="text-white font-mono">{formatINR(reconData.machineTruth.ejOpeningBalance)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">EJ Withdrawals</span><span className="text-red-400 font-mono">-{formatINR(reconData.machineTruth.ejWithdrawals)}</span></div>
                    <div className="flex justify-between"><span className="text-slate-400">EJ Deposits</span><span className="text-emerald-400 font-mono">+{formatINR(reconData.machineTruth.ejDeposits)}</span></div>
                    <div className="border-t border-slate-600 pt-1.5 flex justify-between font-bold">
                      <span className="text-amber-300">EJ Closing</span>
                      <span className="text-white font-mono">{formatINR(reconData.machineTruth.ejClosingBalance)}</span>
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1 space-x-2">
                      <span>{reconData.machineTruth.sensorHits} sensors</span>
                      {reconData.machineTruth.autoRecoveries > 0 && <span className="text-amber-400">⚠ {reconData.machineTruth.autoRecoveries} auto-recovery</span>}
                      {reconData.machineTruth.jams > 0 && <span className="text-red-400">🔴 {reconData.machineTruth.jams} jam</span>}
                    </div>
                  </div>
                </div>

                {/* Physical Truth */}
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
                    <div className="flex justify-between"><span className="text-slate-400">Counter File</span>
                      {reconData.physicalTruth.counterFileUploaded ? <Badge className="text-[8px] px-1 py-0 bg-emerald-500/20 text-emerald-400">✓</Badge> : <Badge className="text-[8px] px-1 py-0 bg-red-500/20 text-red-400">✗</Badge>}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1">EOD: {reconData.physicalTruth.eodAgentName} at {reconData.physicalTruth.eodTimestamp.split(' ')[1]}</div>
                  </div>
                </div>
              </div>

              {/* Denomination Breakdown */}
              <div className="rounded-lg border border-slate-700 bg-slate-750 p-3 mb-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Denomination Breakdown (Physical)</p>
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
                reconData.verdict.recommendation === 'Auto-Resolve Claim' ? 'border-emerald-500/40 bg-emerald-500/10' :
                'border-blue-500/40 bg-blue-500/10'
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
              <p className="text-[10px] text-slate-600 mt-1">Detailed reconciliation requires matched data across all three sources.</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CMSReconCenter;

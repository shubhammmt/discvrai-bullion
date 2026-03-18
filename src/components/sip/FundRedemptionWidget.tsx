import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, ChevronRight, Search, ArrowDownLeft, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { BANK_MANDATES } from '@/data/sipMockData';
import { getApiToken } from '@/config/api';

/* ---- Types ---- */
interface APITransaction {
  order_id: string;
  subscription_id: string | null;
  scheme_code: string;
  scheme_name: string | null;
  txn_type: 'LUMPSUM' | 'SELL' | 'SIP' | string;
  amount: string;
  units: string | null;
  status: 'SUCCESS' | 'PENDING' | 'FAILED' | string;
  failure_reason: string | null;
  created_at: string;
}

interface FundDetailsResponse {
  category: string;
  fund_info: { manager: string; benchmark: string; exit_load: string; launch_date: string };
  risk_level: string;
  key_metrics: { nav: number; min_sip: number; aum_crore: number; min_lumpsum: number; expense_ratio: number };
  performance: { ret_1y: number; ret_3y: number; ret_5y: number; benchmark_beat: number };
  scheme_name: string;
}

interface HoldingItem {
  schemeCode: string;
  schemeName: string;
  totalUnits: number;
  totalInvested: number;
  currentValue: number;
  nav: number | null;
  category: string | null;
}

export type RedeemMode = 'full' | 'partial-amount' | 'partial-units';

export interface FundRedemptionPrefill {
  fundCode?: string;
  redeemMode?: RedeemMode;
  amount?: number;
  units?: number;
  bankAccount?: string;
}

interface FundRedemptionWidgetProps {
  prefill?: FundRedemptionPrefill;
  onRedeemComplete?: (details: any) => void;
}

type Step = 'fund' | 'details' | 'review';

/** Aggregate transactions into per-fund holdings (buy adds, sell subtracts) */
function aggregateHoldings(transactions: APITransaction[]): HoldingItem[] {
  const map = new Map<string, { schemeName: string; buyUnits: number; sellUnits: number; buyAmount: number; sellAmount: number }>();

  for (const tx of transactions) {
    if (tx.status.toUpperCase() !== 'SUCCESS') continue;
    const code = tx.scheme_code;
    const entry = map.get(code) || { schemeName: '', buyUnits: 0, sellUnits: 0, buyAmount: 0, sellAmount: 0 };
    const name = tx.scheme_name && tx.scheme_name !== 'Unknown Scheme' ? tx.scheme_name : entry.schemeName || `Scheme ${code}`;
    entry.schemeName = name;

    const amt = parseFloat(tx.amount) || 0;
    const u = tx.units ? parseFloat(tx.units) : 0;

    if (tx.txn_type.toUpperCase() === 'SELL') {
      entry.sellAmount += amt;
      entry.sellUnits += u;
    } else {
      entry.buyAmount += amt;
      entry.buyUnits += u;
    }
    map.set(code, entry);
  }

  const holdings: HoldingItem[] = [];
  map.forEach((v, code) => {
    const netInvested = v.buyAmount - v.sellAmount;
    if (netInvested <= 0) return; // fully redeemed
    holdings.push({
      schemeCode: code,
      schemeName: v.schemeName || `Scheme ${code}`,
      totalUnits: v.buyUnits - v.sellUnits,
      totalInvested: netInvested,
      currentValue: netInvested, // will be recalculated when NAV is available
      nav: null,
      category: null,
    });
  });
  return holdings;
}

export function FundRedemptionWidget({ prefill, onRedeemComplete }: FundRedemptionWidgetProps) {
  const [step, setStep] = useState<Step>('fund');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHolding, setSelectedHolding] = useState<HoldingItem | null>(null);
  const [fundDetails, setFundDetails] = useState<FundDetailsResponse | null>(null);
  const [redeemMode, setRedeemMode] = useState<RedeemMode>(prefill?.redeemMode || 'full');
  const [amount, setAmount] = useState(prefill?.amount || 0);
  const [units, setUnits] = useState(prefill?.units || 0);
  const [bankAccount, setBankAccount] = useState(prefill?.bankAccount || '');
  const [isComplete, setIsComplete] = useState(false);

  const [holdings, setHoldings] = useState<HoldingItem[]>([]);
  const [loadingHoldings, setLoadingHoldings] = useState(true);
  const [holdingsError, setHoldingsError] = useState<string | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);

  // Fetch transaction history and aggregate holdings
  useEffect(() => {
    const fetchHoldings = async () => {
      setLoadingHoldings(true);
      setHoldingsError(null);
      try {
        const userId = localStorage.getItem('discvr_user_id') || 'a7ca0dcf-3c88-45c6-b4ac-e40fde319956';
        const token = getApiToken();
        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const res = await fetch(
          `https://agentapi.discvr.ai/webhook/transaction-history?user_id=${userId}`,
          { headers }
        );
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        if (data.success && Array.isArray(data.transactions)) {
          setHoldings(aggregateHoldings(data.transactions));
        } else {
          throw new Error('Invalid response');
        }
      } catch (e: any) {
        setHoldingsError(e.message || 'Failed to load holdings');
      } finally {
        setLoadingHoldings(false);
      }
    };
    fetchHoldings();
  }, []);

  // Fetch fund details when a fund is selected
  const fetchFundDetails = async (schemeCode: string) => {
    setLoadingDetails(true);
    setFundDetails(null);
    try {
      const token = getApiToken();
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('https://agentapi.discvr.ai/webhook/v1/fund-details', {
        method: 'POST',
        headers,
        body: JSON.stringify({ scheme_code: schemeCode }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data: FundDetailsResponse = await res.json();
      setFundDetails(data);

      // Update holding with live NAV
      if (data.key_metrics?.nav && selectedHolding) {
        setSelectedHolding(prev => prev ? {
          ...prev,
          nav: data.key_metrics.nav,
          category: data.category,
          schemeName: data.scheme_name || prev.schemeName,
          currentValue: prev.totalUnits > 0 ? prev.totalUnits * data.key_metrics.nav : prev.totalInvested,
        } : prev);
      }
    } catch (e: any) {
      console.error('Failed to fetch fund details:', e);
      toast.error('Could not load fund details');
    } finally {
      setLoadingDetails(false);
    }
  };

  const nav = fundDetails?.key_metrics?.nav || selectedHolding?.nav || 0;
  const currentValue = selectedHolding
    ? (selectedHolding.totalUnits > 0 && nav > 0 ? selectedHolding.totalUnits * nav : selectedHolding.totalInvested)
    : 0;

  const filteredHoldings = holdings.filter(h =>
    h.schemeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.schemeCode.includes(searchQuery)
  );

  const getRedeemValue = () => {
    if (!selectedHolding) return 0;
    if (redeemMode === 'full') return currentValue;
    if (redeemMode === 'partial-amount') return amount;
    return nav > 0 ? units * nav : 0;
  };

  const getRedeemUnits = () => {
    if (!selectedHolding) return 0;
    if (redeemMode === 'full') return selectedHolding.totalUnits;
    if (redeemMode === 'partial-units') return units;
    return nav > 0 ? Number((amount / nav).toFixed(3)) : 0;
  };

  const gains = selectedHolding
    ? getRedeemValue() - (selectedHolding.totalInvested * (getRedeemValue() / currentValue))
    : 0;

  const selectFund = (holding: HoldingItem) => {
    setSelectedHolding(holding);
    setRedeemMode('full');
    setAmount(0);
    setUnits(0);
    setStep('details');
    fetchFundDetails(holding.schemeCode);
  };

  const handleConfirm = () => {
    const details = {
      id: `redeem-${Date.now()}`,
      schemeCode: selectedHolding?.schemeCode,
      fundName: fundDetails?.scheme_name || selectedHolding?.schemeName,
      redeemMode,
      redeemValue: getRedeemValue(),
      redeemUnits: getRedeemUnits(),
      bankAccount,
      estimatedGains: gains,
    };
    onRedeemComplete?.(details);
    setIsComplete(true);
    toast.success('Redemption request submitted!', {
      description: `₹${getRedeemValue().toLocaleString()} from ${fundDetails?.scheme_name || selectedHolding?.schemeName}`,
    });
  };

  const steps: Step[] = ['fund', 'details', 'review'];
  const stepLabels: Record<Step, string> = { fund: 'Select Fund', details: 'Redeem Details', review: 'Review' };

  if (isComplete) {
    return (
      <Card className="border-sip-action-success-border bg-sip-action-success-light/50">
        <CardContent className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-sip-action-success mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">Redemption Submitted</h3>
          <p className="text-sm text-muted-foreground">
            ₹{getRedeemValue().toLocaleString()} ({getRedeemUnits().toFixed(3)} units) from {fundDetails?.scheme_name || selectedHolding?.schemeName}
          </p>
          <p className="text-xs text-muted-foreground">
            Proceeds will be credited to {bankAccount} in 2-3 business days
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => {
            setIsComplete(false);
            setStep('fund');
            setSelectedHolding(null);
            setFundDetails(null);
          }}>
            New Redemption
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-destructive/5 to-orange-500/5">
        <CardTitle className="flex items-center gap-2 text-base">
          <ArrowDownLeft className="w-4 h-4 text-destructive" />
          Redeem / Sell Fund
        </CardTitle>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
                step === s ? 'bg-destructive text-destructive-foreground' :
                  steps.indexOf(step) > i ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'
              )}>
                {i + 1}
              </div>
              <span className={cn('text-xs hidden sm:inline', step === s ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                {stepLabels[s]}
              </span>
              {i < steps.length - 1 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
            </div>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-4 space-y-4">
        {/* Step 1: Fund Selection */}
        {step === 'fund' && (
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Select a fund from your holdings to redeem</p>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search your holdings..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
            </div>

            {loadingHoldings ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-sip-brand" />
                <span className="ml-2 text-sm text-muted-foreground">Loading holdings…</span>
              </div>
            ) : holdingsError ? (
              <p className="text-sm text-sip-error text-center py-8">{holdingsError}</p>
            ) : (
              <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
                {filteredHoldings.map(holding => {
                  const gain = holding.currentValue - holding.totalInvested;
                  const gainPct = holding.totalInvested > 0 ? ((gain / holding.totalInvested) * 100).toFixed(1) : '0.0';
                  return (
                    <button key={holding.schemeCode} onClick={() => selectFund(holding)}
                      className="w-full text-left p-3 rounded-lg border border-border transition-all hover:border-primary/40 hover:bg-primary/5">
                      <div className="flex items-center justify-between">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground truncate">{holding.schemeName}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">Code: {holding.schemeCode}</Badge>
                            {holding.totalUnits > 0 && (
                              <span className="text-xs text-muted-foreground">{holding.totalUnits.toFixed(2)} units</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <p className="text-sm font-semibold text-foreground">₹{holding.totalInvested.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                          {gain !== 0 && (
                            <p className={cn('text-xs', gain >= 0 ? 'text-sip-success' : 'text-destructive')}>
                              {gain >= 0 ? '+' : ''}₹{Math.round(gain).toLocaleString()} ({gainPct}%)
                            </p>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
                {filteredHoldings.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-8">No holdings found</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Redeem Details */}
        {step === 'details' && selectedHolding && (
          <div className="space-y-4">
            {/* Holding summary */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              {loadingDetails ? (
                <div className="flex items-center justify-center py-4">
                  <Loader2 className="w-5 h-5 animate-spin text-sip-brand" />
                  <span className="ml-2 text-sm text-muted-foreground">Loading fund details…</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-foreground">{fundDetails?.scheme_name || selectedHolding.schemeName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {fundDetails?.category || 'Mutual Fund'} • NAV ₹{nav > 0 ? nav.toFixed(2) : '—'}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</p>
                      {selectedHolding.totalUnits > 0 && (
                        <p className="text-[10px] text-muted-foreground">{selectedHolding.totalUnits.toFixed(4)} units</p>
                      )}
                    </div>
                  </div>

                  {/* Extra fund info from API */}
                  {fundDetails && (
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border">
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Risk</p>
                        <p className="text-xs font-medium text-foreground">{fundDetails.risk_level}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">Expense</p>
                        <p className="text-xs font-medium text-foreground">{fundDetails.key_metrics.expense_ratio}%</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase">1Y Return</p>
                        <p className={cn('text-xs font-medium', fundDetails.performance.ret_1y >= 0 ? 'text-sip-success' : 'text-destructive')}>
                          {fundDetails.performance.ret_1y >= 0 ? '+' : ''}{fundDetails.performance.ret_1y}%
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Redeem mode */}
            <div className="space-y-2">
              <Label className="text-xs font-medium">How much would you like to redeem?</Label>
              <RadioGroup value={redeemMode} onValueChange={v => setRedeemMode(v as RedeemMode)} className="space-y-2">
                <div className={cn('flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer',
                  redeemMode === 'full' ? 'border-destructive/40 bg-destructive/5' : 'border-border')}>
                  <RadioGroupItem value="full" id="full" />
                  <Label htmlFor="full" className="cursor-pointer flex-1">
                    <span className="text-sm font-medium">Full Redemption</span>
                    <span className="block text-[11px] text-muted-foreground">
                      Redeem all {selectedHolding.totalUnits > 0 ? `${selectedHolding.totalUnits.toFixed(2)} units` : ''} (₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })})
                    </span>
                  </Label>
                </div>
                <div className={cn('flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer',
                  redeemMode === 'partial-amount' ? 'border-destructive/40 bg-destructive/5' : 'border-border')}>
                  <RadioGroupItem value="partial-amount" id="partial-amount" />
                  <Label htmlFor="partial-amount" className="cursor-pointer flex-1">
                    <span className="text-sm font-medium">By Amount (₹)</span>
                    <span className="block text-[11px] text-muted-foreground">Specify an amount to redeem</span>
                  </Label>
                </div>
                <div className={cn('flex items-center space-x-3 p-3 rounded-lg border transition-all cursor-pointer',
                  redeemMode === 'partial-units' ? 'border-destructive/40 bg-destructive/5' : 'border-border')}>
                  <RadioGroupItem value="partial-units" id="partial-units" />
                  <Label htmlFor="partial-units" className="cursor-pointer flex-1">
                    <span className="text-sm font-medium">By Units</span>
                    <span className="block text-[11px] text-muted-foreground">Specify number of units to redeem</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Amount / Units input */}
            {redeemMode === 'partial-amount' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Amount to Redeem</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input type="number" value={amount || ''} onChange={e => setAmount(Number(e.target.value))}
                    className="pl-7" min={100} max={currentValue} />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    Math.round(currentValue * 0.25),
                    Math.round(currentValue * 0.5),
                    Math.round(currentValue * 0.75),
                  ].map(v => (
                    <Button key={v} variant={amount === v ? 'default' : 'outline'} size="sm" className="text-xs h-7 px-2.5"
                      onClick={() => setAmount(v)}>₹{v.toLocaleString()}</Button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {nav > 0 ? `≈ ${(amount / nav).toFixed(3)} units • ` : ''}Max ₹{currentValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
              </div>
            )}

            {redeemMode === 'partial-units' && selectedHolding.totalUnits > 0 && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Units to Redeem</Label>
                <Input type="number" value={units || ''} onChange={e => setUnits(Number(e.target.value))}
                  min={0.001} max={selectedHolding.totalUnits} step={0.001} />
                <div className="flex gap-1.5 flex-wrap">
                  {[0.25, 0.5, 0.75].map(pct => {
                    const u = Number((selectedHolding.totalUnits * pct).toFixed(3));
                    return (
                      <Button key={pct} variant={units === u ? 'default' : 'outline'} size="sm" className="text-xs h-7 px-2.5"
                        onClick={() => setUnits(u)}>{u} units</Button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {nav > 0 ? `≈ ₹${(units * nav).toLocaleString()} • ` : ''}Max {selectedHolding.totalUnits.toFixed(3)} units
                </p>
              </div>
            )}

            {/* Bank account for proceeds */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Credit Proceeds To</Label>
              <Select value={bankAccount} onValueChange={setBankAccount}>
                <SelectTrigger className="text-sm"><SelectValue placeholder="Select bank account" /></SelectTrigger>
                <SelectContent>
                  {BANK_MANDATES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Exit load note */}
            {fundDetails?.fund_info?.exit_load && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 border border-border">
                <AlertTriangle className="w-4 h-4 text-sip-warning shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground">
                  <span className="font-medium text-foreground">Exit Load:</span> {fundDetails.fund_info.exit_load}
                </p>
              </div>
            )}

            {/* Tax note */}
            {gains > 0 && (
              <div className="flex items-start gap-2 p-2.5 rounded-lg bg-sip-action-warning-light border border-sip-action-warning-border">
                <AlertTriangle className="w-4 h-4 text-sip-action-warning shrink-0 mt-0.5" />
                <p className="text-[11px] text-sip-action-warning-foreground">
                  Estimated gains of ₹{Math.round(gains).toLocaleString()} may attract capital gains tax. Consult your tax advisor.
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => { setStep('fund'); setFundDetails(null); }}>Back</Button>
              <Button className="flex-1" onClick={() => setStep('review')}
                disabled={loadingDetails || !bankAccount || (redeemMode === 'partial-amount' && amount <= 0) || (redeemMode === 'partial-units' && units <= 0)}>
                Review <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 'review' && selectedHolding && (
          <div className="space-y-4">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-destructive" />
                Redemption Summary
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Fund</p>
                  <p className="font-medium text-foreground text-xs mt-0.5">{fundDetails?.scheme_name || selectedHolding.schemeName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Type</p>
                  <Badge variant="destructive" className="text-[10px] mt-0.5">
                    {redeemMode === 'full' ? '🔴 Full Redeem' : '🟡 Partial'}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Redeem Value</p>
                  <p className="font-semibold text-foreground">₹{getRedeemValue().toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Units</p>
                  <p className="font-medium text-foreground">{getRedeemUnits().toFixed(3)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">NAV</p>
                  <p className="font-medium text-foreground">₹{nav > 0 ? nav.toFixed(2) : '—'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Est. Gains</p>
                  <p className={cn('font-medium', gains >= 0 ? 'text-sip-success' : 'text-destructive')}>
                    {gains >= 0 ? '+' : ''}₹{Math.round(gains).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Credit To</p>
                  <p className="font-medium text-foreground text-xs">{bankAccount}</p>
                </div>
                {fundDetails?.category && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Category</p>
                    <p className="font-medium text-foreground text-xs">{fundDetails.category}</p>
                  </div>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground border-t border-border pt-2 mt-2">
                Proceeds typically credited in 2–3 business days. Exit load may apply.
              </p>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>Edit</Button>
              <Button className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground" onClick={handleConfirm}>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Confirm Redemption
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

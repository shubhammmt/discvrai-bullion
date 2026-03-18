import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle2, ChevronRight, Search, ArrowDownLeft, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { MOCK_FUNDS, BANK_MANDATES } from '@/data/sipMockData';

/* ---- Mock holdings (user's portfolio) ---- */
export const MOCK_HOLDINGS = [
  { fundCode: 'HDFC-LCF-G', units: 175.92, currentValue: 148200, investedValue: 130000 },
  { fundCode: 'SBI-SC-G',   units: 480.12, currentValue: 71400,  investedValue: 63000 },
  { fundCode: 'AXIS-BLU-G', units: 3451.32, currentValue: 212000, investedValue: 180000 },
  { fundCode: 'PPFAS-FV-G', units: 148.84, currentValue: 10800,  investedValue: 10000 },
  { fundCode: 'MIRA-MC-G',  units: 620.50, currentValue: 17960,  investedValue: 15000 },
  { fundCode: 'ICICI-TECH-G', units: 85.30, currentValue: 15900, investedValue: 14000 },
];

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

function resolveInitialStep(prefill?: FundRedemptionPrefill): Step {
  if (!prefill?.fundCode) return 'fund';
  const holding = MOCK_HOLDINGS.find(h => h.fundCode === prefill.fundCode);
  if (!holding) return 'fund';
  if (prefill.redeemMode === 'full' && prefill.bankAccount) return 'review';
  if (prefill.redeemMode && (prefill.amount || prefill.units) && prefill.bankAccount) return 'review';
  if (prefill.fundCode) return 'details';
  return 'fund';
}

export function FundRedemptionWidget({ prefill, onRedeemComplete }: FundRedemptionWidgetProps) {
  const resolvedFund = prefill?.fundCode ? MOCK_FUNDS.find(f => f.code === prefill.fundCode) || null : null;
  const resolvedHolding = prefill?.fundCode ? MOCK_HOLDINGS.find(h => h.fundCode === prefill.fundCode) || null : null;

  const [step, setStep] = useState<Step>(resolveInitialStep(prefill));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFund, setSelectedFund] = useState(resolvedFund);
  const [selectedHolding, setSelectedHolding] = useState(resolvedHolding);
  const [redeemMode, setRedeemMode] = useState<RedeemMode>(prefill?.redeemMode || 'full');
  const [amount, setAmount] = useState(prefill?.amount || 0);
  const [units, setUnits] = useState(prefill?.units || 0);
  const [bankAccount, setBankAccount] = useState(prefill?.bankAccount || '');
  const [isComplete, setIsComplete] = useState(false);

  // Only show funds user actually holds
  const holdingCodes = MOCK_HOLDINGS.map(h => h.fundCode);
  const heldFunds = MOCK_FUNDS.filter(f => holdingCodes.includes(f.code));
  const filteredFunds = heldFunds.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const steps: Step[] = ['fund', 'details', 'review'];
  const stepLabels: Record<Step, string> = { fund: 'Select Fund', details: 'Redeem Details', review: 'Review' };

  const getRedeemValue = () => {
    if (!selectedFund || !selectedHolding) return 0;
    if (redeemMode === 'full') return selectedHolding.currentValue;
    if (redeemMode === 'partial-amount') return amount;
    return units * selectedFund.nav;
  };

  const getRedeemUnits = () => {
    if (!selectedFund || !selectedHolding) return 0;
    if (redeemMode === 'full') return selectedHolding.units;
    if (redeemMode === 'partial-units') return units;
    return Number((amount / selectedFund.nav).toFixed(3));
  };

  const gains = selectedHolding
    ? getRedeemValue() - (selectedHolding.investedValue * (getRedeemValue() / selectedHolding.currentValue))
    : 0;

  const handleConfirm = () => {
    const details = {
      id: `redeem-${Date.now()}`,
      fundCode: selectedFund?.code,
      fundName: selectedFund?.name,
      redeemMode,
      redeemValue: getRedeemValue(),
      redeemUnits: getRedeemUnits(),
      bankAccount,
      estimatedGains: gains,
    };
    onRedeemComplete?.(details);
    setIsComplete(true);
    toast.success('Redemption request submitted!', {
      description: `₹${getRedeemValue().toLocaleString()} from ${selectedFund?.name}`,
    });
  };

  const selectFund = (fundCode: string) => {
    const fund = MOCK_FUNDS.find(f => f.code === fundCode);
    const holding = MOCK_HOLDINGS.find(h => h.fundCode === fundCode);
    if (fund && holding) {
      setSelectedFund(fund);
      setSelectedHolding(holding);
      setStep('details');
    }
  };

  if (isComplete) {
    return (
      <Card className="border-sip-action-success-border bg-sip-action-success-light/50">
        <CardContent className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-sip-action-success mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">Redemption Submitted</h3>
          <p className="text-sm text-muted-foreground">
            ₹{getRedeemValue().toLocaleString()} ({getRedeemUnits().toFixed(3)} units) from {selectedFund?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Proceeds will be credited to {bankAccount} in 2-3 business days
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => {
            setIsComplete(false);
            setStep('fund');
            setSelectedFund(null);
            setSelectedHolding(null);
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
            <div className="space-y-2 max-h-[320px] overflow-y-auto pr-1">
              {filteredFunds.map(fund => {
                const holding = MOCK_HOLDINGS.find(h => h.fundCode === fund.code);
                if (!holding) return null;
                const gain = holding.currentValue - holding.investedValue;
                const gainPct = ((gain / holding.investedValue) * 100).toFixed(1);
                return (
                  <button key={fund.code} onClick={() => selectFund(fund.code)}
                    className="w-full text-left p-3 rounded-lg border border-border transition-all hover:border-primary/40 hover:bg-primary/5">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">{fund.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{fund.category}</Badge>
                          <span className="text-xs text-muted-foreground">{holding.units.toFixed(2)} units</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-3">
                        <p className="text-sm font-semibold text-foreground">₹{holding.currentValue.toLocaleString()}</p>
                        <p className={cn('text-xs', gain >= 0 ? 'text-sip-success' : 'text-destructive')}>
                          {gain >= 0 ? '+' : ''}₹{gain.toLocaleString()} ({gainPct}%)
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Redeem Details */}
        {step === 'details' && selectedFund && selectedHolding && (
          <div className="space-y-4">
            {/* Holding summary */}
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-foreground">{selectedFund.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{selectedFund.category} • NAV ₹{selectedFund.nav}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-foreground">₹{selectedHolding.currentValue.toLocaleString()}</p>
                  <p className="text-[10px] text-muted-foreground">{selectedHolding.units.toFixed(2)} units</p>
                </div>
              </div>
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
                    <span className="block text-[11px] text-muted-foreground">Redeem all {selectedHolding.units.toFixed(2)} units (₹{selectedHolding.currentValue.toLocaleString()})</span>
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
                    className="pl-7" min={100} max={selectedHolding.currentValue} />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {[
                    Math.round(selectedHolding.currentValue * 0.25),
                    Math.round(selectedHolding.currentValue * 0.5),
                    Math.round(selectedHolding.currentValue * 0.75),
                  ].map(v => (
                    <Button key={v} variant={amount === v ? 'default' : 'outline'} size="sm" className="text-xs h-7 px-2.5"
                      onClick={() => setAmount(v)}>₹{v.toLocaleString()}</Button>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  ≈ {(amount / selectedFund.nav).toFixed(3)} units • Max ₹{selectedHolding.currentValue.toLocaleString()}
                </p>
              </div>
            )}

            {redeemMode === 'partial-units' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Units to Redeem</Label>
                <Input type="number" value={units || ''} onChange={e => setUnits(Number(e.target.value))}
                  min={0.001} max={selectedHolding.units} step={0.001} />
                <div className="flex gap-1.5 flex-wrap">
                  {[0.25, 0.5, 0.75].map(pct => {
                    const u = Number((selectedHolding.units * pct).toFixed(3));
                    return (
                      <Button key={pct} variant={units === u ? 'default' : 'outline'} size="sm" className="text-xs h-7 px-2.5"
                        onClick={() => setUnits(u)}>{u} units</Button>
                    );
                  })}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  ≈ ₹{(units * selectedFund.nav).toLocaleString()} • Max {selectedHolding.units.toFixed(3)} units
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
              <Button variant="outline" className="flex-1" onClick={() => setStep('fund')}>Back</Button>
              <Button className="flex-1" onClick={() => setStep('review')}
                disabled={!bankAccount || (redeemMode === 'partial-amount' && amount <= 0) || (redeemMode === 'partial-units' && units <= 0)}>
                Review <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Confirm */}
        {step === 'review' && selectedFund && selectedHolding && (
          <div className="space-y-4">
            <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <ArrowDownLeft className="w-4 h-4 text-destructive" />
                Redemption Summary
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Fund</p>
                  <p className="font-medium text-foreground text-xs mt-0.5">{selectedFund.name}</p>
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
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Est. Gains</p>
                  <p className={cn('font-medium', gains >= 0 ? 'text-green-600' : 'text-destructive')}>
                    {gains >= 0 ? '+' : ''}₹{Math.round(gains).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Credit To</p>
                  <p className="font-medium text-foreground text-xs">{bankAccount}</p>
                </div>
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

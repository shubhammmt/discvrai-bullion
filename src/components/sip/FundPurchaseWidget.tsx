import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransactionSuccess } from './TransactionSuccess';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, CheckCircle2, ChevronRight, Sparkles, TrendingUp, Repeat, Zap } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { MOCK_FUNDS, SIPFrequency, MutualFund } from '@/data/sipMockData';
import { MFScreenerFilters } from './MFScreenerWidget';
import { SmartFundSearch } from './SmartFundSearch';

export type PurchaseMode = 'onetime' | 'sip';
type OnetimeMode = 'amount' | 'units';

export interface FundPurchasePrefill {
  fundCode?: string;
  amount?: number;
  mode?: PurchaseMode;
  frequency?: SIPFrequency;
  stepUpPercent?: number;
  bankMandate?: string;
  goalTag?: string;
  startDate?: string;
  screenerFilters?: MFScreenerFilters;
  initialSearchMode?: 'conventional' | 'ai';
  initialAIQuery?: string;
  initialSearchKeyword?: string;
}

interface FundPurchaseWidgetProps {
  prefill?: FundPurchasePrefill;
  onPurchaseComplete?: (details: any) => void;
  compact?: boolean;
}

type Step = 'fund' | 'mode' | 'details' | 'review';

function resolveInitialStep(prefill?: FundPurchasePrefill): Step {
  if (prefill?.fundCode && prefill?.amount && prefill?.mode) return 'review';
  if (prefill?.fundCode && prefill?.mode) return 'details';
  if (prefill?.fundCode) return 'mode';
  return 'fund';
}

export function FundPurchaseWidget({ prefill, onPurchaseComplete, compact = false }: FundPurchaseWidgetProps) {
  const resolvedFund = prefill?.fundCode ? MOCK_FUNDS.find(f => f.code === prefill.fundCode) || null : null;

  const [step, setStep] = useState<Step>(resolveInitialStep(prefill));
  const [selectedFund, setSelectedFund] = useState<MutualFund | null>(resolvedFund);
  const [mode, setMode] = useState<PurchaseMode>(prefill?.mode || 'sip');
  const [amount, setAmount] = useState(prefill?.amount || 5000);
  const [frequency, setFrequency] = useState<SIPFrequency>(prefill?.frequency || 'monthly');
  const [startDate, setStartDate] = useState<Date>(prefill?.startDate ? new Date(prefill.startDate) : addDays(new Date(), 1));
  const [isComplete, setIsComplete] = useState(false);

  // One-time specific
  const [onetimeMode, setOnetimeMode] = useState<OnetimeMode>('amount');
  const [units, setUnits] = useState<number>(0);

  const stepLabels: Record<Step, string> = {
    fund: 'Select Fund',
    mode: 'Type',
    details: 'Details',
    review: 'Review',
  };
  const steps: Step[] = ['fund', 'mode', 'details', 'review'];

  const handleConfirm = () => {
    const details = {
      id: `${mode}-${Date.now()}`,
      type: mode,
      fundCode: selectedFund?.code,
      fundName: selectedFund?.name,
      amount: onetimeMode === 'units' && mode === 'onetime' ? units * (selectedFund?.nav || 0) : amount,
      ...(mode === 'sip' && { frequency }),
      startDate: format(startDate, 'yyyy-MM-dd'),
    };
    onPurchaseComplete?.(details);
    setIsComplete(true);
    toast.success(mode === 'sip' ? 'SIP created successfully!' : 'Purchase order placed!', {
      description: `₹${(onetimeMode === 'units' && mode === 'onetime' ? units * (selectedFund?.nav || 0) : amount).toLocaleString()} in ${selectedFund?.name}`,
    });
  };

  const estimatedUnits = selectedFund ? (amount / selectedFund.nav).toFixed(3) : '—';
  const estimatedAmount = selectedFund && units > 0 ? (units * selectedFund.nav).toFixed(2) : '—';

  if (isComplete) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="pt-4">
          <TransactionSuccess
            type={mode}
            fundName={selectedFund?.name || ''}
            fund={selectedFund || undefined}
            amount={onetimeMode === 'units' && mode === 'onetime' ? units * (selectedFund?.nav || 0) : amount}
            frequency={frequency}
            startDate={startDate}
            onNewPurchase={() => {
              setIsComplete(false);
              setStep('fund');
              setSelectedFund(null);
              setMode('sip');
            }}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="w-4 h-4 text-primary" />
          {mode === 'sip' ? 'Start SIP' : 'Buy Mutual Fund'}
        </CardTitle>
        <div className="flex items-center gap-2 mt-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
                step === s ? 'bg-primary text-primary-foreground' :
                  steps.indexOf(step) > i ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
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
          <SmartFundSearch
            initialFilters={prefill?.screenerFilters}
            initialMode={prefill?.initialSearchMode}
            initialAIQuery={prefill?.initialAIQuery || ''}
            onSelectFund={(fund: MutualFund, investMode?: 'sip' | 'onetime') => {
              setSelectedFund(fund);
              if (investMode) {
                setMode(investMode);
                setStep('details');
              } else {
                setStep('mode');
              }
            }}
          />
        )}

        {/* Step 2: Mode Selection */}
        {step === 'mode' && selectedFund && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm font-medium text-foreground">{selectedFund.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedFund.category} • NAV ₹{selectedFund.nav}</p>
            </div>
            <Label className="text-xs font-medium">How would you like to invest?</Label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => { setMode('onetime'); setStep('details'); }}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left space-y-2 hover:border-primary/40',
                  mode === 'onetime' ? 'border-primary bg-primary/5' : 'border-border'
                )}
              >
                <Zap className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">One-Time</p>
                <p className="text-[11px] text-muted-foreground leading-snug">Invest a lump sum amount once</p>
              </button>
              <button
                onClick={() => { setMode('sip'); setStep('details'); }}
                className={cn(
                  'p-4 rounded-xl border-2 transition-all text-left space-y-2 hover:border-primary/40',
                  mode === 'sip' ? 'border-primary bg-primary/5' : 'border-border'
                )}
              >
                <Repeat className="w-5 h-5 text-primary" />
                <p className="text-sm font-semibold text-foreground">SIP</p>
                <p className="text-[11px] text-muted-foreground leading-snug">Invest a fixed amount periodically</p>
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setStep('fund')}>← Back</Button>
          </div>
        )}

        {/* Step 3: Details */}
        {step === 'details' && selectedFund && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/50 border border-border flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{selectedFund.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{selectedFund.category} • NAV ₹{selectedFund.nav}</p>
              </div>
              <Badge variant={mode === 'sip' ? 'default' : 'secondary'} className="text-[10px]">
                {mode === 'sip' ? '🔄 SIP' : '⚡ One-Time'}
              </Badge>
            </div>

            {/* One-time: Amount vs Units toggle */}
            {mode === 'onetime' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Invest by</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant={onetimeMode === 'amount' ? 'default' : 'outline'} size="sm" className="text-xs"
                    onClick={() => setOnetimeMode('amount')}>💰 Amount</Button>
                  <Button variant={onetimeMode === 'units' ? 'default' : 'outline'} size="sm" className="text-xs"
                    onClick={() => setOnetimeMode('units')}>📊 Units</Button>
                </div>
              </div>
            )}

            {/* Amount input */}
            {(mode === 'sip' || onetimeMode === 'amount') && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">{mode === 'sip' ? 'SIP Amount' : 'Investment Amount'}</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                  <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="pl-7" min={500} step={500} />
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {(mode === 'onetime' ? [5000, 10000, 25000, 50000, 100000] : [1000, 2500, 5000, 10000, 25000]).map(v => (
                    <Button key={v} variant={amount === v ? 'default' : 'outline'} size="sm" className="text-xs h-7 px-2.5"
                      onClick={() => setAmount(v)}>₹{v.toLocaleString()}</Button>
                  ))}
                </div>
                {mode === 'onetime' && (
                  <p className="text-[10px] text-muted-foreground">
                    Est. {estimatedUnits} units @ NAV ₹{selectedFund.nav}
                  </p>
                )}
              </div>
            )}

            {/* Units input (one-time only) */}
            {mode === 'onetime' && onetimeMode === 'units' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Number of Units</Label>
                <Input type="number" value={units || ''} onChange={e => setUnits(Number(e.target.value))} min={0.001} step={0.001} placeholder="e.g. 10.5" />
                {units > 0 && (
                  <p className="text-[10px] text-muted-foreground">
                    Est. amount: ₹{estimatedAmount} @ NAV ₹{selectedFund.nav}
                  </p>
                )}
              </div>
            )}

            {/* SIP-only: Frequency */}
            {mode === 'sip' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Frequency</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(['weekly', 'monthly'] as SIPFrequency[]).map(f => (
                    <Button key={f} variant={frequency === f ? 'default' : 'outline'} size="sm" className="text-xs capitalize"
                      onClick={() => setFrequency(f)}>{f}</Button>
                  ))}
                </div>
              </div>
            )}

            {/* Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">{mode === 'sip' ? 'Start Date' : 'Purchase Date'}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left text-sm font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(startDate, 'PPP')}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={startDate} onSelect={d => d && setStartDate(d)}
                    disabled={d => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('mode')}>Back</Button>
              <Button className="flex-1" onClick={() => setStep('review')}
                disabled={mode === 'onetime' && onetimeMode === 'units' && units <= 0}>
                Review <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {step === 'review' && selectedFund && (
          <div className="space-y-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                {mode === 'sip' ? 'SIP Summary' : 'Purchase Summary'}
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Fund</p>
                  <p className="font-medium text-foreground text-xs mt-0.5">{selectedFund.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Type</p>
                  <Badge variant={mode === 'sip' ? 'default' : 'secondary'} className="text-[10px] mt-0.5">
                    {mode === 'sip' ? '🔄 SIP' : '⚡ Lumpsum'}
                  </Badge>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Amount</p>
                  <p className="font-semibold text-foreground">
                    ₹{(mode === 'onetime' && onetimeMode === 'units' ? units * selectedFund.nav : amount).toLocaleString()}
                  </p>
                </div>
                {mode === 'sip' && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Frequency</p>
                    <p className="font-medium text-foreground capitalize">{frequency}</p>
                  </div>
                )}
                {mode === 'onetime' && onetimeMode === 'units' && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Units</p>
                    <p className="font-medium text-foreground">{units}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{mode === 'sip' ? 'Start Date' : 'Purchase Date'}</p>
                  <p className="font-medium text-foreground">{format(startDate, 'dd MMM yyyy')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">NAV</p>
                  <p className="font-medium text-foreground">₹{selectedFund.nav}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>Edit</Button>
              <Button className="flex-1 bg-sip-action-confirm hover:bg-sip-action-confirm/90 text-sip-action-confirm-foreground" onClick={handleConfirm}>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                {mode === 'sip' ? 'Confirm SIP' : 'Confirm Purchase'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

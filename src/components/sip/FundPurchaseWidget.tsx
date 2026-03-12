import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { CalendarIcon, CheckCircle2, ChevronRight, Sparkles, TrendingUp, Repeat, Zap } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { MOCK_FUNDS, BANK_MANDATES, GOAL_TAGS, SIPFrequency, MutualFund } from '@/data/sipMockData';
import { MFScreenerWidget, MFScreenerFilters } from './MFScreenerWidget';

export type PurchaseMode = 'onetime' | 'sip';

export interface FundPurchasePrefill {
  fundCode?: string;
  amount?: number;
  mode?: PurchaseMode;
  // SIP-specific
  frequency?: SIPFrequency;
  stepUpPercent?: number;
  // Common
  bankMandate?: string;
  goalTag?: string;
  startDate?: string;
}

interface FundPurchaseWidgetProps {
  prefill?: FundPurchasePrefill;
  onPurchaseComplete?: (details: any) => void;
  compact?: boolean;
}

type Step = 'fund' | 'mode' | 'details' | 'review';

function resolveInitialStep(prefill?: FundPurchasePrefill): Step {
  if (prefill?.fundCode && prefill?.amount && prefill?.bankMandate && prefill?.mode) return 'review';
  if (prefill?.fundCode && prefill?.mode) return 'details';
  if (prefill?.fundCode) return 'mode';
  return 'fund';
}

export function FundPurchaseWidget({ prefill, onPurchaseComplete, compact = false }: FundPurchaseWidgetProps) {
  const resolvedFund = prefill?.fundCode ? MOCK_FUNDS.find(f => f.code === prefill.fundCode) || null : null;

  const [step, setStep] = useState<Step>(resolveInitialStep(prefill));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFund, setSelectedFund] = useState(resolvedFund);
  const [mode, setMode] = useState<PurchaseMode>(prefill?.mode || 'sip');
  const [amount, setAmount] = useState(prefill?.amount || 5000);
  const [frequency, setFrequency] = useState<SIPFrequency>(prefill?.frequency || 'monthly');
  const [startDate, setStartDate] = useState<Date>(prefill?.startDate ? new Date(prefill.startDate) : addDays(new Date(), 1));
  const [stepUpPercent, setStepUpPercent] = useState(prefill?.stepUpPercent ?? 10);
  const [bankMandate, setBankMandate] = useState(prefill?.bankMandate || '');
  const [goalTag, setGoalTag] = useState(prefill?.goalTag || '');
  const [isComplete, setIsComplete] = useState(false);

  const filteredFunds = MOCK_FUNDS.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      amount,
      ...(mode === 'sip' && { frequency, stepUpPercent }),
      startDate: format(startDate, 'yyyy-MM-dd'),
      bankMandate,
      goalTag,
    };
    onPurchaseComplete?.(details);
    setIsComplete(true);
    toast.success(mode === 'sip' ? 'SIP created successfully!' : 'Purchase order placed!', {
      description: `₹${amount.toLocaleString()} in ${selectedFund?.name}`,
    });
  };

  const estimatedUnits = selectedFund ? (amount / selectedFund.nav).toFixed(3) : '—';

  if (isComplete) {
    return (
      <Card className="border-green-200 bg-green-50/50 dark:bg-green-950/20 dark:border-green-800">
        <CardContent className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">
            {mode === 'sip' ? 'SIP Created' : 'Purchase Order Placed'}
          </h3>
          <p className="text-sm text-muted-foreground">
            ₹{amount.toLocaleString()} {mode === 'sip' ? `${frequency} SIP` : 'one-time'} in {selectedFund?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Est. {estimatedUnits} units @ NAV ₹{selectedFund?.nav}
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => {
            setIsComplete(false);
            setStep('fund');
            setSelectedFund(null);
            setMode('sip');
          }}>
            New Purchase
          </Button>
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
        {/* Step indicator */}
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
          <div className="space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search mutual funds..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-9" />
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {filteredFunds.map(fund => (
                <button key={fund.code} onClick={() => { setSelectedFund(fund); setStep('mode'); }}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all hover:border-primary/40 hover:bg-primary/5',
                    selectedFund?.code === fund.code ? 'border-primary bg-primary/5' : 'border-border'
                  )}>
                  <div className="flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{fund.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{fund.category}</Badge>
                        <span className="text-xs text-muted-foreground">NAV ₹{fund.nav}</span>
                        <span className="text-xs text-yellow-600">{'★'.repeat(fund.rating)}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
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

            {/* Amount */}
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
              <p className="text-[10px] text-muted-foreground">
                Est. {estimatedUnits} units @ current NAV
              </p>
            </div>

            {/* SIP-only: Frequency */}
            {mode === 'sip' && (
              <div className="space-y-1.5">
                <Label className="text-xs font-medium">Frequency</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['monthly', 'quarterly', 'yearly'] as SIPFrequency[]).map(f => (
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

            {/* SIP-only: Step-Up */}
            {mode === 'sip' && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Annual Step-Up</Label>
                  <span className="text-xs font-semibold text-primary">{stepUpPercent}%</span>
                </div>
                <Slider value={[stepUpPercent]} onValueChange={v => setStepUpPercent(v[0])} min={0} max={25} step={5} />
                <p className="text-[10px] text-muted-foreground">Amount increases by {stepUpPercent}% every year</p>
              </div>
            )}

            {/* Bank */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Bank Account</Label>
              <Select value={bankMandate} onValueChange={setBankMandate}>
                <SelectTrigger className="text-sm"><SelectValue placeholder="Select bank account" /></SelectTrigger>
                <SelectContent>
                  {BANK_MANDATES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Goal */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Tag a Goal (optional)</Label>
              <div className="flex gap-1.5 flex-wrap">
                {GOAL_TAGS.map(g => (
                  <Badge key={g} variant={goalTag === g ? 'default' : 'outline'} className="cursor-pointer text-[10px]"
                    onClick={() => setGoalTag(goalTag === g ? '' : g)}>{g}</Badge>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('mode')}>Back</Button>
              <Button className="flex-1" onClick={() => setStep('review')} disabled={!bankMandate}>
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
                  <p className="font-semibold text-foreground">₹{amount.toLocaleString()}</p>
                </div>
                {mode === 'sip' && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Frequency</p>
                    <p className="font-medium text-foreground capitalize">{frequency}</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{mode === 'sip' ? 'Start Date' : 'Purchase Date'}</p>
                  <p className="font-medium text-foreground">{format(startDate, 'dd MMM yyyy')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Est. Units</p>
                  <p className="font-medium text-foreground">{estimatedUnits}</p>
                </div>
                {mode === 'sip' && (
                  <div>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Step-Up</p>
                    <p className="font-medium text-foreground">{stepUpPercent}% annually</p>
                  </div>
                )}
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Bank</p>
                  <p className="font-medium text-foreground text-xs">{bankMandate}</p>
                </div>
                {goalTag && (
                  <div className="col-span-2">
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Goal</p>
                    <Badge variant="secondary" className="mt-0.5">{goalTag}</Badge>
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => setStep('details')}>Edit</Button>
              <Button className="flex-1 bg-green-600 hover:bg-green-700 text-white" onClick={handleConfirm}>
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
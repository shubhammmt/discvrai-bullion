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
import { CalendarIcon, CheckCircle2, ChevronRight, Sparkles, TrendingUp, Search } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { MOCK_FUNDS, BANK_MANDATES, GOAL_TAGS, SIPFrequency } from '@/data/sipMockData';

export interface SIPPrefillData {
  fundCode?: string;
  amount?: number;
  frequency?: SIPFrequency;
  startDate?: string;
  stepUpPercent?: number;
  bankMandate?: string;
  goalTag?: string;
}

interface CreateSIPWidgetProps {
  preSelectedFund?: string;
  prefill?: SIPPrefillData;
  onSIPCreated?: (details: any) => void;
  compact?: boolean;
}

type Step = 'fund' | 'details' | 'review';

function resolveInitialStep(prefill?: SIPPrefillData, preSelectedFund?: string): Step {
  if (prefill?.fundCode && prefill?.amount && prefill?.bankMandate) return 'review';
  if (prefill?.fundCode || preSelectedFund) return 'details';
  return 'fund';
}

export function CreateSIPWidget({ preSelectedFund, prefill, onSIPCreated, compact = false }: CreateSIPWidgetProps) {
  const fundCode = prefill?.fundCode || preSelectedFund;
  const resolvedFund = fundCode ? MOCK_FUNDS.find(f => f.code === fundCode) || null : null;

  const [step, setStep] = useState<Step>(resolveInitialStep(prefill, preSelectedFund));
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFund, setSelectedFund] = useState(resolvedFund);
  const [amount, setAmount] = useState(prefill?.amount || 5000);
  const [frequency, setFrequency] = useState<SIPFrequency>(prefill?.frequency || 'monthly');
  const [startDate, setStartDate] = useState<Date>(prefill?.startDate ? new Date(prefill.startDate) : addDays(new Date(), 1));
  const [stepUpPercent, setStepUpPercent] = useState(prefill?.stepUpPercent ?? 10);
  const [bankMandate, setBankMandate] = useState(prefill?.bankMandate || '');
  const [goalTag, setGoalTag] = useState(prefill?.goalTag || '');
  const [isCreated, setIsCreated] = useState(false);

  const filteredFunds = MOCK_FUNDS.filter(f =>
    f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreate = () => {
    const sipDetails = {
      id: `sip-${Date.now()}`,
      fundCode: selectedFund?.code,
      fundName: selectedFund?.name,
      amount,
      frequency,
      startDate: format(startDate, 'yyyy-MM-dd'),
      stepUpPercent,
      bankMandate,
      goalTag,
    };
    onSIPCreated?.(sipDetails);
    setIsCreated(true);
    toast.success('SIP created successfully!', {
      description: `₹${amount.toLocaleString()} ${frequency} in ${selectedFund?.name}`,
    });
  };

  if (isCreated) {
    return (
      <Card className="border-sip-action-success-border bg-sip-action-success-light/50">
        <CardContent className="py-8 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-sip-action-success mx-auto" />
          <h3 className="text-lg font-semibold text-foreground">SIP Created Successfully</h3>
          <p className="text-sm text-muted-foreground">
            ₹{amount.toLocaleString()} {frequency} SIP in {selectedFund?.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Starting {format(startDate, 'PPP')} • {stepUpPercent > 0 ? `${stepUpPercent}% annual step-up` : 'No step-up'}
          </p>
          <Button variant="outline" size="sm" className="mt-4" onClick={() => { setIsCreated(false); setStep('fund'); setSelectedFund(null); }}>
            Create Another SIP
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
          Create New SIP
        </CardTitle>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-2">
          {(['fund', 'details', 'review'] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-colors',
                step === s ? 'bg-primary text-primary-foreground' :
                  (['fund', 'details', 'review'].indexOf(step) > i) ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'
              )}>
                {i + 1}
              </div>
              <span className={cn('text-xs hidden sm:inline', step === s ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                {s === 'fund' ? 'Select Fund' : s === 'details' ? 'Details' : 'Review'}
              </span>
              {i < 2 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
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
              <Input
                placeholder="Search mutual funds..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
              {filteredFunds.map(fund => (
                <button
                  key={fund.code}
                  onClick={() => { setSelectedFund(fund); setStep('details'); }}
                  className={cn(
                    'w-full text-left p-3 rounded-lg border transition-all hover:border-primary/40 hover:bg-primary/5',
                    selectedFund?.code === fund.code ? 'border-primary bg-primary/5' : 'border-border'
                  )}
                >
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

        {/* Step 2: SIP Details */}
        {step === 'details' && selectedFund && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-sm font-medium text-foreground">{selectedFund.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedFund.category} • NAV ₹{selectedFund.nav}</p>
            </div>

            {/* Amount */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">SIP Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
                <Input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="pl-7" min={500} step={500} />
              </div>
              <div className="flex gap-1.5 flex-wrap">
                {[1000, 2500, 5000, 10000, 25000].map(v => (
                  <Button key={v} variant={amount === v ? 'default' : 'outline'} size="sm" className="text-xs h-7 px-2.5"
                    onClick={() => setAmount(v)}>₹{v.toLocaleString()}</Button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Frequency</Label>
              <div className="grid grid-cols-3 gap-2">
                {(['monthly', 'quarterly', 'yearly'] as SIPFrequency[]).map(f => (
                  <Button key={f} variant={frequency === f ? 'default' : 'outline'} size="sm" className="text-xs capitalize"
                    onClick={() => setFrequency(f)}>{f}</Button>
                ))}
              </div>
            </div>

            {/* Start Date */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Start Date</Label>
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

            {/* Step-Up */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-medium">Annual Step-Up</Label>
                <span className="text-xs font-semibold text-primary">{stepUpPercent}%</span>
              </div>
              <Slider value={[stepUpPercent]} onValueChange={v => setStepUpPercent(v[0])} min={0} max={25} step={5} />
              <p className="text-[10px] text-muted-foreground">Your SIP amount increases by {stepUpPercent}% every year</p>
            </div>

            {/* Bank Mandate */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium">Bank Mandate</Label>
              <Select value={bankMandate} onValueChange={setBankMandate}>
                <SelectTrigger className="text-sm"><SelectValue placeholder="Select bank account" /></SelectTrigger>
                <SelectContent>
                  {BANK_MANDATES.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            {/* Goal Tag */}
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
              <Button variant="outline" className="flex-1" onClick={() => setStep('fund')}>Back</Button>
              <Button className="flex-1" onClick={() => setStep('review')} disabled={!bankMandate}>
                Review <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 'review' && selectedFund && (
          <div className="space-y-4">
            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-primary" /> SIP Summary
              </h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Fund</p>
                  <p className="font-medium text-foreground text-xs mt-0.5">{selectedFund.name}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Amount</p>
                  <p className="font-semibold text-foreground">₹{amount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Frequency</p>
                  <p className="font-medium text-foreground capitalize">{frequency}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Start Date</p>
                  <p className="font-medium text-foreground">{format(startDate, 'dd MMM yyyy')}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Step-Up</p>
                  <p className="font-medium text-foreground">{stepUpPercent}% annually</p>
                </div>
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
              <Button className="flex-1 bg-sip-action-confirm hover:bg-sip-action-confirm/90 text-sip-action-confirm-foreground" onClick={handleCreate}>
                <CheckCircle2 className="w-4 h-4 mr-1" /> Confirm SIP
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

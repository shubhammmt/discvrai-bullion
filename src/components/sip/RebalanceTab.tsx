import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, AlertTriangle,
  Check, Info, Wallet, TrendingDown, Calendar, PlayCircle,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  evaluateTriggers, buildPlanLegs,
  getMockHoldings, getSectorBreakdown, getFundBreakdown,
  suggestSipPlan,
  addWorkingDays, formatDayLabel,
  RebalanceCard, BuyMode, SubmittedCardSummary,
} from '@/components/conversion/rebalanceEngine';
import { REBALANCE_CONFIG } from '@/components/conversion/rebalanceConfig';
import { buildSmartShortlist } from '@/components/conversion/shortlistEngine';
import { MOCK_FUNDS } from '@/data/sipMockData';
import { RebalanceExecuteSheet } from './RebalanceExecuteSheet';

interface RebalanceTabProps {
  initialFocusId?: string;
  onDone?: () => void;
}

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

type CardSelection = Record<string, { mode: BuyMode; destFundId: string }>;
type ExecStatus = Record<string, 'pending' | 'executed' | 'skipped'>;

export function RebalanceTab({ initialFocusId, onDone }: RebalanceTabProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [focusId, setFocusId] = useState<string | undefined>(initialFocusId);
  const triggers = useMemo(() => evaluateTriggers(), []);
  const holdings = useMemo(() => getMockHoldings(), []);
  const sectors = useMemo(() => getSectorBreakdown(holdings), [holdings]);
  const fundsBd = useMemo(() => getFundBreakdown(holdings), [holdings]);
  const initialCards = useMemo(() => buildPlanLegs(triggers, holdings), [triggers, holdings]);
  const [cards, setCards] = useState<RebalanceCard[]>(initialCards);
  const destinations = useMemo(() => buildSmartShortlist({ risk: 'Moderate' }, 12), []);

  const [sel, setSel] = useState<CardSelection>(() => {
    const init: CardSelection = {};
    initialCards.forEach(c => {
      init[c.id] = {
        mode: c.buy?.mode ?? 'sip',
        destFundId: c.buy?.destFundId ?? '',
      };
    });
    return init;
  });

  const [status, setStatus] = useState<ExecStatus>(() => {
    const init: ExecStatus = {};
    initialCards.forEach(c => { init[c.id] = 'pending'; });
    return init;
  });

  const [execCardId, setExecCardId] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [summaries, setSummaries] = useState<SubmittedCardSummary[]>([]);
  const submittedAt = summaries.length > 0 ? new Date().toISOString() : null;
  const planId = summaries.length > 0 ? `PLN-${Date.now().toString().slice(-8)}` : null;

  useEffect(() => { setFocusId(initialFocusId); }, [initialFocusId]);

  const benchmarkOnly = triggers.length > 0 && triggers.every(t => t.kind === 'benchmark');
  const noTriggers = triggers.length === 0;
  const executedCount = Object.values(status).filter(s => s === 'executed').length;
  const pendingCount = Object.values(status).filter(s => s === 'pending').length;

  const updateSel = (cardId: string, patch: Partial<CardSelection[string]>) =>
    setSel(prev => ({ ...prev, [cardId]: { ...prev[cardId], ...patch } }));

  const updateDest = (cardId: string, destCode: string) => {
    const dest = MOCK_FUNDS.find(f => f.code === destCode);
    if (!dest) return;
    setCards(prev => prev.map(c => c.id === cardId && c.buy
      ? { ...c, buy: { ...c.buy, destFundId: dest.code, destFundName: dest.name, destCategory: dest.category } }
      : c));
    updateSel(cardId, { destFundId: destCode });
  };

  const setMode = (cardId: string, mode: BuyMode) => {
    setCards(prev => prev.map(c => {
      if (c.id !== cardId || !c.buy) return c;
      const sip = suggestSipPlan(c.buy.amountINR);
      return {
        ...c,
        buy: {
          ...c.buy, mode,
          sipMonthlyINR: sip.monthly, sipMonths: sip.months,
          lumpsumINR: c.buy.amountINR,
          rationale: mode === 'sip'
            ? 'Deploy gradually to average NAV across months.'
            : 'Single deployment when sell proceeds settle.',
        },
      };
    }));
    updateSel(cardId, { mode });
  };

  const openExecutor = (cardId: string) => {
    setExecCardId(cardId);
    setSheetOpen(true);
  };

  const onCardExecuted = (summary: SubmittedCardSummary) => {
    setStatus(prev => ({ ...prev, [summary.cardId]: 'executed' }));
    setSummaries(prev => [...prev.filter(s => s.cardId !== summary.cardId), summary]);
  };

  const skipCard = (cardId: string) =>
    setStatus(prev => ({ ...prev, [cardId]: 'skipped' }));

  const execCard = cards.find(c => c.id === execCardId) || null;

  return (
    <div className="space-y-4">
      {/* Stepper */}
      <Card className="border-sip-border">
        <CardContent className="p-3">
          <div className="flex items-center gap-2">
            {[
              { n: 1, label: 'Context' },
              { n: 2, label: 'Plan' },
              { n: 3, label: 'Done' },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-semibold',
                  step >= (s.n as 1 | 2 | 3)
                    ? 'bg-sip-brand text-sip-brand-foreground'
                    : 'bg-muted text-muted-foreground',
                )}>{s.n}</div>
                <span className={cn('text-xs font-medium',
                  step === s.n ? 'text-sip-text-primary' : 'text-sip-text-muted')}>{s.label}</span>
                {i < arr.length - 1 && <div className="flex-1 h-px bg-sip-border" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step 1 — Context */}
      {step === 1 && (
        <div className="space-y-4">
          {noTriggers ? (
            <Card className="border-sip-border">
              <CardContent className="p-6 text-center text-sm text-sip-text-muted">
                No actions suggested right now. Your portfolio is within configured limits.
              </CardContent>
            </Card>
          ) : (
            <>
              <Card className="border-sip-border">
                <CardContent className="p-4 space-y-3">
                  <p className="text-xs text-sip-text-muted">Active alerts</p>
                  <div className="flex flex-wrap gap-2">
                    {triggers.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setFocusId(t.id)}
                        className={cn(
                          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] border transition-colors',
                          focusId === t.id
                            ? 'border-sip-brand bg-sip-brand/10 text-sip-brand'
                            : 'border-sip-border text-sip-text-secondary hover:bg-muted/50',
                        )}
                      >
                        {t.severity === 'critical'
                          ? <AlertCircle className="w-3 h-3 text-red-600" />
                          : <AlertTriangle className="w-3 h-3 text-amber-600" />}
                        <span className="truncate max-w-[200px]">{t.title}</span>
                      </button>
                    ))}
                  </div>
                  {benchmarkOnly && (
                    <div className="rounded-md border border-amber-200 bg-amber-50/50 p-3 text-[11px] text-amber-800">
                      Markets have moved sharply. Phase 1 will not auto-suggest trades for a market move alone — review your mix below and decide if changes are needed.
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-sip-border">
                <CardContent className="p-4 space-y-3">
                  <p className="text-xs font-semibold text-sip-text-primary">Sector exposure</p>
                  <div className="space-y-2">
                    {sectors.map(s => {
                      const overWarn = s.weight > REBALANCE_CONFIG.sector.warn;
                      const overCrit = s.weight > REBALANCE_CONFIG.sector.critical;
                      return (
                        <div key={s.sector}>
                          <div className="flex items-center justify-between text-[11px] mb-1">
                            <span className="text-sip-text-secondary">{s.sector}</span>
                            <span className={cn('font-medium',
                              overCrit ? 'text-red-600' : overWarn ? 'text-amber-600' : 'text-sip-text-primary')}>
                              {s.weight.toFixed(1)}%
                            </span>
                          </div>
                          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                            <div className={cn('h-full',
                              overCrit ? 'bg-red-500' : overWarn ? 'bg-amber-500' : 'bg-sip-brand')}
                              style={{ width: `${Math.min(100, s.weight)}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-sip-text-muted">
                    Caps: {REBALANCE_CONFIG.sector.warn}% warn · {REBALANCE_CONFIG.sector.critical}% critical
                  </p>
                </CardContent>
              </Card>

              <Card className="border-sip-border">
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs font-semibold text-sip-text-primary">Holdings by weight</p>
                  <div className="space-y-1.5">
                    {fundsBd.map(({ h, weight }) => {
                      const overWarn = weight > REBALANCE_CONFIG.singleFund.warn;
                      const overCrit = weight > REBALANCE_CONFIG.singleFund.critical;
                      return (
                        <div key={h.fundId} className="flex items-center justify-between text-[11px] py-1 border-b border-sip-border/50 last:border-0">
                          <div className="min-w-0">
                            <p className="text-sip-text-primary truncate">{h.name}</p>
                            <p className="text-[10px] text-sip-text-muted">{h.category} · {h.sector}</p>
                          </div>
                          <div className="text-right shrink-0 ml-2">
                            <p className={cn('font-medium',
                              overCrit ? 'text-red-600' : overWarn ? 'text-amber-600' : 'text-sip-text-primary')}>
                              {weight.toFixed(1)}%
                            </p>
                            <p className="text-[10px] text-sip-text-muted">{inr(h.valueINR)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-[10px] text-sip-text-muted">
                    Caps: {REBALANCE_CONFIG.singleFund.warn}% warn · {REBALANCE_CONFIG.singleFund.critical}% critical
                  </p>
                </CardContent>
              </Card>
            </>
          )}

          <div className="flex justify-end">
            <Button
              size="sm"
              className="gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
              onClick={() => setStep(2)}
              disabled={noTriggers}
            >
              Review plan <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2 — Plan (per-card: Sell + Buy + SIP/Lumpsum) */}
      {step === 2 && (
        <div className="space-y-4">
          {cards.length === 0 ? (
            <Card className="border-sip-border">
              <CardContent className="p-6 text-center text-sm text-sip-text-muted space-y-3">
                <p>No automatic legs for the active alerts.</p>
                {benchmarkOnly && (
                  <p className="text-[11px]">
                    Market-only nudges don't auto-trade. Review your mix and decide if changes are needed.
                  </p>
                )}
                <Button size="sm" variant="outline" onClick={() => setStep(1)}>Back</Button>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-sip-text-primary">Suggested transactions</p>
                  <p className="text-[11px] text-sip-text-muted mt-0.5">
                    Execute one at a time. Each runs the real sell + buy mandate flow.
                    {' '}<span className="font-medium text-sip-text-secondary">{executedCount}</span> of {cards.length} executed.
                  </p>
                </div>
              </div>

              {cards.map(c => {
                const st = status[c.id];
                const executed = st === 'executed';
                const skipped = st === 'skipped';
                const proceeds = c.sell.amountINR - c.sell.exitLoadINR;
                return (
                  <Card key={c.id} className={cn(
                    'border-sip-border transition-shadow',
                    executed && 'ring-1 ring-emerald-300 shadow-sm bg-emerald-50/20',
                    skipped && 'opacity-60',
                  )}>
                    <CardContent className="p-4 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5 mb-1">
                            {c.severity === 'critical'
                              ? <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                              : <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />}
                            <Badge variant="outline" className="text-[9px] uppercase tracking-wider">
                              {c.severity}
                            </Badge>
                            {executed && (
                              <Badge className="text-[9px] bg-emerald-600 text-white hover:bg-emerald-600">
                                <CheckCircle2 className="w-2.5 h-2.5 mr-1" /> Executed
                              </Badge>
                            )}
                            {skipped && (
                              <Badge variant="outline" className="text-[9px]">Skipped</Badge>
                            )}
                          </div>
                          <p className="text-sm font-medium text-sip-text-primary">{c.title}</p>
                          <p className="text-[11px] text-sip-text-muted mt-0.5">{c.why}</p>
                        </div>
                      </div>

                      {/* Sell half */}
                      <div className="rounded-md border border-sip-border bg-muted/30 p-3 space-y-2">
                        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-sip-text-muted">
                          <TrendingDown className="w-3 h-3" /> Step 1 · Sell
                        </div>
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-sip-text-primary truncate">{c.sell.sourceFundName}</p>
                            <p className="text-[10px] text-sip-text-muted">Held ~{Math.round(c.sell.holdingDays / 30)} months</p>
                          </div>
                          <p className="text-sm font-semibold text-sip-text-primary shrink-0">{inr(c.sell.amountINR)}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-[10.5px]">
                          <div className="flex items-center gap-1 text-sip-text-secondary">
                            <Wallet className="w-3 h-3" /> Exit load: <span className="font-medium text-sip-text-primary">{inr(c.sell.exitLoadINR)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sip-text-secondary">
                            <Calendar className="w-3 h-3" /> Funds: <span className="font-medium text-sip-text-primary">{c.sell.settlementLabel}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-1 text-[10px] text-sip-text-muted">
                          <Info className="w-3 h-3 mt-0.5 shrink-0" />
                          <span>{c.sell.taxNote}</span>
                        </div>
                      </div>

                      {/* Buy half */}
                      {c.buy && (
                        <div className="rounded-md border border-sip-border p-3 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-sip-text-muted">
                              Step 2 · Buy
                            </div>
                            <span className="text-[10px] text-sip-text-muted">
                              Net of exit load: {inr(proceeds)}
                            </span>
                          </div>

                          {/* Destination picker */}
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-sip-text-muted mb-1">Destination fund</p>
                            <Select
                              value={c.buy.destFundId}
                              onValueChange={(v) => updateDest(c.id, v)}
                              disabled={executed}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="Choose destination fund" />
                              </SelectTrigger>
                              <SelectContent>
                                {destinations.map(d => (
                                  <SelectItem key={d.code} value={d.code} className="text-xs">
                                    {d.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Mode toggle */}
                          <div>
                            <p className="text-[10px] uppercase tracking-wider text-sip-text-muted mb-1.5">How to invest</p>
                            <RadioGroup
                              value={c.buy.mode}
                              onValueChange={(v) => setMode(c.id, v as BuyMode)}
                              className="grid grid-cols-2 gap-2"
                              disabled={executed}
                            >
                              <Label
                                htmlFor={`${c.id}-sip`}
                                className={cn(
                                  'flex flex-col gap-0.5 rounded-md border p-2 cursor-pointer transition-colors',
                                  c.buy.mode === 'sip' ? 'border-sip-brand bg-sip-brand/5' : 'border-sip-border',
                                )}
                              >
                                <div className="flex items-center gap-1.5">
                                  <RadioGroupItem id={`${c.id}-sip`} value="sip" />
                                  <span className="text-xs font-medium">SIP</span>
                                  <Badge variant="secondary" className="text-[9px] ml-auto">Recommended</Badge>
                                </div>
                                <span className="text-[10px] text-sip-text-muted pl-5">
                                  {inr(c.buy.sipMonthlyINR || 0)}/mo × {c.buy.sipMonths}
                                </span>
                              </Label>
                              <Label
                                htmlFor={`${c.id}-lump`}
                                className={cn(
                                  'flex flex-col gap-0.5 rounded-md border p-2 cursor-pointer transition-colors',
                                  c.buy.mode === 'lumpsum' ? 'border-sip-brand bg-sip-brand/5' : 'border-sip-border',
                                )}
                              >
                                <div className="flex items-center gap-1.5">
                                  <RadioGroupItem id={`${c.id}-lump`} value="lumpsum" />
                                  <span className="text-xs font-medium">One-time</span>
                                </div>
                                <span className="text-[10px] text-sip-text-muted pl-5">
                                  {inr(c.buy.lumpsumINR || 0)} after settlement
                                </span>
                              </Label>
                            </RadioGroup>
                            <p className="text-[10px] text-sip-text-muted mt-1.5 italic">{c.buy.rationale}</p>
                          </div>

                          <div className="flex items-start gap-1 text-[10px] text-amber-700 bg-amber-50/60 border border-amber-200 rounded p-2">
                            <Info className="w-3 h-3 mt-0.5 shrink-0" />
                            <span>
                              Buy mandate is authorised today and auto-executed after sell settles ({c.sell.settlementLabel}).
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Per-card action */}
                      <div className="flex items-center justify-between gap-2 pt-1">
                        {!executed && !skipped ? (
                          <>
                            <button
                              type="button"
                              onClick={() => skipCard(c.id)}
                              className="text-[11px] underline-offset-2 hover:underline text-sip-text-muted"
                            >
                              Skip this
                            </button>
                            <Button
                              size="sm"
                              className="gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
                              onClick={() => openExecutor(c.id)}
                            >
                              <PlayCircle className="w-3.5 h-3.5" /> Execute now
                            </Button>
                          </>
                        ) : executed ? (
                          <>
                            <span className="text-[11px] text-emerald-700 flex items-center gap-1">
                              <Check className="w-3 h-3" /> Sell + buy mandate authorised
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => openExecutor(c.id)}
                              className="text-[11px]"
                            >
                              View
                            </Button>
                          </>
                        ) : (
                          <>
                            <span className="text-[11px] text-sip-text-muted">Skipped</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setStatus(prev => ({ ...prev, [c.id]: 'pending' }))}
                              className="text-[11px]"
                            >
                              Restore
                            </Button>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}

              {/* Footer */}
              <div className="flex justify-between items-center pt-2 sticky bottom-0 bg-background/95 backdrop-blur py-2">
                <Button size="sm" variant="ghost" className="gap-1" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </Button>
                <Button
                  size="sm"
                  className="gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
                  onClick={() => setStep(3)}
                  disabled={executedCount === 0}
                >
                  {executedCount > 0
                    ? `View summary (${executedCount})`
                    : pendingCount > 0 ? 'Execute at least one' : 'View summary'}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Step 3 — Done (execution timeline) */}
      {step === 3 && (
        <div className="space-y-4">
          <Card className="border-sip-border">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-sip-text-primary">Plan submitted</p>
                  <p className="text-[11px] text-sip-text-muted">
                    {summaries.length} {summaries.length === 1 ? 'transaction' : 'transactions'} queued · Plan ID <span className="font-mono">{planId}</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Execution timeline per card */}
          {summaries.map((sm, idx) => {
            const today = submittedAt ? new Date(submittedAt) : new Date();
            const settleDate = addWorkingDays(today, REBALANCE_CONFIG.settlement.redeemWorkingDays);
            return (
              <Card key={sm.cardId} className="border-sip-border">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-sip-text-primary">
                      Transaction {idx + 1} of {summaries.length}
                    </p>
                    <Badge variant="outline" className="text-[9px]">Queued</Badge>
                  </div>

                  <div className="relative pl-5 space-y-3">
                    <div className="absolute left-1.5 top-1.5 bottom-1.5 w-px bg-sip-border" />
                    {/* Today */}
                    <div className="relative">
                      <div className="absolute -left-[15px] top-1 w-2.5 h-2.5 rounded-full bg-sip-brand border-2 border-background" />
                      <p className="text-[10px] uppercase tracking-wider text-sip-text-muted">Today · {formatDayLabel(today)}</p>
                      <p className="text-xs text-sip-text-primary mt-0.5">
                        Redemption placed: <span className="font-medium">{sm.sellFundName}</span> · {inr(sm.sellAmountINR)}
                      </p>
                      {sm.exitLoadINR > 0 && (
                        <p className="text-[10px] text-sip-text-muted">Exit load: {inr(sm.exitLoadINR)}</p>
                      )}
                    </div>
                    {/* Settlement */}
                    <div className="relative">
                      <div className="absolute -left-[15px] top-1 w-2.5 h-2.5 rounded-full bg-amber-500 border-2 border-background" />
                      <p className="text-[10px] uppercase tracking-wider text-sip-text-muted">
                        {sm.settlementLabel} · {formatDayLabel(settleDate)}
                      </p>
                      <p className="text-xs text-sip-text-primary mt-0.5">Sell proceeds expected to settle</p>
                    </div>
                    {/* Buy */}
                    {sm.buy && (
                      <div className="relative">
                        <div className="absolute -left-[15px] top-1 w-2.5 h-2.5 rounded-full bg-emerald-600 border-2 border-background" />
                        <p className="text-[10px] uppercase tracking-wider text-sip-text-muted">
                          On settlement · {formatDayLabel(settleDate)}
                        </p>
                        {sm.buy.mode === 'sip' ? (
                          <p className="text-xs text-sip-text-primary mt-0.5">
                            SIP starts: <span className="font-medium">{sm.buy.destFundName}</span>
                            {' · '}{inr(sm.buy.sipMonthlyINR || 0)}/mo × {sm.buy.sipMonths}
                          </p>
                        ) : (
                          <p className="text-xs text-sip-text-primary mt-0.5">
                            Lumpsum buy: <span className="font-medium">{sm.buy.destFundName}</span>
                            {' · '}{inr(sm.buy.lumpsumINR || sm.buy.amountINR)}
                          </p>
                        )}
                        <p className="text-[10px] text-sip-text-muted mt-0.5">
                          Auto-placed from settled proceeds. NAV applied at order time.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <Card className="border-sip-border bg-muted/30">
            <CardContent className="p-3 text-[10.5px] text-sip-text-muted space-y-1">
              <p className="font-medium text-sip-text-secondary">Disclosures</p>
              <p>• Exit load and tax estimates are indicative. Final values per AMC + SEBI rules.</p>
              <p>• Settlement timing assumes working days; holiday calendar not applied.</p>
              <p>• NAV may move between order and settlement (mark-to-market).</p>
            </CardContent>
          </Card>

          <div className="flex justify-center gap-2 pt-1">
            <Button size="sm" variant="outline" onClick={() => {
              setStep(1); setPlanId(null); setSummaries([]);
            }}>
              Start over
            </Button>
            {onDone && (
              <Button size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={onDone}>
                Back to portfolio
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

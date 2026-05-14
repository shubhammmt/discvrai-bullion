import { useEffect, useMemo, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  evaluateTriggers, buildPlanLegs, submitRebalancePlan,
  getMockHoldings, getSectorBreakdown, getFundBreakdown,
  RebalanceTrigger, PlanLeg,
} from '@/components/conversion/rebalanceEngine';
import { REBALANCE_CONFIG } from '@/components/conversion/rebalanceConfig';
import { buildSmartShortlist } from '@/components/conversion/shortlistEngine';
import { MOCK_FUNDS } from '@/data/sipMockData';

interface RebalanceTabProps {
  initialFocusId?: string;
  onDone?: () => void;
}

const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export function RebalanceTab({ initialFocusId, onDone }: RebalanceTabProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [focusId, setFocusId] = useState<string | undefined>(initialFocusId);
  const triggers = useMemo(() => evaluateTriggers(), []);
  const holdings = useMemo(() => getMockHoldings(), []);
  const sectors = useMemo(() => getSectorBreakdown(holdings), [holdings]);
  const fundsBd = useMemo(() => getFundBreakdown(holdings), [holdings]);
  const initialLegs = useMemo(() => buildPlanLegs(triggers, holdings), [triggers, holdings]);
  const [legs, setLegs] = useState<PlanLeg[]>(initialLegs);
  const [submitting, setSubmitting] = useState(false);
  const [planId, setPlanId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { setFocusId(initialFocusId); }, [initialFocusId]);

  const benchmarkOnly = triggers.length > 0 && triggers.every(t => t.kind === 'benchmark');
  const noTriggers = triggers.length === 0;

  const updateDest = (legId: string, destCode: string) => {
    setLegs(prev => prev.map(l => l.id === legId
      ? { ...l, destFundId: destCode, destFundName: MOCK_FUNDS.find(f => f.code === destCode)?.name }
      : l));
  };

  const handleSubmit = async () => {
    setSubmitting(true); setError(null);
    try {
      const res = await submitRebalancePlan(legs);
      setPlanId(res.planId); setStep(3);
    } catch (e) {
      setError('Could not submit plan. Try again.');
    } finally { setSubmitting(false); }
  };

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
              {/* Trigger chips */}
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

              {/* Sector weights */}
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

              {/* Fund weights */}
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

      {/* Step 2 — Plan */}
      {step === 2 && (
        <div className="space-y-4">
          {legs.length === 0 ? (
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
            <Card className="border-sip-border">
              <CardContent className="p-4 space-y-3">
                <div>
                  <p className="text-xs font-semibold text-sip-text-primary">Suggested transactions</p>
                  <p className="text-[11px] text-sip-text-muted mt-0.5">
                    {legs.length} {legs.length === 1 ? 'leg' : 'legs'} · every row tied to an alert
                  </p>
                </div>

                <div className="space-y-2">
                  {legs.map(l => (
                    <div key={l.id} className="rounded-md border border-sip-border p-3 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <Badge variant="outline" className="text-[9px] uppercase tracking-wider mb-1">
                            {l.type}
                          </Badge>
                          <p className="text-sm font-medium text-sip-text-primary truncate">
                            {l.sourceFundName}
                          </p>
                          <p className="text-[11px] text-sip-text-muted">{l.why}</p>
                        </div>
                        <p className="text-sm font-semibold text-sip-text-primary shrink-0">{inr(l.amountINR)}</p>
                      </div>
                      {(l.type === 'switch' || l.type === 'buy') && (
                        <div>
                          <p className="text-[10px] uppercase tracking-wider text-sip-text-muted mb-1">Destination</p>
                          <Select value={l.destFundId} onValueChange={(v) => updateDest(l.id, v)}>
                            <SelectTrigger className="h-8 text-xs">
                              <SelectValue placeholder="Choose destination fund" />
                            </SelectTrigger>
                            <SelectContent>
                              {buildSmartShortlist({ risk: 'Moderate' }, 12).map(s => (
                                <SelectItem key={s.code} value={s.code} className="text-xs">
                                  {s.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <div className="flex justify-between pt-2">
                  <Button size="sm" variant="ghost" className="gap-1" onClick={() => setStep(1)}>
                    <ArrowLeft className="w-3.5 h-3.5" /> Back
                  </Button>
                  <Button
                    size="sm"
                    className="gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                    Confirm & submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Step 3 — Done */}
      {step === 3 && (
        <Card className="border-sip-border">
          <CardContent className="p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <p className="text-sm font-semibold text-sip-text-primary">Rebalance plan submitted</p>
            <p className="text-[11px] text-sip-text-muted">
              Plan ID: <span className="font-mono">{planId}</span>
            </p>
            <p className="text-[11px] text-sip-text-muted">
              Next review in {REBALANCE_CONFIG.nextReviewDays} days.
            </p>
            <div className="flex justify-center gap-2 pt-2">
              <Button size="sm" variant="outline" onClick={() => { setStep(1); setPlanId(null); }}>
                Start over
              </Button>
              {onDone && (
                <Button size="sm" className="bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={onDone}>
                  Back to portfolio
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

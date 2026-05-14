import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Info, Calendar } from 'lucide-react';
import { FundRedemptionWidget } from './FundRedemptionWidget';
import { FundPurchaseWidget } from './FundPurchaseWidget';
import { addWorkingDays, formatDayLabel, RebalanceCard, SubmittedCardSummary } from '@/components/conversion/rebalanceEngine';
import { REBALANCE_CONFIG } from '@/components/conversion/rebalanceConfig';

interface RebalanceExecuteSheetProps {
  card: RebalanceCard | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: (summary: SubmittedCardSummary) => void;
}

type Stage = 'sell' | 'bridge' | 'buy' | 'done';

const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

export function RebalanceExecuteSheet({ card, open, onOpenChange, onComplete }: RebalanceExecuteSheetProps) {
  const [stage, setStage] = useState<Stage>('sell');

  if (!card) return null;

  const settleDate = addWorkingDays(new Date(), REBALANCE_CONFIG.settlement.redeemWorkingDays);

  const reset = () => setStage('sell');

  const handleSellDone = () => setStage(card.buy ? 'bridge' : 'done');
  const handleBuyDone = () => setStage('done');

  const handleFinish = () => {
    const summary: SubmittedCardSummary = {
      cardId: card.id,
      triggerId: card.triggerId,
      sellFundName: card.sell.sourceFundName,
      sellAmountINR: card.sell.amountINR,
      exitLoadINR: card.sell.exitLoadINR,
      settlementLabel: card.sell.settlementLabel,
      buy: card.buy ? {
        destFundName: card.buy.destFundName,
        mode: card.buy.mode,
        lumpsumINR: card.buy.mode === 'lumpsum' ? card.buy.lumpsumINR : undefined,
        sipMonthlyINR: card.buy.mode === 'sip' ? card.buy.sipMonthlyINR : undefined,
        sipMonths: card.buy.mode === 'sip' ? card.buy.sipMonths : undefined,
        amountINR: card.buy.amountINR,
      } : undefined,
    };
    onComplete(summary);
    onOpenChange(false);
    reset();
  };

  return (
    <Sheet open={open} onOpenChange={(v) => { onOpenChange(v); if (!v) reset(); }}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle className="text-base">Execute rebalance · {card.sell.sourceFundName}</SheetTitle>
          <SheetDescription className="text-xs">
            Two-leg flow: sell now, then authorise the buy that auto-executes after settlement.
          </SheetDescription>
        </SheetHeader>

        {/* Mini stepper */}
        <div className="flex items-center gap-2 mb-4">
          {(['sell', 'bridge', 'buy', 'done'] as const)
            .filter(s => s !== 'buy' || card.buy)
            .filter(s => s !== 'bridge' || card.buy)
            .map((s, i, arr) => {
              const labels: Record<Stage, string> = {
                sell: '1 · Sell',
                bridge: '2 · Authorise buy',
                buy: '3 · Buy mandate',
                done: '4 · Done',
              };
              const stages: Stage[] = ['sell', 'bridge', 'buy', 'done'];
              const idx = stages.indexOf(stage);
              const sIdx = stages.indexOf(s);
              return (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                    sIdx <= idx ? 'bg-sip-brand text-sip-brand-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {sIdx < idx ? '✓' : sIdx + 1}
                  </div>
                  <span className={`text-[10px] ${sIdx === idx ? 'text-sip-text-primary font-medium' : 'text-sip-text-muted'}`}>
                    {labels[s].split('·')[1]}
                  </span>
                  {i < arr.length - 1 && <div className="flex-1 h-px bg-sip-border" />}
                </div>
              );
            })}
        </div>

        {/* Stage 1: Sell */}
        {stage === 'sell' && (
          <div className="space-y-3">
            <div className="rounded-md border border-amber-200 bg-amber-50/60 p-2.5 text-[11px] text-amber-800 flex gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Place the redemption first. Proceeds settle in {card.sell.settlementLabel} (~{formatDayLabel(settleDate)}).
                Exit load: {inr(card.sell.exitLoadINR)}. {card.sell.taxNote}
              </span>
            </div>
            <FundRedemptionWidget
              prefill={{
                fundCode: card.sell.sourceFundId,
                redeemMode: 'partial-amount',
                amount: card.sell.amountINR,
              }}
              onRedeemComplete={handleSellDone}
            />
            <div className="flex justify-end pt-2 border-t border-sip-border">
              <Button size="sm" variant="ghost" onClick={handleSellDone} className="text-[11px] text-sip-text-muted">
                Skip to buy authorisation (demo) <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Stage 2: Bridge */}
        {stage === 'bridge' && card.buy && (
          <div className="space-y-3">
            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="p-4 flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-sip-text-primary">Redemption queued</p>
                  <p className="text-[11px] text-sip-text-muted mt-0.5">
                    {card.sell.sourceFundName} · {inr(card.sell.amountINR)} · settles {formatDayLabel(settleDate)}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-sip-border">
              <CardContent className="p-4 space-y-3">
                <p className="text-sm font-semibold text-sip-text-primary">Authorise the buy now</p>
                <p className="text-[11px] text-sip-text-muted">
                  We'll auto-place the {card.buy.mode === 'sip' ? 'SIP mandate' : 'one-time order'} into{' '}
                  <span className="font-medium text-sip-text-primary">{card.buy.destFundName}</span> the day proceeds clear
                  ({formatDayLabel(settleDate)}). Set up the {card.buy.mode === 'sip' ? 'eMandate' : 'payment authorisation'} now so the buy doesn't wait.
                </p>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="rounded border border-sip-border p-2">
                    <p className="text-[10px] uppercase text-sip-text-muted">Mode</p>
                    <p className="font-medium text-sip-text-primary mt-0.5">
                      {card.buy.mode === 'sip' ? 'SIP' : 'One-time'}
                    </p>
                  </div>
                  <div className="rounded border border-sip-border p-2">
                    <p className="text-[10px] uppercase text-sip-text-muted">Amount</p>
                    <p className="font-medium text-sip-text-primary mt-0.5">
                      {card.buy.mode === 'sip'
                        ? `${inr(card.buy.sipMonthlyINR || 0)}/mo × ${card.buy.sipMonths}`
                        : inr(card.buy.lumpsumINR || card.buy.amountINR)}
                    </p>
                  </div>
                  <div className="rounded border border-sip-border p-2 col-span-2 flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-sip-text-muted" />
                    <span className="text-sip-text-secondary">First debit on / after</span>
                    <Badge variant="outline" className="text-[10px] ml-auto">{formatDayLabel(settleDate)}</Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="w-full bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
                  onClick={() => setStage('buy')}
                >
                  Continue to {card.buy.mode === 'sip' ? 'mandate setup' : 'payment'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Stage 3: Buy */}
        {stage === 'buy' && card.buy && (
          <div className="space-y-3">
            <div className="rounded-md border border-sky-200 bg-sky-50/60 p-2.5 text-[11px] text-sky-800 flex gap-1.5">
              <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>
                Authorising now — actual debit on {formatDayLabel(settleDate)} after sell proceeds clear.
              </span>
            </div>
            <FundPurchaseWidget
              prefill={{
                fundCode: card.buy.destFundId,
                mode: card.buy.mode === 'sip' ? 'sip' : 'onetime',
                amount: card.buy.mode === 'sip'
                  ? (card.buy.sipMonthlyINR || 0)
                  : (card.buy.lumpsumINR || card.buy.amountINR),
                startDate: settleDate.toISOString(),
                frequency: 'monthly',
              }}
              onPurchaseComplete={handleBuyDone}
            />
            <div className="flex justify-end pt-2 border-t border-sip-border">
              <Button size="sm" variant="ghost" onClick={handleBuyDone} className="text-[11px] text-sip-text-muted">
                Skip to confirmation (demo) <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Stage 4: Done */}
        {stage === 'done' && (
          <div className="space-y-3">
            <Card className="border-emerald-200 bg-emerald-50/40">
              <CardContent className="p-5 flex items-start gap-3">
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-sip-text-primary">Both legs authorised</p>
                  <p className="text-[11px] text-sip-text-muted mt-0.5">
                    Sell placed today. {card.buy ? `Buy auto-executes ${formatDayLabel(settleDate)} from settled proceeds.` : ''}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button
              size="sm"
              className="w-full bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
              onClick={handleFinish}
            >
              Done · back to plan
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

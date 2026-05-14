import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { evaluateTriggers, topTriggers, RebalanceTrigger } from './rebalanceEngine';
import { REBALANCE_CONFIG } from './rebalanceConfig';

interface Props {
  onReview: (focusTriggerId?: string) => void;
}

const sevStyle = {
  critical: { dot: 'bg-red-500', label: 'text-red-700', icon: AlertCircle },
  warn:     { dot: 'bg-amber-500', label: 'text-amber-700', icon: AlertTriangle },
} as const;

export function RebalanceAlertsStrip({ onReview }: Props) {
  const all = evaluateTriggers();
  const cards = topTriggers(all, REBALANCE_CONFIG.maxAlertCards);

  return (
    <Card className="border-sip-border">
      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="text-sm font-semibold text-sip-text-primary">Portfolio actions</h3>
          <p className="text-[11px] text-sip-text-muted mt-0.5">Based on your holdings and limits.</p>
        </div>

        {cards.length === 0 ? (
          <div className="text-xs text-sip-text-muted py-3 text-center">
            No actions suggested right now.
          </div>
        ) : (
          <div className="space-y-2">
            {cards.map((t: RebalanceTrigger) => {
              const s = sevStyle[t.severity];
              const Icon = s.icon;
              return (
                <div
                  key={t.id}
                  className="flex items-start gap-3 p-3 rounded-md border border-sip-border bg-background/60"
                >
                  <span className={cn('w-1.5 h-1.5 rounded-full mt-2 shrink-0', s.dot)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-sip-text-primary truncate">{t.title}</p>
                    <p className="text-[11px] text-sip-text-muted mt-0.5">{t.why}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-[11px] gap-1 shrink-0"
                    onClick={() => onReview(t.id)}
                  >
                    Review <ArrowRight className="w-3 h-3" />
                  </Button>
                </div>
              );
            })}
            {all.length > cards.length && (
              <button
                className="text-[11px] text-sip-brand hover:underline"
                onClick={() => onReview()}
              >
                See all {all.length} alerts →
              </button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

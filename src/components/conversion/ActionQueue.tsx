import { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ListChecks, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TriggerCard } from './TriggerCard';
import {
  PortfolioTrigger, sortTriggers, isApplyAllEligible,
} from './triggerEngine';
import { trackConversionEvent } from './events';

interface ActionQueueProps {
  triggers: PortfolioTrigger[];
  title?: string;
  subtitle?: string;
  limit?: number;
}

export function ActionQueue({
  triggers,
  title = 'Action Queue',
  subtitle = 'Sorted by severity & goal impact. Tackle critical items first.',
  limit,
}: ActionQueueProps) {
  const navigate = useNavigate();
  const sorted = useMemo(() => sortTriggers(triggers), [triggers]);
  const visible = limit ? sorted.slice(0, limit) : sorted;
  const applyAll = isApplyAllEligible(visible);

  if (visible.length === 0) {
    return (
      <Card className="border-sip-border">
        <CardContent className="p-6 text-center text-xs text-sip-text-muted">
          No active triggers. Portfolio is within thresholds. ✅
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-sip-border">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm font-semibold text-sip-text-primary flex items-center gap-1.5">
              <ListChecks className="w-4 h-4 text-sip-brand" /> {title}
              <Badge variant="secondary" className="text-[10px]">{visible.length}</Badge>
            </h3>
            <p className="text-[11px] text-sip-text-muted mt-0.5">{subtitle}</p>
          </div>
          {applyAll && (
            <Button
              size="sm"
              className="h-7 text-[11px] gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90"
              onClick={() => {
                trackConversionEvent('apply_all_clicked', { count: visible.length });
                navigate('/rebalancing');
              }}
            >
              <Sparkles className="w-3 h-3" /> Apply all recommended
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {visible.map(t => <TriggerCard key={t.id} trigger={t} />)}
        </div>
      </CardContent>
    </Card>
  );
}

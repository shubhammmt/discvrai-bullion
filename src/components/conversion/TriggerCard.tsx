import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, AlertCircle, Info, ArrowRight, Target, GitCompare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { PortfolioTrigger, triggerActionLabel } from './triggerEngine';
import { trackConversionEvent } from './events';
import { CompareDrawer } from './CompareDrawer';
import { buildSmartShortlist } from './shortlistEngine';

const SEV_STYLE = {
  critical: { ring: 'border-red-300 bg-red-50/50', chip: 'bg-red-100 text-red-700 border-red-200', icon: AlertCircle },
  warn:     { ring: 'border-amber-300 bg-amber-50/50', chip: 'bg-amber-100 text-amber-800 border-amber-200', icon: AlertTriangle },
  info:     { ring: 'border-sky-300 bg-sky-50/50', chip: 'bg-sky-100 text-sky-700 border-sky-200', icon: Info },
};

interface TriggerCardProps {
  trigger: PortfolioTrigger;
  compact?: boolean;
  onAct?: (t: PortfolioTrigger) => void;
}

export function TriggerCard({ trigger: t, compact, onAct }: TriggerCardProps) {
  const navigate = useNavigate();
  const { ring, chip, icon: Icon } = SEV_STYLE[t.severity];
  const [compareOpen, setCompareOpen] = useState(false);
  const showCompare = t.recommendedAction === 'switch' || t.recommendedAction === 'rebalance' || t.category === 'overlap';
  const compareFunds = showCompare ? buildSmartShortlist({ goal: t.impactedGoals[0], risk: 'Moderate', horizon: 'long-term' }).slice(0, 3) : [];

  const handleAct = () => {
    trackConversionEvent('trigger_action_clicked', { id: t.id, category: t.category, severity: t.severity });
    if (onAct) return onAct(t);
    if (t.ctaTarget?.startsWith('/')) navigate(t.ctaTarget);
  };

  return (
    <Card className={cn('border', ring)}>
      <CardContent className={cn('space-y-2', compact ? 'p-3' : 'p-4')}>
        <div className="flex items-start gap-2">
          <Icon className={cn('w-4 h-4 shrink-0 mt-0.5',
            t.severity === 'critical' ? 'text-red-600' : t.severity === 'warn' ? 'text-amber-600' : 'text-sky-600')} />
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
              <Badge variant="outline" className={cn('text-[9px] uppercase tracking-wider px-1.5 py-0 h-4', chip)}>
                {t.severity}
              </Badge>
              <Badge variant="outline" className="text-[9px] uppercase tracking-wider px-1.5 py-0 h-4 border-sip-border text-sip-text-muted">
                {triggerActionLabel(t.recommendedAction)}
              </Badge>
              <span className="text-[10px] text-sip-text-muted">conf {Math.round(t.confidence * 100)}%</span>
            </div>
            <p className="text-sm font-semibold text-sip-text-primary truncate">{t.title}</p>
            <p className={cn('text-xs text-sip-text-secondary mt-0.5', compact && 'line-clamp-2')}>{t.detail}</p>
          </div>
        </div>

        {!compact && (t.impactedGoals.length > 0 || t.estImpact) && (
          <div className="rounded-md bg-background/60 border border-sip-border/60 p-2 space-y-1">
            {t.impactedGoals.length > 0 && (
              <div className="flex items-center gap-1.5 text-[11px] text-sip-text-secondary">
                <Target className="w-3 h-3 text-sip-brand" />
                <span>Impacts: <span className="font-medium text-sip-text-primary">{t.impactedGoals.join(', ')}</span></span>
              </div>
            )}
            {t.estImpact && <p className="text-[11px] text-sip-text-muted">Est. impact: {t.estImpact}</p>}
          </div>
        )}

        <div className="flex justify-end">
          <Button size="sm" className="h-7 text-[11px] gap-1 bg-sip-brand text-sip-brand-foreground hover:bg-sip-brand/90" onClick={handleAct}>
            {t.ctaLabel} <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, ArrowRight, Tag } from 'lucide-react';
import { AlertItem } from './types';
import { cn } from '@/lib/utils';

const TONE: Record<AlertItem['severity'], string> = {
  info: 'border-l-sky-400',
  warn: 'border-l-amber-400',
  critical: 'border-l-red-400',
};

interface AlertCardProps {
  alert: AlertItem;
  onAct?: (a: AlertItem) => void;
}

export function AlertCard({ alert, onAct }: AlertCardProps) {
  return (
    <Card className={cn('border-l-4', TONE[alert.severity])}>
      <CardContent className="p-3 flex items-start gap-2.5">
        <Bell className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
            <p className="text-xs font-semibold text-foreground">{alert.title}</p>
            <Badge variant="outline" className="text-[9px] py-0 px-1.5 capitalize">{alert.type}</Badge>
            {alert.holdingTag && (
              <Badge variant="outline" className="text-[9px] py-0 px-1.5 gap-0.5 border-sip-brand/40 text-sip-brand">
                <Tag className="w-2.5 h-2.5" /> {alert.holdingTag}
              </Badge>
            )}
          </div>
          <p className="text-[11px] text-muted-foreground">{alert.body}</p>
          <div className="flex items-center justify-between mt-1.5 gap-2">
            <span className="text-[10px] text-muted-foreground">{alert.ts}</span>
            <Button size="sm" className="h-6 text-[10px] gap-1 bg-foreground text-background hover:bg-foreground/90" onClick={() => onAct?.(alert)}>
              {alert.ctaLabel} <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export const SAMPLE_ALERTS: AlertItem[] = [
  { id: 'a1', type: 'price', severity: 'warn', title: 'HDFC Large Cap NAV down 2.4%', body: 'Sharper than benchmark (-1.1%). Consider top-up.', holdingTag: 'HDFC Large Cap', ctaLabel: 'Top-up SIP', ctaTarget: '/sip-management', ts: '2 hrs ago' },
  { id: 'a2', type: 'sip', severity: 'critical', title: 'SIP debit failed: Axis Bluechip', body: 'Bank mandate inactive. Renew before 15th to avoid skip.', holdingTag: 'Axis Bluechip', ctaLabel: 'Fix mandate', ctaTarget: '/sip-management', ts: 'Yesterday' },
  { id: 'a3', type: 'rebalance', severity: 'warn', title: 'Drift detected: Equity 78% vs target 70%', body: 'Switch ₹50K to Hybrid to restore target allocation.', ctaLabel: 'Open rebalance', ctaTarget: '/rebalancing', ts: '1 day ago' },
  { id: 'a4', type: 'goal', severity: 'info', title: 'Retirement goal: 12% behind track', body: 'Increase SIP by ₹2,500/mo to close gap.', ctaLabel: 'Step-up SIP', ctaTarget: '/sip-management', ts: '2 days ago' },
  { id: 'a5', type: 'news', severity: 'info', title: 'RBI rate cut — debt funds in focus', body: 'Your HDFC Liquid holding may benefit. Read research.', holdingTag: 'HDFC Liquid', ctaLabel: 'Read', ctaTarget: '/research', ts: '3 days ago' },
  { id: 'a6', type: 'digest', severity: 'info', title: 'Weekly digest ready', body: 'Portfolio +1.8% · 1 action card · 2 alerts cleared.', ctaLabel: 'Open digest', ctaTarget: '/alerts', ts: 'Mon 9 AM' },
];

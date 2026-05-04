import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { ActionCardItem, ImpactPreview } from './types';
import { cn } from '@/lib/utils';

const SEV: Record<ActionCardItem['severity'], { icon: any; tone: string }> = {
  info: { icon: Info, tone: 'border-sky-300 bg-sky-50/60 text-sky-900' },
  warn: { icon: AlertTriangle, tone: 'border-amber-300 bg-amber-50/60 text-amber-900' },
  critical: { icon: AlertCircle, tone: 'border-red-300 bg-red-50/60 text-red-900' },
};

interface ActionCardProps {
  item: ActionCardItem;
  onAct?: (item: ActionCardItem) => void;
}

export function ActionCard({ item, onAct }: ActionCardProps) {
  const { icon: Icon, tone } = SEV[item.severity];
  const [previewOpen, setPreviewOpen] = useState(false);
  return (
    <>
      <Card className={cn('border', tone)}>
        <CardContent className="p-3 space-y-2">
          <div className="flex items-start gap-2">
            <Icon className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold">{item.title}</p>
              <p className="text-[11px] mt-0.5 opacity-80">{item.description}</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {item.impact && (
              <Button size="sm" variant="outline" className="h-7 text-[11px] flex-1" onClick={() => setPreviewOpen(true)}>
                Preview impact
              </Button>
            )}
            <Button size="sm" className="h-7 text-[11px] gap-1 flex-1 bg-foreground text-background hover:bg-foreground/90" onClick={() => onAct?.(item)}>
              {item.cta} <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {item.impact && (
        <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader><DialogTitle>{item.impact.label}</DialogTitle></DialogHeader>
            <ImpactPreviewView impact={item.impact} />
            <Button className="bg-foreground text-background" onClick={() => { setPreviewOpen(false); onAct?.(item); }}>
              Apply: {item.cta}
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export function ImpactPreviewView({ impact }: { impact: ImpactPreview }) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <Panel title="Before" rows={impact.before} />
        <Panel title="After" rows={impact.after} highlight />
      </div>
      <div className="text-xs text-foreground bg-muted/50 rounded p-2 border border-border">{impact.summary}</div>
    </div>
  );
}

function Panel({ title, rows, highlight }: { title: string; rows: ImpactPreview['before']; highlight?: boolean }) {
  return (
    <div className={cn('rounded-lg border p-3', highlight ? 'border-emerald-300 bg-emerald-50/40' : 'border-border bg-muted/20')}>
      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">{title}</p>
      <div className="space-y-1.5">
        {rows.map((r, i) => (
          <div key={i} className="flex justify-between gap-2 text-xs">
            <span className="text-muted-foreground">{r.label}</span>
            <span className={cn('font-semibold', r.tone === 'good' && 'text-emerald-700', r.tone === 'bad' && 'text-red-700')}>
              {r.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Sample portfolio action cards (used as fallback / demo)
export const SAMPLE_ACTION_CARDS: ActionCardItem[] = [
  {
    id: 'pa-1',
    severity: 'critical',
    title: 'Concentration risk: Tech > 30%',
    description: 'Your equity portfolio is over-weight in Technology (32%). Recommended cap: 20%.',
    cta: 'Rebalance now',
    ctaTarget: '/rebalancing',
    impact: {
      label: 'Reduce Tech concentration',
      before: [
        { label: 'Tech weight', value: '32%', tone: 'bad' },
        { label: 'Concentration score', value: '7.8 / 10', tone: 'bad' },
        { label: 'Drawdown risk', value: 'High', tone: 'bad' },
      ],
      after: [
        { label: 'Tech weight', value: '18%', tone: 'good' },
        { label: 'Concentration score', value: '4.2 / 10', tone: 'good' },
        { label: 'Drawdown risk', value: 'Moderate', tone: 'good' },
      ],
      summary: 'Switch ₹40K from ICICI Tech Fund into Parag Parikh Flexi Cap to bring tech exposure to 18%.',
    },
  },
  {
    id: 'pa-2',
    severity: 'warn',
    title: 'SIP gap: Retirement goal',
    description: 'You are tracking ₹4.2L behind on Retirement. Increase SIP by ₹2,500/mo to close the gap.',
    cta: 'Increase SIP',
    ctaTarget: '/sip-management',
    impact: {
      label: 'Step-up Retirement SIP',
      before: [
        { label: 'Monthly SIP', value: '₹5,000' },
        { label: 'Goal projection (15Y)', value: '₹38L', tone: 'bad' },
        { label: 'Gap', value: '₹4.2L', tone: 'bad' },
      ],
      after: [
        { label: 'Monthly SIP', value: '₹7,500', tone: 'good' },
        { label: 'Goal projection (15Y)', value: '₹56L', tone: 'good' },
        { label: 'Gap', value: 'On track', tone: 'good' },
      ],
      summary: 'Adding ₹2,500/mo bridges the gap and keeps your retirement on schedule.',
    },
  },
  {
    id: 'pa-3',
    severity: 'info',
    title: 'Idle cash: ₹85,000 in savings',
    description: 'Park in a Liquid Fund to earn ~7% vs 3% in savings — withdrawable any time.',
    cta: 'Top-up Liquid Fund',
    ctaTarget: '/sip-management',
    impact: {
      label: 'Move idle cash to Liquid Fund',
      before: [
        { label: 'Yield', value: '3.0% (savings)', tone: 'bad' },
        { label: 'Annual return', value: '₹2,550' },
      ],
      after: [
        { label: 'Yield', value: '7.1% (liquid)', tone: 'good' },
        { label: 'Annual return', value: '₹6,035', tone: 'good' },
      ],
      summary: 'You earn ₹3,485 more per year with same-day liquidity.',
    },
  },
];

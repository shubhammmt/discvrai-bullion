import { Check, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TimelineStep {
  label: string;
  ts?: string;
  state: 'done' | 'pending' | 'now' | 'failed';
  detail?: string;
}

interface TransactionTimelineProps {
  steps: TimelineStep[];
  title?: string;
}

const ICON: Record<TimelineStep['state'], any> = { done: Check, pending: Clock, now: Clock, failed: AlertCircle };
const TONE: Record<TimelineStep['state'], string> = {
  done: 'bg-emerald-100 text-emerald-700 border-emerald-300',
  pending: 'bg-muted text-muted-foreground border-border',
  now: 'bg-sip-brand/10 text-sip-brand border-sip-brand animate-pulse',
  failed: 'bg-red-100 text-red-700 border-red-300',
};

export function TransactionTimeline({ steps, title = 'Order timeline' }: TransactionTimelineProps) {
  return (
    <div className="space-y-2">
      <h4 className="text-xs font-semibold text-foreground">{title}</h4>
      <ol className="space-y-2">
        {steps.map((s, i) => {
          const Icon = ICON[s.state];
          return (
            <li key={i} className="flex gap-2.5 items-start">
              <div className={cn('shrink-0 w-6 h-6 rounded-full border flex items-center justify-center', TONE[s.state])}>
                <Icon className="w-3 h-3" />
              </div>
              <div className="flex-1 min-w-0 pb-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-foreground">{s.label}</p>
                  {s.ts && <span className="text-[10px] text-muted-foreground">{s.ts}</span>}
                </div>
                {s.detail && <p className="text-[10px] text-muted-foreground mt-0.5">{s.detail}</p>}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export const SAMPLE_TIMELINE: TimelineStep[] = [
  { label: 'Order placed', state: 'done', ts: 'Today, 4:12 PM', detail: '₹5,000 SIP · HDFC Large Cap' },
  { label: 'Payment debited', state: 'done', ts: 'Today, 4:13 PM', detail: 'HDFC Bank ****4521' },
  { label: 'Sent to RTA', state: 'now', ts: 'Today, 4:15 PM', detail: 'CAMS — processing' },
  { label: 'Units allotted (T+1)', state: 'pending', detail: 'Tomorrow @ NAV close' },
  { label: 'Folio updated', state: 'pending' },
];

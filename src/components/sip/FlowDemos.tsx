import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart, ArrowDownLeft, Repeat, RefreshCw, Target,
  ChevronRight, CheckCircle2, Clock, AlertTriangle, Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoFlow {
  id: string;
  title: string;
  description: string;
  icon: typeof ShoppingCart;
  color: string;
  steps: { label: string; status: 'done' | 'active' | 'pending' }[];
  tags: string[];
}

const DEMO_FLOWS: DemoFlow[] = [
  {
    id: 'buy-lumpsum', title: 'Lumpsum Purchase', description: 'One-time investment in a mutual fund',
    icon: ShoppingCart, color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
    steps: [
      { label: 'Select Fund', status: 'done' },
      { label: 'Enter Amount ₹50,000', status: 'done' },
      { label: 'Confirm & Pay', status: 'done' },
      { label: 'Order Placed ✓', status: 'done' },
    ],
    tags: ['Buy', 'Lumpsum'],
  },
  {
    id: 'start-sip', title: 'Start New SIP', description: 'Monthly systematic investment plan',
    icon: Repeat, color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
    steps: [
      { label: 'AI Recommends Fund', status: 'done' },
      { label: 'Set ₹5,000/mo, 5th of each month', status: 'done' },
      { label: 'Mandate via UPI Autopay', status: 'done' },
      { label: 'SIP Active ✓', status: 'done' },
    ],
    tags: ['SIP', 'Buy'],
  },
  {
    id: 'sell-partial', title: 'Partial Redemption', description: 'Sell part of your holdings',
    icon: ArrowDownLeft, color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
    steps: [
      { label: 'Select Fund from Portfolio', status: 'done' },
      { label: 'Choose Amount ₹25,000', status: 'done' },
      { label: 'Review Exit Load & Tax', status: 'done' },
      { label: 'Redeemed — ₹ credited in 2-3 days', status: 'done' },
    ],
    tags: ['Sell', 'Redeem'],
  },
  {
    id: 'sip-stepup', title: 'SIP Step-Up', description: 'Increase SIP by 10% annually',
    icon: Repeat, color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
    steps: [
      { label: 'AI detects underinvestment', status: 'done' },
      { label: 'Suggests 10% annual increase', status: 'done' },
      { label: 'User approves ₹5,000 → ₹5,500', status: 'done' },
      { label: 'Updated SIP Active ✓', status: 'done' },
    ],
    tags: ['SIP', 'Step-Up'],
  },
  {
    id: 'switch-fund', title: 'Fund Switch', description: 'Move from one fund to another',
    icon: RefreshCw, color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30',
    steps: [
      { label: 'AI flags underperformer', status: 'done' },
      { label: 'Suggests switch to better alternative', status: 'done' },
      { label: 'User confirms switch', status: 'done' },
      { label: 'Switch processed — T+1 settlement', status: 'done' },
    ],
    tags: ['Switch', 'Portfolio'],
  },
  {
    id: 'goal-invest', title: 'Goal-Based Investment', description: 'AI plans investment for a goal',
    icon: Target, color: 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30',
    steps: [
      { label: 'User says "Plan for child education"', status: 'done' },
      { label: 'AI calculates ₹15,000/mo for 10 years', status: 'done' },
      { label: 'Recommends 3-fund portfolio', status: 'done' },
      { label: 'All 3 SIPs started ✓', status: 'done' },
    ],
    tags: ['Goal', 'AI Planning'],
  },
];

export function FlowDemos() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <h3 className="text-base font-bold text-foreground">Transaction Flow Demos</h3>
        <p className="text-xs text-muted-foreground mt-1">See how agentic commerce handles every type of investment action</p>
      </div>

      <div className="space-y-2">
        {DEMO_FLOWS.map(demo => {
          const Icon = demo.icon;
          const isExpanded = expandedId === demo.id;
          return (
            <Card key={demo.id} className={cn('transition-all', isExpanded && 'ring-1 ring-primary/30')}>
              <button
                onClick={() => setExpandedId(isExpanded ? null : demo.id)}
                className="w-full text-left"
              >
                <CardContent className="p-3 flex items-center gap-3">
                  <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', demo.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-foreground">{demo.title}</p>
                    <p className="text-[10px] text-muted-foreground">{demo.description}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex gap-0.5">
                      {demo.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-[8px] h-4">{tag}</Badge>
                      ))}
                    </div>
                    <ChevronRight className={cn('w-4 h-4 text-muted-foreground transition-transform', isExpanded && 'rotate-90')} />
                  </div>
                </CardContent>
              </button>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0">
                  <div className="border-t border-border pt-3 space-y-2">
                    {demo.steps.map((step, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="flex flex-col items-center">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          {i < demo.steps.length - 1 && <div className="w-px h-4 bg-green-300 dark:bg-green-700" />}
                        </div>
                        <p className="text-xs text-foreground">{step.label}</p>
                      </div>
                    ))}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="text-xs h-7 gap-1">
                        <Play className="w-3 h-3" /> Replay Flow
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingCart, ArrowDownLeft, Repeat, RefreshCw, Target,
  ChevronRight, CheckCircle2, Circle, Loader2, Play, RotateCcw
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface DemoFlow {
  id: string;
  title: string;
  description: string;
  icon: typeof ShoppingCart;
  color: string;
  steps: string[];
  tags: string[];
}

const DEMO_FLOWS: DemoFlow[] = [
  {
    id: 'buy-lumpsum', title: 'Lumpsum Purchase', description: 'One-time investment in a mutual fund',
    icon: ShoppingCart, color: 'text-sip-action-success-foreground bg-sip-action-success-light',
    steps: ['Select Fund — HDFC Flexi Cap', 'Enter Amount ₹50,000', 'Confirm & Pay via UPI', 'Order Placed ✓'],
    tags: ['Buy', 'Lumpsum'],
  },
  {
    id: 'start-sip', title: 'Start New SIP', description: 'Monthly systematic investment plan',
    icon: Repeat, color: 'text-sip-action-info-foreground bg-sip-action-info-light',
    steps: ['AI Recommends Fund', 'Set ₹5,000/mo on 5th', 'Mandate via UPI Autopay', 'SIP Active ✓'],
    tags: ['SIP', 'Buy'],
  },
  {
    id: 'sell-partial', title: 'Partial Redemption', description: 'Sell part of your holdings',
    icon: ArrowDownLeft, color: 'text-sip-action-danger-foreground bg-sip-action-danger-light',
    steps: ['Select Fund from Portfolio', 'Choose Amount ₹25,000', 'Review Exit Load & Tax', 'Redeemed — ₹ credited in 2-3 days'],
    tags: ['Sell', 'Redeem'],
  },
  {
    id: 'sip-stepup', title: 'SIP Step-Up', description: 'Increase SIP by 10% annually',
    icon: Repeat, color: 'text-sip-category-5 bg-sip-category-5/10',
    steps: ['AI detects underinvestment', 'Suggests 10% annual increase', 'User approves ₹5,000 → ₹5,500', 'Updated SIP Active ✓'],
    tags: ['SIP', 'Step-Up'],
  },
  {
    id: 'switch-fund', title: 'Fund Switch', description: 'Move from one fund to another',
    icon: RefreshCw, color: 'text-sip-action-warning-foreground bg-sip-action-warning-light',
    steps: ['AI flags underperformer', 'Suggests better alternative', 'User confirms switch', 'Switch processed — T+1'],
    tags: ['Switch', 'Portfolio'],
  },
  {
    id: 'goal-invest', title: 'Goal-Based Investment', description: 'AI plans investment for a goal',
    icon: Target, color: 'text-sip-action-success-foreground bg-sip-action-success-light',
    steps: ['User: "Plan for child education"', 'AI calculates ₹15,000/mo for 10yr', 'Recommends 3-fund portfolio', 'All 3 SIPs started ✓'],
    tags: ['Goal', 'AI Planning'],
  },
];

const STEP_DELAY = 900;

export function FlowDemos() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  // activeStep: -1 = not started, 0..n-1 = animating at that step, n = complete
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  // Reset when collapsing
  useEffect(() => {
    if (!expandedId) {
      clearTimer();
      setActiveStep(-1);
      setIsRunning(false);
    }
  }, [expandedId]);

  const runFlow = useCallback((demo: DemoFlow) => {
    clearTimer();
    setActiveStep(0);
    setIsRunning(true);

    let step = 0;
    const advance = () => {
      step++;
      if (step < demo.steps.length) {
        setActiveStep(step);
        timerRef.current = setTimeout(advance, STEP_DELAY);
      } else {
        // All done
        setActiveStep(demo.steps.length);
        setIsRunning(false);
      }
    };
    timerRef.current = setTimeout(advance, STEP_DELAY);
  }, []);

  const resetFlow = () => {
    clearTimer();
    setActiveStep(-1);
    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center py-2">
        <h3 className="text-base font-bold text-foreground">Transaction Flow Demos</h3>
        <p className="text-xs text-muted-foreground mt-1">Run each flow to see how agentic commerce executes every action</p>
      </div>

      <div className="space-y-2">
        {DEMO_FLOWS.map(demo => {
          const Icon = demo.icon;
          const isExpanded = expandedId === demo.id;
          const totalSteps = demo.steps.length;
          const isComplete = isExpanded && activeStep >= totalSteps;
          const hasStarted = isExpanded && activeStep >= 0;

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
                  <div className="border-t border-border pt-3 space-y-0">
                    {demo.steps.map((step, i) => {
                      const isDone = hasStarted && i < activeStep;
                      const isCurrent = hasStarted && i === activeStep && !isComplete;
                      const isPending = !hasStarted || i > activeStep;

                      return (
                        <div key={i} className="flex items-stretch gap-2.5">
                          {/* Vertical line + icon */}
                          <div className="flex flex-col items-center w-5">
                            {isDone ? (
                              <CheckCircle2 className="w-4 h-4 text-sip-action-success shrink-0 animate-in fade-in zoom-in duration-300" />
                            ) : isCurrent ? (
                              <Loader2 className="w-4 h-4 text-primary shrink-0 animate-spin" />
                            ) : (
                              <Circle className="w-4 h-4 text-muted-foreground/30 shrink-0" />
                            )}
                            {i < totalSteps - 1 && (
                              <div className={cn(
                                'w-px flex-1 min-h-[16px] transition-colors duration-300',
                                isDone ? 'bg-sip-action-success' : 'bg-border'
                              )} />
                            )}
                          </div>
                          {/* Label */}
                          <p className={cn(
                            'text-xs pb-3 transition-colors duration-300',
                            isDone ? 'text-foreground font-medium' :
                            isCurrent ? 'text-primary font-semibold' :
                            'text-muted-foreground/50'
                          )}>
                            {step}
                          </p>
                        </div>
                      );
                    })}

                    {/* Action buttons */}
                    <div className="flex gap-2 pt-1">
                      {!hasStarted && (
                        <Button
                          size="sm"
                          className="text-xs h-7 gap-1"
                          onClick={() => runFlow(demo)}
                        >
                          <Play className="w-3 h-3" /> Run Flow
                        </Button>
                      )}
                      {isRunning && (
                        <Badge variant="outline" className="text-[10px] h-6 gap-1 text-primary border-primary/30 animate-pulse">
                          <Loader2 className="w-3 h-3 animate-spin" /> Running…
                        </Badge>
                      )}
                      {isComplete && (
                        <>
                          <Badge className="text-[10px] h-6 gap-1 bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400 border-0">
                            <CheckCircle2 className="w-3 h-3" /> Complete
                          </Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-xs h-7 gap-1 text-muted-foreground"
                            onClick={resetFlow}
                          >
                            <RotateCcw className="w-3 h-3" /> Reset
                          </Button>
                        </>
                      )}
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

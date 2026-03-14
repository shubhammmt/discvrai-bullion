import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, TrendingUp, Heart, GraduationCap, Home, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GoalData {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlySIP: number;
  targetDate: string;
  category: string;
}

const SAMPLE_GOALS: GoalData[] = [
  { id: '1', name: 'Marriage Celebration', targetAmount: 10000000, currentAmount: 280000, monthlySIP: 29494, targetDate: 'Dec 2028', category: 'Wedding' },
  { id: '2', name: "Child's Education", targetAmount: 5000000, currentAmount: 120000, monthlySIP: 15000, targetDate: 'Jun 2032', category: 'Education' },
  { id: '3', name: 'Emergency Fund', targetAmount: 500000, currentAmount: 320000, monthlySIP: 5000, targetDate: 'Dec 2026', category: 'Emergency' },
];

const categoryIcons: Record<string, typeof Target> = {
  Wedding: Heart,
  Education: GraduationCap,
  Home: Home,
  Emergency: Target,
  Retirement: Sparkles,
};

const categoryColors: Record<string, string> = {
  Wedding: 'from-pink-500 to-rose-500',
  Education: 'from-blue-500 to-indigo-500',
  Home: 'from-emerald-500 to-teal-500',
  Emergency: 'from-amber-500 to-orange-500',
  Retirement: 'from-purple-500 to-violet-500',
};

export function GoalsWidget({ compact = false, onCreateGoal, onViewGoals }: {
  compact?: boolean;
  onCreateGoal?: () => void;
  onViewGoals?: () => void;
}) {
  const [goals] = useState<GoalData[]>(SAMPLE_GOALS);

  const totalMonthlyGap = goals.reduce((sum, g) => sum + g.monthlySIP, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" />
            Financial Goals
          </span>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">{goals.length} Active</Badge>
            {onCreateGoal && (
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={onCreateGoal}>
                <Plus className="w-3 h-3 mr-1" /> New
              </Button>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {/* Summary Cards */}
        {!compact && (
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="rounded-xl bg-primary p-3 text-primary-foreground">
              <p className="text-[10px] uppercase tracking-wider opacity-80">Monthly Investment Gap</p>
              <p className="text-xl font-bold mt-1">₹{totalMonthlyGap.toLocaleString()}</p>
              <p className="text-[10px] opacity-70 mt-0.5">Combined SIP required to meet all goals</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Target</p>
              <p className="text-xl font-bold text-foreground mt-1">₹{(totalTarget / 10000000).toFixed(1)} Cr</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">Across all active goals</p>
            </div>
          </div>
        )}

        {/* Goal cards */}
        {goals.map(goal => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100;
          const Icon = categoryIcons[goal.category] || Target;
          const gradient = categoryColors[goal.category] || 'from-primary to-primary';

          return (
            <div key={goal.id} className="rounded-lg border border-border p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={cn('w-7 h-7 rounded-full bg-gradient-to-br flex items-center justify-center', gradient)}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{goal.name}</p>
                    <p className="text-[10px] text-muted-foreground">Target: ₹{goal.targetAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted-foreground uppercase">Required SIP</p>
                  <p className="text-sm font-bold text-primary">₹{goal.monthlySIP.toLocaleString()}</p>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>{progress.toFixed(0)}% achieved</span>
                  <span>by {goal.targetDate}</span>
                </div>
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>
          );
        })}

        {onViewGoals && (
          <Button variant="ghost" className="w-full text-xs text-primary" onClick={onViewGoals}>
            View All Goals <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

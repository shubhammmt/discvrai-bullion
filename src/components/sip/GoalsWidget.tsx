import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Target, Plus, TrendingUp, Heart, GraduationCap, Home, Sparkles, ArrowRight, Edit, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { SIP_CATEGORY_MAP } from '@/config/sipBrandConfig';

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

const CATEGORIES = ['Wedding', 'Education', 'Home', 'Emergency', 'Retirement'];

interface GoalFormData {
  name: string;
  targetAmount: string;
  currentAmount: string;
  monthlySIP: string;
  targetDate: string;
  category: string;
}

const emptyForm: GoalFormData = { name: '', targetAmount: '', currentAmount: '0', monthlySIP: '', targetDate: '', category: 'Emergency' };

export function GoalsWidget({ compact = false, onCreateGoal, onViewGoals }: {
  compact?: boolean;
  onCreateGoal?: () => void;
  onViewGoals?: () => void;
}) {
  const [goals, setGoals] = useState<GoalData[]>(SAMPLE_GOALS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<GoalData | null>(null);
  const [form, setForm] = useState<GoalFormData>(emptyForm);

  const totalMonthlyGap = goals.reduce((sum, g) => sum + g.monthlySIP, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);

  const openAdd = () => { setEditingGoal(null); setForm(emptyForm); setDialogOpen(true); };
  const openEdit = (goal: GoalData) => {
    setEditingGoal(goal);
    setForm({ name: goal.name, targetAmount: goal.targetAmount.toString(), currentAmount: goal.currentAmount.toString(), monthlySIP: goal.monthlySIP.toString(), targetDate: goal.targetDate, category: goal.category });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.targetAmount || !form.targetDate) { toast.error('Please fill all required fields'); return; }
    const goalData: GoalData = { id: editingGoal?.id || Date.now().toString(), name: form.name, targetAmount: Number(form.targetAmount), currentAmount: Number(form.currentAmount) || 0, monthlySIP: Number(form.monthlySIP) || 0, targetDate: form.targetDate, category: form.category };
    if (editingGoal) { setGoals(prev => prev.map(g => g.id === editingGoal.id ? goalData : g)); toast.success('Goal updated'); }
    else { setGoals(prev => [...prev, goalData]); toast.success('Goal created'); }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => { setGoals(prev => prev.filter(g => g.id !== id)); toast.success('Goal removed'); };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Target className="w-4 h-4 text-sip-brand" />
              Financial Goals
            </span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-[10px]">{goals.length} Active</Badge>
              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={openAdd}>
                <Plus className="w-3 h-3 mr-1" /> New Goal
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          {!compact && (
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="rounded-xl bg-sip-brand p-3 text-sip-brand-foreground">
                <p className="text-[10px] uppercase tracking-wider opacity-80">Monthly Investment Gap</p>
                <p className="text-xl font-bold mt-1">₹{totalMonthlyGap.toLocaleString()}</p>
                <p className="text-[10px] opacity-70 mt-0.5">Combined SIP required</p>
              </div>
              <div className="rounded-xl border border-border bg-muted/30 p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total Target</p>
                <p className="text-xl font-bold text-foreground mt-1">₹{(totalTarget / 10000000).toFixed(1)} Cr</p>
                <p className="text-[10px] text-muted-foreground mt-0.5">Across all active goals</p>
              </div>
            </div>
          )}

          {goals.map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const Icon = categoryIcons[goal.category] || Target;
            const colorToken = SIP_CATEGORY_MAP[goal.category] || 'sip-brand';

            return (
              <div key={goal.id} className="rounded-lg border border-border p-3 space-y-2 group">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn('w-7 h-7 rounded-full flex items-center justify-center')}
                      style={{ backgroundColor: `hsl(var(--${colorToken}))` }}>
                      <Icon className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{goal.name}</p>
                      <p className="text-[10px] text-muted-foreground">Target: ₹{goal.targetAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => openEdit(goal)}>
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity text-destructive" onClick={() => handleDelete(goal.id)}>
                      <Trash2 className="w-3 h-3" />
                    </Button>
                    <div className="text-right pl-1">
                      <p className="text-[10px] text-muted-foreground uppercase">Required SIP</p>
                      <p className="text-sm font-bold text-sip-brand">₹{goal.monthlySIP.toLocaleString()}</p>
                    </div>
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

          {goals.length === 0 && (
            <div className="text-center py-8">
              <Target className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No goals yet. Create your first financial goal.</p>
              <Button size="sm" className="mt-3" onClick={openAdd}>
                <Plus className="w-3 h-3 mr-1" /> Create Goal
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>{editingGoal ? 'Edit Goal' : 'New Financial Goal'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Goal Name *</Label>
              <Input placeholder="e.g. Retirement Fund" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Target Amount (₹) *</Label>
                <Input type="number" placeholder="1000000" value={form.targetAmount} onChange={e => setForm(f => ({ ...f, targetAmount: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Current Savings (₹)</Label>
                <Input type="number" placeholder="0" value={form.currentAmount} onChange={e => setForm(f => ({ ...f, currentAmount: e.target.value }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Monthly SIP (₹)</Label>
                <Input type="number" placeholder="5000" value={form.monthlySIP} onChange={e => setForm(f => ({ ...f, monthlySIP: e.target.value }))} />
              </div>
              <div className="space-y-2">
                <Label>Target Date *</Label>
                <Input placeholder="e.g. Dec 2030" value={form.targetDate} onChange={e => setForm(f => ({ ...f, targetDate: e.target.value }))} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingGoal ? 'Update Goal' : 'Create Goal'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

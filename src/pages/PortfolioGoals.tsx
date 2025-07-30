import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Target, Plus, Edit, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import GoalsEntryForm from '@/components/portfolio/GoalsEntryForm';

interface Goal {
  id: string;
  type: string;
  targetAmount: number;
  timeframe: number;
  currentAmount?: number;
  progress?: number;
}

const PortfolioGoals = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      type: 'emergency',
      targetAmount: 500000,
      timeframe: 1,
      currentAmount: 125000,
      progress: 25
    },
    {
      id: '2', 
      type: 'home',
      targetAmount: 2000000,
      timeframe: 5,
      currentAmount: 800000,
      progress: 40
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const handleGoalAdded = (newGoal: Goal) => {
    const goalWithId = {
      ...newGoal,
      id: Date.now().toString(),
      currentAmount: 0,
      progress: 0
    };
    setGoals(prev => [...prev, goalWithId]);
    setShowAddForm(false);
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getGoalTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      emergency: 'Emergency Fund',
      retirement: 'Retirement',
      home: 'Home Purchase',
      car: 'Car Purchase',
      education: 'Education/Child Future',
      vacation: 'Travel/Vacation',
      wedding: 'Wedding',
      other: 'Other Goal'
    };
    return labels[type] || type;
  };

  const getPriorityColor = (timeframe: number) => {
    if (timeframe <= 2) return 'destructive';
    if (timeframe <= 5) return 'secondary';
    return 'outline';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => navigate('/portfolio-home')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-foreground">Financial Goals</h1>
              <p className="text-sm text-muted-foreground">Track and manage your savings goals</p>
            </div>
          </div>
          
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-6 space-y-6">
        
        {/* Add Goal Form */}
        {showAddForm && (
          <div className="space-y-4">
            <GoalsEntryForm onGoalAdded={handleGoalAdded} />
            <Button variant="outline" onClick={() => setShowAddForm(false)}>
              Cancel
            </Button>
          </div>
        )}

        {/* Goals Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <p className="text-2xl font-bold">{goals.length}</p>
                <p className="text-sm text-muted-foreground">Active Goals</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(goals.reduce((sum, goal) => sum + (goal.currentAmount || 0), 0))}
                </p>
                <p className="text-sm text-muted-foreground">Total Saved</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(goals.reduce((sum, goal) => sum + goal.targetAmount, 0))}
                </p>
                <p className="text-sm text-muted-foreground">Total Target</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No Goals Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by adding your first financial goal to track your progress
                </p>
                <Button onClick={() => setShowAddForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Goal
                </Button>
              </CardContent>
            </Card>
          ) : (
            goals.map((goal) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-blue-600" />
                      {getGoalTypeLabel(goal.type)}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant={getPriorityColor(goal.timeframe)}>
                        {goal.timeframe} year{goal.timeframe > 1 ? 's' : ''}
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Progress</p>
                        <p className="text-lg font-semibold">
                          {formatCurrency(goal.currentAmount || 0)} / {formatCurrency(goal.targetAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Completion</p>
                        <p className="text-lg font-semibold">{goal.progress || 0}%</p>
                      </div>
                    </div>
                    
                    <Progress value={goal.progress || 0} className="h-2" />
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Monthly SIP needed</p>
                        <p className="font-medium">
                          {formatCurrency(Math.ceil((goal.targetAmount - (goal.currentAmount || 0)) / (goal.timeframe * 12)))}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Remaining amount</p>
                        <p className="font-medium">
                          {formatCurrency(goal.targetAmount - (goal.currentAmount || 0))}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PortfolioGoals;
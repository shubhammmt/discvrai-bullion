
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X, Target } from 'lucide-react';

interface GoalsStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const GoalsStep = ({ data, onDataChange }: GoalsStepProps) => {
  const [newGoal, setNewGoal] = useState({ type: '', targetAmount: 0, timeframe: 0 });

  const goalTypes = [
    'Emergency Fund',
    'House Purchase',
    'Car Purchase',
    'Retirement',
    'Child Education',
    'Vacation',
    'Debt Payoff',
    'Wedding',
    'Business Investment',
    'Other'
  ];

  const timeframeOptions = [
    { value: 1, label: '1 Year' },
    { value: 2, label: '2 Years' },
    { value: 3, label: '3-5 Years' },
    { value: 5, label: '5-10 Years' },
    { value: 10, label: '10+ Years' }
  ];

  const addGoal = () => {
    if (newGoal.type && newGoal.targetAmount > 0 && newGoal.timeframe > 0) {
      const updatedGoals = [...(data.goals || []), newGoal];
      onDataChange({ goals: updatedGoals });
      setNewGoal({ type: '', targetAmount: 0, timeframe: 0 });
    }
  };

  const removeGoal = (index: number) => {
    const updatedGoals = data.goals.filter((_: any, i: number) => i !== index);
    onDataChange({ goals: updatedGoals });
  };

  const handleSkip = () => {
    onDataChange({ goals: [] });
  };

  const quickGoals = [
    { type: 'Emergency Fund', amount: 300000, timeframe: 1 },
    { type: 'House Purchase', amount: 2500000, timeframe: 5 },
    { type: 'Retirement', amount: 10000000, timeframe: 10 }
  ];

  const addQuickGoal = (goal: any) => {
    const updatedGoals = [...(data.goals || []), {
      type: goal.type,
      targetAmount: goal.amount,
      timeframe: goal.timeframe
    }];
    onDataChange({ goals: updatedGoals });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          What are your financial goals? This helps us provide better recommendations.
        </p>
      </div>

      {/* Quick Goals */}
      <div className="space-y-3">
        <Label className="text-sm font-medium text-gray-700">Popular Goals</Label>
        <div className="grid grid-cols-1 gap-2">
          {quickGoals.map((goal, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={() => addQuickGoal(goal)}
              className="justify-between h-auto p-3"
              disabled={data.goals?.some((g: any) => g.type === goal.type)}
            >
              <div className="text-left">
                <div className="font-medium">{goal.type}</div>
                <div className="text-xs text-gray-600">
                  ₹{goal.amount.toLocaleString('en-IN')} in {goal.timeframe} years
                </div>
              </div>
              <Plus size={16} />
            </Button>
          ))}
        </div>
      </div>

      {/* Current Goals */}
      {data.goals && data.goals.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Your Goals</Label>
          {data.goals.map((goal: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-blue-50 rounded border">
              <div className="flex items-center gap-2">
                <Target size={16} className="text-blue-600" />
                <div>
                  <span className="font-medium">{goal.type}</span>
                  <div className="text-sm text-gray-600">
                    ₹{goal.targetAmount.toLocaleString('en-IN')} in {goal.timeframe} years
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeGoal(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add Custom Goal */}
      <div className="space-y-4 border-t pt-4">
        <Label className="text-sm font-medium text-gray-700">Add Custom Goal</Label>
        
        <div className="space-y-3">
          <Select value={newGoal.type} onValueChange={(value) => setNewGoal({...newGoal, type: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Goal Type" />
            </SelectTrigger>
            <SelectContent>
              {goalTypes.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Target Amount (₹)"
              value={newGoal.targetAmount || ''}
              onChange={(e) => setNewGoal({...newGoal, targetAmount: parseInt(e.target.value) || 0})}
            />
            
            <Select value={newGoal.timeframe.toString()} onValueChange={(value) => setNewGoal({...newGoal, timeframe: parseInt(value)})}>
              <SelectTrigger>
                <SelectValue placeholder="Timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={addGoal}
          disabled={!newGoal.type || newGoal.targetAmount <= 0 || newGoal.timeframe <= 0}
          className="w-full flex items-center gap-2"
          variant="outline"
        >
          <Plus size={16} />
          Add Goal
        </Button>
      </div>

      <div className="text-center">
        <Button variant="ghost" onClick={handleSkip} className="text-gray-500">
          Skip this step
        </Button>
      </div>
    </div>
  );
};

export default GoalsStep;

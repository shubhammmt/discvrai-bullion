
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Goal {
  type: string;
  targetAmount: number;
  timeframe: number;
}

interface GoalsEntryFormProps {
  onGoalAdded: (goal: Goal) => void;
}

const GoalsEntryForm: React.FC<GoalsEntryFormProps> = ({ onGoalAdded }) => {
  const [goalType, setGoalType] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [timeframe, setTimeframe] = useState('');
  const { toast } = useToast();

  const goalTypes = [
    { value: 'emergency', label: 'Emergency Fund' },
    { value: 'retirement', label: 'Retirement' },
    { value: 'home', label: 'Home Purchase' },
    { value: 'car', label: 'Car Purchase' },
    { value: 'education', label: 'Education/Child Future' },
    { value: 'vacation', label: 'Travel/Vacation' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'other', label: 'Other Goal' }
  ];

  const timeframes = [
    { value: '1', label: '1 Year' },
    { value: '2', label: '2 Years' },
    { value: '3', label: '3 Years' },
    { value: '5', label: '5 Years' },
    { value: '10', label: '10 Years' },
    { value: '15', label: '15 Years' },
    { value: '20', label: '20+ Years' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!goalType || !targetAmount || !timeframe) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newGoal: Goal = {
      type: goalType,
      targetAmount: parseFloat(targetAmount),
      timeframe: parseInt(timeframe)
    };

    onGoalAdded(newGoal);
    
    // Reset form
    setGoalType('');
    setTargetAmount('');
    setTimeframe('');
    
    toast({
      title: "Goal Added",
      description: `${goalTypes.find(g => g.value === goalType)?.label} goal added successfully.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5" />
          Your Financial Goals
        </CardTitle>
        <p className="text-sm text-gray-600">What are you saving for? We'll help you get there.</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Goal Type</Label>
              <Select value={goalType} onValueChange={setGoalType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select goal" />
                </SelectTrigger>
                <SelectContent>
                  {goalTypes.map((goal) => (
                    <SelectItem key={goal.value} value={goal.value}>
                      {goal.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Target Amount (₹)</Label>
              <Input
                type="number"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                placeholder="1000000"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Time Frame</Label>
              <Select value={timeframe} onValueChange={setTimeframe}>
                <SelectTrigger>
                  <SelectValue placeholder="When?" />
                </SelectTrigger>
                <SelectContent>
                  {timeframes.map((time) => (
                    <SelectItem key={time.value} value={time.value}>
                      {time.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalsEntryForm;

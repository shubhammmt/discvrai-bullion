
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Expense {
  category: string;
  monthlyAmount: number;
}

interface ExpensesEntryFormProps {
  onExpenseAdded: (expense: Expense) => void;
}

const ExpensesEntryForm: React.FC<ExpensesEntryFormProps> = ({ onExpenseAdded }) => {
  const [category, setCategory] = useState('');
  const [monthlyAmount, setMonthlyAmount] = useState('');
  const { toast } = useToast();

  const expenseCategories = [
    { value: 'housing', label: 'Housing (Rent/EMI)' },
    { value: 'food', label: 'Food & Groceries' },
    { value: 'transport', label: 'Transportation' },
    { value: 'utilities', label: 'Utilities (Bills)' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'shopping', label: 'Shopping/Personal' },
    { value: 'insurance', label: 'Insurance Premiums' },
    { value: 'debt', label: 'Debt/EMIs' },
    { value: 'other', label: 'Other Expenses' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !monthlyAmount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    const newExpense: Expense = {
      category,
      monthlyAmount: parseFloat(monthlyAmount)
    };

    onExpenseAdded(newExpense);
    
    // Reset form
    setCategory('');
    setMonthlyAmount('');
    
    toast({
      title: "Expense Added",
      description: `${expenseCategories.find(e => e.value === category)?.label} expense added.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Receipt className="w-5 h-5" />
          Monthly Expenses
        </CardTitle>
        <p className="text-sm text-gray-600">Help us understand your spending pattern</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Expense Category</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((exp) => (
                    <SelectItem key={exp.value} value={exp.value}>
                      {exp.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Monthly Amount (₹)</Label>
              <Input
                type="number"
                value={monthlyAmount}
                onChange={(e) => setMonthlyAmount(e.target.value)}
                placeholder="25000"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Expense
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpensesEntryForm;

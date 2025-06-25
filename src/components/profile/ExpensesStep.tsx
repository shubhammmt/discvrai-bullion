
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

interface ExpensesStepProps {
  data: any;
  onDataChange: (data: any) => void;
}

const ExpensesStep = ({ data, onDataChange }: ExpensesStepProps) => {
  const [newExpense, setNewExpense] = useState({ category: '', amount: 0 });

  const expenseCategories = [
    'Housing (Rent/EMI)',
    'Food & Groceries',
    'Transportation',
    'Utilities',
    'Insurance',
    'Education',
    'Entertainment',
    'Healthcare',
    'Personal Care',
    'Other EMIs',
    'Other'
  ];

  const addExpense = () => {
    if (newExpense.category && newExpense.amount > 0) {
      const updatedExpenses = [...(data.expenses || []), newExpense];
      onDataChange({ expenses: updatedExpenses });
      setNewExpense({ category: '', amount: 0 });
    }
  };

  const removeExpense = (index: number) => {
    const updatedExpenses = data.expenses.filter((_: any, i: number) => i !== index);
    onDataChange({ expenses: updatedExpenses });
  };

  const handleSkip = () => {
    onDataChange({ expenses: [] });
  };

  const totalExpenses = data.expenses?.reduce((sum: number, exp: any) => sum + exp.amount, 0) || 0;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <p className="text-gray-600">
          Add your monthly expenses to better understand your financial situation
        </p>
      </div>

      {/* Current Expenses */}
      {data.expenses && data.expenses.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-sm font-medium text-gray-700">Monthly Expenses</Label>
            <span className="text-sm font-semibold text-gray-900">
              Total: ₹{totalExpenses.toLocaleString('en-IN')}
            </span>
          </div>
          {data.expenses.map((expense: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <span className="font-medium">{expense.category}</span>
                <span className="text-gray-600 ml-2">₹{expense.amount.toLocaleString('en-IN')}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExpense(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Add New Expense */}
      <div className="space-y-4 border-t pt-4">
        <Label className="text-sm font-medium text-gray-700">Add Expense Category</Label>
        
        <div className="grid grid-cols-2 gap-3">
          <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Expense Category" />
            </SelectTrigger>
            <SelectContent>
              {expenseCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Input
            type="number"
            placeholder="Monthly Amount (₹)"
            value={newExpense.amount || ''}
            onChange={(e) => setNewExpense({...newExpense, amount: parseInt(e.target.value) || 0})}
          />
        </div>

        <Button
          onClick={addExpense}
          disabled={!newExpense.category || newExpense.amount <= 0}
          className="w-full flex items-center gap-2"
          variant="outline"
        >
          <Plus size={16} />
          Add Expense
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

export default ExpensesStep;

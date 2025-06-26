
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
    'Housing (Rent/EMI)', 'Food & Groceries', 'Transportation', 'Utilities', 'Insurance',
    'Education', 'Entertainment', 'Healthcare', 'Personal Care', 'Other EMIs', 'Other'
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
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <p className="text-gray-600 text-lg">
          Add your monthly expenses to better understand your financial situation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Current Expenses */}
        <div className="space-y-6">
          {data.expenses && data.expenses.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <Label className="text-lg font-medium text-gray-700">Monthly Expenses</Label>
                <span className="text-lg font-semibold text-gray-900 bg-gray-100 px-3 py-1 rounded">
                  Total: ₹{totalExpenses.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {data.expenses.map((expense: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium text-base">{expense.category}</span>
                      <span className="text-gray-600 ml-3 text-lg">₹{expense.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExpense(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X size={18} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
          
          {(!data.expenses || data.expenses.length === 0) && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">No expenses added yet</p>
              <p className="text-sm">Start by adding your major expense categories</p>
            </div>
          )}
        </div>

        {/* Right Side - Add New Expense */}
        <div className="space-y-6">
          <Label className="text-lg font-medium text-gray-700">Add Expense Category</Label>
          
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-gray-600">Expense Category</Label>
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-sm font-medium text-gray-600">Monthly Amount (₹)</Label>
              <Input
                type="number"
                placeholder="e.g., 25000"
                value={newExpense.amount || ''}
                onChange={(e) => setNewExpense({...newExpense, amount: parseInt(e.target.value) || 0})}
                className="h-12 text-lg"
              />
            </div>

            <Button
              onClick={addExpense}
              disabled={!newExpense.category || newExpense.amount <= 0}
              className="w-full h-12 flex items-center gap-2 text-base"
              variant="outline"
            >
              <Plus size={18} />
              Add Expense
            </Button>
            
            <div className="pt-4">
              <Button variant="ghost" onClick={handleSkip} className="w-full text-gray-500">
                Skip this step
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesStep;

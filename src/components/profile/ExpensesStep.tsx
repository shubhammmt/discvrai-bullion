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
    <div className="h-full flex flex-col">
      <div className="text-center mb-3">
        <p className="text-gray-600 text-sm">
          Add your monthly expenses to better understand your financial situation
        </p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        {/* Left Side - Current Expenses */}
        <div className="flex flex-col min-h-0">
          {data.expenses && data.expenses.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-sm font-medium text-gray-700">Monthly Expenses</Label>
                <span className="text-sm font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded text-xs">
                  Total: ₹{totalExpenses.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex-1 space-y-2 overflow-y-auto min-h-0">
                {data.expenses.map((expense: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                    <div>
                      <span className="font-medium">{expense.category}</span>
                      <span className="text-gray-600 ml-2">₹{expense.amount.toLocaleString('en-IN')}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExpense(index)}
                      className="text-red-600 hover:text-red-800 h-6 w-6 p-0"
                    >
                      <X size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-center text-gray-500">
              <div>
                <p className="text-sm">No expenses added yet</p>
                <p className="text-xs">Start by adding your major expense categories</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Side - Add New Expense */}
        <div className="flex flex-col">
          <Label className="text-sm font-medium text-gray-700 mb-2">Add Expense Category</Label>
          
          <div className="space-y-3 flex-1">
            <div>
              <Label className="text-xs font-medium text-gray-600">Expense Category</Label>
              <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((category) => (
                    <SelectItem key={category} value={category} className="text-sm">{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-gray-600">Monthly Amount (₹)</Label>
              <Input
                type="number"
                placeholder="e.g., 25000"
                value={newExpense.amount || ''}
                onChange={(e) => setNewExpense({...newExpense, amount: parseInt(e.target.value) || 0})}
                className="h-8 text-sm"
              />
            </div>

            <Button
              onClick={addExpense}
              disabled={!newExpense.category || newExpense.amount <= 0}
              className="w-full h-8 flex items-center gap-1 text-sm"
              variant="outline"
            >
              <Plus size={14} />
              Add Expense
            </Button>
            
            <Button variant="ghost" onClick={handleSkip} className="w-full text-gray-500 h-7 text-xs">
              Skip this step
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesStep;

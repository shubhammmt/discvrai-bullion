import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain, Shield, Target, TrendingUp, Heart, DollarSign } from 'lucide-react';

interface Asset {
  type: string;
  name: string;
  currentValue: number;
}

interface Goal {
  type: string;
  targetAmount: number;
  timeframe: number;
}

interface Expense {
  category: string;
  monthlyAmount: number;
}

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    investmentAmount: '',
    riskTolerance: '',
    investmentHorizon: '',
    investmentAreas: [] as string[],
    learningMode: '',
    assets: [] as Asset[],
    financialGoals: [] as Goal[],
    expenses: [] as Expense[]
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  useEffect(() => {
    const existingProfile = localStorage.getItem('userProfile');
    if (existingProfile && window.location.search.includes('edit=true')) {
      setIsEditMode(true);
      const profile = JSON.parse(existingProfile);
      const assets = JSON.parse(localStorage.getItem('portfolioAssets') || '[]');
      const goals = JSON.parse(localStorage.getItem('portfolioGoals') || '[]');
      const expenses = JSON.parse(localStorage.getItem('portfolioExpenses') || '[]');
      
      setFormData(prev => ({
        ...prev,
        age: profile.age || '',
        income: profile.income || '',
        investmentAmount: profile.investmentAmount || '',
        riskTolerance: profile.riskTolerance || '',
        investmentHorizon: profile.investmentHorizon || '',
        investmentAreas: profile.investmentAreas || [],
        learningMode: profile.learningMode || '',
        assets,
        financialGoals: goals,
        expenses
      }));
    }
  }, []);

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save all data to localStorage
      localStorage.setItem('userProfile', JSON.stringify({
        age: formData.age,
        income: formData.income,
        investmentAmount: formData.investmentAmount,
        riskTolerance: formData.riskTolerance,
        investmentHorizon: formData.investmentHorizon,
        investmentAreas: formData.investmentAreas,
        learningMode: formData.learningMode
      }));
      localStorage.setItem('portfolioAssets', JSON.stringify(formData.assets));
      localStorage.setItem('portfolioGoals', JSON.stringify(formData.financialGoals));
      localStorage.setItem('portfolioExpenses', JSON.stringify(formData.expenses));
      
      if (isEditMode) {
        navigate('/portfolio/analysis');
      } else {
        navigate('/feed');
      }
    }
  };

  const handleInvestmentAreaToggle = (area: string) => {
    setFormData(prev => ({
      ...prev,
      investmentAreas: prev.investmentAreas.includes(area)
        ? prev.investmentAreas.filter(i => i !== area)
        : [...prev.investmentAreas, area]
    }));
  };

  const addAsset = (type: string, name: string, value: number) => {
    if (name && value > 0) {
      setFormData(prev => ({
        ...prev,
        assets: [...prev.assets, { type, name, currentValue: value }]
      }));
    }
  };

  const addGoal = (type: string, amount: number, timeframe: number) => {
    if (type && amount > 0 && timeframe > 0) {
      setFormData(prev => ({
        ...prev,
        financialGoals: [...prev.financialGoals, { type, targetAmount: amount, timeframe }]
      }));
    }
  };

  const addExpense = (category: string, amount: number) => {
    if (category && amount > 0) {
      setFormData(prev => ({
        ...prev,
        expenses: [...prev.expenses, { category, monthlyAmount: amount }]
      }));
    }
  };

  const removeAsset = (index: number) => {
    setFormData(prev => ({
      ...prev,
      assets: prev.assets.filter((_, i) => i !== index)
    }));
  };

  const removeGoal = (index: number) => {
    setFormData(prev => ({
      ...prev,
      financialGoals: prev.financialGoals.filter((_, i) => i !== index)
    }));
  };

  const removeExpense = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expenses: prev.expenses.filter((_, i) => i !== index)
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Personal Profile</h2>
              <p className="text-gray-600 text-sm">Tell us about yourself to create your personalized experience</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="age" className="text-sm font-medium">Your Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="e.g., 28"
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="income" className="text-sm font-medium">Monthly Income (₹)</Label>
                <Input
                  id="income"
                  type="number"
                  value={formData.income}
                  onChange={(e) => setFormData(prev => ({ ...prev, income: e.target.value }))}
                  placeholder="e.g., 50,000"
                  className="h-12"
                />
              </div>
              <div>
                <Label htmlFor="amount" className="text-sm font-medium">How much do you want to start investing? (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.investmentAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, investmentAmount: e.target.value }))}
                  placeholder="e.g., 5,000"
                  className="h-12"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Investment Preferences</h2>
              <p className="text-gray-600 text-sm">Help us understand your investment style and interests</p>
            </div>
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium">How do you feel about investment risk?</Label>
                <div className="grid grid-cols-1 gap-3 mt-3">
                  {[
                    { key: 'Conservative', label: 'Play it safe', desc: 'Stable returns, lower risk' },
                    { key: 'Moderate', label: 'Balanced approach', desc: 'Mix of safety and growth' },
                    { key: 'Aggressive', label: 'Go for growth', desc: 'Higher potential, more risk' }
                  ].map((risk) => (
                    <Button
                      key={risk.key}
                      variant={formData.riskTolerance === risk.key ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, riskTolerance: risk.key }))}
                      className="h-16 text-left justify-start p-4"
                    >
                      <div>
                        <div className="font-medium">{risk.label}</div>
                        <div className="text-xs opacity-70">{risk.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
              
              <div>
                <Label className="text-sm font-medium">Investment Timeline</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {[
                    'Short-term (1-3 years)', 
                    'Medium-term (3-7 years)', 
                    'Long-term (7+ years)', 
                    'Mixed timeline'
                  ].map((horizon) => (
                    <Button
                      key={horizon}
                      variant={formData.investmentHorizon === horizon ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, investmentHorizon: horizon }))}
                      className="h-12 text-xs"
                    >
                      {horizon}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Investment Areas of Interest (select multiple)</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {[
                    { key: 'Mutual Funds', desc: 'Diversified portfolios' },
                    { key: 'ETFs', desc: 'Exchange traded funds' },
                    { key: 'Stocks', desc: 'Individual companies' },
                    { key: 'IPOs', desc: 'New public offerings' },
                    { key: 'Bonds', desc: 'Fixed income securities' },
                    { key: 'Insurance', desc: 'Life & health coverage' },
                    { key: 'Gold', desc: 'Precious metals' },
                    { key: 'Real Estate', desc: 'Property investments' }
                  ].map((area) => (
                    <Button
                      key={area.key}
                      variant={formData.investmentAreas.includes(area.key) ? 'default' : 'outline'}
                      onClick={() => handleInvestmentAreaToggle(area.key)}
                      className="h-16 text-left justify-start p-3"
                    >
                      <div>
                        <div className="font-medium text-sm">{area.key}</div>
                        <div className="text-xs opacity-70">{area.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Preferences</h2>
              <p className="text-gray-600 text-sm">How would you like to receive investment insights and education?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Choose your preferred learning style</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {[
                    { key: 'Visual Charts', desc: 'Graphs and visual data' },
                    { key: 'Detailed Analysis', desc: 'In-depth explanations' },
                    { key: 'Quick Summaries', desc: 'Key points only' },
                    { key: 'Video Content', desc: 'Video explanations' }
                  ].map((mode) => (
                    <Button
                      key={mode.key}
                      variant={formData.learningMode === mode.key ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, learningMode: mode.key }))}
                      className="h-16 text-left justify-start p-3"
                    >
                      <div>
                        <div className="font-medium text-sm">{mode.key}</div>
                        <div className="text-xs opacity-70">{mode.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <AssetEntryStep 
            assets={formData.assets}
            onAddAsset={addAsset}
            onRemoveAsset={removeAsset}
          />
        );

      case 5:
        return (
          <GoalsEntryStep 
            goals={formData.financialGoals}
            onAddGoal={addGoal}
            onRemoveGoal={removeGoal}
          />
        );

      case 6:
        return (
          <ExpensesEntryStep 
            expenses={formData.expenses}
            onAddExpense={addExpense}
            onRemoveExpense={removeExpense}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              discvr.ai
            </h1>
          </div>
          {isEditMode && (
            <p className="text-sm text-blue-600 mb-2">✏️ Edit Profile</p>
          )}
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500 mt-2">Step {currentStep} of {totalSteps}</p>
        </CardHeader>
        <CardContent>
          {renderStep()}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
            >
              Back
            </Button>
            <Button onClick={handleNext} className="flex items-center gap-2">
              {currentStep === totalSteps ? (isEditMode ? 'Update Profile' : 'Complete Setup') : 'Continue'}
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Asset Entry Component
const AssetEntryStep = ({ assets, onAddAsset, onRemoveAsset }: {
  assets: Asset[];
  onAddAsset: (type: string, name: string, value: number) => void;
  onRemoveAsset: (index: number) => void;
}) => {
  const [newAsset, setNewAsset] = useState({ type: 'Savings', name: '', value: '' });

  const handleAdd = () => {
    if (newAsset.name && newAsset.value) {
      onAddAsset(newAsset.type, newAsset.name, Number(newAsset.value));
      setNewAsset({ type: 'Savings', name: '', value: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Current Assets</h2>
        <p className="text-gray-600 text-sm">Add your existing investments and savings (optional but recommended)</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-sm">Asset Type</Label>
            <select
              value={newAsset.type}
              onChange={(e) => setNewAsset(prev => ({ ...prev, type: e.target.value }))}
              className="w-full h-10 px-3 py-2 border rounded-md"
            >
              <option value="Savings">Savings Account</option>
              <option value="Stocks">Stocks</option>
              <option value="Mutual Funds">Mutual Funds</option>
              <option value="FD">Fixed Deposit</option>
              <option value="PPF">PPF</option>
              <option value="Gold">Gold</option>
              <option value="Real Estate">Real Estate</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <Label className="text-sm">Name/Description</Label>
            <Input
              value={newAsset.name}
              onChange={(e) => setNewAsset(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., HDFC Bank Savings"
              className="h-10"
            />
          </div>
          <div>
            <Label className="text-sm">Current Value (₹)</Label>
            <Input
              type="number"
              value={newAsset.value}
              onChange={(e) => setNewAsset(prev => ({ ...prev, value: e.target.value }))}
              placeholder="e.g., 50000"
              className="h-10"
            />
          </div>
        </div>
        <Button onClick={handleAdd} className="w-full">Add Asset</Button>
      </div>

      {assets.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Added Assets</h4>
          {assets.map((asset, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">{asset.name}</span>
                <span className="text-sm text-gray-500 ml-2">({asset.type})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">₹{asset.currentValue.toLocaleString('en-IN')}</span>
                <Button variant="outline" size="sm" onClick={() => onRemoveAsset(index)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <p className="text-xs text-gray-500 text-center">
        You can skip this step and add assets later from your portfolio page
      </p>
    </div>
  );
};

// Goals Entry Component
const GoalsEntryStep = ({ goals, onAddGoal, onRemoveGoal }: {
  goals: Goal[];
  onAddGoal: (type: string, amount: number, timeframe: number) => void;
  onRemoveGoal: (index: number) => void;
}) => {
  const [newGoal, setNewGoal] = useState({ type: '', amount: '', timeframe: '' });

  const goalTypes = [
    'Emergency Fund', 'Home Purchase', 'Retirement', 'Education', 'Vacation', 'Wedding', 'Car Purchase', 'Other'
  ];

  const handleAdd = () => {
    if (newGoal.type && newGoal.amount && newGoal.timeframe) {
      onAddGoal(newGoal.type, Number(newGoal.amount), Number(newGoal.timeframe));
      setNewGoal({ type: '', amount: '', timeframe: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Target className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Financial Goals</h2>
        <p className="text-gray-600 text-sm">What are you saving and investing for?</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <Label className="text-sm">Goal Type</Label>
            <select
              value={newGoal.type}
              onChange={(e) => setNewGoal(prev => ({ ...prev, type: e.target.value }))}
              className="w-full h-10 px-3 py-2 border rounded-md"
            >
              <option value="">Select a goal</option>
              {goalTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm">Target Amount (₹)</Label>
            <Input
              type="number"
              value={newGoal.amount}
              onChange={(e) => setNewGoal(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="e.g., 500000"
              className="h-10"
            />
          </div>
          <div>
            <Label className="text-sm">Years to Achieve</Label>
            <Input
              type="number"
              value={newGoal.timeframe}
              onChange={(e) => setNewGoal(prev => ({ ...prev, timeframe: e.target.value }))}
              placeholder="e.g., 5"
              className="h-10"
            />
          </div>
        </div>
        <Button onClick={handleAdd} className="w-full">Add Goal</Button>
      </div>

      {goals.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Added Goals</h4>
          {goals.map((goal, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">{goal.type}</span>
                <span className="text-sm text-gray-500 ml-2">({goal.timeframe} years)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">₹{goal.targetAmount.toLocaleString('en-IN')}</span>
                <Button variant="outline" size="sm" onClick={() => onRemoveGoal(index)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Expenses Entry Component
const ExpensesEntryStep = ({ expenses, onAddExpense, onRemoveExpense }: {
  expenses: Expense[];
  onAddExpense: (category: string, amount: number) => void;
  onRemoveExpense: (index: number) => void;
}) => {
  const [newExpense, setNewExpense] = useState({ category: '', amount: '' });

  const expenseCategories = [
    'Housing (Rent/EMI)', 'Food & Dining', 'Transportation', 'Utilities', 'Healthcare', 
    'Entertainment', 'Shopping', 'Education', 'Insurance', 'Other'
  ];

  const handleAdd = () => {
    if (newExpense.category && newExpense.amount) {
      onAddExpense(newExpense.category, Number(newExpense.amount));
      setNewExpense({ category: '', amount: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Monthly Expenses</h2>
        <p className="text-gray-600 text-sm">Help us understand your spending patterns to suggest better savings</p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <Label className="text-sm">Expense Category</Label>
            <select
              value={newExpense.category}
              onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
              className="w-full h-10 px-3 py-2 border rounded-md"
            >
              <option value="">Select category</option>
              {expenseCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <Label className="text-sm">Monthly Amount (₹)</Label>
            <Input
              type="number"
              value={newExpense.amount}
              onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
              placeholder="e.g., 15000"
              className="h-10"
            />
          </div>
        </div>
        <Button onClick={handleAdd} className="w-full">Add Expense</Button>
      </div>

      {expenses.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Added Expenses</h4>
          {expenses.map((expense, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="font-medium">{expense.category}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">₹{expense.monthlyAmount.toLocaleString('en-IN')}</span>
                <Button variant="outline" size="sm" onClick={() => onRemoveExpense(index)}>Remove</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Add your major expense categories. You can refine these later in your portfolio.
      </p>
    </div>
  );
};

export default Onboarding;

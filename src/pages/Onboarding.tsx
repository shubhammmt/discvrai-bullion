
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain, Shield, Target, TrendingUp, Heart } from 'lucide-react';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '',
    income: '',
    riskTolerance: '',
    investmentHorizon: '',
    learningMode: '',
    preferredInstruments: [] as string[],
    investmentAmount: '',
    financialGoals: [] as { name: string; targetAmount: string; targetYears: string; priority: string }[]
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      navigate('/feed');
    }
  };

  const handleInstrumentToggle = (instrument: string) => {
    setFormData(prev => ({
      ...prev,
      preferredInstruments: prev.preferredInstruments.includes(instrument)
        ? prev.preferredInstruments.filter(i => i !== instrument)
        : [...prev.preferredInstruments, instrument]
    }));
  };

  const handleGoalAdd = (goalType: string) => {
    const goalExists = formData.financialGoals.find(g => g.name === goalType);
    if (goalExists) {
      // Remove goal if already selected
      setFormData(prev => ({
        ...prev,
        financialGoals: prev.financialGoals.filter(g => g.name !== goalType)
      }));
    } else {
      // Add new goal with default values
      setFormData(prev => ({
        ...prev,
        financialGoals: [...prev.financialGoals, {
          name: goalType,
          targetAmount: '',
          targetYears: '',
          priority: 'Medium'
        }]
      }));
    }
  };

  const updateGoalField = (goalName: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      financialGoals: prev.financialGoals.map(goal =>
        goal.name === goalName ? { ...goal, [field]: value } : goal
      )
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
              <p className="text-gray-600 text-sm">This helps us create your personalized financial health profile</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="age" className="text-sm font-medium">Your Age</Label>
                <p className="text-xs text-gray-500 mb-2">
                  <strong>Benefit:</strong> Suggests age-appropriate investment timelines and retirement planning strategies
                </p>
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
                <p className="text-xs text-gray-500 mb-2">
                  <strong>Benefit:</strong> Calculates optimal investment amounts and emergency fund targets
                </p>
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
                <Label htmlFor="amount" className="text-sm font-medium">How much do you want to start with? (₹)</Label>
                <p className="text-xs text-gray-500 mb-2">
                  <strong>Benefit:</strong> Shows investment options that match your starting budget
                </p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your comfort with risk</h2>
              <p className="text-gray-600 text-sm">
                <strong>Benefit:</strong> Ensures we only recommend investments you're comfortable with
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">How do you feel about market ups and downs?</Label>
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
                <Label className="text-sm font-medium">When do you need this money?</Label>
                <p className="text-xs text-gray-500 mb-2">
                  <strong>Benefit:</strong> Matches investments to your timeline for optimal growth
                </p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How do you like to learn?</h2>
              <p className="text-gray-600 text-sm">
                <strong>Benefit:</strong> Customizes all information and recommendations to your learning style
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Choose your learning style</Label>
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
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your financial goals</h2>
              <p className="text-gray-600 text-sm">
                <strong>Benefit:</strong> Creates your personalized financial health score and action plan
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium">What are you saving for? (select multiple)</Label>
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {[
                    { key: 'Emergency Fund', desc: '6 months expenses' },
                    { key: 'Home Purchase', desc: 'Down payment & costs' },
                    { key: 'Retirement', desc: 'Long-term security' },
                    { key: 'Vacation', desc: 'Travel & experiences' },
                    { key: 'Education', desc: 'Self or children' },
                    { key: 'Wedding', desc: 'Celebration expenses' }
                  ].map((goal) => (
                    <Button
                      key={goal.key}
                      variant={formData.financialGoals.find(g => g.name === goal.key) ? 'default' : 'outline'}
                      onClick={() => handleGoalAdd(goal.key)}
                      className="h-16 text-left justify-start p-3"
                    >
                      <div>
                        <div className="font-medium text-sm">{goal.key}</div>
                        <div className="text-xs opacity-70">{goal.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Goal Details for Selected Goals */}
              {formData.financialGoals.length > 0 && (
                <div className="space-y-4 mt-6">
                  <Label className="text-sm font-medium">Quick details for your top goal</Label>
                  {formData.financialGoals.slice(0, 1).map((goal) => (
                    <div key={goal.name} className="p-4 bg-gray-50 rounded-lg space-y-3">
                      <h4 className="font-medium text-sm">{goal.name}</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-xs">Target Amount (₹)</Label>
                          <Input
                            type="number"
                            value={goal.targetAmount}
                            onChange={(e) => updateGoalField(goal.name, 'targetAmount', e.target.value)}
                            placeholder="e.g., 500000"
                            className="h-10 text-sm"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Years to achieve</Label>
                          <Input
                            type="number"
                            value={goal.targetYears}
                            onChange={(e) => updateGoalField(goal.name, 'targetYears', e.target.value)}
                            placeholder="e.g., 5"
                            className="h-10 text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-gray-500">
                    You can add details for other goals later in your dashboard
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              discvr.ai
            </h1>
          </div>
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
              {currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;

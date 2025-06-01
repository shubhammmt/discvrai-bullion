import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Brain } from 'lucide-react';

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
    investmentAmount: ''
  });

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and navigate to feed
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Let's get to know you</h2>
              <p className="text-gray-600">Tell us about your financial background</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                  placeholder="Enter your age"
                />
              </div>
              <div>
                <Label htmlFor="income">Annual Income (₹)</Label>
                <Input
                  id="income"
                  type="number"
                  value={formData.income}
                  onChange={(e) => setFormData(prev => ({ ...prev, income: e.target.value }))}
                  placeholder="Enter your annual income"
                />
              </div>
              <div>
                <Label htmlFor="amount">Initial Investment Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.investmentAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, investmentAmount: e.target.value }))}
                  placeholder="How much do you plan to invest?"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Risk & Timeline</h2>
              <p className="text-gray-600">Help us understand your investment preferences</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Risk Tolerance</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {['Conservative', 'Moderate', 'Aggressive'].map((risk) => (
                    <Button
                      key={risk}
                      variant={formData.riskTolerance === risk ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, riskTolerance: risk }))}
                      className="h-12"
                    >
                      {risk}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Investment Horizon</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Short-term (1-3 years)', 'Medium-term (3-7 years)', 'Long-term (7+ years)', 'Mixed'].map((horizon) => (
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Learning Preferences</h2>
              <p className="text-gray-600">How do you prefer to learn about investments?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Preferred Learning Mode</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Visual Charts', 'Detailed Analysis', 'Quick Summaries', 'Video Content'].map((mode) => (
                    <Button
                      key={mode}
                      variant={formData.learningMode === mode ? 'default' : 'outline'}
                      onClick={() => setFormData(prev => ({ ...prev, learningMode: mode }))}
                      className="h-12"
                    >
                      {mode}
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
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Investment Instruments</h2>
              <p className="text-gray-600">What would you like to invest in?</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Select your preferred investment instruments</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {['Stocks', 'Mutual Funds', 'ETFs', 'IPOs', 'Crypto', 'Bonds'].map((instrument) => (
                    <Button
                      key={instrument}
                      variant={formData.preferredInstruments.includes(instrument) ? 'default' : 'outline'}
                      onClick={() => handleInstrumentToggle(instrument)}
                      className="h-12"
                    >
                      {instrument}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
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
              {currentStep === totalSteps ? 'Complete' : 'Next'}
              <ArrowRight size={16} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;

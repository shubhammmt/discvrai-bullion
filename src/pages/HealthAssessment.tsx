
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, ArrowRight, Heart, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AssessmentData, calculateHealthScore } from '@/utils/healthScore';

const HealthAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [assessmentData, setAssessmentData] = useState<Partial<AssessmentData>>({
    age: 28,
    income: 800000,
    savings: 50000,
    investments: 100000,
    insurance: { life: false, health: false, amount: 0 },
    debt: { total: 0, emi: 0 },
    goals: { emergency: false, retirement: false, home: false },
    riskTolerance: 'moderate'
  });

  const steps = [
    {
      title: "Basic Information",
      subtitle: "Tell us about yourself",
      fields: ['age', 'income']
    },
    {
      title: "Current Finances",
      subtitle: "Your savings and investments",
      fields: ['savings', 'investments']
    },
    {
      title: "Protection Coverage",
      subtitle: "Insurance and safety net",
      fields: ['insurance']
    },
    {
      title: "Debt & Goals",
      subtitle: "Your financial obligations and aspirations",
      fields: ['debt', 'goals', 'riskTolerance']
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Calculate score and navigate to results
      const healthScore = calculateHealthScore(assessmentData as AssessmentData);
      localStorage.setItem('healthScore', JSON.stringify(healthScore));
      localStorage.setItem('assessmentData', JSON.stringify(assessmentData));
      navigate('/health-results');
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigate('/');
    }
  };

  const updateAssessment = (field: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedField = (parent: string, field: string, value: any) => {
    setAssessmentData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent as keyof AssessmentData],
        [field]: value
      }
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={assessmentData.age || ''}
                onChange={(e) => updateAssessment('age', parseInt(e.target.value))}
                placeholder="28"
              />
            </div>
            <div>
              <Label htmlFor="income">Annual Income (₹)</Label>
              <Input
                id="income"
                type="number"
                value={assessmentData.income || ''}
                onChange={(e) => updateAssessment('income', parseInt(e.target.value))}
                placeholder="800000"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="savings">Current Savings (₹)</Label>
              <Input
                id="savings"
                type="number"
                value={assessmentData.savings || ''}
                onChange={(e) => updateAssessment('savings', parseInt(e.target.value))}
                placeholder="50000"
              />
            </div>
            <div>
              <Label htmlFor="investments">Current Investments (₹)</Label>
              <Input
                id="investments"
                type="number"
                value={assessmentData.investments || ''}
                onChange={(e) => updateAssessment('investments', parseInt(e.target.value))}
                placeholder="100000"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Do you have insurance?</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="life-insurance"
                    checked={assessmentData.insurance?.life || false}
                    onCheckedChange={(checked) => updateNestedField('insurance', 'life', checked)}
                  />
                  <Label htmlFor="life-insurance">Life Insurance</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="health-insurance"
                    checked={assessmentData.insurance?.health || false}
                    onCheckedChange={(checked) => updateNestedField('insurance', 'health', checked)}
                  />
                  <Label htmlFor="health-insurance">Health Insurance</Label>
                </div>
              </div>
            </div>
            <div>
              <Label htmlFor="coverage">Total Insurance Coverage (₹)</Label>
              <Input
                id="coverage"
                type="number"
                value={assessmentData.insurance?.amount || ''}
                onChange={(e) => updateNestedField('insurance', 'amount', parseInt(e.target.value))}
                placeholder="1000000"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="debt-total">Total Debt (₹)</Label>
                <Input
                  id="debt-total"
                  type="number"
                  value={assessmentData.debt?.total || ''}
                  onChange={(e) => updateNestedField('debt', 'total', parseInt(e.target.value))}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="debt-emi">Monthly EMI (₹)</Label>
                <Input
                  id="debt-emi"
                  type="number"
                  value={assessmentData.debt?.emi || ''}
                  onChange={(e) => updateNestedField('debt', 'emi', parseInt(e.target.value))}
                  placeholder="0"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Financial Goals (check all that apply)</Label>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="emergency"
                    checked={assessmentData.goals?.emergency || false}
                    onCheckedChange={(checked) => updateNestedField('goals', 'emergency', checked)}
                  />
                  <Label htmlFor="emergency">Emergency Fund</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="retirement"
                    checked={assessmentData.goals?.retirement || false}
                    onCheckedChange={(checked) => updateNestedField('goals', 'retirement', checked)}
                  />
                  <Label htmlFor="retirement">Retirement Planning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="home"
                    checked={assessmentData.goals?.home || false}
                    onCheckedChange={(checked) => updateNestedField('goals', 'home', checked)}
                  />
                  <Label htmlFor="home">Home Purchase</Label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Label>Risk Tolerance</Label>
              <RadioGroup
                value={assessmentData.riskTolerance}
                onValueChange={(value) => updateAssessment('riskTolerance', value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative">Conservative - Safety first</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="moderate" id="moderate" />
                  <Label htmlFor="moderate">Moderate - Balanced approach</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive">Aggressive - Higher returns</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-1.5 h-1.5 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Financial Health Assessment</h1>
              <p className="text-sm text-gray-500">Complete evaluation in 30 seconds</p>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto p-6">
        <Card className="min-h-[500px]">
          <CardHeader>
            <CardTitle className="text-center">
              {steps[currentStep].title}
            </CardTitle>
            <p className="text-center text-gray-600">{steps[currentStep].subtitle}</p>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 0 ? 'Back to Home' : 'Previous'}
              </Button>
              
              <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600">
                {currentStep === steps.length - 1 ? 'Calculate Score' : 'Next'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthAssessment;

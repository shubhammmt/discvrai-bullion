
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, ArrowRight, Heart, Brain, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { QuickAssessmentData, calculateHealthScore } from '@/utils/healthScore';

const HealthAssessment = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [startTime] = useState(Date.now());
  
  const [assessmentData, setAssessmentData] = useState<QuickAssessmentData>({
    userProfile: {
      ageGroup: '',
      incomeRange: '',
      cityType: 'metro'
    },
    assets: {
      totalValue: 0,
      allocation: {
        equityPercentage: 60,
        debtPercentage: 30,
        cashPercentage: 10
      }
    },
    commitments: {
      monthlyEmi: 0,
      hasEmergencyFund: false
    }
  });

  const steps = [
    { title: "About You", subtitle: "Tell us about yourself", target: "10 seconds" },
    { title: "Your Investments", subtitle: "Current portfolio overview", target: "15 seconds" },
    { title: "Quick Check", subtitle: "Final financial details", target: "5 seconds" }
  ];

  const ageOptions = [
    '25-30', '31-35', '36-40', '41-45', '46-50', '50+'
  ];

  const incomeOptions = [
    { value: '25K-50K', label: '₹25K-50K' },
    { value: '50K-75K', label: '₹50K-75K' },
    { value: '75K-1L', label: '₹75K-1L' },
    { value: '1L-1.5L', label: '₹1L-1.5L' },
    { value: '1.5L-2L', label: '₹1.5L-2L' },
    { value: '2L+', label: '₹2L+' }
  ];

  const cityOptions = [
    { value: 'metro', label: 'Metro' },
    { value: 'tier1', label: 'Tier-1' },
    { value: 'tier2', label: 'Tier-2/3' }
  ];

  const updateData = (field: string, value: any) => {
    const keys = field.split('.');
    setAssessmentData(prev => {
      const updated = { ...prev };
      let current: any = updated;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      
      return updated;
    });
  };

  const updateAllocation = (type: 'equity' | 'debt' | 'cash', value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    const currentAllocation = { ...assessmentData.assets.allocation };
    
    if (type === 'equity') {
      currentAllocation.equityPercentage = newValue;
      const remaining = 100 - newValue;
      const currentDebtCash = currentAllocation.debtPercentage + currentAllocation.cashPercentage;
      if (currentDebtCash > 0) {
        currentAllocation.debtPercentage = Math.round((currentAllocation.debtPercentage / currentDebtCash) * remaining);
        currentAllocation.cashPercentage = 100 - newValue - currentAllocation.debtPercentage;
      } else {
        currentAllocation.debtPercentage = Math.round(remaining * 0.75);
        currentAllocation.cashPercentage = remaining - currentAllocation.debtPercentage;
      }
    }
    
    setAssessmentData(prev => ({
      ...prev,
      assets: {
        ...prev.assets,
        allocation: currentAllocation
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      const completionTime = Math.round((Date.now() - startTime) / 1000);
      const healthScore = calculateHealthScore(assessmentData);
      
      localStorage.setItem('healthScore', JSON.stringify(healthScore));
      localStorage.setItem('assessmentData', JSON.stringify({ ...assessmentData, completionTime }));
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

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return assessmentData.userProfile.ageGroup && assessmentData.userProfile.incomeRange;
      case 1:
        return assessmentData.assets.totalValue > 0;
      case 2:
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Age Group *</label>
              <div className="grid grid-cols-2 gap-3">
                {ageOptions.map((age) => (
                  <Button
                    key={age}
                    variant={assessmentData.userProfile.ageGroup === age ? "default" : "outline"}
                    onClick={() => updateData('userProfile.ageGroup', age)}
                    className="h-12"
                  >
                    {age}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Monthly Income *</label>
              <div className="grid grid-cols-2 gap-3">
                {incomeOptions.map((income) => (
                  <Button
                    key={income.value}
                    variant={assessmentData.userProfile.incomeRange === income.value ? "default" : "outline"}
                    onClick={() => updateData('userProfile.incomeRange', income.value)}
                    className="h-12"
                  >
                    {income.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">City Type</label>
              <div className="flex gap-3">
                {cityOptions.map((city) => (
                  <Button
                    key={city.value}
                    variant={assessmentData.userProfile.cityType === city.value ? "default" : "outline"}
                    onClick={() => updateData('userProfile.cityType', city.value)}
                    className="flex-1 h-12"
                  >
                    {city.label}
                  </Button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Metro: Mumbai, Delhi, Bangalore, etc.</p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Total Investment Value *</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="999.9"
                  value={assessmentData.assets.totalValue || ''}
                  onChange={(e) => updateData('assets.totalValue', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="5.5"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">lakhs</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Asset Allocation</label>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Equity (Stocks + Equity MFs)</span>
                  <span className="text-sm font-medium text-green-600">{assessmentData.assets.allocation.equityPercentage}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={assessmentData.assets.allocation.equityPercentage}
                  onChange={(e) => updateAllocation('equity', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-green"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm">Debt (FDs + Debt Funds)</span>
                  <span className="text-sm font-medium text-blue-600">{assessmentData.assets.allocation.debtPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-blue-200 rounded-lg"></div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">Cash (Savings + Liquid)</span>
                  <span className="text-sm font-medium text-orange-600">{assessmentData.assets.allocation.cashPercentage}%</span>
                </div>
                <div className="w-full h-2 bg-orange-200 rounded-lg"></div>
              </div>
              <p className="text-xs text-gray-500 mt-3">Best guess is fine - you can update this later</p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3">Monthly EMIs (Optional)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₹</span>
                <input
                  type="number"
                  min="0"
                  max="999"
                  value={assessmentData.commitments.monthlyEmi || ''}
                  onChange={(e) => updateData('commitments.monthlyEmi', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-20 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="25"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">thousand</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Home loan, car loan, personal loan EMIs</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Emergency Fund</label>
              <p className="text-sm text-gray-600 mb-3">Do you have 6 months of expenses saved for emergencies?</p>
              <div className="flex gap-3">
                <Button
                  variant={assessmentData.commitments.hasEmergencyFund ? "default" : "outline"}
                  onClick={() => updateData('commitments.hasEmergencyFund', true)}
                  className="flex-1 h-12"
                >
                  Yes
                </Button>
                <Button
                  variant={!assessmentData.commitments.hasEmergencyFund ? "default" : "outline"}
                  onClick={() => updateData('commitments.hasEmergencyFund', false)}
                  className="flex-1 h-12"
                >
                  No
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

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
              <h1 className="text-xl font-semibold">30-Second Financial Health Check</h1>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Target: {steps[currentStep].target}</span>
              </div>
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
            <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
              <div 
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-500 mt-1">
              {Math.round(progress)}% complete
            </div>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {renderStepContent()}
            
            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrev}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {currentStep === 0 ? 'Back to Home' : 'Previous'}
              </Button>
              
              <Button 
                onClick={handleNext} 
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-purple-600 disabled:opacity-50"
              >
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

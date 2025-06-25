
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import PersonalDetailsStep from '@/components/profile/PersonalDetailsStep';
import AssetsStep from '@/components/profile/AssetsStep';
import ExpensesStep from '@/components/profile/ExpensesStep';
import GoalsStep from '@/components/profile/GoalsStep';
import { createFinancialProfile, FinancialProfilePayload } from '@/utils/apiIntegration';

interface ProfileData {
  personalDetails: {
    age: number;
    monthlyIncome: number;
    monthlySavings: number;
  };
  assets: Array<{
    type: string;
    amount: number;
  }>;
  expenses: Array<{
    category: string;
    amount: number;
  }>;
  goals: Array<{
    type: string;
    targetAmount: number;
    timeframe: number;
  }>;
}

const FinancialProfile = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData>({
    personalDetails: { age: 0, monthlyIncome: 0, monthlySavings: 0 },
    assets: [],
    expenses: [],
    goals: []
  });

  const steps = [
    { title: 'Personal Details', component: PersonalDetailsStep },
    { title: 'Assets', component: AssetsStep },
    { title: 'Expenses', component: ExpensesStep },
    { title: 'Goals', component: GoalsStep }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Call the API with profile data
      const response = await createFinancialProfile(profileData as FinancialProfilePayload);
      
      if (response.success) {
        // Store the response data
        localStorage.setItem('financialProfile', JSON.stringify(profileData));
        localStorage.setItem('financialScore', JSON.stringify(response.data.score));
        localStorage.setItem('profileId', response.data.profileId);
        navigate('/financial-score');
      } else {
        console.error('API Error:', response.message);
        // Fallback to local calculation
        localStorage.setItem('financialProfile', JSON.stringify(profileData));
        navigate('/financial-score');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      // Fallback to local calculation for development
      console.log('Falling back to local calculation...');
      localStorage.setItem('financialProfile', JSON.stringify(profileData));
      navigate('/financial-score');
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfileData = (stepData: any) => {
    setProfileData(prev => ({ ...prev, ...stepData }));
  };

  const CurrentStepComponent = steps[currentStep - 1].component;
  const progress = (currentStep / steps.length) * 100;

  // Check if current step has minimum required data
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return profileData.personalDetails.age > 0 && 
               profileData.personalDetails.monthlyIncome > 0;
      default:
        return true; // Other steps are optional
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Get Your Financial Score
          </h1>
          <p className="text-gray-600">
            30-second financial profiling for personalized recommendations
          </p>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Step {currentStep} of {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Main Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">
              {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CurrentStepComponent
              data={profileData}
              onDataChange={updateProfileData}
            />
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ChevronLeft size={16} />
            Back
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={isLoading || !canProceed()}
            className="flex items-center gap-2"
          >
            {currentStep === steps.length ? (
              isLoading ? 'Calculating Score...' : 'Get My Score'
            ) : (
              <>
                Next
                <ChevronRight size={16} />
              </>
            )}
          </Button>
        </div>

        {/* Skip Option */}
        {currentStep > 1 && (
          <div className="text-center mt-4">
            <Button
              variant="ghost"
              onClick={handleSubmit}
              disabled={isLoading}
              className="text-gray-500"
            >
              Skip remaining steps and get score
            </Button>
          </div>
        )}

        {/* API Integration Note */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>For Development:</strong> To connect with your backend APIs, update the API_BASE_URL in 
            <code className="mx-1 px-2 py-1 bg-yellow-100 rounded">src/utils/apiIntegration.ts</code>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialProfile;

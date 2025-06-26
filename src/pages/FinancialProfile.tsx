
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronRight, ChevronLeft, Zap } from 'lucide-react';
import PersonalDetailsStep from '@/components/profile/PersonalDetailsStep';
import AssetsStep from '@/components/profile/AssetsStep';
import ExpensesStep from '@/components/profile/ExpensesStep';
import GoalsStep from '@/components/profile/GoalsStep';
import { useProgressiveSave } from '@/hooks/useProgressiveSave';
import { useFinancialProfile } from '@/hooks/useFinancialProfile';

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
  const [profileData, setProfileData] = useState<ProfileData>({
    personalDetails: { age: 0, monthlyIncome: 0, monthlySavings: 0 },
    assets: [],
    expenses: [],
    goals: []
  });

  const { createProfile, isLoading, error } = useFinancialProfile();
  const { clearSession } = useProgressiveSave({ 
    profileData, 
    currentStep,
    enabled: true 
  });

  // Load existing data on mount
  useEffect(() => {
    const stored = localStorage.getItem('financialProfile');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setProfileData(parsedData);
      } catch (error) {
        console.error('Error loading stored profile data:', error);
      }
    }
  }, []);

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
    try {
      const response = await createProfile(profileData);
      
      if (response && response.success !== false) {
        // Clear session after successful submission
        clearSession();
        navigate('/financial-score');
      } else {
        console.error('Profile creation failed:', response?.error || 'Unknown error');
        // Still navigate to score page for demo purposes
        navigate('/financial-score');
      }
    } catch (error) {
      console.error('Error submitting profile:', error);
      // Fallback navigation for development
      navigate('/financial-score');
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
          <div className="flex items-center justify-center gap-2 mb-4">
            <Zap className="w-8 h-8 text-blue-600" />
            <span className="text-blue-600 font-semibold">30-Second Assessment</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Get Your Financial Score
          </h1>
          <p className="text-gray-600">
            Quick financial profiling for personalized recommendations
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

        {/* Error Display */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Main Card */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl flex items-center gap-2">
              {steps[currentStep - 1].title}
              {currentStep > 1 && (
                <span className="text-sm text-green-600 font-normal">(Optional - Skip if needed)</span>
              )}
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
              isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Calculating Score...
                </>
              ) : (
                'Get My Score'
              )
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
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Progressive Saving:</strong> Your data is automatically saved as you progress. 
            The backend will manage user identification and data persistence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialProfile;

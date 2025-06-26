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
        // Handle the error case properly
        const errorMessage = response && 'error' in response ? response.error : 'Profile creation failed';
        console.error('Profile creation failed:', errorMessage);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-4">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Ultra Compact Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-blue-600" />
              <div>
                <span className="text-blue-600 font-semibold text-sm">30-Second Assessment</span>
                <h1 className="text-xl font-bold text-gray-900">Get Your Financial Score</h1>
              </div>
            </div>
            <p className="text-gray-600 text-sm hidden md:block">
              Quick financial profiling for personalized recommendations
            </p>
          </div>
        </div>

        {/* Compact Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-medium text-gray-600">
              Step {currentStep} of {steps.length}: {steps[currentStep - 1].title}
            </span>
            <span className="text-xs text-gray-500">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-600 text-xs">{error}</p>
          </div>
        )}

        {/* Main Content - Compact */}
        <div className="h-[calc(100vh-220px)] flex flex-col">
          <Card className="flex-1 border-0 shadow-lg overflow-hidden">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-lg flex items-center justify-center gap-2">
                {steps[currentStep - 1].title}
                {currentStep > 1 && (
                  <span className="text-xs text-green-600 font-normal">(Optional)</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 h-full overflow-y-auto">
              <div className="h-full">
                <CurrentStepComponent
                  data={profileData}
                  onDataChange={updateProfileData}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compact Navigation */}
        <div className="mt-4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-1 h-8 px-3 text-sm"
          >
            <ChevronLeft size={14} />
            Back
          </Button>
          
          <div className="flex gap-2">
            {currentStep > 1 && (
              <Button
                variant="ghost"
                onClick={handleSubmit}
                disabled={isLoading}
                className="text-gray-500 h-8 px-3 text-sm"
              >
                Skip & Get Score
              </Button>
            )}
            
            <Button
              onClick={handleNext}
              disabled={isLoading || !canProceed()}
              className="flex items-center gap-1 h-8 px-3 text-sm"
            >
              {currentStep === steps.length ? (
                isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                    Calculating...
                  </>
                ) : (
                  'Get My Score'
                )
              ) : (
                <>
                  Next
                  <ChevronRight size={14} />
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Compact API Note */}
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            <strong>Progressive Saving:</strong> Your data is automatically saved as you progress.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialProfile;

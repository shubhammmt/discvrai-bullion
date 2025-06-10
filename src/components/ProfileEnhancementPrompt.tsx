
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileEnhancementPromptProps {
  userProfile: any;
}

const ProfileEnhancementPrompt = ({ userProfile }: ProfileEnhancementPromptProps) => {
  const navigate = useNavigate();

  const getProfileGaps = () => {
    const gaps = [];
    
    if (!userProfile.investmentGoals || userProfile.investmentGoals.length === 0) {
      gaps.push('Investment Goals');
    }
    
    if (!userProfile.income) {
      gaps.push('Income Details');
    }

    return gaps.slice(0, 1); // Show only 1 gap
  };

  const profileGaps = getProfileGaps();

  if (profileGaps.length === 0) {
    return null;
  }

  return (
    <Card className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Target className="w-6 h-6 text-green-600" />
            <div>
              <h4 className="font-medium text-green-800">Complete profile for better matches</h4>
              <p className="text-sm text-green-700">Add {profileGaps[0]} for 40% more accurate suggestions</p>
            </div>
          </div>
          <Button 
            onClick={() => navigate('/onboarding')}
            size="sm"
            className="bg-gradient-to-r from-green-600 to-blue-600"
          >
            Complete <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEnhancementPrompt;

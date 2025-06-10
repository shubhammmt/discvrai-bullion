
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, ArrowRight, Target, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileEnhancementPromptProps {
  userProfile: any;
}

const ProfileEnhancementPrompt = ({ userProfile }: ProfileEnhancementPromptProps) => {
  const navigate = useNavigate();

  // Determine what profile improvements are needed
  const getProfileGaps = () => {
    const gaps = [];
    
    if (!userProfile.investmentGoals || userProfile.investmentGoals.length === 0) {
      gaps.push({ field: 'Investment Goals', benefit: '40% better recommendations' });
    }
    
    if (!userProfile.income) {
      gaps.push({ field: 'Income Details', benefit: '35% more accurate suggestions' });
    }
    
    if (!userProfile.investmentHorizon) {
      gaps.push({ field: 'Investment Timeline', benefit: '50% better risk matching' });
    }
    
    if (!userProfile.currentInvestments || userProfile.currentInvestments.length === 0) {
      gaps.push({ field: 'Current Portfolio', benefit: '60% better diversification' });
    }

    return gaps.slice(0, 2); // Show top 2 gaps
  };

  const profileGaps = getProfileGaps();

  if (profileGaps.length === 0) {
    return null; // Profile is complete
  }

  return (
    <Card className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Target className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-green-800 mb-2">Enhance Your Profile for Better Recommendations</h3>
            <p className="text-sm text-green-700 mb-3">
              Complete these details and Vega AI will provide more personalized investment suggestions:
            </p>
            
            <div className="space-y-2 mb-4">
              {profileGaps.map((gap, index) => (
                <div key={index} className="flex items-center justify-between bg-white/70 p-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <User size={14} className="text-green-600" />
                    <span className="text-sm font-medium">{gap.field}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <TrendingUp size={12} />
                    {gap.benefit}
                  </div>
                </div>
              ))}
            </div>

            <Button 
              onClick={() => navigate('/onboarding')}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white text-sm"
              size="sm"
            >
              Complete Profile <ArrowRight size={14} className="ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileEnhancementPrompt;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Target, 
  ArrowRight, 
  Edit3, 
  FileText, 
  Upload,
  BarChart3
} from 'lucide-react';
import HealthScoreCard from '@/components/HealthScoreCard';
import { calculateHealthScore, QuickAssessmentData } from '@/utils/healthScore';

const FinancialScore = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<any>(null);
  const [healthScore, setHealthScore] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const stored = localStorage.getItem('financialProfile');
      if (stored) {
        const data = JSON.parse(stored);
        setProfileData(data);
        
        // Convert to health score format
        const mockAssessment: QuickAssessmentData = {
          userProfile: {
            ageGroup: data.personalDetails.age < 30 ? '25-30' : '31-35',
            incomeRange: data.personalDetails.monthlyIncome < 50000 ? '25K-50K' : 
                        data.personalDetails.monthlyIncome < 100000 ? '50K-1L' : '1L-1.5L',
            cityType: 'metro'
          },
          assets: {
            totalValue: data.assets.reduce((sum: number, asset: any) => sum + asset.amount, 0) / 100000,
            allocation: {
              equityPercentage: 60,
              debtPercentage: 30,
              cashPercentage: 10
            }
          },
          commitments: {
            monthlyEmi: data.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0) / 1000,
            hasEmergencyFund: data.assets.some((asset: any) => asset.type === 'Emergency Fund')
          }
        };

        const score = calculateHealthScore(mockAssessment);
        setHealthScore(score);
      }
      setIsLoading(false);
    };

    loadData();
  }, []);

  const quickImportOptions = [
    {
      title: 'Upload Excel Template',
      description: 'Import your portfolio using our Excel template',
      icon: FileText,
      action: () => navigate('/portfolio/update?method=excel')
    },
    {
      title: 'Upload Bank Statements',
      description: 'Scan and upload your bank statements or images',
      icon: Upload,
      action: () => navigate('/portfolio/update?method=image')
    },
    {
      title: 'Manual Entry',
      description: 'Add your assets and investments manually',
      icon: Edit3,
      action: () => navigate('/portfolio/update')
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your financial score...</p>
        </div>
      </div>
    );
  }

  if (!healthScore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Unable to calculate score</p>
          <Button onClick={() => navigate('/financial-profile')}>
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Financial Health Score
          </h1>
          <p className="text-gray-600">
            Based on your profile, here's your personalized financial assessment
          </p>
        </div>

        {/* Score Card */}
        <HealthScoreCard score={healthScore} showDetails={true} />

        {/* Action Plan */}
        {healthScore.actionPlan && healthScore.actionPlan.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Your Personalized Action Plan
              </CardTitle>
              <p className="text-sm text-gray-600">
                Compliance-friendly recommendations to improve your financial health
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthScore.actionPlan.slice(0, 3).map((action: any, index: number) => (
                  <div key={index} className="p-4 border rounded-lg bg-white">
                    <div className="flex items-start gap-3">
                      <Badge variant="outline" className="mt-1">
                        #{action.priority}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{action.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Impact: {action.impact}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {action.timeframe}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Portfolio Import */}
        <Card>
          <CardHeader>
            <CardTitle>Enhance Your Profile</CardTitle>
            <p className="text-sm text-gray-600">
              Add more details to your portfolio for better recommendations
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {quickImportOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="p-4 border rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <option.icon className="w-6 h-6 text-blue-600 mb-2" />
                  <h4 className="font-medium text-gray-900 mb-1">{option.title}</h4>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigate('/feed')}
            className="flex items-center gap-2"
            size="lg"
          >
            <BarChart3 className="w-5 h-5" />
            Explore Investment Options
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/financial-profile')}
            className="flex items-center gap-2"
            size="lg"
          >
            <Edit3 className="w-5 h-5" />
            Update Profile
          </Button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500 bg-blue-50 p-4 rounded-lg">
          <p>
            💡 Your financial score is calculated based on industry standards and best practices. 
            This is for informational purposes only and should not be considered as financial advice.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FinancialScore;

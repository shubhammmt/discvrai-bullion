
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import HealthScoreCard from '@/components/HealthScoreCard';
import { HealthScoreData } from '@/utils/healthScore';

const HealthResults = () => {
  const navigate = useNavigate();
  const [healthScore, setHealthScore] = useState<HealthScoreData | null>(null);

  useEffect(() => {
    const savedScore = localStorage.getItem('healthScore');
    if (savedScore) {
      setHealthScore(JSON.parse(savedScore));
    } else {
      navigate('/health-assessment');
    }
  }, [navigate]);

  if (!healthScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Calculating your financial health...</p>
        </div>
      </div>
    );
  }

  const getScoreMessage = (score: number) => {
    if (score >= 80) return { text: "Excellent! Your financial health is strong.", color: "text-green-600", icon: CheckCircle };
    if (score >= 60) return { text: "Good progress! Some areas need attention.", color: "text-yellow-600", icon: AlertCircle };
    return { text: "Let's improve your financial wellness together.", color: "text-red-600", icon: TrendingUp };
  };

  const scoreMessage = getScoreMessage(healthScore.overall);
  const MessageIcon = scoreMessage.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" onClick={() => navigate('/health-assessment')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessment
          </Button>
          
          <h1 className="text-xl font-semibold">Your Financial Health Report</h1>
          
          <div className="text-sm text-gray-500">
            Results Ready
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Score Overview */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <MessageIcon className={`w-8 h-8 ${scoreMessage.color}`} />
            <h2 className={`text-2xl font-bold ${scoreMessage.color}`}>
              {scoreMessage.text}
            </h2>
          </div>
        </div>

        {/* Health Score Card */}
        <HealthScoreCard score={healthScore} showDetails={true} />

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Personalized Action Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {healthScore.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{recommendation}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      We'll help you implement this step by step
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-xl font-semibold">Ready to Improve Your Financial Health?</h3>
              <p className="text-gray-600">
                Let's create a personalized dashboard to track your progress and implement improvements.
              </p>
              
              <div className="flex gap-4 justify-center">
                <Button 
                  variant="outline" 
                  onClick={() => navigate('/feed')}
                >
                  Explore Recommendations
                </Button>
                <Button 
                  onClick={() => navigate('/health-dashboard')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthResults;

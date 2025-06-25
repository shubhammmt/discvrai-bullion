
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle, TrendingUp, Share2, RotateCcw, ExternalLink } from 'lucide-react';
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

  const shareResults = () => {
    if (navigator.share && healthScore) {
      navigator.share({
        title: 'My Financial Health Score',
        text: `I just completed a financial health check and scored ${healthScore.overall}/100 (Grade ${healthScore.grade})!`,
        url: window.location.origin + '/health-assessment'
      });
    } else {
      navigator.clipboard.writeText(`I just completed a financial health check and scored ${healthScore?.overall}/100! Check yours at ${window.location.origin}/health-assessment`);
    }
  };

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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'safety': return '🛡️';
      case 'optimization': return '⚡';
      case 'debt': return '💳';
      case 'savings': return '💰';
      default: return '🎯';
    }
  };

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
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={shareResults}>
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/health-assessment')}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Retake
            </Button>
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
          {healthScore.benchmarks && (
            <p className="text-gray-600">
              You're in the {healthScore.benchmarks.percentile}th percentile among {healthScore.benchmarks.peerGroup}
            </p>
          )}
        </div>

        {/* Health Score Card */}
        <HealthScoreCard score={healthScore} showDetails={true} />

        {/* Action Plan */}
        {healthScore.actionPlan && healthScore.actionPlan.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Your Personalized Action Plan
              </CardTitle>
              <p className="text-sm text-gray-600">
                Complete these actions to improve your financial health score
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {healthScore.actionPlan.map((action, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full text-sm font-bold flex-shrink-0">
                      {action.priority}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{getCategoryIcon(action.category)}</span>
                        <h4 className="font-semibold text-gray-900">{action.title}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                          {action.impact}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{action.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>🎯 Target: {action.timeframe}</span>
                        <span>📈 Impact: {action.impact}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Explore Investments</h3>
                  <p className="text-sm text-gray-600">
                    Find curated mutual funds and stocks based on your profile
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/feed')}
                  className="w-full"
                >
                  View Recommendations
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Track Progress</h3>
                  <p className="text-sm text-gray-600">
                    Monitor your financial health improvements over time
                  </p>
                </div>
                <Button 
                  onClick={() => navigate('/health-dashboard')}
                  variant="outline"
                  className="w-full"
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold mb-2">Ready to take action?</h3>
            <p className="text-gray-600 mb-4">
              Your financial health journey starts with small, consistent steps. 
              We're here to guide you every step of the way.
            </p>
            <div className="flex gap-3 justify-center">
              <Button 
                onClick={() => navigate('/onboarding')}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Set Financial Goals
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/feed')}
              >
                Start Investing
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthResults;

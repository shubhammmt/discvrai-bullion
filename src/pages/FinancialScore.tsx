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
  BarChart3,
  CheckCircle,
  Circle,
  Star,
  Award,
  Zap,
  Users,
  ArrowUpRight,
  Mail,
  Link2,
  PlusCircle
} from 'lucide-react';
import HealthScoreCard from '@/components/HealthScoreCard';
import { calculateHealthScore, QuickAssessmentData } from '@/utils/healthScore';
import { useFinancialProfile } from '@/hooks/useFinancialProfile';

const FinancialScore = () => {
  const navigate = useNavigate();
  const [scoreAnimation, setScoreAnimation] = useState(0);
  const [showQuickEdit, setShowQuickEdit] = useState(false);
  
  const { profileData, scoreData, isLoading, loadFromStorage, getScore } = useFinancialProfile();

  useEffect(() => {
    const initializeData = async () => {
      // First try to load from storage
      loadFromStorage();
      
      // If we have a profileId, try to fetch latest score from API
      const profileId = localStorage.getItem('profileId');
      if (profileId) {
        try {
          await getScore(profileId);
        } catch (error) {
          console.log('Failed to fetch latest score, using cached data');
        }
      }
    };

    initializeData();
  }, [loadFromStorage, getScore]);

  useEffect(() => {
    // Animate score when data is available
    if (scoreData?.score?.overall) {
      setTimeout(() => {
        let current = 0;
        const target = scoreData.score.overall;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setScoreAnimation(target);
            clearInterval(timer);
          } else {
            setScoreAnimation(Math.floor(current));
          }
        }, 30);
      }, 500);
    } else if (profileData) {
      // Fallback: calculate local score if no API score available
      const mockAssessment: QuickAssessmentData = {
        userProfile: {
          ageGroup: profileData.personalDetails.age < 30 ? '25-30' : '31-35',
          incomeRange: profileData.personalDetails.monthlyIncome < 50000 ? '25K-50K' : 
                      profileData.personalDetails.monthlyIncome < 100000 ? '50K-1L' : '1L-1.5L',
          cityType: 'metro'
        },
        assets: {
          totalValue: profileData.assets.reduce((sum: number, asset: any) => sum + asset.amount, 0) / 100000,
          allocation: {
            equityPercentage: 60,
            debtPercentage: 30,
            cashPercentage: 10
          }
        },
        commitments: {
          monthlyEmi: profileData.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0) / 1000,
          hasEmergencyFund: profileData.assets.some((asset: any) => asset.type === 'Emergency Fund')
        }
      };

      const localScore = calculateHealthScore(mockAssessment);
      setTimeout(() => {
        let current = 0;
        const target = localScore.overall;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setScoreAnimation(target);
            clearInterval(timer);
          } else {
            setScoreAnimation(Math.floor(current));
          }
        }, 30);
      }, 500);
    }
  }, [scoreData, profileData]);

  const getScoreGrade = (score: number) => {
    if (score >= 90) return { grade: 'A+', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 80) return { grade: 'A', color: 'text-green-600', bg: 'bg-green-100' };
    if (score >= 70) return { grade: 'B+', color: 'text-blue-600', bg: 'bg-blue-100' };
    if (score >= 60) return { grade: 'B', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { grade: 'C', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const portfolioEnhancementOptions = [
    {
      title: 'Quick Update Totals',
      description: 'Fast edit of your basic asset category totals',
      icon: Edit3,
      badge: 'Basic',
      gradient: 'from-blue-500 to-indigo-600',
      action: () => setShowQuickEdit(true),
      type: 'quick'
    },
    {
      title: 'Connect Zerodha (MCP)',
      description: 'Live sync your complete portfolio automatically',
      icon: Link2,
      badge: 'Instant',
      gradient: 'from-green-500 to-emerald-600',
      action: () => navigate('/portfolio/update?method=mcp'),
      type: 'detailed'
    },
    {
      title: 'Connect Gmail',
      description: 'Auto-import statements & documents',
      icon: Mail,
      badge: 'Smart',
      gradient: 'from-blue-500 to-indigo-600',
      action: () => navigate('/portfolio/update?method=mail'),
      type: 'detailed'
    },
    {
      title: 'Upload Documents',
      description: 'Excel files, statements, or screenshots',
      icon: Upload,
      badge: 'Quick',
      gradient: 'from-purple-500 to-violet-600',
      action: () => navigate('/portfolio/update?method=upload'),
      type: 'detailed'
    },
    {
      title: 'Add Manually',
      description: 'Enter specific investment details',
      icon: PlusCircle,
      badge: 'Detailed',
      gradient: 'from-orange-500 to-red-600',
      action: () => navigate('/portfolio/update?method=manual'),
      type: 'detailed'
    }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <p className="text-gray-700 font-medium">Loading your financial score...</p>
          <p className="text-gray-500 text-sm mt-1">Fetching latest data from API</p>
        </div>
      </div>
    );
  }

  if (!scoreData?.score && !profileData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Circle className="w-8 h-8 text-red-600" />
          </div>
          <p className="text-gray-700 font-medium mb-4">No financial data found</p>
          <Button onClick={() => navigate('/financial-profile')} className="flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4" />
            Take Financial Assessment
          </Button>
        </div>
      </div>
    );
  }

  // Use API score data if available, otherwise fall back to calculated score
  const displayScore = scoreData?.score || (profileData ? calculateHealthScore({
    userProfile: {
      ageGroup: profileData.personalDetails.age < 30 ? '25-30' : '31-35',
      incomeRange: profileData.personalDetails.monthlyIncome < 50000 ? '25K-50K' : 
                  profileData.personalDetails.monthlyIncome < 100000 ? '50K-1L' : '1L-1.5L',
      cityType: 'metro'
    },
    assets: {
      totalValue: profileData.assets.reduce((sum: number, asset: any) => sum + asset.amount, 0) / 100000,
      allocation: { equityPercentage: 60, debtPercentage: 30, cashPercentage: 10 }
    },
    commitments: {
      monthlyEmi: profileData.expenses.reduce((sum: number, expense: any) => sum + expense.amount, 0) / 1000,
      hasEmergencyFund: profileData.assets.some((asset: any) => asset.type === 'Emergency Fund')
    }
  }) : null);

  if (!displayScore) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 font-medium mb-4">Unable to calculate score</p>
          <Button onClick={() => navigate('/financial-profile')} className="flex items-center gap-2">
            <ArrowUpRight className="w-4 h-4" />
            Retake Assessment
          </Button>
        </div>
      </div>
    );
  }

  const gradeInfo = getScoreGrade(displayScore.overall);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-4xl mx-auto px-4 py-16 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-yellow-300" />
            <span className="text-yellow-300 font-semibold">Your Financial Health Report</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Congratulations! 🎉
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Your personalized financial score is ready with actionable insights to improve your financial health
          </p>

          {/* Score Display */}
          <div className="inline-block">
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
                <div className="text-center">
                  <div className="text-4xl font-bold">{scoreAnimation}</div>
                  <div className={`text-lg font-semibold px-3 py-1 rounded-full ${gradeInfo.bg} ${gradeInfo.color} mt-2`}>
                    {gradeInfo.grade}
                  </div>
                </div>
              </div>
              <div className="absolute -top-2 -right-2">
                <Star className="w-8 h-8 text-yellow-300 fill-current" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
        {/* Score Breakdown */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Score Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <HealthScoreCard score={displayScore} showDetails={true} />
          </CardContent>
        </Card>

        {/* Action Plan */}
        {displayScore.actionPlan && displayScore.actionPlan.length > 0 && (
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Target className="w-6 h-6 text-green-600" />
                Your Action Plan
                <Badge variant="secondary" className="ml-auto">Top 3 Priorities</Badge>
              </CardTitle>
              <p className="text-gray-600">
                Personalized recommendations to boost your financial health
              </p>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-0">
                {displayScore.actionPlan.slice(0, 3).map((action: any, index: number) => (
                  <div key={index} className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                          <span className="text-green-600 font-bold text-sm">#{action.priority}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-2">{action.title}</h4>
                        <p className="text-gray-600 mb-3">{action.description}</p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="text-green-700 border-green-200">
                            Impact: {action.impact}
                          </Badge>
                          <Badge variant="outline" className="text-blue-700 border-blue-200">
                            Timeline: {action.timeframe}
                          </Badge>
                        </div>
                      </div>
                      <CheckCircle className="w-6 h-6 text-gray-300 hover:text-green-500 cursor-pointer transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Peer Comparison */}
        {displayScore.benchmarks && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">How You Compare</h4>
                  <p className="text-gray-600">
                    You're in the <span className="font-semibold text-blue-600">{displayScore.benchmarks.percentile}th percentile</span> among {displayScore.benchmarks.peerGroup}
                  </p>
                </div>
                <Badge variant="outline" className="text-blue-700 border-blue-200">
                  Top {100 - displayScore.benchmarks.percentile}%
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Portfolio Management */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-indigo-600" />
              Enhance Your Portfolio Analysis
            </CardTitle>
            <p className="text-gray-600">
              Choose how you'd like to update your portfolio for better recommendations
            </p>
          </CardHeader>
          <CardContent>
            {/* Quick vs Detailed Sections */}
            <div className="space-y-6">
              {/* Quick Update Section */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-600" />
                  Quick Updates
                </h4>
                <div className="grid gap-3">
                  {portfolioEnhancementOptions
                    .filter(option => option.type === 'quick')
                    .map((option, index) => (
                      <button
                        key={index}
                        onClick={option.action}
                        className="relative p-4 border rounded-lg hover:shadow-md transition-all group text-left overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                        <div className="relative flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <option.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-semibold text-gray-900">{option.title}</h5>
                              <Badge variant="secondary" className="text-xs">
                                {option.badge}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{option.description}</p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Detailed Portfolio Section */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-600" />
                  Detailed Portfolio Management
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {portfolioEnhancementOptions
                    .filter(option => option.type === 'detailed')
                    .map((option, index) => (
                      <button
                        key={index}
                        onClick={option.action}
                        className="relative p-4 border rounded-lg hover:shadow-md transition-all group text-left overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                        <div className="relative">
                          <div className="flex items-start justify-between mb-2">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                              <option.icon className="w-4 h-4 text-white" />
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {option.badge}
                            </Badge>
                          </div>
                          <h5 className="font-semibold text-gray-900 mb-1">{option.title}</h5>
                          <p className="text-sm text-gray-600 mb-2">{option.description}</p>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Button
            onClick={() => navigate('/feed')}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            size="lg"
          >
            <BarChart3 className="w-5 h-5" />
            Explore Investment Options
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => navigate('/financial-profile')}
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-50"
            size="lg"
          >
            <Edit3 className="w-5 h-5" />
            Update Profile
          </Button>
        </div>

        {/* Disclaimer */}
        <div className="text-center">
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 max-w-2xl">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 mt-0.5">
                <div className="w-4 h-4 rounded-full bg-blue-200 flex items-center justify-center">
                  <span className="text-blue-600 text-xs font-bold">!</span>
                </div>
              </div>
              <p className="text-left">
                Your financial score is calculated using our API integration. 
                This is for informational purposes only and should not be considered as financial advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialScore;

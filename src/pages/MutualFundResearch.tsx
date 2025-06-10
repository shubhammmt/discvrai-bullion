
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, Bell, TrendingUp, PieChart, Target, BarChart3, Brain, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ViewToggle from '@/components/ViewToggle';
import MutualFundDetailedView from '@/components/MutualFundDetailedView';

const MutualFundResearch = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');
  const [showCopilot, setShowCopilot] = useState(false);

  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const fundData = {
    name: fundId ? `${fundId.replace('-', ' ').toUpperCase()} Fund` : 'HDFC Top 100 Fund',
    category: 'Large Cap Equity',
    nav: 542.35,
    change: 2.15,
    changePercent: 0.40,
    aum: '₹15,420 Cr',
    expenseRatio: '1.05%',
    rating: 5
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const riskTolerance = userProfile.riskTolerance || 'moderate';
    const investmentGoal = userProfile.investmentGoal || 'wealth creation';
    const timeHorizon = userProfile.timeHorizon || '5-10 years';

    if (riskTolerance === 'high' && timeHorizon === '10+ years') {
      return {
        match: 92,
        reason: 'Perfect alignment with your high risk tolerance and long-term investment horizon.',
        suggestion: 'Excellent choice for aggressive wealth creation with your investment profile.',
        suitability: 'Highly suitable for your aggressive growth strategy'
      };
    } else if (riskTolerance === 'moderate') {
      return {
        match: 85,
        reason: 'Good fit for moderate risk profile with balanced growth potential.',
        suggestion: 'Large cap funds offer stability with growth - ideal for moderate investors.',
        suitability: 'Well-suited for balanced portfolio allocation'
      };
    } else {
      return {
        match: 70,
        reason: 'Consider hybrid funds for better risk-adjusted returns given your conservative approach.',
        suggestion: 'Large cap exposure is good, but consider adding debt funds for stability.',
        suitability: 'Partially suitable - consider diversifying with debt funds'
      };
    }
  };

  const personalizedContext = getPersonalizedContext();

  const handleCopilotClick = () => {
    setShowCopilot(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto p-3 sm:p-4">
          {/* Simplified Header */}
          <div className="flex items-center gap-3 mb-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{fundData.name}</h1>
              <p className="text-sm text-gray-600">AI-powered fund analysis</p>
            </div>
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </div>

          {/* Personalized Match Score */}
          <Card className="mb-4 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {personalizedContext.match}% Match for You
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {userProfile.riskTolerance || 'Moderate'} Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{personalizedContext.reason}</p>
                  <p className="text-xs text-blue-600 font-medium">{personalizedContext.suggestion}</p>
                </div>
                <Button 
                  onClick={handleCopilotClick}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Brain size={16} className="mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Fund Header */}
          <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{fundData.name}</h1>
                  <p className="text-gray-600">{fundData.category}</p>
                  <div className="flex items-center gap-2 mt-2">
                    {[...Array(fundData.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                    <span className="text-sm text-gray-600 ml-2">
                      {fundData.rating}-Star Rating
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">₹{fundData.nav}</div>
                  <div className="text-green-600 text-sm">
                    +₹{fundData.change} (+{fundData.changePercent}%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between mb-6 p-3 bg-white/70 backdrop-blur-md rounded-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Bell size={16} className="mr-2" />
                Alerts
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Heart size={16} className="mr-2" />
                Compare
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Invest Now
            </Button>
          </div>

          {currentView === 'quick' ? (
            <div className="space-y-6">
              {/* AI Analysis with enhanced personalization */}
              <div className="relative">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      AI Analysis & Recommendation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Recommendation: INVEST</h4>
                      <p className="text-green-700">
                        Excellent track record with consistent outperformance. Low expense ratio and strong fund management team.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Consistently outperformed benchmark by 2-3% annually</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Strong portfolio of quality large-cap stocks with low volatility</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Experienced fund manager with 15+ years track record</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                        <p className="text-sm">{personalizedContext.suitability}</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                      <div className="flex items-start gap-2">
                        <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 mb-1">Personalized Insight:</p>
                          <p className="text-sm text-blue-700">
                            Based on your {userProfile.riskTolerance || 'moderate'} risk tolerance and {userProfile.timeHorizon || '5-10 year'} investment horizon, 
                            this fund aligns well with your goals. Consider SIP of ₹{Math.round(((userProfile.income || 600000) * 0.15) / 12).toLocaleString()} 
                            monthly (15% of income allocation rule).
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button
                  onClick={handleCopilotClick}
                  className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg"
                  size="sm"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>

              {/* Key Metrics */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-xl font-bold">{fundData.aum}</div>
                    <div className="text-sm text-gray-600">AUM</div>
                    <div className="text-xs text-blue-600 mt-1">Large fund size</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <PieChart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-xl font-bold">{fundData.expenseRatio}</div>
                    <div className="text-sm text-gray-600">Expense Ratio</div>
                    <div className="text-xs text-green-600 mt-1">Low cost</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-xl font-bold">12.5%</div>
                    <div className="text-sm text-gray-600">3Y Returns</div>
                    <div className="text-xs text-purple-600 mt-1">Above average</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-xl font-bold">9.2/10</div>
                    <div className="text-sm text-gray-600">AI Score</div>
                    <div className="text-xs text-orange-600 mt-1">Excellent choice</div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance vs Benchmark */}
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle>Performance vs Benchmark</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>1 Year</span>
                      <div className="flex gap-4">
                        <span className="text-blue-600 font-medium">Fund: 18.5%</span>
                        <span className="text-gray-600">Benchmark: 15.2%</span>
                        <span className="text-green-600 font-semibold">+3.3%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>3 Years</span>
                      <div className="flex gap-4">
                        <span className="text-blue-600 font-medium">Fund: 12.5%</span>
                        <span className="text-gray-600">Benchmark: 10.1%</span>
                        <span className="text-green-600 font-semibold">+2.4%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>5 Years</span>
                      <div className="flex gap-4">
                        <span className="text-blue-600 font-medium">Fund: 14.8%</span>
                        <span className="text-gray-600">Benchmark: 12.3%</span>
                        <span className="text-green-600 font-semibold">+2.5%</span>
                      </div>
                    </div>
                    <div className="border-t pt-3 mt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Average Outperformance</span>
                        <span className="text-green-600">+2.7% annually</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed View CTA */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Need Complete Fund Analysis?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Access detailed portfolio holdings, risk metrics, and fund manager insights
                  </p>
                  <Button 
                    onClick={() => setCurrentView('detailed')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <BarChart3 size={16} className="mr-2" />
                    View Detailed Analysis
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <MutualFundDetailedView />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MutualFundResearch;

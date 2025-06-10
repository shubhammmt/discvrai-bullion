
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Layers, TrendingUp, Shield, Target, BarChart3, Brain, MessageCircle, CheckCircle, AlertCircle, Plus, Heart, Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const SmallcaseResearch = () => {
  const { smallcaseId } = useParams();
  const navigate = useNavigate();
  const [showCopilot, setShowCopilot] = useState(false);

  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const smallcaseData = {
    name: smallcaseId ? `${smallcaseId.replace('-', ' ').toUpperCase()}` : 'Electric Mobility Smallcase',
    manager: 'Windmill Capital',
    minInvestment: '₹2,000',
    returns: '24.5%',
    stocks: 15,
    volatility: 'High'
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const riskTolerance = userProfile.riskTolerance || 'moderate';
    const investmentGoal = userProfile.investmentGoal || 'wealth creation';
    const age = userProfile.age || 30;

    if (riskTolerance === 'high' && age < 35) {
      return {
        match: 90,
        reason: 'Perfect fit for young, aggressive investors seeking high growth in emerging themes.',
        suggestion: 'Excellent choice for building wealth through thematic investing.',
        allocation: 'Can allocate 10-15% of equity portfolio to thematic smallcases'
      };
    } else if (riskTolerance === 'moderate' && age < 45) {
      return {
        match: 78,
        reason: 'Good diversification tool for moderate investors with growth objectives.',
        suggestion: 'Consider as satellite holding alongside core diversified portfolio.',
        allocation: 'Limit to 5-8% of total equity allocation for theme exposure'
      };
    } else {
      return {
        match: 65,
        reason: 'High volatility may not align with conservative investment approach.',
        suggestion: 'Consider broader market smallcases with lower volatility instead.',
        allocation: 'Better to avoid or limit to 2-3% as speculative investment'
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
              <h1 className="text-xl font-bold text-gray-900">Smallcase Research</h1>
              <p className="text-sm text-gray-600">AI-powered thematic portfolio analysis</p>
            </div>
          </div>

          {/* Personalized Match Score */}
          <Card className="mb-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {personalizedContext.match}% Match for You
                    </h3>
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      Age {userProfile.age || 30}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{personalizedContext.reason}</p>
                  <p className="text-xs text-indigo-600 font-medium">{personalizedContext.suggestion}</p>
                </div>
                <Button 
                  onClick={handleCopilotClick}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Brain size={16} className="mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Smallcase Header */}
          <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{smallcaseData.name}</h1>
                  <p className="text-gray-600">{smallcaseData.manager}</p>
                  <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full mt-2">
                    Thematic Portfolio
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-green-600">{smallcaseData.returns}</div>
                  <div className="text-sm text-gray-600">Annual Returns</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Bar */}
          <div className="flex items-center justify-between mb-6 p-3 bg-white/70 backdrop-blur-md rounded-lg border border-white/20">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Bell size={16} className="mr-2" />
                Rebalance Alerts
              </Button>
              <Button size="sm" variant="ghost" className="text-gray-600">
                <Heart size={16} className="mr-2" />
                Watchlist
              </Button>
            </div>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus size={16} className="mr-2" />
              Invest Now
            </Button>
          </div>

          <div className="space-y-6">
            {/* AI Analysis with enhanced personalization */}
            <div className="relative">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    AI Analysis & Recommendation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                    <h4 className="font-semibold text-green-800 mb-2">Recommendation: INVEST</h4>
                    <p className="text-green-700">
                      Strong thematic exposure to electric mobility revolution with well-researched stock selection.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Diversified exposure to EV ecosystem - manufacturers, battery, charging</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Strong performance with 24.5% returns vs 12% market average</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                      <p className="text-sm">Professional management with quarterly rebalancing</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                      <p className="text-sm">High volatility theme - expect significant price swings</p>
                    </div>
                  </div>
                  
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 mt-4">
                    <div className="flex items-start gap-2">
                      <Brain size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-indigo-800 mb-1">Personalized Insight:</p>
                        <p className="text-sm text-indigo-700">
                          {personalizedContext.allocation}. With your {userProfile.riskTolerance || 'moderate'} risk profile 
                          and {userProfile.age || 30} age, this theme aligns with growth objectives. 
                          Consider SIP of ₹{Math.round(((userProfile.income || 600000) * 0.05) / 12).toLocaleString()} monthly.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Button
                onClick={handleCopilotClick}
                className="absolute top-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-lg"
                size="sm"
              >
                <MessageCircle size={16} />
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
                  <div className="text-xl font-bold">{smallcaseData.minInvestment}</div>
                  <div className="text-sm text-gray-600">Min Investment</div>
                  <div className="text-xs text-indigo-600 mt-1">Low entry barrier</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Layers className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl font-bold">{smallcaseData.stocks}</div>
                  <div className="text-sm text-gray-600">Stocks</div>
                  <div className="text-xs text-blue-600 mt-1">Well diversified</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-xl font-bold">{smallcaseData.returns}</div>
                  <div className="text-sm text-gray-600">CAGR</div>
                  <div className="text-xs text-green-600 mt-1">Strong performance</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-red-600" />
                  <div className="text-xl font-bold">{smallcaseData.volatility}</div>
                  <div className="text-sm text-gray-600">Risk Level</div>
                  <div className="text-xs text-red-600 mt-1">High volatility</div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio Composition & Performance */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle>Top Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { stock: 'Tesla Motors', weight: '12.5%', price: '₹15,240' },
                      { stock: 'Tata Motors', weight: '10.8%', price: '₹642' },
                      { stock: 'Mahindra & Mahindra', weight: '9.2%', price: '₹2,845' },
                      { stock: 'Bajaj Auto', weight: '8.7%', price: '₹8,965' },
                      { stock: 'Hero MotoCorp', weight: '7.9%', price: '₹4,123' }
                    ].map((holding, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{holding.stock}</div>
                          <div className="text-sm text-gray-600">{holding.price}</div>
                        </div>
                        <div className="font-semibold text-indigo-600">{holding.weight}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle>Investment Strategy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-indigo-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">Theme: Electric Mobility</h4>
                      <p className="text-indigo-700 text-sm">
                        Invest in the future of transportation with companies leading the electric vehicle revolution.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Rebalancing</span>
                        <span className="font-medium">Quarterly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Investment Horizon</span>
                        <span className="font-medium">3-5 Years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Risk Category</span>
                        <span className="font-medium text-red-600">High Risk</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default SmallcaseResearch;

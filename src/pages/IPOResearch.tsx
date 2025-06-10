
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, Bell, TrendingUp, Calendar, Users, BarChart3, Brain, MessageCircle, CheckCircle, AlertCircle, Target } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ViewToggle from '@/components/ViewToggle';
import IPODetailedView from '@/components/IPODetailedView';

const IPOResearch = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');
  const [showCopilot, setShowCopilot] = useState(false);

  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const ipoData = {
    companyName: symbol ? `${symbol.toUpperCase()} Ltd.` : 'TechCorp Ltd.',
    symbol: symbol?.toUpperCase() || 'TECH',
    priceRange: '₹280-300',
    lotSize: 50,
    openDate: '2024-01-15',
    closeDate: '2024-01-17',
    listingDate: '2024-01-22',
    issueSize: '₹2,500 Cr'
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const riskTolerance = userProfile.riskTolerance || 'moderate';
    const investmentGoal = userProfile.investmentGoal || 'wealth creation';
    const portfolioSize = userProfile.portfolioValue || 500000;

    if (riskTolerance === 'high' && portfolioSize > 1000000) {
      return {
        match: 88,
        reason: 'Strong growth potential aligns with your high risk appetite and substantial portfolio.',
        suggestion: 'Consider applying for maximum lots given your risk capacity and portfolio size.',
        allocation: `Suggested allocation: ₹${Math.min(portfolioSize * 0.05, 200000).toLocaleString()} (5% of portfolio)`
      };
    } else if (riskTolerance === 'moderate') {
      return {
        match: 75,
        reason: 'Reasonable investment for moderate risk profile with good fundamentals.',
        suggestion: 'Apply for 1-2 lots as speculative investment within risk limits.',
        allocation: `Suggested allocation: ₹${Math.min(portfolioSize * 0.02, 50000).toLocaleString()} (2% of portfolio)`
      };
    } else {
      return {
        match: 60,
        reason: 'High volatility expected post-listing may not suit conservative investors.',
        suggestion: 'Consider waiting for listing and price stabilization before investing.',
        allocation: 'Consider avoiding or very minimal allocation'
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
              <h1 className="text-xl font-bold text-gray-900">IPO Research</h1>
              <p className="text-sm text-gray-600">AI-powered IPO analysis</p>
            </div>
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
          </div>

          {/* Personalized Match Score */}
          <Card className="mb-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-gray-900">
                      {personalizedContext.match}% Match for You
                    </h3>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      {userProfile.riskTolerance || 'Moderate'} Risk
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{personalizedContext.reason}</p>
                  <p className="text-xs text-green-600 font-medium">{personalizedContext.suggestion}</p>
                </div>
                <Button 
                  onClick={handleCopilotClick}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Brain size={16} className="mr-2" />
                  Ask AI
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* IPO Header */}
          <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{ipoData.companyName}</h1>
                  <p className="text-gray-600">{ipoData.symbol}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Open for Subscription
                    </span>
                    <span className="text-sm text-gray-600">
                      {ipoData.openDate} - {ipoData.closeDate}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">{ipoData.priceRange}</div>
                  <p className="text-gray-600">Price Band</p>
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
                Watchlist
              </Button>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus size={16} className="mr-2" />
              Apply Now
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
                      <h4 className="font-semibold text-green-800 mb-2">Recommendation: SUBSCRIBE</h4>
                      <p className="text-green-700">
                        Strong fundamentals with growing market opportunity. Reasonable valuation compared to peers.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Strong revenue growth of 45% CAGR over last 3 years</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Market leader in emerging tech segment with competitive moats</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                        <p className="text-sm">Experienced management team with strong execution track record</p>
                      </div>
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                        <p className="text-sm">High valuation compared to traditional players - expect volatility</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
                      <div className="flex items-start gap-2">
                        <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-blue-800 mb-1">Personalized Insight:</p>
                          <p className="text-sm text-blue-700">
                            {personalizedContext.allocation}. Given your {userProfile.riskTolerance || 'moderate'} risk profile, 
                            this IPO fits within your investment strategy. Consider applying through multiple categories to increase allotment chances.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Button
                  onClick={handleCopilotClick}
                  className="absolute top-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg"
                  size="sm"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>

              {/* Key Details */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <div className="text-xl font-bold">{ipoData.issueSize}</div>
                    <div className="text-sm text-gray-600">Issue Size</div>
                    <div className="text-xs text-blue-600 mt-1">Large offering</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Users className="w-8 h-8 mx-auto mb-2 text-green-600" />
                    <div className="text-xl font-bold">{ipoData.lotSize}</div>
                    <div className="text-sm text-gray-600">Lot Size</div>
                    <div className="text-xs text-green-600 mt-1">Min investment ₹14K</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                    <div className="text-xl font-bold">{ipoData.listingDate}</div>
                    <div className="text-sm text-gray-600">Listing Date</div>
                    <div className="text-xs text-purple-600 mt-1">Expected</div>
                  </CardContent>
                </Card>
                <Card className="bg-white/70 backdrop-blur-md border-white/20">
                  <CardContent className="p-4 text-center">
                    <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                    <div className="text-xl font-bold">8.5/10</div>
                    <div className="text-sm text-gray-600">AI Rating</div>
                    <div className="text-xs text-orange-600 mt-1">Strong fundamentals</div>
                  </CardContent>
                </Card>
              </div>

              {/* Company Overview */}
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle>Company Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">
                    TechCorp Ltd. is a leading technology company specializing in AI-driven solutions for enterprises. 
                    The company has shown consistent growth and innovation in the rapidly expanding tech sector.
                  </p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Industry</span>
                        <span className="font-medium">Technology</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Founded</span>
                        <span className="font-medium">2018</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Employees</span>
                        <span className="font-medium">2,500+</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Revenue (FY23)</span>
                        <span className="font-medium">₹1,200 Cr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Net Profit (FY23)</span>
                        <span className="font-medium">₹180 Cr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROE</span>
                        <span className="font-medium">18.5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed View CTA */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Want Complete IPO Analysis?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get detailed financials, promoter background, and comprehensive risk assessment
                  </p>
                  <Button 
                    onClick={() => setCurrentView('detailed')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <BarChart3 size={16} className="mr-2" />
                    View Detailed Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <IPODetailedView />
          )}
        </div>
      </div>
    </TooltipProvider>
  );
};

export default IPOResearch;

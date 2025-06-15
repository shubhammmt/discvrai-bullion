
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Bell, Heart, BarChart3, Brain, MessageCircle, Target, TrendingUp, TrendingDown, FolderPlus, Edit } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import StockHeader from '@/components/StockHeader';
import AIInsight from '@/components/AIInsight';
import QuickChart from '@/components/QuickChart';
import CompanyOverview from '@/components/CompanyOverview';
import StockQA from '@/components/StockQA';
import FinanceCopilot from '@/components/FinanceCopilot';
import ViewToggle from '@/components/ViewToggle';
import EnhancedDetailedView from '@/components/EnhancedDetailedView';
import LatestNews from '@/components/LatestNews';
import ResearchSharing from '@/components/ResearchSharing';
import PortfolioAddModal from '@/components/PortfolioAddModal';

const StockResearch = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');
  const [showCopilot, setShowCopilot] = useState(false);
  
  // Get user profile for personalized insights
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const stockData = {
    symbol: symbol?.toUpperCase() || 'AAPL',
    companyName: symbol?.toUpperCase() === 'AAPL' ? 'Apple Inc.' : `${symbol?.toUpperCase()} Inc.`,
    price: 162.80,
    change: 3.25,
    changePercent: 2.04
  };

  const aiInsightData = {
    sentiment: 'bullish' as const,
    confidence: 78,
    summary: 'Strong quality fundamentals with robust cash position and expanding services revenue. Recent AI integration and product innovation support positive outlook despite moderate growth concerns and market volatility.',
    keyPoints: [
      'Exceptional quality score (8.5/10) driven by $162B cash and 25% net margins',
      'Services revenue growing at 16.9% YoY, highest margin business segment',
      'Strong technical momentum above key support levels',
      'Moderate risk from China dependency and market saturation concerns'
    ],
    recommendation: `Suitable for ${userProfile.riskTolerance || 'moderate'} risk investors seeking quality growth. Best for 3-5 year investment horizon based on your profile.`
  };

  // Personalized contextual insights based on user profile
  const getPersonalizedContext = () => {
    const riskLevel = userProfile.riskTolerance || 'moderate';
    const investmentGoals = userProfile.investmentGoals || [];
    const hasRetirement = investmentGoals.includes('retirement');
    const hasWealth = investmentGoals.includes('wealth-building');

    if (riskLevel === 'conservative') {
      return {
        match: 65,
        reason: 'Moderate fit for conservative investors. Strong dividend history but higher volatility than bonds.',
        suggestion: 'Consider smaller allocation (5-10%) as part of diversified portfolio.'
      };
    } else if (riskLevel === 'moderate') {
      return {
        match: 85,
        reason: 'Excellent match! Quality growth stock with reasonable valuation for moderate risk profile.',
        suggestion: 'Good core holding. Consider 10-15% allocation in equity portion.'
      };
    } else {
      return {
        match: 75,
        reason: 'Good quality pick but may be less exciting for aggressive growth seekers.',
        suggestion: 'Solid foundation stock. Balance with higher growth opportunities.'
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
              <h1 className="text-xl font-bold text-gray-900">{stockData.symbol}</h1>
              <p className="text-sm text-gray-600">AI-powered research insights</p>
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

          {/* Stock Header */}
          <StockHeader {...stockData} />

          {/* Enhanced Quick Actions Bar with Portfolio CTAs */}
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
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-gray-600"
                onClick={() => navigate('/portfolio')}
              >
                <BarChart3 size={16} className="mr-2" />
                View Portfolio
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <PortfolioAddModal
                assetName={stockData.companyName}
                assetSymbol={stockData.symbol}
                assetType="stock"
                currentPrice={stockData.price}
                trigger={
                  <Button size="sm" variant="outline" className="bg-green-50 border-green-200 text-green-700 hover:bg-green-100">
                    <FolderPlus size={16} className="mr-2" />
                    Add to Portfolio
                  </Button>
                }
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus size={16} className="mr-2" />
                Buy Stock
              </Button>
            </div>
          </div>

          {/* Content based on view */}
          {currentView === 'quick' ? (
            <div className="space-y-6">
              {/* AI Insight with enhanced personalization */}
              <div className="relative">
                <AIInsight {...aiInsightData} />
                <Button
                  onClick={handleCopilotClick}
                  className="absolute top-4 right-4 bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-full shadow-lg"
                  size="sm"
                >
                  <MessageCircle size={16} />
                </Button>
              </div>
              
              {/* Quick Stats with AI Context */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-600" />
                    Key Metrics & AI Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">28.4</div>
                      <div className="text-xs text-gray-600">P/E Ratio</div>
                      <div className="text-xs text-orange-600 mt-1">Above sector avg</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-lg font-bold text-green-600">25%</div>
                      <div className="text-xs text-gray-600">Net Margin</div>
                      <div className="text-xs text-green-600 mt-1">Excellent</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">$162B</div>
                      <div className="text-xs text-gray-600">Cash</div>
                      <div className="text-xs text-blue-600 mt-1">Strong position</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">16.9%</div>
                      <div className="text-xs text-gray-600">Services Growth</div>
                      <div className="text-xs text-purple-600 mt-1">Key driver</div>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start gap-2">
                      <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 mb-1">AI Analysis:</p>
                        <p className="text-sm text-blue-700">
                          Strong fundamentals justify premium valuation. Services segment driving margin expansion 
                          and recurring revenue growth. Cash position provides flexibility for strategic investments.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid lg:grid-cols-1 gap-6">
                <QuickChart />
              </div>
              
              <div className="grid lg:grid-cols-2 gap-6">
                <CompanyOverview />
                <StockQA />
              </div>
              
              <LatestNews />
              <ResearchSharing />

              {/* Enhanced Detailed View CTA with Portfolio Integration */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Need Deeper Analysis?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Access detailed financials, analyst ratings, and comprehensive research
                      </p>
                      <Button 
                        onClick={() => setCurrentView('detailed')}
                        className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                      >
                        <BarChart3 size={16} className="mr-2" />
                        Deep Dive Analysis
                      </Button>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Ready to Invest?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Add to your portfolio or update your existing holdings
                      </p>
                      <div className="space-y-2">
                        <PortfolioAddModal
                          assetName={stockData.companyName}
                          assetSymbol={stockData.symbol}
                          assetType="stock"
                          currentPrice={stockData.price}
                          trigger={
                            <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                              <FolderPlus size={16} className="mr-2" />
                              Add to Portfolio
                            </Button>
                          }
                        />
                        <Button 
                          variant="outline" 
                          className="w-full"
                          onClick={() => navigate('/portfolio-update')}
                        >
                          <Edit size={16} className="mr-2" />
                          Manage Full Portfolio
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <EnhancedDetailedView />
            </div>
          )}

          <FinanceCopilot />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StockResearch;

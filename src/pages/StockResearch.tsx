
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Bell, Heart, BarChart3, Brain, MessageCircle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import StockHeader from '@/components/StockHeader';
import AIInsight from '@/components/AIInsight';
import QuickChart from '@/components/QuickChart';
import CompanyOverview from '@/components/CompanyOverview';
import StockQA from '@/components/StockQA';
import FinanceCopilot from '@/components/FinanceCopilot';
import ViewToggle from '@/components/ViewToggle';
import EnhancedDetailedView from '@/components/EnhancedDetailedView';
import KeyMetrics from '@/components/KeyMetrics';
import LatestNews from '@/components/LatestNews';
import ResearchSharing from '@/components/ResearchSharing';
import ResearchCTA from '@/components/ResearchCTA';

const StockResearch = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');
  const [showCopilot, setShowCopilot] = useState(false);

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
    recommendation: 'Suitable for moderate risk investors seeking quality growth. Best for 3-5 year investment horizon based on your profile.'
  };

  const handleCopilotClick = () => {
    setShowCopilot(true);
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto p-3 sm:p-4">
          {/* Header with Navigation and Actions */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20 text-sm px-3 py-2 flex-shrink-0"
              >
                <ArrowLeft size={14} />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Stock Research</h1>
                <p className="text-gray-600 text-xs sm:text-sm truncate">AI-powered investment insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
              
              {/* Action buttons - Now with floating sticky behavior on mobile */}
              <div className="fixed bottom-20 right-4 sm:relative sm:bottom-auto sm:right-auto flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-lg p-1 border border-white/20 shadow-lg sm:shadow-none z-30">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Bell size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set price alerts</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Heart size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to watchlist</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <BarChart3 size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Advanced charts</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 w-8 p-0 text-purple-600"
                      onClick={handleCopilotClick}
                    >
                      <Brain size={14} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Ask AI Copilot</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md text-sm px-3 py-2 flex-shrink-0">
                    <Plus size={14} className="mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Buy Stock</span>
                    <span className="sm:hidden">Buy</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Execute buy order</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>

          {/* Stock Header */}
          <StockHeader {...stockData} />

          {/* Research CTA */}
          <ResearchCTA />

          {/* Content based on view */}
          {currentView === 'quick' ? (
            <div className="space-y-4 sm:space-y-6">
              {/* AI Insight with Copilot CTA */}
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
              
              {/* Chart Layout with Copilot CTA */}
              <div className="grid lg:grid-cols-1 gap-4 sm:gap-6">
                <div className="relative">
                  <QuickChart />
                  <Button
                    onClick={handleCopilotClick}
                    variant="outline"
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-md border-purple-200 text-purple-600 hover:bg-purple-50"
                    size="sm"
                  >
                    <Brain size={14} className="mr-2" />
                    Ask AI
                  </Button>
                </div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                <div className="relative">
                  <CompanyOverview />
                  <Button
                    onClick={handleCopilotClick}
                    variant="ghost"
                    className="absolute top-4 right-4 text-purple-600 hover:bg-purple-50"
                    size="sm"
                  >
                    <Brain size={14} />
                  </Button>
                </div>
                <div className="relative">
                  <StockQA />
                  <Button
                    onClick={handleCopilotClick}
                    variant="ghost"
                    className="absolute top-4 right-4 text-purple-600 hover:bg-purple-50"
                    size="sm"
                  >
                    <MessageCircle size={14} />
                  </Button>
                </div>
              </div>
              
              {/* Latest News & Key Metrics Section - Now properly aligned */}
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
                <LatestNews />
                <KeyMetrics />
              </div>

              {/* Research Sharing - Moved toward bottom */}
              <div id="research-sharing">
                <ResearchSharing />
              </div>

              {/* Detailed View CTA */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Want More In-Depth Analysis?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Get detailed financial statements, analyst ratings, and comprehensive research
                  </p>
                  <Button 
                    onClick={() => setCurrentView('detailed')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <BarChart3 size={16} className="mr-2" />
                    Switch to Detailed View
                  </Button>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div id="research-sharing">
                <ResearchSharing />
              </div>
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

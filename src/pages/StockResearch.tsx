
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Bell, Heart, BarChart3 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import StockHeader from '@/components/StockHeader';
import AIInsight from '@/components/AIInsight';
import QuickChart from '@/components/QuickChart';
import CompanyOverview from '@/components/CompanyOverview';
import StockQA from '@/components/StockQA';
import FinanceCopilot from '@/components/FinanceCopilot';
import ViewToggle from '@/components/ViewToggle';
import EnhancedDetailedView from '@/components/EnhancedDetailedView';

const StockResearch = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');

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

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto p-4">
          {/* Header with Navigation and Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 bg-white/70 backdrop-blur-md border-white/20"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Stock Research</h1>
                <p className="text-gray-600 text-sm">AI-powered investment insights</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
              
              {/* Actionable Icons with Tooltips */}
              <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-lg p-1 border border-white/20">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Bell size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Set price alerts</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Heart size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Add to watchlist</p>
                  </TooltipContent>
                </Tooltip>
                
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <BarChart3 size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Advanced charts</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {/* Primary Action */}
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-md">
                    <Plus size={16} className="mr-2" />
                    Buy Stock
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

          {/* Content based on view */}
          {currentView === 'quick' ? (
            <div className="space-y-6">
              <AIInsight {...aiInsightData} />
              <QuickChart />
              <div className="grid lg:grid-cols-2 gap-6">
                <CompanyOverview />
                <StockQA />
              </div>
            </div>
          ) : (
            <EnhancedDetailedView />
          )}

          <FinanceCopilot />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StockResearch;

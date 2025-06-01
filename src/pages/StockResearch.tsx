
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, Share2, Bell } from 'lucide-react';
import StockHeader from '@/components/StockHeader';
import AIInsight from '@/components/AIInsight';
import QuickChart from '@/components/QuickChart';
import CompanyOverview from '@/components/CompanyOverview';
import StockQA from '@/components/StockQA';
import FinanceCopilot from '@/components/FinanceCopilot';

const StockResearch = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isInShortlist, setIsInShortlist] = useState(false);

  // Mock data - in real app, this would come from API based on symbol
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

  const handleAddToShortlist = () => {
    setIsInShortlist(!isInShortlist);
    // In real app, this would update the user's shortlist
  };

  const handleSetAlert = () => {
    // In real app, this would open alert creation modal
    console.log('Setting alert for', symbol);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header with Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Stock Research</h1>
              <p className="text-gray-600 text-sm">AI-powered investment insights</p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              onClick={handleSetAlert}
              className="flex items-center gap-2"
            >
              <Bell size={16} />
              Set Alert
            </Button>
            <Button 
              variant={isInShortlist ? "default" : "outline"}
              onClick={handleAddToShortlist}
              className="flex items-center gap-2"
            >
              {isInShortlist ? <Heart size={16} fill="currentColor" /> : <Plus size={16} />}
              {isInShortlist ? 'In Shortlist' : 'Add to Shortlist'}
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 size={16} />
              Share
            </Button>
          </div>
        </div>

        {/* Stock Header */}
        <StockHeader {...stockData} />

        {/* Main Content */}
        <div className="space-y-6">
          {/* AI Insights - Primary Focus */}
          <AIInsight {...aiInsightData} />

          {/* Chart */}
          <QuickChart />

          {/* Grid Layout for Additional Information */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <CompanyOverview />
              
              {/* Risk Profile Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Overall Risk Score</span>
                      <span className="font-semibold text-yellow-600">6/10 (Moderate)</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Volatility</span>
                      <span className="font-semibold">Medium</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Liquidity</span>
                      <span className="font-semibold text-green-600">High</span>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Suitability:</strong> Matches your moderate risk profile and long-term investment horizon.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <StockQA />
              
              {/* Key Metrics Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Key Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Market Cap</span>
                      <p className="font-semibold">$2.89T</p>
                    </div>
                    <div>
                      <span className="text-gray-600">P/E Ratio</span>
                      <p className="font-semibold">28.4</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Dividend Yield</span>
                      <p className="font-semibold">0.52%</p>
                    </div>
                    <div>
                      <span className="text-gray-600">52W Range</span>
                      <p className="font-semibold">$124-$199</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Finance Copilot */}
        <FinanceCopilot />
      </div>
    </div>
  );
};

export default StockResearch;

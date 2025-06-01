
import React, { useState } from 'react';
import StockHeader from '@/components/StockHeader';
import AIInsight from '@/components/AIInsight';
import QuickChart from '@/components/QuickChart';
import CompanyOverview from '@/components/CompanyOverview';
import LatestNews from '@/components/LatestNews';
import ViewToggle from '@/components/ViewToggle';
import EnhancedDetailedView from '@/components/EnhancedDetailedView';
import StockQA from '@/components/StockQA';
import FinanceCopilot from '@/components/FinanceCopilot';

const Index = () => {
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');

  // Mock data for Apple Inc (AAPL)
  const stockData = {
    symbol: 'AAPL',
    companyName: 'Apple Inc.',
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
    recommendation: 'ACCUMULATE for long-term investors seeking quality growth. Best suited for moderate risk tolerance with 3-5 year investment horizon.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Compact Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              StockSnap
            </h1>
            <p className="text-gray-600 text-sm">Smart investing decisions in 30 seconds</p>
          </div>
          <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
        </div>

        {/* Stock Header - Always visible */}
        <StockHeader {...stockData} />

        {currentView === 'quick' ? (
          // Quick View - Decision-making viewport
          <div className="space-y-6">
            <AIInsight {...aiInsightData} />
            <QuickChart />
            <div className="grid lg:grid-cols-2 gap-6">
              <CompanyOverview />
              <div className="space-y-6">
                <StockQA />
                <LatestNews />
              </div>
            </div>
          </div>
        ) : (
          // Enhanced Detailed View - Comprehensive analysis
          <div className="space-y-6">
            <AIInsight {...aiInsightData} />
            <QuickChart />
            <StockQA />
            <EnhancedDetailedView />
          </div>
        )}

        {/* Finance Copilot - Always available */}
        <FinanceCopilot />

        {/* Footer */}
        <footer className="text-center mt-8 py-6 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            StockSnap • Making smart investing decisions simple and fast
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

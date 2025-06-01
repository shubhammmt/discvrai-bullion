
import React, { useState } from 'react';
import StockHeader from '@/components/StockHeader';
import AIInsight from '@/components/AIInsight';
import QuickChart from '@/components/QuickChart';
import KeyMetrics from '@/components/KeyMetrics';
import LatestNews from '@/components/LatestNews';
import ViewToggle from '@/components/ViewToggle';
import DetailedView from '@/components/DetailedView';

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
    summary: 'Strong fundamentals with solid earnings growth, robust cash position, and expanding services revenue. Recent AI integration announcements and product innovation cycle support positive outlook despite broader market volatility.',
    keyPoints: [
      'Services revenue growing at 16.9% YoY, highest margin segment',
      'Strong iPhone 15 launch cycle with AI features driving upgrade demand',
      'Cash position of $162B provides flexibility for growth investments',
      'Trading at reasonable 28.5x P/E vs historical average of 24x'
    ],
    recommendation: 'BUY with 12-month price target of $195 (+19.8% upside). Consider accumulating on any weakness below $155.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            StockSnap
          </h1>
          <p className="text-gray-600 text-lg">Smart investing decisions in 30 seconds</p>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
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
              <KeyMetrics />
              <LatestNews />
            </div>
          </div>
        ) : (
          // Detailed View - Comprehensive analysis
          <DetailedView />
        )}

        {/* Footer */}
        <footer className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            StockSnap • Making smart investing decisions simple and fast
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

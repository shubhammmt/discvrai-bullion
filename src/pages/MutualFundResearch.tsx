
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Heart, Bell, TrendingUp, PieChart, Target } from 'lucide-react';
import ViewToggle from '@/components/ViewToggle';
import MutualFundDetailedView from '@/components/MutualFundDetailedView';

const MutualFundResearch = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [currentView, setCurrentView] = useState<'quick' | 'detailed'>('quick');

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
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
              <h1 className="text-2xl font-bold text-gray-900">Mutual Fund Research</h1>
              <p className="text-gray-600 text-sm">AI-powered fund analysis</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <ViewToggle currentView={currentView} onViewChange={setCurrentView} />
            
            <div className="flex items-center gap-2 bg-white/70 backdrop-blur-md rounded-lg p-1 border border-white/20">
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                <Bell size={16} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-8 w-8 p-0"
                onClick={() => setIsInWatchlist(!isInWatchlist)}
              >
                <Heart size={16} fill={isInWatchlist ? "currentColor" : "none"} />
              </Button>
            </div>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              Invest Now
            </Button>
          </div>
        </div>

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

        {currentView === 'quick' ? (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <div className="text-xl font-bold">{fundData.aum}</div>
                  <div className="text-sm text-gray-600">AUM</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <PieChart className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <div className="text-xl font-bold">{fundData.expenseRatio}</div>
                  <div className="text-sm text-gray-600">Expense Ratio</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <div className="text-xl font-bold">12.5%</div>
                  <div className="text-sm text-gray-600">3Y Returns</div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <div className="text-xl font-bold">9.2/10</div>
                  <div className="text-sm text-gray-600">AI Score</div>
                </CardContent>
              </Card>
            </div>

            {/* AI Analysis */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle>AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">Recommendation: BUY</h4>
                  <p className="text-green-700">
                    Excellent track record with consistent outperformance. Low expense ratio and strong fund management team.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm">Consistently outperformed benchmark by 2-3% annually</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm">Strong portfolio of quality large-cap stocks</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <p className="text-sm">Experienced fund manager with 15+ years track record</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Chart */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle>Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>1 Year</span>
                    <div className="flex gap-4">
                      <span className="text-blue-600 font-medium">Fund: 18.5%</span>
                      <span className="text-gray-600">Benchmark: 15.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>3 Years</span>
                    <div className="flex gap-4">
                      <span className="text-blue-600 font-medium">Fund: 12.5%</span>
                      <span className="text-gray-600">Benchmark: 10.1%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>5 Years</span>
                    <div className="flex gap-4">
                      <span className="text-blue-600 font-medium">Fund: 14.8%</span>
                      <span className="text-gray-600">Benchmark: 12.3%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <MutualFundDetailedView />
        )}
      </div>
    </div>
  );
};

export default MutualFundResearch;

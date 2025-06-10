
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Brain, Send, Target, ArrowRight, Sparkles, Search, Users, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIResultCard from '@/components/AIResultCard';
import AssetCard from '@/components/AssetCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResults, setAiResults] = useState<any[]>([]);

  // Enhanced personalized assets with reasoning
  const personalizedAssets = [
    {
      id: 1,
      name: 'Apple Inc.',
      symbol: 'AAPL',
      type: 'stock',
      price: 162.80,
      change: 3.25,
      changePercent: 2.04,
      volume: '45.2M',
      latestEvent: 'Earnings Beat',
      news: 'Q4 revenue exceeds expectations',
      routePath: '/research/stock/AAPL',
      reasoning: 'Matches your moderate risk profile. Strong fundamentals with ₹162B cash and consistent dividend growth.'
    },
    {
      id: 2,
      name: 'HDFC Top 100 Fund',
      symbol: 'HDFC100',
      type: 'mutual-fund',
      price: 645.20,
      change: -2.45,
      changePercent: -0.38,
      volume: '2.1M',
      latestEvent: 'Dividend Declaration',
      news: 'Declared interim dividend of ₹8 per unit',
      routePath: '/research/mutual-fund/hdfc-top-100',
      reasoning: 'Perfect for your SIP goals. Diversified portfolio with 14% annual returns over 5 years.'
    },
    {
      id: 3,
      name: 'Government Bond 2034',
      symbol: 'GOI-2034',
      type: 'bonds',
      price: 102.50,
      change: 0.15,
      changePercent: 0.15,
      volume: '50K',
      latestEvent: 'Interest Payment',
      news: 'Semi-annual coupon payment due',
      routePath: '/research/bond/goi-2034',
      reasoning: 'Safe investment for your portfolio. Guaranteed returns matching your conservative allocation needs.'
    }
  ];

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Generate AI results based on search
    const filtered = personalizedAssets.filter(asset => 
      searchQuery.toLowerCase().includes('safe') ? asset.type !== 'stock' :
      searchQuery.toLowerCase().includes('growth') ? asset.type === 'stock' :
      true
    );
    
    setAiResults(filtered);
  };

  const quickPrompts = [
    "Safe investments for me",
    "Growth opportunities", 
    "Monthly SIP options",
    "Fixed income plans"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto p-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Hello, {userProfile.name || 'Investor'}!</h1>
          <p className="text-gray-600">Discover investments tailored for you</p>
        </div>

        {/* AI Search */}
        <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Ask DiscvrAI
                </h3>
                <p className="text-xs text-gray-600">Get personalized investment suggestions</p>
              </div>
            </div>

            <form onSubmit={handleAISearch} className="flex gap-2 mb-3">
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What investments are you looking for?"
                className="flex-1"
              />
              <Button type="submit" size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Send size={16} />
              </Button>
            </form>

            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(prompt)}
                  className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded-full"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Results */}
        {aiResults.length > 0 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiResults.map((asset, index) => (
                  <AIResultCard 
                    key={asset.id} 
                    asset={asset} 
                    userQuery={searchQuery}
                    matchScore={95 - (index * 5)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Discovery */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Recommended For You
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/feed')}>
                View All <ArrowRight size={14} className="ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personalizedAssets.map((asset) => (
                <div key={asset.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{asset.name}</h3>
                      <p className="text-sm text-gray-600">{asset.symbol} • {asset.type.toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">₹{asset.price}</p>
                      <div className={`flex items-center gap-1 ${asset.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {asset.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span className="text-sm font-medium">
                          {asset.change >= 0 ? '+' : ''}{asset.changePercent}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                    <div className="flex items-start gap-2">
                      <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 mb-1">Why recommended:</p>
                        <p className="text-sm text-blue-700">{asset.reasoning}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {asset.latestEvent}: {asset.news}
                    </div>
                    <Button 
                      onClick={() => navigate(asset.routePath)}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      View & Buy
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={() => navigate('/portfolio')}
            className="h-16 bg-gradient-to-r from-green-600 to-blue-600"
          >
            <Users size={20} className="mr-2" />
            My Portfolio
          </Button>
          <Button 
            onClick={() => navigate('/feed')}
            variant="outline"
            className="h-16"
          >
            <Search size={20} className="mr-2" />
            Explore More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

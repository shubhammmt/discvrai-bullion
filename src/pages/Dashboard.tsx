
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TrendingUp, Brain, Send, Target, ArrowRight, Sparkles, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import AIResultCard from '@/components/AIResultCard';
import AssetCard from '@/components/AssetCard';

const Dashboard = () => {
  const navigate = useNavigate();
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const [searchQuery, setSearchQuery] = useState('');
  const [aiResults, setAiResults] = useState<any[]>([]);

  // Simplified trending assets for personalized feed
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
      routePath: '/research/stock/AAPL'
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
      routePath: '/research/mutual-fund/hdfc-top-100'
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
      routePath: '/research/bond/goi-2034'
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

        {/* Personalized Feed */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                For You
              </div>
              <Button variant="outline" size="sm" onClick={() => navigate('/feed')}>
                View All <ArrowRight size={14} className="ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personalizedAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
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
            View Portfolio
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

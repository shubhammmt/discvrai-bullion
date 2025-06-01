
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp, Heart, BarChart3, Bell } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import FeedSearch from '@/components/FeedSearch';
import AssetCard from '@/components/AssetCard';
import PersonalizedSection from '@/components/PersonalizedSection';

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Set filter based on URL parameter
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      setActiveFilter(filterParam);
    }
  }, [searchParams]);

  // Mock user profile from onboarding
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'mutual-funds', label: 'Mutual Funds' },
    { id: 'etfs', label: 'ETFs' },
    { id: 'ipo', label: 'IPOs' },
    { id: 'smallcase', label: 'Smallcase' },
    { id: 'credit', label: 'Credit' },
    { id: 'credit-cards', label: 'Credit Cards' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'crypto', label: 'Crypto' }
  ];

  // Mock trending assets
  const trendingAssets = [
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
      news: 'Q4 revenue exceeds expectations'
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
      news: 'Declared interim dividend of ₹8 per unit'
    },
    {
      id: 3,
      name: 'TechCorp IPO',
      symbol: 'TECH',
      type: 'ipo',
      price: 290.00,
      change: 15.00,
      changePercent: 5.45,
      volume: '1.2M',
      latestEvent: 'IPO Opening',
      news: 'Subscription opens today'
    },
    {
      id: 4,
      name: 'Electric Mobility Smallcase',
      symbol: 'ELEC-MOB',
      type: 'smallcase',
      price: 24.5,
      change: 2.1,
      changePercent: 9.38,
      volume: '800K',
      latestEvent: 'Rebalancing',
      news: 'Portfolio rebalanced with new EV stocks'
    },
    {
      id: 5,
      name: 'HDFC Personal Loan',
      symbol: 'HDFC-PL',
      type: 'credit',
      price: 10.5,
      change: -0.25,
      changePercent: -2.27,
      volume: '500K',
      latestEvent: 'Rate Reduction',
      news: 'Interest rates reduced by 0.25%'
    },
    {
      id: 6,
      name: 'HDFC Regalia Credit Card',
      symbol: 'HDFC-REG',
      type: 'credit-cards',
      price: 4.0,
      change: 0,
      changePercent: 0,
      volume: '200K',
      latestEvent: 'New Benefits',
      news: 'Added airport lounge access'
    },
    {
      id: 7,
      name: 'Max Life Term Plan',
      symbol: 'MAX-TERM',
      type: 'insurance',
      price: 24000,
      change: 0,
      changePercent: 0,
      volume: '100K',
      latestEvent: 'New Features',
      news: 'Added critical illness cover'
    }
  ];

  // Filter assets based on active filter
  const filteredAssets = activeFilter === 'all' 
    ? trendingAssets 
    : trendingAssets.filter(asset => {
        if (activeFilter === 'mutual-funds') return asset.type === 'mutual-fund';
        if (activeFilter === 'credit-cards') return asset.type === 'credit-cards';
        return asset.type === activeFilter;
      });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Investment Feed
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Discover opportunities tailored for you</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigate('/research')}
            >
              <Search size={16} className="mr-2" />
              Research
            </Button>
            <Button variant="outline" size="sm">
              <Bell size={16} className="mr-2" />
              Alerts
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 size={16} className="mr-2" />
              Portfolio
            </Button>
          </div>
        </div>

        {/* Search Section */}
        <FeedSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? 'default' : 'outline'}
              onClick={() => setActiveFilter(filter.id)}
              className="whitespace-nowrap"
            >
              {filter.label}
            </Button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trending Section */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  {activeFilter === 'all' ? 'Trending Now' : `Trending ${filters.find(f => f.id === activeFilter)?.label}`}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssets.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                  ))}
                  {filteredAssets.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No assets found for the selected filter.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Recommended for You
                  <span className="text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full ml-2">
                    AI Powered
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      <strong>Why we recommend these:</strong> Based on your {userProfile.riskTolerance?.toLowerCase()} risk profile and preference for {userProfile.preferredInstruments?.join(', ')}.
                    </p>
                  </div>
                  {trendingAssets.slice(0, 2).map((asset) => (
                    <AssetCard key={`rec-${asset.id}`} asset={asset} showReason />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <PersonalizedSection userProfile={userProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;

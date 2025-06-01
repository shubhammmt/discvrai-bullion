
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, TrendingUp, Heart, BarChart3, Bell } from 'lucide-react';
import FeedSearch from '@/components/FeedSearch';
import AssetCard from '@/components/AssetCard';
import PersonalizedSection from '@/components/PersonalizedSection';

const Feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock user profile from onboarding
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'stocks', label: 'Stocks' },
    { id: 'mutual-funds', label: 'Mutual Funds' },
    { id: 'etfs', label: 'ETFs' },
    { id: 'ipo', label: 'IPOs' },
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
      name: 'Bitcoin',
      symbol: 'BTC',
      type: 'crypto',
      price: 43250.00,
      change: 1250.50,
      changePercent: 2.98,
      volume: '892K',
      latestEvent: 'ETF Approval',
      news: 'New Bitcoin ETF approved by SEC'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Investment Feed
            </h1>
            <p className="text-gray-600">Discover opportunities tailored for you</p>
          </div>
          <div className="flex items-center gap-3">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Trending Now
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trendingAssets.map((asset) => (
                    <AssetCard key={asset.id} asset={asset} />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-purple-600" />
                  Recommended for You
                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full ml-2">
                    AI Powered
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700 mb-2">
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

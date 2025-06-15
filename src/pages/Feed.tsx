import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, BarChart3, Bell, Search, Brain, Sparkles, FolderPlus, Edit } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AIFeedChat from '@/components/AIFeedChat';
import AIResultCard from '@/components/AIResultCard';
import AssetCard from '@/components/AssetCard';
import ProfileEnhancementPrompt from '@/components/ProfileEnhancementPrompt';
import DesktopSidebar from '@/components/DesktopSidebar';
import PortfolioAddModal from '@/components/PortfolioAddModal';

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const [currentQuery, setCurrentQuery] = useState('');
  const [aiResults, setAiResults] = useState<any[]>([]);
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
    { id: 'bonds', label: 'Bonds' },
    { id: 'fd', label: 'Fixed Deposits' },
    { id: 'ipo', label: 'IPOs' },
    { id: 'smallcase', label: 'Smallcase' },
    { id: 'credit', label: 'Credit' },
    { id: 'credit-cards', label: 'Credit Cards' },
    { id: 'insurance', label: 'Insurance' },
    { id: 'crypto', label: 'Crypto' }
  ];

  // Enhanced trending assets with bonds and FDs
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
      name: 'TechCorp IPO',
      symbol: 'TECH',
      type: 'ipo',
      price: 290.00,
      change: 15.00,
      changePercent: 5.45,
      volume: '1.2M',
      latestEvent: 'IPO Opening',
      news: 'Subscription opens today',
      routePath: '/research/ipo/TECH'
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
      news: 'Portfolio rebalanced with new EV stocks',
      routePath: '/research/smallcase/electric-mobility'
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
      news: 'Interest rates reduced by 0.25%',
      routePath: '/research/credit/hdfc-personal-loan'
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
      news: 'Added airport lounge access',
      routePath: '/research/credit-card/hdfc-regalia'
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
      news: 'Added critical illness cover',
      routePath: '/research/insurance/max-life-term'
    },
    {
      id: 8,
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
    },
    {
      id: 9,
      name: 'HDFC Bank FD',
      symbol: 'HDFC-FD',
      type: 'fd',
      price: 7.25,
      change: 0,
      changePercent: 0,
      volume: '300K',
      latestEvent: 'Rate Update',
      news: 'Interest rates for 1-year tenure',
      routePath: '/research/fd/hdfc-fd'
    }
  ];

  // Enhanced AI recommendations for multiple asset types
  const getAIRecommendations = () => {
    const riskLevel = userProfile.riskTolerance?.toLowerCase() || 'moderate';
    const recommendations = [];

    // Stock recommendation
    if (riskLevel === 'conservative') {
      recommendations.push({
        ...trendingAssets[0],
        aiReason: `Conservative choice: Stable dividend yield (0.5%), low beta (0.8), strong cash position ₹162B, consistent revenue growth 5% YoY.`
      });
    } else {
      recommendations.push({
        ...trendingAssets[2],
        aiReason: `Growth opportunity: 45% revenue growth potential, expanding into AI/ML, strong management team, IPO timing favorable.`
      });
    }

    // Mutual Fund recommendation
    recommendations.push({
      ...trendingAssets[1],
      aiReason: `Diversification play: Top 100 large-cap exposure, 12% annual returns, low expense ratio 0.8%, suitable for ${riskLevel} risk profile.`
    });

    // Bond/FD recommendation for conservative investors
    if (riskLevel === 'conservative') {
      recommendations.push({
        ...trendingAssets[7],
        aiReason: `Safe debt option: Government-backed security, 7.2% annual yield, AAA rating, perfect for capital protection and steady income.`
      });
    } else {
      recommendations.push({
        ...trendingAssets[8],
        aiReason: `Stable returns: 7.25% assured returns, HDFC Bank reliability, flexible tenure options, good for emergency fund allocation.`
      });
    }

    // Insurance recommendation
    recommendations.push({
      ...trendingAssets[6],
      aiReason: `Protection planning: Term life coverage 50x annual income, critical illness rider, affordable premiums, tax benefits u/s 80C.`
    });

    // Credit recommendation
    if (userProfile.income) {
      recommendations.push({
        ...trendingAssets[4],
        aiReason: `Credit optimization: Interest rate 10.5% (reduced), pre-approved based on profile, flexible tenure, minimal documentation.`
      });
    }

    return recommendations.slice(0, 6);
  };

  const handleAIQuery = (query: string, context: any) => {
    setCurrentQuery(query);
    // Filter assets based on AI query context
    const queryLower = query.toLowerCase();
    let filtered = trendingAssets;
    
    if (queryLower.includes('safe') || queryLower.includes('dividend') || queryLower.includes('conservative')) {
      filtered = trendingAssets.filter(asset => 
        asset.type === 'stock' || asset.type === 'mutual-fund' || asset.type === 'bonds' || asset.type === 'fd'
      );
    } else if (queryLower.includes('growth') || queryLower.includes('tech')) {
      filtered = trendingAssets.filter(asset => 
        asset.symbol.includes('AAPL') || asset.symbol.includes('TECH') || asset.type === 'smallcase'
      );
    } else if (queryLower.includes('insurance') || queryLower.includes('protection')) {
      filtered = trendingAssets.filter(asset => asset.type === 'insurance');
    } else if (queryLower.includes('loan') || queryLower.includes('credit')) {
      filtered = trendingAssets.filter(asset => asset.type === 'credit' || asset.type === 'credit-cards');
    } else if (queryLower.includes('bond') || queryLower.includes('fixed')) {
      filtered = trendingAssets.filter(asset => asset.type === 'bonds' || asset.type === 'fd');
    }
    
    setAiResults(filtered.slice(0, 4));
  };

  // Filter assets based on active filter
  const filteredAssets = activeFilter === 'all' 
    ? trendingAssets 
    : trendingAssets.filter(asset => {
        if (activeFilter === 'mutual-funds') return asset.type === 'mutual-fund';
        if (activeFilter === 'credit-cards') return asset.type === 'credit-cards';
        return asset.type === activeFilter;
      });

  const aiRecommendations = getAIRecommendations();

  // Enhanced AssetCard component with portfolio actions
  const EnhancedAssetCard = ({ asset }: { asset: any }) => (
    <div className="flex items-center justify-between p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/20 hover:shadow-md transition-shadow">
      <div className="flex-1 cursor-pointer" onClick={() => navigate(asset.routePath)}>
        <div className="flex items-center gap-3 mb-2">
          <h3 className="font-semibold text-gray-900">{asset.name}</h3>
          <span className="text-sm text-gray-600">{asset.symbol}</span>
          {asset.latestEvent && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              {asset.latestEvent}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900">
              {typeof asset.price === 'string' ? asset.price : `₹${asset.price}`}
            </p>
            {asset.change !== null && (
              <p className={`text-sm ${asset.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {asset.change > 0 ? '+' : ''}{asset.change}%
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Volume: {asset.volume}</p>
            {asset.news && (
              <p className="text-xs text-gray-500 max-w-xs truncate">{asset.news}</p>
            )}
          </div>
        </div>
      </div>
      <div className="ml-4 flex items-center gap-2">
        <PortfolioAddModal
          assetName={asset.name}
          assetSymbol={asset.symbol}
          assetType={asset.type}
          currentPrice={typeof asset.price === 'number' ? asset.price : undefined}
          trigger={
            <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50">
              <FolderPlus size={14} className="mr-1" />
              Add
            </Button>
          }
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto p-4">
        {/* Enhanced Header with Portfolio CTA */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Investment Discovery
            </h1>
            <p className="text-gray-600 dark:text-gray-400">Ask DiscvrAI anything - discover personalized opportunities</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/portfolio')}>
              <BarChart3 size={16} className="mr-1" />
              Portfolio
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/portfolio-update')}>
              <Edit size={16} className="mr-1" />
              Update Portfolio
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/research')}>
              <Search size={16} className="mr-1" />
              Research
            </Button>
          </div>
        </div>

        {/* AI Chat Interface */}
        <AIFeedChat 
          onQuerySubmit={handleAIQuery}
          userProfile={userProfile}
        />

        {/* Profile Enhancement Prompt */}
        <ProfileEnhancementPrompt userProfile={userProfile} />

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* AI Recommendations Section - First */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 dark:text-white">
                  <Brain className="w-5 h-5 text-purple-600" />
                  DiscvrAI Recommendations
                  <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-2 py-1 rounded-full ml-2">
                    <Sparkles size={10} className="inline mr-1" />
                    Personalized for You
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:bg-purple-900/20 p-4 rounded-lg mb-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <strong>Why these recommendations:</strong> Based on your {userProfile.riskTolerance?.toLowerCase()} risk profile, preference for {userProfile.preferredInstruments?.join(', ')}, and current market conditions analyzed by DiscvrAI.
                    </p>
                  </div>
                  {aiRecommendations.map((asset, index) => (
                    <AIResultCard 
                      key={`ai-rec-${asset.id}`} 
                      asset={asset} 
                      aiReason={asset.aiReason}
                      matchScore={95 - (index * 3)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Query Results Section */}
            {aiResults.length > 0 && (
              <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 dark:text-white">
                    <Brain className="w-5 h-5 text-blue-600" />
                    Query Results
                    <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full ml-2">
                      "{currentQuery}"
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {aiResults.map((asset, index) => (
                      <AIResultCard 
                        key={`query-${asset.id}`} 
                        asset={asset} 
                        userQuery={currentQuery}
                        matchScore={90 - (index * 8)}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(filter.id)}
                  className="whitespace-nowrap"
                  size="sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Trending Section with Enhanced Asset Cards */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20 dark:bg-gray-800/70 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center justify-between dark:text-white">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    {activeFilter === 'all' ? 'Trending Now' : `Trending ${filters.find(f => f.id === activeFilter)?.label}`}
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/portfolio-update')}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50"
                  >
                    <Edit size={14} className="mr-1" />
                    Bulk Add to Portfolio
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAssets.map((asset) => (
                    <EnhancedAssetCard key={asset.id} asset={asset} />
                  ))}
                  {filteredAssets.length === 0 && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      No assets found for the selected filter.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <DesktopSidebar userProfile={userProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;

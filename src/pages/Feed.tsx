import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, BarChart3, Bell, Search, Brain, Sparkles, FolderPlus, Edit } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AIResultCard from '@/components/AIResultCard';
import AssetCard from '@/components/AssetCard';
import ProfileEnhancementPrompt from '@/components/ProfileEnhancementPrompt';
import DesktopSidebar from '@/components/DesktopSidebar';
import PortfolioAddModal from '@/components/PortfolioAddModal';
import UnifiedSearchInterface from '@/components/feed/UnifiedSearchInterface';
import StockResultsTable from '@/components/StockResultsTable';
import { searchAssets, UnifiedSearchRequest, UnifiedSearchResponse, AutocompleteResult } from '@/utils/unifiedSearchApi';

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<UnifiedSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchRequest, setCurrentSearchRequest] = useState<UnifiedSearchRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleUnifiedSearch = async (searchRequest: UnifiedSearchRequest) => {
    setIsSearching(true);
    setCurrentSearchRequest(searchRequest);
    setCurrentPage(searchRequest.page);
    
    try {
      const response = await searchAssets(searchRequest);
      setSearchResults(response);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handlePageChange = async (page: number) => {
    if (!currentSearchRequest) return;
    
    const newSearchRequest = {
      ...currentSearchRequest,
      page
    };
    
    await handleUnifiedSearch(newSearchRequest);
  };

  const handleDismissResults = () => {
    setSearchResults(null);
    setCurrentSearchRequest(null);
    setCurrentPage(1);
  };

  const handleAutocompleteSelect = (result: AutocompleteResult) => {
    console.log('Selected result:', result);
  };

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
    <div className="flex flex-col space-y-3 p-3 sm:p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/20 hover:shadow-md transition-shadow">
      <div className="flex-1 cursor-pointer" onClick={() => navigate(asset.routePath)}>
        <div className="flex flex-col space-y-2 mb-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="font-semibold text-sm sm:text-base text-gray-900 leading-tight">{asset.name}</h3>
            {asset.latestEvent && (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit">
                {asset.latestEvent}
              </span>
            )}
          </div>
          <span className="text-xs sm:text-sm text-gray-600">{asset.symbol}</span>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex flex-col">
            <p className="text-base sm:text-lg font-bold text-gray-900">
              {typeof asset.price === 'string' ? asset.price : `₹${asset.price}`}
            </p>
            {asset.change !== null && (
              <p className={`text-xs sm:text-sm ${asset.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {asset.change > 0 ? '+' : ''}{asset.change}%
              </p>
            )}
          </div>
          <div className="flex flex-col text-left sm:text-right">
            <p className="text-xs sm:text-sm text-gray-600">Vol: {asset.volume}</p>
            {asset.news && (
              <p className="text-xs text-gray-500 line-clamp-1">{asset.news}</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-end pt-2 border-t border-gray-100">
        <PortfolioAddModal
          assetName={asset.name}
          assetSymbol={asset.symbol}
          assetType={asset.type}
          currentPrice={typeof asset.price === 'number' ? asset.price : undefined}
          trigger={
            <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50 text-xs sm:text-sm">
              <FolderPlus size={12} className="mr-1" />
              Add
            </Button>
          }
        />
      </div>
    </div>
  );

  const renderSearchResults = () => {
    if (!searchResults) return null;

    if (!searchResults.success) {
      return (
        <Card className="mt-4 sm:mt-6 bg-white/70 backdrop-blur-md border-white/20">
          <CardContent className="p-3 sm:p-6 text-center">
            <p className="text-red-600 text-sm">Search failed: {searchResults.error}</p>
          </CardContent>
        </Card>
      );
    }

    if (searchResults.data.length === 0) {
      return (
        <Card className="mt-4 sm:mt-6 bg-white/70 backdrop-blur-md border-white/20">
          <CardContent className="p-3 sm:p-6 text-center">
            <p className="text-gray-600 text-sm">No results found. Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      );
    }

    // Use StockResultsTable for stock results, fallback to card display for other asset types
    if (currentSearchRequest?.assetType === 'stock') {
      return (
        <StockResultsTable
          results={searchResults.data}
          query={currentSearchRequest.query || 'Advanced Filter Search'}
          onDismiss={handleDismissResults}
          totalRecords={searchResults.total_records}
          currentPage={searchResults.current_page}
          totalPages={searchResults.total_pages}
          pageSize={searchResults.page_size}
          onPageChange={handlePageChange}
          isLoading={isSearching}
        />
      );
    }

    // Fallback card display for other asset types
    return (
      <Card className="mt-4 sm:mt-6 bg-white/70 backdrop-blur-md border-white/20">
        <CardHeader className="p-3 sm:p-6">
          <CardTitle className="text-base sm:text-xl">Search Results ({searchResults.total_records} found)</CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          <div className="space-y-3 sm:space-y-4">
            {searchResults.data.map((result) => (
              <div key={result.symbol} className="flex flex-col space-y-3 p-3 sm:p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/20 hover:shadow-md transition-shadow">
                <div className="flex-1 cursor-pointer" onClick={() => navigate(`/research/${result.assetType}/${result.symbol}`)}>
                  <div className="flex flex-col space-y-2 mb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900">{result.symbol}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit">
                        {result.assetType}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600">{result.name}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-900">₹{result.price || 'N/A'}</p>
                      {result.changePercent && (
                        <p className={`text-xs sm:text-sm ${result.changePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {result.changePercent > 0 ? '+' : ''}{result.changePercent.toFixed(2)}%
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end pt-2 border-t border-gray-100">
                  <PortfolioAddModal
                    assetName={result.name}
                    assetSymbol={result.symbol}
                    assetType={result.assetType}
                    currentPrice={result.price}
                    trigger={
                      <Button size="sm" variant="outline" className="text-green-700 border-green-200 hover:bg-green-50 text-xs sm:text-sm">
                        <FolderPlus size={12} className="mr-1" />
                        Add
                      </Button>
                    }
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto p-3 sm:p-4 lg:p-6">
        {/* Enhanced Header with Portfolio CTA */}
        <div className="flex flex-col space-y-3 sm:space-y-4 mb-4 sm:mb-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Investment Discovery
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Discover personalized investment opportunities</p>
          </div>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/mutual-fund-feed')} className="text-xs sm:text-sm">
              <TrendingUp size={14} className="mr-1" />
              <span className="hidden xs:inline">MF Feed</span>
              <span className="xs:hidden">MF</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/portfolio')} className="text-xs sm:text-sm">
              <BarChart3 size={14} className="mr-1" />
              <span className="hidden xs:inline">Portfolio</span>
              <span className="xs:hidden">Port</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/portfolio-update')} className="text-xs sm:text-sm">
              <Edit size={14} className="mr-1" />
              <span className="hidden sm:inline">Update Portfolio</span>
              <span className="sm:hidden">Update</span>
            </Button>
            <Button variant="outline" size="sm" onClick={() => navigate('/research')} className="text-xs sm:text-sm">
              <Search size={14} className="mr-1" />
              Research
            </Button>
          </div>
        </div>

        {/* Unified Search Interface */}
        <UnifiedSearchInterface
          onSearch={handleUnifiedSearch}
          isLoading={isSearching}
          nlpAnalysis={searchResults?.nlp_analysis}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        {/* Profile Enhancement Prompt */}
        <ProfileEnhancementPrompt userProfile={userProfile} />

        <div className="grid lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-3 space-y-4 lg:space-y-6">
            {/* Search Results Section */}
            {renderSearchResults()}

            {/* AI Recommendations Section */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex flex-col space-y-2 text-base sm:text-xl">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                    <span>DiscvrAI Recommendations</span>
                  </div>
                  <span className="text-xs bg-gradient-to-r from-purple-100 to-blue-100 text-purple-600 px-2 py-1 rounded-full w-fit">
                    <Sparkles size={8} className="inline mr-1" />
                    Personalized for You
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-lg">
                    <p className="text-xs sm:text-sm text-gray-700">
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

            {/* Filter Tabs */}
            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => setActiveFilter(filter.id)}
                  className="whitespace-nowrap flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 h-8 sm:h-9"
                  size="sm"
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            {/* Trending Section with Enhanced Asset Cards */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader className="p-3 sm:p-6">
                <CardTitle className="flex flex-col space-y-3">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span className="text-base sm:text-xl">
                      {activeFilter === 'all' ? 'Trending Now' : `Trending ${filters.find(f => f.id === activeFilter)?.label}`}
                    </span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => navigate('/portfolio-update')}
                    className="text-blue-600 border-blue-200 hover:bg-blue-50 w-full sm:w-auto text-xs sm:text-sm"
                  >
                    <Edit size={12} className="mr-1" />
                    Bulk Add to Portfolio
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                  {filteredAssets.map((asset) => (
                    <EnhancedAssetCard key={asset.id} asset={asset} />
                  ))}
                  {filteredAssets.length === 0 && (
                    <div className="col-span-full text-center py-8 text-gray-500">
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

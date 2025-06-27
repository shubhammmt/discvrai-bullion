import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Heart, BarChart3, Bell, Search, Brain, Sparkles, FolderPlus, Edit, Loader2 } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AIResultCard from '@/components/AIResultCard';
import AssetCard from '@/components/AssetCard';
import ProfileEnhancementPrompt from '@/components/ProfileEnhancementPrompt';
import DesktopSidebar from '@/components/DesktopSidebar';
import PortfolioAddModal from '@/components/PortfolioAddModal';
import UnifiedSearchInterface from '@/components/feed/UnifiedSearchInterface';
import StockResultsTable from '@/components/StockResultsTable';
import { searchAssets, UnifiedSearchRequest, UnifiedSearchResponse, AutocompleteResult } from '@/utils/unifiedSearchApi';
import { useMixedFeed } from '@/hooks/useMixedFeed';

const Feed = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<UnifiedSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchRequest, setCurrentSearchRequest] = useState<UnifiedSearchRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchError, setSearchError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use mixed feed hook
  const { mixedFeedData, isLoading: isMixedFeedLoading, error: mixedFeedError } = useMixedFeed();

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
    console.log('Starting unified search with request:', searchRequest);
    setIsSearching(true);
    setCurrentSearchRequest(searchRequest);
    setCurrentPage(searchRequest.page);
    setSearchError(null);
    
    try {
      const response = await searchAssets(searchRequest);
      console.log('Search response received:', response);
      
      if (response && typeof response === 'object') {
        setSearchResults(response);
        console.log('Search results set successfully');
      } else {
        console.error('Invalid response format:', response);
        setSearchError('Invalid response format received');
      }
    } catch (error) {
      console.error('Search failed with error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown search error';
      setSearchError(errorMessage);
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
    console.log('Dismissing search results');
    setSearchResults(null);
    setCurrentSearchRequest(null);
    setCurrentPage(1);
    setSearchError(null);
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

  // Convert mixed feed data to trending assets format
  const getTrendingAssetsFromMixedFeed = () => {
    if (!mixedFeedData?.sections) return [];

    const assets = [];
    
    // Process mutual funds section with specific fields
    const mutualFundsSection = mixedFeedData.sections.find(section => section.section_type === 'mutual_funds');
    if (mutualFundsSection) {
      mutualFundsSection.items.forEach(item => {
        assets.push({
          id: item._id,
          name: item.scheme_name,
          symbol: item.mf_schcode?.toString() || item._id,
          type: 'mutual-fund',
          price: item.nav_price,
          change: item.ret_1month,
          changePercent: item.ret_1month,
          volume: `₹${item.current_aum} Cr AUM`,
          latestEvent: item.feed_category,
          news: `${item.ret_1year?.toFixed(2) || 'N/A'}% 1Y returns • ${item.amc_name}`,
          routePath: `/research/mutual-fund/${item.mf_schcode || item._id}`,
          amc_name: item.amc_name,
          category: item.main_category,
          expense_ratio: item.total_expense_ratio,
          risk_level: item.risk_level,
          // Additional fields for mutual fund cards
          return_1year: item.ret_1year,
          return_3year: item.ret_3year,
          aum: item.current_aum,
          minimum_sip: item.sip_minimum
        });
      });
    }

    return assets;
  };

  const mixedFeedAssets = getTrendingAssetsFromMixedFeed();

  // Mock data fallback (keeping some for demonstration)
  const mockTrendingAssets = [
    {
      id: 'mock-1',
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
      id: 'mock-2',
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
      return_1year: 18.5,
      return_3year: 12.3,
      aum: 45230,
      expense_ratio: 1.05,
      minimum_sip: 500
    }
  ];

  // Combine mixed feed data with mock data
  const allAssets = [...mixedFeedAssets, ...mockTrendingAssets];

  // Filter assets based on active filter
  const filteredAssets = activeFilter === 'all' 
    ? allAssets 
    : allAssets.filter(asset => {
        if (activeFilter === 'mutual-funds') return asset.type === 'mutual-fund';
        if (activeFilter === 'credit-cards') return asset.type === 'credit-cards';
        return asset.type === activeFilter;
      });

  // Enhanced AssetCard component with portfolio actions - Updated for mutual funds
  const EnhancedAssetCard = ({ asset }: { asset: any }) => {
    console.log('Rendering asset card for:', asset.name);
    
    return (
      <div className="w-full min-w-0">
        <div className="flex flex-col p-4 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-3 cursor-pointer" onClick={() => navigate(asset.routePath)}>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
                {asset.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-500">{asset.symbol}</span>
                {asset.latestEvent && (
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                    {asset.latestEvent}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {/* Mutual Fund Specific Data Display */}
          {asset.type === 'mutual-fund' ? (
            <div className="mb-4 cursor-pointer" onClick={() => navigate(asset.routePath)}>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <p className="text-xs text-gray-500">1 Year Return</p>
                  <p className="text-lg font-bold text-green-600">
                    {asset.return_1year ? `${asset.return_1year.toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">3 Year Return</p>
                  <p className="text-lg font-bold text-green-600">
                    {asset.return_3year ? `${asset.return_3year.toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">AUM</p>
                  <p className="text-sm font-medium text-gray-900">
                    ₹{asset.aum ? `${(asset.aum / 100).toFixed(0)} Cr` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expense Ratio</p>
                  <p className="text-sm font-medium text-gray-900">
                    {asset.expense_ratio ? `${asset.expense_ratio.toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
              </div>
              <div className="mb-3">
                <p className="text-xs text-gray-500">Minimum SIP</p>
                <p className="text-sm font-medium text-gray-900">
                  ₹{asset.minimum_sip || 'N/A'}
                </p>
              </div>
            </div>
          ) : (
            // Price and Performance Section for other assets
            <div className="mb-4 cursor-pointer" onClick={() => navigate(asset.routePath)}>
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {typeof asset.price === 'string' ? asset.price : `₹${asset.price}`}
                  </p>
                  {asset.change !== null && (
                    <div className={`flex items-center gap-1 mt-1 ${asset.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {asset.change > 0 ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="text-sm font-medium">
                        {asset.change > 0 ? '+' : ''}{asset.change}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 mb-1">Volume</p>
                  <p className="text-sm font-medium text-gray-700">{asset.volume}</p>
                </div>
              </div>
            </div>
          )}

          {/* Additional Info */}
          {asset.news && (
            <div className="mb-4 cursor-pointer" onClick={() => navigate(asset.routePath)}>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {asset.news}
              </p>
            </div>
          )}

          {/* Action Section */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              {asset.amc_name && (
                <span className="text-xs text-gray-500">{asset.amc_name}</span>
              )}
              {asset.category && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {asset.category}
                </span>
              )}
            </div>
            <PortfolioAddModal
              assetName={asset.name}
              assetSymbol={asset.symbol}
              assetType={asset.type}
              currentPrice={typeof asset.price === 'number' ? asset.price : undefined}
              trigger={
                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white px-4">
                  <FolderPlus size={14} className="mr-1" />
                  Add
                </Button>
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSearchResults = () => {
    console.log('Rendering search results. State:', { 
      searchResults: !!searchResults, 
      searchError,
      currentSearchRequest: !!currentSearchRequest 
    });

    // Show error state
    if (searchError) {
      return (
        <Card className="mb-4 bg-white/70 backdrop-blur-md border-red-200">
          <CardContent className="p-3 sm:p-6 text-center">
            <p className="text-red-600 text-sm">Search failed: {searchError}</p>
            <Button 
              variant="outline" 
              onClick={() => setSearchError(null)} 
              className="mt-2"
            >
              Dismiss
            </Button>
          </CardContent>
        </Card>
      );
    }

    if (!searchResults) return null;

    try {
      // Log the entire search results structure for debugging
      console.log('Full search results structure:', JSON.stringify(searchResults, null, 2));

      if (!searchResults.success) {
        return (
          <Card className="mb-4 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-6 text-center">
              <p className="text-red-600 text-sm">Search failed: {searchResults.error}</p>
            </CardContent>
          </Card>
        );
      }

      if (!searchResults.data || searchResults.data.length === 0) {
        return (
          <Card className="mb-4 bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-3 sm:p-6 text-center">
              <p className="text-gray-600 text-sm">No results found. Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        );
      }

      // Use StockResultsTable for stock results, fallback to card display for other asset types
      if (currentSearchRequest?.assetType === 'stock') {
        console.log('Rendering stock results table');
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

      // Fallback card display for other asset types - Single column layout
      console.log('Rendering fallback card display for', searchResults.data.length, 'results');
      return (
        <Card className="mb-4 bg-white/70 backdrop-blur-md border-white/20">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-base sm:text-xl">Search Results ({searchResults.total_records} found)</CardTitle>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              {searchResults.data.map((result, index) => {
                console.log('Processing search result:', JSON.stringify(result, null, 2));
                
                // Handle different possible data structures
                const resultName = result.name || result.scheme_name || result.symbol || 'Unknown';
                const resultSymbol = result.symbol || result.mf_schcode || result._id || 'N/A';
                const resultType = result.assetType || result.asset_type || currentSearchRequest?.assetType || 'unknown';
                const resultPrice = result.price || result.nav_price || 'N/A';
                const resultChange = result.changePercent || result.ret_1month || 0;
                
                console.log('Rendering search result card:', resultName);
                
                return (
                  <div key={`${resultSymbol}-${index}`} className="flex flex-col space-y-3 p-3 sm:p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/20 hover:shadow-md transition-shadow">
                    <div className="flex-1 cursor-pointer" onClick={() => navigate(`/research/${resultType}/${resultSymbol}`)}>
                      <div className="flex flex-col space-y-2 mb-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className="font-semibold text-sm sm:text-base text-gray-900 break-words">{resultName}</h3>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full w-fit flex-shrink-0">
                            {resultType}
                          </span>
                        </div>
                        <span className="text-xs sm:text-sm text-gray-600 break-words">{resultSymbol}</span>
                      </div>
                      
                      {/* Display mutual fund specific data or general asset data */}
                      {resultType === 'mutual-fund' && result.ret_1year ? (
                        <div className="grid grid-cols-2 gap-3 mb-3">
                          <div>
                            <p className="text-xs text-gray-500">1 Year Return</p>
                            <p className="text-sm font-bold text-green-600">
                              {result.ret_1year ? `${result.ret_1year.toFixed(2)}%` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">3 Year Return</p>
                            <p className="text-sm font-bold text-green-600">
                              {result.ret_3year ? `${result.ret_3year.toFixed(2)}%` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">AUM</p>
                            <p className="text-xs font-medium text-gray-900">
                              ₹{result.current_aum ? `${(result.current_aum / 100).toFixed(0)} Cr` : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Expense Ratio</p>
                            <p className="text-xs font-medium text-gray-900">
                              {result.total_expense_ratio ? `${result.total_expense_ratio.toFixed(2)}%` : 'N/A'}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-xs text-gray-500">Minimum SIP</p>
                            <p className="text-xs font-medium text-gray-900">
                              ₹{result.sip_minimum || 'N/A'}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                          <div>
                            <p className="text-base sm:text-lg font-bold text-gray-900">₹{resultPrice}</p>
                            {resultChange !== 0 && (
                              <p className={`text-xs sm:text-sm ${resultChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                {resultChange > 0 ? '+' : ''}{resultChange.toFixed(2)}%
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end pt-2 border-t border-gray-100">
                      <PortfolioAddModal
                        assetName={resultName}
                        assetSymbol={resultSymbol}
                        assetType={resultType}
                        currentPrice={typeof resultPrice === 'number' ? resultPrice : undefined}
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
              })}
            </div>
          </CardContent>
        </Card>
      );
    } catch (error) {
      console.error('Error rendering search results:', error);
      return (
        <Card className="mb-4 bg-white/70 backdrop-blur-md border-red-200">
          <CardContent className="p-3 sm:p-6 text-center">
            <p className="text-red-600 text-sm">Error displaying search results: {error instanceof Error ? error.message : 'Unknown error'}</p>
            <Button 
              variant="outline" 
              onClick={handleDismissResults} 
              className="mt-2"
            >
              Dismiss
            </Button>
          </CardContent>
        </Card>
      );
    }
  };

  // Render mixed feed error state
  if (mixedFeedError) {
    console.error('Mixed feed error:', mixedFeedError);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        {/* Enhanced Header with Portfolio CTA */}
        <div className="w-full mb-4 sm:mb-6">
          <div className="flex flex-col space-y-3 sm:space-y-4">
            <div className="flex flex-col space-y-2">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Investment Discovery
              </h1>
              <p className="text-gray-600 text-xs sm:text-sm lg:text-base">Discover personalized investment opportunities</p>
            </div>
            
            <div className="w-full overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                <Button variant="outline" size="sm" onClick={() => navigate('/mutual-fund-feed')} className="text-xs sm:text-sm whitespace-nowrap">
                  <TrendingUp size={14} className="mr-1" />
                  <span className="hidden xs:inline">MF Feed</span>
                  <span className="xs:hidden">MF</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/portfolio')} className="text-xs sm:text-sm whitespace-nowrap">
                  <BarChart3 size={14} className="mr-1" />
                  <span className="hidden xs:inline">Portfolio</span>
                  <span className="xs:hidden">Port</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/portfolio-update')} className="text-xs sm:text-sm whitespace-nowrap">
                  <Edit size={14} className="mr-1" />
                  <span className="hidden sm:inline">Update Portfolio</span>
                  <span className="sm:hidden">Update</span>
                </Button>
                <Button variant="outline" size="sm" onClick={() => navigate('/research')} className="text-xs sm:text-sm whitespace-nowrap">
                  <Search size={14} className="mr-1" />
                  Research
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Unified Search Interface */}
        <div className="w-full mb-4 sm:mb-6">
          <UnifiedSearchInterface
            onSearch={handleUnifiedSearch}
            isLoading={isSearching}
            nlpAnalysis={searchResults?.nlp_analysis}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Profile Enhancement Prompt */}
        <div className="w-full mb-4 sm:mb-6">
          <ProfileEnhancementPrompt userProfile={userProfile} />
        </div>

        <div className="w-full grid lg:grid-cols-4 gap-4 lg:gap-6">
          {/* Main Feed */}
          <div className="w-full lg:col-span-3 space-y-4 lg:space-y-6 min-w-0">
            {/* Search Results Section */}
            {renderSearchResults()}

            {/* Mixed Feed Loading State */}
            {isMixedFeedLoading && (
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-6 text-center">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                  <p className="text-gray-600">Loading trending content...</p>
                </CardContent>
              </Card>
            )}

            {/* Market Overview from Mixed Feed */}
            {mixedFeedData?.market_overview && (
              <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg text-green-800">📊 Market Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-green-600">{mixedFeedData.market_overview.total_active_funds.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">Active Funds</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-blue-600">{mixedFeedData.market_overview.avg_market_return.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Avg Return</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{mixedFeedData.market_overview.positive_return_rate.toFixed(1)}%</p>
                      <p className="text-sm text-gray-600">Positive Returns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Filter Tabs */}
            <div className="w-full">
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
            </div>

            {/* Trending Section with Enhanced Asset Cards - Single column layout */}
            <div className="w-full min-w-0">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader className="p-3 sm:p-6">
                  <CardTitle className="flex flex-col space-y-3 min-w-0">
                    <div className="flex items-center gap-2 min-w-0">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0" />
                      <span className="text-base sm:text-xl truncate">
                        {activeFilter === 'all' ? 'Trending Now' : `Trending ${filters.find(f => f.id === activeFilter)?.label}`}
                      </span>
                      {mixedFeedData && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Live Data
                        </span>
                      )}
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
                  <div className="w-full min-w-0">
                    {/* Single column layout */}
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {filteredAssets.map((asset) => (
                        <EnhancedAssetCard key={asset.id} asset={asset} />
                      ))}
                      {filteredAssets.length === 0 && (
                        <div className="col-span-full text-center py-8 text-gray-500">
                          {isMixedFeedLoading ? (
                            <div className="flex items-center justify-center">
                              <Loader2 className="h-4 w-4 animate-spin mr-2" />
                              Loading assets...
                            </div>
                          ) : (
                            'No assets found for the selected filter.'
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Desktop Sidebar */}
          <div className="hidden lg:block w-full">
            <DesktopSidebar userProfile={userProfile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;

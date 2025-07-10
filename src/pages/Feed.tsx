import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, BarChart3, Edit, Search, Loader2, Plus, Globe, DollarSign, Building2, Zap, Target, Briefcase, Bitcoin, ArrowRight, Activity } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AIResultCard from '@/components/AIResultCard';
import AssetCard from '@/components/AssetCard';
import PortfolioAddModal from '@/components/PortfolioAddModal';
import UnifiedSearchInterface from '@/components/feed/UnifiedSearchInterface';
import StockResultsTable from '@/components/StockResultsTable';
import { searchAssets, UnifiedSearchRequest, UnifiedSearchResponse, AutocompleteResult } from '@/utils/unifiedSearchApi';
import { useMixedFeed } from '@/hooks/useMixedFeed';

const Feed = () => {
  console.log('=== FEED COMPONENT RENDER START ===');
  
  const [activeFilter, setActiveFilter] = useState('all');
  const [ipoStatus, setIpoStatus] = useState('upcoming');
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<UnifiedSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [currentSearchRequest, setCurrentSearchRequest] = useState<UnifiedSearchRequest | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchError, setSearchError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Use mixed feed hook
  const { mixedFeedData, isLoading: isMixedFeedLoading, error: mixedFeedError } = useMixedFeed();

  console.log('Mixed feed hook data:', {
    hasData: !!mixedFeedData,
    isLoading: isMixedFeedLoading,
    error: mixedFeedError,
    sections: mixedFeedData?.sections?.length || 0
  });

  // Set filter based on URL parameter
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
      console.log('Setting active filter from URL:', filterParam);
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
        
        // Scroll to results section after search is complete
        setTimeout(() => {
          const resultsSection = document.querySelector('[data-results-section]');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
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

  // New function to handle IPO filter selection from UnifiedSearchInterface
  const handleIPOFilterSelect = (status: string) => {
    console.log('IPO filter selected with status:', status);
    setActiveFilter('ipo');
    setIpoStatus(status);
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

  // Enhanced dynamic data extraction function
  const extractAssetData = (result: any, assetType: string) => {
    console.log('Extracting asset data for type:', assetType, 'from:', result);
    
    // Common field mappings for different asset types
    const fieldMappings = {
      stock: {
        name: ['name', 'company_name', 'symbol'],
        symbol: ['symbol', 'stock_symbol', 'ticker'],
        price: ['price', 'current_price', 'ltp', 'close_price'],
        change: ['change', 'price_change', 'daily_change'],
        changePercent: ['changePercent', 'change_percent', 'pct_change'],
        marketCap: ['market_cap', 'marketCap'],
        volume: ['volume', 'traded_volume'],
        sector: ['sector', 'industry'],
        peRatio: ['pe_ratio', 'peRatio', 'p_e_ratio']
      },
      'mutual-fund': {
        name: ['name', 'scheme_name', 'fund_name'],
        symbol: ['symbol', 'mf_schcode', 'scheme_code', '_id'],
        navPrice: ['nav_price', 'nav', 'price'],
        return1Year: ['ret_1year', 'return_1y', 'returns_1year'],
        return3Year: ['ret_3year', 'return_3y', 'returns_3year'],
        aum: ['current_aum', 'aum', 'fund_size'],
        expenseRatio: ['total_expense_ratio', 'expense_ratio', 'ter'],
        minimumSip: ['min_sip', 'sip_minimum', 'minimum_investment'],
        amcName: ['amc_name', 'fund_house', 'amc'],
        category: ['main_category', 'category', 'fund_category'],
        riskLevel: ['risk_level', 'risk_category']
      },
      ipo: {
        name: ['company_name', 'name'],
        symbol: ['id', 'isin'],
        status: ['status', 'status_label'],
        listDate: ['dates.list_date', 'list_date'],
        issueSize: ['issue_size'],
        issueSizeClassification: ['issue_size_classification'],
        exchange: ['exchange'],
        priceRange: ['price_band'],
        openDate: ['dates.open_date', 'open_date'],
        closeDate: ['dates.close_date', 'close_date'],
        daysLeft: ['dates.days_left', 'days_left']
      }
    };

    // Get the appropriate field mapping for the asset type
    const mapping = fieldMappings[assetType as keyof typeof fieldMappings] || fieldMappings.stock;

    // Dynamic field extraction function with nested object support
    const getFieldValue = (fieldOptions: string[], defaultValue: any = null) => {
      for (const field of fieldOptions) {
        // Handle nested object paths like 'dates.list_date'
        if (field.includes('.')) {
          const parts = field.split('.');
          let value = result;
          for (const part of parts) {
            value = value?.[part];
            if (value === undefined || value === null) break;
          }
          if (value !== undefined && value !== null) {
            return value;
          }
        } else if (result[field] !== undefined && result[field] !== null) {
          return result[field];
        }
      }
      return defaultValue;
    };

    // Extract data based on asset type
    const extractedData: any = {
      id: result._id || result.id || result.symbol || Math.random().toString(),
      assetType: assetType,
      rawData: result // Keep raw data for debugging
    };

    // Extract fields based on mapping
    Object.entries(mapping).forEach(([key, fieldOptions]) => {
      extractedData[key] = getFieldValue(fieldOptions);
    });

    console.log('Extracted data:', extractedData);
    return extractedData;
  };

  // Enhanced rendering function for different asset types
  const renderAssetCard = (asset: any, index: number) => {
    console.log('Rendering asset card with extracted data:', asset);

    const cardId = `${asset.symbol || asset.id}-${index}`;
    
    return (
      <div key={cardId} className="w-full">
        <div className="flex flex-col p-4 bg-white rounded-xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group h-full">
          {/* Header Section */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-gray-900 leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors text-center">
                {asset.name || 'Unknown Asset'}
              </h3>
              <div className="flex items-center gap-2 mt-1 justify-center">
                <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-md border border-blue-100">
                  {asset.assetType}
                </span>
              </div>
            </div>
          </div>
          
          {/* Dynamic Content Based on Asset Type */}
          <div className="mb-4 flex-1">
            {asset.assetType === 'mutual-fund' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">NAV</p>
                  <p className="text-lg font-bold text-gray-900">
                    {asset.navPrice !== null && asset.navPrice !== undefined ? 
                      `₹${Number(asset.navPrice).toFixed(2)}` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">1Y Return</p>
                  <p className="text-sm font-medium text-green-600">
                    {asset.return1Year !== null && asset.return1Year !== undefined ? 
                      `${Number(asset.return1Year).toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">3Y Return</p>
                  <p className="text-sm font-medium text-green-600">
                    {asset.return3Year !== null && asset.return3Year !== undefined ? 
                      `${Number(asset.return3Year).toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Expense</p>
                  <p className="text-sm font-medium text-gray-900">
                    {asset.expenseRatio !== null && asset.expenseRatio !== undefined ? 
                      `${Number(asset.expenseRatio).toFixed(2)}%` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Min SIP</p>
                  <p className="text-sm font-medium text-gray-900">
                    {asset.minimumSip !== null && asset.minimumSip !== undefined ? 
                      `₹${Number(asset.minimumSip).toLocaleString()}` : 'N/A'}
                  </p>
                </div>
              </div>
            ) : asset.assetType === 'stock' ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    ₹{asset.price !== null && asset.price !== undefined ? Number(asset.price).toLocaleString() : 'N/A'}
                  </p>
                  {asset.change !== null && asset.change !== undefined && (
                    <div className={`flex items-center gap-1 mt-1 ${Number(asset.change) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {Number(asset.change) > 0 ? '↑' : '↓'}
                      <span className="text-sm font-medium">
                        {Number(asset.change) > 0 ? '+' : ''}{Number(asset.change).toFixed(2)}
                        {asset.changePercent && `(${Number(asset.changePercent).toFixed(2)}%)`}
                      </span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  {asset.marketCap && (
                    <div>
                      <p className="text-xs text-gray-500">Market Cap</p>
                      <p className="text-sm font-medium text-gray-700">₹{Number(asset.marketCap).toLocaleString()} Cr</p>
                    </div>
                  )}
                </div>
              </div>
            ) : asset.assetType === 'ipo' ? (
              // IPO-specific rendering
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {asset.status || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">List Date</p>
                    <p className="text-sm font-medium text-gray-900">
                      {asset.listDate || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Issue Size</p>
                    <p className="text-sm font-medium text-gray-900">
                      {asset.issueSize !== null && asset.issueSize !== undefined ? 
                        `₹${Number(asset.issueSize).toLocaleString()} Cr` : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Exchange</p>
                    <p className="text-sm font-medium text-gray-900">
                      {asset.exchange || 'N/A'}
                    </p>
                  </div>
                </div>
                {asset.issueSizeClassification && (
                  <div className="text-center">
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {asset.issueSizeClassification}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              // Default rendering for other asset types
              <div className="space-y-2">
                {Object.entries(asset).map(([key, value]) => {
                  if (['id', 'assetType', 'rawData', 'name', 'symbol'].includes(key) || value === null || value === undefined) {
                    return null;
                  }
                  return (
                    <div key={key} className="flex justify-between">
                      <span className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-sm font-medium text-gray-900">{String(value)}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Additional Info */}
          {(asset.amcName || asset.category || asset.sector) && (
            <div className="mb-4">
              <div className="flex items-center gap-2 flex-wrap">
                {asset.amcName && (
                  <span className="text-xs text-gray-500">{asset.amcName}</span>
                )}
                {asset.category && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                    {asset.category}
                  </span>
                )}
                {asset.sector && (
                  <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                    {asset.sector}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Action Section */}
          <div className="flex items-center justify-end pt-3 border-t border-gray-100">
            <PortfolioAddModal
              assetName={asset.name || 'Unknown'}
              assetSymbol={asset.symbol || 'N/A'}
              assetType={asset.assetType}
              currentPrice={typeof asset.price === 'number' ? asset.price : (typeof asset.navPrice === 'number' ? asset.navPrice : undefined)}
              trigger={
                <button className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center transition-colors shadow-sm hover:shadow-md">
                  <Plus size={12} />
                </button>
              }
            />
          </div>
        </div>
      </div>
    );
  };

  const renderSearchResults = () => {
    console.log('=== SEARCH RESULTS RENDER START ===');
    console.log('Search results state:', { 
      hasResults: !!searchResults, 
      searchError,
      hasCurrentRequest: !!currentSearchRequest,
      resultsSuccess: searchResults?.success,
      dataLength: searchResults?.data?.length
    });

    // Show error state
    if (searchError) {
      console.log('Rendering error state:', searchError);
      return (
        <Card className="mb-4 bg-white/70 backdrop-blur-md border-red-200" data-results-section>
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

    if (!searchResults) {
      console.log('No search results to render');
      return null;
    }

    try {
      console.log('Processing search results:', {
        success: searchResults.success,
        dataLength: searchResults.data?.length,
        currentAssetType: currentSearchRequest?.assetType
      });

      if (!searchResults.success) {
        console.log('Search was not successful:', searchResults.error);
        return (
          <Card className="mb-4 bg-white/70 backdrop-blur-md border-white/20" data-results-section>
            <CardContent className="p-3 sm:p-6 text-center">
              <p className="text-red-600 text-sm">Search failed: {searchResults.error}</p>
            </CardContent>
          </Card>
        );
      }

      if (!searchResults.data || searchResults.data.length === 0) {
        console.log('No data in search results');
        return (
          <Card className="mb-4 bg-white/70 backdrop-blur-md border-white/20" data-results-section>
            <CardContent className="p-3 sm:p-6 text-center">
              <p className="text-gray-600 text-sm">No results found. Try adjusting your search criteria.</p>
            </CardContent>
          </Card>
        );
      }

      // Use StockResultsTable for both stock and mutual fund results
      if (currentSearchRequest?.assetType === 'stock' || currentSearchRequest?.assetType === 'mutual-fund') {
        console.log('Rendering results table for:', currentSearchRequest?.assetType);
        return (
          <div data-results-section>
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
          </div>
        );
      }

      // Enhanced dynamic card display for other asset types
      console.log('Rendering dynamic card display for', searchResults.data.length, 'results');
      
      // Extract and normalize the data dynamically
      const processedResults = searchResults.data.map((result, index) => {
        console.log(`Processing result ${index + 1}:`, result);
        
        try {
          const extractedData = extractAssetData(result, currentSearchRequest?.assetType || 'unknown');
          return extractedData;
        } catch (error) {
          console.error(`Error processing result ${index + 1}:`, error);
          // Return a fallback object
          return {
            id: `fallback-${index}`,
            name: result.name || result.scheme_name || result.symbol || 'Unknown Asset',
            symbol: result.symbol || result.mf_schcode || result._id || 'N/A',
            assetType: currentSearchRequest?.assetType || 'unknown',
            rawData: result
          };
        }
      });

      return (
        <Card className="mb-4 bg-white/70 backdrop-blur-md border-white/20" data-results-section>
          <CardHeader className="p-3 sm:p-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-xl">
                Search Results ({searchResults.total_records} found)
              </CardTitle>
              <Button variant="outline" onClick={handleDismissResults} size="sm">
                Dismiss
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 sm:p-6">
            {/* Two column grid for asset cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {processedResults.map((asset, index) => renderAssetCard(asset, index))}
            </div>
            
            {/* Pagination for search results */}
            {searchResults.total_pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage <= 1 || isSearching}
                >
                  Previous
                </Button>
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {searchResults.total_pages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= searchResults.total_pages || isSearching}
                >
                  Next
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      );
    } catch (error) {
      console.error('=== ERROR RENDERING SEARCH RESULTS ===', error);
      return (
        <Card className="mb-4 bg-white/70 backdrop-blur-md border-red-200" data-results-section>
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

  // Updated filter assets function to work with section-based filtering and IPO status
  const getFilteredAssets = () => {
    console.log('=== GET FILTERED ASSETS START ===');
    console.log('Active filter:', activeFilter);
    console.log('IPO Status:', ipoStatus);
    console.log('Mixed feed data:', mixedFeedData);
    
    if (!mixedFeedData?.sections) {
      console.log('No mixed feed sections available');
      return [];
    }
    
    console.log('Available sections:', mixedFeedData.sections.map(s => ({ type: s.section_type, itemCount: s.items?.length || 0 })));
    
    // If "All" is selected, show all items from all sections
    if (activeFilter === 'all') {
      console.log('Showing all assets from all sections');
      const allAssets = mixedFeedData.sections.flatMap(section => {
        return (section.items || []).map((item: any) => {
          // Handle mutual funds
          if (section.section_type === 'mutual_funds') {
            return {
              id: item._id || item.mf_schcode || Math.random(),
              name: item.scheme_name || item.name || 'Unknown Fund',
              symbol: item.mf_schcode?.toString() || item.symbol || item._id || 'N/A',
              type: 'mutual-fund',
              price: item.nav_price || 0,
              change: item.ret_1month || 0,
              changePercent: item.ret_1month || 0,
              volume: item.current_aum ? `₹${(item.current_aum / 100).toFixed(0)} Cr AUM` : 'N/A',
              latestEvent: item.launch_date ? `Launched ${new Date(item.launch_date).getFullYear()}` : 'Active',
              news: `${item.amc_name || 'Fund'} - ${item.main_category || 'Investment'} with ${item.total_expense_ratio || 0}% expense ratio`,
              rawData: item
            };
          }
          // Handle stocks
          else if (section.section_type === 'stocks') {
            return {
              id: item._id || Math.random(),
              name: item.company_name || item.name || 'Unknown Stock',
              symbol: item.symbol || item._id || 'N/A',
              type: 'stock',
              price: item.current_price || 0,
              change: item.price_momentum_3m ? (item.price_momentum_3m * 100) : 0,
              changePercent: item.price_momentum_3m ? (item.price_momentum_3m * 100) : 0,
              volume: 'N/A',
              latestEvent: 'Active',
              news: `${item.company_name || 'Company'} stock`,
              rawData: item
            };
          }
          // Handle IPOs
          else if (section.section_type === 'ipos') {
            return {
              id: item.id || Math.random(),
              name: item.company_name || 'Unknown IPO',
              symbol: item.id || item.isin || 'N/A',
              type: 'ipo',
              price: item.price_band?.max_price || item.price_band?.min_price || 0,
              change: 0,
              changePercent: 0,
              volume: item.issue_size ? `₹${item.issue_size} Cr` : 'N/A',
              latestEvent: item.status_label || item.status || 'IPO',
              news: `${item.company_name} IPO - ${item.issue_size_classification || 'Investment opportunity'}`,
              rawData: item,
              status: item.status || item.status_label || 'unknown'
            };
          }
          // Handle other asset types
          else {
            return {
              id: item._id || Math.random(),
              name: item.name || item.scheme_name || item.company_name || 'Unknown Asset',
              symbol: item.symbol || item.mf_schcode || item._id || 'N/A',
              type: section.section_type === 'mutual_funds' ? 'mutual-fund' : (section.section_type === 'stocks' ? 'stock' : (section.section_type === 'ipos' ? 'ipo' : 'other')),
              price: item.nav_price || item.current_price || item.price || 0,
              change: item.ret_1month || item.price_momentum_3m || item.change || 0,
              changePercent: item.ret_1month || item.price_momentum_3m || item.changePercent || 0,
              volume: item.current_aum ? `₹${(item.current_aum / 100).toFixed(0)} Cr AUM` : 'N/A',
              latestEvent: item.launch_date ? `Launched ${new Date(item.launch_date).getFullYear()}` : 'Active',
              news: `Investment opportunity`,
              rawData: item
            };
          }
        });
      });
      console.log('Total assets for "all" filter:', allAssets.length);
      return allAssets;
    }
    
    // Map filter IDs to section types
    const filterToSectionMapping: { [key: string]: string } = {
      'mutual-funds': 'mutual_funds',
      'stocks': 'stocks', 
      'ipo': 'ipos',
      'etfs': 'etfs',
      'bonds': 'bonds',
      'fd': 'fixed_deposits',
      'smallcase': 'smallcase',
      'credit': 'credit',
      'credit-cards': 'credit_cards',
      'insurance': 'insurance',
      'crypto': 'crypto'
    };
    
    const targetSectionType = filterToSectionMapping[activeFilter];
    console.log('Filter mapping:', activeFilter, '->', targetSectionType);
    
    if (!targetSectionType) {
      console.log('No section mapping found for filter:', activeFilter);
      return [];
    }
    
    // Find the section that matches the filter
    const targetSection = mixedFeedData.sections.find(section => section.section_type === targetSectionType);
    
    if (!targetSection) {
      console.log('No section found with type:', targetSectionType);
      return [];
    }
    
    console.log('Found target section with', targetSection.items?.length || 0, 'items');
    
    // Map the items from the target section based on section type
    let filteredAssets = (targetSection.items || []).map((item: any) => {
      // Handle mutual funds specifically
      if (targetSection.section_type === 'mutual_funds') {
        return {
          id: item._id || item.mf_schcode || Math.random(),
          name: item.scheme_name || item.name || 'Unknown Fund',
          symbol: item.mf_schcode?.toString() || item.symbol || item._id || 'N/A',
          type: 'mutual-fund',
          price: item.nav_price || 0,
          change: item.ret_1month || 0,
          changePercent: item.ret_1month || 0,
          volume: item.current_aum ? `₹${(item.current_aum / 100).toFixed(0)} Cr AUM` : 'N/A',
          latestEvent: item.launch_date ? `Launched ${new Date(item.launch_date).getFullYear()}` : 'Active',
          news: `${item.amc_name || 'Fund'} - ${item.main_category || 'Investment'} with ${item.total_expense_ratio || 0}% expense ratio`,
          rawData: item
        };
      }
      // Handle stocks specifically
      else if (targetSection.section_type === 'stocks') {
        return {
          id: item._id || Math.random(),
          name: item.company_name || item.name || 'Unknown Stock',
          symbol: item.symbol || item._id || 'N/A',
          type: 'stock',
          price: item.current_price || 0,
          change: item.price_momentum_3m ? (item.price_momentum_3m * 100) : 0,
          changePercent: item.price_momentum_3m ? (item.price_momentum_3m * 100) : 0,
          volume: 'N/A',
          latestEvent: 'Active',
          news: `${item.company_name || 'Company'} stock`,
          rawData: item
        };
      }
      // Handle IPOs specifically
      else if (targetSection.section_type === 'ipos') {
        return {
          id: item.id || Math.random(),
          name: item.company_name || 'Unknown IPO',
          symbol: item.id || item.isin || 'N/A',
          type: 'ipo',
          price: item.price_band?.max_price || item.price_band?.min_price || 0,
          change: 0,
          changePercent: 0,
          volume: item.issue_size ? `₹${item.issue_size} Cr` : 'N/A',
          latestEvent: item.status_label || item.status || 'IPO',
          news: `${item.company_name} IPO - ${item.issue_size_classification || 'Investment opportunity'}`,
          rawData: item,
          status: item.status || item.status_label || 'unknown'
        };
      }
      // Handle other asset types
      else {
        return {
          id: item._id || Math.random(),
          name: item.name || item.scheme_name || item.company_name || 'Unknown Asset',
          symbol: item.symbol || item.mf_schcode || item._id || 'N/A',
          type: targetSection.section_type === 'mutual_funds' ? 'mutual-fund' : (targetSection.section_type === 'stocks' ? 'stock' : (targetSection.section_type === 'ipos' ? 'ipo' : 'other')),
          price: item.nav_price || item.current_price || item.price || 0,
          change: item.ret_1month || item.price_momentum_3m || item.change || 0,
          changePercent: item.ret_1month || item.price_momentum_3m || item.changePercent || 0,
          volume: item.current_aum ? `₹${(item.current_aum / 100).toFixed(0)} Cr AUM` : 'N/A',
          latestEvent: item.launch_date ? `Launched ${new Date(item.launch_date).getFullYear()}` : 'Active',
          news: `Investment opportunity`,
          rawData: item
        };
      }
    });

    // Apply IPO status filter if we're showing IPOs
    if (activeFilter === 'ipo' && ipoStatus !== 'all') {
      console.log('Applying IPO status filter:', ipoStatus);
      filteredAssets = filteredAssets.filter((asset: any) => {
        const assetStatus = asset.status?.toLowerCase() || asset.rawData?.status?.toLowerCase() || '';
        return assetStatus.includes(ipoStatus.toLowerCase()) || 
               (ipoStatus === 'upcoming' && (assetStatus.includes('open') || assetStatus.includes('forthcoming'))) ||
               (ipoStatus === 'live' && (assetStatus.includes('open') || assetStatus.includes('active'))) ||
               (ipoStatus === 'listed' && (assetStatus.includes('listed') || assetStatus.includes('closed')));
      });
    }
    
    console.log('Filtered assets count:', filteredAssets.length);
    return filteredAssets;
  };

  const filteredAssets = getFilteredAssets();
  console.log('Final filtered assets for render:', filteredAssets.length);

  // Render mixed feed error state
  if (mixedFeedError) {
    console.error('Mixed feed error:', mixedFeedError);
  }

  console.log('=== FEED COMPONENT RENDER END ===');

  // Navigation sections for different asset classes
  const navigationSections = [
    {
      title: 'Market Overview',
      description: 'Real-time indices, market movers & news',
      icon: Globe,
      path: '/market',
      gradient: 'from-blue-500 to-blue-600',
      features: ['Live indices', 'Top movers', 'Market news']
    },
    {
      title: 'Indian Stocks',
      description: 'Discover & analyze Indian equities',
      icon: TrendingUp,
      path: '/stocks',
      gradient: 'from-green-500 to-emerald-600',
      features: ['AI Discovery', 'Stock search', 'Analysis tools']
    },
    {
      title: 'US Stocks',
      description: 'Explore US market opportunities',
      icon: DollarSign,
      path: '/us-stocks',
      gradient: 'from-purple-500 to-violet-600',
      features: ['NASDAQ/NYSE', 'Growth stocks', 'Tech themes']
    },
    {
      title: 'Mutual Funds',
      description: 'Find the right funds for your goals',
      icon: Building2,
      path: '/mutual-funds',
      gradient: 'from-orange-500 to-red-600',
      features: ['Fund selection', 'SIP calculator', 'Performance']
    },
    {
      title: 'IPOs',
      description: 'Upcoming & current IPO opportunities',
      icon: Zap,
      path: '/ipos',
      gradient: 'from-pink-500 to-rose-600',
      features: ['IPO calendar', 'Application tracking', 'Analysis']
    },
    {
      title: 'Crypto',
      description: 'Digital assets & cryptocurrency',
      icon: Bitcoin,
      path: '/crypto',
      gradient: 'from-yellow-500 to-amber-600',
      features: ['Price tracking', 'DeFi themes', 'Portfolio']
    },
    {
      title: 'Organize',
      description: 'Manage watchlists & alerts',
      icon: Target,
      path: '/organize',
      gradient: 'from-indigo-500 to-blue-600',
      features: ['Watchlists', 'Price alerts', 'Research notes']
    },
    {
      title: 'Portfolio',
      description: 'Track & analyze your investments',
      icon: Briefcase,
      path: '/portfolio',
      gradient: 'from-teal-500 to-cyan-600',
      features: ['Performance', 'Asset allocation', 'Rebalancing']
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6">
        {/* Header */}
        <div className="w-full mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                Investment Feed
              </h1>
              <p className="text-gray-600 dark:text-gray-300">Your personalized financial dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation Overview */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Explore Investment Opportunities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {navigationSections.map((section, index) => (
              <Card 
                key={index} 
                className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(section.path)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className={`p-2 bg-gradient-to-br ${section.gradient} rounded-lg shadow-sm group-hover:scale-110 transition-transform`}>
                      <section.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {section.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Legacy Quick Actions */}
        <div className="w-full mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="flex gap-2 overflow-x-auto pb-2">
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

        {/* Unified Search Interface */}
        <div className="w-full mb-4 sm:mb-6">
          <UnifiedSearchInterface
            onSearch={handleUnifiedSearch}
            isLoading={isSearching}
            nlpAnalysis={searchResults?.nlp_analysis}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            onIPOFilterSelect={handleIPOFilterSelect}
          />
        </div>

        {/* Main Feed - Full Width */}
        <div className="w-full space-y-4 lg:space-y-6 min-w-0">
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

          {/* Filter Tabs */}
          <div className="w-full" data-filter-tabs>
            <div className="flex gap-1 sm:gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'default' : 'outline'}
                  onClick={() => {
                    console.log('Filter clicked:', filter.id);
                    setActiveFilter(filter.id);
                  }}
                  size="sm"
                  className="text-xs sm:text-sm whitespace-nowrap flex-shrink-0"
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Asset Cards in Single Column */}
          {filteredAssets.length > 0 ? (
            <div className="space-y-3">
              {filteredAssets.map((asset: any) => (
                <AssetCard key={asset.id} asset={asset} showReason={false} />
              ))}
            </div>
          ) : (
            !isMixedFeedLoading && (
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardContent className="p-4 sm:p-6 text-center">
                  <p className="text-gray-600 text-sm">No assets found for the selected filter.</p>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Feed;

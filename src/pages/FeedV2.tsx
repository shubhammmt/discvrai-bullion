import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import UnifiedSearchInterface from '@/components/feed/UnifiedSearchInterface';
import AutocompleteSearchBar from '@/components/feed/AutocompleteSearchBar';
import { searchAssets, getTopResults, UnifiedSearchRequest, UnifiedSearchResponse, AutocompleteResult } from '@/utils/unifiedSearchApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, Eye, Bell, ShoppingCart } from 'lucide-react';

const FeedV2 = () => {
  const [searchResults, setSearchResults] = useState<UnifiedSearchResponse | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Fetch top results for the landing state
  const { data: topResults, isLoading: topResultsLoading } = useQuery({
    queryKey: ['topResults'],
    queryFn: getTopResults,
  });

  const handleSearch = async (searchRequest: UnifiedSearchRequest) => {
    setIsSearching(true);
    try {
      const response = await searchAssets(searchRequest);
      setSearchResults(response);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleAutocompleteSelect = (result: AutocompleteResult) => {
    console.log('Selected result:', result);
    // TODO: Navigate to product page based on result.assetType and result.symbol
    // This would typically use React Router to navigate to:
    // - /research/stock/${result.symbol} for stocks
    // - /research/mutual-fund/${result.symbol} for mutual funds  
    // - /research/ipo/${result.symbol} for IPOs
  };

  // Prepare NLP analysis with confidence reasoning for UnifiedSearchInterface
  const nlpAnalysisForInterface = searchResults?.nlp_analysis ? {
    interpreted_filters: searchResults.nlp_analysis.interpreted_filters || {},
    confidence: searchResults.nlp_analysis.confidence || 0,
    suggestions: searchResults.nlp_analysis.alternate_queries || [],
    original_query: searchResults.nlp_analysis.original_query || '',
    confidence_reasoning: searchResults.nlp_analysis.confidence_reasoning
  } : undefined;

  const renderTopResults = () => {
    if (topResultsLoading) {
      return <div className="text-center py-8">Loading top results...</div>;
    }

    if (!topResults?.success) {
      return <div className="text-center py-8 text-gray-500">Unable to load top results</div>;
    }

    return (
      <div className="space-y-6">
        {/* Top Stocks */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-600" />
            Top Stocks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topResults.data.stocks.slice(0, 6).map((stock) => (
              <Card key={stock.symbol} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{stock.symbol}</h4>
                      <p className="text-sm text-gray-600 truncate">{stock.name}</p>
                    </div>
                    <Badge variant={stock.changePercent && stock.changePercent > 0 ? "default" : "destructive"}>
                      {stock.changePercent ? `${stock.changePercent.toFixed(2)}%` : 'N/A'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">₹{stock.price || 'N/A'}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline"><Eye size={14} /></Button>
                      <Button size="sm" variant="outline"><Bell size={14} /></Button>
                      <Button size="sm"><ShoppingCart size={14} /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top Mutual Funds */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-blue-600" />
            Top Mutual Funds
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topResults.data.mutualFunds.slice(0, 6).map((fund) => (
              <Card key={fund.symbol} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{fund.symbol}</h4>
                      <p className="text-sm text-gray-600 truncate">{fund.name}</p>
                    </div>
                    <Badge variant="outline">
                      {fund.category || 'Fund'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">NAV ₹{fund.nav || 'N/A'}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline"><Eye size={14} /></Button>
                      <Button size="sm" variant="outline"><Bell size={14} /></Button>
                      <Button size="sm"><ShoppingCart size={14} /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Top IPOs */}
        <div>
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <TrendingUp size={20} className="text-purple-600" />
            Active IPOs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {topResults.data.ipos.slice(0, 6).map((ipo) => (
              <Card key={ipo.symbol} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{ipo.symbol}</h4>
                      <p className="text-sm text-gray-600 truncate">{ipo.name}</p>
                    </div>
                    <Badge variant={ipo.status === 'open' ? 'default' : 'secondary'}>
                      {ipo.status || 'IPO'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{ipo.priceRange || 'Price TBA'}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline"><Eye size={14} /></Button>
                      <Button size="sm" variant="outline"><Bell size={14} /></Button>
                      <Button size="sm"><ShoppingCart size={14} /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSearchResults = () => {
    if (!searchResults) return null;

    if (!searchResults.success) {
      return (
        <Card className="mt-6">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Search failed: {searchResults.error}</p>
          </CardContent>
        </Card>
      );
    }

    if (searchResults.data.length === 0) {
      return (
        <Card className="mt-6">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600">No results found. Try adjusting your search criteria.</p>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Search Results ({searchResults.total_records} found)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.data.map((result) => (
              <Card key={result.symbol} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{result.symbol}</h4>
                      <p className="text-sm text-gray-600 truncate">{result.name}</p>
                    </div>
                    <Badge variant="outline">{result.assetType}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">₹{result.price || 'N/A'}</span>
                    <div className="flex gap-1">
                      <Button size="sm" variant="outline"><Eye size={14} /></Button>
                      <Button size="sm" variant="outline"><Bell size={14} /></Button>
                      <Button size="sm"><ShoppingCart size={14} /></Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Feed V2</h1>
          <p className="text-gray-600">Discover and search stocks, mutual funds, and IPOs with advanced AI-powered search</p>
        </div>

        {/* Quick Search Bar */}
        <div className="mb-6 flex justify-center">
          <AutocompleteSearchBar 
            onResultClick={handleAutocompleteSelect}
            placeholder="Quick search: Type stock name, symbol, or mutual fund..."
          />
        </div>

        {/* Advanced Search Interface */}
        <UnifiedSearchInterface
          onSearch={handleSearch}
          isLoading={isSearching}
          nlpAnalysis={nlpAnalysisForInterface}
        />

        {/* Results or Top Results */}
        {searchResults ? renderSearchResults() : renderTopResults()}
      </div>
    </div>
  );
};

export default FeedV2;

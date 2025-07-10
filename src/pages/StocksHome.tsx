import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AutocompleteSearchBar from '@/components/feed/AutocompleteSearchBar';
import { AutocompleteResult, getTopResults } from '@/utils/unifiedSearchApi';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Eye, 
  Bell, 
  ShoppingCart,
  Globe,
  MapPin,
  Star,
  Zap
} from 'lucide-react';

const StocksHome = () => {
  const [activeMarket, setActiveMarket] = useState<'india' | 'us'>('india');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');

  // Fetch top stocks
  const { data: topResults, isLoading } = useQuery({
    queryKey: ['topResults'],
    queryFn: getTopResults,
  });

  const handleAutocompleteSelect = (result: AutocompleteResult) => {
    console.log('Selected result:', result);
    // TODO: Navigate to stock details page
  };

  const handleStockClick = (symbol: string) => {
    console.log('Navigate to stock:', symbol);
    // TODO: Navigate to stock research page
  };

  const themes = [
    { name: 'AI & Technology', count: 45, trend: '+5.2%' },
    { name: 'Green Energy', count: 32, trend: '+3.8%' },
    { name: 'Healthcare', count: 28, trend: '+2.1%' },
    { name: 'Banking & Finance', count: 52, trend: '+1.9%' },
    { name: 'Infrastructure', count: 38, trend: '+1.5%' },
    { name: 'Consumer Goods', count: 41, trend: '-0.8%' },
  ];

  const sectors = [
    'All Sectors',
    'Technology',
    'Banking',
    'Healthcare',
    'Energy',
    'Automotive',
    'FMCG',
    'Pharma',
    'Metals',
    'Real Estate'
  ];

  const renderStockCard = (stock: any) => (
    <Card 
      key={stock.symbol} 
      className="hover:shadow-md transition-all duration-200 cursor-pointer group bg-white/70 backdrop-blur-sm"
      onClick={() => handleStockClick(stock.symbol)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h4 className="font-semibold text-lg group-hover:text-blue-600 transition-colors">
              {stock.symbol}
            </h4>
            <p className="text-sm text-gray-600 truncate">{stock.name}</p>
            {stock.sector && (
              <Badge variant="outline" className="mt-1 text-xs">
                {stock.sector}
              </Badge>
            )}
          </div>
          <div className="text-right">
            <div className="font-semibold text-lg">
              {activeMarket === 'india' ? '₹' : '$'}{stock.price || 'N/A'}
            </div>
            <Badge 
              variant={stock.changePercent && stock.changePercent > 0 ? "default" : "destructive"}
              className="text-xs"
            >
              {stock.changePercent ? `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%` : 'N/A'}
            </Badge>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Vol: {stock.volume || 'N/A'}</span>
            <span>•</span>
            <span>MCap: {stock.marketCap || 'N/A'}</span>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Eye size={14} />
            </Button>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Bell size={14} />
            </Button>
            <Button size="sm" variant="default" className="h-8 w-8 p-0">
              <ShoppingCart size={14} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Stocks
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Discover and analyze stocks from Indian and US markets
              </p>
            </div>
            <Tabs value={activeMarket} onValueChange={(value: string) => setActiveMarket(value as 'india' | 'us')}>
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="india" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  India
                </TabsTrigger>
                <TabsTrigger value="us" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  US
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <AutocompleteSearchBar 
              onResultClick={handleAutocompleteSelect}
              placeholder={`Search ${activeMarket === 'india' ? 'Indian' : 'US'} stocks...`}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Input
                placeholder="Filter by name or symbol..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
            <Select value={sectorFilter} onValueChange={setSectorFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector.toLowerCase().replace(' ', '-')}>
                    {sector}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Market Themes */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            Market Themes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <Card 
                key={theme.name} 
                className="hover:shadow-md transition-all duration-200 cursor-pointer bg-white/70 backdrop-blur-sm"
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{theme.name}</h3>
                    <Badge 
                      variant={theme.trend.startsWith('+') ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {theme.trend}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{theme.count} stocks</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Trending Stocks */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Trending Stocks
            </h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading trending stocks...</div>
          ) : !topResults?.success ? (
            <div className="text-center py-8 text-gray-500">Unable to load trending stocks</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {topResults.data.stocks.slice(0, 8).map(renderStockCard)}
            </div>
          )}
        </div>

        {/* All Stocks */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              All {activeMarket === 'india' ? 'Indian' : 'US'} Stocks
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Showing 1-20 of 5000+</span>
              <Button variant="outline" size="sm">
                Load More
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-8">Loading stocks...</div>
          ) : !topResults?.success ? (
            <div className="text-center py-8 text-gray-500">Unable to load stocks</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {topResults.data.stocks.map(renderStockCard)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StocksHome;
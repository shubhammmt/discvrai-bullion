
import React, { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Filter, 
  Eye, 
  Bell, 
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  MapPin,
  Star,
  Activity,
  BarChart3,
  DollarSign,
  Percent
} from 'lucide-react';
import Header from '@/components/Header';
import { getTopResults } from '@/utils/unifiedSearchApi';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: string;
  marketCap?: string;
  sector?: string;
  pe?: number;
  high52w?: number;
  low52w?: number;
}

const StockMarketPage = () => {
  const [activeMarket, setActiveMarket] = useState<'india' | 'us'>('india');
  const [searchQuery, setSearchQuery] = useState('');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('marketCap');

  // Fetch market data
  const { data: marketData, isLoading } = useQuery({
    queryKey: ['marketData', activeMarket],
    queryFn: getTopResults,
  });

  // Mock market overview data
  const marketOverview = {
    india: {
      sensex: { value: 73849.37, change: 234.12, changePercent: 0.32 },
      nifty: { value: 22368.75, change: 68.95, changePercent: 0.31 },
      totalVolume: '₹45,234 Cr',
      advances: 1247,
      declines: 987
    },
    us: {
      sp500: { value: 4769.83, change: -12.45, changePercent: -0.26 },
      nasdaq: { value: 14845.12, change: -45.67, changePercent: -0.31 },
      totalVolume: '$892.5B',
      advances: 1567,
      declines: 1234
    }
  };

  const currentMarketData = marketOverview[activeMarket];

  // Filter and sort stocks
  const filteredStocks = useMemo(() => {
    if (!marketData?.success) return [];
    
    let stocks = marketData.data.stocks || [];
    
    // Apply search filter
    if (searchQuery) {
      stocks = stocks.filter(stock => 
        stock.symbol?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sector filter
    if (sectorFilter !== 'all') {
      stocks = stocks.filter(stock => 
        stock.sector?.toLowerCase() === sectorFilter.toLowerCase()
      );
    }
    
    return stocks.slice(0, 20); // Limit to 20 stocks for performance
  }, [marketData, searchQuery, sectorFilter]);

  const sectors = [
    'All Sectors', 'Technology', 'Banking', 'Pharma', 'Auto', 
    'Energy', 'FMCG', 'Metals', 'Realty', 'Telecom'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Stock Market Hub
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track Indian and US markets with real-time data, advanced analytics, and personalized insights
          </p>
        </div>

        {/* Market Selection Tabs */}
        <div className="flex justify-center">
          <Tabs value={activeMarket} onValueChange={(value: string) => setActiveMarket(value as 'india' | 'us')} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2 h-12">
              <TabsTrigger value="india" className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4" />
                Indian Market
              </TabsTrigger>
              <TabsTrigger value="us" className="flex items-center gap-2 text-base">
                <Globe className="h-4 w-4" />
                US Market
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">
                    {activeMarket === 'india' ? 'SENSEX' : 'S&P 500'}
                  </p>
                  <p className="text-2xl font-bold text-green-900">
                    {activeMarket === 'india' ? currentMarketData.sensex.value.toLocaleString() : currentMarketData.sp500.value.toLocaleString()}
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm font-medium text-green-700">
                  +{activeMarket === 'india' ? currentMarketData.sensex.change.toFixed(2) : Math.abs(currentMarketData.sp500.change).toFixed(2)} ({activeMarket === 'india' ? currentMarketData.sensex.changePercent.toFixed(2) : Math.abs(currentMarketData.sp500.changePercent).toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">
                    {activeMarket === 'india' ? 'NIFTY 50' : 'NASDAQ'}
                  </p>
                  <p className="text-2xl font-bold text-blue-900">
                    {activeMarket === 'india' ? currentMarketData.nifty.value.toLocaleString() : currentMarketData.nasdaq.value.toLocaleString()}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2">
                <ArrowUpRight className="h-4 w-4 text-blue-600 mr-1" />
                <span className="text-sm font-medium text-blue-700">
                  +{activeMarket === 'india' ? currentMarketData.nifty.change.toFixed(2) : Math.abs(currentMarketData.nasdaq.change).toFixed(2)} ({activeMarket === 'india' ? currentMarketData.nifty.changePercent.toFixed(2) : Math.abs(currentMarketData.nasdaq.changePercent).toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Volume</p>
                  <p className="text-2xl font-bold text-purple-900">
                    {currentMarketData.totalVolume}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-purple-700">
                  Daily trading volume
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Market Breadth</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm font-medium text-green-600">↑{currentMarketData.advances}</span>
                    <span className="text-sm font-medium text-red-600">↓{currentMarketData.declines}</span>
                  </div>
                </div>
                <Percent className="h-8 w-8 text-orange-600" />
              </div>
              <div className="flex items-center mt-2">
                <span className="text-sm text-orange-700">
                  Advances vs Declines
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Find Stocks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder={`Search ${activeMarket === 'india' ? 'Indian' : 'US'} stocks by name or symbol...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-full sm:w-48">
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
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stocks Grid */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                {activeMarket === 'india' ? 'Indian' : 'US'} Stocks
              </CardTitle>
              <Badge variant="secondary">
                {filteredStocks.length} stocks found
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <CardContent className="p-4">
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-6 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredStocks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStocks.map((stock, index) => (
                  <Card key={`${stock.symbol}-${index}`} className="hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-lg group-hover:text-primary transition-colors truncate">
                            {stock.symbol}
                          </h4>
                          <p className="text-sm text-muted-foreground truncate">{stock.name}</p>
                          {stock.sector && (
                            <Badge variant="outline" className="mt-1 text-xs">
                              {stock.sector}
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xl font-bold">
                            {activeMarket === 'india' ? '₹' : '$'}{stock.price?.toFixed(2) || 'N/A'}
                          </span>
                          <Badge 
                            variant={stock.changePercent && stock.changePercent > 0 ? "default" : "destructive"}
                            className="text-xs"
                          >
                            {stock.changePercent ? `${stock.changePercent > 0 ? '+' : ''}${stock.changePercent.toFixed(2)}%` : 'N/A'}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Vol: {stock.volume || 'N/A'}</span>
                          <span>MCap: {stock.marketCap || 'N/A'}</span>
                        </div>
                        
                        <div className="flex justify-between items-center pt-2 border-t">
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye size={14} />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Bell size={14} />
                            </Button>
                          </div>
                          <Button size="sm" variant="default" className="flex items-center gap-1">
                            <Plus size={14} />
                            Add
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No stocks found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockMarketPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMixedFeed } from '@/hooks/useMixedFeed';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import AutocompleteSearchBar from '@/components/feed/AutocompleteSearchBar';
import LatestNews from '@/components/LatestNews';
import { AutocompleteResult } from '@/utils/unifiedSearchApi';
import { 
  Search, 
  TrendingUp, 
  PieChart, 
  Briefcase, 
  ArrowRight,
  Building2,
  LineChart,
  Zap
} from 'lucide-react';

const NewsFeed = () => {
  const navigate = useNavigate();
  const { mixedFeedData, isLoading, error } = useMixedFeed();

  const handleAutocompleteSelect = (result: AutocompleteResult) => {
    console.log('Selected result:', result);
    // TODO: Navigate to product page based on result.assetType and result.symbol
    // This would typically use React Router to navigate to:
    // - /research/stock/${result.symbol} for stocks
    // - /research/mutual-fund/${result.symbol} for mutual funds  
    // - /research/ipo/${result.symbol} for IPOs
  };

  const assetClassCards = [
    {
      title: 'Stocks',
      description: 'Explore Indian & US equity markets',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600',
      route: '/stocks',
      stats: '5000+ stocks'
    },
    {
      title: 'Mutual Funds',
      description: 'Discover top performing funds',
      icon: PieChart,
      color: 'from-blue-500 to-cyan-600',
      route: '/mutual-funds',
      stats: '1500+ funds'
    },
    {
      title: 'IPOs',
      description: 'Track upcoming & recent IPOs',
      icon: Briefcase,
      color: 'from-purple-500 to-violet-600',
      route: '/ipos',
      stats: '50+ IPOs'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Financial News Feed
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stay updated with market trends and explore investment opportunities
          </p>
        </div>

        {/* Quick Search Bar */}
        <div className="mb-8 flex justify-center">
          <div className="w-full max-w-2xl">
            <AutocompleteSearchBar 
              onResultClick={handleAutocompleteSelect}
              placeholder="Quick search: Type stock name, symbol, or mutual fund..."
            />
          </div>
        </div>

        {/* Advanced Search CTA */}
        <div className="mb-8 text-center">
          <Button 
            onClick={() => navigate('/search')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8"
          >
            <Search className="mr-2 h-4 w-4" />
            Advanced Search
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Asset Class Navigation Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Explore Asset Classes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {assetClassCards.map((card) => {
              const IconComponent = card.icon;
              return (
                <Card 
                  key={card.title} 
                  className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 bg-white/70 backdrop-blur-sm dark:bg-gray-800/70"
                  onClick={() => navigate(card.route)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${card.color} text-white`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {card.description}
                    </p>
                    <Badge variant="secondary" className="text-xs">
                      {card.stats}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Market Updates Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Latest News */}
          <div className="lg:col-span-2">
            <Card className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-yellow-500" />
                  Latest Market News
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LatestNews />
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Market Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Sensex</span>
                  <div className="text-right">
                    <div className="font-semibold">74,119</div>
                    <div className="text-xs text-green-600">+0.45%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Nifty 50</span>
                  <div className="text-right">
                    <div className="font-semibold">22,467</div>
                    <div className="text-xs text-green-600">+0.52%</div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-300">Bank Nifty</span>
                  <div className="text-right">
                    <div className="font-semibold">48,234</div>
                    <div className="text-xs text-red-600">-0.23%</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/70 backdrop-blur-sm dark:bg-gray-800/70">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <LineChart className="h-4 w-4" />
                  Top Gainers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span>RELIANCE</span>
                  <span className="text-green-600 font-medium">+3.45%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>TCS</span>
                  <span className="text-green-600 font-medium">+2.87%</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span>HDFC BANK</span>
                  <span className="text-green-600 font-medium">+2.34%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
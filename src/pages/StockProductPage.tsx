
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Bell, 
  Heart,
  Share2,
  BarChart3,
  Calendar,
  Building2,
  Globe,
  Users,
  DollarSign,
  Target,
  Star
} from 'lucide-react';
import Header from '@/components/Header';
import StockResearch from '@/pages/StockResearch';

const StockProductPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  // Mock stock data - in real app, this would come from API
  const stockData = {
    symbol: symbol?.toUpperCase() || 'RELIANCE',
    companyName: getCompanyName(symbol?.toUpperCase() || 'RELIANCE'),
    price: getStockPrice(symbol?.toUpperCase() || 'RELIANCE'),
    change: getStockChange(symbol?.toUpperCase() || 'RELIANCE'),
    changePercent: getStockChangePercent(symbol?.toUpperCase() || 'RELIANCE'),
    marketCap: getMarketCap(symbol?.toUpperCase() || 'RELIANCE'),
    sector: getSector(symbol?.toUpperCase() || 'RELIANCE'),
    industry: getIndustry(symbol?.toUpperCase() || 'RELIANCE'),
    description: getCompanyDescription(symbol?.toUpperCase() || 'RELIANCE')
  };

  const isPositive = stockData.change >= 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <Header />
      
      <div className="container mx-auto px-4 py-6">
        {/* Navigation Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/stock-market')}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back to Market
          </Button>
          <div className="h-6 w-px bg-border" />
          <nav className="text-sm text-muted-foreground">
            <span>Stock Market</span>
            <span className="mx-2">/</span>
            <span className="text-foreground font-medium">{stockData.symbol}</span>
          </nav>
        </div>

        {/* Hero Section */}
        <Card className="mb-6 bg-gradient-to-r from-card to-card/50 border-2">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Company Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{stockData.symbol}</h1>
                    <p className="text-lg text-muted-foreground">{stockData.companyName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{stockData.sector}</Badge>
                  <Badge variant="outline">{stockData.industry}</Badge>
                  <Badge variant="outline" className="text-xs">NSE</Badge>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">
                  {stockData.description}
                </p>
              </div>

              {/* Right: Price & Actions */}
              <div className="lg:text-right">
                <div className="mb-4">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    ₹{stockData.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                  </div>
                  <div className={`flex items-center gap-2 text-lg font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'} lg:justify-end`}>
                    {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
                    <span>
                      {isPositive ? '+' : ''}₹{stockData.change.toFixed(2)} 
                      ({isPositive ? '+' : ''}{stockData.changePercent.toFixed(2)}%)
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Market Cap: {stockData.marketCap}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2">
                    <Plus size={16} />
                    Buy Stock
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setIsFollowing(!isFollowing)}
                    className={`flex items-center gap-2 ${isFollowing ? 'bg-green-50 border-green-200 text-green-700' : ''}`}
                  >
                    <Heart size={16} className={isFollowing ? 'fill-current' : ''} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Bell size={16} />
                    Alerts
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
          {getQuickStats(stockData.symbol).map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
                {stat.change && (
                  <div className={`text-xs mt-1 ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.positive ? '+' : ''}{stat.change}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-fit lg:grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 size={16} />
              Overview
            </TabsTrigger>
            <TabsTrigger value="research" className="flex items-center gap-2">
              <Target size={16} />
              Research
            </TabsTrigger>
            <TabsTrigger value="financials" className="flex items-center gap-2">
              <DollarSign size={16} />
              Financials
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center gap-2">
              <Globe size={16} />
              News
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Price Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 bg-muted/20 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Interactive price chart will be displayed here</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    Key Highlights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getKeyHighlights(stockData.symbol).map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{highlight}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="research">
            <StockResearch />
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-60 bg-muted/20 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Financial charts and data will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Latest News & Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getLatestNews(stockData.symbol).map((news, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-semibold mb-2">{news.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{news.summary}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar size={12} />
                        <span>{news.date}</span>
                        <span>•</span>
                        <span>{news.source}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Helper functions for mock data
function getCompanyName(symbol: string): string {
  const companies: Record<string, string> = {
    'RELIANCE': 'Reliance Industries Limited',
    'TCS': 'Tata Consultancy Services',
    'HDFC': 'HDFC Bank Limited',
    'INFY': 'Infosys Limited',
    'ICICIBANK': 'ICICI Bank Limited',
    'SBIN': 'State Bank of India',
    'BHARTIARTL': 'Bharti Airtel Limited',
    'ITC': 'ITC Limited',
    'KOTAKBANK': 'Kotak Mahindra Bank',
    'LT': 'Larsen & Toubro Limited'
  };
  return companies[symbol] || `${symbol} Limited`;
}

function getStockPrice(symbol: string): number {
  const prices: Record<string, number> = {
    'RELIANCE': 2847.65,
    'TCS': 4127.30,
    'HDFC': 1687.45,
    'INFY': 1456.80,
    'ICICIBANK': 1245.60
  };
  return prices[symbol] || 1500 + Math.random() * 1000;
}

function getStockChange(symbol: string): number {
  return (Math.random() - 0.5) * 100;
}

function getStockChangePercent(symbol: string): number {
  return (Math.random() - 0.5) * 10;
}

function getMarketCap(symbol: string): string {
  const caps: Record<string, string> = {
    'RELIANCE': '₹19.2L Cr',
    'TCS': '₹15.1L Cr',
    'HDFC': '₹9.2L Cr',
    'INFY': '₹6.1L Cr',
    'ICICIBANK': '₹8.7L Cr'
  };
  return caps[symbol] || '₹5.5L Cr';
}

function getSector(symbol: string): string {
  const sectors: Record<string, string> = {
    'RELIANCE': 'Energy & Petrochemicals',
    'TCS': 'Information Technology',
    'HDFC': 'Banking & Financial Services',
    'INFY': 'Information Technology',
    'ICICIBANK': 'Banking & Financial Services'
  };
  return sectors[symbol] || 'Diversified';
}

function getIndustry(symbol: string): string {
  const industries: Record<string, string> = {
    'RELIANCE': 'Oil & Gas',
    'TCS': 'IT Services',
    'HDFC': 'Private Bank',
    'INFY': 'IT Services',
    'ICICIBANK': 'Private Bank'
  };
  return industries[symbol] || 'Conglomerate';
}

function getCompanyDescription(symbol: string): string {
  const descriptions: Record<string, string> = {
    'RELIANCE': 'Reliance Industries Limited is India\'s largest private sector company engaged in energy, petrochemicals, textiles, natural resources, retail, and telecommunications.',
    'TCS': 'Tata Consultancy Services is a leading global IT services, consulting and business solutions organization that has been partnering with many of the world\'s largest businesses.',
    'HDFC': 'HDFC Bank Limited is India\'s leading private sector bank offering a wide range of banking and financial services to corporate and retail customers.',
  };
  return descriptions[symbol] || 'A leading company in its sector with strong fundamentals and growth prospects.';
}

function getQuickStats(symbol: string) {
  return [
    { label: 'P/E Ratio', value: '24.5', change: null, positive: true },
    { label: 'Market Cap', value: '₹19.2L Cr', change: null, positive: true },
    { label: 'Dividend Yield', value: '0.35%', change: null, positive: true },
    { label: '52W High', value: '₹3,024', change: null, positive: true },
    { label: '52W Low', value: '₹2,220', change: null, positive: true },
    { label: 'Volume', value: '1.2Cr', change: '+15%', positive: true }
  ];
}

function getKeyHighlights(symbol: string): string[] {
  const highlights: Record<string, string[]> = {
    'RELIANCE': [
      'Largest private sector company in India by market capitalization',
      'Strong presence in energy, petrochemicals, and retail sectors',
      'Jio platforms driving digital transformation initiatives',
      'Consistent dividend payments with strong cash flows',
      'Strategic partnerships with global technology giants'
    ]
  };
  return highlights[symbol] || [
    'Strong market position in its sector',
    'Consistent financial performance',
    'Experienced management team',
    'Growth opportunities in emerging markets'
  ];
}

function getLatestNews(symbol: string) {
  return [
    {
      title: `${symbol} Reports Strong Q3 Results`,
      summary: 'Company beats analyst expectations with improved margins and revenue growth.',
      date: '2 hours ago',
      source: 'Economic Times'
    },
    {
      title: `Analysts Upgrade ${symbol} Stock Rating`,
      summary: 'Leading brokerage firms raise target price citing strong fundamentals.',
      date: '1 day ago',
      source: 'Business Standard'
    },
    {
      title: `${symbol} Announces Strategic Partnership`,
      summary: 'New collaboration expected to drive growth in key business segments.',
      date: '3 days ago',
      source: 'Financial Express'
    }
  ];
}

export default StockProductPage;

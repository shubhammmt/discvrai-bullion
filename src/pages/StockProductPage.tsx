
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Star,
  PieChart,
  Shield,
  Activity
} from 'lucide-react';
import Header from '@/components/Header';
import StockResearch from '@/pages/StockResearch';

const StockProductPage = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isFollowing, setIsFollowing] = useState(false);

  // Enhanced stock data for Reliance Industries
  const stockData = {
    symbol: symbol?.toUpperCase() || 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    price: 2847.65,
    change: 45.30,
    changePercent: 1.62,
    marketCap: '₹19.2L Cr',
    sector: 'Energy & Petrochemicals',
    industry: 'Oil & Gas',
    description: 'Reliance Industries Limited is India\'s largest private sector company engaged in energy, petrochemicals, textiles, natural resources, retail, and telecommunications. The company operates across various business segments including oil refining, petrochemicals, oil and gas exploration, retail, and digital services through Jio Platforms.'
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
        <Card className="mb-6 bg-white/70 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left: Company Info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{stockData.symbol}</h1>
                    <p className="text-lg text-muted-foreground">{stockData.companyName}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                    {stockData.sector}
                  </Badge>
                  <Badge variant="outline" className="border-gray-300">
                    {stockData.industry}
                  </Badge>
                  <Badge variant="outline" className="text-xs border-gray-300">NSE</Badge>
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
                    className={`flex items-center gap-2 ${isFollowing ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' : ''}`}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">24.5</div>
              <div className="text-xs text-muted-foreground">P/E Ratio</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">₹3,024</div>
              <div className="text-xs text-muted-foreground">52W High</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">₹2,220</div>
              <div className="text-xs text-muted-foreground">52W Low</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">0.35%</div>
              <div className="text-xs text-muted-foreground">Dividend Yield</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">1.2Cr</div>
              <div className="text-xs text-muted-foreground">Volume</div>
              <div className="text-xs mt-1 text-green-600">+15%</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-foreground mb-1">0.95</div>
              <div className="text-xs text-muted-foreground">Beta</div>
            </CardContent>
          </Card>
        </div>

        {/* Price Chart */}
        <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-600" />
              Price Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive price chart will be displayed here</p>
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout for Highlights and Business Segments */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Key Highlights */}
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Key Highlights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Largest private sector company in India by market capitalization</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Strong presence in energy, petrochemicals, and retail sectors</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Jio platforms driving digital transformation initiatives</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Consistent dividend payments with strong cash flows</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                <p className="text-sm text-gray-700">Strategic partnerships with global technology giants</p>
              </div>
            </CardContent>
          </Card>

          {/* Business Segments */}
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                Business Segments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Oil & Gas</span>
                  <span className="text-sm text-muted-foreground">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Retail</span>
                  <span className="text-sm text-muted-foreground">32%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Digital Services</span>
                  <span className="text-sm text-muted-foreground">15%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Petrochemicals</span>
                  <span className="text-sm text-muted-foreground">8%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Health and Research Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-green-600" />
                Financial Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Debt to Equity</span>
                  <span className="text-sm font-medium">0.21</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Current Ratio</span>
                  <span className="text-sm font-medium">1.15</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ROE</span>
                  <span className="text-sm font-medium">13.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">ROA</span>
                  <span className="text-sm font-medium">7.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Net Profit Margin</span>
                  <span className="text-sm font-medium">8.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Research Integration */}
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                AI Research Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700 mb-4">
                Get detailed AI-powered analysis, personalized recommendations, and real-time insights for this stock.
              </p>
              <Button 
                onClick={() => navigate(`/research/stock/${symbol}`)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <BarChart3 size={16} className="mr-2" />
                View Detailed Research
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Financials Section */}
        <Card className="mb-8 bg-white/70 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              Financial Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Revenue Growth</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">FY 2024</span>
                    <span className="text-sm font-medium">₹9,75,000 Cr (+12.5%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FY 2023</span>
                    <span className="text-sm font-medium">₹8,66,000 Cr (+28.8%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">FY 2022</span>
                    <span className="text-sm font-medium">₹6,72,000 Cr (+24.5%)</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3 text-gray-900">Profitability</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Net Profit (FY24)</span>
                    <span className="text-sm font-medium">₹79,000 Cr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">EBITDA Margin</span>
                    <span className="text-sm font-medium">17.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Operating Margin</span>
                    <span className="text-sm font-medium">12.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* News Section */}
        <Card className="bg-white/70 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Latest News & Updates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">Reliance Reports Strong Q3 Results with 12% Revenue Growth</h4>
                <p className="text-sm text-muted-foreground mb-2">Company beats analyst expectations with improved margins across all business segments, driven by strong performance in retail and digital services.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>2 hours ago</span>
                  <span>•</span>
                  <span>Economic Times</span>
                </div>
              </div>
              <div className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">Jio Platforms Announces 5G Expansion Across 1000 Cities</h4>
                <p className="text-sm text-muted-foreground mb-2">Reliance Jio accelerates 5G rollout with plans to cover major cities by Q2 2024, expecting significant subscriber growth.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>1 day ago</span>
                  <span>•</span>
                  <span>Business Standard</span>
                </div>
              </div>
              <div className="border-b pb-4 last:border-b-0">
                <h4 className="font-semibold mb-2">RIL Green Energy Initiative Gets ₹75,000 Cr Investment</h4>
                <p className="text-sm text-muted-foreground mb-2">Company commits to carbon neutrality by 2035 with major investments in solar, hydrogen, and battery storage technologies.</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar size={12} />
                  <span>3 days ago</span>
                  <span>•</span>
                  <span>Financial Express</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StockProductPage;

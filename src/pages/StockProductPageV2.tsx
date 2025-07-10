import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Bell, 
  Heart, 
  Share2, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Brain,
  Target,
  MessageCircle,
  Eye,
  BarChart3,
  Calendar,
  FileText,
  Users,
  AlertTriangle,
  Info,
  ChevronRight,
  Star,
  GitCompare,
  BookmarkPlus,
  StickyNote,
  Zap,
  Activity
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area } from 'recharts';
import CompanyOverviewCard from '@/components/stock/CompanyOverviewCard';

const StockProductPageV2 = () => {
  const { symbol } = useParams();
  const navigate = useNavigate();
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [chartTimeframe, setChartTimeframe] = useState('1D');

  // Layer 1: Personalization Engine - Get user profile for AI personalization
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  const userRiskProfile = userProfile.riskTolerance || 'moderate';
  const userInvestmentGoals = userProfile.investmentGoals || [];

  // Mock stock data - In real implementation, this would come from APIs
  const stockData = {
    symbol: symbol?.toUpperCase() || 'RELIANCE',
    companyName: 'Reliance Industries Limited',
    sector: 'Oil & Gas',
    exchange: 'NSE',
    isin: 'INE002A01018',
    currentPrice: 2845.75,
    change: +67.25,
    changePercent: +2.42,
    volume: 8547234,
    marketCap: '19,22,847 Cr',
    weekHigh52: 3024.90,
    weekLow52: 2220.30,
    pe: 28.4,
    pb: 2.8,
    eps: 100.15,
    roe: 15.2,
    dividendYield: 0.35,
    debtToEquity: 0.42,
    logo: '/placeholder.svg',
    description: 'Reliance Industries Limited is an Indian multinational conglomerate company headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.'
  };

  // Layer 2: Risk & Goal Intelligence - AI-powered risk assessment and personalization
  const personalizedInsights = {
    matchScore: userRiskProfile === 'conservative' ? 65 : userRiskProfile === 'moderate' ? 85 : 75,
    aiConfidence: 78,
    riskAssessment: 'Medium',
    suitabilityReason: userRiskProfile === 'conservative' 
      ? 'Moderate fit for conservative investors. Strong dividend history but higher volatility than bonds.'
      : userRiskProfile === 'moderate'
      ? 'Excellent match! Quality growth stock with reasonable valuation for moderate risk profile.'
      : 'Good quality pick but may be less exciting for aggressive growth seekers.',
    recommendation: `Suitable for ${userRiskProfile} risk investors seeking quality growth. Best for 3-5 year investment horizon based on your profile.`,
    keyDrivers: [
      'Strong fundamentals with ₹1.6L Cr cash reserves',
      'Retail segment growing at 47% YoY',
      'Digital services expansion accelerating',
      'Oil-to-chemicals business providing stability'
    ]
  };

  // Layer 3: Financial Product Intelligence - Product matching and analysis
  const aiAnalysis = {
    sentiment: 'bullish' as const,
    summary: 'AI analysis indicates strong fundamentals with robust cash position and expanding digital business. Recent quarterly results beat estimates with retail segment showing exceptional growth.',
    technicalSignals: {
      rsi: 58,
      macdSignal: 'bullish',
      supportLevel: 2750,
      resistanceLevel: 2950,
      trend: 'upward'
    },
    valuation: {
      fair_value: 2920,
      upside: 2.6,
      valuation_summary: 'Fairly valued with slight upside potential'
    }
  };

  // Layer 4: Conversational Intelligence - Context-aware explanations
  const aiExplanations = {
    priceMovement: "Stock up 2.42% today following strong Q3 results announcement. Revenue grew 15% YoY driven by retail expansion.",
    keyMetrics: "P/E of 28.4x is above sector average but justified by superior growth profile and diversified business model.",
    riskFactors: ["Oil price volatility impact", "Regulatory changes in telecom sector", "High capex requirements for expansion"]
  };

  // Chart data
  const chartData = [
    { time: '09:15', price: 2778 },
    { time: '10:00', price: 2785 },
    { time: '11:00', price: 2798 },
    { time: '12:00', price: 2815 },
    { time: '13:00', price: 2822 },
    { time: '14:00', price: 2834 },
    { time: '15:30', price: 2845 }
  ];

  const newsData = [
    {
      id: 1,
      title: "Reliance Q3 results beat estimates, retail segment shows 47% growth",
      source: "Economic Times",
      time: "2 hours ago",
      sentiment: "positive",
      isBreaking: true
    },
    {
      id: 2,
      title: "Jio platforms announces new AI partnership with global tech giant",
      source: "Business Standard",
      time: "5 hours ago",
      sentiment: "positive",
      isBreaking: false
    },
    {
      id: 3,
      title: "Oil prices surge 3% on geopolitical tensions, benefits RIL",
      source: "Livemint",
      time: "1 day ago",
      sentiment: "positive",
      isBreaking: false
    }
  ];

  // Peer comparison data
  const peerData = [
    { company: 'Reliance', pe: 28.4, roe: 15.2, revenue_growth: 15.0, debt_ratio: 0.42 },
    { company: 'ONGC', pe: 12.5, roe: 8.5, revenue_growth: 8.2, debt_ratio: 0.35 },
    { company: 'IOC', pe: 15.2, roe: 12.1, revenue_growth: 6.5, debt_ratio: 0.48 },
    { company: 'BPCL', pe: 18.7, roe: 14.8, revenue_growth: 11.2, debt_ratio: 0.41 }
  ];

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto p-4">
          {/* Header with Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate(-1)}
                className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{stockData.symbol}</h1>
                <p className="text-sm text-gray-600">AI-powered research & analysis</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <GitCompare size={16} className="mr-2" />
                Compare
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsWatchlisted(!isWatchlisted)}
              >
                <Heart size={16} className={`mr-2 ${isWatchlisted ? 'fill-red-500 text-red-500' : ''}`} />
                Watchlist
              </Button>
              <Button variant="outline" size="sm">
                <Share2 size={16} className="mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* AI Personalization Match Score */}
          <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {personalizedInsights.matchScore}% Match for You
                    </h3>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                      {personalizedInsights.aiConfidence}% AI Confidence
                    </Badge>
                    <Badge variant="outline">
                      {userRiskProfile} Risk Profile
                    </Badge>
                  </div>
                  <p className="text-gray-700 mb-2">{personalizedInsights.suitabilityReason}</p>
                  <p className="text-sm text-blue-600 font-medium">{personalizedInsights.recommendation}</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700">
                  <Brain size={16} className="mr-2" />
                  Ask AI Assistant
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Area - Responsive Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* Left Column - Price & Chart (Spans 3 columns on XL screens) */}
            <div className="xl:col-span-3 space-y-6">
              
              {/* Price & Quick Stats */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <img src={stockData.logo} alt={stockData.companyName} className="w-12 h-12 rounded-lg" />
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">{stockData.companyName}</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>{stockData.sector}</span>
                          <span>•</span>
                          <span>{stockData.exchange}</span>
                          <span>•</span>
                          <span>ISIN: {stockData.isin}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-3xl font-bold text-gray-900">₹{stockData.currentPrice.toLocaleString()}</div>
                      <div className={`flex items-center gap-1 ${stockData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {stockData.change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                        <span className="font-medium">
                          ₹{Math.abs(stockData.change)} ({stockData.changePercent >= 0 ? '+' : ''}{stockData.changePercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* AI Price Movement Explanation */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <Zap size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-blue-800 mb-1">AI Analysis:</p>
                        <p className="text-sm text-blue-700">{aiExplanations.priceMovement}</p>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{stockData.volume.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">Volume</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">{stockData.marketCap}</div>
                      <div className="text-xs text-gray-600">Market Cap</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">₹{stockData.weekHigh52}</div>
                      <div className="text-xs text-gray-600">52W High</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-lg font-bold text-gray-900">₹{stockData.weekLow52}</div>
                      <div className="text-xs text-gray-600">52W Low</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Interactive Price Chart */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Price Chart
                      <Badge variant="secondary">AI Enhanced</Badge>
                    </CardTitle>
                    <div className="flex gap-1">
                      {['1D', '5D', '1M', '6M', '1Y', 'Max'].map((period) => (
                        <Button
                          key={period}
                          variant={chartTimeframe === period ? "default" : "outline"}
                          size="sm"
                          onClick={() => setChartTimeframe(period)}
                        >
                          {period}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ChartContainer
                      config={{
                        price: {
                          label: "Price",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <AreaChart data={chartData}>
                        <XAxis dataKey="time" />
                        <YAxis domain={['dataMin - 5', 'dataMax + 5']} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="price" 
                          stroke="hsl(var(--chart-1))" 
                          fill="hsl(var(--chart-1))" 
                          fillOpacity={0.2} 
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                  
                  {/* AI Chart Annotations */}
                  <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <Activity size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-purple-800 mb-1">Technical AI Insights:</p>
                        <p className="text-sm text-purple-700">
                          Stock showing {aiAnalysis.technicalSignals.trend} trend with RSI at {aiAnalysis.technicalSignals.rsi} (neutral zone). 
                          Support at ₹{aiAnalysis.technicalSignals.supportLevel}, resistance at ₹{aiAnalysis.technicalSignals.resistanceLevel}.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Overview - Now in main column */}
              <CompanyOverviewCard stockData={stockData} />

              {/* Tabs for Additional Content */}
              <Tabs defaultValue="insights" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="insights">AI Insights</TabsTrigger>
                  <TabsTrigger value="metrics">Metrics</TabsTrigger>
                  <TabsTrigger value="news">News</TabsTrigger>
                  <TabsTrigger value="peers">Peers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="insights" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-600" />
                        AI Key Insights
                        <Badge variant="secondary">Layer 1-4 Analysis</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Personalized Match</h4>
                            <p className="text-sm text-gray-600">
                              {personalizedInsights.matchScore}% compatibility with your {userRiskProfile} risk profile and investment goals.
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">AI Valuation</h4>
                            <p className="text-sm text-gray-600">
                              Fair value estimated at ₹{aiAnalysis.valuation.fair_value} ({aiAnalysis.valuation.upside > 0 ? '+' : ''}{aiAnalysis.valuation.upside}% from current price).
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                          <div>
                            <h4 className="font-medium text-gray-900">Sentiment Analysis</h4>
                            <p className="text-sm text-gray-600">
                              Overall {aiAnalysis.sentiment} sentiment based on financial data, news analysis, and market trends.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="metrics" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Key Financial Metrics
                        <Badge variant="secondary">AI Enhanced</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <Tooltip>
                          <TooltipTrigger>
                            <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                              <div className="text-lg font-bold text-orange-600">{stockData.pe}</div>
                              <div className="text-xs text-gray-600">P/E Ratio</div>
                              <div className="text-xs text-orange-600 mt-1">Above sector avg</div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Price-to-Earnings ratio. Above sector average of 25x</p>
                          </TooltipContent>
                        </Tooltip>

                        <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                          <div className="text-lg font-bold text-green-600">{stockData.roe}%</div>
                          <div className="text-xs text-gray-600">ROE</div>
                          <div className="text-xs text-green-600 mt-1">Excellent</div>
                        </div>

                        <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                          <div className="text-lg font-bold text-blue-600">₹{stockData.eps}</div>
                          <div className="text-xs text-gray-600">EPS</div>
                          <div className="text-xs text-blue-600 mt-1">Strong</div>
                        </div>

                        <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
                          <div className="text-lg font-bold text-purple-600">{stockData.dividendYield}%</div>
                          <div className="text-xs text-gray-600">Div Yield</div>
                          <div className="text-xs text-purple-600 mt-1">Low but growing</div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-blue-800 mb-1">AI Metrics Analysis:</p>
                            <p className="text-sm text-blue-700">{aiExplanations.keyMetrics}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="news" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Latest News & Events
                        <Badge variant="secondary">AI Curated</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {newsData.map((news) => (
                          <div key={news.id} className="flex items-start gap-3 p-3 rounded-lg border">
                            {news.isBreaking && (
                              <Badge variant="destructive" className="text-xs">BREAKING</Badge>
                            )}
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900 mb-1">{news.title}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <span>{news.source}</span>
                                <span>•</span>
                                <span>{news.time}</span>
                                <Badge 
                                  variant={news.sentiment === 'positive' ? 'default' : 'secondary'}
                                  className={news.sentiment === 'positive' ? 'bg-green-100 text-green-700' : ''}
                                >
                                  {news.sentiment}
                                </Badge>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-400" />
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Info size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800 mb-1">AI News Sentiment:</p>
                            <p className="text-sm text-yellow-700">
                              Recent news shows 80% positive sentiment. Key themes: strong quarterly results, expansion in digital services.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="peers" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Peer Comparison
                        <Badge variant="secondary">AI Analysis</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left p-2">Company</th>
                              <th className="text-center p-2">P/E</th>
                              <th className="text-center p-2">ROE</th>
                              <th className="text-center p-2">Revenue Growth</th>
                              <th className="text-center p-2">Debt Ratio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {peerData.map((peer, index) => (
                              <tr key={index} className={`border-b ${peer.company === 'Reliance' ? 'bg-blue-50' : ''}`}>
                                <td className="p-2 font-medium">{peer.company}</td>
                                <td className="text-center p-2">{peer.pe}</td>
                                <td className="text-center p-2">{peer.roe}%</td>
                                <td className="text-center p-2">{peer.revenue_growth}%</td>
                                <td className="text-center p-2">{peer.debt_ratio}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-start gap-2">
                          <Users size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-green-800 mb-1">AI Peer Analysis:</p>
                            <p className="text-sm text-green-700">
                              Reliance shows superior revenue growth (15% vs sector avg 9%) and strong ROE. Premium valuation justified by diversified business model.
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Right Sidebar - Sticky Position */}
            <div className="xl:col-span-1 space-y-6">
              <div className="sticky top-6 space-y-6">
                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <Bell size={16} className="mr-2" />
                      Set Price Alert
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <BookmarkPlus size={16} className="mr-2" />
                      Add to Portfolio
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <StickyNote size={16} className="mr-2" />
                      Add Notes
                    </Button>
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      <Plus size={16} className="mr-2" />
                      Buy Stock
                    </Button>
                  </CardContent>
                </Card>

                {/* AI Risk Assessment */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-500" />
                      AI Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Overall Risk</span>
                        <Badge variant="secondary">{personalizedInsights.riskAssessment}</Badge>
                      </div>
                      <Progress value={60} className="h-2" />
                      
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium">Key Risk Factors:</h4>
                        {aiExplanations.riskFactors.map((risk, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"></div>
                            <span className="text-xs text-gray-600">{risk}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Corporate Calendar */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4" />
                      Upcoming Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Q4 Results</p>
                          <p className="text-xs text-gray-600">Apr 18, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">AGM</p>
                          <p className="text-xs text-gray-600">Jun 28, 2024</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium">Ex-Dividend</p>
                          <p className="text-xs text-gray-600">Jul 15, 2024</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Conversation Widget */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-sm">
                      <MessageCircle className="w-4 h-4 text-purple-600" />
                      Ask AI Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Why is the stock up today?
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Compare with sector peers
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        What are the key risks?
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start text-xs">
                        Should I buy for long term?
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StockProductPageV2;

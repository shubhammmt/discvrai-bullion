import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Bell, Star, Calendar, BarChart3, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';

const FeedV3 = () => {
  const navigate = useNavigate();

  const watchlistItems = [
    { symbol: 'RELIANCE', price: '2,485.50', change: '+2.35%', trend: 'up' },
    { symbol: 'TCS', price: '3,245.80', change: '-0.85%', trend: 'down' },
    { symbol: 'INFY', price: '1,565.20', change: '+1.25%', trend: 'up' },
    { symbol: 'HDFC BANK', price: '1,485.90', change: '+0.65%', trend: 'up' }
  ];

  const newsItems = [
    {
      title: "RBI maintains repo rate at 6.5% for eighth consecutive time",
      time: "2 hours ago",
      source: "Economic Times",
      category: "Policy"
    },
    {
      title: "Tech stocks rally as global markets show positive sentiment",
      time: "4 hours ago", 
      source: "Business Standard",
      category: "Markets"
    },
    {
      title: "Q3 earnings season kicks off with banking sector in focus",
      time: "6 hours ago",
      source: "Mint",
      category: "Earnings"
    }
  ];

  const insights = [
    {
      title: "Your portfolio is outperforming Nifty 50 by 3.2%",
      description: "Strong performance driven by your tech holdings",
      type: "positive"
    },
    {
      title: "High volatility expected in banking sector",
      description: "Consider reviewing your banking exposure",
      type: "warning"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-purple-50 to-blue-50 dark:from-primary/5 dark:via-purple-950/20 dark:to-blue-950/20 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Your Financial <span className="text-primary">Discovery Hub</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Stay informed with personalized insights, market updates, and AI-powered analysis
            </p>
            
            {/* Quick Search */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search stocks, mutual funds, news..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-background/80 backdrop-blur focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Insights */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  AI Insights
                </CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card/50">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        insight.type === 'positive' ? 'bg-green-500' : 'bg-yellow-500'
                      }`} />
                      <div>
                        <h4 className="font-medium text-foreground">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Market News */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Latest Market News
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-1" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsItems.map((news, index) => (
                  <div key={index} className="p-4 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground mb-2">{news.title}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{news.source}</span>
                          <span>•</span>
                          <span>{news.time}</span>
                          <Badge variant="secondary" className="text-xs">{news.category}</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Watchlist */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Your Watchlist
                </CardTitle>
                <Button variant="outline" size="sm">Manage</Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {watchlistItems.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card/50">
                    <div>
                      <p className="font-medium text-foreground">{item.symbol}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price}</p>
                    </div>
                    <div className="text-right">
                      <div className={`flex items-center gap-1 text-sm ${
                        item.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {item.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {item.change}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/stocks')}
                >
                  <Search className="w-4 h-4 mr-2" />
                  Research Stocks
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/mutual-funds')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Explore Mutual Funds
                </Button>
                <Button 
                  className="w-full justify-start" 
                  variant="outline"
                  onClick={() => navigate('/portfolio')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Update Portfolio
                </Button>
              </CardContent>
            </Card>

            {/* Market Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Market Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">NIFTY 50</span>
                  <div className="text-right">
                    <p className="font-medium">21,456.30</p>
                    <p className="text-sm text-green-600">+0.85%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">SENSEX</span>
                  <div className="text-right">
                    <p className="font-medium">70,895.50</p>
                    <p className="text-sm text-green-600">+1.20%</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">BANK NIFTY</span>
                  <div className="text-right">
                    <p className="font-medium">45,235.80</p>
                    <p className="text-sm text-red-600">-0.45%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedV3;
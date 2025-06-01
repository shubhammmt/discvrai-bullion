
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Bell, 
  BookOpen, 
  Calendar, 
  Plus, 
  Settings, 
  TrendingUp, 
  AlertTriangle,
  Star,
  Clock
} from 'lucide-react';

const Organize = () => {
  const [activeWatchlist, setActiveWatchlist] = useState('main');

  const watchlists = [
    { id: 'main', name: 'Main Watchlist', count: 12, color: 'bg-blue-500' },
    { id: 'tech', name: 'Tech Stocks', count: 8, color: 'bg-green-500' },
    { id: 'crypto', name: 'Crypto Watch', count: 5, color: 'bg-orange-500' }
  ];

  const watchlistItems = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 162.80, change: 2.04, alert: 'Price target reached' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2845.20, change: -1.2, alert: null },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 243.84, change: 3.5, alert: 'Earnings tomorrow' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 378.85, change: 0.8, alert: null }
  ];

  const alerts = [
    { type: 'price', stock: 'AAPL', message: 'Price above ₹160', time: '2 hours ago', priority: 'high' },
    { type: 'news', stock: 'TSLA', message: 'Earnings announcement', time: '4 hours ago', priority: 'medium' },
    { type: 'technical', stock: 'GOOGL', message: 'RSI oversold', time: '1 day ago', priority: 'low' }
  ];

  const savedResearch = [
    { title: 'Tesla Q4 2024 Analysis', type: 'Stock Research', date: '2 days ago', tags: ['EV', 'Tech'] },
    { title: 'Indian Banking Sector Outlook', type: 'Sector Analysis', date: '1 week ago', tags: ['Banking', 'India'] },
    { title: 'Crypto Market Trends', type: 'Market Analysis', date: '3 days ago', tags: ['Crypto', 'DeFi'] }
  ];

  const upcomingEvents = [
    { date: 'Jan 30', event: 'Apple Earnings', type: 'earnings', stock: 'AAPL' },
    { date: 'Feb 2', event: 'Tesla Delivery Numbers', type: 'announcement', stock: 'TSLA' },
    { date: 'Feb 5', event: 'Microsoft Earnings', type: 'earnings', stock: 'MSFT' },
    { date: 'Feb 8', event: 'New IPO Launch', type: 'ipo', stock: 'NEW' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Organize</h1>
          <p className="text-gray-600">Manage your watchlists, alerts, and saved research</p>
        </div>

        <Tabs defaultValue="watchlists" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="watchlists">Watchlists</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
            <TabsTrigger value="research">Saved Research</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>

          {/* Watchlists Tab */}
          <TabsContent value="watchlists" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">My Watchlists</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Watchlist
              </Button>
            </div>

            <div className="grid lg:grid-cols-4 gap-6">
              {/* Watchlist Sidebar */}
              <div className="space-y-3">
                {watchlists.map((list) => (
                  <Card 
                    key={list.id} 
                    className={`cursor-pointer transition-colors ${activeWatchlist === list.id ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => setActiveWatchlist(list.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${list.color}`}></div>
                        <div className="flex-1">
                          <p className="font-medium">{list.name}</p>
                          <p className="text-sm text-gray-500">{list.count} items</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Watchlist Content */}
              <div className="lg:col-span-3">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>Main Watchlist</CardTitle>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {watchlistItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold">{item.symbol}</h3>
                              <span className="text-sm text-gray-600">{item.name}</span>
                              {item.alert && (
                                <Badge variant="secondary" className="text-xs">
                                  <Bell className="w-3 h-3 mr-1" />
                                  {item.alert}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">₹{item.price}</p>
                            <p className={`text-sm ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {item.change > 0 ? '+' : ''}{item.change}%
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Active Alerts</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                New Alert
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {alerts.map((alert, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge variant={alert.priority === 'high' ? 'destructive' : alert.priority === 'medium' ? 'default' : 'secondary'}>
                        {alert.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{alert.time}</span>
                    </div>
                    <h3 className="font-semibold mb-1">{alert.stock}</h3>
                    <p className="text-sm text-gray-600 mb-3">{alert.message}</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Dismiss</Button>
                      <Button size="sm">View</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Research Tab */}
          <TabsContent value="research" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Saved Research</h2>
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Research
              </Button>
            </div>

            <div className="space-y-4">
              {savedResearch.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.type}</p>
                        <div className="flex gap-2 mb-2">
                          {item.tags.map((tag, tagIndex) => (
                            <Badge key={tagIndex} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Star className="w-4 h-4" />
                        </Button>
                        <Button size="sm">Open</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Upcoming Events</h2>
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Full Calendar
              </Button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-bold text-blue-600">{event.date}</p>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.event}</h3>
                        <p className="text-sm text-gray-600">{event.stock}</p>
                      </div>
                      <Badge variant="outline">{event.type}</Badge>
                      <Button size="sm" variant="outline">
                        <Bell className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Organize;

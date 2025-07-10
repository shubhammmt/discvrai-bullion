import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Activity, Globe } from 'lucide-react';

const Market = () => {
  // Mock data for market overview
  const marketData = {
    sensex: { value: 73000, change: 450, changePercent: 0.62 },
    nifty: { value: 22100, change: 135, changePercent: 0.61 },
    bankNifty: { value: 48500, change: -280, changePercent: -0.57 },
    goldPrice: { value: 62500, change: 125, changePercent: 0.20 }
  };

  const topGainers = [
    { name: 'Reliance Industries', symbol: 'RELIANCE', price: 2450, change: 5.5, changePercent: 2.3 },
    { name: 'TCS', symbol: 'TCS', price: 3650, change: 85, changePercent: 2.4 },
    { name: 'HDFC Bank', symbol: 'HDFCBANK', price: 1580, change: 35, changePercent: 2.3 }
  ];

  const topLosers = [
    { name: 'Bajaj Finance', symbol: 'BAJFINANCE', price: 6750, change: -150, changePercent: -2.2 },
    { name: 'Asian Paints', symbol: 'ASIANPAINT', price: 3200, change: -80, changePercent: -2.4 },
    { name: 'Titan Company', symbol: 'TITAN', price: 3450, change: -75, changePercent: -2.1 }
  ];

  const marketNews = [
    'RBI keeps repo rate unchanged at 6.5% as expected',
    'FII outflows continue for third consecutive week',
    'IT sector shows strong earnings growth in Q3',
    'Banking stocks rally on improved NPA outlook'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg">
              <Globe className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Market Overview</h1>
              <p className="text-gray-600 dark:text-gray-300">Real-time market insights and analysis</p>
            </div>
          </div>
        </div>

        {/* Market Indices */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">SENSEX</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{marketData.sensex.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp size={14} />
                    <span className="text-sm font-medium">+{marketData.sensex.change} ({marketData.sensex.changePercent}%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">NIFTY 50</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{marketData.nifty.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp size={14} />
                    <span className="text-sm font-medium">+{marketData.nifty.change} ({marketData.nifty.changePercent}%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">BANK NIFTY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{marketData.bankNifty.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-red-600">
                    <TrendingDown size={14} />
                    <span className="text-sm font-medium">{marketData.bankNifty.change} ({marketData.bankNifty.changePercent}%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">GOLD (₹/10g)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{marketData.goldPrice.value.toLocaleString()}</p>
                  <div className="flex items-center gap-1 text-green-600">
                    <TrendingUp size={14} />
                    <span className="text-sm font-medium">+{marketData.goldPrice.change} ({marketData.goldPrice.changePercent}%)</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Movers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Gainers */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <TrendingUp size={20} />
                Top Gainers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topGainers.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{stock.name}</p>
                      <p className="text-sm text-gray-600">{stock.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{stock.price}</p>
                      <p className="text-sm text-green-600">+{stock.change} ({stock.changePercent}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Losers */}
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600">
                <TrendingDown size={20} />
                Top Losers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topLosers.map((stock, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">{stock.name}</p>
                      <p className="text-sm text-gray-600">{stock.symbol}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{stock.price}</p>
                      <p className="text-sm text-red-600">{stock.change} ({stock.changePercent}%)</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market News */}
        <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity size={20} />
              Market News
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketNews.map((news, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                  <p className="text-gray-900">{news}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Market;
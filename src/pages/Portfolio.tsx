
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3,
  RefreshCw,
  Download,
  Plus,
  Eye,
  AlertCircle
} from 'lucide-react';

const Portfolio = () => {
  const [selectedPortfolio, setSelectedPortfolio] = useState('main');

  const portfolios = [
    { id: 'main', name: 'Main Portfolio', value: 485000, change: 12.5, broker: 'Zerodha' },
    { id: 'trading', name: 'Trading Account', value: 125000, change: -2.8, broker: 'Upstox' },
    { id: 'longterm', name: 'Long Term', value: 785000, change: 18.2, broker: 'ICICI Direct' }
  ];

  const holdings = [
    { symbol: 'RELIANCE', name: 'Reliance Industries', quantity: 50, avgPrice: 2450, currentPrice: 2680, allocation: 15.2 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', quantity: 25, avgPrice: 3200, currentPrice: 3450, allocation: 12.8 },
    { symbol: 'HDFCBANK', name: 'HDFC Bank', quantity: 40, avgPrice: 1580, currentPrice: 1620, allocation: 9.5 },
    { symbol: 'INFY', name: 'Infosys', quantity: 60, avgPrice: 1420, currentPrice: 1380, allocation: 8.3 }
  ];

  const recentTransactions = [
    { date: '2024-01-28', type: 'BUY', symbol: 'AAPL', quantity: 10, price: 162.80, amount: 16280 },
    { date: '2024-01-25', type: 'SELL', symbol: 'GOOGL', quantity: 5, price: 2845.20, amount: 14226 },
    { date: '2024-01-22', type: 'BUY', symbol: 'TSLA', quantity: 15, price: 243.84, amount: 36576 }
  ];

  const aiInsights = [
    {
      type: 'rebalance',
      title: 'Portfolio Rebalancing Needed',
      description: 'Your tech allocation is 15% overweight. Consider reducing by ₹45,000.',
      severity: 'medium'
    },
    {
      type: 'opportunity',
      title: 'Undervalued Opportunity',
      description: 'Banking sector showing strong fundamentals at current levels.',
      severity: 'low'
    },
    {
      type: 'risk',
      title: 'Concentration Risk',
      description: 'Top 3 holdings represent 37% of portfolio. Consider diversification.',
      severity: 'high'
    }
  ];

  const calculatePnL = (holding: any) => {
    const invested = holding.quantity * holding.avgPrice;
    const current = holding.quantity * holding.currentPrice;
    const pnl = current - invested;
    const pnlPercent = (pnl / invested) * 100;
    return { pnl, pnlPercent };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio</h1>
            <p className="text-gray-600">Manage and analyze your investments</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              Import Portfolio
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Investment
            </Button>
          </div>
        </div>

        {/* Portfolio Overview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {portfolios.map((portfolio) => (
            <Card 
              key={portfolio.id}
              className={`cursor-pointer transition-colors ${selectedPortfolio === portfolio.id ? 'border-blue-500 bg-blue-50' : ''}`}
              onClick={() => setSelectedPortfolio(portfolio.id)}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{portfolio.name}</h3>
                    <p className="text-sm text-gray-500">{portfolio.broker}</p>
                  </div>
                  <Badge variant="outline">{portfolio.change > 0 ? 'Profit' : 'Loss'}</Badge>
                </div>
                <p className="text-2xl font-bold mb-2">₹{portfolio.value.toLocaleString()}</p>
                <div className={`flex items-center gap-1 ${portfolio.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {portfolio.change > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span className="text-sm font-medium">
                    {portfolio.change > 0 ? '+' : ''}{portfolio.change}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="holdings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="holdings">Holdings</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Holdings Tab */}
          <TabsContent value="holdings" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Current Holdings</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Stock</th>
                        <th className="p-4 font-medium">Quantity</th>
                        <th className="p-4 font-medium">Avg Price</th>
                        <th className="p-4 font-medium">Current Price</th>
                        <th className="p-4 font-medium">P&L</th>
                        <th className="p-4 font-medium">Allocation</th>
                        <th className="p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {holdings.map((holding, index) => {
                        const { pnl, pnlPercent } = calculatePnL(holding);
                        return (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-4">
                              <div>
                                <p className="font-semibold">{holding.symbol}</p>
                                <p className="text-sm text-gray-600">{holding.name}</p>
                              </div>
                            </td>
                            <td className="p-4">{holding.quantity}</td>
                            <td className="p-4">₹{holding.avgPrice}</td>
                            <td className="p-4">₹{holding.currentPrice}</td>
                            <td className="p-4">
                              <div className={pnl > 0 ? 'text-green-600' : 'text-red-600'}>
                                <p className="font-medium">
                                  {pnl > 0 ? '+' : ''}₹{Math.abs(pnl).toLocaleString()}
                                </p>
                                <p className="text-sm">
                                  ({pnl > 0 ? '+' : ''}{pnlPercent.toFixed(2)}%)
                                </p>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Progress value={holding.allocation} className="w-16" />
                                <span className="text-sm">{holding.allocation}%</span>
                              </div>
                            </td>
                            <td className="p-4">
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">Buy</Button>
                                <Button size="sm" variant="outline">Sell</Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">AI Portfolio Analysis</h2>
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh Analysis
              </Button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* AI Insights */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">AI Insights & Recommendations</h3>
                {aiInsights.map((insight, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className={`w-5 h-5 mt-0.5 ${
                          insight.severity === 'high' ? 'text-red-500' : 
                          insight.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                        }`} />
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{insight.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{insight.description}</p>
                          <div className="flex gap-2">
                            <Button size="sm">Apply</Button>
                            <Button size="sm" variant="outline">Learn More</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Portfolio Health Score */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Portfolio Health Score</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-green-600 mb-2">78/100</div>
                      <p className="text-gray-600">Good Portfolio Health</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Diversification</span>
                          <span>85%</span>
                        </div>
                        <Progress value={85} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Risk Management</span>
                          <span>72%</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Growth Potential</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Recent Transactions</h2>
              <Button variant="outline">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </Button>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th className="p-4 font-medium">Date</th>
                        <th className="p-4 font-medium">Type</th>
                        <th className="p-4 font-medium">Stock</th>
                        <th className="p-4 font-medium">Quantity</th>
                        <th className="p-4 font-medium">Price</th>
                        <th className="p-4 font-medium">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTransactions.map((transaction, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-4 text-sm">{transaction.date}</td>
                          <td className="p-4">
                            <Badge variant={transaction.type === 'BUY' ? 'default' : 'secondary'}>
                              {transaction.type}
                            </Badge>
                          </td>
                          <td className="p-4 font-medium">{transaction.symbol}</td>
                          <td className="p-4">{transaction.quantity}</td>
                          <td className="p-4">₹{transaction.price}</td>
                          <td className="p-4 font-medium">₹{transaction.amount.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Portfolio Performance</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">1M</Button>
                <Button variant="outline" size="sm">3M</Button>
                <Button size="sm">1Y</Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                  <p className="text-2xl font-bold">₹4,85,000</p>
                  <p className="text-sm text-gray-600">Total Value</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <p className="text-2xl font-bold text-green-600">+12.5%</p>
                  <p className="text-sm text-gray-600">Total Returns</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <BarChart3 className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                  <p className="text-2xl font-bold">₹54,000</p>
                  <p className="text-sm text-gray-600">Total P&L</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 text-center">
                  <PieChart className="w-8 h-8 mx-auto mb-2 text-orange-600" />
                  <p className="text-2xl font-bold">18.2%</p>
                  <p className="text-sm text-gray-600">XIRR</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;

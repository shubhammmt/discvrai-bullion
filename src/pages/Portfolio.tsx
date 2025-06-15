import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PieChart, 
  BarChart3, 
  Target,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Edit,
  Plus,
  Upload,
  RefreshCw
} from 'lucide-react';
import PortfolioChart from '@/components/PortfolioChart';
import StatsCards from '@/components/StatsCards';

const Portfolio = () => {
  const [activeView, setActiveView] = useState('overview');
  const navigate = useNavigate();

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

  const wealthOverview = {
    totalWealth: 1850000,
    liquidAssets: 485000,
    investments: 785000,
    insurance: 5000000,
    loans: -450000,
    netWorth: 1400000
  };

  const insuranceCoverage = [
    { type: 'Life Insurance', provider: 'LIC', coverage: 5000000, premium: 48000, renewalDate: '2024-08-15' },
    { type: 'Health Insurance', provider: 'Star Health', coverage: 1000000, premium: 18000, renewalDate: '2024-04-20' },
    { type: 'Motor Insurance', provider: 'HDFC ERGO', coverage: 500000, premium: 8500, renewalDate: '2024-12-10' }
  ];

  const creditProducts = [
    { type: 'Home Loan', bank: 'HDFC Bank', principal: 3200000, outstanding: 2100000, emi: 28500, nextDue: '2024-02-05' },
    { type: 'Credit Card', bank: 'ICICI Bank', limit: 250000, outstanding: 35000, minDue: 3500, nextDue: '2024-02-12' },
    { type: 'Personal Loan', bank: 'Axis Bank', principal: 500000, outstanding: 315000, emi: 12800, nextDue: '2024-02-08' }
  ];

  const upcomingExpenses = [
    { description: 'Home Loan EMI', amount: 28500, dueDate: '2024-02-05', category: 'loan' },
    { description: 'Life Insurance Premium', amount: 48000, dueDate: '2024-02-15', category: 'insurance' },
    { description: 'Credit Card Payment', amount: 35000, dueDate: '2024-02-12', category: 'credit' },
    { description: 'Vacation Fund Goal', amount: 50000, dueDate: '2024-03-01', category: 'goal' }
  ];

  const calculatePnL = (holding: any) => {
    const invested = holding.quantity * holding.avgPrice;
    const current = holding.quantity * holding.currentPrice;
    const pnl = current - invested;
    const pnlPercent = (pnl / invested) * 100;
    return { pnl, pnlPercent };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header with Portfolio Management CTAs */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Portfolio Dashboard</h1>
              <p className="text-gray-600">Track your investments and monitor performance</p>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline"
                onClick={() => navigate('/organize')}
                size="sm"
              >
                <Target size={16} className="mr-2" />
                Organize
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/portfolio-update')}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Upload size={16} className="mr-2" />
                Upload Data
              </Button>
              <Button 
                onClick={() => navigate('/portfolio-update')}
                className="bg-green-600 hover:bg-green-700"
              >
                <Edit size={16} className="mr-2" />
                Update Portfolio
              </Button>
            </div>
          </div>

          {/* Quick Action Cards for Portfolio Management */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-white/70 backdrop-blur-md border-white/20 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/portfolio-update?tab=upload')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Upload className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Quick Upload</h3>
                    <p className="text-sm text-gray-600">Import from Excel or photos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-md border-white/20 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/portfolio-update?tab=manual')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Plus className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Add Assets</h3>
                    <p className="text-sm text-gray-600">Manually add new holdings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/70 backdrop-blur-md border-white/20 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/portfolio-update?tab=overview')}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <RefreshCw className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Sync & Review</h3>
                    <p className="text-sm text-gray-600">Update existing holdings</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wealth Overview Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <p className="text-2xl font-bold text-blue-600">₹{(wealthOverview.totalWealth / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-600">Total Wealth</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <p className="text-2xl font-bold text-green-600">₹{(wealthOverview.insurance / 100000).toFixed(0)}L</p>
              <p className="text-sm text-gray-600">Insurance Coverage</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CreditCard className="w-8 h-8 mx-auto mb-2 text-red-600" />
              <p className="text-2xl font-bold text-red-600">₹{Math.abs(wealthOverview.loans / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-600">Outstanding Loans</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <p className="text-2xl font-bold text-purple-600">₹{(wealthOverview.netWorth / 100000).toFixed(1)}L</p>
              <p className="text-sm text-gray-600">Net Worth</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
            <TabsTrigger value="credit">Credit & Loans</TabsTrigger>
            <TabsTrigger value="goals">Financial Goals</TabsTrigger>
            <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Upcoming Expenses */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Upcoming Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {upcomingExpenses.map((expense, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{expense.description}</p>
                          <p className="text-xs text-gray-600">{expense.dueDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">₹{expense.amount.toLocaleString()}</p>
                          <Badge variant="outline" className="text-xs">
                            {expense.category}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Equity Investments</span>
                        <span>42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Fixed Deposits</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Mutual Funds</span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cash & Savings</span>
                        <span>10%</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Insurance Tab */}
          <TabsContent value="insurance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Insurance Portfolio</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Policy
              </Button>
            </div>

            <div className="grid gap-6">
              {insuranceCoverage.map((policy, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{policy.type}</h3>
                        <p className="text-gray-600 mb-4">{policy.provider}</p>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Coverage</span>
                            <p className="font-semibold">₹{(policy.coverage / 100000).toFixed(0)}L</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Annual Premium</span>
                            <p className="font-semibold">₹{policy.premium.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Renewal Date</span>
                            <p className="font-semibold">{policy.renewalDate}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Renew</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Credit & Loans Tab */}
          <TabsContent value="credit" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Credit & Loans</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Apply for Credit
              </Button>
            </div>

            <div className="grid gap-6">
              {creditProducts.map((product, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{product.type}</h3>
                        <p className="text-gray-600 mb-4">{product.bank}</p>
                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          {product.principal && (
                            <div>
                              <span className="text-gray-600">Principal</span>
                              <p className="font-semibold">₹{(product.principal / 100000).toFixed(1)}L</p>
                            </div>
                          )}
                          {product.limit && (
                            <div>
                              <span className="text-gray-600">Credit Limit</span>
                              <p className="font-semibold">₹{product.limit.toLocaleString()}</p>
                            </div>
                          )}
                          <div>
                            <span className="text-gray-600">Outstanding</span>
                            <p className="font-semibold text-red-600">₹{product.outstanding.toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">{product.emi ? 'EMI' : 'Min Due'}</span>
                            <p className="font-semibold">₹{(product.emi || product.minDue).toLocaleString()}</p>
                          </div>
                          <div>
                            <span className="text-gray-600">Next Due</span>
                            <p className="font-semibold">{product.nextDue}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Pay Now</Button>
                        <Button size="sm">View Details</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Financial Goals Tab */}
          <TabsContent value="goals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Financial Goals</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Set New Goal
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                    <div>
                      <h3 className="font-semibold">Vacation Fund</h3>
                      <p className="text-sm text-gray-600">Target: ₹2,00,000</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>₹1,50,000 / ₹2,00,000</span>
                    </div>
                    <Progress value={75} className="h-2" />
                    <p className="text-xs text-gray-600">Target date: Dec 2024</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Target className="w-8 h-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold">Emergency Fund</h3>
                      <p className="text-sm text-gray-600">Target: ₹5,00,000</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>₹3,20,000 / ₹5,00,000</span>
                    </div>
                    <Progress value={64} className="h-2" />
                    <p className="text-xs text-gray-600">Target date: Jun 2024</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Keep existing tabs (investments, analysis) with existing code */}
          <TabsContent value="investments" className="space-y-6">
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
        </Tabs>
      </div>
    </div>
  );
};

export default Portfolio;

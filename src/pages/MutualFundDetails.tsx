import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, PieChart, Users, Shield, DollarSign, Activity, Target, Building, BarChart3, Bookmark, Share2, Download, Calculator } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
import ReturnsCalculator from '@/components/ReturnsCalculator';

// Mock data based on the API response structure
const mockFundData = {
  basic_info: {
    scheme_name: "Aditya Birla SL Equity Hybrid '95 Fund (G)",
    scheme_short_name: "Aditya Birla SL Equity Hybrid '95 Fund (G)",
    fund_house: {
      amc_name: "Aditya Birla Sun Life AMC Ltd",
    },
    scheme_category: {
      main_category: "Aggressive Hybrid Fund",
      risk_level: "Very High"
    },
    launch_details: {
      fund_age_years: 30.4
    }
  },
  current_performance: {
    latest_nav: {
      price: 1511.25
    },
    returns: {
      ret_1month: 1.98,
      ret_3month: 10.30,
      ret_6month: -0.79,
      ret_1year: 5.57,
      ret_3year: 15.81,
      ret_5year: 18.73
    }
  },
  risk_analytics: {
    beta_3year: 0.76,
    alpha_3year: 1.92,
    sharpe_ratio_3year: 0.74,
    standard_deviation_3year: 2.97
  },
  fund_structure: {
    fund_managers: [
      {
        manager_name: "Chanchal Khandelwal"
      }
    ],
    expense_structure: {
      total_expense_ratio: 1.86
    },
    aum_details: {
      current_aum: 7464.54
    }
  },
  portfolio_composition: {
    asset_allocation: {
      equity: 79.34,
      debt: 19.90,
      cash_others: 0.76
    },
    sector_allocation: {
      sectors: {
        "Banks": 17.75,
        "IT-Software": 7.26,
        "Pharmaceuticals": 4.56,
        "Finance": 4.49,
        "Automobiles": 4.20,
        "Petroleum Products": 4.05,
        "Telecom": 3.06,
        "Consumer Durables": 2.87,
        "Construction": 2.62,
        "Retailing": 2.44
      }
    },
    company_holdings: {
      equity_holdings: [
        { company_name: "ICICI Bank Ltd", percentage_holding: 7.16, sector: "Banks" },
        { company_name: "HDFC Bank Ltd", percentage_holding: 6.02, sector: "Banks" },
        { company_name: "Reliance Industries Ltd", percentage_holding: 4.09, sector: "Refineries" },
        { company_name: "Infosys Ltd", percentage_holding: 3.33, sector: "IT - Software" },
        { company_name: "Bharti Airtel Ltd", percentage_holding: 3.12, sector: "Telecom" }
      ]
    }
  }
};

const MutualFundDetails = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const [activeTimeframe, setActiveTimeframe] = useState('3Y');

  // Prepare chart data
  const performanceData = [
    { period: '1M', return: mockFundData.current_performance.returns.ret_1month },
    { period: '3M', return: mockFundData.current_performance.returns.ret_3month },
    { period: '6M', return: mockFundData.current_performance.returns.ret_6month },
    { period: '1Y', return: mockFundData.current_performance.returns.ret_1year },
    { period: '3Y', return: mockFundData.current_performance.returns.ret_3year },
    { period: '5Y', return: mockFundData.current_performance.returns.ret_5year }
  ];

  const assetAllocationData = [
    { name: 'Equity', value: mockFundData.portfolio_composition.asset_allocation.equity, color: '#3b82f6' },
    { name: 'Debt', value: mockFundData.portfolio_composition.asset_allocation.debt, color: '#10b981' },
    { name: 'Cash & Others', value: mockFundData.portfolio_composition.asset_allocation.cash_others, color: '#f59e0b' }
  ];

  const sectorData = Object.entries(mockFundData.portfolio_composition.sector_allocation.sectors)
    .slice(0, 8)
    .map(([sector, allocation]) => ({
      sector,
      allocation: allocation as number
    }));

  const timeframes = ['1M', '6M', '1Y', '3Y', '5Y'];

  // Chart configs
  const performanceChartConfig = {
    return: {
      label: "Return (%)",
      color: "#3b82f6",
    },
  };

  const assetAllocationConfig = {
    equity: {
      label: "Equity",
      color: "#3b82f6",
    },
    debt: {
      label: "Debt", 
      color: "#10b981",
    },
    cash: {
      label: "Cash & Others",
      color: "#f59e0b",
    },
  };

  const sectorChartConfig = {
    allocation: {
      label: "Allocation (%)",
      color: "#10b981",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
        </div>

        {/* First Viewport - Primary Information Block */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Fund Basic Information */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {mockFundData.basic_info.scheme_short_name}
                </h1>
                <p className="text-lg text-gray-600 mb-3">
                  {mockFundData.basic_info.fund_house.amc_name}
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    {mockFundData.basic_info.scheme_category.main_category}
                  </Badge>
                  <Badge variant="secondary" className="bg-red-100 text-red-800">
                    {mockFundData.basic_info.scheme_category.risk_level} Risk
                  </Badge>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                    Direct Plan
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark size={16} />
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 size={16} />
                </Button>
              </div>
            </div>

            {/* NAV and Performance */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Latest NAV</div>
                    <div className="text-4xl font-bold text-gray-900">₹{mockFundData.current_performance.latest_nav.price}</div>
                    <div className="text-sm text-green-600 mt-1">+{mockFundData.current_performance.returns.ret_1month}% (1D)</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">3Y Annualized Returns</div>
                    <div className="text-4xl font-bold text-blue-600">{mockFundData.current_performance.returns.ret_3year}%</div>
                    <div className="text-sm text-gray-600 mt-1">Rank: 15/247 in category</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Returns Overview */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="grid grid-cols-5 gap-4">
                  {performanceData.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="text-xs text-gray-600 mb-1">{item.period}</div>
                      <div className={`font-bold ${item.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.return > 0 ? '+' : ''}{item.return.toFixed(1)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-4">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 space-y-4">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg">
                  Invest Now
                </Button>
                <Button variant="outline" className="w-full h-12">
                  Start SIP
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm">
                    Compare
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download size={16} className="mr-1" />
                    Factsheet
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min SIP</span>
                    <span className="font-semibold">₹500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Min Lumpsum</span>
                    <span className="font-semibold">₹5,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Exit Load</span>
                    <span className="font-semibold">1% (1Y)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Performance Chart with Time Selectors */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Performance Chart
              </CardTitle>
              <div className="flex gap-1">
                {timeframes.map((timeframe) => (
                  <Button
                    key={timeframe}
                    variant={activeTimeframe === timeframe ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveTimeframe(timeframe)}
                    className="h-8 px-3"
                  >
                    {timeframe}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={performanceChartConfig} className="h-80">
              <LineChart data={performanceData}>
                <XAxis 
                  dataKey="period" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="return" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Investment Calculator Widget */}
        <ReturnsCalculator
          fundName={mockFundData.basic_info.scheme_short_name}
          expectedReturn={mockFundData.current_performance.returns.ret_5year}
          benchmarkReturn={12}
        />

        {/* Fund Overview Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Asset Allocation */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-green-600" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={assetAllocationConfig} className="h-64">
                <RechartsPieChart>
                  <Pie
                    data={assetAllocationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    stroke="#ffffff"
                    strokeWidth={2}
                  >
                    {assetAllocationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </RechartsPieChart>
              </ChartContainer>
              <div className="flex justify-center gap-4 mt-4">
                {assetAllocationData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm">{item.name}: {item.value.toFixed(1)}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Key Fund Metrics */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                Key Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">₹{(mockFundData.fund_structure.aum_details.current_aum / 100).toFixed(0)}Cr</div>
                  <div className="text-sm text-gray-600">AUM</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{mockFundData.fund_structure.expense_structure.total_expense_ratio}%</div>
                  <div className="text-sm text-gray-600">Expense Ratio</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{mockFundData.risk_analytics.alpha_3year}</div>
                  <div className="text-sm text-gray-600">Alpha (3Y)</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{mockFundData.risk_analytics.beta_3year}</div>
                  <div className="text-sm text-gray-600">Beta (3Y)</div>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-gray-600" />
                  <div>
                    <div className="font-semibold">{mockFundData.fund_structure.fund_managers[0].manager_name}</div>
                    <div className="text-sm text-gray-600">Fund Manager</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Portfolio Holdings */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5 text-blue-600" />
              Top Holdings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Company</th>
                    <th className="text-left py-2">Sector</th>
                    <th className="text-right py-2">% Assets</th>
                  </tr>
                </thead>
                <tbody>
                  {mockFundData.portfolio_composition.company_holdings.equity_holdings.map((holding, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 font-medium">{holding.company_name}</td>
                      <td className="py-3 text-gray-600">{holding.sector}</td>
                      <td className="py-3 text-right font-semibold">{holding.percentage_holding.toFixed(2)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Sector Allocation */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-600" />
              Sector Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={sectorChartConfig} className="h-80">
              <BarChart data={sectorData} layout="horizontal">
                <XAxis type="number" />
                <YAxis type="category" dataKey="sector" width={100} fontSize={12} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="allocation" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Risk Analysis */}
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-red-600" />
              Risk Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold">Risk Metrics (3 Years)</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Standard Deviation</span>
                    <span className="font-semibold">{mockFundData.risk_analytics.standard_deviation_3year}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Sharpe Ratio</span>
                    <span className="font-semibold">{mockFundData.risk_analytics.sharpe_ratio_3year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Beta</span>
                    <span className="font-semibold">{mockFundData.risk_analytics.beta_3year}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Alpha</span>
                    <span className="font-semibold">{mockFundData.risk_analytics.alpha_3year}</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Risk Level</h4>
                <div className="text-center p-6 bg-red-50 rounded-lg">
                  <div className="text-3xl font-bold text-red-600 mb-2">
                    {mockFundData.basic_info.scheme_category.risk_level}
                  </div>
                  <div className="text-sm text-gray-600">Risk Rating</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Exit Load</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">1%</div>
              <div className="text-sm text-gray-600">If redeemed within 1 year</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Fund Age</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold mb-2">{mockFundData.basic_info.launch_details.fund_age_years.toFixed(0)} Years</div>
              <div className="text-sm text-gray-600">Since inception</div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Investment Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div>✓ SIP Available</div>
                <div>✓ STP Available</div>
                <div>✓ SWP Available</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Final CTA */}
        <div className="text-center py-8">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg h-auto">
            Start Investing Today
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            Start your investment journey with as low as ₹500 per month
          </p>
        </div>
      </div>
    </div>
  );
};

export default MutualFundDetails;

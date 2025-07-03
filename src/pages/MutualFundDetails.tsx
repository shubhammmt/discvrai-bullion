import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, TrendingUp, PieChart, Users, Shield, DollarSign, Activity, Target, Building, BarChart3 } from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState('overview');

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
      <div className="max-w-7xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Back
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {mockFundData.basic_info.scheme_short_name}
            </h1>
            <p className="text-gray-600">
              {mockFundData.basic_info.fund_house.amc_name}
            </p>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">₹{mockFundData.current_performance.latest_nav.price}</div>
              <div className="text-sm text-gray-600">Current NAV</div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-600" />
              <div className="text-2xl font-bold">{mockFundData.current_performance.returns.ret_1year.toFixed(2)}%</div>
              <div className="text-sm text-gray-600">1 Year Return</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Building className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              <div className="text-2xl font-bold">₹{(mockFundData.fund_structure.aum_details.current_aum / 100).toFixed(0)}Cr</div>
              <div className="text-sm text-gray-600">AUM</div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-md border-white/20">
            <CardContent className="p-4 text-center">
              <Shield className="w-8 h-8 mx-auto mb-2 text-orange-600" />
              <div className="text-2xl font-bold">{mockFundData.fund_structure.expense_structure.total_expense_ratio}%</div>
              <div className="text-sm text-gray-600">Expense Ratio</div>
            </CardContent>
          </Card>
        </div>

        {/* Fund Category and Risk Badge */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {mockFundData.basic_info.scheme_category.main_category}
          </Badge>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            {mockFundData.basic_info.scheme_category.risk_level} Risk
          </Badge>
          <Badge variant="secondary" className="bg-gray-100 text-gray-800">
            {mockFundData.basic_info.launch_details.fund_age_years.toFixed(0)} Years Old
          </Badge>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="risk">Risk & Analytics</TabsTrigger>
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
          </TabsList>

          {/* Overview Tab - Redesigned */}
          <TabsContent value="overview" className="space-y-6">
            {/* Performance Chart - Full Width */}
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                  Returns Across Periods
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={performanceChartConfig} className="h-80">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
                    <ChartTooltip 
                      content={<ChartTooltipContent />}
                      cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                    />
                    <Bar 
                      dataKey="return" 
                      fill="#3b82f6" 
                      radius={[6, 6, 0, 0]}
                      stroke="#2563eb"
                      strokeWidth={1}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Asset Allocation and Key Stats */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Asset Allocation - Larger */}
              <Card className="lg:col-span-2 bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <PieChart className="w-6 h-6 text-green-600" />
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
                        innerRadius={70}
                        outerRadius={120}
                        dataKey="value"
                        stroke="#ffffff"
                        strokeWidth={2}
                      >
                        {assetAllocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={<ChartTooltipContent />}
                      />
                    </RechartsPieChart>
                  </ChartContainer>
                  <div className="flex justify-center gap-6 mt-4">
                    {assetAllocationData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm font-medium">{item.name}: {item.value.toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-purple-600" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                    <span className="text-sm font-medium">3Y Return</span>
                    <span className="font-bold text-blue-600">{mockFundData.current_performance.returns.ret_3year.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                    <span className="text-sm font-medium">5Y Return</span>
                    <span className="font-bold text-green-600">{mockFundData.current_performance.returns.ret_5year.toFixed(2)}%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                    <span className="text-sm font-medium">Beta</span>
                    <span className="font-bold text-purple-600">{mockFundData.risk_analytics.beta_3year}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                    <span className="text-sm font-medium">Alpha</span>
                    <span className="font-bold text-orange-600">{mockFundData.risk_analytics.alpha_3year}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-white/70 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle>Detailed Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold mb-4">Returns Comparison</h4>
                    <div className="space-y-3">
                      {performanceData.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium">{item.period}</span>
                          <span className={`font-bold ${item.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {item.return > 0 ? '+' : ''}{item.return.toFixed(2)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-4">Risk Metrics</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Alpha (3Y)</span>
                        <span className="font-bold text-blue-600">{mockFundData.risk_analytics.alpha_3year}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Beta (3Y)</span>
                        <span className="font-bold text-purple-600">{mockFundData.risk_analytics.beta_3year}</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span>Sharpe Ratio</span>
                        <span className="font-bold text-green-600">{mockFundData.risk_analytics.sharpe_ratio_3year}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Top Holdings */}
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-blue-600" />
                    Top Holdings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockFundData.portfolio_composition.company_holdings.equity_holdings.map((holding, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium text-sm">{holding.company_name}</div>
                          <div className="text-xs text-gray-600">{holding.sector}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-blue-600">{holding.percentage_holding.toFixed(2)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Sector Allocation */}
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    Sector Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={sectorChartConfig} className="h-64">
                    <BarChart data={sectorData} layout="horizontal">
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="sector" width={80} fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="allocation" fill="#10b981" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Risk Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Standard Deviation</span>
                      <span className="font-semibold">{mockFundData.risk_analytics.standard_deviation_3year}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Beta</span>
                      <span className="font-semibold">{mockFundData.risk_analytics.beta_3year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Alpha</span>
                      <span className="font-semibold">{mockFundData.risk_analytics.alpha_3year}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Sharpe Ratio</span>
                      <span className="font-semibold">{mockFundData.risk_analytics.sharpe_ratio_3year}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-md border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Fund Manager
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-lg">
                        {mockFundData.fund_structure.fund_managers[0].manager_name}
                      </h4>
                      <p className="text-gray-600">Fund Manager</p>
                    </div>
                    <div className="pt-4 border-t">
                      <h5 className="font-medium mb-2">Fund Details</h5>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Expense Ratio</span>
                          <span>{mockFundData.fund_structure.expense_structure.total_expense_ratio}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Fund Age</span>
                          <span>{mockFundData.basic_info.launch_details.fund_age_years.toFixed(0)} years</span>
                        </div>
                        <div className="flex justify-between">
                          <span>AUM</span>
                          <span>₹{(mockFundData.fund_structure.aum_details.current_aum / 100).toFixed(0)} Cr</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Calculator Tab */}
          <TabsContent value="calculator" className="space-y-6">
            <ReturnsCalculator
              fundName={mockFundData.basic_info.scheme_short_name}
              expectedReturn={mockFundData.current_performance.returns.ret_5year}
              benchmarkReturn={12}
            />
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center pt-6">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
            Invest Now
          </Button>
          <Button variant="outline" className="px-8 py-2">
            Add to Watchlist
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MutualFundDetails;

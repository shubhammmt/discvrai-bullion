import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download, 
  Settings,
  Target,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  PieChart,
  BarChart3,
  Activity,
  Shield,
  Brain,
  Star,
  Users,
  Calendar,
  Zap,
  Filter,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import AIInsight from '@/components/AIInsight';
import FundVsCategoryComparison from '@/components/FundVsCategoryComparison';
import PeerComparison from '@/components/PeerComparison';

// Mock data based on mutual fund portfolio research
const mutualFundsData = {
  portfolio: {
    totalValue: 850000,
    totalInvestment: 720000,
    totalGains: 130000,
    totalGainsPercentage: 18.1,
    xirr: 16.8,
    monthlyChange: 15000,
    yearlyGrowth: 22.3
  },
  composition: {
    equity: { value: 510000, percentage: 60, funds: 8 },
    debt: { value: 255000, percentage: 30, funds: 4 },
    hybrid: { value: 85000, percentage: 10, funds: 2 }
  },
  holdings: [
    {
      id: 1,
      name: "HDFC Equity Fund - Direct Growth",
      category: "Large Cap",
      nav: 754.32,
      currentValue: 185000,
      investment: 150000,
      gains: 35000,
      gainsPercentage: 23.3,
      units: 245.12,
      expenseRatio: 1.42,
      returns: { '1Y': 24.5, '3Y': 18.2, '5Y': 15.8 },
      riskRating: "Moderate",
      sharpeRatio: 0.85,
      alpha: 3.2,
      beta: 1.05,
      volatility: 16.2,
      aum: 45600,
      insights: [
        { type: 'warning', message: 'Underperforming category average by 2.1% in 1Y', priority: 'high' },
        { type: 'info', message: 'Strong fund house with good track record', priority: 'medium' },
        { type: 'success', message: 'Low expense ratio compared to peers', priority: 'low' }
      ],
      recommendations: [
        { action: 'Review Performance', description: 'Consider switching to better performing large cap fund', priority: 'high' },
        { action: 'Hold', description: 'Monitor for next 2 quarters before making decision', priority: 'medium' }
      ]
    },
    {
      id: 2,
      name: "SBI Small Cap Fund - Direct Growth",
      category: "Small Cap",
      nav: 142.85,
      currentValue: 165000,
      investment: 120000,
      gains: 45000,
      gainsPercentage: 37.5,
      units: 1155.32,
      expenseRatio: 1.85,
      returns: { '1Y': 42.1, '3Y': 28.5, '5Y': 22.4 },
      riskRating: "High",
      sharpeRatio: 0.72,
      alpha: 8.5,
      beta: 1.28,
      volatility: 24.8,
      aum: 12800,
      insights: [
        { type: 'success', message: 'Excellent 1Y returns outperforming category by 8.2%', priority: 'high' },
        { type: 'warning', message: 'High volatility requires close monitoring', priority: 'medium' },
        { type: 'info', message: 'Good stock picking ability by fund manager', priority: 'medium' }
      ],
      recommendations: [
        { action: 'Partial Booking', description: 'Consider booking partial profits due to high gains', priority: 'medium' },
        { action: 'Monitor Closely', description: 'Watch for market correction signals', priority: 'high' }
      ]
    },
    {
      id: 3,
      name: "ICICI Prudential Debt Fund - Direct Growth",
      category: "Corporate Bond",
      nav: 124.76,
      currentValue: 155000,
      investment: 150000,
      gains: 5000,
      gainsPercentage: 3.3,
      units: 1242.45,
      expenseRatio: 0.85,
      returns: { '1Y': 6.8, '3Y': 7.2, '5Y': 8.1 },
      riskRating: "Low",
      sharpeRatio: 1.15,
      alpha: 1.2,
      beta: 0.15,
      volatility: 3.8,
      aum: 8900,
      insights: [
        { type: 'success', message: 'Stable returns with low volatility', priority: 'medium' },
        { type: 'success', message: 'Excellent credit quality portfolio', priority: 'medium' },
        { type: 'info', message: 'Good option for debt allocation', priority: 'low' }
      ],
      recommendations: [
        { action: 'Hold', description: 'Maintain for portfolio stability', priority: 'low' },
        { action: 'Increase SIP', description: 'Consider increasing allocation in rising rate scenario', priority: 'medium' }
      ]
    },
    {
      id: 4,
      name: "Mirae Asset Emerging Bluechip - Direct Growth",
      category: "Large & Mid Cap",
      nav: 89.45,
      currentValue: 125000,
      investment: 100000,
      gains: 25000,
      gainsPercentage: 25.0,
      units: 1397.54,
      expenseRatio: 1.68,
      returns: { '1Y': 28.2, '3Y': 21.4, '5Y': 18.9 },
      riskRating: "Moderate High",
      sharpeRatio: 0.92,
      alpha: 4.8,
      beta: 1.12,
      volatility: 18.5,
      aum: 23400,
      insights: [
        { type: 'success', message: 'Consistent outperformance across time periods', priority: 'high' },
        { type: 'success', message: 'Strong alpha generation capability', priority: 'high' },
        { type: 'info', message: 'Good blend of large and mid cap exposure', priority: 'medium' }
      ],
      recommendations: [
        { action: 'Continue SIP', description: 'Excellent fund for long-term wealth creation', priority: 'high' },
        { action: 'Increase Allocation', description: 'Consider increasing SIP amount', priority: 'medium' }
      ]
    },
    {
      id: 5,
      name: "Axis Bluechip Fund - Direct Growth",
      category: "Large Cap",
      nav: 52.34,
      currentValue: 110000,
      investment: 100000,
      gains: 10000,
      gainsPercentage: 10.0,
      units: 2102.15,
      expenseRatio: 1.58,
      returns: { '1Y': 18.5, '3Y': 14.2, '5Y': 12.8 },
      riskRating: "Moderate",
      sharpeRatio: 0.68,
      alpha: 2.1,
      beta: 0.98,
      volatility: 15.2,
      aum: 34200,
      insights: [
        { type: 'warning', message: 'Below average returns compared to category', priority: 'medium' },
        { type: 'info', message: 'Conservative large cap approach', priority: 'low' },
        { type: 'success', message: 'Low volatility provides stability', priority: 'medium' }
      ],
      recommendations: [
        { action: 'Review', description: 'Consider switching to higher performing large cap fund', priority: 'medium' },
        { action: 'Reduce Allocation', description: 'Gradually reduce exposure', priority: 'low' }
      ]
    },
    {
      id: 6,
      name: "Parag Parikh Flexi Cap - Direct Growth",
      category: "Flexi Cap",
      nav: 78.92,
      currentValue: 110000,
      investment: 100000,
      gains: 10000,
      gainsPercentage: 10.0,
      units: 1393.24,
      expenseRatio: 1.25,
      returns: { '1Y': 15.8, '3Y': 19.2, '5Y': 16.5 },
      riskRating: "Moderate High",
      sharpeRatio: 0.88,
      alpha: 5.2,
      beta: 0.92,
      volatility: 17.8,
      aum: 18900,
      insights: [
        { type: 'success', message: 'International diversification adds value', priority: 'high' },
        { type: 'success', message: 'Strong research-driven investment approach', priority: 'medium' },
        { type: 'info', message: 'Good for portfolio diversification', priority: 'medium' }
      ],
      recommendations: [
        { action: 'Hold', description: 'Good long-term wealth creation fund', priority: 'medium' },
        { action: 'Patient Approach', description: 'Value investing style may take time to deliver', priority: 'low' }
      ]
    }
  ],
  insights: [
    { 
      type: 'success', 
      message: 'Your portfolio is well-diversified across market caps with 60% equity allocation suitable for your age.', 
      priority: 'high',
      category: 'allocation'
    },
    { 
      type: 'warning', 
      message: 'HDFC Equity Fund has underperformed category average by 2.1% in last 1 year. Consider reviewing.', 
      priority: 'high',
      category: 'performance'
    },
    { 
      type: 'info', 
      message: 'SBI Small Cap Fund shows high volatility (24.8%). Monitor closely given current market conditions.', 
      priority: 'medium',
      category: 'risk'
    },
    { 
      type: 'success', 
      message: 'Your average expense ratio (1.44%) is below industry average. Good cost efficiency.', 
      priority: 'low',
      category: 'cost'
    }
  ],
  recommendations: [
    {
      type: 'rebalance',
      title: 'Rebalance Portfolio',
      description: 'Consider reducing small-cap exposure from current 19% to target 15%',
      priority: 'medium',
      impact: 'risk_reduction'
    },
    {
      type: 'switch',
      title: 'Fund Switch Opportunity',
      description: 'Switch from HDFC Equity to Axis Midcap Fund for better alpha generation',
      priority: 'high',
      impact: 'performance_improvement'
    },
    {
      type: 'sip_increase',
      title: 'SIP Top-up',
      description: 'Increase SIP amount by ₹5,000 to reach your ₹25L goal faster',
      priority: 'medium',
      impact: 'goal_acceleration'
    }
  ],
  performance: {
    timeline: [
      { month: 'Jan', value: 680000, benchmark: 675000 },
      { month: 'Feb', value: 705000, benchmark: 690000 },
      { month: 'Mar', value: 720000, benchmark: 710000 },
      { month: 'Apr', value: 750000, benchmark: 735000 },
      { month: 'May', value: 780000, benchmark: 760000 },
      { month: 'Jun', value: 810000, benchmark: 785000 },
      { month: 'Jul', value: 835000, benchmark: 800000 },
      { month: 'Aug', value: 850000, benchmark: 815000 }
    ]
  },
  analytics: {
    sharpeRatio: 0.84,
    alpha: 3.8,
    beta: 1.05,
    maxDrawdown: 12.8,
    volatility: 16.5,
    informationRatio: 0.62,
    treynorRatio: 15.2
  }
};

const MutualFundsHome = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    analytics: false,
    recommendations: false
  });

  const toggleSection = (section: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getChangeColor = (value: number) => value >= 0 ? 'text-green-600' : 'text-red-600';
  const getChangeIcon = (value: number) => value >= 0 ? TrendingUp : TrendingDown;

  // Portfolio allocation data for pie chart
  const allocationData = [
    { name: 'Large Cap', value: mutualFundsData.composition.equity.value * 0.6, color: '#3B82F6' },
    { name: 'Mid Cap', value: mutualFundsData.composition.equity.value * 0.25, color: '#8B5CF6' },
    { name: 'Small Cap', value: mutualFundsData.composition.equity.value * 0.15, color: '#F59E0B' },
    { name: 'Debt', value: mutualFundsData.composition.debt.value, color: '#10B981' },
    { name: 'Hybrid', value: mutualFundsData.composition.hybrid.value, color: '#6B7280' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Mutual Funds Portfolio</h1>
            <p className="text-sm text-muted-foreground">
              {mutualFundsData.holdings.length} funds • {formatCurrency(mutualFundsData.portfolio.totalValue)} total value
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden md:inline ml-2">
                {showAdvanced ? 'Simple' : 'Advanced'}
              </span>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Export</span>
            </Button>
            <Button size="sm" onClick={() => navigate('/mutual-fund-research')}>
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Add Fund</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        
        {/* Portfolio Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm opacity-90">Total Portfolio Value</h3>
                  <p className="text-3xl font-bold">{formatCurrency(mutualFundsData.portfolio.totalValue)}</p>
                </div>
                <PieChart className="w-8 h-8 opacity-80" />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>+{formatCurrency(mutualFundsData.portfolio.totalGains)} ({mutualFundsData.portfolio.totalGainsPercentage}%)</span>
                </div>
                <div>
                  <span>XIRR: {mutualFundsData.portfolio.xirr}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-muted-foreground">Monthly Change</h3>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                +{formatCurrency(mutualFundsData.portfolio.monthlyChange)}
              </p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-muted-foreground">Yearly Growth</h3>
                <Star className="w-4 h-4 text-yellow-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {mutualFundsData.portfolio.yearlyGrowth}%
              </p>
              <p className="text-sm text-muted-foreground">This year</p>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights */}
        <AIInsight
          sentiment="bullish"
          confidence={87}
          summary="Your mutual fund portfolio shows strong diversification and consistent performance. The 16.8% XIRR outperforms market benchmarks, with well-balanced allocation across market caps."
          keyPoints={[
            "Portfolio beta of 1.05 indicates moderate risk aligned with market movements",
            "Sharpe ratio of 0.84 demonstrates good risk-adjusted returns",
            "Average expense ratio of 1.44% is competitive within industry standards",
            "Small-cap exposure provides growth potential but requires monitoring"
          ]}
          recommendation="Continue current strategy with minor rebalancing. Consider increasing SIP amounts in top-performing funds and review underperforming holdings."
        />

        {/* Portfolio Composition and Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Asset Allocation */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-blue-600" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Allocation Breakdown */}
                <div className="space-y-3">
                  {Object.entries(mutualFundsData.composition).map(([key, data]) => (
                    <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${
                          key === 'equity' ? 'bg-blue-600' : 
                          key === 'debt' ? 'bg-green-600' : 'bg-purple-600'
                        }`} />
                        <span className="capitalize font-medium">{key}</span>
                        <Badge variant="outline" className="text-xs">
                          {data.funds} funds
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{formatCurrency(data.value)}</p>
                        <p className="text-sm text-muted-foreground">{data.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Mini Pie Chart */}
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Chart */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-green-600" />
                  Portfolio Performance
                </CardTitle>
                <div className="flex gap-1">
                  {['1Y', '3Y', '5Y'].map((period) => (
                    <Button
                      key={period}
                      variant={selectedPeriod === period ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setSelectedPeriod(period)}
                      className="text-xs px-2 py-1"
                    >
                      {period}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mutualFundsData.performance.timeline}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      name="Portfolio"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Benchmark"
                      strokeDasharray="5 5"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">XIRR</p>
                  <p className="text-lg font-bold text-green-600">{mutualFundsData.portfolio.xirr}%</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                  <p className="text-lg font-bold">{mutualFundsData.analytics.sharpeRatio}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Alpha</p>
                  <p className="text-lg font-bold text-blue-600">{mutualFundsData.analytics.alpha}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Holdings Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Your Holdings ({mutualFundsData.holdings.length} funds)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 font-semibold">Fund Name</th>
                    <th className="text-right py-3 px-2 font-semibold">Current Value</th>
                    <th className="text-right py-3 px-2 font-semibold">Gains</th>
                    <th className="text-right py-3 px-2 font-semibold">1Y Return</th>
                    <th className="text-center py-3 px-2 font-semibold">Risk</th>
                    <th className="text-right py-3 px-2 font-semibold">Expense Ratio</th>
                  </tr>
                </thead>
                <tbody>
                  {mutualFundsData.holdings.map((fund) => (
                    <HoverCard key={fund.id}>
                      <HoverCardTrigger asChild>
                        <tr className="border-b hover:bg-muted/50 cursor-pointer">
                          <td className="py-4 px-2">
                            <div>
                              <p className="font-medium text-sm">{fund.name}</p>
                              <p className="text-xs text-muted-foreground">{fund.category}</p>
                            </div>
                          </td>
                          <td className="text-right py-4 px-2">
                            <p className="font-semibold">{formatCurrency(fund.currentValue)}</p>
                            <p className="text-xs text-muted-foreground">{fund.units.toFixed(2)} units</p>
                          </td>
                          <td className="text-right py-4 px-2">
                            <p className={`font-semibold ${getChangeColor(fund.gains)}`}>
                              {formatCurrency(fund.gains)}
                            </p>
                            <p className={`text-xs ${getChangeColor(fund.gains)}`}>
                              {fund.gainsPercentage > 0 ? '+' : ''}{fund.gainsPercentage}%
                            </p>
                          </td>
                          <td className="text-right py-4 px-2">
                            <p className={`font-semibold ${getChangeColor(fund.returns['1Y'])}`}>
                              {fund.returns['1Y']}%
                            </p>
                          </td>
                          <td className="text-center py-4 px-2">
                            <Badge 
                              variant={
                                fund.riskRating === 'Low' ? 'default' :
                                fund.riskRating === 'Moderate' ? 'secondary' : 'destructive'
                              }
                              className="text-xs"
                            >
                              {fund.riskRating}
                            </Badge>
                          </td>
                          <td className="text-right py-4 px-2">
                            <p className="font-medium">{fund.expenseRatio}%</p>
                          </td>
                        </tr>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-64 p-3 max-h-96 overflow-y-auto" side="left" align="center" sideOffset={10} avoidCollisions={true}>
                        <div className="space-y-3">
                          {/* Fund Header */}
                          <div className="border-b pb-2">
                            <h3 className="font-semibold text-base">{fund.name}</h3>
                            <p className="text-sm text-muted-foreground">{fund.category} • AUM: ₹{fund.aum}Cr</p>
                          </div>

                          {/* Key Metrics Grid */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="text-center p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
                              <p className="text-lg font-bold text-blue-600">{fund.sharpeRatio}</p>
                              <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-green-50 dark:bg-green-950">
                              <p className="text-lg font-bold text-green-600">{fund.alpha}%</p>
                              <p className="text-xs text-muted-foreground">Alpha</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-purple-50 dark:bg-purple-950">
                              <p className="text-lg font-bold text-purple-600">{fund.beta}</p>
                              <p className="text-xs text-muted-foreground">Beta</p>
                            </div>
                          </div>

                          {/* Historical Returns */}
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Historical Returns</h4>
                            <div className="grid grid-cols-3 gap-2">
                              <div className="text-center p-2 rounded bg-muted/50">
                                <p className="font-semibold text-green-600">{fund.returns['1Y']}%</p>
                                <p className="text-xs text-muted-foreground">1Y</p>
                              </div>
                              <div className="text-center p-2 rounded bg-muted/50">
                                <p className="font-semibold text-green-600">{fund.returns['3Y']}%</p>
                                <p className="text-xs text-muted-foreground">3Y</p>
                              </div>
                              <div className="text-center p-2 rounded bg-muted/50">
                                <p className="font-semibold text-green-600">{fund.returns['5Y']}%</p>
                                <p className="text-xs text-muted-foreground">5Y</p>
                              </div>
                            </div>
                          </div>

                          {/* Key Insights */}
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Key Insights</h4>
                            <div className="space-y-1.5">
                              {fund.insights?.slice(0, 3).map((insight, idx) => (
                                <div 
                                  key={idx}
                                  className={`p-2 rounded text-xs border-l-2 ${
                                    insight.type === 'success' ? 'bg-green-50 dark:bg-green-950 border-green-500' :
                                    insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500' :
                                    'bg-blue-50 dark:bg-blue-950 border-blue-500'
                                  }`}
                                >
                                  <div className="flex items-start gap-1.5">
                                    {insight.type === 'success' && <Star className="w-3 h-3 text-green-600 mt-0.5 flex-shrink-0" />}
                                    {insight.type === 'warning' && <AlertCircle className="w-3 h-3 text-yellow-600 mt-0.5 flex-shrink-0" />}
                                    {insight.type === 'info' && <Activity className="w-3 h-3 text-blue-600 mt-0.5 flex-shrink-0" />}
                                    <p className="flex-1 leading-relaxed">{insight.message}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recommendations */}
                          <div>
                            <h4 className="font-medium mb-2 text-sm">Recommendations</h4>
                            <div className="space-y-1.5">
                              {fund.recommendations?.slice(0, 2).map((rec, idx) => (
                                <div key={idx} className="p-2 rounded bg-muted/30 border border-muted">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="font-medium text-xs">{rec.action}</p>
                                    <Badge 
                                      variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                                      className="text-xs px-1 py-0"
                                    >
                                      {rec.priority}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{rec.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="pt-2 border-t">
                            <Button 
                              size="sm" 
                              className="w-full text-xs"
                              onClick={() => navigate(`/mutual-fund-details/${fund.id}`)}
                            >
                              View Detailed Analysis
                            </Button>
                          </div>
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* AI Quick Analysis */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI Quick Analysis
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('analytics')}
                className="text-muted-foreground hover:text-foreground"
              >
                {collapsedSections.analytics ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                <span className="ml-1 text-xs">
                  {collapsedSections.analytics ? 'Expand' : 'Collapse'}
                </span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            
            {/* Analysis Cards Grid - Always visible */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Quality Score */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
                    <Star className="w-4 h-4 text-green-600" />
                  </div>
                  <Badge variant="outline" className="text-xs border-green-200 text-green-700 dark:border-green-800 dark:text-green-300">
                    Excellent
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">8.7/10</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Portfolio Quality</p>
                </div>
              </div>

              {/* Growth Potential */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <Badge variant="outline" className="text-xs border-blue-200 text-blue-700 dark:border-blue-800 dark:text-blue-300">
                    High
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">16.8%</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Expected CAGR</p>
                </div>
              </div>

              {/* Technical Score */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950 dark:to-violet-950 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900">
                    <BarChart3 className="w-4 h-4 text-purple-600" />
                  </div>
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700 dark:border-purple-800 dark:text-purple-300">
                    Good
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">0.84</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">Sharpe Ratio</p>
                </div>
              </div>

              {/* Risk Assessment */}
              <div className="p-4 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 dark:border-orange-800 dark:text-orange-300">
                    Moderate
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">1.05</p>
                  <p className="text-sm text-orange-600 dark:text-orange-400">Portfolio Beta</p>
                </div>
              </div>
            </div>

            {/* Detailed Analysis - Only shown when expanded */}
            {!collapsedSections.analytics && (
              <>
                {/* Key Insights */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">Key Insights</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {mutualFundsData.insights.map((insight, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded-lg border-l-4 ${
                          insight.type === 'success' ? 'bg-green-50 dark:bg-green-950 border-green-500' :
                          insight.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-950 border-yellow-500' :
                          'bg-blue-50 dark:bg-blue-950 border-blue-500'
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <div className={`p-1 rounded-full ${
                            insight.type === 'success' ? 'bg-green-100 dark:bg-green-900' :
                            insight.type === 'warning' ? 'bg-yellow-100 dark:bg-yellow-900' :
                            'bg-blue-100 dark:bg-blue-900'
                          }`}>
                            {insight.type === 'success' && <Star className="w-3 h-3 text-green-600" />}
                            {insight.type === 'warning' && <AlertCircle className="w-3 h-3 text-yellow-600" />}
                            {insight.type === 'info' && <Activity className="w-3 h-3 text-blue-600" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{insight.message}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {insight.category}
                              </Badge>
                              <Badge 
                                variant="outline" 
                                className={`text-xs ${
                                  insight.priority === 'high' ? 'border-red-300 text-red-700' :
                                  insight.priority === 'medium' ? 'border-yellow-300 text-yellow-700' :
                                  'border-gray-300 text-gray-700'
                                }`}
                              >
                                {insight.priority} priority
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{mutualFundsData.analytics.alpha}%</p>
                    <p className="text-xs text-muted-foreground">Alpha</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{mutualFundsData.analytics.volatility}%</p>
                    <p className="text-xs text-muted-foreground">Volatility</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{mutualFundsData.analytics.maxDrawdown}%</p>
                    <p className="text-xs text-muted-foreground">Max Drawdown</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{mutualFundsData.analytics.informationRatio}</p>
                    <p className="text-xs text-muted-foreground">Info Ratio</p>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Insights & Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Recommendations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mutualFundsData.recommendations.map((rec, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50 border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{rec.title}</h4>
                      <Badge 
                        variant={rec.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {rec.impact.replace('_', ' ')}
                      </Badge>
                      <Button size="sm" variant="outline">
                        Take Action
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics */}
        {showAdvanced && (
          <Card>
            <CardHeader 
              className="cursor-pointer" 
              onClick={() => toggleSection('analytics')}
            >
              <div className="flex items-center justify-between">
                <CardTitle>Advanced Analytics</CardTitle>
                {React.createElement(collapsedSections.analytics ? ChevronDown : ChevronUp, { 
                  className: "w-4 h-4" 
                })}
              </div>
            </CardHeader>
            {!collapsedSections.analytics && (
              <CardContent>
                <Tabs defaultValue="risk" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="allocation">Allocation Analysis</TabsTrigger>
                    <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="risk" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-blue-600">{mutualFundsData.analytics.beta}</p>
                        <p className="text-sm text-muted-foreground">Portfolio Beta</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-red-600">{mutualFundsData.analytics.maxDrawdown}%</p>
                        <p className="text-sm text-muted-foreground">Max Drawdown</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-yellow-600">{mutualFundsData.analytics.volatility}%</p>
                        <p className="text-sm text-muted-foreground">Volatility</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-green-600">{mutualFundsData.analytics.sharpeRatio}</p>
                        <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-green-600">{mutualFundsData.analytics.alpha}%</p>
                        <p className="text-sm text-muted-foreground">Alpha</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-blue-600">{mutualFundsData.analytics.informationRatio}</p>
                        <p className="text-sm text-muted-foreground">Information Ratio</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-purple-600">{mutualFundsData.analytics.treynorRatio}</p>
                        <p className="text-sm text-muted-foreground">Treynor Ratio</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="allocation" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Current Allocation</h4>
                        {allocationData.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/50">
                            <span className="text-sm">{item.name}</span>
                            <span className="font-medium">{((item.value / mutualFundsData.portfolio.totalValue) * 100).toFixed(1)}%</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Recommended Allocation</h4>
                        <div className="text-sm text-muted-foreground">Based on your risk profile</div>
                        <div className="flex items-center justify-between p-2 rounded bg-green-50 dark:bg-green-950">
                          <span className="text-sm">Large Cap</span>
                          <span className="font-medium text-green-600">40%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-blue-50 dark:bg-blue-950">
                          <span className="text-sm">Mid Cap</span>
                          <span className="font-medium text-blue-600">20%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-yellow-50 dark:bg-yellow-950">
                          <span className="text-sm">Small Cap</span>
                          <span className="font-medium text-yellow-600">10%</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded bg-purple-50 dark:bg-purple-950">
                          <span className="text-sm">Debt</span>
                          <span className="font-medium text-purple-600">30%</span>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="cost" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950">
                        <h4 className="font-medium mb-2">Average Expense Ratio</h4>
                        <p className="text-2xl font-bold text-green-600">1.44%</p>
                        <p className="text-sm text-muted-foreground">Below industry average</p>
                      </div>
                      <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950">
                        <h4 className="font-medium mb-2">Annual Cost Impact</h4>
                        <p className="text-2xl font-bold text-blue-600">₹12,240</p>
                        <p className="text-sm text-muted-foreground">Total fees per year</p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            )}
          </Card>
        )}
      </div>
    </div>
  );
};

export default MutualFundsHome;
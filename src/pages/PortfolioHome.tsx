import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Download, 
  Settings, 
  Home,
  CreditCard,
  Shield,
  PiggyBank,
  Target,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  IndianRupee,
  Wallet,
  Building,
  Coins,
  FileText,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock data based on research findings
const portfolioData = {
  netWorth: {
    totalAssets: 1550000,
    totalLiabilities: 850000,
    netWorthValue: 700000,
    monthlyChange: 25000,
    yearlyGrowth: 12.5
  },
  assets: {
    investments: {
      equity: 600000,
      debt: 300000,
      gold: 150000,
      realEstate: 150000,
      alternatives: 50000
    },
    cash: {
      savings: 200000,
      fixedDeposits: 100000,
      emergency: 50000
    }
  },
  liabilities: {
    homeLoan: { amount: 700000, emi: 45000, rate: 8.5 },
    creditCards: { used: 80000, limit: 200000, utilization: 40 },
    personalLoan: { amount: 70000, emi: 8500, rate: 12.5 }
  },
  protection: {
    lifeInsurance: 5000000,
    healthInsurance: 1000000,
    termInsurance: 10000000
  },
  goals: [
    { name: 'Child Education', current: 650000, target: 1000000, progress: 65, priority: 'high' },
    { name: 'Home Down Payment', current: 800000, target: 1000000, progress: 80, priority: 'high' },
    { name: 'Retirement', current: 250000, target: 1000000, progress: 25, priority: 'medium' },
    { name: 'Emergency Fund', current: 50000, target: 200000, progress: 25, priority: 'high' }
  ],
  insights: [
    { type: 'warning', message: 'Credit card utilization is high (40%). Consider paying down balances.', priority: 'high' },
    { type: 'info', message: 'Emergency fund is below 6 months of expenses. Consider increasing allocation.', priority: 'medium' },
    { type: 'success', message: 'Your equity allocation is well-diversified across 15 holdings.', priority: 'low' }
  ],
  performance: {
    xirr: 15.2,
    returns: {
      '1D': { value: 2500, percentage: 0.36 },
      '1W': { value: 8500, percentage: 1.2 },
      '1M': { value: 25000, percentage: 3.6 },
      '3M': { value: 45000, percentage: 6.4 },
      '1Y': { value: 85000, percentage: 12.5 }
    }
  }
};

const wealthSegment = portfolioData.netWorth.netWorthValue > 5000000 ? 'HNW' : 
                    portfolioData.netWorth.netWorthValue > 500000 ? 'Emerging' : 'Mass';

const PortfolioHome = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  const [showAdvanced, setShowAdvanced] = useState(wealthSegment !== 'Mass');
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    liabilities: wealthSegment === 'Mass',
    protection: wealthSegment === 'Mass',
    analytics: wealthSegment === 'Mass'
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

  // Asset allocation data for pie chart
  const assetAllocationData = [
    { name: 'Equity', value: portfolioData.assets.investments.equity, color: '#3B82F6' },
    { name: 'Debt', value: portfolioData.assets.investments.debt, color: '#10B981' },
    { name: 'Gold', value: portfolioData.assets.investments.gold, color: '#F59E0B' },
    { name: 'Real Estate', value: portfolioData.assets.investments.realEstate, color: '#8B5CF6' },
    { name: 'Cash', value: portfolioData.assets.cash.savings + portfolioData.assets.cash.fixedDeposits + portfolioData.assets.cash.emergency, color: '#6B7280' }
  ];

  // Performance chart data
  const performanceData = [
    { period: '1D', value: portfolioData.performance.returns['1D'].value },
    { period: '1W', value: portfolioData.performance.returns['1W'].value },
    { period: '1M', value: portfolioData.performance.returns['1M'].value },
    { period: '3M', value: portfolioData.performance.returns['3M'].value },
    { period: '1Y', value: portfolioData.performance.returns['1Y'].value }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Portfolio Dashboard</h1>
            <p className="text-sm text-muted-foreground">Complete financial overview</p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span className="hidden md:inline ml-2">
                {showAdvanced ? 'Simplified' : 'Advanced'}
              </span>
            </Button>
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Export</span>
            </Button>
            <Button size="sm" onClick={() => navigate('/portfolio/update')}>
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Add Asset</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">
        
        {/* Tier 1: Net Worth Summary (Always Visible) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="md:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-sm opacity-90">Net Worth</h3>
                  <p className="text-3xl font-bold">{formatCurrency(portfolioData.netWorth.netWorthValue)}</p>
                </div>
                <Wallet className="w-8 h-8 opacity-80" />
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  {React.createElement(getChangeIcon(portfolioData.netWorth.monthlyChange), { 
                    className: "w-4 h-4" 
                  })}
                  <span>+{formatCurrency(portfolioData.netWorth.monthlyChange)} this month</span>
                </div>
                <div>
                  <span>+{portfolioData.netWorth.yearlyGrowth}% this year</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-muted-foreground">Total Assets</h3>
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(portfolioData.netWorth.totalAssets)}</p>
              <p className="text-sm text-muted-foreground">Across all categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm text-muted-foreground">Total Liabilities</h3>
                <TrendingDown className="w-4 h-4 text-red-600" />
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(portfolioData.netWorth.totalLiabilities)}</p>
              <p className="text-sm text-muted-foreground">Loans & outstanding</p>
            </CardContent>
          </Card>
        </div>

        {/* Financial Health Score */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Financial Health Score</h3>
              <Badge variant="secondary">7.2/10</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'Wealth Building', score: 85, color: 'bg-green-500' },
                { label: 'Debt Management', score: 68, color: 'bg-yellow-500' },
                { label: 'Protection', score: 72, color: 'bg-blue-500' },
                { label: 'Liquidity', score: 82, color: 'bg-purple-500' },
                { label: 'Goal Progress', score: 76, color: 'bg-indigo-500' }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="mb-2">
                    <div className={`w-16 h-16 mx-auto rounded-full ${item.color} flex items-center justify-center text-white font-bold text-lg`}>
                      {item.score}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Tier 2: Asset & Liability Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Investment Assets */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  Investment Assets
                </CardTitle>
                <Badge variant="outline">{formatCurrency(Object.values(portfolioData.assets.investments).reduce((a, b) => a + b, 0))}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(portfolioData.assets.investments).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      {key === 'equity' && <TrendingUp className="w-4 h-4 text-blue-600" />}
                      {key === 'debt' && <Shield className="w-4 h-4 text-green-600" />}
                      {key === 'gold' && <Coins className="w-4 h-4 text-yellow-600" />}
                      {key === 'realEstate' && <Building className="w-4 h-4 text-purple-600" />}
                      {key === 'alternatives' && <Target className="w-4 h-4 text-indigo-600" />}
                      <span className="capitalize font-medium">{key === 'realEstate' ? 'Real Estate' : key}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatCurrency(value)}</p>
                      <p className="text-sm text-muted-foreground">
                        {((value / Object.values(portfolioData.assets.investments).reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mini Pie Chart */}
              <div className="mt-4 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                    >
                      {assetAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cash & Liquid Assets */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5 text-green-600" />
                Cash & Liquid Assets
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(portfolioData.assets.cash).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-4 h-4 text-green-600" />
                      <span className="capitalize font-medium">
                        {key === 'fixedDeposits' ? 'Fixed Deposits' : key}
                      </span>
                    </div>
                    <p className="font-semibold">{formatCurrency(value)}</p>
                  </div>
                ))}
              </div>

              {/* Performance Chart */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Performance</h4>
                  <div className="flex gap-1">
                    {['1D', '1W', '1M', '3M', '1Y'].map((period) => (
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
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="period" />
                      <YAxis />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Line type="monotone" dataKey="value" stroke="#3B82F6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liabilities Section (Collapsible for Mass Market) */}
        <Card>
          <CardHeader 
            className="cursor-pointer" 
            onClick={() => toggleSection('liabilities')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-red-600" />
                Active Liabilities
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="destructive">{formatCurrency(portfolioData.netWorth.totalLiabilities)}</Badge>
                {React.createElement(collapsedSections.liabilities ? ChevronDown : ChevronUp, { 
                  className: "w-4 h-4" 
                })}
              </div>
            </div>
          </CardHeader>
          {!collapsedSections.liabilities && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Home Loan */}
                <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950 dark:border-red-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Home className="w-4 h-4 text-red-600" />
                      <span className="font-medium">Home Loan</span>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      EMI: {formatCurrency(portfolioData.liabilities.homeLoan.emi)}
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-red-600">
                    {formatCurrency(portfolioData.liabilities.homeLoan.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {portfolioData.liabilities.homeLoan.rate}% interest rate
                  </p>
                </div>

                {/* Credit Cards */}
                <div className="p-4 rounded-lg border border-orange-200 bg-orange-50 dark:bg-orange-950 dark:border-orange-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-orange-600" />
                      <span className="font-medium">Credit Cards</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {portfolioData.liabilities.creditCards.utilization}% used
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-orange-600">
                    {formatCurrency(portfolioData.liabilities.creditCards.used)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    of {formatCurrency(portfolioData.liabilities.creditCards.limit)} limit
                  </p>
                  <Progress 
                    value={portfolioData.liabilities.creditCards.utilization} 
                    className="mt-2"
                  />
                </div>

                {/* Personal Loan */}
                <div className="p-4 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium">Personal Loan</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      EMI: {formatCurrency(portfolioData.liabilities.personalLoan.emi)}
                    </Badge>
                  </div>
                  <p className="text-lg font-bold text-yellow-600">
                    {formatCurrency(portfolioData.liabilities.personalLoan.amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {portfolioData.liabilities.personalLoan.rate}% interest rate
                  </p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Protection Cover (Collapsible for Mass Market) */}
        <Card>
          <CardHeader 
            className="cursor-pointer" 
            onClick={() => toggleSection('protection')}
          >
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-600" />
                Protection Cover
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">
                  {formatCurrency(portfolioData.protection.lifeInsurance + portfolioData.protection.healthInsurance + portfolioData.protection.termInsurance)}
                </Badge>
                {React.createElement(collapsedSections.protection ? ChevronDown : ChevronUp, { 
                  className: "w-4 h-4" 
                })}
              </div>
            </div>
          </CardHeader>
          {!collapsedSections.protection && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <h4 className="font-medium mb-2">Life Insurance</h4>
                  <p className="text-xl font-bold text-blue-600">{formatCurrency(portfolioData.protection.lifeInsurance)}</p>
                  <p className="text-sm text-muted-foreground">Coverage amount</p>
                </div>
                <div className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                  <h4 className="font-medium mb-2">Health Insurance</h4>
                  <p className="text-xl font-bold text-green-600">{formatCurrency(portfolioData.protection.healthInsurance)}</p>
                  <p className="text-sm text-muted-foreground">Family coverage</p>
                </div>
                <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800">
                  <h4 className="font-medium mb-2">Term Insurance</h4>
                  <p className="text-xl font-bold text-purple-600">{formatCurrency(portfolioData.protection.termInsurance)}</p>
                  <p className="text-sm text-muted-foreground">Term coverage</p>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Goals Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Financial Goals Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {portfolioData.goals.map((goal, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-green-600" />
                      <span className="font-medium">{goal.name}</span>
                      <Badge 
                        variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'secondary' : 'outline'}
                        className="text-xs"
                      >
                        {goal.priority}
                      </Badge>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-1">{goal.progress}% complete</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Insights & Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              Financial Insights & Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {portfolioData.insights.map((insight, index) => (
                <div 
                  key={index} 
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950' :
                    insight.type === 'success' ? 'border-green-500 bg-green-50 dark:bg-green-950' :
                    'border-blue-500 bg-blue-50 dark:bg-blue-950'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2">
                      <AlertCircle className={`w-4 h-4 mt-0.5 ${
                        insight.type === 'warning' ? 'text-yellow-600' :
                        insight.type === 'success' ? 'text-green-600' :
                        'text-blue-600'
                      }`} />
                      <p className="text-sm">{insight.message}</p>
                    </div>
                    <Badge variant="outline" className="text-xs ml-2">
                      {insight.priority}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Advanced Analytics (Collapsible) */}
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
                <Tabs defaultValue="performance" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="allocation">Allocation</TabsTrigger>
                    <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                    <TabsTrigger value="tax">Tax Planning</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="performance" className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-green-600">{portfolioData.performance.xirr}%</p>
                        <p className="text-sm text-muted-foreground">XIRR</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold">12.8%</p>
                        <p className="text-sm text-muted-foreground">vs Nifty 50</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold">0.85</p>
                        <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold">15.2%</p>
                        <p className="text-sm text-muted-foreground">Volatility</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="allocation">
                    <div className="text-center">
                      <p className="text-muted-foreground">Asset allocation analysis coming soon</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="risk">
                    <div className="text-center">
                      <p className="text-muted-foreground">Risk analysis coming soon</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="tax">
                    <div className="text-center">
                      <p className="text-muted-foreground">Tax planning tools coming soon</p>
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

export default PortfolioHome;
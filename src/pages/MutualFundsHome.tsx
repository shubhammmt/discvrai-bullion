import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
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
  Search,
  Info,
  CircleAlert,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  Gauge
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';

// Enhanced mock data with new structure
const portfolioData = {
  // Portfolio Summary
  summary: {
    totalValue: 2450000,
    totalInvestment: 2100000,
    totalGains: 350000,
    totalGainsPercentage: 16.67,
    xirr: 18.5,
    currentNAV: 1.167,
    riskRating: "Moderate",
    riskScore: 44
  },

  // Goals Progress
  goals: [
    {
      id: 1,
      name: "Retirement Fund",
      target: 5000000,
      current: 1200000,
      progress: 24,
      timeHorizon: "20 years",
      monthlyRequired: 45000,
      onTrack: true
    },
    {
      id: 2,
      name: "Child Education",
      target: 2500000,
      current: 800000,
      progress: 32,
      timeHorizon: "10 years",
      monthlyRequired: 25000,
      onTrack: false
    },
    {
      id: 3,
      name: "House Down Payment",
      target: 1500000,
      current: 450000,
      progress: 30,
      timeHorizon: "5 years",
      monthlyRequired: 35000,
      onTrack: true
    }
  ],

  // Key Metrics
  metrics: {
    sharpeRatio: 0.74,
    beta: 0.76,
    alpha: 1.92,
    standardDeviation: 16.8,
    maxDrawdown: 12.5,
    informationRatio: 0.58,
    treynorRatio: 14.2,
    portfolioTurnover: 28.5
  },

  // Benchmark Comparison
  benchmarkComparison: {
    portfolio: { '1M': 2.1, '6M': 8.5, '1Y': 18.5, '3Y': 16.2, '5Y': 14.8 },
    benchmark: { '1M': 1.8, '6M': 7.2, '1Y': 16.8, '3Y': 15.1, '5Y': 13.9 },
    category: { '1M': 1.5, '6M': 6.8, '1Y': 15.9, '3Y': 14.8, '5Y': 13.2 }
  },

  // Asset Allocation
  allocation: {
    assetClass: [
      { name: 'Equity', value: 68, target: 70, color: '#3B82F6' },
      { name: 'Debt', value: 25, target: 25, color: '#10B981' },
      { name: 'Cash/Others', value: 7, target: 5, color: '#F59E0B' }
    ],
    sectors: [
      { name: 'Financial Services', value: 19.5, color: '#3B82F6' },
      { name: 'IT Services', value: 18.2, color: '#8B5CF6' },
      { name: 'Consumer Goods', value: 12.8, color: '#10B981' },
      { name: 'Healthcare', value: 9.5, color: '#F59E0B' },
      { name: 'Industrials', value: 8.7, color: '#EF4444' },
      { name: 'Others', value: 31.3, color: '#6B7280' }
    ],
    marketCap: [
      { name: 'Large Cap', value: 55, color: '#3B82F6' },
      { name: 'Mid Cap', value: 30, color: '#8B5CF6' },
      { name: 'Small Cap', value: 15, color: '#F59E0B' }
    ]
  },

  // Individual Funds with comprehensive data
  funds: [
    {
      id: 1,
      name: "Aditya Birla Equity Hybrid 95 Fund (Reg)",
      category: "Aggressive Hybrid",
      scheme: "Regular Plan - Growth",
      riskLevel: "Moderate",
      nav: 28.45,
      currentValue: 485000,
      investment: 400000,
      gains: 85000,
      gainsPercentage: 21.25,
      units: 17045.5,
      expenseRatio: 1.84,
      aum: 7464,
      manager: "Chanchal Khandelwal",
      managerTenure: "1995",
      returns: {
        '1W': 0.8, '1M': 2.5, '3M': 8.2, '1Y': 21.3, '3Y': 16.8, '5Y': 14.2, 'SI': 18.5
      },
      benchmarkReturns: {
        '1Y': 18.9, '3Y': 15.2, '5Y': 13.1
      },
      categoryReturns: {
        '1Y': 19.2, '3Y': 15.8, '5Y': 13.5
      },
      metrics: {
        sharpeRatio: 0.74,
        beta: 0.76,
        alpha: 1.92,
        standardDeviation: 16.8
      },
      holdings: {
        topStocks: [
          { name: 'HDFC Bank', weight: 4.2 },
          { name: 'ICICI Bank', weight: 3.8 },
          { name: 'Infosys', weight: 3.5 },
          { name: 'Reliance Industries', weight: 3.2 },
          { name: 'TCS', weight: 2.9 }
        ],
        topSectorsAllocation: [
          { name: 'Banks', weight: 17.7 },
          { name: 'IT Software', weight: 7.3 },
          { name: 'Oil & Gas', weight: 5.8 },
          { name: 'NBFCs', weight: 4.9 },
          { name: 'Automobiles', weight: 4.2 }
        ]
      },
      recommendation: "HOLD",
      recommendationReason: "Performing well with consistent returns above category average",
      insights: [
        { type: 'success', message: 'Outperforming category by 2.1% over 1Y' },
        { type: 'warning', message: 'Expense ratio higher than category average' },
        { type: 'info', message: 'Strong manager track record since 1995' }
      ]
    },
    {
      id: 2,
      name: "HDFC Equity Fund - Direct Growth",
      category: "Large Cap",
      scheme: "Direct Plan - Growth",
      riskLevel: "Moderate",
      nav: 754.32,
      currentValue: 625000,
      investment: 520000,
      gains: 105000,
      gainsPercentage: 20.19,
      units: 828.5,
      expenseRatio: 1.42,
      aum: 34800,
      manager: "Prashant Jain",
      managerTenure: "2003",
      returns: {
        '1W': 1.2, '1M': 3.1, '3M': 9.5, '1Y': 24.8, '3Y': 18.5, '5Y': 15.9, 'SI': 22.3
      },
      benchmarkReturns: {
        '1Y': 22.1, '3Y': 16.8, '5Y': 14.2
      },
      categoryReturns: {
        '1Y': 21.5, '3Y': 17.2, '5Y': 14.8
      },
      metrics: {
        sharpeRatio: 0.89,
        beta: 1.05,
        alpha: 3.2,
        standardDeviation: 18.2
      },
      holdings: {
        topStocks: [
          { name: 'Reliance Industries', weight: 6.8 },
          { name: 'HDFC Bank', weight: 5.2 },
          { name: 'Infosys', weight: 4.9 },
          { name: 'TCS', weight: 4.1 },
          { name: 'ITC', weight: 3.8 }
        ],
        topSectorsAllocation: [
          { name: 'IT Software', weight: 22.5 },
          { name: 'Banks', weight: 18.3 },
          { name: 'Oil & Gas', weight: 12.7 },
          { name: 'Consumer Goods', weight: 8.9 },
          { name: 'Pharmaceuticals', weight: 6.8 }
        ]
      },
      recommendation: "BUY",
      recommendationReason: "Excellent track record with strong alpha generation",
      insights: [
        { type: 'success', message: 'Consistent outperformance over 3Y and 5Y' },
        { type: 'success', message: 'Strong fund house with excellent research' },
        { type: 'info', message: 'Suitable for long-term wealth creation' }
      ]
    },
    {
      id: 3,
      name: "SBI Small Cap Fund - Direct Growth",
      category: "Small Cap",
      scheme: "Direct Plan - Growth",
      riskLevel: "High",
      nav: 142.85,
      currentValue: 380000,
      investment: 280000,
      gains: 100000,
      gainsPercentage: 35.71,
      units: 2660.8,
      expenseRatio: 1.75,
      aum: 12800,
      manager: "R. Srinivasan",
      managerTenure: "2018",
      returns: {
        '1W': 2.8, '1M': 6.2, '3M': 15.8, '1Y': 42.5, '3Y': 28.9, '5Y': 22.4, 'SI': 35.7
      },
      benchmarkReturns: {
        '1Y': 38.2, '3Y': 25.5, '5Y': 19.8
      },
      categoryReturns: {
        '1Y': 39.8, '3Y': 26.2, '5Y': 20.5
      },
      metrics: {
        sharpeRatio: 0.68,
        beta: 1.32,
        alpha: 8.5,
        standardDeviation: 28.5
      },
      holdings: {
        topStocks: [
          { name: 'Kaynes Technology', weight: 2.8 },
          { name: 'Apar Industries', weight: 2.5 },
          { name: 'Schaeffler India', weight: 2.3 },
          { name: 'Fine Organic Industries', weight: 2.1 },
          { name: 'Galaxy Surfactants', weight: 1.9 }
        ],
        topSectorsAllocation: [
          { name: 'Chemicals', weight: 18.5 },
          { name: 'Capital Goods', weight: 15.2 },
          { name: 'Automobiles', weight: 12.8 },
          { name: 'Consumer Discretionary', weight: 10.9 },
          { name: 'Healthcare', weight: 8.7 }
        ]
      },
      recommendation: "REVIEW",
      recommendationReason: "High volatility requires close monitoring given recent gains",
      insights: [
        { type: 'success', message: 'Excellent 1Y returns outperforming category' },
        { type: 'warning', message: 'High volatility (28.5%) requires monitoring' },
        { type: 'warning', message: 'Consider partial profit booking' }
      ]
    }
  ],

  // Peer Comparison
  peers: [
    { name: 'ICICI Prudential Equity & Debt Fund', returns: { '1Y': 19.8, '3Y': 16.2 }, sharpe: 0.82 },
    { name: 'HDFC Balanced Advantage Fund', returns: { '1Y': 18.5, '3Y': 15.8 }, sharpe: 0.78 },
    { name: 'Mirae Asset Hybrid Equity Fund', returns: { '1Y': 20.2, '3Y': 17.1 }, sharpe: 0.85 }
  ],

  // AI Analysis
  aiAnalysis: {
    overallScore: 78,
    strengths: [
      "Well-diversified portfolio across market caps",
      "Strong alpha generation with 1.92% portfolio alpha",
      "Consistent outperformance vs benchmarks",
      "Good expense ratio management"
    ],
    concerns: [
      "Financial Services tilt at 19.5% creates concentration risk",
      "SBI Small Cap showing high volatility at 28.5%",
      "Consider rebalancing if equity allocation exceeds comfort zone"
    ],
    recommendations: [
      "Maintain current allocation but monitor small cap exposure",
      "Consider booking partial profits in SBI Small Cap Fund",
      "Add mid-cap exposure to balance portfolio",
      "Review expense ratios - switch Regular to Direct plans where possible"
    ]
  }
};

const MutualFundsHome = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPeriod, setSelectedPeriod] = useState('1Y');
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    metrics: false,
    allocation: true,
    funds: true,
    aiAnalysis: true
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
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

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-100 text-green-800 border-green-200';
      case 'HOLD': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'SELL': case 'REVIEW': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Info className="w-4 h-4 text-blue-600" />;
      default: return <Info className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 md:px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Portfolio Analysis Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              {portfolioData.funds.length} funds • {formatCurrency(portfolioData.summary.totalValue)} total value • Risk Score: {portfolioData.summary.riskScore}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Export Report</span>
            </Button>
            <Button size="sm" onClick={() => navigate('/mutual-fund-research')}>
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline ml-2">Add Fund</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 space-y-6">

        {/* Portfolio Summary & Goal Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Portfolio Summary */}
          <Card className="lg:col-span-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-sm opacity-90 mb-2">Total Portfolio Value</h3>
                  <p className="text-4xl font-bold mb-2">{formatCurrency(portfolioData.summary.totalValue)}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>+{formatCurrency(portfolioData.summary.totalGains)} ({portfolioData.summary.totalGainsPercentage}%)</span>
                    </div>
                    <div>XIRR: {portfolioData.summary.xirr}%</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg p-3 mb-2">
                    <Gauge className="w-8 h-8 mx-auto mb-1" />
                    <div className="text-xs">Risk Score</div>
                    <div className="text-lg font-bold">{portfolioData.summary.riskScore}</div>
                  </div>
                </div>
              </div>

              {/* Key Performance Metrics Summary */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="text-xs opacity-80">Sharpe Ratio</div>
                  <div className="text-lg font-semibold">{portfolioData.metrics.sharpeRatio}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs opacity-80">Portfolio Beta</div>
                  <div className="text-lg font-semibold">{portfolioData.metrics.beta}</div>
                </div>
                <div className="text-center">
                  <div className="text-xs opacity-80">Alpha</div>
                  <div className="text-lg font-semibold">{portfolioData.metrics.alpha}%</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goal Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-600" />
                Goal Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {portfolioData.goals.map((goal) => (
                <div key={goal.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{goal.name}</span>
                    <div className="flex items-center gap-1">
                      {goal.onTrack ? 
                        <CheckCircle className="w-4 h-4 text-green-600" /> : 
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                      }
                      <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                    </div>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{formatCurrency(goal.current)}</span>
                    <span>{formatCurrency(goal.target)}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Actionable Summary Alert */}
        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-950">
          <Brain className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800 dark:text-blue-200">
            <strong>Portfolio Summary:</strong> Your portfolio's 1-year return is {portfolioData.benchmarkComparison.portfolio['1Y']}%, 
            outperforming benchmark by {(portfolioData.benchmarkComparison.portfolio['1Y'] - portfolioData.benchmarkComparison.benchmark['1Y']).toFixed(1)}%. 
            SBI Small Cap Fund shows high gains but requires monitoring. HDFC Equity Fund - excellent performer, consider increasing allocation.
          </AlertDescription>
        </Alert>

        {/* Benchmark Comparison */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Benchmark Comparison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Period</th>
                    <th className="text-right py-2">Portfolio</th>
                    <th className="text-right py-2">Benchmark</th>
                    <th className="text-right py-2">Category</th>
                    <th className="text-right py-2">Outperformance</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(portfolioData.benchmarkComparison.portfolio).map(([period, portfolioReturn]) => {
                    const benchmarkReturn = portfolioData.benchmarkComparison.benchmark[period as keyof typeof portfolioData.benchmarkComparison.benchmark];
                    const categoryReturn = portfolioData.benchmarkComparison.category[period as keyof typeof portfolioData.benchmarkComparison.category];
                    const outperformance = portfolioReturn - benchmarkReturn;
                    
                    return (
                      <tr key={period} className="border-b">
                        <td className="py-2 font-medium">{period}</td>
                        <td className="text-right py-2 font-semibold">{portfolioReturn}%</td>
                        <td className="text-right py-2">{benchmarkReturn}%</td>
                        <td className="text-right py-2">{categoryReturn}%</td>
                        <td className={`text-right py-2 font-medium ${outperformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {outperformance >= 0 ? '+' : ''}{outperformance.toFixed(1)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation & Diversification */}
        <Collapsible open={expandedSections.allocation} onOpenChange={() => toggleSection('allocation')}>
          <Card>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-orange-600" />
                    Asset Allocation & Diversification
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.allocation ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Asset Class Allocation */}
                  <div>
                    <h4 className="font-semibold mb-4">Asset Class</h4>
                    <div className="space-y-3">
                      {portfolioData.allocation.assetClass.map((asset) => (
                        <div key={asset.name} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">{asset.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{asset.value}%</span>
                              <span className="text-xs text-muted-foreground">(Target: {asset.target}%)</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={asset.value} className="flex-1 h-2" />
                            {Math.abs(asset.value - asset.target) > 2 && (
                              <AlertCircle className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Sector Exposure */}
                  <div>
                    <h4 className="font-semibold mb-4">Sector Exposure</h4>
                    <div className="space-y-2">
                      {portfolioData.allocation.sectors.map((sector) => (
                        <div key={sector.name} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: sector.color }}
                            />
                            <span className="text-sm">{sector.name}</span>
                          </div>
                          <span className="text-sm font-medium">{sector.value}%</span>
                        </div>
                      ))}
                    </div>
                    {/* Highlight concentration risk */}
                    <Alert className="mt-4 border-yellow-200 bg-yellow-50">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <AlertDescription className="text-yellow-800">
                        Financial Services tilt is {portfolioData.allocation.sectors[0].value}%. Consider diversification if this exceeds your comfort level.
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Market Cap Allocation */}
                  <div>
                    <h4 className="font-semibold mb-4">Market Cap Allocation</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <RechartsPieChart>
                        <Pie
                          data={portfolioData.allocation.marketCap}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {portfolioData.allocation.marketCap.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Risk & Performance Metrics Explained */}
        <Collapsible open={expandedSections.metrics} onOpenChange={() => toggleSection('metrics')}>
          <Card>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-red-600" />
                    Risk & Performance Metrics
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.metrics ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  
                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Sharpe Ratio</h4>
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4" side="top" align="start" sideOffset={8} avoidCollisions={true} sticky="always">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Sharpe Ratio</h4>
                            <p className="text-sm">Measures risk-adjusted return. Higher values indicate better returns per unit of risk taken. Values above 0.5 are considered good.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <p className="text-2xl font-bold text-blue-600">{portfolioData.metrics.sharpeRatio}</p>
                    <p className="text-xs text-muted-foreground">Risk-adjusted returns</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Beta</h4>
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4" side="top" align="start" sideOffset={8} avoidCollisions={true} sticky="always">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Beta</h4>
                            <p className="text-sm">Measures volatility relative to the market. Beta &gt; 1 means more volatile than market, Beta &lt; 1 means less volatile. Your portfolio is less volatile than the market.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <p className="text-2xl font-bold text-green-600">{portfolioData.metrics.beta}</p>
                    <p className="text-xs text-muted-foreground">Market volatility</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Alpha</h4>
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4" side="top" align="start" sideOffset={8} avoidCollisions={true} sticky="always">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Alpha</h4>
                            <p className="text-sm">Excess return beyond what Beta predicts. Positive alpha indicates the manager added value relative to the benchmark for a given amount of risk.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <p className="text-2xl font-bold text-purple-600">{portfolioData.metrics.alpha}%</p>
                    <p className="text-xs text-muted-foreground">Excess returns</p>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">Volatility</h4>
                      <HoverCard>
                        <HoverCardTrigger>
                          <Info className="w-4 h-4 text-muted-foreground cursor-help" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80 p-4" side="top" align="start" sideOffset={8} avoidCollisions={true} sticky="always">
                          <div className="space-y-2">
                            <h4 className="font-semibold">Standard Deviation (Volatility)</h4>
                            <p className="text-sm">Shows how much returns fluctuate. Lower values indicate more stable returns. Your portfolio volatility is moderate.</p>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">{portfolioData.metrics.standardDeviation}%</p>
                    <p className="text-xs text-muted-foreground">Return fluctuation</p>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Individual Fund Details */}
        <Collapsible open={expandedSections.funds} onOpenChange={() => toggleSection('funds')}>
          <Card>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Individual Fund Analysis
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.funds ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  {portfolioData.funds.map((fund) => (
                    <div key={fund.id} className="border rounded-lg p-6 space-y-4">
                      
                      {/* Fund Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{fund.name}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{fund.category}</span>
                            <span>•</span>
                            <span>{fund.scheme}</span>
                            <span>•</span>
                            <span>Risk: {fund.riskLevel}</span>
                          </div>
                        </div>
                        <Badge className={`${getRecommendationColor(fund.recommendation)} border`}>
                          {fund.recommendation}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        
                        {/* Performance Overview */}
                        <div className="space-y-4">
                          <h4 className="font-semibold">Performance Overview</h4>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Current Value</p>
                              <p className="text-xl font-bold">{formatCurrency(fund.currentValue)}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Total Gains</p>
                              <p className="text-xl font-bold text-green-600">
                                +{formatCurrency(fund.gains)} ({fund.gainsPercentage}%)
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">NAV</p>
                              <p className="text-lg font-semibold">₹{fund.nav}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Units</p>
                              <p className="text-lg font-semibold">{fund.units.toLocaleString()}</p>
                            </div>
                          </div>

                          {/* Fund Manager */}
                          <div>
                            <p className="text-sm text-muted-foreground">Fund Manager</p>
                            <p className="font-medium">{fund.manager}</p>
                            <p className="text-xs text-muted-foreground">Managing since {fund.managerTenure}</p>
                          </div>
                        </div>

                        {/* Returns Comparison */}
                        <div className="space-y-4">
                          <h4 className="font-semibold">Returns Comparison</h4>
                          
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-1">Period</th>
                                  <th className="text-right py-1">Fund</th>
                                  <th className="text-right py-1">Benchmark</th>
                                  <th className="text-right py-1">Category</th>
                                </tr>
                              </thead>
                              <tbody>
                                {['1Y', '3Y', '5Y'].map(period => (
                                  <tr key={period} className="border-b">
                                    <td className="py-1">{period}</td>
                                    <td className="text-right font-semibold">
                                      {fund.returns[period as keyof typeof fund.returns]}%
                                    </td>
                                    <td className="text-right">
                                      {fund.benchmarkReturns[period as keyof typeof fund.benchmarkReturns]}%
                                    </td>
                                    <td className="text-right">
                                      {fund.categoryReturns[period as keyof typeof fund.categoryReturns]}%
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>

                          {/* Risk Metrics */}
                          <div className="space-y-2">
                            <h5 className="font-medium">Risk Metrics</h5>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>Sharpe: {fund.metrics.sharpeRatio}</div>
                              <div>Beta: {fund.metrics.beta}</div>
                              <div>Alpha: {fund.metrics.alpha}%</div>
                              <div>Volatility: {fund.metrics.standardDeviation}%</div>
                            </div>
                          </div>
                        </div>

                        {/* Holdings & Analysis */}
                        <div className="space-y-4">
                          <h4 className="font-semibold">Holdings & Analysis</h4>
                          
                          {/* Top Holdings */}
                          <div>
                            <h5 className="font-medium mb-2">Top 5 Holdings</h5>
                            <div className="space-y-1">
                              {fund.holdings.topStocks.map((stock, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span>{stock.name}</span>
                                  <span>{stock.weight}%</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Expense Details */}
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Expense Ratio</p>
                              <p className="font-semibold">{fund.expenseRatio}%</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">AUM</p>
                              <p className="font-semibold">₹{fund.aum}Cr</p>
                            </div>
                          </div>

                          {/* Fund Insights */}
                          <div>
                            <h5 className="font-medium mb-2">Insights</h5>
                            <div className="space-y-2">
                              {fund.insights.map((insight, index) => (
                                <div key={index} className="flex items-start gap-2 text-sm">
                                  {getInsightIcon(insight.type)}
                                  <span>{insight.message}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Recommendation */}
                      <Alert className="mt-4">
                        <CheckCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>{fund.recommendation}:</strong> {fund.recommendationReason}
                        </AlertDescription>
                      </Alert>
                    </div>
                  ))}
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* AI Analysis & Recommendations */}
        <Collapsible open={expandedSections.aiAnalysis} onOpenChange={() => toggleSection('aiAnalysis')}>
          <Card>
            <CardHeader>
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-indigo-600" />
                    AI Analysis & Actionable Insights
                  </CardTitle>
                  <ChevronDown className={`w-5 h-5 transition-transform ${expandedSections.aiAnalysis ? 'rotate-180' : ''}`} />
                </div>
              </CollapsibleTrigger>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-6">
                  
                  {/* Overall Score */}
                  <div className="text-center p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-lg">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 text-white rounded-full mb-4">
                      <span className="text-2xl font-bold">{portfolioData.aiAnalysis.overallScore}</span>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Portfolio Health Score</h3>
                    <p className="text-muted-foreground">Your portfolio shows strong fundamentals with good diversification</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    
                    {/* Strengths */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        Portfolio Strengths
                      </h4>
                      <div className="space-y-2">
                        {portfolioData.aiAnalysis.strengths.map((strength, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm">{strength}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Areas of Concern */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-yellow-600" />
                        Areas of Concern
                      </h4>
                      <div className="space-y-2">
                        {portfolioData.aiAnalysis.concerns.map((concern, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm">{concern}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* AI Recommendations */}
                  <div>
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Zap className="w-5 h-5 text-purple-600" />
                      AI Recommendations
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {portfolioData.aiAnalysis.recommendations.map((recommendation, index) => (
                        <Alert key={index} className="border-purple-200 bg-purple-50 dark:bg-purple-950">
                          <ArrowUpRight className="h-4 w-4 text-purple-600" />
                          <AlertDescription className="text-purple-800 dark:text-purple-200">
                            {recommendation}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-4 border-t">
                    <Button onClick={() => navigate('/mutual-fund-research')}>
                      <Plus className="w-4 h-4 mr-2" />
                      Explore New Funds
                    </Button>
                    <Button variant="outline" onClick={() => navigate('/portfolio-rebalance')}>
                      <Activity className="w-4 h-4 mr-2" />
                      Rebalance Portfolio
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

      </div>
    </div>
  );
};

export default MutualFundsHome;
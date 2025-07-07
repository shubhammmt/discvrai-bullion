import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ArrowLeft, TrendingUp, PieChart, Users, Shield, DollarSign, Activity, Target, Building, BarChart3, Bookmark, Share2, Download, Calculator, User, Loader2, Info } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';
import ReturnsCalculator from '@/components/ReturnsCalculator';
import ResearchSharing from '@/components/ResearchSharing';
import { fetchMutualFundDetails, MutualFundDetailsResponse } from '@/utils/mutualFundDetailsApi';
import { useToast } from '@/hooks/use-toast';
import FundVsCategoryComparison from '@/components/FundVsCategoryComparison';
import PeerComparison from '@/components/PeerComparison';

const MutualFundDetails = () => {
  const { fundId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTimeframe, setActiveTimeframe] = useState('3Y');
  const [apiResponse, setApiResponse] = useState<MutualFundDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Helper function to safely format numbers
  const safeToFixed = (value: number | null | undefined, decimals: number = 2): string => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'N/A';
    }
    return value.toFixed(decimals);
  };

  // Helper function to format exit load text
  const formatExitLoad = (exitLoadText: string) => {
    if (!exitLoadText || exitLoadText === "No Load" || exitLoadText === "Nil") {
      return "No Exit Load";
    }
    
    // Extract percentage and days from the text
    const percentageMatch = exitLoadText.match(/(\d+\.?\d*)%/);
    const daysMatch = exitLoadText.match(/(\d+)\s*days?/);
    
    if (percentageMatch && daysMatch) {
      const percentage = percentageMatch[1];
      const days = daysMatch[1];
      return `${percentage}% if redeemed within ${days} days`;
    }
    
    // Fallback to original text if parsing fails
    return exitLoadText;
  };

  // Helper function to format Y-axis values for better readability
  const formatYAxisValue = (value: number) => {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }
    if (Math.abs(value) >= 1000000) {
      return `${(value / 1000000).toFixed(1)}M`;
    } else if (Math.abs(value) >= 1000) {
      return `${(value / 1000).toFixed(1)}K`;
    } else if (Math.abs(value) >= 100) {
      return `${value.toFixed(0)}`;
    } else if (Math.abs(value) >= 10) {
      return `${value.toFixed(1)}`;
    } else {
      return `${value.toFixed(2)}`;
    }
  };

  useEffect(() => {
    const loadFundDetails = async () => {
      if (!fundId) {
        setError('Fund ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const data = await fetchMutualFundDetails(fundId);
        setApiResponse(data);
        
        if (!data.success || !data.fund_data) {
          setError(data.error || 'Fund not found');
          toast({
            title: "Fund Not Found",
            description: data.error || "The requested mutual fund could not be found.",
            variant: "destructive",
          });
        }
      } catch (err) {
        console.error('Failed to load fund details:', err);
        setError(err instanceof Error ? err.message : 'Failed to load fund details');
        toast({
          title: "Error",
          description: "Failed to load mutual fund details. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadFundDetails();
  }, [fundId, toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Loading fund details...</p>
        </div>
      </div>
    );
  }

  if (error || !apiResponse?.success || !apiResponse.fund_data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error: </strong> 
            <span className="block sm:inline">{error || apiResponse?.error || 'Failed to load fund details'}</span>
          </div>
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft size={16} className="mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const fundData = apiResponse.fund_data;

  // Prepare chart data with safe number handling
  const performanceData = [
    { period: '1W', return: fundData.performance.returns.ret_1week || 0, benchmark: fundData.performance.benchmark.returns["1_week"] || 1.5 },
    { period: '1M', return: fundData.performance.returns.ret_1month || 0, benchmark: fundData.performance.benchmark.returns["1_month"] || 2.5 },
    { period: '3M', return: fundData.performance.returns.ret_3month || 0, benchmark: fundData.performance.benchmark.returns["3_month"] || 8.2 },
    { period: '6M', return: fundData.performance.returns.ret_6month || 0, benchmark: fundData.performance.benchmark.returns["6_month"] || -2.1 },
    { period: '1Y', return: fundData.performance.returns.ret_1year || 0, benchmark: fundData.performance.benchmark.returns["1_year"] || 4.8 },
    { period: '3Y', return: fundData.performance.returns.ret_3year || 0, benchmark: fundData.performance.benchmark.returns["3_year"] || 13.2 },
    { period: '5Y', return: fundData.performance.returns.ret_5year || 0, benchmark: fundData.performance.benchmark.returns["5_year"] || 16.1 }
  ];

  const assetAllocationData = [
    { name: 'Equity', value: fundData.portfolio.asset_allocation.equity || 0, color: '#3b82f6' },
    { name: 'Debt', value: fundData.portfolio.asset_allocation.debt || 0, color: '#10b981' },
    { name: 'Cash & Others', value: fundData.portfolio.asset_allocation.cash_and_others || 0, color: '#f59e0b' }
  ];

  const sectorData = Object.entries(fundData.portfolio.sector_allocation.sectors)
    .slice(0, 8)
    .map(([sector, allocation], index) => ({
      sector,
      allocation: (allocation as number) || 0,
      color: [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', 
        '#8b5cf6', '#06b6d4', '#84cc16', '#f97316'
      ][index] || '#6b7280'
    }));

  const timeframes = ['1W', '1M', '3M', '6M', '1Y', '3Y', '5Y'];
  const currentData = performanceData.find(item => item.period === activeTimeframe) || performanceData[5];

  // Chart configs
  const performanceChartConfig = {
    return: {
      label: "Fund Return (%)",
      color: "#3b82f6",
    },
    benchmark: {
      label: "Benchmark Return (%)",
      color: "#e5e7eb",
    },
  };

  const returnsChartConfig = {
    return: {
      label: "Returns (%)",
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
    <TooltipProvider>
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
          <div className="space-y-6">
            {/* Fund Basic Information */}
            <div className="space-y-4">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                    {fundData.basic_info.fund_identifiers.scheme_short_name}
                  </h1>
                  <p className="text-base lg:text-lg text-gray-600 mb-3">
                    {fundData.basic_info.amc_details.amc_name}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {fundData.basic_info.fund_classification.main_category}
                    </Badge>
                    <Badge variant="secondary" className="bg-gray-100 text-gray-800">
                      {fundData.basic_info.plan_details.plan_type} Plan
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2 lg:self-start">
                  <Button variant="outline" size="sm">
                    <Bookmark size={16} />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 size={16} />
                  </Button>
                </div>
              </div>

              {/* NAV and Performance with AUM and Expense Ratio */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 lg:p-6">
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-gray-600 mb-1 flex items-center gap-1 justify-center lg:justify-start">
                        Latest NAV
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={12} className="text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Net Asset Value (NAV) is the per-unit market value of the mutual fund's holdings.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="text-2xl lg:text-4xl font-bold text-gray-900">₹{safeToFixed(fundData.performance.current_nav.price)}</div>
                      <div className="text-sm text-green-600 mt-1"></div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-gray-600 mb-1">3Y Returns</div>
                      <div className="text-2xl lg:text-4xl font-bold text-blue-600">{safeToFixed(fundData.performance.returns.ret_3year)}%</div>
                      <div className="text-sm text-gray-600 mt-1"></div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-gray-600 mb-1 flex items-center gap-1 justify-center lg:justify-start">
                        AUM
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={12} className="text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Assets Under Management (AUM) represents the total market value of investments managed by the fund.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="text-2xl lg:text-4xl font-bold text-purple-600">₹{safeToFixed((fundData.fund_structure.aum_information.current_aum || 0) / 100, 0)}Cr</div>
                      <div className="text-sm text-gray-600 mt-1"></div>
                    </div>
                    <div className="text-center lg:text-left">
                      <div className="text-sm text-gray-600 mb-1 flex items-center gap-1 justify-center lg:justify-start">
                        Expense Ratio
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={12} className="text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Expense Ratio is the annual fee charged by the fund for managing your investments, expressed as a percentage of AUM.</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="text-2xl lg:text-4xl font-bold text-orange-600">{safeToFixed(fundData.fund_structure.expenses.total_expense_ratio)}%</div>
                      <div className="text-sm text-gray-600 mt-1"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Returns Overview Chart */}
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg lg:text-xl">
                    <BarChart3 className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                    Returns Overview
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">Performance across different time periods</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-72 lg:h-80">
                    <ChartContainer config={returnsChartConfig} className="h-full w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={performanceData}
                          margin={{ top: 30, right: 30, left: 100, bottom: 60 }}
                        >
                          <XAxis 
                            dataKey="period" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 13, fill: '#374151', fontWeight: 600 }}
                            dy={10}
                            label={{ 
                              value: 'Time Period', 
                              position: 'insideBottom', 
                              offset: -10,
                              style: { textAnchor: 'middle', fontSize: '12px', fill: '#6b7280', fontWeight: 500 }
                            }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 12, fill: '#6b7280', fontWeight: 500 }}
                            domain={['dataMin - 2', 'dataMax + 2']}
                            dx={-20}
                            width={80}
                            tickFormatter={(value) => `${formatYAxisValue(value)}%`}
                            label={{ 
                              value: 'Returns (%)', 
                              angle: -90, 
                              position: 'outside',
                              offset: -60,
                              style: { textAnchor: 'middle', fontSize: '12px', fill: '#6b7280', fontWeight: 500 }
                            }}
                          />
                          <ChartTooltip 
                            content={<ChartTooltipContent />}
                            formatter={(value, name) => [`${safeToFixed(value as number)}%`, 'Returns']}
                            cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                          />
                          <Bar 
                            dataKey="return" 
                            fill="url(#blueGradient)"
                            radius={[6, 6, 0, 0]}
                            stroke="#2563eb"
                            strokeWidth={1}
                          />
                          <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                              <stop offset="100%" stopColor="#60a5fa" stopOpacity={0.8} />
                            </linearGradient>
                          </defs>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Performance Chart */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Performance vs Benchmark
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-[65%] flex flex-col">
                    <ChartContainer config={performanceChartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={performanceData}
                          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                          <XAxis 
                            dataKey="period" 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                          />
                          <YAxis 
                            axisLine={false}
                            tickLine={false}
                            tick={{ fontSize: 11, fill: '#6b7280' }}
                            domain={['dataMin - 2', 'dataMax + 2']}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line 
                            type="monotone" 
                            dataKey="return" 
                            stroke="#3b82f6" 
                            strokeWidth={3}
                            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                            name="Fund"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="benchmark" 
                            stroke="#e5e7eb" 
                            strokeWidth={2}
                            dot={{ fill: '#e5e7eb', strokeWidth: 2, r: 3 }}
                            name="Benchmark"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                    
                    <div className="flex justify-center gap-1 sm:gap-2 pt-4 flex-wrap">
                      {timeframes.map((timeframe) => (
                        <Button
                          key={timeframe}
                          variant={activeTimeframe === timeframe ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveTimeframe(timeframe)}
                          className="h-6 px-2 sm:h-7 sm:px-2.5 text-xs flex-shrink-0"
                        >
                          {timeframe}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="w-full lg:w-[35%] space-y-3">
                    <div className="text-center">
                      <h3 className="text-sm font-semibold mb-1">{activeTimeframe} Performance Comparison</h3>
                      <div className="text-xs text-gray-600 mb-2">Fund vs Category Benchmark</div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-600">Fund Return ({activeTimeframe})</span>
                        <span className={`text-lg font-bold ${currentData.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {currentData.return > 0 ? '+' : ''}{safeToFixed(currentData.return)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                        <span className="text-xs font-medium text-gray-600">Benchmark Return ({activeTimeframe})</span>
                        <span className={`text-lg font-bold ${currentData.benchmark >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {currentData.benchmark > 0 ? '+' : ''}{safeToFixed(currentData.benchmark)}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-1">
                        <span className="text-sm font-semibold text-gray-800">Outperformance</span>
                        <span className={`text-xl font-bold ${(currentData.return - currentData.benchmark) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {(currentData.return - currentData.benchmark) > 0 ? '+' : ''}{safeToFixed(currentData.return - currentData.benchmark)}%
                        </span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3 h-3 text-blue-600" />
                        <span className="text-xs font-medium text-blue-800">Performance Analysis</span>
                      </div>
                      <p className="text-xs text-blue-700 leading-relaxed">
                        {(currentData.return - currentData.benchmark) >= 0 
                          ? `This fund has outperformed its benchmark by ${Math.abs(currentData.return - currentData.benchmark).toFixed(2)}% over the ${activeTimeframe} period.`
                          : `This fund has underperformed its benchmark by ${Math.abs(currentData.return - currentData.benchmark).toFixed(2)}% over the ${activeTimeframe} period.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Investment Calculator Widget */}
          <ReturnsCalculator
            fundName={fundData.basic_info.fund_identifiers.scheme_short_name}
            expectedReturn={fundData.performance.returns.ret_5year || 12}
            benchmarkReturn={12}
          />

          {/* Fund Overview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Asset Allocation */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                  <PieChart className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex flex-col space-y-4">
                  <div className="w-full flex justify-center overflow-hidden">
                    <div className="relative" style={{ width: '200px', height: '200px' }}>
                      <ChartContainer config={assetAllocationConfig} className="w-full h-full">
                        <RechartsPieChart width={200} height={200}>
                          <Pie
                            data={assetAllocationData}
                            cx={100}
                            cy={100}
                            innerRadius={60}
                            outerRadius={90}
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
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {assetAllocationData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-gray-700">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{safeToFixed(item.value, 1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Analysis */}
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                  Risk Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3 text-base">Risk Metrics (3 Years)</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          Standard Deviation
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={10} className="text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Measures how much the fund's returns vary from its average return. Higher values indicate more volatility.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{safeToFixed(fundData.risk_analytics.risk_measures.standard_deviation_3year)}%</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          Sharpe Ratio
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={10} className="text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Measures risk-adjusted returns. Higher values indicate better returns per unit of risk taken.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{safeToFixed(fundData.risk_analytics.performance_ratios.sharpe_ratio_3year)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          Beta
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={10} className="text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Measures the fund's sensitivity to market movements. Beta of 1 means it moves with the market.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{safeToFixed(fundData.risk_analytics.beta_metrics.beta_3year)}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                          Alpha
                          <Tooltip>
                            <TooltipTrigger>
                              <Info size={10} className="text-gray-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Measures the fund's performance relative to its benchmark. Positive alpha indicates outperformance.</p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <div className="text-lg font-bold text-gray-900">{safeToFixed(fundData.risk_analytics.alpha_metrics.alpha_3year)}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-base">Risk Level</h4>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600 mb-1">
                        {fundData.basic_info.fund_classification.risk_level}
                      </div>
                      <div className="text-sm text-gray-600">Risk Rating</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Portfolio Holdings */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Building className="w-5 h-5 text-blue-600" />
                Top Holdings
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              {fundData.portfolio.top_holdings.equity_holdings.length > 0 ? (
                <>
                  <div className="block sm:hidden space-y-3">
                    {fundData.portfolio.top_holdings.equity_holdings.map((holding, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium text-gray-900 text-sm">{holding.company_name}</div>
                          <div className="font-bold text-gray-900 text-sm">{safeToFixed(holding.percentage_holding)}%</div>
                        </div>
                        <div className="text-xs text-gray-600">{holding.sector}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="hidden sm:block rounded-md border overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow className="hover:bg-transparent">
                          <TableHead className="text-left font-semibold text-gray-900">Company</TableHead>
                          <TableHead className="text-center font-semibold text-gray-900">Sector</TableHead>
                          <TableHead className="text-right font-semibold text-gray-900">% Assets</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {fundData.portfolio.top_holdings.equity_holdings.map((holding, index) => (
                          <TableRow key={index} className="hover:bg-gray-50/50">
                            <TableCell className="text-left font-medium text-gray-900 py-4">{holding.company_name}</TableCell>
                            <TableCell className="text-center text-gray-600 py-4">{holding.sector}</TableCell>
                            <TableCell className="text-right font-semibold text-gray-900 py-4">{safeToFixed(holding.percentage_holding)}%</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Building className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No detailed holdings data available for this fund.</p>
                  <p className="text-sm mt-1">Portfolio changes and sector allocation are available below.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sector Allocation */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                Sector Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 flex justify-center items-center">
                  <div className="relative" style={{ width: '280px', height: '280px' }}>
                    <ChartContainer config={sectorChartConfig} className="w-full h-full">
                      <RechartsPieChart width={280} height={280}>
                        <Pie
                          data={sectorData}
                          cx={140}
                          cy={140}
                          innerRadius={80}
                          outerRadius={120}
                          dataKey="allocation"
                          stroke="#ffffff"
                          strokeWidth={2}
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          content={<ChartTooltipContent />}
                          formatter={(value, name, props) => [
                            `${safeToFixed(value as number, 1)}%`, 
                            props.payload.sector
                          ]}
                        />
                      </RechartsPieChart>
                    </ChartContainer>
                  </div>
                </div>
                
                <div className="w-full lg:w-1/2">
                  <h4 className="font-semibold text-base mb-3">Sector Breakdown</h4>
                  <div className="space-y-2">
                    {sectorData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full flex-shrink-0" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-sm font-medium text-gray-700">{item.sector}</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">{safeToFixed(item.allocation, 1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fund vs Category Comparison */}
          <FundVsCategoryComparison
            fundReturns={fundData.performance.returns}
            categoryReturns={fundData.performance.category_comparison.returns}
            categoryName={fundData.performance.category_comparison.category_name}
          />

          {/* Peer Comparison - Only show if data exists */}
          {fundData.peer_comparison && (
            <PeerComparison
              currentFund={{
                name: fundData.basic_info.fund_identifiers.scheme_short_name,
                nav: fundData.performance.current_nav.price,
                returns: {
                  ret_6month: fundData.performance.returns.ret_6month || 0,
                  ret_1year: fundData.performance.returns.ret_1year || 0,
                  ret_3year: fundData.performance.returns.ret_3year || 0,
                }
              }}
              peerFunds={fundData.peer_comparison.peer_funds}
              categoryName={fundData.peer_comparison.category}
              categoryAverages={fundData.peer_comparison.category_averages}
            />
          )}

          {/* Fund Manager Details */}
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base lg:text-lg">
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-purple-600" />
                Fund Manager Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="text-center sm:text-left">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {fundData.fund_structure.fund_managers[0]?.manager_name || 'N/A'}
                      </h3>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                          Lead Fund Manager
                        </Badge>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          {safeToFixed(fundData.basic_info.fund_lifecycle.fund_age_years, 0)}+ Years Experience
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed text-center sm:text-left">
                      A seasoned investment professional with over {safeToFixed(fundData.basic_info.fund_lifecycle.fund_age_years, 0)} years of experience in equity research and fund management. 
                      Known for consistent performance and a disciplined investment approach focused on quality growth stocks.
                    </p>
                  </div>
                  
                  <div className="w-full sm:w-32 flex justify-center sm:block">
                    <div className="bg-gray-50 rounded-lg p-4 text-center min-w-[120px]">
                      <div className="text-2xl font-bold text-gray-900">{safeToFixed(fundData.basic_info.fund_lifecycle.fund_age_years, 0)}+</div>
                      <div className="text-sm text-gray-600 mt-1">Years Experience</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg flex items-center gap-1">
                  Exit Load
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Fee charged when you exit/redeem your investment before a specified period.</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg font-semibold mb-2">
                  {formatExitLoad(fundData.fund_structure.expenses.exit_load)}
                </div>
                <div className="text-sm text-gray-600">Exit Load Policy</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg">Fund Age</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-xl lg:text-2xl font-bold mb-2">{safeToFixed(fundData.basic_info.fund_lifecycle.fund_age_years, 0)} Years</div>
                <div className="text-sm text-gray-600">Since inception</div>
              </CardContent>
            </Card>

            <Card className="bg-white/80 backdrop-blur-sm sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-base lg:text-lg flex items-center gap-1">
                  Investment Options
                  <Tooltip>
                    <TooltipTrigger>
                      <Info size={14} className="text-gray-500" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Different ways you can invest in this fund - lump sum, SIP (Systematic Investment Plan), etc.</p>
                    </TooltipContent>
                  </Tooltip>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 text-sm">
                  {fundData.basic_info.plan_details.systematic_plans.map((plan, index) => (
                    <div key={index}>✓ {plan} Available</div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Research Sharing Component */}
          <ResearchSharing />

          {/* Final CTA */}
          <div className="text-center py-6 lg:py-8">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 lg:px-12 py-3 lg:py-4 text-base lg:text-lg h-auto w-full sm:w-auto">
              Start Investing Today
            </Button>
            <p className="text-sm text-gray-600 mt-3 px-4">
              Start your investment journey with as low as ₹500 per month
            </p>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default MutualFundDetails;

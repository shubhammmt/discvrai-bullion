import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, Activity, BarChart3 } from 'lucide-react';

interface PerformanceAnalysisProps {
  benchmarkComparison: {
    portfolio: Record<string, number>;
    benchmark: Record<string, number>;
    nifty50: Record<string, number>;
  };
  metrics: {
    sharpeRatio: number;
    beta: number;
    alpha: number;
    standardDeviation: number;
    maxDrawdown: number;
    informationRatio: number;
    treynorRatio: number;
    portfolioTurnover: number;
  };
}

const PerformanceAnalysis: React.FC<PerformanceAnalysisProps> = ({ 
  benchmarkComparison, 
  metrics 
}) => {
  const [activeTab, setActiveTab] = useState('returns');

  // Transform data for charts
  const performanceData = Object.keys(benchmarkComparison.portfolio).map(period => ({
    period,
    portfolio: benchmarkComparison.portfolio[period],
    benchmark: benchmarkComparison.benchmark[period],
    nifty50: benchmarkComparison.nifty50[period]
  }));

  const riskMetrics = [
    { name: 'Sharpe Ratio', value: metrics.sharpeRatio, description: 'Risk-adjusted return', benchmark: 0.5 },
    { name: 'Beta', value: metrics.beta, description: 'Market sensitivity', benchmark: 1.0 },
    { name: 'Alpha', value: metrics.alpha, description: 'Excess return vs market', benchmark: 0 },
    { name: 'Std Deviation', value: metrics.standardDeviation, description: 'Volatility measure', benchmark: 15 },
    { name: 'Max Drawdown', value: metrics.maxDrawdown, description: 'Maximum decline', benchmark: 20 },
    { name: 'Information Ratio', value: metrics.informationRatio, description: 'Active return efficiency', benchmark: 0.3 }
  ];

  const getRiskLevel = (metric: string, value: number) => {
    switch (metric) {
      case 'Sharpe Ratio':
        return value > 0.7 ? 'Excellent' : value > 0.5 ? 'Good' : value > 0.3 ? 'Fair' : 'Poor';
      case 'Beta':
        return value < 0.8 ? 'Conservative' : value < 1.2 ? 'Moderate' : 'Aggressive';
      case 'Alpha':
        return value > 2 ? 'Excellent' : value > 0 ? 'Good' : 'Underperforming';
      case 'Max Drawdown':
        return value < 10 ? 'Low Risk' : value < 20 ? 'Moderate Risk' : 'High Risk';
      default:
        return 'Normal';
    }
  };

  const getRiskColor = (metric: string, value: number) => {
    const level = getRiskLevel(metric, value);
    switch (level) {
      case 'Excellent':
      case 'Good':
      case 'Low Risk':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Conservative':
      case 'Moderate':
      case 'Fair':
      case 'Moderate Risk':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Aggressive':
      case 'High Risk':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-red-100 text-red-800 border-red-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Performance Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="returns">Returns Comparison</TabsTrigger>
            <TabsTrigger value="risk">Risk Metrics</TabsTrigger>
            <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="returns" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                  <Bar dataKey="portfolio" fill="#3B82F6" name="Portfolio" />
                  <Bar dataKey="benchmark" fill="#10B981" name="Benchmark" />
                  <Bar dataKey="nifty50" fill="#F59E0B" name="Nifty 50" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {performanceData.map((data) => {
                const outperformance = data.portfolio - data.benchmark;
                return (
                  <div key={data.period} className="p-3 bg-muted rounded-lg">
                    <p className="font-semibold text-sm">{data.period}</p>
                    <p className="text-lg font-bold">{data.portfolio}%</p>
                    <p className="text-xs text-muted-foreground">
                      vs Benchmark: {outperformance > 0 ? '+' : ''}{outperformance.toFixed(1)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {riskMetrics.map((metric) => (
                <Card key={metric.name} className="p-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{metric.name}</p>
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getRiskColor(metric.name, metric.value)}`}
                      >
                        {getRiskLevel(metric.name, metric.value)}
                      </Badge>
                    </div>
                    <p className="text-2xl font-bold">{metric.value.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                    <div className="flex items-center gap-1 text-xs">
                      <span>Benchmark: {metric.benchmark}</span>
                      {metric.value > metric.benchmark ? (
                        <TrendingUp className="w-3 h-3 text-green-600" />
                      ) : (
                        <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number, name: string) => [`${value}%`, name]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="portfolio" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    name="Portfolio"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Benchmark"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="nifty50" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    name="Nifty 50"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceAnalysis;
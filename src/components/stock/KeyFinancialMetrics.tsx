
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Brain, TrendingUp, TrendingDown, DollarSign, Percent } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface KeyFinancialMetricsProps {
  stockData: any;
  aiAnalysis: any;
}

const KeyFinancialMetrics = ({ stockData, aiAnalysis }: KeyFinancialMetricsProps) => {
  const metrics = [
    {
      label: 'P/E Ratio',
      value: stockData.pe,
      icon: BarChart3,
      status: 'warning',
      note: 'Above sector avg',
      color: 'orange',
      tooltip: 'Price-to-Earnings ratio. Above sector average of 25x'
    },
    {
      label: 'ROE',
      value: `${stockData.roe}%`,
      icon: TrendingUp,
      status: 'good',
      note: 'Excellent',
      color: 'green',
      tooltip: 'Return on Equity - measures profitability'
    },
    {
      label: 'EPS',
      value: `₹${stockData.eps}`,
      icon: DollarSign,
      status: 'good',
      note: 'Strong',
      color: 'blue',
      tooltip: 'Earnings Per Share - profit per share'
    },
    {
      label: 'Div Yield',
      value: `${stockData.dividendYield}%`,
      icon: Percent,
      status: 'neutral',
      note: 'Low but growing',
      color: 'purple',
      tooltip: 'Dividend Yield - annual dividend percentage'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      orange: 'from-orange-50 to-orange-100 border-orange-200 text-orange-600',
      green: 'from-green-50 to-green-100 border-green-200 text-green-600',
      blue: 'from-blue-50 to-blue-100 border-blue-200 text-blue-600',
      purple: 'from-purple-50 to-purple-100 border-purple-200 text-purple-600'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <TooltipProvider>
      <Card className="border-0 shadow-sm bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900">Key Financial Metrics</CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 border-emerald-200">
                  <Brain size={12} className="mr-1" />
                  AI Enhanced
                </Badge>
                <span className="text-sm text-gray-500">Real-time analysis</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {metrics.map((metric, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div className={`group p-4 bg-gradient-to-br ${getColorClasses(metric.color)} rounded-xl border hover:shadow-md transition-all duration-200 cursor-help`}>
                    <div className="flex items-center gap-2 mb-3">
                      <metric.icon size={16} className={`${metric.color === 'orange' ? 'text-orange-600' : 
                        metric.color === 'green' ? 'text-green-600' : 
                        metric.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} />
                      <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                        {metric.label}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</div>
                    <div className={`text-xs font-medium ${
                      metric.color === 'orange' ? 'text-orange-600' : 
                      metric.color === 'green' ? 'text-green-600' : 
                      metric.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                    }`}>
                      {metric.note}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{metric.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Brain size={18} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800 mb-1">AI Metrics Analysis</p>
                <p className="text-sm text-blue-700 leading-relaxed">{aiAnalysis.keyMetricsAnalysis}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default KeyFinancialMetrics;

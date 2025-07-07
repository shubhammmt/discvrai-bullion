
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { TrendingUp, Target } from 'lucide-react';

interface FundVsCategoryProps {
  fundReturns: {
    ret_1week: number;
    ret_1month: number;
    ret_3month: number;
    ret_6month: number;
    ret_1year: number;
    ret_3year: number;
    ret_5year: number;
  };
  categoryReturns: {
    "1_week": number;
    "1_month": number;
    "3_month": number;
    "6_month": number;
    "1_year": number;
    "3_year": number;
    "5_year": number;
  };
  categoryName: string;
}

const FundVsCategoryComparison = ({ fundReturns, categoryReturns, categoryName }: FundVsCategoryProps) => {
  const comparisonData = [
    { 
      period: '1W', 
      fund: fundReturns.ret_1week, 
      category: categoryReturns["1_week"],
      outperformance: fundReturns.ret_1week - categoryReturns["1_week"]
    },
    { 
      period: '1M', 
      fund: fundReturns.ret_1month, 
      category: categoryReturns["1_month"],
      outperformance: fundReturns.ret_1month - categoryReturns["1_month"]
    },
    { 
      period: '3M', 
      fund: fundReturns.ret_3month, 
      category: categoryReturns["3_month"],
      outperformance: fundReturns.ret_3month - categoryReturns["3_month"]
    },
    { 
      period: '6M', 
      fund: fundReturns.ret_6month, 
      category: categoryReturns["6_month"],
      outperformance: fundReturns.ret_6month - categoryReturns["6_month"]
    },
    { 
      period: '1Y', 
      fund: fundReturns.ret_1year, 
      category: categoryReturns["1_year"],
      outperformance: fundReturns.ret_1year - categoryReturns["1_year"]
    },
    { 
      period: '3Y', 
      fund: fundReturns.ret_3year, 
      category: categoryReturns["3_year"],
      outperformance: fundReturns.ret_3year - categoryReturns["3_year"]
    },
    { 
      period: '5Y', 
      fund: fundReturns.ret_5year, 
      category: categoryReturns["5_year"],
      outperformance: fundReturns.ret_5year - categoryReturns["5_year"]
    }
  ];

  const chartConfig = {
    fund: {
      label: "This Fund",
      color: "#3b82f6",
    },
    category: {
      label: "Category Average",
      color: "#10b981",
    },
  };

  const avgOutperformance = comparisonData.reduce((sum, item) => sum + item.outperformance, 0) / comparisonData.length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="w-5 h-5 text-blue-600" />
          Fund vs Category Performance
        </CardTitle>
        <p className="text-sm text-gray-600">
          Comparing against {categoryName} average returns
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Performance Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Overall Performance</h4>
                <p className="text-sm text-gray-600">
                  {avgOutperformance >= 0 ? 'Outperforming' : 'Underperforming'} category average
                </p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${avgOutperformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {avgOutperformance > 0 ? '+' : ''}{avgOutperformance.toFixed(2)}%
                </div>
                <div className="text-sm text-gray-600">Avg. Difference</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={comparisonData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <XAxis 
                    dataKey="period" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#374151', fontWeight: 600 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11, fill: '#6b7280' }}
                    domain={['dataMin - 2', 'dataMax + 2']}
                  />
                  <ChartTooltip 
                    content={<ChartTooltipContent />}
                    cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                  />
                  <Bar 
                    dataKey="fund" 
                    fill="#3b82f6"
                    radius={[4, 4, 0, 0]}
                    name="This Fund"
                  />
                  <Bar 
                    dataKey="category" 
                    fill="#10b981"
                    radius={[4, 4, 0, 0]}
                    name="Category Avg"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>

          {/* Detailed Comparison Table */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 mb-3">Period-wise Comparison</h4>
            {comparisonData.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-900 w-8">{item.period}</span>
                  <div className="flex gap-6">
                    <div className="text-sm">
                      <span className="text-gray-600">Fund: </span>
                      <span className="font-medium text-blue-600">{item.fund.toFixed(2)}%</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Category: </span>
                      <span className="font-medium text-green-600">{item.category.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
                <div className={`text-sm font-bold ${item.outperformance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.outperformance > 0 ? '+' : ''}{item.outperformance.toFixed(2)}%
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundVsCategoryComparison;

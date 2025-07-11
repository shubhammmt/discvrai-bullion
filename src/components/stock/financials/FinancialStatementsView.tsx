
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QUARTERLY_RESULTS, ANNUAL_RESULTS, AI_FINANCIAL_INSIGHTS } from '@/data/financialMockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react';

const FinancialStatementsView: React.FC = () => {
  const [viewType, setViewType] = useState<'table' | 'chart'>('table');
  const [dataType, setDataType] = useState<'total' | 'growth'>('total');

  // Prepare chart data for quarterly results
  const chartData = QUARTERLY_RESULTS[0].data.slice(-6).map((point, index) => {
    const dataPoint: any = { period: point.period };
    QUARTERLY_RESULTS.forEach(section => {
      dataPoint[section.title] = section.data[section.data.length - 6 + index]?.value || 0;
    });
    return dataPoint;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ₹{entry.value?.toLocaleString('en-IN')} Cr
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* AI-Powered Summary */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border-purple-200 dark:border-purple-800">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-blue-600">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">AI Powered Summary</h2>
            <p className="text-muted-foreground mb-4">{AI_FINANCIAL_INSIGHTS.summary}</p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Mode
            </Button>
          </div>
        </div>
      </Card>

      {/* Key Highlights */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="font-semibold text-green-600">Strengths</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {AI_FINANCIAL_INSIGHTS.keyHighlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-2 flex-shrink-0" />
                {highlight}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <h3 className="font-semibold text-yellow-600">Risks</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {AI_FINANCIAL_INSIGHTS.risks.map((risk, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-600 mt-2 flex-shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Target className="h-5 w-5 text-blue-600" />
            <h3 className="font-semibold text-blue-600">Opportunities</h3>
          </div>
          <ul className="space-y-2 text-sm">
            {AI_FINANCIAL_INSIGHTS.opportunities.map((opportunity, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                {opportunity}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Financial Statements */}
      <Card className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold">Consolidated Quarterly Results (in ₹ Crores)</h2>
            <Button variant="outline" size="sm">View Standalone</Button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-muted rounded-md p-1">
              <Button
                variant={viewType === 'table' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('table')}
                className="h-8 px-3"
              >
                📊 Total Figures
              </Button>
              <Button
                variant={viewType === 'chart' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewType('chart')}
                className="h-8 px-3"
              >
                📈 QoQ Changes
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="quarterly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="quarterly">Quarterly Results</TabsTrigger>
            <TabsTrigger value="annual">Annual Results</TabsTrigger>
          </TabsList>
          
          <TabsContent value="quarterly" className="mt-6">
            {viewType === 'table' ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-medium">Metric</th>
                      {QUARTERLY_RESULTS[0].data.slice(-6).map(point => (
                        <th key={point.period} className="text-right p-3 font-medium min-w-[100px]">
                          {point.period}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {QUARTERLY_RESULTS.map((section, index) => (
                      <tr key={index} className="border-b border-border hover:bg-muted/50">
                        <td className="p-3 font-medium">{section.title}</td>
                        {section.data.slice(-6).map((point, pointIndex) => (
                          <td key={pointIndex} className="text-right p-3 font-mono">
                            {point.value.toLocaleString('en-IN')}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="period" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="Sales" fill="#3b82f6" />
                    <Bar dataKey="Operating Profit" fill="#10b981" />
                    <Bar dataKey="Net Profit" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </TabsContent>

          <TabsContent value="annual" className="mt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-medium">Metric</th>
                    {ANNUAL_RESULTS[0].data.slice(-5).map(point => (
                      <th key={point.period} className="text-right p-3 font-medium min-w-[100px]">
                        {point.period}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ANNUAL_RESULTS.map((section, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="p-3 font-medium">{section.title}</td>
                      {section.data.slice(-5).map((point, pointIndex) => (
                        <td key={pointIndex} className="text-right p-3">
                          <div className="font-mono">{point.value.toLocaleString('en-IN')}</div>
                          {point.growth && (
                            <div className={`text-xs ${point.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {point.growth > 0 ? '+' : ''}{point.growth.toFixed(1)}%
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default FinancialStatementsView;

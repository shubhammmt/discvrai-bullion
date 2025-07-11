
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  SHAREHOLDING_PATTERN, 
  PROMOTERS_HOLDING, 
  SHAREHOLDING_HISTORY, 
  MARKET_TRANSACTIONS 
} from '@/data/financialMockData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Info, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const ShareholdingAnalysis: React.FC = () => {
  const [historyView, setHistoryView] = useState<'quarterly' | 'yearly'>('quarterly');

  // Prepare pie chart data
  const pieData = SHAREHOLDING_PATTERN.map(item => ({
    name: item.category,
    value: item.percentage,
    color: item.color
  }));

  // Promoters holding pie data
  const promotersData = [
    { name: 'Unpledged Holding', value: PROMOTERS_HOLDING.unpledged, color: '#3b82f6' },
    { name: 'Pledged Holding', value: PROMOTERS_HOLDING.pledged, color: '#f97316' }
  ];

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm" style={{ color: payload[0].color }}>
            {payload[0].value.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'Buy':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      case 'Sell':
      case 'Disposal':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
      default:
        return 'text-blue-600 bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Shareholding Pattern & Promoters Holding */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Shareholding Pattern */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 text-center">Shareholding Pattern</h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  L
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {SHAREHOLDING_PATTERN.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium">{item.category}</span>
                </div>
                <span className="font-bold">{item.percentage.toFixed(2)}%</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-4">
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>100.00%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Promoters Holding */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6 text-center">Promoters Holding</h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <ResponsiveContainer width={200} height={200}>
                <PieChart>
                  <Pie
                    data={promotersData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {promotersData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomPieTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              
              {/* Center Logo */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                  L
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-blue-600" />
                <span className="font-medium">Unpledged Holding</span>
              </div>
              <span className="font-bold">{PROMOTERS_HOLDING.unpledged.toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded bg-orange-500" />
                <span className="font-medium">Pledged Holding</span>
              </div>
              <span className="font-bold">{PROMOTERS_HOLDING.pledged.toFixed(2)}%</span>
            </div>
            <div className="border-t border-border pt-2 mt-4">
              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span>{PROMOTERS_HOLDING.total.toFixed(2)}%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Shareholding History */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Shareholding History</h3>
          <div className="flex bg-muted rounded-md p-1">
            <Button
              variant={historyView === 'quarterly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setHistoryView('quarterly')}
              className="h-8 px-3"
            >
              Quarterly
            </Button>
            <Button
              variant={historyView === 'yearly' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setHistoryView('yearly')}
              className="h-8 px-3"
            >
              Yearly
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium min-w-[120px]">Period</th>
                <th className="text-right p-3 font-medium">Promoters</th>
                <th className="text-right p-3 font-medium">FIIs</th>
                <th className="text-right p-3 font-medium">DIIs</th>
                <th className="text-right p-3 font-medium">Public</th>
                <th className="text-right p-3 font-medium">Total Shareholders</th>
              </tr>
            </thead>
            <tbody>
              {SHAREHOLDING_HISTORY.slice(-8).map((item, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="p-3 font-medium">{item.period}</td>
                  <td className="text-right p-3 font-mono">{item.promoters.toFixed(2)}%</td>
                  <td className="text-right p-3 font-mono">{item.fiis.toFixed(2)}%</td>
                  <td className="text-right p-3 font-mono">{item.diis.toFixed(2)}%</td>
                  <td className="text-right p-3 font-mono">{item.public.toFixed(2)}%</td>
                  <td className="text-right p-3 font-mono">{item.totalShareholders.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Market Transactions */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Market Transactions</h3>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">Category</Button>
            <Button variant="outline" size="sm">Filter</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Party</th>
                <th className="text-left p-3 font-medium">Category</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-right p-3 font-medium">Avg Price (₹)</th>
                <th className="text-right p-3 font-medium">Total Value (₹)</th>
                <th className="text-right p-3 font-medium">Quantity</th>
                <th className="text-right p-3 font-medium">Percent Traded</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_TRANSACTIONS.map((transaction, index) => (
                <tr key={index} className="border-b border-border hover:bg-muted/50">
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3 max-w-[200px] truncate" title={transaction.party}>
                    {transaction.party}
                  </td>
                  <td className="p-3">
                    <Badge variant="outline" className="text-xs">
                      {transaction.category}
                    </Badge>
                  </td>
                  <td className="p-3">
                    <Badge className={cn("text-xs", getTransactionTypeColor(transaction.type))}>
                      {transaction.type}
                    </Badge>
                  </td>
                  <td className="text-right p-3 font-mono">{transaction.avgPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</td>
                  <td className="text-right p-3 font-mono">{transaction.totalValue.toLocaleString('en-IN')} Cr</td>
                  <td className="text-right p-3 font-mono">{transaction.quantity.toLocaleString('en-IN')}</td>
                  <td className="text-right p-3 font-mono">{transaction.percentTraded.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-center">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>←</span>
            <span className="px-2 py-1 bg-primary text-primary-foreground rounded">1</span>
            <span className="cursor-pointer hover:text-foreground">2</span>
            <span>→</span>
            <span>Showing 1-10 of 13</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ShareholdingAnalysis;

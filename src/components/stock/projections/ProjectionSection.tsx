
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, Crown, Lock, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ProjectionSection: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);

  // Mock projection data
  const revenueProjections = [
    { period: 'Q1 2024', actual: 2150, projected: null, growth: 15.2 },
    { period: 'Q2 2024', actual: 2280, projected: null, growth: 18.5 },
    { period: 'Q3 2024', actual: 2450, projected: null, growth: 22.1 },
    { period: 'Q4 2024', actual: null, projected: 2620, growth: 24.8 },
    { period: 'Q1 2025', actual: null, projected: 2780, growth: 29.3 },
    { period: 'Q2 2025', actual: null, projected: 2950, growth: 29.4 },
    { period: 'Q3 2025', actual: null, projected: 3140, growth: 28.2 },
    { period: 'Q4 2025', actual: null, projected: 3350, growth: 27.9 },
  ];

  const epsProjections = [
    { period: 'Q1 2024', actual: 12.5, projected: null, growth: 25.0 },
    { period: 'Q2 2024', actual: 13.8, projected: null, growth: 32.7 },
    { period: 'Q3 2024', actual: 15.2, projected: null, growth: 38.2 },
    { period: 'Q4 2024', actual: null, projected: 16.8, growth: 34.4 },
    { period: 'Q1 2025', actual: null, projected: 18.5, growth: 48.0 },
    { period: 'Q2 2025', actual: null, projected: 20.1, growth: 45.7 },
    { period: 'Q3 2025', actual: null, projected: 21.8, growth: 43.4 },
    { period: 'Q4 2025', actual: null, projected: 23.2, growth: 38.1 },
  ];

  const yearlyProjections = [
    { year: '2022', revenue: 7800, eps: 42.3 },
    { year: '2023', revenue: 8750, eps: 48.9 },
    { year: '2024E', revenue: 9500, eps: 58.3 },
    { year: '2025E', revenue: 12220, eps: 83.6 },
    { year: 'Target', revenue: 15000, eps: 110.0 },
  ];

  const keyMetrics = [
    { metric: 'Revenue CAGR (2024-2025E)', value: '28.6%', trend: 'up' },
    { metric: 'EPS CAGR (2024-2025E)', value: '43.4%', trend: 'up' },
    { metric: 'Price Target (12M)', value: '₹3,850', trend: 'up' },
    { metric: 'Upside Potential', value: '45.2%', trend: 'up' },
  ];

  if (!isUnlocked) {
    return (
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-[2px]" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Crown className="h-5 w-5 text-primary" />
            <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white">
              Premium
            </Badge>
          </div>
          
          <div className="text-center py-12">
            <Lock className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Unlock Premium Projections</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Get access to detailed EPS & Revenue projections, analyst consensus, and price targets 
              with our premium subscription.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-6 max-w-md mx-auto">
              <div className="text-center p-3 bg-card border rounded-lg">
                <div className="text-2xl font-bold text-primary">12M</div>
                <div className="text-sm text-muted-foreground">Projections</div>
              </div>
              <div className="text-center p-3 bg-card border rounded-lg">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Scenarios</div>
              </div>
            </div>
            
            <Button onClick={() => setIsUnlocked(true)} className="bg-gradient-to-r from-primary to-primary/80">
              <Crown className="h-4 w-4 mr-2" />
              Upgrade to Premium
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Crown className="h-5 w-5 text-primary" />
        <Badge className="bg-gradient-to-r from-primary to-primary/80 text-white">
          Premium
        </Badge>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {keyMetrics.map((item, index) => (
          <div key={index} className="p-4 bg-card border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">{item.metric}</span>
              {item.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </div>
            <div className="text-xl font-bold">{item.value}</div>
          </div>
        ))}
      </div>

      <Tabs defaultValue="quarterly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="quarterly">Quarterly View</TabsTrigger>
          <TabsTrigger value="yearly">Yearly View</TabsTrigger>
        </TabsList>

        <TabsContent value="quarterly" className="space-y-6">
          {/* Revenue Projections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Revenue Projections (₹ Cr)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${value} Cr`, 
                    name === 'actual' ? 'Actual' : 'Projected'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  name="actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 4 }}
                  name="projected"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* EPS Projections */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Earnings Per Share (₹)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={epsProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    `₹${value}`, 
                    name === 'actual' ? 'Actual' : 'Projected'
                  ]}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                  name="actual"
                />
                <Line 
                  type="monotone" 
                  dataKey="projected" 
                  stroke="hsl(var(--chart-2))" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ fill: 'hsl(var(--chart-2))', strokeWidth: 2, r: 4 }}
                  name="projected"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>

        <TabsContent value="yearly" className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Annual Performance & Targets</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={yearlyProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis yAxisId="left" orientation="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Bar 
                  yAxisId="left"
                  dataKey="revenue" 
                  fill="hsl(var(--primary))" 
                  name="Revenue (₹ Cr)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  yAxisId="right"
                  dataKey="eps" 
                  fill="hsl(var(--chart-2))" 
                  name="EPS (₹)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Insights */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-chart-2/5 border rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-medium text-primary">AI Projection Insights</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Based on current momentum and market conditions, LODHA shows strong growth trajectory with 
          revenue expected to grow at 28.6% CAGR. EPS projections indicate robust profitability improvement 
          driven by operational efficiency and margin expansion.
        </p>
      </div>
    </Card>
  );
};

export default ProjectionSection;

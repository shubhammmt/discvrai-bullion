import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { PieChart as PieIcon, BarChart3, Building2, TrendingUp, Shield } from 'lucide-react';

interface PortfolioCompositionProps {
  allocation: {
    assetClass: Array<{
      name: string;
      value: number;
      target: number;
      color: string;
    }>;
    sectors: Array<{
      name: string;
      value: number;
      color: string;
    }>;
    marketCap: Array<{
      name: string;
      value: number;
      color: string;
    }>;
  };
  funds: Array<{
    category: string;
    scheme: string;
    currentValue: number;
  }>;
}

const PortfolioComposition: React.FC<PortfolioCompositionProps> = ({ 
  allocation, 
  funds 
}) => {
  const [activeTab, setActiveTab] = useState('allocation');

  // Calculate plan type distribution
  const planTypeDistribution = funds.reduce((acc, fund) => {
    const planType = fund.scheme.includes('Direct') ? 'Direct' : 'Regular';
    acc[planType] = (acc[planType] || 0) + fund.currentValue;
    return acc;
  }, {} as Record<string, number>);

  const totalValue = Object.values(planTypeDistribution).reduce((sum, value) => sum + value, 0);
  const planTypeData = Object.entries(planTypeDistribution).map(([type, value]) => ({
    name: type,
    value: ((value / totalValue) * 100).toFixed(1),
    amount: value,
    color: type === 'Direct' ? '#10B981' : '#F59E0B'
  }));

  // AMC distribution
  const amcDistribution = funds.reduce((acc, fund) => {
    const amc = fund.category.split(' ')[0]; // Simplified AMC extraction
    acc[amc] = (acc[amc] || 0) + fund.currentValue;
    return acc;
  }, {} as Record<string, number>);

  const amcData = Object.entries(amcDistribution)
    .map(([amc, value]) => ({
      name: amc,
      value: ((value / totalValue) * 100).toFixed(1),
      amount: value
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(0)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const renderCustomTooltip = (active: boolean, payload: any[]) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-card p-3 border rounded-lg shadow-lg">
          <p className="font-semibold">{data.name}</p>
          <p className="text-sm text-muted-foreground">
            {data.value}% ({formatCurrency(data.amount || 0)})
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieIcon className="w-5 h-5" />
          Portfolio Composition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="allocation">Asset Mix</TabsTrigger>
            <TabsTrigger value="sectors">Sectors</TabsTrigger>
            <TabsTrigger value="plans">Plan Types</TabsTrigger>
            <TabsTrigger value="amc">Fund Houses</TabsTrigger>
          </TabsList>

          <TabsContent value="allocation" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocation.assetClass}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocation.assetClass.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
<Tooltip content={({ active, payload }: any) => renderCustomTooltip(active, payload)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Asset Allocation vs Target</h4>
                {allocation.assetClass.map((asset) => {
                  const deviation = asset.value - asset.target;
                  return (
                    <div key={asset.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: asset.color }}
                          />
                          <span className="text-sm font-medium">{asset.name}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold">{asset.value}%</span>
                          <Badge 
                            variant="outline" 
                            className={`ml-2 text-xs ${
                              Math.abs(deviation) <= 2 
                                ? 'bg-green-100 text-green-800 border-green-200'
                                : Math.abs(deviation) <= 5
                                ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                                : 'bg-red-100 text-red-800 border-red-200'
                            }`}
                          >
                            Target: {asset.target}%
                          </Badge>
                        </div>
                      </div>
                      {Math.abs(deviation) > 2 && (
                        <p className="text-xs text-muted-foreground">
                          {deviation > 0 ? 'Overweight' : 'Underweight'} by {Math.abs(deviation).toFixed(1)}%
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sectors" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocation.sectors}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                    >
                      {allocation.sectors.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
<Tooltip content={({ active, payload }: any) => renderCustomTooltip(active, payload)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Sector Breakdown</h4>
                {allocation.sectors.map((sector) => (
                  <div key={sector.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: sector.color }}
                      />
                      <span className="text-sm font-medium">{sector.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{sector.value}%</span>
                  </div>
                ))}
                
                {/* Sector Diversification Rule */}
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Diversification Rule</span>
                  </div>
                  <p className="text-xs text-blue-700">
                    Ideal: No single sector should exceed 25% to maintain balance. 
                    {allocation.sectors.some(s => s.value > 25) 
                      ? ' Warning: Some sectors are overweight.' 
                      : ' ✓ Good sector diversification maintained.'}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="plans" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={planTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {planTypeData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={({ active, payload }) => renderCustomTooltip(active, payload)} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Direct vs Regular Plans</h4>
                {planTypeData.map((plan) => (
                  <div key={plan.name} className="p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: plan.color }}
                        />
                        <span className="font-medium">{plan.name} Plans</span>
                      </div>
                      <Badge variant="outline">
                        {plan.value}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Value: {formatCurrency(plan.amount)}
                    </p>
                  </div>
                ))}
                
                {parseFloat(planTypeData.find(p => p.name === 'Regular')?.value || '0') > 20 && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Optimization Opportunity</span>
                    </div>
                    <p className="text-xs text-yellow-700">
                      Consider switching to Direct plans to reduce expense ratios and improve returns.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="amc" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={amcData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={80} />
                  <Tooltip 
                    formatter={(value: number) => [`${value}%`, 'Allocation']}
                  />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {amcData.map((amc) => (
                <div key={amc.name} className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-600" />
                      <span className="font-medium">{amc.name}</span>
                    </div>
                    <Badge variant="outline">
                      {amc.value}%
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {formatCurrency(amc.amount)}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PortfolioComposition;
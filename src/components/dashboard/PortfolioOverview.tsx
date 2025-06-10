
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, ArrowRight, Eye } from 'lucide-react';

const PortfolioOverview = () => {
  const portfolioData = {
    totalValue: 245000,
    totalGains: 15600,
    gainsPercent: 6.8,
    holdings: [
      { name: 'HDFC Top 100', value: 85000, gains: 8500, type: 'Mutual Fund' },
      { name: 'ICICI Bank', value: 45000, gains: 2100, type: 'Stock' },
      { name: 'Government Bond 2030', value: 50000, gains: 1200, type: 'Bond' },
      { name: 'HDFC FD', value: 65000, gains: 3800, type: 'FD' }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Portfolio Overview
          <Button variant="outline" size="sm">
            <Eye size={16} className="mr-1" />
            View All
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Total Value */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Total Portfolio Value</span>
            <div className="flex items-center gap-1 text-green-600">
              <TrendingUp size={16} />
              <span className="text-sm font-medium">+{portfolioData.gainsPercent}%</span>
            </div>
          </div>
          <p className="text-2xl font-bold">₹{portfolioData.totalValue.toLocaleString()}</p>
          <p className="text-sm text-green-600">+₹{portfolioData.totalGains.toLocaleString()} gains</p>
        </div>

        {/* Holdings */}
        <div className="space-y-3">
          {portfolioData.holdings.map((holding, index) => (
            <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium">{holding.name}</h4>
                <p className="text-xs text-gray-600">{holding.type}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{holding.value.toLocaleString()}</p>
                <p className="text-xs text-green-600">+₹{holding.gains.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PortfolioOverview;

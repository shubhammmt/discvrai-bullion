
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Brain } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface KeyFinancialMetricsProps {
  stockData: any;
  aiAnalysis: any;
}

const KeyFinancialMetrics = ({ stockData, aiAnalysis }: KeyFinancialMetricsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Key Financial Metrics
          <Badge variant="secondary">AI Enhanced</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <Tooltip>
            <TooltipTrigger>
              <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-200">
                <div className="text-lg font-bold text-orange-600">{stockData.pe}</div>
                <div className="text-xs text-gray-600">P/E Ratio</div>
                <div className="text-xs text-orange-600 mt-1">Above sector avg</div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Price-to-Earnings ratio. Above sector average of 25x</p>
            </TooltipContent>
          </Tooltip>

          <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="text-lg font-bold text-green-600">{stockData.roe}%</div>
            <div className="text-xs text-gray-600">ROE</div>
            <div className="text-xs text-green-600 mt-1">Excellent</div>
          </div>

          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-lg font-bold text-blue-600">₹{stockData.eps}</div>
            <div className="text-xs text-gray-600">EPS</div>
            <div className="text-xs text-blue-600 mt-1">Strong</div>
          </div>

          <div className="text-center p-3 bg-purple-50 rounded-lg border border-purple-200">
            <div className="text-lg font-bold text-purple-600">{stockData.dividendYield}%</div>
            <div className="text-xs text-gray-600">Div Yield</div>
            <div className="text-xs text-purple-600 mt-1">Low but growing</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">AI Metrics Analysis:</p>
              <p className="text-sm text-blue-700">{aiAnalysis.keyMetricsAnalysis}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyFinancialMetrics;

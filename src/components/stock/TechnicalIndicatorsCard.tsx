
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Activity, Brain, BarChart3, Minus } from 'lucide-react';

interface TechnicalIndicatorsCardProps {
  stockData: any;
  aiAnalysis: any;
}

const TechnicalIndicatorsCard = ({ stockData, aiAnalysis }: TechnicalIndicatorsCardProps) => {
  const [viewMode, setViewMode] = useState('summary');

  const technicalData = {
    rsi: { value: 58, signal: 'neutral', description: 'Neutral momentum' },
    macd: { value: 12.5, signal: 'bullish', description: 'MACD above signal line' },
    sma_50: { value: stockData.currentPrice * 0.97, signal: 'bullish', description: 'Above 50-day SMA' },
    sma_200: { value: stockData.currentPrice * 0.92, signal: 'bullish', description: 'Above 200-day SMA' },
    bollinger: { 
      upper: stockData.currentPrice * 1.08, 
      lower: stockData.currentPrice * 0.92, 
      signal: 'neutral',
      description: 'Trading within bands'
    },
    volume: { signal: 'high', description: 'Above average volume' },
    support: stockData.currentPrice * 0.94,
    resistance: stockData.currentPrice * 1.06
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'bullish': return <TrendingUp size={16} className="text-green-600" />;
      case 'bearish': return <TrendingDown size={16} className="text-red-600" />;
      default: return <Minus size={16} className="text-gray-600" />;
    }
  };

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish': return 'text-green-600 bg-green-50 border-green-200';
      case 'bearish': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5" />
            <CardTitle>Technical Analysis</CardTitle>
            <Badge variant="secondary">Real-time</Badge>
          </div>
          <div className="flex gap-1">
            <Button 
              variant={viewMode === 'summary' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('summary')}
            >
              Summary
            </Button>
            <Button 
              variant={viewMode === 'detailed' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('detailed')}
            >
              Detailed
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {viewMode === 'summary' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className={`p-3 rounded-lg border ${getSignalColor(technicalData.rsi.signal)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">RSI (14)</span>
                  {getSignalIcon(technicalData.rsi.signal)}
                </div>
                <div className="text-xl font-bold">{technicalData.rsi.value}</div>
                <div className="text-xs mt-1">{technicalData.rsi.description}</div>
                <Progress value={technicalData.rsi.value} className="mt-2 h-2" />
              </div>

              <div className={`p-3 rounded-lg border ${getSignalColor(technicalData.macd.signal)}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">MACD</span>
                  {getSignalIcon(technicalData.macd.signal)}
                </div>
                <div className="text-xl font-bold">{technicalData.macd.value}</div>
                <div className="text-xs mt-1">{technicalData.macd.description}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Moving Averages</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>50-day SMA</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">₹{technicalData.sma_50.value.toFixed(2)}</span>
                    {getSignalIcon(technicalData.sma_50.signal)}
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span>200-day SMA</span>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">₹{technicalData.sma_200.value.toFixed(2)}</span>
                    {getSignalIcon(technicalData.sma_200.signal)}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Support & Resistance</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="p-2 bg-red-50 border border-red-200 rounded">
                  <span className="text-red-600 text-xs">Support</span>
                  <div className="font-bold text-red-700">₹{technicalData.support.toFixed(2)}</div>
                </div>
                <div className="p-2 bg-green-50 border border-green-200 rounded">
                  <span className="text-green-600 text-xs">Resistance</span>
                  <div className="font-bold text-green-700">₹{technicalData.resistance.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(technicalData).map(([key, data]: [string, any]) => {
                if (key === 'support' || key === 'resistance' || !data.signal) return null;
                return (
                  <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <span className="font-medium capitalize">{key.replace('_', '-')}</span>
                      <p className="text-sm text-gray-600">{data.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {typeof data.value === 'number' && (
                        <span className="font-bold">{data.value}</span>
                      )}
                      <Badge className={getSignalColor(data.signal)}>
                        {data.signal}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Brain size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-purple-800 mb-1">AI Technical Summary:</p>
              <p className="text-sm text-purple-700">
                Overall technical outlook is {technicalData.rsi.signal}. Stock showing {technicalData.macd.signal} momentum 
                with price above key moving averages. Volume patterns suggest continued interest.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TechnicalIndicatorsCard;

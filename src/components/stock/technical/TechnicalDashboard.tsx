
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TECHNICAL_GAUGES, TECHNICAL_INDICATORS } from '@/data/stockMockData';
import { Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const TechnicalDashboard: React.FC = () => {
  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800';
      case 'bearish':
        return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800';
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800';
    }
  };

  const getSignalText = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'Bullish';
      case 'bearish':
        return 'Bearish';
      default:
        return 'Neutral';
    }
  };

  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return <TrendingUp className="h-4 w-4" />;
      case 'bearish':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getProgressColor = (signal: string) => {
    switch (signal) {
      case 'bullish':
        return 'bg-green-500';
      case 'bearish':
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold">Technicals</h2>
        <Info className="h-4 w-4 text-muted-foreground" />
      </div>

      {/* Technical Signals - Simplified Layout */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Oscillators */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Oscillators</h3>
              <div className="flex items-center gap-2">
                {getSignalIcon(TECHNICAL_GAUGES.oscillators.signal)}
                <Badge className={getSignalColor(TECHNICAL_GAUGES.oscillators.signal)}>
                  {getSignalText(TECHNICAL_GAUGES.oscillators.signal)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Signal Strength</span>
                <span className="font-medium">{TECHNICAL_GAUGES.oscillators.value}%</span>
              </div>
              <Progress 
                value={TECHNICAL_GAUGES.oscillators.value} 
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                <div className="font-medium text-red-600">{TECHNICAL_GAUGES.oscillators.breakdown.bearish}</div>
                <div className="text-red-600">Bearish</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="font-medium text-yellow-600">{TECHNICAL_GAUGES.oscillators.breakdown.neutral}</div>
                <div className="text-yellow-600">Neutral</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                <div className="font-medium text-green-600">{TECHNICAL_GAUGES.oscillators.breakdown.bullish}</div>
                <div className="text-green-600">Bullish</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Overall */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Overall</h3>
              <div className="flex items-center gap-2">
                {getSignalIcon(TECHNICAL_GAUGES.overall.signal)}
                <Badge className={getSignalColor(TECHNICAL_GAUGES.overall.signal)}>
                  {getSignalText(TECHNICAL_GAUGES.overall.signal)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Signal Strength</span>
                <span className="font-medium">{TECHNICAL_GAUGES.overall.value}%</span>
              </div>
              <Progress 
                value={TECHNICAL_GAUGES.overall.value} 
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                <div className="font-medium text-red-600">{TECHNICAL_GAUGES.overall.breakdown.bearish}</div>
                <div className="text-red-600">Bearish</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="font-medium text-yellow-600">{TECHNICAL_GAUGES.overall.breakdown.neutral}</div>
                <div className="text-yellow-600">Neutral</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                <div className="font-medium text-green-600">{TECHNICAL_GAUGES.overall.breakdown.bullish}</div>
                <div className="text-green-600">Bullish</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Moving Averages */}
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Moving Averages</h3>
              <div className="flex items-center gap-2">
                {getSignalIcon(TECHNICAL_GAUGES.movingAverages.signal)}
                <Badge className={getSignalColor(TECHNICAL_GAUGES.movingAverages.signal)}>
                  {getSignalText(TECHNICAL_GAUGES.movingAverages.signal)}
                </Badge>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Signal Strength</span>
                <span className="font-medium">{TECHNICAL_GAUGES.movingAverages.value}%</span>
              </div>
              <Progress 
                value={TECHNICAL_GAUGES.movingAverages.value} 
                className="h-2"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="text-center p-2 bg-red-50 rounded border border-red-200">
                <div className="font-medium text-red-600">{TECHNICAL_GAUGES.movingAverages.breakdown.bearish}</div>
                <div className="text-red-600">Bearish</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 rounded border border-yellow-200">
                <div className="font-medium text-yellow-600">{TECHNICAL_GAUGES.movingAverages.breakdown.neutral}</div>
                <div className="text-yellow-600">Neutral</div>
              </div>
              <div className="text-center p-2 bg-green-50 rounded border border-green-200">
                <div className="font-medium text-green-600">{TECHNICAL_GAUGES.movingAverages.breakdown.bullish}</div>
                <div className="text-green-600">Bullish</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Technical Indicators Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Technical Indicators</h3>
          <span className="text-sm text-primary cursor-pointer hover:underline">
            View detailed analysis
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TECHNICAL_INDICATORS.map((indicator, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="space-y-1">
                <div className="font-medium">{indicator.name}</div>
                <div className="text-sm text-muted-foreground">{indicator.description}</div>
              </div>
              <div className="text-right space-y-1">
                <div className="font-bold">{indicator.value.toFixed(1)}</div>
                <Badge 
                  className={getSignalColor(indicator.signal)}
                >
                  {getSignalText(indicator.signal)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default TechnicalDashboard;

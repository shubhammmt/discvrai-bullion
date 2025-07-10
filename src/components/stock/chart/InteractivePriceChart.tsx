import React from 'react';
import { Card } from '@/components/ui/card';

interface InteractivePriceChartProps {
  symbol: string;
}

const InteractivePriceChart: React.FC<InteractivePriceChartProps> = ({ symbol }) => {
  return (
    <Card className="p-6 h-96">
      <h2 className="text-xl font-bold mb-4">Interactive Price Chart - {symbol}</h2>
      <p className="text-muted-foreground">Price chart with Recharts will be implemented in Phase 2...</p>
    </Card>
  );
};

export default InteractivePriceChart;
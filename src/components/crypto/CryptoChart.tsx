import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface CryptoChartProps {
  symbol: string;
  period: "1D" | "1W" | "1M" | "3M" | "1Y" | "All";
}

export const CryptoChart = ({ symbol, period }: CryptoChartProps) => {
  // Mock chart data - replace with actual FMP API call
  const generateMockData = () => {
    const basePrice = 45000;
    const dataPoints = period === "1D" ? 24 : period === "1W" ? 7 : period === "1M" ? 30 : 90;
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const variance = (Math.random() - 0.5) * 2000;
      return {
        time: period === "1D" ? `${i}:00` : `Day ${i + 1}`,
        price: basePrice + variance + (i * 50),
      };
    });
  };

  const data = generateMockData();

  return (
    <div className="w-full h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/40" />
          <XAxis 
            dataKey="time" 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
          />
          <YAxis 
            className="text-xs"
            tick={{ fill: 'hsl(var(--muted-foreground))' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '6px'
            }}
            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
          />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="hsl(var(--primary))" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

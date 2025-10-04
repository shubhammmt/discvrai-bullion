import { Card } from "@/components/ui/card";

interface CryptoMetricsProps {
  metrics: {
    marketCap: number;
    volume24h: number;
    circulatingSupply: number;
    totalSupply: number;
    allTimeHigh: number;
    allTimeLow: number;
  };
}

export const CryptoMetrics = ({ metrics }: CryptoMetricsProps) => {
  const formatLargeNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return `$${num.toLocaleString()}`;
  };

  const metricsData = [
    {
      label: "Market Cap",
      value: formatLargeNumber(metrics.marketCap),
      description: "Total value of all coins"
    },
    {
      label: "24h Volume",
      value: formatLargeNumber(metrics.volume24h),
      description: "Trading volume in 24 hours"
    },
    {
      label: "Circulating Supply",
      value: `${(metrics.circulatingSupply / 1e6).toFixed(2)}M`,
      description: "Coins currently in circulation"
    },
    {
      label: "Total Supply",
      value: `${(metrics.totalSupply / 1e6).toFixed(2)}M`,
      description: "Maximum number of coins"
    },
    {
      label: "All-Time High",
      value: `$${metrics.allTimeHigh.toLocaleString()}`,
      description: "Highest price ever recorded"
    },
    {
      label: "All-Time Low",
      value: `$${metrics.allTimeLow.toLocaleString()}`,
      description: "Lowest price ever recorded"
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metricsData.map((metric) => (
        <Card key={metric.label} className="p-4">
          <div className="text-sm text-muted-foreground mb-1">{metric.label}</div>
          <div className="text-2xl font-bold mb-1">{metric.value}</div>
          <div className="text-xs text-muted-foreground">{metric.description}</div>
        </Card>
      ))}
    </div>
  );
};

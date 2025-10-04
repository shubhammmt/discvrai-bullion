import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface CryptoCardProps {
  crypto: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    changeAmount: number;
    marketCap: number;
    volume: number;
    sparkline?: number[];
  };
  onClick: () => void;
}

export const CryptoCard = ({ crypto, onClick }: CryptoCardProps) => {
  const isPositive = crypto.changePercent >= 0;

  return (
    <Card 
      className="p-6 hover:shadow-lg transition-all cursor-pointer group hover:border-primary/50"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold text-sm">
            {crypto.symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-semibold group-hover:text-primary transition-colors">
              {crypto.symbol}
            </div>
            <div className="text-xs text-muted-foreground">{crypto.name}</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-2xl font-bold">
          ${crypto.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
        </div>
        
        <Badge 
          variant={isPositive ? "default" : "destructive"}
          className={`${isPositive ? "bg-green-500" : ""}`}
        >
          {isPositive ? (
            <TrendingUp className="w-3 h-3 mr-1" />
          ) : (
            <TrendingDown className="w-3 h-3 mr-1" />
          )}
          {isPositive ? "+" : ""}{crypto.changePercent.toFixed(2)}%
        </Badge>

        {/* Mini Sparkline */}
        {crypto.sparkline && crypto.sparkline.length > 0 && (
          <div className="h-12 relative">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                strokeWidth="2"
                points={crypto.sparkline
                  .map((value, index) => {
                    const x = (index / (crypto.sparkline!.length - 1)) * 100;
                    const min = Math.min(...crypto.sparkline!);
                    const max = Math.max(...crypto.sparkline!);
                    const y = 100 - ((value - min) / (max - min)) * 100;
                    return `${x},${y}`;
                  })
                  .join(" ")}
              />
            </svg>
          </div>
        )}

        <div className="flex justify-between text-xs text-muted-foreground pt-2 border-t border-border/40">
          <div>
            <div>Vol</div>
            <div className="font-medium">
              ${(crypto.volume / 1e9).toFixed(2)}B
            </div>
          </div>
          <div className="text-right">
            <div>MCap</div>
            <div className="font-medium">
              ${(crypto.marketCap / 1e9).toFixed(2)}B
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

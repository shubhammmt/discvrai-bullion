import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Share2, Star, Bell, Newspaper } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

interface CryptoCurrencyCardProps {
  crypto: {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    volume: number;
    sparkline?: number[];
  };
}

export const CryptoCurrencyCard = ({ crypto }: CryptoCurrencyCardProps) => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const isPositive = crypto.changePercent >= 0;

  const periods = ['1D', '1W', '1M', '3M', '1Y'];

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${window.location.origin}/crypto/${crypto.symbol.toLowerCase()}`);
    toast({ title: "Link copied!", description: `${crypto.name} link copied to clipboard` });
  };

  const handleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Added to Watchlist", description: `${crypto.name} has been added to your watchlist` });
  };

  const handleAlert = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast({ title: "Alert Set", description: `You'll be notified about ${crypto.name} price changes` });
  };

  const handleNews = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/crypto/news?symbol=${crypto.symbol}`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all group border-border/50">
      {/* Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => navigate(`/crypto/${crypto.symbol.toLowerCase()}`)}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-bold">
              {crypto.symbol.slice(0, 2)}
            </div>
            <div>
              <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                {crypto.name}
              </h3>
              <p className="text-sm text-muted-foreground">{crypto.symbol}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNews}
            className="text-muted-foreground hover:text-primary"
          >
            <Newspaper className="w-5 h-5" />
          </Button>
        </div>

        {/* Price Info */}
        <div className="mb-4">
          <div className="text-3xl font-bold mb-2">
            ${crypto.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isPositive ? "default" : "destructive"} className={isPositive ? "bg-success" : ""}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {isPositive ? '+' : ''}{crypto.changePercent.toFixed(2)}%
            </Badge>
            <span className="text-sm text-muted-foreground">
              Vol: ${(crypto.volume / 1e9).toFixed(2)}B
            </span>
          </div>
        </div>

        {/* Chart */}
        {crypto.sparkline && crypto.sparkline.length > 0 && (
          <div className="mb-4">
            <div className="h-24 relative">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id={`gradient-${crypto.symbol}`} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={isPositive ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polyline
                  fill={`url(#gradient-${crypto.symbol})`}
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

            {/* Period Selector */}
            <div className="flex gap-1 mt-2">
              {periods.map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "ghost"}
                  size="sm"
                  className="flex-1 h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPeriod(period as typeof selectedPeriod);
                  }}
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex border-t border-border/50">
        <Button
          variant="ghost"
          className="flex-1 rounded-none border-r border-border/50"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
        <Button
          variant="ghost"
          className="flex-1 rounded-none border-r border-border/50"
          onClick={handleWatchlist}
        >
          <Star className="w-4 h-4 mr-2" />
          Watchlist
        </Button>
        <Button
          variant="ghost"
          className="flex-1 rounded-none"
          onClick={handleAlert}
        >
          <Bell className="w-4 h-4 mr-2" />
          Alert
        </Button>
      </div>
    </Card>
  );
};

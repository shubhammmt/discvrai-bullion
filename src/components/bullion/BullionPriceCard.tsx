import { TrendingUp, TrendingDown, ShoppingCart, Coins, Medal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BullionPriceCardProps {
  metal: "gold" | "silver";
  price: number;
  change: number;
  changePercent: number;
  sparklineData: number[];
  onClick?: () => void;
  onBuy?: () => void;
  onSell?: () => void;
  showActions?: boolean;
  hasHoldings?: boolean;
}

export function BullionPriceCard({
  metal,
  price,
  change,
  changePercent,
  sparklineData,
  onClick,
  onBuy,
  onSell,
  showActions = false,
  hasHoldings = false,
}: BullionPriceCardProps) {
  const isPositive = change >= 0;
  const metalConfig = {
    gold: {
      gradient: "from-bullion-gold/20 via-bullion-gold-light/10 to-bullion-gold/20",
      border: "border-bullion-gold/30",
      accent: "text-bullion-gold",
      buyBg: "bg-bullion-gold hover:bg-bullion-gold-dark text-black",
      sellBg: "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white",
      IconComponent: Coins,
      name: "Gold",
    },
    silver: {
      gradient: "from-bullion-silver/20 via-bullion-silver-light/10 to-bullion-silver/20",
      border: "border-bullion-silver/30",
      accent: "text-bullion-silver",
      buyBg: "bg-bullion-silver hover:bg-bullion-silver-dark text-black",
      sellBg: "bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-black",
      IconComponent: Medal,
      name: "Silver",
    },
  };

  const config = metalConfig[metal];

  const generateSparkline = () => {
    if (!sparklineData.length) return "";
    const max = Math.max(...sparklineData);
    const min = Math.min(...sparklineData);
    const range = max - min || 1;
    const width = 120;
    const height = 40;
    
    const points = sparklineData.map((value, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    });

    return `M${points.join(" L")}`;
  };

  const handleCardClick = () => {
    if (onClick && !showActions) onClick();
  };

  return (
    <Card
      onClick={handleCardClick}
      className={`relative overflow-hidden transition-all duration-300 ${!showActions ? 'cursor-pointer hover:scale-[1.02]' : ''} hover:shadow-xl bg-gradient-to-br ${config.gradient} ${config.border} border backdrop-blur-sm`}
    >
      {/* Sparkline Background */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 120 40" className="w-full h-full" preserveAspectRatio="none">
          <defs>
            <linearGradient id={`gradient-${metal}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "hsl(var(--bullion-success))" : "hsl(var(--bullion-error))"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isPositive ? "hsl(var(--bullion-success))" : "hsl(var(--bullion-error))"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={generateSparkline()}
            fill="none"
            stroke={isPositive ? "hsl(var(--bullion-success))" : "hsl(var(--bullion-error))"}
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={`${generateSparkline()} L120,40 L0,40 Z`}
            fill={`url(#gradient-${metal})`}
          />
        </svg>
      </div>

      <div className="relative p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <config.IconComponent className={`w-6 h-6 ${config.accent}`} />
            <span className={`font-semibold text-lg ${config.accent}`}>{config.name}</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? "bg-bullion-success/20 text-bullion-success" 
              : "bg-bullion-error/20 text-bullion-error"
          }`}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {isPositive ? "+" : ""}{changePercent.toFixed(2)}%
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-3xl font-bold text-foreground">
            ₹{price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
          </div>
          <div className="text-sm text-muted-foreground">per gram</div>
        </div>

        <div className={`mt-2 text-sm ${isPositive ? "text-bullion-success" : "text-bullion-error"}`}>
          {isPositive ? "+" : ""}₹{Math.abs(change).toFixed(2)} today
        </div>

        {/* Inline Action Buttons */}
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
            <Button 
              onClick={(e) => { e.stopPropagation(); onBuy?.(); }} 
              size="sm" 
              className={`flex-1 ${config.buyBg} font-medium`}
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Buy {config.name}
            </Button>
            {hasHoldings && (
              <Button 
                onClick={(e) => { e.stopPropagation(); onSell?.(); }} 
                size="sm" 
                className={`flex-1 ${config.sellBg}`}
              >
                Sell {config.name}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

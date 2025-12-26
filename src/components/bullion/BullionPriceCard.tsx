import { TrendingUp, TrendingDown, ShoppingCart, Repeat } from "lucide-react";
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
  onSIP?: () => void;
  showActions?: boolean;
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
  onSIP,
  showActions = false,
}: BullionPriceCardProps) {
  const isPositive = change >= 0;
  const metalConfig = {
    gold: {
      gradient: "from-amber-500/20 via-yellow-400/10 to-amber-600/20",
      border: "border-amber-500/30",
      accent: "text-amber-400",
      buttonBg: "bg-amber-500 hover:bg-amber-600 text-black",
      icon: "🪙",
      name: "Gold",
    },
    silver: {
      gradient: "from-slate-400/20 via-gray-300/10 to-slate-500/20",
      border: "border-slate-400/30",
      accent: "text-slate-300",
      buttonBg: "bg-slate-500 hover:bg-slate-600 text-white",
      icon: "🥈",
      name: "Silver",
    },
  };

  const config = metalConfig[metal];

  // Generate SVG path for sparkline
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
        <svg
          viewBox="0 0 120 40"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={`gradient-${metal}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity="0.4" />
              <stop offset="100%" stopColor={isPositive ? "#22c55e" : "#ef4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d={generateSparkline()}
            fill="none"
            stroke={isPositive ? "#22c55e" : "#ef4444"}
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
            <span className="text-2xl">{config.icon}</span>
            <span className={`font-semibold text-lg ${config.accent}`}>{config.name}</span>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            isPositive 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-red-500/20 text-red-400"
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

        <div className={`mt-2 text-sm ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
          {isPositive ? "+" : ""}₹{Math.abs(change).toFixed(2)} today
        </div>

        {/* Inline Action Buttons */}
        {showActions && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
            <Button 
              onClick={(e) => { e.stopPropagation(); onBuy?.(); }} 
              size="sm" 
              className={`flex-1 ${config.buttonBg} font-medium`}
            >
              <ShoppingCart className="w-3 h-3 mr-1" />
              Buy
            </Button>
            <Button 
              onClick={(e) => { e.stopPropagation(); onSell?.(); }} 
              size="sm" 
              variant="outline"
              className="flex-1"
            >
              Sell
            </Button>
            <Button 
              onClick={(e) => { e.stopPropagation(); onSIP?.(); }} 
              size="sm" 
              variant="outline"
              className="flex-1"
            >
              <Repeat className="w-3 h-3 mr-1" />
              SIP
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
}

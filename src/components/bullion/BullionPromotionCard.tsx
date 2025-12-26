import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Sparkles, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

type Metal = "gold" | "silver";
type ActionType = "buy" | "sip";
type Variant = "compact" | "medium" | "banner";

interface BullionPromotionCardProps {
  metal: Metal;
  action: ActionType;
  variant?: Variant;
  currentPrice?: number;
  priceChange?: number;
  className?: string;
}

const metalConfig = {
  gold: {
    name: "Gold",
    gradient: "from-amber-500/20 via-yellow-500/10 to-orange-500/20",
    accent: "text-amber-500",
    button: "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700",
    border: "border-amber-500/30",
    icon: "🪙",
  },
  silver: {
    name: "Silver",
    gradient: "from-slate-400/20 via-gray-300/10 to-zinc-400/20",
    accent: "text-slate-400",
    button: "bg-gradient-to-r from-slate-500 to-zinc-600 hover:from-slate-600 hover:to-zinc-700",
    border: "border-slate-400/30",
    icon: "🥈",
  },
};

const actionConfig = {
  buy: {
    title: "Buy",
    subtitle: "One-time purchase",
    description: "Start with as little as ₹100",
    icon: TrendingUp,
    cta: "Buy Now",
  },
  sip: {
    title: "Start SIP",
    subtitle: "Systematic Investment",
    description: "Auto-invest daily, weekly or monthly",
    icon: Calendar,
    cta: "Start SIP",
  },
};

export const BullionPromotionCard = ({
  metal,
  action,
  variant = "medium",
  currentPrice = metal === "gold" ? 6250 : 78,
  priceChange = 0.5,
  className = "",
}: BullionPromotionCardProps) => {
  const metalStyles = metalConfig[metal];
  const actionStyles = actionConfig[action];
  const ActionIcon = actionStyles.icon;

  if (variant === "compact") {
    return (
      <Link to="/bullion" className={className}>
        <Card className={`p-3 bg-gradient-to-r ${metalStyles.gradient} border ${metalStyles.border} hover:scale-[1.02] transition-all cursor-pointer`}>
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">{metalStyles.icon}</span>
              <div>
                <p className={`font-semibold text-sm ${metalStyles.accent}`}>
                  {actionStyles.title} {metalStyles.name}
                </p>
                <p className="text-xs text-muted-foreground">₹{currentPrice.toLocaleString()}/g</p>
              </div>
            </div>
            <ArrowRight className={`w-4 h-4 ${metalStyles.accent}`} />
          </div>
        </Card>
      </Link>
    );
  }

  if (variant === "banner") {
    return (
      <Card className={`p-4 bg-gradient-to-r ${metalStyles.gradient} border ${metalStyles.border} ${className}`}>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl">{metalStyles.icon}</div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className={`font-bold text-lg ${metalStyles.accent}`}>
                  {actionStyles.title} {metalStyles.name}
                </h3>
                {priceChange > 0 && (
                  <span className="text-xs bg-green-500/20 text-green-500 px-2 py-0.5 rounded-full">
                    +{priceChange}% today
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {actionStyles.description} • Live rate: ₹{currentPrice.toLocaleString()}/g
              </p>
            </div>
          </div>
          <Link to="/bullion">
            <Button className={`${metalStyles.button} text-white`}>
              <ActionIcon className="w-4 h-4 mr-2" />
              {actionStyles.cta}
            </Button>
          </Link>
        </div>
      </Card>
    );
  }

  // Medium variant (default)
  return (
    <Card className={`p-4 bg-gradient-to-br ${metalStyles.gradient} border ${metalStyles.border} hover:shadow-lg transition-all ${className}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{metalStyles.icon}</span>
          <div>
            <h3 className={`font-bold ${metalStyles.accent}`}>
              {actionStyles.title} {metalStyles.name}
            </h3>
            <p className="text-xs text-muted-foreground">{actionStyles.subtitle}</p>
          </div>
        </div>
        <ActionIcon className={`w-5 h-5 ${metalStyles.accent}`} />
      </div>
      
      <div className="mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">₹{currentPrice.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/gram</span>
        </div>
        {priceChange !== 0 && (
          <span className={`text-xs ${priceChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {priceChange > 0 ? '+' : ''}{priceChange}% today
          </span>
        )}
      </div>

      <p className="text-sm text-muted-foreground mb-4">{actionStyles.description}</p>

      <Link to="/bullion">
        <Button className={`w-full ${metalStyles.button} text-white`}>
          {actionStyles.cta}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </Link>
    </Card>
  );
};

// Pre-configured exports for easy use
export const BuyGoldCard = (props: Omit<BullionPromotionCardProps, 'metal' | 'action'>) => (
  <BullionPromotionCard metal="gold" action="buy" {...props} />
);

export const BuySilverCard = (props: Omit<BullionPromotionCardProps, 'metal' | 'action'>) => (
  <BullionPromotionCard metal="silver" action="buy" {...props} />
);

export const GoldSIPCard = (props: Omit<BullionPromotionCardProps, 'metal' | 'action'>) => (
  <BullionPromotionCard metal="gold" action="sip" {...props} />
);

export const SilverSIPCard = (props: Omit<BullionPromotionCardProps, 'metal' | 'action'>) => (
  <BullionPromotionCard metal="silver" action="sip" {...props} />
);

// Grid component for showing multiple cards together
export const BullionPromoGrid = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ${className}`}>
    <BuyGoldCard />
    <BuySilverCard />
    <GoldSIPCard />
    <SilverSIPCard />
  </div>
);

// Inline widget for articles
export const BullionInlineWidget = ({ metal = "gold" }: { metal?: Metal }) => (
  <div className="my-6 flex flex-col sm:flex-row gap-3">
    <BullionPromotionCard metal={metal} action="buy" variant="compact" className="flex-1" />
    <BullionPromotionCard metal={metal} action="sip" variant="compact" className="flex-1" />
  </div>
);

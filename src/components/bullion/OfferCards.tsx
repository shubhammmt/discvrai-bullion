import { Gift, Sparkles, Users, Target, ArrowRight, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface Offer {
  id: string;
  type: "welcome" | "sip_bonus" | "referral" | "milestone" | "festival";
  title: string;
  description: string;
  value: string;
  ctaText: string;
  expiresAt?: Date;
  progress?: number; // For milestone offers (0-100)
}

interface OfferCardsProps {
  offers?: Offer[];
  variant?: "grid" | "carousel";
  onClaimOffer?: (offerId: string) => void;
  userState?: "new" | "logged_in_no_holdings" | "investor";
}

const defaultOffers: Record<string, Offer[]> = {
  new: [
    {
      id: "welcome_1",
      type: "welcome",
      title: "Welcome Bonus",
      description: "On your first purchase",
      value: "₹10 Free Gold",
      ctaText: "Claim Now",
    },
    {
      id: "sip_new",
      type: "sip_bonus",
      title: "SIP Starter",
      description: "Start your first SIP",
      value: "₹25 Extra Gold",
      ctaText: "Start SIP",
    },
  ],
  logged_in_no_holdings: [
    {
      id: "first_buy",
      type: "welcome",
      title: "First Purchase Bonus",
      description: "Complete your first buy",
      value: "₹10 Free Gold",
      ctaText: "Buy Now",
    },
    {
      id: "sip_setup",
      type: "sip_bonus",
      title: "SIP Bonus",
      description: "Setup monthly SIP",
      value: "₹25 Extra Gold",
      ctaText: "Start SIP",
    },
  ],
  investor: [
    {
      id: "referral_1",
      type: "referral",
      title: "Refer & Earn",
      description: "Both you & friend get",
      value: "₹100 Gold Each",
      ctaText: "Share Link",
    },
    {
      id: "milestone_1",
      type: "milestone",
      title: "Milestone Bonus",
      description: "Invest ₹10,000 total",
      value: "₹50 Bonus",
      ctaText: "View Progress",
      progress: 65,
    },
    {
      id: "increase_sip",
      type: "sip_bonus",
      title: "Boost Your SIP",
      description: "Increase SIP by ₹100",
      value: "₹15 Extra Gold",
      ctaText: "Increase SIP",
    },
  ],
};

const typeConfig = {
  welcome: { icon: Gift, bgColor: "bg-amber-50 dark:bg-amber-950/50", border: "border-amber-300 dark:border-amber-700", iconColor: "text-amber-600 dark:text-amber-400" },
  sip_bonus: { icon: Sparkles, bgColor: "bg-sky-50 dark:bg-sky-950/50", border: "border-sky-300 dark:border-sky-700", iconColor: "text-sky-600 dark:text-sky-400" },
  referral: { icon: Users, bgColor: "bg-blue-50 dark:bg-blue-950/50", border: "border-blue-300 dark:border-blue-700", iconColor: "text-blue-600 dark:text-blue-400" },
  milestone: { icon: Target, bgColor: "bg-emerald-50 dark:bg-emerald-950/50", border: "border-emerald-300 dark:border-emerald-700", iconColor: "text-emerald-600 dark:text-emerald-400" },
  festival: { icon: Gift, bgColor: "bg-purple-50 dark:bg-purple-950/50", border: "border-purple-300 dark:border-purple-700", iconColor: "text-purple-600 dark:text-purple-400" },
};

export function OfferCards({
  offers,
  variant = "grid",
  onClaimOffer,
  userState = "new",
}: OfferCardsProps) {
  const displayOffers = offers || defaultOffers[userState] || [];

  if (displayOffers.length === 0) return null;

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          🎁 Offers For You
        </h2>
        {displayOffers.length > 2 && (
          <button className="text-xs text-primary hover:underline">View All</button>
        )}
      </div>

      <div className={variant === "grid" 
        ? "grid grid-cols-2 gap-3" 
        : "flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide"
      }>
        {displayOffers.slice(0, 4).map((offer, index) => {
          const config = typeConfig[offer.type];
          const Icon = config.icon;

          return (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${variant === "carousel" ? "min-w-[160px] flex-shrink-0" : ""}`}
            >
              <div className={`p-4 rounded-xl ${config.bgColor} border ${config.border} h-full flex flex-col`}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 ${config.iconColor}`} />
                  <span className={`text-xs font-semibold ${config.iconColor} uppercase`}>
                    {offer.type.replace("_", " ")}
                  </span>
                </div>

                <p className="font-bold text-lg text-foreground mb-0.5">{offer.value}</p>
                <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>

                {/* Progress bar for milestone */}
                {offer.progress !== undefined && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{offer.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-emerald-400 rounded-full transition-all"
                        style={{ width: `${offer.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Expiry timer */}
                {offer.expiresAt && (
                  <div className="flex items-center gap-1 text-xs text-amber-400 mb-2">
                    <Timer className="w-3 h-3" />
                    <span>Expires soon</span>
                  </div>
                )}

                <Button
                  size="sm"
                  variant="secondary"
                  className="w-full mt-auto"
                  onClick={() => onClaimOffer?.(offer.id)}
                >
                  {offer.ctaText}
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

import { Shield, Home, Wallet, Lock, Coins, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const whyDigitalReasons = [
  {
    icon: Shield,
    title: "24K Pure Gold",
    description: "Guaranteed 99.9% pure 24 karat gold directly from refiners",
    color: "amber",
  },
  {
    icon: Shield,
    title: "999 Pure Silver",
    description: "Guaranteed 99.9% pure silver directly from refiners",
    color: "slate",
  },
  {
    icon: Home,
    title: "Sell Anytime",
    description: "Sell from home anytime, money direct to your bank account",
    color: "emerald",
  },
  {
    icon: Wallet,
    title: "0% Storage Fee",
    description: "Free storage in bank-grade insured vaults, no locker fees",
    color: "blue",
  },
  {
    icon: Lock,
    title: "100% Insured",
    description: "Your gold is fully insured against theft and damage",
    color: "purple",
  },
  {
    icon: Coins,
    title: "Buy from ₹10",
    description: "Start investing with as little as ₹10, no minimum grams",
    color: "orange",
  },
];

const colorClasses = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: "text-amber-500",
    hover: "hover:border-amber-500/50",
  },
  slate: {
    bg: "bg-slate-500/10",
    border: "border-slate-500/30",
    icon: "text-slate-400",
    hover: "hover:border-slate-500/50",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: "text-emerald-500",
    hover: "hover:border-emerald-500/50",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: "text-blue-500",
    hover: "hover:border-blue-500/50",
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    icon: "text-purple-500",
    hover: "hover:border-purple-500/50",
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/30",
    icon: "text-orange-500",
    hover: "hover:border-orange-500/50",
  },
};

interface WhyDigitalCardsProps {
  variant?: "grid" | "carousel";
}

export function WhyDigitalCards({ variant = "carousel" }: WhyDigitalCardsProps) {
  if (variant === "grid") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Why Go Digital?</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
          {whyDigitalReasons.map((reason, index) => {
            const Icon = reason.icon;
            const colors = colorClasses[reason.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`p-4 h-full ${colors.border} ${colors.hover} transition-colors cursor-default`}>
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{reason.title}</h3>
                  <p className="text-xs text-muted-foreground">{reason.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Carousel variant (horizontal scroll)
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Why Go Digital?</h2>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          Scroll <ArrowRight className="w-3 h-3" />
        </span>
      </div>
      
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
        {whyDigitalReasons.map((reason, index) => {
          const Icon = reason.icon;
          const colors = colorClasses[reason.color as keyof typeof colorClasses];
          
          return (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0"
            >
              <Card className={`p-4 w-40 h-full ${colors.border} ${colors.hover} transition-colors`}>
                <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center mb-3`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{reason.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">{reason.description}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

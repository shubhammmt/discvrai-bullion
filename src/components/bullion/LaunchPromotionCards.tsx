import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Rocket, Sparkles, Clock, Gift, ArrowRight, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

type Metal = "gold" | "silver";

interface LaunchPromoCardProps {
  metal: Metal;
  className?: string;
}

const metalConfig = {
  gold: {
    name: "Digital Gold",
    tagline: "24K Pure Gold",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    bgGradient: "from-amber-500/15 via-yellow-500/10 to-orange-500/15",
    border: "border-amber-400/40",
    accent: "text-amber-500",
    badgeBg: "bg-amber-500",
    icon: "🪙",
    offer: "Get ₹50 Free Gold",
    minInvest: "Start from ₹10",
  },
  silver: {
    name: "Digital Silver",
    tagline: "999 Pure Silver",
    gradient: "from-slate-400 via-gray-300 to-zinc-400",
    bgGradient: "from-slate-400/15 via-gray-300/10 to-zinc-400/15",
    border: "border-slate-400/40",
    accent: "text-slate-400",
    badgeBg: "bg-slate-500",
    icon: "🥈",
    offer: "Get ₹25 Free Silver",
    minInvest: "Start from ₹10",
  },
};

export const LaunchPromoCard = ({ metal, className = "" }: LaunchPromoCardProps) => {
  const config = metalConfig[metal];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className={`relative overflow-hidden p-5 bg-gradient-to-br ${config.bgGradient} border-2 ${config.border} hover:shadow-xl transition-all duration-300`}>
        {/* Launching Soon Badge */}
        <div className="absolute top-3 right-3">
          <Badge className={`${config.badgeBg} text-white font-bold px-3 py-1 flex items-center gap-1.5`}>
            <Rocket className="w-3.5 h-3.5" />
            Launching Soon
          </Badge>
        </div>

        {/* Icon and Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="text-4xl">{config.icon}</div>
          <div>
            <h3 className={`font-bold text-xl ${config.accent}`}>{config.name}</h3>
            <p className="text-sm text-muted-foreground">{config.tagline}</p>
          </div>
        </div>

        {/* Offer Highlight */}
        <div className={`bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent font-bold text-2xl mb-2`}>
          {config.offer}
        </div>
        <p className="text-sm text-muted-foreground mb-4">{config.minInvest}</p>

        {/* Features */}
        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-sm">
            <Sparkles className={`w-4 h-4 ${config.accent}`} />
            <span>Exclusive launch bonuses</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Gift className={`w-4 h-4 ${config.accent}`} />
            <span>Limited time offers</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className={`w-4 h-4 ${config.accent}`} />
            <span>Early access benefits</span>
          </div>
        </div>

        {/* CTA */}
        <Link to="/bullion">
          <Button className={`w-full bg-gradient-to-r ${config.gradient} text-white font-semibold hover:opacity-90 mb-3`}>
            <Bell className="w-4 h-4 mr-2" />
            Notify Me
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
        <p className={`text-center text-xs font-bold bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent`}>Exclusive on DiscvrAI</p>
      </Card>
    </motion.div>
  );
};

// Combined banner for both metals
export const LaunchPromoBanner = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={className}
    >
      <Card className="relative overflow-hidden p-6 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-slate-400/10 border-2 border-primary/20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(251,191,36,0.1),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(148,163,184,0.1),transparent_50%)]" />
        
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-5 h-5 text-primary animate-bounce" />
            <Badge className="bg-primary text-primary-foreground font-bold px-4 py-1.5 text-sm">
              🎉 NEW LAUNCH OFFERS
            </Badge>
            <Rocket className="w-5 h-5 text-primary animate-bounce" />
          </div>

          {/* Main Message */}
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-amber-500 via-primary to-slate-400 bg-clip-text text-transparent">
            Don't Miss the Launch Offers!
          </h2>
          <p className="text-center text-muted-foreground mb-2 max-w-xl mx-auto">
            Be the first to invest in Digital Gold & Silver. Exclusive bonuses for early investors!
          </p>
          <p className="text-center mb-6">
            <span className="text-sm text-muted-foreground">Only on </span>
            <span className="font-bold text-lg bg-gradient-to-r from-amber-500 via-primary to-slate-400 bg-clip-text text-transparent">DiscvrAI</span>
          </p>

          {/* Offers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-amber-500/10 border border-amber-400/30">
              <span className="text-3xl">🪙</span>
              <div>
                <p className="font-bold text-amber-500">Digital Gold</p>
                <p className="text-sm text-muted-foreground">Get ₹50 Free Gold on first purchase</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-400/10 border border-slate-400/30">
              <span className="text-3xl">🥈</span>
              <div>
                <p className="font-bold text-slate-400">Digital Silver</p>
                <p className="text-sm text-muted-foreground">Get ₹25 Free Silver on first purchase</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/bullion">
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-semibold hover:opacity-90 w-full sm:w-auto">
                <Bell className="w-4 h-4 mr-2" />
                Get Early Access
              </Button>
            </Link>
            <Link to="/bullion">
              <Button size="lg" variant="outline" className="font-semibold w-full sm:w-auto">
                Learn More
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

// Grid of both cards
export const LaunchPromoGrid = ({ className = "" }: { className?: string }) => (
  <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
    <LaunchPromoCard metal="gold" />
    <LaunchPromoCard metal="silver" />
  </div>
);

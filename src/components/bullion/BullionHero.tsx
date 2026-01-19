import { Shield, TrendingUp, TrendingDown, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

interface BullionHeroProps {
  goldPrice: number;
  silverPrice: number;
  goldChange: number;
  silverChange: number;
  userState: "new" | "logged_in_no_holdings" | "investor";
  userName?: string;
  totalValue?: number;
  totalGain?: number;
  gainPercent?: number;
  goldHoldings?: number;
  silverHoldings?: number;
  onBuyGold: () => void;
  onBuySilver: () => void;
  onCompleteProfile?: () => void;
}

export function BullionHero({
  goldPrice,
  silverPrice,
  goldChange,
  silverChange,
  userState,
  userName,
  totalValue = 0,
  totalGain = 0,
  gainPercent = 0,
  goldHoldings = 0,
  silverHoldings = 0,
  onBuyGold,
  onBuySilver,
  onCompleteProfile,
}: BullionHeroProps) {
  const goldChangePercent = (goldChange / goldPrice) * 100;
  const silverChangePercent = (silverChange / silverPrice) * 100;

  // New User Hero
  if (userState === "new") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-6 lg:p-8"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-amber-600/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span className="text-sm font-medium text-amber-500">Start Your Gold Journey</span>
          </div>
          
          <h1 className="text-2xl lg:text-4xl font-bold mb-2">
            Invest in <span className="text-amber-500">24K Pure Gold</span> from ₹10
          </h1>
          
          <p className="text-muted-foreground mb-6 max-w-xl">
            100% insured • Free vault storage • Sell anytime • Powered by Augmont
          </p>

          {/* Live Prices */}
          <div className="flex flex-wrap gap-3 mb-6">
            <PricePill 
              metal="Gold" 
              price={goldPrice} 
              change={goldChange} 
              changePercent={goldChangePercent} 
            />
            <PricePill 
              metal="Silver" 
              price={silverPrice} 
              change={silverChange} 
              changePercent={silverChangePercent} 
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={onBuyGold}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg shadow-amber-500/25"
            >
              🪙 Buy Gold
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button 
              onClick={onBuySilver}
              size="lg"
              variant="outline"
              className="border-slate-600 hover:bg-slate-800"
            >
              🥈 Buy Silver
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Logged in but no holdings
  if (userState === "logged_in_no_holdings") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 p-6 lg:p-8"
      >
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            Hey {userName || "there"}, ready to start? ✨
          </h1>
          
          <p className="text-muted-foreground mb-6">
            Complete your profile and make your first gold purchase today
          </p>

          {/* Progress Steps */}
          <div className="flex flex-wrap gap-4 mb-6">
            <ProgressStep step={1} label="Account Created" completed />
            <ProgressStep step={2} label="Complete KYC" />
            <ProgressStep step={3} label="First Purchase" />
          </div>

          {/* Live Prices */}
          <div className="flex flex-wrap gap-3 mb-6">
            <PricePill 
              metal="Gold" 
              price={goldPrice} 
              change={goldChange} 
              changePercent={goldChangePercent} 
            />
            <PricePill 
              metal="Silver" 
              price={silverPrice} 
              change={silverChange} 
              changePercent={silverChangePercent} 
            />
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={onBuyGold}
              size="lg"
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
            >
              Buy Your First Gold
            </Button>
            {onCompleteProfile && (
              <Button 
                onClick={onCompleteProfile}
                size="lg"
                variant="outline"
              >
                Complete Profile
              </Button>
            )}
          </div>
        </div>
      </motion.div>
    );
  }

  // Existing Investor
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 border border-slate-700/50 p-6 lg:p-8"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-5 h-5 text-amber-500" />
          <span className="text-sm text-slate-400">Your Portfolio</span>
        </div>
        
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <div>
            <p className="text-3xl lg:text-4xl font-bold text-white">
              ₹{totalValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
            </p>
            <p className={`text-sm font-medium ${totalGain >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {totalGain >= 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString("en-IN")} 
              ({totalGain >= 0 ? "+" : ""}{gainPercent.toFixed(1)}%)
            </p>
          </div>
        </div>

        {/* Holdings Summary */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="p-4 bg-amber-500/10 border-amber-500/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🪙</span>
              <span className="text-amber-400 text-sm font-medium">Gold</span>
            </div>
            <p className="text-xl font-bold text-white">{goldHoldings.toFixed(2)}g</p>
            <p className="text-xs text-slate-400">₹{(goldHoldings * goldPrice).toLocaleString("en-IN")}</p>
          </Card>
          
          <Card className="p-4 bg-slate-400/10 border-slate-500/30">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg">🥈</span>
              <span className="text-slate-300 text-sm font-medium">Silver</span>
            </div>
            <p className="text-xl font-bold text-white">{silverHoldings.toFixed(0)}g</p>
            <p className="text-xs text-slate-400">₹{(silverHoldings * silverPrice).toLocaleString("en-IN")}</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={onBuyGold}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
          >
            Buy More
          </Button>
          <Button 
            onClick={onBuySilver}
            variant="outline"
            className="border-slate-600 hover:bg-slate-800 text-white"
          >
            Start SIP
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Helper Components
function PricePill({ 
  metal, 
  price, 
  change, 
  changePercent 
}: { 
  metal: string; 
  price: number; 
  change: number; 
  changePercent: number;
}) {
  const isPositive = change >= 0;
  
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 border border-border/50">
      <span className="font-medium">{metal}</span>
      <span className="font-bold">₹{price.toLocaleString("en-IN")}/g</span>
      <span className={`flex items-center text-sm ${isPositive ? "text-emerald-400" : "text-red-400"}`}>
        {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
        {isPositive ? "+" : ""}{changePercent.toFixed(1)}%
      </span>
    </div>
  );
}

function ProgressStep({ 
  step, 
  label, 
  completed = false 
}: { 
  step: number; 
  label: string; 
  completed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
        completed 
          ? "bg-emerald-500 text-white" 
          : "bg-muted text-muted-foreground"
      }`}>
        {completed ? "✓" : step}
      </div>
      <span className={`text-sm ${completed ? "text-emerald-400" : "text-muted-foreground"}`}>
        {label}
      </span>
    </div>
  );
}

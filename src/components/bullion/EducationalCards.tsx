import { Shield, TrendingUp, Repeat, Gift, Sparkles, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface EducationalCardsProps {
  onBuyGold?: () => void;
  onStartSIP?: () => void;
}

export function EducationalCards({ onBuyGold, onStartSIP }: EducationalCardsProps) {
  return (
    <div className="space-y-4">
      {/* Why Gold - Gen-Z friendly */}
      <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 rounded-full blur-2xl" />
        
        <div className="flex items-start gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">Why Gold? 🤔</h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Gold has preserved wealth for 5000+ years. It's your hedge against inflation and market crashes. 
              When stocks crash, gold often rises.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">Inflation hedge</span>
              <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">Safe haven</span>
              <span className="px-2 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs">No default risk</span>
            </div>
          </div>
        </div>
        
        {onBuyGold && (
          <Button onClick={onBuyGold} size="sm" className="mt-3 w-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border-amber-500/30">
            Start with ₹100 <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </Card>

      {/* SIP Benefits - Relatable messaging */}
      <Card className="p-4 bg-gradient-to-br from-emerald-500/10 to-transparent border-emerald-500/20 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />
        
        <div className="flex items-start gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
            <Repeat className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1">SIP = Lazy Investing ✨</h3>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              Set it and forget it. Auto-invest every month and benefit from rupee cost averaging. 
              No timing the market, no stress.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-emerald-400">
                <Sparkles className="w-3 h-3" />
                <span>₹100/mo min</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <TrendingUp className="w-3 h-3" />
                <span>Avg. 8-10% annual</span>
              </div>
            </div>
          </div>
        </div>
        
        {onStartSIP && (
          <Button onClick={onStartSIP} size="sm" className="mt-3 w-full bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border-emerald-500/30">
            Start Gold SIP <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </Card>

      {/* Digital vs Physical */}
      <Card className="p-4 border-dashed">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-sm mb-1">Digital {'>'} Physical</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              No storage costs, no theft risk, no making charges. Buy 0.001g at a time. 
              Convert to physical gold anytime.
            </p>
          </div>
        </div>
      </Card>

      {/* Quick Facts */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 text-center">
          <div className="text-lg font-bold text-amber-400">24K</div>
          <div className="text-xs text-muted-foreground">Pure Gold</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-lg font-bold text-emerald-400">0%</div>
          <div className="text-xs text-muted-foreground">Storage Fee</div>
        </Card>
        <Card className="p-3 text-center">
          <div className="text-lg font-bold text-primary">100%</div>
          <div className="text-xs text-muted-foreground">Insured</div>
        </Card>
      </div>
    </div>
  );
}

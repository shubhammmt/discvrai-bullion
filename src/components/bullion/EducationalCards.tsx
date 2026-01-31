import { Shield, TrendingUp, Repeat, Sparkles, ArrowRight } from "lucide-react";
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
      <Card className="p-4 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-20 h-20 bg-amber-300/20 rounded-full blur-2xl" />
        
        <div className="flex items-start gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1 text-amber-900 dark:text-amber-100">Why Gold?</h3>
            <p className="text-xs text-amber-700 dark:text-amber-300/80 mb-3 leading-relaxed">
              Gold has preserved wealth for 5000+ years. It's your hedge against inflation and market crashes. 
              When stocks crash, gold often rises.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-full bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 text-xs font-medium">Inflation hedge</span>
              <span className="px-2 py-1 rounded-full bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 text-xs font-medium">Safe haven</span>
              <span className="px-2 py-1 rounded-full bg-amber-200 dark:bg-amber-800/50 text-amber-800 dark:text-amber-200 text-xs font-medium">No default risk</span>
            </div>
          </div>
        </div>
        
        {onBuyGold && (
          <Button 
            onClick={onBuyGold} 
            size="sm" 
            className="mt-3 w-full bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600 dark:text-black font-semibold"
          >
            Start with ₹100 <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </Card>

      {/* SIP Benefits - Relatable messaging */}
      <Card className="p-4 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 overflow-hidden relative">
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-emerald-300/20 rounded-full blur-2xl" />
        
        <div className="flex items-start gap-3 relative">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
            <Repeat className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-sm mb-1 text-emerald-900 dark:text-emerald-100">SIP = Lazy Investing</h3>
            <p className="text-xs text-emerald-700 dark:text-emerald-300/80 mb-3 leading-relaxed">
              Set it and forget it. Auto-invest every month and benefit from rupee cost averaging. 
              No timing to go to market, no stress.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-300 font-medium">
                <Sparkles className="w-3 h-3" />
                <span>₹100/mo min</span>
              </div>
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="w-3 h-3" />
                <span>Avg. 8-10% annual</span>
              </div>
            </div>
          </div>
        </div>
        
        {onStartSIP && (
          <Button 
            onClick={onStartSIP} 
            size="sm" 
            className="mt-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:hover:bg-emerald-600 dark:text-black font-semibold"
          >
            Start Gold SIP <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        )}
      </Card>


      {/* Quick Facts */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="p-3 text-center bg-card">
          <div className="text-lg font-bold text-amber-600 dark:text-amber-400">24K</div>
          <div className="text-xs text-muted-foreground">Pure Gold</div>
        </Card>
        <Card className="p-3 text-center bg-card">
          <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">0%</div>
          <div className="text-xs text-muted-foreground">Storage Fee</div>
        </Card>
        <Card className="p-3 text-center bg-card">
          <div className="text-lg font-bold text-primary">100%</div>
          <div className="text-xs text-muted-foreground">Insured</div>
        </Card>
      </div>
    </div>
  );
}

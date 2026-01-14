import { Coins, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuickTradePanelProps {
  goldPrice: number;
  silverPrice: number;
  onBuyGold: () => void;
  onBuySilver: () => void;
  onSellGold: () => void;
  onSellSilver: () => void;
  onStartSIP?: () => void;
  hasGoldHoldings?: boolean;
  hasSilverHoldings?: boolean;
}

export function QuickTradePanel({
  goldPrice,
  silverPrice,
  onBuyGold,
  onBuySilver,
  onSellGold,
  onSellSilver,
  hasGoldHoldings = false,
  hasSilverHoldings = false,
}: QuickTradePanelProps) {
  const quickAmounts = [500, 1000, 2000, 5000];

  return (
    <div className="space-y-4">
      {/* Quick Buy Gold Section */}
      <Card className="p-4 bg-gradient-to-br from-amber-500/10 to-transparent border-amber-500/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
            <Coins className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Buy Gold</h3>
            <p className="text-xs text-muted-foreground">₹{goldPrice.toLocaleString("en-IN")}/g</p>
          </div>
        </div>
        
        {/* Quick Amount Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={onBuyGold}
              className="text-xs hover:bg-amber-500/20 hover:border-amber-500/50 hover:text-amber-400 transition-all"
            >
              ₹{amount.toLocaleString()}
            </Button>
          ))}
        </div>
        
        <Button onClick={onBuyGold} className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium">
          <TrendingUp className="w-4 h-4 mr-2" />
          Buy Gold
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-2">
          <Sparkles className="w-3 h-3 inline mr-1 text-amber-400" />
          One-time or start a SIP
        </p>
      </Card>

      {/* Quick Buy Silver */}
      <Card className="p-4 bg-gradient-to-br from-slate-400/10 to-transparent border-slate-400/20">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-slate-400/20 flex items-center justify-center">
            <Coins className="w-4 h-4 text-slate-300" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Buy Silver</h3>
            <p className="text-xs text-muted-foreground">₹{silverPrice.toLocaleString("en-IN")}/g</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3">
          {quickAmounts.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={onBuySilver}
              className="text-xs hover:bg-slate-400/20 hover:border-slate-400/50 hover:text-slate-300 transition-all"
            >
              ₹{amount.toLocaleString()}
            </Button>
          ))}
        </div>
        
        <Button onClick={onBuySilver} variant="secondary" className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium">
          <TrendingUp className="w-4 h-4 mr-2" />
          Buy Silver
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-2">
          <Sparkles className="w-3 h-3 inline mr-1 text-slate-400" />
          One-time or start a SIP
        </p>
      </Card>

      {/* Sell Section - Only show if user has holdings */}
      {(hasGoldHoldings || hasSilverHoldings) && (
        <Card className="p-3 border-dashed">
          <p className="text-xs text-muted-foreground text-center mb-2">Need to liquidate?</p>
          <div className="grid grid-cols-2 gap-2">
            {hasGoldHoldings && (
              <Button variant="ghost" size="sm" onClick={onSellGold} className="text-xs">
                Sell Gold
              </Button>
            )}
            {hasSilverHoldings && (
              <Button variant="ghost" size="sm" onClick={onSellSilver} className="text-xs">
                Sell Silver
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
}

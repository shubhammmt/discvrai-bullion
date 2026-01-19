import { useState } from "react";
import { Clock, Lock, Unlock, ChevronDown, ChevronUp, CreditCard, RefreshCw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface LockedPurchase {
  id: string;
  amount: number; // in grams
  purchaseDate: Date;
  unlockDate: Date;
  source: "one_time" | "sip";
}

interface HoldingsBreakdownProps {
  metal: "gold" | "silver";
  totalHoldings: number;
  sellableHoldings: number;
  lockedHoldings: number;
  lockedPurchases?: LockedPurchase[];
  oneTimePurchases?: number; // Total grams from one-time
  sipCredits?: number; // Total grams from SIP
  nextSIPDate?: Date;
  nextSIPAmount?: number;
}

export function HoldingsBreakdown({
  metal,
  totalHoldings,
  sellableHoldings,
  lockedHoldings,
  lockedPurchases = [],
  oneTimePurchases = 0,
  sipCredits = 0,
  nextSIPDate,
  nextSIPAmount,
}: HoldingsBreakdownProps) {
  const [showLockDetails, setShowLockDetails] = useState(false);

  const metalConfig = {
    gold: { name: "Gold", icon: "🪙", unit: "g" },
    silver: { name: "Silver", icon: "🥈", unit: "g" },
  };
  const config = metalConfig[metal];

  const getTimeUntilUnlock = (unlockDate: Date) => {
    const now = new Date();
    const diff = unlockDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "< 1hr";
    if (hours < 24) return `${hours}hr`;
    return `${Math.ceil(hours / 24)}d`;
  };

  return (
    <div className="space-y-4">
      {/* Main Holdings Summary */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">{config.icon}</span>
          <h3 className="font-semibold">Your {config.name} Holdings</h3>
        </div>

        <div className="text-2xl font-bold mb-4">
          {totalHoldings.toFixed(4)}{config.unit}
        </div>

        {/* Status Breakdown */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm">
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span className="text-muted-foreground">Sellable Now</span>
            </div>
            <span className="font-semibold text-emerald-400">{sellableHoldings.toFixed(4)}{config.unit}</span>
          </div>

          {lockedHoldings > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-amber-400" />
                <span className="text-muted-foreground">Locked (48hr)</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p className="text-sm">
                        Newly purchased {metal} is locked for 48 hours to ensure secure settlement with our vault partners.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="font-semibold text-amber-400">{lockedHoldings.toFixed(4)}{config.unit}</span>
            </div>
          )}
        </div>
      </div>

      {/* Lock Details (Expandable) */}
      {lockedHoldings > 0 && lockedPurchases.length > 0 && (
        <Collapsible open={showLockDetails} onOpenChange={setShowLockDetails}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between h-auto py-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium">Lock Details</span>
              </div>
              {showLockDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
              {lockedPurchases.map((purchase) => (
                <div key={purchase.id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    {purchase.source === "sip" ? (
                      <RefreshCw className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <CreditCard className="w-4 h-4 text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{purchase.amount.toFixed(4)}{config.unit}</p>
                      <p className="text-xs text-muted-foreground">
                        {purchase.purchaseDate.toLocaleDateString("en-IN", { 
                          month: "short", 
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-400 font-medium">
                      Unlocks in {getTimeUntilUnlock(purchase.unlockDate)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Why 48-hour lock explanation */}
              <div className="pt-3 border-t border-amber-500/30">
                <p className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <Info className="w-3 h-3 mt-0.5 flex-shrink-0" />
                  48-hour lock ensures secure settlement with vault partners and prevents fraud.
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Source Breakdown (SIP vs One-time) */}
      {(oneTimePurchases > 0 || sipCredits > 0) && (
        <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            By Source
          </h4>
          <div className="space-y-2">
            {oneTimePurchases > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-muted-foreground" />
                  <span>One-Time Purchases</span>
                </div>
                <span className="font-medium">{oneTimePurchases.toFixed(4)}{config.unit}</span>
              </div>
            )}
            {sipCredits > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-muted-foreground" />
                  <span>SIP Credits</span>
                </div>
                <span className="font-medium">{sipCredits.toFixed(4)}{config.unit}</span>
              </div>
            )}
          </div>

          {/* Next SIP Info */}
          {nextSIPDate && nextSIPAmount && (
            <div className="mt-3 pt-3 border-t border-border/30 text-sm text-muted-foreground">
              Next SIP: ₹{nextSIPAmount.toLocaleString("en-IN")} on{" "}
              {nextSIPDate.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

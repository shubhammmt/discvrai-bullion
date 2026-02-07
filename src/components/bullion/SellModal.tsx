import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Clock, Building2, ArrowRight, CreditCard, RefreshCw, Info, ChevronDown, ChevronUp, Lock, Unlock } from "lucide-react";
import { toast } from "sonner";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { UPISelector } from "./UPISelector";
import { SellSuccessScreen } from "./SellSuccessScreen";
import { SellFailureScreen } from "./SellFailureScreen";
import { cn } from "@/lib/utils";

interface LockedPurchase {
  id: string;
  amount: number;
  purchaseDate: Date;
  unlockDate: Date;
  source: "one_time" | "sip";
}

interface UPIAccount {
  id: string;
  upiId: string;
  isPrimary: boolean;
}

interface SellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  currentPrice: number;
  holdings: { total: number; sellable: number; locked: number };
  lockedPurchases?: LockedPurchase[];
  oneTimePurchases?: number;
  sipCredits?: number;
  nextSIPDate?: Date;
  nextSIPAmount?: number;
  savedUPIAccounts?: UPIAccount[];
  onBuyMore?: () => void;
}

export function SellModal({ 
  open, 
  onOpenChange, 
  metal, 
  currentPrice, 
  holdings,
  lockedPurchases = [],
  oneTimePurchases = 0,
  sipCredits = 0,
  nextSIPDate,
  nextSIPAmount,
  savedUPIAccounts: initialUPIAccounts = [
    { id: "1", upiId: "user@okaxis", isPrimary: true },
    { id: "2", upiId: "user@paytm", isPrimary: false },
  ],
  onBuyMore,
}: SellModalProps) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"input" | "upi" | "review" | "processing">("input");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showLockDetails, setShowLockDetails] = useState(false);
  
  const [upiAccounts, setUpiAccounts] = useState<UPIAccount[]>(initialUPIAccounts);
  const [selectedUpiId, setSelectedUpiId] = useState<string | null>(
    initialUPIAccounts.find(a => a.isPrimary)?.id || null
  );

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [failureType, setFailureType] = useState<"sell_failed" | "payout_failed">("sell_failed");
  const [transactionId, setTransactionId] = useState("");

  const isGold = metal === "gold";
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙" },
    silver: { name: "Silver", icon: "🥈" },
  };
  const config = metalConfig[metal];
  const numericAmount = parseFloat(amount) || 0;
  const payoutAmount = numericAmount * currentPrice;

  const ctaClass = isGold
    ? "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white"
    : "bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-black";

  const selectedUpiAccount = upiAccounts.find(a => a.id === selectedUpiId);

  const getTimeUntilUnlock = (unlockDate: Date) => {
    const now = new Date();
    const diff = unlockDate.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "< 1hr";
    if (hours < 24) return `${hours}hr`;
    return `${Math.ceil(hours / 24)}d`;
  };

  const handleProceedToUPI = () => {
    if (numericAmount <= 0) { toast.error("Please enter a valid amount"); return; }
    if (numericAmount > holdings.sellable) { toast.error(`Maximum sellable: ${holdings.sellable.toFixed(4)}g`); return; }
    setStep("upi");
  };

  const handleReview = () => {
    if (!selectedUpiId) { toast.error("Please select a UPI ID to receive payment"); return; }
    setStep("review");
  };

  const handleAddUPIAccount = (upiId: string) => {
    const newAccount: UPIAccount = { id: Date.now().toString(), upiId, isPrimary: upiAccounts.length === 0 };
    setUpiAccounts([...upiAccounts, newAccount]);
    setSelectedUpiId(newAccount.id);
  };

  const handleRemoveUPIAccount = (id: string) => {
    setUpiAccounts(upiAccounts.filter(a => a.id !== id));
    if (selectedUpiId === id) setSelectedUpiId(upiAccounts.find(a => a.id !== id && a.isPrimary)?.id || null);
  };

  const handleSell = async () => {
    setIsProcessing(true);
    setStep("processing");
    await new Promise((resolve) => setTimeout(resolve, 2500));
    const txId = `SELL${Date.now().toString(36).toUpperCase()}`;
    setTransactionId(txId);
    const random = Math.random();
    setIsProcessing(false);
    if (random < 0.85) setShowSuccess(true);
    else if (random < 0.95) { setFailureType("sell_failed"); setShowFailure(true); }
    else { setFailureType("payout_failed"); setShowFailure(true); }
  };

  const handleClose = () => {
    setAmount(""); setStep("input"); setShowSuccess(false); setShowFailure(false); onOpenChange(false);
  };

  const handleRetry = () => { setShowFailure(false); setStep("review"); };

  if (showSuccess) {
    return (
      <SellSuccessScreen
        open={open} onOpenChange={handleClose} metal={metal} grams={numericAmount} amount={payoutAmount}
        transactionId={transactionId} upiId={selectedUpiAccount?.upiId || ""}
        settlementDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)}
        onBuyMore={() => { handleClose(); onBuyMore?.(); }}
        onShare={() => toast.success("Share link copied!")} onDone={handleClose}
      />
    );
  }

  if (showFailure) {
    return (
      <SellFailureScreen
        open={open} onOpenChange={handleClose} type={failureType} metal={metal} grams={numericAmount} amount={payoutAmount}
        reason={failureType === "sell_failed" ? "Unable to process sale at this time. Please try again." : "Bank server not responding. We'll retry automatically."}
        referenceId={transactionId} onRetry={handleRetry}
        onContactSupport={() => toast.info("Opening support chat...")} onClose={handleClose}
      />
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="text-xl text-foreground">
            Sell {config.name}
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-4">
            {/* Holdings Summary */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="flex items-center gap-2 mb-3">
                <h4 className="font-semibold text-foreground">Your {config.name} Holdings</h4>
              </div>
              <div className="text-2xl font-bold text-foreground mb-3">{holdings.total.toFixed(4)}g</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Unlock className="w-4 h-4 text-bullion-success" />
                    <span className="text-muted-foreground">Sellable Now</span>
                  </div>
                  <span className="font-semibold text-bullion-success">{holdings.sellable.toFixed(4)}g</span>
                </div>
                {holdings.locked > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-bullion-warning" />
                      <span className="text-muted-foreground">Locked (48hr)</span>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger><Info className="w-3 h-3 text-muted-foreground" /></TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">Newly purchased {metal} is locked for 48 hours to ensure secure settlement.</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <span className="font-semibold text-bullion-warning">{holdings.locked.toFixed(4)}g</span>
                  </div>
                )}
              </div>
            </div>

            {/* Lock Details */}
            {holdings.locked > 0 && lockedPurchases.length > 0 && (
              <Collapsible open={showLockDetails} onOpenChange={setShowLockDetails}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" className="w-full justify-between h-auto py-3">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-bullion-warning" />
                      <span className="text-sm font-medium text-foreground">View Lock Details</span>
                    </div>
                    {showLockDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-4 rounded-xl bg-bullion-warning-light border border-bullion-warning/30 space-y-3">
                    {lockedPurchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          {purchase.source === "sip" ? <RefreshCw className="w-4 h-4 text-muted-foreground" /> : <CreditCard className="w-4 h-4 text-muted-foreground" />}
                          <div>
                            <p className="font-medium text-foreground">{purchase.amount.toFixed(4)}g</p>
                            <p className="text-xs text-muted-foreground">
                              {purchase.purchaseDate.toLocaleDateString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-bullion-warning font-medium">Unlocks in {getTimeUntilUnlock(purchase.unlockDate)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {holdings.locked > 0 && lockedPurchases.length === 0 && (
              <div className="p-4 rounded-xl bg-bullion-warning-light border border-bullion-warning/30">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-bullion-warning flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-bullion-warning mb-1">48-Hour Lock Active</p>
                    <p className="text-sm text-muted-foreground">{holdings.locked.toFixed(4)}g is currently locked and cannot be sold yet.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Source Breakdown */}
            {(oneTimePurchases > 0 || sipCredits > 0) && (
              <div className="p-4 rounded-xl bg-muted/30 border border-border/30">
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">By Source</h4>
                <div className="space-y-2 text-sm">
                  {oneTimePurchases > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">One-Time Purchases</span>
                      </div>
                      <span className="font-medium text-foreground">{oneTimePurchases.toFixed(4)}g</span>
                    </div>
                  )}
                  {sipCredits > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">SIP Credits</span>
                      </div>
                      <span className="font-medium text-foreground">{sipCredits.toFixed(4)}g</span>
                    </div>
                  )}
                </div>
                {nextSIPDate && nextSIPAmount && (
                  <div className="mt-3 pt-3 border-t border-border/30 text-sm text-muted-foreground">
                    Next SIP: ₹{nextSIPAmount.toLocaleString("en-IN")} on{" "}
                    {nextSIPDate.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                )}
              </div>
            )}

            {/* Input */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount to sell (grams)</label>
              <div className="relative">
                <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" step="0.01" max={holdings.sellable} className="h-14 text-2xl font-bold text-center" />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">g</span>
              </div>
              <button onClick={() => setAmount(holdings.sellable.toString())} className="text-sm text-primary mt-2 hover:underline">
                Sell all ({holdings.sellable.toFixed(4)}g)
              </button>
            </div>

            {/* Payout Preview */}
            {numericAmount > 0 && (
              <div className="p-4 rounded-xl bg-bullion-success-light border border-bullion-success/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">You'll receive</span>
                  <span className="text-2xl font-bold text-bullion-success">
                    ₹{payoutAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">No GST on sale</p>
              </div>
            )}

            <Button onClick={handleProceedToUPI} disabled={numericAmount <= 0 || numericAmount > holdings.sellable} className={`w-full h-12 text-lg ${ctaClass}`}>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === "upi" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Selling</span>
                <span className="font-semibold text-foreground">{numericAmount.toFixed(4)}g {config.name}</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-muted-foreground">You'll receive</span>
                <span className="font-bold text-bullion-success">
                  ₹{payoutAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <UPISelector accounts={upiAccounts} selectedId={selectedUpiId} onSelect={setSelectedUpiId} onAddAccount={handleAddUPIAccount} onRemoveAccount={handleRemoveUPIAccount} />

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("input")} className="flex-1">Back</Button>
              <Button onClick={handleReview} disabled={!selectedUpiId} className={`flex-1 ${ctaClass}`}>
                Review Sale
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling</span>
                <span className="font-semibold text-foreground">{numericAmount.toFixed(4)}g {config.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium text-foreground">₹{currentPrice.toLocaleString("en-IN")}/g</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="font-medium text-foreground">Payout Amount</span>
                <span className="font-bold text-xl text-bullion-success">
                  ₹{payoutAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-foreground">Payment to: {selectedUpiAccount?.upiId}</p>
                <p className="text-muted-foreground">Settlement: T+3 Business Days</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("upi")} className="flex-1">Back</Button>
              <Button onClick={handleSell} disabled={isProcessing} className={`flex-1 ${ctaClass}`}>
                {isProcessing ? "Processing..." : "Confirm Sale"}
              </Button>
            </div>
          </div>
        )}

        {step === "processing" && (
          <div className="py-12 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted/50 flex items-center justify-center animate-pulse">
              <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Processing Sale...</h3>
            <p className="text-sm text-muted-foreground">Please wait while we process your {config.name} sale</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Clock, Building2, CheckCircle2, ArrowRight } from "lucide-react";
import { toast } from "sonner";

interface SellModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  currentPrice: number;
  holdings: { total: number; sellable: number; locked: number };
}

export function SellModal({ open, onOpenChange, metal, currentPrice, holdings }: SellModalProps) {
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"input" | "review" | "success">("input");
  const [isProcessing, setIsProcessing] = useState(false);

  const metalConfig = {
    gold: { name: "Gold", icon: "🪙" },
    silver: { name: "Silver", icon: "🥈" },
  };

  const config = metalConfig[metal];
  const numericAmount = parseFloat(amount) || 0;
  const payoutAmount = numericAmount * currentPrice;

  const handleReview = () => {
    if (numericAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (numericAmount > holdings.sellable) {
      toast.error(`Maximum sellable: ${holdings.sellable.toFixed(4)}g`);
      return;
    }
    setStep("review");
  };

  const handleSell = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep("success");
    toast.success("Sale completed successfully!");
  };

  const handleClose = () => {
    setAmount("");
    setStep("input");
    onOpenChange(false);
  };

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Sale Completed!</h3>
            <p className="text-muted-foreground mb-2">
              {numericAmount.toFixed(4)}g {config.name} sold
            </p>
            <p className="text-2xl font-bold text-emerald-400 mb-4">
              ₹{payoutAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Building2 className="w-4 h-4" />
              <span>Funds will be credited in T+3 days</span>
            </div>
            <Button onClick={handleClose} className="w-full">Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <span>{config.icon}</span>
            Sell {config.name}
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-4">
            {/* Holdings Summary */}
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Holdings</span>
                  <p className="font-semibold">{holdings.total.toFixed(4)}g</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Sellable</span>
                  <p className="font-semibold text-emerald-400">{holdings.sellable.toFixed(4)}g</p>
                </div>
              </div>
            </div>

            {/* 48-hour lock warning */}
            {holdings.locked > 0 && (
              <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <Clock className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-amber-400">48-Hour Lock Active</p>
                  <p className="text-muted-foreground">{holdings.locked.toFixed(4)}g is in lock-in period</p>
                </div>
              </div>
            )}

            {/* Input */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount to sell (grams)</label>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  step="0.01"
                  max={holdings.sellable}
                  className="h-14 text-2xl font-bold text-center"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground">g</span>
              </div>
              <button
                onClick={() => setAmount(holdings.sellable.toString())}
                className="text-sm text-primary mt-2 hover:underline"
              >
                Sell all ({holdings.sellable.toFixed(4)}g)
              </button>
            </div>

            {/* Payout Preview */}
            {numericAmount > 0 && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">You'll receive</span>
                  <span className="text-2xl font-bold text-emerald-400">
                    ₹{payoutAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">No GST on sale</p>
              </div>
            )}

            <Button
              onClick={handleReview}
              disabled={numericAmount <= 0 || numericAmount > holdings.sellable}
              className="w-full h-12 text-lg"
            >
              Review Sale
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Selling</span>
                <span className="font-semibold">{numericAmount.toFixed(4)}g {config.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rate</span>
                <span className="font-medium">₹{currentPrice.toLocaleString("en-IN")}/g</span>
              </div>
              <div className="border-t border-border/50 pt-3 flex justify-between">
                <span className="font-medium">Payout Amount</span>
                <span className="font-bold text-xl text-emerald-400">
                  ₹{payoutAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <Building2 className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium">Settlement: T+3 Business Days</p>
                <p className="text-muted-foreground">Funds will be credited to your linked bank account</p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("input")} className="flex-1">
                Back
              </Button>
              <Button
                onClick={handleSell}
                disabled={isProcessing}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700"
              >
                {isProcessing ? "Processing..." : "Confirm Sale"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

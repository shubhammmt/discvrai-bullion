import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, CheckCircle2, ArrowRight, Repeat } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface SIPModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  currentPrice: number;
}

type Frequency = "daily" | "weekly" | "monthly";

export function SIPModal({ open, onOpenChange, metal, currentPrice }: SIPModalProps) {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [step, setStep] = useState<"setup" | "confirm" | "success">("setup");
  const [isProcessing, setIsProcessing] = useState(false);

  const isGold = metal === "gold";
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙" },
    silver: { name: "Silver", icon: "🥈" },
  };
  const config = metalConfig[metal];
  const numericAmount = parseFloat(amount) || 0;
  const estimatedGrams = numericAmount / currentPrice;

  const ctaClass = isGold
    ? "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white"
    : "bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-white";

  const accentBorder = isGold ? "border-bullion-gold-dark" : "border-bullion-silver-dark";
  const accentBg = isGold ? "bg-bullion-gold-dark" : "bg-bullion-silver-dark";

  const frequencyConfig: Record<Frequency, { label: string; multiplier: number; period: string }> = {
    daily: { label: "Daily", multiplier: 30, period: "month" },
    weekly: { label: "Weekly", multiplier: 4, period: "month" },
    monthly: { label: "Monthly", multiplier: 12, period: "year" },
  };

  const projectedInvestment = numericAmount * frequencyConfig[frequency].multiplier;

  const handleConfirm = () => {
    if (numericAmount < 100) {
      toast.error("Minimum SIP amount is ₹100");
      return;
    }
    setStep("confirm");
  };

  const handleActivate = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setStep("success");
    toast.success("SIP activated successfully!");
  };

  const handleClose = () => {
    setAmount("");
    setFrequency("monthly");
    setStep("setup");
    onOpenChange(false);
  };

  const quickAmounts = [500, 1000, 2500, 5000];

  if (step === "success") {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-background border-border">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-bullion-success/20 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10 text-bullion-success" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">SIP Activated! 🎉</h3>
            <p className="text-muted-foreground mb-4">
              ₹{numericAmount} {frequencyConfig[frequency].label.toLowerCase()} in {config.name}
            </p>
            <div className="p-4 rounded-xl bg-muted/50 w-full mb-6">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>First investment: Tomorrow</span>
              </div>
            </div>
            <Button onClick={handleClose} className={`w-full ${ctaClass}`}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-foreground">
            <Repeat className="w-5 h-5" />
            Setup {config.name} SIP
          </DialogTitle>
        </DialogHeader>

        {step === "setup" && (
          <div className="space-y-5">
            {/* Frequency Selection */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Frequency</label>
              <div className="grid grid-cols-3 gap-2">
                {(Object.keys(frequencyConfig) as Frequency[]).map((freq) => (
                  <button
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={cn(
                      "py-3 px-4 rounded-xl border text-sm font-medium transition-all",
                      frequency === freq
                        ? `${accentBg} text-white ${accentBorder}`
                        : "bg-muted/50 border-border/50 hover:border-border"
                    )}
                  >
                    {frequencyConfig[freq].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Amount per {frequency}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground">₹</span>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="500"
                  min={100}
                  className="h-14 text-2xl font-bold pl-10 text-center"
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">Minimum ₹100</p>
            </div>

            {/* Quick Amounts */}
            <div className="flex gap-2">
              {quickAmounts.map((amt) => (
                <Button key={amt} variant="outline" size="sm" onClick={() => setAmount(amt.toString())} className="flex-1">
                  ₹{amt}
                </Button>
              ))}
            </div>

            {/* Projection */}
            {numericAmount >= 100 && (
              <div className={`p-4 rounded-xl border ${isGold ? "bg-bullion-gold/10 border-bullion-gold/20" : "bg-bullion-silver/10 border-bullion-silver/20"}`}>
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Projected investment per {frequencyConfig[frequency].period}</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{projectedInvestment.toLocaleString("en-IN")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    ≈ {(estimatedGrams * frequencyConfig[frequency].multiplier).toFixed(2)}g {config.name}
                  </p>
                </div>
              </div>
            )}

            <Button onClick={handleConfirm} disabled={numericAmount < 100} className={`w-full h-12 text-lg ${ctaClass}`}>
              Continue
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === "confirm" && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Metal</span>
                <span className="font-semibold text-foreground flex items-center gap-2">
                  {config.icon} {config.name}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-semibold text-foreground">₹{numericAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Frequency</span>
                <span className="font-semibold text-foreground">{frequencyConfig[frequency].label}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Start Date</span>
                <span className="font-semibold text-foreground">Tomorrow</span>
              </div>
            </div>

            <div className={`p-3 rounded-lg border ${isGold ? "bg-bullion-gold/10 border-bullion-gold/30" : "bg-bullion-silver/10 border-bullion-silver/30"}`}>
              <p className={`text-sm text-center ${isGold ? "text-bullion-gold-dark" : "text-bullion-silver-dark"}`}>
                Amount will be auto-debited from your linked payment method
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep("setup")} className="flex-1">
                Back
              </Button>
              <Button onClick={handleActivate} disabled={isProcessing} className={`flex-1 ${ctaClass}`}>
                {isProcessing ? "Activating..." : "Activate SIP"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

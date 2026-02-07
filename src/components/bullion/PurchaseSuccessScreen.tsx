import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Gift, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";

interface PurchaseSuccessScreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "one_time" | "sip";
  metal: "gold" | "silver";
  amount: number;
  grams: number;
  transactionId: string;
  portfolioTotal?: { gold: number; silver: number };
  onStartSIP?: () => void;
  onViewPortfolio?: () => void;
  onShare?: () => void;
  bonusAmount?: number;
}

export function PurchaseSuccessScreen({
  open,
  onOpenChange,
  type,
  metal,
  amount,
  grams,
  transactionId,
  portfolioTotal,
  onStartSIP,
  onViewPortfolio,
  onShare,
  bonusAmount = 10,
}: PurchaseSuccessScreenProps) {
  const isGold = metal === "gold";
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙" },
    silver: { name: "Silver", icon: "🥈" },
  };
  const config = metalConfig[metal];

  const suggestedSIPAmount = Math.max(amount, 100);

  // Tax calculations
  const taxRate = 3;
  const basePrice = amount / (1 + taxRate / 100);
  const taxAmount = amount - basePrice;
  const ratePerGram = amount / grams;

  const ctaClass = isGold
    ? "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white"
    : "bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-black";

  // SIP Activated view
  if (type === "sip") {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md bg-background border-border p-0 overflow-hidden">
          <div className="relative pt-8 pb-6 bg-gradient-to-b from-bullion-success/20 to-transparent">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex justify-center"
            >
              <div className="w-20 h-20 rounded-full bg-bullion-success/20 flex items-center justify-center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                  <CheckCircle2 className="w-10 h-10 text-bullion-success" />
                </motion.div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mt-4">
              <h2 className="text-xl font-bold text-foreground">SIP Activated!</h2>
            </motion.div>
          </div>

          <div className="px-6 pb-6 space-y-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="p-4 rounded-xl bg-muted/50 border border-border/50">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{config.icon}</span>
                <div>
                  <p className="font-bold text-lg text-foreground">₹{amount.toLocaleString("en-IN")}/month</p>
                  <p className="text-sm text-muted-foreground">{config.name} SIP • Next debit: 1st of next month</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Tx: {transactionId}</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex gap-2">
              {onViewPortfolio && (
                <Button onClick={onViewPortfolio} className={`flex-1 ${ctaClass}`}>
                  View Portfolio
                </Button>
              )}
            </motion.div>

            <Button variant="outline" className="w-full border-border text-muted-foreground hover:bg-muted" onClick={() => onOpenChange(false)}>
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // One-time Purchase Success - matching reference screenshots
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background border-border p-0 overflow-hidden">
        {/* Success Header */}
        <div className="relative pt-8 pb-6 bg-gradient-to-b from-bullion-success/20 to-transparent">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-bullion-success/20 flex items-center justify-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
                <CheckCircle2 className="w-8 h-8 text-bullion-success" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center mt-4">
            <h2 className="text-xl font-bold text-foreground">Payment Successful</h2>
          </motion.div>
        </div>

        <div className="px-6 pb-6 space-y-4">
          {/* Grams + Amount Display */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-3xl">{config.icon}</span>
              <p className={`text-3xl font-bold ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`}>
                +{grams.toFixed(4)}g
              </p>
            </div>
            <p className={`text-lg font-semibold ${isGold ? "text-bullion-gold-dark" : "text-bullion-silver-dark"}`}>
              ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </motion.div>

          {/* Transaction Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-card border border-border space-y-3"
          >
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground uppercase text-xs tracking-wide">Transaction ID</span>
              <span className="font-mono text-xs text-foreground">{transactionId}</span>
            </div>
            <div className="border-t border-border" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground uppercase text-xs tracking-wide block mb-1">Asset</span>
                <span className="font-medium text-foreground flex items-center gap-1">
                  {config.icon} {config.name}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase text-xs tracking-wide block mb-1">Quantity</span>
                <span className="font-medium text-foreground">{grams.toFixed(4)}g</span>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground uppercase text-xs tracking-wide block mb-1">Rate/g</span>
                <span className="font-medium text-foreground">₹{ratePerGram.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
              <div>
                <span className="text-muted-foreground uppercase text-xs tracking-wide block mb-1">GST (3%)</span>
                <span className="font-medium text-foreground">₹{taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
            <div className="border-t border-border" />
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground uppercase text-xs tracking-wide">Date</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </motion.div>

          {/* SIP Suggestion for one-time */}
          {onStartSIP && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-4 rounded-xl border ${isGold ? "bg-bullion-gold/10 border-bullion-gold/30" : "bg-bullion-silver/10 border-bullion-silver/30"}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Gift className={`w-5 h-5 ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`} />
                <p className={`font-semibold text-sm ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`}>SPECIAL OFFER</p>
              </div>
              <p className="font-bold mb-1 text-foreground">
                Start ₹{suggestedSIPAmount}/month {config.name} SIP
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Get <span className={`font-semibold ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`}>₹{bonusAmount} BONUS {config.name.toUpperCase()}</span> on your 1st SIP!
              </p>
              <Button onClick={onStartSIP} className={`w-full ${ctaClass} font-semibold`}>
                Start SIP Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Done Button */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <Button onClick={() => onOpenChange(false)} className={`w-full h-12 ${ctaClass} font-semibold text-lg border border-border`}>
              Done
            </Button>
          </motion.div>

          {/* Download Invoice Link */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <button className="w-full text-center text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
              <Download className="w-4 h-4" />
              Download PDF Invoice
            </button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

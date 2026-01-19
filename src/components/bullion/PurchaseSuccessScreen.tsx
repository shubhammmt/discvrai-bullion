import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Share2, Download, ArrowRight, Gift, Sparkles } from "lucide-react";
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
  bonusAmount?: number; // Optional bonus gold amount for offers
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
  bonusAmount = 10, // Default ₹10 bonus offer
}: PurchaseSuccessScreenProps) {
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙", color: "amber" },
    silver: { name: "Silver", icon: "🥈", color: "slate" },
  };
  const config = metalConfig[metal];

  // Dynamic SIP suggestion = same as purchase amount
  const suggestedSIPAmount = Math.max(amount, 100); // Minimum ₹100

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 p-0 overflow-hidden">
        {/* Success Animation Header */}
        <div className="relative pt-8 pb-6 bg-gradient-to-b from-emerald-500/20 to-transparent">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-4"
          >
            <h2 className="text-xl font-bold">
              {type === "sip" ? "SIP Activated!" : "Purchase Successful!"}
            </h2>
          </motion.div>
        </div>

        {/* Transaction Details */}
        <div className="px-6 pb-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-muted/50 border border-border/50"
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{config.icon}</span>
              <div>
                <p className="font-bold text-lg">+{grams.toFixed(4)}g {config.name}</p>
                <p className="text-sm text-muted-foreground">
                  ₹{amount.toLocaleString("en-IN")} • {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
                </p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              Tx: {transactionId}
            </p>
          </motion.div>

          {/* SIP-specific info */}
          {type === "sip" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-primary/10 border border-primary/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="font-semibold">SIP Details</p>
              </div>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>₹{amount.toLocaleString("en-IN")}/month</p>
                <p>Next debit: 1st of next month</p>
              </div>
            </motion.div>
          )}

          {/* Special Offer - SIP Suggestion (only for one-time) */}
          {type === "one_time" && onStartSIP && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="p-4 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30"
            >
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-amber-400" />
                <p className="font-semibold text-amber-400 text-sm">SPECIAL OFFER</p>
              </div>
              <p className="font-bold mb-1">
                Start ₹{suggestedSIPAmount}/month Gold SIP
              </p>
              <p className="text-sm text-muted-foreground mb-3">
                Get <span className="text-amber-400 font-semibold">₹{bonusAmount} BONUS GOLD</span> on your 1st SIP!
              </p>
              <Button
                onClick={onStartSIP}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold"
              >
                Start SIP Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {/* Portfolio Summary */}
          {portfolioTotal && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-center text-sm text-muted-foreground"
            >
              <p>Your Portfolio: Gold {portfolioTotal.gold.toFixed(2)}g • Silver {portfolioTotal.silver.toFixed(2)}g</p>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex gap-2"
          >
            {onShare && (
              <Button variant="outline" size="sm" onClick={onShare} className="flex-1">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
            )}
            <Button variant="outline" size="sm" className="flex-1">
              <Download className="w-4 h-4 mr-1" />
              Invoice
            </Button>
            {onViewPortfolio && (
              <Button onClick={onViewPortfolio} size="sm" className="flex-1">
                View Portfolio
              </Button>
            )}
          </motion.div>

          {/* Done Button */}
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

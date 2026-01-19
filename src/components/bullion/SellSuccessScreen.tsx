import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, ArrowRight, TrendingUp, Coins, Gift, Share2 } from "lucide-react";

interface SellSuccessScreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  grams: number;
  amount: number;
  transactionId: string;
  upiId: string;
  settlementDate: Date;
  onBuyMore?: () => void;
  onShare?: () => void;
  onDone?: () => void;
}

export function SellSuccessScreen({
  open,
  onOpenChange,
  metal,
  grams,
  amount,
  transactionId,
  upiId,
  settlementDate,
  onBuyMore,
  onShare,
  onDone,
}: SellSuccessScreenProps) {
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙", color: "bullion-gold" },
    silver: { name: "Silver", icon: "🥈", color: "bullion-silver" },
  };

  const config = metalConfig[metal];

  const handleClose = () => {
    onDone?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 p-0 overflow-hidden">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-10 h-10 text-emerald-400" />
          </motion.div>
          <h3 className="text-xl font-bold mb-1">Sale Successful!</h3>
          <p className="text-muted-foreground">Your {config.name} has been sold</p>
        </motion.div>

        <div className="p-6 space-y-4">
          {/* Transaction Details */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3"
          >
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Sold</span>
              <span className="font-semibold flex items-center gap-2">
                <span>{config.icon}</span>
                {grams.toFixed(4)}g {config.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="text-xl font-bold text-emerald-400">
                ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="border-t border-border/50 pt-3 flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Transaction ID</span>
              <span className="font-mono text-xs">{transactionId}</span>
            </div>
          </motion.div>

          {/* Settlement Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30"
          >
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-1">Settlement Details</p>
                <p className="text-sm text-muted-foreground">
                  ₹{amount.toLocaleString("en-IN")} will be credited to
                </p>
                <p className="font-medium mt-1">{upiId}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Expected by: {settlementDate.toLocaleDateString("en-IN", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Buy More Upsell */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-4 rounded-xl bullion-card-gold"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-bullion-gold/20 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-bullion-gold" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">
                  Reinvest for Better Returns?
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Gold prices are trending up! Consider buying back at current rates.
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={onBuyMore}
                    className="bg-bullion-gold hover:bg-bullion-gold-dark text-black"
                  >
                    <Coins className="w-4 h-4 mr-1" />
                    Buy {config.name}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-bullion-gold/30"
                  >
                    <Gift className="w-4 h-4 mr-1" />
                    Start SIP
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-3 pt-2"
          >
            <Button
              variant="outline"
              onClick={onShare}
              className="flex-1"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button
              onClick={handleClose}
              className="flex-1"
            >
              Done
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

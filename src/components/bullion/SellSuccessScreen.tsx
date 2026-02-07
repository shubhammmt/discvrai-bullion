import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Building2, ArrowRight, TrendingUp, Coins, Gift, Download } from "lucide-react";

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
  const isGold = metal === "gold";
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙" },
    silver: { name: "Silver", icon: "🥈" },
  };
  const config = metalConfig[metal];

  const ctaClass = isGold
    ? "bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white"
    : "bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-black";

  const handleClose = () => {
    onDone?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background border-border p-0 overflow-hidden">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-bullion-success/20 to-transparent p-6 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-16 h-16 rounded-full bg-bullion-success/20 flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-bullion-success" />
          </motion.div>
          <h3 className="text-xl font-bold text-foreground mb-1">Sale Successful</h3>
        </motion.div>

        <div className="px-6 pb-6 space-y-4">
          {/* Grams + Amount Display */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-3xl">{config.icon}</span>
              <p className={`text-3xl font-bold ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`}>
                -{grams.toFixed(4)}g
              </p>
            </div>
            <p className={`text-lg font-semibold ${isGold ? "text-bullion-gold-dark" : "text-bullion-silver-dark"}`}>
              ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
            </p>
          </motion.div>

          {/* Transaction Details Grid */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
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
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground uppercase text-xs tracking-wide">Date</span>
              <span className="font-medium text-foreground">
                {new Date().toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })}
              </span>
            </div>
          </motion.div>

          {/* Settlement Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className={`p-4 rounded-xl border ${isGold ? "bg-bullion-gold/10 border-bullion-gold/30" : "bg-bullion-silver/10 border-bullion-silver/30"}`}
          >
            <div className="flex items-start gap-3">
              <Building2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`} />
              <div>
                <p className="font-semibold text-sm text-foreground mb-1">Settlement Details</p>
                <p className="text-sm text-muted-foreground">
                  ₹{amount.toLocaleString("en-IN")} will be credited to
                </p>
                <p className="font-medium text-foreground mt-1">{upiId}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Expected by: {settlementDate.toLocaleDateString("en-IN", {
                    weekday: "short", month: "short", day: "numeric", year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Buy More Upsell */}
          {onBuyMore && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className={`p-4 rounded-xl border ${isGold ? "bullion-card-gold" : "bullion-card-silver"}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${isGold ? "bg-bullion-gold/20" : "bg-bullion-silver/20"}`}>
                  <TrendingUp className={`w-5 h-5 ${isGold ? "text-bullion-gold" : "text-bullion-silver"}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm text-foreground mb-1">Reinvest for Better Returns?</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    {config.name} prices are trending up! Consider buying back at current rates.
                  </p>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={onBuyMore} className={isGold ? "bg-bullion-gold hover:bg-bullion-gold-dark text-black" : "bg-bullion-silver hover:bg-bullion-silver-dark text-black"}>
                      <Coins className="w-4 h-4 mr-1" />
                      Buy {config.name}
                    </Button>
                    <Button size="sm" variant="outline" className={isGold ? "border-bullion-gold/30" : "border-bullion-silver/30"}>
                      <Gift className="w-4 h-4 mr-1" />
                      Start SIP
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Done Button */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Button onClick={handleClose} className={`w-full h-12 ${ctaClass} font-semibold text-lg border border-border`}>
              Back to Dashboard
            </Button>
          </motion.div>

          {/* Download Invoice */}
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

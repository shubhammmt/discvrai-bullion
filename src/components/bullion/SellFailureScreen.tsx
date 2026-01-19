import { motion } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, AlertTriangle, RefreshCw, MessageCircle, ArrowRight, Clock, Shield } from "lucide-react";

interface SellFailureScreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "sell_failed" | "payout_failed";
  metal: "gold" | "silver";
  grams: number;
  amount: number;
  reason?: string;
  referenceId?: string;
  onRetry?: () => void;
  onContactSupport?: () => void;
  onClose?: () => void;
}

export function SellFailureScreen({
  open,
  onOpenChange,
  type,
  metal,
  grams,
  amount,
  reason,
  referenceId,
  onRetry,
  onContactSupport,
  onClose,
}: SellFailureScreenProps) {
  const metalConfig = {
    gold: { name: "Gold", icon: "🪙" },
    silver: { name: "Silver", icon: "🥈" },
  };

  const config = metalConfig[metal];

  const failureContent = {
    sell_failed: {
      icon: XCircle,
      iconColor: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/30",
      title: "Sale Failed",
      description: "We couldn't process your sale. Your holdings are safe.",
      notice: {
        icon: Shield,
        title: "Your Gold is Safe",
        text: `Your ${grams.toFixed(4)}g ${config.name} is still in your vault. No deduction was made.`,
      },
    },
    payout_failed: {
      icon: AlertTriangle,
      iconColor: "text-amber-400",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/30",
      title: "Payout Failed",
      description: "Sale completed but payout couldn't be processed.",
      notice: {
        icon: Clock,
        title: "Payout Pending",
        text: `Your sale of ${grams.toFixed(4)}g ${config.name} was successful. We're retrying the payout automatically.`,
      },
    },
  };

  const content = failureContent[type];
  const IconComponent = content.icon;

  const handleClose = () => {
    onClose?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 p-0 overflow-hidden">
        {/* Failure Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${content.bgColor} p-6 text-center`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className={`w-20 h-20 rounded-full ${content.bgColor} flex items-center justify-center mx-auto mb-4`}
          >
            <IconComponent className={`w-10 h-10 ${content.iconColor}`} />
          </motion.div>
          <h3 className="text-xl font-bold mb-1">{content.title}</h3>
          <p className="text-muted-foreground">{content.description}</p>
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
              <span className="text-muted-foreground">Attempted Sale</span>
              <span className="font-semibold flex items-center gap-2">
                <span>{config.icon}</span>
                {grams.toFixed(4)}g {config.name}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-bold">
                ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </span>
            </div>
            {referenceId && (
              <div className="border-t border-border/50 pt-3 flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Reference ID</span>
                <span className="font-mono text-xs">{referenceId}</span>
              </div>
            )}
          </motion.div>

          {/* Reason */}
          {reason && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className={`p-4 rounded-xl ${content.bgColor} ${content.borderColor} border`}
            >
              <p className="text-sm font-medium mb-1">Reason</p>
              <p className="text-sm text-muted-foreground">{reason}</p>
            </motion.div>
          )}

          {/* Notice */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-muted/30 border border-border/30"
          >
            <div className="flex items-start gap-3">
              <content.notice.icon className={`w-5 h-5 ${content.iconColor} flex-shrink-0 mt-0.5`} />
              <div>
                <p className="font-semibold text-sm mb-1">{content.notice.title}</p>
                <p className="text-sm text-muted-foreground">{content.notice.text}</p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-3 pt-2"
          >
            {type === "sell_failed" && (
              <Button
                onClick={onRetry}
                className="w-full"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            )}
            
            {type === "payout_failed" && (
              <Button
                onClick={onRetry}
                className="w-full"
              >
                <Clock className="w-4 h-4 mr-2" />
                Track Payout Status
              </Button>
            )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onContactSupport}
                className="flex-1"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Get Help
              </Button>
              <Button
                variant="ghost"
                onClick={handleClose}
                className="flex-1"
              >
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

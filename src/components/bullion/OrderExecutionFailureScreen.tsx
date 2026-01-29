import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Clock, RefreshCw, HeadphonesIcon, ArrowLeft, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";

type TransactionType = "buy" | "sell";

interface OrderExecutionFailureScreenProps {
  transactionType: TransactionType;
  amount: number;
  referenceId: string;
  onTrackRefund?: () => void;
  onRetry?: () => void;
  onContactSupport?: () => void;
  onBack?: () => void;
}

export function OrderExecutionFailureScreen({
  transactionType,
  amount,
  referenceId,
  onTrackRefund,
  onRetry,
  onContactSupport,
  onBack,
}: OrderExecutionFailureScreenProps) {
  const navigate = useNavigate();

  const transactionConfig = {
    buy: {
      title: "Purchase",
      failureMessage: "Your order could not be processed",
    },
    sell: {
      title: "Sale",
      failureMessage: "Payout for your sale could not be processed",
    },
  };

  const txConfig = transactionConfig[transactionType];

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with back button */}
      <header className="p-4 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleBack}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Warning Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-amber-500/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <AlertTriangle className="w-12 h-12 text-amber-400" />
              </motion.div>
            </div>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6"
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-3">
              Payment Received, Order Failed
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              {txConfig.failureMessage}
            </p>
          </motion.div>

          {/* Transaction Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-xl bg-muted/50 border border-border/50 mb-4"
          >
          <div className="space-y-4">
              {/* Transaction Type */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction</span>
                <span className="font-semibold capitalize">{txConfig.title}</span>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-bold text-lg">
                  ₹{amount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </span>
              </div>

              {/* Reference ID */}
              <div className="border-t border-border/50 pt-4 flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Reference ID</span>
                <span className="font-mono text-xs bg-muted px-2 py-1 rounded">
                  {referenceId}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Refund Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 mb-8"
          >
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-foreground" />
                  <span className="font-semibold text-sm text-foreground">Auto-Refund in Progress</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your payment is safe. A full refund will be processed automatically within{" "}
                  <span className="font-semibold text-foreground">3-5 business days</span> to your original payment method.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={onTrackRefund}
              className="w-full h-12 text-base"
              size="lg"
            >
              <Clock className="w-5 h-5 mr-2" />
              Track Refund Status
            </Button>

            <Button
              variant="outline"
              onClick={onRetry}
              className="w-full h-12 text-base"
              size="lg"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Retry {txConfig.title}
            </Button>

            <Button
              variant="ghost"
              onClick={onContactSupport}
              className="w-full text-muted-foreground"
            >
              <HeadphonesIcon className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Save a screenshot of this page for your records. Reference ID: {referenceId}
        </p>
      </footer>
    </div>
  );
}

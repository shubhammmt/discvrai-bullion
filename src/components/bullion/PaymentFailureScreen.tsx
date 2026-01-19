import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XCircle, AlertTriangle, RefreshCw, CreditCard, HeadphonesIcon, Clock } from "lucide-react";
import { motion } from "framer-motion";

type FailureType = "payment_failed" | "order_failed";

interface PaymentFailureScreenProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: FailureType;
  amount: number;
  reason?: string;
  referenceId: string;
  onRetry?: () => void;
  onTryAnotherMethod?: () => void;
  onContactSupport?: () => void;
  onTrackRefund?: () => void;
}

export function PaymentFailureScreen({
  open,
  onOpenChange,
  type,
  amount,
  reason = "Transaction timed out",
  referenceId,
  onRetry,
  onTryAnotherMethod,
  onContactSupport,
  onTrackRefund,
}: PaymentFailureScreenProps) {
  const isPaymentFailed = type === "payment_failed";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50 p-0 overflow-hidden">
        {/* Error Header */}
        <div className="relative pt-8 pb-6 bg-gradient-to-b from-red-500/20 to-transparent">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center"
          >
            <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                {isPaymentFailed ? (
                  <XCircle className="w-10 h-10 text-red-400" />
                ) : (
                  <AlertTriangle className="w-10 h-10 text-amber-400" />
                )}
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
              {isPaymentFailed ? "Payment Failed" : "Order Processing Failed"}
            </h2>
          </motion.div>
        </div>

        {/* Error Details */}
        <div className="px-6 pb-6 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-4 rounded-xl bg-muted/50 border border-border/50"
          >
            {isPaymentFailed ? (
              <>
                <p className="text-muted-foreground mb-2">
                  Your payment of <span className="font-semibold text-foreground">₹{amount.toLocaleString("en-IN")}</span> could not be processed.
                </p>
                <div className="text-sm space-y-1">
                  <p><span className="text-muted-foreground">Reason:</span> {reason}</p>
                  <p><span className="text-muted-foreground">Ref:</span> {referenceId}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 text-amber-400 mb-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">Payment Received</span>
                </div>
                <p className="text-muted-foreground mb-2">
                  <span className="font-semibold text-foreground">₹{amount.toLocaleString("en-IN")}</span> received but gold could not be credited due to a processing error.
                </p>
                <p className="text-sm text-muted-foreground">
                  Ref: {referenceId}
                </p>
              </>
            )}
          </motion.div>

          {/* Refund/Info Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`p-3 rounded-lg text-sm ${
              isPaymentFailed 
                ? "bg-muted/30 text-muted-foreground"
                : "bg-amber-500/10 border border-amber-500/30 text-amber-200"
            }`}
          >
            {isPaymentFailed ? (
              <>
                <p>No amount has been deducted from your account.</p>
                <p className="mt-1">If debited, refund will be processed in 3-5 business days.</p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-1">
                  <RefreshCw className="w-4 h-4" />
                  <span className="font-medium">Refund in Progress</span>
                </div>
                <p>Your refund is being processed automatically. Expected: 24-48 hours.</p>
              </>
            )}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            {isPaymentFailed ? (
              <>
                {onRetry && (
                  <Button onClick={onRetry} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Payment
                  </Button>
                )}
                {onTryAnotherMethod && (
                  <Button variant="outline" onClick={onTryAnotherMethod} className="w-full">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Try Another Method
                  </Button>
                )}
              </>
            ) : (
              <>
                {onRetry && (
                  <Button onClick={onRetry} className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retry Purchase
                  </Button>
                )}
                {onTrackRefund && (
                  <Button variant="outline" onClick={onTrackRefund} className="w-full">
                    <Clock className="w-4 h-4 mr-2" />
                    Track Refund
                  </Button>
                )}
              </>
            )}
            {onContactSupport && (
              <Button variant="ghost" onClick={onContactSupport} className="w-full">
                <HeadphonesIcon className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            )}
          </motion.div>

          {/* Close Button */}
          <Button
            variant="ghost"
            className="w-full text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

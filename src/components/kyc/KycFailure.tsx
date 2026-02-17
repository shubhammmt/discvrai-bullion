import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

interface KycFailureProps {
  onRetry: () => void;
  onCancel: () => void;
}

export function KycFailure({ onRetry, onCancel }: KycFailureProps) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center mb-6"
      >
        <AlertCircle className="w-10 h-10 text-destructive" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold mb-2">We couldn't save your KYC details</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Please check your details and try again.
        </p>
      </motion.div>

      <div className="w-full space-y-3">
        <Button onClick={onRetry} className="w-full h-12 text-base">
          Retry
        </Button>
        <Button variant="outline" onClick={onCancel} className="w-full">
          Cancel
        </Button>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { maskPAN } from "@/lib/kycStorage";
import { parse, format, isValid } from "date-fns";

interface KycSuccessProps {
  pan: string;
  dob: string; // DD-MM-YYYY
  onContinue: () => void;
}

export function KycSuccess({ pan, dob, onContinue }: KycSuccessProps) {
  const displayDob = (() => {
    const parsed = parse(dob, "dd-MM-yyyy", new Date());
    return isValid(parsed) ? format(parsed, "dd/MM/yyyy") : dob;
  })();

  return (
    <div className="flex flex-col items-center text-center py-4">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-6"
      >
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h2 className="text-xl font-bold mb-2">KYC Details Saved Successfully</h2>
        <p className="text-sm text-muted-foreground mb-6">Your identity has been verified</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full p-4 rounded-xl bg-muted/50 border border-border/50 space-y-3 mb-6"
      >
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">PAN</span>
          <span className="font-semibold font-mono">{maskPAN(pan)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Date of Birth</span>
          <span className="font-semibold">{displayDob}</span>
        </div>
      </motion.div>

      <Button onClick={onContinue} className="w-full h-12 text-base">
        Continue to Payment
      </Button>
    </div>
  );
}

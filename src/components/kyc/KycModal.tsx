import { useState, useCallback } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { KycEntry } from "./KycEntry";
import { KycSuccess } from "./KycSuccess";
import { KycFailure } from "./KycFailure";
import { useKyc } from "@/hooks/useKyc";

type KycStep = "entry" | "success" | "failure";

interface KycModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void; // called when user taps "Continue" on success screen
  onCancel: () => void;
}

export function KycModal({ open, onOpenChange, onSuccess, onCancel }: KycModalProps) {
  const { submitKyc } = useKyc();
  const [step, setStep] = useState<KycStep>("entry");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savedPan, setSavedPan] = useState("");
  const [savedDob, setSavedDob] = useState("");

  const handleSubmit = useCallback(async (pan: string, dob: string) => {
    setSavedPan(pan);
    setSavedDob(dob);
    setIsSubmitting(true);

    // Simulate API delay 1-1.5s
    await new Promise((r) => setTimeout(r, 1000 + Math.random() * 500));

    // 20% failure rate for testing
    const shouldFail = Math.random() < 0.2;
    setIsSubmitting(false);

    if (shouldFail) {
      setStep("failure");
    } else {
      submitKyc(pan, dob);
      setStep("success");
    }
  }, [submitKyc]);

  const handleRetry = () => {
    setStep("entry"); // go back to entry with values preserved
  };

  const handleClose = () => {
    // Reset for next open
    setStep("entry");
    setSavedPan("");
    setSavedDob("");
    onOpenChange(false);
  };

  const handleCancel = () => {
    handleClose();
    onCancel();
  };

  const handleContinue = () => {
    handleClose();
    onSuccess();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) handleCancel(); }}>
      <DialogContent className="sm:max-w-md bg-background border-border">
        {step === "entry" && (
          <KycEntry
            initialPan={savedPan}
            initialDob={savedDob}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={isSubmitting}
          />
        )}
        {step === "success" && (
          <KycSuccess pan={savedPan} dob={savedDob} onContinue={handleContinue} />
        )}
        {step === "failure" && (
          <KycFailure onRetry={handleRetry} onCancel={handleCancel} />
        )}
      </DialogContent>
    </Dialog>
  );
}

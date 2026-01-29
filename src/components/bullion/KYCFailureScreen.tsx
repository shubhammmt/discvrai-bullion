import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldX, Smartphone, HeadphonesIcon, ArrowLeft, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface KYCFailureScreenProps {
  onLoginWithMobile?: () => void;
  onContactSupport?: () => void;
  onBack?: () => void;
}

export function KYCFailureScreen({
  onLoginWithMobile,
  onContactSupport,
  onBack,
}: KYCFailureScreenProps) {
  const navigate = useNavigate();

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
          {/* Error Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 rounded-full bg-destructive/20 flex items-center justify-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <ShieldX className="w-12 h-12 text-destructive" />
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
              PAN Verification Required
            </h1>
            <p className="text-muted-foreground text-base md:text-lg">
              We couldn't verify your PAN details
            </p>
          </motion.div>

          {/* Explanation Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-5 rounded-xl bg-destructive/10 border border-destructive/30 mb-6"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-2">Why is PAN required?</p>
                <p className="text-sm text-muted-foreground">
                  As per regulatory requirements, PAN verification is mandatory for buying or selling digital gold and silver. This helps ensure secure and compliant transactions.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recovery Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="p-5 rounded-xl bg-muted/50 border border-border/50 mb-8"
          >
            <div className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm mb-2">How to resolve this?</p>
                <p className="text-sm text-muted-foreground">
                  Login with the same mobile number with which your PAN is linked. This will automatically verify your identity and enable transactions.
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
              onClick={onLoginWithMobile}
              className="w-full h-12 text-base"
              size="lg"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Login with Mobile Number
            </Button>

            <Button
              variant="outline"
              onClick={onContactSupport}
              className="w-full h-12 text-base"
              size="lg"
            >
              <HeadphonesIcon className="w-5 h-5 mr-2" />
              Contact Support
            </Button>

            <Button
              variant="ghost"
              onClick={handleBack}
              className="w-full text-muted-foreground"
            >
              Go Back
            </Button>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-4 text-center">
        <p className="text-xs text-muted-foreground">
          Need help? Reach out to our support team for assistance.
        </p>
      </footer>
    </div>
  );
}

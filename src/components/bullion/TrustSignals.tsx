import { Shield, Award, Lock, Building2 } from "lucide-react";
import { motion } from "framer-motion";

const trustBadges = [
  {
    icon: Award,
    label: "Powered by Augmont",
    sublabel: "India's #1 Gold Platform",
  },
  {
    icon: Shield,
    label: "BIS Hallmarked",
    sublabel: "24K 99.9% Pure",
  },
  {
    icon: Building2,
    label: "Brinks Vault",
    sublabel: "Bank-Grade Storage",
  },
  {
    icon: Lock,
    label: "100% Insured",
    sublabel: "Against Theft & Damage",
  },
];

interface TrustSignalsProps {
  variant?: "compact" | "full";
}

export function TrustSignals({ variant = "compact" }: TrustSignalsProps) {
  if (variant === "full") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Trust & Safety</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {trustBadges.map((badge, index) => {
            const Icon = badge.icon;
            
            return (
              <motion.div
                key={badge.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/30 border border-border/50"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-amber-500" />
                </div>
                <p className="font-medium text-sm">{badge.label}</p>
                <p className="text-xs text-muted-foreground">{badge.sublabel}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Compact variant - single row
  return (
    <div className="py-4 border-y border-border/30">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {trustBadges.map((badge, index) => {
          const Icon = badge.icon;
          
          return (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2"
            >
              <Icon className="w-4 h-4 text-amber-500" />
              <span className="text-xs text-muted-foreground">{badge.label}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

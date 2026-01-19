import { Wallet, CreditCard, Shield, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const steps = [
  {
    step: 1,
    icon: Wallet,
    title: "Choose Amount",
    description: "Pick how much you want to invest in gold or silver",
    color: "amber",
  },
  {
    step: 2,
    icon: CreditCard,
    title: "Pay via UPI",
    description: "Quick & secure payment with your preferred UPI app",
    color: "blue",
  },
  {
    step: 3,
    icon: Shield,
    title: "Gold in Your Vault",
    description: "Your gold is stored safely in insured vaults",
    color: "emerald",
  },
];

const colorClasses = {
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    icon: "text-amber-500",
    number: "bg-amber-500",
  },
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: "text-blue-500",
    number: "bg-blue-500",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    icon: "text-emerald-500",
    number: "bg-emerald-500",
  },
};

interface HowItWorksProps {
  variant?: "horizontal" | "vertical";
}

export function HowItWorks({ variant = "horizontal" }: HowItWorksProps) {
  if (variant === "vertical") {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">How It Works</h2>
        <div className="space-y-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const colors = colorClasses[step.color as keyof typeof colorClasses];
            
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                className="flex gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full ${colors.number} flex items-center justify-center text-white font-bold`}>
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-12 bg-border/50 mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className={`w-4 h-4 ${colors.icon}`} />
                    <h3 className="font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const colors = colorClasses[step.color as keyof typeof colorClasses];
          
          return (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <Card className={`p-5 h-full ${colors.border} relative`}>
                {/* Step number */}
                <div className={`absolute -top-3 -left-2 w-8 h-8 rounded-full ${colors.number} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                  {step.step}
                </div>
                
                <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-3 mt-2`}>
                  <Icon className={`w-6 h-6 ${colors.icon}`} />
                </div>
                
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
              
              {/* Arrow connector (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:flex absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

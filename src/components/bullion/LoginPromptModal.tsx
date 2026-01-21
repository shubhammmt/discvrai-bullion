import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Wallet, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

type UserState = "new" | "logged_in_no_holdings" | "investor";

interface LoginPromptModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectState: (state: UserState) => void;
}

export function LoginPromptModal({ open, onOpenChange, onSelectState }: LoginPromptModalProps) {
  const options = [
    {
      state: "logged_in_no_holdings" as UserState,
      icon: User,
      title: "New to Investing",
      description: "I just created my account and want to explore",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      state: "investor" as UserState,
      icon: TrendingUp,
      title: "Existing Investor",
      description: "I already have gold & silver holdings",
      gradient: "from-amber-500 to-amber-600",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Select Your Profile
          </DialogTitle>
          <DialogDescription>
            Choose a demo profile to explore the portfolio features
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {options.map((option, index) => (
            <motion.div
              key={option.state}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="p-4 cursor-pointer transition-all hover:scale-[1.02] hover:border-primary/50"
                onClick={() => onSelectState(option.state)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${option.gradient} flex items-center justify-center`}>
                    <option.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{option.title}</h3>
                    <p className="text-sm text-muted-foreground">{option.description}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-4">
          This is a demo mode. No actual login required.
        </p>
      </DialogContent>
    </Dialog>
  );
}

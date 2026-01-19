import { Coins, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface EmptyHoldingsPromptProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  onBuy: () => void;
  onStartSIP: () => void;
}

export function EmptyHoldingsPrompt({
  open,
  onOpenChange,
  metal,
  onBuy,
  onStartSIP,
}: EmptyHoldingsPromptProps) {
  const isGold = metal === "gold";
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="sr-only">
          <DialogTitle>No {metal} to sell</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-4"
        >
          {/* Icon */}
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            isGold ? "bg-amber-500/20" : "bg-slate-400/20"
          }`}>
            <Coins className={`w-10 h-10 ${isGold ? "text-amber-500" : "text-slate-400"}`} />
          </div>

          {/* Message */}
          <h3 className="text-xl font-bold mb-2">
            No {isGold ? "Gold" : "Silver"} to Sell Yet
          </h3>
          <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
            You don't have any {metal} in your vault. Start investing today and build your precious metals portfolio.
          </p>

          {/* Stats teaser */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${
            isGold ? "bg-amber-500/10 text-amber-400" : "bg-slate-400/10 text-slate-300"
          }`}>
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">
              {isGold ? "Gold up ~10% annually" : "Silver up ~15% this year"}
            </span>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button 
              onClick={() => {
                onOpenChange(false);
                onBuy();
              }}
              className={`w-full ${
                isGold 
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black" 
                  : "bg-slate-700 hover:bg-slate-600 text-white"
              }`}
              size="lg"
            >
              {isGold ? "🪙" : "🥈"} Buy {isGold ? "Gold" : "Silver"} Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button 
              onClick={() => {
                onOpenChange(false);
                onStartSIP();
              }}
              variant="outline"
              className="w-full"
              size="lg"
            >
              Start {isGold ? "Gold" : "Silver"} SIP
            </Button>
          </div>

          {/* Benefit reminder */}
          <p className="text-xs text-muted-foreground mt-4">
            Start from just ₹{isGold ? "10" : "10"} • 0% storage fee • 100% insured
          </p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}

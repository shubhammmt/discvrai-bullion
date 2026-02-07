import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ArrowRight, Wallet, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

interface BuyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  metal: "gold" | "silver";
  currentPrice: number;
}

export function BuyModal({ open, onOpenChange, metal, currentPrice }: BuyModalProps) {
  const [buyMode, setBuyMode] = useState<"rupees" | "grams">("rupees");
  const [amount, setAmount] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isPriceLocked, setIsPriceLocked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const metalConfig = {
    gold: { name: "Gold", icon: "🪙", color: "amber" },
    silver: { name: "Silver", icon: "🥈", color: "slate" },
  };

  const config = metalConfig[metal];

  // Calculate conversion
  const numericAmount = parseFloat(amount) || 0;
  const grams = buyMode === "rupees" ? numericAmount / currentPrice : numericAmount;
  const rupees = buyMode === "grams" ? numericAmount * currentPrice : numericAmount;
  const gstAmount = rupees * 0.03; // 3% GST
  const totalAmount = rupees + gstAmount;

  // Countdown timer
  useEffect(() => {
    if (!isPriceLocked || timeLeft <= 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsPriceLocked(false);
          toast.error("Price lock expired. Please lock again.");
          return 300;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPriceLocked, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleLockPrice = () => {
    if (numericAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    setIsPriceLocked(true);
    setTimeLeft(300);
    toast.success("Price locked for 5 minutes!");
  };

  const handleProceedToPay = async () => {
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setIsSuccess(true);
    toast.success(`${config.name} purchase successful!`);
  };

  const handleClose = () => {
    setAmount("");
    setIsPriceLocked(false);
    setTimeLeft(300);
    setIsSuccess(false);
    onOpenChange(false);
  };

  const quickAmounts = [500, 1000, 2000, 5000];

  if (isSuccess) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
          <div className="flex flex-col items-center py-8 text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 animate-pulse">
              <CheckCircle2 className="w-10 h-10 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              {config.icon} {config.name} Added to Vault!
            </h3>
            <p className="text-muted-foreground mb-6">
              {grams.toFixed(4)}g of {config.name} has been credited
            </p>
            <Button onClick={handleClose} className="w-full border border-border">
              Done
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-background/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Buy {config.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={buyMode} onValueChange={(v) => setBuyMode(v as "rupees" | "grams")} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="rupees">Buy in ₹</TabsTrigger>
            <TabsTrigger value="grams">Buy in Grams</TabsTrigger>
          </TabsList>

          <TabsContent value="rupees" className="space-y-4">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-muted-foreground">₹</span>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="h-16 text-3xl font-bold pl-10 text-center"
              />
            </div>
            <div className="flex gap-2">
              {quickAmounts.map((amt) => (
                <Button
                  key={amt}
                  variant="outline"
                  size="sm"
                  onClick={() => setAmount(amt.toString())}
                  className="flex-1"
                >
                  ₹{amt}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="grams" className="space-y-4">
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                step="0.01"
                className="h-16 text-3xl font-bold text-center"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-lg font-medium text-muted-foreground">grams</span>
            </div>
          </TabsContent>
        </Tabs>

        {/* Conversion Display */}
        {numericAmount > 0 && (
          <div className="p-4 rounded-xl bg-muted/50 border border-border/50 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">You'll get</span>
              <span className="font-semibold">{grams.toFixed(4)}g {config.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Rate</span>
              <span className="font-medium">₹{currentPrice.toLocaleString("en-IN")}/g</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">GST (3%)</span>
              <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-border/50 pt-2 flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">₹{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        )}

        {/* Price Lock Timer */}
        {isPriceLocked && (
          <div className="flex items-center justify-center gap-2 p-3 rounded-full bg-amber-500/20 border border-amber-500/30">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 font-mono font-bold">{formatTime(timeLeft)}</span>
            <span className="text-amber-400 text-sm">Price Locked</span>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-2">
          {!isPriceLocked ? (
            <Button
              onClick={handleLockPrice}
              disabled={numericAmount <= 0}
              className="w-full h-12 text-lg"
            >
              <Wallet className="w-5 h-5 mr-2" />
              Lock Price
            </Button>
          ) : (
            <Button
              onClick={handleProceedToPay}
              disabled={isProcessing}
              className="w-full h-12 text-lg bg-emerald-600 hover:bg-emerald-700"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  Proceed to Pay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

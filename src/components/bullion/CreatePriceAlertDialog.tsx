import { useState } from "react";
import { Coins, Medal, Bell, Send, MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface PriceAlert {
  id: string;
  metal: "gold" | "silver";
  condition: "above" | "below";
  targetPrice: number;
  channels: { push: boolean; telegram: boolean; whatsapp: boolean };
}

interface CreatePriceAlertDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editAlert?: PriceAlert | null;
  onAlertCreated?: (alert: PriceAlert) => void;
  onAlertUpdated?: (alert: PriceAlert) => void;
}

const CURRENT_PRICES = { gold: 7245, silver: 89 };

export const CreatePriceAlertDialog = ({
  open,
  onOpenChange,
  editAlert,
  onAlertCreated,
  onAlertUpdated,
}: CreatePriceAlertDialogProps) => {
  const [metal, setMetal] = useState<"gold" | "silver">(editAlert?.metal || "gold");
  const [condition, setCondition] = useState<"above" | "below">(editAlert?.condition || "below");
  const [targetPrice, setTargetPrice] = useState(editAlert?.targetPrice?.toString() || "");
  const [channels, setChannels] = useState(
    editAlert?.channels || { push: true, telegram: false, whatsapp: false }
  );

  const currentPrice = CURRENT_PRICES[metal];
  const isEditing = !!editAlert;

  const applyPercentage = (percent: number) => {
    const newPrice = Math.round(currentPrice * (1 + percent / 100));
    setTargetPrice(newPrice.toString());
    // Auto-set condition based on direction
    setCondition(percent > 0 ? "above" : "below");
  };

  const handleSubmit = () => {
    const price = parseFloat(targetPrice);
    if (!price || price <= 0) {
      toast.error("Please enter a valid target price");
      return;
    }

    const alert: PriceAlert = {
      id: editAlert?.id || `alert_${Date.now()}`,
      metal,
      condition,
      targetPrice: price,
      channels,
    };

    if (isEditing) {
      onAlertUpdated?.(alert);
      toast.success(`${metal === "gold" ? "Gold" : "Silver"} alert updated to ₹${price.toLocaleString("en-IN")}`, {
        description: `You'll be notified when price goes ${condition} this target`,
      });
    } else {
      onAlertCreated?.(alert);
      toast.success(`${metal === "gold" ? "Gold" : "Silver"} price alert created!`, {
        description: `Alert set for ₹${price.toLocaleString("en-IN")}/gm (${condition} current price)`,
      });
    }

    onOpenChange(false);
    // Reset form
    setTargetPrice("");
    setCondition("below");
    setChannels({ push: true, telegram: false, whatsapp: false });
  };

  const isGold = metal === "gold";
  const metalAccent = isGold
    ? "bg-amber-500 text-black hover:bg-amber-600"
    : "bg-slate-500 text-white hover:bg-slate-600";
  const metalBorder = isGold
    ? "border-amber-300 dark:border-amber-700"
    : "border-slate-300 dark:border-slate-600";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Price Alert" : "Create Price Alert"}
          </DialogTitle>
          <DialogDescription>
            Get notified when metal prices hit your target
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5">
          {/* Metal Toggle */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <button
              onClick={() => setMetal("gold")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                isGold
                  ? "bg-amber-500 text-black shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Coins size={16} />
              Gold
            </button>
            <button
              onClick={() => setMetal("silver")}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium transition-all ${
                !isGold
                  ? "bg-slate-500 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Medal size={16} />
              Silver
            </button>
          </div>

          {/* Current Price Reference */}
          <div className={`text-center p-3 rounded-lg border ${metalBorder} bg-muted/30`}>
            <p className="text-xs text-muted-foreground">Current Price</p>
            <p className="text-2xl font-bold">₹{currentPrice.toLocaleString("en-IN")}<span className="text-sm font-normal text-muted-foreground">/gm</span></p>
          </div>

          {/* Condition Toggle */}
          <div>
            <p className="text-sm font-medium mb-2">Alert when price goes</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCondition("above")}
                className={`flex-1 py-2 rounded-md text-sm font-medium border transition-all ${
                  condition === "above"
                    ? "bg-green-500/10 border-green-500 text-green-700 dark:text-green-400"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                ↑ Above
              </button>
              <button
                onClick={() => setCondition("below")}
                className={`flex-1 py-2 rounded-md text-sm font-medium border transition-all ${
                  condition === "below"
                    ? "bg-red-500/10 border-red-500 text-red-700 dark:text-red-400"
                    : "border-border text-muted-foreground hover:border-foreground/30"
                }`}
              >
                ↓ Below
              </button>
            </div>
          </div>

          {/* Target Price Input */}
          <div>
            <p className="text-sm font-medium mb-2">Target Price (₹/gm)</p>
            <Input
              type="number"
              placeholder={currentPrice.toString()}
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              className="text-center text-lg font-semibold h-12"
            />
          </div>

          {/* Percentage Shortcuts */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">Quick set from current price</p>
            <div className="grid grid-cols-4 gap-2">
              {[-10, -5, 5, 10].map((pct) => (
                <Button
                  key={pct}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPercentage(pct)}
                  className="text-xs"
                >
                  {pct > 0 ? "+" : ""}{pct}%
                </Button>
              ))}
            </div>
          </div>

          {/* Notification Channels */}
          <div>
            <p className="text-sm font-medium mb-3">Notify via</p>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={channels.push}
                  onCheckedChange={(checked) =>
                    setChannels((c) => ({ ...c, push: !!checked }))
                  }
                />
                <Bell size={16} className="text-muted-foreground" />
                <span className="text-sm">Push Notification</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={channels.telegram}
                  onCheckedChange={(checked) =>
                    setChannels((c) => ({ ...c, telegram: !!checked }))
                  }
                />
                <Send size={16} className="text-blue-500" />
                <span className="text-sm">Telegram</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox
                  checked={channels.whatsapp}
                  onCheckedChange={(checked) =>
                    setChannels((c) => ({ ...c, whatsapp: !!checked }))
                  }
                />
                <MessageCircle size={16} className="text-green-500" />
                <span className="text-sm">WhatsApp</span>
              </label>
            </div>
          </div>

          {/* CTA */}
          <Button onClick={handleSubmit} className={`w-full h-12 font-semibold ${metalAccent}`}>
            {isEditing ? "Update Alert" : "Create Alert"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

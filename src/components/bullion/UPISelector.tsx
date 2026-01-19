import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Plus, Trash2, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface UPIAccount {
  id: string;
  upiId: string;
  isPrimary: boolean;
  provider?: string;
}

interface UPISelectorProps {
  accounts: UPIAccount[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddAccount: (upiId: string) => void;
  onRemoveAccount?: (id: string) => void;
  onSetPrimary?: (id: string) => void;
}

const getUPIProvider = (upiId: string): string => {
  const handle = upiId.split("@")[1]?.toLowerCase();
  const providers: Record<string, string> = {
    okaxis: "Google Pay",
    okhdfcbank: "Google Pay",
    okicici: "Google Pay",
    oksbi: "Google Pay",
    paytm: "Paytm",
    ybl: "PhonePe",
    ibl: "PhonePe",
    axl: "PhonePe",
    upi: "BHIM",
    apl: "Amazon Pay",
  };
  return providers[handle] || "UPI";
};

export function UPISelector({
  accounts,
  selectedId,
  onSelect,
  onAddAccount,
  onRemoveAccount,
  onSetPrimary,
}: UPISelectorProps) {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUpiId, setNewUpiId] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);

  const handleAddUPI = async () => {
    if (!newUpiId.includes("@")) {
      toast.error("Please enter a valid UPI ID (e.g., name@upi)");
      return;
    }

    setIsVerifying(true);
    // Simulate UPI verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsVerifying(false);

    onAddAccount(newUpiId);
    setNewUpiId("");
    setShowAddDialog(false);
    toast.success("UPI ID added successfully!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">Receive Payment To</Label>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-xs">
              <Plus className="w-3 h-3 mr-1" />
              Add UPI
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5" />
                Add UPI ID
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>UPI ID</Label>
                <Input
                  placeholder="yourname@upi"
                  value={newUpiId}
                  onChange={(e) => setNewUpiId(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  Enter your UPI ID linked to your bank account
                </p>
              </div>
              <Button
                onClick={handleAddUPI}
                disabled={!newUpiId || isVerifying}
                className="w-full"
              >
                {isVerifying ? "Verifying..." : "Add UPI ID"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {accounts.length === 0 ? (
        <div className="p-4 rounded-xl border border-dashed border-border text-center">
          <Smartphone className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground mb-3">
            No UPI ID added yet
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddDialog(true)}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add UPI ID
          </Button>
        </div>
      ) : (
        <RadioGroup value={selectedId || ""} onValueChange={onSelect}>
          <div className="space-y-2">
            <AnimatePresence mode="popLayout">
              {accounts.map((account) => (
                <motion.div
                  key={account.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className={`
                    relative flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer
                    ${selectedId === account.id
                      ? "border-bullion-gold bg-bullion-gold/5"
                      : "border-border/50 hover:border-border"
                    }
                  `}
                  onClick={() => onSelect(account.id)}
                >
                  <RadioGroupItem value={account.id} id={account.id} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{account.upiId}</span>
                      {account.isPrimary && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-bullion-gold/20 text-bullion-gold">
                          Primary
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {getUPIProvider(account.upiId)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {selectedId === account.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        <Check className="w-5 h-5 text-bullion-gold" />
                      </motion.div>
                    )}
                    {onRemoveAccount && !account.isPrimary && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemoveAccount(account.id);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </RadioGroup>
      )}
    </div>
  );
}

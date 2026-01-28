import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Sparkles } from "lucide-react";
import { format, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  monthlyRequired: number;
  metal: "gold" | "silver" | "both";
}

interface StartSIPDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  goal: Goal | null;
  onSIPStarted?: (sipDetails: SIPDetails) => void;
}

interface SIPDetails {
  goalId: string;
  amount: number;
  frequency: "monthly" | "yearly";
  startDate: Date;
  metal: "gold" | "silver" | "both";
}

export function StartSIPDialog({ open, onOpenChange, goal, onSIPStarted }: StartSIPDialogProps) {
  const [amount, setAmount] = useState(goal?.monthlyRequired || 1000);
  const [frequency, setFrequency] = useState<"monthly" | "yearly">("monthly");
  const [startDate, setStartDate] = useState<Date>(addDays(new Date(), 1));

  const handleStartSIP = () => {
    if (!goal) return;

    const sipDetails: SIPDetails = {
      goalId: goal.id,
      amount,
      frequency,
      startDate,
      metal: goal.metal,
    };

    // Save SIP to localStorage
    const existingSIPs = JSON.parse(localStorage.getItem("bullion_sips") || "[]");
    existingSIPs.push({
      ...sipDetails,
      id: `sip_${Date.now()}`,
      createdAt: new Date().toISOString(),
      goalName: goal.name,
    });
    localStorage.setItem("bullion_sips", JSON.stringify(existingSIPs));

    onSIPStarted?.(sipDetails);
    toast.success("SIP started successfully!", {
      description: `₹${amount.toLocaleString()} ${frequency} SIP for ${goal.name}`,
    });
    onOpenChange(false);
  };

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Start SIP for {goal.name}
          </DialogTitle>
          <DialogDescription>
            Set up a systematic investment plan to reach your goal of ₹{goal.targetAmount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Amount */}
          <div className="space-y-2">
            <Label htmlFor="sip-amount">SIP Amount</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="sip-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="pl-8"
                min={100}
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Recommended: ₹{goal.monthlyRequired.toLocaleString()}/month to reach your goal
            </p>
          </div>

          {/* Frequency */}
          <div className="space-y-3">
            <Label>Frequency</Label>
            <RadioGroup
              value={frequency}
              onValueChange={(v) => setFrequency(v as "monthly" | "yearly")}
              className="grid grid-cols-2 gap-4"
            >
              <div>
                <RadioGroupItem value="monthly" id="monthly" className="peer sr-only" />
                <Label
                  htmlFor="monthly"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-sm font-medium">Monthly</span>
                  <span className="text-xs text-muted-foreground">Every month</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="yearly" id="yearly" className="peer sr-only" />
                <Label
                  htmlFor="yearly"
                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                >
                  <span className="text-sm font-medium">Yearly</span>
                  <span className="text-xs text-muted-foreground">Once a year</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Start Date */}
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Summary */}
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
            <p className="text-sm text-muted-foreground mb-2">SIP Summary</p>
            <p className="font-semibold">
              ₹{amount.toLocaleString()} {frequency === "monthly" ? "per month" : "per year"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Starting {format(startDate, "MMMM d, yyyy")} • {goal.metal === "both" ? "Gold + Silver (70:30)" : goal.metal}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleStartSIP}
            className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
          >
            Start SIP
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

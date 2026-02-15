import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Target, Sparkles } from "lucide-react";
import { useBullionPrices } from "@/hooks/useBullionPrices";

interface GoalBasedPlannerProps {
  variant?: "default" | "compact";
}

export function GoalBasedPlanner({ variant = "default" }: GoalBasedPlannerProps) {
  const [targetGoldGrams, setTargetGoldGrams] = useState(50);
  const [targetSilverGrams, setTargetSilverGrams] = useState(0);
  const [targetAmount, setTargetAmount] = useState(0);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);
  const [days, setDays] = useState(0);
  
  // Toggle states for each target
  const [goldEnabled, setGoldEnabled] = useState(true);
  const [silverEnabled, setSilverEnabled] = useState(false);
  const [amountEnabled, setAmountEnabled] = useState(false);

  const { goldPrice, silverPrice } = useBullionPrices();
  
  const goldValue = goldEnabled ? targetGoldGrams * goldPrice : 0;
  const silverValue = silverEnabled ? targetSilverGrams * silverPrice : 0;
  const amountValue = amountEnabled ? targetAmount : 0;
  const totalTargetValue = goldValue + silverValue + amountValue;
  
  const totalDays = (years * 365) + (months * 30) + days;
  const totalMonths = totalDays / 30;
  const monthlyRequired = totalMonths > 0 ? Math.ceil(totalTargetValue / totalMonths) : 0;

  if (variant === "compact") {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">Goal-Based Planner</span>
        </div>
        
        <div className="space-y-3">
          {/* Target Gold - Compact */}
          <div className={!goldEnabled ? "opacity-50" : ""}>
            <div className="flex justify-between items-center text-xs mb-1">
              <div className="flex items-center gap-2">
                <Switch checked={goldEnabled} onCheckedChange={setGoldEnabled} className="scale-75" />
                <span className="text-muted-foreground">Target Gold</span>
              </div>
              <span className="font-bold">{goldEnabled ? `${targetGoldGrams}g` : "Off"}</span>
            </div>
            <Slider
              value={[targetGoldGrams]}
              onValueChange={(v) => setTargetGoldGrams(v[0])}
              min={0}
              max={200}
              step={10}
              className="cursor-pointer"
              disabled={!goldEnabled}
            />
          </div>

          {/* Target Silver - Compact */}
          <div className={!silverEnabled ? "opacity-50" : ""}>
            <div className="flex justify-between items-center text-xs mb-1">
              <div className="flex items-center gap-2">
                <Switch checked={silverEnabled} onCheckedChange={setSilverEnabled} className="scale-75" />
                <span className="text-muted-foreground">Target Silver</span>
              </div>
              <span className="font-bold">{silverEnabled ? `${targetSilverGrams}g` : "Off"}</span>
            </div>
            <Slider
              value={[targetSilverGrams]}
              onValueChange={(v) => setTargetSilverGrams(v[0])}
              min={0}
              max={2000}
              step={50}
              className="cursor-pointer"
              disabled={!silverEnabled}
            />
          </div>

          {/* Target Amount - Compact */}
          <div className={!amountEnabled ? "opacity-50" : ""}>
            <div className="flex justify-between items-center text-xs mb-1">
              <div className="flex items-center gap-2">
                <Switch checked={amountEnabled} onCheckedChange={setAmountEnabled} className="scale-75" />
                <span className="text-muted-foreground">Target Amount</span>
              </div>
              <span className="font-bold">{amountEnabled ? `₹${targetAmount.toLocaleString()}` : "Off"}</span>
            </div>
            <Slider
              value={[targetAmount]}
              onValueChange={(v) => setTargetAmount(v[0])}
              min={0}
              max={500000}
              step={5000}
              className="cursor-pointer"
              disabled={!amountEnabled}
            />
          </div>

          {/* Time Horizon - Compact */}
          <div className="grid grid-cols-3 gap-2">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Years</div>
              <Input 
                type="number" 
                value={years}
                onChange={(e) => setYears(Math.max(0, Number(e.target.value)))}
                className="h-8 text-sm"
                min={0}
                max={20}
              />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Months</div>
              <Input 
                type="number" 
                value={months}
                onChange={(e) => setMonths(Math.min(11, Math.max(0, Number(e.target.value))))}
                className="h-8 text-sm"
                min={0}
                max={11}
              />
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Days</div>
              <Input 
                type="number" 
                value={days}
                onChange={(e) => setDays(Math.min(30, Math.max(0, Number(e.target.value))))}
                className="h-8 text-sm"
                min={0}
                max={30}
              />
            </div>
          </div>
        </div>

        {/* Compact Results */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Monthly SIP Required</p>
            <p className="text-xl font-bold text-primary">₹{monthlyRequired.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              Target: ₹{totalTargetValue.toLocaleString()}
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-5">
      <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-primary" />
        Goal-Based Planner
      </h3>
      
      <div className="space-y-5">
        {/* Target Gold */}
        <div className={!goldEnabled ? "opacity-50" : ""}>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm">Target Gold (grams)</Label>
            <Switch checked={goldEnabled} onCheckedChange={setGoldEnabled} />
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={[targetGoldGrams]}
              onValueChange={(v) => setTargetGoldGrams(v[0])}
              min={0}
              max={500}
              step={10}
              className="flex-1"
              disabled={!goldEnabled}
            />
            <Input 
              type="number" 
              value={targetGoldGrams}
              onChange={(e) => setTargetGoldGrams(Number(e.target.value))}
              className="w-20"
              disabled={!goldEnabled}
            />
          </div>
        </div>

        {/* Target Silver */}
        <div className={!silverEnabled ? "opacity-50" : ""}>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm">Target Silver (grams)</Label>
            <Switch checked={silverEnabled} onCheckedChange={setSilverEnabled} />
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={[targetSilverGrams]}
              onValueChange={(v) => setTargetSilverGrams(v[0])}
              min={0}
              max={5000}
              step={100}
              className="flex-1"
              disabled={!silverEnabled}
            />
            <Input 
              type="number" 
              value={targetSilverGrams}
              onChange={(e) => setTargetSilverGrams(Number(e.target.value))}
              className="w-20"
              disabled={!silverEnabled}
            />
          </div>
        </div>

        {/* Target Amount */}
        <div className={!amountEnabled ? "opacity-50" : ""}>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm">Target Amount (₹)</Label>
            <Switch checked={amountEnabled} onCheckedChange={setAmountEnabled} />
          </div>
          <div className="flex items-center gap-3">
            <Slider
              value={[targetAmount]}
              onValueChange={(v) => setTargetAmount(v[0])}
              min={0}
              max={1000000}
              step={10000}
              className="flex-1"
              disabled={!amountEnabled}
            />
            <Input 
              type="number" 
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-24"
              disabled={!amountEnabled}
            />
          </div>
        </div>

        {/* Time Horizon - Years */}
        <div>
          <Label className="text-sm">Time Horizon (Years)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Slider
              value={[years]}
              onValueChange={(v) => setYears(v[0])}
              min={0}
              max={10}
              step={1}
              className="flex-1"
            />
            <Input 
              type="number" 
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Time Horizon - Months */}
        <div>
          <Label className="text-sm">Time Horizon (Months)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Slider
              value={[months]}
              onValueChange={(v) => setMonths(v[0])}
              min={0}
              max={11}
              step={1}
              className="flex-1"
            />
            <Input 
              type="number" 
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Time Horizon - Days */}
        <div>
          <Label className="text-sm">Time Horizon (Days)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Slider
              value={[days]}
              onValueChange={(v) => setDays(v[0])}
              min={0}
              max={30}
              step={1}
              className="flex-1"
            />
            <Input 
              type="number" 
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Results Card */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-600/10 border border-amber-500/20">
          {goldEnabled && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Gold Value</p>
              <p className="text-lg font-bold text-amber-600">₹{goldValue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">({targetGoldGrams}g × ₹{goldPrice}/g)</p>
            </div>
          )}
          
          {silverEnabled && targetSilverGrams > 0 && (
            <div className={`${goldEnabled ? 'border-t border-amber-500/20 mt-3 pt-3' : ''} text-center`}>
              <p className="text-sm text-muted-foreground">Silver Value</p>
              <p className="text-lg font-bold text-slate-400">₹{silverValue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">({targetSilverGrams}g × ₹{silverPrice}/g)</p>
            </div>
          )}

          {amountEnabled && targetAmount > 0 && (
            <div className={`${(goldEnabled || silverEnabled) ? 'border-t border-amber-500/20 mt-3 pt-3' : ''} text-center`}>
              <p className="text-sm text-muted-foreground">Additional Amount</p>
              <p className="text-lg font-bold text-emerald-500">₹{amountValue.toLocaleString()}</p>
            </div>
          )}
          
          <div className="border-t border-amber-500/20 mt-3 pt-3 text-center">
            <p className="text-sm text-muted-foreground">Total Target Value</p>
            <p className="text-2xl font-bold text-primary">₹{totalTargetValue.toLocaleString()}</p>
          </div>
          
          <div className="border-t border-amber-500/20 mt-3 pt-3 text-center">
            <p className="text-sm text-muted-foreground mb-1">Monthly SIP Required</p>
            <p className="text-3xl font-bold text-primary">₹{monthlyRequired.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">
              for {years > 0 ? `${years}y ` : ''}{months > 0 ? `${months}m ` : ''}{days > 0 ? `${days}d` : ''}
              {years === 0 && months === 0 && days === 0 ? 'Select duration' : ''}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}

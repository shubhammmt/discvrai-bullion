import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Target, Sparkles } from "lucide-react";

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

  const goldPrice = 6250; // Current price per gram
  const silverPrice = 75; // Current price per gram
  
  const goldValue = targetGoldGrams * goldPrice;
  const silverValue = targetSilverGrams * silverPrice;
  const totalTargetValue = goldValue + silverValue + targetAmount;
  
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
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Target Gold</span>
              <span className="font-bold">{targetGoldGrams}g</span>
            </div>
            <Slider
              value={[targetGoldGrams]}
              onValueChange={(v) => setTargetGoldGrams(v[0])}
              min={0}
              max={200}
              step={10}
              className="cursor-pointer"
            />
          </div>

          {/* Target Silver - Compact */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Target Silver</span>
              <span className="font-bold">{targetSilverGrams}g</span>
            </div>
            <Slider
              value={[targetSilverGrams]}
              onValueChange={(v) => setTargetSilverGrams(v[0])}
              min={0}
              max={2000}
              step={50}
              className="cursor-pointer"
            />
          </div>

          {/* Target Amount - Compact */}
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">Target Amount</span>
              <span className="font-bold">₹{targetAmount.toLocaleString()}</span>
            </div>
            <Slider
              value={[targetAmount]}
              onValueChange={(v) => setTargetAmount(v[0])}
              min={0}
              max={500000}
              step={5000}
              className="cursor-pointer"
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
        <div>
          <Label className="text-sm">Target Gold (grams)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Slider
              value={[targetGoldGrams]}
              onValueChange={(v) => setTargetGoldGrams(v[0])}
              min={0}
              max={500}
              step={10}
              className="flex-1"
            />
            <Input 
              type="number" 
              value={targetGoldGrams}
              onChange={(e) => setTargetGoldGrams(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Target Silver */}
        <div>
          <Label className="text-sm">Target Silver (grams)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Slider
              value={[targetSilverGrams]}
              onValueChange={(v) => setTargetSilverGrams(v[0])}
              min={0}
              max={5000}
              step={100}
              className="flex-1"
            />
            <Input 
              type="number" 
              value={targetSilverGrams}
              onChange={(e) => setTargetSilverGrams(Number(e.target.value))}
              className="w-20"
            />
          </div>
        </div>

        {/* Target Amount */}
        <div>
          <Label className="text-sm">Target Amount (₹)</Label>
          <div className="flex items-center gap-3 mt-2">
            <Slider
              value={[targetAmount]}
              onValueChange={(v) => setTargetAmount(v[0])}
              min={0}
              max={1000000}
              step={10000}
              className="flex-1"
            />
            <Input 
              type="number" 
              value={targetAmount}
              onChange={(e) => setTargetAmount(Number(e.target.value))}
              className="w-24"
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
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Gold Value</p>
            <p className="text-lg font-bold text-amber-600">₹{goldValue.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">({targetGoldGrams}g × ₹{goldPrice}/g)</p>
          </div>
          
          {targetSilverGrams > 0 && (
            <div className="border-t border-amber-500/20 mt-3 pt-3 text-center">
              <p className="text-sm text-muted-foreground">Silver Value</p>
              <p className="text-lg font-bold text-slate-400">₹{silverValue.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">({targetSilverGrams}g × ₹{silverPrice}/g)</p>
            </div>
          )}

          {targetAmount > 0 && (
            <div className="border-t border-amber-500/20 mt-3 pt-3 text-center">
              <p className="text-sm text-muted-foreground">Additional Amount</p>
              <p className="text-lg font-bold text-emerald-500">₹{targetAmount.toLocaleString()}</p>
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

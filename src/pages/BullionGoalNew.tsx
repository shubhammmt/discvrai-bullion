import { useState } from "react";
import { ArrowLeft, Bell, User, Target, Sparkles, Heart, GraduationCap, Home, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

const goalTemplates: Record<string, { icon: typeof Heart; suggestedGold: number; suggestedSilver: number }> = {
  "Wedding": { icon: Heart, suggestedGold: 50, suggestedSilver: 500 },
  "Education": { icon: GraduationCap, suggestedGold: 100, suggestedSilver: 1000 },
  "Home": { icon: Home, suggestedGold: 200, suggestedSilver: 2000 },
  "Retirement": { icon: Sparkles, suggestedGold: 500, suggestedSilver: 5000 },
  "Emergency Fund": { icon: Target, suggestedGold: 25, suggestedSilver: 250 },
  "Custom Goal": { icon: Gift, suggestedGold: 10, suggestedSilver: 100 },
};

export default function BullionGoalNew() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateName = searchParams.get("template") || "Custom Goal";
  const template = goalTemplates[templateName] || goalTemplates["Custom Goal"];
  const TemplateIcon = template.icon;

  const [goalName, setGoalName] = useState(templateName === "Custom Goal" ? "" : templateName);
  const [targetGoldGrams, setTargetGoldGrams] = useState(template.suggestedGold);
  const [targetSilverGrams, setTargetSilverGrams] = useState(template.suggestedSilver);
  const [years, setYears] = useState(3);
  const [months, setMonths] = useState(0);

  const goldPrice = 6250; // Current price per gram
  const silverPrice = 75; // Current price per gram
  
  const goldValue = targetGoldGrams * goldPrice;
  const silverValue = targetSilverGrams * silverPrice;
  const totalTargetValue = goldValue + silverValue;
  
  const totalMonths = (years * 12) + months;
  const monthlyRequired = totalMonths > 0 ? Math.ceil(totalTargetValue / totalMonths) : 0;

  const handleCreateGoal = () => {
    // TODO: Implement goal creation logic
    console.log("Creating goal:", { goalName, targetGoldGrams, targetSilverGrams, years, months });
    navigate("/bullion/goals");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/goals")} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg">Discvr Bullion</h1>
              <p className="text-xs text-muted-foreground">Digital Gold & Silver</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/profile")}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation Tabs */}
      <BullionNavTabs />

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/goals")} className="lg:hidden">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
            <TemplateIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Create New Goal</h1>
            <p className="text-muted-foreground">
              {templateName !== "Custom Goal" ? `${templateName} savings goal` : "Set your savings target"}
            </p>
          </div>
        </div>

        <div className="grid gap-6">
          {/* Goal Name */}
          <Card className="p-5">
            <Label className="text-sm font-medium">Goal Name</Label>
            <Input 
              type="text" 
              placeholder="Enter goal name"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="mt-2"
            />
          </Card>

          {/* Gold Target */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium">Target Gold (grams)</Label>
              <span className="text-sm text-amber-600 font-medium">₹{goldValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Slider
                value={[targetGoldGrams]}
                onValueChange={(v) => setTargetGoldGrams(v[0])}
                min={0}
                max={500}
                step={5}
                className="flex-1"
              />
              <Input 
                type="number" 
                value={targetGoldGrams}
                onChange={(e) => setTargetGoldGrams(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Current rate: ₹{goldPrice.toLocaleString()}/gram</p>
          </Card>

          {/* Silver Target */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <Label className="text-sm font-medium">Target Silver (grams)</Label>
              <span className="text-sm text-slate-500 font-medium">₹{silverValue.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Slider
                value={[targetSilverGrams]}
                onValueChange={(v) => setTargetSilverGrams(v[0])}
                min={0}
                max={5000}
                step={50}
                className="flex-1"
              />
              <Input 
                type="number" 
                value={targetSilverGrams}
                onChange={(e) => setTargetSilverGrams(Number(e.target.value))}
                className="w-24"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Current rate: ₹{silverPrice.toLocaleString()}/gram</p>
          </Card>

          {/* Time Horizon */}
          <Card className="p-5">
            <Label className="text-sm font-medium mb-4 block">Time Horizon</Label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Years</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Slider
                    value={[years]}
                    onValueChange={(v) => setYears(v[0])}
                    min={0}
                    max={20}
                    step={1}
                    className="flex-1"
                  />
                  <Input 
                    type="number" 
                    value={years}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="w-16"
                  />
                </div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Months</Label>
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
                    className="w-16"
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Summary */}
          <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground">Gold Value</p>
                <p className="text-lg font-bold text-amber-600">₹{goldValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{targetGoldGrams}g</p>
              </div>
              <div className="text-center p-3 rounded-lg bg-background/50">
                <p className="text-xs text-muted-foreground">Silver Value</p>
                <p className="text-lg font-bold text-slate-500">₹{silverValue.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{targetSilverGrams}g</p>
              </div>
            </div>
            
            <div className="border-t border-amber-500/20 pt-4 text-center">
              <p className="text-sm text-muted-foreground">Total Target Value</p>
              <p className="text-2xl font-bold text-primary">₹{totalTargetValue.toLocaleString()}</p>
            </div>
            
            <div className="border-t border-amber-500/20 mt-4 pt-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Monthly SIP Required</p>
              <p className="text-3xl font-bold text-primary">₹{monthlyRequired.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">
                for {years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}{months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}
                {years === 0 && months === 0 ? 'Select duration' : ''}
              </p>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/bullion/goals")}>
              Cancel
            </Button>
            <Button className="flex-1" size="lg" onClick={handleCreateGoal} disabled={!goalName || totalMonths === 0}>
              <Sparkles className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

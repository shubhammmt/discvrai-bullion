import { useState, useMemo } from "react";
import { ArrowLeft, Bell, User, Target, Sparkles, Heart, GraduationCap, Home, Gift, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const goalTemplates: Record<string, { icon: typeof Heart; suggestedAmount: number; suggestedYears: number }> = {
  "Wedding": { icon: Heart, suggestedAmount: 500000, suggestedYears: 5 },
  "Education": { icon: GraduationCap, suggestedAmount: 1000000, suggestedYears: 10 },
  "Home": { icon: Home, suggestedAmount: 2000000, suggestedYears: 7 },
  "Retirement": { icon: Sparkles, suggestedAmount: 5000000, suggestedYears: 20 },
  "Emergency Fund": { icon: Target, suggestedAmount: 200000, suggestedYears: 2 },
  "Custom Goal": { icon: Gift, suggestedAmount: 100000, suggestedYears: 3 },
};

export default function BullionGoalNew() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const templateName = searchParams.get("template") || "Custom Goal";
  const template = goalTemplates[templateName] || goalTemplates["Custom Goal"];
  const TemplateIcon = template.icon;

  const [goalName, setGoalName] = useState(templateName === "Custom Goal" ? "" : templateName);
  const [targetAmount, setTargetAmount] = useState(template.suggestedAmount);
  const [years, setYears] = useState(template.suggestedYears);
  const [months, setMonths] = useState(0);
  const [preferredMetal, setPreferredMetal] = useState<"gold" | "silver" | "both">("gold");

  const goldPrice = 6250; // Current price per gram
  const silverPrice = 75; // Current price per gram
  
  const totalMonths = (years * 12) + months;
  const monthlyRequired = totalMonths > 0 ? Math.ceil(targetAmount / totalMonths) : 0;

  // Calculate recommended SIP based on preferred metal
  const sipRecommendation = useMemo(() => {
    if (totalMonths === 0) return { goldSIP: 0, silverSIP: 0, goldGrams: 0, silverGrams: 0 };
    
    if (preferredMetal === "gold") {
      const goldGramsTotal = targetAmount / goldPrice;
      const goldGramsMonthly = goldGramsTotal / totalMonths;
      return {
        goldSIP: monthlyRequired,
        silverSIP: 0,
        goldGrams: goldGramsMonthly,
        silverGrams: 0,
        totalGoldGrams: goldGramsTotal
      };
    } else if (preferredMetal === "silver") {
      const silverGramsTotal = targetAmount / silverPrice;
      const silverGramsMonthly = silverGramsTotal / totalMonths;
      return {
        goldSIP: 0,
        silverSIP: monthlyRequired,
        goldGrams: 0,
        silverGrams: silverGramsMonthly,
        totalSilverGrams: silverGramsTotal
      };
    } else {
      // 70% Gold, 30% Silver split
      const goldAllocation = targetAmount * 0.7;
      const silverAllocation = targetAmount * 0.3;
      const goldGramsTotal = goldAllocation / goldPrice;
      const silverGramsTotal = silverAllocation / silverPrice;
      return {
        goldSIP: Math.ceil(goldAllocation / totalMonths),
        silverSIP: Math.ceil(silverAllocation / totalMonths),
        goldGrams: goldGramsTotal / totalMonths,
        silverGrams: silverGramsTotal / totalMonths,
        totalGoldGrams: goldGramsTotal,
        totalSilverGrams: silverGramsTotal
      };
    }
  }, [targetAmount, totalMonths, preferredMetal, monthlyRequired, goldPrice, silverPrice]);

  const handleCreateGoal = () => {
    // Create goal object
    const newGoal = {
      id: `goal_${Date.now()}`,
      name: goalName,
      targetAmount,
      years,
      months,
      totalMonths,
      monthlyRequired,
      preferredMetal,
      sipRecommendation,
      createdAt: new Date().toISOString(),
    };

    // Save to localStorage
    const existingGoals = JSON.parse(localStorage.getItem("bullion_goals") || "[]");
    existingGoals.push(newGoal);
    localStorage.setItem("bullion_goals", JSON.stringify(existingGoals));

    // Navigate to goals page with the new goal ID to trigger SIP dialog
    navigate(`/bullion/goals?newGoal=${newGoal.id}`);
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
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion/notifications")}>
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
              placeholder="Enter goal name (e.g., Wedding, Retirement)"
              value={goalName}
              onChange={(e) => setGoalName(e.target.value)}
              className="mt-2"
            />
          </Card>

          {/* Target Amount */}
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <Label className="text-sm font-medium">Target Amount</Label>
                <p className="text-xs text-muted-foreground mt-1">How much do you want to save?</p>
              </div>
              <span className="text-lg font-bold text-primary">₹{targetAmount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-3">
              <Slider
                value={[targetAmount]}
                onValueChange={(v) => setTargetAmount(v[0])}
                min={10000}
                max={10000000}
                step={10000}
                className="flex-1"
              />
              <Input 
                type="number" 
                value={targetAmount}
                onChange={(e) => setTargetAmount(Number(e.target.value))}
                className="w-32"
              />
            </div>
            {/* Quick Amount Presets */}
            <div className="flex flex-wrap gap-2 mt-3">
              {[100000, 500000, 1000000, 2500000, 5000000].map((amount) => (
                <Button
                  key={amount}
                  variant={targetAmount === amount ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTargetAmount(amount)}
                  className="text-xs"
                >
                  ₹{(amount / 100000).toLocaleString()}L
                </Button>
              ))}
            </div>
          </Card>

          {/* Time Horizon */}
          <Card className="p-5">
            <div className="mb-4">
              <Label className="text-sm font-medium">Time Horizon</Label>
              <p className="text-xs text-muted-foreground mt-1">When do you need this amount?</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-xs text-muted-foreground">Years</Label>
                <div className="flex items-center gap-3 mt-2">
                  <Slider
                    value={[years]}
                    onValueChange={(v) => setYears(v[0])}
                    min={0}
                    max={25}
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
            {totalMonths > 0 && (
              <p className="text-sm text-muted-foreground mt-3 text-center">
                Total: <span className="font-medium text-foreground">{totalMonths} months</span>
              </p>
            )}
          </Card>

          {/* Preferred Metal */}
          <Card className="p-5">
            <div className="mb-4">
              <Label className="text-sm font-medium">Preferred Investment</Label>
              <p className="text-xs text-muted-foreground mt-1">Choose how to invest your SIP</p>
            </div>
            <Tabs value={preferredMetal} onValueChange={(v) => setPreferredMetal(v as "gold" | "silver" | "both")}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="gold" className="data-[state=active]:bg-amber-500 data-[state=active]:text-white">
                  🥇 Gold Only
                </TabsTrigger>
                <TabsTrigger value="silver" className="data-[state=active]:bg-slate-500 data-[state=active]:text-white">
                  🥈 Silver Only
                </TabsTrigger>
                <TabsTrigger value="both" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-slate-500 data-[state=active]:text-white">
                  Both (70:30)
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          {/* SIP Recommendation Summary */}
          {totalMonths > 0 && (
            <Card className="p-5 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-amber-600" />
                <h3 className="font-semibold text-lg">Your SIP Recommendation</h3>
              </div>
              
              {/* Monthly SIP Required */}
              <div className="text-center p-4 rounded-xl bg-background/60 mb-4">
                <p className="text-sm text-muted-foreground mb-1">Monthly SIP Required</p>
                <p className="text-4xl font-bold text-primary">₹{monthlyRequired.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  for {years > 0 ? `${years} year${years > 1 ? 's' : ''} ` : ''}{months > 0 ? `${months} month${months > 1 ? 's' : ''}` : ''}
                </p>
              </div>

              {/* Metal Breakdown */}
              <div className="space-y-3">
                {(preferredMetal === "gold" || preferredMetal === "both") && sipRecommendation.goldSIP > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white font-bold">
                        Au
                      </div>
                      <div>
                        <p className="font-medium text-amber-600">Gold SIP</p>
                        <p className="text-xs text-muted-foreground">
                          ~{sipRecommendation.goldGrams.toFixed(2)}g/month
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{sipRecommendation.goldSIP.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        Total: {sipRecommendation.totalGoldGrams?.toFixed(1)}g
                      </p>
                    </div>
                  </div>
                )}

                {(preferredMetal === "silver" || preferredMetal === "both") && sipRecommendation.silverSIP > 0 && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-500/10 border border-slate-500/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-500 flex items-center justify-center text-white font-bold">
                        Ag
                      </div>
                      <div>
                        <p className="font-medium text-slate-600">Silver SIP</p>
                        <p className="text-xs text-muted-foreground">
                          ~{sipRecommendation.silverGrams.toFixed(2)}g/month
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">₹{sipRecommendation.silverSIP.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        Total: {sipRecommendation.totalSilverGrams?.toFixed(1)}g
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Target Summary */}
              <div className="border-t border-amber-500/20 mt-4 pt-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Target Amount</span>
                  <span className="font-semibold">₹{targetAmount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Duration</span>
                  <span className="font-semibold">{totalMonths} months</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-muted-foreground">Investment Type</span>
                  <span className="font-semibold capitalize">{preferredMetal === "both" ? "Gold + Silver (70:30)" : preferredMetal}</span>
                </div>
              </div>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => navigate("/bullion/goals")}>
              Cancel
            </Button>
            <Button 
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white" 
              size="lg" 
              onClick={handleCreateGoal} 
              disabled={!goalName || totalMonths === 0}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Create Goal & Start SIP
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

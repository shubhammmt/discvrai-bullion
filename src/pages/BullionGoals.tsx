import { ArrowLeft, Bell, User, Target, Plus, Calendar, TrendingUp, Heart, GraduationCap, Home, Sparkles, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";

// Mock goals
const sampleGoals = [
  {
    id: "1",
    name: "Wedding Fund",
    icon: Heart,
    targetGrams: 50,
    currentGrams: 18.5,
    targetDate: "Dec 2025",
    monthlySIP: 5000,
    color: "from-pink-500 to-rose-500",
  },
  {
    id: "2",
    name: "Child's Education",
    icon: GraduationCap,
    targetGrams: 100,
    currentGrams: 32,
    targetDate: "Jun 2030",
    monthlySIP: 3000,
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: "3",
    name: "Home Down Payment",
    icon: Home,
    targetGrams: 200,
    currentGrams: 45,
    targetDate: "Jan 2028",
    monthlySIP: 10000,
    color: "from-emerald-500 to-teal-500",
  },
];

const goalTemplates = [
  { name: "Wedding", icon: Heart, suggestedGrams: 50 },
  { name: "Education", icon: GraduationCap, suggestedGrams: 100 },
  { name: "Home", icon: Home, suggestedGrams: 200 },
  { name: "Retirement", icon: Sparkles, suggestedGrams: 500 },
  { name: "Emergency Fund", icon: Target, suggestedGrams: 25 },
  { name: "Custom Goal", icon: Gift, suggestedGrams: 10 },
];

export default function BullionGoals() {
  const navigate = useNavigate();

  const handleNewGoal = (templateName?: string) => {
    const params = templateName ? `?template=${encodeURIComponent(templateName)}` : '';
    navigate(`/bullion/goals/new${params}`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="lg:flex hidden">
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
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Goal-Based Planning</h1>
              <p className="text-muted-foreground">Save for life events in grams of gold</p>
            </div>
          </div>
          <Button onClick={() => handleNewGoal()}>
            <Plus className="w-4 h-4 mr-2" />
            New Goal
          </Button>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold mb-4">Your Goals</h2>
          
          {sampleGoals.map((goal) => {
            const Icon = goal.icon;
            const progress = (goal.currentGrams / goal.targetGrams) * 100;
            
            return (
              <Card key={goal.id} className="p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${goal.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{goal.name}</h3>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {goal.targetDate}
                      </Badge>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{goal.currentGrams}g / {goal.targetGrams}g</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        ₹{goal.monthlySIP.toLocaleString()}/month SIP
                      </div>
                      <Button variant="outline" size="sm">
                        Add Gold
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}

          {/* Goal Templates */}
          <h2 className="text-lg font-semibold mt-8 mb-4">Quick Start Templates</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {goalTemplates.map((template) => {
              const Icon = template.icon;
              return (
                <Card 
                  key={template.name}
                  className="p-4 text-center cursor-pointer hover:shadow-md hover:border-primary/50 transition-all"
                  onClick={() => handleNewGoal(template.name)}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-sm">{template.name}</p>
                  <p className="text-xs text-muted-foreground">{template.suggestedGrams}g suggested</p>
                </Card>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

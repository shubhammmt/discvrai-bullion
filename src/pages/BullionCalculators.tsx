import { useState } from "react";
import { 
  ArrowLeft, 
  Calculator, 
  Scale, 
  Target, 
  TrendingUp, 
  Percent,
  Coins,
  PiggyBank,
  Building,
  ArrowRight,
  CheckCircle,
  Info,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BullionNavTabs, BullionMobileMenu } from "@/components/bullion";
import { useBullionPrices } from "@/hooks/useBullionPrices";

export default function BullionCalculators() {
  const navigate = useNavigate();
  
  // Making Charge Calculator — unified single-metal selector
  const [selectedMetal, setSelectedMetal] = useState<"gold" | "silver">("gold");
  const [calcWeight, setCalcWeight] = useState([10]);
  const [calcMakingCharge, setCalcMakingCharge] = useState([15]);
  const { goldPrice: liveGoldPrice, silverPrice: liveSilverPrice } = useBullionPrices();

  const isGold = selectedMetal === "gold";

  // India-accurate rate logic:
  // Physical gold jewellery → 22K (91.6% purity of the 24K live rate)
  // Digital gold → 24K (99.9% purity, full live rate)
  // Physical silver → 999 purity but jewellers quote ~2% above spot
  // Digital silver → spot (live) rate
  const GOLD_22K_FACTOR = 0.916;
  const SILVER_PHYSICAL_PREMIUM = 1.02; // ~2% dealer premium on physical silver

  const digitalRate = isGold ? liveGoldPrice : liveSilverPrice;
  const physicalRate = isGold
    ? Math.round(liveGoldPrice * GOLD_22K_FACTOR)
    : Math.round(liveSilverPrice * SILVER_PHYSICAL_PREMIUM);

  // Physical jewellery calculation (uses 22K / jeweller rate)
  const physicalMetalValue = calcWeight[0] * physicalRate;
  const makingCharges = (physicalMetalValue * calcMakingCharge[0]) / 100;
  const gst = (physicalMetalValue + makingCharges) * 0.03;
  const physicalTotal = physicalMetalValue + makingCharges + gst;

  // Digital bullion calculation (uses 24K / spot rate, no making charge)
  const digitalMetalValue = calcWeight[0] * digitalRate;
  const digitalGst = digitalMetalValue * 0.03;
  const digitalTotal = digitalMetalValue + digitalGst;

  const savings = physicalTotal - digitalTotal;

  // Goal Calculator State
  const [goalMode, setGoalMode] = useState<"amount" | "grams">("amount"); // Toggle between amount and grams
  const [targetGoldGrams, setTargetGoldGrams] = useState(50);
  const [targetSilverGrams, setTargetSilverGrams] = useState(500);
  const [targetAmount, setTargetAmount] = useState(100000);
  const [goalYears, setGoalYears] = useState(3);
  const [goalMonths, setGoalMonths] = useState(0);
  const [goalDays, setGoalDays] = useState(0);
  
  const goldPrice = liveGoldPrice;
  const silverPrice = liveSilverPrice;
  
  // Calculate values based on selected mode
  const goalGoldValue = goalMode === "grams" ? targetGoldGrams * goldPrice : 0;
  const goalSilverValue = goalMode === "grams" ? targetSilverGrams * silverPrice : 0;
  const goalAmountValue = goalMode === "amount" ? targetAmount : 0;
  const totalTargetValue = goalMode === "amount" ? goalAmountValue : (goalGoldValue + goalSilverValue);
  
  const totalDays = (goalYears * 365) + (goalMonths * 30) + goalDays;
  const totalMonthsForGoal = totalDays / 30;
  const monthlyRequired = totalMonthsForGoal > 0 ? Math.ceil(totalTargetValue / totalMonthsForGoal) : 0;

  // SIP vs FD vs Digital Gold Calculator State
  const [monthlyInvestment, setMonthlyInvestment] = useState([5000]);
  const [investmentYears, setInvestmentYears] = useState([5]);
  
  // Return rates (annual)
  const fdRate = 7.0; // FD returns
  const goldReturns = 11.5; // Historical gold returns
  const sipReturns = 12.0; // Equity SIP returns
  
  // Calculate future values
  const months = investmentYears[0] * 12;
  const principal = monthlyInvestment[0] * months;
  
  // FD calculation (compounding monthly)
  const fdMonthlyRate = fdRate / 12 / 100;
  const fdFutureValue = monthlyInvestment[0] * ((Math.pow(1 + fdMonthlyRate, months) - 1) / fdMonthlyRate) * (1 + fdMonthlyRate);
  const fdReturns = fdFutureValue - principal;
  
  // Gold calculation
  const goldMonthlyRate = goldReturns / 12 / 100;
  const goldFutureValue = monthlyInvestment[0] * ((Math.pow(1 + goldMonthlyRate, months) - 1) / goldMonthlyRate) * (1 + goldMonthlyRate);
  const goldTotalReturns = goldFutureValue - principal;
  
  // Equity SIP calculation
  const sipMonthlyRate = sipReturns / 12 / 100;
  const sipFutureValue = monthlyInvestment[0] * ((Math.pow(1 + sipMonthlyRate, months) - 1) / sipMonthlyRate) * (1 + sipMonthlyRate);
  const sipTotalReturns = sipFutureValue - principal;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BullionMobileMenu />
            <Button variant="ghost" size="icon" onClick={() => navigate("/bullion")} className="lg:flex hidden">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-bold text-lg flex items-center gap-2">
                <Calculator className="w-5 h-5 text-amber-500" />
                Financial Calculators
              </h1>
              <p className="text-xs text-muted-foreground">Plan your investments smartly</p>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <BullionNavTabs />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Tabs defaultValue="making-charge" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-3">
            <TabsTrigger value="making-charge" className="flex items-center gap-2 text-xs sm:text-sm">
              <Scale className="w-4 h-4" />
              <span className="hidden sm:inline">Making Charge</span>
              <span className="sm:hidden">Charge</span>
            </TabsTrigger>
            <TabsTrigger value="goal" className="flex items-center gap-2 text-xs sm:text-sm">
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Goal Planner</span>
              <span className="sm:hidden">Goals</span>
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2 text-xs sm:text-sm">
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">SIP vs FD vs Gold</span>
              <span className="sm:hidden">Compare</span>
            </TabsTrigger>
          </TabsList>

          {/* Making Charge Calculator Tab */}
          <TabsContent value="making-charge" className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* Single unified card — everything fits on mobile */}
              <Card className="p-4 sm:p-6">
                {/* Header row with title + metal selector */}
                <div className="flex items-center justify-between mb-5 gap-3">
                  <h3 className="font-semibold text-base sm:text-lg flex items-center gap-2 shrink-0">
                    <Calculator className="w-5 h-5 text-amber-500" />
                    Making Charge Calculator
                  </h3>
                  <Select
                    value={selectedMetal}
                    onValueChange={(v) => {
                      setSelectedMetal(v as "gold" | "silver");
                      setCalcWeight([v === "gold" ? 10 : 100]);
                      setCalcMakingCharge([v === "gold" ? 15 : 12]);
                    }}
                  >
                    <SelectTrigger className="w-36 h-9 text-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gold">🥇 Gold</SelectItem>
                      <SelectItem value="silver">🥈 Silver</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Live rate pill */}
                <div className={`flex items-center justify-between px-3 py-2 rounded-lg mb-5 ${isGold ? "bg-amber-500/10 border border-amber-500/30" : "bg-slate-500/10 border border-slate-500/20"}`}>
                  <span className="text-xs text-muted-foreground font-medium">Live {isGold ? "Gold" : "Silver"} Rate</span>
                  <span className={`text-sm font-bold ${isGold ? "text-amber-500" : "text-slate-400"}`}>
                    ₹{liveRate.toLocaleString("en-IN")}/g
                  </span>
                </div>

                {/* Sliders */}
                <div className="space-y-5 mb-5">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Weight</label>
                      <span className={`text-sm font-bold ${isGold ? "text-amber-500" : "text-slate-400"}`}>
                        {calcWeight[0]} grams
                      </span>
                    </div>
                    <Slider
                      value={calcWeight}
                      onValueChange={setCalcWeight}
                      min={0}
                      max={isGold ? 100 : 1000}
                      step={isGold ? 1 : 10}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>0g</span>
                      <span>{isGold ? "100g" : "1000g"}</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium">Making Charge %</label>
                      <span className={`text-sm font-bold ${isGold ? "text-amber-500" : "text-slate-400"}`}>
                        {calcMakingCharge[0]}%
                      </span>
                    </div>
                    <Slider
                      value={calcMakingCharge}
                      onValueChange={setCalcMakingCharge}
                      min={5}
                      max={isGold ? 35 : 25}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>5%</span>
                      <span>{isGold ? "35%" : "25%"}</span>
                    </div>
                  </div>
                </div>

                {/* Comparison grid — side by side */}
                {calcWeight[0] > 0 && (
                  <div className={`rounded-xl border p-3 sm:p-4 ${isGold ? "bg-amber-500/5 border-amber-500/20" : "bg-slate-500/5 border-slate-500/20"}`}>
                    <h4 className={`text-xs font-semibold mb-3 ${isGold ? "text-amber-600" : "text-slate-400"}`}>
                      {isGold ? "Gold" : "Silver"} ({calcWeight[0]}g) — Price Comparison
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Physical */}
                      <div className="space-y-1.5 text-sm">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">Physical Jewellery</p>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Metal Value</span>
                          <span className="text-xs font-medium">₹{metalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Making ({calcMakingCharge[0]}%)</span>
                          <span className="text-xs font-medium">₹{makingCharges.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">GST (3%)</span>
                          <span className="text-xs font-medium">₹{gst.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className={`flex justify-between font-semibold pt-1.5 border-t ${isGold ? "border-amber-500/20" : "border-slate-500/20"}`}>
                          <span className="text-xs">Total</span>
                          <span className={`text-xs ${isGold ? "text-amber-600" : "text-slate-400"}`}>
                            ₹{physicalTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>

                      {/* Digital */}
                      <div className="space-y-1.5 text-sm">
                        <p className="text-xs font-semibold text-emerald-600 mb-2">Digital {isGold ? "Gold" : "Silver"}</p>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Metal Value</span>
                          <span className="text-xs font-medium">₹{metalValue.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">Making</span>
                          <span className="text-xs font-medium text-emerald-500">₹0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground text-xs">GST (3%)</span>
                          <span className="text-xs font-medium">₹{(metalValue * 0.03).toLocaleString("en-IN", { maximumFractionDigits: 0 })}</span>
                        </div>
                        <div className="flex justify-between font-semibold pt-1.5 border-t border-emerald-500/20">
                          <span className="text-xs">Total</span>
                          <span className="text-xs text-emerald-600">
                            ₹{digitalTotal.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Savings highlight */}
                    <div className="mt-3 pt-3 border-t border-emerald-500/20 flex items-center justify-between">
                      <span className="text-sm font-semibold text-emerald-600">You Save</span>
                      <div className="text-right">
                        <span className="text-lg font-bold text-emerald-500">
                          ₹{savings.toLocaleString("en-IN", { maximumFractionDigits: 0 })}
                        </span>
                        <span className="text-xs text-emerald-600 ml-1">
                          ({physicalTotal > 0 ? ((savings / physicalTotal) * 100).toFixed(1) : 0}%)
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </Card>

              {/* Making Charges by Category */}
              <Card className="p-4 sm:p-6">
                <h4 className="font-semibold mb-3 text-sm sm:text-base">Typical Making Charges by Category</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { category: "Plain Gold", range: "8–12%", color: "bg-emerald-500" },
                    { category: "Temple", range: "12–16%", color: "bg-blue-500" },
                    { category: "Kundan/Polki", range: "18–25%", color: "bg-amber-500" },
                    { category: "Diamond", range: "20–30%", color: "bg-purple-500" },
                  ].map((item) => (
                    <Card key={item.category} className="p-3 text-center">
                      <div className={`w-3 h-3 ${item.color} rounded-full mx-auto mb-2`} />
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="text-base font-bold">{item.range}</p>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* Goal Calculator Tab */}
          <TabsContent value="goal" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Goal Input */}
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                    <Target className="w-5 h-5 text-emerald-500" />
                    Goal-Based Gold Planner
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    Plan for life events like weddings, education, or retirement by saving in gold & silver.
                  </p>
                  
                  {/* Mode Toggle */}
                  <div className="flex p-1 rounded-lg bg-muted mb-6">
                    <button
                      onClick={() => setGoalMode("amount")}
                      className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                        goalMode === "amount" 
                          ? "bg-background shadow-sm text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      ₹ Target Amount
                    </button>
                    <button
                      onClick={() => setGoalMode("grams")}
                      className={`flex-1 py-2.5 px-4 rounded-md text-sm font-medium transition-all ${
                        goalMode === "grams" 
                          ? "bg-background shadow-sm text-foreground" 
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      Gold/Silver Grams
                    </button>
                  </div>
                  
                  <div className="space-y-5">
                    {/* Amount Mode */}
                    {goalMode === "amount" && (
                      <div>
                        <Label className="text-sm font-medium">Target Amount (₹)</Label>
                        <div className="flex items-center gap-3 mt-2">
                          <Slider
                            value={[targetAmount]}
                            onValueChange={(v) => setTargetAmount(v[0])}
                            min={10000}
                            max={1000000}
                            step={10000}
                            className="flex-1"
                          />
                          <Input 
                            type="number" 
                            value={targetAmount}
                            onChange={(e) => setTargetAmount(Number(e.target.value))}
                            className="w-28"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          ≈ {(targetAmount / goldPrice).toFixed(1)}g Gold or {(targetAmount / silverPrice).toFixed(0)}g Silver at current prices
                        </p>
                      </div>
                    )}

                    {/* Grams Mode */}
                    {goalMode === "grams" && (
                      <>
                        {/* Target Gold */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label className="text-sm font-medium">Target Gold (grams)</Label>
                            <span className="text-sm text-amber-600 font-bold">{targetGoldGrams}g</span>
                          </div>
                          <div className="flex items-center gap-3">
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
                          <p className="text-xs text-muted-foreground mt-1">
                            Value: ₹{(targetGoldGrams * goldPrice).toLocaleString('en-IN')}
                          </p>
                        </div>

                        {/* Target Silver */}
                        <div>
                          <div className="flex justify-between mb-2">
                            <Label className="text-sm font-medium">Target Silver (grams)</Label>
                            <span className="text-sm text-slate-400 font-bold">{targetSilverGrams}g</span>
                          </div>
                          <div className="flex items-center gap-3">
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
                          <p className="text-xs text-muted-foreground mt-1">
                            Value: ₹{(targetSilverGrams * silverPrice).toLocaleString('en-IN')}
                          </p>
                        </div>
                      </>
                    )}

                    {/* Time Horizon - Years */}
                    <div>
                      <Label className="text-sm font-medium">Time Horizon (Years)</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Slider
                          value={[goalYears]}
                          onValueChange={(v) => setGoalYears(v[0])}
                          min={0}
                          max={10}
                          step={1}
                          className="flex-1"
                        />
                        <Input 
                          type="number" 
                          value={goalYears}
                          onChange={(e) => setGoalYears(Number(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </div>

                    {/* Time Horizon - Months */}
                    <div>
                      <Label className="text-sm font-medium">Time Horizon (Months)</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Slider
                          value={[goalMonths]}
                          onValueChange={(v) => setGoalMonths(v[0])}
                          min={0}
                          max={11}
                          step={1}
                          className="flex-1"
                        />
                        <Input 
                          type="number" 
                          value={goalMonths}
                          onChange={(e) => setGoalMonths(Number(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </div>

                    {/* Time Horizon - Days */}
                    <div>
                      <Label className="text-sm font-medium">Time Horizon (Days)</Label>
                      <div className="flex items-center gap-3 mt-2">
                        <Slider
                          value={[goalDays]}
                          onValueChange={(v) => setGoalDays(v[0])}
                          min={0}
                          max={30}
                          step={1}
                          className="flex-1"
                        />
                        <Input 
                          type="number" 
                          value={goalDays}
                          onChange={(e) => setGoalDays(Number(e.target.value))}
                          className="w-20"
                        />
                      </div>
                    </div>

                    <Card className="p-3 bg-muted/30">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Gold Rate</span>
                        <span className="font-bold">₹{goldPrice.toLocaleString('en-IN')}/g</span>
                      </div>
                      <div className="flex justify-between items-center text-sm mt-1">
                        <span className="text-muted-foreground">Silver Rate</span>
                        <span className="font-bold">₹{silverPrice.toLocaleString('en-IN')}/g</span>
                      </div>
                    </Card>
                  </div>
                </Card>

                {/* Goal Result */}
                <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-600/10 border-amber-500/20">
                  <h3 className="font-semibold text-lg mb-6">Your Goal Summary</h3>
                  
                  <div className="space-y-4">
                    {/* Amount Mode Summary */}
                    {goalMode === "amount" && (
                      <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">Target Amount</p>
                          <p className="text-2xl font-bold text-emerald-500">₹{targetAmount.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    )}

                    {/* Grams Mode Summary */}
                    {goalMode === "grams" && (
                      <>
                        {targetGoldGrams > 0 && (
                          <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Gold Value</p>
                              <p className="text-2xl font-bold text-amber-600">₹{goalGoldValue.toLocaleString('en-IN')}</p>
                              <p className="text-xs text-muted-foreground mt-1">({targetGoldGrams}g × ₹{goldPrice}/g)</p>
                            </div>
                          </div>
                        )}

                        {targetSilverGrams > 0 && (
                          <div className="p-4 rounded-xl bg-background/50 border border-border/50">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground mb-1">Silver Value</p>
                              <p className="text-2xl font-bold text-slate-400">₹{goalSilverValue.toLocaleString('en-IN')}</p>
                              <p className="text-xs text-muted-foreground mt-1">({targetSilverGrams}g × ₹{silverPrice}/g)</p>
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Total Target Value */}
                    <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Total Target Value</p>
                        <p className="text-3xl font-bold text-primary">₹{totalTargetValue.toLocaleString('en-IN')}</p>
                      </div>
                    </div>
                    
                    {/* Monthly SIP */}
                    <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground mb-1">Monthly SIP Required</p>
                        <p className="text-4xl font-bold text-emerald-600">₹{monthlyRequired.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          for {goalYears > 0 ? `${goalYears}y ` : ''}{goalMonths > 0 ? `${goalMonths}m ` : ''}{goalDays > 0 ? `${goalDays}d` : ''}
                          {goalYears === 0 && goalMonths === 0 && goalDays === 0 ? 'Select duration' : ''}
                        </p>
                      </div>
                    </div>

                    <Button className="w-full" size="lg">
                      <Coins className="w-4 h-4 mr-2" />
                      Start SIP @ ₹{monthlyRequired.toLocaleString('en-IN')}/month
                    </Button>
                  </div>
                </Card>
              </div>

              {/* Suggested Goals */}
              <Card className="p-6 mt-6">
                <h4 className="font-semibold mb-4">Popular Goal Templates</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Wedding", grams: 50, icon: "💍", years: 3 },
                    { name: "Child's Education", grams: 100, icon: "🎓", years: 10 },
                    { name: "Home Down Payment", grams: 200, icon: "🏠", years: 5 },
                    { name: "Retirement", grams: 500, icon: "🌴", years: 15 },
                  ].map((goal) => (
                    <Card 
                      key={goal.name}
                      className="p-4 cursor-pointer hover:shadow-md hover:border-primary/50 transition-all"
                      onClick={() => {
                        setGoalMode("grams");
                        setTargetGoldGrams(goal.grams);
                        setTargetSilverGrams(0);
                        setGoalYears(goal.years);
                        setGoalMonths(0);
                        setGoalDays(0);
                      }}
                    >
                      <div className="text-center">
                        <span className="text-2xl">{goal.icon}</span>
                        <p className="font-medium text-sm mt-2">{goal.name}</p>
                        <p className="text-xs text-muted-foreground">{goal.grams}g in {goal.years} years</p>
                        <Badge variant="outline" className="mt-2 text-xs">
                          ₹{Math.ceil((goal.grams * goldPrice) / (goal.years * 12)).toLocaleString('en-IN')}/mo
                        </Badge>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>
            </motion.div>
          </TabsContent>

          {/* SIP vs FD vs Gold Comparison Tab */}
          <TabsContent value="compare" className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {/* Input Controls */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Compare Investment Options
                </h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-medium">Monthly Investment</Label>
                      <span className="text-sm text-primary font-bold">₹{monthlyInvestment[0].toLocaleString('en-IN')}</span>
                    </div>
                    <Slider
                      value={monthlyInvestment}
                      onValueChange={setMonthlyInvestment}
                      min={1000}
                      max={100000}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>₹1,000</span>
                      <span>₹1,00,000</span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="text-sm font-medium">Investment Period</Label>
                      <span className="text-sm text-primary font-bold">{investmentYears[0]} years</span>
                    </div>
                    <Slider
                      value={investmentYears}
                      onValueChange={setInvestmentYears}
                      min={1}
                      max={20}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                      <span>1 year</span>
                      <span>20 years</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Comparison Cards */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Fixed Deposit */}
                <Card className="p-6 border-2 border-blue-500/30 bg-blue-500/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Fixed Deposit</h4>
                      <p className="text-xs text-muted-foreground">{fdRate}% p.a.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Principal</span>
                      <span className="font-medium">₹{principal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Interest Earned</span>
                      <span className="font-medium text-blue-500">₹{fdReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-blue-500/10 rounded-lg px-3">
                      <span className="font-semibold">Maturity Value</span>
                      <span className="font-bold text-blue-600">₹{fdFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Guaranteed returns</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Low risk</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <Info className="w-3 h-3" />
                      <span>Taxable interest</span>
                    </div>
                  </div>
                </Card>

                {/* Digital Gold */}
                <Card className="p-6 border-2 border-amber-500/50 bg-amber-500/10 relative overflow-hidden">
                  <Badge className="absolute top-3 right-3 bg-amber-500 text-black">Recommended</Badge>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
                      <Coins className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Digital Gold</h4>
                      <p className="text-xs text-muted-foreground">{goldReturns}% p.a. (10Y avg)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Principal</span>
                      <span className="font-medium">₹{principal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="font-medium text-amber-500">₹{goldTotalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-amber-500/20 rounded-lg px-3">
                      <span className="font-semibold">Maturity Value</span>
                      <span className="font-bold text-amber-600">₹{goldFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Hedge against inflation</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Physical asset backing</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>LTCG after 3 years @ 20%</span>
                    </div>
                  </div>
                </Card>

                {/* Equity SIP */}
                <Card className="p-6 border-2 border-purple-500/30 bg-purple-500/5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
                      <PiggyBank className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold">Equity SIP</h4>
                      <p className="text-xs text-muted-foreground">{sipReturns}% p.a. (expected)</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Principal</span>
                      <span className="font-medium">₹{principal.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-border/30">
                      <span className="text-sm text-muted-foreground">Growth</span>
                      <span className="font-medium text-purple-500">₹{sipTotalReturns.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between py-2 bg-purple-500/10 rounded-lg px-3">
                      <span className="font-semibold">Maturity Value</span>
                      <span className="font-bold text-purple-600">₹{sipFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>Higher potential returns</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-red-400">
                      <Info className="w-3 h-3" />
                      <span>Market volatility risk</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle className="w-3 h-3 text-emerald-500" />
                      <span>LTCG after 1 year @ 10%</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Comparison Summary */}
              <Card className="p-6">
                <h4 className="font-semibold mb-4">Detailed Comparison</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border/50">
                        <th className="text-left py-3 text-sm font-medium text-muted-foreground">Feature</th>
                        <th className="text-center py-3 text-sm font-medium text-blue-500">Fixed Deposit</th>
                        <th className="text-center py-3 text-sm font-medium text-amber-500">Digital Gold</th>
                        <th className="text-center py-3 text-sm font-medium text-purple-500">Equity SIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Expected Returns</td>
                        <td className="py-3 text-sm text-center">{fdRate}% p.a.</td>
                        <td className="py-3 text-sm text-center">{goldReturns}% p.a.</td>
                        <td className="py-3 text-sm text-center">{sipReturns}% p.a.</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Risk Level</td>
                        <td className="py-3 text-sm text-center">
                          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500">Low</Badge>
                        </td>
                        <td className="py-3 text-sm text-center">
                          <Badge variant="outline" className="bg-amber-500/10 text-amber-500">Low-Medium</Badge>
                        </td>
                        <td className="py-3 text-sm text-center">
                          <Badge variant="outline" className="bg-red-500/10 text-red-500">Medium-High</Badge>
                        </td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Inflation Protection</td>
                        <td className="py-3 text-sm text-center">❌ No</td>
                        <td className="py-3 text-sm text-center">✅ Yes</td>
                        <td className="py-3 text-sm text-center">✅ Yes</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Liquidity</td>
                        <td className="py-3 text-sm text-center">Medium (penalty)</td>
                        <td className="py-3 text-sm text-center">High (48hr lock)</td>
                        <td className="py-3 text-sm text-center">High</td>
                      </tr>
                      <tr className="border-b border-border/30">
                        <td className="py-3 text-sm">Tax Benefit</td>
                        <td className="py-3 text-sm text-center">None (fully taxable)</td>
                        <td className="py-3 text-sm text-center">LTCG 20% after 3yr</td>
                        <td className="py-3 text-sm text-center">LTCG 10% after 1yr</td>
                      </tr>
                      <tr className="bg-muted/30">
                        <td className="py-3 text-sm font-semibold">Maturity Value</td>
                        <td className="py-3 text-sm text-center font-bold text-blue-600">₹{fdFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="py-3 text-sm text-center font-bold text-amber-600">₹{goldFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                        <td className="py-3 text-sm text-center font-bold text-purple-600">₹{sipFutureValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Gold Advantage Highlight */}
                <Card className="p-4 bg-amber-500/10 border-amber-500/30 mt-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg">💡</span>
                    </div>
                    <div>
                      <p className="font-semibold text-amber-600">Why Digital Gold?</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Digital gold offers a balanced portfolio approach — it provides inflation protection like equities, 
                        with lower volatility than stocks, and better returns than FDs. Start with as little as ₹10!
                      </p>
                    </div>
                  </div>
                </Card>
              </Card>

              {/* CTA */}
              <Card className="p-6 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 border-amber-500/30">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="font-semibold text-lg">Ready to start your Gold SIP?</p>
                    <p className="text-sm text-muted-foreground">Begin with just ₹100/month and build your golden future</p>
                  </div>
                  <Button size="lg" onClick={() => navigate('/bullion')}>
                    Start Gold SIP
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

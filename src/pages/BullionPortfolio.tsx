import { useState, useEffect } from "react";
import { ArrowLeft, Bell, User, TrendingUp, TrendingDown, Wallet, Calendar, Filter, ChevronRight, Clock, Target, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LoginPromptModal } from "@/components/bullion/LoginPromptModal";
import { GrowthCalculator } from "@/components/bullion/GrowthCalculator";
import { GoalBasedPlanner } from "@/components/bullion/GoalBasedPlanner";
import { UnifiedBuyModal } from "@/components/bullion/UnifiedBuyModal";
import { UserStateSwitcher, ThemeSwitcher, generateInvoicePDF } from "@/components/bullion";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { toast } from "sonner";

type UserState = "new" | "logged_in_no_holdings" | "investor";

// Mock performance data
const performanceData = [
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 10500 },
  { date: "Mar", value: 10200 },
  { date: "Apr", value: 11000 },
  { date: "May", value: 11800 },
  { date: "Jun", value: 12500 },
  { date: "Jul", value: 13200 },
  { date: "Aug", value: 14000 },
  { date: "Sep", value: 14800 },
  { date: "Oct", value: 15300 },
  { date: "Nov", value: 16000 },
  { date: "Dec", value: 16750 },
];

// Mock transactions
const mockTransactions = [
  { id: "1", type: "buy" as const, metal: "gold" as const, grams: 1.0, amount: 6250, date: "Dec 24, 2025", status: "success" as const },
  { id: "2", type: "buy" as const, metal: "silver" as const, grams: 50, amount: 3840, date: "Dec 20, 2025", status: "success" as const },
  { id: "3", type: "sip" as const, metal: "gold" as const, grams: 0.5, amount: 3125, date: "Dec 15, 2025", status: "success" as const },
  { id: "4", type: "buy" as const, metal: "gold" as const, grams: 0.8, amount: 5000, date: "Dec 10, 2025", status: "success" as const },
  { id: "5", type: "sell" as const, metal: "silver" as const, grams: 20, amount: 1536, date: "Dec 5, 2025", status: "success" as const },
  { id: "6", type: "sip" as const, metal: "silver" as const, grams: 25, amount: 1920, date: "Dec 1, 2025", status: "success" as const },
];

// Mock SIPs
const mockSIPs = [
  { id: "1", metal: "gold" as const, amount: 1000, frequency: "monthly", nextDebit: "Jan 15, 2026", totalInvested: 6000, grams: 0.96 },
  { id: "2", metal: "silver" as const, amount: 500, frequency: "weekly", nextDebit: "Jan 3, 2026", totalInvested: 4000, grams: 52 },
];

export default function BullionPortfolio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // User state from URL or default
  const initialState = (searchParams.get("state") as UserState) || "investor";
  const [userState, setUserState] = useState<UserState>(initialState);
  const [simulatedGoldHoldings, setSimulatedGoldHoldings] = useState(2.5);
  const [simulatedSilverHoldings, setSimulatedSilverHoldings] = useState(100);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState<"gold" | "silver">("gold");
  const [activeFilter, setActiveFilter] = useState<"all" | "gold" | "silver">("all");
  const [activeTab, setActiveTab] = useState<"overview" | "transactions" | "sips">("overview");

  const userName = userState !== "new" ? "Shubham" : undefined;

  // Mock prices
  const goldPrice = 6250.50;
  const silverPrice = 76.80;

  // Holdings
  const holdings = userState === "investor" 
    ? { gold: simulatedGoldHoldings, silver: simulatedSilverHoldings }
    : { gold: 0, silver: 0 };

  const totalGoldValue = holdings.gold * goldPrice;
  const totalSilverValue = holdings.silver * silverPrice;
  const totalValue = totalGoldValue + totalSilverValue;
  const investedAmount = 20000;
  const totalGain = totalValue - investedAmount;
  const gainPercent = investedAmount > 0 ? (totalGain / investedAmount) * 100 : 0;

  const filteredTransactions = activeFilter === "all" 
    ? mockTransactions 
    : mockTransactions.filter(t => t.metal === activeFilter);

  const openBuy = (metal: "gold" | "silver") => {
    setSelectedMetal(metal);
    setBuyModalOpen(true);
  };

  const handleLoginComplete = (state: UserState) => {
    setUserState(state);
    setShowLoginModal(false);
    if (state === "investor") {
      setSimulatedGoldHoldings(2.5);
      setSimulatedSilverHoldings(100);
    }
  };

  // New User View - Login Prompt
  if (userState === "new") {
    return (
      <div className="min-h-screen bg-background">
        <Header navigate={navigate} />
        
        <div className="max-w-4xl mx-auto px-4 py-8 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
              <Wallet className="w-10 h-10 text-amber-500" />
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold mb-3">Your Portfolio Awaits</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Login to view your gold & silver holdings, track performance, and manage your investments.
            </p>
          </motion.div>

          {/* Teaser Preview */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-10 flex items-end justify-center pb-8">
              <Button 
                size="lg" 
                onClick={() => setShowLoginModal(true)}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg"
              >
                Login to View Portfolio
              </Button>
            </div>
            
            <div className="blur-sm opacity-60 pointer-events-none">
              <Card className="p-6 mb-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Total Portfolio Value</span>
                  <span className="text-emerald-400 text-sm">+12.5%</span>
                </div>
                <p className="text-3xl font-bold">₹23,430</p>
              </Card>
              
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4 bg-amber-500/10">
                  <span className="text-amber-500">Gold</span>
                  <p className="text-xl font-bold">2.5g</p>
                </Card>
                <Card className="p-4 bg-slate-400/10">
                  <span className="text-slate-400">Silver</span>
                  <p className="text-xl font-bold">100g</p>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>

        <LoginPromptModal
          open={showLoginModal}
          onOpenChange={setShowLoginModal}
          onSelectState={handleLoginComplete}
        />

        {/* Dev Tools */}
        <UserStateSwitcher
          userState={userState}
          onUserStateChange={setUserState}
          goldHoldings={simulatedGoldHoldings}
          silverHoldings={simulatedSilverHoldings}
          onGoldHoldingsChange={setSimulatedGoldHoldings}
          onSilverHoldingsChange={setSimulatedSilverHoldings}
        />
        <ThemeSwitcher />
      </div>
    );
  }

  // Logged in but no holdings
  if (userState === "logged_in_no_holdings") {
    return (
      <div className="min-h-screen bg-background">
        <Header navigate={navigate} />
        
        <div className="max-w-4xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">
              Hey {userName}, let's start investing! ✨
            </h1>
            <p className="text-muted-foreground">
              Your portfolio is empty. Make your first purchase and watch your wealth grow.
            </p>
          </motion.div>

          {/* Why Start Investing Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
          >
            <Card className="p-4 border-amber-500/30 bg-amber-500/5">
              <Target className="w-8 h-8 text-amber-500 mb-3" />
              <h3 className="font-semibold mb-1">Beat Inflation</h3>
              <p className="text-sm text-muted-foreground">Gold has historically outperformed inflation over time</p>
            </Card>
            <Card className="p-4 border-emerald-500/30 bg-emerald-500/5">
              <TrendingUp className="w-8 h-8 text-emerald-500 mb-3" />
              <h3 className="font-semibold mb-1">Steady Growth</h3>
              <p className="text-sm text-muted-foreground">Average 10% returns over the last decade</p>
            </Card>
            <Card className="p-4 border-blue-500/30 bg-blue-500/5">
              <Sparkles className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="font-semibold mb-1">Start Small</h3>
              <p className="text-sm text-muted-foreground">Begin your journey with just ₹10</p>
            </Card>
          </motion.div>

          {/* Growth Calculator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <GrowthCalculator />
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg"
              onClick={() => openBuy("gold")}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold shadow-lg shadow-amber-500/25"
            >
              🪙 Buy Gold Now
            </Button>
            <Button 
              size="lg"
              onClick={() => openBuy("silver")}
              variant="outline"
              className="border-slate-600"
            >
              🥈 Buy Silver
            </Button>
          </motion.div>

          {/* First Purchase Bonus */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card className="p-4 bg-gradient-to-r from-emerald-500/10 to-emerald-600/5 border-emerald-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <p className="font-semibold text-emerald-400">First Purchase Bonus!</p>
                  <p className="text-sm text-muted-foreground">Get ₹50 worth of free gold on your first purchase of ₹500+</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        <UnifiedBuyModal
          open={buyModalOpen}
          onOpenChange={setBuyModalOpen}
          metal={selectedMetal}
          currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice}
        />

        {/* Dev Tools */}
        <UserStateSwitcher
          userState={userState}
          onUserStateChange={setUserState}
          goldHoldings={simulatedGoldHoldings}
          silverHoldings={simulatedSilverHoldings}
          onGoldHoldingsChange={setSimulatedGoldHoldings}
          onSilverHoldingsChange={setSimulatedSilverHoldings}
        />
        <ThemeSwitcher />
      </div>
    );
  }

  // Investor View - Full Dashboard
  return (
    <div className="min-h-screen bg-background pb-20 lg:pb-8">
      <Header navigate={navigate} />
      
      {/* Mobile Tab Navigation */}
      <div className="lg:hidden sticky top-[57px] z-30 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-lg mx-auto px-4 py-2">
          <div className="flex gap-2 p-1 bg-muted/50 rounded-xl">
            {(["overview", "transactions", "sips"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all capitalize ${
                  activeTab === tab ? "bg-background shadow-sm" : ""
                }`}
              >
                {tab === "sips" ? "SIPs" : tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DESKTOP: 3-Column Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Portfolio Overview */}
          <aside className="col-span-4">
            <div className="sticky top-24 space-y-4">
              {/* Portfolio Value Card */}
              <Card className="p-6 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center gap-2 mb-4">
                  <Wallet className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">Total Portfolio Value</span>
                </div>
                <p className="text-3xl font-bold mb-2">
                  ₹{totalValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                </p>
                <div className={`flex items-center gap-1 text-sm ${totalGain >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {totalGain >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {totalGain >= 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString("en-IN")} ({gainPercent.toFixed(1)}%)
                </div>
              </Card>

              {/* Holdings Breakdown */}
              <Card className="p-4">
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide">Holdings</h3>
                <div className="space-y-4">
                  <HoldingCard 
                    metal="gold" 
                    grams={holdings.gold} 
                    value={totalGoldValue} 
                    price={goldPrice}
                    onClick={() => openBuy("gold")}
                  />
                  <HoldingCard 
                    metal="silver" 
                    grams={holdings.silver} 
                    value={totalSilverValue} 
                    price={silverPrice}
                    onClick={() => openBuy("silver")}
                  />
                </div>
              </Card>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3">
                <Button 
                  onClick={() => openBuy("gold")}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
                >
                  Buy More
                </Button>
                <Button 
                  onClick={() => navigate("/bullion")}
                  variant="outline"
                >
                  Sell
                </Button>
              </div>
            </div>
          </aside>

          {/* Center Column - Performance Chart */}
          <main className="col-span-5 space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Portfolio Performance</h3>
                <div className="flex gap-2">
                  {["1M", "3M", "6M", "1Y", "All"].map((period) => (
                    <button
                      key={period}
                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                        period === "1Y" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={performanceData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="date" 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                      tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Value']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                      fill="url(#colorValue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Transactions */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Recent Transactions</h3>
                <div className="flex gap-2">
                  {(["all", "gold", "silver"] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`px-3 py-1 text-xs rounded-full capitalize transition-colors ${
                        activeFilter === filter ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredTransactions.map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
              </div>
            </Card>
          </main>

          {/* Right Column - Active SIPs */}
          <aside className="col-span-3">
            <div className="sticky top-24 space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Active SIPs</h3>
                  <Button variant="ghost" size="sm" className="text-xs" onClick={() => openBuy("gold")}>
                    + New SIP
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {mockSIPs.map((sip) => (
                    <SIPCard key={sip.id} sip={sip} />
                  ))}
                </div>
              </Card>

              {/* Goal-Based Planner */}
              <GoalBasedPlanner variant="compact" />

              {/* To Know More Card */}
              <Card 
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors border-primary/20 bg-gradient-to-br from-primary/5 to-transparent group"
                onClick={() => navigate("/bullion/calculators")}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">To Know More</p>
                      <p className="text-xs text-muted-foreground">Explore calculators & tools</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      {/* MOBILE: Tab-based Layout */}
      <div className="lg:hidden max-w-lg mx-auto px-4 py-4">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Portfolio Value */}
              <Card className="p-5 bg-gradient-to-br from-primary/5 to-transparent">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground">Total Value</span>
                </div>
                <p className="text-3xl font-bold mb-1">
                  ₹{totalValue.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
                </p>
                <div className={`flex items-center gap-1 text-sm ${totalGain >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                  {totalGain >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {totalGain >= 0 ? "+" : ""}₹{Math.abs(totalGain).toLocaleString("en-IN")} ({gainPercent.toFixed(1)}%)
                </div>
              </Card>

              {/* Holdings */}
              <div className="grid grid-cols-2 gap-3">
                <HoldingCard 
                  metal="gold" 
                  grams={holdings.gold} 
                  value={totalGoldValue} 
                  price={goldPrice}
                  compact
                />
                <HoldingCard 
                  metal="silver" 
                  grams={holdings.silver} 
                  value={totalSilverValue} 
                  price={silverPrice}
                  compact
                />
              </div>

              {/* Performance Chart - Mobile */}
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Performance</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorValueMobile" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fill="url(#colorValueMobile)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Quick SIP Summary */}
              <Card className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Active SIPs</h3>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("sips")}>
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="flex gap-3">
                  <div className="flex-1 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-500">Gold SIP</p>
                    <p className="font-bold">₹1,000/mo</p>
                  </div>
                  <div className="flex-1 p-3 rounded-lg bg-slate-400/10 border border-slate-500/20">
                    <p className="text-sm text-slate-400">Silver SIP</p>
                    <p className="font-bold">₹500/wk</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {activeTab === "transactions" && (
            <motion.div
              key="transactions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Filters */}
              <div className="flex gap-2">
                {(["all", "gold", "silver"] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-4 py-2 text-sm rounded-full capitalize transition-colors ${
                      activeFilter === filter ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Transaction List */}
              <div className="space-y-3">
                {filteredTransactions.map((tx) => (
                  <TransactionRow key={tx.id} transaction={tx} />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "sips" && (
            <motion.div
              key="sips"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <Button 
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold"
                onClick={() => openBuy("gold")}
              >
                + Start New SIP
              </Button>

              {mockSIPs.map((sip) => (
                <SIPCard key={sip.id} sip={sip} expanded />
              ))}

              <GrowthCalculator />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Bottom Actions */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-xl border-t border-border/50 p-4">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button 
            onClick={() => openBuy("gold")} 
            className="flex-1 h-12 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold"
          >
            🪙 Buy Gold
          </Button>
          <Button 
            onClick={() => openBuy("silver")} 
            variant="secondary"
            className="flex-1 h-12"
          >
            🥈 Buy Silver
          </Button>
        </div>
      </div>

      <UnifiedBuyModal
        open={buyModalOpen}
        onOpenChange={setBuyModalOpen}
        metal={selectedMetal}
        currentPrice={selectedMetal === "gold" ? goldPrice : silverPrice}
      />

      {/* Dev Tools */}
      <UserStateSwitcher
        userState={userState}
        onUserStateChange={setUserState}
        goldHoldings={simulatedGoldHoldings}
        silverHoldings={simulatedSilverHoldings}
        onGoldHoldingsChange={setSimulatedGoldHoldings}
        onSilverHoldingsChange={setSimulatedSilverHoldings}
      />
      <ThemeSwitcher />
    </div>
  );
}

// Header Component
function Header({ navigate }: { navigate: (path: string | number) => void }) {
  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/bullion")}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="font-bold text-lg">Portfolio</h1>
            <p className="text-xs text-muted-foreground">Your Holdings</p>
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
  );
}

// Holding Card Component
function HoldingCard({ 
  metal, 
  grams, 
  value, 
  price,
  compact = false,
  onClick
}: { 
  metal: "gold" | "silver"; 
  grams: number; 
  value: number; 
  price: number;
  compact?: boolean;
  onClick?: () => void;
}) {
  const isGold = metal === "gold";
  
  return (
    <Card 
      className={`p-4 cursor-pointer transition-all hover:scale-[1.02] ${
        isGold ? "bg-amber-500/10 border-amber-500/30" : "bg-slate-400/10 border-slate-500/30"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{isGold ? "🪙" : "🥈"}</span>
        <span className={`text-sm font-medium ${isGold ? "text-amber-400" : "text-slate-400"}`}>
          {isGold ? "Gold" : "Silver"}
        </span>
      </div>
      <p className={`font-bold ${compact ? "text-lg" : "text-xl"}`}>
        {isGold ? grams.toFixed(2) : grams.toFixed(0)}g
      </p>
      <p className="text-xs text-muted-foreground">
        ₹{value.toLocaleString("en-IN", { minimumFractionDigits: 0 })}
      </p>
      {!compact && (
        <p className="text-xs text-muted-foreground mt-1">
          @ ₹{price.toLocaleString("en-IN")}/g
        </p>
      )}
    </Card>
  );
}

// Transaction Row Component
function TransactionRow({ 
  transaction,
  goldPrice = 6250.50,
  silverPrice = 76.80,
}: { 
  transaction: { 
    id: string; 
    type: "buy" | "sell" | "sip"; 
    metal: "gold" | "silver"; 
    grams: number; 
    amount: number; 
    date: string; 
    status: "success" | "pending" | "failed";
  };
  goldPrice?: number;
  silverPrice?: number;
}) {
  const { type, metal, grams, amount, date, status, id } = transaction;
  const isGold = metal === "gold";
  
  const handleDownloadInvoice = (e: React.MouseEvent) => {
    e.stopPropagation();
    generateInvoicePDF(transaction, goldPrice, silverPrice);
    toast.success("Invoice downloaded successfully!");
  };
  
  return (
    <div className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
          type === "sell" 
            ? "bg-red-500/20" 
            : type === "sip" 
              ? "bg-blue-500/20" 
              : "bg-emerald-500/20"
        }`}>
          <span className="text-lg">{isGold ? "🪙" : "🥈"}</span>
        </div>
        <div>
          <p className="font-medium capitalize">
            {type === "sip" ? "SIP" : type} {metal}
          </p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className={`font-medium ${type === "sell" ? "text-red-400" : "text-emerald-400"}`}>
            {type === "sell" ? "-" : "+"}{grams}g
          </p>
          <p className="text-xs text-muted-foreground">₹{amount.toLocaleString()}</p>
        </div>
        {status === "success" && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 hover:bg-amber-500/10"
            onClick={handleDownloadInvoice}
          >
            <Download className="w-4 h-4 text-amber-500" />
          </Button>
        )}
      </div>
    </div>
  );
}

// SIP Card Component
function SIPCard({ 
  sip, 
  expanded = false 
}: { 
  sip: { 
    id: string; 
    metal: "gold" | "silver"; 
    amount: number; 
    frequency: string; 
    nextDebit: string; 
    totalInvested: number; 
    grams: number;
  };
  expanded?: boolean;
}) {
  const isGold = sip.metal === "gold";
  
  return (
    <Card className={`p-4 ${isGold ? "bg-amber-500/5 border-amber-500/20" : "bg-slate-400/5 border-slate-500/20"}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{isGold ? "🪙" : "🥈"}</span>
          <span className={`font-medium ${isGold ? "text-amber-400" : "text-slate-400"}`}>
            {isGold ? "Gold" : "Silver"} SIP
          </span>
        </div>
        <span className="text-sm font-bold">₹{sip.amount}/{sip.frequency === "monthly" ? "mo" : "wk"}</span>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <Calendar className="w-4 h-4" />
        <span>Next: {sip.nextDebit}</span>
      </div>
      
      {expanded && (
        <div className="mt-3 pt-3 border-t border-border/50 grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Invested</p>
            <p className="font-semibold">₹{sip.totalInvested.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Accumulated</p>
            <p className="font-semibold">{sip.grams}g</p>
          </div>
        </div>
      )}
    </Card>
  );
}

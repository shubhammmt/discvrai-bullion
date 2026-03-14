import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ManageSIPWidget } from '@/components/sip/ManageSIPWidget';
import { FundPurchaseWidget } from '@/components/sip/FundPurchaseWidget';
import { FundRedemptionWidget } from '@/components/sip/FundRedemptionWidget';
import { SmartFundSearch } from '@/components/sip/SmartFundSearch';
import { SIPCalculatorWidget } from '@/components/sip/SIPCalculatorWidget';
import { GoalsWidget } from '@/components/sip/GoalsWidget';
import { PortfolioTab } from '@/components/sip/PortfolioTab';
import { TransactionsTab } from '@/components/sip/TransactionsTab';
import { StatementsTab } from '@/components/sip/StatementsTab';
import { DiscoverySection } from '@/components/sip/DiscoverySection';
import { AgenticChatHome } from '@/components/sip/AgenticChatHome';
import { ChatHistoryPanel } from '@/components/sip/ChatHistoryPanel';
import { FlowDemos } from '@/components/sip/FlowDemos';
import { SIPUserStateSwitcher, SIPUserState } from '@/components/sip/SIPUserStateSwitcher';
import {
  Home, ShoppingCart, Search, Settings, Calculator, Target, ArrowDownLeft,
  TrendingUp, Repeat, Zap, Bell, ArrowRight, BarChart3, FileText, Receipt,
  MessageSquare, History, Sparkles, Bot, LogIn,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_SIPS, MutualFund } from '@/data/sipMockData';
import { cn } from '@/lib/utils';

const SIPManagement = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userState, setUserState] = useState<SIPUserState>('investor');

  const isLoggedIn = userState !== 'anonymous';
  const hasHoldings = userState === 'investor';

  const activeSIPs = MOCK_SIPS.filter(s => s.status === 'active');
  const totalMonthly = activeSIPs.reduce((sum, s) => sum + s.amount, 0);
  const totalInvested = MOCK_SIPS.reduce((sum, s) => sum + s.totalInvested, 0);
  const totalValue = MOCK_SIPS.reduce((sum, s) => sum + s.currentValue, 0);
  const overallReturn = totalInvested > 0 ? (((totalValue - totalInvested) / totalInvested) * 100).toFixed(1) : '0';

  const handleStartSIPFromCalc = (amount: number) => {
    setActiveTab('buy');
  };

  const handleFundSelect = (fund: MutualFund) => {
    setActiveTab('buy');
  };

  // Tabs vary by user state
  const allTabs = [
    { value: 'home', icon: Sparkles, label: 'Home', always: true },
    { value: 'chat', icon: MessageSquare, label: 'Chat', always: true },
    { value: 'portfolio', icon: BarChart3, label: 'Portfolio', requiresHoldings: true },
    { value: 'buy', icon: ShoppingCart, label: 'Invest', always: true },
    { value: 'screener', icon: Search, label: 'Screener', always: true },
    { value: 'transactions', icon: Receipt, label: 'Txns', requiresLogin: true },
    { value: 'manage', icon: Settings, label: 'SIPs', requiresHoldings: true },
    { value: 'statements', icon: FileText, label: 'Stmts', requiresLogin: true },
    { value: 'calculator', icon: Calculator, label: 'Calc', always: true },
    { value: 'goals', icon: Target, label: 'Goals', requiresLogin: true },
    { value: 'sell', icon: ArrowDownLeft, label: 'Sell', requiresHoldings: true },
    { value: 'demos', icon: History, label: 'Demos', always: true },
  ];

  const visibleTabs = allTabs.filter(t => {
    if (t.always) return true;
    if (t.requiresHoldings && !hasHoldings) return false;
    if (t.requiresLogin && !isLoggedIn) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isLoggedIn && (
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0 relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              </Button>
            )}
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                {userState === 'anonymous' ? 'Discover Mutual Funds' : 'Mutual Funds'}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                {userState === 'anonymous'
                  ? 'AI-powered investment discovery & research'
                  : hasHoldings
                    ? 'Invest, track & manage your portfolio'
                    : 'Start your investment journey with AI'
                }
              </p>
            </div>
          </div>
          {!isLoggedIn && (
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <LogIn className="w-3.5 h-3.5" /> Sign In
            </Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Scrollable Tab Navigation */}
          <div className="overflow-x-auto -mx-4 px-4 pb-1">
            <TabsList className="inline-flex w-auto h-auto p-1 gap-0.5">
              {visibleTabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col items-center gap-0.5 text-[10px] py-1.5 px-2.5 min-w-[52px]">
                  <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* HOME TAB — Chat-centered agentic hero */}
          <TabsContent value="home" className="mt-4 space-y-4">
            {/* Agentic AI Chat — The Hero */}
            <Card className="overflow-hidden border-primary/20">
              <CardContent className="p-4">
                <AgenticChatHome userState={userState} onNavigateTab={setActiveTab} />
              </CardContent>
            </Card>

            {/* Quick context cards for logged-in users with holdings */}
            {hasHoldings && (
              <div className="grid grid-cols-2 gap-3">
                <Card className="bg-primary text-primary-foreground cursor-pointer" onClick={() => setActiveTab('portfolio')}>
                  <CardContent className="p-4">
                    <p className="text-[10px] uppercase tracking-wider opacity-80">Portfolio Value</p>
                    <p className="text-2xl font-bold mt-1">₹{totalValue.toLocaleString()}</p>
                    <p className="text-xs opacity-70 mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      {Number(overallReturn) >= 0 ? '+' : ''}{overallReturn}% returns
                    </p>
                  </CardContent>
                </Card>
                <Card className="cursor-pointer" onClick={() => setActiveTab('manage')}>
                  <CardContent className="p-4">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Monthly SIPs</p>
                    <p className="text-2xl font-bold text-foreground mt-1">₹{totalMonthly.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activeSIPs.length} active SIPs</p>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* For logged-in no holdings — nudge */}
            {isLoggedIn && !hasHoldings && (
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="p-4 text-center space-y-2">
                  <p className="text-sm font-semibold text-foreground">🎯 You're all set up!</p>
                  <p className="text-xs text-muted-foreground">Ask the AI above to recommend your first fund, or explore below.</p>
                  <div className="flex gap-2 justify-center">
                    <Button size="sm" onClick={() => setActiveTab('buy')}>
                      <ShoppingCart className="w-3 h-3 mr-1" /> Start SIP
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setActiveTab('calculator')}>
                      <Calculator className="w-3 h-3 mr-1" /> Calculator
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* For anonymous — value props */}
            {!isLoggedIn && (
              <div className="grid grid-cols-3 gap-2">
                {[
                  { icon: Sparkles, label: 'AI Research', desc: 'Get personalized picks' },
                  { icon: Calculator, label: 'Plan Goals', desc: 'Retirement, education...' },
                  { icon: TrendingUp, label: '500+ Funds', desc: 'All AMCs, direct plans' },
                ].map(item => (
                  <Card key={item.label} className="text-center">
                    <CardContent className="p-3">
                      <item.icon className="w-5 h-5 text-primary mx-auto mb-1" />
                      <p className="text-[10px] font-semibold text-foreground">{item.label}</p>
                      <p className="text-[9px] text-muted-foreground">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Top Funds Discovery — always visible */}
            <DiscoverySection onSelectFund={handleFundSelect} onViewAll={() => setActiveTab('screener')} />
          </TabsContent>

          {/* CHAT TAB — New + Old Conversations */}
          <TabsContent value="chat" className="mt-4 space-y-4">
            <ChatHistoryPanel
              onNewChat={() => setActiveTab('home')}
              onSelectConversation={(id) => {
                // In a real app, load conversation and switch to home
                setActiveTab('home');
              }}
            />
          </TabsContent>

          {/* PORTFOLIO TAB */}
          <TabsContent value="portfolio" className="mt-4">
            <PortfolioTab onInvest={() => setActiveTab('buy')} />
          </TabsContent>

          {/* BUY TAB */}
          <TabsContent value="buy" className="mt-4">
            <FundPurchaseWidget />
          </TabsContent>

          {/* SCREENER TAB */}
          <TabsContent value="screener" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  Mutual Fund Screener
                </CardTitle>
                <p className="text-xs text-muted-foreground">Search, filter, or use AI to discover mutual funds</p>
              </CardHeader>
              <CardContent>
                <SmartFundSearch standalone />
              </CardContent>
            </Card>
          </TabsContent>

          {/* TRANSACTIONS TAB */}
          <TabsContent value="transactions" className="mt-4">
            <TransactionsTab />
          </TabsContent>

          {/* MANAGE SIPS TAB */}
          <TabsContent value="manage" className="mt-4">
            <ManageSIPWidget />
          </TabsContent>

          {/* STATEMENTS TAB */}
          <TabsContent value="statements" className="mt-4">
            <StatementsTab />
          </TabsContent>

          {/* CALCULATOR TAB */}
          <TabsContent value="calculator" className="mt-4">
            <SIPCalculatorWidget onStartSIP={handleStartSIPFromCalc} />
          </TabsContent>

          {/* GOALS TAB */}
          <TabsContent value="goals" className="mt-4">
            <GoalsWidget />
          </TabsContent>

          {/* SELL TAB */}
          <TabsContent value="sell" className="mt-4">
            <FundRedemptionWidget />
          </TabsContent>

          {/* DEMOS TAB */}
          <TabsContent value="demos" className="mt-4">
            <FlowDemos />
          </TabsContent>
        </Tabs>
      </div>

      {/* User State Switcher */}
      <SIPUserStateSwitcher userState={userState} onUserStateChange={setUserState} />
    </div>
  );
};

export default SIPManagement;

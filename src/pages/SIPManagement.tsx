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
import {
  Home, ShoppingCart, Search, Settings, Calculator, Target, ArrowDownLeft,
  TrendingUp, Repeat, Zap, Bell, ArrowRight, BarChart3, FileText, Receipt,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_SIPS, MutualFund } from '@/data/sipMockData';
import { cn } from '@/lib/utils';

const SIPManagement = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isLoggedIn] = useState(true); // Toggle for demo

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

  const tabs = [
    { value: 'home', icon: Home, label: 'Home' },
    { value: 'portfolio', icon: BarChart3, label: 'Portfolio' },
    { value: 'buy', icon: ShoppingCart, label: 'Invest' },
    { value: 'screener', icon: Search, label: 'Screener' },
    { value: 'transactions', icon: Receipt, label: 'Txns' },
    { value: 'manage', icon: Settings, label: 'SIPs' },
    { value: 'statements', icon: FileText, label: 'Stmts' },
    { value: 'calculator', icon: Calculator, label: 'Calc' },
    { value: 'goals', icon: Target, label: 'Goals' },
    { value: 'sell', icon: ArrowDownLeft, label: 'Sell' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="w-9 h-9 p-0 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Mutual Funds</h1>
              <p className="text-sm text-muted-foreground mt-0.5">Invest, track & manage your portfolio</p>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Scrollable Tab Navigation */}
          <div className="overflow-x-auto -mx-4 px-4 pb-1">
            <TabsList className="inline-flex w-auto h-auto p-1 gap-0.5">
              {tabs.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value} className="flex flex-col items-center gap-0.5 text-[10px] py-1.5 px-2.5 min-w-[52px]">
                  <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* HOME TAB */}
          <TabsContent value="home" className="mt-4 space-y-4">
            {isLoggedIn ? (
              <>
                {/* Portfolio Summary */}
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

                {/* Quick Actions */}
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { icon: Repeat, label: 'Start SIP', tab: 'buy', color: 'text-primary bg-primary/10' },
                    { icon: Zap, label: 'One-Time', tab: 'buy', color: 'text-amber-600 bg-amber-100 dark:bg-amber-900/30' },
                    { icon: Search, label: 'Discover', tab: 'screener', color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30' },
                    { icon: Calculator, label: 'Calculator', tab: 'calculator', color: 'text-green-600 bg-green-100 dark:bg-green-900/30' },
                  ].map(action => (
                    <button key={action.label} onClick={() => setActiveTab(action.tab)}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border hover:border-primary/30 transition-colors">
                      <div className={cn('w-8 h-8 rounded-full flex items-center justify-center', action.color)}>
                        <action.icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-medium text-foreground">{action.label}</span>
                    </button>
                  ))}
                </div>

                {/* Active SIPs Preview */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Repeat className="w-4 h-4 text-primary" /> Your SIPs
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs text-primary h-7" onClick={() => setActiveTab('manage')}>
                        View All <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-2">
                    {activeSIPs.slice(0, 3).map(sip => {
                      const ret = (((sip.currentValue - sip.totalInvested) / sip.totalInvested) * 100).toFixed(1);
                      return (
                        <div key={sip.id} className="flex items-center justify-between p-2 rounded-lg border border-border">
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground truncate">{sip.fundName}</p>
                            <p className="text-[10px] text-muted-foreground">₹{sip.amount.toLocaleString()}/mo</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-semibold text-foreground">₹{sip.currentValue.toLocaleString()}</p>
                            <p className={cn('text-[10px] font-medium', Number(ret) >= 0 ? 'text-green-600' : 'text-red-500')}>
                              {Number(ret) >= 0 ? '+' : ''}{ret}%
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Goals Widget */}
                <GoalsWidget compact onViewGoals={() => setActiveTab('goals')} />
              </>
            ) : (
              <>
                {/* Anonymous/New user welcome */}
                <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
                  <CardContent className="p-6 text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-primary/10 mx-auto flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="text-lg font-bold text-foreground">Start Your Investment Journey</h2>
                    <p className="text-sm text-muted-foreground">
                      Build long-term wealth with mutual funds. Start a SIP with as low as ₹500/month.
                    </p>
                    <div className="flex gap-2 justify-center pt-2">
                      <Button onClick={() => setActiveTab('screener')}>Explore Funds</Button>
                      <Button variant="outline" onClick={() => setActiveTab('calculator')}>Try Calculator</Button>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}

            {/* Top Funds Discovery — always visible */}
            <DiscoverySection onSelectFund={handleFundSelect} onViewAll={() => setActiveTab('screener')} />

            {/* SIP Promotion Banner */}
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">💡 Start a SIP today</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Invest as low as ₹500/month and build long-term wealth
                  </p>
                </div>
                <Button size="sm" className="shrink-0 ml-3" onClick={() => setActiveTab('buy')}>
                  Start Now
                </Button>
              </CardContent>
            </Card>
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
        </Tabs>
      </div>
    </div>
  );
};

export default SIPManagement;

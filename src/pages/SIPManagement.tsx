import { useState, useEffect, useMemo } from 'react';
import { ManageSIPWidget } from '@/components/sip/ManageSIPWidget';
import { SIPDashboardSummary } from '@/components/sip/SIPDashboardSummary';
import { FundPurchaseWidget } from '@/components/sip/FundPurchaseWidget';
import { FundRedemptionWidget } from '@/components/sip/FundRedemptionWidget';
import { SmartFundSearch } from '@/components/sip/SmartFundSearch';
import { SIPCalculatorWidget } from '@/components/sip/SIPCalculatorWidget';
import { GoalsWidget } from '@/components/sip/GoalsWidget';
import { PortfolioTab } from '@/components/sip/PortfolioTab';
import { TransactionsTab } from '@/components/sip/TransactionsTab';
import { StatementsTab } from '@/components/sip/StatementsTab';
import { DiscoverySection } from '@/components/sip/DiscoverySection';
import { ChatHistoryPanel } from '@/components/sip/ChatHistoryPanel';
import { FlowDemos } from '@/components/sip/FlowDemos';
import { ProfileTab } from '@/components/sip/ProfileTab';
import { AgenticChatHome } from '@/components/sip/AgenticChatHome';
import { HomeChatView } from '@/components/sip/HomeChatView';
import { SIPManageTab } from '@/components/sip/SIPManageTab';
import { SIPUserStateSwitcher, SIPUserState } from '@/components/sip/SIPUserStateSwitcher';
import { OTPLoginDialog, AuthUser } from '@/components/sip/OTPLoginDialog';
import { SIPBrandLogo } from '@/components/sip/SIPBrandLogo';
import { SIP_BRAND } from '@/config/sipBrandConfig';
import {
  Home, ShoppingCart, Search, Settings, Calculator, Target, ArrowDownLeft,
  TrendingUp, Bell, BarChart3, FileText, Receipt, Scale,
  MessageSquare, History, Sparkles, LogIn, LogOut,
  PanelLeft, PanelLeftClose, ChevronRight, UserCircle,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { RebalanceTab } from '@/components/sip/RebalanceTab';
import { NewRebalanceFlow } from '@/components/sip/NewRebalanceFlow';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MOCK_SIPS, MutualFund } from '@/data/sipMockData';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { DiscoverTab } from '@/components/sip/DiscoverTab';

const SIPManagement = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'home';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [rebalanceFocusId, setRebalanceFocusId] = useState<string | undefined>(searchParams.get('focus') || undefined);
  const [userState, setUserState] = useState<SIPUserState>('investor');
  const [showLogin, setShowLogin] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const isMobile = useIsMobile();
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('discvr_user');
      return stored ? JSON.parse(stored) : null;
    } catch { return null; }
  });

  // Goal-derived screener context (set when user creates a goal)
  const [goalContext, setGoalContext] = useState<import('@/components/conversion/types').ConversionContext | undefined>();
  const [purchasePrefill, setPurchasePrefill] = useState<import('@/components/sip/FundPurchaseWidget').FundPurchasePrefill | undefined>();

  // Collapse sidebar on mobile by default
  useEffect(() => {
    if (isMobile) setSidebarOpen(false);
  }, [isMobile]);

  // Sync tab + rebalance focus when URL search params change (e.g. alert CTAs).
  useEffect(() => {
    const tab = searchParams.get('tab');
    const focus = searchParams.get('focus') || undefined;
    if (tab && tab !== activeTab) setActiveTab(tab);
    if (tab === 'rebalance') setRebalanceFocusId(focus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const isLoggedIn = userState !== 'anonymous';
  const hasHoldings = userState === 'investor';

  const handleLoginSuccess = (user: AuthUser) => {
    setAuthUser(user);
    setUserState('investor');
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem('discvr_session');
    localStorage.removeItem('discvr_user');
    setUserState('anonymous');
  };

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

  const handleNavClick = (tab: string) => {
    setActiveTab(tab);
    if (tab !== 'rebalance') setRebalanceFocusId(undefined);
    if (isMobile) setSidebarOpen(false);
  };

  const goToRebalance = (focusId?: string) => {
    setRebalanceFocusId(focusId);
    setActiveTab('rebalance');
  };

  const allTabs = [
    { value: 'home', icon: Home, label: 'Home', always: true },
    { value: 'portfolio', icon: BarChart3, label: 'Portfolio', requiresHoldings: true },
    { value: 'rebalance', icon: Scale, label: 'Rebalance', requiresHoldings: true },
    { value: 'screener', icon: Search, label: 'Explore', always: true },
    { value: 'transactions', icon: Receipt, label: 'Transactions', requiresLogin: true },
    { value: 'manage', icon: Settings, label: 'SIPs', requiresHoldings: true },
    { value: 'statements', icon: FileText, label: 'Statements', requiresLogin: true },
    { value: 'calculator', icon: Calculator, label: 'Calculator', always: true },
    { value: 'goals', icon: Target, label: 'Goals', requiresLogin: true },
    { value: 'sell', icon: ArrowDownLeft, label: 'Sell', requiresHoldings: true },
    { value: 'chat', icon: MessageSquare, label: 'Chat History', always: true },
    { value: 'profile', icon: UserCircle, label: 'Profile', requiresLogin: true },
    { value: 'demos', icon: History, label: 'Demos', always: true },
  ];

  const visibleTabs = allTabs.filter(t => {
    if (t.always) return true;
    if (t.requiresHoldings && !hasHoldings) return false;
    if (t.requiresLogin && !isLoggedIn) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Overlay on Mobile */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={cn(
        'bg-sip-sidebar-bg border-r border-sip-border flex flex-col shrink-0 transition-all duration-200 z-50',
        isMobile ? 'fixed inset-y-0 left-0 w-64' : sidebarOpen ? 'w-56' : 'w-14',
        isMobile && !sidebarOpen && '-translate-x-full'
      )}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-sip-border">
          {(sidebarOpen || isMobile) && (
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <SIPBrandLogo size="md" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-sip-text-primary truncate">{SIP_BRAND.name}</p>
                <p className="text-[10px] text-sip-text-muted">{SIP_BRAND.tagline}</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 shrink-0"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeft className="w-4 h-4" />}
          </Button>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto py-2 px-2 space-y-0.5">
          {visibleTabs.map(tab => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => handleNavClick(tab.value)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-colors',
                  sidebarOpen || isMobile ? 'px-3 py-2' : 'px-0 py-2 justify-center',
                  isActive
                    ? 'bg-sip-brand text-sip-brand-foreground'
                    : 'text-sip-text-secondary hover:bg-sip-sidebar-hover hover:text-sip-text-primary'
                )}
                title={!sidebarOpen && !isMobile ? tab.label : undefined}
              >
                <tab.icon className="w-4 h-4 shrink-0" />
                {(sidebarOpen || isMobile) && <span className="truncate">{tab.label}</span>}
              </button>
            );
          })}

          {/* New Chat shortcut */}
          <div className="pt-2 mt-2 border-t border-sip-border">
            <button
              onClick={() => handleNavClick('home')}
              className={cn(
                'w-full flex items-center gap-3 rounded-lg text-sm font-medium transition-colors',
                sidebarOpen || isMobile ? 'px-3 py-2' : 'px-0 py-2 justify-center',
                'text-sip-brand hover:bg-sip-brand/10'
              )}
              title={!sidebarOpen && !isMobile ? 'New Chat' : undefined}
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              {(sidebarOpen || isMobile) && <span className="truncate">+ New Chat</span>}
            </button>
          </div>
        </nav>

        {/* Sidebar Footer — User */}
        {(sidebarOpen || isMobile) && (
          <div className="border-t border-sip-border p-3">
            {authUser ? (
              <div className="flex items-center gap-2">
                <Avatar className="w-7 h-7">
                  {authUser.picture && <AvatarImage src={authUser.picture} alt={authUser.name} />}
                  <AvatarFallback className="text-[10px]">{authUser.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-sip-text-primary truncate">{authUser.name}</p>
                </div>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={handleLogout}>
                  <LogOut className="w-3.5 h-3.5" />
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="w-full gap-1.5 text-xs" onClick={() => setShowLogin(true)}>
                <LogIn className="w-3.5 h-3.5" /> Sign In
              </Button>
            )}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-background border-b border-sip-border px-4 py-3 flex items-center gap-3">
          {!sidebarOpen && !isMobile && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSidebarOpen(true)}>
              <PanelLeft className="w-4 h-4" />
            </Button>
          )}
          {isMobile && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setSidebarOpen(true)}>
              <PanelLeft className="w-4 h-4" />
            </Button>
          )}
          <div className="flex-1">
            <h1 className="text-lg font-bold text-foreground">
              {visibleTabs.find(t => t.value === activeTab)?.label || (activeTab === 'buy' ? 'Invest' : 'Home')}
            </h1>
          </div>
          {isLoggedIn && (
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
          )}
        </div>

        <div className={cn(
          'mx-auto px-4 md:px-6 lg:px-8 py-6',
          // Chat-led tabs stay narrow for readability; data-led tabs go full webapp width
          (activeTab === 'home' || activeTab === 'chat')
            ? 'max-w-5xl'
            : 'max-w-screen-2xl'
        )}>
          {/* HOME TAB */}
          {activeTab === 'home' && (
            <HomeChatView
              hasHoldings={hasHoldings}
              totalInvested={totalInvested}
              totalValue={totalValue}
              overallReturn={overallReturn}
              userState={userState}
              authUser={authUser}
              onNavigateTab={setActiveTab}
            />
          )}

          {/* CHAT TAB */}
          {activeTab === 'chat' && (
            <ChatHistoryPanel
              onNewChat={() => setActiveTab('home')}
              onSelectConversation={() => setActiveTab('home')}
            />
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <PortfolioTab onInvest={() => setActiveTab('buy')} onReviewRebalance={goToRebalance} />
          )}

          {/* REBALANCE TAB — Phase-1 inline workspace */}
          {activeTab === 'rebalance' && (
            <RebalanceTab
              initialFocusId={rebalanceFocusId}
              onDone={() => setActiveTab('portfolio')}
            />
          )}

          {/* INVEST TAB */}
          {activeTab === 'buy' && <FundPurchaseWidget prefill={purchasePrefill} />}

          {/* DISCOVER TAB — unified For You / Categories / Screener */}
          {activeTab === 'screener' && (
            <DiscoverTab
              context={goalContext}
              onClearContext={() => setGoalContext(undefined)}
              onAddGoal={() => setActiveTab('goals')}
              onInvest={(prefill) => {
                if (prefill) setPurchasePrefill(prefill);
                else if (goalContext?.amount) setPurchasePrefill({ amount: goalContext.amount, mode: 'sip', goalTag: goalContext.goal });
                setActiveTab('buy');
              }}
            />
          )}

          {/* TRANSACTIONS */}
          {activeTab === 'transactions' && <TransactionsTab />}

          {/* SIPs TAB — with Create New SIP CTA + filter + summary */}
          {activeTab === 'manage' && (
            <SIPManageTab onCreateSIP={() => setActiveTab('buy')} />
          )}

          {/* STATEMENTS */}
          {activeTab === 'statements' && <StatementsTab />}

          {/* CALCULATOR */}
          {activeTab === 'calculator' && <SIPCalculatorWidget onStartSIP={handleStartSIPFromCalc} />}

          {/* GOALS */}
          {activeTab === 'goals' && (
            <GoalsWidget
              onCreateGoal={() => {/* handled inside widget */}}
              onViewGoals={() => {}}
              onInvest={(prefill) => { setPurchasePrefill(prefill); setActiveTab('buy'); }}
              onGoalCreated={(ctx) => {
                // Derive years from "Mon YYYY"
                const m = ctx.targetDate.match(/(\d{4})/);
                const years = m ? Math.max(1, Number(m[1]) - new Date().getFullYear()) : 5;
                const horizon = years <= 3 ? '1-3 years' : years <= 7 ? '3-7 years' : '7+ years';
                setGoalContext({
                  goal: ctx.goal,
                  risk: ctx.risk === 'Conservative' ? 'Low' : ctx.risk === 'Moderate' ? 'Moderate' : ctx.risk === 'Aggressive' ? 'High' : 'Very High',
                  horizon,
                  amount: ctx.monthlySIP || undefined,
                });
                setActiveTab('screener');
              }}
            />
          )}

          {/* SELL */}
          {activeTab === 'sell' && <FundRedemptionWidget />}

          {/* PROFILE */}
          {activeTab === 'profile' && <ProfileTab authUser={authUser} onLogout={handleLogout} />}

          {/* DEMOS */}
          {activeTab === 'demos' && <FlowDemos />}
        </div>
      </main>

      {/* Floating Chat Agent FAB — shown on all tabs except home and chat */}
      {activeTab !== 'home' && activeTab !== 'chat' && (
        <button
          onClick={() => setActiveTab('home')}
          className="fixed bottom-20 right-5 z-40 w-12 h-12 rounded-full bg-sip-brand text-sip-brand-foreground shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center justify-center group"
          title="Ask AI Copilot"
        >
          <Sparkles className="w-5 h-5" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-foreground text-background text-[10px] rounded-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Ask {SIP_BRAND.name}
          </span>
        </button>
      )}

      {/* User State Switcher */}
      <SIPUserStateSwitcher userState={userState} onUserStateChange={setUserState} />

      {/* OTP Login Dialog */}
      <OTPLoginDialog open={showLogin} onOpenChange={setShowLogin} onLoginSuccess={handleLoginSuccess} />
    </div>
  );
};

export default SIPManagement;

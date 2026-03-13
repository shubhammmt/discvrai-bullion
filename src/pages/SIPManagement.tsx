import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateSIPWidget } from '@/components/sip/CreateSIPWidget';
import { ManageSIPWidget } from '@/components/sip/ManageSIPWidget';
import { FundPurchaseWidget } from '@/components/sip/FundPurchaseWidget';
import { FundRedemptionWidget } from '@/components/sip/FundRedemptionWidget';
import { MFScreenerWidget } from '@/components/sip/MFScreenerWidget';
import { SmartFundSearch } from '@/components/sip/SmartFundSearch';
import { Plus, Settings, Bot, ShoppingCart, ArrowDownLeft, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SIPManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Fund Purchase & SIP Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Buy, sell mutual funds or manage your Systematic Investment Plans</p>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="buy" className="flex items-center gap-1.5 text-xs">
              <ShoppingCart className="w-3.5 h-3.5" /> Buy
            </TabsTrigger>
            <TabsTrigger value="sell" className="flex items-center gap-1.5 text-xs">
              <ArrowDownLeft className="w-3.5 h-3.5" /> Sell
            </TabsTrigger>
            <TabsTrigger value="screener" className="flex items-center gap-1.5 text-xs">
              <Search className="w-3.5 h-3.5" /> Screener
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" /> SIP
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1.5 text-xs">
              <Settings className="w-3.5 h-3.5" /> Manage
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-1.5 text-xs">
              <Bot className="w-3.5 h-3.5" /> Demos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-4">
            <FundPurchaseWidget />
          </TabsContent>
          <TabsContent value="sell" className="mt-4">
            <FundRedemptionWidget />
          </TabsContent>
          <TabsContent value="screener" className="mt-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Search className="w-4 h-4 text-primary" />
                  Mutual Fund Screener
                </CardTitle>
                <p className="text-xs text-muted-foreground">Search and filter across all mutual funds</p>
              </CardHeader>
              <CardContent>
                <MFScreenerWidget standalone />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="create" className="mt-4">
            <CreateSIPWidget />
          </TabsContent>
          <TabsContent value="manage" className="mt-4">
            <ManageSIPWidget />
          </TabsContent>

          <TabsContent value="demo" className="mt-4 space-y-6">
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground">
                These demos show how the AI agent pre-fills widgets based on user intent. 
                The widget auto-advances to the appropriate step — the user just reviews and confirms.
              </p>
            </div>

            {/* ===== SCREENER DEMOS ===== */}
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Search className="w-4 h-4 text-primary" /> Screener Prefill Demos
            </h3>

            {/* Demo: Agent pre-applies screener filters */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">🔍 Screener</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"Show me mid cap equity funds with expense ratio under 1%"</em>
                </p>
              </div>
              <Card>
                <CardContent className="pt-4">
                  <MFScreenerWidget
                    initialFilters={{ assetClass: 'Equity', marketCap: 'Mid Cap', maxExpenseRatio: 1.0 }}
                    standalone
                  />
                </CardContent>
              </Card>
            </div>

            {/* Demo: Buy with screener filters prefilled */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">🛒 Buy + Screener</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"I want to invest in a debt liquid fund with low expense"</em> — agent opens buy widget with screener pre-filtered
                </p>
              </div>
              <FundPurchaseWidget
                prefill={{ screenerFilters: { assetClass: 'Debt', category: 'Liquid', maxExpenseRatio: 0.5 } }}
              />
            </div>

            {/* ===== BUY DEMOS ===== */}
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 pt-4 border-t border-border">
              <ShoppingCart className="w-4 h-4 text-primary" /> Buy / Invest Demos
            </h3>

            {/* Demo: One-time full prefill → Review */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">⚡ One-Time</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"Invest ₹50,000 in Parag Parikh Flexi Cap right now"</em>
                </p>
              </div>
              <FundPurchaseWidget
                prefill={{
                  fundCode: 'PPFAS-FV-G',
                  amount: 50000,
                  mode: 'onetime',
                  bankMandate: 'Kotak ****3345',
                  goalTag: 'Wealth Creation',
                }}
              />
            </div>

            {/* Demo: SIP full prefill → Review */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-[10px] bg-primary/10 text-primary border-primary/20">🔄 SIP</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"Start a ₹10,000 monthly SIP in Axis Bluechip for retirement"</em>
                </p>
              </div>
              <FundPurchaseWidget
                prefill={{
                  fundCode: 'AXIS-BLU-G',
                  amount: 10000,
                  mode: 'sip',
                  frequency: 'monthly',
                  stepUpPercent: 10,
                  bankMandate: 'HDFC Bank ****4521',
                  goalTag: 'Retirement',
                }}
              />
            </div>

            {/* Demo: Fund-only partial prefill */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">Partial Prefill</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"I want to buy SBI Small Cap"</em> — agent knows the fund, user picks mode & details
                </p>
              </div>
              <FundPurchaseWidget prefill={{ fundCode: 'SBI-SC-G' }} />
            </div>

            {/* ===== SELL / REDEEM DEMOS ===== */}
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2 pt-4 border-t border-border">
              <ArrowDownLeft className="w-4 h-4 text-destructive" /> Sell / Redeem Demos
            </h3>

            {/* Demo: Full redemption, all prefilled → Review */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">🔴 Full Redeem</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"Sell all my HDFC Large Cap holdings"</em>
                </p>
              </div>
              <FundRedemptionWidget
                prefill={{
                  fundCode: 'HDFC-LCF-G',
                  redeemMode: 'full',
                  bankAccount: 'HDFC Bank ****4521',
                }}
              />
            </div>

            {/* Demo: Partial amount redemption → Review */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className="text-[10px] bg-destructive/10 text-destructive border-destructive/20">🟡 Partial</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"Redeem ₹30,000 from my SBI Small Cap to ICICI Bank"</em>
                </p>
              </div>
              <FundRedemptionWidget
                prefill={{
                  fundCode: 'SBI-SC-G',
                  redeemMode: 'partial-amount',
                  amount: 30000,
                  bankAccount: 'ICICI Bank ****8832',
                }}
              />
            </div>

            {/* Demo: Fund-only prefill → Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">Partial Prefill</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"I want to sell some Axis Bluechip"</em> — agent knows the fund, user picks how much
                </p>
              </div>
              <FundRedemptionWidget prefill={{ fundCode: 'AXIS-BLU-G' }} />
            </div>

            {/* Demo: No prefill → full browse */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">No Prefill</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"I want to redeem a fund"</em> — shows all holdings for selection
                </p>
              </div>
              <FundRedemptionWidget />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SIPManagement;

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateSIPWidget } from '@/components/sip/CreateSIPWidget';
import { ManageSIPWidget } from '@/components/sip/ManageSIPWidget';
import { FundPurchaseWidget } from '@/components/sip/FundPurchaseWidget';
import { Plus, Settings, Bot, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SIPManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Fund Purchase & SIP Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Buy mutual funds or manage your Systematic Investment Plans</p>
        </div>

        <Tabs defaultValue="buy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="buy" className="flex items-center gap-1.5 text-xs">
              <ShoppingCart className="w-3.5 h-3.5" /> Buy Fund
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-1.5 text-xs">
              <Plus className="w-3.5 h-3.5" /> Create SIP
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1.5 text-xs">
              <Settings className="w-3.5 h-3.5" /> Manage
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-1.5 text-xs">
              <Bot className="w-3.5 h-3.5" /> Agent Demo
            </TabsTrigger>
          </TabsList>

          <TabsContent value="buy" className="mt-4">
            <FundPurchaseWidget />
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
                These demos show how the AI agent pre-fills the widget based on user intent. 
                The widget auto-advances to the appropriate step — the user just reviews and confirms.
              </p>
            </div>

            {/* Demo 1: One-time purchase, full prefill → Review */}
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

            {/* Demo 2: SIP, full prefill → Review */}
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

            {/* Demo 3: Partial prefill — fund + mode only → Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">Partial Prefill</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"I want to buy SBI Small Cap"</em> — agent knows the fund, user picks mode & details
                </p>
              </div>
              <FundPurchaseWidget
                prefill={{
                  fundCode: 'SBI-SC-G',
                }}
              />
            </div>

            {/* Demo 4: One-time with partial → Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className="text-[10px]">Partial Prefill</Badge>
                <p className="text-xs text-muted-foreground">
                  User: <em>"Put ₹25,000 one-time in HDFC Large Cap"</em> — needs bank selection
                </p>
              </div>
              <FundPurchaseWidget
                prefill={{
                  fundCode: 'HDFC-LCF-G',
                  amount: 25000,
                  mode: 'onetime',
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SIPManagement;
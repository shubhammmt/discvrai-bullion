import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateSIPWidget } from '@/components/sip/CreateSIPWidget';
import { ManageSIPWidget } from '@/components/sip/ManageSIPWidget';
import { Plus, Settings, Bot } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const SIPManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">SIP Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage your Systematic Investment Plans</p>
        </div>

        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="create" className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Create SIP
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1.5">
              <Settings className="w-4 h-4" /> Manage SIPs
            </TabsTrigger>
            <TabsTrigger value="demo" className="flex items-center gap-1.5">
              <Bot className="w-4 h-4" /> Agent Demo
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="mt-4">
            <CreateSIPWidget />
          </TabsContent>
          <TabsContent value="manage" className="mt-4">
            <ManageSIPWidget />
          </TabsContent>
          <TabsContent value="demo" className="mt-4 space-y-6">
            {/* Demo: Agent prefilled with full details → Review step */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">Agent Scenario 1</Badge>
                <p className="text-xs text-muted-foreground">User says: <em>"Start a ₹10,000 monthly SIP in Axis Bluechip"</em></p>
              </div>
              <CreateSIPWidget
                prefill={{
                  fundCode: 'AXIS-BLU-G',
                  amount: 10000,
                  frequency: 'monthly',
                  bankMandate: 'HDFC Bank ****4521',
                  goalTag: 'Wealth Creation',
                  stepUpPercent: 10,
                }}
              />
            </div>

            {/* Demo: Agent prefilled with fund only → Details step */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">Agent Scenario 2</Badge>
                <p className="text-xs text-muted-foreground">User says: <em>"I want to invest in SBI Small Cap"</em></p>
              </div>
              <CreateSIPWidget
                prefill={{
                  fundCode: 'SBI-SC-G',
                  amount: 5000,
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

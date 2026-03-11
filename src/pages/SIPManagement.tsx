import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreateSIPWidget } from '@/components/sip/CreateSIPWidget';
import { ManageSIPWidget } from '@/components/sip/ManageSIPWidget';
import { Plus, Settings } from 'lucide-react';

const SIPManagement = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">SIP Management</h1>
          <p className="text-sm text-muted-foreground mt-1">Create and manage your Systematic Investment Plans</p>
        </div>

        <Tabs defaultValue="manage" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create" className="flex items-center gap-1.5">
              <Plus className="w-4 h-4" /> Create SIP
            </TabsTrigger>
            <TabsTrigger value="manage" className="flex items-center gap-1.5">
              <Settings className="w-4 h-4" /> Manage SIPs
            </TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="mt-4">
            <CreateSIPWidget />
          </TabsContent>
          <TabsContent value="manage" className="mt-4">
            <ManageSIPWidget />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SIPManagement;

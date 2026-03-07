import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CeoTab } from '@/components/adf-strategic/CeoTab';
import { CfoTab } from '@/components/adf-strategic/CfoTab';
import { CooTab } from '@/components/adf-strategic/CooTab';
import { PfGrowthTab } from '@/components/adf-strategic/PfGrowthTab';
import { SalesmanTab } from '@/components/adf-strategic/SalesmanTab';
import { lastUpdated } from '@/data/adfStrategicData';
import { BarChart3, DollarSign, Settings, TrendingUp, Users } from 'lucide-react';

const AdfStrategicDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ADF</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 leading-tight">ADF Foods — Strategic Dashboard</h1>
                <p className="text-[10px] text-gray-500 leading-tight">CEO / CFO / COO Analytics (USD)</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="ceo" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="ceo" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <BarChart3 className="w-3.5 h-3.5" />
              CEO — Strategic Overview
            </TabsTrigger>
            <TabsTrigger value="cfo" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <DollarSign className="w-3.5 h-3.5" />
              CFO — Financial
            </TabsTrigger>
            <TabsTrigger value="coo" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Settings className="w-3.5 h-3.5" />
              COO — Operations
            </TabsTrigger>
            <TabsTrigger value="pfgrowth" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <TrendingUp className="w-3.5 h-3.5" />
              Product Family Growth
            </TabsTrigger>
            <TabsTrigger value="salesman" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Users className="w-3.5 h-3.5" />
              Salesman Performance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ceo"><CeoTab /></TabsContent>
          <TabsContent value="cfo"><CfoTab /></TabsContent>
          <TabsContent value="coo"><CooTab /></TabsContent>
          <TabsContent value="pfgrowth"><PfGrowthTab /></TabsContent>
          <TabsContent value="salesman"><SalesmanTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdfStrategicDashboard;

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CeoTab } from '@/components/adf-strategic/CeoTab';
import { CfoTab } from '@/components/adf-strategic/CfoTab';
import { CooTab } from '@/components/adf-strategic/CooTab';
import { PfGrowthTab } from '@/components/adf-strategic/PfGrowthTab';
import { SalesmanTab } from '@/components/adf-strategic/SalesmanTab';
import { StrategicActionPlanTab } from '@/components/adf-strategic/StrategicActionPlanTab';
import { BrandCategoryTab } from '@/components/adf-strategic/BrandCategoryTab';
import { SkuGrowthTrackerTab } from '@/components/adf-strategic/SkuGrowthTrackerTab';
import { PfByRegionTab } from '@/components/adf-strategic/PfByRegionTab';
import { PfBySalesmanTab } from '@/components/adf-strategic/PfBySalesmanTab';
import { lastUpdated } from '@/data/adfStrategicData';
import { BarChart3, DollarSign, Settings, TrendingUp, Users, ClipboardList, Grid3X3, Package, Map, UserCheck } from 'lucide-react';

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
            <TabsTrigger value="ceo" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <BarChart3 className="w-3 h-3" />
              CEO
            </TabsTrigger>
            <TabsTrigger value="cfo" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <DollarSign className="w-3 h-3" />
              CFO
            </TabsTrigger>
            <TabsTrigger value="coo" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Settings className="w-3 h-3" />
              COO
            </TabsTrigger>
            <TabsTrigger value="pfgrowth" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <TrendingUp className="w-3 h-3" />
              PF Growth
            </TabsTrigger>
            <TabsTrigger value="salesman" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Users className="w-3 h-3" />
              Salesman
            </TabsTrigger>
            <TabsTrigger value="actionplan" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <ClipboardList className="w-3 h-3" />
              Action Plan
            </TabsTrigger>
            <TabsTrigger value="brandcat" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Grid3X3 className="w-3 h-3" />
              Brand × Category
            </TabsTrigger>
            <TabsTrigger value="skugrowth" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Package className="w-3 h-3" />
              SKU Tracker
            </TabsTrigger>
            <TabsTrigger value="pfregion" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Map className="w-3 h-3" />
              PF × Region
            </TabsTrigger>
            <TabsTrigger value="pfsalesman" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <UserCheck className="w-3 h-3" />
              PF × Salesman
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ceo"><CeoTab /></TabsContent>
          <TabsContent value="cfo"><CfoTab /></TabsContent>
          <TabsContent value="coo"><CooTab /></TabsContent>
          <TabsContent value="pfgrowth"><PfGrowthTab /></TabsContent>
          <TabsContent value="salesman"><SalesmanTab /></TabsContent>
          <TabsContent value="actionplan"><StrategicActionPlanTab /></TabsContent>
          <TabsContent value="brandcat"><BrandCategoryTab /></TabsContent>
          <TabsContent value="skugrowth"><SkuGrowthTrackerTab /></TabsContent>
          <TabsContent value="pfregion"><PfByRegionTab /></TabsContent>
          <TabsContent value="pfsalesman"><PfBySalesmanTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdfStrategicDashboard;

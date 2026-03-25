import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { CeoExecutiveSummaryTab } from '@/components/adf-ceo-sales/CeoExecutiveSummaryTab';
import { ProfitabilityTab } from '@/components/adf-ceo-sales/ProfitabilityTab';
import { VolValuePriceTab } from '@/components/adf-ceo-sales/VolValuePriceTab';
import { SalesDashboardTab } from '@/components/adf-ceo-sales/SalesDashboardTab';
import { Top10TailTab } from '@/components/adf-ceo-sales/Top10TailTab';
import { GrowthAnalysisTab } from '@/components/adf-ceo-sales/GrowthAnalysisTab';
import { lastUpdated } from '@/data/adfCeoSalesData';
import { BarChart3, DollarSign, Scale, ShoppingCart, Trophy, TrendingUp } from 'lucide-react';

const AdfCeoSalesDashboard: React.FC = () => {
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
                <h1 className="text-sm font-bold text-gray-900 leading-tight">ADF Foods — CEO Sales Dashboard</h1>
                <p className="text-[10px] text-gray-500 leading-tight">9M FY26 | All values in ₹ Lakhs (INR)</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="summary" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <BarChart3 className="w-3 h-3" /> CEO Summary
            </TabsTrigger>
            <TabsTrigger value="profitability" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <DollarSign className="w-3 h-3" /> Profitability
            </TabsTrigger>
            <TabsTrigger value="volvalue" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Scale className="w-3 h-3" /> Vol vs Value
            </TabsTrigger>
            <TabsTrigger value="sales" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <ShoppingCart className="w-3 h-3" /> Sales Dashboard
            </TabsTrigger>
            <TabsTrigger value="top10" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Trophy className="w-3 h-3" /> Top 10 & Tail
            </TabsTrigger>
            <TabsTrigger value="growth" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <TrendingUp className="w-3 h-3" /> Growth Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary"><CeoExecutiveSummaryTab /></TabsContent>
          <TabsContent value="profitability"><ProfitabilityTab /></TabsContent>
          <TabsContent value="volvalue"><VolValuePriceTab /></TabsContent>
          <TabsContent value="sales"><SalesDashboardTab /></TabsContent>
          <TabsContent value="top10"><Top10TailTab /></TabsContent>
          <TabsContent value="growth"><GrowthAnalysisTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdfCeoSalesDashboard;

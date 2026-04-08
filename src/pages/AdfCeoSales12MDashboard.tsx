import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExecutiveSummaryTab } from '@/components/adf-ceo-sales-12m/ExecutiveSummaryTab';
import { ProfitabilityTab } from '@/components/adf-ceo-sales-12m/ProfitabilityTab';
import { VolValueTab } from '@/components/adf-ceo-sales-12m/VolValueTab';
import { SalesDashboardTab } from '@/components/adf-ceo-sales-12m/SalesDashboardTab';
import { Top10TailTab } from '@/components/adf-ceo-sales-12m/Top10TailTab';
import { GrowthAnalysisTab } from '@/components/adf-ceo-sales-12m/GrowthAnalysisTab';
import { Profitability12MTab } from '@/components/adf-ceo-sales-12m/Profitability12MTab';
import { lastUpdated } from '@/data/adfCeoSales12MData';
import { BarChart3, DollarSign, Scale, ShoppingCart, Trophy, TrendingUp, PieChart, Users } from 'lucide-react';

type Persona = 'management' | 'finance' | 'sales';

const AdfCeoSales12MDashboard: React.FC = () => {
  const [persona, setPersona] = useState<Persona>('management');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ADF</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 leading-tight">ADF Foods — CEO Sales Dashboard</h1>
                <p className="text-[10px] text-gray-500 leading-tight">12M FY2025-26 | All Values in ₹ Lakhs</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {/* Persona Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-0.5 gap-0.5">
                {(['management', 'finance', 'sales'] as Persona[]).map(p => (
                  <button
                    key={p}
                    onClick={() => setPersona(p)}
                    className={`text-[10px] px-3 py-1.5 rounded-md font-semibold capitalize transition-all ${
                      persona === p ? 'bg-indigo-700 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Users className="w-3 h-3 inline mr-1" />{p}
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-400">
                {new Date(lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="summary" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="summary" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <BarChart3 className="w-3 h-3" /> CEO Summary
            </TabsTrigger>
            <TabsTrigger value="profitability" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <DollarSign className="w-3 h-3" /> Profitability
            </TabsTrigger>
            <TabsTrigger value="volvalue" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Scale className="w-3 h-3" /> Vol vs Value
            </TabsTrigger>
            <TabsTrigger value="sales" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <ShoppingCart className="w-3 h-3" /> Sales Dashboard
            </TabsTrigger>
            <TabsTrigger value="top10" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <Trophy className="w-3 h-3" /> Top 10 & Tail
            </TabsTrigger>
            <TabsTrigger value="growth" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <TrendingUp className="w-3 h-3" /> Growth Analysis
            </TabsTrigger>
            <TabsTrigger value="margin12m" className="gap-1.5 data-[state=active]:bg-indigo-700 data-[state=active]:text-white rounded-lg text-[10px] px-2.5 py-1.5">
              <PieChart className="w-3 h-3" /> 12M Profitability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summary"><ExecutiveSummaryTab /></TabsContent>
          <TabsContent value="profitability"><ProfitabilityTab /></TabsContent>
          <TabsContent value="volvalue"><VolValueTab /></TabsContent>
          <TabsContent value="sales"><SalesDashboardTab /></TabsContent>
          <TabsContent value="top10"><Top10TailTab /></TabsContent>
          <TabsContent value="growth"><GrowthAnalysisTab /></TabsContent>
          <TabsContent value="margin12m"><Profitability12MTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdfCeoSales12MDashboard;

import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ExecutiveSummary } from '@/components/adf-mis/ExecutiveSummary';
import { RegionPerformance } from '@/components/adf-mis/RegionPerformance';
import { CountryPerformance } from '@/components/adf-mis/CountryPerformance';
import { AtRiskCustomers } from '@/components/adf-mis/AtRiskCustomers';
import { CategoryPerformance } from '@/components/adf-mis/CategoryPerformance';
import { ProductFamilyPerformance } from '@/components/adf-mis/ProductFamilyPerformance';
import { SkuProductionView } from '@/components/adf-mis/SkuProductionView';
import { SalesView } from '@/components/adf-mis/SalesView';
import { FinanceView } from '@/components/adf-mis/FinanceView';
import { BarChart3, Users, PieChart, UserCheck, Database, Package, Globe, Flag, Boxes } from 'lucide-react';
import { lastUpdated } from '@/data/adfMisData';

const AdfMisDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ADF</span>
              </div>
              <div>
                <h1 className="text-sm font-bold text-gray-900 leading-tight">ADF Sales MIS</h1>
                <p className="text-[10px] text-gray-500 leading-tight">Export Analytics Dashboard — 112 Customers</p>
              </div>
            </div>
            <div className="text-xs text-gray-400">
              Last updated: {new Date(lastUpdated).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs defaultValue="executive" className="space-y-6">
          <TabsList className="bg-white border border-gray-200 shadow-sm p-1 rounded-xl h-auto flex-wrap">
            <TabsTrigger value="executive" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <BarChart3 className="w-3.5 h-3.5" />
              Executive Summary
            </TabsTrigger>
            <TabsTrigger value="region" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Globe className="w-3.5 h-3.5" />
              Region
            </TabsTrigger>
            <TabsTrigger value="country" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Flag className="w-3.5 h-3.5" />
              Country
            </TabsTrigger>
            <TabsTrigger value="atrisk" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Users className="w-3.5 h-3.5" />
              At-Risk Customers
            </TabsTrigger>
            <TabsTrigger value="category" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <PieChart className="w-3.5 h-3.5" />
              Category
            </TabsTrigger>
            <TabsTrigger value="productfamily" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Boxes className="w-3.5 h-3.5" />
              Product Family
            </TabsTrigger>
            <TabsTrigger value="sku" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Package className="w-3.5 h-3.5" />
              SKU & Production
            </TabsTrigger>
            <TabsTrigger value="sales" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <UserCheck className="w-3.5 h-3.5" />
              Sales — My Performance
            </TabsTrigger>
            <TabsTrigger value="finance" className="gap-1.5 data-[state=active]:bg-gray-900 data-[state=active]:text-white rounded-lg text-xs px-3 py-2">
              <Database className="w-3.5 h-3.5" />
              Finance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="executive"><ExecutiveSummary /></TabsContent>
          <TabsContent value="region"><RegionPerformance /></TabsContent>
          <TabsContent value="country"><CountryPerformance /></TabsContent>
          <TabsContent value="atrisk"><AtRiskCustomers /></TabsContent>
          <TabsContent value="category"><CategoryPerformance /></TabsContent>
          <TabsContent value="productfamily"><ProductFamilyPerformance /></TabsContent>
          <TabsContent value="sku"><SkuProductionView /></TabsContent>
          <TabsContent value="sales"><SalesView /></TabsContent>
          <TabsContent value="finance"><FinanceView /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdfMisDashboard;

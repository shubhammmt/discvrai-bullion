import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DataHealthDashboard from '@/components/cms-data-lake/DataHealthDashboard';
import ATMSearchBar from '@/components/cms-data-lake/ATMSearchBar';
import ATMFleetTable from '@/components/cms-data-lake/ATMFleetTable';
import ATMProfileCard from '@/components/cms-data-lake/ATMProfileCard';
import MachineLedgerTimeline from '@/components/cms-data-lake/MachineLedgerTimeline';
import DigitalEvidenceVault from '@/components/cms-data-lake/DigitalEvidenceVault';
import IntelligencePanel from '@/components/cms-data-lake/IntelligencePanel';
import EJLogsTable from '@/components/cms-data-lake/EJLogsTable';
import CashOpsTable from '@/components/cms-data-lake/CashOpsTable';
import { Database, BarChart3, Search, Shield, FileText, Banknote, Brain } from 'lucide-react';

const CMSDataLake = () => {
  const [selectedATM, setSelectedATM] = useState('ATM-MUM-0001');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold text-sm flex items-center gap-1.5">
              <Database className="h-4 w-4" /> DATA LAKE
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Unified ATM Data Lake</h1>
              <p className="text-[10px] text-slate-500">70,000 ATMs · Real-time Ingestion · Machine Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ATMSearchBar onSelect={setSelectedATM} selectedId={selectedATM} />
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span className="text-[10px] text-slate-500">Audit-Ready</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-5">
        <Tabs defaultValue="health" className="w-full">
          <TabsList className="w-full grid grid-cols-6 mb-5 h-11">
            <TabsTrigger value="health" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <BarChart3 className="h-3.5 w-3.5" /> Data Health
            </TabsTrigger>
            <TabsTrigger value="fleet" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Search className="h-3.5 w-3.5" /> Fleet View
            </TabsTrigger>
            <TabsTrigger value="ledger" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-3.5 w-3.5" /> Machine Ledger
            </TabsTrigger>
            <TabsTrigger value="ej" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <FileText className="h-3.5 w-3.5" /> EJ & Logs
            </TabsTrigger>
            <TabsTrigger value="cash" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Banknote className="h-3.5 w-3.5" /> Cash Ops
            </TabsTrigger>
            <TabsTrigger value="intelligence" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Brain className="h-3.5 w-3.5" /> Intelligence
            </TabsTrigger>
          </TabsList>

          <TabsContent value="health">
            <DataHealthDashboard />
          </TabsContent>

          <TabsContent value="fleet">
            <ATMFleetTable onSelect={setSelectedATM} selectedId={selectedATM} />
          </TabsContent>

          <TabsContent value="ledger">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <MachineLedgerTimeline terminalId={selectedATM} />
              </div>
              <div className="space-y-4">
                <ATMProfileCard terminalId={selectedATM} />
                <DigitalEvidenceVault terminalId={selectedATM} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ej">
            <EJLogsTable terminalId={selectedATM} />
          </TabsContent>

          <TabsContent value="cash">
            <CashOpsTable terminalId={selectedATM} />
          </TabsContent>

          <TabsContent value="intelligence">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <IntelligencePanel terminalId={selectedATM} />
              </div>
              <div className="space-y-4">
                <ATMProfileCard terminalId={selectedATM} />
                <DigitalEvidenceVault terminalId={selectedATM} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CMSDataLake;

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import DataHealthDashboardV2 from '@/components/cms-data-lake/DataHealthDashboardV2';
import ATMSearchBar from '@/components/cms-data-lake/ATMSearchBar';
import ATMFleetTable from '@/components/cms-data-lake/ATMFleetTable';
import ATMProfileCard from '@/components/cms-data-lake/ATMProfileCard';
import MasterTimeline from '@/components/cms-data-lake/MasterTimeline';
import EvidenceGallery from '@/components/cms-data-lake/EvidenceGallery';
import PenaltyTracker from '@/components/cms-data-lake/PenaltyTracker';
import DataGapAnalysis from '@/components/cms-data-lake/DataGapAnalysis';
import GlobalFilters from '@/components/cms-data-lake/GlobalFilters';
import { Database, BarChart3, Search, Shield, ArrowLeft } from 'lucide-react';

const CMSDataLake = () => {
  const [selectedATM, setSelectedATM] = useState<string | null>(null);
  const [deepDive, setDeepDive] = useState(false);
  const [filters, setFilters] = useState({
    bank: 'All',
    region: 'All',
    problemType: 'All',
    replenishmentPath: 'All',
  });

  const handleSelectATM = (id: string) => {
    setSelectedATM(id);
    setDeepDive(true);
  };

  const handleBackToFleet = () => {
    setDeepDive(false);
  };

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
            <ATMSearchBar onSelect={handleSelectATM} selectedId={selectedATM || undefined} />
            <div className="flex items-center gap-1.5">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span className="text-[10px] text-slate-500">Audit-Ready</span>
            </div>
          </div>
        </div>
      </header>

      {/* Global Filters */}
      <GlobalFilters filters={filters} onChange={setFilters} />

      <main className="max-w-[1400px] mx-auto px-4 py-5">
        {deepDive && selectedATM ? (
          /* ═══ MACHINE DEEP DIVE ═══ */
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToFleet}
              className="mb-4 text-xs text-slate-600 hover:text-slate-900 gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Fleet View
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Left: Master Timeline */}
              <div className="lg:col-span-2 space-y-4">
                <MasterTimeline terminalId={selectedATM} />
              </div>

              {/* Right: Intelligence + Profile + Evidence + Gaps */}
              <div className="space-y-4">
                <ATMProfileCard terminalId={selectedATM} />
                <PenaltyTracker terminalId={selectedATM} />
                <DataGapAnalysis terminalId={selectedATM} />
                <EvidenceGallery terminalId={selectedATM} />
              </div>
            </div>
          </div>
        ) : (
          /* ═══ FLEET MODE ═══ */
          <Tabs defaultValue="health" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-5 h-11">
              <TabsTrigger value="health" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <BarChart3 className="h-3.5 w-3.5" /> Data Health
              </TabsTrigger>
              <TabsTrigger value="fleet" className="text-xs gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                <Search className="h-3.5 w-3.5" /> Fleet View
              </TabsTrigger>
            </TabsList>

            <TabsContent value="health">
              <DataHealthDashboardV2 />
            </TabsContent>

            <TabsContent value="fleet">
              <ATMFleetTable onSelect={handleSelectATM} selectedId={selectedATM || undefined} />
            </TabsContent>
          </Tabs>
        )}
      </main>
    </div>
  );
};

export default CMSDataLake;

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CMSMetricsStrip from '@/components/cms-demo/CMSMetricsStrip';
import CMSDataSources from '@/components/cms-demo/CMSDataSources';
import CMSMatchingView from '@/components/cms-demo/CMSMatchingView';
import CMSExceptions from '@/components/cms-demo/CMSExceptions';
import CMSAuditTrail from '@/components/cms-demo/CMSAuditTrail';
import CMSOrderBook from '@/components/cms-demo/CMSOrderBook';
import CMSRouteDispatch from '@/components/cms-demo/CMSRouteDispatch';
import { Link2, Server, Truck, Shield } from 'lucide-react';

const CMSDemo = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-slate-900 text-white px-3 py-1.5 rounded-lg font-bold text-sm">CMS</div>
            <div>
              <h1 className="text-sm font-bold text-slate-900">Agentic Intelligence Platform</h1>
              <p className="text-[10px] text-slate-500">Margin Leakage Recovery · Decision Intelligence · Agentic Route & Dispatch</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-600" />
            <span className="text-[10px] text-slate-500">Audit-ready · RBI compliant</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Opening Problem Statement */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 rounded-xl p-6 mb-6 text-white">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">The Intelligence Gap</p>
          <p className="text-sm leading-relaxed mb-3">
            CMS runs India's largest cash-logistics network — <span className="font-bold">153,000+ touchpoints</span>, thousands of vehicles, and a growing Managed Services order book. 
            Today, reconciliation is <span className="text-amber-300 font-semibold">manual-intensive</span>, order-book execution is <span className="text-amber-300 font-semibold">bottlenecked</span>, 
            and routing is <span className="text-amber-300 font-semibold">static</span> — so provisions stay high, revenue is stuck, and fuel/SLA suffer.
          </p>
          <p className="text-xs text-blue-200">
            Three agentic use cases mapping to the three pillars shared with Rajiv Kaul: Margin Leakage Recovery, Decision Intelligence, and Agentic Route & Dispatch Logic.
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="reconciliation" className="w-full">
          <TabsList className="w-full grid grid-cols-3 mb-6 h-12">
            <TabsTrigger value="reconciliation" className="text-xs sm:text-sm gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Link2 className="h-4 w-4" />
              <span className="hidden sm:inline">1.</span> Reconciliation
            </TabsTrigger>
            <TabsTrigger value="orderbook" className="text-xs sm:text-sm gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">2.</span> Order Book
            </TabsTrigger>
            <TabsTrigger value="dispatch" className="text-xs sm:text-sm gap-1 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Truck className="h-4 w-4" />
              <span className="hidden sm:inline">3.</span> Route & Dispatch
            </TabsTrigger>
          </TabsList>

          {/* Use Case 1: Reconciliation */}
          <TabsContent value="reconciliation" className="space-y-4">
            {/* Problem Statement */}
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">Problem Statement — Margin Leakage Recovery + Decision Intelligence</p>
              <p className="text-sm leading-relaxed">
                Reconciliation across bank, ERP, and cash is manual and slow; exceptions pile up; <span className="font-bold text-amber-300">₹80–90 Cr provisions</span> and weak audit trail. 
                <span className="text-blue-200"> We solve: agent syncs data, proposes matches and resolutions; you only approve.</span>
              </p>
            </div>

            {/* Metrics */}
            <CMSMetricsStrip />

            {/* Data Sources */}
            <CMSDataSources />

            {/* Matching View */}
            <CMSMatchingView />

            {/* Exceptions + Audit in 2-col */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CMSExceptions />
              <CMSAuditTrail />
            </div>
          </TabsContent>

          {/* Use Case 2: Order Book */}
          <TabsContent value="orderbook">
            <CMSOrderBook />
          </TabsContent>

          {/* Use Case 3: Route & Dispatch */}
          <TabsContent value="dispatch">
            <CMSRouteDispatch />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CMSDemo;

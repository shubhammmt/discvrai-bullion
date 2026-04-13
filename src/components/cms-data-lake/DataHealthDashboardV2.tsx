import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dataHealthMetrics } from '@/data/cmsDataLake';
import { Activity, CheckCircle2, AlertTriangle, Database } from 'lucide-react';
import InfoTooltip from './InfoTooltip';

const tooltips: Record<string, string> = {
  'EOD Reports Filed': 'End-of-Day physical verification reports filed by field agents for cash reconciliation.',
  'MSP Logs Available': 'Machine State & Performance logs from ATM monitoring software — used for connectivity and health tracking.',
  'Identity Data Complete': 'Terminal ID, Bank, Region, Hub, and ATM Type are fully mapped in the profile database.',
};

const DataHealthDashboardV2 = () => {
  const avgHealth = Math.round(dataHealthMetrics.reduce((s, m) => s + m.pct, 0) / dataHealthMetrics.length * 10) / 10;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
              <Database className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                Total ATMs
                <InfoTooltip text="Total ATMs under CMS management across all banks and regions." />
              </p>
              <p className="text-xl font-bold text-slate-900">70,000</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                Avg Completeness
                <InfoTooltip text="Average data completeness across all ATMs — combining EOD, MSP, and Identity data sync rates." />
              </p>
              <p className="text-xl font-bold text-emerald-700">{avgHealth}%</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                Data Gaps
                <InfoTooltip text="ATMs missing one or more critical data sources today — creating blind spots for reconciliation." />
              </p>
              <p className="text-xl font-bold text-amber-700">3,780</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-slate-200">
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Activity className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-slate-500 uppercase tracking-wider font-medium">
                Last Sync
                <InfoTooltip text="Time since last batch data ingestion from all ATM telemetry sources." />
              </p>
              <p className="text-sm font-bold text-slate-900">2 min ago</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold text-slate-800">Data Completeness by Source</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {dataHealthMetrics.map((m) => (
            <div key={m.label}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-slate-700">
                  {m.label}
                  <InfoTooltip text={tooltips[m.label] || m.label} />
                </span>
                <span className="text-xs font-bold text-slate-900">{m.value.toLocaleString('en-IN')} / {m.total.toLocaleString('en-IN')} ({m.pct}%)</span>
              </div>
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${m.pct >= 95 ? 'bg-emerald-500' : m.pct >= 90 ? 'bg-blue-500' : m.pct >= 85 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${m.pct}%` }}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataHealthDashboardV2;

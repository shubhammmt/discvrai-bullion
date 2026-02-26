import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { fleetEntries } from '@/data/cmsDemo';
import { Truck, Eye, CheckCircle2, Wrench, RotateCcw, MapPin, Clock, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  'On Route': { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <MapPin className="h-3 w-3" /> },
  'Idle': { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: <Clock className="h-3 w-3" /> },
  'Maintenance': { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Wrench className="h-3 w-3" /> },
  'Delayed': { color: 'bg-red-100 text-red-700 border-red-200', icon: <AlertTriangle className="h-3 w-3" /> },
};

const CMSRouteDispatch = () => {
  return (
    <div className="space-y-4">
      {/* Problem Statement Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">Problem Statement</p>
        <p className="text-sm leading-relaxed">
          Fleet and dispatch are <span className="font-bold text-amber-300">static and manual</span>; fuel and SLA risk; wage pressure; need to decouple growth from headcount. 
          <span className="text-emerald-200"> We solve: agent reasons over telemetry and ERP — re-routes, maintenance flags, route optimization; you approve actions.</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-slate-200">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-slate-900">6</p>
            <p className="text-xs text-slate-500">Active Runs</p>
          </CardContent>
        </Card>
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-emerald-700">3</p>
            <p className="text-xs text-emerald-600">Agent Optimized</p>
          </CardContent>
        </Card>
        <Card className="border border-amber-200 bg-amber-50">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-amber-700">1</p>
            <p className="text-xs text-amber-600">Maintenance Alert</p>
          </CardContent>
        </Card>
        <Card className="border border-red-200 bg-red-50">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-red-700">1</p>
            <p className="text-xs text-red-600">SLA at Risk</p>
          </CardContent>
        </Card>
      </div>

      {/* Fleet Table */}
      <Card className="border border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Truck className="h-4 w-4 text-emerald-600" /> Route & Dispatch — Agent Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-xs font-semibold">Run / Vehicle</TableHead>
                  <TableHead className="text-xs font-semibold">Cluster / Route</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Last Activity</TableHead>
                  <TableHead className="text-xs font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fleetEntries.map(entry => {
                  const sc = statusConfig[entry.status];
                  return (
                    <TableRow key={entry.id} className="text-xs">
                      <TableCell className="py-3">
                        <div>
                          <span className="font-semibold text-slate-800">{entry.runId}</span>
                          <span className="text-slate-400 ml-1">/ {entry.vehicle}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-3 text-slate-600">{entry.cluster}</TableCell>
                      <TableCell className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.color}`}>
                          {sc.icon} {entry.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-slate-600 max-w-[280px]">
                        <div>
                          <p>{entry.lastActivity}</p>
                          {entry.savings && (
                            <Badge className="mt-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px]">{entry.savings}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex gap-1">
                          {entry.agentAction === 'Schedule maintenance' && (
                            <Button size="sm" className="h-6 text-[10px] px-2 bg-amber-600 hover:bg-amber-700" onClick={() => toast.success(`Maintenance scheduled for ${entry.vehicle}`)}>
                              <Wrench className="h-3 w-3 mr-0.5" /> Schedule
                            </Button>
                          )}
                          {entry.agentAction === 'Re-dispatch nearby asset' && (
                            <Button size="sm" className="h-6 text-[10px] px-2 bg-red-600 hover:bg-red-700" onClick={() => toast.success(`Re-dispatch approved for ${entry.cluster}`)}>
                              <RotateCcw className="h-3 w-3 mr-0.5" /> Re-dispatch
                            </Button>
                          )}
                          {(entry.agentAction === 'Re-route approved' || entry.agentAction === 'Route optimized' || entry.agentAction === 'Workload balanced') && (
                            <Button size="sm" className="h-6 text-[10px] px-2 bg-emerald-600 hover:bg-emerald-700" onClick={() => toast.success(`Action confirmed: ${entry.agentAction}`)}>
                              <CheckCircle2 className="h-3 w-3 mr-0.5" /> Approve
                            </Button>
                          )}
                          <Button size="sm" variant="outline" className="h-6 text-[10px] px-2" onClick={() => toast.info(`Viewing details for ${entry.runId}`)}>
                            <Eye className="h-3 w-3 mr-0.5" /> View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CMSRouteDispatch;

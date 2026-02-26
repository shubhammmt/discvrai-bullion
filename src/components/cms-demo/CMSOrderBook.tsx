import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { orderBookEntries } from '@/data/cmsDemo';
import { Server, Eye, Wrench, CheckCircle2, Clock, AlertTriangle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const statusConfig: Record<string, { color: string; icon: React.ReactNode }> = {
  Pending: { color: 'bg-slate-100 text-slate-600 border-slate-200', icon: <Clock className="h-3 w-3" /> },
  Testing: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: <Loader2 className="h-3 w-3 animate-spin" /> },
  Completed: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="h-3 w-3" /> },
  Failed: { color: 'bg-red-100 text-red-700 border-red-200', icon: <AlertTriangle className="h-3 w-3" /> },
};

const CMSOrderBook = () => {
  return (
    <div className="space-y-4">
      {/* Problem Statement Banner */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-5 text-white">
        <p className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-2">Problem Statement</p>
        <p className="text-sm leading-relaxed">
          Order book (₹600–1,500 Cr) is <span className="font-bold text-amber-300">~85% unexecuted</span> — bank integration and testing are slow and manual; revenue is stuck. 
          <span className="text-blue-200"> We solve: agent runs integration tests and surfaces only failures; you fix the exceptions — revenue lands faster.</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border border-slate-200">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-slate-900">5</p>
            <p className="text-xs text-slate-500">Banks in Pipeline</p>
          </CardContent>
        </Card>
        <Card className="border border-emerald-200 bg-emerald-50">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-emerald-700">1</p>
            <p className="text-xs text-emerald-600">Completed</p>
          </CardContent>
        </Card>
        <Card className="border border-blue-200 bg-blue-50">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-blue-700">2</p>
            <p className="text-xs text-blue-600">In Testing</p>
          </CardContent>
        </Card>
        <Card className="border border-amber-200 bg-amber-50">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-amber-700">7</p>
            <p className="text-xs text-amber-600">Total Failures</p>
          </CardContent>
        </Card>
      </div>

      {/* Status Table */}
      <Card className="border border-slate-200">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Server className="h-4 w-4 text-blue-600" /> Bank Onboarding — Agent Integration Status
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="rounded-lg border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  <TableHead className="text-xs font-semibold">Bank / Project</TableHead>
                  <TableHead className="text-xs font-semibold">Environment</TableHead>
                  <TableHead className="text-xs font-semibold">Status</TableHead>
                  <TableHead className="text-xs font-semibold">Last Activity</TableHead>
                  <TableHead className="text-xs font-semibold">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderBookEntries.map(entry => {
                  const sc = statusConfig[entry.status];
                  return (
                    <TableRow key={entry.id} className="text-xs">
                      <TableCell className="py-3 font-semibold text-slate-800">{entry.bank}</TableCell>
                      <TableCell className="py-3">
                        <Badge variant="outline" className="text-[10px]">{entry.environment}</Badge>
                      </TableCell>
                      <TableCell className="py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.color}`}>
                          {sc.icon} {entry.status}
                        </span>
                      </TableCell>
                      <TableCell className="py-3 text-slate-600 max-w-[250px]">
                        {entry.lastActivity}
                      </TableCell>
                      <TableCell className="py-3">
                        <div className="flex gap-1">
                          <Button size="sm" variant="outline" className="h-6 text-[10px] px-2" onClick={() => toast.info(`Viewing report for ${entry.bank}`)}>
                            <Eye className="h-3 w-3 mr-0.5" /> View
                          </Button>
                          {entry.failures > 0 && (
                            <Button size="sm" className="h-6 text-[10px] px-2 bg-amber-600 hover:bg-amber-700" onClick={() => toast.info(`Opening ${entry.failures} failure(s) for ${entry.bank}`)}>
                              <Wrench className="h-3 w-3 mr-0.5" /> Fix {entry.failures}
                            </Button>
                          )}
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

export default CMSOrderBook;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { matchGroups, formatINR } from '@/data/cmsDemo';
import { CheckCircle2, Clock, AlertTriangle, Link2 } from 'lucide-react';

const statusConfig = {
  'auto-matched': { label: 'Auto-matched', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="h-3 w-3" /> },
  'pending-review': { label: 'Pending Review', color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <Clock className="h-3 w-3" /> },
  'exception': { label: 'Exception', color: 'bg-red-100 text-red-700 border-red-200', icon: <AlertTriangle className="h-3 w-3" /> },
};

const confidenceColor = {
  High: 'text-emerald-600',
  Medium: 'text-amber-600',
  Low: 'text-red-600',
};

const CMSMatchingView = () => {
  return (
    <Card className="border border-slate-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-bold text-slate-800 flex items-center gap-2">
              <Link2 className="h-4 w-4 text-blue-600" /> Agent Match Groups
            </CardTitle>
            <p className="text-xs text-slate-500 mt-1">Reconciliation agent has processed all data sources</p>
          </div>
          <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs">
            {matchGroups.filter(m => m.status === 'auto-matched').length} auto-matched
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-xs font-semibold">Type</TableHead>
                <TableHead className="text-xs font-semibold">Bank Ref(s)</TableHead>
                <TableHead className="text-xs font-semibold">ERP Ref(s)</TableHead>
                <TableHead className="text-xs font-semibold text-right">Amount</TableHead>
                <TableHead className="text-xs font-semibold">Confidence</TableHead>
                <TableHead className="text-xs font-semibold">Reason</TableHead>
                <TableHead className="text-xs font-semibold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {matchGroups.map(mg => {
                const sc = statusConfig[mg.status];
                return (
                  <TableRow key={mg.id} className="text-xs">
                    <TableCell className="py-2">
                      <Badge variant="outline" className="text-[10px] capitalize">{mg.type.replace('-', ' → ')}</Badge>
                    </TableCell>
                    <TableCell className="py-2 font-mono text-xs">{mg.bankRefs.join(', ')}</TableCell>
                    <TableCell className="py-2 font-mono text-xs">{mg.erpRefs.join(', ')}</TableCell>
                    <TableCell className="py-2 text-right font-semibold">{formatINR(mg.amount)}</TableCell>
                    <TableCell className="py-2">
                      <span className={`font-bold ${confidenceColor[mg.confidence]}`}>{mg.confidence}</span>
                    </TableCell>
                    <TableCell className="py-2 text-slate-600 max-w-[200px] truncate" title={mg.reason}>{mg.reason}</TableCell>
                    <TableCell className="py-2">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${sc.color}`}>
                        {sc.icon} {sc.label}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CMSMatchingView;

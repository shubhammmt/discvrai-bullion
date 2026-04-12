import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { cashOperations, formatINR } from '@/data/cmsDataLake';

interface Props {
  terminalId?: string;
}

const indentStatusColor: Record<string, string> = {
  Completed: 'bg-emerald-100 text-emerald-700',
  LoadingNotDone: 'bg-red-100 text-red-700',
  'NO ACTIVITY': 'bg-slate-200 text-slate-600',
  Pending: 'bg-amber-100 text-amber-700',
};

const cllColor: Record<string, string> = {
  Uploaded: 'bg-emerald-100 text-emerald-700',
  Pending: 'bg-amber-100 text-amber-700',
  Failed: 'bg-red-100 text-red-700',
};

const CashOpsTable: React.FC<Props> = ({ terminalId }) => {
  const ops = terminalId ? cashOperations.filter(c => c.terminalId === terminalId) : cashOperations;

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-800">Cash Operations & Indents</CardTitle>
        <p className="text-[10px] text-slate-500">{ops.length} operations</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-[10px] font-bold">Indent #</TableHead>
                <TableHead className="text-[10px] font-bold">Terminal</TableHead>
                <TableHead className="text-[10px] font-bold text-right">Amount</TableHead>
                <TableHead className="text-[10px] font-bold">Type</TableHead>
                <TableHead className="text-[10px] font-bold">CIT Agent</TableHead>
                <TableHead className="text-[10px] font-bold">Indent Status</TableHead>
                <TableHead className="text-[10px] font-bold">CLL Upload</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ops.map(c => (
                <TableRow key={c.id} className="text-xs">
                  <TableCell className="py-2 font-mono font-bold">{c.indentNumber}</TableCell>
                  <TableCell className="py-2 font-mono text-slate-600">{c.terminalId}</TableCell>
                  <TableCell className="py-2 text-right font-semibold">{formatINR(c.indentAmount)}</TableCell>
                  <TableCell className="py-2"><Badge variant="outline" className="text-[10px]">{c.revisionType}</Badge></TableCell>
                  <TableCell className="py-2">{c.citAgent}</TableCell>
                  <TableCell className="py-2"><Badge className={`text-[10px] ${indentStatusColor[c.indentStatus] || ''}`}>{c.indentStatus}</Badge></TableCell>
                  <TableCell className="py-2"><Badge className={`text-[10px] ${cllColor[c.cllUpload] || ''}`}>{c.cllUpload}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CashOpsTable;

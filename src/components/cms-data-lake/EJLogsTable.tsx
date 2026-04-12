import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ejLogs } from '@/data/cmsDataLake';

interface Props {
  terminalId?: string;
}

const statusColor: Record<string, string> = {
  Success: 'bg-emerald-100 text-emerald-700',
  Failed: 'bg-red-100 text-red-700',
  Reversed: 'bg-amber-100 text-amber-700',
  Disputed: 'bg-purple-100 text-purple-700',
};

const EJLogsTable: React.FC<Props> = ({ terminalId }) => {
  const logs = terminalId ? ejLogs.filter(e => e.terminalId === terminalId) : ejLogs;

  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-800">EJ & Transaction Logs</CardTitle>
        <p className="text-[10px] text-slate-500">{terminalId ? `Filtered: ${terminalId}` : 'All ATMs'} · {logs.length} entries</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-[10px] font-bold">Ticket ID</TableHead>
                <TableHead className="text-[10px] font-bold">Terminal</TableHead>
                <TableHead className="text-[10px] font-bold">Timestamp</TableHead>
                <TableHead className="text-[10px] font-bold">Type</TableHead>
                <TableHead className="text-[10px] font-bold">Error</TableHead>
                <TableHead className="text-[10px] font-bold text-right">Amount</TableHead>
                <TableHead className="text-[10px] font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map(e => (
                <TableRow key={e.id} className="text-xs">
                  <TableCell className="py-2 font-mono font-bold">{e.ticketId}</TableCell>
                  <TableCell className="py-2 font-mono text-slate-600">{e.terminalId}</TableCell>
                  <TableCell className="py-2 text-slate-500">{e.timestamp}</TableCell>
                  <TableCell className="py-2"><Badge variant="outline" className="text-[10px]">{e.type}</Badge></TableCell>
                  <TableCell className="py-2 text-[10px] text-slate-600 max-w-[200px] truncate">{e.errorCode ? `${e.errorCode}: ${e.errorDesc}` : e.errorDesc || '—'}</TableCell>
                  <TableCell className="py-2 text-right font-semibold">{e.amount ? `₹${e.amount.toLocaleString('en-IN')}` : '—'}</TableCell>
                  <TableCell className="py-2"><Badge className={`text-[10px] ${statusColor[e.status] || ''}`}>{e.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default EJLogsTable;

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { atmProfiles, getStatusColor } from '@/data/cmsDataLake';

interface Props {
  onSelect: (id: string) => void;
  selectedId?: string;
}

const ATMFleetTable: React.FC<Props> = ({ onSelect, selectedId }) => {
  return (
    <Card className="border-slate-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-bold text-slate-800">ATM Fleet Overview</CardTitle>
        <p className="text-[10px] text-slate-500">Click a row to view full machine profile</p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50">
                <TableHead className="text-[10px] font-bold">Terminal ID</TableHead>
                <TableHead className="text-[10px] font-bold">Bank</TableHead>
                <TableHead className="text-[10px] font-bold">Hub</TableHead>
                <TableHead className="text-[10px] font-bold">State</TableHead>
                <TableHead className="text-[10px] font-bold">Type</TableHead>
                <TableHead className="text-[10px] font-bold">Status</TableHead>
                <TableHead className="text-[10px] font-bold text-right">Completeness</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {atmProfiles.map(a => (
                <TableRow
                  key={a.terminalId}
                  onClick={() => onSelect(a.terminalId)}
                  className={`cursor-pointer hover:bg-blue-50/50 text-xs ${selectedId === a.terminalId ? 'bg-blue-50' : ''}`}
                >
                  <TableCell className="py-2 font-mono font-bold text-slate-900">{a.terminalId}</TableCell>
                  <TableCell className="py-2">{a.bank}</TableCell>
                  <TableCell className="py-2">{a.hub}</TableCell>
                  <TableCell className="py-2">{a.state}</TableCell>
                  <TableCell className="py-2"><Badge variant="outline" className="text-[10px]">{a.atmType}</Badge></TableCell>
                  <TableCell className="py-2"><Badge className={`text-[10px] ${getStatusColor(a.status)}`}>{a.status}</Badge></TableCell>
                  <TableCell className="py-2 text-right">
                    <span className={`font-bold ${a.dataCompleteness >= 90 ? 'text-emerald-600' : a.dataCompleteness >= 75 ? 'text-amber-600' : 'text-red-600'}`}>
                      {a.dataCompleteness}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ATMFleetTable;

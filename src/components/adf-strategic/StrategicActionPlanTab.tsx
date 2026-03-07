import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { strategicActionPlan } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';

const isHeader = (item: { role: string; action: string }) =>
  item.action === '' || item.role === 'Initiative';

export const StrategicActionPlanTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Strategic Action Plan
            <InfoTooltip text="Executive action checklist; board agenda items" />
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Role / Initiative</TableHead>
              <TableHead className="text-[10px]">Action / Timeline</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {strategicActionPlan.map((item, i) => {
              const header = isHeader(item);
              return (
                <TableRow key={i} className={header ? 'bg-gray-50' : ''}>
                  <TableCell className={`text-[10px] ${header ? 'font-bold text-gray-900' : 'font-medium pl-6'}`}>{item.role}</TableCell>
                  <TableCell className={`text-[10px] ${header ? 'font-bold' : ''}`}>{item.action}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

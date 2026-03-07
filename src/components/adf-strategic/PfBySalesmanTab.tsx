import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { pfBySalesman, fmtUsd } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';

export const PfBySalesmanTab: React.FC = () => {
  const salesmen = useMemo(() => [...new Set(pfBySalesman.map(p => p.salesman))], []);
  const pfs = useMemo(() => [...new Set(pfBySalesman.map(p => p.productFamily))], []);
  const lookup = useMemo(() => {
    const m = new Map<string, number>();
    pfBySalesman.forEach(p => m.set(`${p.productFamily}|${p.salesman}`, p.cyRevenue));
    return m;
  }, []);

  // Calculate total per PF per salesman for key-man risk
  const pfTotals = useMemo(() => {
    const totals = new Map<string, number>();
    pfBySalesman.forEach(p => {
      totals.set(p.productFamily, (totals.get(p.productFamily) || 0) + p.cyRevenue);
    });
    return totals;
  }, []);

  if (pfBySalesman.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center text-sm text-gray-500">
        No PF by Salesman data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Product Family × Salesman (USD)
            <InfoTooltip text="Which salesmen own which PFs; key-man risk by PF. Highlighted when one salesman >50% of a PF." />
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Product Family</TableHead>
              {salesmen.map(s => <TableHead key={s} className="text-[10px] text-right">{s}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pfs.slice(0, 50).map(pf => {
              const total = pfTotals.get(pf) || 1;
              return (
                <TableRow key={pf}>
                  <TableCell className="text-[10px] font-medium">{pf}</TableCell>
                  {salesmen.map(s => {
                    const val = lookup.get(`${pf}|${s}`);
                    const isKeyMan = val && total > 0 && (val / total) > 0.5;
                    return (
                      <TableCell key={s} className={`text-[10px] text-right ${isKeyMan ? 'bg-amber-50 font-bold text-amber-800' : ''}`}>
                        {val ? fmtUsd(val) : '—'}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

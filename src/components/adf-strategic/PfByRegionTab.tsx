import React, { useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { pfByRegion, fmtUsd } from '@/data/adfStrategicData';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';

export const PfByRegionTab: React.FC = () => {
  const regions = useMemo(() => [...new Set(pfByRegion.map(p => p.region))], []);
  const pfs = useMemo(() => [...new Set(pfByRegion.map(p => p.productFamily))], []);
  const lookup = useMemo(() => {
    const m = new Map<string, number>();
    pfByRegion.forEach(p => m.set(`${p.productFamily}|${p.region}`, p.cyRevenue));
    return m;
  }, []);

  if (pfByRegion.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm text-center text-sm text-gray-500">
        No PF by Region data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-auto">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            Product Family × Region (USD)
            <InfoTooltip text="Which PFs dominate which regions; regional diversification" />
          </h3>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-[10px]">Product Family</TableHead>
              {regions.map(r => <TableHead key={r} className="text-[10px] text-right">{r}</TableHead>)}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pfs.slice(0, 50).map(pf => (
              <TableRow key={pf}>
                <TableCell className="text-[10px] font-medium">{pf}</TableCell>
                {regions.map(r => {
                  const val = lookup.get(`${pf}|${r}`);
                  return <TableCell key={r} className="text-[10px] text-right">{val ? fmtUsd(val) : '—'}</TableCell>;
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

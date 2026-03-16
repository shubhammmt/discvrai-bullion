import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { profitability, fmtNum } from '@/data/adfCeoSalesData';
import { DollarSign, PieChart } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

const healthColor = (h: string) => {
  if (h.includes('🟢')) return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (h.includes('🟡')) return 'bg-amber-50 text-amber-700 border border-amber-200';
  return 'bg-gray-50 text-gray-600 border border-gray-200';
};

export const ProfitabilityTab: React.FC = () => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-indigo-500" />
          Entity-wise P&L Snapshot | Q3 & YTD FY26
          <InfoTooltip text="Subsidiary-wise Revenue, EBITDA, PBT, PAT. Health = 🟢 Healthy, 🟡 Moderate." />
        </h3>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className={`${th} min-w-[160px]`}>Entity</TableHead>
              <TableHead className={`${th} text-right min-w-[100px]`}>Q3 Revenue</TableHead>
              <TableHead className={`${th} text-right min-w-[100px]`}>Q3 EBITDA</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>Q3 EBITDA%</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>Q3 PBT</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>Q3 PBT%</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>Q3 PAT</TableHead>
              <TableHead className={`${th} text-right min-w-[100px]`}>YTD Revenue</TableHead>
              <TableHead className={`${th} text-right min-w-[100px]`}>YTD EBITDA</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>YTD PBT</TableHead>
              <TableHead className={`${th} min-w-[110px]`}>Health</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profitability.entities.map((e: any, i: number) => (
              <TableRow key={e.entity} className={`border-gray-100 transition-colors hover:bg-indigo-50/40 ${e.entity === 'SUBSIDIARY TOTAL' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <TableCell className={`${td} font-semibold text-gray-800`}>{e.entity}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Revenue)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Ebitda)}</TableCell>
                <TableCell className={`${td} text-right font-semibold tabular-nums ${e.q3EbitdaPct >= 15 ? 'text-emerald-600' : e.q3EbitdaPct >= 0 ? 'text-gray-700' : 'text-red-600'}`}>{e.q3EbitdaPct}%</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Pbt)}</TableCell>
                <TableCell className={`${td} text-right font-semibold tabular-nums ${e.q3PbtPct >= 15 ? 'text-emerald-600' : e.q3PbtPct >= 0 ? 'text-gray-700' : 'text-red-600'}`}>{e.q3PbtPct}%</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.q3Pat)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.ytdRevenue)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.ytdEbitda)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(e.ytdPbt)}</TableCell>
                <TableCell className={td}><span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${healthColor(e.health)}`}>{e.health}</span></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
          <PieChart className="w-4 h-4 text-emerald-500" />
          Category-wise Gross Margin
          <InfoTooltip text="(Revenue − Cost) ÷ Revenue. Δ pp = change in percentage points." />
        </h3>
      </div>
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-200">
              <TableHead className={`${th} min-w-[150px]`}>Category</TableHead>
              <TableHead className={`${th} text-right min-w-[100px]`}>KGS 9M FY26</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>CIF (₹L)</TableHead>
              <TableHead className={`${th} text-right min-w-[80px]`}>COGS/kg</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>Margin (Rs.)</TableHead>
              <TableHead className={`${th} text-right min-w-[80px]`}>Price/kg</TableHead>
              <TableHead className={`${th} text-right min-w-[80px] !bg-indigo-50/80 !text-indigo-700`}>Margin% FY26</TableHead>
              <TableHead className={`${th} text-right min-w-[100px]`}>KGS 9M FY25</TableHead>
              <TableHead className={`${th} text-right min-w-[90px]`}>CIF PY</TableHead>
              <TableHead className={`${th} text-right min-w-[80px]`}>Price/kg PY</TableHead>
              <TableHead className={`${th} text-right min-w-[80px]`}>Margin% PY</TableHead>
              <TableHead className={`${th} text-right min-w-[80px]`}>Margin Δ pp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profitability.categoryMargin.map((c: any, i: number) => (
              <TableRow key={c.category} className={`border-gray-100 transition-colors hover:bg-emerald-50/40 ${c.category === 'Grand Total' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <TableCell className={`${td} font-semibold text-gray-800`}>{c.category}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(c.kgs9MFy26)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(c.cif9MFy26)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{c.cogsPerKg != null ? fmtNum(c.cogsPerKg) : '—'}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{c.marginRs != null ? `₹${fmtNum(c.marginRs)}` : '—'}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>₹{fmtNum(c.pricePerKg)}</TableCell>
                <TableCell className={`${td} text-right font-bold tabular-nums bg-indigo-50/30 ${c.marginPct >= 50 ? 'text-emerald-600' : 'text-gray-800'}`}>{c.marginPct}%</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{c.kgs9MFy25 != null ? fmtNum(c.kgs9MFy25) : '—'}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{c.cif9MFy25 != null ? fmtNum(c.cif9MFy25) : '—'}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{c.pricePerKgPy != null ? `₹${fmtNum(c.pricePerKgPy)}` : '—'}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{c.marginPctPy}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  </div>
);

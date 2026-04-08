import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { volValuePrice, fmtNum, fmtPct, growthColor, growthBg, isDataRow } from '@/data/adfCeoSales12MData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Cell } from 'recharts';
import { Scale, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

const KpiCard = ({ title, value, sub, color, icon }: { title: string; value: string; sub: string; color: string; icon: React.ReactNode }) => (
  <div className={`rounded-xl border-2 ${color} p-4 text-center`}>
    <div className="flex items-center justify-center gap-1.5 mb-2">
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-wider text-white">{title}</span>
    </div>
    <div className="text-3xl font-black text-white">{value}</div>
    <div className="text-[11px] text-white/80 mt-1">{sub}</div>
  </div>
);

export const VolValueTab: React.FC = () => {
  const cats = volValuePrice.categories.filter((c: any) =>
    isDataRow(c.category) && c.category !== 'TOTAL' && c.volCy > 0
  );
  const total = volValuePrice.categories.find((c: any) => c.category === 'TOTAL');

  const bridgeData = cats.map((c: any) => ({
    name: c.category.length > 10 ? c.category.substring(0, 10) + '…' : c.category,
    valFromVol: c.valFromVol,
    valFromPrice: c.valFromPrice,
  }));

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Volume Growth" value={`${(volValuePrice.volGrowth * 100).toFixed(0)}%`}
          sub={volValuePrice.volumeSummarySubtext || "12M FY26 vs FY25"} color="bg-orange-600 border-orange-700"
          icon={<BarChart3 className="w-4 h-4 text-white" />} />
        <KpiCard title="Value Growth" value={`${(volValuePrice.valGrowth * 100).toFixed(1)}%`}
          sub={volValuePrice.valueSummarySubtext || "Revenue from sales growth"} color="bg-green-700 border-green-800"
          icon={<DollarSign className="w-4 h-4 text-white" />} />
        <KpiCard title="Price Realization" value={fmtNum(volValuePrice.priceRealization)}
          sub={`PY: ₹212/kg | Δ ₹${volValuePrice.priceRealization?.toFixed(1)}`} color="bg-yellow-600 border-yellow-700"
          icon={<TrendingUp className="w-4 h-4 text-white" />} />
        <KpiCard title="Value from Volume" value={fmtNum(volValuePrice.valueFromVolume)}
          sub="Volume-driven revenue delta" color="bg-purple-700 border-purple-800"
          icon={<Scale className="w-4 h-4 text-white" />} />
      </div>

      {/* Bridge Chart */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4">
        <h4 className="text-sm font-bold text-gray-700 mb-4">Value Change Decomposition — Volume vs Price Effect (₹ Lakhs)</h4>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={bridgeData} barCategoryGap="25%">
              <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-15} textAnchor="end" height={50} />
              <YAxis tick={{ fontSize: 10 }} tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`} />
              <Tooltip formatter={(v: number) => `₹${fmtNum(v)} L`} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <ReferenceLine y={0} stroke="#94a3b8" />
              <Bar dataKey="valFromVol" name="From Volume" fill="#3b82f6" radius={[2, 2, 0, 0]} />
              <Bar dataKey="valFromPrice" name="From Price" fill="#f59e0b" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Vol vs Value Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-4 py-3 bg-orange-700">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Scale className="w-4 h-4" /> Category-Wise Volume vs Value Decomposition | Growth Drivers
          </h4>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[120px]`}>Category</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Vol CY (MT)</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Vol PY (MT)</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Vol Gr%</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[85px]`}>Val CY (₹L)</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[85px]`}>Val PY (₹L)</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Val Gr%</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[75px]`}>₹/Kg CY</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[75px]`}>₹/Kg PY</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[70px]`}>Price Δ</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[85px]`}>Val from Vol</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[85px]`}>Val from Price</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[85px]`}>Net Val Δ</TableHead>
                <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[100px]`}>Driver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {volValuePrice.categories
                .filter((c: any) => isDataRow(c.category) && c.volCy > 0)
                .map((c: any, i: number) => {
                  const isTotal = c.category === 'TOTAL';
                  return (
                    <TableRow key={c.category} className={`border-gray-100 hover:bg-gray-50 ${isTotal ? 'font-bold bg-purple-50' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                      <TableCell className={`${td} font-semibold text-gray-800`}>{c.category}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(c.volCy)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(c.volPy)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(c.volGrPct)} ${growthBg(c.volGrPct)}`}>{fmtPct(c.volGrPct)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(c.valCy)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(c.valPy)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(c.valGrPct)} ${growthBg(c.valGrPct)}`}>{fmtPct(c.valGrPct)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums`}>{fmtNum(c.pricePerKgCy)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(c.pricePerKgPy)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums ${c.priceDelta >= 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'}`}>{c.priceDelta >= 0 ? '+' : ''}{c.priceDelta.toFixed(1)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums ${c.valFromVol >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{c.valFromVol >= 0 ? '+' : ''}{fmtNum(c.valFromVol)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums ${c.valFromPrice >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{c.valFromPrice >= 0 ? '+' : ''}{fmtNum(c.valFromPrice)}</TableCell>
                      <TableCell className={`${td} text-right tabular-nums font-semibold ${c.netValDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{c.netValDelta >= 0 ? '+' : ''}{fmtNum(c.netValDelta)}</TableCell>
                      <TableCell className={`${td} text-[12px]`}>{c.growthDriver || '—'}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

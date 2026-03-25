import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { InfoTooltip } from '@/components/adf-mis/InfoTooltip';
import { volValuePrice, fmtNum, fmtPct } from '@/data/adfCeoSalesData';
import { Scale, TrendingUp, ArrowUpDown, BarChart3 } from 'lucide-react';

const th = "text-[11px] font-bold text-gray-500 uppercase tracking-wider bg-gray-50/80 border-b-2 border-gray-200";
const td = "text-[13px] py-3 px-4";

export const VolValuePriceTab: React.FC = () => {
  const v = volValuePrice;
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: '📦 Volume Growth', 
            value: v.volGrowthLabel || `${(v.volGrowth * 100).toFixed(1)}%`,
            sub: v.volumeAbs ? `${fmtNum(v.volumeAbs.cyMt)} MT vs ${fmtNum(v.volumeAbs.pyMt)} MT` : v.volumeSummarySubtext,
            icon: Scale, gradient: 'from-emerald-500 to-teal-600', textColor: 'text-emerald-100'
          },
          {
            label: '💰 Value Growth',
            value: v.valGrowthLabel || `${(v.valGrowth * 100).toFixed(1)}%`,
            sub: v.valueAbs ? `₹${fmtNum(v.valueAbs.cyLakhs)} L vs ₹${fmtNum(v.valueAbs.pyLakhs)} L` : v.valueSummarySubtext,
            icon: TrendingUp, gradient: 'from-indigo-500 to-violet-600', textColor: 'text-indigo-100'
          },
          {
            label: '💲 Price Realization Δ',
            value: v.priceRealizationLabel || `₹${v.priceRealization}/kg`,
            icon: ArrowUpDown, gradient: 'from-amber-500 to-orange-600', textColor: 'text-amber-100'
          },
          {
            label: '📊 Value from Volume',
            value: v.valueFromVolumeLabel || `₹${fmtNum(v.valueFromVolume)} L`,
            icon: BarChart3, gradient: 'from-sky-500 to-cyan-600', textColor: 'text-sky-100',
            tooltip: 'Revenue increase attributable to volume growth (vs price change).'
          },
        ].map((k) => (
          <div key={k.label} className={`relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br ${k.gradient} text-white shadow-lg`}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-5 translate-x-5" />
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider">
              <k.icon className="w-3.5 h-3.5" />
              {k.label}
              {k.tooltip && <InfoTooltip text={k.tooltip} />}
            </div>
            <div className="text-2xl font-extrabold mt-2">{k.value}</div>
            {k.sub && <div className="text-xs mt-1.5 opacity-80">{k.sub}</div>}
          </div>
        ))}
      </div>

      {/* Main Vol vs Value table — no "Net Value" column */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <Scale className="w-4 h-4 text-emerald-500" />
            Volume vs Value Decomposition
          </h3>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className={`${th} min-w-[150px]`}>Category</TableHead>
                <TableHead className={`${th} text-right min-w-[90px]`}>Vol CY (MT)</TableHead>
                <TableHead className={`${th} text-right min-w-[90px]`}>Vol PY (MT)</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Vol Gr%</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Val CY (₹L)</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Val PY (₹L)</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Val Gr%</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>₹/kg CY</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>₹/kg PY</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Price Δ</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Val from Vol</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Val from Price</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Net Val Δ</TableHead>
                <TableHead className={`${th} min-w-[120px]`}>Growth Driver</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {v.categories.map((c: any, i: number) => (
                <TableRow key={c.category} className={`border-gray-100 transition-colors hover:bg-emerald-50/40 ${c.category === 'TOTAL' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <TableCell className={`${td} font-semibold text-gray-800`}>{c.category}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(c.volCy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(c.volPy)}</TableCell>
                  <TableCell className={`${td} text-right font-semibold tabular-nums ${c.volGrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(c.volGrPct)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(c.valCy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(c.valPy)}</TableCell>
                  <TableCell className={`${td} text-right font-semibold tabular-nums ${c.valGrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(c.valGrPct)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(c.pricePerKgCy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>{fmtNum(c.pricePerKgPy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums ${c.priceDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{c.priceDelta >= 0 ? '+' : ''}{fmtNum(c.priceDelta)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums ${c.valFromVol >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(c.valFromVol)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums ${c.valFromPrice >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(c.valFromPrice)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${c.netValDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtNum(c.netValDelta)}</TableCell>
                  <TableCell className={`${td} text-[12px] whitespace-nowrap`}>{c.growthDriver || '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Price Realization per kg (Movement Analysis) */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
          <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-amber-500" />
            Price Realization per kg (Movement Analysis)
          </h3>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200">
                <TableHead className={`${th} min-w-[150px]`}>Category</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Price/kg CY (₹)</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Price/kg PY (₹)</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Price Δ</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Price Gr%</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>COGS/kg FY26</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>COGS/kg FY25</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>COGS Δ</TableHead>
                <TableHead className={`${th} text-right min-w-[100px]`}>Spread (Price−COGS)</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Spread PY</TableHead>
                <TableHead className={`${th} text-right min-w-[80px]`}>Spread Δ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {v.priceRealizationTable.map((p: any, i: number) => (
                <TableRow key={p.category} className={`border-gray-100 transition-colors hover:bg-amber-50/40 ${p.category === 'TOTAL' ? 'font-bold bg-indigo-50/60' : i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                  <TableCell className={`${td} font-semibold text-gray-800`}>{p.category}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-700`}>₹{fmtNum(p.pricePerKgCy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>₹{fmtNum(p.pricePerKgPy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${p.priceDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{p.priceDelta >= 0 ? '+' : ''}₹{fmtNum(p.priceDelta)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${p.priceGrPct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{fmtPct(p.priceGrPct)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-700`}>₹{fmtNum(p.cogsPerKgFy26)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>₹{fmtNum(p.cogsPerKgFy25)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums ${p.cogsDelta >= 0 ? 'text-red-600' : 'text-emerald-600'}`}>{p.cogsDelta >= 0 ? '+' : ''}₹{fmtNum(p.cogsDelta)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold text-gray-700`}>₹{fmtNum(p.spreadPriceCogs)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums text-gray-500`}>₹{fmtNum(p.spreadPy)}</TableCell>
                  <TableCell className={`${td} text-right tabular-nums font-semibold ${p.spreadDelta >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>{p.spreadDelta >= 0 ? '+' : ''}₹{fmtNum(p.spreadDelta)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

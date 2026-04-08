import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ceoExecutiveSummary, fmtNum, fmtPct, getSignalColor, growthColor, growthBg } from '@/data/adfCeoSales12MData';
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Globe, Award, Layers } from 'lucide-react';

const th = "text-[11px] font-bold uppercase tracking-wider border-b-2 border-gray-200 px-4 py-3";
const td = "text-[13px] py-3 px-4";

const KpiCard = ({ title, value, subtitle, icon, color }: { title: string; value: string; subtitle: string; icon: React.ReactNode; color: string }) => (
  <div className={`rounded-xl border-2 ${color} p-4 text-center`}>
    <div className="flex items-center justify-center gap-1.5 mb-2">
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-wider text-white">{title}</span>
    </div>
    <div className="text-3xl font-black text-white">{value}</div>
    <div className="text-[11px] text-white/80 mt-1">{subtitle}</div>
  </div>
);

const HighlightChip = ({ icon, label, value, sub, color }: { icon: React.ReactNode; label: string; value: string; sub: string; color: string }) => (
  <div className={`rounded-xl border-2 ${color} p-4 text-center`}>
    <div className="flex items-center justify-center gap-1.5 mb-2">
      {icon}
      <span className="text-[11px] font-bold uppercase tracking-wider text-white">{label}</span>
    </div>
    <div className="text-2xl font-black text-white">{value}</div>
    <div className="text-[11px] text-white/80 mt-1">{sub}</div>
  </div>
);

const SignalTable = ({ title, data, nameKey, icon, headerColor }: {
  title: string; data: any[]; nameKey: string; icon: React.ReactNode; headerColor: string;
}) => (
  <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
    <div className={`px-4 py-3 ${headerColor}`}>
      <h3 className="text-sm font-bold text-white flex items-center gap-2">{icon}{title}</h3>
    </div>
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[140px]`}>{nameKey === 'region' ? 'Zone' : nameKey === 'name' ? 'Category' : 'Brand'}</TableHead>
            <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[100px]`}>12M FY26</TableHead>
            <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>12M Gr%</TableHead>
            <TableHead className={`${th} bg-gray-50 text-gray-500 text-right min-w-[80px]`}>Q4 Gr%</TableHead>
            <TableHead className={`${th} bg-gray-50 text-gray-500 min-w-[120px]`}>Signal</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((r: any, i: number) => {
            const signal = r.signal || r.status || '';
            const sc = getSignalColor(signal);
            const gr12 = r.growth12MPct ?? r['12mGrPct'] ?? 0;
            const grQ4 = r.growthQ4Pct ?? r.q4GrPct ?? 0;
            return (
              <TableRow key={r[nameKey] || i} className={`border-gray-100 hover:bg-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <TableCell className={`${td} font-semibold text-gray-800`}>{r[nameKey]}</TableCell>
                <TableCell className={`${td} text-right tabular-nums text-gray-700`}>{fmtNum(r.value12M || r['12mFy26'] || 0)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(gr12)} ${growthBg(gr12)}`}>{fmtPct(gr12)}</TableCell>
                <TableCell className={`${td} text-right tabular-nums font-semibold ${growthColor(grQ4)} ${growthBg(grQ4)}`}>{fmtPct(grQ4)}</TableCell>
                <TableCell className={td}>
                  {signal && <span className={`text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap ${sc.bg} ${sc.text} border ${sc.border}`}>{signal}</span>}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  </div>
);

export const ExecutiveSummaryTab: React.FC = () => {
  const s = ceoExecutiveSummary;
  return (
    <div className="space-y-6">
      {/* KPI Row 1 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="12M FY26 Revenue"
          value={fmtNum(s.revenue12M.fy26)}
          subtitle={s.revenue12M.label}
          icon={<DollarSign className="w-4 h-4 text-white" />}
          color="bg-blue-700 border-blue-800"
        />
        <KpiCard
          title="12M Revenue Growth"
          value={`${s.revenue12M.growthPct}%`}
          subtitle="↑ Growing"
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          color="bg-teal-600 border-teal-700"
        />
        <KpiCard
          title="Volume Growth"
          value={`${(s.volumeGrowth.value * 100).toFixed(0)}%`}
          subtitle={s.volumeGrowth.label}
          icon={<BarChart3 className="w-4 h-4 text-white" />}
          color="bg-orange-600 border-orange-700"
        />
        <KpiCard
          title="Realization Growth"
          value={`${(s.realizationGrowth.value * 100).toFixed(0)}%`}
          subtitle={s.realizationGrowth.label}
          icon={<TrendingUp className="w-4 h-4 text-white" />}
          color="bg-yellow-600 border-yellow-700"
        />
      </div>

      {/* KPI Row 2 */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <HighlightChip
          icon={<Layers className="w-4 h-4 text-white" />}
          label="Gross Margin 12M FY26"
          value={`${s.grossMargin12M.fy26}%`}
          sub={s.grossMargin12M.label}
          color="bg-green-700 border-green-800"
        />
        <HighlightChip
          icon={<BarChart3 className="w-4 h-4 text-white" />}
          label="Q4 FY26 Growth"
          value={`${s.q4Growth.growthPct}%`}
          sub={s.q4Growth.label}
          color="bg-purple-700 border-purple-800"
        />
        <HighlightChip
          icon={<Award className="w-4 h-4 text-white" />}
          label="#1 Category"
          value={s.topCategory.name}
          sub={s.topCategory.label}
          color="bg-teal-700 border-teal-800"
        />
        <HighlightChip
          icon={<Globe className="w-4 h-4 text-white" />}
          label="#1 Zone"
          value={s.topZone.name}
          sub={s.topZone.label}
          color="bg-indigo-700 border-indigo-800"
        />
      </div>

      {/* Signal Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SignalTable
          title="Category Signals"
          data={s.categorySignals}
          nameKey="name"
          icon={<Layers className="w-4 h-4 text-white" />}
          headerColor="bg-purple-700"
        />
        <SignalTable
          title="Brand Signals"
          data={s.brandSignals}
          nameKey="name"
          icon={<Award className="w-4 h-4 text-white" />}
          headerColor="bg-teal-700"
        />
      </div>
      <SignalTable
        title="Zone Signals"
        data={s.regionSignals}
        nameKey="region"
        icon={<Globe className="w-4 h-4 text-white" />}
        headerColor="bg-purple-700"
      />
    </div>
  );
};

import React, { useState } from 'react';
import { salespersonData, salesmenNames, formatCurrency, getStatusBg, getStatusLabel } from '@/data/adfMisData';
import { KpiCard } from './KpiCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Target, DollarSign, TrendingUp, AlertTriangle, AlertCircle, Activity, BarChart3, Package, Globe, ChevronDown, ChevronRight } from 'lucide-react';
import { InfoTooltip, TOOLTIPS } from './InfoTooltip';

export const SalesView: React.FC = () => {
  const [selected, setSelected] = useState<string>(salesmenNames[0]);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const data = salespersonData[selected];

  return (
    <div className="space-y-6">
      {/* Salesman Picker */}
      <div className="flex items-center gap-3 flex-wrap">
        <User className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">Salesman:</span>
        <select
          value={selected}
          onChange={(e) => { setSelected(e.target.value); setExpandedCustomer(null); }}
          className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          {salesmenNames.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="My YTD %" value={`${data.ytdPct}%`} trend={data.growthVsFy25Pct} trendLabel="vs FY25" icon={<Target className="w-4 h-4" />} />
        <KpiCard title="Balance to Achieve" value={formatCurrency(data.balanceToAchieve, true)} subtitle={data.balanceToAchieve < 0 ? 'Ahead of target' : 'Remaining'} icon={<DollarSign className="w-4 h-4" />} />
        <KpiCard title="Growth vs FY25" value={`${data.growthVsFy25Pct > 0 ? '+' : ''}${data.growthVsFy25Pct}%`} trend={data.growthVsFy25Pct} trendLabel="Year-on-year" icon={<TrendingUp className="w-4 h-4" />} />
        <KpiCard
          title="Q4 Pipeline Coverage"
          value={`${data.q4PipelineCoverage}x`}
          subtitle={data.q4PipelineCoverage >= 1 ? 'Sufficient' : 'Insufficient'}
          icon={<Activity className="w-4 h-4" />}
        />
      </div>

      {/* Summary row */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center gap-6 text-sm flex-wrap">
        <span className="text-gray-500">Customers: <span className="font-semibold text-gray-900">{data.customerCount}</span></span>
        <span className="text-gray-500">At-Risk: <span className="font-semibold text-red-600">{data.atRiskCustomers.length}</span></span>
        <span className="text-gray-500">Zero Q4 Dispatch: <span className="font-semibold text-amber-600">{data.zeroQ4Dispatch.length}</span></span>
      </div>

      {/* Top 5 to Chase */}
      {data.top5ToChase.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Top 5 to Chase — {selected}</h3>
            <p className="text-xs text-gray-500">Highest balance to achieve</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.top5ToChase.map(c => (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.customer}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(c.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${c.ytdPct >= 90 ? 'text-emerald-600' : c.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{c.ytdPct}%</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(c.ytdPct)}`}>
                      {getStatusLabel(c.ytdPct)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* My Regions */}
      {data.myRegions && data.myRegions.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-500" />
            <h3 className="text-sm font-semibold text-gray-900">My Regions — {selected}<InfoTooltip text={TOOLTIPS.region} /></h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Region</TableHead>
                <TableHead className="text-right">Projected</TableHead>
                <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                <TableHead className="text-right">Customers</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.myRegions.map(r => (
                <TableRow key={r.region}>
                  <TableCell className="font-medium text-gray-900 text-xs">{r.region}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(r.projected, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${r.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(r.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${r.ytdPct >= 90 ? 'text-emerald-600' : r.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{r.ytdPct}%</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{r.customerCount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(r.ytdPct)}`}>
                      {getStatusLabel(r.ytdPct)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* My Product Families */}
      {data.myProductFamilies && data.myProductFamilies.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <Package className="w-4 h-4 text-purple-500" />
            <h3 className="text-sm font-semibold text-gray-900">My Product Families — {selected}<InfoTooltip text={TOOLTIPS.productFamily} /></h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Product Family</TableHead>
                <TableHead className="text-right">Projected</TableHead>
                <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.myProductFamilies.map(pf => (
                <TableRow key={pf.productFamily}>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[250px] truncate" title={pf.productFamily}>{pf.productFamily}</TableCell>
                  <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(pf.projected, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${pf.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>{formatCurrency(pf.balance, true)}</TableCell>
                  <TableCell className={`text-right tabular-nums font-semibold ${pf.ytdPct >= 90 ? 'text-emerald-600' : pf.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>{pf.ytdPct}%</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(Math.max(0, pf.ytdPct))}`}>
                      {getStatusLabel(Math.max(0, pf.ytdPct))}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* My Categories */}
      {data.myCategories && data.myCategories.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-blue-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">My Categories — {selected}</h3>
              <p className="text-xs text-gray-500">Performance by product category (sorted by balance)</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">FY26 Projected</TableHead>
                  <TableHead className="text-right">Dispatch+Open<InfoTooltip text={TOOLTIPS.dispatchPlusOpen} /></TableHead>
                  <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                  <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
                  <TableHead className="text-right">Growth vs FY25<InfoTooltip text={TOOLTIPS.growthVsFy25} /></TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.myCategories.map(cat => (
                  <TableRow key={cat.category}>
                    <TableCell className="font-medium text-gray-900 text-xs">{cat.category}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(cat.fy26Projected, true)}</TableCell>
                    <TableCell className="text-right tabular-nums text-gray-600 text-xs">{formatCurrency(cat.dispatchPlusOpen, true)}</TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${cat.balance > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                      {formatCurrency(cat.balance, true)}
                    </TableCell>
                    <TableCell className={`text-right tabular-nums font-semibold ${cat.ytdPct >= 90 ? 'text-emerald-600' : cat.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                      {cat.ytdPct}%
                    </TableCell>
                    <TableCell className={`text-right tabular-nums font-medium ${cat.growthVsFy25Pct >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                      {cat.growthVsFy25Pct > 0 ? '+' : ''}{cat.growthVsFy25Pct}%
                    </TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${getStatusBg(cat.ytdPct)}`}>
                        {getStatusLabel(cat.ytdPct)}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {/* My Top SKUs to Chase */}
      {data.myTopSkusToChase && data.myTopSkusToChase.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">My Top SKUs to Chase — {selected}</h3>
            <p className="text-xs text-gray-500">SKUs with highest balance and their customers</p>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead>Code</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead className="text-right">Balance<InfoTooltip text={TOOLTIPS.balance} /></TableHead>
                <TableHead>Customers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.myTopSkusToChase.map(s => (
                <TableRow key={s.itemCode}>
                  <TableCell className="font-mono text-[10px] text-gray-500">{s.itemCode}</TableCell>
                  <TableCell className="font-medium text-gray-900 text-xs max-w-[200px] truncate" title={s.itemName}>{s.itemName}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-gray-900">{formatCurrency(s.balance, true)}</TableCell>
                  <TableCell className="text-xs text-gray-600 max-w-[200px]">
                    {s.customers.map(c => (
                      <span key={c} className="inline-block px-1.5 py-0.5 bg-gray-100 rounded text-[10px] mr-1 mb-1">{c}</span>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* My SKUs by Customer */}
      {data.mySkusByCustomer && data.mySkusByCustomer.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">My SKUs by Customer — {selected}</h3>
            <p className="text-xs text-gray-500">Click customer to expand SKU breakdown</p>
          </div>
          {data.mySkusByCustomer.map(cust => {
            const isExpanded = expandedCustomer === cust.customer;
            return (
              <div key={cust.customer} className="border-b border-gray-100 last:border-b-0">
                <div
                  className="px-6 py-3 flex items-center justify-between cursor-pointer hover:bg-gray-50"
                  onClick={() => setExpandedCustomer(isExpanded ? null : cust.customer)}
                >
                  <div className="flex items-center gap-2">
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
                    <span className="text-xs font-medium text-gray-900">{cust.customer}</span>
                  </div>
                  <span className="text-xs text-gray-500">{cust.skus.length} SKUs</span>
                </div>
                {isExpanded && (
                  <div className="px-8 pb-3">
                    <div className="grid gap-1">
                      {cust.skus.map(s => (
                        <div key={s.itemCode} className="flex items-center justify-between py-1 px-3 rounded bg-gray-50 border border-gray-100">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-gray-400">{s.itemCode}</span>
                            <span className="text-xs text-gray-700 max-w-[200px] truncate" title={s.itemName}>{s.itemName}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-xs tabular-nums font-semibold text-gray-900">{formatCurrency(s.balance, true)}</span>
                            <span className={`text-xs tabular-nums font-semibold ${s.ytdPct >= 90 ? 'text-emerald-600' : s.ytdPct >= 70 ? 'text-amber-600' : 'text-red-600'}`}>
                              {s.ytdPct}%
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* At-Risk Customers */}
      {data.atRiskCustomers.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-500" />
            <h3 className="text-sm font-semibold text-gray-900">At-Risk Customers (YTD &lt; 70%)<InfoTooltip text={TOOLTIPS.atRisk} /></h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-red-50">
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">YTD %<InfoTooltip text={TOOLTIPS.ytdPct} /></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.atRiskCustomers.map(c => (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.customer}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-red-600">{c.ytdPct}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Overachievers */}
      {data.overachievers && data.overachievers.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900">Overachievers 🎉</h3>
          </div>
          <Table>
            <TableHeader>
              <TableRow className="bg-emerald-50">
                <TableHead>Customer</TableHead>
                <TableHead className="text-right">YTD %</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.overachievers.map(c => (
                <TableRow key={c.customer}>
                  <TableCell className="font-medium text-gray-900 text-xs">{c.customer}</TableCell>
                  <TableCell className="text-right tabular-nums font-semibold text-emerald-600">{c.ytdPct}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Zero Q4 Dispatch */}
      {data.zeroQ4Dispatch.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Zero Q4 Dispatch<InfoTooltip text={TOOLTIPS.zeroQ4Dispatch} /></h3>
              <p className="text-xs text-gray-500">No dispatch or open order in Q4</p>
            </div>
          </div>
          <div className="px-6 py-3">
            <div className="flex flex-wrap gap-2">
              {data.zeroQ4Dispatch.map(c => (
                <span key={c.customer} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                  {c.customer}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

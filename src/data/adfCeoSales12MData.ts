import rawData from '../../docs/AdfFoods/adf_ceo_sales_insights_12m.json';

const data = rawData as any;

export const lastUpdated: string = data.lastUpdated;
export const source: string = data.source;
export const currency: string = data.currency;
export const unit: string = data.unit;

export const ceoExecutiveSummary = data.ceoExecutiveSummary;
export const profitability = data.profitability;
export const volValuePrice = data.volValuePrice;
export const salesDashboard = data.salesDashboard;
export const top10Tail = data.top10Tail;
export const growthAnalysis = data.growthAnalysis;
export const profitability12M = data.profitability12M;
export const profitability9M = data.profitability9M;
export const entityPnl = data.entityPnl;
export const productWise = data.productWise;
export const zoneWise = data.zoneWise;
export const brandWise = data.brandWise;

export const fmtInr = (v: number): string => {
  if (v === 0) return '—';
  return `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 1 })}`;
};

export const fmtPct = (v: number): string => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;

export const fmtNum = (v: number): string => {
  if (v === 0) return '—';
  return v.toLocaleString('en-IN', { maximumFractionDigits: 1 });
};

// Filter out separator/header rows from JSON arrays
export const isDataRow = (name: string): boolean => {
  if (!name) return false;
  if (name.includes('🏷️') || name.includes('🌍') || name.includes('💲')) return false;
  if (name === 'Zone' || name === 'Brand' || name === 'Category') return false;
  if (name === 'Status' || name === 'Trend') return false;
  return true;
};

export const getSignalColor = (signal: string) => {
  if (signal.includes('Strong') || signal.includes('🚀')) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
  if (signal.includes('Growing') || signal.includes('✅')) return { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' };
  if (signal.includes('Degrow') || signal.includes('🔻')) return { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' };
  if (signal.includes('Slow') || signal.includes('⚠️')) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  if (signal.includes('Healthy') || signal.includes('🟢')) return { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' };
  if (signal.includes('Moderate') || signal.includes('🟡')) return { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' };
  return { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' };
};

export const growthColor = (v: number) => {
  if (v > 2) return 'text-emerald-600';
  if (v < -2) return 'text-red-600';
  return 'text-amber-600';
};

export const growthBg = (v: number) => {
  if (v > 2) return 'bg-emerald-50';
  if (v < -2) return 'bg-red-50';
  return 'bg-amber-50';
};

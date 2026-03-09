import rawData from '../../docs/AdfFoods/adf_ceo_sales_insights.json';

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
export const profitability9M = data.profitability9M;
export const entityPnl = data.entityPnl;
export const productWise = data.productWise;
export const zoneWise = data.zoneWise;
export const brandWise = data.brandWise;

export const fmtInr = (v: number): string => {
  if (v === 0) return '₹0';
  const abs = Math.abs(v);
  return `₹${v.toLocaleString('en-IN', { maximumFractionDigits: 1 })} L`;
};

export const fmtPct = (v: number): string => `${v >= 0 ? '+' : ''}${v.toFixed(1)}%`;

export const fmtNum = (v: number): string => v.toLocaleString('en-IN', { maximumFractionDigits: 1 });

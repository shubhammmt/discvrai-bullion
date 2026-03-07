import strategicJson from '../../docs/AdfFoods/adf_insights_full_part2.json';

export interface RevenuePerformance {
  metric: string;
  py: number;
  cy: number;
  growthPct: number;
  growthUsd: number;
  insight: string;
}

export interface PortfolioHealth {
  metric: string;
  value: number | string;
  benchmark: string;
  status: string;
}

export interface RegionalPerformance {
  region: string;
  pyRev: number;
  cyRev: number;
  growthPct: number;
  cyShare: number;
}

export interface StrategicBrief {
  num: string;
  text: string;
}

export interface PriceRealization {
  category: string;
  finGroup: string;
  pyRev: number;
  cyRev: number;
  revDeltaPct: number;
  pyKgs: number;
  cyKgs: number;
  volDeltaPct: number;
  pyPerKg: number;
  cyPerKg: number;
  priceDeltaPct: number;
  valueLeak: number;
}

export interface CustomerConcentration {
  rank: number;
  customer: string;
  zone: string;
  pyRev: number;
  cyRev: number;
  growthPct: number;
  cyShare: number;
  cumShare: number;
}

export interface CategoryManufacturing {
  category: string;
  finGroup: string;
  group: string;
  cySkus: number;
  pySkus: number;
  skuDelta: number;
  cyRevenue: number;
  revPerSku: number;
  revPerSkuDeltaPct: number;
  cyPfs: number;
  skuPerPf: number;
  action: string;
}

export interface SkuRedundancy {
  productFamily: string;
  category: string;
  skus: number;
  brands: number;
  revenue: number;
  revPerSku: number;
  target: number;
  saveable: number;
}

export interface PfClassification {
  class: string;
  count: number;
  cyRevenue: number;
  pctRev: number;
  avgGrowth: number;
  strategy: string;
}

export interface PfGrowthItem {
  productFamily: string;
  category: string;
  finGroup: string;
  pyRev: number;
  cyRev: number;
  growthPct: number;
  share: number;
  skus: number;
}

export interface TopPf {
  rank: number;
  productFamily: string;
  category: string;
  finGroup: string;
  group: string;
  class: string;
  pyRev: number;
  cyRev: number;
  growthUsd: number;
  growthPct: number;
  share: number;
  skus: number;
}

export interface SalesmanPerformance {
  rank: number;
  salesman: string;
  pyRev: number;
  cyRev: number;
  growthPct: number;
  cyShare: number;
  custs: number;
  skus: number;
  pfs: number;
  revPerCust: number;
  revPerSku: number;
  rating: string;
}

const data = strategicJson as any;

export const lastUpdated: string = data.lastUpdated;
export const source: string = data.source;

// CEO
export const revenuePerformance: RevenuePerformance[] = data.ceo.revenuePerformance;
export const portfolioHealth: PortfolioHealth[] = data.ceo.portfolioHealth;
export const regionalPerformance: RegionalPerformance[] = data.ceo.regionalPerformance;
export const strategicBrief: StrategicBrief[] = data.ceo.strategicBrief;

// CFO
export const priceRealization: PriceRealization[] = data.cfo.priceRealization;
export const totalValueLeakage: number = data.cfo.totalValueLeakage;
export const customerConcentration: CustomerConcentration[] = data.cfo.customerConcentration;

// COO
export const categoryManufacturing: CategoryManufacturing[] = data.coo.categoryManufacturing;
export const topPfsSkuRedundancy: SkuRedundancy[] = data.coo.topPfsSkuRedundancy;

// PF Growth
export const pfClassification: PfClassification[] = data.pfGrowth.classification;
export const pfFastGrowth: PfGrowthItem[] = data.pfGrowth.fastGrowth || [];
export const pfGrowth: PfGrowthItem[] = data.pfGrowth.growth || [];
export const pfStable: PfGrowthItem[] = data.pfGrowth.stable || [];
export const pfDeclining: PfGrowthItem[] = data.pfGrowth.declining || [];
export const pfFastDecline: PfGrowthItem[] = data.pfGrowth.fastDecline || [];
export const pfNew: PfGrowthItem[] = data.pfGrowth.new || [];
export const pfDisc: PfGrowthItem[] = data.pfGrowth.disc || [];

// Product Family Analysis
export const topPfs: TopPf[] = data.productFamilyAnalysis?.topPfs || [];

// Salesman
export const salesmanPerformance: SalesmanPerformance[] = data.salesman?.performance || [];

// Helpers
export const fmtUsd = (v: number) => '$' + v.toLocaleString('en-US', { maximumFractionDigits: 0 });
export const fmtPct = (v: number) => (v >= 0 ? '+' : '') + v.toFixed(1) + '%';
export const fmtNum = (v: number) => v.toLocaleString('en-US', { maximumFractionDigits: 0 });

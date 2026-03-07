// ADF Foods MIS Dashboard — Data Layer
// Source: adf_insights_full_part1.json

import rawData from '../../docs/AdfFoods/adf_insights_full_part1.json';

// ─── Types ───────────────────────────────────────────────────────────

export interface ExecutiveSummary {
  ytdAchievementPct: number;
  balanceToAchieve: number;
  growthVsFy25Pct: number;
  totalProjected: number;
  totalDispatchPlusOpen: number;
}

export interface FullYearGap {
  projectedAmt: number;
  dispatchPlusOpenAmt: number;
  balanceAmt: number;
  projectedQty: number;
  dispatchPlusOpenQty: number;
  balanceQty: number;
  note: string;
}

export interface QuarterTrajectory {
  quarter: string;
  planPct: number;
  actualPct: number;
  dispatch: number;
  dispatchQty: number;
  projected: number;
  projectedQty: number;
  balance: number;
  openOrder?: number;
  openOrderQty?: number;
  dispatchPlusOpen?: number;
}

export interface Q4Gap {
  q4Projected: number;
  q4ProjectedQty: number;
  q4DispatchPlusOpen: number;
  q4DispatchPlusOpenQty: number;
  gap: number;
  gapQty: number;
  note: string;
}

export interface AtRiskCustomer {
  customer: string;
  salesman: string;
  balance: number;
  balanceQty: number;
  ytdPct: number;
  growthVsFy25: number;
}

export interface BehindTarget {
  customer: string;
  salesman: string;
  ytdPct: number;
}

export interface Concentration {
  top3BalancePct: number;
  top5BalancePct: number;
  totalCustomers: number;
}

export interface RegionData {
  region: string;
  projected: number;
  dispatchPlusOpen: number;
  balance: number;
  ytdPct: number;
  growthVsFy25Pct: number;
  customerCount: number;
}

export interface CountryData {
  country: string;
  region: string;
  projected: number;
  dispatchPlusOpen: number;
  balance: number;
  ytdPct: number;
  growthVsFy25Pct: number;
  customerCount: number;
}

export interface AtRiskByRegion {
  region: string;
  customer: string;
  salesman: string;
  balance: number;
  ytdPct: number;
}

export interface AtRiskCategory {
  category: string;
  ytdPct: number;
  balance: number;
  growthVsFy25Pct: number;
}

export interface CategoryMix {
  category: string;
  fy25Actual: number;
  fy26Projected: number;
  dispatchPlusOpen: number;
  balance: number;
}

export interface SalesmanVariance {
  meanYtdPct: number;
  minYtdPct: number;
  maxYtdPct: number;
  stdYtdPct: number;
}

export interface AtRiskCustomerCategory {
  customer: string;
  salesman: string;
  categories: { category: string; balance: number; ytdPct: number }[];
}

export interface AtRiskProductFamily {
  productFamily: string;
  projected: number;
  balance: number;
  ytdPct: number;
}

export interface PfMix {
  productFamily: string;
  projected: number;
  pctOfTotal: number;
}

export interface AtRiskSku {
  itemCode: string;
  itemName: string;
  category: string;
  balance: number;
  balanceQty: number;
  ytdPct: number;
  growthVsFy25Pct: number;
}

export interface Q4SkuBalance {
  itemCode: string;
  itemName: string;
  category: string;
  q4Balance: number;
  q4BalanceQty: number;
  q4OpenOrder: number;
}

export interface Q4CategoryBalance {
  category: string;
  q4Balance: number;
  q4BalanceQty: number;
}

export interface Q4PFBalance {
  productFamily: string;
  q4Balance: number;
  q4OpenOrder: number;
}

export interface Q4PullHeadsUp {
  note: string;
  topSkusByQ4Balance: Q4SkuBalance[];
  topCategoriesByQ4Balance: Q4CategoryBalance[];
  topPFsByQ4Balance: Q4PFBalance[];
}

export interface ZeroQ4DispatchSku {
  itemCode: string;
  itemName: string;
  balance: number;
}

export interface FinanceData {
  dataQuality: { totalCustomers: number; totalRowsProcessed: number };
  growthDistribution: { mean: number; min: number; max: number };
  categoryMixShift: { category: string; growthVsFy25Pct: number }[];
}

export interface SalespersonChase {
  customer: string;
  balance: number;
  ytdPct: number;
}

export interface SalespersonAtRisk {
  customer: string;
  ytdPct: number;
}

export interface SalespersonCategory {
  category: string;
  fy26Projected: number;
  dispatchPlusOpen: number;
  balance: number;
  ytdPct: number;
  growthVsFy25Pct: number;
}

export interface SalespersonSku {
  itemCode: string;
  itemName: string;
  category: string;
  fy26Projected: number;
  dispatchPlusOpen: number;
  balance: number;
  ytdPct: number;
  growthVsFy25Pct: number;
}

export interface SalespersonTopSkuToChase {
  itemCode: string;
  itemName: string;
  balance: number;
  customers: string[];
}

export interface SalespersonSkuByCustomer {
  customer: string;
  skus: { itemCode: string; itemName: string; balance: number; ytdPct: number }[];
}

export interface SalespersonRegion {
  region: string;
  projected: number;
  balance: number;
  ytdPct: number;
  customerCount: number;
}

export interface SalespersonProductFamily {
  productFamily: string;
  projected: number;
  balance: number;
  ytdPct: number;
}

export interface SalespersonData {
  ytdPct: number;
  balanceToAchieve: number;
  growthVsFy25Pct: number;
  top5ToChase: SalespersonChase[];
  atRiskCustomers: SalespersonAtRisk[];
  overachievers: { customer: string; ytdPct: number }[];
  zeroQ4Dispatch: { customer: string }[];
  q4PipelineCoverage: number;
  customerCount: number;
  myRegions: SalespersonRegion[];
  myProductFamilies: SalespersonProductFamily[];
  myCategories: SalespersonCategory[];
  mySkus: SalespersonSku[];
  myTopSkusToChase: SalespersonTopSkuToChase[];
  mySkusByCustomer: SalespersonSkuByCustomer[];
}

// ─── Data Extraction ─────────────────────────────────────────────────

const data = rawData as any;

export const lastUpdated: string = data.lastUpdated;

// Management
export const executiveSummary: ExecutiveSummary = data.management.executiveSummary;
export const fullYearGap: FullYearGap = data.management.fullYearGap;
export const quarterTrajectory: QuarterTrajectory[] = data.management.quarterTrajectory;
export const q4Gap: Q4Gap = data.management.q4Gap;
export const atRiskCustomers: AtRiskCustomer[] = data.management.atRiskCustomers;
export const behindTarget: BehindTarget[] = data.management.behindTarget;
export const concentration: Concentration = data.management.concentration;
export const byRegion: RegionData[] = data.management.byRegion;
export const byCountry: CountryData[] = data.management.byCountry;
export const atRiskByRegion: AtRiskByRegion[] = data.management.atRiskByRegion;
export const atRiskCategories: AtRiskCategory[] = data.management.atRiskCategories;
export const categoryMix: CategoryMix[] = data.management.categoryMix;
export const salesmanVariance: SalesmanVariance = data.management.salesmanVariance;
export const atRiskCustomerCategories: AtRiskCustomerCategory[] = data.management.atRiskCustomerCategories;
export const atRiskSkus: AtRiskSku[] = data.management.atRiskSkus;
export const q4PullHeadsUp: Q4PullHeadsUp = data.management.q4PullHeadsUp;
export const zeroQ4DispatchSkus: ZeroQ4DispatchSku[] = data.management.zeroQ4DispatchSkus;
export const atRiskProductFamilies: AtRiskProductFamily[] = data.management.atRiskProductFamilies;
export const pfMix: PfMix[] = data.management.pfMix;

// Finance
export const financeData: FinanceData = data.finance;

// Salesperson
export const salespersonData: Record<string, SalespersonData> = data.salesperson;
export const salesmenNames: string[] = Object.keys(data.salesperson);

// ─── Formatters ──────────────────────────────────────────────────────

export const formatCurrency = (value: number, compact = false): string => {
  if (compact) {
    const abs = Math.abs(value);
    if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(2)}M`;
    if (abs >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(0)}`;
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
};

export const formatQty = (value: number): string =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(value);

export const getStatusBg = (ytdPct: number): string => {
  if (ytdPct >= 90) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
  if (ytdPct >= 70) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
};

export const getStatusLabel = (ytdPct: number): string => {
  if (ytdPct >= 90) return 'On Track';
  if (ytdPct >= 70) return 'At Risk';
  return 'Behind';
};

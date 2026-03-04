// ADF Foods MIS Dashboard — Mock Data
// Aligned with output Data_Dashboard.xlsx structure

export interface AdfCustomer {
  customer: string;
  salesman: string;
  category: string;
  fy25_actual: number;
  fy26_projection: number;
  q1_dispatch: number;
  q2_dispatch: number;
  q3_dispatch: number;
  q4_dispatch: number;
  q4_open_order: number;
  balance: number;
  ytd_pct: number;
  growth_vs_fy25: number;
  fcl?: number;
  quantity?: number;
  currency?: string;
}

export interface AdfCategory {
  category: string;
  fy25_actual: number;
  fy26_projection: number;
  total_dispatch: number;
  balance: number;
  ytd_pct: number;
  growth_vs_fy25: number;
}

export interface AdfCompanyKpis {
  fy26_projection: number;
  total_dispatch: number;
  total_open_order: number;
  total_balance: number;
  ytd_pct: number;
  growth_vs_fy25: number;
  last_updated: string;
}

export interface AdfQuarterData {
  quarter: string;
  plan_pct: number;
  actual: number;
  target: number;
}

export const companyKpis: AdfCompanyKpis = {
  fy26_projection: 8500000,
  total_dispatch: 7065000,
  total_open_order: 185000,
  total_balance: 1250000,
  ytd_pct: 89,
  growth_vs_fy25: 4.2,
  last_updated: "2026-03-03",
};

export const quarterTrajectory: AdfQuarterData[] = [
  { quarter: "Q1", plan_pct: 20, actual: 1680000, target: 1700000 },
  { quarter: "Q2", plan_pct: 30, actual: 2580000, target: 2550000 },
  { quarter: "Q3", plan_pct: 30, actual: 2805000, target: 2550000 },
  { quarter: "Q4", plan_pct: 20, actual: 335000, target: 1700000 },
];

export const customers: AdfCustomer[] = [
  {
    customer: "JJR Global",
    salesman: "Upinder",
    category: "Frozen Bread",
    fy25_actual: 950000,
    fy26_projection: 1200000,
    q1_dispatch: 220000,
    q2_dispatch: 310000,
    q3_dispatch: 270000,
    q4_dispatch: 0,
    q4_open_order: 200000,
    balance: 200000,
    ytd_pct: 67,
    growth_vs_fy25: -16.0,
    fcl: 8,
    quantity: 4200,
    currency: "USD",
  },
  {
    customer: "ADF UK",
    salesman: "Upinder",
    category: "Frozen Snacks",
    fy25_actual: 1200000,
    fy26_projection: 1500000,
    q1_dispatch: 280000,
    q2_dispatch: 420000,
    q3_dispatch: 380000,
    q4_dispatch: 100000,
    q4_open_order: 200000,
    balance: 120000,
    ytd_pct: 92,
    growth_vs_fy25: 5.2,
    fcl: 12,
    quantity: 6100,
    currency: "GBP",
  },
  {
    customer: "ADF Holdings",
    salesman: "Upinder",
    category: "Frozen Vegetables",
    fy25_actual: 800000,
    fy26_projection: 1100000,
    q1_dispatch: 180000,
    q2_dispatch: 250000,
    q3_dispatch: 220000,
    q4_dispatch: 100000,
    q4_open_order: 0,
    balance: 150000,
    ytd_pct: 68,
    growth_vs_fy25: -6.3,
    fcl: 6,
    quantity: 3400,
    currency: "USD",
  },
  {
    customer: "Tesco UK",
    salesman: "Bharat",
    category: "Frozen Bread",
    fy25_actual: 700000,
    fy26_projection: 800000,
    q1_dispatch: 180000,
    q2_dispatch: 220000,
    q3_dispatch: 200000,
    q4_dispatch: 80000,
    q4_open_order: 50000,
    balance: 70000,
    ytd_pct: 91,
    growth_vs_fy25: 8.6,
    fcl: 5,
    quantity: 2800,
    currency: "GBP",
  },
  {
    customer: "Walmart US",
    salesman: "Bharat",
    category: "Frozen Snacks",
    fy25_actual: 600000,
    fy26_projection: 750000,
    q1_dispatch: 150000,
    q2_dispatch: 200000,
    q3_dispatch: 210000,
    q4_dispatch: 90000,
    q4_open_order: 0,
    balance: 100000,
    ytd_pct: 87,
    growth_vs_fy25: 8.3,
    fcl: 4,
    quantity: 2200,
    currency: "USD",
  },
  {
    customer: "Costco Canada",
    salesman: "Bharat",
    category: "Frozen Bread",
    fy25_actual: 500000,
    fy26_projection: 600000,
    q1_dispatch: 130000,
    q2_dispatch: 180000,
    q3_dispatch: 170000,
    q4_dispatch: 60000,
    q4_open_order: 0,
    balance: 60000,
    ytd_pct: 90,
    growth_vs_fy25: 8.0,
    fcl: 3,
    quantity: 1600,
    currency: "USD",
  },
  {
    customer: "Aldi EU",
    salesman: "Sumer",
    category: "Snacks New",
    fy25_actual: 450000,
    fy26_projection: 550000,
    q1_dispatch: 100000,
    q2_dispatch: 150000,
    q3_dispatch: 180000,
    q4_dispatch: 50000,
    q4_open_order: 20000,
    balance: 50000,
    ytd_pct: 91,
    growth_vs_fy25: 11.1,
    fcl: 3,
    quantity: 1400,
    currency: "USD",
  },
  {
    customer: "Lulu Middle East",
    salesman: "Sumer",
    category: "Frozen Vegetables",
    fy25_actual: 380000,
    fy26_projection: 500000,
    q1_dispatch: 90000,
    q2_dispatch: 140000,
    q3_dispatch: 155000,
    q4_dispatch: 45000,
    q4_open_order: 30000,
    balance: 40000,
    ytd_pct: 92,
    growth_vs_fy25: 21.1,
    fcl: 3,
    quantity: 1200,
    currency: "USD",
  },
  {
    customer: "Carrefour ME",
    salesman: "Sumer",
    category: "Frozen Snacks",
    fy25_actual: 320000,
    fy26_projection: 400000,
    q1_dispatch: 70000,
    q2_dispatch: 110000,
    q3_dispatch: 130000,
    q4_dispatch: 40000,
    q4_open_order: 15000,
    balance: 35000,
    ytd_pct: 91,
    growth_vs_fy25: 14.1,
    fcl: 2,
    quantity: 1000,
    currency: "USD",
  },
  {
    customer: "Asda UK",
    salesman: "Upinder",
    category: "Frozen Bread",
    fy25_actual: 280000,
    fy26_projection: 350000,
    q1_dispatch: 60000,
    q2_dispatch: 100000,
    q3_dispatch: 110000,
    q4_dispatch: 30000,
    q4_open_order: 20000,
    balance: 30000,
    ytd_pct: 91,
    growth_vs_fy25: 14.3,
    fcl: 2,
    quantity: 900,
    currency: "GBP",
  },
  {
    customer: "Metro Germany",
    salesman: "Bharat",
    category: "Snacks New",
    fy25_actual: 250000,
    fy26_projection: 400000,
    q1_dispatch: 50000,
    q2_dispatch: 100000,
    q3_dispatch: 120000,
    q4_dispatch: 50000,
    q4_open_order: 30000,
    balance: 50000,
    ytd_pct: 88,
    growth_vs_fy25: 40.0,
    fcl: 2,
    quantity: 800,
    currency: "USD",
  },
  {
    customer: "Spinneys Dubai",
    salesman: "Sumer",
    category: "Frozen Bread",
    fy25_actual: 220000,
    fy26_projection: 350000,
    q1_dispatch: 70000,
    q2_dispatch: 100000,
    q3_dispatch: 110000,
    q4_dispatch: 25000,
    q4_open_order: 0,
    balance: 45000,
    ytd_pct: 87,
    growth_vs_fy25: 38.6,
    fcl: 2,
    quantity: 700,
    currency: "USD",
  },
];

// Derived: categories
export const categories: AdfCategory[] = (() => {
  const catMap: Record<string, AdfCategory> = {};
  customers.forEach((c) => {
    if (!catMap[c.category]) {
      catMap[c.category] = {
        category: c.category,
        fy25_actual: 0,
        fy26_projection: 0,
        total_dispatch: 0,
        balance: 0,
        ytd_pct: 0,
        growth_vs_fy25: 0,
      };
    }
    const cat = catMap[c.category];
    cat.fy25_actual += c.fy25_actual;
    cat.fy26_projection += c.fy26_projection;
    cat.total_dispatch += c.q1_dispatch + c.q2_dispatch + c.q3_dispatch + c.q4_dispatch;
    cat.balance += c.balance;
  });
  return Object.values(catMap).map((cat) => ({
    ...cat,
    ytd_pct: Math.round(((cat.total_dispatch) / cat.fy26_projection) * 100),
    growth_vs_fy25: Math.round(((cat.total_dispatch - cat.fy25_actual) / cat.fy25_actual) * 1000) / 10,
  }));
})();

export const salesmen = ["Upinder", "Bharat", "Sumer"] as const;

export const financeStatus = {
  lastRefresh: "2026-03-03",
  q1Frozen: true,
  q2Frozen: true,
  q3Frozen: true,
  q4Incremental: true,
  unmappedSkus: 3,
  reconciliation: {
    standalone: 7065000,
    consolidated: 7120000,
    variance: 55000,
  },
};

// Helpers
export function formatCurrency(val: number, compact = false): string {
  if (compact) {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

export function getStatusColor(ytdPct: number): string {
  if (ytdPct >= 90) return "text-emerald-600";
  if (ytdPct >= 70) return "text-amber-600";
  return "text-red-600";
}

export function getStatusBg(ytdPct: number): string {
  if (ytdPct >= 90) return "bg-emerald-50 text-emerald-700 border-emerald-200";
  if (ytdPct >= 70) return "bg-amber-50 text-amber-700 border-amber-200";
  return "bg-red-50 text-red-700 border-red-200";
}

export function getStatusLabel(ytdPct: number): string {
  if (ytdPct >= 90) return "On Track";
  if (ytdPct >= 70) return "At Risk";
  return "Behind";
}

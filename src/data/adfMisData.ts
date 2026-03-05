// ADF Foods MIS Dashboard — Real Insights Data
// Source: adf_insights_sample.json (generated 2026-03-05)

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
  myCategories: SalespersonCategory[];
}

export interface FinanceData {
  dataQuality: { totalCustomers: number; totalRowsProcessed: number };
  growthDistribution: { mean: number; min: number; max: number };
  categoryMixShift: { category: string; growthVsFy25Pct: number }[];
}

// ─── Data ────────────────────────────────────────────────────────────

export const lastUpdated = "2026-03-05T10:21:18";

export const executiveSummary: ExecutiveSummary = {
  ytdAchievementPct: 85.1,
  balanceToAchieve: 9367222.63,
  growthVsFy25Pct: 5.7,
  totalProjected: 62980449.08,
  totalDispatchPlusOpen: 53613226.45,
};

export const fullYearGap: FullYearGap = {
  projectedAmt: 62980449.08,
  dispatchPlusOpenAmt: 53613226.45,
  balanceAmt: 9367222.63,
  projectedQty: 4695229,
  dispatchPlusOpenQty: 3709238,
  balanceQty: 985991,
  note: "Primary deficit to act on. Q4 may look achieved but full year can still have gap.",
};

export const quarterTrajectory: QuarterTrajectory[] = [
  { quarter: "Q1", planPct: 20, actualPct: 15.7, dispatch: 9914154.24, dispatchQty: 732445, projected: 11445562.53, projectedQty: 757674, balance: 1531408.29 },
  { quarter: "Q2", planPct: 30, actualPct: 23.1, dispatch: 14576834.17, dispatchQty: 981272, projected: 18698097.79, projectedQty: 1361813, balance: 4121263.62 },
  { quarter: "Q3", planPct: 30, actualPct: 22.6, dispatch: 14208533.05, dispatchQty: 955178, projected: 19011754.79, projectedQty: 1436622, balance: 4803221.74 },
  { quarter: "Q4", planPct: 20, actualPct: 23.7, dispatch: 7506139.72, dispatchQty: 465328, openOrder: 7407565.27, openOrderQty: 575015, dispatchPlusOpen: 14913704.99, projected: 13825033.53, projectedQty: 1139120, balance: -1088671.46 },
];

export const q4Gap: Q4Gap = {
  q4Projected: 13825033.53,
  q4ProjectedQty: 1139120,
  q4DispatchPlusOpen: 14913704.99,
  q4DispatchPlusOpenQty: 1040343,
  gap: -1088671.46,
  gapQty: 98777,
  note: "Q4 achieved ≠ full year achieved. See fullYearGap for primary deficit.",
};

export const atRiskCustomers: AtRiskCustomer[] = [
  { customer: "RITIKA\u2019S GLOBAL GRAINS LLC", salesman: "SUMER THAKKAR", balance: 2797864.97, balanceQty: 609219, ytdPct: 71.4, growthVsFy25: -16.9 },
  { customer: "ASIA EXPRESS FOOD", salesman: "SUMER THAKKAR", balance: 1727704.53, balanceQty: 127152, ytdPct: 36.3, growthVsFy25: 11.4 },
  { customer: "KK FOOD TRADING COMPANY LTD.", salesman: "BIMAL THAKKAR", balance: 1054871.53, balanceQty: 126586, ytdPct: 33.2, growthVsFy25: -16.6 },
  { customer: "ITN FOOD CORPORATION", salesman: "MASUD SETHI", balance: 699653.77, balanceQty: 35886, ytdPct: 12.6, growthVsFy25: -12.6 },
  { customer: "DILIP CERAMICS INC.", salesman: "SAVITA PATEL", balance: 653558.76, balanceQty: 20452, ytdPct: 87.7, growthVsFy25: -82.7 },
  { customer: "JJR GLOBAL INC", salesman: "CHHAYESH PATEL", balance: 574898.61, balanceQty: 27032, ytdPct: 41.6, growthVsFy25: -24.1 },
  { customer: "ANEJA DISTRIBUTORS INC", salesman: "SAVITA PATEL", balance: 572463.03, balanceQty: 11373, ytdPct: 31.7, growthVsFy25: -11.2 },
  { customer: "PANESAR FOODS LIMITED", salesman: "BIMAL THAKKAR", balance: 553744.66, balanceQty: -1020, ytdPct: 27.3, growthVsFy25: -27.3 },
  { customer: "MALA IMPEX T/A ROSHAN NAIDU ENTERPRISES", salesman: "PRAVIN NANKANI", balance: 513325.70, balanceQty: 23412, ytdPct: 59.0, growthVsFy25: 1.3 },
  { customer: "ZYKA FOODS SOUTHWEST INC.", salesman: "CHHAYESH PATEL", balance: 512474.89, balanceQty: 16342, ytdPct: 50.2, growthVsFy25: -35.3 },
];

export const behindTarget: BehindTarget[] = [
  { customer: "ASIA EXPRESS FOOD", salesman: "SUMER THAKKAR", ytdPct: 36.3 },
  { customer: "KK FOOD TRADING COMPANY LTD.", salesman: "BIMAL THAKKAR", ytdPct: 33.2 },
  { customer: "ITN FOOD CORPORATION", salesman: "MASUD SETHI", ytdPct: 12.6 },
  { customer: "JJR GLOBAL INC", salesman: "CHHAYESH PATEL", ytdPct: 41.6 },
  { customer: "ANEJA DISTRIBUTORS INC", salesman: "SAVITA PATEL", ytdPct: 31.7 },
  { customer: "PANESAR FOODS LIMITED", salesman: "BIMAL THAKKAR", ytdPct: 27.3 },
  { customer: "MALA IMPEX T/A ROSHAN NAIDU ENTERPRISES", salesman: "PRAVIN NANKANI", ytdPct: 59.0 },
  { customer: "ZYKA FOODS SOUTHWEST INC.", salesman: "CHHAYESH PATEL", ytdPct: 50.2 },
  { customer: "SANTOS AGENCY INC.", salesman: "NITESH BHAMBRI", ytdPct: 29.5 },
  { customer: "MALABAR FOODS PTY LTD", salesman: "PRAVIN NANKANI", ytdPct: 51.7 },
];

export const concentration: Concentration = {
  top3BalancePct: 59.6,
  top5BalancePct: 74.0,
  totalCustomers: 112,
};

export const atRiskCategories: AtRiskCategory[] = [
  { category: "EASI POUCH CURRIES", ytdPct: 55.7, balance: 712507.12, growthVsFy25Pct: 81.8 },
  { category: "SAUCE", ytdPct: 69.8, balance: 78760.52, growthVsFy25Pct: 27.3 },
  { category: "CHUTNEY BULK PACK", ytdPct: 67.8, balance: 11729.32, growthVsFy25Pct: 6.6 },
  { category: "PAPAD", ytdPct: 60.9, balance: 6467.32, growthVsFy25Pct: 32.9 },
  { category: "CAN READY TO EAT", ytdPct: 55.2, balance: 3736.38, growthVsFy25Pct: 57.1 },
  { category: "INDIAN SWEET (FROZEN)", ytdPct: 54.9, balance: 2750.25, growthVsFy25Pct: 33.2 },
  { category: "INDIAN READY TO EAT (FROZEN)", ytdPct: 59.5, balance: 1957.37, growthVsFy25Pct: 35.1 },
  { category: "CHUTNEY (FROZEN)", ytdPct: 57.3, balance: 1730.79, growthVsFy25Pct: 41.4 },
  { category: "PASTES (FROZEN)", ytdPct: 2.0, balance: 243.61, growthVsFy25Pct: 15.6 },
];

export const categoryMix: CategoryMix[] = [
  { category: "EASI POUCH CURRIES", fy25Actual: 883842, fy26Projected: 1606730.12, dispatchPlusOpen: 894223, balance: 712507.12 },
  { category: "NAAN (FROZEN)", fy25Actual: 341423, fy26Projected: 450617.45, dispatchPlusOpen: 365274, balance: 85343.45 },
  { category: "SAMOSA (FROZEN)", fy25Actual: 357678, fy26Projected: 428233.17, dispatchPlusOpen: 389652, balance: 38581.17 },
  { category: "PICKLES", fy25Actual: 461931, fy26Projected: 529883.88, dispatchPlusOpen: 427908, balance: 101975.88 },
  { category: "CHUTNEY BULK PACK", fy25Actual: 34176, fy26Projected: 36445.32, dispatchPlusOpen: 24716, balance: 11729.32 },
  { category: "PARATHA (FROZEN)", fy25Actual: 209854, fy26Projected: 272756.32, dispatchPlusOpen: 221688, balance: 51068.32 },
  { category: "SAUCE", fy25Actual: 205043, fy26Projected: 261089.52, dispatchPlusOpen: 182329, balance: 78760.52 },
  { category: "INDIAN SWEET (FROZEN)", fy25Actual: 4580, fy26Projected: 6100.25, dispatchPlusOpen: 3350, balance: 2750.25 },
  { category: "PASTES", fy25Actual: 109972, fy26Projected: 140910.85, dispatchPlusOpen: 123781, balance: 17129.85 },
  { category: "CHUTNEY CONSUMER PACK", fy25Actual: 355182, fy26Projected: 392384.31, dispatchPlusOpen: 377914, balance: 14470.31 },
  { category: "PAPAD", fy25Actual: 12451, fy26Projected: 16553.32, dispatchPlusOpen: 10086, balance: 6467.32 },
  { category: "SPICES", fy25Actual: 43463, fy26Projected: 55272.71, dispatchPlusOpen: 49099, balance: 6173.71 },
  { category: "INDIAN READY TO EAT (FROZEN)", fy25Actual: 3580, fy26Projected: 4835.37, dispatchPlusOpen: 2878, balance: 1957.37 },
  { category: "KATHI ROLL (FROZEN)", fy25Actual: 15407, fy26Projected: 16927.76, dispatchPlusOpen: 16352, balance: 575.76 },
  { category: "CAN READY TO EAT", fy25Actual: 5313, fy26Projected: 8346.38, dispatchPlusOpen: 4610, balance: 3736.38 },
  { category: "CHUTNEY (FROZEN)", fy25Actual: 2865, fy26Projected: 4050.79, dispatchPlusOpen: 2320, balance: 1730.79 },
  { category: "CAN VEGETABLE", fy25Actual: 5555, fy26Projected: 8752.14, dispatchPlusOpen: 8437, balance: 315.14 },
  { category: "PASTES (FROZEN)", fy25Actual: 215, fy26Projected: 248.61, dispatchPlusOpen: 5, balance: 243.61 },
  { category: "MURABBA", fy25Actual: 2659, fy26Projected: 3344.63, dispatchPlusOpen: 3794, balance: -449.37 },
  { category: "MILK PRODUCTS (FROZEN)", fy25Actual: 10516, fy26Projected: 12968.45, dispatchPlusOpen: 12163, balance: 805.45 },
  { category: "INDIAN SWEET", fy25Actual: 2533, fy26Projected: 2997.13, dispatchPlusOpen: 5403, balance: -2405.87 },
  { category: "PULP", fy25Actual: 37387, fy26Projected: 52934.21, dispatchPlusOpen: 71774, balance: -18839.79 },
  { category: "SNACKS", fy25Actual: 4366, fy26Projected: 6655.96, dispatchPlusOpen: 16648, balance: -9992.04 },
  { category: "MISCELLENEOUS PRODUCTS", fy25Actual: 8862, fy26Projected: 9557.15, dispatchPlusOpen: 21300, balance: -11742.85 },
  { category: "INDIAN SNACKS (FROZEN)", fy25Actual: 51991, fy26Projected: 63344.34, dispatchPlusOpen: 84699, balance: -21354.66 },
  { category: "TAMARIND", fy25Actual: 29999, fy26Projected: 38033.34, dispatchPlusOpen: 66770, balance: -28736.66 },
  { category: "INDIAN VEGETABLE (FROZEN)", fy25Actual: 187780, fy26Projected: 265255.53, dispatchPlusOpen: 322065, balance: -56809.47 },
];

export const salesmanVariance: SalesmanVariance = {
  meanYtdPct: 90.5,
  minYtdPct: 57.1,
  maxYtdPct: 141.8,
  stdYtdPct: 26.0,
};

export const atRiskCustomerCategories: AtRiskCustomerCategory[] = [
  {
    customer: "DILIP CERAMICS INC.", salesman: "SAVITA PATEL",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 432419.93, ytdPct: 89.8 },
      { category: "NAAN (FROZEN)", balance: 109716.29, ytdPct: 87.9 },
      { category: "PARATHA (FROZEN)", balance: 47026.17, ytdPct: 85.3 },
      { category: "EASI POUCH CURRIES", balance: 36985.63, ytdPct: 100.0 },
      { category: "INDIAN SNACKS (FROZEN)", balance: 21895.37, ytdPct: 96.4 },
    ],
  },
  {
    customer: "RITIKA\u2019S GLOBAL GRAINS LLC", salesman: "SUMER THAKKAR",
    categories: [{ category: "EASI POUCH CURRIES", balance: 2797864.97, ytdPct: 71.4 }],
  },
  {
    customer: "JJR GLOBAL INC", salesman: "CHHAYESH PATEL",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 224366.04, ytdPct: 34.0 },
      { category: "NAAN (FROZEN)", balance: 177451.82, ytdPct: 59.8 },
      { category: "PARATHA (FROZEN)", balance: 51675.59, ytdPct: 38.3 },
      { category: "EASI POUCH CURRIES", balance: 29224.84, ytdPct: 68.2 },
      { category: "INDIAN SNACKS (FROZEN)", balance: 20894.13, ytdPct: 46.2 },
    ],
  },
  {
    customer: "ANEJA DISTRIBUTORS INC", salesman: "SAVITA PATEL",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 529101.90, ytdPct: 33.6 },
      { category: "NAAN (FROZEN)", balance: 65126.99, ytdPct: 39.1 },
      { category: "PARATHA (FROZEN)", balance: 15210.22, ytdPct: 56.0 },
      { category: "EASI POUCH CURRIES", balance: 13847.22, ytdPct: 100.0 },
      { category: "SPICES", balance: 6272.03, ytdPct: 100.0 },
    ],
  },
  {
    customer: "SANTOS AGENCY INC.", salesman: "NITESH BHAMBRI",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 203267.19, ytdPct: 21.4 },
      { category: "NAAN (FROZEN)", balance: 188460.84, ytdPct: 59.6 },
      { category: "INDIAN SWEET (FROZEN)", balance: 77093.93, ytdPct: 97.9 },
      { category: "PULP", balance: 28801.54, ytdPct: 95.4 },
      { category: "PARATHA (FROZEN)", balance: 24443.21, ytdPct: 22.2 },
    ],
  },
  {
    customer: "ZYKA FOODS SOUTHWEST INC.", salesman: "CHHAYESH PATEL",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 193094.20, ytdPct: 33.5 },
      { category: "NAAN (FROZEN)", balance: 134551.31, ytdPct: 72.5 },
      { category: "PARATHA (FROZEN)", balance: 83518.29, ytdPct: 86.7 },
      { category: "INDIAN VEGETABLE (FROZEN)", balance: 20441.78, ytdPct: 79.1 },
      { category: "INDIAN SWEET (FROZEN)", balance: 16311.28, ytdPct: 72.7 },
    ],
  },
  {
    customer: "MALABAR FOODS PTY LTD", salesman: "PRAVIN NANKANI",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 276942.67, ytdPct: 63.2 },
      { category: "CHUTNEY BULK PACK", balance: 28123.25, ytdPct: 59.5 },
      { category: "EASI POUCH CURRIES", balance: 27842.37, ytdPct: 74.1 },
      { category: "INDIAN VEGETABLE (FROZEN)", balance: 17541.90, ytdPct: 22.6 },
      { category: "PARATHA (FROZEN)", balance: 16101.74, ytdPct: 42.2 },
    ],
  },
  {
    customer: "ASIA EXPRESS FOOD", salesman: "SUMER THAKKAR",
    categories: [
      { category: "EASI POUCH CURRIES", balance: 418165.99, ytdPct: 48.0 },
      { category: "PARATHA (FROZEN)", balance: 394037.24, ytdPct: 38.9 },
      { category: "NAAN (FROZEN)", balance: 348997.06, ytdPct: 31.7 },
      { category: "SAMOSA (FROZEN)", balance: 149601.14, ytdPct: 29.2 },
      { category: "INDIAN VEGETABLE (FROZEN)", balance: 118537.32, ytdPct: 25.0 },
    ],
  },
  {
    customer: "PANESAR FOODS LIMITED", salesman: "BIMAL THAKKAR",
    categories: [
      { category: "CHUTNEY BULK PACK", balance: 585275.26, ytdPct: 30.8 },
      { category: "PICKLES", balance: -10215.00, ytdPct: -0.1 },
    ],
  },
  {
    customer: "ITN FOOD CORPORATION", salesman: "MASUD SETHI",
    categories: [
      { category: "EASI POUCH CURRIES", balance: 609925.23, ytdPct: 78.6 },
      { category: "NAAN (FROZEN)", balance: 404167.08, ytdPct: 23.6 },
      { category: "PARATHA (FROZEN)", balance: 190532.71, ytdPct: 13.1 },
      { category: "PICKLES", balance: 97388.97, ytdPct: 69.6 },
      { category: "PULP", balance: 16292.00, ytdPct: 100.0 },
    ],
  },
  {
    customer: "MALA IMPEX T/A ROSHAN NAIDU ENTERPRISES", salesman: "PRAVIN NANKANI",
    categories: [
      { category: "SAMOSA (FROZEN)", balance: 151292.80, ytdPct: 72.7 },
      { category: "INDIAN VEGETABLE (FROZEN)", balance: 108535.62, ytdPct: 79.4 },
      { category: "CHUTNEY BULK PACK", balance: 86207.29, ytdPct: 59.7 },
      { category: "PASTES", balance: 43882.95, ytdPct: 45.4 },
      { category: "PICKLES", balance: 21450.00, ytdPct: 44.7 },
    ],
  },
  {
    customer: "KK FOOD TRADING COMPANY LTD.", salesman: "BIMAL THAKKAR",
    categories: [
      { category: "NAAN (FROZEN)", balance: 433415.89, ytdPct: 49.3 },
      { category: "SAUCE", balance: 375405.03, ytdPct: 29.8 },
      { category: "CHUTNEY CONSUMER PACK", balance: 99835.62, ytdPct: 20.5 },
      { category: "PASTES", balance: 50557.78, ytdPct: 24.7 },
      { category: "PAPAD", balance: 40152.85, ytdPct: 31.9 },
    ],
  },
];

export const salespersonData: Record<string, SalespersonData> = {
  "SUMER THAKKAR": {
    ytdPct: 58.7, balanceToAchieve: 4436559.65, growthVsFy25Pct: 26.4,
    top5ToChase: [
      { customer: "RITIKA\u2019S GLOBAL GRAINS LLC", balance: 2797864.97, ytdPct: 71.4 },
      { customer: "ASIA EXPRESS FOOD", balance: 1727704.53, ytdPct: 36.3 },
      { customer: "ADF FOODS UK LTD", balance: 300225.92, ytdPct: 31.9 },
      { customer: "VIBRANT BRANDS LTD T/A WORLD FOODS FROZEN & CHILLED", balance: 239327.73, ytdPct: 86.3 },
      { customer: "RAJA FOODS L L C", balance: 175134.98, ytdPct: 20.6 },
    ],
    atRiskCustomers: [
      { customer: "ASIA EXPRESS FOOD", ytdPct: 36.3 },
      { customer: "ADF FOODS UK LTD", ytdPct: 31.9 },
      { customer: "RAJA FOODS L L C", ytdPct: 20.6 },
    ],
    overachievers: [], zeroQ4Dispatch: [], q4PipelineCoverage: 1.36, customerCount: 9,
    myCategories: [
      { category: "EASI POUCH CURRIES", fy26Projected: 5484830.45, dispatchPlusOpen: 1897721.86, balance: 3587108.59, ytdPct: 34.6, growthVsFy25Pct: -12.8 },
      { category: "PARATHA (FROZEN)", fy26Projected: 1012762.78, dispatchPlusOpen: 690229.69, balance: 322533.09, ytdPct: 68.2, growthVsFy25Pct: 16.4 },
      { category: "NAAN (FROZEN)", fy26Projected: 1378099.0, dispatchPlusOpen: 1065835.71, balance: 312263.29, ytdPct: 77.3, growthVsFy25Pct: 26.2 },
      { category: "PICKLES", fy26Projected: 488718.42, dispatchPlusOpen: 285102.03, balance: 203616.39, ytdPct: 58.3, growthVsFy25Pct: -1.6 },
      { category: "PASTES", fy26Projected: 257353.67, dispatchPlusOpen: 145317.59, balance: 112036.08, ytdPct: 56.5, growthVsFy25Pct: -1.3 },
      { category: "SAMOSA (FROZEN)", fy26Projected: 512657.29, dispatchPlusOpen: 410467.46, balance: 102189.83, ytdPct: 80.1, growthVsFy25Pct: 32.0 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 132583.55, dispatchPlusOpen: 90761.7, balance: 41821.85, ytdPct: 68.5, growthVsFy25Pct: 19.7 },
      { category: "SNACKS", fy26Projected: 66166.2, dispatchPlusOpen: 36818.14, balance: 29348.06, ytdPct: 55.6, growthVsFy25Pct: -2.7 },
      { category: "PAPAD", fy26Projected: 37224.01, dispatchPlusOpen: 15576.2, balance: 21647.81, ytdPct: 41.8, growthVsFy25Pct: -26.9 },
      { category: "CAN VEGETABLE", fy26Projected: 12944.76, dispatchPlusOpen: 4589.25, balance: 8355.51, ytdPct: 35.5, growthVsFy25Pct: -38.0 },
    ],
  },
  "BIMAL THAKKAR": {
    ytdPct: 88.7, balanceToAchieve: 1694100.43, growthVsFy25Pct: -9.0,
    top5ToChase: [
      { customer: "KK FOOD TRADING COMPANY LTD.", balance: 1054871.53, ytdPct: 33.2 },
      { customer: "PANESAR FOODS LIMITED", balance: 553744.66, ytdPct: 27.3 },
      { customer: "AB WORLD FOODS LTD", balance: 252942.10, ytdPct: 7.9 },
      { customer: "WERNERS GOURMET SERVICE AB", balance: 142713.50, ytdPct: 38.4 },
      { customer: "SOP INTERNATIONAL LTD.", balance: 60590.00, ytdPct: 100.0 },
    ],
    atRiskCustomers: [
      { customer: "KK FOOD TRADING COMPANY LTD.", ytdPct: 33.2 },
      { customer: "PANESAR FOODS LIMITED", ytdPct: 27.3 },
      { customer: "AB WORLD FOODS LTD", ytdPct: 7.9 },
      { customer: "WERNERS GOURMET SERVICE AB", ytdPct: 38.4 },
      { customer: "KTC (EDIBLES) LTD.", ytdPct: 57.3 },
    ],
    overachievers: [],
    zeroQ4Dispatch: [
      { customer: "SOP INTERNATIONAL LTD." }, { customer: "KTC (EDIBLES) LTD." },
      { customer: "LAXMI HOUSE OF SPICES (CANADA) INC." }, { customer: "COMMISSARIAT IMPORTS INC." },
      { customer: "AIC-INCORPORATED" },
    ],
    q4PipelineCoverage: 0.77, customerCount: 19,
    myCategories: [
      { category: "CHUTNEY BULK PACK", fy26Projected: 3015506.67, dispatchPlusOpen: 2043681.71, balance: 971824.96, ytdPct: 67.8, growthVsFy25Pct: -44.7 },
      { category: "NAAN (FROZEN)", fy26Projected: 2004936.06, dispatchPlusOpen: 1476987.77, balance: 527948.29, ytdPct: 73.7, growthVsFy25Pct: -19.3 },
      { category: "SAUCE", fy26Projected: 1274302.82, dispatchPlusOpen: 892285.79, balance: 382017.03, ytdPct: 70.0, growthVsFy25Pct: -12.7 },
      { category: "EASI POUCH CURRIES", fy26Projected: 2797894.62, dispatchPlusOpen: 2614320.28, balance: 183574.34, ytdPct: 93.4, growthVsFy25Pct: -6.1 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 1660718.77, dispatchPlusOpen: 1506266.4, balance: 154452.37, ytdPct: 90.7, growthVsFy25Pct: -4.2 },
      { category: "PICKLES", fy26Projected: 1264342.34, dispatchPlusOpen: 1132065.38, balance: 132276.96, ytdPct: 89.5, growthVsFy25Pct: -4.1 },
      { category: "PAPAD", fy26Projected: 126015.35, dispatchPlusOpen: 85862.5, balance: 40152.85, ytdPct: 68.1, growthVsFy25Pct: -14.8 },
      { category: "PULP", fy26Projected: 27263.73, dispatchPlusOpen: 23771.64, balance: 3492.09, ytdPct: 87.2, growthVsFy25Pct: 9.0 },
      { category: "INDIAN SNACKS (FROZEN)", fy26Projected: 18.74, dispatchPlusOpen: 0.0, balance: 18.74, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "PASTES", fy26Projected: 233569.13, dispatchPlusOpen: 237154.91, balance: -3585.78, ytdPct: 101.5, growthVsFy25Pct: 23.2 },
    ],
  },
  "MASUD SETHI": {
    ytdPct: 91.5, balanceToAchieve: 546147.48, growthVsFy25Pct: -3.9,
    top5ToChase: [
      { customer: "ITN FOOD CORPORATION", balance: 699653.77, ytdPct: 12.6 },
      { customer: "NUTRIFRESH WEST LTD", balance: 159228.10, ytdPct: 74.9 },
      { customer: "GAGAN FOODS INTERNATIONAL LTD.", balance: 125438.27, ytdPct: 38.2 },
      { customer: "FRUITICANA PRODUCE LTD", balance: 78246.39, ytdPct: 23.4 },
    ],
    atRiskCustomers: [
      { customer: "ITN FOOD CORPORATION", ytdPct: 12.6 },
      { customer: "GAGAN FOODS INTERNATIONAL LTD.", ytdPct: 38.2 },
      { customer: "FRUITICANA PRODUCE LTD", ytdPct: 23.4 },
    ],
    overachievers: [], zeroQ4Dispatch: [{ customer: "NUTRIFRESH WEST LTD" }],
    q4PipelineCoverage: 1.58, customerCount: 5,
    myCategories: [
      { category: "EASI POUCH CURRIES", fy26Projected: 837577.97, dispatchPlusOpen: 190482.3, balance: 647095.67, ytdPct: 22.7, growthVsFy25Pct: -76.3 },
      { category: "NAAN (FROZEN)", fy26Projected: 1790360.98, dispatchPlusOpen: 1515387.58, balance: 274973.4, ytdPct: 84.6, growthVsFy25Pct: -14.2 },
      { category: "PARATHA (FROZEN)", fy26Projected: 1598727.92, dispatchPlusOpen: 1424868.1, balance: 173859.82, ytdPct: 89.1, growthVsFy25Pct: -8.1 },
      { category: "PICKLES", fy26Projected: 232608.2, dispatchPlusOpen: 90326.5, balance: 142281.7, ytdPct: 38.8, growthVsFy25Pct: -52.7 },
      { category: "INDIAN READY TO EAT (FROZEN)", fy26Projected: 35103.92, dispatchPlusOpen: 2259.0, balance: 32844.92, ytdPct: 6.4, growthVsFy25Pct: -91.5 },
      { category: "PULP", fy26Projected: 194583.74, dispatchPlusOpen: 167119.84, balance: 27463.9, ytdPct: 85.9, growthVsFy25Pct: 20.7 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 64299.33, dispatchPlusOpen: 49173.41, balance: 15125.92, ytdPct: 76.5, growthVsFy25Pct: -17.4 },
      { category: "PASTES", fy26Projected: 68366.63, dispatchPlusOpen: 54548.23, balance: 13818.4, ytdPct: 79.8, growthVsFy25Pct: 23.7 },
      { category: "CHUTNEY (FROZEN)", fy26Projected: 16734.72, dispatchPlusOpen: 4860.0, balance: 11874.72, ytdPct: 29.0, growthVsFy25Pct: -71.0 },
      { category: "KATHI ROLL (FROZEN)", fy26Projected: 212192.2, dispatchPlusOpen: 210095.91, balance: 2096.29, ytdPct: 99.0, growthVsFy25Pct: -0.5 },
    ],
  },
  "SAVITA PATEL": {
    ytdPct: 86.0, balanceToAchieve: 713363.14, growthVsFy25Pct: -16.4,
    top5ToChase: [
      { customer: "DILIP CERAMICS INC.", balance: 653558.76, ytdPct: 87.7 },
      { customer: "ANEJA DISTRIBUTORS INC", balance: 572463.03, ytdPct: 31.7 },
      { customer: "GRACE IMPORTS", balance: 307450.14, ytdPct: 36.7 },
    ],
    atRiskCustomers: [
      { customer: "ANEJA DISTRIBUTORS INC", ytdPct: 31.7 },
      { customer: "GRACE IMPORTS", ytdPct: 36.7 },
    ],
    overachievers: [], zeroQ4Dispatch: [{ customer: "DILIP CERAMICS INC." }],
    q4PipelineCoverage: 0.96, customerCount: 7,
    myCategories: [
      { category: "SAMOSA (FROZEN)", fy26Projected: 3804152.7, dispatchPlusOpen: 2940377.77, balance: 863774.93, ytdPct: 77.3, growthVsFy25Pct: -26.0 },
      { category: "NAAN (FROZEN)", fy26Projected: 699474.39, dispatchPlusOpen: 468410.77, balance: 231063.62, ytdPct: 67.0, growthVsFy25Pct: -27.5 },
      { category: "PARATHA (FROZEN)", fy26Projected: 196511.44, dispatchPlusOpen: 143055.59, balance: 53455.85, ytdPct: 72.8, growthVsFy25Pct: -30.1 },
      { category: "INDIAN SWEET (FROZEN)", fy26Projected: 31823.37, dispatchPlusOpen: 1592.28, balance: 30231.09, ytdPct: 5.0, growthVsFy25Pct: -94.5 },
      { category: "INDIAN SNACKS (FROZEN)", fy26Projected: 59548.74, dispatchPlusOpen: 43610.89, balance: 15937.85, ytdPct: 73.2, growthVsFy25Pct: -37.3 },
      { category: "EASI POUCH CURRIES", fy26Projected: 70516.4, dispatchPlusOpen: 57565.65, balance: 12950.75, ytdPct: 81.6, growthVsFy25Pct: 6.7 },
      { category: "SPICES", fy26Projected: 12773.17, dispatchPlusOpen: 3627.44, balance: 9145.73, ytdPct: 28.4, growthVsFy25Pct: -65.8 },
      { category: "MILK PRODUCTS (FROZEN)", fy26Projected: 8641.7, dispatchPlusOpen: 0.0, balance: 8641.7, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "INDIAN SWEET", fy26Projected: 7287.08, dispatchPlusOpen: 2620.5, balance: 4666.58, ytdPct: 36.0, growthVsFy25Pct: -59.4 },
      { category: "INDIAN READY TO EAT (FROZEN)", fy26Projected: 10411.19, dispatchPlusOpen: 6719.29, balance: 3691.9, ytdPct: 64.5, growthVsFy25Pct: -24.8 },
    ],
  },
  "CHHAYESH PATEL": {
    ytdPct: 84.8, balanceToAchieve: 492717.66, growthVsFy25Pct: 10.2,
    top5ToChase: [
      { customer: "JJR GLOBAL INC", balance: 574898.61, ytdPct: 41.6 },
      { customer: "ZYKA FOODS SOUTHWEST INC.", balance: 512474.89, ytdPct: 50.2 },
    ],
    atRiskCustomers: [
      { customer: "JJR GLOBAL INC", ytdPct: 41.6 },
      { customer: "ZYKA FOODS SOUTHWEST INC.", ytdPct: 50.2 },
    ],
    overachievers: [], zeroQ4Dispatch: [], q4PipelineCoverage: 0.86, customerCount: 4,
    myCategories: [
      { category: "NAAN (FROZEN)", fy26Projected: 672342.98, dispatchPlusOpen: 253390.57, balance: 418952.41, ytdPct: 37.7, growthVsFy25Pct: -51.0 },
      { category: "SAMOSA (FROZEN)", fy26Projected: 1716874.57, dispatchPlusOpen: 1437391.95, balance: 279482.62, ytdPct: 83.7, growthVsFy25Pct: 8.8 },
      { category: "PARATHA (FROZEN)", fy26Projected: 306652.81, dispatchPlusOpen: 209609.57, balance: 97043.24, ytdPct: 68.4, growthVsFy25Pct: -11.1 },
      { category: "INDIAN SWEET (FROZEN)", fy26Projected: 64899.21, dispatchPlusOpen: 39597.9, balance: 25301.31, ytdPct: 61.0, growthVsFy25Pct: -20.7 },
      { category: "EASI POUCH CURRIES", fy26Projected: 66978.64, dispatchPlusOpen: 42589.47, balance: 24389.17, ytdPct: 63.6, growthVsFy25Pct: -17.3 },
      { category: "PASTES", fy26Projected: 42040.36, dispatchPlusOpen: 19083.52, balance: 22956.84, ytdPct: 45.4, growthVsFy25Pct: -41.0 },
      { category: "PULP", fy26Projected: 11365.08, dispatchPlusOpen: 3092.35, balance: 8272.73, ytdPct: 27.2, growthVsFy25Pct: -64.6 },
      { category: "SAUCE", fy26Projected: 9246.76, dispatchPlusOpen: 3813.75, balance: 5433.01, ytdPct: 41.2, growthVsFy25Pct: -46.4 },
      { category: "SPICES", fy26Projected: 20902.9, dispatchPlusOpen: 15552.09, balance: 5350.8, ytdPct: 74.4, growthVsFy25Pct: -3.3 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 24729.81, dispatchPlusOpen: 19616.21, balance: 5113.6, ytdPct: 79.3, growthVsFy25Pct: 3.1 },
    ],
  },
  "PRAVIN NANKANI": {
    ytdPct: 76.9, balanceToAchieve: 2412692.98, growthVsFy25Pct: -6.5,
    top5ToChase: [
      { customer: "MALA IMPEX T/A ROSHAN NAIDU ENTERPRISES", balance: 513325.70, ytdPct: 59.0 },
      { customer: "MALABAR FOODS PTY LTD", balance: 401337.09, ytdPct: 51.7 },
      { customer: "KAMALA OVERSEAS LIMITED", balance: 382588.77, ytdPct: 100.0 },
      { customer: "PRIME TRADING CO. LLC", balance: 220155.40, ytdPct: 61.5 },
      { customer: "CONTINENTAL MARKETING PTY LTD", balance: 206711.97, ytdPct: 66.8 },
    ],
    atRiskCustomers: [
      { customer: "MALA IMPEX T/A ROSHAN NAIDU ENTERPRISES", ytdPct: 59.0 },
      { customer: "MALABAR FOODS PTY LTD", ytdPct: 51.7 },
      { customer: "PRIME TRADING CO. LLC", ytdPct: 61.5 },
      { customer: "CONTINENTAL MARKETING PTY LTD", ytdPct: 66.8 },
      { customer: "AL-THAQEB TRADING COMPANY", ytdPct: 39.2 },
    ],
    overachievers: [],
    zeroQ4Dispatch: [
      { customer: "KAMALA OVERSEAS LIMITED" }, { customer: "CONTINENTAL MARKETING PTY LTD" },
      { customer: "PUNJAS PTE LIMITED" }, { customer: "ARD ALFORAT FOR STORAGE & GENERAL TRADING CO." },
      { customer: "NEW DELHI STORE LTD" },
    ],
    q4PipelineCoverage: 0.67, customerCount: 39,
    myCategories: [
      { category: "PICKLES", fy26Projected: 2554745.78, dispatchPlusOpen: 1908101.53, balance: 646644.25, ytdPct: 74.7, growthVsFy25Pct: -15.7 },
      { category: "SAMOSA (FROZEN)", fy26Projected: 1188651.8, dispatchPlusOpen: 587445.52, balance: 601206.28, ytdPct: 49.4, growthVsFy25Pct: -20.7 },
      { category: "INDIAN VEGETABLE (FROZEN)", fy26Projected: 1435099.72, dispatchPlusOpen: 1156569.43, balance: 278530.29, ytdPct: 80.6, growthVsFy25Pct: -7.2 },
      { category: "SPICES", fy26Projected: 857016.89, dispatchPlusOpen: 643200.36, balance: 213816.53, ytdPct: 75.1, growthVsFy25Pct: -15.2 },
      { category: "CHUTNEY BULK PACK", fy26Projected: 249773.69, dispatchPlusOpen: 148789.54, balance: 100984.15, ytdPct: 59.6, growthVsFy25Pct: -13.8 },
      { category: "INDIAN SNACKS (FROZEN)", fy26Projected: 238068.36, dispatchPlusOpen: 145257.1, balance: 92811.26, ytdPct: 61.0, growthVsFy25Pct: -26.1 },
      { category: "MILK PRODUCTS (FROZEN)", fy26Projected: 443873.02, dispatchPlusOpen: 356482.14, balance: 87390.88, ytdPct: 80.3, growthVsFy25Pct: -3.7 },
      { category: "MISCELLENEOUS PRODUCTS", fy26Projected: 145601.48, dispatchPlusOpen: 58375.28, balance: 87226.2, ytdPct: 40.1, growthVsFy25Pct: -54.4 },
      { category: "PARATHA (FROZEN)", fy26Projected: 1593957.09, dispatchPlusOpen: 1515266.54, balance: 78690.55, ytdPct: 95.1, growthVsFy25Pct: 18.0 },
      { category: "EASI POUCH CURRIES", fy26Projected: 212413.94, dispatchPlusOpen: 160742.83, balance: 51671.11, ytdPct: 75.7, growthVsFy25Pct: -10.3 },
    ],
  },
  "NITESH BHAMBRI": {
    ytdPct: 92.4, balanceToAchieve: 372564.98, growthVsFy25Pct: 26.0,
    top5ToChase: [
      { customer: "SANTOS AGENCY INC.", balance: 501636.28, ytdPct: 29.5 },
      { customer: "MALABAR FOOD PRODUCTS, LLC.", balance: 152817.86, ytdPct: 10.2 },
      { customer: "PUNJAB TRADING INC", balance: 149985.53, ytdPct: 16.2 },
    ],
    atRiskCustomers: [
      { customer: "SANTOS AGENCY INC.", ytdPct: 29.5 },
      { customer: "MALABAR FOOD PRODUCTS, LLC.", ytdPct: 10.2 },
      { customer: "PUNJAB TRADING INC", ytdPct: 16.2 },
    ],
    overachievers: [], zeroQ4Dispatch: [], q4PipelineCoverage: 1.1, customerCount: 7,
    myCategories: [
      { category: "SAMOSA (FROZEN)", fy26Projected: 3080523.95, dispatchPlusOpen: 2789247.48, balance: 291276.47, ytdPct: 90.5, growthVsFy25Pct: 20.3 },
      { category: "NAAN (FROZEN)", fy26Projected: 650551.66, dispatchPlusOpen: 441243.56, balance: 209308.1, ytdPct: 67.8, growthVsFy25Pct: -4.7 },
      { category: "INDIAN SWEET (FROZEN)", fy26Projected: 140302.62, dispatchPlusOpen: 48203.25, balance: 92099.37, ytdPct: 34.4, growthVsFy25Pct: -52.6 },
      { category: "PARATHA (FROZEN)", fy26Projected: 314947.05, dispatchPlusOpen: 257973.39, balance: 56973.66, ytdPct: 81.9, growthVsFy25Pct: 13.2 },
      { category: "EASI POUCH CURRIES", fy26Projected: 120178.65, dispatchPlusOpen: 70273.03, balance: 49905.62, ytdPct: 58.5, growthVsFy25Pct: 16.3 },
      { category: "PULP", fy26Projected: 84391.69, dispatchPlusOpen: 50179.35, balance: 34212.34, ytdPct: 59.5, growthVsFy25Pct: -28.6 },
      { category: "SAUCE", fy26Projected: 13580.44, dispatchPlusOpen: 3319.68, balance: 10260.76, ytdPct: 24.4, growthVsFy25Pct: -54.4 },
      { category: "INDIAN READY TO EAT (FROZEN)", fy26Projected: 15373.36, dispatchPlusOpen: 6693.3, balance: 8680.06, ytdPct: 43.5, growthVsFy25Pct: -42.8 },
      { category: "KATHI ROLL (FROZEN)", fy26Projected: 41654.43, dispatchPlusOpen: 33199.75, balance: 8454.68, ytdPct: 79.7, growthVsFy25Pct: 23.3 },
      { category: "CHUTNEY BULK PACK", fy26Projected: 43949.04, dispatchPlusOpen: 37020.43, balance: 6928.61, ytdPct: 84.2, growthVsFy25Pct: 7.8 },
    ],
  },
  "BHARAT SAREEN": {
    ytdPct: 57.1, balanceToAchieve: 591964.59, growthVsFy25Pct: -27.8,
    top5ToChase: [
      { customer: "ADF FOODS UK LTD", balance: 350091.94, ytdPct: 57.6 },
      { customer: "GLOBE FOODS UK LIMITED", balance: 330386.56, ytdPct: 47.4 },
      { customer: "ANJU ENTERPRISES", balance: 7810.24, ytdPct: 10.3 },
    ],
    atRiskCustomers: [
      { customer: "ADF FOODS UK LTD", ytdPct: 57.6 },
      { customer: "GLOBE FOODS UK LIMITED", ytdPct: 47.4 },
      { customer: "ANJU ENTERPRISES", ytdPct: 10.3 },
    ],
    overachievers: [], zeroQ4Dispatch: [], q4PipelineCoverage: 4.3, customerCount: 4,
    myCategories: [
      { category: "EASI POUCH CURRIES", fy26Projected: 332922.23, dispatchPlusOpen: 197445.76, balance: 135476.47, ytdPct: 59.3, growthVsFy25Pct: -19.7 },
      { category: "PARATHA (FROZEN)", fy26Projected: 196992.23, dispatchPlusOpen: 66572.93, balance: 130419.3, ytdPct: 33.8, growthVsFy25Pct: -59.7 },
      { category: "INDIAN VEGETABLE (FROZEN)", fy26Projected: 215054.3, dispatchPlusOpen: 117365.03, balance: 97689.27, ytdPct: 54.6, growthVsFy25Pct: -30.3 },
      { category: "PICKLES", fy26Projected: 305563.71, dispatchPlusOpen: 221185.99, balance: 84377.72, ytdPct: 72.4, growthVsFy25Pct: -7.0 },
      { category: "INDIAN SNACKS (FROZEN)", fy26Projected: 99405.87, dispatchPlusOpen: 35811.52, balance: 63594.35, ytdPct: 36.0, growthVsFy25Pct: -58.3 },
      { category: "SAMOSA (FROZEN)", fy26Projected: 69900.08, dispatchPlusOpen: 26523.73, balance: 43376.35, ytdPct: 37.9, growthVsFy25Pct: -63.7 },
      { category: "CAN VEGETABLE", fy26Projected: 42041.77, dispatchPlusOpen: 23546.38, balance: 18495.39, ytdPct: 56.0, growthVsFy25Pct: -3.0 },
      { category: "KATHI ROLL (FROZEN)", fy26Projected: 21034.0, dispatchPlusOpen: 5839.09, balance: 15194.91, ytdPct: 27.8, growthVsFy25Pct: -63.9 },
      { category: "SPICES", fy26Projected: 6494.0, dispatchPlusOpen: 0.0, balance: 6494.0, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 47048.39, dispatchPlusOpen: 41478.18, balance: 5570.21, ytdPct: 88.2, growthVsFy25Pct: 16.8 },
    ],
  },
  "UPINDER SINGH": {
    ytdPct: 85.5, balanceToAchieve: 159920.91, growthVsFy25Pct: 50.3,
    top5ToChase: [
      { customer: "AEKSHEA FOODS WHOLESALE GmbH", balance: 79497.97, ytdPct: 52.3 },
      { customer: "LAZZAT FOODS AB", balance: 74995.99, ytdPct: 40.9 },
      { customer: "GOLDEN FOODS APS", balance: 66271.29, ytdPct: 22.6 },
      { customer: "M.A. ORIENTAL FOODS LTD.", balance: 62071.71, ytdPct: 37.0 },
      { customer: "ALL 4 TRADE B.V.", balance: 54501.00, ytdPct: 50.3 },
    ],
    atRiskCustomers: [
      { customer: "AEKSHEA FOODS WHOLESALE GmbH", ytdPct: 52.3 },
      { customer: "LAZZAT FOODS AB", ytdPct: 40.9 },
      { customer: "GOLDEN FOODS APS", ytdPct: 22.6 },
      { customer: "M.A. ORIENTAL FOODS LTD.", ytdPct: 37.0 },
      { customer: "ALL 4 TRADE B.V.", ytdPct: 50.3 },
    ],
    overachievers: [],
    zeroQ4Dispatch: [
      { customer: "AEKSHEA FOODS WHOLESALE GmbH" }, { customer: "LAZZAT FOODS AB" },
      { customer: "ALL 4 TRADE B.V." }, { customer: "ATIAZA AB" },
      { customer: "WB. IMPORT & EXPORT S.R.O." },
    ],
    q4PipelineCoverage: 13.12, customerCount: 12,
    myCategories: [
      { category: "NAAN (FROZEN)", fy26Projected: 186336.58, dispatchPlusOpen: 104211.84, balance: 82124.74, ytdPct: 55.9, growthVsFy25Pct: 38.8 },
      { category: "PICKLES", fy26Projected: 228799.85, dispatchPlusOpen: 196418.31, balance: 32381.54, ytdPct: 85.8, growthVsFy25Pct: -11.7 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 30482.88, dispatchPlusOpen: 9497.52, balance: 20985.36, ytdPct: 31.2, growthVsFy25Pct: -61.8 },
      { category: "INDIAN SNACKS (FROZEN)", fy26Projected: 37269.78, dispatchPlusOpen: 18172.98, balance: 19096.8, ytdPct: 48.8, growthVsFy25Pct: 94.3 },
      { category: "PARATHA (FROZEN)", fy26Projected: 160384.7, dispatchPlusOpen: 143887.5, balance: 16497.2, ytdPct: 89.7, growthVsFy25Pct: 180.3 },
      { category: "EASI POUCH CURRIES", fy26Projected: 173382.05, dispatchPlusOpen: 157201.22, balance: 16180.83, ytdPct: 90.7, growthVsFy25Pct: 12.6 },
      { category: "CHUTNEY (FROZEN)", fy26Projected: 11160.0, dispatchPlusOpen: 3100.0, balance: 8060.0, ytdPct: 27.8, growthVsFy25Pct: 11.1 },
      { category: "CHUTNEY BULK PACK", fy26Projected: 32918.66, dispatchPlusOpen: 28600.0, balance: 4318.66, ytdPct: 86.9, growthVsFy25Pct: 17.0 },
      { category: "INDIAN READY TO EAT (FROZEN)", fy26Projected: 4160.0, dispatchPlusOpen: 1480.0, balance: 2680.0, ytdPct: 35.6, growthVsFy25Pct: 0.0 },
      { category: "SAUCE", fy26Projected: 2958.4, dispatchPlusOpen: 364.44, balance: 2593.96, ytdPct: 12.3, growthVsFy25Pct: -89.1 },
    ],
  },
  "RASA KUMAR": {
    ytdPct: 132.3, balanceToAchieve: -362010.56, growthVsFy25Pct: 134.8,
    top5ToChase: [{ customer: "LUMEN FOODS LABS LLC", balance: 41966.53, ytdPct: 100.0 }],
    atRiskCustomers: [], overachievers: [],
    zeroQ4Dispatch: [{ customer: "LUMEN FOODS LABS LLC" }],
    q4PipelineCoverage: 1.96, customerCount: 2,
    myCategories: [
      { category: "SAUCE", fy26Projected: 124678.17, dispatchPlusOpen: 21957.05, balance: 102721.12, ytdPct: 17.6, growthVsFy25Pct: -68.7 },
      { category: "PULP", fy26Projected: 136941.66, dispatchPlusOpen: 44766.9, balance: 92174.76, ytdPct: 32.7, growthVsFy25Pct: -42.0 },
      { category: "EASI POUCH CURRIES", fy26Projected: 220442.63, dispatchPlusOpen: 144249.92, balance: 76192.71, ytdPct: 65.4, growthVsFy25Pct: 16.2 },
      { category: "TAMARIND", fy26Projected: 40467.85, dispatchPlusOpen: 7593.13, balance: 32874.72, ytdPct: 18.8, growthVsFy25Pct: -66.7 },
      { category: "SPICES", fy26Projected: 13613.66, dispatchPlusOpen: 0.0, balance: 13613.66, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "CAN VEGETABLE", fy26Projected: 6511.67, dispatchPlusOpen: 0.0, balance: 6511.67, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "CHUTNEY BULK PACK", fy26Projected: 3653.03, dispatchPlusOpen: 0.0, balance: 3653.03, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "PICKLES", fy26Projected: 11452.04, dispatchPlusOpen: 23685.11, balance: -12233.07, ytdPct: 206.8, growthVsFy25Pct: 267.2 },
      { category: "PASTES", fy26Projected: 8144.73, dispatchPlusOpen: 33729.53, balance: -25584.8, ytdPct: 414.1, growthVsFy25Pct: 635.2 },
      { category: "CHUTNEY CONSUMER PACK", fy26Projected: 1333.97, dispatchPlusOpen: 95120.12, balance: -93786.15, ytdPct: 7130.6, growthVsFy25Pct: 12558.7 },
    ],
  },
  "SHIVAAN THAKKAR": {
    ytdPct: 141.8, balanceToAchieve: -1429398.63, growthVsFy25Pct: 84.4,
    top5ToChase: [], atRiskCustomers: [], overachievers: [], zeroQ4Dispatch: [],
    q4PipelineCoverage: 0, customerCount: 3,
    myCategories: [
      { category: "SAMOSA (FROZEN)", fy26Projected: 2541053.87, dispatchPlusOpen: 2213485.49, balance: 327568.38, ytdPct: 87.1, growthVsFy25Pct: 13.2 },
      { category: "NAAN (FROZEN)", fy26Projected: 215783.93, dispatchPlusOpen: 162344.49, balance: 53439.44, ytdPct: 75.2, growthVsFy25Pct: -2.2 },
      { category: "CHUTNEY BULK PACK", fy26Projected: 58119.43, dispatchPlusOpen: 21414.73, balance: 36704.7, ytdPct: 36.8, growthVsFy25Pct: -52.1 },
      { category: "KATHI ROLL (FROZEN)", fy26Projected: 45538.94, dispatchPlusOpen: 24345.81, balance: 21193.13, ytdPct: 53.5, growthVsFy25Pct: -30.5 },
      { category: "CAN READY TO EAT", fy26Projected: 11409.84, dispatchPlusOpen: 6524.99, balance: 4884.85, ytdPct: 57.2, growthVsFy25Pct: -25.7 },
      { category: "SAUCE", fy26Projected: 4986.37, dispatchPlusOpen: 1759.17, balance: 3227.2, ytdPct: 35.3, growthVsFy25Pct: -54.1 },
      { category: "PASTES (FROZEN)", fy26Projected: 1040.91, dispatchPlusOpen: 0.0, balance: 1040.91, ytdPct: 0.0, growthVsFy25Pct: -100.0 },
      { category: "CHUTNEY (FROZEN)", fy26Projected: 4346.28, dispatchPlusOpen: 3898.31, balance: 447.97, ytdPct: 89.7, growthVsFy25Pct: 16.6 },
      { category: "SPICES", fy26Projected: 2349.1, dispatchPlusOpen: 2437.52, balance: -88.42, ytdPct: 103.8, growthVsFy25Pct: 34.9 },
      { category: "INDIAN READY TO EAT (FROZEN)", fy26Projected: 12167.02, dispatchPlusOpen: 13336.37, balance: -1169.35, ytdPct: 109.6, growthVsFy25Pct: 42.5 },
    ],
  },
  "VISHAL SACHDEV": {
    ytdPct: 0, balanceToAchieve: -261400.00, growthVsFy25Pct: 0,
    top5ToChase: [], atRiskCustomers: [], overachievers: [], zeroQ4Dispatch: [],
    q4PipelineCoverage: 0, customerCount: 1,
    myCategories: [],
  },
};

export const financeData: FinanceData = {
  dataQuality: { totalCustomers: 112, totalRowsProcessed: 116 },
  growthDistribution: { mean: 1.6, min: -1.0, max: 5.5 },
  categoryMixShift: [
    { category: "EASI POUCH CURRIES", growthVsFy25Pct: 81.8 },
    { category: "NAAN (FROZEN)", growthVsFy25Pct: 32.0 },
    { category: "SAMOSA (FROZEN)", growthVsFy25Pct: 19.7 },
    { category: "PICKLES", growthVsFy25Pct: 14.7 },
    { category: "CHUTNEY BULK PACK", growthVsFy25Pct: 6.6 },
    { category: "PARATHA (FROZEN)", growthVsFy25Pct: 30.0 },
    { category: "SAUCE", growthVsFy25Pct: 27.3 },
    { category: "INDIAN SWEET (FROZEN)", growthVsFy25Pct: 33.2 },
    { category: "PASTES", growthVsFy25Pct: 28.1 },
    { category: "CHUTNEY CONSUMER PACK", growthVsFy25Pct: 10.5 },
    { category: "PAPAD", growthVsFy25Pct: 32.9 },
    { category: "SPICES", growthVsFy25Pct: 27.2 },
    { category: "INDIAN READY TO EAT (FROZEN)", growthVsFy25Pct: 35.1 },
    { category: "KATHI ROLL (FROZEN)", growthVsFy25Pct: 9.9 },
    { category: "CAN READY TO EAT", growthVsFy25Pct: 57.1 },
    { category: "CHUTNEY (FROZEN)", growthVsFy25Pct: 41.4 },
    { category: "CAN VEGETABLE", growthVsFy25Pct: 57.6 },
    { category: "PASTES (FROZEN)", growthVsFy25Pct: 15.6 },
    { category: "MURABBA", growthVsFy25Pct: 25.8 },
    { category: "MILK PRODUCTS (FROZEN)", growthVsFy25Pct: 23.3 },
    { category: "INDIAN SWEET", growthVsFy25Pct: 18.3 },
    { category: "PULP", growthVsFy25Pct: 41.6 },
    { category: "SNACKS", growthVsFy25Pct: 52.4 },
    { category: "MISCELLENEOUS PRODUCTS", growthVsFy25Pct: 7.8 },
    { category: "INDIAN SNACKS (FROZEN)", growthVsFy25Pct: 21.8 },
    { category: "TAMARIND", growthVsFy25Pct: 26.8 },
    { category: "INDIAN VEGETABLE (FROZEN)", growthVsFy25Pct: 41.3 },
  ],
};

export const salesmenNames = Object.keys(salespersonData);

// ─── Helpers ─────────────────────────────────────────────────────────

export function formatCurrency(val: number, compact = false): string {
  if (compact) {
    if (Math.abs(val) >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (Math.abs(val) >= 1000) return `$${(val / 1000).toFixed(0)}K`;
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency", currency: "USD",
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(val);
}

export function formatQty(val: number): string {
  return new Intl.NumberFormat("en-US").format(val);
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
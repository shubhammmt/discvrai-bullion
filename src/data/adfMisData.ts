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

export interface QuarterTrajectory {
  quarter: string;
  planPct: number;
  actualPct: number;
  dispatch: number;
  projected: number;
  openOrder?: number;
}

export interface Q4Gap {
  q4Projected: number;
  q4DispatchPlusOpen: number;
  gap: number;
}

export interface AtRiskCustomer {
  customer: string;
  salesman: string;
  balance: number;
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

export interface SalespersonChase {
  customer: string;
  balance: number;
  ytdPct: number;
}

export interface SalespersonAtRisk {
  customer: string;
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
}

export interface FinanceData {
  dataQuality: { totalCustomers: number; totalRowsProcessed: number };
  growthDistribution: { mean: number; min: number; max: number };
  categoryMixShift: { category: string; growthVsFy25Pct: number }[];
}

// ─── Data ────────────────────────────────────────────────────────────

export const lastUpdated = "2026-03-05T03:10:41";

export const executiveSummary: ExecutiveSummary = {
  ytdAchievementPct: 85.1,
  balanceToAchieve: 9367222.63,
  growthVsFy25Pct: 5.7,
  totalProjected: 62980449.08,
  totalDispatchPlusOpen: 53613226.45,
};

export const quarterTrajectory: QuarterTrajectory[] = [
  { quarter: "Q1", planPct: 20, actualPct: 15.7, dispatch: 9914154.24, projected: 11445562.53 },
  { quarter: "Q2", planPct: 30, actualPct: 23.1, dispatch: 14576834.17, projected: 18698097.79 },
  { quarter: "Q3", planPct: 30, actualPct: 22.6, dispatch: 14208533.05, projected: 19011754.79 },
  { quarter: "Q4", planPct: 20, actualPct: 23.7, dispatch: 7506139.72, openOrder: 7407565.27, projected: 13825033.53 },
];

export const q4Gap: Q4Gap = {
  q4Projected: 13825033.53,
  q4DispatchPlusOpen: 14913704.99,
  gap: -1088671.46,
};

export const atRiskCustomers: AtRiskCustomer[] = [
  { customer: "RITIKA\u2019S GLOBAL GRAINS LLC", salesman: "SUMER THAKKAR", balance: 2797864.97, ytdPct: 71.4, growthVsFy25: -16.9 },
  { customer: "ASIA EXPRESS FOOD", salesman: "SUMER THAKKAR", balance: 1727704.53, ytdPct: 36.3, growthVsFy25: 11.4 },
  { customer: "KK FOOD TRADING COMPANY LTD.", salesman: "BIMAL THAKKAR", balance: 1054871.53, ytdPct: 33.2, growthVsFy25: -16.6 },
  { customer: "ITN FOOD CORPORATION", salesman: "MASUD SETHI", balance: 699653.77, ytdPct: 12.6, growthVsFy25: -12.6 },
  { customer: "DILIP CERAMICS INC.", salesman: "SAVITA PATEL", balance: 653558.76, ytdPct: 87.7, growthVsFy25: -82.7 },
  { customer: "JJR GLOBAL INC", salesman: "CHHAYESH PATEL", balance: 574898.61, ytdPct: 41.6, growthVsFy25: -24.1 },
  { customer: "ANEJA DISTRIBUTORS INC", salesman: "SAVITA PATEL", balance: 572463.03, ytdPct: 31.7, growthVsFy25: -11.2 },
  { customer: "PANESAR FOODS LIMITED", salesman: "BIMAL THAKKAR", balance: 553744.66, ytdPct: 27.3, growthVsFy25: -27.3 },
  { customer: "MALA IMPEX T/A ROSHAN NAIDU ENTERPRISES", salesman: "PRAVIN NANKANI", balance: 513325.70, ytdPct: 59.0, growthVsFy25: 1.3 },
  { customer: "ZYKA FOODS SOUTHWEST INC.", salesman: "CHHAYESH PATEL", balance: 512474.89, ytdPct: 50.2, growthVsFy25: -35.3 },
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
      { customer: "SOP INTERNATIONAL LTD." },
      { customer: "KTC (EDIBLES) LTD." },
      { customer: "LAXMI HOUSE OF SPICES (CANADA) INC." },
      { customer: "COMMISSARIAT IMPORTS INC." },
      { customer: "AIC-INCORPORATED" },
    ],
    q4PipelineCoverage: 0.77, customerCount: 19,
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
    overachievers: [],
    zeroQ4Dispatch: [{ customer: "NUTRIFRESH WEST LTD" }],
    q4PipelineCoverage: 1.58, customerCount: 5,
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
    overachievers: [],
    zeroQ4Dispatch: [{ customer: "DILIP CERAMICS INC." }],
    q4PipelineCoverage: 0.96, customerCount: 7,
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
      { customer: "KAMALA OVERSEAS LIMITED" },
      { customer: "CONTINENTAL MARKETING PTY LTD" },
      { customer: "PUNJAS PTE LIMITED" },
      { customer: "ARD ALFORAT FOR STORAGE & GENERAL TRADING CO." },
      { customer: "NEW DELHI STORE LTD" },
    ],
    q4PipelineCoverage: 0.67, customerCount: 39,
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
      { customer: "AEKSHEA FOODS WHOLESALE GmbH" },
      { customer: "LAZZAT FOODS AB" },
      { customer: "ALL 4 TRADE B.V." },
      { customer: "ATIAZA AB" },
      { customer: "WB. IMPORT & EXPORT S.R.O." },
    ],
    q4PipelineCoverage: 13.12, customerCount: 12,
  },
  "RASA KUMAR": {
    ytdPct: 132.3, balanceToAchieve: -362010.56, growthVsFy25Pct: 134.8,
    top5ToChase: [{ customer: "LUMEN FOODS LABS LLC", balance: 41966.53, ytdPct: 100.0 }],
    atRiskCustomers: [], overachievers: [],
    zeroQ4Dispatch: [{ customer: "LUMEN FOODS LABS LLC" }],
    q4PipelineCoverage: 1.96, customerCount: 2,
  },
  "SHIVAAN THAKKAR": {
    ytdPct: 141.8, balanceToAchieve: -1429398.63, growthVsFy25Pct: 84.4,
    top5ToChase: [], atRiskCustomers: [], overachievers: [], zeroQ4Dispatch: [],
    q4PipelineCoverage: 0, customerCount: 3,
  },
  "VISHAL SACHDEV": {
    ytdPct: 0, balanceToAchieve: -261400.00, growthVsFy25Pct: 0,
    top5ToChase: [], atRiskCustomers: [], overachievers: [], zeroQ4Dispatch: [],
    q4PipelineCoverage: 0, customerCount: 1,
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

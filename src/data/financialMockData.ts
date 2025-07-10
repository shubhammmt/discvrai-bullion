// Financial Statements Mock Data

export interface FinancialDataPoint {
  period: string;
  value: number;
  growth?: number;
}

export interface FinancialSection {
  title: string;
  data: FinancialDataPoint[];
}

export interface ShareholdingData {
  category: string;
  percentage: number;
  color: string;
}

export interface MarketTransaction {
  date: string;
  party: string;
  category: 'Bulk' | 'Block' | 'Insider - Promoter' | 'Insider - Promoter Group';
  type: 'Buy' | 'Sell' | 'Disposal';
  avgPrice: number;
  totalValue: number;
  quantity: number;
  percentTraded: number;
}

// Quarterly Financial Results (in ₹ Crores)
export const QUARTERLY_RESULTS: FinancialSection[] = [
  {
    title: "Sales",
    data: [
      { period: "Dec 2022", value: 1774 },
      { period: "Mar 2023", value: 3255 },
      { period: "Jun 2023", value: 1617 },
      { period: "Sep 2023", value: 1750 },
      { period: "Dec 2023", value: 2931 },
      { period: "Mar 2024", value: 4019 },
      { period: "Jun 2024", value: 2847 },
      { period: "Sep 2024", value: 2626 },
      { period: "Dec 2024", value: 4083 },
      { period: "Mar 2025", value: 4224 }
    ]
  },
  {
    title: "Expenses", 
    data: [
      { period: "Dec 2022", value: 1370 },
      { period: "Mar 2023", value: 2484 },
      { period: "Jun 2023", value: 1287 },
      { period: "Sep 2023", value: 1334 },
      { period: "Dec 2023", value: 2048 },
      { period: "Mar 2024", value: 2972 },
      { period: "Jun 2024", value: 2090 },
      { period: "Sep 2024", value: 1921 },
      { period: "Dec 2024", value: 2777 },
      { period: "Mar 2025", value: 3004 }
    ]
  },
  {
    title: "Operating Profit",
    data: [
      { period: "Dec 2022", value: 404 },
      { period: "Mar 2023", value: 772 },
      { period: "Jun 2023", value: 330 },
      { period: "Sep 2023", value: 416 },
      { period: "Dec 2023", value: 883 },
      { period: "Mar 2024", value: 1047 },
      { period: "Jun 2024", value: 757 },
      { period: "Sep 2024", value: 705 },
      { period: "Dec 2024", value: 1306 },
      { period: "Mar 2025", value: 1221 }
    ]
  },
  {
    title: "Net Profit",
    data: [
      { period: "Dec 2022", value: 699 },
      { period: "Mar 2023", value: 579 },
      { period: "Jun 2023", value: 795 },
      { period: "Sep 2023", value: 1644 },
      { period: "Dec 2023", value: 742 },
      { period: "Mar 2024", value: 48 },
      { period: "Jun 2024", value: 1209 },
      { period: "Sep 2024", value: 490 },
      { period: "Dec 2024", value: 1554 },
      { period: "Mar 2025", value: 2757 }
    ]
  }
];

// Annual Financial Results (in ₹ Crores) 
export const ANNUAL_RESULTS: FinancialSection[] = [
  {
    title: "Sales",
    data: [
      { period: "Mar 2016", value: 8320 },
      { period: "Mar 2017", value: 7754, growth: -6.8 },
      { period: "Mar 2018", value: 9677, growth: 24.8 },
      { period: "Mar 2019", value: 11907, growth: 23.0 },
      { period: "Mar 2020", value: 12443, growth: 4.5 },
      { period: "Mar 2021", value: 5449, growth: -56.2 },
      { period: "Mar 2022", value: 9233, growth: 69.5 },
      { period: "Mar 2023", value: 9470, growth: 2.6 },
      { period: "Mar 2024", value: 10316, growth: 8.9 },
      { period: "TTM", value: 13780, growth: 33.6 }
    ]
  },
  {
    title: "Operating Profit",
    data: [
      { period: "Mar 2016", value: 2011 },
      { period: "Mar 2017", value: 1582, growth: -21.3 },
      { period: "Mar 2018", value: 1671, growth: 5.6 },
      { period: "Mar 2019", value: 3167, growth: 89.5 },
      { period: "Mar 2020", value: 1907, growth: -39.8 },
      { period: "Mar 2021", value: 1372, growth: -28.1 },
      { period: "Mar 2022", value: 2179, growth: 58.8 },
      { period: "Mar 2023", value: 2066, growth: -5.2 },
      { period: "Mar 2024", value: 2676, growth: 29.5 },
      { period: "TTM", value: 3988, growth: 49.0 }
    ]
  },
  {
    title: "Net Profit",
    data: [
      { period: "Mar 2016", value: 699 },
      { period: "Mar 2017", value: 579, growth: -17.2 },
      { period: "Mar 2018", value: 795, growth: 37.3 },
      { period: "Mar 2019", value: 1644, growth: 106.8 },
      { period: "Mar 2020", value: 742, growth: -54.9 },
      { period: "Mar 2021", value: 48, growth: -93.5 },
      { period: "Mar 2022", value: 1209, growth: 2420.8 },
      { period: "Mar 2023", value: 490, growth: -59.5 },
      { period: "Mar 2024", value: 1554, growth: 217.1 },
      { period: "TTM", value: 2757, growth: 77.4 }
    ]
  }
];

// Shareholding Pattern Data
export const SHAREHOLDING_PATTERN: ShareholdingData[] = [
  { category: "Promoters", percentage: 71.94, color: "#3b82f6" },
  { category: "FIIs", percentage: 24.65, color: "#06b6d4" },
  { category: "DIIs", percentage: 2.36, color: "#8b5cf6" },
  { category: "Others", percentage: 1.05, color: "#6b7280" }
];

// Promoters Holding Breakdown
export const PROMOTERS_HOLDING = {
  unpledged: 71.94,
  pledged: 0,
  total: 71.94
};

// Historical Shareholding Data
export const SHAREHOLDING_HISTORY = [
  {
    period: "Jun 2022",
    promoters: 82.20,
    fiis: 14.54,
    diis: 1.85,
    public: 1.40,
    totalShareholders: 53304
  },
  {
    period: "Sep 2022", 
    promoters: 82.20,
    fiis: 13.93,
    diis: 2.68,
    public: 1.19,
    totalShareholders: 53343
  },
  {
    period: "Dec 2022",
    promoters: 75.00,
    fiis: 19.42,
    diis: 4.08,
    public: 1.50,
    totalShareholders: 51058
  },
  {
    period: "Mar 2023",
    promoters: 74.99,
    fiis: 18.98,
    diis: 4.39,
    public: 1.64,
    totalShareholders: 53431
  },
  {
    period: "Jun 2023",
    promoters: 74.96,
    fiis: 19.83,
    diis: 4.09,
    public: 1.12,
    totalShareholders: 55202
  },
  {
    period: "Sep 2023",
    promoters: 74.93,
    fiis: 20.52,
    diis: 3.62,
    public: 0.93,
    totalShareholders: 52590
  },
  {
    period: "Dec 2023",
    promoters: 74.92,
    fiis: 21.09,
    diis: 3.20,
    public: 0.78,
    totalShareholders: 52805
  },
  {
    period: "Mar 2024",
    promoters: 72.16,
    fiis: 23.79,
    diis: 3.32,
    public: 0.73,
    totalShareholders: 60812
  },
  {
    period: "Jun 2024",
    promoters: 72.13,
    fiis: 24.18,
    diis: 2.97,
    public: 0.73,
    totalShareholders: 67699
  },
  {
    period: "Sep 2024",
    promoters: 72.11,
    fiis: 24.20,
    diis: 2.78,
    public: 0.91,
    totalShareholders: 92933
  },
  {
    period: "Dec 2024",
    promoters: 71.98,
    fiis: 24.45,
    diis: 2.64,
    public: 0.93,
    totalShareholders: 94623
  },
  {
    period: "Mar 2025",
    promoters: 71.94,
    fiis: 24.65,
    diis: 2.36,
    public: 1.05,
    totalShareholders: 104512
  }
];

// Market Transactions Data
export const MARKET_TRANSACTIONS: MarketTransaction[] = [
  {
    date: "Mar 12, 2024",
    party: "Sambhavanth Infrabuild And Fa...",
    category: "Bulk",
    type: "Sell",
    avgPrice: 1180.02,
    totalValue: 586.72,
    quantity: 4972100,
    percentTraded: 0.49
  },
  {
    date: "Mar 07, 2024",
    party: "Seb Asienfond Ex Japan",
    category: "Block", 
    type: "Buy",
    avgPrice: 1196.65,
    totalValue: 14.01,
    quantity: 117093,
    percentTraded: 0.01
  },
  {
    date: "Mar 07, 2024",
    party: "Seb Fund 3 Seb Pension Fund",
    category: "Block",
    type: "Sell", 
    avgPrice: 1196.65,
    totalValue: 14.01,
    quantity: 117093,
    percentTraded: 0.01
  },
  {
    date: "Jan 25, 2024",
    party: "Marshall Wace Investment Stra...",
    category: "Block",
    type: "Buy",
    avgPrice: 1061.15,
    totalValue: 75.95,
    quantity: 715703,
    percentTraded: 0.07
  },
  {
    date: "Jan 25, 2024",
    party: "Societe Generale",
    category: "Block",
    type: "Sell",
    avgPrice: 1061.15,
    totalValue: 75.95,
    quantity: 715703,
    percentTraded: 0.07
  },
  {
    date: "Nov 30, 2023", 
    party: "Bnp Paribas Arbitrage",
    category: "Bulk",
    type: "Buy",
    avgPrice: 869.39,
    totalValue: 0.48,
    quantity: 5502,
    percentTraded: 0.00
  },
  {
    date: "Nov 30, 2023",
    party: "Bnp Paribas Arbitrage", 
    category: "Bulk",
    type: "Sell",
    avgPrice: 881.36,
    totalValue: 1025.63,
    quantity: 11636881,
    percentTraded: 1.16
  },
  {
    date: "Dec 14, 2022",
    party: "Homecraft Developers And Farm...",
    category: "Insider - Promoter Group",
    type: "Disposal",
    avgPrice: 1026.00,
    totalValue: 881.19,
    quantity: 8588600,
    percentTraded: 1.78
  },
  {
    date: "Dec 14, 2022",
    party: "Hightown Constructions Privat...",
    category: "Insider - Promoter Group", 
    type: "Disposal",
    avgPrice: 1026.00,
    totalValue: 1318.91,
    quantity: 12854845,
    percentTraded: 2.66
  },
  {
    date: "Dec 14, 2022",
    party: "Sambhavanth Infrabuild And Fa...",
    category: "Insider - Promoter",
    type: "Disposal",
    avgPrice: 1026.00,
    totalValue: 1.98,
    quantity: 19343,
    percentTraded: 0.00
  }
];

// AI Financial Insights
export const AI_FINANCIAL_INSIGHTS = {
  summary: "Discover detailed, AI-driven financial summaries that break down key metrics, trends, and insights—empowering you to make smarter investment decisions.",
  keyHighlights: [
    "Revenue growth accelerating in recent quarters",
    "Strong improvement in operating margins", 
    "Debt levels remain manageable with improving ratios",
    "Cash flow generation showing positive trends"
  ],
  risks: [
    "Cyclical nature of real estate industry",
    "Interest rate sensitivity affecting demand",
    "Regulatory changes in real estate sector"
  ],
  opportunities: [
    "Expansion in key metropolitan markets",
    "Launch of premium residential projects",
    "Commercial real estate growth potential"
  ]
};

// EPS and Revenue Projections (Premium Feature)
export const EPS_REVENUE_PROJECTIONS = {
  eps: {
    quarters: [
      { period: "Q1'24", actual: 11.23, estimated: 11.14, surprise: 0.80 },
      { period: "Q2'24", actual: 10.84, estimated: 8.83, surprise: 22.83 },
      { period: "Q3'24", actual: null, estimated: 12.50, surprise: null },
      { period: "Q4'24", actual: null, estimated: 15.20, surprise: null },
      { period: "Q1'25", actual: null, estimated: 13.80, surprise: null },
      { period: "Q2'25", actual: null, estimated: 16.90, surprise: null }
    ]
  },
  revenue: {
    quarters: [
      { period: "Q1'24", actual: 2847, estimated: 2650, surprise: 7.44 },
      { period: "Q2'24", actual: 2626, estimated: 2400, surprise: 9.42 },
      { period: "Q3'24", actual: null, estimated: 3200, surprise: null },
      { period: "Q4'24", actual: null, estimated: 3850, surprise: null },
      { period: "Q1'25", actual: null, estimated: 3100, surprise: null },
      { period: "Q2'25", actual: null, estimated: 3600, surprise: null }
    ]
  }
};

export default {
  QUARTERLY_RESULTS,
  ANNUAL_RESULTS,
  SHAREHOLDING_PATTERN,
  PROMOTERS_HOLDING,
  SHAREHOLDING_HISTORY,
  MARKET_TRANSACTIONS,
  AI_FINANCIAL_INSIGHTS,
  EPS_REVENUE_PROJECTIONS
};
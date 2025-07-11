// Stock Mock Data for LODHA and related financial information

export interface StockData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  change: number;
  changePercent: number;
  marketCap: string;
  peRatio: number;
  volume: string;
  high52w: number;
  low52w: number;
  sector: string;
  industry: string;
  description: string;
}

export interface InvestmentChecklistItem {
  category: string;
  status: string;
  score: 'positive' | 'neutral' | 'negative';
  icon: string;
  details: string;
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export interface KeyMetric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  comparison?: string;
}

export interface PeerCompany {
  symbol: string;
  name: string;
  price: number;
  marketCap: string;
  pe: number;
  pb: number;
  divYield: number;
  roe: number;
  roce: number;
  roa: number;
  change: number;
  changePercent: number;
}

export interface TechnicalIndicator {
  name: string;
  value: number;
  signal: 'bullish' | 'bearish' | 'neutral';
  description: string;
}

export interface AnalystRating {
  firm: string;
  rating: 'Strong Buy' | 'Buy' | 'Hold' | 'Sell' | 'Strong Sell';
  targetPrice: number;
  date: string;
}

// Main LODHA Stock Data
export const LODHA_STOCK_DATA: StockData = {
  symbol: "LODHA",
  companyName: "Macrotech Developers Ltd",
  currentPrice: 1412.60,
  change: 21.35,
  changePercent: 1.53,
  marketCap: "₹1,38,853 Cr",
  peRatio: 50.23,
  volume: "2.1M",
  high52w: 1648.00,
  low52w: 839.20,
  sector: "Realty",
  industry: "Construction - Housing - Large",
  description: "Macrotech Developers Limited, also known as Lodha Group, is one of India's largest real estate developers, focusing on residential and commercial properties across Mumbai, Pune, Bengaluru, and London."
};

// Investment Checklist Assessment
export const INVESTMENT_CHECKLIST = [
  {
    category: 'Returns',
    icon: '📈',
    score: 'neutral' as const,
    status: 'STEADY RETURNS',
    metrics: [
      { label: '1Y Return', value: '12.5%', trend: 'up' as const },
      { label: '3Y CAGR', value: '8.2%', trend: 'neutral' as const },
      { label: 'Volatility', value: '18.4%', trend: 'down' as const }
    ]
  },
  {
    category: 'Value',
    icon: '⚖️',
    score: 'neutral' as const,
    status: 'FAIR VALUE',
    metrics: [
      { label: 'P/E Ratio', value: '28.4x', trend: 'up' as const },
      { label: 'P/B Ratio', value: '2.8x', trend: 'neutral' as const },
      { label: 'EV/EBITDA', value: '18.2x', trend: 'up' as const }
    ]
  },
  {
    category: 'Expansion',
    icon: '📊',
    score: 'neutral' as const,
    status: 'STEADY GROWTH',
    metrics: [
      { label: 'Revenue Growth', value: '15.0%', trend: 'up' as const },
      { label: 'Profit Growth', value: '12.3%', trend: 'up' as const },
      { label: 'Market Share', value: '8.5%', trend: 'neutral' as const }
    ]
  },
  {
    category: 'Margins',
    icon: '💰',
    score: 'positive' as const,
    status: 'STRONG MARGINS',
    metrics: [
      { label: 'Net Margin', value: '25.2%', trend: 'up' as const },
      { label: 'EBITDA Margin', value: '32.1%', trend: 'up' as const },
      { label: 'ROE', value: '15.2%', trend: 'neutral' as const }
    ]
  },
  {
    category: 'Momentum',
    icon: '📈',
    score: 'positive' as const,
    status: 'STRONG TREND',
    metrics: [
      { label: 'RSI', value: '58', trend: 'neutral' as const },
      { label: 'Price vs MA50', value: '+5.2%', trend: 'up' as const },
      { label: 'Volume Trend', value: 'High', trend: 'up' as const }
    ]
  },
  {
    category: 'Safety',
    icon: '⚠️',
    score: 'neutral' as const,
    status: 'BALANCED RISK',
    metrics: [
      { label: 'Debt/Equity', value: '0.42x', trend: 'down' as const },
      { label: 'Current Ratio', value: '1.85x', trend: 'up' as const },
      { label: 'Beta', value: '0.95', trend: 'neutral' as const }
    ]
  }
];

// Key Financial Metrics
export const KEY_METRICS: KeyMetric[] = [
  { label: "Market Cap", value: "₹1,38,853 Cr", trend: "up" },
  { label: "P/E Ratio", value: 50.2, comparison: "vs Industry: 49.3" },
  { label: "P/B Ratio", value: 7.0, trend: "neutral" },
  { label: "Debt/Equity", value: 0.45, trend: "down" },
  { label: "ROE", value: "13.70%", trend: "up", comparison: "vs Industry: 11.2%" },
  { label: "ROCE", value: "14.95%", trend: "up" },
  { label: "Revenue Growth (1Y)", value: "23.4%", trend: "up" },
  { label: "Profit Growth (1Y)", value: "34.2%", trend: "up" },
  { label: "Dividend Yield", value: "0.31%", trend: "neutral" },
  { label: "52W High", value: "₹1,648.00" },
  { label: "52W Low", value: "₹839.20" },
  { label: "Volatility", value: "High Risk" }
];

// Peer Companies Data
export const PEER_COMPANIES: PeerCompany[] = [
  {
    symbol: "DLF",
    name: "DLF Ltd", 
    price: 829.80,
    marketCap: "₹2,05,389 Cr",
    pe: 44.85,
    pb: 4.83,
    divYield: 0.72,
    roe: 10.76,
    roce: 6.18,
    roa: 3.88,
    change: -2.15,
    changePercent: -0.26
  },
  {
    symbol: "LODHA",
    name: "Macrotech Developers",
    price: 1412.60,
    marketCap: "₹1,38,853 Cr", 
    pe: 50.23,
    pb: 7.04,
    divYield: 0.31,
    roe: 13.70,
    roce: 14.95,
    roa: 5.55,
    change: 21.35,
    changePercent: 1.53
  },
  {
    symbol: "PRESTIGE",
    name: "Prestige Estates",
    price: 1695.95,
    marketCap: "₹71,042 Cr",
    pe: 152.01,
    pb: 4.61, 
    divYield: 0.11,
    roe: 3.03,
    roce: 7.25,
    roa: 1.05,
    change: -15.20,
    changePercent: -0.89
  },
  {
    symbol: "OBEROI",
    name: "Oberoi Realty",
    price: 1840.20,
    marketCap: "₹66,639 Cr",
    pe: 30.75,
    pb: 4.24,
    divYield: 0.44,
    roe: 14.17,
    roce: 16.37,
    roa: 9.79,
    change: 8.45,
    changePercent: 0.46
  },
  {
    symbol: "SOBHA", 
    name: "Sobha Ltd",
    price: 1518.40,
    marketCap: "₹16,132 Cr",
    pe: 170.28,
    pb: 3.54,
    divYield: 0.20,
    roe: 2.08,
    roce: 5.62,
    roa: 0.55,
    change: -12.60,
    changePercent: -0.82
  },
  {
    symbol: "ARKADE",
    name: "Arkade Developers", 
    price: 204.05,
    marketCap: "₹3,712 Cr",
    pe: 23.66,
    pb: 4.20,
    divYield: 0.00,
    roe: 17.76,
    roce: 21.35,
    roa: 12.55,
    change: 1.85,
    changePercent: 0.91
  }
];

// Technical Analysis Data
export const TECHNICAL_INDICATORS: TechnicalIndicator[] = [
  { name: "RSI (14)", value: 68.5, signal: "bullish", description: "Momentum indicator showing bullish trend" },
  { name: "MACD", value: 12.3, signal: "bullish", description: "Moving average convergence divergence positive" },
  { name: "50-Day MA", value: 1385.2, signal: "bullish", description: "Price above 50-day moving average" },
  { name: "200-Day MA", value: 1250.8, signal: "bullish", description: "Price above 200-day moving average" },
  { name: "Bollinger Bands", value: 75, signal: "neutral", description: "Price in middle of Bollinger Bands" },
  { name: "Stochastic", value: 72.1, signal: "bullish", description: "Stochastic oscillator in bullish territory" }
];

// Analyst Ratings
export const ANALYST_RATINGS: AnalystRating[] = [
  { firm: "Motilal Oswal", rating: "Strong Buy", targetPrice: 1650, date: "2024-01-15" },
  { firm: "ICICI Securities", rating: "Buy", targetPrice: 1580, date: "2024-01-12" },
  { firm: "Kotak Securities", rating: "Buy", targetPrice: 1620, date: "2024-01-10" },
  { firm: "HDFC Securities", rating: "Hold", targetPrice: 1450, date: "2024-01-08" },
  { firm: "Axis Securities", rating: "Buy", targetPrice: 1600, date: "2024-01-05" }
];

// Company Overview Cards Data
export const OVERVIEW_CARDS = [
  {
    title: "Business Model",
    content: "Macrotech Developers Limited, also known as Lodha Group, is one of India's largest real estate developers, focusing on residential and commercial properties across Mumbai, Pune, Bengaluru, and London.",
    icon: "🏢"
  },
  {
    title: "Recent Performance", 
    content: "The company has achieved its highest-ever quarterly and yearly pre-sales, demonstrating a reliable and predictable business model with record-high revenues and continued robust cash collections.",
    icon: "📈"
  },
  {
    title: "Strategic Positioning",
    content: "Lodha Group is capitalizing on strong market demand and strategic investments, especially within key urban centers like Mumbai, Pune, and Bengaluru, positioning it for consistent future growth.",
    icon: "🎯"
  },
  {
    title: "Growth Drivers",
    content: "Their townships, like Palava and Upper Thane, are positioned to become significant contributors, driven by infrastructure enhancements and value propositions in housing and logistics.",
    icon: "🚀"
  }
];

// Technical Gauge Data
export const TECHNICAL_GAUGES = {
  oscillators: {
    value: 65,
    signal: "neutral" as const,
    breakdown: { bearish: 3, neutral: 9, bullish: 2 }
  },
  overall: {
    value: 78,
    signal: "bullish" as const, 
    breakdown: { bearish: 17, neutral: 9, bullish: 20 }
  },
  movingAverages: {
    value: 82,
    signal: "bullish" as const,
    breakdown: { bearish: 14, neutral: 0, bullish: 18 }
  }
};

export default {
  LODHA_STOCK_DATA,
  INVESTMENT_CHECKLIST,
  KEY_METRICS,
  PEER_COMPANIES,
  TECHNICAL_INDICATORS,
  ANALYST_RATINGS,
  OVERVIEW_CARDS,
  TECHNICAL_GAUGES
};

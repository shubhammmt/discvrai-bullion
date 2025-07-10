// News Mock Data for Stock Page

export interface NewsItem {
  id: string;
  headline: string;
  summary: string;
  source: string;
  sourceIcon: string;
  timestamp: string;
  daysAgo: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  category: 'earnings' | 'acquisition' | 'regulatory' | 'market' | 'analyst';
  url?: string;
}

export const NEWS_MOCK_DATA: NewsItem[] = [
  {
    id: "1",
    headline: "Macrotech Developers Share Price Today, Macrotech Developers Stock ...",
    summary: "Macrotech Developers Ltd., incorporated in the year 1995, is a Small Cap company (having a market cap of Rs 1,37,395.16 Crore) operating in Real Estate sector. Macrotech Developers Ltd. key ...",
    source: "Indiatimes",
    sourceIcon: "📰",
    timestamp: "2024-01-15T10:30:00Z",
    daysAgo: 2,
    sentiment: "neutral",
    category: "market"
  },
  {
    id: "2", 
    headline: "Lodha Developers Acquires Land for Rs 22,700 Cr Projects",
    summary: "Lodha Developers acquired 5 land parcels in Mumbai, Pune & Bengaluru to build homes worth Rs 22,700 crore. The company is on track to meet its sales targets for FY26.",
    source: "Rediff Money",
    sourceIcon: "💰",
    timestamp: "2024-01-15T08:45:00Z", 
    daysAgo: 2,
    sentiment: "positive",
    category: "acquisition"
  },
  {
    id: "3",
    headline: "Macrotech Developers shares gain on recording presales of Rs 4,450 crore in Q1",
    summary: "Lodha said it remain on track to achieve FY26 presales guidance of Rs 21,000 crore, with further strengthening of its launch ...",
    source: "Moneycontrol", 
    sourceIcon: "📊",
    timestamp: "2024-01-15T06:20:00Z",
    daysAgo: 2,
    sentiment: "positive",
    category: "earnings"
  },
  {
    id: "4",
    headline: "Lodha Developers reports 10% growth in Q1 FY26 pre-sales to ₹4,450 crore", 
    summary: "Lodha Developers reports a 10% YoY growth in Q1 FY26 pre-sales, reaching Rs 4,450 crore, and continues to target Rs 21,000 ...",
    source: "Business Standard",
    sourceIcon: "📈",
    timestamp: "2024-01-12T14:15:00Z",
    daysAgo: 3,
    sentiment: "positive", 
    category: "earnings"
  },
  {
    id: "5",
    headline: "Macrotech Developers Q1 update: Re-sales up 10%, reaffirms FY26 guidance",
    summary: "Macrotech reaffirmed its full-year pre-sales guidance of ₹210 billion. In a separate statement, the company also announced it will change its name to Lodha Developers Ltd, effec ...",
    source: "CNBC TV18",
    sourceIcon: "📺", 
    timestamp: "2024-01-12T11:30:00Z",
    daysAgo: 3,
    sentiment: "positive",
    category: "earnings"
  },
  {
    id: "6",
    headline: "Macrotech Developers Ltd Share Price Today, 1,370.00, Macrotech Developers Ltd Stock Price 1,370.00 on 8th Jul 2025, Macrotech Developers Ltd Stock Price Live NSE/BSE ...",
    summary: "What's Macrotech Developers Ltd share price today. Get Macrotech Developers Ltd latest news on BSE/NSE: stock price live updates, Macrotech Developers Ltd financial results and overview, Macrotech ...",
    source: "Business Standard",
    sourceIcon: "📊",
    timestamp: "2024-01-10T09:45:00Z", 
    daysAgo: 6,
    sentiment: "neutral",
    category: "market"
  },
  {
    id: "7",
    headline: "Lodha Group to Launch Premium Residential Project in Bengaluru",
    summary: "Lodha Group announces new luxury residential project worth Rs 3,500 crore in Bengaluru's prime location, targeting delivery by 2027.",
    source: "Economic Times",
    sourceIcon: "💼",
    timestamp: "2024-01-08T16:20:00Z",
    daysAgo: 8, 
    sentiment: "positive",
    category: "acquisition"
  },
  {
    id: "8",
    headline: "Real Estate Sector Outlook: Analysts Bullish on Premium Developers",
    summary: "Industry experts maintain positive outlook on premium real estate developers including Lodha, DLF, and Oberoi Realty for FY26.",
    source: "Financial Express", 
    sourceIcon: "📰",
    timestamp: "2024-01-05T12:10:00Z",
    daysAgo: 11,
    sentiment: "positive",
    category: "analyst"
  },
  {
    id: "9",
    headline: "SEBI Issues New Guidelines for Real Estate Fund Disclosures",
    summary: "Market regulator introduces enhanced disclosure norms for real estate investment trusts and developers, effective from Q2 FY26.",
    source: "Mint",
    sourceIcon: "⚖️", 
    timestamp: "2024-01-03T14:30:00Z",
    daysAgo: 13,
    sentiment: "neutral",
    category: "regulatory"
  },
  {
    id: "10",
    headline: "Mumbai Real Estate Prices See 12% YoY Growth in Key Micro-markets",
    summary: "Prime locations in Mumbai witness significant price appreciation, benefiting major developers like Lodha and Oberoi Realty.",
    source: "Housing.com",
    sourceIcon: "🏠",
    timestamp: "2024-01-01T10:00:00Z",
    daysAgo: 15,
    sentiment: "positive", 
    category: "market"
  }
];

// News categories for filtering
export const NEWS_CATEGORIES = [
  { value: 'all', label: 'All News' },
  { value: 'earnings', label: 'Earnings' },
  { value: 'acquisition', label: 'Acquisitions' }, 
  { value: 'regulatory', label: 'Regulatory' },
  { value: 'market', label: 'Market News' },
  { value: 'analyst', label: 'Analyst Reports' }
];

// News time periods
export const NEWS_TIME_PERIODS = [
  { value: '7d', label: 'Last 7 days', premium: false },
  { value: '30d', label: 'Last 30 days', premium: true },
  { value: '90d', label: 'Last 90 days', premium: true }
];

// Sentiment distribution for analytics
export const NEWS_SENTIMENT_SUMMARY = {
  positive: 6,
  neutral: 3, 
  negative: 1,
  total: 10
};

export default {
  NEWS_MOCK_DATA,
  NEWS_CATEGORIES,
  NEWS_TIME_PERIODS,
  NEWS_SENTIMENT_SUMMARY
};
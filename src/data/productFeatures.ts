import { ProductFeature } from '@/types/news';

export const MUTUAL_FUND_FEATURES: ProductFeature[] = [
  {
    id: 'mf-ai-screening',
    title: 'AI Mutual Fund Screening',
    description: 'Ask our AI to find the perfect mutual funds for you in seconds',
    benefit: 'Save 5+ hours of research time',
    icon: 'sparkles',
    ctaText: 'Screen Funds Now',
    route: '/mutual-funds/research',
    gradient: 'border-primary/20',
    statLabel: 'Avg. time saved',
    statValue: '5-8 hours'
  },
  {
    id: 'mf-themes',
    title: 'Mutual Fund Themes',
    description: 'Explore curated fund collections aligned with market trends and opportunities',
    benefit: 'Access 50+ expertly curated themes',
    icon: 'sparkles',
    ctaText: 'Discover Themes',
    route: '/mutual-funds',
    gradient: 'border-accent/20',
    statLabel: 'Available themes',
    statValue: '50+'
  },
  {
    id: 'mf-screener',
    title: 'Mutual Fund Screener',
    description: 'Filter through 2,000+ funds using advanced criteria to find your perfect match',
    benefit: 'Screen from 2,000+ mutual funds instantly',
    icon: 'sparkles',
    ctaText: 'Start Screening',
    route: '/mutual-funds/research',
    gradient: 'border-primary/20',
    statLabel: 'Total funds',
    statValue: '2,000+'
  },
  {
    id: 'mf-categories',
    title: 'Mutual Fund Categories',
    description: 'Browse funds by category - Equity, Debt, Hybrid, and more with AI insights',
    benefit: 'Explore 15+ fund categories',
    icon: 'sparkles',
    ctaText: 'Explore Categories',
    route: '/mutual-funds',
    gradient: 'border-accent/20',
    statLabel: 'Categories',
    statValue: '15+'
  }
];

export const AI_SCREENING_QUERIES: ProductFeature[] = [
  {
    id: 'ai-query-1',
    title: 'Best Risk-Adjusted Returns',
    description: 'Which funds have the best risk-adjusted returns in last 5 years?',
    benefit: 'Find stable performers with optimal risk-return balance',
    icon: 'sparkles',
    ctaText: 'View Results',
    route: '/mutual-fund/ai-screening?q=Which+funds+have+the+best+risk-adjusted+returns+in+last+5+years%3F&page=1',
    gradient: 'border-primary/20',
    statLabel: 'Analysis period',
    statValue: '5 years'
  },
  {
    id: 'ai-query-2',
    title: 'Tax Saving ELSS Funds',
    description: 'Show me tax saving mutual funds with lowest lock-in period',
    benefit: 'Save taxes with minimal commitment',
    icon: 'sparkles',
    ctaText: 'Explore ELSS',
    route: '/mutual-fund/ai-screening?q=Show+me+tax+saving+mutual+funds+with+lowest+lock-in+period&page=1',
    gradient: 'border-accent/20',
    statLabel: 'Tax benefit',
    statValue: '₹1.5L u/s 80C'
  },
  {
    id: 'ai-query-3',
    title: 'Top ELSS Performers',
    description: 'Which ELSS funds have the best risk-adjusted returns?',
    benefit: 'Tax savings with superior risk-adjusted performance',
    icon: 'sparkles',
    ctaText: 'Compare ELSS',
    route: '/mutual-fund/ai-screening?q=Which+ELSS+funds+have+the+best+risk-adjusted+returns%3F&page=1',
    gradient: 'border-primary/20',
    statLabel: 'Lock-in period',
    statValue: '3 years'
  },
  {
    id: 'ai-query-4',
    title: 'Low Cost High Alpha',
    description: 'Show me funds with low expense ratio and high alpha',
    benefit: 'Maximize returns by minimizing costs',
    icon: 'sparkles',
    ctaText: 'Find Low-Cost Funds',
    route: '/mutual-fund/ai-screening?q=Show+me+funds+with+low+expense+ratio+and+high+alpha&page=1',
    gradient: 'border-accent/20',
    statLabel: 'Cost impact',
    statValue: '1-2% yearly'
  },
  {
    id: 'ai-query-5',
    title: 'Fast Growing Small Caps',
    description: 'Which small-cap funds had the fastest AUM growth in the last 2 years?',
    benefit: 'Spot emerging winners in small-cap space',
    icon: 'sparkles',
    ctaText: 'View Growth Leaders',
    route: '/mutual-fund/ai-screening?q=Which+small-cap+funds+had+the+fastest+AUM+growth+in+the+last+2+years%3F&page=1',
    gradient: 'border-primary/20',
    statLabel: 'Growth period',
    statValue: '2 years'
  },
  {
    id: 'ai-query-6',
    title: 'Green Energy Leaders',
    description: 'Show me funds holding top allocation to renewable energy or green stocks',
    benefit: 'Invest in sustainable future with ESG focus',
    icon: 'sparkles',
    ctaText: 'Explore Green Funds',
    route: '/mutual-fund/ai-screening?q=Show+me+funds+holding+top+allocation+to+renewable+energy+or+green+stocks&page=1',
    gradient: 'border-accent/20',
    statLabel: 'ESG focus',
    statValue: 'Renewable energy'
  },
  {
    id: 'ai-query-7',
    title: 'IT Sector Champions',
    description: 'Which sectoral IT funds performed best in the last 3 years?',
    benefit: 'Capitalize on tech sector growth',
    icon: 'sparkles',
    ctaText: 'View IT Funds',
    route: '/mutual-fund/ai-screening?q=Which+sectoral+IT+funds+performed+best+in+the+last+3+years%3F&page=1',
    gradient: 'border-primary/20',
    statLabel: 'Sector focus',
    statValue: 'Technology'
  },
  {
    id: 'ai-query-8',
    title: 'Interest Rate Winners',
    description: 'Which funds are best positioned for rising interest rates?',
    benefit: 'Protect portfolio in rate hike scenarios',
    icon: 'sparkles',
    ctaText: 'Find Rate-Ready Funds',
    route: '/mutual-fund/ai-screening?q=Which+funds+are+best+positioned+for+rising+interest+rates%3F&page=1',
    gradient: 'border-accent/20',
    statLabel: 'Strategy',
    statValue: 'Rate resilient'
  }
];

export const getRandomProductFeature = (): ProductFeature => {
  const randomIndex = Math.floor(Math.random() * MUTUAL_FUND_FEATURES.length);
  return MUTUAL_FUND_FEATURES[randomIndex];
};

export const getProductFeatureById = (id: string): ProductFeature | undefined => {
  return MUTUAL_FUND_FEATURES.find(feature => feature.id === id);
};

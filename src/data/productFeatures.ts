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

export const getRandomProductFeature = (): ProductFeature => {
  const randomIndex = Math.floor(Math.random() * MUTUAL_FUND_FEATURES.length);
  return MUTUAL_FUND_FEATURES[randomIndex];
};

export const getProductFeatureById = (id: string): ProductFeature | undefined => {
  return MUTUAL_FUND_FEATURES.find(feature => feature.id === id);
};

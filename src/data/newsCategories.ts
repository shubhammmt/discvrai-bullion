import { NewsCategory } from '@/types/news';

export const newsCategories: NewsCategory[] = [
  {
    slug: 'ipo',
    name: 'IPO',
    description: 'Latest IPO news, listings, and analysis',
    color: 'blue',
    icon: 'TrendingUp'
  },
  {
    slug: 'stocks',
    name: 'Stocks',
    description: 'Stock market updates and equity analysis',
    color: 'green',
    icon: 'LineChart'
  },
  {
    slug: 'mutual-funds',
    name: 'Mutual Funds',
    description: 'Mutual fund news and recommendations',
    color: 'purple',
    icon: 'PieChart'
  },
  {
    slug: 'crypto',
    name: 'Crypto',
    description: 'Cryptocurrency and blockchain news',
    color: 'orange',
    icon: 'Bitcoin'
  },
  {
    slug: 'ai-fintech',
    name: 'AI & FinTech',
    description: 'Technology innovations in finance',
    color: 'cyan',
    icon: 'Cpu'
  },
  {
    slug: 'regulatory',
    name: 'Regulatory',
    description: 'SEBI updates and compliance news',
    color: 'red',
    icon: 'Scale'
  },
  {
    slug: 'economy',
    name: 'Economy',
    description: 'Macroeconomic trends and indicators',
    color: 'indigo',
    icon: 'Globe'
  },
  {
    slug: 'global-markets',
    name: 'Global Markets',
    description: 'International markets and forex',
    color: 'teal',
    icon: 'Map'
  }
];

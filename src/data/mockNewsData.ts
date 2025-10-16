import { NewsArticle, ByteNews } from '@/types/news';
import { newsAuthors } from './newsAuthors';

export const mockNewsArticles: NewsArticle[] = [
  {
    id: '1',
    slug: 'sebi-new-regulations-mutual-funds-2025',
    headline: 'SEBI Announces Major Regulatory Changes for Mutual Funds in 2025',
    summary: 'Securities and Exchange Board of India introduces new compliance requirements aimed at enhancing investor protection and market transparency.',
    content: `The Securities and Exchange Board of India (SEBI) has announced significant regulatory changes for mutual funds, effective from Q2 2025. These changes are designed to enhance investor protection and improve market transparency.

Key highlights include:
- Enhanced disclosure requirements for fund houses
- Stricter norms for expense ratios
- New guidelines for direct plan distribution
- Improved grievance redressal mechanisms

Industry experts believe these changes will benefit retail investors by providing better transparency and reducing costs. However, fund houses may need to adjust their operations to comply with the new regulations.

The move comes as part of SEBI's ongoing efforts to modernize India's financial markets and align them with global best practices. Asset management companies have welcomed the changes, though some have expressed concerns about implementation timelines.`,
    category: 'Regulatory',
    tags: ['sebi', 'mutual-funds', 'regulations', 'compliance'],
    author: newsAuthors['financial-research-team'],
    publishedAt: '2025-01-15T10:30:00+05:30',
    updatedAt: '2025-01-15T10:30:00+05:30',
    imageUrl: '/news/sebi-regulations.jpg',
    readTime: 4,
    featured: true,
    keywords: ['SEBI regulations', 'mutual fund compliance', 'investor protection'],
    relatedProducts: [
      { type: 'mutualfund', id: 'hdfc-balanced-advantage', name: 'HDFC Balanced Advantage Fund' }
    ]
  },
  {
    id: '2',
    slug: 'tata-motors-ipo-listing-analysis',
    headline: 'Tata Motors EV Subsidiary IPO: Strong Listing Expected',
    summary: 'Analysts predict robust listing gains for Tata Motors\' electric vehicle subsidiary as the IPO opens for subscription next week.',
    content: `Tata Motors' electric vehicle subsidiary is set to launch its initial public offering next week, with market analysts predicting strong listing gains based on robust fundamentals and growing EV demand.

The IPO details:
- Price band: ₹300-320 per share
- Issue size: ₹8,000 crore
- Minimum lot size: 45 shares
- Opening date: January 22, 2025

Grey market premium indicates strong investor interest, with shares trading at a premium of 25-30% above the upper price band. Industry experts attribute this to the company's strong order book, technological capabilities, and favorable government policies supporting EV adoption.

The subsidiary has shown impressive growth, with revenue increasing 80% YoY and production capacity expanding to meet rising demand. With India's EV market expected to grow at 45% CAGR through 2030, the company is well-positioned to capitalize on this trend.`,
    category: 'IPO',
    tags: ['ipo', 'tata-motors', 'electric-vehicles', 'listing'],
    author: newsAuthors['ipo-specialist'],
    publishedAt: '2025-01-16T09:00:00+05:30',
    updatedAt: '2025-01-16T09:00:00+05:30',
    imageUrl: '/news/tata-ev-ipo.jpg',
    readTime: 5,
    featured: false,
    keywords: ['Tata Motors IPO', 'EV IPO', 'stock listing'],
    relatedProducts: [
      { type: 'stock', id: 'TATAMOTORS', name: 'Tata Motors' }
    ]
  },
  {
    id: '3',
    slug: 'bitcoin-crosses-50000-regulatory-clarity',
    headline: 'Bitcoin Crosses $50,000 as Regulatory Clarity Improves',
    summary: 'Cryptocurrency markets rally as major economies signal clearer regulatory frameworks for digital assets.',
    content: `Bitcoin surged past the $50,000 mark today, driven by improved regulatory clarity from major economies and growing institutional adoption. The flagship cryptocurrency gained 12% in 24 hours, leading a broader rally across digital assets.

Market catalysts:
- EU finalizes comprehensive crypto regulations
- US SEC provides clarity on spot Bitcoin ETFs
- Major banks announce crypto custody services
- Institutional investment flows increase

Ethereum and other major altcoins also posted significant gains, with the total crypto market capitalization exceeding $2 trillion. Analysts suggest this rally is different from previous cycles, being driven more by institutional adoption than retail speculation.

India's crypto market has also seen increased activity, with trading volumes up 40% this month. However, investors are advised to exercise caution and only invest what they can afford to lose, given the volatile nature of cryptocurrency markets.`,
    category: 'Crypto',
    tags: ['bitcoin', 'cryptocurrency', 'regulations', 'market-rally'],
    author: newsAuthors['crypto-analyst'],
    publishedAt: '2025-01-16T14:30:00+05:30',
    updatedAt: '2025-01-16T14:30:00+05:30',
    imageUrl: '/news/bitcoin-rally.jpg',
    readTime: 4,
    featured: false,
    keywords: ['Bitcoin price', 'crypto regulations', 'cryptocurrency rally'],
    relatedProducts: [
      { type: 'crypto', id: 'BTC', name: 'Bitcoin' }
    ]
  }
];

export const mockByteNews: ByteNews[] = [
  {
    id: 'b1',
    headline: 'Nifty 50 hits new all-time high, crosses 22,500 mark',
    category: 'Stocks',
    timestamp: '2025-01-17T11:30:00+05:30',
    source: 'NSE',
    sentiment: 'positive',
    relatedArticle: 'market-analysis-jan-2025'
  },
  {
    id: 'b2',
    headline: 'RBI maintains repo rate at 6.5% in monetary policy review',
    category: 'Economy',
    timestamp: '2025-01-17T10:00:00+05:30',
    source: 'RBI',
    sentiment: 'neutral'
  },
  {
    id: 'b3',
    headline: 'SBI Mutual Fund launches new flexi-cap fund',
    category: 'Mutual Funds',
    timestamp: '2025-01-17T09:15:00+05:30',
    source: 'SBI MF',
    sentiment: 'positive'
  },
  {
    id: 'b4',
    headline: 'Ethereum upgrade scheduled for Q2 2025',
    category: 'Crypto',
    timestamp: '2025-01-17T08:45:00+05:30',
    source: 'Ethereum Foundation',
    sentiment: 'positive'
  },
  {
    id: 'b5',
    headline: 'SEBI tightens norms for F&O trading',
    category: 'Regulatory',
    timestamp: '2025-01-16T16:30:00+05:30',
    source: 'SEBI',
    sentiment: 'neutral'
  },
  {
    id: 'b6',
    headline: 'Zomato shares surge 8% on strong quarterly results',
    category: 'Stocks',
    timestamp: '2025-01-16T15:20:00+05:30',
    source: 'BSE',
    sentiment: 'positive'
  }
];

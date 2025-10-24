export interface NewsAuthor {
  id: string;
  name: string;
  avatar: string;
  jobTitle: string;
  bio: string;
  credentials: string;
  expertise: string[];
  education?: string;
  yearsOfExperience: number;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
  };
  awards?: string[];
  articleCount: number;
}

export interface NewsArticle {
  id: string;
  slug: string;
  headline: string;
  summary: string;
  content: string;
  category: string;
  tags: string[];
  author: NewsAuthor;
  publishedAt: string;
  updatedAt: string;
  imageUrl: string;
  readTime: number;
  featured: boolean;
  relatedArticles?: string[];
  relatedProducts?: {
    type: 'stock' | 'mutualfund' | 'crypto';
    id: string;
    name: string;
  }[];
  keywords: string[];
}

export interface ByteNews {
  id: string;
  headline: string;
  category: string;
  timestamp: string;
  source: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
  relatedArticle?: string;
}

export interface ProductFeature {
  id: string;
  title: string;
  description: string;
  benefit: string;
  icon: string;
  ctaText: string;
  route: string;
  gradient: string;
  statLabel?: string;
  statValue?: string;
}

export interface NewsCategory {
  slug: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

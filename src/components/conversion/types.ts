// Shared types for conversion widgets — usable on web pages AND inline in chat
export interface ConversionContext {
  goal?: string;
  risk?: 'Low' | 'Moderate' | 'High' | 'Very High';
  horizon?: string; // e.g. "5+ years"
  amount?: number;
}

export interface ShortlistFund {
  code: string;
  name: string;
  category: string;
  reason: string; // "Why this fund" — 1 sentence
  reasonTags: string[]; // e.g. ["Low expense", "Top quartile 3Y"]
  returns1Y: number;
  returns3Y: number;
  returns5Y: number;
  expenseRatio: number;
  riskLevel: string;
  amc: string;
  rating: number;
  aum: number;
}

export interface ActionCardItem {
  id: string;
  severity: 'info' | 'warn' | 'critical';
  title: string;
  description: string;
  cta: string;
  ctaTarget?: string; // route or intent
  impact?: ImpactPreview;
}

export interface ImpactPreview {
  label: string;
  before: { label: string; value: string | number; tone?: 'good' | 'bad' | 'neutral' }[];
  after: { label: string; value: string | number; tone?: 'good' | 'bad' | 'neutral' }[];
  summary: string;
}

export interface AlertItem {
  id: string;
  type: 'price' | 'sip' | 'nav' | 'goal' | 'rebalance' | 'news' | 'digest';
  severity: 'info' | 'warn' | 'critical';
  title: string;
  body: string;
  ctaLabel: string;
  ctaTarget?: string;
  holdingTag?: string;
  ts: string;
}

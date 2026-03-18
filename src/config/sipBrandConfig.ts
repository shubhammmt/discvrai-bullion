import { Bot, type LucideIcon } from 'lucide-react';

/**
 * SIP Module — Centralized Brand Configuration
 * 
 * Change these values to rebrand the entire SIP module.
 * For color theming, modify the --sip-* CSS variables in src/index.css.
 */
export const SIP_BRAND = {
  /** Display name shown in sidebar, headers, chat */
  name: 'DiscvrAI',
  /** Copilot persona name */
  copilotName: 'Wealth Copilot',
  /** Tagline shown below brand name */
  tagline: 'Wealth Platform',
  /** Chat copilot subtitle */
  copilotSubtitle: 'Your Wealth Copilot',
  /** Welcome message templates by user state */
  welcomeMessages: {
    anonymous: "Hi there! 👋 I am your Wealth Copilot. I can help you in following:",
    logged_in_no_holdings: "Welcome! 👋 I am your Wealth Copilot. I can help you in following:",
    investor: (name: string) => `Hi ${name}! 👋 I am your Wealth Copilot. I can help you in following:`,
  },
  /** Footer disclaimer */
  disclaimer: 'AI-powered • Your data is secure • Not financial advice',
} as const;

/** Logo icon used throughout the SIP module — change this to swap the logo globally */
export const SIP_LOGO_ICON: LucideIcon = Bot;

/**
 * Category-to-CSS-variable mapping for Goals, Discovery sections.
 * Each maps to --sip-category-N tokens defined in index.css.
 */
export const SIP_CATEGORY_MAP: Record<string, string> = {
  Wedding: 'sip-category-1',
  Education: 'sip-category-2',
  Home: 'sip-category-3',
  Emergency: 'sip-category-4',
  Retirement: 'sip-category-5',
};

/**
 * Statement type to semantic color token mapping.
 */
export const SIP_STATEMENT_COLORS: Record<string, string> = {
  account: 'sip-action-info',
  'capital-gains': 'sip-action-success',
  transaction: 'sip-category-5',
  'tax-saving': 'sip-action-warning',
};

/**
 * Discovery section category color mapping.
 */
export const SIP_DISCOVERY_COLORS: Record<string, string> = {
  'top-performers': 'sip-action-success',
  'low-expense': 'sip-action-info',
  'tax-saving': 'sip-category-5',
  compounders: 'sip-action-warning',
  nfo: 'sip-action-danger',
};

/**
 * Asset allocation color mapping.
 */
export const SIP_ALLOCATION_COLORS: Record<string, string> = {
  Equity: 'sip-alloc-equity',
  Debt: 'sip-alloc-debt',
  Hybrid: 'sip-alloc-hybrid',
  Other: 'sip-alloc-other',
  'Solution Oriented': 'sip-alloc-solution',
};

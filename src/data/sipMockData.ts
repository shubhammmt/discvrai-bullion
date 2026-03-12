export type SIPStatus = 'active' | 'paused' | 'cancelled';
export type SIPFrequency = 'monthly' | 'quarterly' | 'yearly';

export interface SIPRecord {
  id: string;
  fundName: string;
  fundCode: string;
  category: string;
  amount: number;
  frequency: SIPFrequency;
  startDate: string;
  nextDate: string;
  stepUpPercent: number;
  bankMandate: string;
  goalTag: string;
  status: SIPStatus;
  totalInvested: number;
  currentValue: number;
  installmentsDone: number;
  nav: number;
  units: number;
}

export type AssetClass = 'Equity' | 'Debt' | 'Hybrid' | 'Other' | 'Solution Oriented';
export type MarketCap = 'Large Cap' | 'Mid Cap' | 'Small Cap' | 'Multi Cap' | 'Flexi Cap';

export interface MutualFund {
  code: string;
  name: string;
  category: string;          // sub-category e.g. "Large Cap", "Overnight Fund"
  assetClass: AssetClass;
  marketCap?: MarketCap;     // only for Equity
  nav: number;
  rating: number;
  expenseRatio: number;      // percentage
  returns1Y: number;         // percentage
  returns3Y: number;         // percentage
  amc: string;               // fund house
  planType: 'Direct' | 'Regular';
}

export const ASSET_CLASSES: AssetClass[] = ['Equity', 'Debt', 'Hybrid', 'Other', 'Solution Oriented'];
export const MARKET_CAPS: MarketCap[] = ['Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap', 'Flexi Cap'];

export const EQUITY_CATEGORIES = [
  'Large Cap', 'Mid Cap', 'Small Cap', 'Multi Cap', 'Flexi Cap',
  'Large & Mid Cap', 'ELSS', 'Sectoral', 'Thematic', 'Focused', 'Dividend Yield', 'Value',
];
export const DEBT_CATEGORIES = [
  'Overnight Fund', 'Liquid', 'Ultra Short Duration', 'Short Duration',
  'Medium Duration', 'Long Duration', 'Corporate Bond', 'Gilt',
];
export const HYBRID_CATEGORIES = ['Aggressive Hybrid', 'Conservative Hybrid', 'Balanced Advantage', 'Arbitrage'];

export const AMC_LIST = [
  'SBI Mutual Fund', 'HDFC Mutual Fund', 'ICICI Prudential', 'Axis Mutual Fund',
  'Kotak Mutual Fund', 'Mirae Asset', 'Nippon India', 'Parag Parikh', 'DSP Mutual Fund',
  'Tata Mutual Fund', 'UTI Mutual Fund', 'Aditya Birla Sun Life',
];

export const MOCK_FUNDS: MutualFund[] = [
  { code: 'HDFC-LCF-G', name: 'HDFC Large Cap Fund - Growth', category: 'Large Cap', assetClass: 'Equity', marketCap: 'Large Cap', nav: 842.35, rating: 4, expenseRatio: 1.05, returns1Y: 14.2, returns3Y: 16.8, amc: 'HDFC Mutual Fund', planType: 'Direct' },
  { code: 'AXIS-BLU-G', name: 'Axis Bluechip Fund - Growth', category: 'Large Cap', assetClass: 'Equity', marketCap: 'Large Cap', nav: 52.18, rating: 5, expenseRatio: 0.49, returns1Y: 18.5, returns3Y: 20.1, amc: 'Axis Mutual Fund', planType: 'Direct' },
  { code: 'SBI-SC-G', name: 'SBI Small Cap Fund - Growth', category: 'Small Cap', assetClass: 'Equity', marketCap: 'Small Cap', nav: 148.72, rating: 4, expenseRatio: 0.72, returns1Y: 22.3, returns3Y: 28.5, amc: 'SBI Mutual Fund', planType: 'Direct' },
  { code: 'MIRA-MC-G', name: 'Mirae Asset Midcap Fund - Growth', category: 'Mid Cap', assetClass: 'Equity', marketCap: 'Mid Cap', nav: 28.94, rating: 4, expenseRatio: 0.58, returns1Y: 19.8, returns3Y: 24.2, amc: 'Mirae Asset', planType: 'Direct' },
  { code: 'PPFAS-FV-G', name: 'Parag Parikh Flexi Cap Fund - Growth', category: 'Flexi Cap', assetClass: 'Equity', marketCap: 'Flexi Cap', nav: 72.56, rating: 5, expenseRatio: 0.63, returns1Y: 16.9, returns3Y: 21.4, amc: 'Parag Parikh', planType: 'Direct' },
  { code: 'ICICI-TECH-G', name: 'ICICI Prudential Technology Fund - Growth', category: 'Sectoral', assetClass: 'Equity', marketCap: 'Large Cap', nav: 186.40, rating: 3, expenseRatio: 1.24, returns1Y: 8.5, returns3Y: 12.3, amc: 'ICICI Prudential', planType: 'Direct' },
  { code: 'KOTA-EM-G', name: 'Kotak Emerging Equity Fund - Growth', category: 'Mid Cap', assetClass: 'Equity', marketCap: 'Mid Cap', nav: 96.22, rating: 4, expenseRatio: 0.52, returns1Y: 20.1, returns3Y: 25.6, amc: 'Kotak Mutual Fund', planType: 'Direct' },
  { code: 'NIPP-MF-G', name: 'Nippon India Multi Cap Fund - Growth', category: 'Multi Cap', assetClass: 'Equity', marketCap: 'Multi Cap', nav: 234.18, rating: 3, expenseRatio: 0.98, returns1Y: 15.7, returns3Y: 18.9, amc: 'Nippon India', planType: 'Direct' },
  // Debt funds
  { code: 'HDFC-LIQ-G', name: 'HDFC Liquid Fund - Growth', category: 'Liquid', assetClass: 'Debt', nav: 4521.30, rating: 5, expenseRatio: 0.20, returns1Y: 7.1, returns3Y: 6.5, amc: 'HDFC Mutual Fund', planType: 'Direct' },
  { code: 'SBI-ON-G', name: 'SBI Overnight Fund - Growth', category: 'Overnight Fund', assetClass: 'Debt', nav: 3842.15, rating: 4, expenseRatio: 0.08, returns1Y: 6.5, returns3Y: 5.8, amc: 'SBI Mutual Fund', planType: 'Direct' },
  { code: 'ICICI-SD-G', name: 'ICICI Prudential Short Term Fund - Growth', category: 'Short Duration', assetClass: 'Debt', nav: 56.42, rating: 4, expenseRatio: 0.36, returns1Y: 7.8, returns3Y: 7.2, amc: 'ICICI Prudential', planType: 'Direct' },
  // Hybrid funds
  { code: 'HDFC-BAF-G', name: 'HDFC Balanced Advantage Fund - Growth', category: 'Balanced Advantage', assetClass: 'Hybrid', nav: 412.56, rating: 4, expenseRatio: 0.82, returns1Y: 12.4, returns3Y: 14.8, amc: 'HDFC Mutual Fund', planType: 'Direct' },
  { code: 'ICICI-EH-G', name: 'ICICI Prudential Equity & Debt Fund - Growth', category: 'Aggressive Hybrid', assetClass: 'Hybrid', nav: 298.33, rating: 3, expenseRatio: 1.02, returns1Y: 13.1, returns3Y: 15.2, amc: 'ICICI Prudential', planType: 'Direct' },
  // Solution Oriented
  { code: 'HDFC-RET-G', name: 'HDFC Retirement Savings Fund - Growth', category: 'Retirement', assetClass: 'Solution Oriented', nav: 38.75, rating: 4, expenseRatio: 0.94, returns1Y: 14.6, returns3Y: 17.3, amc: 'HDFC Mutual Fund', planType: 'Direct' },
];

export const MOCK_SIPS: SIPRecord[] = [
  {
    id: 'sip-001',
    fundName: 'HDFC Large Cap Fund - Growth',
    fundCode: 'HDFC-LCF-G',
    category: 'Large Cap',
    amount: 5000,
    frequency: 'monthly',
    startDate: '2024-01-15',
    nextDate: '2026-04-15',
    stepUpPercent: 10,
    bankMandate: 'HDFC Bank ****4521',
    goalTag: 'Retirement',
    status: 'active',
    totalInvested: 130000,
    currentValue: 148200,
    installmentsDone: 26,
    nav: 842.35,
    units: 175.92,
  },
  {
    id: 'sip-002',
    fundName: 'SBI Small Cap Fund - Growth',
    fundCode: 'SBI-SC-G',
    category: 'Small Cap',
    amount: 3000,
    frequency: 'monthly',
    startDate: '2024-06-01',
    nextDate: '2026-04-01',
    stepUpPercent: 0,
    bankMandate: 'ICICI Bank ****8832',
    goalTag: 'Wealth Creation',
    status: 'active',
    totalInvested: 63000,
    currentValue: 71400,
    installmentsDone: 21,
    nav: 148.72,
    units: 480.12,
  },
  {
    id: 'sip-003',
    fundName: 'Axis Bluechip Fund - Growth',
    fundCode: 'AXIS-BLU-G',
    category: 'Large Cap',
    amount: 10000,
    frequency: 'monthly',
    startDate: '2023-03-10',
    nextDate: '',
    stepUpPercent: 15,
    bankMandate: 'SBI ****7210',
    goalTag: 'Child Education',
    status: 'paused',
    totalInvested: 180000,
    currentValue: 212000,
    installmentsDone: 18,
    nav: 52.18,
    units: 3451.32,
  },
  {
    id: 'sip-004',
    fundName: 'Parag Parikh Flexi Cap Fund - Growth',
    fundCode: 'PPFAS-FV-G',
    category: 'Flexi Cap',
    amount: 2000,
    frequency: 'quarterly',
    startDate: '2025-01-01',
    nextDate: '2026-04-01',
    stepUpPercent: 5,
    bankMandate: 'Kotak ****3345',
    goalTag: 'Emergency Fund',
    status: 'active',
    totalInvested: 10000,
    currentValue: 10800,
    installmentsDone: 5,
    nav: 72.56,
    units: 148.84,
  },
];

export const BANK_MANDATES = [
  'HDFC Bank ****4521',
  'ICICI Bank ****8832',
  'SBI ****7210',
  'Kotak ****3345',
  'Axis Bank ****6678',
];

export const GOAL_TAGS = [
  'Retirement',
  'Child Education',
  'Wealth Creation',
  'Emergency Fund',
  'Home Purchase',
  'Vacation',
  'Custom Goal',
];

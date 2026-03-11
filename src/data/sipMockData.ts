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

export const MOCK_FUNDS = [
  { code: 'HDFC-LCF-G', name: 'HDFC Large Cap Fund - Growth', category: 'Large Cap', nav: 842.35, rating: 4 },
  { code: 'AXIS-BLU-G', name: 'Axis Bluechip Fund - Growth', category: 'Large Cap', nav: 52.18, rating: 5 },
  { code: 'SBI-SC-G', name: 'SBI Small Cap Fund - Growth', category: 'Small Cap', nav: 148.72, rating: 4 },
  { code: 'MIRA-MC-G', name: 'Mirae Asset Midcap Fund - Growth', category: 'Mid Cap', nav: 28.94, rating: 4 },
  { code: 'PPFAS-FV-G', name: 'Parag Parikh Flexi Cap Fund - Growth', category: 'Flexi Cap', nav: 72.56, rating: 5 },
  { code: 'ICICI-TECH-G', name: 'ICICI Prudential Technology Fund - Growth', category: 'Sectoral', nav: 186.40, rating: 3 },
  { code: 'KOTA-EM-G', name: 'Kotak Emerging Equity Fund - Growth', category: 'Mid Cap', nav: 96.22, rating: 4 },
  { code: 'NIPP-MF-G', name: 'Nippon India Multi Cap Fund - Growth', category: 'Multi Cap', nav: 234.18, rating: 3 },
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

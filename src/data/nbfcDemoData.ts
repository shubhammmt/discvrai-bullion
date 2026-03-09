// Mock data for NBFC AI demonstrations

export interface NbfcCustomer {
  id: string;
  name: string;
  age: number;
  city: string;
  tier: string;
  existingProducts: string[];
  monthlyIncome: number;
  creditScore: number;
  upiTransactions: number;
  avgUpiAmount: number;
  loanEmi: number;
  accountAge: number; // months
  lastInteraction: string;
  preferredChannel: string;
  language: string;
}

export interface NbaRecommendation {
  product: string;
  confidence: number;
  reason: string;
  channel: string;
  timing: string;
  expectedConversion: number;
  potentialRevenue: number;
}

export interface CollectionRiskAccount {
  id: string;
  customer: string;
  loanType: string;
  outstanding: number;
  emi: number;
  dpd: number; // days past due
  riskScore: number;
  predictedDefault: string;
  behavioralSignals: string[];
  recommendedAction: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  contactAttempts: number;
  lastPayment: string;
}

export const mockCustomers: NbfcCustomer[] = [
  {
    id: 'CUST001',
    name: 'Rajesh Sharma',
    age: 35,
    city: 'Mumbai',
    tier: 'Tier 1',
    existingProducts: ['Personal Loan', 'Credit Card'],
    monthlyIncome: 125000,
    creditScore: 742,
    upiTransactions: 87,
    avgUpiAmount: 3200,
    loanEmi: 18500,
    accountAge: 48,
    lastInteraction: '2 days ago',
    preferredChannel: 'WhatsApp',
    language: 'Hindi'
  },
  {
    id: 'CUST002',
    name: 'Priya Patel',
    age: 28,
    city: 'Ahmedabad',
    tier: 'Tier 2',
    existingProducts: ['Gold Loan'],
    monthlyIncome: 65000,
    creditScore: 698,
    upiTransactions: 124,
    avgUpiAmount: 1800,
    loanEmi: 8500,
    accountAge: 18,
    lastInteraction: '1 week ago',
    preferredChannel: 'App',
    language: 'Gujarati'
  },
  {
    id: 'CUST003',
    name: 'Venkatesh Rao',
    age: 45,
    city: 'Bangalore',
    tier: 'Tier 1',
    existingProducts: ['Home Loan', 'Life Insurance', 'Credit Card'],
    monthlyIncome: 285000,
    creditScore: 789,
    upiTransactions: 45,
    avgUpiAmount: 8500,
    loanEmi: 65000,
    accountAge: 84,
    lastInteraction: '3 days ago',
    preferredChannel: 'Call',
    language: 'English'
  },
  {
    id: 'CUST004',
    name: 'Sunita Devi',
    age: 38,
    city: 'Patna',
    tier: 'Tier 3',
    existingProducts: ['Two-Wheeler Loan'],
    monthlyIncome: 35000,
    creditScore: 654,
    upiTransactions: 156,
    avgUpiAmount: 850,
    loanEmi: 4200,
    accountAge: 24,
    lastInteraction: '2 weeks ago',
    preferredChannel: 'SMS',
    language: 'Hindi'
  },
  {
    id: 'CUST005',
    name: 'Mohammed Khan',
    age: 32,
    city: 'Hyderabad',
    tier: 'Tier 1',
    existingProducts: ['Business Loan', 'Current Account'],
    monthlyIncome: 180000,
    creditScore: 721,
    upiTransactions: 210,
    avgUpiAmount: 12500,
    loanEmi: 42000,
    accountAge: 36,
    lastInteraction: '1 day ago',
    preferredChannel: 'WhatsApp',
    language: 'Telugu'
  }
];

export const generateNbaRecommendations = (customer: NbfcCustomer): NbaRecommendation[] => {
  const recommendations: NbaRecommendation[] = [];
  
  // Health Insurance recommendation logic
  if (!customer.existingProducts.includes('Health Insurance') && customer.age > 30) {
    recommendations.push({
      product: 'Health Insurance',
      confidence: customer.age > 40 ? 0.89 : 0.76,
      reason: `Age ${customer.age} with ${customer.existingProducts.length} existing products. High engagement pattern (${customer.upiTransactions} monthly UPI). No health coverage detected.`,
      channel: customer.preferredChannel,
      timing: 'Within 48 hours',
      expectedConversion: customer.creditScore > 700 ? 0.34 : 0.22,
      potentialRevenue: customer.monthlyIncome * 0.03 * 12
    });
  }
  
  // Term Insurance for home loan customers
  if (customer.existingProducts.includes('Home Loan') && !customer.existingProducts.includes('Term Insurance')) {
    recommendations.push({
      product: 'Term Insurance',
      confidence: 0.92,
      reason: `Home Loan customer without term coverage. Outstanding liability exposure. Family protection gap identified.`,
      channel: 'Call',
      timing: 'Priority - Same day',
      expectedConversion: 0.41,
      potentialRevenue: customer.monthlyIncome * 0.015 * 12
    });
  }
  
  // Top-up loan for good payers
  if (customer.creditScore > 700 && customer.accountAge > 24 && customer.loanEmi > 0) {
    recommendations.push({
      product: 'Top-Up Loan',
      confidence: 0.84,
      reason: `${customer.accountAge} months relationship. Credit score ${customer.creditScore}. EMI payment history: Excellent. Pre-approved limit available.`,
      channel: customer.preferredChannel,
      timing: 'Within 7 days',
      expectedConversion: 0.28,
      potentialRevenue: customer.monthlyIncome * 2.5
    });
  }
  
  // Credit Card for high UPI users
  if (!customer.existingProducts.includes('Credit Card') && customer.upiTransactions > 80) {
    recommendations.push({
      product: 'Credit Card',
      confidence: 0.81,
      reason: `High digital payment velocity: ${customer.upiTransactions} UPI/month, avg ₹${customer.avgUpiAmount}. Card rewards alignment opportunity.`,
      channel: 'App',
      timing: 'Within 3 days',
      expectedConversion: 0.38,
      potentialRevenue: customer.avgUpiAmount * 12 * 0.02
    });
  }
  
  // Investment products for high income
  if (customer.monthlyIncome > 100000 && !customer.existingProducts.includes('Mutual Funds')) {
    recommendations.push({
      product: 'Mutual Fund SIP',
      confidence: 0.73,
      reason: `Monthly income ₹${customer.monthlyIncome.toLocaleString()}. Surplus capacity detected: ₹${Math.round((customer.monthlyIncome - customer.loanEmi) * 0.2).toLocaleString()}/month investable.`,
      channel: customer.preferredChannel,
      timing: 'Month-end (salary credit)',
      expectedConversion: 0.19,
      potentialRevenue: customer.monthlyIncome * 0.1 * 12 * 0.02
    });
  }
  
  return recommendations.sort((a, b) => b.confidence - a.confidence).slice(0, 4);
};

export const mockCollectionAccounts: CollectionRiskAccount[] = [
  {
    id: 'LOAN001',
    customer: 'Arun Mehta',
    loanType: 'Personal Loan',
    outstanding: 245000,
    emi: 12500,
    dpd: 0,
    riskScore: 78,
    predictedDefault: '15-Mar-2026',
    behavioralSignals: [
      'UPI velocity dropped 45% in last 30 days',
      'Salary credit delayed by 8 days',
      'Multiple failed auto-debit attempts',
      'Increased cash withdrawals'
    ],
    recommendedAction: 'Proactive call - Payment reminder + restructuring offer',
    priority: 'high',
    contactAttempts: 0,
    lastPayment: '10-Feb-2026'
  },
  {
    id: 'LOAN002',
    customer: 'Kavitha Sundaram',
    loanType: 'Business Loan',
    outstanding: 890000,
    emi: 38500,
    dpd: 0,
    riskScore: 85,
    predictedDefault: '08-Mar-2026',
    behavioralSignals: [
      'GST filings show 60% revenue drop',
      'Creditor payment delays on trade finance',
      'Supplier payments bounced (2 instances)',
      'Personal expense ratio increased'
    ],
    recommendedAction: 'Relationship Manager visit - Business health assessment',
    priority: 'critical',
    contactAttempts: 0,
    lastPayment: '05-Feb-2026'
  },
  {
    id: 'LOAN003',
    customer: 'Deepak Verma',
    loanType: 'Two-Wheeler Loan',
    outstanding: 48000,
    emi: 3200,
    dpd: 15,
    riskScore: 62,
    predictedDefault: '22-Mar-2026',
    behavioralSignals: [
      'Missed 1 EMI (currently 15 DPD)',
      'Phone number changed (not updated)',
      'Employment status: Gig worker (variable income)'
    ],
    recommendedAction: 'WhatsApp + IVR in Hindi - Flexible payment options',
    priority: 'medium',
    contactAttempts: 3,
    lastPayment: '15-Jan-2026'
  },
  {
    id: 'LOAN004',
    customer: 'Sneha Reddy',
    loanType: 'Gold Loan',
    outstanding: 175000,
    emi: 9800,
    dpd: 0,
    riskScore: 45,
    predictedDefault: '05-Apr-2026',
    behavioralSignals: [
      'LTV approaching 75% threshold',
      'Gold price volatility exposure',
      'Part-payment pattern: Irregular'
    ],
    recommendedAction: 'SMS reminder - LTV alert + top-up option',
    priority: 'low',
    contactAttempts: 0,
    lastPayment: '01-Mar-2026'
  },
  {
    id: 'LOAN005',
    customer: 'Rakesh Gupta',
    loanType: 'Home Loan',
    outstanding: 3200000,
    emi: 28500,
    dpd: 0,
    riskScore: 92,
    predictedDefault: '01-Mar-2026',
    behavioralSignals: [
      'Job loss detected (LinkedIn status change)',
      'Credit card utilization spiked to 95%',
      'Multiple loan inquiries in last 30 days',
      'Savings account balance: Critical low'
    ],
    recommendedAction: 'Immediate RM call - Moratorium/restructuring discussion',
    priority: 'critical',
    contactAttempts: 1,
    lastPayment: '28-Jan-2026'
  },
  {
    id: 'LOAN006',
    customer: 'Anita Sharma',
    loanType: 'Personal Loan',
    outstanding: 125000,
    emi: 8200,
    dpd: 45,
    riskScore: 71,
    predictedDefault: 'Already in default',
    behavioralSignals: [
      '45 DPD - 2 EMIs missed',
      'Partial payment attempt (₹4,000) bounced',
      'Contact responsive but citing temporary hardship'
    ],
    recommendedAction: 'Settlement offer - 10% waiver for lump sum',
    priority: 'high',
    contactAttempts: 8,
    lastPayment: '15-Dec-2025'
  }
];

export const collectionMetrics = {
  totalPortfolio: 4850000000, // ₹485 Cr
  accountsAtRisk: 12847,
  predictedNpa: 145000000, // ₹14.5 Cr
  preventableNpa: 98000000, // ₹9.8 Cr (68%)
  avgDaysEarlyWarning: 42,
  contactRateImprovement: 38,
  collectionEfficiency: 34,
  costPerContact: 45, // ₹45 (down from ₹120)
};

export const nbaMetrics = {
  totalCustomers: 82000000, // 8.2 Cr
  crossSellEligible: 34000000, // 3.4 Cr
  monthlyRecommendations: 2800000,
  conversionRate: 12.4,
  avgRevenuePerConversion: 18500,
  monthlyRevenue: 6400000000, // ₹640 Cr
  channelOptimization: {
    whatsapp: { reach: 78, conversion: 14.2 },
    app: { reach: 45, conversion: 18.6 },
    call: { reach: 62, conversion: 9.8 },
    sms: { reach: 92, conversion: 3.2 }
  }
};

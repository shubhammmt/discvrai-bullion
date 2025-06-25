
export interface QuickAssessmentData {
  userProfile: {
    ageGroup: string;
    incomeRange: string;
    cityType: 'metro' | 'tier1' | 'tier2';
  };
  assets: {
    totalValue: number; // in lakhs
    allocation: {
      equityPercentage: number;
      debtPercentage: number;
      cashPercentage: number;
    };
  };
  commitments: {
    monthlyEmi: number; // in thousands
    hasEmergencyFund: boolean;
  };
}

export interface HealthScoreData {
  overall: number;
  grade: string;
  summary: string;
  categories: {
    assetAllocation: number;
    emergencyFund: number;
    debtManagement: number;
    savingsRate: number;
  };
  actionPlan: Array<{
    priority: number;
    title: string;
    description: string;
    impact: string;
    timeframe: string;
    category: string;
  }>;
  benchmarks: {
    percentile: number;
    peerGroup: string;
  };
}

// Legacy interface for backward compatibility
export interface AssessmentData {
  age: number;
  income: number;
  savings: number;
  investments: number;
  insurance: {
    life: boolean;
    health: boolean;
    amount: number;
  };
  debt: {
    total: number;
    emi: number;
  };
  goals: {
    emergency: boolean;
    retirement: boolean;
    home: boolean;
  };
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
}

// Helper functions for calculation
const getIncomeMidpoint = (range: string): number => {
  const mapping: { [key: string]: number } = {
    '25K-50K': 37500,
    '50K-75K': 62500,
    '75K-1L': 87500,
    '1L-1.5L': 125000,
    '1.5L-2L': 175000,
    '2L+': 250000
  };
  return mapping[range] || 50000;
};

const getExpenseRatio = (cityType: string): number => {
  const mapping: { [key: string]: number } = {
    'metro': 0.70,
    'tier1': 0.60,
    'tier2': 0.50
  };
  return mapping[cityType] || 0.60;
};

const getTargetEquityPercentage = (ageGroup: string): number => {
  const mapping: { [key: string]: number } = {
    '25-30': 72.5,
    '31-35': 67.5,
    '36-40': 62.5,
    '41-45': 57.5,
    '46-50': 52.5,
    '50+': 45
  };
  return mapping[ageGroup] || 60;
};

// Scoring functions
const calculateAllocationScore = (currentEquity: number, targetEquity: number): number => {
  const deviation = Math.abs(currentEquity - targetEquity);
  return Math.max(0, 100 - deviation * 2);
};

const calculateEmergencyScore = (hasEmergencyFund: boolean, cashValue: number, requiredAmount: number): number => {
  if (hasEmergencyFund) return 100;
  
  const coverage = cashValue / requiredAmount;
  if (coverage >= 1.0) return 100;
  if (coverage >= 0.5) return 70;
  if (coverage >= 0.25) return 40;
  return Math.max(0, coverage * 40);
};

const calculateDebtScore = (emiToIncomeRatio: number): number => {
  if (emiToIncomeRatio <= 0.2) return 100;
  if (emiToIncomeRatio <= 0.3) return 80;
  if (emiToIncomeRatio <= 0.4) return 60;
  if (emiToIncomeRatio <= 0.5) return 30;
  return Math.max(0, 30 - (emiToIncomeRatio - 0.5) * 60);
};

const calculateSavingsScore = (disposableIncome: number, income: number): number => {
  const savingsRate = disposableIncome / income;
  
  if (savingsRate >= 0.2) return 100;
  if (savingsRate >= 0.15) return 80;
  if (savingsRate >= 0.1) return 60;
  if (savingsRate >= 0.05) return 40;
  return Math.max(20, savingsRate * 400);
};

const getGrade = (score: number): string => {
  if (score >= 90) return "A+";
  if (score >= 80) return "A";
  if (score >= 70) return "B+";
  if (score >= 60) return "B";
  if (score >= 50) return "C+";
  if (score >= 40) return "C";
  return "D";
};

const getSummary = (score: number): string => {
  if (score >= 80) return "Excellent financial health! Keep up the great work.";
  if (score >= 70) return "Good foundation! Focus on optimization.";
  if (score >= 60) return "Solid progress! Some areas need attention.";
  if (score >= 50) return "On the right track! Let's improve together.";
  return "Let's build a stronger financial foundation.";
};

export const calculateHealthScore = (data: QuickAssessmentData): HealthScoreData => {
  // Derive metrics
  const monthlyIncome = getIncomeMidpoint(data.userProfile.incomeRange);
  const expenseRatio = getExpenseRatio(data.userProfile.cityType);
  const monthlyExpenses = monthlyIncome * expenseRatio;
  const requiredEmergencyFund = monthlyExpenses * 6;
  
  const totalValueInRupees = data.assets.totalValue * 100000; // Convert lakhs to rupees
  const currentCashValue = totalValueInRupees * (data.assets.allocation.cashPercentage / 100);
  
  const monthlyEmiInRupees = data.commitments.monthlyEmi * 1000; // Convert thousands to rupees
  const emiToIncomeRatio = monthlyEmiInRupees / monthlyIncome;
  const disposableIncome = monthlyIncome - monthlyExpenses - monthlyEmiInRupees;
  
  const targetEquity = getTargetEquityPercentage(data.userProfile.ageGroup);
  
  // Calculate component scores
  const allocationScore = calculateAllocationScore(data.assets.allocation.equityPercentage, targetEquity);
  const emergencyScore = calculateEmergencyScore(data.commitments.hasEmergencyFund, currentCashValue, requiredEmergencyFund);
  const debtScore = calculateDebtScore(emiToIncomeRatio);
  const savingsScore = calculateSavingsScore(disposableIncome, monthlyIncome);
  
  // Calculate overall score with weights
  const overallScore = Math.round(
    allocationScore * 0.40 +
    emergencyScore * 0.30 +
    debtScore * 0.20 +
    savingsScore * 0.10
  );
  
  // Generate action plan
  const actionPlan = [];
  
  if (emergencyScore < 50) {
    const shortfall = requiredEmergencyFund - currentCashValue;
    actionPlan.push({
      priority: 1,
      title: "Build Emergency Fund",
      description: `Save ₹${Math.round(shortfall / 1000)}K more for 6 months expenses`,
      impact: "+20 points",
      timeframe: "3 months",
      category: "safety"
    });
  }
  
  if (Math.abs(data.assets.allocation.equityPercentage - targetEquity) > 15) {
    actionPlan.push({
      priority: 2,
      title: "Rebalance Portfolio",
      description: `Move toward ${targetEquity}% equity allocation`,
      impact: "+10 points",
      timeframe: "1 month",
      category: "optimization"
    });
  }
  
  if (emiToIncomeRatio > 0.4) {
    actionPlan.push({
      priority: 3,
      title: "Reduce Debt Burden",
      description: "Consider debt consolidation or prepayment",
      impact: "+15 points",
      timeframe: "6 months",
      category: "debt"
    });
  }
  
  if (savingsScore < 60) {
    actionPlan.push({
      priority: 4,
      title: "Increase Savings Rate",
      description: "Optimize expenses and increase monthly savings",
      impact: "+8 points",
      timeframe: "2 months",
      category: "savings"
    });
  }
  
  return {
    overall: overallScore,
    grade: getGrade(overallScore),
    summary: getSummary(overallScore),
    categories: {
      assetAllocation: Math.round(allocationScore),
      emergencyFund: Math.round(emergencyScore),
      debtManagement: Math.round(debtScore),
      savingsRate: Math.round(savingsScore)
    },
    actionPlan: actionPlan.sort((a, b) => a.priority - b.priority),
    benchmarks: {
      percentile: Math.min(95, Math.max(5, overallScore + Math.random() * 10 - 5)),
      peerGroup: `${data.userProfile.cityType === 'metro' ? 'Urban' : 'Tier-' + data.userProfile.cityType.slice(-1)} professionals, ${data.userProfile.ageGroup} age`
    }
  };
};

// Legacy function for backward compatibility
export const calculateHealthScoreOld = (data: AssessmentData): any => {
  const savingsRatio = data.savings / (data.income * 12);
  const investmentRatio = data.investments / (data.income * 12);
  const wealthScore = Math.min(100, (savingsRatio * 30 + investmentRatio * 70) * 100);

  let protectionScore = 0;
  if (data.insurance.life) protectionScore += 40;
  if (data.insurance.health) protectionScore += 40;
  const coverageRatio = data.insurance.amount / (data.income * 10);
  protectionScore += Math.min(20, coverageRatio * 20);

  const debtToIncomeRatio = (data.debt.emi * 12) / data.income;
  const debtScore = Math.max(0, 100 - (debtToIncomeRatio * 200));

  let goalScore = 0;
  if (data.goals.emergency) goalScore += 33;
  if (data.goals.retirement) goalScore += 33;
  if (data.goals.home) goalScore += 34;

  const overall = Math.round((wealthScore + protectionScore + debtScore + goalScore) / 4);

  const recommendations = [];
  if (wealthScore < 60) recommendations.push("Increase your investment allocation");
  if (protectionScore < 60) recommendations.push("Get adequate life and health insurance");
  if (debtScore < 70) recommendations.push("Optimize your debt structure");
  if (goalScore < 70) recommendations.push("Set up emergency fund and retirement goals");

  return {
    overall,
    categories: {
      wealth: Math.round(wealthScore),
      protection: Math.round(protectionScore),
      debt: Math.round(debtScore),
      goals: Math.round(goalScore)
    },
    recommendations
  };
};

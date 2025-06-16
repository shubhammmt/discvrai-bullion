
export interface HealthScoreData {
  overall: number;
  categories: {
    wealth: number;
    protection: number;
    debt: number;
    goals: number;
  };
  recommendations: string[];
}

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

export const calculateHealthScore = (data: AssessmentData): HealthScoreData => {
  // Wealth Building Score (0-100)
  const savingsRatio = data.savings / (data.income * 12);
  const investmentRatio = data.investments / (data.income * 12);
  const wealthScore = Math.min(100, (savingsRatio * 30 + investmentRatio * 70) * 100);

  // Protection Score (0-100)
  let protectionScore = 0;
  if (data.insurance.life) protectionScore += 40;
  if (data.insurance.health) protectionScore += 40;
  const coverageRatio = data.insurance.amount / (data.income * 10); // 10x income rule
  protectionScore += Math.min(20, coverageRatio * 20);

  // Debt Management Score (0-100)
  const debtToIncomeRatio = (data.debt.emi * 12) / data.income;
  const debtScore = Math.max(0, 100 - (debtToIncomeRatio * 200)); // Penalty for high debt

  // Goal Achievement Score (0-100)
  let goalScore = 0;
  if (data.goals.emergency) goalScore += 33;
  if (data.goals.retirement) goalScore += 33;
  if (data.goals.home) goalScore += 34;

  // Overall Score
  const overall = Math.round((wealthScore + protectionScore + debtScore + goalScore) / 4);

  // Generate recommendations
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


// Portfolio Reconciliation Utility
// Handles conflicts between basic profile totals and detailed instrument entries

import { DetailedInstrument } from './apiIntegration';

export interface ProfileTotals {
  equity: number;
  debt: number;
  insurance: number;
  realEstate: number;
  emergency: number;
  other: number;
}

export interface ReconciliationConflict {
  category: string;
  profileTotal: number;
  calculatedTotal: number;
  difference: number;
  instruments: DetailedInstrument[];
}

export interface ReconciliationResult {
  hasConflicts: boolean;
  conflicts: ReconciliationConflict[];
  recommendedAction: 'useDetailed' | 'useProfile' | 'manual';
  updatedTotals: ProfileTotals;
}

export const calculateTotalsFromInstruments = (instruments: DetailedInstrument[]): ProfileTotals => {
  const totals: ProfileTotals = {
    equity: 0,
    debt: 0,
    insurance: 0,
    realEstate: 0,
    emergency: 0,
    other: 0
  };

  instruments.forEach(instrument => {
    const category = instrument.category.toLowerCase();
    if (category in totals) {
      totals[category as keyof ProfileTotals] += instrument.currentValue;
    } else {
      totals.other += instrument.currentValue;
    }
  });

  return totals;
};

export const reconcilePortfolioData = (
  profileTotals: ProfileTotals,
  detailedInstruments: DetailedInstrument[]
): ReconciliationResult => {
  const calculatedTotals = calculateTotalsFromInstruments(detailedInstruments);
  const conflicts: ReconciliationConflict[] = [];

  // Check for conflicts in each category
  Object.keys(profileTotals).forEach(category => {
    const profileValue = profileTotals[category as keyof ProfileTotals];
    const calculatedValue = calculatedTotals[category as keyof ProfileTotals];
    const difference = Math.abs(profileValue - calculatedValue);

    // Consider it a conflict if difference is more than 5% or ₹10,000
    const threshold = Math.max(profileValue * 0.05, 10000);
    
    if (difference > threshold && (profileValue > 0 || calculatedValue > 0)) {
      const categoryInstruments = detailedInstruments.filter(
        inst => inst.category.toLowerCase() === category
      );

      conflicts.push({
        category,
        profileTotal: profileValue,
        calculatedTotal: calculatedValue,
        difference,
        instruments: categoryInstruments
      });
    }
  });

  const hasConflicts = conflicts.length > 0;
  let recommendedAction: 'useDetailed' | 'useProfile' | 'manual' = 'useDetailed';

  // Recommendation logic
  if (!hasConflicts) {
    recommendedAction = 'useDetailed';
  } else if (detailedInstruments.length === 0) {
    recommendedAction = 'useProfile';
  } else if (conflicts.length > 2) {
    recommendedAction = 'manual';
  } else {
    recommendedAction = 'useDetailed'; // Default: trust detailed entries
  }

  return {
    hasConflicts,
    conflicts,
    recommendedAction,
    updatedTotals: calculatedTotals
  };
};

export const formatCurrency = (amount: number): string => {
  if (amount >= 10000000) { // 1 crore
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (amount >= 100000) { // 1 lakh
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (amount >= 1000) { // 1 thousand
    return `₹${(amount / 1000).toFixed(0)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
};

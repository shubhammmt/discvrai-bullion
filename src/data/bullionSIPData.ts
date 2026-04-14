// Shared bullion SIP data used by Portfolio and Notifications pages

export interface BullionSIP {
  id: string;
  metal: 'gold' | 'silver';
  amount: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextDebit: string;
  totalInvested: number;
  grams: number;
  active: boolean;
}

export const activeBullionSIPs: BullionSIP[] = [
  { id: "1", metal: "gold", amount: 1000, frequency: "monthly", nextDebit: "Jan 15, 2026", totalInvested: 6000, grams: 0.96, active: true },
  { id: "2", metal: "silver", amount: 500, frequency: "weekly", nextDebit: "Jan 3, 2026", totalInvested: 4000, grams: 52, active: true },
];

/**
 * Returns calendar events for all active monthly SIPs.
 * Used by BullionNotifications to auto-populate the calendar tab.
 */
export function getMonthlySIPEvents(): { date: string; event: string; type: 'sip'; metal: 'gold' | 'silver' }[] {
  return activeBullionSIPs
    .filter(sip => sip.active && sip.frequency === 'monthly')
    .map(sip => ({
      date: sip.nextDebit,
      event: `Monthly ${sip.metal === 'gold' ? 'Gold' : 'Silver'} SIP – ₹${sip.amount.toLocaleString()}`,
      type: 'sip' as const,
      metal: sip.metal,
    }));
}

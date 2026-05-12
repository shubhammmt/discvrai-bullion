// Shared goals store — single source of truth for GoalsWidget + SmartShortlist
// Seed reflects the previous SAMPLE_GOALS so the demo stays consistent.
import { useEffect, useState } from 'react';

export type RiskLevel = 'Conservative' | 'Moderate' | 'Aggressive' | 'Very Aggressive';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  monthlySIP: number;
  targetDate: string; // "Mon YYYY"
  category: string;   // Wedding | Education | Home | Emergency | Retirement | (custom)
  riskLevel: RiskLevel;
  useProfileRisk: boolean;
}

const KEY = 'discvr.goals.v1';

const SEED: Goal[] = [
  { id: '1', name: 'Marriage Celebration', targetAmount: 10000000, currentAmount: 280000, monthlySIP: 29494, targetDate: 'Dec 2028', category: 'Wedding', riskLevel: 'Moderate', useProfileRisk: true },
  { id: '2', name: "Child's Education", targetAmount: 5000000, currentAmount: 120000, monthlySIP: 15000, targetDate: 'Jun 2032', category: 'Education', riskLevel: 'Aggressive', useProfileRisk: false },
  { id: '3', name: 'Emergency Fund', targetAmount: 500000, currentAmount: 320000, monthlySIP: 5000, targetDate: 'Dec 2026', category: 'Emergency', riskLevel: 'Conservative', useProfileRisk: false },
];

const load = (): Goal[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* noop */ }
  return SEED;
};

const persist = (s: Goal[]) => {
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch { /* noop */ }
};

let state: Goal[] = load();
const subs = new Set<() => void>();
const emit = () => subs.forEach(s => s());

export const goalsStore = {
  getAll: () => state,
  set: (next: Goal[]) => { state = next; persist(state); emit(); },
  add: (g: Goal) => { state = [...state, g]; persist(state); emit(); },
  update: (g: Goal) => { state = state.map(x => x.id === g.id ? g : x); persist(state); emit(); },
  remove: (id: string) => { state = state.filter(x => x.id !== id); persist(state); emit(); },
  subscribe: (cb: () => void) => { subs.add(cb); return () => { subs.delete(cb); }; },
};

export function useGoals(): Goal[] {
  const [snap, setSnap] = useState<Goal[]>(state);
  useEffect(() => goalsStore.subscribe(() => setSnap([...goalsStore.getAll()])), []);
  return snap;
}

// Helper: derive horizon in years from "Mon YYYY"
export function goalHorizonYears(targetDate: string): number {
  const m = targetDate.match(/(\d{4})/);
  if (!m) return 5;
  return Math.max(1, Number(m[1]) - new Date().getFullYear());
}

// Helper: required CAGR to reach target via the planned monthly SIP
export function requiredCAGR(g: Goal): number | null {
  const yrs = goalHorizonYears(g.targetDate);
  const monthlyContrib = g.monthlySIP * 12 * yrs;
  const totalNeeded = g.targetAmount - g.currentAmount;
  if (monthlyContrib <= 0 || totalNeeded <= 0 || yrs <= 0) return null;
  // crude: required annualised return s.t. SIP future value reaches target
  // using simplified ratio model (good enough for the illustrative demo)
  const ratio = totalNeeded / monthlyContrib;
  return Math.max(0, (Math.pow(ratio, 1 / yrs) - 1) * 100 + 6);
}

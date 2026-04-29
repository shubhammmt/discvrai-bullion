// Lightweight in-memory store for demo: shared between FundDetailSheet,
// AlertsAndDigests (Tracked tab) and the Wealth Copilot.
// Persists to localStorage so the demo survives reloads.

export type AssetType = 'mutual_fund' | 'stock';

export interface WatchItem {
  id: string;            // `${assetType}:${symbol}`
  assetType: AssetType;
  symbol: string;        // e.g. PPFAS-FLEXI or HDFCBANK
  name: string;
  refValue?: number;     // NAV / price at time of adding
  addedAt: string;
}

export interface AlertItem {
  id: string;
  assetType: AssetType;
  symbol: string;
  name: string;
  kind: 'price' | 'drawdown';
  condition: 'above' | 'below';
  targetValue: number;   // absolute price for 'price', or % for 'drawdown'
  baseline?: number;     // NAV / price when alert was set
  status: 'active' | 'triggered';
  createdAt: string;
  source: 'sheet' | 'copilot' | 'wizard';
}

interface State {
  watch: WatchItem[];
  alerts: AlertItem[];
}

const KEY = 'discvr.tracked.v1';

const load = (): State => {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return seed();
};

const seed = (): State => ({
  watch: [
    { id: 'mutual_fund:PPFAS-FLEXI', assetType: 'mutual_fund', symbol: 'PPFAS-FLEXI', name: 'Parag Parikh Flexi Cap', refValue: 78.2, addedAt: new Date(Date.now() - 86400000 * 4).toISOString() },
    { id: 'stock:HDFCBANK', assetType: 'stock', symbol: 'HDFCBANK', name: 'HDFC Bank', refValue: 1684.3, addedAt: new Date(Date.now() - 86400000 * 2).toISOString() },
  ],
  alerts: [
    { id: 'a1', assetType: 'mutual_fund', symbol: 'HDFC-FLEXI', name: 'HDFC Flexi Cap Fund', kind: 'drawdown', condition: 'below', targetValue: 5, baseline: 1542.8, status: 'active', createdAt: new Date(Date.now() - 86400000).toISOString(), source: 'copilot' },
  ],
});

let state: State = load();
const subs = new Set<() => void>();

const persist = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch {} };
const emit = () => { persist(); subs.forEach(fn => fn()); };

export const trackedStore = {
  get: () => state,
  subscribe(fn: () => void) { subs.add(fn); return () => subs.delete(fn); },

  isWatched(assetType: AssetType, symbol: string) {
    return state.watch.some(w => w.assetType === assetType && w.symbol === symbol);
  },

  addWatch(item: Omit<WatchItem, 'id' | 'addedAt'>) {
    const id = `${item.assetType}:${item.symbol}`;
    if (state.watch.some(w => w.id === id)) return;
    state = { ...state, watch: [{ ...item, id, addedAt: new Date().toISOString() }, ...state.watch] };
    emit();
  },

  removeWatch(assetType: AssetType, symbol: string) {
    state = { ...state, watch: state.watch.filter(w => !(w.assetType === assetType && w.symbol === symbol)) };
    emit();
  },

  addAlert(item: Omit<AlertItem, 'id' | 'createdAt' | 'status'>) {
    const id = `al-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
    state = { ...state, alerts: [{ ...item, id, status: 'active', createdAt: new Date().toISOString() }, ...state.alerts] };
    emit();
    return id;
  },

  removeAlert(id: string) {
    state = { ...state, alerts: state.alerts.filter(a => a.id !== id) };
    emit();
  },

  reset() { state = seed(); emit(); },
};

import { useSyncExternalStore } from 'react';
export const useTracked = () =>
  useSyncExternalStore(trackedStore.subscribe, trackedStore.get, trackedStore.get);

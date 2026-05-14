// Phase-1 Rebalance Engine — deterministic, config-driven.
// Three triggers only: single-fund concentration, sector concentration, benchmark nudge.
// No drift. Every leg traceable to a triggerId + rule.

import { REBALANCE_CONFIG, RebalanceConfig } from './rebalanceConfig';
import { MOCK_SIPS, MOCK_FUNDS, MutualFund } from '@/data/sipMockData';
import { buildSmartShortlist } from './shortlistEngine';

export type RebalanceTriggerKind = 'single-fund' | 'sector' | 'benchmark';
export type RebalanceSeverity = 'critical' | 'warn';

export interface Holding {
  fundId: string;
  name: string;
  amc: string;
  category: string;
  sector: string;
  assetClass: string;
  valueINR: number;
}

export interface RebalanceTrigger {
  id: string;
  kind: RebalanceTriggerKind;
  severity: RebalanceSeverity;
  title: string;
  why: string;
  metric?: string;
  // Identifier of the breached entity (fundId or sector name) — used for leg generation.
  ref?: string;
}

export type LegType = 'reduce' | 'switch' | 'buy';

export interface PlanLeg {
  id: string;
  type: LegType;
  sourceFundId?: string;
  sourceFundName?: string;
  destFundId?: string;
  destFundName?: string;
  amountINR: number;
  triggerId: string;
  why: string;
}

// ---------- Holdings adapter ----------
export function getMockHoldings(): Holding[] {
  return MOCK_SIPS.map(sip => {
    const fund = MOCK_FUNDS.find(f => f.code === sip.fundCode);
    return {
      fundId: sip.fundCode,
      name: sip.fundName,
      amc: fund?.amc || '—',
      category: fund?.category || sip.category,
      sector: fund?.sector || (fund?.assetClass === 'Debt' ? 'Debt' : 'Diversified'),
      assetClass: fund?.assetClass || 'Equity',
      valueINR: sip.currentValue,
    };
  });
}

// ---------- Aggregates ----------
function totalValue(hs: Holding[]) {
  return hs.reduce((s, h) => s + h.valueINR, 0);
}
function fundWeights(hs: Holding[]) {
  const tv = totalValue(hs) || 1;
  return hs.map(h => ({ h, weight: (h.valueINR / tv) * 100 }));
}
function sectorWeights(hs: Holding[]) {
  const tv = totalValue(hs) || 1;
  const map: Record<string, number> = {};
  hs.forEach(h => { map[h.sector] = (map[h.sector] || 0) + h.valueINR; });
  return Object.entries(map).map(([sector, val]) => ({ sector, weight: (val / tv) * 100 }));
}

// ---------- Trigger evaluation ----------
export function evaluateTriggers(
  hs: Holding[] = getMockHoldings(),
  cfg: RebalanceConfig = REBALANCE_CONFIG,
): RebalanceTrigger[] {
  const out: RebalanceTrigger[] = [];

  // Single-fund concentration
  if (cfg.singleFund.enabled) {
    fundWeights(hs).forEach(({ h, weight }) => {
      if (weight > cfg.singleFund.critical) {
        out.push({
          id: `tg-fund-${h.fundId}`,
          kind: 'single-fund',
          severity: 'critical',
          title: `${h.name} is ${weight.toFixed(1)}% of portfolio`,
          why: `One fund above the ${cfg.singleFund.critical}% critical cap.`,
          metric: `${weight.toFixed(1)}% / cap ${cfg.singleFund.warn}%`,
          ref: h.fundId,
        });
      } else if (weight > cfg.singleFund.warn) {
        out.push({
          id: `tg-fund-${h.fundId}`,
          kind: 'single-fund',
          severity: 'warn',
          title: `${h.name} is ${weight.toFixed(1)}% of portfolio`,
          why: `Above the ${cfg.singleFund.warn}% warning cap.`,
          metric: `${weight.toFixed(1)}% / cap ${cfg.singleFund.warn}%`,
          ref: h.fundId,
        });
      }
    });
  }

  // Sector concentration
  if (cfg.sector.enabled) {
    sectorWeights(hs).forEach(({ sector, weight }) => {
      if (weight > cfg.sector.critical) {
        out.push({
          id: `tg-sector-${sector}`,
          kind: 'sector',
          severity: 'critical',
          title: `${sector} sector is ${weight.toFixed(1)}% of portfolio`,
          why: `Sector exposure above the ${cfg.sector.critical}% critical cap.`,
          metric: `${weight.toFixed(1)}% / cap ${cfg.sector.warn}%`,
          ref: sector,
        });
      } else if (weight > cfg.sector.warn) {
        out.push({
          id: `tg-sector-${sector}`,
          kind: 'sector',
          severity: 'warn',
          title: `${sector} sector is ${weight.toFixed(1)}% of portfolio`,
          why: `Above the ${cfg.sector.warn}% warning cap.`,
          metric: `${weight.toFixed(1)}% / cap ${cfg.sector.warn}%`,
          ref: sector,
        });
      }
    });
  }

  // Benchmark / market move
  if (cfg.benchmark.enabled) {
    const dd = Math.abs(cfg.benchmark.mockDrawdownPct);
    if (dd >= cfg.benchmark.criticalDrawdownPct) {
      out.push({
        id: 'tg-benchmark',
        kind: 'benchmark',
        severity: 'critical',
        title: `${cfg.benchmark.index} down ${dd.toFixed(1)}% (last ${cfg.benchmark.lookbackSessions} sessions)`,
        why: `Market move beyond the ${cfg.benchmark.criticalDrawdownPct}% critical band — review your plan.`,
        metric: `${dd.toFixed(1)}% drawdown`,
      });
    } else if (dd >= cfg.benchmark.warnDrawdownPct) {
      out.push({
        id: 'tg-benchmark',
        kind: 'benchmark',
        severity: 'warn',
        title: `${cfg.benchmark.index} down ${dd.toFixed(1)}% (last ${cfg.benchmark.lookbackSessions} sessions)`,
        why: `Market move beyond the ${cfg.benchmark.warnDrawdownPct}% warning band.`,
        metric: `${dd.toFixed(1)}% drawdown`,
      });
    }
  }

  return sortTriggers(out);
}

// Sort: critical first, tie-break order singleFund → sector → benchmark.
const KIND_ORDER: Record<RebalanceTriggerKind, number> = {
  'single-fund': 0, 'sector': 1, 'benchmark': 2,
};
export function sortTriggers(xs: RebalanceTrigger[]) {
  return [...xs].sort((a, b) =>
    (a.severity === 'critical' ? 0 : 1) - (b.severity === 'critical' ? 0 : 1)
    || KIND_ORDER[a.kind] - KIND_ORDER[b.kind],
  );
}

export function topTriggers(xs: RebalanceTrigger[], n = REBALANCE_CONFIG.maxAlertCards) {
  return xs.slice(0, n);
}

// ---------- Plan legs ----------
function roundAmount(v: number, step = REBALANCE_CONFIG.roundToINR) {
  return Math.max(REBALANCE_CONFIG.minOrderINR, Math.round(v / step) * step);
}

function pickDestination(sourceCategory: string, excludeFundId?: string): MutualFund | undefined {
  const shortlist = buildSmartShortlist({ risk: 'Moderate' }, 20);
  const eligible = shortlist
    .map(s => MOCK_FUNDS.find(f => f.code === s.code))
    .filter((f): f is MutualFund => !!f && f.code !== excludeFundId);
  // Prefer same category, otherwise fallback to first eligible.
  return eligible.find(f => f.category === sourceCategory) || eligible[0];
}

export function buildPlanLegs(
  triggers: RebalanceTrigger[],
  hs: Holding[] = getMockHoldings(),
  cfg: RebalanceConfig = REBALANCE_CONFIG,
): PlanLeg[] {
  const tv = totalValue(hs);
  const legs: PlanLeg[] = [];
  const reducedByFund: Record<string, number> = {};

  for (const t of triggers) {
    if (t.kind === 'single-fund' && t.ref) {
      const h = hs.find(x => x.fundId === t.ref);
      if (!h) continue;
      const currentWeight = (h.valueINR / tv) * 100;
      const targetWeight = Math.max(0, cfg.singleFund.warn - 1); // 1pp buffer
      const ppGap = currentWeight - targetWeight;
      if (ppGap <= 0) continue;
      const amount = roundAmount((ppGap / 100) * tv);
      const dest = pickDestination(h.category, h.fundId);
      legs.push({
        id: `${t.id}-reduce`,
        type: 'switch',
        sourceFundId: h.fundId,
        sourceFundName: h.name,
        destFundId: dest?.code,
        destFundName: dest?.name,
        amountINR: amount,
        triggerId: t.id,
        why: `Trim ${h.name} from ${currentWeight.toFixed(1)}% → ~${targetWeight}% (cap ${cfg.singleFund.warn}%).`,
      });
      reducedByFund[h.fundId] = (reducedByFund[h.fundId] || 0) + amount;
    }

    if (t.kind === 'sector' && t.ref) {
      const sector = t.ref;
      const inSector = hs.filter(h => h.sector === sector).sort((a, b) => b.valueINR - a.valueINR);
      const currentSectorVal = inSector.reduce((s, h) => s + h.valueINR, 0);
      const currentWeight = (currentSectorVal / tv) * 100;
      const targetWeight = Math.max(0, cfg.sector.warn - 1);
      const ppGap = currentWeight - targetWeight;
      if (ppGap <= 0) continue;
      let toTrimINR = (ppGap / 100) * tv;
      for (const h of inSector) {
        if (toTrimINR <= 0) break;
        const already = reducedByFund[h.fundId] || 0;
        const available = Math.max(0, h.valueINR - already);
        const take = Math.min(available, toTrimINR);
        if (take < cfg.minOrderINR) continue;
        const amount = roundAmount(take);
        const dest = pickDestination(h.category, h.fundId);
        legs.push({
          id: `${t.id}-reduce-${h.fundId}`,
          type: 'switch',
          sourceFundId: h.fundId,
          sourceFundName: h.name,
          destFundId: dest?.code,
          destFundName: dest?.name,
          amountINR: amount,
          triggerId: t.id,
          why: `Bring ${sector} sector ${currentWeight.toFixed(1)}% → ~${targetWeight}% (cap ${cfg.sector.warn}%).`,
        });
        reducedByFund[h.fundId] = (reducedByFund[h.fundId] || 0) + amount;
        toTrimINR -= amount;
      }
    }

    // benchmark → no auto legs in MVP
  }

  // Merge duplicates (same source + dest)
  const merged: Record<string, PlanLeg> = {};
  for (const l of legs) {
    const k = `${l.sourceFundId}:${l.destFundId}:${l.triggerId}`;
    if (merged[k]) merged[k].amountINR += l.amountINR;
    else merged[k] = l;
  }
  return Object.values(merged);
}

// ---------- Mock submit (single integration boundary) ----------
export async function submitRebalancePlan(legs: PlanLeg[]): Promise<{ ok: true; planId: string; submittedAt: string }> {
  await new Promise(r => setTimeout(r, 600));
  return { ok: true, planId: `PLN-${Date.now()}`, submittedAt: new Date().toISOString() };
}

// ---------- View helpers ----------
export function getSectorBreakdown(hs: Holding[] = getMockHoldings()) {
  return sectorWeights(hs).sort((a, b) => b.weight - a.weight);
}
export function getFundBreakdown(hs: Holding[] = getMockHoldings()) {
  return fundWeights(hs).sort((a, b) => b.weight - a.weight);
}

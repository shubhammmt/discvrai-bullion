// Index of conversion widgets — single import point for pages and chat
export * from './types';
export { SmartShortlist } from './SmartShortlist';
export { CompareDrawer } from './CompareDrawer';
export { ContextChips } from './ContextChips';
export { ResumeSetupCard, CutoffBanner, getCutoffStatus } from './ResumeSetupCard';
export { TransactionTimeline, SAMPLE_TIMELINE } from './TransactionTimeline';
export { ActionCard, ImpactPreviewView, SAMPLE_ACTION_CARDS } from './ActionCard';
export { AlertCard, SAMPLE_ALERTS } from './AlertCard';
export { buildSmartShortlist } from './shortlistEngine';
export { CuratedShelves, CURATED_SHELVES } from './CuratedShelves';
export { TriggerCard } from './TriggerCard';
export { ActionQueue } from './ActionQueue';
export { SipHealthModule } from './SipHealthModule';
export type { SipHealth } from './SipHealthModule';
export { AddInstrumentDialog } from './AddInstrumentDialog';
export {
  DEFAULT_THRESHOLDS, SAMPLE_TRIGGERS, sortTriggers,
  topTrigger, topRebalanceTrigger, topSipTrigger, isApplyAllEligible,
  triggerActionLabel,
} from './triggerEngine';
export type {
  PortfolioTrigger, TriggerSeverity, TriggerActionType,
  TriggerCategory, TriggerThresholds,
} from './triggerEngine';
export { trackConversionEvent } from './events';
export type { ConversionEvent } from './events';
export { RebalanceAlertsStrip } from './RebalanceAlertsStrip';
export {
  evaluateTriggers, buildPlanLegs, submitRebalancePlan,
  getMockHoldings, getSectorBreakdown, getFundBreakdown, topTriggers,
} from './rebalanceEngine';
export type { RebalanceTrigger, PlanLeg, Holding } from './rebalanceEngine';
export { REBALANCE_CONFIG } from './rebalanceConfig';

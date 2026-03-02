export interface AptechExecSlide {
  id: string;
  type: string;
  title: string;
  headline?: string;
}

export const aptechExecutionSlides: AptechExecSlide[] = [
  { id: 'exec-cover', type: 'exec-cover', title: 'Cover', headline: 'Consolidated Execution Plan' },
  { id: 'exec-purpose', type: 'exec-purpose', title: 'Purpose & Two Tracks' },
  { id: 'exec-shared', type: 'exec-shared', title: 'Shared Foundation' },
  { id: 'exec-phase0', type: 'exec-phase0', title: 'Phase 0: Scoping' },
  { id: 'exec-timeline-impact', type: 'exec-timeline-impact', title: 'Timeline & Costing Impact' },
  { id: 'exec-modules-core', type: 'exec-modules-core', title: 'Core Modules (2.1)' },
  { id: 'exec-modules-addons', type: 'exec-modules-addons', title: 'Add-on Modules (2.2)' },
  { id: 'exec-pods', type: 'exec-pods', title: 'Delivery Pods' },
  { id: 'exec-effort', type: 'exec-effort', title: 'Manpower by Module' },
  { id: 'exec-dependencies', type: 'exec-dependencies', title: 'Dependencies & Client Costs' },
  { id: 'exec-parallel', type: 'exec-parallel', title: 'Parallel vs Sequential' },
  { id: 'exec-timeline-p', type: 'exec-timeline-p', title: 'Timeline: Option P (Parallel)' },
  { id: 'exec-cost-summary', type: 'exec-cost-summary', title: 'Cost Consolidation' },
  { id: 'exec-cost-table', type: 'exec-cost-table', title: 'Complete Cost Summary' },
  { id: 'exec-payment', type: 'exec-payment', title: 'Payment Terms & Recurring' },
  { id: 'exec-deliverables', type: 'exec-deliverables', title: 'Scoping Deliverables' },
  { id: 'exec-governance', type: 'exec-governance', title: 'Governance & Refresh' },
  { id: 'exec-discuss', type: 'exec-discuss', title: 'Discussion Topics' },
];

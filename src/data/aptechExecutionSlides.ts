export interface AptechExecSlide {
  id: string;
  type: string;
  title: string;
}

export const aptechExecutionSlides: AptechExecSlide[] = [
  { id: 'exec-cover', type: 'exec-cover', title: 'Cover' },
  { id: 'exec-overview', type: 'exec-overview', title: 'Proposal at a Glance' },
  { id: 'exec-track-a', type: 'exec-track-a', title: 'Track A — Pre-Sales' },
  { id: 'exec-track-b', type: 'exec-track-b', title: 'Track B — Post-Sales' },
  { id: 'exec-exclusions', type: 'exec-exclusions', title: 'Client-Borne Costs' },
  { id: 'exec-payment', type: 'exec-payment', title: 'Payment Terms' },
  { id: 'exec-scope-change', type: 'exec-scope-change', title: 'Scope Change & Next Steps' },
  { id: 'exec-summary', type: 'exec-summary', title: 'Summary' },
];

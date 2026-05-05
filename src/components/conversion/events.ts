// Lightweight client-side instrumentation. Production should pipe to your
// analytics warehouse (Segment / Mixpanel / your own pipeline).
export type ConversionEvent =
  | 'trigger_generated' | 'trigger_viewed' | 'trigger_action_clicked'
  | 'rebalance_plan_opened' | 'plan_accepted' | 'plan_edited'
  | 'order_initiated' | 'order_completed'
  | 'sip_resumed' | 'sip_topup_accepted' | 'sip_date_changed'
  | 'apply_all_clicked' | 'instrument_added' | 'alert_created';

export function trackConversionEvent(event: ConversionEvent, payload: Record<string, unknown> = {}) {
  const evt = { event, ts: Date.now(), ...payload };
  try {
    // eslint-disable-next-line no-console
    console.info('[conv]', evt);
    window.dispatchEvent(new CustomEvent('conv:event', { detail: evt }));
  } catch { /* ignore */ }
}

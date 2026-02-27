export interface FleetRun {
  id: string;
  vehicle: string;
  cluster: string;
  status: 'sla-risk' | 'maintenance-due' | 'optimized' | 'on-route';
  lastActivity: string;
  agentActionId: string | null;
}

export interface AgentAction {
  id: string;
  type: string;
  urgency: 'high' | 'medium' | 'low';
  vehicle: string;
  route: string;
  summary: string;
  reasoning: string;
  riskIfIgnored: string;
}

export const fleetRuns: FleetRun[] = [
  {
    id: "R-101",
    vehicle: "Van 07",
    cluster: "Zone North · Cluster 7",
    status: "sla-risk",
    lastActivity: "Agent detected traffic disruption on primary corridor — SLA breach in 18 min if unresolved. Re-route suggested via alternate route (saves 14 min). Awaiting approval.",
    agentActionId: "AQ-001",
  },
  {
    id: "R-102",
    vehicle: "Van 34",
    cluster: "Zone West · Cluster 3",
    status: "maintenance-due",
    lastActivity: "Agent flagged predictive maintenance — brake wear at 78% (telemetry). Recommended window: tomorrow 06:00–10:00 (off-peak, no run impact).",
    agentActionId: "AQ-002",
  },
  {
    id: "R-103",
    vehicle: "Van 19",
    cluster: "Zone South · Cluster 11",
    status: "optimized",
    lastActivity: "Agent optimized route — 12% fuel saving vs. planned. 3 backhaul collections added on return leg without SLA impact. Route locked.",
    agentActionId: null,
  },
  {
    id: "R-104",
    vehicle: "Van 12",
    cluster: "Zone North · Cluster 2",
    status: "on-route",
    lastActivity: "On route as planned. No anomalies detected. Next stop ETA: 11:15.",
    agentActionId: null,
  },
  {
    id: "R-105",
    vehicle: "Van 55",
    cluster: "Zone East · Cluster 9",
    status: "sla-risk",
    lastActivity: "Agent detected site cash depletion risk — < 4 hours remaining at current rate. Priority re-order suggested. Awaiting approval.",
    agentActionId: "AQ-003",
  },
];

export const agentActionQueue: AgentAction[] = [
  {
    id: "AQ-001",
    type: "Re-route Suggested",
    urgency: "high",
    vehicle: "Van 07",
    route: "Zone North · Cluster 7",
    summary: "Traffic disruption on primary corridor — alternate route saves 14 min and protects SLA",
    reasoning: "Live traffic feed (09:52): primary route blocked near Zone North interchange (incident). Alternate corridor adds 3.2 km but saves 14 min — ETA revised from 10:28 to 10:14. SLA window: 10:30. Without re-route: SLA breach certain.",
    riskIfIgnored: "SLA breach in 18 min. Penalty clause exposure.",
  },
  {
    id: "AQ-002",
    type: "Maintenance Flag",
    urgency: "medium",
    vehicle: "Van 34",
    route: "Zone West · Cluster 3",
    summary: "Brake pad wear at 78% — schedule maintenance before next long-haul run",
    reasoning: "Telemetry (last 7 days): brake wear rate 4.2% / day. At current rate, critical threshold (85%) reached in ~1.7 days. Recommended: Service Bay 2, tomorrow 06:00–10:00 (off-peak). No run impact — Van 34 back on route by 10:30.",
    riskIfIgnored: "Risk of in-route breakdown within 2 days. SLA breach + safety exposure.",
  },
  {
    id: "AQ-003",
    type: "Cash Depletion Alert",
    urgency: "high",
    vehicle: "Van 55",
    route: "Zone East · Cluster 9",
    summary: "Site SITE-NE-019 cash depletion in < 4 hours — divert Van 55 for priority replenishment",
    reasoning: "SITE-NE-019 cash level: ₹2.1 Cr remaining. Average Monday dispense rate: ₹5.8 Cr / 24 hrs. Estimated depletion by 14:30. Van 55 is the nearest available asset — diversion does not impact other SLAs in its current cluster. Agent suggests: approve diversion now.",
    riskIfIgnored: "Site cash-out at ~14:30. SLA penalty. Client satisfaction impact.",
  },
];

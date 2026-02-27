export interface FailureDetail {
  testId: string;
  description: string;
  agentSuggestion: string;
}

export interface IntegrationJob {
  id: string;
  client: string;
  project: string;
  environment: string;
  status: 'completed' | 'failures' | 'pending' | 'failed';
  lastActivity: string;
  completedDate?: string;
  totalTests: number;
  failures: number | null;
  failureDetails?: FailureDetail[];
}

export const integrationJobs: IntegrationJob[] = [
  {
    id: "JOB-001",
    client: "Institutional Client A",
    project: "Core Software — Channel Management Module",
    environment: "Production",
    status: "completed",
    lastActivity: "Agent ran 312 tests — 0 failures. Deployment signed off. Client live.",
    completedDate: "12-Jan-25",
    totalTests: 312,
    failures: 0,
  },
  {
    id: "JOB-002",
    client: "Institutional Client B",
    project: "Core Software — Reconciliation Module",
    environment: "UAT",
    status: "failures",
    lastActivity: "Agent ran 47 tests — 2 failures detected. Surfaced for review.",
    totalTests: 47,
    failures: 2,
    failureDetails: [
      {
        testId: "TC-041",
        description: "API endpoint /txn/reconcile returned HTTP 503 under high-volume payload (>500 transactions/batch). Test: send 600-txn batch, expect 200.",
        agentSuggestion: "Increase request timeout on the client adapter from 15s to 30s in config/adapters.json. Re-run TC-041 after update.",
      },
      {
        testId: "TC-089",
        description: "Card scheme code 'PREPAID_VARIANT' not found in mapping table. Reconciliation agent throws unmapped_scheme error on 3 test records.",
        agentSuggestion: "Add mapping entry for PREPAID_VARIANT → STANDARD_PREPAID in config/schemes.json at line 44. Verify with Client B's scheme registry.",
      },
    ],
  },
  {
    id: "JOB-003",
    client: "Institutional Client C",
    project: "Core Software — Vault Automation Module",
    environment: "UAT",
    status: "pending",
    lastActivity: "Awaiting agent scheduling.",
    totalTests: 47,
    failures: null,
  },
  {
    id: "JOB-004",
    client: "Client D (NBFC)",
    project: "Remote Monitoring — AI Surveillance Layer",
    environment: "Staging",
    status: "pending",
    lastActivity: "Awaiting agent scheduling.",
    totalTests: 63,
    failures: null,
  },
  {
    id: "JOB-005",
    client: "Client E (Retail Group)",
    project: "Remote Monitoring — Branch Intelligence",
    environment: "UAT",
    status: "failed",
    lastActivity: "Agent ran 89 tests — 11 failures. Auth layer spec mismatch. Manual review required.",
    totalTests: 89,
    failures: 11,
  },
];

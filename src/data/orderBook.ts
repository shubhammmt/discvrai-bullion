export interface FailureDetail {
  testId: string;
  description: string;
  agentSuggestion: string;
}

export interface TestCategory {
  name: string;
  total: number;
  passed: number;
  failed: number;
}

export interface TestReport {
  runDate: string;
  duration: string;
  agent: string;
  environment: string;
  categories: TestCategory[];
  timeline: { time: string; event: string; status: 'pass' | 'fail' | 'info' }[];
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
  report?: TestReport;
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
    report: {
      runDate: "12-Jan-25 · 14:32 IST",
      duration: "4m 12s",
      agent: "Integration Agent v2.1",
      environment: "Production",
      categories: [
        { name: "API Connectivity", total: 48, passed: 48, failed: 0 },
        { name: "Data Mapping", total: 72, passed: 72, failed: 0 },
        { name: "Transaction Processing", total: 96, passed: 96, failed: 0 },
        { name: "Error Handling", total: 36, passed: 36, failed: 0 },
        { name: "Performance / Load", total: 40, passed: 40, failed: 0 },
        { name: "Security & Auth", total: 20, passed: 20, failed: 0 },
      ],
      timeline: [
        { time: "14:32:00", event: "Test suite initialised — 312 tests queued", status: "info" },
        { time: "14:32:08", event: "API Connectivity — 48/48 passed", status: "pass" },
        { time: "14:33:02", event: "Data Mapping — 72/72 passed", status: "pass" },
        { time: "14:34:15", event: "Transaction Processing — 96/96 passed", status: "pass" },
        { time: "14:35:01", event: "Error Handling — 36/36 passed", status: "pass" },
        { time: "14:35:48", event: "Performance / Load — 40/40 passed (avg latency 42ms)", status: "pass" },
        { time: "14:36:12", event: "Security & Auth — 20/20 passed", status: "pass" },
        { time: "14:36:12", event: "All tests passed. Deployment signed off.", status: "info" },
      ],
    },
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
    report: {
      runDate: "25-Feb-25 · 09:41 IST",
      duration: "1m 38s",
      agent: "Integration Agent v2.1",
      environment: "UAT",
      categories: [
        { name: "API Connectivity", total: 8, passed: 7, failed: 1 },
        { name: "Data Mapping", total: 14, passed: 13, failed: 1 },
        { name: "Transaction Processing", total: 12, passed: 12, failed: 0 },
        { name: "Error Handling", total: 6, passed: 6, failed: 0 },
        { name: "Performance / Load", total: 5, passed: 5, failed: 0 },
        { name: "Security & Auth", total: 2, passed: 2, failed: 0 },
      ],
      timeline: [
        { time: "09:41:00", event: "Test suite initialised — 47 tests queued", status: "info" },
        { time: "09:41:06", event: "API Connectivity — 7/8 passed · TC-041 FAILED (HTTP 503)", status: "fail" },
        { time: "09:41:22", event: "Data Mapping — 13/14 passed · TC-089 FAILED (unmapped_scheme)", status: "fail" },
        { time: "09:41:45", event: "Transaction Processing — 12/12 passed", status: "pass" },
        { time: "09:41:58", event: "Error Handling — 6/6 passed", status: "pass" },
        { time: "09:42:18", event: "Performance / Load — 5/5 passed (avg latency 68ms)", status: "pass" },
        { time: "09:42:38", event: "Security & Auth — 2/2 passed", status: "pass" },
        { time: "09:42:38", event: "2 failures detected. Surfaced for review.", status: "info" },
      ],
    },
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
    report: {
      runDate: "24-Feb-25 · 16:05 IST",
      duration: "3m 02s",
      agent: "Integration Agent v2.1",
      environment: "UAT",
      categories: [
        { name: "API Connectivity", total: 15, passed: 12, failed: 3 },
        { name: "Data Mapping", total: 20, passed: 18, failed: 2 },
        { name: "Auth & Token Exchange", total: 18, passed: 12, failed: 6 },
        { name: "Transaction Processing", total: 16, passed: 16, failed: 0 },
        { name: "Error Handling", total: 10, passed: 10, failed: 0 },
        { name: "Performance / Load", total: 10, passed: 10, failed: 0 },
      ],
      timeline: [
        { time: "16:05:00", event: "Test suite initialised — 89 tests queued", status: "info" },
        { time: "16:05:12", event: "API Connectivity — 12/15 passed · 3 failures", status: "fail" },
        { time: "16:05:48", event: "Data Mapping — 18/20 passed · 2 failures", status: "fail" },
        { time: "16:06:30", event: "Auth & Token Exchange — 12/18 passed · 6 failures (spec mismatch)", status: "fail" },
        { time: "16:07:02", event: "Transaction Processing — 16/16 passed", status: "pass" },
        { time: "16:07:30", event: "Error Handling — 10/10 passed", status: "pass" },
        { time: "16:08:02", event: "Performance / Load — 10/10 passed", status: "pass" },
        { time: "16:08:02", event: "11 failures. Auth layer spec mismatch — manual review required.", status: "info" },
      ],
    },
  },
];

# CMS Infosystems — Demo Spec for Lovable

**Purpose**: Build a single demo that shows CMS how agentic AI addresses all three pillars. All three use cases are in scope and must be built and demoed—none optional.

**Demo for**: Mr. Puneet Bhirani, COO, CMS Infosystems

---

## 1. Demo Scope Summary

| # | Requirement | In scope |
|---|-------------|----------|
| 1 | Reconciliation workspace: One screen where user sees sources (bank statement, ERP, cash ledger), agent matching results, and exceptions. | Yes |
| 2 | Agent-driven matching: "Agent" suggests matches (one-to-one, one-to-many, partial); user sees confidence and reason. | Yes |
| 3 | Exception handling: Exceptions list with agent-suggested resolution and Approve / Reject / Edit actions. | Yes |
| 4 | Audit trail: Every match and resolution is logged with timestamp, user/agent, action. | Yes |
| 5 | Before / After impact: Metrics strip (match rate, exceptions count, time to close, provisions impact). | Yes |
| 6 | "Order book / integration" status view: bank onboarding jobs with status, last activity, Actions. | Yes |
| 7 | "Route & Dispatch / fleet" status view: runs or vehicles with agent actions and Approve / View actions. | Yes |

---

## 2. Business Problems We Are Solving

### Problem 1: Reconciliation and margin leakage
CMS moves enormous volumes of cash and value across bank statements, ERP/CMS ledger, and physical cash movement. Reconciliation is largely manual. Result: INR 80–90 Cr annual provisions, slow close, audit risk.

**Solution**: Margin Leakage Recovery + Decision Intelligence: agent ingests data sources, proposes match groups and exception resolutions, leaves only exceptions for human approval. Every action is logged—audit-ready.

### Problem 2: Order book stuck—revenue won but not realised
CMS has won large orders (INR 600–1,500 Cr) but ~85% remains unexecuted. Bottleneck is bank onboarding: manual integration and testing.

**Solution**: Agent reads bank API docs, maps structures, generates and runs tests automatically, surfaces only failures for humans to fix.

### Problem 3: Fleet, routing, and dispatch—cost and SLA pressure
Thousands of armored vehicles, 153,000+ touchpoints. Static routes, manual dispatch, reactive maintenance.

**Solution**: Agentic Route & Dispatch Logic: dynamic routing, re-dispatch, predictive maintenance, workload balance. Humans approve critical actions.

---

## 3. Reconciliation Workspace (Use Case 1)

### 3.1 Layout
- **Left/top**: Data sources (Bank statement, ERP/CMS ledger, Cash/physical)
- **Center**: Matching view with match groups, confidence, reason, status
- **Right/bottom**: Exceptions list with agent-suggested resolutions
- **Audit panel**: Toggle/tab showing all events

### 3.2 Mock Data

**Bank statement:**
| Date | Reference | Amount (₹) | Narration |
|------|-----------|-------------|-----------|
| 15-Jan-25 | CMS/BANK/001 | 12,50,000 | CIT collection |
| 16-Jan-25 | CMS/INV/101 | 2,80,000 | Part payment |
| 17-Jan-25 | CMS/INV/102 | 1,20,000 | – |
| 18-Jan-25 | CMS/MISC | 45,000 | Fee adjustment |

**ERP/CMS ledger:**
| Invoice ID | Client | Amount (₹) | Date | Status |
|-----------|--------|-------------|------|--------|
| INV-101 | Bank PSU A | 2,80,000 | 14-Jan-25 | Open |
| INV-102 | Bank PSU A | 1,20,000 | 14-Jan-25 | Open |
| INV-103 | Bank PSU B | 12,50,000 | 15-Jan-25 | Open |
| FEE-01 | Bank PSU A | 45,000 | 18-Jan-25 | Open |

### 3.3 Metrics Strip
| Metric | "Before" (manual) | "After" (agentic) |
|--------|-------------------|-------------------|
| Match rate | 62% | 94% |
| Exceptions (this run) | 127 | 8 |
| Time to close | 6 days | 4 hours |
| Manual touch points | 380 | 12 |

---

## 4. Order Book / Integration Status (Use Case 2)

Status table of bank onboarding jobs:
- Columns: Bank/Project, Environment, Status, Last activity, Actions
- 2–3 mock rows with at least one "Agent ran 47 tests – 2 failures"

---

## 5. Route & Dispatch / Fleet Status (Use Case 3)

Status table of runs/vehicles:
- Columns: Run ID/Vehicle, Cluster/Route, Status, Last activity, Actions
- 3–4 mock rows with re-route, maintenance, optimization actions

---

## 6. Demo Script

1. **Opening (1 min)**: Business context and problem statement
2. **Use case 1 – Reconciliation (6 min)**: Data sources → Matching → Exceptions → Audit → Metrics
3. **Use case 2 – Order book (1 min)**: Status view with agent test results
4. **Use case 3 – Route & Dispatch (1 min)**: Fleet status with agent actions
5. **Close (30 sec)**: All three pillars in one demo

---

*Document end.*

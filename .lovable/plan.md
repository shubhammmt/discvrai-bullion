
# Add Case Study Theme Slides to Dalmia Cement Deck

## Overview

Add 5 Strategic Theme slides (each with wireframe architecture diagrams) and their detailed case study breakdowns at the **end** of the current 22-slide deck. No existing slides will be deleted.

---

## Current Deck Structure (22 Slides) - Unchanged

| # | Type | Headline |
|---|------|----------|
| 1-22 | (existing slides) | Retain all current slides |

---

## New Slides to Add (14 Slides: 23-36)

### THEME SLIDES (5 New Strategic Themes)

| # | Type | Headline | Wireframe Visual |
|---|------|----------|------------------|
| 23 | `dalmia-theme-data-platform` | Unified Commercial Intelligence Platform | ERP + CRM + Apps -> Data Lake -> AI Layer -> Dashboards |
| 24 | `dalmia-theme-sales-channel` | AI Sales & Channel Execution | Sales Rep -> Mobile -> AI Engine -> CRM/SAP -> Insights |
| 25 | `dalmia-theme-supply-chain` | Predictive Supply Chain & Demand Network | Factory -> Warehouse -> Distributor -> Dealer -> Customer |
| 26 | `dalmia-theme-digital-trust` | Digital Trust & Channel Governance | Product QR -> Scan Events -> Tracking -> Risk Alerts |
| 27 | `dalmia-theme-margin-intel` | AI Margin Intelligence & Financial Automation | Price Feeds + ERP -> AI Engine -> Margin Dashboard |

### CASE STUDY DETAIL SLIDES (9 Detailed Breakdowns)

Each follows the 3-column Problem | Transformation | Impact pattern with architecture wireframe.

| # | Type | Case Study | Parent Theme |
|---|------|------------|--------------|
| 28 | `dalmia-case-data-lake` | Enterprise Data Lake | Theme 1 |
| 29 | `dalmia-case-customer-mdp` | Customer Master Data Platform | Theme 1 |
| 30 | `dalmia-case-field-force` | Field Force Enablement | Theme 2 |
| 31 | `dalmia-case-customer-lifecycle` | Customer Lifecycle Intelligence | Theme 2 |
| 32 | `dalmia-case-supply-visibility` | Supply Chain Visibility | Theme 3 |
| 33 | `dalmia-case-dynamic-capacity` | Dynamic Capacity & Demand Sensing | Theme 3 |
| 34 | `dalmia-case-qr-auth` | QR Product Authentication | Theme 4 |
| 35 | `dalmia-case-commodity-costing` | Commodity Costing AI | Theme 5 |
| 36 | `dalmia-case-financial-recon` | Financial Reconciliation Automation | Theme 5 |

---

## Visual Design Pattern for Theme Slides

Each Theme slide follows this structure:

```text
+------------------------------------------------------------------+
|                     [THEME CATEGORY BADGE]                        |
|                                                                   |
|              [Theme Headline - Large Bold]                        |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  |    PROBLEM       |  |  TRANSFORMATION  |  |     IMPACT       | |
|  +------------------+  +------------------+  +------------------+ |
|  | - Bullet 1       |  | - Solution 1     |  | - KPI 1          | |
|  | - Bullet 2       |  | - Solution 2     |  | - KPI 2          | |
|  | - Bullet 3       |  | - Solution 3     |  | - KPI 3          | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +------------------------------------------------------------+  |
|  |                  ARCHITECTURE WIREFRAME                     |  |
|  |  [Source Systems] --> [Processing] --> [AI Layer] --> [UX] |  |
|  +------------------------------------------------------------+  |
|                                                                   |
|              [Case Studies: Study 1, Study 2]                     |
+------------------------------------------------------------------+
```

---

## Visual Design Pattern for Case Study Slides

Each Case Study slide follows the consulting 3-column pattern with bottom wireframe:

```text
+------------------------------------------------------------------+
|         [THEME > CASE STUDY]  Breadcrumb                          |
|                                                                   |
|              [Case Study Headline]                                |
|                                                                   |
|  +------------------+  +------------------+  +------------------+ |
|  |    PROBLEM       |  |   WHAT WE BUILT  |  |     IMPACT       | |
|  +------------------+  +------------------+  +------------------+ |
|  | [Red tinted]     |  | [Teal tinted]    |  | [Amber tinted]   | |
|  | Specific pain    |  | Platform/tool    |  | Metrics achieved | |
|  | points described |  | capabilities     |  | with numbers     | |
|  +------------------+  +------------------+  +------------------+ |
|                                                                   |
|  +------------------------------------------------------------+  |
|  |              SYSTEM ARCHITECTURE DIAGRAM                    |  |
|  |  [Nodes] ---> [Nodes] ---> [Nodes] ---> [Output]           |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
```

---

## Detailed Theme Content

### THEME 1: Unified Commercial Intelligence Platform

**Problem:**
- Fragmented commercial data across ERP, CRM, apps
- No single customer identity
- Manual reporting, slow insights

**Transformation:**
- Enterprise data lake
- Customer master data platform
- Single identity layer

**Impact:**
- Single source of truth
- AI-ready foundation
- 70% faster reporting

**Wireframe:**
```text
  SAP    Salesforce   SUVIDHA    Loyalty
   │         │          │          │
   └─────────┼──────────┼──────────┘
             │
       ┌─────▼─────┐
       │ DATA LAKE │
       └─────┬─────┘
             │
       ┌─────▼─────┐
       │ AI LAYER  │
       └─────┬─────┘
             │
     ┌───────┼───────┐
     ▼       ▼       ▼
  Finance  Sales  Marketing
 Dashboard Dash   Dashboard
```

**Case Studies:** Enterprise Data Lake, Customer Master Data Platform

---

### THEME 2: AI Sales & Channel Execution

**Problem:**
- Manual visit planning
- No real-time performance visibility
- Reactive dealer management

**Transformation:**
- AI sales copilot
- Real-time performance tracking
- Dealer lifecycle intelligence

**Impact:**
- 15-20% sales productivity
- 25% better territory coverage
- 30% faster decision-making

**Wireframe:**
```text
  Sales Rep  ──► Mobile App ──► AI Recommendation
     │                              Engine
     │                                │
     └────────► Field Data ───────────┘
                    │
              ┌─────▼─────┐
              │  CRM/SAP  │
              └─────┬─────┘
                    │
              ┌─────▼─────┐
              │ Insights  │
              │ Dashboard │
              └───────────┘
```

**Case Studies:** Field Force Enablement, Customer Lifecycle Intelligence

---

### THEME 3: Predictive Supply Chain & Demand Network

**Problem:**
- Limited visibility across network
- Monthly batch planning
- Reactive logistics

**Transformation:**
- End-to-end visibility
- AI forecasting (weather, infra signals)
- Dynamic planning

**Impact:**
- 20% improvement in forecast accuracy
- 15% logistics cost reduction
- ₹100-200 Cr working capital freed

**Wireframe:**
```text
  Factory ──► Warehouse ──► Distributor ──► Dealer ──► Customer
     │            │             │            │
     └────────────┼─────────────┼────────────┘
                  │
           ┌──────▼──────┐
           │ DATA OVERLAY │
           │ Weather+Infra│
           └──────┬──────┘
                  │
           ┌──────▼──────┐
           │ AI DEMAND   │
           │ SENSING     │
           └─────────────┘
```

**Case Studies:** Supply Chain Visibility, Dynamic Capacity & Demand Sensing

---

### THEME 4: Digital Trust & Channel Governance

**Problem:**
- Counterfeit products in market
- No visibility into channel leakage
- Manual compliance tracking

**Transformation:**
- Product traceability (QR)
- Counterfeit detection
- Channel integrity monitoring

**Impact:**
- 100% product traceability
- 40% reduction in grey market
- Real-time risk alerts

**Wireframe:**
```text
  Product ──► QR Code ──► Scan Events ──► Tracking System
     │                                         │
     └─────────── Blockchain Record ───────────┘
                                               │
                                        ┌──────▼──────┐
                                        │ Risk Alerts │
                                        │ Dashboard   │
                                        └─────────────┘
```

**Case Studies:** QR Product Authentication

---

### THEME 5: AI Margin Intelligence & Financial Automation

**Problem:**
- Manual commodity impact tracking
- 4-way reconciliation delays
- No real-time margin visibility

**Transformation:**
- Real-time margin impact
- Automated reconciliation
- Conversational analytics

**Impact:**
- 2-3% margin improvement
- 80% faster reconciliation
- Real-time P&L visibility

**Wireframe:**
```text
  External      SAP      Banks     Orders
  Price Feeds    │         │          │
       │         │         │          │
       └─────────┼─────────┼──────────┘
                 │
          ┌──────▼──────┐
          │  AI ENGINE  │
          │ Margin Sim  │
          └──────┬──────┘
                 │
          ┌──────▼──────┐
          │  P&L Dash   │
          │ + Chat Bot  │
          └─────────────┘
```

**Case Studies:** Commodity Costing AI, Financial Reconciliation Automation

---

## Files to Create (14 New Components)

```text
src/components/pitch/manufacturing-new/
  DalmiaThemeDataPlatformSlide.tsx       # Theme 1
  DalmiaThemeSalesChannelSlide.tsx       # Theme 2
  DalmiaThemeSupplyChainSlide.tsx        # Theme 3
  DalmiaThemeDigitalTrustSlide.tsx       # Theme 4
  DalmiaThemeMarginIntelSlide.tsx        # Theme 5
  DalmiaCaseDataLakeSlide.tsx            # Case 1.1
  DalmiaCaseCustomerMDPSlide.tsx         # Case 1.2
  DalmiaCaseFieldForceSlide.tsx          # Case 2.1
  DalmiaCaseCustomerLifecycleSlide.tsx   # Case 2.2
  DalmiaCaseSupplyVisibilitySlide.tsx    # Case 3.1
  DalmiaCaseDynamicCapacitySlide.tsx     # Case 3.2
  DalmiaCaseQRAuthSlide.tsx              # Case 4.1
  DalmiaCaseCommodityCostingSlide.tsx    # Case 5.1
  DalmiaCaseFinancialReconSlide.tsx      # Case 5.2
```

---

## Files to Modify

### 1. `src/data/dalmiaCementSlides.ts`

**Add interface fields:**
```typescript
interface DalmiaCementSlide {
  // ... existing fields ...
  
  // New theme slide fields
  themeCategory?: string;
  themeProblem?: string[];
  themeTransformation?: string[];
  themeImpact?: string[];
  themeWireframe?: {
    sources: string[];
    processing: string;
    aiLayer: string;
    outputs: string[];
  };
  themeCaseStudies?: string[];
  
  // New case study fields
  caseStudyTheme?: string;
  caseStudyProblem?: string[];
  caseStudyBuilt?: string[];
  caseStudyImpact?: { metric: string; value: string }[];
  caseStudyWireframe?: {
    nodes: { label: string; icon: string }[];
    flows: string[];
  };
}
```

**Add 14 new slide entries (IDs 23-36):**
- 5 theme slides
- 9 case study slides

### 2. `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`

**Add 14 new imports and case statements:**
```typescript
import { DalmiaThemeDataPlatformSlide } from './DalmiaThemeDataPlatformSlide';
// ... 13 more imports ...

case 'dalmia-theme-data-platform':
  return <DalmiaThemeDataPlatformSlide slide={slide} {...baseProps} />;
// ... 13 more cases ...
```

---

## Design Standards Applied

| Element | Specification |
|---------|---------------|
| Background | White (`bg-white`) |
| Theme Category Badge | `text-xs font-bold uppercase tracking-widest text-amber-600` |
| Headlines | `text-2xl md:text-3xl font-bold text-slate-900` |
| 3-Column Layout | Problem (red tint), Transform (teal tint), Impact (amber tint) |
| Wireframe Style | Slate borders, connecting lines, icon nodes |
| Animation | Framer-motion staggered entry |

---

## Summary

| Metric | Before | After |
|--------|--------|-------|
| Total Slides | 22 | 36 |
| Theme Slides Added | - | 5 |
| Case Study Slides Added | - | 9 |
| New Component Files | - | 14 |
| Files Modified | - | 2 |
| Slides Deleted | 0 | 0 |

This implementation adds a comprehensive case study section organized by strategic themes, following McKinsey/BCG consulting deck patterns with Problem | Transformation | Impact structure and architecture wireframes for each slide.

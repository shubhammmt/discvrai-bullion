

# Dalmia Cement - Consolidated 12-Slide Deck

## Overview

This plan consolidates the current 18 slides into **12 slides** while preserving all key content and executive impact. The goal is a tighter, more focused presentation for CEO-level audiences.

---

## Consolidation Strategy

| New Slide # | Title | Merged From | Rationale |
|-------------|-------|-------------|-----------|
| 1 | Cover | Slide 1 | Keep as-is |
| 2 | CEO Imperative | Slide 2 | Keep as-is |
| 3 | Value Pools | Slide 3 | Keep as-is |
| 4 | Current State & Gap | Slides 4 + 5 | Combine "Dalmia Today" with "Benchmark Gap" - both assess current position |
| 5 | Vision & Architecture | Slides 6 + 7 | Merge "North Star" flow with "Capability Stack" layers |
| 6 | AI Dynamic Pricing | Slide 8 | Keep as-is (highest impact initiative) |
| 7 | Sales & Dealer Intelligence | Slides 9 + 10 | Combine Sales Copilot with Dealer 360 platform |
| 8 | Marketing & Engagement | Slides 11 + 12 | Merge Marketing Engine with Loyalty 2.0 |
| 9 | Supply Chain AI | Slides 13 + 14 | Combine Demand Sensing with O2C Automation |
| 10 | SUVIDHA 2.0 | Slide 15 | Keep as-is (platform cornerstone) |
| 11 | Value Map | Slide 16 | Keep as-is (ROI summary) |
| 12 | Roadmap & Ask | Slides 17 + 18 | Merge timeline with operating model and board ask |

---

## Implementation Details

### Files to Update

```text
src/data/dalmiaCementSlides.ts        # UPDATE - Reduce to 12 slides
src/data/manufacturingNewSlides.ts    # No change (re-exports)
src/components/pitch/manufacturing-new/
  ├── MfgNewSlideRenderer.tsx         # UPDATE - Handle new merged types
  ├── DalmiaCurrentStateSlide.tsx     # NEW - Merges Today + Benchmark
  ├── DalmiaVisionArchitectureSlide.tsx  # NEW - Merges NorthStar + Stack
  ├── DalmiaSalesDealer360Slide.tsx   # NEW - Merges Sales + Dealer360
  ├── DalmiaMarketingEngagementSlide.tsx # NEW - Merges Marketing + Loyalty
  ├── DalmiaSupplyChainSlide.tsx      # NEW - Merges Demand + O2C
  ├── DalmiaRoadmapAskSlide.tsx       # NEW - Merges Roadmap + Ask
```

### Components to Keep (6)
- `DalmiaCoverSlide.tsx`
- `DalmiaCEOImperativeSlide.tsx`
- `DalmiaValuePoolsSlide.tsx`
- `DalmiaDynamicPricingSlide.tsx`
- `DalmiaSuvidha2Slide.tsx`
- `DalmiaValueMapSlide.tsx`

### Components to Remove (12)
After implementation, these can be deleted:
- `DalmiaTodaySlide.tsx`
- `DalmiaBenchmarkSlide.tsx`
- `DalmiaNorthStarSlide.tsx`
- `DalmiaCapabilityStackSlide.tsx`
- `DalmiaSalesIntelligenceSlide.tsx`
- `DalmiaDealer360Slide.tsx`
- `DalmiaMarketingEngineSlide.tsx`
- `DalmiaLoyalty2Slide.tsx`
- `DalmiaDemandSensingSlide.tsx`
- `DalmiaO2CSlide.tsx`
- `DalmiaRoadmapSlide.tsx`
- `DalmiaOperatingModelSlide.tsx`

---

## Merged Slide Designs

### Slide 4: Current State & Gap

Layout: Split screen

```text
┌─────────────────────────────────────────────────────────────┐
│ CURRENT STATE & GAP                                         │
├───────────────────────────────┬─────────────────────────────┤
│ Left Panel: Dalmia Today      │ Right Panel: Benchmark      │
│                               │                             │
│ • 49,300 channel partners     │    ┌──────┐  ┌──────┐       │
│ • SUVIDHA ~35% digital        │    │ 35%  │  │ 93%  │       │
│ • SM@RT-D sales app           │    │Dalmia│  │CEMEX │       │
│ • Dalmia Delight loyalty      │    └──────┘  └──────┘       │
│ • DriverSathi logistics       │                             │
│                               │ Gap = ₹200-500 Cr value     │
│ ⚠ No integrated AI layer     │                             │
└───────────────────────────────┴─────────────────────────────┘
```

### Slide 5: Vision & Architecture

Layout: Flow at top, stack below

```text
┌─────────────────────────────────────────────────────────────┐
│ VISION & ARCHITECTURE                                       │
├─────────────────────────────────────────────────────────────┤
│ Flow: Data → AI → Workflows → Platform → Revenue            │
├─────────────────────────────────────────────────────────────┤
│ Stack (compact):                                            │
│ ┌──────────────────────────────────────────────────────┐    │
│ │ L4: SUVIDHA 2.0 Ecosystem                            │    │
│ ├──────────────────────────────────────────────────────┤    │
│ │ L3: Agentic Workflows (Sales, Marketing, O2C)        │    │
│ ├──────────────────────────────────────────────────────┤    │
│ │ L2: AI Models (Pricing, Demand, Churn, Credit)       │    │
│ ├──────────────────────────────────────────────────────┤    │
│ │ L1: Dealer 360 Data Foundation                       │    │
│ └──────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

### Slide 7: Sales & Dealer Intelligence

Layout: Two columns with impacts

```text
┌─────────────────────────────────────────────────────────────┐
│ SALES & DEALER INTELLIGENCE                                 │
├───────────────────────────────┬─────────────────────────────┤
│ SM@RT-D → AI Sales Copilot    │ Dealer 360 Platform         │
│                               │                             │
│ • Visit prioritization        │ Data Sources → [Hub] → Out  │
│ • Next best product           │ • SAP                       │
│ • Churn alerts                │ • SUVIDHA                   │
│ • Territory optimization      │ • Loyalty                   │
│                               │ • Field notes               │
│ Impact: 8-15% productivity    │ • Market data               │
├───────────────────────────────┴─────────────────────────────┤
│ Combined: ₹50-100 Cr (Sales) + ₹30-60 Cr (Dealer360)        │
└─────────────────────────────────────────────────────────────┘
```

### Slide 8: Marketing & Engagement

Layout: Capabilities grid + Loyalty evolution

```text
┌─────────────────────────────────────────────────────────────┐
│ MARKETING & ENGAGEMENT                                      │
├─────────────────────────────────────────────────────────────┤
│ Marketing Capabilities (2x2 grid):                          │
│ ┌─────────────┐ ┌─────────────┐                             │
│ │ Hotspot     │ │ Contractor  │                             │
│ │ Detection   │ │ Intelligence│                             │
│ └─────────────┘ └─────────────┘                             │
│ ┌─────────────┐ ┌─────────────┐                             │
│ │ Regional    │ │ WhatsApp    │                             │
│ │ Content     │ │ Campaigns   │                             │
│ └─────────────┘ └─────────────┘                             │
├─────────────────────────────────────────────────────────────┤
│ Loyalty: Points Program → Engagement Ecosystem              │
│ [Tier upgrades] [Rewards] [Gamification] [Tracking]         │
├─────────────────────────────────────────────────────────────┤
│ Combined Impact: ₹80-150 Cr + ₹40-80 Cr                     │
└─────────────────────────────────────────────────────────────┘
```

### Slide 9: Supply Chain AI

Layout: Two sections with flow diagrams

```text
┌─────────────────────────────────────────────────────────────┐
│ SUPPLY CHAIN AI                                             │
├───────────────────────────────┬─────────────────────────────┤
│ Demand Sensing                │ Order to Cash               │
│                               │                             │
│ Excel → AI Forecasting        │ Order → ATP → Credit →      │
│                               │ Invoice → Cash              │
│ • Weekly rolling forecasts    │                             │
│ • Weather + infra data        │ • Smart recommendations     │
│ • Scenario simulation         │ • Real-time availability    │
│                               │ • AI credit scoring         │
│ 65% → 85% accuracy            │ • Auto invoicing            │
├───────────────────────────────┴─────────────────────────────┤
│ Impact: ₹100-200 Cr (WC) + ₹150-300 Cr (DSO)                │
└─────────────────────────────────────────────────────────────┘
```

### Slide 12: Roadmap & Ask

Layout: Timeline at top, Ask at bottom

```text
┌─────────────────────────────────────────────────────────────┐
│ ROADMAP & ASK                                               │
├─────────────────────────────────────────────────────────────┤
│ Timeline:                                                   │
│ ──────────────────────────────────────────────────────────► │
│ ┌────────────┐  ┌────────────┐  ┌────────────┐             │
│ │ Phase 1    │  │ Phase 2    │  │ Phase 3    │             │
│ │ 0-6 months │  │ 6-15 months│  │ 15-24 mo   │             │
│ │ Foundation │  │ Rollout    │  │ Scale      │             │
│ └────────────┘  └────────────┘  └────────────┘             │
├─────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ BOARD DECISION                                          │ │
│ │ Approve AI Commercial Transformation Program            │ │
│ │                                                         │ │
│ │ Investment: ₹106-202 Cr  │  Value: ₹870-1,720 Cr       │ │
│ │                          │  ROI: 8-10×                 │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Structure Updates

The consolidated slide data will have new types:

```typescript
// New slide types
| 'dalmia-current-state'      // Merges today + benchmark
| 'dalmia-vision-architecture' // Merges northstar + stack
| 'dalmia-sales-dealer360'    // Merges sales + dealer
| 'dalmia-marketing-engagement' // Merges marketing + loyalty
| 'dalmia-supply-chain'       // Merges demand + o2c
| 'dalmia-roadmap-ask'        // Merges roadmap + operating model
```

---

## Execution Order

### Step 1: Data Layer
1. Update `dalmiaCementSlides.ts` with 12 consolidated slides

### Step 2: New Merged Components
2. Create `DalmiaCurrentStateSlide.tsx`
3. Create `DalmiaVisionArchitectureSlide.tsx`
4. Create `DalmiaSalesDealer360Slide.tsx`
5. Create `DalmiaMarketingEngagementSlide.tsx`
6. Create `DalmiaSupplyChainSlide.tsx`
7. Create `DalmiaRoadmapAskSlide.tsx`

### Step 3: Integration
8. Update `MfgNewSlideRenderer.tsx` to use new components

---

## Final Slide Order

| # | Type | Title |
|---|------|-------|
| 1 | `dalmia-cover` | Dalmia Cement - AI Commercial Transformation Blueprint |
| 2 | `dalmia-imperative` | The CEO Imperative |
| 3 | `dalmia-value-pools` | Three Value Pools |
| 4 | `dalmia-current-state` | Current State & Gap |
| 5 | `dalmia-vision-architecture` | Vision & Architecture |
| 6 | `dalmia-pricing` | AI Dynamic Pricing |
| 7 | `dalmia-sales-dealer360` | Sales & Dealer Intelligence |
| 8 | `dalmia-marketing-engagement` | Marketing & Engagement |
| 9 | `dalmia-supply-chain` | Supply Chain AI |
| 10 | `dalmia-suvidha` | SUVIDHA 2.0 |
| 11 | `dalmia-valuemap` | Value Map |
| 12 | `dalmia-roadmap-ask` | Roadmap & Ask |

---

## Benefits

- **Tighter narrative**: 12 slides vs 18 = 33% reduction
- **Better pacing**: Each slide now has more visual density
- **Executive focus**: Consolidation highlights key decisions
- **All content preserved**: No data or metrics lost




# Dalmia Cement - AI Commercial Transformation Strategy
## Insert 17 New Slides After Slide 1 (Cover)

---

## Overview

Create a comprehensive 18-slide McKinsey/BCG-style strategic pitch deck for CEO and Board presentation. The new slides will be inserted after the existing Cover slide (Slide 1), shifting all existing content to follow.

**Total Deck After Implementation**: 28 slides (1 existing cover + 17 new strategy slides + 10 existing detail slides)

---

## New Slide Structure (17 Slides to Insert After Cover)

| # | Slide Type | Headline | Key Visual |
|---|------------|----------|------------|
| 2 | `dalmia-why-now` | Industry Inflection Point | 4 urgency bullets |
| 3 | `dalmia-transformation` | Commercial Model Transformation | Old vs New comparison with arrow |
| 4 | `dalmia-global-examples` | What Global Leaders Are Doing | 3 company cards (CEMEX, Heidelberg, Holcim) |
| 5 | `dalmia-today` | Strong Foundations - Missing Intelligence Layer | Island diagram + Gap callout |
| 6 | `dalmia-value-opportunity` | Untapped Commercial Value | Value waterfall chart |
| 7 | `dalmia-future-vision` | AI-Powered Commercial Intelligence Platform | Execution stack architecture |
| 8 | `dalmia-value-streams` | Value Delivery Streams | 6 pillar cards |
| 9 | `dalmia-pricing-engine` | AI Pricing Engine | Problem/Solution/Impact |
| 10 | `dalmia-sales-copilot` | Sales Copilot | AI recommendation cards |
| 11 | `dalmia-dealer360` | Dealer 360 Platform | Hub diagram |
| 12 | `dalmia-marketing-engine` | AI Marketing Engine | Capability cards |
| 13 | `dalmia-demand-sensing` | Demand Sensing | AI forecast visual |
| 14 | `dalmia-o2c` | Order to Cash Transformation | Flow diagram |
| 15 | `dalmia-suvidha` | SUVIDHA 2.0 Platform | Target visual |
| 16 | `dalmia-case-studies` | Global Case Studies | 3 problem/result cards |
| 17 | `dalmia-implementation` | Implementation Roadmap | 3-phase timeline |
| 18 | `dalmia-final-message` | Final Message & Ask | Decision box |

---

## File Changes

### 1. New Slide Components (17 files)

```text
src/components/pitch/manufacturing-new/
  DalmiaWhyNowSlide.tsx          # Industry inflection point
  DalmiaTransformationSlide.tsx  # Old vs New model
  DalmiaGlobalExamplesSlide.tsx  # CEMEX, Heidelberg, Holcim
  DalmiaTodaySlide.tsx           # Current state islands
  DalmiaValueOpportunitySlide.tsx # Value waterfall
  DalmiaFutureVisionSlide.tsx    # Architecture stack
  DalmiaValueStreamsSlide.tsx    # 6 pillars
  DalmiaPricingEngineSlide.tsx   # AI Pricing
  DalmiaSalesCopilotSlide.tsx    # Sales AI
  DalmiaDealer360Slide.tsx       # Dealer platform
  DalmiaMarketingEngineSlide.tsx # Marketing AI
  DalmiaDemandSensingSlide.tsx   # Forecasting
  DalmiaO2CSlide.tsx             # Order to Cash
  DalmiaSuvidhaSlide.tsx         # Platform target
  DalmiaCaseStudiesSlide.tsx     # Global examples
  DalmiaImplementationSlide.tsx  # Roadmap
  DalmiaFinalMessageSlide.tsx    # Ask
```

### 2. Data File Update

**File**: `src/data/dalmiaCementSlides.ts`

- Extend `DalmiaCementSlide` interface with new fields for case studies, transformation data, global examples
- Insert 17 new slide objects after index 0 (Cover)
- Re-number all slide IDs

### 3. Renderer Update

**File**: `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`

- Add 17 new case statements for new slide types
- Import all new slide components

---

## Design Standards (Per Requirements)

| Element | Specification |
|---------|---------------|
| Background | White (`bg-white`) |
| Headlines | `text-2xl md:text-3xl font-bold text-slate-900` |
| Bullets | Max 4-5 per slide |
| Typography | Dark, high-contrast (slate-800/900) |
| Accents | Amber/Gold for highlights, Teal for solutions |
| Layout | Center-aligned, generous whitespace |
| Animation | Subtle framer-motion entry |
| Speaker Notes | Included in data model |

---

## Detailed Slide Designs

### Slide 2: Industry Inflection Point (`dalmia-why-now`)

```text
+--------------------------------------------------+
|                  INDUSTRY SHIFT                   |
|                                                   |
|    Industry Inflection Point                      |
|                                                   |
|  +--------------------------------------------+   |
|  | [bullet] Cement industry moving from       |   |
|  |          capacity-led to intelligence-led  |   |
|  | [bullet] AI agents transforming B2B selling|   |
|  | [bullet] Digital ecosystems replacing      |   |
|  |          manual dealer relationships       |   |
|  | [bullet] Competitive pressure from         |   |
|  |          digitally mature players          |   |
|  +--------------------------------------------+   |
|                                                   |
|            [Urgency Callout Box]                  |
+--------------------------------------------------+
```

Speaker Notes: "Create urgency. CEO must feel timing is critical."

---

### Slide 3: Commercial Model Transformation (`dalmia-transformation`)

```text
+--------------------------------------------------+
|            Commercial Model Transformation        |
|                                                   |
|    +-----------+          +-----------+          |
|    | OLD MODEL |   --->   | NEW MODEL |          |
|    +-----------+          +-----------+          |
|    | Manual    |          | Dynamic   |          |
|    | pricing   |          | pricing   |          |
|    +-----------+          +-----------+          |
|    |Relationship|         |Predictive |          |
|    | sales     |          |intelligence|         |
|    +-----------+          +-----------+          |
|    | Mass      |          | AI        |          |
|    | marketing |          | marketing |          |
|    +-----------+          +-----------+          |
|    | Reactive  |          | Digital   |          |
|    | planning  |          | ecosystems|          |
|    +-----------+          +-----------+          |
+--------------------------------------------------+
```

---

### Slide 4: Global Examples (`dalmia-global-examples`)

```text
+--------------------------------------------------+
|           What Global Leaders Are Doing           |
|                                                   |
|  +------------+ +------------+ +------------+    |
|  |   CEMEX    | | Heidelberg | |   Holcim   |    |
|  +------------+ +------------+ +------------+    |
|  | CEMEX GO   | | AI Dynamic | | Commercial |    |
|  | Platform   | | Pricing    | | AI         |    |
|  | 93% digital| | Engine     | | Transf.    |    |
|  +------------+ +------------+ +------------+    |
|                                                   |
|      "Shift from product to intelligence"         |
+--------------------------------------------------+
```

Speaker Notes: "Shift from product companies to intelligence platforms."

---

### Slide 5: Dalmia Today (`dalmia-today`)

```text
+--------------------------------------------------+
|     Strong Foundations - Missing Intelligence     |
|                                                   |
|  [Island Diagram: 5 disconnected systems]         |
|                                                   |
|  +--------+ +--------+ +--------+ +--------+     |
|  |SUVIDHA | |SM@RT-D | |Dalmia  | |Driver  |     |
|  |  35%   | |  App   | |Delight | |Sathi   |     |
|  +--------+ +--------+ +--------+ +--------+     |
|                     |                             |
|                  [SAP]                            |
|                                                   |
|  +-- GAP: Tools exist but disconnected. --------+|
|  |   No integrated AI intelligence layer.        ||
|  +-----------------------------------------------+|
+--------------------------------------------------+
```

---

### Slide 6: Value Opportunity (`dalmia-value-opportunity`)

```text
+--------------------------------------------------+
|            Untapped Commercial Value              |
|                                                   |
|   [Value Waterfall Chart]                         |
|                                                   |
|   Digital Gap     ████████████  ₹200-500 Cr      |
|   AI Pricing      ██████████    ₹140-280 Cr      |
|   O2C Automation  ██████████    ₹150-300 Cr      |
|   Marketing       ██████        ₹80-150 Cr       |
|                   ────────────────────────        |
|                   Total: ₹570-1,230 Cr           |
+--------------------------------------------------+
```

---

### Slide 7: Future Vision (`dalmia-future-vision`)

Uses the existing ExecutionStackDiagram component:

```text
            REVENUE GROWTH
    [Revenue ↑] [Cost ↓] [Speed ↑] [Retention ↑]
                    │
            DIGITAL PLATFORM
    [SUVIDHA 2.0] [SM@RT-D] [WhatsApp] [Portal]
                    │
            AGENTIC WORKFLOWS
    [Pricing] [Sales] [Marketing] [O2C]
                    │
            AI INTELLIGENCE
    [Demand] [Churn] [Credit] [Sentiment]
                    │
            DATA FOUNDATION
    [SAP] [SUVIDHA] [Loyalty] [External]
```

---

### Slide 8: Value Streams (`dalmia-value-streams`)

```text
+--------------------------------------------------+
|            Value Delivery Streams                 |
|                                                   |
|  +----------+ +----------+ +----------+          |
|  |AI Pricing| |Sales     | |Dealer 360|          |
|  |Engine    | |Copilot   | |Intel     |          |
|  +----------+ +----------+ +----------+          |
|                                                   |
|  +----------+ +----------+ +----------+          |
|  |Marketing | |Demand    | |Touchless |          |
|  |Radar     | |Planning  | |O2C       |          |
|  +----------+ +----------+ +----------+          |
+--------------------------------------------------+
```

---

### Slides 9-15: Capability Deep-Dives

Each follows Problem -> Solution -> Impact pattern:

**Slide 9: AI Pricing Engine**
- Problem: Manual pricing
- Solution: Real-time pricing intelligence
- Impact: 1-2% margin uplift

**Slide 10: Sales Copilot**
- AI daily recommendations
- Dealer prioritization, Next best product, Churn alerts

**Slide 11: Dealer 360**
- Unified dealer intelligence hub
- Transactions + loyalty + field data + external signals

**Slide 12: AI Marketing Engine**
- Hyperlocal demand sensing
- Contractor identification
- Regional language automation

**Slide 13: Demand Sensing**
- Weekly rolling forecasts
- Weather + infrastructure signals

**Slide 14: O2C Transformation**
- Smart ordering -> Dynamic credit -> Auto invoicing -> AI collections

**Slide 15: SUVIDHA 2.0**
- Transform to CEMEX GO equivalent
- Target: 80%+ digital adoption

---

### Slide 16: Case Studies (`dalmia-case-studies`)

```text
+--------------------------------------------------+
|              Global Case Studies                  |
|                                                   |
|  +------------+ +------------+ +------------+    |
|  |   CEMEX    | | Heidelberg | |   Holcim   |    |
|  |  Problem:  | |  Problem:  | |  Problem:  |    |
|  | Low digital| | Manual     | | Fragment.  |    |
|  +------------+ +------------+ +------------+    |
|  |  Result:   | |  Result:   | |  Result:   |    |
|  | 93% orders | | 3% margin  | | 40% cost   |    |
|  +------------+ +------------+ +------------+    |
+--------------------------------------------------+
```

---

### Slide 17: Implementation Roadmap (`dalmia-implementation`)

```text
+--------------------------------------------------+
|           Implementation Roadmap                  |
|                                                   |
|  ─────●─────────────●─────────────●─────         |
|       │             │             │               |
|  +---------+  +---------+  +---------+           |
|  | Phase 1 |  | Phase 2 |  | Phase 3 |           |
|  | 0-6 mo  |  | 6-15 mo |  | 15-24mo |           |
|  +---------+  +---------+  +---------+           |
|  |Foundation|  |AI Intel |  |Platform |           |
|  |+ Pricing |  |Rollout  |  |Scale    |           |
|  |Pilot    |  |         |  |         |           |
|  +---------+  +---------+  +---------+           |
+--------------------------------------------------+
```

---

### Slide 18: Final Message (`dalmia-final-message`)

```text
+--------------------------------------------------+
|                                                   |
|      Dalmia evolves into:                        |
|                                                   |
|      AI-Driven Commercial                        |
|      Intelligence Company                         |
|                                                   |
|  +--------------------------------------------+  |
|  |            BOARD DECISION                  |  |
|  |  Approve Commercial Transformation         |  |
|  |  Investment: ₹106-202 Cr                   |  |
|  |  Value: ₹870-1,720 Cr | ROI: 8-10x        |  |
|  +--------------------------------------------+  |
+--------------------------------------------------+
```

---

## Technical Implementation Details

### Extended Interface Fields

```typescript
interface DalmiaCementSlide {
  // ... existing fields ...
  
  // New fields for strategy slides
  oldModel?: { label: string; items: string[] };
  newModel?: { label: string; items: string[] };
  globalExamples?: {
    company: string;
    initiative: string;
    result: string;
    icon?: string;
  }[];
  systemIslands?: { name: string; metric?: string; icon: string }[];
  valueWaterfall?: { category: string; value: string; percentage: number }[];
  valueStreams?: { name: string; description: string; icon: string }[];
  capabilities?: string[];
  flowSteps?: string[];
  platformTarget?: string;
  caseStudies?: {
    company: string;
    problem: string;
    intervention: string;
    result: string;
  }[];
  finalMessage?: string;
}
```

### Component Pattern

All new slides follow the established pattern:
- Use `MfgNewSlideLayout` wrapper
- Framer-motion entry animations
- Clean white background
- Amber/Gold accent highlights
- Center-aligned content where appropriate
- Max 4-5 bullets per slide
- Speaker notes in data model

---

## Summary

| Metric | Value |
|--------|-------|
| New slide components | 17 |
| Data entries to add | 17 |
| Files to create | 17 |
| Files to modify | 2 (data + renderer) |
| Total slides after | 28 |

This implementation creates a comprehensive McKinsey/BCG-style strategic narrative for CEO and Board presentation, focusing exclusively on commercial transformation with AI-powered intelligence.


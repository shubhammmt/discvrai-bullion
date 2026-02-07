

# Dalmia Cement - AI Commercial Transformation Blueprint

## Implementation Plan

This plan creates a new premium CEO-level consulting pitch deck titled "Dalmia Cement - AI Commercial Transformation Blueprint" accessible at `/manufacturing-pitch-new`. The deck will follow McKinsey/BCG strategy presentation standards with 18 slides focused on commercial transformation (Sales, Marketing, Demand Planning, O2C, Digital Platform).

---

## Architecture Overview

Since the user specified that all changes should be on `manufacturing-pitch-new`, I will:

1. **Replace** the existing `manufacturingNewSlides.ts` data with the Dalmia Cement content
2. **Create new slide components** specific to Dalmia Cement (reusing the layout system)
3. **Update the slide renderer** to handle new slide types
4. **Save the full prompt/task list** to `src/data/manufacturing.md` for reference

---

## File Structure

```text
src/
├── data/
│   ├── manufacturing.md                    # NEW - Full prompt/task list
│   ├── dalmiaCementSlides.ts               # NEW - Slide data (18 slides)
│   └── manufacturingNewSlides.ts           # UPDATED - Import from dalmiaCementSlides
├── components/pitch/manufacturing-new/
│   ├── MfgNewSlideLayout.tsx               # KEEP - White bg, minimal footer
│   ├── MfgNewSlideRenderer.tsx             # UPDATED - Handle new Dalmia slide types
│   ├── DalmiaCoverSlide.tsx                # NEW - Slide 1
│   ├── DalmiaCEOImperativeSlide.tsx        # NEW - Slide 2
│   ├── DalmiaValuePoolsSlide.tsx           # NEW - Slide 3
│   ├── DalmiaTodaySlide.tsx                # NEW - Slide 4
│   ├── DalmiaBenchmarkSlide.tsx            # NEW - Slide 5
│   ├── DalmiaNorthStarSlide.tsx            # NEW - Slide 6
│   ├── DalmiaCapabilityStackSlide.tsx      # NEW - Slide 7
│   ├── DalmiaDynamicPricingSlide.tsx       # NEW - Slide 8
│   ├── DalmiaSalesIntelligenceSlide.tsx    # NEW - Slide 9
│   ├── DalmiaDealer360Slide.tsx            # NEW - Slide 10
│   ├── DalmiaMarketingEngineSlide.tsx      # NEW - Slide 11
│   ├── DalmiaLoyalty2Slide.tsx             # NEW - Slide 12
│   ├── DalmiaDemandSensingSlide.tsx        # NEW - Slide 13
│   ├── DalmiaO2CSlide.tsx                  # NEW - Slide 14
│   ├── DalmiaSuvidha2Slide.tsx             # NEW - Slide 15
│   ├── DalmiaValueMapSlide.tsx             # NEW - Slide 16
│   ├── DalmiaRoadmapSlide.tsx              # NEW - Slide 17
│   └── DalmiaOperatingModelSlide.tsx       # NEW - Slide 18
└── pages/
    └── ManufacturingPitchNew.tsx           # KEEP - Already handles navigation
```

---

## Slide Type Mapping

| Slide | Type | Visual Element | Component |
|-------|------|----------------|-----------|
| 1 | `dalmia-cover` | Title + subtitle | `DalmiaCoverSlide` |
| 2 | `dalmia-imperative` | Old→New transformation arrow | `DalmiaCEOImperativeSlide` |
| 3 | `dalmia-value-pools` | Triangle diagram (3 pools) | `DalmiaValuePoolsSlide` |
| 4 | `dalmia-today` | Fragmented systems diagram | `DalmiaTodaySlide` |
| 5 | `dalmia-benchmark` | Bar comparison chart | `DalmiaBenchmarkSlide` |
| 6 | `dalmia-northstar` | Flow diagram (Data→AI→Platform→Revenue) | `DalmiaNorthStarSlide` |
| 7 | `dalmia-capability-stack` | 4-layer architecture | `DalmiaCapabilityStackSlide` |
| 8 | `dalmia-pricing` | Problem/Solution/Impact | `DalmiaDynamicPricingSlide` |
| 9 | `dalmia-sales` | Copilot capabilities | `DalmiaSalesIntelligenceSlide` |
| 10 | `dalmia-dealer360` | Data hub diagram | `DalmiaDealer360Slide` |
| 11 | `dalmia-marketing` | Capability cards | `DalmiaMarketingEngineSlide` |
| 12 | `dalmia-loyalty` | Evolution timeline | `DalmiaLoyalty2Slide` |
| 13 | `dalmia-demand` | Forecast improvement visual | `DalmiaDemandSensingSlide` |
| 14 | `dalmia-o2c` | O2C flow diagram | `DalmiaO2CSlide` |
| 15 | `dalmia-suvidha` | Platform feature grid | `DalmiaSuvidha2Slide` |
| 16 | `dalmia-valuemap` | Value table with ROI | `DalmiaValueMapSlide` |
| 17 | `dalmia-roadmap` | 3-phase timeline | `DalmiaRoadmapSlide` |
| 18 | `dalmia-operating-model` | KPIs + Decision ask | `DalmiaOperatingModelSlide` |

---

## Design System

Following McKinsey/BCG minimal consulting style:

- **Background**: White (`#FFFFFF`)
- **Headlines**: `text-3xl font-bold text-slate-900`
- **Body text**: `text-base text-slate-700`
- **Accent color**: Amber/Gold (`#F59E0B`) for highlights
- **Secondary accent**: Teal (`#14B8A6`) for transformation arrows
- **Cards**: Light gray bg (`#F8FAFC`) with subtle borders
- **Charts**: Clean SVG with minimal grid lines
- **Layout**: Large headlines, minimal text, executive clarity

---

## Technical Specifications

### 1. Data File: `dalmiaCementSlides.ts`

```typescript
export interface DalmiaCementSlide {
  id: number;
  type: string;
  headline: string;
  speakerNotes: string;
  [key: string]: any;
}
```

Each slide will include:
- `speakerNotes` field for presenter guidance
- Structured content matching the exact requirements
- Type-safe data for rendering

### 2. Visual Components

Each slide component will:
- Use `MfgNewSlideLayout` for consistent framing
- Include Framer Motion animations (subtle, purposeful)
- Be optimized for 16:9 aspect ratio
- Support PDF screenshot export

### 3. Diagrams (Built with React/SVG)

| Slide | Diagram Type | Implementation |
|-------|--------------|----------------|
| 2 | Transformation Arrow | Flex row with arrow icon |
| 3 | Triangle | CSS borders or SVG path |
| 4 | Fragmented Systems | Grid with dotted connections |
| 5 | Bar Chart | Recharts BarChart component |
| 6 | Flow Diagram | Flex row with arrow connectors |
| 7 | Layered Stack | Stacked cards with gradient |
| 16 | Value Table | Table with totals row |
| 17 | Timeline | Horizontal phases with milestones |

---

## Implementation Order

### Phase 1: Data Layer
1. Create `src/data/manufacturing.md` with full prompt/task list
2. Create `src/data/dalmiaCementSlides.ts` with all 18 slides data
3. Update `manufacturingNewSlides.ts` to export Dalmia slides

### Phase 2: Core Slides (1-6)
4. Create `DalmiaCoverSlide.tsx`
5. Create `DalmiaCEOImperativeSlide.tsx` with transformation arrow
6. Create `DalmiaValuePoolsSlide.tsx` with triangle diagram
7. Create `DalmiaTodaySlide.tsx` with systems diagram
8. Create `DalmiaBenchmarkSlide.tsx` with bar chart
9. Create `DalmiaNorthStarSlide.tsx` with flow diagram

### Phase 3: Capability Slides (7-12)
10. Create `DalmiaCapabilityStackSlide.tsx` with 4-layer architecture
11. Create `DalmiaDynamicPricingSlide.tsx`
12. Create `DalmiaSalesIntelligenceSlide.tsx`
13. Create `DalmiaDealer360Slide.tsx`
14. Create `DalmiaMarketingEngineSlide.tsx`
15. Create `DalmiaLoyalty2Slide.tsx`

### Phase 4: Impact & Close Slides (13-18)
16. Create `DalmiaDemandSensingSlide.tsx`
17. Create `DalmiaO2CSlide.tsx`
18. Create `DalmiaSuvidha2Slide.tsx`
19. Create `DalmiaValueMapSlide.tsx` with value table
20. Create `DalmiaRoadmapSlide.tsx` with timeline
21. Create `DalmiaOperatingModelSlide.tsx` with KPIs

### Phase 5: Integration
22. Update `MfgNewSlideRenderer.tsx` to handle all `dalmia-*` slide types
23. Verify navigation and presentation mode

---

## Slide Content Summary

| # | Title | Key Visual | Impact Metric |
|---|-------|------------|---------------|
| 1 | Cover | Title card | - |
| 2 | CEO Imperative | Old→New arrow | Industry shift |
| 3 | Value Pools | Triangle | 3 value pools |
| 4 | Dalmia Today | System fragments | 35% digital |
| 5 | Benchmark Gap | Bar chart | 93% vs 35% |
| 6 | North Star | Flow diagram | Platform vision |
| 7 | Capability Stack | 4 layers | Full architecture |
| 8 | Dynamic Pricing | Impact card | ₹140-280 Cr |
| 9 | Sales Intelligence | Copilot features | 8-15% uplift |
| 10 | Dealer 360 | Data hub | Unified view |
| 11 | Marketing Engine | 4 capabilities | 20-30% ROI |
| 12 | Loyalty 2.0 | Evolution | Engagement |
| 13 | Demand Sensing | Accuracy chart | 65%→85% |
| 14 | O2C AI | Flow diagram | ₹150-300 Cr |
| 15 | SUVIDHA 2.0 | Feature grid | 80% digital |
| 16 | Value Map | Table | ₹870-1,720 Cr |
| 17 | Roadmap | Timeline | 24 months |
| 18 | Operating Model | KPIs + Ask | Board decision |

---

## Key Deliverables

1. **18 fully-designed slides** with speaker notes
2. **Clean consulting visuals** (diagrams, charts, tables)
3. **Executive storytelling** flow from problem to ask
4. **PDF-ready layout** (screenshot-friendly)
5. **Keyboard navigation** (existing system preserved)
6. **Full prompt saved** to `manufacturing.md`



# Plan: Add Total Opportunity Calculation Slide

## Overview
Create a new slide that breaks down and sums up the total value opportunity (₹870–1,720 Cr) across all seven value streams. This slide will provide executive transparency into how the total is calculated, showing each initiative's contribution.

## Design Approach
A table/grid layout showing each value stream with its impact metric and calculated value range. The slide will visually roll up to the total opportunity figure, reinforcing credibility and allowing CXOs to see the build-up.

## Visual Layout
```text
+------------------------------------------------------------------+
|  TOTAL OPPORTUNITY BREAKDOWN                                      |
|  "Value Calculation by Initiative"                                |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------------------------------------------------+   |
|  | Initiative          | Impact Metric      | Value Range     |   |
|  |------------------------------------------------------------|   |
|  | AI Pricing Engine   | 1-2% margin uplift | ₹140–280 Cr    |   |
|  | Sales Copilot       | 8-15% productivity | ₹80–150 Cr     |   |
|  | Dealer 360          | 10% retention      | ₹60–120 Cr     |   |
|  | AI Marketing Radar  | 20-30% ROI         | ₹40–80 Cr      |   |
|  | Demand Planning     | 20% accuracy       | ₹100–200 Cr    |   |
|  | Touchless O2C       | DSO reduction      | ₹150–300 Cr    |   |
|  | Dashboarding        | Decision speed     | ₹50–90 Cr      |   |
|  +------------------------------------------------------------+   |
|                                                                    |
|  +----------------------------+  +----------------------------+   |
|  | REVENUE UPLIFT             |  | SAVINGS & EFFICIENCY       |   |
|  | ₹320–530 Cr                |  | ₹340–650 Cr                |   |
|  +----------------------------+  +----------------------------+   |
|                                                                    |
|  +------------------------------------------------------------+   |
|  |              TOTAL OPPORTUNITY: ₹870–1,720 Cr              |   |
|  |                        ROI: 50×                             |   |
|  +------------------------------------------------------------+   |
|                                                                    |
+------------------------------------------------------------------+
```

## Implementation Steps

### 1. Create the Slide Component
Create `src/components/pitch/manufacturing-new/DalmiaTotalOpportunitySlide.tsx`:
- Use `MfgNewSlideLayout` for consistent styling
- Display a table with 7 value streams, their metrics, and value ranges
- Show grouped subtotals (Revenue Uplift vs Savings)
- Display prominent total opportunity and ROI at the bottom
- Use framer-motion animations consistent with other slides
- Apply color coding: amber/orange gradient for revenue, teal/green for savings

### 2. Add Slide Data
Update `src/data/dalmiaCementSlides.ts`:
- Add new slide entry with type `dalmia-total-opportunity`
- Position after Roadmap (as slide 15) or before Roadmap (as slide 14)
- Include headline, speaker notes, and value table data

### 3. Register in Slide Renderer
Update `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`:
- Import the new `DalmiaTotalOpportunitySlide` component
- Add case for `dalmia-total-opportunity` in the switch statement

## Value Data to Display

| Initiative | Metric | Low | High |
|------------|--------|-----|------|
| AI Pricing Engine | 1-2% margin uplift | ₹140 Cr | ₹280 Cr |
| Sales Copilot | 8-15% productivity | ₹80 Cr | ₹150 Cr |
| Dealer 360 | Retention improvement | ₹60 Cr | ₹120 Cr |
| AI Marketing Radar | 20-30% ROI | ₹40 Cr | ₹80 Cr |
| Demand Planning | Forecast accuracy | ₹100 Cr | ₹200 Cr |
| Touchless O2C | DSO reduction | ₹150 Cr | ₹300 Cr |
| Dashboarding | Decision velocity | ₹50 Cr | ₹90 Cr |

**Subtotals:**
- Revenue Uplift: ₹320–530 Cr
- Savings/Efficiency: ₹340–650 Cr
- **Total**: ₹870–1,720 Cr
- **ROI**: 50×

---

## Technical Details

### Files to Create
1. `src/components/pitch/manufacturing-new/DalmiaTotalOpportunitySlide.tsx`

### Files to Modify
1. `src/data/dalmiaCementSlides.ts` - Add slide 15 data
2. `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx` - Add import and switch case

### Slide Position
Insert as the final slide (after Transformation Roadmap) to serve as a "summary/ask" slide that reinforces the total value proposition.

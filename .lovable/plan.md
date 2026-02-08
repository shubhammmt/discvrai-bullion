
# Restructure Deck: Focus on Value Delivery Streams

## Current Analysis

The deck currently has 20 slides with various content types after slide 5. The 7 value streams defined in slide 5 are:

| # | Value Stream | Current Slide |
|---|--------------|---------------|
| 1 | AI Pricing Engine | Slide 6 ✓ |
| 2 | Sales Copilot | Slide 7 ✓ |
| 3 | Dealer 360 | Slide 8 ✓ |
| 4 | AI Marketing Radar | Slide 9 ✓ |
| 5 | Demand Planning | Slide 10 ✓ |
| 6 | Touchless O2C | Slide 11 ✓ |
| 7 | Dashboarding & Insights | **MISSING** |

## Slides to Remove

The following slides don't fit the value delivery stream narrative:

| ID | Type | Reason for Removal |
|----|------|-------------------|
| 12 | dalmia-suvidha | Platform slide, not a value stream |
| 13 | dalmia-valuemap | Summary slide - can be added at end |
| 14 | dalmia-industry-shift | Context slide - already covered in intro |
| 15 | dalmia-case-theme-data | Theme slide - overlaps with architecture |
| 16 | dalmia-case-theme-sales | Duplicate of Sales Copilot (slide 7) |
| 17 | dalmia-case-theme-supply | Overlaps with Demand Planning |
| 18 | dalmia-case-theme-trust | Not in value stream list |
| 19 | dalmia-case-theme-margin | Not in value stream list |
| 20 | dalmia-transformation-roadmap | Keep as closing slide |

## New Slide Structure (13 slides total)

| # | Type | Headline |
|---|------|----------|
| 1 | Cover | Commercial Intelligence Transformation |
| 2 | Global Examples | What Global Leaders Are Doing |
| 3 | Today | Strong Foundations - Missing Intelligence Layer |
| 4 | Vision Architecture | AI-Powered Commercial Intelligence Platform |
| 5 | Value Streams | Value Delivery Streams |
| 6 | Pricing Engine | AI Pricing Engine |
| 7 | Sales Copilot | Sales Copilot |
| 8 | Dealer 360 | Dealer 360 Platform |
| 9 | Marketing Engine | AI Marketing Engine |
| 10 | Demand Sensing | Demand Planning |
| 11 | O2C | Touchless O2C |
| 12 | Dashboarding | Dashboarding & Insights **(NEW)** |
| 13 | Roadmap | Transformation Roadmap |

---

## Implementation Steps

### Step 1: Add Dashboarding Slide
**File:** `src/data/dalmiaCementSlides.ts`

Add new slide entry:
```typescript
{
  id: 12,
  type: 'dalmia-dashboarding',
  headline: 'Dashboarding & Insights',
  speakerNotes: 'End-to-end analytics and business intelligence for data-driven decisions.'
}
```

### Step 2: Remove Non-Fitting Slides
**File:** `src/data/dalmiaCementSlides.ts`

Remove slides with types:
- `dalmia-suvidha`
- `dalmia-valuemap`
- `dalmia-industry-shift`
- `dalmia-case-theme-data`
- `dalmia-case-theme-sales`
- `dalmia-case-theme-supply`
- `dalmia-case-theme-trust`
- `dalmia-case-theme-margin`

Keep `dalmia-transformation-roadmap` as final slide.

### Step 3: Re-number Slide IDs
Renumber all slides sequentially from 1-13.

### Step 4: Create Dashboarding Component
**File:** `src/components/pitch/manufacturing-new/DalmiaDashboardingSlide.tsx`

Create new component with:
- Headline: "Dashboarding & Insights"
- Capabilities: Real-time KPIs, Executive Dashboards, Predictive Analytics, Custom Reports
- Impact metric: "100% visibility across commercial operations"
- Visual style matching other value stream slides

### Step 5: Update Renderer
**File:** `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`

Add case for `dalmia-dashboarding` slide type.

---

## Technical Details

```text
// dalmiaCementSlides.ts final structure

Slides 1-5: Intro & Context (unchanged)
Slides 6-12: Value Streams (7 slides)
  - Pricing Engine
  - Sales Copilot  
  - Dealer 360
  - Marketing Engine
  - Demand Planning
  - O2C
  - Dashboarding (NEW)
Slide 13: Roadmap (closing)

Total: 13 slides
```

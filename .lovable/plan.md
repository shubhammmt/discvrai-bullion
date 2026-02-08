

# Execute Deck Cleanup (Retain Slides 22, 24, 25, 26)

## Summary

Executing the cleanup while **keeping** the following legacy slides as requested:
- **#22** Vision Architecture (`dalmia-vision-architecture`)
- **#24** Sales & Dealer 360 (`dalmia-sales-dealer360`)
- **#25** Marketing & Engagement (`dalmia-marketing-engagement`)
- **#26** Supply Chain AI (`dalmia-supply-chain`)

---

## Slides to REMOVE (6 slides)

| Current # | Type | Reason |
|-----------|------|--------|
| 6 | `dalmia-value-opportunity` | Replaced by #27 Value Map |
| 17 | `dalmia-implementation` | Replaced by #28 Roadmap & Ask |
| 19 | `dalmia-imperative` | Duplicate of #2 Why Now |
| 20 | `dalmia-value-pools` | Covered by Value Map |
| 21 | `dalmia-current-state` | Duplicate of #5 Today |
| 23 | `dalmia-pricing` | Duplicate of #9 Pricing Engine |

---

## Slides to KEEP (22 slides)

| New # | Type | Headline |
|-------|------|----------|
| 1 | `dalmia-cover` | Cover |
| 2 | `dalmia-why-now` | Industry Inflection Point |
| 3 | `dalmia-transformation` | Commercial Model Transformation |
| 4 | `dalmia-global-examples` | What Global Leaders Are Doing |
| 5 | `dalmia-today` | Strong Foundations |
| 6 | `dalmia-future-vision` | AI-Powered Platform (was 7) |
| 7 | `dalmia-value-streams` | Value Delivery Streams (was 8) |
| 8 | `dalmia-pricing-engine` | AI Pricing Engine (was 9) |
| 9 | `dalmia-sales-copilot` | Sales Copilot (was 10) |
| 10 | `dalmia-dealer360` | Dealer 360 Platform (was 11) |
| 11 | `dalmia-marketing-engine` | AI Marketing Engine (was 12) |
| 12 | `dalmia-demand-sensing` | Demand Sensing (was 13) |
| 13 | `dalmia-o2c` | Order to Cash (was 14) |
| 14 | `dalmia-suvidha` | SUVIDHA 2.0 (was 15) |
| 15 | `dalmia-case-studies` | Global Case Studies (was 16) |
| 16 | `dalmia-final-message` | Final Message (was 18) |
| 17 | `dalmia-vision-architecture` | Vision & Architecture (was 22) |
| 18 | `dalmia-sales-dealer360` | Sales & Dealer Intelligence (was 24) |
| 19 | `dalmia-marketing-engagement` | Marketing & Engagement (was 25) |
| 20 | `dalmia-supply-chain` | Supply Chain AI (was 26) |
| 21 | `dalmia-valuemap` | Value Map (was 27) |
| 22 | `dalmia-roadmap-ask` | Roadmap & Ask (was 28) |

---

## Technical Changes

### 1. Update Data File
**File**: `src/data/dalmiaCementSlides.ts`
- Remove 6 slide entries (IDs 6, 17, 19, 20, 21, 23)
- Renumber remaining slides 1-22

### 2. Update Renderer
**File**: `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`
- Remove imports for 6 deleted components
- Remove case statements for deleted types

### 3. Delete Unused Component Files (6 files)
```text
DalmiaValueOpportunitySlide.tsx  (replaced by ValueMap)
DalmiaImplementationSlide.tsx    (replaced by RoadmapAsk)
DalmiaCEOImperativeSlide.tsx     (duplicate of WhyNow)
DalmiaValuePoolsSlide.tsx        (covered by ValueMap)
DalmiaCurrentStateSlide.tsx      (duplicate of Today)
DalmiaDynamicPricingSlide.tsx    (duplicate of PricingEngine)
```

---

## Result

| Metric | Before | After |
|--------|--------|-------|
| Total Slides | 28 | 22 |
| Slides Removed | - | 6 |
| Files Deleted | - | 6 |
| Estimated Duration | ~56 min | ~44 min |


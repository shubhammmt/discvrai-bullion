
# Remove Redundant Slides 2 and 3

## Analysis

After comparing the slide content, there is clear redundancy:

| Early Slides | Later Slides | Overlap |
|--------------|--------------|---------|
| Slide 2: "Industry Inflection Point" | Slide 17: "Heavy Industry Digital Transformation" | Both cover the shift from operational to AI-driven commercial intelligence |
| Slide 3: "Commercial Model Transformation" | Slide 18: "Dalmia Today vs AI-Centric Future" | Both show before/after comparisons of old vs new operating models |

Slides 17 and 18 are the better versions - they have:
- More detailed consulting-grade layouts
- BCG/McKinsey insights with citations
- Richer visual architecture diagrams
- Better structured content cards

## Implementation Plan

### Step 1: Update Slide Data
**File:** `src/data/dalmiaCementSlides.ts`

- Remove slide entries with IDs 2 and 3 (`dalmia-why-now` and `dalmia-transformation`)
- Re-number all subsequent slide IDs to maintain sequential order (4 becomes 2, 5 becomes 3, etc.)
- Total slides will go from 24 to 22

### Step 2: Verify Renderer
**File:** `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`

- The renderer already has switch cases for all slide types
- No changes needed - it will continue to work since it matches on `slide.type`, not `slide.id`

### New Slide Order (22 slides total)

| New # | Type | Headline |
|-------|------|----------|
| 1 | Cover | "Commercial Intelligence Transformation" |
| 2 | Global Examples | "What Global Leaders Are Doing" |
| 3 | Today | "Strong Foundations - Missing Intelligence Layer" |
| 4 | Vision Architecture | "AI-Powered Commercial Intelligence Platform" |
| 5 | Value Streams | "Value Delivery Streams" |
| 6 | Pricing Engine | "AI Pricing Engine" |
| 7 | Sales Copilot | "Sales Copilot" |
| 8 | Dealer 360 | "Dealer 360 Platform" |
| 9 | Marketing Engine | "AI Marketing Engine" |
| 10 | Demand Sensing | "Demand Sensing" |
| 11 | O2C | "Order to Cash Transformation" |
| 12 | SUVIDHA | "SUVIDHA 2.0 Platform" |
| 13 | Value Map | "Value Map" |
| 14 | Roadmap Ask | "Roadmap & Ask" |
| 15 | Industry Shift | "Heavy Industry Digital Transformation" |
| 16 | Today Future | "Dalmia Today vs AI-Centric Future" |
| 17 | Theme Data | "Unified Commercial Data Platform" |
| 18 | Theme Sales | "AI Sales Execution & Field Intelligence" |
| 19 | Theme Supply | "Predictive Supply Chain Intelligence" |
| 20 | Theme Trust | "Digital Trust & Channel Governance" |
| 21 | Theme Margin | "AI Margin Intelligence & Finance Automation" |
| 22 | Roadmap | "Transformation Roadmap" |

---

## Technical Details

```text
// dalmiaCementSlides.ts changes

REMOVE:
- Slide ID 2 (type: 'dalmia-why-now')
- Slide ID 3 (type: 'dalmia-transformation')

RENUMBER:
- ID 4 → 2
- ID 5 → 3
- ...continue sequentially...
- ID 24 → 22

RESULT:
totalDalmiaCementSlides = 22 (down from 24)
```

No component file changes required - the slide type renderers will continue to work correctly.

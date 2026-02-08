
# Delete Slide 15 (Final Message)

## Slide to Remove

| # | Type | Headline |
|---|------|----------|
| 15 | `dalmia-final-message` | Final Message |

This slide contains the CEO call-to-action message and will be removed from the deck.

---

## Technical Changes

### 1. Update Data File
**File**: `src/data/dalmiaCementSlides.ts`
- Remove the slide entry at ID 15 (lines 168-174)
- Renumber all subsequent slides (IDs 16-35 become IDs 15-34)

### 2. Update Renderer
**File**: `src/components/pitch/manufacturing-new/MfgNewSlideRenderer.tsx`
- Remove the import for `DalmiaFinalMessageSlide`
- Remove the case statement for `'dalmia-final-message'`

### 3. Delete Component File
**File to delete**: `src/components/pitch/manufacturing-new/DalmiaFinalMessageSlide.tsx`

---

## Result

| Metric | Before | After |
|--------|--------|-------|
| Total Slides | 35 | 34 |
| Slides Removed | - | 1 |
| Files Deleted | - | 1 |

### New Slide Numbering (15-21)

| New # | Old # | Type | Headline |
|-------|-------|------|----------|
| 15 | 16 | `dalmia-vision-architecture` | AI-Powered Commercial Intelligence Platform |
| 16 | 17 | `dalmia-sales-dealer360` | Sales & Dealer Intelligence |
| 17 | 18 | `dalmia-marketing-engagement` | Marketing & Engagement |
| 18 | 19 | `dalmia-supply-chain` | Supply Chain AI |
| 19 | 20 | `dalmia-valuemap` | Value Map |
| 20 | 21 | `dalmia-roadmap-ask` | Roadmap & Ask |
| 21 | 22 | `dalmia-theme-data-platform` | Unified Commercial Intelligence Platform |

All subsequent slides shift down by 1.

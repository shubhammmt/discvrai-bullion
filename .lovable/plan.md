
# Plan: Fix Math Across All Slides

## Current Problem
The individual initiative values do not add up to the displayed totals:

| Category | Displayed | Calculated from Items |
|----------|-----------|----------------------|
| Revenue Uplift | ₹320–530 Cr | ₹320–630 Cr |
| Savings & Efficiency | ₹340–650 Cr | ₹300–590 Cr |
| **Total** | **₹870–1,720 Cr** | **₹620–1,220 Cr** |

## Solution Approach
Adjust individual initiative values so they correctly add up to the target total of **₹870–1,720 Cr**.

### Corrected Value Breakdown

**Revenue Uplift (Target: ₹420–830 Cr)**
| Initiative | Current | New Value |
|------------|---------|-----------|
| AI Pricing Engine | ₹140–280 Cr | ₹180–350 Cr |
| Sales Copilot | ₹80–150 Cr | ₹100–200 Cr |
| Dealer 360 | ₹60–120 Cr | ₹80–160 Cr |
| AI Marketing Radar | ₹40–80 Cr | ₹60–120 Cr |
| **Subtotal** | ₹320–630 Cr | **₹420–830 Cr** |

**Savings & Efficiency (Target: ₹450–890 Cr)**
| Initiative | Current | New Value |
|------------|---------|-----------|
| Demand Planning | ₹100–200 Cr | ₹150–300 Cr |
| Touchless O2C | ₹150–300 Cr | ₹200–400 Cr |
| Dashboarding | ₹50–90 Cr | ₹100–190 Cr |
| **Subtotal** | ₹300–590 Cr | **₹450–890 Cr** |

**Grand Total: ₹420 + ₹450 = ₹870 Cr (low) | ₹830 + ₹890 = ₹1,720 Cr (high)**

## Files to Modify

### 1. DalmiaTotalOpportunitySlide.tsx
Update the `opportunities` array with corrected values:
```text
AI Pricing Engine:    ₹180–350 Cr  (revenue)
Sales Copilot:        ₹100–200 Cr  (revenue)
Dealer 360:           ₹80–160 Cr   (revenue)
AI Marketing Radar:   ₹60–120 Cr   (revenue)
Demand Planning:      ₹150–300 Cr  (savings)
Touchless O2C:        ₹200–400 Cr  (savings)
Dashboarding:         ₹100–190 Cr  (savings)
```

Update subtotals:
- Revenue Uplift: ₹420–830 Cr
- Savings & Efficiency: ₹450–890 Cr

### 2. DalmiaVisionArchitectureSlide.tsx
Update the Outcomes layer values to match:
- Revenue: ₹420–830 Cr (line 66)
- Savings: ₹450–890 Cr (line 67)

## Verification Checklist
After implementation, confirm:
- Slide 2 (Overview): Total shows ₹870–1,720 Cr
- Slide 5 (Vision Architecture): Revenue ₹420–830 Cr, Savings ₹450–890 Cr
- Slide 15 (Total Opportunity): All 7 items sum correctly to subtotals and grand total

## Technical Details

### DalmiaTotalOpportunitySlide.tsx Changes
Lines 18-26: Update `opportunities` array values
Lines 97, 110: Update subtotal display values

### DalmiaVisionArchitectureSlide.tsx Changes
Lines 66-67: Update Revenue and Savings values in the Outcomes layer

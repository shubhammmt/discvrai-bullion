# Bullion Buy Flow - Updated Requirements

## Overview
This document captures the updated requirements for the Gold & Silver purchase journey in the /bullion page.

---

## UI/UX Changes Summary

### 1. Homepage Action Bar Changes
- **REMOVE**: Separate "Buy" and "SIP" buttons
- **ADD**: Single unified "Buy" button (which opens a modal with both SIP and One-Time options)
- **SELL BUTTON**: Only visible when user has any bullion holdings (gold or silver > 0)

### 2. Unified Buy Modal
The buy modal should have **two tabs** at the top:
- **"Setup SIP"** - For recurring investments
- **"One Time"** - For one-time purchases

---

## SIP Flow (Setup SIP Tab)

### UI Components (from reference screenshots):
1. **Tab Toggle**: "Setup SIP" | "One Time"
2. **Frequency Selection**: Daily | Monthly | Weekly (pill buttons)
3. **Day/Date Selector**:
   - Weekly → Dropdown showing days (Monday, Tuesday, etc.)
   - Monthly → Calendar/Date picker (1st, 2nd, 3rd, etc.)
   - Daily → No additional selector needed
4. **Amount Input**: 
   - Large display showing current amount (e.g., "₹150")
   - +/- buttons for increment/decrement
   - Slider for visual adjustment
5. **Annual SIP Step-up**: Checkbox with "Annual SIP Step-up (10%)" option + Edit button
6. **Projected Returns Display**:
   - "Projected returns in 5 years"
   - Large projected value
   - Investment vs Earnings breakdown
7. **Proceed Button**: Dark green CTA

### Gold SIP Parameters:

| Frequency | Start Amount | Increment | Max Amount |
|-----------|-------------|-----------|------------|
| Daily     | ₹50         | ₹50       | ₹2,000     |
| Weekly    | ₹1,500      | ₹100      | ₹25,000    |
| Monthly   | ₹1,500      | ₹100      | ₹25,000    |

### Silver SIP Parameters:

| Frequency | Start Amount | Increment | Max Amount |
|-----------|-------------|-----------|------------|
| Daily     | ₹10         | ₹5        | ₹5,000     |
| Weekly    | ₹750        | ₹50       | ₹25,000    |
| Monthly   | ₹500        | ₹50       | ₹25,000    |

---

## One-Time Purchase Flow

### UI Components:
1. **Tab Toggle**: "Setup SIP" | "One Time"
2. **Gram Input**:
   - Large display showing grams (e.g., "1.2gm")
   - +/- buttons for increment/decrement
   - Slider for visual adjustment
3. **Amount Payable**: Shows calculated rupee amount based on grams
4. **Projected Returns Display**:
   - "Projected returns in 5 years"
   - Large projected value
   - Investment vs Earnings breakdown
5. **Proceed Button**: Dark green CTA

### Gold One-Time Parameters:

| Metal | Start Grams | Increment | Max Grams |
|-------|-------------|-----------|-----------|
| Gold  | 0.1 gm      | 0.1 gm    | 50 gm     |

### Silver One-Time Parameters:

| Metal  | Start Grams | Increment | Max Grams |
|--------|-------------|-----------|-----------|
| Silver | 1 gm        | 1 gm      | 1,300 gm  |

---

## Visual Design Reference (from screenshots)

### Color Scheme:
- **Background**: Warm cream/beige (#FFF8E7 or similar)
- **Primary CTA**: Dark teal/green (#1B4B43)
- **Accent**: Gold bars illustration
- **Text**: Dark gray/black for contrast
- **Border**: Light gray rounded borders for input sections

### Layout (Bottom Sheet Style):
1. **Top Section**: Projected returns with gold bar illustration
2. **Middle Section**: 
   - Tab toggle (Setup SIP / One Time)
   - Frequency pills (for SIP)
   - Day/Date selector (for SIP)
   - Amount/Gram input with +/- and slider
3. **Bottom Section**: 
   - Annual SIP Step-up checkbox (for SIP)
   - Proceed button

---

## Implementation Checklist

- [ ] Merge Buy and SIP buttons into single "Buy" button
- [ ] Show Sell button only when holdings > 0
- [ ] Create unified BuyModal with tabs
- [ ] Implement SIP flow with frequency selection
- [ ] Add day selector for Weekly SIP
- [ ] Add date picker for Monthly SIP
- [ ] Implement slider with +/- buttons
- [ ] Add projected returns calculation
- [ ] Implement Annual SIP Step-up option
- [ ] Configure metal-specific parameters (min, max, increment)
- [ ] One-time purchase in grams with slider

---

## Technical Notes

### Metal Configuration Object Structure:
```typescript
const metalConfig = {
  gold: {
    sip: {
      daily: { min: 50, max: 2000, step: 50 },
      weekly: { min: 1500, max: 25000, step: 100 },
      monthly: { min: 1500, max: 25000, step: 100 }
    },
    oneTime: { minGrams: 0.1, maxGrams: 50, stepGrams: 0.1 }
  },
  silver: {
    sip: {
      daily: { min: 10, max: 5000, step: 5 },
      weekly: { min: 750, max: 25000, step: 50 },
      monthly: { min: 500, max: 25000, step: 50 }
    },
    oneTime: { minGrams: 1, maxGrams: 1300, stepGrams: 1 }
  }
};
```

---

*Document created: 2026-01-14*
*Status: Ready for implementation*

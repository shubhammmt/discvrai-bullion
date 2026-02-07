

# Bullion UI Color Consistency & Theme Compatibility Overhaul

## Overview
Standardize all color usage across the `/bullion` pages using the design system's canonical color tokens, ensure full dark/light theme compatibility across all components and dialogs, and restyle success/failure screens to match the reference screenshots.

---

## Canonical Color Reference (from /bullion/design-system)

### Gold Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bullion-gold` | `#F2B705` | Primary gold, Buy CTA bg |
| `--bullion-gold-dark` | `#C89604` | Sell CTA bg, hover states |
| `--bullion-gold-light` | `#F7D166` | Highlights, accents |
| `--bullion-gold-muted` | `#E3DBCA` | Disabled, card backgrounds |

### Silver Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bullion-silver` | `#A9AEB8` | Primary silver, Buy CTA bg |
| `--bullion-silver-dark` | `#6E7585` | Sell CTA bg, hover states |
| `--bullion-silver-light` | `#D4D7DC` | Highlights, accents |
| `--bullion-silver-muted` | `#E9EAED` | Disabled, card backgrounds |

### Status Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--bullion-success` | `#18B868` | Success states |
| `--bullion-warning` | `#F5A508` | Warning, pending |
| `--bullion-error` | `#EF4444` | Error, failed |

### Surface & Text (Light Mode)
| Token | Hex | Usage |
|-------|-----|-------|
| `--bullion-surface` | `#F5F6F8` | Page background |
| `--bullion-surface-elevated` | `#FFFFFF` | Cards, dialogs |
| `--bullion-text-primary` | `#151821` | Primary text |
| `--bullion-text-secondary` | `#686E7D` | Secondary text |
| `--bullion-border` | `#E2E4E9` | Borders |

### Surface & Text (Dark Mode)
| Token | Hex | Usage |
|-------|-----|-------|
| `--bullion-surface` (dark) | `#131720` | Page background |
| `--bullion-surface-elevated` (dark) | `#1C2029` | Cards, dialogs |
| `--bullion-text-primary` (dark) | `#FAFAFA` | Primary text |
| `--bullion-text-secondary` (dark) | `#9BA1AD` | Secondary text |
| `--bullion-border` (dark) | `#2B3040` | Borders |

### Button Color Mapping (Consistent Across All Pages)
| Button | Gold Hex | Silver Hex | Text |
|--------|----------|------------|------|
| Buy (Primary) | `#F2B705` | `#A9AEB8` | Black (`#000`) |
| Sell (Secondary) | `#C89604` | `#6E7585` | White (`#FFF`) |

### Icons Used in Bullion
| Icon | Lucide Name | Usage |
|------|-------------|-------|
| Gold coin | `Coins` | Gold metal indicator |
| Silver medal | `Medal` | Silver metal indicator (or emoji) |
| Trend Up | `TrendingUp` | Positive price change |
| Trend Down | `TrendingDown` | Negative price change |
| Buy | `ShoppingCart` | Buy actions |
| Sell | `Minus` / `ArrowDown` | Sell actions |
| Portfolio | `Wallet` | Portfolio summary |
| Invoice | `FileDown` / `Download` | Invoice download |
| Check | `CheckCircle2` | Success states |
| Error | `XCircle` | Failure states |
| Warning | `AlertTriangle` | Warning states |
| Shield | `Shield` | Security/trust |
| Clock | `Clock` | Pending/timing |
| Gift | `Gift` | Gifting feature |
| Sparkles | `Sparkles` | Highlights, offers |
| SIP | `Repeat` / `RefreshCw` | SIP-related |
| Star | `Star` | Featured content |

---

## Changes by Component

### 1. BullionHero.tsx - Hero Card Theme Fix
**Problem**: Uses hardcoded `amber-500`, `slate-400`, `slate-800` classes that are not dark/light aware.

**Changes**:
- Replace Gold banner `bg-gradient-to-br from-amber-500/10` with `bg-gradient-to-br from-bullion-gold/10 via-bullion-gold/5 to-transparent` and `border-bullion-gold/20`
- Replace Silver banner `from-slate-400/10` with `from-bullion-silver/10 via-bullion-silver/5 to-transparent` and `border-bullion-silver/20`
- **Buy Gold button**: `bg-bullion-gold hover:bg-bullion-gold-dark text-black` (consistent primary)
- **Sell Gold button**: `bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white` (consistent secondary)
- **Buy Silver button**: `bg-bullion-silver hover:bg-bullion-silver-dark text-black` (consistent primary)
- **Sell Silver button**: `bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-white` (consistent secondary)
- Investor portfolio card: replace `from-slate-800 via-slate-900 to-slate-900` with theme-aware `bg-card border-border` styling
- Replace hardcoded `text-white` and `text-slate-300` with `text-foreground` and `text-muted-foreground`

### 2. QuickTradePanel.tsx - Consistent Card Backgrounds
**Problem**: Gold card uses `from-amber-500/10`, Silver card uses `from-slate-400/10`. Graph sections use different backgrounds.

**Changes**:
- Gold card: `bg-gradient-to-br from-bullion-gold/10 to-transparent border-bullion-gold/20`
- Silver card: `bg-gradient-to-br from-bullion-silver/10 to-transparent border-bullion-silver/20`
- Buy Gold button: `bg-bullion-gold hover:bg-bullion-gold-dark text-black`
- Buy Silver button: `bg-bullion-silver hover:bg-bullion-silver-dark text-black`
- Icon colors: Gold icon `text-bullion-gold`, Silver icon `text-bullion-silver`
- Replace `text-amber-400` with `text-bullion-gold` and `text-slate-300` with `text-bullion-silver`

### 3. BullionPriceCard.tsx - Consistent Backgrounds & Buttons
**Problem**: Uses `from-amber-500/20`, `from-slate-400/20` and different button colors than design system.

**Changes**:
- Gold config: `gradient: "from-bullion-gold/20 via-bullion-gold-light/10 to-bullion-gold/20"`, `border: "border-bullion-gold/30"`, `accent: "text-bullion-gold"`, `buttonBg: "bg-bullion-gold hover:bg-bullion-gold-dark text-black"`
- Silver config: same pattern with `bullion-silver` tokens
- These backgrounds must match the QuickTradePanel backgrounds for consistency

### 4. TransactionCard.tsx - Dark/Light Theme Fix
**Problem**: Currently hardcoded black background (`bg-black`), hardcoded `text-white`, and inline `style={{ color: '#F4CE14' }}`. Not theme-aware at all.

**Changes** (matching reference screenshot):
- Replace `bg-black` card with `bg-card border border-border rounded-2xl`
- Date badge: change from `style={{ backgroundColor: '#A89F73' }}` to a theme-aware badge: Light mode `bg-bullion-gold-dark text-white`, maintain rounded-full pill style
- Add "SIP" badge for SIP transactions (shown in reference) using `bg-bullion-gold/20 text-bullion-gold-dark` in light mode
- Add status badge: Success = `bg-bullion-success/10 text-bullion-success border border-bullion-success/20`, Failed = `bg-bullion-error/10 text-bullion-error border border-bullion-error/20`
- Transaction type label: Use `text-foreground` instead of `text-white`
- Grams value: Use `text-bullion-gold` for gold, `text-bullion-silver-dark` for silver (instead of hardcoded `#F4CE14`)
- Total amount: Use `text-bullion-error` for amounts (matching the orange-red in the reference screenshot)
- Rate: Use `text-bullion-error`
- Tax detail labels: `text-muted-foreground`
- Tax detail values: `text-foreground`
- Invoice button: `text-foreground` with `FileDown` icon in `text-bullion-gold` for gold, `text-bullion-silver` for silver
- Expand/collapse icon: `text-muted-foreground`

### 5. UnifiedBuyModal.tsx - Metal-Specific Theme Colors
**Problem**: Uses hardcoded `bg-[#FFF8E7]` (only gold-toned), `bg-[#1B4B43]` for buttons. Not theme-aware, not metal-specific.

**Changes**:
- Dialog background: For gold = `bg-bullion-gold-muted dark:bg-card`, For silver = `bg-bullion-silver-muted dark:bg-card`
- Projected returns text: `text-foreground` instead of `text-gray-900`
- Secondary text: `text-muted-foreground` instead of `text-gray-600`
- Mode toggle active: For gold = `bg-bullion-gold-dark text-white`, For silver = `bg-bullion-silver-dark text-white` (replacing `bg-[#1B4B43]`)
- Frequency pills active border: For gold = `border-bullion-gold-dark`, For silver = `border-bullion-silver-dark`
- +/- buttons: For gold = `border-bullion-gold-dark text-bullion-gold-dark`, For silver = `border-bullion-silver-dark text-bullion-silver-dark`
- Proceed button: For gold = `bg-bullion-gold-dark hover:bg-bullion-gold-dark/90 text-white`, For silver = `bg-bullion-silver-dark hover:bg-bullion-silver-dark/90 text-white`
- Slider thumb: Match metal color
- Step-up section: For gold = `bg-bullion-gold/10 border-bullion-gold/20`, For silver = `bg-bullion-silver/10 border-bullion-silver/20`
- Bottom panel: `bg-background` instead of `bg-white`
- All `text-gray-*` classes replaced with `text-foreground`, `text-muted-foreground`

### 6. PurchaseSuccessScreen.tsx - Restyle to Match Reference
**Problem**: Current layout doesn't match the reference screenshots (3rd/4th images). Missing transaction detail grid.

**Changes** (matching reference screenshots):
- Restyle to match the "Payment Successful" / "Sale Successful" layout:
  - Small success icon at top (CheckCircle2 in teal/emerald)
  - Bold title: "Payment Successful" for buy, "Sale Successful" for sell
  - Large grams display with metal icon: gold-colored for gold, silver-colored for silver
  - Amount in metal's secondary color
  - Transaction details card (white/card bg, rounded) with grid:
    - TRANSACTION ID | value
    - ASSET | Gold/Silver with icon | QUANTITY | grams
    - RATE/G | value | GST (3%) | value
    - DATE | value | CUSTOMER | name
  - "Done" button: For gold = `bg-bullion-gold-dark text-white`, For silver = `bg-bullion-silver-dark text-white` (full width, dark, matching reference)
  - "Download PDF Invoice" link below
- Remove "Share" and "Invoice" buttons from SIP Activated dialog (point 7)
- SIP Activated: "View Portfolio" button uses gold secondary color for gold SIP, silver secondary for silver SIP

### 7. SIP Activated Dialog (inside PurchaseSuccessScreen type="sip")
**Changes**:
- Remove the Share button
- Remove the Invoice button
- "View Portfolio" button: For gold = `bg-bullion-gold-dark text-white`, For silver = `bg-bullion-silver-dark text-white`
- Keep "Done" as ghost button

### 8. SellSuccessScreen.tsx - Restyle to Match Reference
**Changes** (matching 4th reference image - "Sale Successful"):
- Same layout as PurchaseSuccessScreen with:
  - "Sale Successful" title
  - Metal icon + grams display
  - Amount display
  - Transaction detail grid (without GST since no GST on sell)
  - "Back to Dashboard" button: For gold = `bg-bullion-gold-dark text-white`, For silver = `bg-bullion-silver-dark text-white`
  - "Download PDF Invoice" link below

### 9. SellModal.tsx - Theme Compatibility
**Changes**:
- Dialog: `bg-background` (already mostly theme-aware but needs metal-specific colors on CTAs)
- Continue/Review buttons: For gold = `bg-bullion-gold-dark text-white`, For silver = `bg-bullion-silver-dark text-white`
- Sell confirmation button: Same metal-specific secondary colors

### 10. PaymentFailureScreen.tsx & SellFailureScreen.tsx - Theme Fix
**Changes**:
- Replace `bg-background/95` with `bg-background`
- Replace `text-amber-200` with `text-foreground` for refund notice text
- Retry buttons: For gold = `bg-bullion-gold-dark text-white`, For silver = `bg-bullion-silver-dark text-white`
- Ensure all text uses `text-foreground`/`text-muted-foreground` tokens

### 11. PortfolioSummaryWidget.tsx - Theme Compatibility
**Changes**:
- Transaction icons: use `text-bullion-gold` / `text-bullion-silver` instead of emojis for consistency
- Gold/Silver icons: Use `Coins` icon with `text-bullion-gold` for gold, `text-bullion-silver` for silver (replacing emoji where appropriate)

### 12. SIPModal.tsx - Theme & Color Fix
**Changes**:
- Frequency active button: For gold = metal's secondary color, For silver = metal's secondary color (instead of `bg-primary`)
- SIP summary card: `bg-bullion-gold/10 border-bullion-gold/20` for gold, `bg-bullion-silver/10 border-bullion-silver/20` for silver
- Activate SIP button: metal-specific secondary color

### 13. StartSIPDialog.tsx - Theme Fix
**Changes**:
- Replace `bg-gradient-to-r from-amber-500 to-amber-600` with metal-aware button colors
- Summary card: metal-aware background

---

## Implementation Order
1. Update `BullionHero.tsx` (hero cards + investor state)
2. Update `QuickTradePanel.tsx` (trade panel cards)
3. Update `BullionPriceCard.tsx` (price cards with graphs)
4. Update `TransactionCard.tsx` (transaction history)
5. Update `UnifiedBuyModal.tsx` (buy dialog)
6. Update `PurchaseSuccessScreen.tsx` (buy/SIP success - restyle + remove buttons)
7. Update `SellModal.tsx` (sell dialog)
8. Update `SellSuccessScreen.tsx` (sell success - restyle)
9. Update `PaymentFailureScreen.tsx` (payment failure)
10. Update `SellFailureScreen.tsx` (sell failure)
11. Update `PortfolioSummaryWidget.tsx` (portfolio widget)
12. Update `SIPModal.tsx` (SIP dialog)
13. Update `StartSIPDialog.tsx` (goal SIP dialog)

---

## Cursor Development Prompt (Copy-Paste Ready)

At the end of implementation, a comprehensive reference document will be provided containing:
- All component names with their exact file paths
- All hex color codes for light and dark themes
- Button color mapping per metal type per action
- Icon name mapping (Lucide React) per usage context
- Screen/dialog name to component mapping

This ensures any developer using Cursor can reproduce the exact same styling.


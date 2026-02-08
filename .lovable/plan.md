

# Rebuild Price Alert Feature for /bullion/notifications + Add "+" Icon to /bullion Toolbar

## Overview
Two changes:
1. **Redesign the Alerts tab** on `/bullion/notifications` to use a dialog-based "Create Alert" flow (matching the discvr.ai/mutual-fund style) instead of the current inline switch/input settings panel.
2. **Replace the Search icon** with a **Plus (+) icon** in the `/bullion` page header toolbar that opens the same Create Alert dialog. Apply this across all three user modes (new, logged_in_no_holdings, investor).

---

## Part 1: New "Create Price Alert" Dialog Component

Create `src/components/bullion/CreatePriceAlertDialog.tsx`:

- **Trigger**: Opens via a `Dialog` (Radix) controlled by `open`/`onOpenChange` props
- **Content**:
  - Metal selection: Gold / Silver toggle (styled with metal tokens -- amber for Gold, slate for Silver)
  - Condition: "Above" / "Below" segmented buttons
  - Target price input: Large INR input field with current price displayed as reference
  - **Percentage shortcuts**: Buttons for +/-5%, +/-10% that auto-calculate from current price
  - Notification channels: Checkboxes for Push, Telegram, WhatsApp
  - "Create Alert" CTA button (gold/silver themed)
- **Mock current prices**: Gold: 7,245/gm, Silver: 89/gm (same as existing watchlist data)
- **On submit**: Shows toast via `sonner` confirming alert creation

---

## Part 2: Redesign Alerts Tab in BullionNotifications.tsx

**Remove**: The entire inline "Price Alert Settings" card (lines 323-513) with all the individual switch/input rows for gold/silver drop/jump/percent alerts and their 16+ state variables.

**Replace with**:
1. A "Create New Alert" button at the top that opens the `CreatePriceAlertDialog`
2. **Active Alerts list** displayed as cards (keep existing alert cards but enhance with progress indicators):
   - Each card shows: Metal icon, condition (above/below), target price, current price, progress bar showing how close current price is to target
   - Edit button (opens dialog pre-filled) and Delete button
3. Keep the "Offers for You" redirect card at the bottom

**State cleanup**: Remove the 16 individual state variables (`goldDropAlert`, `goldDropPrice`, `goldJumpAlert`, etc.) and replace with a single `alerts` array state.

---

## Part 3: Replace Search Icon with "+" on /bullion Page

In `src/pages/BullionInvestment.tsx` (line 130-132):

**Current**:
```text
<Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-muted">
  <Search className="w-5 h-5" />
</Button>
```

**Change to**:
```text
<Button variant="ghost" size="icon" className="hidden sm:flex hover:bg-muted" onClick={() => setShowAlertDialog(true)}>
  <Plus className="w-5 h-5" />
</Button>
```

- Add `CreatePriceAlertDialog` import and render it in the component
- Add `showAlertDialog` state
- This applies universally -- visible in all three modes (new, logged_in_no_holdings, investor)
- Remove `Search` from lucide imports, add `Plus` if not already imported

---

## Part 4: Export from Bullion Index

Add `CreatePriceAlertDialog` to `src/components/bullion/index.ts`.

---

## Files to Create
1. `src/components/bullion/CreatePriceAlertDialog.tsx` -- New dialog component

## Files to Modify
1. `src/pages/BullionNotifications.tsx` -- Redesign Alerts tab, remove inline settings
2. `src/pages/BullionInvestment.tsx` -- Replace Search icon with Plus icon, add dialog
3. `src/components/bullion/index.ts` -- Export new component

## Technical Notes
- Uses existing `Dialog` from `@/components/ui/dialog`
- Uses existing `Checkbox` from `@/components/ui/checkbox`
- Metal color tokens: Gold primary #F2B705, Silver primary #A9AEB8
- Icons: Lucide `Coins` (Gold), `Medal` (Silver) per design system
- Toast notifications via `sonner`


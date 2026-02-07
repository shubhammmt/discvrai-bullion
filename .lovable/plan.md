

# Rebuild /bullion/notifications as Watchlist & Notifications Hub

## Overview

Rebuild the `/bullion/notifications` page to match the layout and structure of `discvr.ai/watchlist?tab=notifications`. The current page is a simple settings-only view. The new page will be a full **Watchlist & Notifications Hub** with tabbed navigation, matching the Organize page pattern already in the codebase.

Additionally, the "Special Offers" section will be replaced with a card that redirects users to the "Offers for You" section on `/bullion`.

---

## Current vs New Structure

| Current | New |
|---------|-----|
| Single-page settings form | Tabbed hub (Watchlists, Alerts/Notifications, Saved Research, Calendar) |
| Price alert toggles only | Alert cards with priority badges, dismiss/view actions |
| Auspicious day toggles | Integrated into Calendar tab |
| Special Offers toggle | Replaced with redirect card to /bullion#offers |
| No watchlist management | Watchlist sidebar + item list with bullion context |

---

## Implementation Plan

### Step 1: Rebuild BullionNotifications.tsx

Replace the current page with a tabbed layout modeled on `src/pages/Organize.tsx` but contextualized for Bullion:

**Tab 1 - Watchlists**
- Gold & Silver watchlist (price tracking)
- Ability to add custom price targets
- Current live prices with change indicators

**Tab 2 - Alerts (default when navigating with ?tab=notifications)**
- Active alert cards in a grid layout (matching Organize page style)
- Priority badges (high/medium/low)
- Alert types: Price Drop, Price Jump, SIP Due, Festival Reminder
- Dismiss/View actions on each card
- Subscription CTA for Telegram/WhatsApp notifications
- **Price alert settings** (retain existing Gold/Silver alert configuration from current page)

**Tab 3 - Saved Research**
- Saved bullion articles, analysis, and market reports
- Tags and category badges

**Tab 4 - Calendar**
- Auspicious days (Akshaya Tritiya, Dhanteras, Hindu New Year)
- Personal dates (Birthday, Anniversary) - moved from current Auspicious Day Alerts section
- SIP due dates
- Price target reminders

### Step 2: Special Offers Redirect

Replace the "Special Offers" card with an "Offers for You" card that:
- Shows a preview snippet (e.g., "You have 3 offers waiting")
- Has a CTA button that navigates to `/bullion` and scrolls to the Offers section
- Uses `navigate('/bullion')` with a hash or state to target the offers area

### Step 3: Header & Navigation

- Keep the sticky header with back button to `/bullion`
- Title changes to "Watchlist & Notifications"
- Support `?tab=notifications` query param to auto-select the Alerts tab

---

## Technical Details

### File Changes

```text
src/pages/BullionNotifications.tsx    # REWRITE - Full tabbed hub
```

### Key Dependencies (already installed)
- `@radix-ui/react-tabs` - For tab navigation
- `lucide-react` - Icons
- `react-router-dom` - Navigation + query params
- `@/components/ui/card`, `badge`, `button`, `tabs` - UI components

### Data Structure

```typescript
// Bullion-specific alert items
interface BullionAlert {
  type: 'price_drop' | 'price_jump' | 'sip_due' | 'festival' | 'target_reached';
  metal: 'gold' | 'silver';
  message: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

// Bullion watchlist items
interface BullionWatchItem {
  metal: 'gold' | 'silver';
  name: string;
  currentPrice: string;
  change: number;
  targetPrice?: string;
  alert?: string;
}

// Calendar events
interface BullionCalendarEvent {
  date: string;
  event: string;
  type: 'festival' | 'personal' | 'sip' | 'target';
  metal?: 'gold' | 'silver';
}
```

### Query Parameter Support

```typescript
const [searchParams] = useSearchParams();
const defaultTab = searchParams.get('tab') === 'notifications' ? 'alerts' : 'watchlists';
```

### Offers Redirect Implementation

```typescript
// Instead of Special Offers toggle, show a redirect card
<Card className="p-5 cursor-pointer" onClick={() => navigate('/bullion', { state: { scrollTo: 'offers' } })}>
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <Gift icon />
      <div>
        <h2>Offers for You</h2>
        <p>View exclusive deals & bonus gold offers</p>
      </div>
    </div>
    <ChevronRight />
  </div>
</Card>
```

---

## Layout Preview

```text
+--------------------------------------------------+
| <- Watchlist & Notifications              [User]  |
+--------------------------------------------------+
| [Watchlists] [Alerts] [Research] [Calendar]       |
+--------------------------------------------------+
|                                                    |
|  Alerts Tab (default with ?tab=notifications):     |
|                                                    |
|  +-- Price Alert Settings (Gold/Silver) ---------+ |
|  | [Retain existing toggle/input UI]             | |
|  +-----------------------------------------------+ |
|                                                    |
|  Active Alerts:                                    |
|  +----------+ +----------+ +----------+           |
|  | Gold Drop| | SIP Due  | |Dhanteras |           |
|  | HIGH     | | MEDIUM   | | LOW      |           |
|  | -2.3%    | | Tomorrow | | Feb 28   |           |
|  |[Dismiss] | |[Dismiss] | |[Dismiss] |           |
|  |  [View]  | |  [View]  | |  [View]  |           |
|  +----------+ +----------+ +----------+           |
|                                                    |
|  +-- Offers for You ---> /bullion ---------------+ |
|  | View exclusive deals & bonus gold offers  [>] | |
|  +-----------------------------------------------+ |
|                                                    |
|  +-- Stay Updated (Telegram/WhatsApp CTA) ------+ |
|  +-----------------------------------------------+ |
+--------------------------------------------------+
```

---

## Benefits

- Matches discvr.ai/watchlist design language
- Consolidates all notification/tracking features into one hub
- Special offers redirects to main bullion page (single source of truth)
- Supports deep linking via `?tab=notifications` query param
- Reuses existing UI component patterns from Organize page

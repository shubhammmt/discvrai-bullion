

# Rebuild `/bullion/notifications` Page

## Overview
Two changes to the notifications page:
1. **Remove the Watchlists tab entirely** -- no more metal watchlist sidebar/cards
2. **Rename "Research" tab to "Bookmarks"** -- repurpose it as a saved/bookmarked articles section where users can save premium articles from `/bullion/premium` to read later

---

## Changes to `src/pages/BullionNotifications.tsx`

### 1. Remove Watchlists Tab
- Remove the "Watchlists" tab trigger from the `TabsList` (change from 4-column grid to 3-column)
- Remove the entire `<TabsContent value="watchlists">` block (lines 237-318) including the sidebar, watchlist items, and filter logic
- Remove related state: `activeWatchlist` and `filteredWatchlistItems`
- Remove related interfaces: `BullionWatchItem`
- Remove related mock data: `watchlists`, `watchlistItems`
- Update default tab logic: change fallback from `'watchlists'` to `'alerts'`
- Update header title from "Watchlist & Notifications" to "Alerts & Bookmarks"

### 2. Rename "Research" to "Bookmarks"
- Change tab trigger label from "Research" to "Bookmarks"
- Change tab value from `"research"` to `"bookmarks"` (both trigger and content)
- Rename interface `SavedResearch` to `BookmarkedArticle` and update its fields:
  - Add `image`, `category`, `readTime`, `source` fields (matching premium article structure)
  - Keep `id`, `title`, `date`, `tags`
- Replace the "Saved Research" heading with "Bookmarked Articles"
- Replace "Browse All" button with a link to `/bullion/premium` ("Browse Premium")
- Update mock data to reference actual premium articles (e.g., "Understanding Digital Gold", "Silver Investment Guide", etc.)
- Redesign each bookmark card to show:
  - Article thumbnail image
  - Title, category badge, read time
  - "Read Now" button that navigates to `/bullion/premium`
  - "Remove Bookmark" icon button
- Replace the `BookOpen` icon references with `Bookmark` from lucide-react
- Update `savedResearch` array variable name to `bookmarkedArticles`

### 3. Icon and Import Cleanup
- Remove unused imports: `Eye` (if only used in watchlists)
- Add `Bookmark` import from lucide-react
- Keep all alert-related imports and logic unchanged

---

## Changes to `src/pages/BullionPremium.tsx`

### Add Bookmark Button to Article Cards
- Add a bookmark icon button (heart/bookmark) on each article card in the Learn & Grow section
- On click: show a toast "Article bookmarked! View in Alerts & Bookmarks" with a link
- This is UI-only (no persistent state) -- just the visual affordance and toast feedback

---

## Files to Modify
1. `src/pages/BullionNotifications.tsx` -- Remove watchlists tab, rename Research to Bookmarks, update mock data and UI
2. `src/pages/BullionPremium.tsx` -- Add bookmark icon to article cards

## Technical Notes
- No new files needed
- No new dependencies
- Tab count reduces from 4 to 3 (Alerts, Bookmarks, Calendar)
- Bookmark state is mock/local only (no backend persistence)
- Toast via `sonner` for bookmark feedback on premium page


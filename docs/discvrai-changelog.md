# DiscvrAI Site — Changelog

## 2026-04-25 — Top navigation replaced with module names

### What changed
The primary navigation bar on `/discvrai` (and all nested pages) was changed
from a flat list of marketing pages to a list of in-app **module names**,
mirroring what the user sees inside `agent.discvr.ai`.

### Before
```
Home · Features · Modules · Security · Pricing · About · Contact
```

### After
```
Home · Portfolio · Invest · SIPs · Goals · Calculator · Statements · More ▾
```

The `More ▾` dropdown contains the secondary marketing links:
- All modules
- Features
- Security
- Pricing
- About
- Contact

### How it works
- Each module link points to `/discvrai/modules#<id>` (e.g. `/discvrai/modules#portfolio`).
- `DiscvrModules.tsx` now assigns a stable `id` to every module card and
  uses `scroll-mt-24` so the sticky header doesn't cover the heading on jump.
- `DiscvrAILayout.tsx` listens to `useLocation().hash` and smooth-scrolls
  to the matching `id` on navigation.
- The `More` dropdown closes on outside-click via a `useRef` + `mousedown`
  listener.
- Mobile menu lists **all** items (modules + more) in a single scrollable
  panel.

### Files touched
- `src/pages/discvrai/DiscvrAILayout.tsx` — new `MODULE_NAV` + `MORE_NAV`
  arrays, dropdown UI, hash-scroll effect.
- `src/pages/discvrai/DiscvrModules.tsx` — added `id` field per module and
  applied it to each card with `scroll-mt-24`.

### Module → anchor map
| Module | Anchor |
|---|---|
| Home | `#home` |
| Portfolio | `#portfolio` |
| Invest | `#invest` |
| Search | `#search` |
| Transactions | `#transactions` |
| SIPs | `#sips` |
| Statements | `#statements` |
| Calculator | `#calculator` |
| Goals | `#goals` |
| Sell | `#sell` |
| Chat history | `#chat-history` |
| Profile | `#profile` |

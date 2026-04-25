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

---

## 2026-04-25 — State-aware homepage (`/discvrai`)

### What changed
The `/discvrai` home page is now **adaptive** based on the visitor's user
state, mirroring the in-app User State Engine used inside
`agent.discvr.ai` (Anonymous → New User → Investor).

A floating **Demo Mode** switcher (bottom-right) lets the viewer toggle
between the three states for demos / pitch walkthroughs.

### The three home variants

| State | Component | What the user sees |
|---|---|---|
| `visitor` (Anonymous) | `VisitorHome` (inside `DiscvrHome.tsx`) | Original marketing landing — hero, chat preview, pillars, modules grid, "How it works", CTA. |
| `new_user` | `DiscvrHomeNewUser.tsx` | "Start SIP" wizard recreating the screenshot from `agent.discvr.ai/invest`: 4-step progress (Select fund → Type → Details → Review), Search & Filter / AI Search tabs, advanced filters, fund list with NAV / 1Y / 3Y / 5Y returns, copilot CTA. |
| `investor` | `DiscvrHomeInvestor.tsx` | Portfolio dashboard: total value hero card with allocation bars, quick actions (Invest more / Manage SIPs / Plan a goal / Redeem), top holdings list, active SIPs panel with copilot tip, goals progress, copilot prompt strip. |

### How it works
- `DiscvrHome.tsx` holds a `useState<'visitor' \| 'new_user' \| 'investor'>`
  and renders one of three sub-components.
- The `UserStateSwitcher` is a fixed bottom-right pill (z-50) with three
  buttons; the active state uses the indigo→violet gradient.
- Default state is `visitor` so first-time site visitors still land on
  the original marketing page.
- Switching is **instant** (no route change) — state lives in the
  `DiscvrHome` component only, not in the URL.

### Files touched
- `src/pages/discvrai/DiscvrHome.tsx` — refactored into a state shell +
  `VisitorHome` sub-component; added `UserStateSwitcher`.
- `src/pages/discvrai/DiscvrHomeNewUser.tsx` *(new)* — Invest wizard view
  matching the uploaded screenshot.
- `src/pages/discvrai/DiscvrHomeInvestor.tsx` *(new)* — Portfolio
  dashboard view.

### Notes
- All three views share the existing `DiscvrAILayout` (sticky header,
  module nav, footer) — only the `<main>` body changes.
- The investor view links to `/discvrai/modules#portfolio`,
  `#sips`, `#goals` to leverage the deep-link work from the previous
  changelog entry.
- "Open in app" buttons all point to the existing `APP_URL` constant in
  `_shared.tsx` (`https://agent.discvr.ai/discovery?view=invest`).


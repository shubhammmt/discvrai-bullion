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

---

## 2026-04-25 — DiscvrAI Wealth Copilot dark-finance landing (`/discvrai/copilot`)

### What changed
A brand-new, **standalone** landing page was added at `/discvrai/copilot`.
It does **not** use `DiscvrAILayout` — it ships its own dark-finance shell
(top nav, sticky chat bar, footerless full-bleed). The existing `/discvrai`
marketing site is untouched.

### Route
- `src/App.tsx` registers `/discvrai/copilot` → `DiscvrCopilot.tsx`
  (placed **above** the `/discvrai` parent route so it isn't swallowed by
  the layout's `<Outlet />`).

### Aesthetic
- Background: deep charcoal `#07090d` with ambient emerald / sky / violet glows.
- Accents: electric emerald `#10F0A8`, cyber blue `#38BDF8`, violet `#A78BFA`.
- Typography: existing app font; large semibold headings with gradient text.
- Glassmorphism: `bg-white/[0.04..0.06]` + `backdrop-blur-xl` + `border-white/10`.

### Page structure (top → bottom)

| # | Section | Notes |
|---|---|---|
| 1 | **Top nav** | Left: DiscvrAI logo · Center: Features / Agents / Security / Pricing · Right: `Launch` button. |
| 2 | **Hero** | Headline "Your Money Never Sleeps. Now, Neither Does Your Strategy." Sub-headline + `Launch Your Agent` CTA + secondary `See it in action`. Right column: glassmorphism card with live `recharts` donut (5-sleeve allocation), legend, and emerald **Decision log** snippet ("Rebalancing: Moved 5% from Cash → Gold — Target Met."). |
| 3 | **Comparison table** | Two-column "Traditional Chatbot vs. DiscvrAI Agent". Chatbot: *Static Advice*, *Manual Execution*. Agent: *Actionable Strategy*, *Autonomous Action*. |
| 4 | **Bento grid** | Card 1 (emerald, wide): **Live Market Sentinel** — multi-market ticker feed (NIFTY, GOLD, HDFCBANK), area sparkline, formula `Δ% = ((New − Old) / Old) × 100`. Card 2 (sky): **Autonomous Rebalancing** — donut with `5 sleeves` center label and 5 mini chips. Card 3 (white glass, full-width): **Natural Language Logic** — Input box ("Keep my gold at 10% of my portfolio.") + Output box ("Rule set: 10% Gold rebalance · Drift band ±1.5% · Check: daily"). |
| 5 | **Live Action Stream** | Vertical log list, 5 entries (Agent 422 / 101 / 318 / 207 / 555) with monospace action text, agent badge, timestamp. |
| 6 | **Trust & Transparency** | Left: copy + 3 bullet checklist. Right: 24h audit `AreaChart` (sky gradient) + 3 stat tiles (Rebalances 142 / Quotes pulled 1,894 / Rules fired 382). |
| 7 | **Start Building CTA** | Centered headline, sub "Sleek, native-built dashboard, backend and partners.", `Launch Your Agent` button, partner row: AWS · DiscvrAI · Microsoft · Web3 · NSE · BSE. |
| 8 | **Sticky chat bar** | `position: fixed` bottom, glass pill with placeholder "Ask about funds, SIPs, goals, or anything…" and gradient send button. Submitting opens `APP_URL` in a new tab. |

### Files touched
- `src/pages/discvrai/DiscvrCopilot.tsx` *(new)* — full single-file page.
- `src/App.tsx` — added import + route `/discvrai/copilot`.
- `docs/discvrai-changelog.md` — this entry.

### Notes
- Color tokens are intentionally **literal hex** (not the project's HSL
  semantic tokens) because this page is a one-off "Dark Finance" pitch
  surface that must not inherit the light-themed `index.css` palette.
- All chart data is mocked locally inside the page (no API calls).
- The page is self-contained — it does **not** use `DiscvrAILayout`,
  global `ChatbotTrigger`, or shared footer; the sticky bottom chat bar
  replaces them.


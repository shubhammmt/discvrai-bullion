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


---

## 2026-04-25 — Copilot persona-aware nav + lighter background

**Route:** `/discvrai/copilot`

### 1. Persona-aware top navigation
A floating "Demo Mode" switcher (bottom-right, above the chat bar) toggles the page between three personas: **Visitor**, **New User**, **Investor**. The top nav re-renders accordingly.

| Persona     | Nav items                                                                              |
|-------------|----------------------------------------------------------------------------------------|
| Visitor     | Features · Agents · Security · Pricing                                                 |
| New User    | Invest · SIP · Calculator · Goal · Chatbot                                             |
| Investor    | **Portfolio ▾** (Sell, Transactions, Statement) · Invest · SIP · Calculator · Goal · Chatbot |

- Each module link uses a Lucide icon for quick recognition.
- "Portfolio" on the Investor view is a dropdown (`useRef` + outside-click handler) revealing Sell / Transactions / Statement.

### 2. Right-side action cluster
- **Visitor** keeps the original gradient `Launch` CTA.
- **New User & Investor** replace `Launch` with three icon buttons:
  - **Mode toggle** (`Sun` / `Moon`) — flips the page between dark (`#111827`) and light (`#f1f5f9`) themes via `useState`.
  - **Profile** (`User`) — dropdown showing the persona's name, KYC status, Edit Profile, Settings.
  - **Logout** (`LogOut`).
- All icon buttons share a themed `iconBtn` class that adapts to the current dark/light state.

### 3. Background lightened
- Old: solid charcoal `#07090d`.
- New: deep slate `#111827` (dark mode) with an instant flip to soft `#f1f5f9` (light mode) via the new mode toggle.
- Ambient glow blobs and the bottom chat-bar gradient were updated to match the new base color so they blend cleanly.

### Files edited
- `src/pages/discvrai/DiscvrCopilot.tsx` — persona type, NAV_VISITOR/NEW_USER/INVESTOR_PORTFOLIO_SUB constants, `PersonaSwitcher` component, refactored `TopNav` (now takes `persona`, `dark`, `onToggleDark` props), root `DiscvrCopilot` now manages persona + theme state, chat-bar gradient updated.

---

## Update — Hero simplification & light-mode readability

**Route:** `/discvrai/copilot`

### Changes
1. **Light-mode readability fix** — The hero `H1`, sub-headline, and stat values previously used hardcoded `text-white` / `text-slate-400`, which became unreadable on the new light background `#f1f5f9`. They now adapt:
   - Headline: `text-white` (dark) ↔ `text-slate-900` (light)
   - Sub-headline: `text-slate-400` (dark) ↔ `text-slate-600` (light)
   - Stat values: `text-white` (dark) ↔ `text-slate-900` (light)
   - Gradient accent span: `from-emerald-300…` (dark) ↔ `from-emerald-500…` (light) for sufficient contrast on white
   - Verified visually in both modes via the Sun/Moon toggle.

2. **Live Portfolio card → Auth choice card** — The right-hand glassmorphism card no longer shows the `₹ 18,42,310` portfolio + pie chart + decision log. It now presents three clear entry options:
   - **Already a User · Login** → sets persona to `investor`
   - **New User · Register** → sets persona to `new_user`
   - **Continue as Visitor** → sets persona to `visitor`
   Each option is a full-width button with gradient icon, title, description, and pill CTA. Selecting one immediately updates the top-nav and right-side action cluster (since they are persona-driven).

3. **Page trimmed to hero only** — Removed all sections below the hero:
   - `ComparisonTable` (Traditional Chatbot vs DiscvrAI Agent)
   - `BentoGrid` (Live Market Sentinel / Autonomous Rebalancing / Natural Language Logic)
   - `LiveStream` (agent action log)
   - `TrustSection` (audit chart)
   - `StartBuilding` (partner logos / second CTA)
   - `ChatBar` (sticky bottom input)
   The page now contains only: **Top Nav + Hero (headline + auth choice card) + Demo Persona Switcher**.
   Cleaned up unused imports (`recharts`, `useMemo`, ~12 unused lucide icons) and unused data constants (`ALLOC`, `REBAL`, `TICKERS`, `STREAM`, `AUDIT_SERIES`).

### Files
- `src/pages/discvrai/DiscvrCopilot.tsx` — Hero rewritten, sections removed, imports trimmed.
- `docs/discvrai-changelog.md` — This entry.

---

## Update — Header & hero text trimmed

**Route:** `/discvrai/copilot`

### Changes
1. **Header** — Removed the "Wealth Copilot" sub-label under the DiscvrAI logo. Header now shows only the gradient mark + "DiscvrAI" wordmark.
2. **Hero (left column)** — Removed:
   - The "Agentic · Always-on" pill above the headline.
   - The sub-headline paragraph "The first agentic investment assistant that doesn't just chat — it executes…"
   - The bottom stats row (Markets watched 24/7 · Avg decision latency 0.4s · Audit traceability 100%) including its dividers.
   The left column is now just the gradient headline "Your money never sleeps. Now, neither does your strategy."
3. Cleaned unused `Stat` component and unused style helpers (`dividerCls`, `statValueCls`, `statKeyCls`).

### Files
- `src/pages/discvrai/DiscvrCopilot.tsx`
- `docs/discvrai-changelog.md`

## Login & Register Modals + Persona-Aware Nav

**Landing page (Visitor / unauthenticated)** — Hero now shows three entry points wired to interactive flows:
- **Already a User · Login** → opens `LoginModal` (Mobile + OTP). On verify, persona switches to `investor`.
- **New User · Register** → opens `RegisterModal` (Name + Mobile + DOB). On submit, persona switches to `new_user`.
- **Continue as Visitor** → stays on visitor view, no modal.

**Modals** (`LoginModal`, `RegisterModal`)
- Reusable `ModalShell` with `Esc`-to-close, backdrop click, and dark/light theming.
- `LoginModal`: 2-step (phone → OTP) with simulated 700ms verify.
- `RegisterModal`: single-step form (Full Name, +91 mobile, DOB) with client validation.

**Top navigation by persona** (image references)
- **New User** (image 3): `Invest · SIP · Calculator · Goal · Chatbot` (icon + label).
- **Investor** (image 4): `Portfolio ▾ (Sell / Transactions / Statement) · Invest · SIP · Calculator · Goal · Chatbot`.
- Right cluster for both: theme toggle (sun/moon) · Profile dropdown · Logout (now wired to reset persona to `visitor`).

**Files changed**
- `src/pages/discvrai/DiscvrCopilot.tsx` — added `authModal` state, `handleChoice` / `handleAuthSuccess`, `LoginModal`, `RegisterModal`, `ModalShell`; wired logout button.
- `docs/discvrai-changelog.md` — this entry.

## Real OTP Login + Visitor Header Cleanup + Mobile Hamburger

**LoginModal — real OTP API**
- Wired to `https://api.discvr.ai/api/auth/phone/request-otp` and `/verify-otp`.
- Stores `discvr_session` and `discvr_user` in `localStorage` on success.
- Added 30s "Resend OTP" countdown with toast feedback (sonner) for errors and success.
- On verify success, persona switches to `investor` and the page transitions to the logged-in dashboard view.

**Visitor header simplified**
- Removed `Features`, `Agents`, `Security`, `Pricing` links from visitor nav.
- Replaced the `Launch` CTA with the **mode toggle** (sun/moon) so visitors can switch theme on the landing page.

**Mobile responsive nav**
- For logged-in personas (`new_user` / `investor`), desktop links collapse below `md` and a **hamburger** button appears in the right cluster.
- Tapping the hamburger opens a full-width drawer below the header listing every nav item (including Portfolio sub-items as flat entries for investors).
- Drawer auto-closes on persona change and on link tap.

**Files changed**
- `src/pages/discvrai/DiscvrCopilot.tsx` — Real OTP fetch flow, resend timer, visitor nav cleanup, mobile drawer.
- `docs/discvrai-changelog.md` — this entry.

## Logged-in Home Page (Mutual Funds Theme)
- Route: `/discvrai/copilot`
- For `new_user` and `investor` personas, the landing Hero is replaced by `MutualFundsHome`.
- Layout: centered "Mutual Funds" H1 + subtitle, "Popular Investment Themes" section, 3-column responsive grid of 9 fund cards.
- Each card: gradient top accent, icon tile, level/return row (green badge), 2-line description, color-coded tag (Policy-Driven, Defensive, High-Risk, Trade-Policy, Cost-Focused, Risk-Based, Performance, Investment Style), and Explore CTA. Premium funds show 👑.
- Visitor persona is unchanged (still shows the auth-choice Hero).
- Theme-aware (dark/light) using existing `dark` boolean from parent.

# SIP Module — Developer Reference

> Use this guide to locate, understand, and reuse the SIP management components from this Lovable project in your own IDE/codebase.

---

## Page Entry Point

| Route | File |
|---|---|
| `/sip-management` | `src/pages/SIPManagement.tsx` |

---

## Core Components

### SIP Calculator
- **Path:** `src/components/sip/SIPCalculatorWidget.tsx`
- **Props:** `onStartSIP?: (amount: number) => void`
- **Description:** Full SIP calculator with monthly/lumpsum modes, step-up %, and returns visualization. Supports SIP vs FD comparison.

### SIP Management (Manage/Pause/Cancel)
- **Path:** `src/components/sip/ManageSIPWidget.tsx`
- **Props:** `preSelectedSipId?: string`, `preSelectedAction?: 'pause' | 'activate' | 'delete'`, `onActionComplete?: (sipId, action) => void`
- **Description:** Lists all SIPs with expand/collapse details, pause/activate/cancel actions with confirmation dialog.

### Transactions
- **Path:** `src/components/sip/TransactionsTab.tsx`
- **Props:** None
- **Description:** Transaction history with filter by type (Buy/SIP/Sell/Switch) and status badges.

### Goals
- **Path:** `src/components/sip/GoalsWidget.tsx`
- **Props:** `compact?: boolean`, `onCreateGoal?: () => void`, `onViewGoals?: () => void`
- **Description:** Financial goals tracker with progress bars, category icons, and inline add/edit/delete goal dialog.

### Fund Purchase (Invest)
- **Path:** `src/components/sip/FundPurchaseWidget.tsx`
- **Props:** `compact?: boolean`, `prefill?: FundPurchasePrefill`
- **Description:** Full invest flow — search fund, select, configure SIP/one-time, confirm purchase. Supports AI screener prefill.

### Fund Redemption (Sell)
- **Path:** `src/components/sip/FundRedemptionWidget.tsx`
- **Props:** None
- **Description:** Sell/redeem fund holdings with partial/full redemption options.

### Portfolio Overview
- **Path:** `src/components/sip/PortfolioTab.tsx`
- **Props:** `onInvest?: () => void`
- **Description:** Portfolio summary with total value, returns vs benchmark, and per-fund breakdown.

### Mutual Fund Screener
- **Path:** `src/components/sip/MFScreenerWidget.tsx`
- **Props:** `onSelectFund?: (fund) => void`, filters
- **Description:** Filter-based fund screener with asset class, category, expense ratio, returns filters.

### Smart Fund Search (AI + Conventional)
- **Path:** `src/components/sip/SmartFundSearch.tsx`
- **Props:** `standalone?: boolean`, `onSelectFund?: (fund) => void`
- **Description:** Dual-mode search — conventional text search + AI natural language query.

### Statements
- **Path:** `src/components/sip/StatementsTab.tsx`
- **Props:** None
- **Description:** Account statements with download options (CAS, tax, capital gains).

### Create SIP
- **Path:** `src/components/sip/CreateSIPWidget.tsx`
- **Props:** `preSelectedFund?: string`, `prefill?: SIPPrefillData`, `onSIPCreated?: (details) => void`
- **Description:** Standalone SIP creation form with fund search, date, frequency, step-up, bank mandate.

---

## Supporting Components

| Component | Path |
|---|---|
| Agentic Chat | `src/components/sip/AgenticChatHome.tsx` |
| Chat History | `src/components/sip/ChatHistoryPanel.tsx` |
| Discovery Section | `src/components/sip/DiscoverySection.tsx` |
| Flow Demos | `src/components/sip/FlowDemos.tsx` |
| Fund Detail Sheet | `src/components/sip/FundDetailSheet.tsx` |
| OTP Login Dialog | `src/components/sip/OTPLoginDialog.tsx` |
| User State Switcher | `src/components/sip/SIPUserStateSwitcher.tsx` |
| Searchable Select | `src/components/sip/SearchableSelect.tsx` |
| Transaction Success | `src/components/sip/TransactionSuccess.tsx` |

---

## Mock Data

- **Path:** `src/data/sipMockData.ts`
- **Exports:** `MOCK_FUNDS`, `MOCK_SIPS`, `BANK_MANDATES`, `GOAL_TAGS`, `AMC_LIST`, `ASSET_CLASSES`, `MARKET_CAPS`, `EQUITY_CATEGORIES`, `DEBT_CATEGORIES`, `HYBRID_CATEGORIES`
- **Types:** `MutualFund`, `SIPRecord`, `SIPStatus`, `SIPFrequency`, `AssetClass`, `MarketCap`

---

## CSS Theme Tokens

All SIP module colors are defined as CSS variables in `src/index.css` under the `--sip-*` namespace and mapped to Tailwind classes via `tailwind.config.ts` under the `sip` key.

### Available Token Classes

| Token | Tailwind Class | Usage |
|---|---|---|
| `--sip-brand-primary` | `bg-sip-brand`, `text-sip-brand` | Primary brand color |
| `--sip-brand-accent` | `bg-sip-brand-accent` | Accent/secondary brand |
| `--sip-success` | `bg-sip-success`, `text-sip-success` | Positive returns, gains |
| `--sip-warning` | `bg-sip-warning`, `text-sip-warning` | Alerts, caution |
| `--sip-error` | `bg-sip-error`, `text-sip-error` | Losses, errors |
| `--sip-surface` | `bg-sip-surface` | Background surfaces |
| `--sip-text-primary` | `text-sip-text-primary` | Primary text |
| `--sip-text-secondary` | `text-sip-text-secondary` | Secondary text |
| `--sip-border` | `border-sip-border` | Borders |
| `--sip-sidebar-*` | `bg-sip-sidebar-bg`, etc. | Sidebar theming |

To rebrand: modify the HSL values of `--sip-*` variables in `src/index.css`.

---

## How to Copy Components

1. Copy the component file from `src/components/sip/` into your project
2. Copy mock data from `src/data/sipMockData.ts`
3. Ensure you have shadcn/ui components installed: `Card`, `Button`, `Badge`, `Progress`, `Dialog`, `Select`, `Input`, `Label`, `Slider`, `Tabs`, `Popover`, `Calendar`
4. Copy the `--sip-*` CSS variables from `src/index.css` and add the `sip` color config to your `tailwind.config.ts`
5. Install dependencies: `lucide-react`, `date-fns`, `sonner`, `react-markdown` (for chat)

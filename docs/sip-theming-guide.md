# SIP Module — Centralized Theming & Portability Guide

> This document explains how the SIP module's design system works, how to customize it, and how to port the entire module (with styling intact) to another project.

---

## Architecture Overview

The theming system has **three layers**:

```
┌─────────────────────────────────────────────┐
│  1. CSS Variables (src/index.css)            │  ← Color values (HSL)
├─────────────────────────────────────────────┤
│  2. Tailwind Config (tailwind.config.ts)     │  ← Maps CSS vars → utility classes
├─────────────────────────────────────────────┤
│  3. Brand Config (src/config/sipBrandConfig) │  ← Brand name, logo, text, mappings
├─────────────────────────────────────────────┤
│  4. Themed Components (SIPBrandLogo, etc.)   │  ← Reusable UI building blocks
└─────────────────────────────────────────────┘
```

Components **never** use hardcoded colors like `bg-green-500` or `text-red-700`. Instead, they reference semantic tokens like `bg-sip-action-success` or `text-sip-text-primary`.

---

## Layer 1: CSS Variables (`src/index.css`)

All SIP colors live under the `--sip-*` namespace. Both light and dark themes are defined:

```css
:root {
  /* Brand */
  --sip-brand-primary: 220 68% 55%;
  --sip-brand-primary-foreground: 0 0% 100%;
  --sip-brand-accent: 262 60% 55%;
  --sip-brand-accent-foreground: 0 0% 100%;

  /* Semantic Status */
  --sip-success: 152 76% 40%;
  --sip-warning: 38 92% 50%;
  --sip-error: 0 84% 60%;
  --sip-info: 210 80% 55%;

  /* Action States (buttons, badges, banners) */
  --sip-action-success: 152 76% 40%;
  --sip-action-success-light: 152 60% 94%;
  --sip-action-success-border: 152 50% 70%;
  --sip-action-success-foreground: 152 80% 25%;

  --sip-action-danger: 0 84% 60%;
  --sip-action-danger-light: 0 70% 95%;
  --sip-action-danger-border: 0 60% 75%;
  --sip-action-danger-foreground: 0 80% 30%;

  /* ...warning, info follow same pattern */

  /* Surfaces & Text */
  --sip-surface: 220 20% 97%;
  --sip-surface-elevated: 0 0% 100%;
  --sip-text-primary: 220 20% 14%;
  --sip-text-secondary: 220 10% 40%;
  --sip-text-muted: 220 10% 55%;
  --sip-border: 220 15% 90%;
  --sip-border-active: 220 68% 55%;

  /* Sidebar */
  --sip-sidebar-bg: 220 25% 12%;
  --sip-sidebar-active: 220 40% 22%;
  --sip-sidebar-hover: 220 30% 18%;

  /* Category Colors (Goals, Discovery) */
  --sip-category-1: 340 75% 55%;   /* Wedding */
  --sip-category-2: 210 80% 55%;   /* Education */
  --sip-category-3: 152 60% 45%;   /* Home */
  --sip-category-4: 38 90% 50%;    /* Emergency */
  --sip-category-5: 262 60% 55%;   /* Retirement */

  /* Asset Allocation Colors */
  --sip-alloc-equity: 220 68% 55%;
  --sip-alloc-debt: 152 76% 40%;
  --sip-alloc-hybrid: 38 92% 50%;
  --sip-alloc-other: 262 60% 55%;
  --sip-alloc-solution: 340 75% 55%;
}

.dark {
  /* Override all --sip-* values for dark mode */
  --sip-brand-primary: 220 68% 60%;
  --sip-surface: 220 20% 10%;
  --sip-text-primary: 220 15% 90%;
  /* ... */
}
```

### Token Naming Convention

| Prefix | Purpose | Example |
|---|---|---|
| `--sip-brand-*` | Primary brand identity | `--sip-brand-primary` |
| `--sip-action-*` | Interactive states (buttons, badges) | `--sip-action-success-light` |
| `--sip-text-*` | Typography colors | `--sip-text-secondary` |
| `--sip-surface-*` | Background surfaces | `--sip-surface-elevated` |
| `--sip-border-*` | Borders | `--sip-border-active` |
| `--sip-sidebar-*` | Sidebar-specific | `--sip-sidebar-bg` |
| `--sip-category-*` | Goal/discovery categories | `--sip-category-1` |
| `--sip-alloc-*` | Asset allocation chart | `--sip-alloc-equity` |

---

## Layer 2: Tailwind Config (`tailwind.config.ts`)

CSS variables are mapped to Tailwind utility classes under the `sip` key:

```ts
// tailwind.config.ts → theme.extend.colors
sip: {
  brand: {
    DEFAULT: 'hsl(var(--sip-brand-primary))',
    foreground: 'hsl(var(--sip-brand-primary-foreground))',
    accent: 'hsl(var(--sip-brand-accent))',
  },
  action: {
    success: {
      DEFAULT: 'hsl(var(--sip-action-success))',
      light: 'hsl(var(--sip-action-success-light))',
      border: 'hsl(var(--sip-action-success-border))',
      foreground: 'hsl(var(--sip-action-success-foreground))',
    },
    // danger, warning, info — same structure
  },
  text: {
    primary: 'hsl(var(--sip-text-primary))',
    secondary: 'hsl(var(--sip-text-secondary))',
    muted: 'hsl(var(--sip-text-muted))',
  },
  // surface, border, sidebar, category, alloc...
}
```

This means components use classes like:
```tsx
<div className="bg-sip-surface text-sip-text-primary border-sip-border">
  <Badge className="bg-sip-action-success-light text-sip-action-success-foreground">
    Active
  </Badge>
</div>
```

---

## Layer 3: Brand Config (`src/config/sipBrandConfig.ts`)

Non-color branding (name, logo, copy) lives here:

```ts
import { Bot, type LucideIcon } from 'lucide-react';

export const SIP_BRAND = {
  name: 'DiscvrAI',
  copilotName: 'Wealth Copilot',
  tagline: 'Wealth Platform',
  copilotSubtitle: 'Your Wealth Copilot',
  welcomeMessages: {
    anonymous: "Hi there! 👋 I am your Wealth Copilot...",
    logged_in_no_holdings: "Welcome! 👋 ...",
    investor: (name: string) => `Hi ${name}! 👋 ...`,
  },
  disclaimer: 'AI-powered • Your data is secure • Not financial advice',
};

export const SIP_LOGO_ICON: LucideIcon = Bot;

// Category → token mappings
export const SIP_CATEGORY_MAP = { Wedding: 'sip-category-1', ... };
export const SIP_ALLOCATION_COLORS = { Equity: 'sip-alloc-equity', ... };
```

### Reusable Themed Components

| Component | File | Purpose |
|---|---|---|
| `SIPBrandLogo` | `src/components/sip/SIPBrandLogo.tsx` | Renders the brand icon in a themed container |
| `SIPChatAvatar` | `src/components/sip/SIPBrandLogo.tsx` | Round avatar variant for chat |
| `SIPStatusBadge` | `src/components/sip/SIPStatusBadge.tsx` | Status badges (Active/Paused/Cancelled) |
| `txTypeColors` | `src/components/sip/SIPStatusBadge.tsx` | Transaction type color map |
| `riskLevelColors` | `src/components/sip/SIPStatusBadge.tsx` | Risk level color map |
| `bannerStyles` | `src/components/sip/SIPStatusBadge.tsx` | Alert banner color map |

---

## How to Change the Design

### Change Brand Colors

Edit **only** `src/index.css` — update the HSL values:

```css
:root {
  --sip-brand-primary: 160 70% 45%;   /* was blue, now teal */
  --sip-brand-accent: 30 90% 55%;     /* was purple, now orange */
}
.dark {
  --sip-brand-primary: 160 70% 55%;
  --sip-brand-accent: 30 90% 65%;
}
```

**Result:** Every button, sidebar highlight, logo background, and link across all 15+ components updates automatically.

### Change Brand Name & Logo

Edit **only** `src/config/sipBrandConfig.ts`:

```ts
export const SIP_BRAND = {
  name: 'MyNewBrand',
  copilotName: 'Smart Assistant',
  tagline: 'Investment Hub',
  // ...
};

import { Sparkles } from 'lucide-react';
export const SIP_LOGO_ICON: LucideIcon = Sparkles;
```

### Change Status Badge Colors

Edit the action tokens in `src/index.css`:

```css
:root {
  --sip-action-success: 120 60% 35%;        /* darker green */
  --sip-action-success-light: 120 50% 92%;
}
```

### Add a New Category Color

1. Add CSS variable in `src/index.css`:
   ```css
   --sip-category-6: 180 60% 45%;
   ```
2. Add Tailwind mapping in `tailwind.config.ts`:
   ```ts
   category: { ..., 6: 'hsl(var(--sip-category-6))' }
   ```
3. Add mapping in `sipBrandConfig.ts`:
   ```ts
   SIP_CATEGORY_MAP['Travel'] = 'sip-category-6';
   ```

---

## Porting to Another Project

Follow these steps to move the entire SIP module with its theming intact.

### Step 1: Copy Core Files

```
# Theming & Config
src/index.css                          → copy --sip-* variable blocks (both :root and .dark)
src/config/sipBrandConfig.ts           → copy entire file

# Themed shared components
src/components/sip/SIPBrandLogo.tsx
src/components/sip/SIPStatusBadge.tsx

# All SIP feature components
src/components/sip/*.tsx               → copy all

# Mock data
src/data/sipMockData.ts

# Page entry point
src/pages/SIPManagement.tsx
```

### Step 2: Merge CSS Variables

Append the `--sip-*` block from `src/index.css` into your target project's global CSS:

```css
/* Your project's global CSS file */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* ...your existing variables... */

    /* === SIP Module Tokens (paste from source) === */
    --sip-brand-primary: 220 68% 55%;
    --sip-brand-primary-foreground: 0 0% 100%;
    /* ...all other --sip-* variables... */
  }

  .dark {
    /* ...dark mode --sip-* overrides... */
  }
}
```

### Step 3: Merge Tailwind Config

Add the `sip` color block to your `tailwind.config.ts`:

```ts
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // ...your existing colors...
        sip: {
          brand: {
            DEFAULT: 'hsl(var(--sip-brand-primary))',
            foreground: 'hsl(var(--sip-brand-primary-foreground))',
            accent: 'hsl(var(--sip-brand-accent))',
            'accent-foreground': 'hsl(var(--sip-brand-accent-foreground))',
          },
          // Copy entire sip block from source tailwind.config.ts
        },
      },
    },
  },
};
```

### Step 4: Install Dependencies

```bash
npm install lucide-react date-fns sonner react-markdown recharts framer-motion
# shadcn/ui components needed:
npx shadcn@latest add card button badge progress dialog select input label slider tabs popover calendar scroll-area
```

### Step 5: Verify Routing

Add the route in your router:

```tsx
import SIPManagement from '@/pages/SIPManagement';

<Route path="/sip-management" element={<SIPManagement />} />
```

### Step 6: Rebrand for Your Project

1. Edit `src/config/sipBrandConfig.ts` — change `name`, `copilotName`, `SIP_LOGO_ICON`
2. Edit `src/index.css` — adjust `--sip-brand-primary` and `--sip-brand-accent` HSL values
3. Everything else updates automatically ✅

---

## Checklist: What to Change vs What Not to Touch

| To Change | Edit This File | Don't Touch |
|---|---|---|
| Brand colors | `src/index.css` (`:root` / `.dark`) | Component files |
| Brand name / logo | `src/config/sipBrandConfig.ts` | Component files |
| Status badge colors | `src/index.css` (`--sip-action-*`) | `SIPStatusBadge.tsx` |
| Category colors | `src/index.css` + `tailwind.config.ts` + `sipBrandConfig.ts` | Component files |
| Dark mode colors | `src/index.css` (`.dark` section) | Component files |
| Add new status type | `SIPStatusBadge.tsx` (add entry) | CSS variables |

---

## File Dependency Graph

```
index.css (--sip-* tokens)
    ↓
tailwind.config.ts (sip.* utility classes)
    ↓
sipBrandConfig.ts (brand name, logo, color mappings)
    ↓
SIPBrandLogo.tsx / SIPStatusBadge.tsx (themed primitives)
    ↓
All SIP feature components (consume tokens + config)
    ↓
SIPManagement.tsx (page entry point)
```

> **Golden Rule:** If you're editing a color inside a component file, you're doing it wrong. All colors flow from `index.css` → `tailwind.config.ts` → components.

# Bullion Journey Revamp - Comprehensive Recommendations

**Document Version:** 1.0  
**Date:** January 2026  
**Status:** Ready for Implementation

---

## Table of Contents

1. [User State Management](#user-state-management)
2. [Homepage Redesign](#homepage-redesign)
3. [Buy Flow (Existing - Keep As Is)](#buy-flow)
4. [Smart Edge Case Screens](#smart-edge-case-screens)
5. [Profile & KYC Page](#profile--kyc-page)
6. [Success Screens](#success-screens)
7. [Portfolio Enhancement](#portfolio-enhancement)
8. [Mobile-First Design](#mobile-first-design)
9. [Implementation Phases](#implementation-phases)

---

## User State Management

### Three User States

| State | Definition | Homepage Experience | Actions Available |
|-------|------------|---------------------|-------------------|
| **New User** | First-time visitor, no account | Full education + trust signals + CTAs | Buy, Learn |
| **Logged-In (No Holdings)** | Has account, 0g gold/silver | Personalized nudges + "Complete first purchase" | Buy, Profile Setup |
| **Existing Investor** | Has holdings > 0 | Portfolio-first view + quick actions | Buy, Sell, SIP, Portfolio |

### State Detection Logic

```typescript
type UserState = "new" | "logged_in_no_holdings" | "investor";

const getUserState = (user: User | null, holdings: Holdings): UserState => {
  if (!user) return "new";
  if (holdings.gold === 0 && holdings.silver === 0) return "logged_in_no_holdings";
  return "investor";
};
```

---

## Homepage Redesign

### Desktop Layout (3 User States)

#### New User View
```
┌─────────────────────────────────────────────────────────────────────────┐
│  HERO SECTION                                                            │
│  "Start Your Gold Journey from ₹10"                                     │
│  Subtext: "24K Pure Gold • Insured • Free Storage • Powered by Augmont" │
│  [Live Gold ₹6,250/g ▲0.7%] [Live Silver ₹76/g ▼1.6%]                   │
│  [🪙 Buy Gold] [🥈 Buy Silver]                                           │
├─────────────────────────────────────────────────────────────────────────┤
│  WHY GO DIGITAL? (5-Card Carousel)                                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ 24K Pure │ │ Sell     │ │ 0%       │ │ 100%     │ │ Buy from │       │
│  │ Gold     │ │ Anytime  │ │ Storage  │ │ Insured  │ │ ₹10      │       │
│  │ ✓        │ │ from Home│ │ Fee      │ │ in Vault │ │          │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────────────────────────────┤
│  PHYSICAL vs DIGITAL GOLD COMPARISON                                    │
│  ┌─────────────────────┬─────────────────────┐                          │
│  │ Physical Gold       │ Digital Gold        │                          │
│  ├─────────────────────┼─────────────────────┤                          │
│  │ Making charges 18%+ │ No making charges   │                          │
│  │ Storage risk/cost   │ Free insured vault  │                          │
│  │ Min ₹5,000+         │ Start from ₹10      │                          │
│  │ Sell at jeweler     │ Sell anytime online │                          │
│  └─────────────────────┴─────────────────────┘                          │
├─────────────────────────────────────────────────────────────────────────┤
│  HOW IT WORKS (3-Step Visual)                                           │
│  [1. Choose Amount] → [2. Pay via UPI] → [3. Gold in Your Vault]        │
├─────────────────────────────────────────────────────────────────────────┤
│  TRUST SIGNALS                                                           │
│  [Augmont Logo] [BIS Hallmark] [Brinks Vault] [100% Insured]            │
├─────────────────────────────────────────────────────────────────────────┤
│  FAQ SECTION                                                             │
│  • Is digital gold regulated? (SEBI advisory note)                      │
│  • How is my gold stored?                                               │
│  • What are the charges?                                                │
│  • Can I convert to physical gold?                                      │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Logged-In (No Holdings) View
```
┌─────────────────────────────────────────────────────────────────────────┐
│  PERSONALIZED HERO                                                       │
│  "Hey [Name], ready to start your gold journey?"                        │
│  [Complete Profile] [Buy Your First Gold]                               │
├─────────────────────────────────────────────────────────────────────────┤
│  PROGRESS TRACKER                                                        │
│  ○ Create Account ✓                                                     │
│  ○ Complete KYC (pending)                                               │
│  ○ Add Bank/UPI (pending)                                               │
│  ○ First Purchase (pending)                                             │
├─────────────────────────────────────────────────────────────────────────┤
│  QUICK BUY SECTION                                                       │
│  [Gold ₹6,250/g] [Silver ₹76/g]                                         │
│  [Start with ₹100] [Start SIP]                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  CONDENSED EDUCATION (Collapsible)                                      │
│  Why Gold? | How it works | Trust & Safety                              │
└─────────────────────────────────────────────────────────────────────────┘
```

#### Existing Investor View
```
┌─────────────────────────────────────────────────────────────────────────┐
│  PORTFOLIO HERO                                                          │
│  Total Value: ₹45,625 (+₹2,340 | +5.4%)                                 │
│  Gold: 5.2g (₹32,500) | Silver: 170g (₹13,125)                          │
│  [Buy More] [Sell] [Set Alert]                                          │
├─────────────────────────────────────────────────────────────────────────┤
│  LIVE PRICES (Compact)                                                   │
│  Gold ₹6,250/g ▲0.7% | Silver ₹76/g ▼1.6%                               │
├─────────────────────────────────────────────────────────────────────────┤
│  ACTIVE SIPs                                                             │
│  Gold SIP: ₹500/month (Next: 1st Feb) [Manage]                          │
├─────────────────────────────────────────────────────────────────────────┤
│  RECENT TRANSACTIONS                                                     │
│  • Bought 0.5g Gold - ₹3,125 - Jan 15                                   │
│  • SIP Credit - 0.08g Gold - Jan 1                                      │
│  [View All]                                                              │
├─────────────────────────────────────────────────────────────────────────┤
│  QUICK ACTIONS                                                           │
│  [Increase SIP] [Gift Gold] [Redeem to Coins]                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Buy Flow

### ⚠️ KEEP EXISTING IMPLEMENTATION AS-IS

The current `UnifiedBuyModal.tsx` already implements:
- Two tabs: "Setup SIP" | "One Time"
- SIP: Daily/Weekly/Monthly frequency + Day selector + Amount slider + Step-up option
- One-Time: Gram-based input + Slider + Projected returns
- Metal-specific parameters (Gold vs Silver configs)

**No changes required to buy flow.**

---

## Smart Edge Case Screens

### Scenario 1: User Clicks "Sell" but Has No Holdings

```typescript
// EmptyHoldingsPrompt.tsx
<Dialog>
  <div className="text-center p-6">
    <div className="w-16 h-16 mx-auto mb-4 bg-amber-500/20 rounded-full flex items-center justify-center">
      <Coins className="w-8 h-8 text-amber-500" />
    </div>
    <h3 className="text-xl font-bold mb-2">No Gold to Sell Yet</h3>
    <p className="text-muted-foreground mb-6">
      You don't have any gold in your vault. Buy gold first to start selling.
    </p>
    <div className="space-y-3">
      <Button onClick={openBuyModal} className="w-full bg-amber-500">
        Buy Gold Now
      </Button>
      <Button onClick={startSIP} variant="outline" className="w-full">
        Start Gold SIP
      </Button>
    </div>
  </div>
</Dialog>
```

### Scenario 2: User Tries to Sell More Than Available

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Insufficient Balance                                    │
│                                                              │
│  You have 2.5g gold (2.0g sellable, 0.5g locked)            │
│  Locked gold will be available after 48 hours.              │
│                                                              │
│  [Sell 2.0g Available] [View Lock Details]                  │
└─────────────────────────────────────────────────────────────┘
```

### Scenario 3: User Hasn't Completed KYC (Sell Attempt)

```
┌─────────────────────────────────────────────────────────────┐
│  📋 Complete KYC to Sell                                     │
│                                                              │
│  To sell gold and receive money in your bank account,       │
│  we need to verify your identity (RBI requirement).         │
│                                                              │
│  Required: PAN Card + Bank Account                          │
│                                                              │
│  [Complete KYC Now] [Learn More]                            │
└─────────────────────────────────────────────────────────────┘
```

### Scenario 4: No Bank Account Linked (Sell Attempt)

```
┌─────────────────────────────────────────────────────────────┐
│  🏦 Add Bank Account                                         │
│                                                              │
│  Link your bank account to receive sale proceeds.           │
│  Settlement: T+3 business days                              │
│                                                              │
│  [Add Bank Account] [Add UPI ID]                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Profile & KYC Page

### Route: `/bullion/profile`

### Sections

#### 1. Personal Information
```
┌─────────────────────────────────────────────────────────────┐
│  📱 Contact Details                                          │
│  ─────────────────────────────────────────────────────────  │
│  Mobile: +91 98739 XXXXX                    [Verified ✓]    │
│  Email: shubham@discvr.ai                   [Verified ✓]    │
│  Address: [Add Address]                                      │
└─────────────────────────────────────────────────────────────┘
```

#### 2. KYC Details
```
┌─────────────────────────────────────────────────────────────┐
│  🪪 KYC Verification                                         │
│  ─────────────────────────────────────────────────────────  │
│  Full Name: [Enter as per PAN]                              │
│  Date of Birth: [DD/MM/YYYY]                                │
│  PAN Number: [XXXXX1234X]                                   │
│                                                              │
│  Status: [Pending] / [Verified ✓] / [Rejected ✗]            │
│                                                              │
│  [Verify Now via DigiLocker]                                │
└─────────────────────────────────────────────────────────────┘
```

#### 3. Bank & UPI Details
```
┌─────────────────────────────────────────────────────────────┐
│  💳 Payment Methods                                          │
│  ─────────────────────────────────────────────────────────  │
│  UPI IDs:                                                    │
│  • shubham@okaxis [Primary] [Remove]                        │
│  • [+ Add UPI ID]                                            │
│                                                              │
│  Bank Accounts:                                              │
│  • HDFC Bank ****1234 [Primary] [Remove]                    │
│  • [+ Add Bank Account]                                      │
└─────────────────────────────────────────────────────────────┘
```

#### 4. Nominee Details
```
┌─────────────────────────────────────────────────────────────┐
│  👤 Nominee Information                                      │
│  ─────────────────────────────────────────────────────────  │
│  Name: [Nominee Full Name]                                  │
│  Relationship: [Select: Spouse/Parent/Child/Sibling/Other] │
│  Mobile: [+91 XXXXXXXXXX]                                   │
│                                                              │
│  [Save Nominee]                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Success Screens

### One-Time Purchase Success

```
┌─────────────────────────────────────────────────────────────┐
│  🎉 Purchase Successful!                                     │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  🪙 +0.50g Gold                      │                    │
│  │  ₹3,125 • Jan 19, 2026              │                    │
│  │  Transaction ID: TXN123456           │                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  Your Portfolio Now:                                         │
│  Gold: 5.7g (₹35,625) | Silver: 170g (₹13,125)              │
│  Total: ₹48,750 (+₹3,125)                                   │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│  💡 Want to grow wealth automatically?                       │
│  [Start Gold SIP from ₹100/month]                           │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  [Share Purchase] [Download Invoice] [Back to Home]         │
└─────────────────────────────────────────────────────────────┘
```

### SIP Setup Success

```
┌─────────────────────────────────────────────────────────────┐
│  ✨ SIP Activated!                                           │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  Gold SIP                            │                    │
│  │  ₹500/month on 1st of every month   │                    │
│  │  First debit: 1st Feb 2026          │                    │
│  │  Step-up: 10% annually              │                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  Projected Growth (5 years):                                 │
│  Investment: ₹30,000 → Value: ₹42,000 (~40% returns)        │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│  🎁 Invite friends & earn bonus gold!                        │
│  [Refer & Earn ₹100]                                         │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  [Manage SIP] [Back to Home]                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Portfolio Enhancement

### Enhanced Vault View

```
┌─────────────────────────────────────────────────────────────┐
│  🏦 YOUR VAULT                                               │
│                                                              │
│  Total Value: ₹48,750                                        │
│  Total Invested: ₹45,000                                     │
│  Unrealized Gain: +₹3,750 (+8.3%) 📈                         │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│  HOLDINGS                                                    │
│  ┌──────────────────────┬──────────────────────┐            │
│  │ 🪙 Gold              │ 🥈 Silver             │            │
│  │ 5.7g                 │ 170g                  │            │
│  │ ₹35,625              │ ₹13,125               │            │
│  │ +5.2% ▲              │ +12.1% ▲              │            │
│  │ [Buy] [Sell]         │ [Buy] [Sell]          │            │
│  └──────────────────────┴──────────────────────┘            │
├─────────────────────────────────────────────────────────────┤
│  PERFORMANCE CHART (1M / 3M / 6M / 1Y / ALL)                │
│  [Interactive line chart showing portfolio value over time] │
├─────────────────────────────────────────────────────────────┤
│  ACTIVE SIPs                                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Gold SIP    ₹500/month    Next: 1st Feb    [Manage] │    │
│  │ Silver SIP  ₹200/month    Next: 15th Feb   [Manage] │    │
│  └─────────────────────────────────────────────────────┘    │
├─────────────────────────────────────────────────────────────┤
│  PRICE ALERTS                                                │
│  • Gold < ₹6,000/g → Notify me         [Active] [Edit]      │
│  • [+ Add Price Alert]                                       │
├─────────────────────────────────────────────────────────────┤
│  TRANSACTION HISTORY (Filterable)                            │
│  [All] [Buy] [Sell] [SIP]                                   │
│  • Jan 19: Bought 0.5g Gold - ₹3,125 [Invoice]              │
│  • Jan 15: SIP Credit 0.08g Gold - ₹500 [Invoice]           │
│  • Jan 10: Bought 10g Silver - ₹768 [Invoice]               │
│  [Load More]                                                 │
└─────────────────────────────────────────────────────────────┘
```

---

## Mobile-First Design

### Mobile Navigation (Bottom Bar)

```
┌─────────────────────────────────────────────────────────────┐
│ [🏠 Home] [📊 Portfolio] [🤖 AI] [👤 Profile]               │
└─────────────────────────────────────────────────────────────┘
```

### Mobile Home (New User)

```
┌─────────────────────────────┐
│ ← Discvr Bullion       🔔   │
├─────────────────────────────┤
│                             │
│  Start Investing in         │
│  24K Pure Gold from ₹10     │
│                             │
│  [Gold ₹6,250/g ▲0.7%]      │
│  [Silver ₹76/g ▼1.6%]       │
│                             │
│  [🪙 Buy Gold] [🥈 Buy Silver]│
│                             │
├─────────────────────────────┤
│  WHY DIGITAL?               │
│  ← [Card] [Card] [Card] →   │
│     (Horizontal scroll)     │
├─────────────────────────────┤
│  Physical vs Digital        │
│  [Expandable comparison]    │
├─────────────────────────────┤
│  How it Works               │
│  1 → 2 → 3                  │
├─────────────────────────────┤
│  [Trust Logos]              │
├─────────────────────────────┤
│  FAQs                       │
│  [Accordion items]          │
└─────────────────────────────┘
│ [Home] [Portfolio] [AI] [Me]│
└─────────────────────────────┘
```

### Mobile Home (Existing Investor)

```
┌─────────────────────────────┐
│ ← Discvr Bullion       🔔   │
├─────────────────────────────┤
│  Your Portfolio             │
│  ₹48,750 (+₹3,750 | +8.3%)  │
│                             │
│  [Gold 5.7g] [Silver 170g]  │
│                             │
│  [Buy] [Sell] [SIP]         │
├─────────────────────────────┤
│  Live Prices                │
│  [Gold Card] [Silver Card]  │
├─────────────────────────────┤
│  Active SIPs                │
│  [SIP Card with manage]     │
├─────────────────────────────┤
│  Recent Transactions        │
│  [List items]               │
└─────────────────────────────┘
│ [Home] [Portfolio] [AI] [Me]│
└─────────────────────────────┘
```

### App-Like Behaviors

1. **Pull-to-Refresh**: Refresh prices and portfolio
2. **Haptic Feedback**: On button taps (via Capacitor if native)
3. **Smooth Transitions**: Slide-up modals, fade transitions
4. **Gesture Navigation**: Swipe between tabs
5. **Sticky Bottom Bar**: Always accessible navigation
6. **Safe Area Padding**: Respect notch/home indicator

---

## Implementation Phases

### Phase 1: Homepage & User State Management ✅ START HERE
**Priority: HIGH | Effort: 2-3 days**

- [ ] Create `BullionHero` component with 3 user state variants
- [ ] Build `WhyDigitalCards` carousel component
- [ ] Build `PhysicalVsDigitalComparison` component
- [ ] Build `HowItWorks` 3-step component
- [ ] Build `TrustSignals` component
- [ ] Add `FAQSection` component
- [ ] Implement user state detection logic
- [ ] Update `BullionInvestment.tsx` to render based on state

### Phase 2: Smart Edge Case Screens
**Priority: HIGH | Effort: 1 day**

- [ ] Create `EmptyHoldingsPrompt` dialog
- [ ] Create `KYCRequiredPrompt` dialog
- [ ] Create `AddBankPrompt` dialog
- [ ] Create `InsufficientBalancePrompt` dialog
- [ ] Wire prompts to sell flow logic

### Phase 3: Success Screens
**Priority: MEDIUM | Effort: 1 day**

- [ ] Create `PurchaseSuccessScreen` component
- [ ] Create `SIPSuccessScreen` component
- [ ] Add animations (confetti, check mark)
- [ ] Wire to `UnifiedBuyModal` on success

### Phase 4: Profile & KYC Page
**Priority: MEDIUM | Effort: 2 days**

- [ ] Create `/bullion/profile` route
- [ ] Build `PersonalInfoSection` component
- [ ] Build `KYCSection` component
- [ ] Build `BankDetailsSection` component
- [ ] Build `NomineeSection` component
- [ ] Add form validation

### Phase 5: Portfolio Enhancement
**Priority: MEDIUM | Effort: 2 days**

- [ ] Add performance chart (recharts)
- [ ] Add gain/loss indicators
- [ ] Build `PriceAlerts` component
- [ ] Build `ActiveSIPs` management view
- [ ] Add transaction filters

### Phase 6: Mobile Optimization
**Priority: HIGH | Effort: 1-2 days**

- [ ] Implement bottom navigation bar
- [ ] Add pull-to-refresh
- [ ] Optimize touch targets (48px min)
- [ ] Add safe area padding
- [ ] Test on multiple screen sizes

---

## Technical Notes

### State Management

```typescript
// User state context
interface BullionUserContext {
  user: User | null;
  holdings: {
    gold: { total: number; sellable: number; locked: number };
    silver: { total: number; sellable: number; locked: number };
  };
  profile: {
    kycStatus: "pending" | "verified" | "rejected";
    hasBank: boolean;
    hasNominee: boolean;
  };
  activeSIPs: SIP[];
}
```

### Responsive Breakpoints

```css
/* Mobile First */
@media (min-width: 640px) { /* sm: Tablet */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
```

---

## Dev Tools & Testing

### User State Switcher (Development Only)

A floating dev panel to quickly switch between user states for testing:

```
┌─────────────────────────────────────────────────────────────┐
│  🔧 DEV MODE - User State                                   │
│  ─────────────────────────────────────────────────────────  │
│  ○ New User (no account)                                    │
│  ○ Logged In (no holdings)                                  │
│  ● Investor (has holdings)                                  │
│                                                              │
│  Simulated Holdings:                                         │
│  Gold: [2.5]g | Silver: [15.0]g                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Enhanced Success & Failure Screens

### One-Time Purchase Success (with Dynamic SIP Suggestion)

**Logic**: SIP suggestion = same amount as purchase (₹100 purchase → ₹100/month SIP)

```
┌─────────────────────────────────────────────────────────────┐
│  🎉 Purchase Successful!                                     │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  🪙 +0.016g Gold                     │                    │
│  │  ₹100 • Jan 19, 2026                 │                    │
│  │  Tx: BUL-2026-XXXX                   │                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  ─────────────────────────────────────────────────────────  │
│  🎁 SPECIAL OFFER (Limited Time)                             │
│  ┌─────────────────────────────────────┐                    │
│  │  Start ₹100/month Gold SIP           │                    │
│  │  Get ₹10 BONUS GOLD on 1st SIP!      │                    │
│  │                                       │                    │
│  │  [Start SIP Now →]                    │                    │
│  └─────────────────────────────────────┘                    │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  [Share] [Download Invoice] [View Portfolio]                │
└─────────────────────────────────────────────────────────────┘
```

### Payment Failure Screen

```
┌─────────────────────────────────────────────────────────────┐
│  ❌ Payment Failed                                           │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  Your payment of ₹100 could not      │                    │
│  │  be processed.                        │                    │
│  │                                       │                    │
│  │  Reason: UPI timeout/Bank declined   │                    │
│  │  Ref: PAY-2026-XXXX                   │                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  No amount has been deducted from your account.             │
│  If debited, refund will be processed in 3-5 business days. │
│                                                              │
│  [Retry Payment] [Try Another Method] [Contact Support]     │
└─────────────────────────────────────────────────────────────┘
```

### Gold Purchase Failed (Payment Success, Order Failed)

```
┌─────────────────────────────────────────────────────────────┐
│  ⚠️ Order Processing Failed                                  │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  Payment received: ₹100              │                    │
│  │  Gold not credited due to            │                    │
│  │  processing error.                   │                    │
│  │                                       │                    │
│  │  Payment Ref: PAY-2026-XXXX          │                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  ⏳ Your refund is being processed automatically.            │
│  Expected: 24-48 hours                                       │
│                                                              │
│  [Retry Purchase] [Track Refund] [Contact Support]          │
└─────────────────────────────────────────────────────────────┘
```

---

## Offer Cards System

### Offer Card Types

| Type | Target Users | Example |
|------|--------------|---------|
| **Welcome Bonus** | New Users | "Get ₹10 bonus gold on first purchase" |
| **SIP Bonus** | All Users | "Start SIP, get extra gold worth ₹25" |
| **Festival Offer** | All Users | "Dhanteras Special: 5% extra gold" |
| **Referral Reward** | Existing Users | "Refer friend, both get ₹100 gold" |
| **Milestone Reward** | Investors | "Invested ₹10K? Get ₹50 bonus" |

### Offer Card UI

```
┌─────────────────────────────────────────────────────────────┐
│  🎁 OFFERS FOR YOU                                           │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ 🌟 NEW USER OFFER     │  │ 💰 SIP BONUS          │         │
│  │ ₹10 Bonus Gold        │  │ Extra ₹25 Gold        │         │
│  │ On 1st purchase       │  │ On 1st SIP setup      │         │
│  │ [Claim Now]           │  │ [Start SIP]           │         │
│  └──────────────────────┘  └──────────────────────┘         │
│                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐         │
│  │ 🤝 REFER & EARN       │  │ 🎯 MILESTONE          │         │
│  │ ₹100 for you + friend │  │ ₹50 at ₹10K invested │         │
│  │ Share your link       │  │ Progress: 65%        │         │
│  │ [Share Now]           │  │ [View Details]        │         │
│  └──────────────────────┘  └──────────────────────┘         │
└─────────────────────────────────────────────────────────────┘
```

---

## 48-Hour Lock-In Period Display

### Rationale (Display to Users)

**Why 48-hour lock?**
> "To ensure secure settlement with our vault partners and prevent fraud, 
> newly purchased gold/silver is locked for 48 hours before it can be sold."

### Lock Display in Sell Modal

```
┌─────────────────────────────────────────────────────────────┐
│  📊 YOUR HOLDINGS                                            │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Total Gold: 2.50g                                           │
│  ├── ✅ Sellable Now: 2.00g                                  │
│  └── 🔒 Locked (48hr): 0.50g                                 │
│                                                              │
│  ┌─────────────────────────────────────┐                    │
│  │  🕐 LOCK DETAILS                     │                    │
│  │  ───────────────────────────────────│                    │
│  │  Jan 18, 2:30 PM → 0.30g            │                    │
│  │  Unlocks: Jan 20, 2:30 PM (22hr)    │                    │
│  │  ───────────────────────────────────│                    │
│  │  Jan 19, 10:00 AM → 0.20g           │                    │
│  │  Unlocks: Jan 21, 10:00 AM (46hr)   │                    │
│  └─────────────────────────────────────┘                    │
│                                                              │
│  ℹ️ Why 48-hour lock?                                        │
│  Ensures secure settlement with vault partners.              │
└─────────────────────────────────────────────────────────────┘
```

### SIP Bifurcation Display

For recurring purchases (SIP), show breakdown:

```
┌─────────────────────────────────────────────────────────────┐
│  📊 HOLDINGS BREAKDOWN                                       │
│  ─────────────────────────────────────────────────────────  │
│                                                              │
│  Total Gold: 5.50g                                           │
│                                                              │
│  BY SOURCE:                                                  │
│  ├── 💳 One-Time Purchases: 3.00g                           │
│  └── 🔄 SIP Credits: 2.50g                                  │
│                                                              │
│  BY STATUS:                                                  │
│  ├── ✅ Sellable: 5.00g                                     │
│  └── 🔒 Locked: 0.50g (from SIP Jan 18)                     │
│                                                              │
│  Next SIP: ₹500 on Feb 1, 2026                              │
└─────────────────────────────────────────────────────────────┘
```

---

*Document created: January 19, 2026*  
*Updated: January 19, 2026 - Added Dev Tools, Success/Failure Screens, Offers, Lock Display*

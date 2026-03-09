# Bullion Platform Enhancement Tasks

## Task 1: Profile → Transaction History Navigation ✅
**Status:** Completed  
**Page:** `/bullion/profile`

### Implementation:
- Updated `QuickLinkItem` component to accept onClick handler
- Transaction History now redirects to `/bullion/portfolio`

---

## Task 2: Invoice Download for Portfolio Transactions ✅
**Status:** Completed  
**Page:** `/bullion/portfolio`

### Implementation:
- Created `InvoiceGenerator.tsx` with PDF generation using jsPDF
- Added download button to each successful transaction
- Invoice includes: metal weight, total amount, rate per gram
- No branding, no GST details (as requested)

---

## Task 3: Goal Creation & SIP Flow ✅
**Status:** Completed  
**Pages:** `/bullion/goals/new` → `/bullion/goals`

### Implementation:
- Goals saved to localStorage on creation
- Redirect to `/bullion/goals` with newGoal query param
- SIP dialog auto-opens for new goals
- Created `StartSIPDialog.tsx` with Monthly/Yearly frequency options
- SIPs saved to localStorage
- Goals show "SIP Active" badge after SIP started

---

## Task 4: Merge Premium & Learn Pages ✅
**Status:** Completed  
**Final URL:** `/bullion/premium`

### Implementation:
- Merged Learn articles into Premium page (Learn design as primary)
- Premium benefits appear BELOW Learn articles
- Both `/bullion/premium` and `/bullion/learn` routes serve same page
- Navigation tab remains "Premium"

---

## Task 5: KYC Failure Screen (PAN Not Available) ✅
**Status:** Completed  
**Trigger:** Before Payment
**Route:** `/bullion/kyc-failure`
**Component:** `src/components/bullion/KYCFailureScreen.tsx`

### Implementation:
- Full-page responsive layout (mobile-first)
- Red/destructive theme with ShieldX icon
- Headline: "PAN Verification Required"
- Explains regulatory requirement for PAN
- Primary CTA: "Login with Mobile Number"
- Secondary: Contact Support
- Back navigation

---

## Task 6: Payment Success but Order Failed Screen ✅
**Status:** Completed  
**Trigger:** After payment gateway success, backend order fails
**Route:** `/bullion/order-failure`
**Component:** `src/components/bullion/OrderExecutionFailureScreen.tsx`

### Implementation:
- Full-page responsive layout (mobile-first)
- Amber/warning theme with AlertTriangle icon
- Supports Gold/Silver, Buy/Sell via URL params
- Displays: metal type, transaction type, amount, reference ID
- Auto-refund notice with 24-48 hour timeline
- Primary CTA: "Track Refund Status"
- Secondary: "Retry Purchase/Sale", "Contact Support"
- Footer shows reference ID for support tickets

### URL Parameters:
- `metal`: "gold" | "silver"
- `type`: "buy" | "sell"
- `amount`: number
- `ref`: transaction reference ID

---

## Design Notes for Tasks 5 & 6

### Reference Existing Screens:
- `PaymentFailureScreen.tsx` - Modal-based payment failure
- `SellFailureScreen.tsx` - Modal-based sell/payout failure

### Full-Page Approach:
- Full viewport height, centered content
- Responsive (mobile-first)
- Consistent with bullion theme tokens
- Clear visual hierarchy
- Easy to screenshot for support tickets

### Color Coding:
- KYC Error: Red/destructive (blocking issue)
- Order Failed: Amber/warning (payment safe, order issue)

---

## Task 7: Offers for You — /bullion/notifications ✅
**Status:** Completed  
**Page:** `/bullion/notifications` → Alerts tab (bottom)

### Overview:
Replaced the simple redirect "Offers for You" card with two fully-specified offer cards rendered inline.

---

### A. Welcome Offer (First Purchase)

**Trigger:** First-time gold purchase on the platform  
**Condition:** Minimum transaction value of ₹500  
**Reward:** ₹10 worth of Free Gold credited to user's Bullion wallet  
**UX:** "Welcome Reward Applied" banner shown on checkout page when condition met  

**Card Spec:**
- Icon: Gift (amber)
- Theme: Amber border + amber-50 background
- Badge: "First Purchase"
- Checklist: Min ₹500 · Auto-credited ₹10 gold · Checkout banner confirmation
- CTA: "Claim Now" → navigates to `/bullion` + toast confirming offer activation

---

### B. Refer & Earn (Milestone Program)

**Target:** Existing users (Referrer)  
**Milestone:** 10 Successful Referrals  
**"Successful Referral" Definition:** Referee must complete first transaction of ₹500+  
**Reward:** ₹100 Bonus Gold credited after 10th successful referral  

**Referral Progress Bar:**
- Displayed inline in the offer card
- Label: "Referral Progress" with "X / 10 Completed" counter
- Progress component fills proportionally (mock: 4/10 = 40%)
- Milestone strip: 10 individual pill segments, filled for completed referrals
- Sub-label: "X more referrals to unlock reward"
- Also visible on `/bullion/profile` via "View in Profile" CTA

**Card Spec:**
- Icon: Users (blue)
- Theme: Blue border + blue-50 background
- Badge: "Milestone Program"
- Checklist: ₹500+ referee condition · Reward after 10th referral
- CTAs: "Copy Referral Link" (copies to clipboard + toast) · "View in Profile" (→ `/bullion/profile`)

---

### Implementation Notes:
- `CheckCircle2`, `Users`, `ArrowRight` icons added to import
- Both cards use semantic Tailwind tokens (amber/blue design variants)
- Referral count is mock state (4/10); real count to be wired to user profile API
- Welcome Offer eligibility check to be wired to transaction history API

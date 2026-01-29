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

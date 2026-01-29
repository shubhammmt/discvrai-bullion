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

## Task 5: KYC Failure Screen (PAN Not Available) 🔲
**Status:** Pending  
**Trigger:** Before Payment

### Requirements:
- **Screen Type:** Full page (desktop, mobile web, app)
- **Recovery Action:** "Login with the same mobile number with which your PAN is linked" - user authenticates with registered mobile to link existing PAN
- **Use Case:** User attempts buy/sell but PAN verification is missing

### UI Elements:
- [ ] Error icon/illustration (red/destructive theme)
- [ ] Headline: "PAN Verification Required"
- [ ] Explanation text about regulatory requirement
- [ ] Primary CTA: "Login with Mobile Number" → mobile auth flow
- [ ] Secondary: Contact Support link
- [ ] Back/Cancel navigation

---

## Task 6: Payment Success but Order Failed Screen 🔲
**Status:** Pending  
**Trigger:** After payment gateway success, backend order fails

### Applies To:
- Gold Buy (payment success, gold credit failed)
- Gold Sell (payment received, payout failed)
- Silver Buy (payment success, silver credit failed)
- Silver Sell (payment received, payout failed)

### Requirements:
- **Screen Type:** Full page (desktop, mobile web, app)
- **Info Displayed:** Auto-Refund Notice (24-48 hour timeline)

### UI Elements:
- [ ] Warning icon (amber/orange theme - distinguishes from total failure)
- [ ] Headline: "Payment Received, Order Processing Failed"
- [ ] Transaction reference ID
- [ ] Auto-refund notice with timeline
- [ ] Metal type indicator (Gold 🪙 / Silver 🥈)
- [ ] Amount attempted
- [ ] Primary CTA: "Track Refund Status"
- [ ] Secondary: "Contact Support"
- [ ] Option to retry purchase

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

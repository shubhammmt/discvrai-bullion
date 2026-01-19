# Discvr Bullion - Developer Testing Checklist

## 🎨 Theme Switcher (Bottom-Right Golden Button)
- [ ] **Locate**: Golden palette button at bottom-right (above DEV MODE)
- [ ] **Open**: Click to see 5 themes + dark/light toggle
- [ ] **Themes**: Classic Gold, Premium Dark, Royal Purple, Emerald Vault, Minimal Light
- [ ] **Dark Mode**: Toggle switch works

---

## 👤 User State Testing (DEV MODE Panel)
Test each state and verify UI changes:

### 1. New User State
- [ ] Educational hero with "Start Your Gold Journey"
- [ ] "Why Go Digital?" section visible
- [ ] "Physical vs Digital Gold" comparison table
- [ ] Empty portfolio showing ₹0
- [ ] Offer cards with welcome bonus visible

### 2. Logged In (No Holdings) State  
- [ ] Simpler hero focused on conversion
- [ ] Quick trade panel functional
- [ ] Empty holdings prompt visible

### 3. Investor State
- [ ] Portfolio-first view with holdings
- [ ] Gold: 5.5g, Silver: 25g displayed
- [ ] Recent activity shows transactions
- [ ] Sell button enabled

---

## 💰 Buy Journey Testing

### Buy Modal Flow
- [ ] Click "Buy Gold" or "Buy Silver"
- [ ] Quick amount buttons: ₹500, ₹1000, ₹2000, ₹5000
- [ ] Toggle between amount/grams input
- [ ] Live price conversion displayed
- [ ] 5-minute price lock countdown
- [ ] "Proceed to Pay" button

### Purchase Success Screen (85% chance)
- [ ] Celebration animation with confetti
- [ ] Purchase details: grams, amount, rate, transaction ID
- [ ] **SIP Upsell**: "Set Up Monthly SIP" matching purchase amount
- [ ] **Bonus Offer**: "₹10 bonus gold" for first SIP
- [ ] "View Portfolio" and "Buy More" actions

### Payment Failure Screen (10% chance)
- [ ] Error icon and message
- [ ] Two failure types:
  - `payment_failed`: Payment couldn't process
  - `order_failed`: Payment success but gold credit failed
- [ ] Retry and support actions

---

## 💵 Sell Journey Testing (Use Investor State)

### Sell Modal - Step 1: Input
- [ ] **Sellable Now**: Shows unlocked gold (e.g., 4.2g)
- [ ] **Locked (48hr)**: Shows locked amount (e.g., 1.3g)
- [ ] **View Lock Details**: Expands to show individual purchases with unlock times
- [ ] **By Source**: One-Time Purchases vs SIP Credits breakdown
- [ ] Enter sell amount (max = sellable amount)
- [ ] Live payout calculation

### Sell Modal - Step 2: UPI Selection
- [ ] Pre-defined UPI IDs listed (user@upi, savings@ybl)
- [ ] Select existing UPI or "Add New UPI"
- [ ] **Add New UPI Flow**:
  - Enter UPI ID
  - Click "Verify UPI"
  - See verification animation
  - UPI added to list

### Sell Modal - Step 3: Review
- [ ] Summary: grams, rate, payout amount
- [ ] Selected UPI displayed
- [ ] Settlement time (24-48 hours)
- [ ] "Confirm & Sell" button

### Sell Modal - Step 4: Processing
- [ ] Processing animation visible
- [ ] "Do not close" message

### Sell Success Screen (85% chance)
- [ ] Success animation
- [ ] Payout details: amount, UPI, transaction ID
- [ ] Expected settlement date
- [ ] **Reinvest Upsell**: "Buy More Gold" and "Start a SIP" prompts
- [ ] Portfolio link

### Sell Failure Screens (15% chance)
- [ ] **sell_failed**: Holdings safe, retry option
- [ ] **payout_failed**: Sale success but payout pending, shows auto-retry message

---

## 📱 Mobile Responsiveness
- [ ] Quick Trade cards stack vertically
- [ ] Hero section adapts
- [ ] Offer cards visible on mobile
- [ ] Modals are full-screen on mobile
- [ ] Theme switcher accessible

---

## 🔒 48-Hour Lock Logic Validation
- [ ] New purchases show as "Locked"
- [ ] Lock details show countdown per purchase
- [ ] Cannot sell locked gold
- [ ] Unlock time displayed correctly

---

## 📊 Offer Cards (Mobile View)
- [ ] Welcome bonus for new users
- [ ] Referral rewards visible
- [ ] First SIP bonus offer

---

## ⚡ Quick Checks
- [ ] All animations smooth (framer-motion)
- [ ] No console errors
- [ ] Loading states present
- [ ] Error boundaries working

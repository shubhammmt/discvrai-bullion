# Bullion Platform Enhancement Tasks

## Task 1: Profile → Transaction History Navigation
**Status:** ✅ Ready  
**Page:** `/bullion/profile`

### Requirement:
- When clicking on "Transaction History" section, redirect user to `/bullion/portfolio` page

---

## Task 2: Invoice Download for Portfolio Transactions
**Status:** ✅ Ready  
**Page:** `/bullion/portfolio`

### Requirement:
- Add clickable download option for all recent transactions
- Invoice should include:
  - Purchased gold/silver weight
  - Total amount
  - Gold/Silver rates per gram

### Decisions:
- ❌ No DiscvrAI logo/branding
- ❌ No GST or tax details
- Simple clean invoice format

---

## Task 3: Goal Creation & SIP Flow
**Status:** ✅ Ready  
**Page:** `/bullion/goals/new` → `/bullion/goals`

### Requirement:
1. Make "Create Goal & Start SIP" button clickable
2. On click → redirect to `/bullion/goals`
3. Create the goal under "Your Goals" section
4. Show option to "Start SIP"
5. Clicking "Start SIP" opens a popup to start new SIP

### Decisions:
- SIP frequency options: **Monthly** and **Yearly**
- Storage: **localStorage**
- Goal data: Name, target amount, timeline, metal type

---

## Task 4: Merge Premium & Learn Pages
**Status:** ✅ Ready  
**Pages:** `/bullion/premium` + `/bullion/learn` → Single page

### Requirement:
- Combine both pages into one unified experience

### Decisions:
- Final URL: `/bullion/premium`
- Primary design: `/bullion/learn` page layout
- Premium benefits: **Below** Learn articles
- Navigation tab: Keep as "Premium"

---

## All Tasks Ready for Implementation ✅

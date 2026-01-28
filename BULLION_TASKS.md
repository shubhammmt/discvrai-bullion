# Bullion Platform Enhancement Tasks

## Task 1: Profile → Transaction History Navigation
**Status:** Pending  
**Page:** `/bullion/profile`

### Requirement:
- When clicking on "Transaction History" section, redirect user to `/bullion/portfolio` page

### Information Needed:
- None - straightforward navigation update

---

## Task 2: Invoice Download for Portfolio Transactions
**Status:** Pending  
**Page:** `/bullion/portfolio`

### Requirement:
- Add clickable download option for all recent transactions
- Invoice should include:
  - Purchased gold/silver weight
  - Total amount
  - Gold/Silver rates per gram

### Information Needed:
- Invoice template design preference (simple PDF or branded?)
- Should invoice include DiscvrAI branding/logo?
- Any specific invoice number format?
- Should it include GST details?

---

## Task 3: Goal Creation & SIP Flow
**Status:** Pending  
**Page:** `/bullion/goals/new` → `/bullion/goals`

### Requirement:
1. Make "Create Goal & Start SIP" button clickable
2. On click → redirect to `/bullion/goals`
3. Create the goal under "Your Goals" section
4. Show option to "Start SIP"
5. Clicking "Start SIP" opens a popup to start new SIP

### Information Needed:
- What data should persist when creating a goal? (Name, target amount, timeline, metal type?)
- SIP popup fields: frequency options (daily/weekly/monthly), amount range, start date?
- Should goals be stored in localStorage or need backend integration?

---

## Task 4: Merge Premium & Learn Pages
**Status:** Pending  
**Pages:** `/bullion/premium` + `/bullion/learn` → Single page

### Requirement:
- Combine both pages into one unified experience

### Information Needed:
- Which URL should be the final route? (`/bullion/premium` or `/bullion/learn`?)
- Which page's design should be the primary layout?
- Should Premium benefits appear above or below the Learn articles?
- Should the navigation tab rename to something specific?

---

## Summary of Required Information

| Task | Questions |
|------|-----------|
| Task 1 | ✅ Ready to implement |
| Task 2 | Invoice branding, format, GST details |
| Task 3 | Goal data persistence, SIP popup fields, storage method |
| Task 4 | Final URL, layout hierarchy, tab naming |

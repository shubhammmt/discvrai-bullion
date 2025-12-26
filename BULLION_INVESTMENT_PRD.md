# Discvr Bullion - Digital Gold & Silver Investment Platform

## PRD Summary & Implementation Requirements

**Project Name:** Discvr Bullion  
**Target Audience:** Gen Z & Millennials (Digital natives, mobile-first, micro-investing)  
**Primary Route:** `/bullion` (standalone page)  
**Scope:** Full PRD - Buy, Sell, SIP, Portfolio Vault, AI Agent  
**Backend:** Full Augmont API integration  
**Auth:** Demo mode (no auth required for MVP)

---

## Design System

### Color Palette
- **Gold Accent:** #F2C94C
- **Silver Accent:** #E0E0E0  
- **Dark Background:** #121212
- **Success Green:** For positive price changes
- **Error Red:** For negative price changes

### Typography
- Modern Sans-Serif (Inter/SF Pro)
- Large, bold numbers for prices
- Clean, minimalist aesthetic

### UI Components
- Rounded corners (16px)
- Soft gradients
- Glassmorphism on cards
- Neo-Fintech aesthetic

---

## Core Features

### 1. Home Dashboard
- **Header:** Greeting with user name, notification bell, AI chat bubble
- **Price Cards:** Gold & Silver with live prices, % change, sparkline graphs
- **Quick Actions:** Floating bottom bar - "Buy", "Sell", "SIP"

### 2. Buy Journey
- **Tabs:** Toggle "Buy in Rupees" / "Buy in Grams"
- **Input:** Large central input field
- **Conversion:** Auto-show gram/rupee conversion
- **Price Lock:** 5-minute countdown timer (pill shape)
- **CTA:** "Proceed to Pay" button
- **API Flow:**
  1. Fetch rates via `GET /merchant/v1/rates`
  2. Lock price with `blockId` (valid 5 mins)
  3. Execute via `POST /merchant/v1/buy`

### 3. Sell Journey
- **Constraints:**
  - 48-hour lock-in period
  - Bank account required
- **Flow:**
  1. Check balance via passbook
  2. Calculate sellable weight
  3. Get sell rate quote
  4. Execute via `POST /merchant/v1/sell`
  5. Settlement: T+3 days (or instant)

### 4. SIP (Systematic Investment Plan)
- **Options:**
  - Daily, Weekly, Monthly frequency
  - Amount-based SIP
- **Features:**
  - Auto-debit setup
  - SIP dashboard with history
  - Pause/Resume functionality

### 5. Portfolio Vault
- **Visuals:** Digital safe/vault representation
- **Stats:**
  - Total Gold Weight (g)
  - Total Silver Weight (g)
  - Total Portfolio Value (₹)
- **Transaction History:** Passbook with status badges
- **Invoice Download:** Per transaction

### 6. AI Agent (Discvr AI)
- **Persona:** Smart, casual, emoji-friendly, helpful
- **Capabilities:**
  - Contextual education ("Is now a good time to buy?")
  - Intent-based execution ("Buy ₹500 of silver")
  - Post-purchase support (invoices, sell restrictions)
- **UI:** Slide-up bottom sheet / side drawer
- **Smart Widgets:** Confirm transaction cards in chat

---

## API Integration (Augmont)

### Key Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/merchant/v1/rates` | GET | Fetch live buy/sell rates |
| `/merchant/v1/users` | POST | Create shadow wallet |
| `/merchant/v1/buy` | POST | Execute purchase |
| `/merchant/v1/sell` | POST | Execute sale |
| `/merchant/v1/users/{id}/passbook` | GET | Transaction history |
| `/merchant/v1/invoice/{id}` | GET | Download invoice |
| `/merchant/v1/rolling-data` | GET | Historical price data |

### Rate Caching
- Refresh every 15-30 seconds
- Max 10 API calls/minute
- Use Redis/localStorage cache

### Block ID Flow
- Lock price for 5 minutes
- Display countdown timer
- Execute only with valid blockId

---

## Mobile vs Web Layout

### Web
- 3-column layout:
  - Sidebar navigation
  - Main content
  - Right-side AI/Activity feed

### Mobile
- Bottom navigation bar:
  - Home
  - Portfolio
  - Agent
  - Profile

---

## Implementation Phases

### Phase 1: Core UI (Current)
- [ ] Create `/bullion` page
- [ ] Build price cards with mock data
- [ ] Implement buy flow modal
- [ ] Implement sell flow modal
- [ ] Create SIP setup flow
- [ ] Build portfolio vault view

### Phase 2: API Integration
- [ ] Connect Augmont rate endpoints
- [ ] Implement price locking with blockId
- [ ] Add payment gateway integration
- [ ] Setup transaction execution

### Phase 3: AI Agent
- [ ] Build chat interface
- [ ] Add intent recognition
- [ ] Implement smart transaction widgets
- [ ] Connect to Lovable AI backend

---

## Environment Variables Required

```env
AUGMONT_API_KEY=
AUGMONT_MERCHANT_ID=
AUGMONT_BASE_URL=https://api.augmont.com
```

---

## Success Metrics
- Transaction completion rate
- Average order value
- SIP activation rate
- User retention (30-day)
- AI agent engagement rate

---

*Document created: 2025-12-26*  
*Status: Ready for implementation*

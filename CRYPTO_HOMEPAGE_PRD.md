# Crypto Homepage - Product Requirements Document

## Overview
The crypto homepage serves as the central hub for cryptocurrency information, featuring real-time prices, interactive charts, market movers, and filtered news feeds. The design prioritizes mobile-first experience as 90% of traffic comes from mobile devices and apps.

## URL Structure
- Main crypto hub: `/crypto`
- Individual crypto pages: `/crypto/[symbol]` (e.g., `/crypto/bitcoin`, `/crypto/ethereum`)

---

## Page Layout & Components

### 0. Mobile-First Design Priority
- **Critical**: 90% of traffic is on mobile pages and app
- All components must be optimized for mobile viewports first
- Touch-friendly interaction areas (minimum 44px height)
- Swipeable carousels where applicable
- Responsive breakpoints: Mobile (< 768px), Tablet (768px - 1024px), Desktop (> 1024px)

### 1. Page Header
**Component**: `CryptoPageHeader`
- Page title: "Crypto" or "Cryptocurrency"
- Breadcrumb navigation: Home > Crypto
- Optional subtitle: "Track live cryptocurrency prices and market movements"

**SEO Elements**:
```html
<title>Cryptocurrency Prices Live | Bitcoin, Ethereum & Top Crypto | DiscvrAI</title>
<meta name="description" content="Live cryptocurrency prices, charts, and analysis. Track Bitcoin, Ethereum, and top 100+ cryptocurrencies with real-time data and AI insights." />
<meta name="keywords" content="cryptocurrency prices, bitcoin price, ethereum price, crypto market, live crypto rates" />
```

### 2. Search Box
**Component**: `CryptoSearchBar`

**Functionality**:
- Auto-complete search with dropdown results
- Search by: Symbol (BTC, ETH), Full name (Bitcoin, Ethereum)
- Show matching results as user types
- Click on result navigates to `/crypto/[symbol]`

**Search Result Item Structure**:
```typescript
interface SearchResult {
  symbol: string;        // "BTC"
  name: string;          // "Bitcoin"
  price: number;         // 45230.50
  changePercent: number; // 2.5
  icon?: string;         // Optional crypto icon URL
}
```

**Design Elements**:
- Search icon with placeholder: "Search crypto by name or symbol..."
- Dropdown appears below input on focus/typing
- Results show: Icon | Symbol & Name | Current Price | Change %
- Mobile: Full-width search bar
- Desktop: Max width 600px, centered

### 3. Top 10 Currency Cards
**Component**: `CryptoCurrencyCard`

**Card Layout** (Mobile-First):

#### 3.1 Header Section
- **Left**: Currency icon + Name (clickable link to `/crypto/[symbol]`)
  - Example: Bitcoin logo + "Bitcoin (BTC)"
- **Right**: Current Price + Movement indicator
  - Price: $45,230.50
  - Movement: +2.5% (green with up arrow) / -1.2% (red with down arrow)

#### 3.2 Volume & News Row
- **Volume Column**: 24h volume with movement
  - Format: "Vol: $28.5B ↑ 5.2%"
- **News Link**: Clickable "News" button/link
  - Scrolls to filtered news section for that currency
  - Or opens news modal/section

#### 3.3 Price Chart Section
**Component**: `CryptoCurrencyChart`
- Mini interactive chart showing price movement
- Period selector buttons: 1D | 7D | 1M | 1Y
- Chart displays:
  - Line chart with gradient fill
  - Hover tooltip showing: Price, Time, Volume, Open, High, Low
  - Color: Green for positive movement, Red for negative

**Chart Data Points**:
```typescript
interface ChartDataPoint {
  timestamp: string;     // ISO datetime
  price: number;        // Price at that time
  volume: number;       // Trading volume
  open: number;         // Opening price
  high: number;         // Highest price
  low: number;          // Lowest price
}
```

#### 3.4 Action Buttons Row
- **Share**: Share icon button (opens share dialog)
- **Watchlist**: Heart/Star icon (toggle add/remove from watchlist)
- **Alert**: Bell icon (set price alert modal)

**Mobile Card Design**:
- Full width with padding
- Stack vertically: Header → Volume/News → Chart → Actions
- Card spacing: 16px margin bottom
- Border radius: 12px
- Shadow: Subtle elevation

**Desktop Card Design**:
- Grid layout: 2 columns (up to 3 on large screens)
- Similar internal layout but more horizontal space

**Repeat for 10 Currencies**:
1. Bitcoin (BTC)
2. Ethereum (ETH)
3. Binance Coin (BNB)
4. Solana (SOL)
5. XRP (XRP)
6. Cardano (ADA)
7. Dogecoin (DOGE)
8. Avalanche (AVAX)
9. Polkadot (DOT)
10. Polygon (MATIC)

### 4. Crypto Market Movers
**Component**: `CryptoMarketMovers`

**Section Title**: "Crypto Market Movers"

**Tab Navigation**:
- Top Gainers (24h) - Default active
- Top Losers (24h)
- Most Active (24h)

**Table Structure**:

| Ticker | Name | Change (%) | Price | Volume | Actions |
|--------|------|-----------|-------|--------|---------|
| KAIA | Kaia | +20.13% | $0.13 | 127.0M | ••• |
| AVAX | Avalanche | +11.08% | $20.88 | 303.4M | ••• |

**Columns**:
1. **Ticker**: Symbol (e.g., "BTC")
2. **Name**: Full name (e.g., "Bitcoin")
3. **Change (%)**: 24h percentage change (colored: green positive, red negative)
4. **Price**: Current price with currency symbol
5. **Volume**: 24h trading volume (formatted: M = millions, B = billions)
6. **Actions**: 
   - Watchlist icon (toggle)
   - Alert icon (set alert)
   - More menu (•••)

**Interaction**:
- Click on row navigates to `/crypto/[symbol]`
- Sortable columns (Change %, Price, Volume)
- Show top 10-15 items per tab

**Mobile Design**:
- Horizontal scroll for table
- Sticky first column (Ticker)
- Condensed spacing
- Alternative: Card view instead of table

**Desktop Design**:
- Full-width table
- Fixed column widths
- Hover effect on rows

### 5. News Section with Tabs
**Component**: `CryptoNewsSection`

**Section Title**: "Latest Crypto News"

**Tab Navigation**:
- ALL (default) - Shows all crypto news
- BTC - Bitcoin-specific news
- ETH - Ethereum-specific news
- SOL - Solana-specific news
- XRP - XRP-specific news
- (More currency tabs as needed)

**News Card Structure**:
**Component**: `CryptoNewsCard`

Based on the reference image provided:

```typescript
interface CryptoNewsArticle {
  id: string;
  headline: string;           // "Kaspa and Arbitrum shine among low-cost cryptos"
  summary: string;           // First 2-3 sentences
  sentiment: "positive" | "negative" | "neutral";
  readTime: number;          // In minutes
  wordCount: number;         // Total words
  publishedAt: string;       // ISO datetime
  source: string;            // "Mudrex", "CoinDesk", etc.
  sourceIcon?: string;       // Source logo URL
  imageUrl?: string;         // Article thumbnail
  companies: string[];       // ["Kaspa", "Arbitrum", "VeChain"]
  tags: string[];           // ["low-cost crypto", "blockchain adoption"]
  symbols: string[];        // ["KASPA", "ARB", "VET"] - for filtering
  fullContent?: string;     // Optional: Full article text
  url?: string;             // Optional: External article URL
}
```

**Card Layout**:
1. **Top Badge Row**:
   - Sentiment badge (green "positive", red "negative", gray "neutral")
   - Timestamp (e.g., "about 9 hours ago")
   - Share icon
   - Audio icon (text-to-speech)

2. **Headline**: 
   - Large, bold text
   - Clickable to full article view

3. **Meta Info Row**:
   - Read time badge: "🕐 1 min read"
   - Word count: "75 words"

4. **Image Section** (if available):
   - Thumbnail image (left)
   - Summary text (right)
   - Mobile: Stack vertically

5. **Summary Text**:
   - First paragraph or key excerpt
   - Highlighted key phrases (yellow background)
   - 2-3 sentences maximum

6. **Companies Row**:
   - Label: "Companies:"
   - Pill badges for each company
   - Clickable to filter by company

7. **Tags Row**:
   - Label: "🏷️ Tags:"
   - Pill badges for tags
   - Clickable to filter by tag

8. **Source Row**:
   - Source icon + name
   - "Source: Mudrex" with logo

**Mobile Card Design**:
- Full-width cards
- Stack all elements vertically
- 16px padding
- 12px margin bottom
- Border radius: 12px
- Border: 1px solid border color

**Desktop Card Design**:
- Grid: 1-2 columns depending on space
- Horizontal layout for image + text
- Hover effect: Subtle elevation increase

**Tab Filtering Logic**:
- "ALL" tab: Show all news articles
- Specific currency tab (e.g., "BTC"): Filter `article.symbols.includes("BTC")`
- Sort by: Most recent first (publishedAt descending)
- Pagination: Load more button or infinite scroll

### 6. News Card Navigation
**User Flow**:
1. User clicks "News" link from currency card (Section 3.2)
2. Page scrolls to News Section (Section 5)
3. Automatically activates the corresponding currency tab
4. Shows filtered news for that specific cryptocurrency

**Alternative Implementation**:
- Open a modal/drawer with filtered news
- Slide-in panel from right side
- Close button returns to main view

### 7. SEO-Optimized Footer
**Component**: `CryptoPageFooter`

**Purpose**: Comprehensive footer with internal links for SEO crawling, indexability, and user navigation.

#### 7.1 Footer Structure

**Section 1: Top Cryptocurrencies**
- Title: "Top Cryptocurrencies"
- Links to all major crypto pages (50-100 currencies)
- Format: Text links in grid layout
- Example:
  ```
  Bitcoin (BTC) | Ethereum (ETH) | Binance Coin (BNB) | Solana (SOL)
  XRP | Cardano (ADA) | Dogecoin (DOGE) | Polkadot (DOT)
  [View All Cryptocurrencies →]
  ```

**Section 2: Cryptocurrency News**
- Title: "Crypto News by Category"
- Links to news filtered by currency
- Links to news archives (daily, weekly, monthly)
- Example:
  ```
  Bitcoin News | Ethereum News | Altcoin News | DeFi News
  News Archives | Weekly Roundup | Monthly Analysis
  ```

**Section 3: Market Data & Tools**
- Title: "Market Tools & Resources"
- Links to:
  - Market Movers (Gainers, Losers, Most Active)
  - Historical Data Archives
  - Price Alerts
  - Watchlists
  - Currency Converter
- Example:
  ```
  Top Gainers | Top Losers | Most Active
  Historical Prices | Price Alerts | My Watchlist
  ```

**Section 4: Browse by Year/Month (Archive)**
- Title: "Historical Data Archive"
- SEO-friendly archive links
- Example:
  ```
  2024: Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec
  2023: Jan | Feb | Mar | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec
  [View Complete Archive →]
  ```

**Section 5: Cryptocurrency Directory (A-Z)**
- Title: "Cryptocurrency Directory"
- Alphabetical listing for SEO
- Example:
  ```
  A: Avalanche, Aptos, Algorand
  B: Bitcoin, Binance Coin, Bitcoin Cash
  C: Cardano, Chainlink, Cosmos
  [View Full Directory →]
  ```

**Section 6: Quick Search**
- Embedded search bar
- Placeholder: "Quick search any cryptocurrency..."
- Instant results dropdown
- Mobile: Sticky/expandable

**Section 7: Company & Legal Links**
- About Us | Contact | Privacy Policy | Terms of Service
- API Documentation | Developers
- Social media icons (Twitter, Telegram, Discord, LinkedIn)

#### 7.2 Footer SEO Structure
```html
<footer role="contentinfo" class="crypto-footer">
  <section aria-labelledby="top-cryptos-heading">
    <h2 id="top-cryptos-heading">Top Cryptocurrencies</h2>
    <nav aria-label="Top cryptocurrency pages">
      <ul>
        <li><a href="/crypto/bitcoin">Bitcoin (BTC)</a></li>
        <li><a href="/crypto/ethereum">Ethereum (ETH)</a></li>
        <!-- ... more links -->
      </ul>
    </nav>
  </section>
  
  <!-- More sections -->
</footer>
```

#### 7.3 Mobile Footer Design
- Collapsible sections (accordion style)
- Quick search always visible
- Essential links visible by default
- "Show More" for extended listings

#### 7.4 Desktop Footer Design
- Multi-column layout (4-5 columns)
- All sections expanded
- Grid layout for crypto listings
- Max width: 1400px, centered

#### 7.5 Footer Link Patterns (for SEO)

**Cryptocurrency Pages**:
- `/crypto/bitcoin` - Bitcoin Price & Analysis
- `/crypto/ethereum` - Ethereum Price & Analysis
- `/crypto/[symbol]` - [Name] Price & Analysis

**News Pages**:
- `/crypto/news` - All Crypto News
- `/crypto/news/bitcoin` - Bitcoin News
- `/crypto/news/[symbol]` - [Name] News
- `/crypto/news/archive/2024/10` - October 2024 News Archive

**Market Tools**:
- `/crypto/gainers` - Top Crypto Gainers
- `/crypto/losers` - Top Crypto Losers
- `/crypto/most-active` - Most Active Cryptocurrencies

**Historical Archives**:
- `/crypto/historical/bitcoin/2024` - Bitcoin 2024 Historical Data
- `/crypto/historical/[symbol]/[year]` - Historical Data Pattern

**Directory Pages**:
- `/crypto/directory` - Complete Cryptocurrency Directory
- `/crypto/directory/a` - Cryptocurrencies Starting with A

---

## Component Architecture

### File Structure
```
src/
├── pages/
│   ├── CryptoHub.tsx              # Main crypto homepage
│   └── CryptoAsset.tsx            # Individual crypto page
├── components/
│   └── crypto/
│       ├── CryptoPageHeader.tsx
│       ├── CryptoSearchBar.tsx
│       ├── CryptoCurrencyCard.tsx
│       ├── CryptoCurrencyChart.tsx
│       ├── CryptoMarketMovers.tsx
│       ├── CryptoNewsSection.tsx
│       └── CryptoNewsCard.tsx
├── hooks/
│   ├── useCryptoData.ts          # Fetch top cryptocurrencies
│   ├── useCryptoSearch.ts        # Search functionality
│   ├── useCryptoNews.ts          # Fetch crypto news
│   └── useWatchlist.ts           # Watchlist management
└── utils/
    ├── cryptoFormatters.ts       # Price, volume formatting
    └── cryptoApi.ts              # API integration
```

---

## API Integration

### Data Sources
- **Primary**: FMP (Financial Modeling Prep) API
- **Cryptocurrency endpoints**: `/crypto/quote`, `/crypto/historical`
- **News endpoints**: `/crypto/news`

### Key API Calls

#### 1. Get Top Cryptocurrencies
```typescript
GET /api/v3/crypto/quote?limit=10
Response: CryptoAsset[]
```

#### 2. Search Cryptocurrencies
```typescript
GET /api/v3/crypto/search?query={searchTerm}
Response: SearchResult[]
```

#### 3. Get Market Movers
```typescript
GET /api/v3/crypto/gainers?limit=10
GET /api/v3/crypto/losers?limit=10
GET /api/v3/crypto/most-active?limit=10
Response: CryptoMover[]
```

#### 4. Get Crypto News
```typescript
GET /api/v3/crypto/news?symbol={symbol}&limit=20
Response: CryptoNewsArticle[]
```

#### 5. Get Historical Chart Data
```typescript
GET /api/v3/crypto/historical/{symbol}?period={1D|7D|1M|1Y}
Response: ChartDataPoint[]
```

### Data Refresh Rates
- Current prices: Every 10 seconds (WebSocket or polling)
- Market movers: Every 1 minute
- News feed: Every 5 minutes
- Charts: On-demand when period changes

---

## State Management

### Local Storage
```typescript
// Watchlist
localStorage.setItem('crypto-watchlist', JSON.stringify(symbols));

// Price alerts
localStorage.setItem('crypto-alerts', JSON.stringify(alerts));

// User preferences
localStorage.setItem('crypto-preferences', JSON.stringify({
  defaultPeriod: '1D',
  defaultTab: 'Top Gainers (24h)'
}));
```

### React Query Cache
- Cache crypto prices: 10 seconds stale time
- Cache news: 5 minutes stale time
- Cache market movers: 1 minute stale time

---

## Performance Optimization

### Mobile Optimization
1. **Lazy Loading**: Load news cards as user scrolls
2. **Image Optimization**: Use WebP format, lazy load images
3. **Code Splitting**: Separate bundles for charts library
4. **Virtual Scrolling**: For long lists (100+ items)
5. **Service Worker**: Cache static assets and API responses

### Chart Performance
- Use lightweight charting library (recharts or lightweight-charts)
- Debounce hover interactions
- Limit data points on mobile (fewer than desktop)

### Bundle Size Targets
- Initial load: < 200KB (gzipped)
- Chart library: Lazy loaded
- Icons: Use icon font or SVG sprite

---

## SEO Strategy

### On-Page SEO
- **Title Tags**: Include top crypto names and "Live Prices"
- **Meta Description**: Highlight real-time data and AI insights
- **H1**: "Cryptocurrency Prices Live" or "Crypto Market Overview"
- **H2**: Section titles (Market Movers, Latest News)
- **Structured Data**: JSON-LD for cryptocurrency listings

### JSON-LD Schema
```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Top Cryptocurrencies",
  "itemListElement": [
    {
      "@type": "CryptoCurrency",
      "name": "Bitcoin",
      "symbol": "BTC",
      "price": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "45230.50"
      }
    }
  ]
}
```

### Internal Linking
- Link each currency card to individual crypto pages
- Link news articles to related crypto pages
- Breadcrumb navigation
- Related cryptocurrencies section

---

## User Interactions

### Watchlist Functionality
1. Click heart/star icon on any crypto card
2. Toast notification: "Added to Watchlist" / "Removed from Watchlist"
3. Store in localStorage
4. Sync with backend if user is logged in
5. Access watchlist from header menu

### Price Alert Functionality
1. Click bell icon on crypto card
2. Modal opens with alert form:
   - Target price input
   - Alert type: Above/Below
   - Notification method: Email/Push
3. Store alert in localStorage/backend
4. Show active alerts count badge on bell icon

### Share Functionality
1. Click share icon
2. Share dialog opens with options:
   - Copy link
   - Share to Twitter/X
   - Share to WhatsApp
   - Share to Telegram
3. Pre-filled message: "[Crypto Name] is at $[Price] ([Change]%) - Check it out on DiscvrAI"

### News Interaction
1. Click on news card headline
2. Options:
   - **Option A**: Navigate to dedicated news article page (`/crypto/news/[slug]`)
   - **Option B**: Open expandable modal with full article
3. Show related cryptocurrencies at bottom
4. "Read more news" CTA to filtered news section

---

## Accessibility

### ARIA Labels
- `aria-label` on icon buttons (watchlist, alert, share)
- `role="tab"` on tab navigation
- `aria-live="polite"` on price updates
- Keyboard navigation support

### Color Contrast
- Ensure 4.5:1 contrast ratio for text
- Use icons + color for price movements (not just color)
- Test with color blindness simulators

### Focus States
- Visible focus indicators on all interactive elements
- Skip to content link for keyboard users

---

## Implementation Phases

### Phase 1: Core Components (Week 1)
- [ ] Create CryptoHub page structure
- [ ] Implement CryptoPageHeader
- [ ] Build CryptoSearchBar with autocomplete
- [ ] Create CryptoCurrencyCard (basic version)
- [ ] Set up API integration for top 10 cryptos

### Phase 2: Charts & Interactivity (Week 2)
- [ ] Implement CryptoCurrencyChart component
- [ ] Add period selector (1D, 7D, 1M, 1Y)
- [ ] Build tooltip interactions
- [ ] Add watchlist functionality
- [ ] Add share functionality

### Phase 3: Market Movers (Week 2)
- [ ] Create CryptoMarketMovers component
- [ ] Implement tab navigation
- [ ] Add table/card view toggle for mobile
- [ ] Implement sorting functionality
- [ ] Add API integration for gainers/losers

### Phase 4: News Section (Week 3)
- [ ] Build CryptoNewsSection component
- [ ] Create CryptoNewsCard with all elements
- [ ] Implement tab filtering
- [ ] Add pagination/infinite scroll
- [ ] Connect news click from currency cards

### Phase 5: Polish & Optimization (Week 3)
- [ ] Mobile responsiveness testing
- [ ] Performance optimization
- [ ] Add loading skeletons
- [ ] Implement error handling
- [ ] SEO optimization
- [ ] Accessibility audit
- [ ] Cross-browser testing

---

## Success Metrics

### Product Metrics
- Page load time: < 2 seconds (mobile)
- Time to interactive: < 3 seconds
- Watchlist adoption: > 20% of visitors
- News engagement: > 30% click-through rate
- Search usage: > 40% of visitors

### SEO Metrics
- Target ranking: Top 10 for "cryptocurrency prices live"
- Organic traffic: 10k+ monthly visits
- Average time on page: > 2 minutes
- Bounce rate: < 40%

### Technical Metrics
- Lighthouse score: > 90 (all categories)
- Core Web Vitals: All "Good" ratings
- Error rate: < 0.1%
- API success rate: > 99.5%

---

## Future Enhancements

### V2 Features
1. **Portfolio Tracking**: Add portfolio with holdings
2. **Advanced Charts**: Candlestick, indicators, drawing tools
3. **Price Comparison**: Compare multiple cryptos on one chart
4. **AI Insights**: AI-powered market analysis and predictions
5. **Social Sentiment**: Show Twitter/Reddit sentiment scores
6. **Exchange Integration**: Buy/sell directly from platform
7. **News Aggregation**: Pull from multiple sources
8. **Customizable Dashboard**: Drag-drop widgets
9. **Dark Mode**: Theme toggle
10. **Multi-currency Support**: Show prices in INR, EUR, etc.

---

## Design System Tokens

### Colors
- Positive/Gain: `hsl(var(--success))` or `text-green-500`
- Negative/Loss: `hsl(var(--destructive))` or `text-red-500`
- Neutral: `hsl(var(--muted-foreground))`
- Background: `hsl(var(--background))`
- Card: `hsl(var(--card))`
- Border: `hsl(var(--border))`

### Typography
- Page title: `text-3xl font-bold`
- Card title: `text-xl font-semibold`
- Price: `text-2xl font-bold`
- Body text: `text-sm`
- Labels: `text-xs text-muted-foreground`

### Spacing
- Card padding: `p-4` (mobile), `p-6` (desktop)
- Card gap: `space-y-4`
- Section margin: `my-8`
- Container max-width: `max-w-7xl mx-auto`

---

## Questions for Stakeholders

1. **Authentication**: Should watchlist/alerts require login?
2. **Monetization**: Any premium features or ads?
3. **Currency Support**: Only USD or multi-currency?
4. **News Sources**: Specific preferred sources?
5. **Chart Library**: Any preference? (recharts, lightweight-charts, TradingView)
6. **Update Frequency**: Real-time WebSocket or polling?
7. **Individual Pages**: Design specs for `/crypto/[symbol]` pages?
8. **Analytics**: Which events to track?
9. **A/B Testing**: Any experiments to run?
10. **Mobile App**: Native app considerations?

---

## Handoff Checklist

### For Developers
- [ ] Component hierarchy documented
- [ ] API endpoints defined
- [ ] State management strategy
- [ ] Performance requirements
- [ ] Accessibility requirements
- [ ] Browser support matrix
- [ ] Testing requirements

### For Designers
- [ ] All UI states designed (loading, error, empty)
- [ ] Mobile and desktop mockups
- [ ] Interactive prototype
- [ ] Design system tokens
- [ ] Icon library
- [ ] Animation specifications

### For Content Team
- [ ] SEO requirements
- [ ] Content calendar for news
- [ ] Social media strategy
- [ ] Error message copy
- [ ] Tooltip copy
- [ ] CTA copy

---

## Contact & Support
- **Product Manager**: [Name]
- **Tech Lead**: [Name]
- **Design Lead**: [Name]
- **Documentation**: This PRD + Figma files
- **Slack Channel**: #crypto-homepage

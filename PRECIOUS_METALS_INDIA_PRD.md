# Precious Metals Price Discovery Platform - PRD

## Executive Summary
A comprehensive precious metals (Gold, Silver, Platinum) price discovery platform for India, covering all states and cities with real-time pricing, historical data, news, and integrated weather/AQI information.

---

## 1. URL Structure & SEO Architecture

### Primary Pages
```
/metals                           - Main landing page (overview of all metals)
/metals/gold                      - Gold overview page
/metals/silver                    - Silver overview page
/metals/platinum                  - Platinum overview page
```

### State-Level Pages
```
/metals/gold/[state-slug]         - e.g., /metals/gold/delhi
/metals/silver/[state-slug]       - e.g., /metals/silver/maharashtra
/metals/platinum/[state-slug]     - e.g., /metals/platinum/karnataka
```

### City-Level Pages (SEO-Optimized)
```
/metals/gold/[state-slug]/[city-slug]       - e.g., /metals/gold/delhi/new-delhi
/metals/silver/[state-slug]/[city-slug]     - e.g., /metals/silver/maharashtra/mumbai
/metals/platinum/[state-slug]/[city-slug]   - e.g., /metals/platinum/karnataka/bangalore
```

### News Pages
```
/metals/news                      - All metals news
/metals/news/[article-slug]       - Individual news article
```

---

## 2. Supported States & Cities

### States Coverage (17 States)
Based on API availability:
1. Andhra Pradesh
2. Bihar
3. Chandigarh
4. Delhi
5. Gujarat
6. Haryana
7. Karnataka
8. Kerala
9. Madhya Pradesh
10. Maharashtra
11. Odisha
12. Punjab
13. Rajasthan
14. Tamil Nadu
15. Telangana
16. Uttar Pradesh
17. West Bengal

### City Coverage
- **Gold**: 32+ cities
- **Silver**: 24+ cities
- **Platinum**: 24+ cities

All cities will have dedicated pages for complete SEO coverage.

---

## 3. Page Specifications

### 3.1 Main Landing Page (/metals)

#### SEO Meta
```html
<title>Live Gold, Silver, Platinum Prices in India - Today's Rates by City</title>
<meta name="description" content="Check live gold (22K/24K), silver, and platinum prices across 32+ cities in India. Historical charts, price alerts, and latest market news.">
<meta name="keywords" content="gold price india, silver price, platinum rate, 22k gold, 24k gold, live metal prices">
<link rel="canonical" href="https://yourdomain.com/metals">
```

#### Page Components
1. **Hero Section**
   - Headline: "Live Precious Metals Prices Across India"
   - Subheading: Real-time Gold, Silver & Platinum rates for 32+ cities
   - Quick city selector (autocomplete)
   - Current metal prices widget (top 5 cities)

2. **Weather & AQI Widget**
   - User's current location weather
   - AQI indicator with color coding
   - Toggleable between Celsius/Fahrenheit

3. **Metal Overview Cards**
   - Three cards for Gold, Silver, Platinum
   - Current avg price (10g)
   - 24h change percentage
   - Sparkline chart
   - CTA: "View Detailed Prices"

4. **State-wise Quick Links**
   - Grid of all 17 states
   - Each shows current avg price
   - Click navigates to state page

5. **Latest News Section**
   - 6 latest news cards
   - "View All News" CTA

6. **Price Alerts CTA**
   - Prominent signup section
   - "Get notified when prices change"

7. **SEO Footer**
   - Structured links to all cities
   - Organized by state
   - Internal linking structure

### 3.2 Metal Overview Page (/metals/gold) - Based on Reference UI

#### SEO Meta
```html
<title>Gold Price Today in India - 22K & 24K Gold Rates by City | Live Updates</title>
<meta name="description" content="Check today's gold prices (22K and 24K) across all major cities in India. View historical trends, price charts, and set alerts for your city.">
<meta name="keywords" content="gold price today, 22k gold rate, 24k gold price, gold rate in india, city wise gold price">
```

#### Page Layout (Two-Column)
**Left Column (Main Content - 70%)**
**Right Sidebar (30%)**

#### Page Components

1. **Breadcrumb Navigation**
   - Home > Gold Rates
   - Small text, linked

2. **Hero Section**
   - H1: "Gold Rate Today in India" with country dropdown
   - Large price display: ₹11,956.30/GM
   - Price change indicator: -1.00 (-0.01%) in red/green
   - Carat toggle pills: "24 Carat" (active) | "22 Carat"
   - Share button with icon
   - Last updated: "Last updated on 6 Oct, 2025"

3. **24K Gold Rate in India Table**
   - Clean table design with alternating row colors
   - Headers: Gram | Today | Yesterday
   - Rows: 1 Gram, 10 Gram, 100 Gram
   - Price formatting: ₹11,956.30
   - Change display: -1.00 (-0.01%) with color coding
   - Green for positive, red for negative

4. **Gold Investment Education Section**
   - Heading: "Gold Investment in India"
   - Two-column price display:
     - Left: 24K Gold / 10 Grams - ₹1,19,563.00
     - Right: 22K Gold / 10 Grams - ₹1,09,613.00
   - Educational content paragraph
   - "Read More" expandable link in purple/primary color

5. **Gold Rate Analysis Section**
   - Heading: "Gold Rate Analysis"
   - Month selector dropdown (Oct'25)
   - Table with 3 columns:
     - Gold Rate (Date)
     - 24K Gold (with percentage)
     - 22K Gold (with percentage)
   - Show 4-5 recent dates
   - Color-coded percentage changes

6. **Month Wise Gold Rate (Accordion)**
   - Heading: "Month Wise Gold Rate"
   - Expandable accordion for each month
   - Current month expanded by default
   - Inside accordion:
     - Table: Rate | 24K Gold / (10GM)
     - Rows: Oct 1, Oct 6, Highest in Oct, Lowest in Oct
     - "Overall performance" row with trend (Rising/Falling)
   - Collapse/expand icon on right

7. **Gold Rates Over Last 10 Days**
   - Table: Date | 24K Gold | 22K Gold
   - Show 4-5 recent dates
   - Price with percentage change
   - "View More" link in primary color

8. **Gold Rates in Major Cities**
   - Clean table: City | 24K Gold | 22K Gold
   - Show 6-8 major cities
   - Each city name is a link to city page
   - Sorted alphabetically or by popularity

9. **FAQs Section**
   - Heading: "Frequently Asked Questions"
   - Accordion-style expandable questions
   - Questions:
     - How many grams of gold are present in one 'tola' of gold?
     - What is the difference between 22k and 24k gold?
     - How is the gold rate in India determined?
     - What do the terms hallmark, 916, and KDM in gold jewelry mean?
     - What should I look out for when buying gold in India?
     - How can I check the purity of gold in India
   - Chevron down icon to expand
   - Answer appears below in smaller text

10. **What's in News? Section**
    - Heading: "What's in news?"
    - Collapse/expand icon
    - Horizontal scrollable carousel (4 cards visible)
    - News card design:
      - Publisher avatar (circular, purple background)
      - Publisher name (Upstox) • Time posted (17d, 19d)
      - Headline text (2-3 lines)
      - Card background: Light gray
      - Padding and rounded corners
      - No image thumbnails

#### Right Sidebar Components

1. **Current Price Widget** (Top)
   - Same as hero but compact
   - Shows current rate with change

2. **Invest in Gold Funds Card**
   - Purple gradient background
   - Heading: "Invest in Gold Funds"
   - Gold ETFs section with icon
     - "No entry or exit loads"
   - Gold Mutual Funds section with icon
     - "0% commission on direct funds"
   - Mobile number input field
   - "Enter a 10-digit valid mobile number" error text
   - "Invest in Gold ETF" button (purple)
   - Terms and conditions link
   - "Quick links" section below

3. **City Quick Links**
   - List of city links
   - Cities: Ahmedabad, Amritsar, Nagpur, Patna, Rajkot, Jaipur, Meerut, Chandigarh, Jalgaon, etc.
   - Each link underlined
   - Organized vertically

4. **Top 5 Gold ETFs Card** (Optional)
   - List of ETF names
   - Current price with percentage change
   - Green/red color coding

#### Design Specifications
- **Typography**:
  - H1: 32px, bold
  - H2: 24px, bold
  - H3: 20px, semi-bold
  - Body: 16px, regular
  - Price displays: 24-32px, bold
  - Percentage: 14px, colored
  
- **Colors**:
  - Positive change: Green (#10b981 or similar)
  - Negative change: Red (#ef4444 or similar)
  - Primary/CTA: Purple (#8b5cf6 or brand color)
  - Table headers: Light gray background
  - Alternate rows: Very light gray

- **Spacing**:
  - Section margins: 40-60px vertical
  - Card padding: 24px
  - Table cell padding: 12-16px

- **Responsive**:
  - Desktop: Two-column layout (70/30)
  - Tablet: Sidebar moves below main content
  - Mobile: Single column, stacked sections

### 3.3 City-Specific Page (/metals/gold/maharashtra/mumbai)

#### SEO Meta (Dynamic)
```html
<title>Gold Price in Mumbai Today - 22K & 24K Gold Rate in Mumbai, Maharashtra</title>
<meta name="description" content="Today's gold price in Mumbai: 22K gold at ₹X, 24K gold at ₹Y per 10 grams. Check historical trends, price charts, and set alerts for Mumbai.">
<meta name="keywords" content="gold price mumbai, mumbai gold rate, 22k gold mumbai, 24k gold rate mumbai">
<link rel="canonical" href="https://yourdomain.com/metals/gold/maharashtra/mumbai">
```

#### Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "22K Gold in Mumbai",
  "offers": {
    "@type": "Offer",
    "price": "48100",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  },
  "location": {
    "@type": "Place",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    }
  }
}
```

#### Page Components
1. **Breadcrumbs**
   - Home > Metals > Gold > Maharashtra > Mumbai

2. **City Header**
   - H1: "Gold Price in Mumbai Today"
   - Weather & AQI Widget (Mumbai-specific) - Enhanced view
   - Last updated timestamp

3. **Current Prices Card**
   - Large display: 22K Gold (10g): ₹XX,XXX
   - Large display: 24K Gold (10g): ₹XX,XXX
   - 24h change with color indicator
   - "Set Alert" button

4. **Historical Price Chart**
   - Interactive chart (Recharts)
   - Toggle: Today, 7d, 30d
   - Dual axis for 22K and 24K
   - Export chart option

5. **Price Comparison Table**
   - Compare Mumbai with nearby cities
   - Columns: City, 22K, 24K, Difference
   - Highlight Mumbai row

6. **Price Alert Widget**
   - Pre-filled with Mumbai
   - "Notify me when price reaches ₹___"

7. **City-Specific FAQs**
   - "Why are gold prices different in Mumbai?"
   - "Best time to buy gold in Mumbai"
   - "Gold tax in Maharashtra"

8. **Related News**
   - News filtered for Mumbai/Maharashtra
   - 3-4 cards

9. **SEO Links Footer**
   - Links to other cities in Maharashtra
   - Links to other metals in Mumbai
   - Links to nearby cities

### 3.4 News Article Page (/metals/news/[slug])

#### SEO Meta (Dynamic)
```html
<title>[Article Title] | Precious Metals News India</title>
<meta name="description" content="[First 160 chars of article]">
<meta property="og:type" content="article">
<meta property="article:published_time" content="2025-10-06T10:00:00Z">
```

#### Page Components
1. Article header with image
2. Author & publish date
3. Article content
4. Related articles
5. Social sharing
6. Comments section (future)

---

## 4. API Integration

### 4.1 Bullion Price API (nixinfo.in)

#### Endpoints
```
Gold:     https://nixinfo.in/api/bullion/gold/price-v7
Silver:   https://nixinfo.in/api/bullion/silver/price-v7
Platinum: https://nixinfo.in/api/bullion/platinum/price-v7
```

#### Parameters
- `email`: Registered email
- `key`: API key (store in secrets)
- `state`: State slug (e.g., "delhi")
- `cities`: City name (optional)
- `days`: "today" | "yt" | "7d" | "10d" | "30d"
- `ob`: "ASC" | "DESC"

#### Response Structure (Gold)
```json
{
  "info": [{
    "services": "ok",
    "bullion": "gold",
    "volume": "10g",
    "currency": "inr",
    "state": "delhi"
  }],
  "data": [{
    "cities": "Delhi",
    "22c-10g": "48100",
    "24c-10g": "52470",
    "date": "2025-10-06"
  }]
}
```

#### Response Structure (Silver)
```json
{
  "data": [{
    "cities": "Mumbai",
    "10 gram": "590",
    "100 gram": "5900",
    "1 Kg": "59000.00",
    "date": "2025-10-06"
  }]
}
```

#### Response Structure (Platinum)
```json
{
  "data": [{
    "cities": "Bangalore",
    "1 gram": "2406",
    "10 gram": "24060",
    "100 gram": "240600",
    "date": "2025-10-06"
  }]
}
```

### 4.2 Weather API (nixinfo.in)

#### Endpoint
```
https://nixinfo.in/api/weather/weather-v7
```

#### Parameters
- `email`: Registered email
- `key`: API key
- `lat`: Latitude (float)
- `lon`: Longitude (float)

#### Key Response Fields
```json
{
  "l_name": "Mumbai",
  "l_region": "Maharashtra",
  "w_temp_celsius": "32.5",
  "w_humidity_percentage": 65,
  "w_wind_kph": "12.5",
  "w_feels_like_c": "35.2",
  "w_is_day_night": "day",
  "last_updated": "2025-10-06 14:30"
}
```

### 4.3 AQI API (nixinfo.in)

#### Endpoint
```
https://nixinfo.in/api/weather/aqi-v7
```

#### Parameters (same as weather)

#### Response Fields
```json
{
  "l_name": "Mumbai",
  "air_pm_2_5": "45.3",
  "air_pm_10": "78.2",
  "air_co": "320.5",
  "air_no2": "8.2",
  "air_o3": "95.0",
  "air_so2": "18.5",
  "last_updated": "2025-10-06 14:30"
}
```

#### AQI Calculation & Color Coding
Based on Indian CPCB standards:
- 0-50: Good (Green)
- 51-100: Satisfactory (Light Green)
- 101-200: Moderate (Yellow)
- 201-300: Poor (Orange)
- 301-400: Very Poor (Red)
- 401-500: Severe (Dark Red)

---

## 5. Weather & AQI Widget Specifications (Enhanced Based on Reference UI)

### Widget Placement
1. **Home Page (/metals)**: Compact widget in hero or sidebar
2. **City Pages**: Expanded widget adjacent to price display
3. **State Pages**: Compact widget in header
4. **Dedicated /weather page**: Full AQI dashboard

### Enhanced AQI Page Design (/weather)

#### Hero Section
- **LIVE Badge**: Red badge with pulsing dot indicator
- **Location Breadcrumb**: Dashboard > India > State > City
- **Tab Navigation**: AQI (active) | Weather | History | PM2.5 | PM10 | CO | SO2 | NO2 | O3
- **Search Bar**: "Search any Location, City, State or Country" with geolocation icon

#### Live AQI Display Card
- **Large AQI Number**: 129 (color-coded based on level)
- **Quality Description**: "Poor" / "Moderate" / "Good" etc.
- **Gradient Background**: Matching AQI color (orange for moderate, red for poor)
- **PM Readings**: Prominent PM10 and PM2.5 values
- **AQI Scale Bar**: 
  - Horizontal gradient from green (0) to maroon (500+)
  - Tick marks at 50, 100, 150, 200, 300, 500
  - Labels: Good, Moderate, Poor, Severe
- **Weather Integration**:
  - Weather icon with description
  - Temperature (°C)
  - 3-column grid: Humidity % | Wind Speed km/h | UV Index

#### Major Air Pollutants Grid (3x2 on desktop)
Each pollutant card contains:
- **Left Border**: Color-coded (green/yellow/orange/red) based on level
- **Icon**: Molecular representation of pollutant
- **Name & Formula**: "Particulate Matter (PM2.5)"
- **Value & Unit**: "48 μg/m³" or "232 ppb"
- **Chevron**: Right arrow for detail view

Pollutants displayed:
1. PM2.5 (Particulate Matter)
2. PM10 (Particulate Matter)  
3. CO (Carbon Monoxide)
4. SO2 (Sulfur Dioxide)
5. NO2 (Nitrogen Dioxide)
6. O3 (Ozone)

#### Historical AQI Graph
- **Chart Type Toggle**: Line chart | Bar chart icons
- **Time Period Selector**: Dropdown with "24 Hours" / "7 Days" / "30 Days"
- **Data Type Selector**: "AQI" dropdown
- **Min/Max Cards**: 
  - Left card: Min value (100) with yellow badge, timestamp
  - Right card: Max value (163) with red badge, timestamp
- **Color-Coded Bars**: Each bar colored by AQI range
- **Interactive Tooltips**: Show exact value on hover

#### Annual AQI Trends
- **Year-by-Year Breakdown**: 2020-2025 vertical list
- **Horizontal Bar Chart**: Monthly data within each year
- **Color Gradient**: Bars colored by pollution level
- **Stats Panel**:
  - Each year shows: AQI value, percentage change
  - Arrow indicators: ↑ Rise (red) | ↓ Fall (green)
  - Overall percentage: "Overall Annual Percentage (%) change of AQI in (2020 to 2025): -3%"
- **Most & Least Polluted Months**:
  - Cards showing month/year with color-coded AQI badges
  - "November, 2021 - 257 AQI" (purple badge)
  - "July, 2025 - 81 AQI" (yellow badge)

### Color-Coded AQI System (Indian CPCB Standard)
- **0-50**: Good (Green #10b981)
- **51-100**: Satisfactory (Yellow #eab308)  
- **101-200**: Moderate (Orange #f97316)
- **201-300**: Poor (Red #ef4444)
- **301-400**: Very Poor (Purple #a855f7)
- **401-500**: Severe (Maroon #991b1b)

### Compact Widget (For Metals Pages)
- Location icon + city name
- Temperature with weather icon
- AQI badge with color and number
- "Last updated" timestamp
- Click to expand or link to /weather page

### Technical Implementation
- Auto-detect user location via browser geolocation API
- Cache weather/AQI data for 30 minutes (reduce API calls)
- Fallback to city coordinates for city-specific pages
- Error states with retry mechanism
- Responsive: Full dashboard on desktop, collapsible on mobile
- Accessibility: Proper ARIA labels, keyboard navigation

---

## 6. Price Alerts Feature (Phase 1)

### User Flow
1. User enters email/phone
2. Selects metal (gold/silver/platinum)
3. Selects city
4. Sets target price
5. Receives confirmation
6. Gets notified when price reaches target

### Alert Types
- Price drops below X
- Price rises above X
- Daily summary (optional)

### Database Schema (Lovable Cloud)
```sql
CREATE TABLE price_alerts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_email VARCHAR(255),
  user_phone VARCHAR(20),
  metal_type VARCHAR(20), -- 'gold', 'silver', 'platinum'
  city VARCHAR(100),
  state VARCHAR(100),
  target_price DECIMAL(10, 2),
  alert_type VARCHAR(20), -- 'above', 'below'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  triggered_at TIMESTAMP
);
```

### Implementation
- Edge function to check prices every hour
- Send email/SMS when alert triggers
- User can manage alerts via dashboard (future)

---

## 7. FAQs Content

### Global FAQs (/metals)
1. **What factors affect precious metal prices in India?**
   - International market rates
   - Currency exchange rates (USD to INR)
   - Import duties and GST
   - Local demand and supply
   - Making charges (for jewelry)

2. **Why do gold prices vary between cities?**
   - Transportation costs
   - Local taxes
   - Dealer margins
   - Regional demand

3. **What is the difference between 22K and 24K gold?**
   - 24K = 99.9% pure gold (softer, used for investment)
   - 22K = 91.6% pure gold (harder, used for jewelry)

4. **How is silver priced in India?**
   - Priced per gram, 100g, or 1kg
   - Based on international spot price
   - Subject to 10.75% import duty + 3% GST

5. **Is platinum a good investment?**
   - Rarer than gold
   - Industrial demand (automotive, jewelry)
   - Price volatility considerations

### City-Specific FAQs
- Best places to buy [metal] in [city]
- Tax implications in [state]
- Historical price trends in [city]
- Local market timings

---

## 8. News Component Specifications

### News Card Component
```tsx
┌────────────────────────────────┐
│  [Thumbnail Image]             │
│                                │
│  Headline (60 chars max)       │
│  Brief excerpt (120 chars)...  │
│                                │
│  📅 Oct 6, 2025  | 💬 5 min    │
│  🏷️ Gold, Market Analysis      │
└────────────────────────────────┘
```

### Data Structure
```typescript
interface MetalsNews {
  id: string;
  title: string;
  excerpt: string;
  content: string; // Full article HTML
  thumbnail_url: string;
  publish_date: Date;
  read_time_minutes: number;
  tags: string[]; // ['gold', 'silver', 'platinum', 'market']
  source?: string;
  author?: string;
}
```

### News Sources (For Future Population)
- Reserve Bank of India updates
- Multi Commodity Exchange (MCX)
- World Gold Council
- Financial news aggregators
- Government policy updates

---

## 9. SEO Footer Structure

### Layout
```
┌────────────────────────────────────────────────────────┐
│                    PRECIOUS METALS                      │
├────────────────────────────────────────────────────────┤
│  Gold Prices       Silver Prices      Platinum Prices  │
│  ├ Delhi           ├ Delhi            ├ Delhi          │
│  ├ Mumbai          ├ Mumbai           ├ Mumbai         │
│  ├ Bangalore       ├ Bangalore        ├ Bangalore      │
│  └ [All Cities]    └ [All Cities]     └ [All Cities]   │
├────────────────────────────────────────────────────────┤
│  STATE WISE LINKS                                       │
│  ├ Maharashtra (15 cities)                             │
│  ├ Karnataka (8 cities)                                │
│  ├ Tamil Nadu (10 cities)                              │
│  └ [View All States]                                   │
├────────────────────────────────────────────────────────┤
│  RESOURCES                                              │
│  ├ Price Alerts                                        │
│  ├ Historical Charts                                   │
│  ├ Latest News                                         │
│  └ FAQs                                                │
└────────────────────────────────────────────────────────┘
```

### SEO Benefits
- Internal linking to all 78+ city pages
- Keyword-rich anchor text
- Crawlable structure for search engines
- Improved site architecture

---

## 10. Design System

### Color Palette
```css
/* Metals Theme */
--gold-primary: hsl(45, 100%, 51%);       /* #FFD700 */
--gold-light: hsl(45, 100%, 85%);
--gold-dark: hsl(38, 90%, 40%);

--silver-primary: hsl(0, 0%, 75%);        /* #C0C0C0 */
--silver-light: hsl(0, 0%, 90%);
--silver-dark: hsl(0, 0%, 50%);

--platinum-primary: hsl(180, 8%, 85%);    /* #E5E4E2 */
--platinum-light: hsl(180, 8%, 95%);
--platinum-dark: hsl(180, 8%, 60%);

/* Status Colors */
--price-up: hsl(142, 71%, 45%);          /* Green for increase */
--price-down: hsl(0, 84%, 60%);          /* Red for decrease */

/* AQI Colors */
--aqi-good: hsl(120, 60%, 50%);
--aqi-satisfactory: hsl(90, 60%, 50%);
--aqi-moderate: hsl(60, 100%, 50%);
--aqi-poor: hsl(30, 100%, 50%);
--aqi-very-poor: hsl(0, 100%, 50%);
--aqi-severe: hsl(0, 50%, 25%);
```

### Typography
```css
/* Headers */
h1: 2.5rem (40px) - font-weight: 700
h2: 2rem (32px) - font-weight: 600
h3: 1.5rem (24px) - font-weight: 600

/* Price Display */
--price-large: 3rem (48px) - font-weight: 700
--price-medium: 2rem (32px) - font-weight: 600
--price-small: 1.25rem (20px) - font-weight: 500
```

### Component Variants

#### Price Card
- Default: White background, subtle shadow
- Gold variant: Gold accent border
- Silver variant: Silver accent border
- Platinum variant: Platinum accent border

#### Alert Widget
- Sticky position on scroll
- Slide-in animation
- Prominent CTA button

---

## 11. Implementation Phases

### Phase 1: Core Foundation (Week 1-2)
**Priority: Critical**
- [x] PRD Creation
- [ ] Setup routing structure
- [ ] API integration (Bullion, Weather, AQI)
- [ ] Lovable Cloud setup for alerts
- [ ] Main landing page (/metals)
- [ ] Single metal overview page (Gold)
- [ ] Single city page template
- [ ] Weather/AQI widget
- [ ] Price alerts backend + UI
- [ ] Basic SEO footer
- [ ] FAQs section

**Deliverables:**
- Functional /metals page
- Functional /metals/gold page
- Functional /metals/gold/delhi/delhi page
- Working price alerts
- Weather widget showing on all pages

### Phase 2: Scale & Expand (Week 3-4)
**Priority: High**
- [ ] All metal pages (Silver, Platinum)
- [ ] All state pages (17 states)
- [ ] All city pages (78+ cities)
- [ ] Historical charts implementation
- [ ] News card component
- [ ] News listing page
- [ ] Complete SEO footer with all links
- [ ] Performance optimization
- [ ] Mobile responsiveness
- [ ] Caching strategy

**Deliverables:**
- Complete site coverage (all metals × all cities)
- Historical data visualization
- News section
- Optimized performance

### Phase 3: Enhancement (Week 5-6)
**Priority: Medium**
- [ ] Alert management dashboard
- [ ] User accounts (optional)
- [ ] Compare cities feature
- [ ] Export price data (CSV/PDF)
- [ ] Advanced filtering
- [ ] Price prediction/trends (ML)
- [ ] Social sharing
- [ ] Newsletter signup
- [ ] RSS feeds

### Phase 4: Analytics & Optimization (Week 7-8)
**Priority: Low**
- [ ] Google Analytics integration
- [ ] Search Console setup
- [ ] A/B testing
- [ ] SEO optimization
- [ ] Content updates
- [ ] User feedback collection
- [ ] Performance monitoring

---

## 12. Technical Stack

### Frontend
- React 18.3
- TypeScript
- Tailwind CSS
- Recharts (for charts)
- React Router (routing)
- TanStack Query (API state management)

### Backend
- Lovable Cloud (Supabase)
- Edge Functions (price alerts)
- PostgreSQL (alerts database)

### APIs
- nixinfo.in Bullion API (Gold, Silver, Platinum)
- nixinfo.in Weather API
- nixinfo.in AQI API

### SEO
- react-helmet-async (meta tags)
- Sitemap generation
- robots.txt
- Schema.org structured data

---

## 13. Data Management

### Caching Strategy
```
Bullion Prices:  Cache for 15 minutes (frequent updates)
Weather Data:    Cache for 30 minutes
AQI Data:        Cache for 30 minutes
Historical Data: Cache for 24 hours
News:            Cache for 1 hour
```

### State Management
- TanStack Query for server state
- React Context for global UI state
- LocalStorage for user preferences (city selection)

---

## 14. Error Handling

### API Failure Scenarios
1. **Bullion API Down**
   - Show last cached data
   - Display warning: "Prices may not be current"
   
2. **Weather API Down**
   - Hide widget gracefully
   - No page break

3. **Invalid State/City**
   - 404 page with suggestions
   - Redirect to main page

### User Feedback
- Toast notifications for alerts
- Loading skeletons for data fetching
- Error boundaries for component crashes

---

## 15. Accessibility

- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader optimization
- Color contrast ratios (4.5:1 minimum)
- Alt text for all images
- ARIA labels for interactive elements

---

## 16. Performance Targets

- **Lighthouse Score**: 90+
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1
- **Largest Contentful Paint**: < 2.5s

---

## 17. Security Considerations

### API Keys
- Store in Lovable Cloud Secrets
- Never expose in frontend code
- Rotate regularly

### User Data (Price Alerts)
- Email validation
- Rate limiting on alert creation
- GDPR compliance (data deletion)
- Secure HTTPS only

---

## 18. Success Metrics

### SEO Metrics
- 100+ indexed pages (all cities)
- Organic traffic growth: 20% MoM
- Top 10 rankings for "[metal] price [city]"

### User Engagement
- Average session duration: 3+ minutes
- Pages per session: 2.5+
- Bounce rate: < 60%
- Alert signups: 100+ per week

### Technical Metrics
- API uptime: 99.5%
- Page load time: < 2s
- Error rate: < 0.5%

---

## 19. Content Guidelines

### Writing Style
- Clear, concise, user-friendly
- Avoid financial jargon
- Include local context (city-specific)
- Update daily with new prices

### SEO Best Practices
- H1 tags: One per page, keyword-rich
- Meta descriptions: 150-160 characters
- Image alt text: Descriptive, keyword-rich
- Internal linking: 3-5 links per page
- Canonical tags: Prevent duplicate content

---

## 20. Future Enhancements

### Phase 5+ (Post-Launch)
- Multi-language support (Hindi, regional languages)
- Precious stones pricing (Diamond, Emerald, etc.)
- Jewelry calculators (making charges estimator)
- Store locator (nearby dealers)
- Live chat support
- Mobile app (PWA first)
- API for third-party developers
- Commodity futures integration
- Portfolio tracking (user investments)

---

## 21. API Secrets Setup

### Required Secrets (Lovable Cloud)
```
NIXINFO_API_EMAIL=your_registered_email@example.com
NIXINFO_API_KEY=your_api_key_here
```

### Usage in Code
```typescript
// Edge function or API utility
const NIXINFO_EMAIL = process.env.NIXINFO_API_EMAIL;
const NIXINFO_KEY = process.env.NIXINFO_API_KEY;
```

---

## 22. Sitemap Structure

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Main pages -->
  <url><loc>https://yourdomain.com/metals</loc><priority>1.0</priority></url>
  <url><loc>https://yourdomain.com/metals/gold</loc><priority>0.9</priority></url>
  <url><loc>https://yourdomain.com/metals/silver</loc><priority>0.9</priority></url>
  <url><loc>https://yourdomain.com/metals/platinum</loc><priority>0.9</priority></url>
  
  <!-- State pages (17 × 3 metals = 51 pages) -->
  <url><loc>https://yourdomain.com/metals/gold/delhi</loc><priority>0.8</priority></url>
  <!-- ... -->
  
  <!-- City pages (78+ × 3 metals = 234+ pages) -->
  <url><loc>https://yourdomain.com/metals/gold/delhi/delhi</loc><priority>0.7</priority></url>
  <!-- ... -->
  
  <!-- News pages -->
  <url><loc>https://yourdomain.com/metals/news</loc><priority>0.6</priority></url>
</urlset>
```

---

## 23. Robots.txt

```
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Summary

This PRD outlines a comprehensive precious metals price platform covering:
- **300+ SEO-optimized pages** (78+ cities × 3 metals + overview pages)
- **Real-time pricing** via nixinfo.in API
- **Weather & AQI integration** on all pages
- **Price alerts** with email/SMS notifications
- **Historical charts** for trend analysis
- **News section** for market updates
- **Complete SEO footer** for crawlability
- **Mobile-first responsive design**
- **Phase 1 delivery** in 2 weeks

Next steps: Begin Phase 1 implementation with core pages and API integration.

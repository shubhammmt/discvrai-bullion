
# Feed Page Redesign - Technical Documentation

## Overview
Complete redesign of the Feed page with unified search capabilities supporting stocks, mutual funds, and IPOs through both NLP and conventional filter modes.

## API Specifications

### 1. Unified Search API
```
POST /api/v1/feed/unified-search

Request Body:
{
  assetType: "stock" | "mutual-fund" | "ipo",
  searchMode: "nlp" | "filters",
  query?: string, // Required for NLP mode
  filters?: {
    // Stock Filters
    marketCap?: ("large" | "mid" | "small" | "micro")[] | { min: number, max: number },
    peRatio?: { min: number, max: number },
    sector?: string[],
    priceRange?: { min: number, max: number },
    returns?: "1d" | "1w" | "1m" | "3m" | "6m" | "1y",
    technicalSignal?: "bullish" | "bearish",
    
    // Mutual Fund Filters
    category?: ("large" | "mid" | "flexi" | "debt" | "tax" | "elss")[],
    riskLevel?: "low" | "moderate" | "high",
    expenseRatio?: { min: number, max: number },
    aum?: { min: number, max: number },
    
    // IPO Filters
    status?: "open" | "closed"
  },
  page: number,
  pageSize: number
}

Response:
{
  success: boolean,
  data: SearchResult[],
  total_records: number,
  current_page: number,
  total_pages: number,
  page_size: number,
  nlp_analysis?: {
    interpreted_filters: Record<string, any>,
    confidence: number,
    suggestions: string[],
    original_query: string
  },
  error?: string
}
```

### 2. Top Results API
```
GET /api/v1/feed/top-results

Response:
{
  success: boolean,
  data: {
    stocks: StockResult[],
    mutualFunds: MutualFundResult[],
    ipos: IPOResult[]
  },
  error?: string
}
```

### 3. Existing APIs (Already Available)

#### Alert API
```
POST /api/financial-assistant/alert
Body: {
  user_id: string,
  action: "create",
  symbol: string,
  asset_type: "stock" | "mutual_fund" | "ipo",
  alert_type: "price",
  condition: "above" | "below",
  target_value: number
}
```

#### Watchlist API
```
POST /api/financial-assistant/watchlist
Body: {
  user_id: string,
  action: "add",
  symbol: string,
  name: string,
  asset_type: "stock" | "mutual_fund" | "ipo",
  notes?: string,
  watchlists?: string[]
}
```

## Component Architecture

### New Components to Create:

1. **`UnifiedSearchInterface.tsx`**
   - Search mode toggle (NLP vs Filters)
   - Search input with asset type selector
   - Filter panels for each asset type
   - Search execution and loading states

2. **`FilterPanel.tsx`**
   - Dynamic filter UI based on asset type
   - Filter validation and state management
   - Reset/clear functionality

3. **`NLPFilterDisplay.tsx`**
   - Shows interpreted filters from NLP
   - Editable filter chips
   - Confidence indicator
   - "Refine search" functionality

4. **`TopResultsSection.tsx`**
   - Static trending results by asset type
   - Quick action buttons
   - Horizontal scrollable cards

5. **`UnifiedResultsTable.tsx`**
   - Generic table supporting all asset types
   - Pagination controls
   - Sort functionality
   - CTA buttons (Watchlist, Alert, Buy, Details)

6. **`ResultsEmptyState.tsx`**
   - 0 results handling
   - Suggested searches
   - Filter relaxation suggestions

7. **`SearchResultCard.tsx`**
   - Individual result display for 1-2 results
   - Detailed information layout
   - Enhanced CTA placement

### Utility Files:

1. **`unifiedSearchApi.ts`** ✅ (Already created)
2. **`alertIntegration.ts`** - Integration with existing alert API
3. **`watchlistIntegration.ts`** - Integration with existing watchlist API

## File Structure
```
src/
├── components/
│   └── feed/
│       ├── UnifiedSearchInterface.tsx
│       ├── FilterPanel.tsx
│       ├── NLPFilterDisplay.tsx
│       ├── TopResultsSection.tsx
│       ├── UnifiedResultsTable.tsx
│       ├── ResultsEmptyState.tsx
│       └── SearchResultCard.tsx
├── utils/
│   ├── unifiedSearchApi.ts ✅
│   ├── alertIntegration.ts
│   └── watchlistIntegration.ts
└── pages/
    └── FeedV2.tsx (New redesigned feed)
```

## User Experience Flow

### 1. Landing State
- Top results section (static trending)
- Search interface with NLP mode as default
- Quick filter chips for common searches

### 2. Search Flow
**NLP Mode:**
- User types natural language query
- Shows interpreted filters with confidence
- Allows filter editing before search
- Displays results with explanation

**Filter Mode:**
- Conventional filter panels
- Real-time filter application
- Filter combination logic
- Clear filter states

### 3. Results Display
**0 Results:**
- Empty state with suggestions
- Related searches
- Filter relaxation options

**1-2 Results:**
- Card layout with detailed info
- Enhanced CTA placement
- Related suggestions

**3+ Results:**
- Table layout with pagination
- Sort options
- Bulk actions

### 4. CTA Integration
- **Watchlist**: Integrates with existing watchlist API
- **Alert**: Integrates with existing alert API  
- **Buy**: Placeholder for future broker integration
- **Details**: Routes to existing research pages

## Technical Considerations

### Performance
- Debounced search input
- Pagination for large result sets
- Lazy loading for filter options
- Caching for top results

### Responsiveness
- Mobile-first design
- Collapsible filter panels
- Touch-friendly controls
- Adaptive table layouts

### Error Handling
- API timeout handling
- Network error recovery
- Graceful degradation
- User feedback messaging

### State Management
- Search state persistence
- Filter state management
- Results caching
- Loading states

## Implementation Phases

### Phase 1: Core Infrastructure
1. Create unified search API utility
2. Build basic search interface
3. Implement filter panels
4. Create results table

### Phase 2: Enhanced Features
1. Add NLP filter display
2. Implement top results section
3. Add empty states and error handling
4. Integrate alert/watchlist CTAs

### Phase 3: Polish
1. Mobile optimization
2. Performance improvements
3. Advanced filtering
4. User experience enhancements

## Migration Strategy

1. Create new FeedV2.tsx alongside existing Feed.tsx
2. Test all functionality in isolation
3. Update routing to use FeedV2
4. Remove old Feed.tsx after validation
5. Update all navigation links

## Success Metrics

- Search functionality works for all asset types
- NLP interpretation displays correctly
- All CTAs integrate with existing systems
- Results display properly for all edge cases
- Mobile experience is fully functional
- Performance meets user expectations

---

**Implementation Status:**
- ✅ Documentation created
- ✅ unifiedSearchApi.ts utility created
- 🔄 Currently implementing Phase 1 components

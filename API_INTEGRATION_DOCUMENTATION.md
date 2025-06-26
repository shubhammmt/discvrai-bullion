
# API Integration Documentation

## Overview

This document explains how the real API endpoints are integrated into the Feed page and search functionality of the application. The integration supports both Natural Language Processing (NLP) queries and structured metric-based filtering for stock data.

## API Configuration

### Base Configuration
- **Base URL**: `https://p646lccs-8008.inc1.devtunnels.ms`
- **Authentication**: Bearer Token + Session ID
- **Content Type**: `application/json`

### Authentication Headers
```typescript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'X-Session-ID': '0aee2f9b-b3ff-447d-bf7e-cb5318a7c550'
}
```

## Available Endpoints

### 1. NLP Stock Query (Natural Language Search)
- **Endpoint**: `POST /api/v1/feed/stock-query/paginated`
- **Purpose**: Processes natural language queries to find relevant stocks
- **Search Mode**: `nlp`

#### Request Format
```typescript
{
  query: string,           // Natural language query (e.g., "Find growth stocks in tech sector")
  page: number,           // Page number for pagination
  page_size: number,      // Number of results per page
  include_charts: boolean, // Whether to include chart data
  sort_field?: string,    // Optional sorting field
  sort_order?: 'asc' | 'desc' // Optional sorting order
}
```

#### Response Format
```typescript
{
  data: StockResult[],
  total_records: number,
  total_pages: number,
  current_page: number,
  page_size: number,
  intent_analysis: {
    intent: string,
    confidence: number,
    confidence_reasoning: string,
    processing_path: string,
    communication_message: string,
    optimization_summary: string,
    chart_suggestions: any,
    alternate_queries: string[],
    transparency: any
  },
  execution_path: string,
  processing_time_ms: number,
  success: boolean,
  error: string | null
}
```

### 2. Metrics Filter (Structured Search)
- **Endpoint**: `POST /api/v1/feed/stock-query/metrics-filter`
- **Purpose**: Filters stocks based on specific financial metrics and criteria
- **Search Mode**: `filters`

#### Request Format
```typescript
{
  filters: StockMetricsFilter[],
  page: number,
  page_size: number,
  sort_field?: string | null,
  sort_order?: 'asc' | 'desc',
  fields_to_return?: string[] | null
}
```

#### Filter Structure
```typescript
interface StockMetricsFilter {
  field: string,                    // Metric field name (e.g., 'market_cap', 'pe_ratio')
  operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'between' | 'in',
  value: any,                       // Primary filter value
  value_end?: any | null           // End value for 'between' operator
}
```

#### Response Format
```typescript
{
  data: StockResult[],
  total_records: number,
  total_pages: number,
  current_page: number,
  page_size: number,
  applied_filters: StockMetricsFilter[],
  processing_time_ms: number,
  success: boolean,
  error: string | null
}
```

## Integration Architecture

### File Structure
- **`src/utils/unifiedSearchApi.ts`**: Main API integration file
- **`src/components/feed/UnifiedSearchInterface.tsx`**: UI component for search interface
- **`src/pages/Feed.tsx`**: Main feed page using the search functionality
- **`src/components/StockResultsTable.tsx`**: Display component for search results

### Data Flow

1. **User Input** → Search interface captures user query or filter selections
2. **Request Processing** → `unifiedSearchApi.ts` processes the request based on search mode
3. **API Call** → Makes authenticated request to appropriate endpoint
4. **Response Transformation** → Converts API response to standardized format
5. **UI Update** → Results displayed in `StockResultsTable` or card format

### Search Mode Routing

```typescript
// NLP Mode - Natural language queries
if (request.searchMode === 'nlp' && request.query) {
  // Use: /api/v1/feed/stock-query/paginated
  // Input: Natural language string
}

// Filter Mode - Structured filtering
else if (request.searchMode === 'filters' && request.filters) {
  // Use: /api/v1/feed/stock-query/metrics-filter
  // Input: Structured filter objects
}
```

## Filter Conversion Logic

The system automatically converts UI filter inputs to API-compatible filter objects:

### Range Filters
```typescript
// UI Input: { priceRange: { min: 100, max: 500 } }
// API Output: { field: 'priceRange', operator: 'between', value: 100, value_end: 500 }
```

### Array Filters
```typescript
// UI Input: { sector: ['Technology', 'Healthcare'] }
// API Output: { field: 'sector', operator: 'in', value: ['Technology', 'Healthcare'] }
```

### Single Value Filters
```typescript
// UI Input: { riskLevel: 'moderate' }
// API Output: { field: 'riskLevel', operator: 'eq', value: 'moderate' }
```

## Error Handling

### API Unavailability
When endpoints are not available, the system:
1. Logs the error to console
2. Returns empty results with appropriate error message
3. Gracefully degrades without breaking the UI

### Request Failures
- Network errors are caught and logged
- User sees friendly error message
- Search state is properly reset

## Usage Examples

### Natural Language Search
```javascript
const searchRequest = {
  assetType: 'stock',
  searchMode: 'nlp',
  query: 'Find high-growth technology stocks with strong fundamentals',
  page: 1,
  pageSize: 20
};

const results = await searchAssets(searchRequest);
```

### Metric-Based Filtering
```javascript
const searchRequest = {
  assetType: 'stock',
  searchMode: 'filters',
  filters: {
    marketCap: { min: 1000000000 }, // Market cap > 1B
    peRatio: { min: 10, max: 25 },  // P/E ratio between 10-25
    sector: ['Technology', 'Healthcare']
  },
  page: 1,
  pageSize: 20
};

const results = await searchAssets(searchRequest);
```

## Performance Considerations

- **Pagination**: All endpoints support pagination to handle large datasets
- **Caching**: API responses can be cached using React Query
- **Debouncing**: Search inputs are debounced to reduce API calls
- **Error Recovery**: Automatic retry logic for failed requests

## Security

- **Bearer Token**: All requests require valid authentication token
- **Session Management**: X-Session-ID header tracks user sessions
- **HTTPS**: All API communication is encrypted
- **Token Expiry**: System handles token expiration gracefully

## Future Enhancements

- **Autocomplete API**: Integration for real-time search suggestions
- **Top Results API**: Dynamic trending content based on market data
- **Mutual Fund APIs**: Extension to support mutual fund searches
- **IPO APIs**: Integration for IPO-specific search functionality

## Testing

To test the API integration:

1. Navigate to the Feed page (`/feed`)
2. Use the search interface to input queries
3. Try both NLP and filter-based searches
4. Check browser console for API request/response logs
5. Verify results display correctly in the table format

## Troubleshooting

### Common Issues
- **401 Unauthorized**: Check bearer token validity
- **Network Errors**: Verify base URL accessibility
- **Empty Results**: Check query format and filter values
- **Slow Responses**: Monitor API performance and consider pagination adjustments

### Debug Information
Enable console logging by checking the browser's developer tools. All API requests and responses are logged for debugging purposes.

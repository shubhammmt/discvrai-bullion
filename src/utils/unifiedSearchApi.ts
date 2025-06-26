
// Types for unified search functionality
export type AssetType = 'stock' | 'mutual-fund' | 'ipo';
export type SearchMode = 'nlp' | 'filters';

export interface RangeFilter {
  min?: number;
  max?: number;
}

export interface SearchFilters {
  // Stock Filters
  marketCap?: string[] | RangeFilter;
  peRatio?: RangeFilter;
  sector?: string[];
  priceRange?: RangeFilter;
  returns?: string;
  technicalSignal?: string;
  
  // Mutual Fund Filters
  category?: string[];
  riskLevel?: string;
  expenseRatio?: RangeFilter;
  aum?: RangeFilter;
  
  // IPO Filters
  status?: string;
  
  // Allow any additional filters
  [key: string]: any;
}

export interface UnifiedSearchRequest {
  assetType: AssetType;
  searchMode: SearchMode;
  query?: string;
  filters?: SearchFilters;
  page: number;
  pageSize: number;
}

export interface SearchResult {
  symbol: string;
  name: string;
  assetType: AssetType;
  price?: number;
  change?: number;
  changePercent?: number;
  [key: string]: any;
}

export interface StockResult extends SearchResult {
  assetType: 'stock';
  marketCap?: number;
  peRatio?: number;
  sector?: string;
}

export interface MutualFundResult extends SearchResult {
  assetType: 'mutual-fund';
  category?: string;
  expenseRatio?: number;
  aum?: number;
  nav?: number;
}

export interface IPOResult extends SearchResult {
  assetType: 'ipo';
  status?: string;
  priceRange?: string;
  lotSize?: number;
}

export interface TopResultsResponse {
  success: boolean;
  data: {
    stocks: StockResult[];
    mutualFunds: MutualFundResult[];
    ipos: IPOResult[];
  };
  error?: string;
}

export interface UnifiedSearchResponse {
  success: boolean;
  data: SearchResult[];
  total_records: number;
  current_page: number;
  total_pages: number;
  page_size: number;
  nlp_analysis?: {
    interpreted_filters: Record<string, any>;
    confidence: number;
    suggestions: string[];
    original_query: string;
  };
  error?: string;
}

export interface AutocompleteResult {
  symbol: string;
  name: string;
  assetType: AssetType;
  price?: number;
  changePercent?: number;
}

export interface AutocompleteResponse {
  success: boolean;
  data: AutocompleteResult[];
  error?: string;
}

// Add new types for stock-specific APIs
export interface StockQueryRequest {
  query: string;
  page: number;
  page_size: number;
  include_charts?: boolean;
  sort_field?: string | null;
  sort_order?: 'asc' | 'desc';
}

export interface StockMetricsFilter {
  field: string;
  operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'between' | 'in';
  value: any;
  value_end?: any | null;
}

export interface StockMetricsRequest {
  filters: StockMetricsFilter[];
  page: number;
  page_size: number;
  sort_field?: string | null;
  sort_order?: 'asc' | 'desc';
  fields_to_return?: string[] | null;
}

export interface StockQueryResponse {
  data: any[];
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  intent_analysis: {
    intent: string;
    confidence: number;
    confidence_reasoning: string;
    processing_path: string;
    communication_message: string;
    optimization_summary: string;
    chart_suggestions: any;
    alternate_queries: string[];
    transparency: any;
  };
  execution_path: string;
  processing_time_ms: number;
  success: boolean;
  error: string | null;
}

export interface StockMetricsResponse {
  data: any[];
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  applied_filters: StockMetricsFilter[];
  processing_time_ms: number;
  success: boolean;
  error: string | null;
}

// API Configuration
const API_BASE_URL = 'https://p646lccs-8008.inc1.devtunnels.ms';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbGllbnRfbXg3NWc1cmNneWdsdHJydSIsImNsaWVudF9pZCI6ImNsaWVudF9teDc1ZzVyY2d5Z2x0cnJ1IiwiY2xpZW50X25hbWUiOiJUZXN0IEJvdCBBUEkgQ2xpZW50IDYiLCJzY29wZXMiOlsicmVhZDpjb21wYW5pZXMiLCJyZWFkOnByaWNlcyIsInJlYWQ6ZmluYW5jaWFscyIsInJlYWQ6bWFya2V0IiwicmVhZDpjcnlwdG8iLCJyZWFkOm5ld3MiLCJyZWFkOmVhcm5pbmdzIiwicmVhZDphbmFseXRpY3MiLCJyZWFkOnRlY2huaWNhbCIsInJlYWQ6ZnVuZGFtZW50YWxzIiwicmVhZDphaV9pbnNpZ2h0cyIsInJlYWQ6cmF0aW5ncyIsInJlYWQ6c2VnbWVudHMiXSwidG9rZW5fdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImV4cCI6MTgwOTU1MDA1MSwiaWF0IjoxNzQ5NTUwMTExLCJpc3MiOiJkaXNjdnItZmluYW5jZS1hcGkifQ.9jun8ghunLtWng5UEO57uptBnp1AFCDiWpO4s1OLuVY';
const SESSION_ID = '0aee2f9b-b3ff-447d-bf7e-cb5318a7c550';

// Helper function to get authentication headers
const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'X-Session-ID': SESSION_ID,
  };
};

// Updated API Functions
export const searchAssets = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  // If it's a stock search, use the new stock APIs
  if (request.assetType === 'stock') {
    return await searchStocks(request);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/feed/unified-search`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Unified search API not available, using stock-specific APIs for stocks');
    
    // For non-stock assets, return empty results
    return {
      success: true,
      data: [],
      total_records: 0,
      current_page: request.page,
      total_pages: 0,
      page_size: request.pageSize,
      error: 'API endpoint not available for this asset type'
    };
  }
};

// New function for stock-specific searches with real API integration
const searchStocks = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  try {
    let apiResponse;
    
    if (request.searchMode === 'nlp' && request.query) {
      // Use NLP endpoint
      const stockQueryRequest = {
        query: request.query,
        page: request.page,
        page_size: request.pageSize,
        include_charts: false
      };

      console.log('Making NLP API call with:', stockQueryRequest);
      
      const response = await fetch(`${API_BASE_URL}/api/v1/feed/stock-query/paginated`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(stockQueryRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      apiResponse = await response.json();
      
      // Transform API response to match our interface
      return {
        success: apiResponse.success,
        data: apiResponse.data.map((stock: any) => ({
          symbol: stock.symbol || stock.company_name,
          name: stock.company_name,
          assetType: 'stock' as const,
          price: stock.current_price,
          changePercent: stock.price_change_percent,
          marketCap: stock.market_cap,
          peRatio: stock.pe_ratio,
          sector: stock.sector,
          ...stock
        })),
        total_records: apiResponse.total_records,
        current_page: apiResponse.current_page,
        total_pages: apiResponse.total_pages,
        page_size: apiResponse.page_size,
        nlp_analysis: apiResponse.intent_analysis ? {
          interpreted_filters: {},
          confidence: apiResponse.intent_analysis.confidence,
          suggestions: apiResponse.intent_analysis.alternate_queries || [],
          original_query: request.query
        } : undefined
      };
      
    } else if (request.searchMode === 'filters' && request.filters) {
      // Use metrics filter endpoint
      const filtersArray = convertFiltersToMetricsFormat(request.filters);
      
      const metricsRequest = {
        filters: filtersArray,
        page: request.page,
        page_size: request.pageSize,
        sort_field: null,
        sort_order: 'desc' as const
      };

      console.log('Making Metrics Filter API call with:', metricsRequest);
      
      const response = await fetch(`${API_BASE_URL}/api/v1/feed/stock-query/metrics-filter`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(metricsRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      apiResponse = await response.json();
      
      // Transform API response to match our interface
      return {
        success: apiResponse.success,
        data: apiResponse.data.map((stock: any) => ({
          symbol: stock.symbol || stock.company_name,
          name: stock.company_name,
          assetType: 'stock' as const,
          price: stock.current_price,
          changePercent: stock.price_change_percent,
          marketCap: stock.market_cap,
          peRatio: stock.pe_ratio,
          sector: stock.sector,
          ...stock
        })),
        total_records: apiResponse.total_records,
        current_page: apiResponse.current_page,
        total_pages: apiResponse.total_pages,
        page_size: apiResponse.page_size
      };
    }
    
    // Default empty response
    return {
      success: true,
      data: [],
      total_records: 0,
      current_page: request.page,
      total_pages: 0,
      page_size: request.pageSize
    };
    
  } catch (error) {
    console.error('Stock API error:', error);
    return {
      success: false,
      data: [],
      total_records: 0,
      current_page: request.page,
      total_pages: 0,
      page_size: request.pageSize,
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

// Helper function to convert our filters to metrics API format
const convertFiltersToMetricsFormat = (filters: SearchFilters): StockMetricsFilter[] => {
  const metricsFilters: StockMetricsFilter[] = [];
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    
    // Handle range filters
    if (typeof value === 'object' && 'min' in value || 'max' in value) {
      const rangeFilter = value as RangeFilter;
      if (rangeFilter.min !== undefined && rangeFilter.max !== undefined) {
        metricsFilters.push({
          field: key,
          operator: 'between',
          value: rangeFilter.min,
          value_end: rangeFilter.max
        });
      } else if (rangeFilter.min !== undefined) {
        metricsFilters.push({
          field: key,
          operator: 'gte',
          value: rangeFilter.min
        });
      } else if (rangeFilter.max !== undefined) {
        metricsFilters.push({
          field: key,
          operator: 'lte',
          value: rangeFilter.max
        });
      }
    }
    // Handle array filters (for sectors, etc.)
    else if (Array.isArray(value)) {
      metricsFilters.push({
        field: key,
        operator: 'in',
        value: value
      });
    }
    // Handle single value filters
    else {
      metricsFilters.push({
        field: key,
        operator: 'eq',
        value: value
      });
    }
  });
  
  return metricsFilters;
};

export const getTopResults = async (): Promise<TopResultsResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/feed/top-results`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Top results API endpoint not available');
    
    // Return empty top results
    return {
      success: false,
      data: {
        stocks: [],
        mutualFunds: [],
        ipos: []
      },
      error: 'API endpoint not available'
    };
  }
};

export const autocompleteSearch = async (query: string, assetTypes?: AssetType[]): Promise<AutocompleteResponse> => {
  try {
    const params = new URLSearchParams({
      query: query.trim(),
      limit: '10'
    });
    
    if (assetTypes && assetTypes.length > 0) {
      params.append('assetTypes', assetTypes.join(','));
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/feed/autocomplete?${params}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Autocomplete API endpoint not available');
    
    return {
      success: false,
      data: [],
      error: 'API endpoint not available'
    };
  }
};

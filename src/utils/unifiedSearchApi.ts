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

// Mock data for fallback
const mockStocks: StockResult[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    assetType: 'stock',
    price: 162.80,
    change: 3.25,
    changePercent: 2.04,
    marketCap: 2500000,
    peRatio: 25.4,
    sector: 'Technology'
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    assetType: 'stock',
    price: 342.50,
    change: -1.25,
    changePercent: -0.36,
    marketCap: 2800000,
    peRatio: 28.2,
    sector: 'Technology'
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    assetType: 'stock',
    price: 128.45,
    change: 2.10,
    changePercent: 1.66,
    marketCap: 1600000,
    peRatio: 22.8,
    sector: 'Technology'
  }
];

const mockMutualFunds: MutualFundResult[] = [
  {
    symbol: 'HDFC-TOP100',
    name: 'HDFC Top 100 Fund',
    assetType: 'mutual-fund',
    nav: 645.20,
    changePercent: -0.38,
    category: 'Large Cap',
    expenseRatio: 0.8,
    aum: 25000
  },
  {
    symbol: 'SBI-BLUE',
    name: 'SBI Bluechip Fund',
    assetType: 'mutual-fund',
    nav: 58.42,
    changePercent: 0.52,
    category: 'Large Cap',
    expenseRatio: 0.65,
    aum: 18000
  }
];

const mockIPOs: IPOResult[] = [
  {
    symbol: 'TECHCORP',
    name: 'TechCorp Limited',
    assetType: 'ipo',
    price: 290,
    changePercent: 5.45,
    status: 'open',
    priceRange: '₹280-300',
    lotSize: 50
  },
  {
    symbol: 'GREENENERGY',
    name: 'Green Energy Solutions',
    assetType: 'ipo',
    price: 450,
    changePercent: 0,
    status: 'closed',
    priceRange: '₹420-480',
    lotSize: 25
  }
];

// Helper function to get authentication headers
const getAuthHeaders = () => {
  // TODO: Replace with actual authentication implementation
  // This should include both client authentication and user session authentication
  const clientAuth = localStorage.getItem('clientAuthToken') || '';
  const sessionAuth = localStorage.getItem('userSessionToken') || '';
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${clientAuth}`,
    'X-Session-Token': sessionAuth,
    // Add any other required headers as per your authentication system
  };
};

// Updated API Functions
export const searchAssets = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  // If it's a stock search, use the new stock APIs
  if (request.assetType === 'stock') {
    return await searchStocks(request);
  }

  try {
    const response = await fetch('/api/v1/feed/unified-search', {
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
    console.log('API endpoint not available, using mock data');
    
    // Return mock search results based on request
    let mockResults: SearchResult[] = [];
    
    if (request.assetType === 'mutual-fund') {
      mockResults = mockMutualFunds;
    } else if (request.assetType === 'ipo') {
      mockResults = mockIPOs;
    }

    // Filter based on query if provided
    if (request.query && request.searchMode === 'nlp') {
      const queryLower = request.query.toLowerCase();
      mockResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(queryLower) ||
        item.symbol.toLowerCase().includes(queryLower)
      );
    }

    return {
      success: true,
      data: mockResults,
      total_records: mockResults.length,
      current_page: request.page,
      total_pages: Math.ceil(mockResults.length / request.pageSize),
      page_size: request.pageSize,
      nlp_analysis: request.searchMode === 'nlp' && request.query ? {
        interpreted_filters: {},
        confidence: 0.85,
        suggestions: ['Try searching for specific sectors', 'Use price range filters'],
        original_query: request.query
      } : undefined
    };
  }
};

// New function for stock-specific searches with proper authentication
const searchStocks = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  try {
    if (request.searchMode === 'nlp' && request.query) {
      // Use paginated stock query for NLP searches
      const stockRequest: StockQueryRequest = {
        query: request.query,
        page: request.page,
        page_size: request.pageSize,
        include_charts: false
      };

      const response = await fetch('/feed/stock-query/paginated', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(stockRequest)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data: StockQueryResponse = await response.json();
      
      // Ensure we handle the response according to the documentation
      if (!data.success) {
        throw new Error(data.error || 'Stock query failed');
      }
      
      // Transform to UnifiedSearchResponse format
      return {
        success: data.success,
        data: data.data.map(stock => ({
          symbol: stock.symbol || stock.ticker || 'N/A',
          name: stock.company_name || stock.name || 'Unknown',
          assetType: 'stock',
          price: stock.current_price || stock.price,
          changePercent: stock.price_change_percent || stock.change_percent,
          marketCap: stock.market_cap,
          peRatio: stock.pe_ratio,
          sector: stock.sector,
          ...stock
        })),
        total_records: data.total_records,
        current_page: data.current_page,
        total_pages: data.total_pages,
        page_size: data.page_size,
        nlp_analysis: {
          interpreted_filters: {},
          confidence: data.intent_analysis.confidence,
          suggestions: data.intent_analysis.alternate_queries,
          original_query: request.query
        }
      };
    } else if (request.searchMode === 'filters' && request.filters) {
      // Use metrics filter for advanced filter searches
      const filters: StockMetricsFilter[] = [];
      
      // Convert our filter format to stock metrics format
      Object.entries(request.filters).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        
        if (typeof value === 'object' && 'min' in value && 'max' in value) {
          // Range filter
          const rangeValue = value as RangeFilter;
          if (rangeValue.min !== undefined && rangeValue.max !== undefined) {
            filters.push({
              field: key,
              operator: 'between',
              value: rangeValue.min,
              value_end: rangeValue.max
            });
          } else if (rangeValue.min !== undefined) {
            filters.push({
              field: key,
              operator: 'gte',
              value: rangeValue.min
            });
          } else if (rangeValue.max !== undefined) {
            filters.push({
              field: key,
              operator: 'lte',
              value: rangeValue.max
            });
          }
        } else if (Array.isArray(value)) {
          // Array filter (IN operator)
          filters.push({
            field: key,
            operator: 'in',
            value: value
          });
        } else {
          // Exact match
          filters.push({
            field: key,
            operator: 'eq',
            value: value
          });
        }
      });

      const metricsRequest: StockMetricsRequest = {
        filters,
        page: request.page,
        page_size: request.pageSize,
        fields_to_return: [
          'symbol', 'company_name', 'current_price', 'market_cap', 
          'pe_ratio', 'sector', 'price_change_percent'
        ]
      };

      const response = await fetch('/feed/stock-query/metrics-filter', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(metricsRequest)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }

      const data: StockMetricsResponse = await response.json();
      
      // Ensure we handle the response according to the documentation
      if (!data.success) {
        throw new Error(data.error || 'Metrics filter failed');
      }
      
      // Transform to UnifiedSearchResponse format
      return {
        success: data.success,
        data: data.data.map(stock => ({
          symbol: stock.symbol || stock.ticker || 'N/A',
          name: stock.company_name || stock.name || 'Unknown',
          assetType: 'stock',
          price: stock.current_price || stock.price,
          changePercent: stock.price_change_percent || stock.change_percent,
          marketCap: stock.market_cap,
          peRatio: stock.pe_ratio,
          sector: stock.sector,
          ...stock
        })),
        total_records: data.total_records,
        current_page: data.current_page,
        total_pages: data.total_pages,
        page_size: data.page_size
      };
    }
    
    throw new Error('Invalid search mode or missing parameters');
  } catch (error) {
    console.error('Stock API error, falling back to mock data:', error);
    
    // Fallback to mock data
    let mockResults = mockStocks;
    
    if (request.query && request.searchMode === 'nlp') {
      const queryLower = request.query.toLowerCase();
      mockResults = mockResults.filter(item => 
        item.name.toLowerCase().includes(queryLower) ||
        item.symbol.toLowerCase().includes(queryLower)
      );
    }

    return {
      success: true,
      data: mockResults,
      total_records: mockResults.length,
      current_page: request.page,
      total_pages: Math.ceil(mockResults.length / request.pageSize),
      page_size: request.pageSize,
      nlp_analysis: request.searchMode === 'nlp' && request.query ? {
        interpreted_filters: {},
        confidence: 0.85,
        suggestions: ['Try searching for specific sectors', 'Use price range filters'],
        original_query: request.query
      } : undefined
    };
  }
};

export const getTopResults = async (): Promise<TopResultsResponse> => {
  try {
    const response = await fetch('/api/v1/feed/top-results', {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('API endpoint not available, using mock data');
    
    // Return mock top results
    return {
      success: true,
      data: {
        stocks: mockStocks,
        mutualFunds: mockMutualFunds,
        ipos: mockIPOs
      }
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

    const response = await fetch(`/api/v1/feed/autocomplete?${params}`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('API endpoint not available, using mock data');
    
    // Return mock autocomplete results
    const allMockData = [...mockStocks, ...mockMutualFunds, ...mockIPOs];
    const queryLower = query.toLowerCase();
    
    const filteredResults = allMockData
      .filter(item => 
        item.name.toLowerCase().includes(queryLower) ||
        item.symbol.toLowerCase().includes(queryLower)
      )
      .slice(0, 10)
      .map(item => ({
        symbol: item.symbol,
        name: item.name,
        assetType: item.assetType,
        price: item.price,
        changePercent: item.changePercent
      }));

    return {
      success: true,
      data: filteredResults
    };
  }
};

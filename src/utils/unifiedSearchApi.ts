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
    sector: 'Technology',
    company_name: 'Apple Inc.',
    current_price: 162.80,
    price_change_percent: 2.04,
    market_cap: 2500000,
    pe_ratio: 25.4,
    roe: 0.28,
    roic: 0.22,
    net_margin: 0.21,
    debt_to_equity: 1.8
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
    sector: 'Technology',
    company_name: 'Microsoft Corporation',
    current_price: 342.50,
    price_change_percent: -0.36,
    market_cap: 2800000,
    pe_ratio: 28.2,
    roe: 0.35,
    roic: 0.28,
    net_margin: 0.32,
    debt_to_equity: 0.7
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
    sector: 'Technology',
    company_name: 'Alphabet Inc.',
    current_price: 128.45,
    price_change_percent: 1.66,
    market_cap: 1600000,
    pe_ratio: 22.8,
    roe: 0.18,
    roic: 0.15,
    net_margin: 0.19,
    debt_to_equity: 0.3
  },
  {
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    assetType: 'stock',
    price: 248.50,
    change: 8.75,
    changePercent: 3.65,
    marketCap: 800000,
    peRatio: 65.8,
    sector: 'Automotive',
    company_name: 'Tesla Inc.',
    current_price: 248.50,
    price_change_percent: 3.65,
    market_cap: 800000,
    pe_ratio: 65.8,
    roe: 0.19,
    roic: 0.12,
    net_margin: 0.08,
    debt_to_equity: 0.9
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    assetType: 'stock',
    price: 445.20,
    change: 12.30,
    changePercent: 2.84,
    marketCap: 1100000,
    peRatio: 42.5,
    sector: 'Technology',
    company_name: 'NVIDIA Corporation',
    current_price: 445.20,
    price_change_percent: 2.84,
    market_cap: 1100000,
    pe_ratio: 42.5,
    roe: 0.48,
    roic: 0.35,
    net_margin: 0.25,
    debt_to_equity: 0.4
  },
  {
    symbol: 'JNJ',
    name: 'Johnson & Johnson',
    assetType: 'stock',
    price: 165.75,
    change: -0.85,
    changePercent: -0.51,
    marketCap: 440000,
    peRatio: 15.2,
    sector: 'Healthcare',
    company_name: 'Johnson & Johnson',
    current_price: 165.75,
    price_change_percent: -0.51,
    market_cap: 440000,
    pe_ratio: 15.2,
    roe: 0.24,
    roic: 0.18,
    net_margin: 0.22,
    debt_to_equity: 0.5
  },
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    assetType: 'stock',
    price: 142.35,
    change: 1.95,
    changePercent: 1.39,
    marketCap: 420000,
    peRatio: 12.8,
    sector: 'Financial Services',
    company_name: 'JPMorgan Chase & Co.',
    current_price: 142.35,
    price_change_percent: 1.39,
    market_cap: 420000,
    pe_ratio: 12.8,
    roe: 0.15,
    roic: 0.12,
    net_margin: 0.28,
    debt_to_equity: 1.2
  },
  {
    symbol: 'PG',
    name: 'Procter & Gamble Co.',
    assetType: 'stock',
    price: 158.90,
    change: 0.45,
    changePercent: 0.28,
    marketCap: 380000,
    peRatio: 24.6,
    sector: 'Consumer Goods',
    company_name: 'Procter & Gamble Co.',
    current_price: 158.90,
    price_change_percent: 0.28,
    market_cap: 380000,
    pe_ratio: 24.6,
    roe: 0.31,
    roic: 0.25,
    net_margin: 0.21,
    debt_to_equity: 0.6
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    assetType: 'stock',
    price: 152.40,
    change: -1.15,
    changePercent: -0.75,
    marketCap: 415000,
    peRatio: 26.3,
    sector: 'Consumer Defensive',
    company_name: 'Walmart Inc.',
    current_price: 152.40,
    price_change_percent: -0.75,
    market_cap: 415000,
    pe_ratio: 26.3,
    roe: 0.22,
    roic: 0.16,
    net_margin: 0.025,
    debt_to_equity: 0.8
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    assetType: 'stock',
    price: 258.70,
    change: 3.20,
    changePercent: 1.25,
    marketCap: 560000,
    peRatio: 32.1,
    sector: 'Financial Services',
    company_name: 'Visa Inc.',
    current_price: 258.70,
    price_change_percent: 1.25,
    market_cap: 560000,
    pe_ratio: 32.1,
    roe: 0.38,
    roic: 0.28,
    net_margin: 0.52,
    debt_to_equity: 0.3
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
    // For now, simulate API call delay and then fallback to mock data
    await new Promise(resolve => setTimeout(resolve, 500));
    throw new Error('API not available - using mock data for testing');
  } catch (error) {
    console.log('Using mock data for testing stock search functionality');
    
    let filteredResults = [...mockStocks];
    
    // Simulate NLP query filtering
    if (request.searchMode === 'nlp' && request.query) {
      const queryLower = request.query.toLowerCase();
      
      // Simple keyword matching for testing
      if (queryLower.includes('tech') || queryLower.includes('technology')) {
        filteredResults = filteredResults.filter(stock => stock.sector === 'Technology');
      }
      if (queryLower.includes('healthcare') || queryLower.includes('health')) {
        filteredResults = filteredResults.filter(stock => stock.sector === 'Healthcare');
      }
      if (queryLower.includes('financial') || queryLower.includes('bank')) {
        filteredResults = filteredResults.filter(stock => stock.sector === 'Financial Services');
      }
      if (queryLower.includes('high pe') || queryLower.includes('pe ratio')) {
        if (queryLower.includes('under') || queryLower.includes('below')) {
          const peMatch = queryLower.match(/(\d+)/);
          const peThreshold = peMatch ? parseInt(peMatch[1]) : 25;
          filteredResults = filteredResults.filter(stock => stock.pe_ratio && stock.pe_ratio < peThreshold);
        }
      }
      if (queryLower.includes('large cap') || queryLower.includes('big companies')) {
        filteredResults = filteredResults.filter(stock => stock.market_cap && stock.market_cap > 500000);
      }
      if (queryLower.includes('growth') || queryLower.includes('high roe')) {
        filteredResults = filteredResults.filter(stock => stock.roe && stock.roe > 0.2);
      }
    }
    
    // Simulate advanced filter search
    if (request.searchMode === 'filters' && request.filters) {
      const filters = request.filters;
      
      if (filters.sector && Array.isArray(filters.sector)) {
        filteredResults = filteredResults.filter(stock => 
          filters.sector!.includes(stock.sector || '')
        );
      }
      
      if (filters.peRatio) {
        const peFilter = filters.peRatio as any;
        if (peFilter.min !== undefined) {
          filteredResults = filteredResults.filter(stock => 
            stock.pe_ratio && stock.pe_ratio >= peFilter.min
          );
        }
        if (peFilter.max !== undefined) {
          filteredResults = filteredResults.filter(stock => 
            stock.pe_ratio && stock.pe_ratio <= peFilter.max
          );
        }
      }
      
      if (filters.marketCap) {
        const mcapFilter = filters.marketCap as any;
        if (mcapFilter.min !== undefined) {
          filteredResults = filteredResults.filter(stock => 
            stock.market_cap && stock.market_cap >= mcapFilter.min
          );
        }
        if (mcapFilter.max !== undefined) {
          filteredResults = filteredResults.filter(stock => 
            stock.market_cap && stock.market_cap <= mcapFilter.max
          );
        }
      }
      
      if (filters.priceRange) {
        const priceFilter = filters.priceRange as any;
        if (priceFilter.min !== undefined) {
          filteredResults = filteredResults.filter(stock => 
            stock.current_price && stock.current_price >= priceFilter.min
          );
        }
        if (priceFilter.max !== undefined) {
          filteredResults = filteredResults.filter(stock => 
            stock.current_price && stock.current_price <= priceFilter.max
          );
        }
      }
    }
    
    // Simulate pagination
    const totalRecords = filteredResults.length;
    const startIndex = (request.page - 1) * request.pageSize;
    const endIndex = startIndex + request.pageSize;
    const paginatedResults = filteredResults.slice(startIndex, endIndex);
    
    // Transform to match API response format
    const transformedResults = paginatedResults.map(stock => ({
      symbol: stock.symbol,
      name: stock.company_name,
      assetType: 'stock' as const,
      price: stock.current_price,
      changePercent: stock.price_change_percent,
      marketCap: stock.market_cap,
      peRatio: stock.pe_ratio,
      sector: stock.sector,
      ...stock
    }));

    return {
      success: true,
      data: transformedResults,
      total_records: totalRecords,
      current_page: request.page,
      total_pages: Math.ceil(totalRecords / request.pageSize),
      page_size: request.pageSize,
      nlp_analysis: request.searchMode === 'nlp' && request.query ? {
        interpreted_filters: {},
        confidence: 0.85,
        suggestions: [
          'Try "tech companies with PE under 30"',
          'Search for "healthcare stocks with high ROE"',
          'Find "large cap financial services"'
        ],
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

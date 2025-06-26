
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

// API Functions
export const searchAssets = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  try {
    const response = await fetch('/api/v1/feed/unified-search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
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
    
    if (request.assetType === 'stock') {
      mockResults = mockStocks;
    } else if (request.assetType === 'mutual-fund') {
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

export const getTopResults = async (): Promise<TopResultsResponse> => {
  try {
    const response = await fetch('/api/v1/feed/top-results');

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
      headers: {
        'Content-Type': 'application/json',
      }
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

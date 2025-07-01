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
  data: any[];
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  intent_analysis?: {
    intent: string;
    confidence: number;
    confidence_reasoning: string;
    processing_path: string;
    communication_message: string;
    optimization_summary: string;
    chart_suggestions?: {
      primary: {
        type: string;
        title: string;
        x_field: string;
        y_field: string;
        label_field: string;
      };
    };
    alternate_queries: string[];
    transparency?: {
      filter_explanation: {
        filters_applied: Array<{
          field: string;
          condition: string;
          reasoning: string;
        }>;
        total_stocks_screened: string;
        filter_summary: string;
      };
      field_selection_explanation: {
        key_analysis_fields: Array<{
          field: string;
          importance: string;
          reasoning: string;
        }>;
      };
    };
  };
  execution_path?: string;
  processing_time_ms?: number;
  error?: string | null;
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

// New types for mutual fund APIs
export interface MutualFundMetricsFilter {
  field: string;
  operator: 'eq' | 'gt' | 'lt' | 'gte' | 'lte' | 'between' | 'in';
  value: any;
  value_end?: any | null;
}

export interface MutualFundMetricsRequest {
  filters: MutualFundMetricsFilter[];
  page: number;
  page_size: number;
  sort_field?: string | null;
  sort_order?: 'asc' | 'desc';
}

export interface MutualFundMetricsResponse {
  data: any[];
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  applied_filters: MutualFundMetricsFilter[];
  processing_time_ms: number;
  success: boolean;
  error: string | null;
}

// New types for filter options API
export interface FilterOptions {
  stocks: {
    sectors: Array<{
      value: string;
      label: string;
    }>;
    growth_types: Array<{
      value: string;
      label: string;
    }>;
    market_cap_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
    pe_ratio_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
    price_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
    revenue_growth_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
    roe_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
    debt_equity_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
    rsi_ranges: Array<{
      min: number;
      max: number | null;
      label: string;
    }>;
  };
  mutual_funds: {
    filter_type: string;
    categories: Array<{
      name: string;
      value: string;
      count: number;
      priority: number;
    }>;
    amc_names: Array<{
      name: string;
      value: string;
      count: number;
    }>;
    risk_levels: Array<{
      name: string;
      value: string;
      description: string;
    }>;
    expense_ratio_options: Array<{
      label: string;
      value: number | null;
    }>;
    aum_options: Array<{
      label: string;
      min_value: number | null;
    }>;
    return_1y_options: Array<{
      label: string;
      value: number | null;
    }>;
    return_3y_options: Array<{
      label: string;
      value: number | null;
    }>;
    sip_options: Array<{
      label: string;
      value: number | null;
    }>;
    plan_types: Array<{
      label: string;
      value: string | null;
    }>;
    timestamp: string;
    error: string | null;
  };
  ipos: {
    status_options: Array<{
      value: string;
      label: string;
    }>;
  };
}

export interface FilterOptionsResponse {
  success: boolean;
  data?: FilterOptions;
  error?: string;
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

// API Configuration - Updated with the new bearer token
const BASE_URL = 'https://p646lccs-8008.inc1.devtunnels.ms';
// Updated bearer token
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbGllbnRfbXg3NWc1cmNneWdsdHJydSIsImNsaWVudF9pZCI6ImNsaWVudF9teDc1ZzVyY2d5Z2x0cnJ1IiwiY2xpZW50X25hbWUiOiJUZXN0IEJvdCBBUEkgQ2xpZW50IDYiLCJzY29wZXMiOlsicmVhZDpjb21wYW5pZXMiLCJyZWFkOnByaWNlcyIsInJlYWQ6ZmluYW5jaWFscyIsInJlYWQ6bWFya2V0IiwicmVhZDpjcnlwdG8iLCJyZWFkOm5ld3MiLCJyZWFkOmVhcm5pbmdzIiwicmVhZDphaV9pbnNpZ2h0cyIsInJlYWQ6cmF0aW5ncyIsInJlYWQ6c2VnbWVudHMiXSwidG9rZW5fdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImV4cCI6MTgwOTU1MDA1MSwiaWF0IjoxNzQ5NTUwMTExLCJpc3MiOiJkaXNjdnItZmluYW5jZS1hcGkifQ.9jun8ghunLtWng5UEO57uptBnp1AFCDiWpO4s1OLuVY';
const SESSION_ID = '0aee2f9b-b3ff-447d-bf7e-cb5318a7c550';

// Helper function to get authentication headers
const getAuthHeaders = () => {
  console.log('=== API AUTH HEADERS ===');
  console.log('Base URL:', BASE_URL);
  console.log('Session ID:', SESSION_ID);
  console.log('Bearer Token (first 50 chars):', BEARER_TOKEN.substring(0, 50) + '...');
  
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${BEARER_TOKEN}`,
    'X-Session-ID': SESSION_ID,
  };
};

// Updated API Functions
export const searchAssets = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  console.log('=== SEARCH ASSETS START ===');
  console.log('Search request:', request);
  
  // Route to specific asset APIs based on asset type
  if (request.assetType === 'stock') {
    console.log('Routing to stock search...');
    return await searchStocks(request);
  } else if (request.assetType === 'mutual-fund') {
    console.log('Routing to mutual fund search...');
    return await searchMutualFunds(request);
  }

  console.log('Using unified search endpoint...');
  try {
    const response = await fetch(`${BASE_URL}/api/v1/feed/unified-search`, {
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
    console.log('Unified search API not available, using asset-specific APIs');
    
    // For non-implemented assets, return empty results
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

// Stock search function (existing)
const searchStocks = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  console.log('=== STOCK SEARCH START ===');
  console.log('Stock search request:', request);
  
  try {
    let apiResponse;
    
    if (request.searchMode === 'nlp' && request.query) {
      console.log('=== USING NLP ENDPOINT ===');
      // Use NLP endpoint
      const stockQueryRequest = {
        query: request.query,
        page: request.page,
        page_size: request.pageSize,
        include_charts: false
      };

      console.log('Making Stock NLP API call with:', stockQueryRequest);
      console.log('API URL:', `${BASE_URL}/api/v1/feed/stock-query/paginated`);
      
      const response = await fetch(`${BASE_URL}/api/v1/feed/stock-query/paginated`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(stockQueryRequest)
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      apiResponse = await response.json();
      console.log('Raw API Response:', apiResponse);
      
      // Transform API response to match our interface - Updated field mapping
      const transformedResponse = {
        success: apiResponse.success,
        data: apiResponse.data.map((stock: any) => {
          console.log('Transforming stock data:', stock);
          
          // Safe field extraction with fallbacks
          const transformedStock = {
            symbol: stock.symbol || stock.company_name || 'N/A',
            name: stock.company_name || stock.name || stock.symbol || 'Unknown Company',
            assetType: 'stock' as const,
            price: stock.current_price || stock.price || 0,
            change: stock.price_change || stock.change || 0,
            changePercent: stock.price_change_percent || stock.changePercent || 0,
            marketCap: stock.market_cap || stock.marketCap || 0,
            peRatio: stock.pe_ratio || stock.peRatio || 0,
            sector: stock.sector || 'Unknown',
            industry: stock.industry || 'Unknown',
            // Additional fields from the actual API response
            consensus_rating: stock.consensus_rating,
            current_ratio: stock.current_ratio,
            debt_to_equity: stock.debt_to_equity,
            pb_ratio: stock.pb_ratio,
            roe: stock.roe,
            roce: stock.roce,
            rsi_14: stock.rsi_14,
            net_margin: stock.net_margin,
            operating_margin: stock.operating_margin,
            revenue_growth_1y: stock.revenue_growth_1y,
            eps_growth_1y: stock.eps_growth_1y,
            ...stock // Include all original fields
          };
          
          console.log('Transformed stock:', transformedStock);
          return transformedStock;
        }),
        total_records: apiResponse.total_records || apiResponse.data?.length || 0,
        current_page: apiResponse.current_page || request.page,
        total_pages: apiResponse.total_pages || 1,
        page_size: apiResponse.page_size || request.pageSize,
        nlp_analysis: apiResponse.intent_analysis ? {
          interpreted_filters: {},
          confidence: apiResponse.intent_analysis.confidence || 0,
          suggestions: apiResponse.intent_analysis.alternate_queries || [],
          original_query: request.query || ''
        } : undefined
      };
      
      console.log('Final transformed response:', transformedResponse);
      return transformedResponse;
      
    } else if (request.searchMode === 'filters' && request.filters) {
      console.log('=== USING FILTERS ENDPOINT ===');
      // Use metrics filter endpoint
      const filtersArray = convertFiltersToStockMetricsFormat(request.filters);
      console.log('Converted filters:', filtersArray);
      
      const metricsRequest = {
        filters: filtersArray,
        page: request.page,
        page_size: request.pageSize,
        sort_field: null,
        sort_order: 'desc' as const
      };

      console.log('Making Stock Metrics Filter API call with:', metricsRequest);
      console.log('API URL:', `${BASE_URL}/api/v1/feed/stock-query/metrics-filter`);
      
      const response = await fetch(`${BASE_URL}/api/v1/feed/stock-query/metrics-filter`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(metricsRequest)
      });

      console.log('API Response status:', response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      apiResponse = await response.json();
      console.log('Raw API Response:', apiResponse);
      
      // Transform API response to match our interface - Updated field mapping
      const transformedResponse = {
        success: apiResponse.success,
        data: apiResponse.data.map((stock: any) => {
          console.log('Transforming stock data:', stock);
          
          // Safe field extraction with fallbacks
          const transformedStock = {
            symbol: stock.symbol || stock.company_name || 'N/A',
            name: stock.company_name || stock.name || stock.symbol || 'Unknown Company',
            assetType: 'stock' as const,
            price: stock.current_price || stock.price || 0,
            change: stock.price_change || stock.change || 0,
            changePercent: stock.price_change_percent || stock.changePercent || 0,
            marketCap: stock.market_cap || stock.marketCap || 0,
            peRatio: stock.pe_ratio || stock.peRatio || 0,
            sector: stock.sector || 'Unknown',
            industry: stock.industry || 'Unknown',
            // Additional fields from the actual API response
            consensus_rating: stock.consensus_rating,
            current_ratio: stock.current_ratio,
            debt_to_equity: stock.debt_to_equity,
            pb_ratio: stock.pb_ratio,
            roe: stock.roe,
            roce: stock.roce,
            rsi_14: stock.rsi_14,
            net_margin: stock.net_margin,
            operating_margin: stock.operating_margin,
            revenue_growth_1y: stock.revenue_growth_1y,
            eps_growth_1y: stock.eps_growth_1y,
            ...stock // Include all original fields
          };
          
          console.log('Transformed stock:', transformedStock);
          return transformedStock;
        }),
        total_records: apiResponse.total_records || apiResponse.data?.length || 0,
        current_page: apiResponse.current_page || request.page,
        total_pages: apiResponse.total_pages || 1,
        page_size: apiResponse.page_size || request.pageSize
      };
      
      console.log('Final transformed response:', transformedResponse);
      return transformedResponse;
    }
    
    // Default empty response
    console.log('No valid search mode or data provided');
    return {
      success: true,
      data: [],
      total_records: 0,
      current_page: request.page,
      total_pages: 0,
      page_size: request.pageSize
    };
    
  } catch (error) {
    console.error('=== STOCK API ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
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

// New mutual fund search function with NLP support
const searchMutualFunds = async (request: UnifiedSearchRequest): Promise<UnifiedSearchResponse> => {
  console.log('=== MUTUAL FUND SEARCH START ===');
  console.log('Mutual fund search request:', request);
  
  try {
    let apiResponse;
    
    if (request.searchMode === 'nlp' && request.query) {
      console.log('=== USING MUTUAL FUND NLP ENDPOINT ===');
      // Use NLP endpoint
      const mutualFundQueryRequest = {
        query: request.query,
        page: request.page,
        page_size: request.pageSize,
        include_charts: false
      };

      console.log('Making Mutual Fund NLP API call with:', mutualFundQueryRequest);
      console.log('API URL:', `${BASE_URL}/api/v1/feed/mutual-fund-query/paginated`);
      
      const response = await fetch(`${BASE_URL}/api/v1/feed/mutual-fund-query/paginated`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(mutualFundQueryRequest)
      });

      console.log('API Response status:', response.status);
      console.log('API Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Error Response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
      }

      apiResponse = await response.json();
      console.log('Raw Mutual Fund API Response:', apiResponse);
      
      // Check if the response has data
      if (!apiResponse.data || !Array.isArray(apiResponse.data)) {
        console.error('Invalid API response structure:', apiResponse);
        return {
          success: false,
          data: [],
          total_records: 0,
          current_page: request.page,
          total_pages: 0,
          page_size: request.pageSize,
          error: 'Invalid response structure from API'
        };
      }
      
      // Transform API response to match our interface
      const transformedResponse = {
        success: apiResponse.success !== false, // Default to true unless explicitly false
        data: apiResponse.data.map((fund: any) => {
          console.log('Transforming mutual fund data:', fund);
          
          // Safe field extraction with fallbacks for mutual funds
          const transformedFund = {
            symbol: fund.mf_schcode?.toString() || fund.scheme_code || fund._id || 'N/A',
            name: fund.scheme_name || fund.name || 'Unknown Fund',
            assetType: 'mutual-fund' as const,
            price: fund.nav_price || fund.nav || 0,
            navPrice: fund.nav_price || fund.nav,
            change: fund.ret_1month || 0,
            changePercent: fund.ret_1month || 0,
            ret_1month: fund.ret_1month,
            ret_1year: fund.ret_1year,
            ret_3year: fund.ret_3year,
            ret_5year: fund.ret_5year,
            category: fund.main_category || fund.scheme_category,
            main_category: fund.main_category,
            sub_category: fund.sub_category,
            expenseRatio: fund.total_expense_ratio,
            total_expense_ratio: fund.total_expense_ratio,
            aum: fund.current_aum,
            current_aum: fund.current_aum,
            amc_name: fund.amc_name,
            risk_level: fund.risk_level,
            sip_minimum: fund.sip_minimum,
            launch_date: fund.launch_date,
            plan_type: fund.plan_type,
            option_type: fund.option_type,
            scheme_status: fund.scheme_status,
            benchmark_name: fund.benchmark_name,
            // Additional performance metrics
            standard_deviation_3year: fund.standard_deviation_3year,
            beta_3year: fund.beta_3year,
            alpha_3year: fund.alpha_3year,
            sharpe_ratio_3year: fund.sharpe_ratio_3year,
            fund_managers: fund.fund_managers,
            ...fund // Include all original fields
          };
          
          console.log('Transformed mutual fund:', transformedFund);
          return transformedFund;
        }),
        total_records: apiResponse.total_records || apiResponse.data?.length || 0,
        current_page: apiResponse.current_page || request.page,
        total_pages: apiResponse.total_pages || Math.ceil((apiResponse.total_records || apiResponse.data?.length || 0) / request.pageSize),
        page_size: apiResponse.page_size || request.pageSize,
        nlp_analysis: apiResponse.intent_analysis ? {
          interpreted_filters: apiResponse.intent_analysis.interpreted_filters || {},
          confidence: apiResponse.intent_analysis.confidence || 0,
          suggestions: apiResponse.intent_analysis.alternate_queries || [],
          original_query: request.query || ''
        } : undefined
      };
      
      console.log('Final transformed mutual fund response:', transformedResponse);
      console.log('Number of transformed funds:', transformedResponse.data.length);
      return transformedResponse;
      
    } else if (request.searchMode === 'filters' && request.filters) {
      console.log('=== USING MUTUAL FUND FILTERS ENDPOINT ===');
      // Use metrics filter endpoint (existing code)
      const filtersArray = convertFiltersToMutualFundMetricsFormat(request.filters);
      
      const metricsRequest = {
        filters: filtersArray,
        page: request.page,
        page_size: request.pageSize,
        sort_field: null,
        sort_order: 'desc' as const
      };

      console.log('Making Mutual Fund Metrics Filter API call with:', metricsRequest);
      
      const response = await fetch(`${BASE_URL}/api/v1/feed/mutual-fund/metrics-filter`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(metricsRequest)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const apiResponse: MutualFundMetricsResponse = await response.json();
      
      // Transform API response to match our interface with proper field mapping
      return {
        success: apiResponse.success,
        data: apiResponse.data.map((fund: any) => ({
          symbol: fund.scheme_code || fund.basic_info?.scheme_code || fund.mf_schcode?.toString(),
          name: fund.scheme_name || fund.basic_info?.scheme_name,
          assetType: 'mutual-fund' as const,
          // Map price fields correctly for mutual funds
          price: fund.nav_price || fund.nav || fund.current_performance?.nav,
          nav_price: fund.nav_price || fund.nav || fund.current_performance?.nav,
          nav: fund.nav_price || fund.nav || fund.current_performance?.nav,
          changePercent: fund.ret_1month || fund.current_performance?.returns?.ret_1month,
          ret_1month: fund.ret_1month || fund.current_performance?.returns?.ret_1month,
          ret_1year: fund.ret_1year || fund.current_performance?.returns?.ret_1year,
          ret_3year: fund.ret_3year || fund.current_performance?.returns?.ret_3year,
          category: fund.scheme_category || fund.basic_info?.scheme_category?.main_category || fund.main_category,
          expenseRatio: fund.expense_ratio || fund.fund_metrics?.expense_ratio || fund.total_expense_ratio,
          total_expense_ratio: fund.expense_ratio || fund.fund_metrics?.expense_ratio || fund.total_expense_ratio,
          aum: fund.aum || fund.fund_metrics?.aum || fund.current_aum,
          current_aum: fund.aum || fund.fund_metrics?.aum || fund.current_aum,
          amc_name: fund.amc_name || fund.basic_info?.amc_name,
          risk_level: fund.risk_level,
          ...fund
        })),
        total_records: apiResponse.total_records,
        current_page: apiResponse.current_page,
        total_pages: apiResponse.total_pages,
        page_size: apiResponse.page_size
      };
    }
    
    // Default empty response for unsupported search modes
    console.log('No valid search mode provided or unsupported combination');
    return {
      success: true,
      data: [],
      total_records: 0,
      current_page: request.page,
      total_pages: 0,
      page_size: request.pageSize,
      error: 'Invalid search mode for mutual funds'
    };
    
  } catch (error) {
    console.error('=== MUTUAL FUND API ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    
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

// Helper function to convert our filters to stock metrics API format
const convertFiltersToStockMetricsFormat = (filters: SearchFilters): StockMetricsFilter[] => {
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

// Helper function to convert our filters to mutual fund metrics API format
const convertFiltersToMutualFundMetricsFormat = (filters: SearchFilters): MutualFundMetricsFilter[] => {
  const metricsFilters: MutualFundMetricsFilter[] = [];
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    
    // Map UI filter names to API field names
    let fieldName = key;
    if (key === 'category') {
      fieldName = 'basic_info.scheme_category.main_category';
    } else if (key === 'expenseRatio') {
      fieldName = 'fund_metrics.expense_ratio';
    } else if (key === 'aum') {
      fieldName = 'fund_metrics.aum';
    } else if (key === 'returns1y') {
      fieldName = 'current_performance.returns.ret_1year';
    } else if (key === 'returns3y') {
      fieldName = 'current_performance.returns.ret_3year';
    }
    
    // Handle range filters
    if (typeof value === 'object' && ('min' in value || 'max' in value)) {
      const rangeFilter = value as RangeFilter;
      if (rangeFilter.min !== undefined && rangeFilter.max !== undefined) {
        metricsFilters.push({
          field: fieldName,
          operator: 'between',
          value: rangeFilter.min,
          value_end: rangeFilter.max
        });
      } else if (rangeFilter.min !== undefined) {
        metricsFilters.push({
          field: fieldName,
          operator: 'gte',
          value: rangeFilter.min
        });
      } else if (rangeFilter.max !== undefined) {
        metricsFilters.push({
          field: fieldName,
          operator: 'lte',
          value: rangeFilter.max
        });
      }
    }
    // Handle array filters
    else if (Array.isArray(value)) {
      metricsFilters.push({
        field: fieldName,
        operator: 'in',
        value: value
      });
    }
    // Handle single value filters
    else {
      metricsFilters.push({
        field: fieldName,
        operator: 'eq',
        value: value
      });
    }
  });
  
  return metricsFilters;
};

// New function to fetch filter options
export const getFilterOptions = async (): Promise<FilterOptionsResponse> => {
  try {
    console.log('Fetching filter options from API...');
    
    const response = await fetch(`${BASE_URL}/api/v1/feed/filter-options`, {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Filter options API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch filter options'
    };
  }
};

export const getTopResults = async (): Promise<TopResultsResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/feed/top-results`, {
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

    const response = await fetch(`${BASE_URL}/api/v1/feed/autocomplete?${params}`, {
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

// Mixed Feed Types
export interface MixedFeedItem {
  _id: string;
  mf_schcode?: number;
  scheme_name: string;
  amc_name: string;
  main_category: string;
  sub_category: string;
  plan_type: string;
  option_type: string;
  scheme_status: string;
  launch_date: string;
  nav_price: number;
  nav_date: string;
  ret_1week: number;
  ret_1month: number;
  ret_3month: number;
  ret_6month: number;
  ret_1year: number;
  ret_3year?: number;
  ret_5year?: number;
  ret_inception: number;
  total_expense_ratio: number;
  current_aum: number;
  sip_minimum: number;
  standard_deviation_3year: number;
  beta_3year: number;
  alpha_3year: number;
  sharpe_ratio_3year: number;
  fund_managers: Array<{
    manager_name: string;
    managing_since: string;
  }>;
  benchmark_name: string;
  risk_level: string;
  expense_category: string;
  aum_category: string;
  feed_category: string;
}

export interface MixedFeedSection {
  section_type: string;
  title: string;
  subtitle: string;
  items: MixedFeedItem[];
  total_count: number;
}

export interface MixedFeedData {
  feed_type: string;
  timestamp: string;
  sections: MixedFeedSection[];
  market_overview: {
    total_active_funds: number;
    avg_market_return: number;
    positive_return_rate: number;
  };
}

export interface MixedFeedResponse {
  success: boolean;
  data?: MixedFeedData;
  error?: string;
}

export const getMixedFeed = async (): Promise<MixedFeedResponse> => {
  try {
    console.log('Fetching mixed feed data...');
    
    const response = await fetch(`${BASE_URL}/api/v1/feed/mixed-feed`, {
      method: 'GET',
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Mixed feed response:', data);

    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('Mixed feed API error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch mixed feed data'
    };
  }
};

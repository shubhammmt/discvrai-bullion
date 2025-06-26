
// Stock Query API Integration
const API_BASE_URL = import.meta.env.VITE_STOCK_QUERY_API_BASE_URL || 'https://your-api-domain.com';

export interface StockQueryRequest {
  query: string;
  page: number;
  page_size: number;
  include_charts: boolean;
}

export interface StockData {
  company_name: string;
  competitive_position_score: number;
  current_price: number;
  debt_to_equity: number;
  eps_growth_1y: number;
  is_growth_stock: boolean;
  market_cap: number;
  market_cap_rank_sector: number;
  net_margin: number;
  operating_margin: number;
  pe_ratio: number;
  price_momentum_3m: number;
  revenue_growth_1y: number;
  revenue_rank_sector: number;
  roe: number;
  roic: number;
  rsi_14: number;
  sector: string;
  technical_score_composite: number;
}

export interface IntentAnalysis {
  intent: string;
  confidence: number;
  confidence_reasoning: string;
  processing_path: string;
  communication_message: string;
  optimization_summary: string;
  chart_suggestions: any;
  alternate_queries: string[];
  transparency: any;
}

export interface StockQueryResponse {
  success: boolean;
  data: StockData[];
  total_records: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  intent_analysis: IntentAnalysis;
  execution_path: string;
  processing_time_ms: number;
  error: string | null;
}

export const queryStocks = async (
  query: string,
  page: number = 1,
  pageSize: number = 10,
  includeCharts: boolean = false
): Promise<StockQueryResponse> => {
  try {
    const sessionId = localStorage.getItem('sessionId') || generateSessionId();
    const authToken = localStorage.getItem('authToken') || '';

    const response = await fetch(`${API_BASE_URL}/api/v1/feed/stock-query/paginated`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Session-ID': sessionId,
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify({
        query,
        page,
        page_size: pageSize,
        include_charts: includeCharts
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error querying stocks:', error);
    throw error;
  }
};

// Generate a session ID if one doesn't exist
const generateSessionId = (): string => {
  const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  localStorage.setItem('sessionId', sessionId);
  return sessionId;
};

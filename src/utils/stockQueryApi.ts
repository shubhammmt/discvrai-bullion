
// Stock Query API Integration
const API_BASE_URL = import.meta.env.VITE_STOCK_QUERY_API_BASE_URL || 'https://your-api-domain.com';

export interface StockQueryRequest {
  query: string;
  page: number;
  page_size: number;
  include_charts: boolean;
}

export interface StockQueryResponse {
  success: boolean;
  data: {
    results: Array<{
      symbol: string;
      name: string;
      price: number;
      change: number;
      changePercent: number;
      marketCap?: number;
      volume?: string;
      sector?: string;
      description?: string;
    }>;
    total: number;
    page: number;
    page_size: number;
    has_next: boolean;
  };
  message?: string;
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

import { InvestmentHealthRadarResponse } from '@/types/investmentHealthRadar';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.discvr.ai';

export class InvestmentHealthRadarService {
  private static bearerToken: string | null = null;

  static setBearerToken(token: string) {
    this.bearerToken = token;
  }

  static getBearerToken(): string | null {
    return this.bearerToken || localStorage.getItem('api_bearer_token');
  }

  static async fetchInvestmentHealthRadar(
    symbol: string
  ): Promise<InvestmentHealthRadarResponse> {
    const token = this.getBearerToken();
    
    if (!token) {
      throw new Error('Bearer token not found. Please set authentication token.');
    }

    const response = await fetch(
      `${API_BASE_URL}/api/v1/stocks/investment-health-radar/${symbol}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid or expired token');
      }
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  }
}

// Helper to set token from localStorage or environment
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('api_bearer_token') || 
                import.meta.env.VITE_API_BEARER_TOKEN;
  if (token) {
    InvestmentHealthRadarService.setBearerToken(token);
  }
}

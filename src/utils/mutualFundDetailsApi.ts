
const BASE_URL = 'https://p646lccs-8008.inc1.devtunnels.ms';
const BEARER_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjbGllbnRfbXg3NWc1cmNneWdsdHJydSIsImNsaWVudF9pZCI6ImNsaWVudF9teDc1ZzVyY2d5Z2x0cnJ1IiwiY2xpZW50X25hbWUiOiJUZXN0IEJvdCBBUEkgQ2xpZW50IDYiLCJzY29wZXMiOlsicmVhZDpjb21wYW5pZXMiLCJyZWFkOnByaWNlcyIsInJlYWQ6ZmluYW5jaWFscyIsInJlYWQ6bWFya2V0IiwicmVhZDpjcnlwdG8iLCJyZWFkOm5ld3MiLCJyZWFkOmVhcm5pbmdzIiwicmVhZDphbmFseXRpY3MiLCJyZWFkOnRlY2huaWNhbCIsInJlYWQ6ZnVuZGFtZW50YWxzIiwicmVhZDphaV9pbnNpZ2h0cyIsInJlYWQ6cmF0aW5ncyIsInJlYWQ6c2VnbWVudHMiXSwidG9rZW5fdHlwZSI6ImNsaWVudF9jcmVkZW50aWFscyIsImV4cCI6MTgwOTU1MDA1MSwiaWF0IjoxNzQ5NTUwMTExLCJpc3MiOiJkaXNjdnItZmluYW5jZS1hcGkifQ.9jun8ghunLtWng5UEO57uptBnp1AFCDiWpO4s1OLuVY';
const SESSION_ID = '0aee2f9b-b3ff-447d-bf7e-cb5318a7c550';

export interface MutualFundDetailsResponse {
  success: boolean;
  error: string | null;
  error_code: string | null;
  fund_data: {
    basic_info: {
      fund_identifiers: {
        mf_schcode: number;
        scheme_name: string;
        scheme_short_name: string;
        isin: string;
        amfi_code: number;
      };
      amc_details: {
        amc_name: string;
        amc_short_name: string;
        fund_type: string;
        incorporation_date: string;
      };
      scheme_category: {
        main_category: string;
        risk_level: string;
      };
      launch_details: {
        fund_age_years: number;
      };
    };
    current_performance: {
      latest_nav: {
        price: number;
      };
      returns: {
        ret_1month: number;
        ret_3month: number;
        ret_6month: number;
        ret_1year: number;
        ret_3year: number;
        ret_5year: number;
      };
    };
    risk_analytics: {
      beta_3year: number;
      alpha_3year: number;
      sharpe_ratio_3year: number;
      standard_deviation_3year: number;
    };
    fund_structure: {
      fund_managers: Array<{
        manager_name: string;
      }>;
      expense_structure: {
        total_expense_ratio: number;
      };
      aum_details: {
        current_aum: number;
      };
    };
    portfolio_composition: {
      asset_allocation: {
        equity: number;
        debt: number;
        cash_others: number;
      };
      sector_allocation: {
        sectors: Record<string, number>;
      };
      company_holdings: {
        equity_holdings: Array<{
          company_name: string;
          percentage_holding: number;
          sector: string;
        }>;
      };
    };
  } | null;
  lookup_method: string | null;
  data_freshness: string | null;
  processing_time_ms: number;
}

export const fetchMutualFundDetails = async (fundId: string): Promise<MutualFundDetailsResponse> => {
  console.log('Fetching mutual fund details for fund ID:', fundId);
  
  try {
    const response = await fetch(`${BASE_URL}/api/v1/feed/mutual-fund/details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BEARER_TOKEN}`,
        'X-Session-ID': SESSION_ID,
      },
      body: JSON.stringify({
        fund_id: fundId
      }),
    });

    console.log('API Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', errorText);
      throw new Error(`Failed to fetch mutual fund details: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Mutual fund details received:', data);
    
    return data;
  } catch (error) {
    console.error('Error fetching mutual fund details:', error);
    throw error;
  }
};
